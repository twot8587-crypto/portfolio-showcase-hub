import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import caloiImg from "@/assets/project-caloi.png";
import tohfaverseImg from "@/assets/project-tohfaverse.png";
import flobordImg from "@/assets/project-flobord.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Himanshu Sharma — Full Stack MERN & AI Developer" },
      { name: "description", content: "Full Stack MERN Developer & AI Product Engineer from Noida. Shipping AI-first web and mobile products with React, Node, MongoDB and OpenAI/Gemini." },
      { property: "og:title", content: "Himanshu Sharma — Full Stack MERN & AI Developer" },
      { property: "og:description", content: "Shipping AI-first products with React, Node & Gemini." },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "3+", label: "Years experience" },
  { value: "8+", label: "Projects shipped" },
  { value: "1", label: "Startup founded" },
  { value: "500+", label: "Food categories trained" },
];

const tags = [
  "REACT", "NODE.JS", "MONGODB", "SUPABASE", "OPENAI", "GEMINI",
  "CLAUDE", "REDIS", "AWS", "DOCKER", "TAILWIND", "TYPESCRIPT",
];

const featured = [
  { title: "Caloi AI", tag: "AI Health", price: "Live on Play Store", ribbon: "Most Popular", image: caloiImg },
  { title: "Tohfaverse", tag: "E-commerce", price: "Live", ribbon: "New", image: tohfaverseImg },
  { title: "FloBord", tag: "SaaS", price: "Live", image: flobordImg },
];

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative px-6 pt-16 pb-24 text-center">
        <div className="mx-auto max-w-5xl">
          <div className="pill-chip mx-auto mb-10">
            <Play className="h-3 w-3 fill-foreground" /> Available for freelance &amp; full-time
          </div>

          <h1 className="font-display text-[14vw] md:text-[9rem] leading-[0.95] uppercase">
            <span className="block">Build Fast.</span>
            <span className="block">Ship Smart.</span>
            <span className="block">AI-Powered</span>
            <span className="block mt-3"><span className="highlight-bar">Products.</span></span>
          </h1>

          <p className="mt-10 text-3xl md:text-4xl" style={{ fontFamily: "var(--font-hand)" }}>
            Full Stack MERN dev shipping AI-first products from Noida.
          </p>

          {/* stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {stats.map((s) => (
              <div key={s.label} className="ink-card px-6 py-3 min-w-[8rem]">
                <div className="font-display text-2xl">{s.value}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/work" className="pill-btn pill-btn-primary">
              See my work <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/about" className="pill-btn pill-btn-ghost">
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* TAG MARQUEE */}
      <div className="border-y-2 border-foreground py-4 bg-card">
        <div className="marquee">
          <div className="marquee-track font-mono text-xs uppercase tracking-widest">
            {[...tags, ...tags].map((t, i) => (
              <span key={i} className="flex items-center gap-10">
                {t} <span className="text-[var(--accent-orange)]">★</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED WORK TEASER */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            ▸ 01 — Featured Work
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none max-w-3xl">
            Products I&apos;ve <span className="text-[var(--accent-orange)]">actually shipped.</span>
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((p, i) => (
              <div key={i} className="ink-card p-6 relative">
                {p.ribbon && (
                  <div className="absolute -top-3 left-4 px-3 py-1 bg-[var(--accent-orange)] border-2 border-foreground rounded-full text-[10px] font-mono uppercase tracking-widest">
                    {p.ribbon}
                  </div>
                )}
                <div className="aspect-square rounded-2xl border-2 border-foreground/80 mb-5 overflow-hidden bg-card">
                  <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" className="w-full h-full object-cover object-top" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{p.tag}</div>
                <h3 className="font-display text-2xl mt-1">{p.title}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-sm">{p.price}</span>
                  <Link to="/work" className="pill-btn pill-btn-primary text-xs px-3 py-1.5">
                    View <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
