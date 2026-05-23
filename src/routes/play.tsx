import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Play — Drag Piano | Himanshu Sharma" },
      { name: "description", content: "An interactive drag-to-play piano canvas with sparkles and dynamic tune controls. Built with Framer Motion + Web Audio." },
    ],
  }),
  component: Play,
});

type Scale = "major" | "minor" | "pentatonic" | "blues" | "chromatic";

const SCALE_PATTERNS: Record<Scale, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  pentatonic: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

// Build ~5 octaves of keys for a chess-keyboard density
const SCALES: Record<Scale, number[]> = Object.fromEntries(
  (Object.keys(SCALE_PATTERNS) as Scale[]).map((s) => {
    const pattern = SCALE_PATTERNS[s];
    const out: number[] = [];
    for (let oct = 0; oct < 5; oct++) {
      for (const p of pattern) out.push(p + oct * 12);
    }
    return [s, out];
  }),
) as Record<Scale, number[]>;

// Piano-style instrument presets — each is a recipe for additive synthesis
// (multiple oscillators per note) + a percussive envelope. Gives real piano feel
// rather than a raw beeping oscillator.
type Instrument = {
  label: string;
  // partials: [harmonic-multiplier, relative-amplitude, wave]
  partials: Array<[number, number, OscillatorType]>;
  attack: number;     // seconds
  decay: number;      // seconds to sustain level
  sustain: number;    // 0..1 of peak
  release: number;    // seconds
  filterHz: number;
  detune?: number;    // cents of slight detune for chorus warmth
};

const INSTRUMENTS: Record<string, Instrument> = {
  "Grand": {
    label: "Grand",
    partials: [[1, 1, "triangle"], [2, 0.45, "sine"], [3, 0.18, "sine"], [4, 0.08, "sine"]],
    attack: 0.004, decay: 0.6, sustain: 0.0, release: 0.9, filterHz: 5000,
  },
  "Upright": {
    label: "Upright",
    partials: [[1, 1, "triangle"], [2, 0.3, "triangle"], [3, 0.12, "sine"]],
    attack: 0.006, decay: 0.5, sustain: 0.0, release: 0.7, filterHz: 3500,
  },
  "Rhodes": {
    label: "Rhodes",
    partials: [[1, 1, "sine"], [2, 0.6, "sine"], [4, 0.25, "sine"], [6, 0.08, "sine"]],
    attack: 0.005, decay: 0.8, sustain: 0.15, release: 1.2, filterHz: 2800,
  },
  "Electric": {
    label: "Electric",
    partials: [[1, 1, "sawtooth"], [2, 0.35, "triangle"], [3, 0.12, "sine"]],
    attack: 0.003, decay: 0.4, sustain: 0.05, release: 0.6, filterHz: 2200,
  },
  "Music Box": {
    label: "Music Box",
    partials: [[1, 1, "sine"], [3, 0.55, "sine"], [5, 0.25, "sine"], [7, 0.1, "sine"]],
    attack: 0.002, decay: 0.35, sustain: 0.0, release: 0.5, filterHz: 6000,
  },
  "Pad": {
    label: "Pad",
    partials: [[1, 1, "sawtooth"], [2, 0.5, "sawtooth"], [3, 0.3, "triangle"]],
    attack: 0.25, decay: 0.4, sustain: 0.7, release: 1.6, filterHz: 1800,
    detune: 8,
  },
  "Pluck": {
    label: "Pluck",
    partials: [[1, 1, "triangle"], [2, 0.5, "square"], [3, 0.15, "sine"]],
    attack: 0.001, decay: 0.18, sustain: 0.0, release: 0.25, filterHz: 4000,
  },
  "Bell": {
    label: "Bell",
    partials: [[1, 1, "sine"], [2.76, 0.5, "sine"], [5.4, 0.25, "sine"], [8.93, 0.1, "sine"]],
    attack: 0.002, decay: 1.2, sustain: 0.0, release: 1.8, filterHz: 7000,
  },
};

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

type Spark = { id: number; x: number; y: number; color: string; angle: number; dist: number };

