import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

const PROMOTIONS = [
  {
    image: "/services/oil-maintenance.svg",
    tag: "Routine Maintenance",
    title: "Oil & Preventative Service",
    text: "Regular oil changes and preventative maintenance are the cheapest insurance your car has. We handle scheduled fluid service to catch small issues early.",
    slug: "maintenance-general",
  },
  {
    image: "/promotions/tire-changeover.svg",
    tag: "Seasonal",
    title: "Seasonal Tire Changeover",
    text: "Swap in your winter or summer set and we'll store the rest — mounted, balanced and ready to go back on when the weather turns.",
    slug: "tire-alignment",
  },
  {
    image: "/promotions/ac-heat-check.svg",
    tag: "Seasonal",
    title: "Heating & AC Check",
    text: "A complete seasonal check: battery testing, heater and defroster performance, AC recharge, and radiator and cooling system service — before the weather turns on you.",
    slug: "hvac-climate",
  },
];

export function Promotions() {
  return (
    <section className="border-y border-border bg-shop-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-black sm:text-5xl">Current Promotions</h2>
          <p className="mt-4 text-muted-foreground">
            A few things worth doing right now — no gimmicks, just what actually matters for your
            car this time of year.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 xl:gap-10">
          {PROMOTIONS.map((promo, i) => (
            <Reveal key={promo.title} delay={i * 0.08}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-elevated">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={promo.image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-foreground backdrop-blur">
                    {promo.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="mb-3 font-display text-2xl font-bold">{promo.title}</h3>
                  <p className="mb-8 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {promo.text}
                  </p>

                  <Link
                    to="/services/$slug"
                    params={{ slug: promo.slug }}
                    className="brand-gradient mt-auto inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-primary-foreground transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none"
                  >
                    Schedule this
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
