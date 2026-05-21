import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Contact — Himanshu Sharma" },
      { name: "description", content: "Himanshu Sharma — Full Stack MERN Developer & founder of Improvehealthtech LLC. Based in Noida, India." },
      { property: "og:title", content: "About — Himanshu Sharma" },
      { property: "og:description", content: "Full Stack MERN Developer & AI Product Engineer." },
    ],
  }),
  component: About,
});

const socials = [
  { Icon: Github, label: "GitHub", href: "https://github.com/Himanshunashtech" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/himanshu-sharma-799030247" },
  { Icon: Mail, label: "sonu.hs9557@gmail.com", href: "mailto:sonu.hs9557@gmail.com" },
  { Icon: Phone, label: "+91 9540520779", href: "tel:+919540520779" },
];

const experience = [
  {
    role: "Founder & Product Engineer",
    company: "Improvehealthtech LLC",
    period: "Jan 2025 – Present",
    desc: "Built Caloi AI — an AI-powered health platform that analyzes food images for calories, macros, glucose impact and nutrition. Live on Google Play.",
  },
  {
    role: "Full Stack Developer",
    company: "WebMobril Technologies Pvt Ltd",
    period: "Apr 2023 – Dec 2024",
    desc: "Built scalable MERN apps with Redis & Supabase, real-time features, payment integrations, and cloud deployments for multiple production clients.",
  },
  {
    role: "Full Stack Developer Intern",
    company: "Naschtech Pvt Ltd",
    period: "Nov 2022 – Apr 2023",
    desc: "Built React + Node apps with JWT auth & RBAC, optimized API performance, and shipped production fixes alongside senior devs.",
  },
];

const education = [
  { degree: "MCA", school: "GL Bajaj Institute of Technology and Management", period: "2021 – 2023", cgpa: "7.4 CGPA" },
  { degree: "BCA", school: "Rajiv Academy for Technology and Management", period: "2018 – 2021", cgpa: "6.8 CGPA" },
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
              himanshu.jpg
            </div>
            <div>
              <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95]">
                I build small things <br />on the internet. <br />
                <span className="text-[var(--accent-orange)]">Then I ship them to real users.</span>
              </h1>
              <p className="mt-6 text-xl max-w-2xl" style={{ fontFamily: "var(--font-hand)" }}>
                Hi, I&apos;m <strong>Himanshu Sharma</strong> — a Full Stack MERN developer
                based in Noida with 3+ years building scalable web apps. I founded
                Improvehealthtech LLC and ship AI-first products using React, Node,
                MongoDB and the OpenAI / Gemini / Claude APIs.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                {[
                  { v: "3+", l: "Years" },
                  { v: "8+", l: "Projects" },
                  { v: "1", l: "Startup" },
                ].map((s) => (
                  <div key={s.l} className="ink-card px-4 py-3 text-center">
                    <div className="font-display text-2xl">{s.v}</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {socials.map(({ Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-ghost text-xs px-3 py-1.5">
                    <Icon className="h-3.5 w-3.5" /> {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            ▸ Experience
          </div>
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-8">
            Where I&apos;ve <span className="text-[var(--accent-orange)]">built things.</span>
          </h2>
          <div className="space-y-4">
            {experience.map((e) => (
              <div key={e.company} className="ink-card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl">{e.role}</h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{e.period}</span>
                </div>
                <div className="font-mono text-sm text-[var(--accent-orange)] mt-1">{e.company}</div>
                <p className="mt-3 text-sm text-muted-foreground">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            ▸ Education
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {education.map((ed) => (
              <div key={ed.degree} className="ink-card p-6">
                <div className="font-display text-2xl">{ed.degree}</div>
                <div className="font-mono text-sm mt-1">{ed.school}</div>
                <div className="mt-2 flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  <span>{ed.period}</span><span>{ed.cgpa}</span>
                </div>
              </div>
            ))}
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
            action="mailto:sonu.hs9557@gmail.com"
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
