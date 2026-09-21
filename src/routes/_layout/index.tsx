import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { IntroSection } from "@/components/home/IntroSection";
import { InspectionBadge } from "@/components/home/InspectionBadge";
import { Services } from "@/components/home/Services";
import { Promotions } from "@/components/home/Promotions";
import { LocationsSection } from "@/components/home/LocationsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { SHOP } from "@/components/home/shop";
import { Stats } from "@/components/home/Stats";
import { WhyUs } from "@/components/home/WhyUs";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactBand } from "@/components/home/ContactBand";
import { AutoSalesBanner } from "@/components/home/AutoSalesBanner";

const TITLE = "Norwood Gulf — Auto Repair, Tires & State Inspection";
const DESCRIPTION =
  "Norwood Gulf has served Norwood, MA since 1993: diagnostics, brakes, tire service, and Massachusetts state inspection. Official MA inspection station, 4.6★ on Google.";

export const Route = createFileRoute("/_layout/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoRepair",
          name: SHOP?.legalName || "Norwood Gulf",
          telephone: SHOP?.phone || "7812557368",
          email: SHOP?.email || "norwoodgulfservice@gmail.com",
          description: DESCRIPTION,
          address: {
            "@type": "PostalAddress",
            streetAddress: "707 Neponset Street",
            addressLocality: "Norwood",
            addressRegion: "MA",
            postalCode: "02062",
            addressCountry: "US",
          },
          openingHours: ["Mo-Fr 07:00-18:00", "Sa 07:00-15:00"],
        }),
      },
    ],
  }),
  component: Index,
});

const FAQS = [
  {
    q: "What types of vehicles do you service?",
    a: "We service all types of vehicles, including domestic and foreign cars, SUVs, and light trucks. Our ASE-certified technicians handle everything from routine maintenance to complex engine repairs.",
  },
  {
    q: "How do I schedule an appointment?",
    a: "You can schedule an appointment online through our website, call us directly during business hours, or stop by our shop. We recommend scheduling in advance, especially for complex repairs.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and cash. Payment is due upon completion of service.",
  },
  {
    q: "Do you provide estimates before work begins?",
    a: "Yes, we provide written estimates for all recommended repairs and services. We won't begin any work without your explicit approval — no surprises on your final bill.",
  },
  {
    q: "Can I wait at your shop while my car is being serviced?",
    a: "Yes — we have a comfortable waiting area with free Wi-Fi and TV. For longer repairs, we also offer local pick-up and drop-off for your convenience.",
  },
];

function Index() {
  return (
    <>
      <Hero />
      <Stats />
      <IntroSection />
      <InspectionBadge />
      <WhyUs />
      <Promotions />
      <Services />
      <AutoSalesBanner />
      <Testimonials />
      <LocationsSection />
      <ContactBand />
      <FAQSection heading="Frequently Asked Questions" items={FAQS} />
    </>
  );
}
