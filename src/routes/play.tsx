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

const WAVES: OscillatorType[] = ["sine", "triangle", "square", "sawtooth"];

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
  const [wave, setWave] = useState<OscillatorType>("sine");
  const [rootMidi, setRootMidi] = useState(60); // C4
  const [volume, setVolume] = useState(0.25);
  const [attack, setAttack] = useState(0.01);
  const [release, setRelease] = useState(0.6);
  const [dragging, setDragging] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [lastNote, setLastNote] = useState<string>("—");

  const scaleRef = useRef(scale);
  const waveRef = useRef(wave);
  const rootRef = useRef(rootMidi);
  const volumeRef = useRef(volume);
  const attackRef = useRef(attack);
  const releaseRef = useRef(release);
  useEffect(() => { scaleRef.current = scale; }, [scale]);
  useEffect(() => { waveRef.current = wave; }, [wave]);
  useEffect(() => { rootRef.current = rootMidi; }, [rootMidi]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { attackRef.current = attack; }, [attack]);
  useEffect(() => { releaseRef.current = release; }, [release]);

  function ensureCtx() {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new Ctx();
    }
    return audioCtxRef.current!;
  }

  function playNote(midi: number) {
    const ctx = ensureCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = waveRef.current;
    osc.frequency.value = midiToFreq(midi);

    const v = volumeRef.current;
    const a = attackRef.current;
    const r = releaseRef.current;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(v, now + a);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + a + r);

    // gentle lowpass for warmth
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 3500;

    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + a + r + 0.05);

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
              <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
                {steps.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      backgroundColor: activeKey === i ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0)",
                      borderColor: activeKey === i ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.06)",
                    }}
                    transition={{ duration: 0.2 }}
                    className="border-l h-full flex items-end justify-center pb-2"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                      {NOTE_NAMES[(rootMidi + steps[i]) % 12]}
                    </span>
                  </motion.div>
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
