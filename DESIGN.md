# Design

<!-- impeccable:design-schema 1 -->

## Site structure

Multi-page site (converted from a single-page scroll site per user request). Routes live under a shared pathless layout (`src/routes/_layout.tsx`, header + outlet + footer) with one file per page in `src/routes/_layout/`:

- `/` — Hero + `Stats` + `TrustMarquee` + `ProcessInMotion` + `ExploreLinks`.
  - `TrustMarquee`: a full-bleed `brand-gradient` band with real facts (years in business, MA inspection station status, Google rating, services) scrolling in an infinite CSS-keyframe loop (`animate-marquee` in `styles.css`), pausing on hover and disabled under `prefers-reduced-motion`.
  - `ProcessInMotion`: a scroll-driven "reactive video" moment (user request: "something more like a video... but reactive") — no fabricated footage was used; it's built from the one real garage photo already on the site (`hero-garage.jpg`) plus Framer Motion's `useScroll`/`useTransform`. A `position: sticky` viewport-height stage pins while the wrapping `h-[300vh]` section scrolls past; scroll progress drives a photo zoom and counter-parallax (1.18 → 1 with a ±4% Y drift, both skipped under `prefers-reduced-motion`) and steps through the same three real process steps as `/process` (shared via `PROCESS_STEPS` in `shop.ts`, consumed by both `Process.tsx` and this component so they can't drift), highlighting the active one and filling a bottom progress bar like a video scrubber. Pure CSS `position: sticky` + passive scroll-progress reads — no scroll-hijacking, keyboard/wheel scrolling behaves normally throughout.

  Rebuilt 2026-08-18 after the user called the section "basic": scroll progress now runs through a `useSpring` so the zoom, parallax, rail and scrubber all ease rather than tracking the wheel step-for-step. The bare numbered badges became per-step lucide icons (`CalendarCheck` / `ClipboardList` / `KeyRound`) on a vertical timeline rail whose `brand-gradient` fill scales with scroll, giving the steps a spine instead of leaving them floating. Each step carries a third line (`detail` in `PROCESS_STEPS`) naming the concrete commitment — same-day drop-off, nothing fixed before you approve, free loaner cars. Past steps hold a lit-but-quiet state (`bg-white/20`) distinct from not-yet-reached (`bg-white/10`), so the rail reads as progress rather than as on/off. Step copy fades on opacity only; it is never height-collapsed, so the layout does not jump as the active step changes.
  - `ExploreLinks`: a divided-list nav into the other five pages, styled distinctly from every other section's list treatment.
- `/why-us`, `/services`, `/process`, `/reviews`, `/contact` — each pairs a `PageHeader` (`h1` + one-line orienting description; the breadcrumb was removed — it repeated the `h1` immediately below it, e.g. "Home / Contact" directly above "Contact") with the pre-existing section component, then a page-specific enrichment so the sub-pages read as informative rather than thin:
  - Why Us, Services, Process, Contact each end in an `FAQSection` (built on the pre-existing, previously-unused shadcn `Accordion`) — every Q&A is grounded in facts already established elsewhere on the site (hours, written estimates, loaner cars, insurance coordination), nothing invented for length.
  - Reviews includes a "Leave a review on Google" CTA linking to the verified Google listing (`SHOP.googleUrl`).
  - Contact gained a real Google Maps embed (`SHOP.mapsEmbedUrl`/`mapsUrl`, the shop's actual verified address, no API key needed) plus its own FAQ.

`NAV` in `shop.ts` is the single source of truth for labels, route paths, and one-line descriptions — both the header/footer nav and the home page's `ExploreLinks` read from it. Header/footer nav links use TanStack Router's `Link` (not `<a href="#...">`) with `activeProps` so the current page highlights in `text-primary`, on both desktop and mobile nav.

## World

Clean shop-white surface with the Gulf brand's two real colors — signage orange and signage navy — instead of a single-accent-plus-neutrals system. Replaces the prior owner's signage-red-on-neutral-gray system. Both colors were sampled directly by pixel from the real logo (`public/norwood-gulf-logo.png`): the orange roundel measures ~oklch(0.68 0.20 41), the navy wordmark/outline ~oklch(0.29 0.14 263). Neither is used at its raw sampled value everywhere — each is re-tuned per role (see Palette) to clear WCAG contrast, but every tuned value keeps the logo's exact hue, only moving lightness/chroma.

## Palette

All tokens in `src/styles.css`, oklch, referenced only by CSS custom property — never hardcoded in components. Verified via actual browser canvas rendering (`getImageData`), not calculated in isolation — OKLCH's gamut varies sharply by hue/lightness, so a few candidate values that looked orange on paper rendered as red once gamut-mapped by the browser; every number below is the post-verification, actually-rendered color.

- `--background` / `--card` / `--popover`: near-white, warm-neutral hue (oklch ~0.995–1 L, hue 40)
- `--foreground` / `--shop-charcoal` / `--shop-steel` / `--border` / `--input` / `--secondary` / `--muted-foreground`: Gulf navy family, hue 263 (from the logo's wordmark/outline), at varying lightness per role — dark near-black text (L 0.20) down to a deep navy for `shop-dark` surfaces (L 0.14–0.22)
- `--primary` / `--accent` / `--ring`: Gulf signage orange, hue 41 (the logo's exact hue), darkened to oklch(0.565 0.17 41) — the logo's own raw orange (oklch 0.68 0.20 41, ~#fa5a14) is too light to hit 4.5:1 as either body text-on-white or a filled surface under white labels; this tuned value measures 4.9:1 both ways. `--primary-on-dark` keeps the logo's original brighter tone (oklch 0.72 0.19 41, ~#ff7237) for accents on the dark hero/process photos — 6.4:1 there.
- `--destructive`: distinct true red (hue 25) so error states stay clearly separate from the brand orange (hue 41) — verified they don't collapse into each other at a glance
- `--border` / `--input`: oklch 0.68 / 0.61 L, navy hue 263 — tuned to clear WCAG 1.4.11's 3:1 non-text contrast against the white background
- `--gradient-brand`: diagonal orange gradient for filled CTA surfaces only (buttons, logo-mark fallback, floating call button) — both stops individually clear 4.5:1 for the white label text on top, never used for text itself
- `--shadow-elevated` / `--shadow-brand`: soft, low-opacity shadows tuned for a white ground (navy / orange respectively)

## Type

Sora (display/headings), Manrope (body) — unchanged from the incumbent system; not part of this pass's brief.

## Component language

- CTAs: full pill (`rounded-full`), `brand-gradient` fill for primary actions, outlined `border-border` for secondary
- Trust badge (hero pill): the one legitimate bordered pill on the page — a single credibility badge, not a repeated grid
- No kicker/eyebrow labels above section headings (removed per craft-floor ban — headings carry their own weight)
- No gradient text (removed per craft-floor ban — emphasis is weight/size + solid `text-primary`, not a gradient clip)
- **No boxed icon+heading+text card grids** (removed per craft-floor ban on "cards as the lazy container," and per direct user request to stop repeating one boxy template): each content section now has its own distinct, box-free treatment instead of the same bordered/shadowed rounded-rectangle repeated everywhere —
  - Hero service tags: flowing text list with dot separators, no pills/borders
  - Why Us points: single-column divided list (`divide-y`), icon left, text right
  - Services: open 2-column icon+text grid, bare colored icon (no icon container), no borders, no dividers
  - Process steps: filled circular numbered badges (`brand-gradient`) — numbering is earned here since the steps are genuinely sequential, unlike the banned default use of `01/02/03`
  - Testimonials: column-divided quote wall (`divide-x` on desktop, `divide-y` stacked on mobile), oversized light quote-mark icon, no card background
  - Testimonials rating/BBB badges: converted from bordered pills to plain inline icon+text
- Ghost sequence numbers, where still used, favor `text-foreground/[0.08]` over a surface token so the watermark stays visible on a light card regardless of theme lightness

## Hero image

The hero background is **full-bleed across the entire hero section** (user directive, 2026-08-18), replacing the earlier contained/framed card treatment. `public/hero-background.mp4` (with `hero-background-poster.jpg` as its poster frame) fills the section as an absolutely-positioned, autoplaying, muted `object-cover` layer; all hero content sits on top of it in a single left-aligned column.

Two stacked scrims make the dark photo carry legible text without washing it out — a horizontal `from-black/85 via-black/55 to-black/15` (anchoring the text column at left, letting the lit car breathe at right) plus a vertical `from-black/70 via-transparent to-black/35` for top and bottom edges. This is the opposite conclusion from the earlier pass, and it works here because the section is dark-on-dark rather than a dark photo bled onto a white page.

The section is `min-h-[100svh] flex items-center` so the hero occupies exactly one viewport. On mobile it also carries `pb-[6.5rem]` because the fixed action bar overlays the viewport — without it the last content row renders underneath the bar.

## Color on dark surfaces

The signage orange (`--primary`, oklch 0.565 0.17 41) is tuned dark for the white ground and doesn't carry enough contrast on the dark hero/process photos. `--primary-on-dark` (oklch 0.72 0.19 41 — the logo's own brighter tone) is used instead for brand-orange marks on dark surfaces, measured at **6.4:1** over a representative dark-photo overlay. Every accent inside `Hero` and `ProcessInMotion` uses it: the headline accent span, service-list dots, star ratings, badge and caption icons, the step counter, and step detail lines. Filled `brand-gradient` surfaces are unaffected — they carry white text and were already compliant.

## Live open/closed status

`getOpenStatus()` in `shop.ts` derives open/closed state and the next opening time from the real posted hours (`HOURS_BY_DAY`), so the status can never drift from the hours listed in the footer. `OpenStatus.tsx` renders it with a pulsing dot, re-checking every 60s, and takes a `light` prop for dark grounds. It appears in the hero (desktop only), the footer, and the mobile action bar. The dot uses `--open` / `--open-on-dark` — deliberately outside the brand red so "open" never reads as an alert state.

## Conversion surfaces

- `MobileActionBar.tsx`: a fixed bottom bar on mobile carrying the live status plus paired Call / Book actions, replacing the previous single circular call FAB. The layout root adds `pb-28 sm:pb-0` so page content clears it. Because Call is permanently one thumb away, the hero's secondary phone CTA is hidden below `sm`.
- `Stats.tsx`: a four-cell divided row between Hero and TrustMarquee, count-up animated on first view via `useInView` (respects `prefers-reduced-motion`, and the founding year renders unanimated since a counting year reads as nonsense). Every figure comes from `SHOP` — no invented numbers.

## Logo

`BrandLogo.tsx` preloads `public/norwood-gulf-logo.png` (the real Gulf-brand roundel, downloaded directly from norwoodgulf.com) via an off-DOM `Image` and only swaps in the `<img>` once it actually decodes. The earlier `onError` approach flashed a broken-image box with the alt text sprawled across the header on every load while the file is missing. Until the file decodes, the text lockup (badge + name) is what ships; it takes a `light` prop for the dark hero.

## Accessibility

WCAG AA: body/UI text ≥4.5:1 (foreground/muted-foreground pairs measured 6.7–17:1), non-text UI (borders/inputs) ≥3:1 (measured 3.2–3.9:1 after correction), visible `focus-visible` rings on every custom interactive element (buttons, links, form fields) sized/offset for keyboard use, tap targets sized for touch.

## Known deferred items

- `codex-grid-background` (advisory, `detect.mjs`): the hairline grid-line texture now only backs `PageHeader` on the sub-pages — the Hero dropped it when the photo went full-bleed. Kept as a pre-existing atmospheric detail; replacing it with product-specific texture remains out of scope.
- The hero background is a generic garage video (`hero-background.mp4`), not a real photo of the Norwood Gulf shop — no real photography was available at rebrand time. Real photos of the bays, the fuel station, and the waiting room would let the hero and `ProcessInMotion` stage carry the shop's own subject instead of stock footage.
