import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Github, Twitter, Linkedin, Youtube, Mail } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Contact — Your Name" },
      { name: "description", content: "About Your Name — solo maker, indie hacker, designer. Get in touch." },
      { property: "og:title", content: "About — Your Name" },
      { property: "og:description", content: "Solo maker, indie hacker, designer." },
    ],
  }),
  component: About,
});

const socials = [
  { Icon: Github, label: "GitHub", href: "#" },
  { Icon: Twitter, label: "Twitter / X", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
  { Icon: Mail, label: "hello@example.com", href: "mailto:hello@example.com" },
];

function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="px-6 pt-16 pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            ▸ About — Who&apos;s behind this
          </div>

          <div className="grid gap-10 md:grid-cols-[200px_1fr] items-start">
            <div className="w-44 h-44 rounded-full border-2 border-foreground bg-card flex items-center justify-center font-mono text-xs text-muted-foreground shadow-[6px_6px_0_0_var(--ink)]">
              your-photo.jpg
            </div>
            <div>
              <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95]">
                I build small <br />things on the internet. <br />
                <span className="text-[var(--accent-orange)]">Then I show you how.</span>
              </h1>
              <p className="mt-6 text-xl max-w-2xl" style={{ fontFamily: "var(--font-hand)" }}>
                Hi, I&apos;m <strong>Your Name</strong> — a solo maker based somewhere on Earth.
                I design, code, and ship products on my own. This portfolio is my workshop:
                projects I&apos;m proud of, services I offer, and notes from the journey.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                {[
                  { v: "24+", l: "Projects" },
                  { v: "7yrs", l: "Building" },
                  { v: "12K+", l: "Stars" },
                ].map((s) => (
                  <div key={s.l} className="ink-card px-4 py-3 text-center">
                    <div className="font-display text-2xl">{s.v}</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {socials.map(({ Icon, label, href }) => (
                  <a key={label} href={href} className="pill-btn pill-btn-ghost text-xs px-3 py-1.5">
                    <Icon className="h-3.5 w-3.5" /> {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl ink-card p-8 md:p-10">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
            ▸ Contact
          </div>
          <h2 className="font-display text-4xl md:text-5xl uppercase">
            Let&apos;s <span className="text-[var(--accent-orange)]">build something.</span>
          </h2>
          <form
            className="mt-8 grid gap-4"
            action="mailto:hello@example.com"
            method="post"
            encType="text/plain"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-[10px] font-mono uppercase tracking-widest">Name</span>
                <input
                  required
                  name="name"
                  className="mt-1 w-full rounded-lg border-2 border-foreground bg-background px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-mono uppercase tracking-widest">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-1 w-full rounded-lg border-2 border-foreground bg-background px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-[10px] font-mono uppercase tracking-widest">Message</span>
              <textarea
                required
                rows={5}
                name="message"
                className="mt-1 w-full rounded-lg border-2 border-foreground bg-background px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]"
              />
            </label>
            <button type="submit" className="pill-btn pill-btn-primary justify-center">
              Send message <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
