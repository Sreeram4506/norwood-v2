import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { SERVICES } from "./servicesData";

export function Services({ linkToAll = true }: { linkToAll?: boolean }) {
  return (
    <section id="services" className="service-counter relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-black sm:text-5xl">
              Every service, under one roof.
            </h2>
            <p className="mt-4 text-muted-foreground">
              From a warning-light scan to a state inspection sticker, the shop handles domestic
              and import cars, SUVs and light trucks alike.
            </p>
          </div>
          {linkToAll && (
            <Link
              to="/services"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.06}>
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group flex flex-row sm:flex-col items-center sm:items-start h-auto sm:h-full gap-4 sm:gap-0 rounded-2xl border border-border bg-background p-4 sm:p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-elevated sm:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="shrink-0 grid h-12 w-12 sm:mb-6 sm:h-14 sm:w-14 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                </span>
                
                <div className="flex flex-1 flex-col sm:h-full">
                  <h3 className="font-display text-base sm:mb-3 sm:text-xl font-bold leading-tight transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>
                  
                  <p className="hidden sm:flex mb-8 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.text}
                  </p>
                  
                  <span className="hidden sm:inline-flex mt-auto items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
                    Details
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>

                <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary sm:hidden" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
