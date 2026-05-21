import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Himanshu Sharma" },
      { name: "description", content: "MERN web apps, AI integrations, and 4–6 week MVPs by Himanshu Sharma." },
      { property: "og:title", content: "Services — Himanshu Sharma" },
      { property: "og:description", content: "MERN web apps, AI integrations, and rapid MVPs." },
    ],
  }),
  component: Services,
});

const services = [
  {
    badge: "Most Popular",
    tag: "Build — Ongoing",
    title: "Full Stack MERN Web Apps",
    price: "From ₹40k",
    desc: "Production-ready web apps with React, Node, Express & MongoDB — auth, REST APIs, payments, and cloud deployment included.",
    bullets: [
      "React + TypeScript frontend, mobile-first responsive UI",
      "Secure REST APIs with JWT auth & role-based access",
      "MongoDB / Supabase data layer with optimized queries",
      "Deployed on AWS / Vercel with CI/CD & handover docs",
    ],
  },
  {
    tag: "AI — 1–3 weeks",
    title: "AI Integration & Automation",
    price: "From ₹25k",
    desc: "Add real intelligence to your product — OpenAI, Gemini, Claude — chatbots, vision, RAG, and automated workflows.",
    bullets: [
      "OpenAI / Gemini / Claude integration into existing stack",
      "Custom AI chatbots & RAG with vector search",
      "Image & document analysis (Gemini Vision, OCR)",
      "Prompt engineering, caching & cost optimization",
    ],
  },
  {
    tag: "MVP — 4–6 weeks",
    title: "MVP in 4–6 Weeks",
    price: "From ₹60k",
    desc: "From idea to live product in under 6 weeks — Supabase-powered MVP with auth, payments, analytics, and optional mobile build.",
    bullets: [
      "Discovery + spec, design, build & launch",
      "Supabase auth, database, storage & realtime",
      "Payment integration (Razorpay / Stripe)",
      "Optional Android build & Play Store launch",
    ],
  },
  {
    tag: "App — 3–6 weeks",
    title: "AI App Building (Web + Android)",
    price: "From ₹50k",
    desc: "End-to-end AI-powered apps — from idea to a live Android/web product with AI features baked in (vision, chat, recommendations).",
    bullets: [
      "AI-first product design — vision, chatbots, RAG, recommendations",
      "React + React Native / Capacitor Android build",
      "Play Store launch, OTA updates & crash analytics",
      "Backend on Supabase / Node with secure API key handling",
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
            Build smarter. <br /><span className="text-[var(--accent-orange)]">Ship faster.</span>
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
              <div className="flex md:flex-col items-end md:items-stretch gap-4 md:min-w-[200px]">
                <div className="font-display text-3xl md:text-4xl">{s.price}</div>
                <a href="mailto:sonu.hs9557@gmail.com" className="pill-btn pill-btn-primary w-full justify-center">
                  Hire me <ArrowRight className="h-4 w-4" />
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
