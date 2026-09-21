import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/home/PageHeader";
import { ContactBand } from "@/components/home/ContactBand";
import { FAQSection } from "@/components/home/FAQSection";
import { Reveal } from "@/components/home/Reveal";
import { SHOP } from "@/components/home/shop";

const FAQS = [
  {
    q: "What are your service hours?",
    a: `Monday–Friday ${SHOP?.hours[0]?.time || "7:00am – 6:00pm"}, Saturday ${SHOP?.hours[1]?.time || "7:00am – 3:00pm"}, closed Sunday. The gas station and convenience store stay open later.`,
  },
  {
    q: "How fast will you get back to me?",
    a: "Our service coordinator confirms appointment requests within 2 business hours. For anything urgent, call the shop directly.",
  },
  {
    q: "Can I just drop the car off without calling first?",
    a: "Yes — we also offer local pick-up and drop-off, so you don't even need to come by in person.",
  },
];

const TITLE = `Contact — ${SHOP?.legalName || "Norwood Gulf"}`;
const DESCRIPTION = `Call ${SHOP?.phoneDisplay || "(781) 255-7368"}, visit ${SHOP?.address || "Norwood, MA"}, or send us the details online and we'll call you back.`;

export const Route = createFileRoute("/_layout/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Reach the shop directly, or send us the details and we'll call you back."
      />
      <ContactBand />

      <section className="pb-20 sm:pb-28">
        <Reveal className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Find us</h2>
              <p className="mt-2 text-muted-foreground">{SHOP.address}</p>
            </div>
            <a
              href={SHOP.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Get directions
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <iframe
              title={`Map to ${SHOP?.legalName || "Norwood Gulf"}`}
              src={SHOP.mapsEmbedUrl}
              loading="lazy"
              className="h-80 w-full sm:h-96"
            />
          </div>
        </Reveal>
      </section>

      <FAQSection heading="Questions about reaching us" items={FAQS} />
    </>
  );
}
