import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/home/PageHeader";
import { Testimonials } from "@/components/home/Testimonials";
import { Reveal } from "@/components/home/Reveal";
import { SHOP } from "@/components/home/shop";

const TITLE = `Reviews — ${SHOP?.legalName || "Norwood Gulf"}`;
const DESCRIPTION = `Rated ${SHOP?.rating || 4.6} on Google. See what drivers say about the crew and the work.`;

export const Route = createFileRoute("/_layout/reviews")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <>
      <PageHeader
        title="Reviews"
        description="Real feedback from drivers, in their own words."
      />
      <Testimonials />

      <section className="border-t border-border py-16 sm:py-20">
        <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            Had a good experience with us?
          </h2>
          <p className="mt-3 text-muted-foreground">
            A few honest words on Google helps other Norwood drivers find a shop they can trust.
          </p>
          <a
            href={SHOP.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Leave a review on Google
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </section>
    </>
  );
}
