import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { CalendarDays, ChevronDown, Menu, Phone, X } from "lucide-react";
import { SHOP } from "./shop";
import { SERVICES } from "./servicesData";
import { BookAppointmentDialog } from "./BookAppointmentDialog";
import { BrandLogo } from "./BrandLogo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Home and individual service pages both open on a full-bleed dark photo; every other
  // route's unscrolled state sits on PageHeader's plain light background, so only these
  // two route shapes need the light nav treatment before the user scrolls.
  const hasDarkHero = pathname === "/" || /^\/services\/[^/]+$/.test(pathname);
  const overHero = hasDarkHero && !scrolled;
  const navLinkClass = (extra = "") =>
    `text-[13px] font-extrabold uppercase tracking-[0.16em] transition-colors focus-visible:outline-none ${
      overHero ? "text-white hover:text-primary-on-dark" : "text-foreground/70 hover:text-primary"
    } ${extra}`;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300 border-transparent bg-transparent"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 transition-all duration-300 sm:px-6 ${
          !scrolled ? "py-3 lg:py-5" : "py-2.5"
        }`}
      >
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <BrandLogo
            glow={overHero}
            className={`w-auto transition-all duration-300 ${scrolled ? "h-11 sm:h-12" : "h-16 sm:h-16 lg:h-20"}`}
          />
        </Link>

        <nav
          className={`hidden items-center gap-6 rounded-full px-5 py-3 lg:flex ${
            overHero
              ? "border border-white/15 bg-black/20 backdrop-blur-md"
              : "border border-border/80 bg-background/70"
          }`}
        >
          <Link
            to="/"
            className={navLinkClass()}
            activeProps={{ className: overHero ? "!text-primary-on-dark" : "!text-primary" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/why-us"
            className={navLinkClass()}
            activeProps={{ className: overHero ? "!text-primary-on-dark" : "!text-primary" }}
          >
            Why Us
          </Link>
          <Link
            to="/services"
            className={navLinkClass()}
            activeProps={{ className: overHero ? "!text-primary-on-dark" : "!text-primary" }}
          >
            Services
          </Link>
          <Link
            to="/process"
            className={navLinkClass()}
            activeProps={{ className: overHero ? "!text-primary-on-dark" : "!text-primary" }}
          >
            Process
          </Link>
          <Link
            to="/reviews"
            className={navLinkClass()}
            activeProps={{ className: overHero ? "!text-primary-on-dark" : "!text-primary" }}
          >
            Reviews
          </Link>
          <Link
            to="/contact"
            className={navLinkClass()}
            activeProps={{ className: overHero ? "!text-primary-on-dark" : "!text-primary" }}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center justify-end gap-3">
          <a
            href={`tel:${SHOP.phone}`}
            className={`hidden items-center gap-1.5 ${navLinkClass()} xl:inline-flex`}
            aria-label={`Call ${SHOP.phoneDisplay}`}
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
            {SHOP.phoneDisplay}
          </a>

          <BookAppointmentDialog
            trigger={
              <button
                type="button"
                className="brand-gradient hidden items-center gap-2 rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-primary-foreground shadow-brand transition-transform duration-200 hover:translate-y-[-1px] focus-visible:outline-none sm:inline-flex"
              >
                <CalendarDays className="h-4 w-4 shrink-0" />
                Book
              </button>
            }
          />

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-md border transition-colors focus-visible:outline-none lg:hidden ${
              overHero
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-border text-foreground hover:bg-secondary"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-y-auto border-t border-border bg-background shadow-elevated transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="border-b border-border/60 py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors last:border-0 hover:text-foreground focus-visible:outline-none focus-visible:text-primary"
            activeProps={{ className: "!text-primary" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/why-us"
            onClick={() => setOpen(false)}
            className="border-b border-border/60 py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors last:border-0 hover:text-foreground focus-visible:outline-none focus-visible:text-primary"
            activeProps={{ className: "!text-primary" }}
          >
            Why Us
          </Link>
          <Link
            to="/process"
            onClick={() => setOpen(false)}
            className="border-b border-border/60 py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors last:border-0 hover:text-foreground focus-visible:outline-none focus-visible:text-primary"
            activeProps={{ className: "!text-primary" }}
          >
            Process
          </Link>

          <div className="border-b border-border/60">
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
              className="flex w-full items-center justify-between py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-primary"
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`transition-[max-height] duration-300 ${
                mobileServicesOpen ? "max-h-72 overflow-y-auto" : "max-h-0 overflow-hidden"
              }`}
            >
              <ul className="pb-2">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 py-2 pl-1 text-sm font-semibold text-foreground/90 transition-colors hover:text-primary"
                    >
                      <service.icon className="h-4 w-4 shrink-0 text-primary" />
                      {service.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/services"
                    onClick={() => setOpen(false)}
                    className="inline-block py-2 pl-1 text-xs font-bold uppercase tracking-wider text-primary"
                  >
                    View all services
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-3 mt-3 flex items-center">
            <BookAppointmentDialog
              trigger={
                <button
                  type="button"
                  className="brand-gradient inline-flex w-full items-center justify-center gap-2 rounded px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground focus-visible:outline-none"
                >
                  <CalendarDays className="h-4 w-4" />
                  Book Appointment
                </button>
              }
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
