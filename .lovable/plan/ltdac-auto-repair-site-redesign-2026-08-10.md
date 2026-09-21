# LTDAC — Auto Repair Site Redesign

A modern, animated, fully responsive marketing site for LTDAC auto repair, built on the current blank template.

## Look and feel

- Palette: dark garage charcoal (#1a1a1a / #2d2d2d / #4a4a4a) with an ember orange accent (#e85d3a) for CTAs, highlights, and hover states.
- Type: Sora for headings, Manrope for body.
- Sharp-but-soft corners, layered depth, subtle grain/gradient panels — industrial, not soft-wellness.

## Homepage structure

1. **Hero — service pitch first.** Full-bleed dark hero with a generated shop/mechanic image, a headline pitching the services ("Expert auto repair, done right the first time"), a short support line, one primary CTA (Book a service) and a phone link. Below the headline: a compact row of the core service pills (Diagnostics, Brakes, Oil & Fluids, AC, Tires, Engine) so the offer is visible instantly. Stacks cleanly to a single column on mobile.
2. **Services grid** — 6 cards with icon, title, one-line description, hover lift.
3. **Why choose us** — certified techs, warranty, transparent pricing, fast turnaround; counter stats that animate on scroll.
4. **How it works** — 3 steps (Book → Diagnose → Drive away).
5. **Testimonials** — customer quotes.
6. **Contact / booking band** — phone 1234567890, location (US), hours, and a booking form (front-end only, no backend).
7. **Footer** — logo, nav, hours, phone.

## Animations and transitions

- Scroll-reveal fades/slide-ups per section with staggered children.
- Hero text stagger on load; parallax drift on the hero image.
- Card hover: lift + accent border + icon color shift; buttons with smooth accent transitions.
- Animated stat counters; smooth anchor scrolling. All motion respects `prefers-reduced-motion`.

## Responsiveness

Mobile-first: grid-based header rows with `min-w-0` / `shrink-0`, single-column stacks under `sm`, 2-col at `md`, 3-col at `lg`. Tap targets sized for mobile; sticky mobile call button.

## Technical notes

- Rewrite `src/routes/index.tsx` as the homepage; extract sections into `src/components/home/*` (Hero, Services, WhyUs, Process, Testimonials, ContactBand, Footer, SiteHeader).
- Add design tokens (charcoal scale, ember accent, gradients, shadows) to `src/styles.css` under `:root` + `@theme inline` in oklch — no hardcoded color utilities in components.
- Load Sora + Manrope via `<link>` in `src/routes/__root.tsx`, register `--font-display` / `--font-body` in `@theme`.
- Animation via Motion for React (`motion`) plus CSS keyframes for lightweight effects.
- Generate hero and supporting imagery into `src/assets/`.
- Route-level `head()` on `/` with LTDAC-specific title, description, og/twitter tags, plus AutoRepair JSON-LD.
- Booking form is presentational only. If you later want real bookings/emails, that needs Lovable Cloud — say the word and I'll add it.
