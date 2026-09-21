import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight, Phone } from "lucide-react";
import { SERVICES, getServiceBySlug } from "@/components/home/servicesData";
import { SHOP } from "@/components/home/shop";
import { BookAppointmentDialog } from "@/components/home/BookAppointmentDialog";

export const Route = createFileRoute("/_layout/services/$slug")({
  loader: ({ params }) => {
    // Return only serializable fields for SSR hydration — a ServiceItem's `icon`
    // is a React component reference and can't cross the server/client boundary.
    const service = getServiceBySlug(params.slug);
    if (!service) throw notFound();
    return { title: service.title, text: service.text, slug: service.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const title = `${loaderData.title} — ${SHOP?.legalName || "Norwood Gulf"}`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.text },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.text },
      ],
      links: [{ rel: "canonical", href: `/services/${loaderData.slug}` }],
    };
  },
  component: ServiceDetailPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-40 text-center sm:px-6">
      <h1 className="font-display text-3xl font-extrabold">Service not found</h1>
      <p className="mt-3 text-muted-foreground">
        We couldn't find that service — take a look at everything we offer instead.
      </p>
      <Link
        to="/services"
        className="mt-6 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-primary"
      >
        View all services
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  ),
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  // getServiceBySlug is guaranteed here — the loader already threw notFound() otherwise.
  const service = getServiceBySlug(slug)!;
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <div className="relative isolate overflow-hidden">
        <img
          src={service.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-shop-charcoal/80 to-shop-charcoal/40" />

        <div className="mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pt-44 lg:pt-52">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white/70"
          >
            <Link to="/services" className="hover:text-white">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{service.title}</span>
          </nav>
          <div className="flex items-start gap-4">
            <service.icon className="h-9 w-9 shrink-0 text-primary-on-dark sm:h-11 sm:w-11" />
            <h1 className="font-display text-3xl font-black leading-[1.04] text-white sm:text-6xl">
              {service.title}
            </h1>
          </div>
          <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">{service.text}</p>
        </div>
      </div>

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {service.intro}
            </p>

            <h2 className="mt-10 font-display text-xl font-black">What's included</h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {service.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 py-3 text-sm text-foreground sm:text-base"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <BookAppointmentDialog
                trigger={
                  <button
                    type="button"
                    className="brand-gradient inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-primary-foreground shadow-brand transition-transform duration-200 hover:translate-y-[-1px] focus-visible:outline-none"
                  >
                    Book this service
                  </button>
                }
              />
              <a
                href={`tel:${SHOP.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-secondary focus-visible:outline-none"
              >
                <Phone className="h-4 w-4" />
                {SHOP.phoneDisplay}
              </a>
            </div>
          </div>

          <aside className="service-counter rounded-2xl border border-border p-6 shadow-elevated">
            <h2 className="font-display text-lg font-black">Other services</h2>
            <ul className="mt-4 divide-y divide-border">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group flex items-center justify-between gap-2 py-3 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <s.icon className="h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate">{s.title}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              className="mt-5 inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-[0.16em] text-primary"
            >
              View all services
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
