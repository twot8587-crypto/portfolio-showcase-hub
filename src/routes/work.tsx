import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import caloiImg from "@/assets/project-caloi.png";
import tohfaverseImg from "@/assets/project-tohfaverse.png";
import flobordImg from "@/assets/project-flobord.png";
import unitsImg from "@/assets/project-unitsconverter.png";
import radhikaImg from "@/assets/project-radhikafb.png";
import qrjiImg from "@/assets/project-qrji.png";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Himanshu Sharma" },
      { name: "description", content: "Selected projects by Himanshu Sharma: Caloi AI, Tohfaverse, FloBord and UnitsConverters.in — all built solo with MERN + AI." },
      { property: "og:title", content: "Work — Himanshu Sharma" },
      { property: "og:description", content: "AI-first products shipped solo." },
    ],
  }),
  component: Work,
});

type Link = { label: string; href: string };
type Project = {
  title: string;
  year: string;
  tag: string;
  image: string;
  ribbon?: string;
  desc: string;
  bullets: string[];
  links: Link[];
};

const projects: Project[] = [
  {
    title: "Caloi AI",
    year: "2025",
    tag: "AI Health",
    ribbon: "Most Popular",
    image: caloiImg,
    desc: "AI-driven calorie tracker that analyzes food images to estimate calories, macros & glucose impact.",
    bullets: [
      "Gemini Vision API — 90%+ accuracy across 500+ food categories",
      "Sub-2s recognition via Redis caching + parallel async calls",
      "Shipped MVP in <6 weeks on Supabase (auth + DB + storage)",
    ],
    links: [
      { label: "Website", href: "#" },
      { label: "Play Store", href: "#" },
    ],
  },
  {
    title: "Tohfaverse",
    year: "2025",
    tag: "E-commerce",
    ribbon: "New",
    image: tohfaverseImg,
    desc: "Full-stack gift e-commerce platform with admin panel and AI-powered gift recommendations.",
    bullets: [
      "AI gift-recommendation engine based on recipient & occasion",
      "~40% faster feature delivery via modular Express routes",
      "MongoDB indexing + aggregation — sub-120ms API responses",
    ],
    links: [
      { label: "Website", href: "#" },
    ],
  },
  {
    title: "FloBord",
    year: "2025",
    tag: "SaaS / Productivity",
    image: flobordImg,
    desc: "Collaborative workflow board with drag-and-drop cards, real-time sync and an AI task assistant.",
    bullets: [
      "AI assistant auto-generates subtasks, deadlines & priorities",
      "WebSocket + optimistic UI — zero-lag concurrent editing",
      "React Query caching cut redundant API calls by ~60%",
    ],
    links: [
      { label: "Website", href: "#" },
    ],
  },
  {
    title: "UnitsConverters.in",
    year: "2024",
    tag: "Web Tool",
    image: unitsImg,
    desc: "High-performance unit conversion site with natural-language AI queries and 95+ PageSpeed score.",
    bullets: [
      "Natural-language AI input — e.g. \"5 miles to km\"",
      "95+ PageSpeed via code splitting, lazy load & pre-render",
      "Pure utility functions — instant client-side calculations",
    ],
    links: [
      { label: "Website", href: "https://www.unitsconverter.in" },
    ],
  },
  {
    title: "RadhikaFB.in",
    year: "2025",
    tag: "Boutique / E-commerce",
    image: radhikaImg,
    desc: "Couture boutique showcase for a ladies' suits atelier — heritage Lucknowi craft meets modern silhouettes.",
    bullets: [
      "Editorial hero with cinematic atelier imagery & gold accents",
      "Bespoke fitting booking flow + collection lookbook",
      "Pixel-perfect typography pairing (serif display + clean sans)",
    ],
    links: [
      { label: "Website", href: "https://radhikafb.in" },
    ],
  },
  {
    title: "qrji",
    year: "2025",
    tag: "Web Tool",
    image: qrjiImg,
    desc: "Pro QR code generator with batch generation, custom logos, circular rings, code snippets & 15+ QR types.",
    bullets: [
      "15+ QR types — URL, WiFi, Bitcoin, vCard, UPI, Events & more",
      "Batch generation + custom logo with auto circular ring",
      "Built-in scanner, history, and shareable code snippets",
    ],
    links: [
      { label: "Website", href: "https://qrji.netlify.app" },
    ],
  },
];

function Work() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="px-6 pt-16 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            ▸ Work — Selected projects
          </div>
          <h1 className="font-display text-6xl md:text-8xl uppercase leading-none">
            Stuff I&apos;ve <span className="text-[var(--accent-orange)]">actually shipped.</span>
          </h1>
          <p className="mt-6 text-2xl max-w-2xl" style={{ fontFamily: "var(--font-hand)" }}>
            A mix of AI products, SaaS tools and weekend experiments — all built solo.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <article key={i} className="ink-card p-6 relative group flex flex-col min-w-0 overflow-hidden">
              {p.ribbon && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-[var(--accent-orange)] border-2 border-foreground rounded-full text-[10px] font-mono uppercase tracking-widest">
                  {p.ribbon}
                </div>
              )}
              <div className="rounded-2xl border-2 border-foreground/80 mb-5 overflow-hidden bg-card">
                <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" className="block w-full h-auto" />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>{p.tag}</span><span>{p.year}</span>
              </div>
              <h3 className="font-display text-3xl mt-1 break-words">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground break-words">{p.desc}</p>
              <ul className="mt-4 space-y-1.5 text-sm font-mono">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2"><span className="text-[var(--accent-orange)] shrink-0">▸</span><span className="min-w-0 break-words">{b}</span></li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-ghost text-xs px-3 py-1.5">
                    {l.label} <ArrowUpRight className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
