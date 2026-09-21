import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/home/PageHeader";
import { Process } from "@/components/home/Process";
import { FAQSection } from "@/components/home/FAQSection";
import { SHOP } from "@/components/home/shop";

const TITLE = `Our Process — ${SHOP?.legalName || "Norwood Gulf"}`;
const DESCRIPTION = "How booking, diagnosis, and pickup work — three steps, no runaround.";

const FAQS = [
  {
    q: "Do I need to make an appointment?",
    a: "You can book online, call ahead, or just stop by — same-day appointments are often available.",
  },
  {
    q: "How fast will my appointment be confirmed?",
    a: "Our service coordinator confirms your appointment by phone or email within 2 business hours.",
  },
  {
    q: "Will I get a price before you start the work?",
    a: "Yes. After we inspect and diagnose the issue, we send a written estimate — we won't begin any work without your approval.",
  },
  {
    q: "What if I can't drop the car off myself?",
    a: "We offer local pick-up and drop-off to every customer, so you don't have to rearrange your day around a repair.",
  },
];

export const Route = createFileRoute("/_layout/process")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/process" }],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <>
      <PageHeader
        title="Process"
        description="Three simple steps from first call to driving away."
      />
      <Process />
      <FAQSection heading="Questions about the process" items={FAQS} />
    </>
  );
}
