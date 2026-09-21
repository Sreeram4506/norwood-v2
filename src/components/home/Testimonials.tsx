import { BadgeCheck, Quote, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { SHOP } from "./shop";

const HIGHLIGHTS = [
  {
    title: "Clear explanations, every visit",
    text: '"Professional service, clear communication, and fair pricing — every visit." We walk you through what\'s wrong, why, and what it costs before we start.',
  },
  {
    title: "ASE-certified technicians",
    text: "Our ASE-certified team handles everything from routine maintenance to complex engine repairs on domestic and foreign cars, SUVs and light trucks.",
  },
  {
    title: "No surprises on the bill",
    text: "Written estimates on every job — we never start work you haven't approved.",
  },
  {
    title: "Comfortable while you wait",
    text: "Free Wi-Fi, TV and a dedicated waiting area — or use our local pick-up and drop-off service instead.",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="font-display text-3xl font-black leading-tight sm:text-5xl">
            What drivers notice after a visit.
          </h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-foreground/85 lg:justify-end">
            <span className="inline-flex items-center gap-2">
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < Math.round(SHOP.rating)
                        ? "h-3.5 w-3.5 fill-primary text-primary"
                        : "h-3.5 w-3.5 text-muted-foreground"
                    }
                  />
                ))}
              </span>
              {SHOP.rating} on Google
            </span>
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-primary" />
              Official MA inspection station
            </span>
          </div>
        </Reveal>

        <div className="mt-3 grid divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
          {HIGHLIGHTS.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="py-8 md:px-6 md:first:pl-0 md:last:pr-0"
            >
              <figure>
                <Quote className="h-9 w-9 text-primary/35" />
                <figcaption className="mt-5 font-display text-base font-black">
                  {item.title}
                </figcaption>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
