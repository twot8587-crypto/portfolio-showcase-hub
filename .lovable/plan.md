# Populate Portfolio with Himanshu Sharma's Real Content

Replace all placeholder content across the site with the real details from the resume, keeping the existing visual style (cream/blueprint, orange accent, mono UI font) intact.

## Identity & contact (used everywhere)

- Name: **Himanshu Sharma**
- Role: **Full Stack MERN Developer + AI Product Engineer**
- Location: Noida, India
- Email: sonu.hs9557@gmail.com
- Phone: +91 9540520779
- LinkedIn: linkedin.com/in/himanshu-sharma-799030247
- GitHub: github.com/Himanshunashtech

Header logo text becomes "★ Himanshu **Sharma**". Footer signature, copyright, and all socials wired to the real URLs.

## Home (`/`)

- Hero pill: "▶ AVAILABLE FOR FREELANCE & FULL-TIME"
- Headline (4 lines, last line in orange highlight): `BUILD FAST. / SHIP SMART. / AI-POWERED / PRODUCTS.`
- Handwritten sub: "Full Stack MERN dev shipping AI-first products from Noida."
- Stats (4): `3+ YRS EXPERIENCE` · `8+ PROJECTS SHIPPED` · `1 STARTUP FOUNDED` · `500+ FOOD CATEGORIES (Caloi AI)`
- CTAs: **View Work →** (`/work`) and **Get in touch** (`/about`)
- Marquee: REACT · NODE.JS · MONGODB · SUPABASE · OPENAI · GEMINI · CLAUDE · REDIS · AWS · DOCKER · TAILWIND · TYPESCRIPT
- Featured work teaser: top 3 cards (Caloi AI, Tohfaverse, FloBord) linking to `/work`

## Work (`/work`)

Four real project cards, each with title, tag, year, description, and external links (Website / Play Store / GitHub where applicable):

1. **Caloi AI** — AI Health · 2025 · `Most Popular` ribbon — AI calorie/macro tracker, Gemini Vision, Android live on Play Store.
2. **Tohfaverse** — E-commerce · 2025 · `New` ribbon — Full-stack gift shop with AI gift-recommendation engine and admin panel.
3. **FloBord** — SaaS / Productivity · 2025 — Real-time collaborative workflow board with AI subtask assistant.
4. **UnitsConverters.in** — Web Tool · 2024 — High-performance unit converter with natural-language AI queries, 95+ PageSpeed.

Each card lists 2–3 impact bullets from the resume (latency wins, accuracy %, perf scores) and a Case Study / Visit link.

## Services (`/services`)

Three offerings derived from skills:

1. **Full Stack MERN Web Apps** — React, Node, Express, MongoDB, auth, REST APIs, deployment. Price pill: "From ₹40k / project".
2. **AI Integration & Automation** — OpenAI, Gemini, Claude, vision models, chatbots, RAG. Price pill: "From ₹25k / integration".
3. **MVP in 4–6 Weeks** — Supabase-powered MVPs with auth, payments, analytics, mobile build. Price pill: "From ₹60k / MVP".

Each row gets a checklist of deliverables and an alternating left/right layout.

## About (`/about`)

- Portrait placeholder labeled `himanshu.jpg`.
- H1: "I build small things on the internet. **Then I ship them to real users.**"
- Bio (handwritten font): real professional summary, condensed — 3+ years MERN, AI-first products, founder of Improvehealthtech LLC.
- Stat row: `3+ Years` · `8+ Projects` · `1 Startup`
- Experience timeline (compact): Naschtech (Intern, 2022–23), WebMobril (Full Stack, 2023–24), Improvehealthtech LLC (Founder, 2025–Present).
- Education: GL Bajaj MCA (CGPA 7.4), Rajiv Academy BCA (CGPA 6.8).
- Social pill buttons: GitHub, LinkedIn, Email (mailto:), Phone (tel:).
- Contact form action set to `mailto:sonu.hs9557@gmail.com`.

## Footer

- Tagline: "Building AI-first products from Noida — and showing you how."
- Social icons → real URLs.
- Copyright: "© 2026 Himanshu Sharma — Built with React, caffeine, and curiosity."

## SEO

Update every route's `head()` with Himanshu's name in title + description (e.g. "Himanshu Sharma — Full Stack MERN & AI Developer").

## Files to edit

- `src/components/SiteHeader.tsx` — logo text + CTA link.
- `src/components/SiteFooter.tsx` — real socials, tagline, copyright.
- `src/routes/index.tsx` — hero copy, stats, marquee, featured projects.
- `src/routes/work.tsx` — replace 6 placeholder projects with the 4 real ones + links.
- `src/routes/services.tsx` — 3 real services with prices.
- `src/routes/about.tsx` — bio, experience, education, real socials, mailto form.

No new dependencies, no backend, no design system changes — pure content swap.
