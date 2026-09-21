import { ArrowRight, Fuel } from "lucide-react";
import { Reveal } from "./Reveal";
import { SHOP } from "./shop";

export function AutoSalesBanner() {
  return (
    <section className="shop-dark border-y border-white/10 py-20 sm:py-28 text-white relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:text-xs">
              <Fuel className="h-4 w-4 text-primary-on-dark" />
              <span>Two adjacent facilities, one stop</span>
            </div>
            <h2 className="mt-5 font-display text-3xl font-black sm:text-4xl lg:text-5xl">
              Fill up, grab a coffee, and get your car serviced — all in one stop.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              Our Gulf fuel station and convenience store sit right next to the service garage,
              open later than the shop: {SHOP.gasStationHours.map((h) => `${h.day} ${h.time}`).join(", ")}.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={SHOP.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-gradient group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-primary-foreground shadow-brand transition-transform duration-200 hover:translate-y-[-2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Get Directions
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
