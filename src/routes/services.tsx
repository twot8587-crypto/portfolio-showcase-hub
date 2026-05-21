import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Your Name" },
      { name: "description", content: "1:1 consults, build packages, and design sprints for solo founders." },
      { property: "og:title", content: "Services — Your Name" },
      { property: "og:description", content: "1:1 consults, build packages, and design sprints." },
    ],
  }),
  component: Services,
});

const services = [
  {
    badge: "Most Popular",
    tag: "1:1 — 60 min",
    title: "Strategy Call",
    price: "$199",
    desc: "A focused call to unblock your launch, your stack, or your idea. You leave with a clear next 7-day plan.",
    bullets: [
      "60 minutes of deep work, just us two",
      "Async follow-up: notes + action items",
      "Stack & tool recommendations",
      "Honest, no-fluff feedback",
    ],
  },
  {
    tag: "Build — 2 weeks",
    title: "MVP Sprint",
    price: "$2,400",
    desc: "I design, build, and ship a single-page MVP for your idea — Next.js, Tailwind, deployed and live.",
    bullets: [
      "Discovery call + spec",
      "Designed in Figma, built in TypeScript",
      "Auth, DB, and email included",
      "Deployed live with handover docs",
    ],
  },
  {
    tag: "Design — 5 days",
    title: "Landing Page Sprint",
    price: "$1,200",
    desc: "From blank canvas to a copy-tight, conversion-ready landing page in 5 working days.",
    bullets: [
      "Custom design (no templates)",
      "Mobile-first, Lighthouse 95+",
      "Copywriting included",
      "2 rounds of revisions",
    ],
  },
];

function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="px-6 pt-16 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            ▸ Services — How I can help
          </div>
          <h1 className="font-display text-6xl md:text-8xl uppercase leading-none">
            Stuff that&apos;ll <br /><span className="text-[var(--accent-orange)]">move your needle.</span>
          </h1>
          <p className="mt-6 text-2xl max-w-2xl" style={{ fontFamily: "var(--font-hand)" }}>
            Pick the smallest thing that solves your biggest problem.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl space-y-10">
          {services.map((s, i) => (
            <div key={i} className="ink-card p-8 md:p-10 grid gap-8 md:grid-cols-[1fr_auto] items-start relative">
              {s.badge && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-[var(--accent-orange)] border-2 border-foreground rounded-full text-[10px] font-mono uppercase tracking-widest">
                  {s.badge}
                </div>
              )}
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.tag}</div>
                <h3 className="font-display text-4xl md:text-5xl uppercase mt-2">{s.title}</h3>
                <p className="mt-4 text-base text-muted-foreground max-w-xl">{s.desc}</p>
                <ul className="mt-6 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm font-mono">
                      <Check className="h-4 w-4 mt-0.5 text-[var(--accent-orange)] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex md:flex-col items-end md:items-stretch gap-4 md:min-w-[180px]">
                <div className="font-display text-4xl md:text-5xl">{s.price}</div>
                <a href="#" className="pill-btn pill-btn-primary w-full justify-center">
                  Book now <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
