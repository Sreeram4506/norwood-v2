import { SHOP } from "./shop";

export function LocationsSection() {
  return (
    <section className="shop-dark overflow-hidden py-16 text-white sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="font-display text-3xl font-black tracking-tight sm:text-5xl">
              Find the orange Gulf sign on Neponset Street.
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Drop off during posted hours, call ahead for a bay, or use the callback form and the
              shop will follow up during business hours.
            </p>
          </div>
          <div className="mt-10 grid gap-5 text-sm sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary-on-dark">
                Address
              </h3>
              <p className="mt-2 text-lg font-bold text-white">{SHOP.address}</p>
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary-on-dark">
                Hours
              </h3>
              <div className="mt-3 space-y-2 text-white/70">
                {SHOP.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <span className="font-semibold text-white">{h.day}</span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-white/50">
                Gas station open later — {SHOP.gasStationHours.map((h) => `${h.day} ${h.time}`).join(", ")}.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-elevated backdrop-blur">
          <iframe
            title={`${SHOP.name} map`}
            src={SHOP.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full border-0 grayscale sm:h-80 lg:h-full"
          />
          <div className="grid gap-3 border-t border-white/15 bg-black/35 p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
            <div className="min-w-0">
              <p className="font-display text-xl font-black text-white">{SHOP.name}</p>
              <a
                href={`tel:${SHOP.phone}`}
                className="mt-1 inline-flex font-bold text-primary-on-dark transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
              >
                {SHOP.phoneDisplay}
              </a>
            </div>
            <a
              href={SHOP.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-extrabold text-foreground transition-colors hover:bg-primary-on-dark hover:text-shop-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Get Directions
            </a>
            <a
              href={`tel:${SHOP.phone}`}
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-4 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Call Shop
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
