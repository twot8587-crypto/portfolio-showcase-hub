# Portfolio Site — "The Solo Entrepreneur" Visual Match

Build a personal portfolio website that exactly matches the visual language of thesoloentrepreneur.in: cream/paper background with a faint blueprint grid, bold blocky display type, monospace UI text, orange highlight bar behind key words, and pill-shaped buttons with hard drop shadows.

Since you didn't share personal details, I'll scaffold every section with clearly-marked placeholder content (name, projects, links, stats) that you can edit in chat afterwards.

## Pages (separate routes for SEO)

- `/` — Home: hero + stats + marquee tags + featured work teaser
- `/work` — Projects grid with case-study cards
- `/services` — What you offer (styled like the reference's "Products" section)
- `/about` — About + contact (form + socials)

Shared header (logo + nav + "Get in touch" pill button) and footer on all routes.

## Visual system (locked tokens in `src/styles.css`)

- Background: `#faf6ec` (cream) with SVG blueprint-grid overlay + faint play-icon marks
- Foreground/ink: near-black `#0e0e0e`
- Accent: orange `#ff5a1f` (used for highlight bar, primary buttons, accent words)
- Muted ink: `#6b6b6b` for captions
- Display font: a heavy condensed-ish blocky sans (VT323/Press Start feel won't work — use **"Rubik Mono One"** or **"Bowlby One"** via Google Fonts for the giant headings)
- UI font: **"JetBrains Mono"** for nav, buttons, labels, stats (the pixelated/monospace feel)
- Body font: **"Caveat"** or **"Kalam"** for the handwritten subtitle line
- Buttons: fully-rounded pill, 2px ink border, 4px hard offset shadow, monospace label with arrow
- Stat cards: white card, 1px ink border, soft shadow, big mono number + small caption
- Hero highlight: orange rectangle behind one word/phrase, slight rotation

## Hero composition (match exactly)

- Centered "▶ NEW VIDEO EVERY WEEK" pill chip
- 4-line giant headline: `BUILD SMARTER. / AUTOMATE MORE. / EARN ONLINE.` with the last line wrapped in the orange highlight bar
- Handwritten sub: "Resources, tools and ideas for solo entrepreneurs."
- 4 stat pills in a row
- Two CTAs: filled orange pill + outline pill
- Marquee strip of tag chips below ("• AI • AUTOMATION • ONLINE BUSINESS • …")

## Sections on other routes

- Work: card grid with sketched-paper card style, "Most Popular" / "New" orange ribbon labels
- Services: stacked alternating rows (image left/right) like the reference's product detail blocks with checklist bullets and price pill
- About: portrait circle + bold heading with one orange-highlighted phrase, stat row, social buttons, simple contact form

## Tech notes

- TanStack Start file routes: `index.tsx`, `work.tsx`, `services.tsx`, `about.tsx`; shared `Header`/`Footer` components in `src/components/`
- Each route gets unique `head()` meta (title, description, og:*)
- Background grid implemented as a tiling CSS `background-image` (inline SVG data-uri) on `body`
- Google Fonts loaded via `<link>` in `__root.tsx` head
- All colors as oklch tokens in `src/styles.css` (`--background`, `--foreground`, `--primary` for orange, plus `--ink`, `--paper`, `--accent`)
- Marquee tag strip = pure CSS keyframe animation
- Form: client-only (mailto: action) unless you ask for Lovable Cloud later

## Placeholder content I'll fill in

- Name: "Your Name" / Role: "Indie Maker & Designer"
- 4 stats: Projects shipped / Years building / GitHub stars / Coffees
- 6 project cards with placeholder titles + generated thumbnails
- 3 services with prices
- Social links: GitHub, X, LinkedIn, YouTube, Email (all `#` until you give me yours)

After build, send me your real name, bio, projects, links, and stats and I'll swap them in.
