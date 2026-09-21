import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/home/PageHeader";
import { Services } from "@/components/home/Services";
import { FAQSection } from "@/components/home/FAQSection";
import { SHOP } from "@/components/home/shop";

const FAQS = [
  {
    q: "Do you work on all makes and models?",
    a: "Yes — our ASE-certified technicians handle domestic and foreign cars, SUVs, and light trucks alike, from routine maintenance to complex repairs.",
  },
  {
    q: "Can I get a Massachusetts state inspection done there?",
    a: "Yes — we're an official MA Vehicle Check station and handle inspection stickers and emissions testing, often while you wait.",
  },
  {
    q: "Do you only do routine maintenance, or bigger repairs too?",
    a: "Both, across two adjacent facilities: oil changes and tune-ups, brakes and suspension, tires and alignment, transmission work, and full diagnostics.",
  },
  {
    q: "Do you offer key cutting and programming?",
    a: "Yes — we cut and program transponder keys and key fobs on-site, usually the same visit.",
  },
];

const TITLE = `Services — ${SHOP?.legalName || "Norwood Gulf"}`;
const DESCRIPTION =
  "Diagnostics, brakes and suspension, tires and alignment, state inspection, and oil service — all in one stop.";

export const Route = createFileRoute("/_layout/services/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        description="Every service under one roof — no need to shop around."
      />
      <Services />
      <FAQSection heading="Questions about our services" items={FAQS} />
    </>
  );
}
