import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/home/PageHeader";
import { WhyUs } from "@/components/home/WhyUs";
import { Journey } from "@/components/home/Journey";
import { FAQSection } from "@/components/home/FAQSection";
import { SHOP } from "@/components/home/shop";

const FAQS = [
  {
    q: "Do you give a written estimate before starting work?",
    a: "Yes. We inspect the vehicle and send a written estimate before we touch a bolt, so there are no surprise charges once the work is underway.",
  },
  {
    q: "What if I can't bring the car in myself?",
    a: "We offer local pick-up and drop-off to every customer, at no extra charge.",
  },
  {
    q: "Are you an official inspection station?",
    a: `Yes — we're a licensed Massachusetts Vehicle Check station, and we're rated ${SHOP?.rating || 4.6}★ on Google.`,
  },
  {
    q: "Who actually works on my car?",
    a: `${SHOP?.ownerName || "William Ajjouri"} and a team of ASE-certified technicians — a small, family-run shop, not a franchise. You deal directly with the people doing the work, not a call center.`,
  },
  {
    q: "How long has Norwood Gulf been around?",
    a: `Since ${SHOP?.founded || 1993}, when ${SHOP?.founderName || "Ghattas Ajjouri"} founded the shop — that's ${SHOP?.yearsInBusiness || 33}+ years serving Norwood, MA.`,
  },
];

const TITLE = `Why ${SHOP?.name || "Norwood Gulf"} — ${SHOP?.legalName || "Norwood Gulf"}`;
const DESCRIPTION =
  "Family-run since 1993, an official Massachusetts inspection station, written estimates, and free local pick-up & drop-off.";

export const Route = createFileRoute("/_layout/why-us")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/why-us" }],
  }),
  component: WhyUsPage,
});

function WhyUsPage() {
  return (
    <>
      <PageHeader title="Why Us" description="What makes Norwood Gulf different, in plain terms." />
      <WhyUs />
      <Journey />
      <FAQSection heading="Common questions" items={FAQS} />
    </>
  );
}
