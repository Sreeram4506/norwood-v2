import { CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

const POINTS = ["Full safety inspections", "Emissions testing", "Commercial & non-commercial"];

export function InspectionBadge() {
  return (
    <section className="border-t border-border bg-shop-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
        <Reveal className="flex justify-center lg:justify-start">
          <img
            src="/ma-inspection-badge.png"
            alt="Massachusetts Vehicle Check — official inspection station"
            className="h-48 w-auto sm:h-56"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
            Official Inspection Station
          </span>
          <h2 className="mt-3 font-display text-3xl font-black leading-tight sm:text-5xl">
            Authorized MA state vehicle inspections.
          </h2>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Cleaner air · Safer roads
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Drive with confidence knowing your vehicle is safe and compliant. We're an official
            Massachusetts Vehicle Check station, providing comprehensive safety and emissions
            inspections for all passenger vehicles.
          </p>
          <ul className="mt-6 space-y-2.5">
            {POINTS.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2.5 text-sm font-semibold text-foreground"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                {p}
              </li>
            ))}
          </ul>
          <Link
            to="/services/$slug"
            params={{ slug: "state-inspection" }}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Inspection Details
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
