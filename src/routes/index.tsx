import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Name — Solo Maker & Indie Builder" },
      { name: "description", content: "I build small businesses on the internet. Projects, services, and ideas for solo makers." },
      { property: "og:title", content: "Your Name — Solo Maker" },
      { property: "og:description", content: "I build small businesses on the internet." },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "24+", label: "Projects shipped" },
  { value: "7", label: "Years building" },
  { value: "12K+", label: "GitHub stars" },
  { value: "∞", label: "Cups of coffee" },
];

const tags = [
  "AI", "AUTOMATION", "INDIE HACKING", "DESIGN", "TYPESCRIPT", "OPEN SOURCE",
  "BASED IN BANGALORE", "BUILD IN PUBLIC", "PRODUCT DESIGN", "NO-CODE",
];

const featured = [
  { title: "Notion Clone", tag: "SaaS", price: "Live" },
  { title: "AI Resume Builder", tag: "AI Tool", price: "$19" },
  { title: "Indie Maker Newsletter", tag: "Content", price: "Free" },
];

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative px-6 pt-16 pb-24 text-center">
        <div className="mx-auto max-w-5xl">
          <div className="pill-chip mx-auto mb-10">
            <Play className="h-3 w-3 fill-foreground" /> New project every month
          </div>

          <h1 className="font-display text-[14vw] md:text-[9rem] leading-[0.95] uppercase">
            <span className="block">Build</span>
            <span className="block">Small.</span>
            <span className="block">Ship Fast.</span>
            <span className="block mt-3"><span className="highlight-bar">Live Free.</span></span>
          </h1>

          <p className="mt-10 text-3xl md:text-4xl" style={{ fontFamily: "var(--font-hand)" }}>
            Portfolio &amp; playground of a solo maker on the internet.
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
            <Link to="/services" className="pill-btn pill-btn-ghost">
              What I offer
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
            Stuff that&apos;ll <span className="text-[var(--accent-orange)]">move the needle.</span>
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((p, i) => (
              <div key={i} className="ink-card p-6 relative">
                {i === 0 && (
                  <div className="absolute -top-3 left-4 px-3 py-1 bg-[var(--accent-orange)] border-2 border-foreground rounded-full text-[10px] font-mono uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-foreground/30 mb-5 flex items-center justify-center text-muted-foreground font-mono text-xs">
                  preview.png
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