function midiToFreq(midi: number) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function Play() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastNoteRef = useRef<number>(-1);
  const lastTimeRef = useRef<number>(0);
  const sparkIdRef = useRef(0);

  const [scale, setScale] = useState<Scale>("pentatonic");
  const [instrument, setInstrument] = useState<string>("Grand");
  const [rootMidi, setRootMidi] = useState(60); // C4
  const [volume, setVolume] = useState(0.25);
  const [reverb, setReverb] = useState(0.35);
  const [dragging, setDragging] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [, setActiveKey] = useState<number | null>(null);
  const [lastNote, setLastNote] = useState<string>("—");

  const scaleRef = useRef(scale);
  const instrRef = useRef(instrument);
  const rootRef = useRef(rootMidi);
  const volumeRef = useRef(volume);
  const reverbRef = useRef(reverb);
  useEffect(() => { scaleRef.current = scale; }, [scale]);
  useEffect(() => { instrRef.current = instrument; }, [instrument]);
  useEffect(() => { rootRef.current = rootMidi; }, [rootMidi]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { reverbRef.current = reverb; }, [reverb]);

  // Build a small impulse response for a feedback-delay "reverb" tail
  const reverbNodeRef = useRef<ConvolverNode | null>(null);
  const dryGainRef = useRef<GainNode | null>(null);
  const wetGainRef = useRef<GainNode | null>(null);

  function ensureCtx() {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      audioCtxRef.current = ctx;

      // build impulse response (2s exponential decay)
      const sr = ctx.sampleRate;
      const len = sr * 2;
      const impulse = ctx.createBuffer(2, len, sr);
      for (let ch = 0; ch < 2; ch++) {
        const data = impulse.getChannelData(ch);
        for (let i = 0; i < len; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
        }
      }
      const convolver = ctx.createConvolver();
      convolver.buffer = impulse;
      const dry = ctx.createGain();
      const wet = ctx.createGain();
      dry.gain.value = 1 - reverbRef.current;
      wet.gain.value = reverbRef.current;
      dry.connect(ctx.destination);
      convolver.connect(wet).connect(ctx.destination);
      reverbNodeRef.current = convolver;
      dryGainRef.current = dry;
      wetGainRef.current = wet;
    }
    // keep wet/dry mix updated
    if (dryGainRef.current && wetGainRef.current) {
      dryGainRef.current.gain.value = 1 - reverbRef.current;
      wetGainRef.current.gain.value = reverbRef.current;
    }
    return audioCtxRef.current!;
  }

  function playNote(midi: number) {
    const ctx = ensureCtx();
    const now = ctx.currentTime;
    const inst = INSTRUMENTS[instrRef.current];
    const freq = midiToFreq(midi);

    // master envelope
    const masterGain = ctx.createGain();
    const peak = volumeRef.current;
    const sustainLevel = Math.max(0.0001, peak * inst.sustain);
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(peak, now + inst.attack);
    masterGain.gain.exponentialRampToValueAtTime(
      Math.max(0.0001, sustainLevel || 0.0001),
      now + inst.attack + inst.decay,
    );
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + inst.attack + inst.decay + inst.release);

    // brightness rolls off for higher notes — like real strings
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = inst.filterHz;
    filter.Q.value = 0.7;

    masterGain.connect(filter);
    // send to dry + reverb
    if (dryGainRef.current) filter.connect(dryGainRef.current);
    if (reverbNodeRef.current) filter.connect(reverbNodeRef.current);

    const stopAt = now + inst.attack + inst.decay + inst.release + 0.1;
    for (const [mult, amp, wave] of inst.partials) {
      const osc = ctx.createOscillator();
      osc.type = wave;
      osc.frequency.value = freq * mult;
      if (inst.detune) osc.detune.value = (Math.random() * 2 - 1) * inst.detune;
      const g = ctx.createGain();
      g.gain.value = amp;
      osc.connect(g).connect(masterGain);
      osc.start(now);
      osc.stop(stopAt);
    }

    const name = NOTE_NAMES[midi % 12] + Math.floor(midi / 12 - 1);
    setLastNote(name);
  }



  function handlePointer(e: React.PointerEvent, isDown = false) {
    if (!dragging && !isDown) return;
    const el = canvasRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const steps = SCALES[scaleRef.current];
    const idx = Math.max(0, Math.min(steps.length - 1, Math.floor((x / rect.width) * steps.length)));
    const yFactor = 1 - y / rect.height; // higher = brighter
    const octaveBoost = Math.round(yFactor * 12);
    const midi = rootRef.current + steps[idx] + (octaveBoost - 6);

    const now = performance.now();
    if (midi !== lastNoteRef.current || now - lastTimeRef.current > 90) {
      playNote(midi);
      lastNoteRef.current = midi;
      lastTimeRef.current = now;
      setActiveKey(idx);

      // sparks
      const burst: Spark[] = Array.from({ length: 6 }, () => {
        const angle = Math.random() * Math.PI * 2;
        return {
          id: sparkIdRef.current++,
          x,
          y,
          color: `hsl(${(idx / steps.length) * 320 + 20}, 90%, 60%)`,
          angle,
          dist: 40 + Math.random() * 70,
        };
      });
      setSparks((s) => [...s.slice(-60), ...burst]);
      window.setTimeout(() => {
        setSparks((s) => s.filter((sp) => !burst.find((b) => b.id === sp.id)));
      }, 800);
    }
  }

  const steps = SCALES[scale];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="px-6 pt-16 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            ▸ Play — Drag piano canvas
          </div>
          <h1 className="font-display text-5xl md:text-7xl uppercase leading-none">
            Drag to <span className="text-[var(--accent-orange)]">make music.</span>
          </h1>
          <p className="mt-6 text-2xl max-w-2xl" style={{ fontFamily: "var(--font-hand)" }}>
            Hold &amp; drag across the canvas — X picks the note, Y the octave. Tune it live below.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Canvas */}
          <div className="ink-card p-3 overflow-hidden">
            <div
              ref={canvasRef}
              onPointerDown={(e) => {
                (e.target as Element).setPointerCapture?.(e.pointerId);
                setDragging(true);
                handlePointer(e, true);
              }}
              onPointerMove={(e) => handlePointer(e)}
              onPointerUp={() => { setDragging(false); setActiveKey(null); lastNoteRef.current = -1; }}
              onPointerLeave={() => { setDragging(false); setActiveKey(null); lastNoteRef.current = -1; }}
              className="relative w-full h-[480px] rounded-xl overflow-hidden cursor-crosshair select-none touch-none"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, oklch(0.3 0.15 280) 0%, transparent 50%)," +
                  "radial-gradient(circle at 70% 80%, oklch(0.35 0.18 340) 0%, transparent 50%)," +
                  "linear-gradient(135deg, oklch(0.15 0.05 280), oklch(0.1 0.04 250))",
              }}
            >
              {/* key columns */}
              <div className="absolute inset-0 grid pointer-events-none" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
                {steps.map((_, i) => (
                  <div key={i} className="border-l border-white/5 h-full" />
                ))}
              </div>

              {/* dragging hint */}
              <AnimatePresence>
                {!dragging && sparks.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="text-center">
                      <div className="font-display text-3xl md:text-5xl text-white/80 uppercase">Click &amp; Drag</div>
                      <div className="font-mono text-xs uppercase tracking-widest text-white/40 mt-2">
                        anywhere on the canvas
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* sparkles */}
              <AnimatePresence>
                {sparks.map((s) => (
                  <motion.div
                    key={s.id}
                    initial={{ x: s.x - 4, y: s.y - 4, opacity: 1, scale: 1 }}
                    animate={{
                      x: s.x - 4 + Math.cos(s.angle) * s.dist,
                      y: s.y - 4 + Math.sin(s.angle) * s.dist,
                      opacity: 0,
                      scale: 0.2,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute h-2 w-2 rounded-full pointer-events-none"
                    style={{ background: s.color, boxShadow: `0 0 12px ${s.color}` }}
                  />
                ))}
              </AnimatePresence>

              {/* last note readout */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/40 border border-white/20 font-mono text-xs uppercase tracking-widest text-white/90">
                {lastNote}
              </div>
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/40 border border-white/20 font-mono text-xs uppercase tracking-widest text-white/90">
                {scale}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="ink-card p-6 space-y-5">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              ▸ Tune your sound
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Scale</label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(Object.keys(SCALES) as Scale[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setScale(s)}
                    className={`px-3 py-1 rounded-full border-2 border-foreground text-[10px] font-mono uppercase tracking-widest transition-colors ${
                      scale === s ? "bg-foreground text-background" : "bg-card hover:bg-foreground/5"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Wave</label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {WAVES.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWave(w)}
                    className={`px-3 py-1 rounded-full border-2 border-foreground text-[10px] font-mono uppercase tracking-widest transition-colors ${
                      wave === w ? "bg-[var(--accent-orange)] text-foreground" : "bg-card hover:bg-foreground/5"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <Slider label={`Root note (${NOTE_NAMES[rootMidi % 12]}${Math.floor(rootMidi / 12 - 1)})`} min={36} max={84} step={1} value={rootMidi} onChange={setRootMidi} />
            <Slider label={`Volume ${(volume * 100).toFixed(0)}%`} min={0.01} max={0.5} step={0.01} value={volume} onChange={setVolume} />
            <Slider label={`Attack ${(attack * 1000).toFixed(0)}ms`} min={0.005} max={0.3} step={0.005} value={attack} onChange={setAttack} />
            <Slider label={`Release ${(release * 1000).toFixed(0)}ms`} min={0.1} max={2} step={0.05} value={release} onChange={setRelease} />

            <p className="text-xs text-muted-foreground font-mono leading-relaxed pt-2 border-t-2 border-foreground/10">
              tip: pentatonic + triangle wave = instant lo-fi. try sawtooth + blues for grit.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Slider({ label, min, max, step, value, onChange }: { label: string; min: number; max: number; step: number; value: number; onChange: (n: number) => void }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-2 w-full accent-[var(--accent-orange)]"
      />
    </div>
  );
}
