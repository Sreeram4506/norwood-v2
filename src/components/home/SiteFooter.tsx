import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Phone } from "lucide-react";
import { NAV, SHOP } from "./shop";
import { BrandLogo } from "./BrandLogo";
import { OpenStatus } from "./OpenStatus";

export function SiteFooter() {
  return (
    <footer className="shop-dark border-t border-white/15 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <BrandLogo className="h-14" glow />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              Family-run auto repair and tire service shop in Norwood, MA since {SHOP.founded},
              with clear explanations and honest pricing on every job.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={SHOP.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Norwood Gulf on Facebook"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-primary-on-dark hover:text-primary-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={SHOP.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Norwood Gulf on Instagram"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-primary-on-dark hover:text-primary-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav className="min-w-0">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary-on-dark">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary-on-dark focus-visible:outline-none focus-visible:text-primary-on-dark focus-visible:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary-on-dark">
              Visit
            </h3>
            <p className="mt-4 text-sm text-white/70">{SHOP.address}</p>
            <a
              href={`tel:${SHOP.phone}`}
              className="mt-3 inline-flex items-center gap-2 font-display text-base font-bold text-white transition-colors hover:text-primary-on-dark focus-visible:outline-none focus-visible:text-primary-on-dark focus-visible:underline"
            >
              <Phone className="h-4 w-4 shrink-0 text-primary-on-dark" />
              {SHOP.phoneDisplay}
            </a>
            <a
              href={`mailto:${SHOP.email}`}
              className="mt-2 block text-sm text-white/70 transition-colors hover:text-primary-on-dark focus-visible:outline-none focus-visible:text-primary-on-dark focus-visible:underline"
            >
              {SHOP.email}
            </a>
            <div className="mt-4 space-y-1 text-sm text-white/70">
              {SHOP.hours.map((h) => (
                <div key={h.day} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                  <span className="truncate">{h.day}</span>
                  <span className="shrink-0">{h.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <OpenStatus />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SHOP.legalName}. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
