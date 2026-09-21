import { SHOP } from "./shop";

export function IntroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-border" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 className="max-w-xl font-display text-3xl font-black leading-tight text-foreground sm:text-5xl">
            The place you call when the repair needs both skill and clarity.
          </h2>
        </div>

        <div className="grid gap-6 text-base leading-relaxed text-muted-foreground sm:grid-cols-2">
          <p>
            {SHOP.legalName} specializes in diagnostics, general repair, tires and alignment, state
            inspection, brakes, and scheduled maintenance across two adjacent facilities.
          </p>
          <p>
            The work starts with a clear conversation: what we found, what it costs, and what can
            wait. That neighborly rhythm has kept the shop family-run since {SHOP.founded}.
          </p>
        </div>
      </div>
    </section>
  );
}
