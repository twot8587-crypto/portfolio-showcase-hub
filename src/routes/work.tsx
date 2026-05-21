import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Your Name" },
      { name: "description", content: "Selected projects, side-bets and experiments shipped by Your Name." },
      { property: "og:title", content: "Work — Your Name" },
      { property: "og:description", content: "Selected projects and experiments." },
    ],
  }),
  component: Work,
});

const projects = [
  { title: "Notion Clone", year: "2025", tag: "SaaS", ribbon: "Most Popular", desc: "Real-time collaborative docs built from scratch in TypeScript." },
  { title: "AI Resume Builder", year: "2025", tag: "AI Tool", ribbon: "New", desc: "Generate tailored resumes in seconds using GPT + custom prompts." },
  { title: "Indie Maker Newsletter", year: "2024", tag: "Content", desc: "Weekly notes for solo founders. 4.2K subscribers." },
  { title: "Pixel Icon Pack", year: "2024", tag: "Design", desc: "240 hand-drawn monoline icons for indie apps." },
  { title: "Habit OS", year: "2023", tag: "Mobile", desc: "Tiny habit tracker that respects your attention." },
  { title: "DevTool CLI", year: "2023", tag: "Open Source", desc: "Generate Tailwind themes from a single image." },
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
            A mix of products, tools, and weekend experiments — all built solo.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <article key={i} className="ink-card p-6 relative group">
              {p.ribbon && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-[var(--accent-orange)] border-2 border-foreground rounded-full text-[10px] font-mono uppercase tracking-widest">
                  {p.ribbon}
                </div>
              )}
              <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-foreground/30 mb-5 flex items-center justify-center text-muted-foreground font-mono text-xs">
                {p.title.toLowerCase().replace(/\s+/g, "-")}.png
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>{p.tag}</span><span>{p.year}</span>
              </div>
              <h3 className="font-display text-2xl mt-1">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <a href="#" className="mt-5 pill-btn pill-btn-ghost text-xs px-3 py-1.5">
                Case study <ArrowUpRight className="h-3 w-3" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
