# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Car owners in and around Norwood, MA who need auto repair, tire service, or a Massachusetts state
inspection. They arrive deciding whether to trust this shop with their vehicle and want to book a
service or get a quote quickly.

## Product Purpose

Norwood Gulf's marketing site converts visitors into booked appointments or callback requests.
Success is a phone call, an online booking, or a submitted callback form.

## Positioning

Family-run auto repair and tire service shop since 1993 (now run by second-generation owner
William Ajjouri), operating two adjacent facilities — the service garage and a Gulf-branded fuel
station/convenience store — plus an official Massachusetts state inspection license, written
estimates before any work starts, and free local pick-up & drop-off.

## Operating Context

- Services: diagnostics & general repair, brakes/steering/suspension, tires & alignment,
  transmission & drivetrain, AC/heating/electrical, Massachusetts state inspection & emissions,
  oil change & general maintenance, key cutting & programming, minor body damage & cosmetic repair.
- Booking flow: online booking dialog, phone, or walk-in; the shop confirms requests within 2
  business hours (real fact from norwoodgulf.com's appointment page).
- Contact form on-site collects name/email/phone/vehicle/issue and shows a confirmation toast; no
  backend persistence beyond the toast (evidenced in `ContactBand.tsx`).

## Capabilities and Constraints

- Built with React + TanStack Router + Vite, Tailwind v4 token-based theming (`src/styles.css`),
  shadcn/ui primitives.
- Multi-page site: shared layout at `src/routes/_layout.tsx` (Header, Outlet, Footer), six pages
  under `src/routes/_layout/` — Home (`/`), Why Us, Services, Process, Reviews, Contact — each its
  own route with its own SEO metadata, plus a bonus internal `/admin` operations-dashboard demo.
- All component styling routes through CSS custom-property tokens (no hardcoded colors in
  components).

## Brand Commitments

- Legal/display name: Norwood Gulf. Founded 1993 by Ghattas Ajjouri; second-generation
  owner-operator William Ajjouri joined full-time in 2012.
- Address: 707 Neponset Street, Norwood, MA 02062. Phone: (781) 255-7368 (secondary line (781)
  255-7369). Email: norwoodgulfservice@gmail.com.
- Service hours: Mon–Fri 7:00am–6:00pm, Sat 7:00am–3:00pm, closed Sunday. The adjacent gas
  station/convenience store keeps longer hours (Mon–Sat 6:00am–9:30pm, Sun 8:00am–8:00pm).
- Official Massachusetts Vehicle Check (state inspection) station. Google rating: 4.6/5.0.
- Real logo: the shop's actual Gulf-brand roundel, downloaded from norwoodgulf.com and stored at
  `public/norwood-gulf-logo.png`; the official MA Vehicle Check badge is at
  `public/ma-inspection-badge.png`.
- Fonts: Sora (display/headings), Manrope (body) — kept from the prior brand pass, not part of
  this rebrand.
- Color palette: rebuilt from the real logo's two colors, sampled by pixel — Gulf orange (hue 41)
  as the sole accent and Gulf navy (hue 263) as the neutral/dark-surface family, replacing the
  previous owner's signage-red-on-gray system entirely. Every value was verified by rendering it
  in-browser and reading the actual pixels back, not just calculated, since OKLCH's usable gamut
  varies sharply by hue and a naive hue-only swap of the old palette rendered as red, not orange.

## Evidence on Hand

- All business facts (address, phone numbers, email, hours, founding year, ownership history,
  service list, amenities, Google rating, Q&A content) were pulled directly from
  [norwoodgulf.com](https://www.norwoodgulf.com/) (home, about, services, contact, Q&A, and
  appointment pages) on 2026-09-17.
- No exact Google review count is published on the business's own site (it shows only the 4.6
  rating), so no review-count figure is fabricated anywhere on this site — UI copy and the
  `AggregateRating` schema were adjusted to omit it rather than invent a number.
- Prior business identity (Canton Auto Services & Auto Body, Canton, MA) and its unrelated
  "Washington Street Auto Sales" cross-promotion have been fully removed — logo files, copy,
  addresses, phone numbers, and admin-portal mock data all replaced.

## Product Principles

1. Clear, honest explanations lead — plain-language repair explanations, written estimates before
   work starts, and real credentials (official MA inspection station) surfaced early.
2. Two facilities, one stop — repair garage and fuel/convenience store working together; don't
   fragment this into siloed offerings.
3. Fast path to contact — phone number and booking CTA stay reachable from any scroll position.
4. Family-run warmth without sacrificing professional credibility — a 30+ year local business
   passing to its second generation, not a startup.

## Accessibility & Inclusion

WCAG AA contrast, focus states, and tap targets remain a requirement, carried over unchanged from
the prior brand pass and re-validated after the orange accent recolor.
