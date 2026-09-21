import { Reveal } from "./Reveal";
import { JOURNEY } from "./shop";

export function Journey() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-black sm:text-5xl">
            Three decades of growth.
          </h2>
        </Reveal>

        {/* A connected flow: one rail running through every milestone — vertical on mobile,
            horizontal on desktop — with numbered nodes sitting on top of it. */}
        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-[1.125rem] top-0 bottom-0 w-px bg-border md:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-[1.125rem] hidden h-px bg-border md:block"
          />

          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {JOURNEY.map((stop, i) => (
              <Reveal key={stop.year} delay={i * 0.08}>
                <li className="relative flex list-none gap-4 md:flex-col md:items-center md:text-center">
                  <span className="brand-gradient relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-black text-primary-foreground ring-4 ring-background md:mb-5">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <span className="font-display text-2xl font-black text-primary">
                      {stop.year}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold">{stop.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {stop.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
