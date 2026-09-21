import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { NAV } from "./shop";
import { Reveal } from "./Reveal";

export function ExploreLinks() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">
            Everything you need to know
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-border border-t border-border">
          {NAV.map((item, i) => (
            <Reveal key={item.href} delay={i * 0.06}>
              <Link
                to={item.href}
                className="group relative flex items-center justify-between gap-6 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {/* Wipe the row's ground on hover so the whole line reads as the target, not just the label. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-4 -right-4 origin-left scale-x-0 bg-surface transition-transform duration-300 ease-out group-hover:scale-x-100 sm:-left-6 sm:-right-6"
                />
                <div className="relative min-w-0">
                  <h3 className="font-display text-xl font-bold transition-colors group-hover:text-primary sm:text-2xl">
                    {item.label}
                  </h3>
                  <p className="mt-1 max-w-lg text-sm text-muted-foreground sm:text-base">
                    {item.description}
                  </p>
                </div>
                <ArrowUpRight className="relative h-6 w-6 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
