import {
  ClipboardCheck,
  Droplets,
  CircleDot,
  Gauge,
  Settings2,
  Disc3,
  Zap,
  Snowflake,
  Compass,
  Leaf,
  Hammer,
  type LucideIcon,
} from "lucide-react";

export type ServiceItem = {
  slug: string;
  icon: LucideIcon;
  title: string;
  text: string;
  image: string;
  intro: string;
  highlights: string[];
};

/**
 * Every category and sub-service name below is taken directly from
 * norwoodgulf.com's own services page (services.html), category by category,
 * skipping only the duplicate local-SEO keyword variants (e.g. "Inspection
 * Sticker Renewals (Norwood, MA)") that just re-list an item already named.
 */
export const SERVICES: ServiceItem[] = [
  {
    slug: "state-inspection",
    icon: ClipboardCheck,
    title: "State Inspection",
    text: "Official Massachusetts state inspection service for safety and emissions compliance.",
    image: "/services/state-inspection.svg",
    intro:
      "Official state inspection service for safety and emissions compliance, with efficient check-in and reporting.",
    highlights: [
      "Massachusetts State Inspection",
      "Inspection Sticker Renewals",
      "Safety & Emissions Checks",
    ],
  },
  {
    slug: "maintenance-general",
    icon: Droplets,
    title: "Maintenance & General Services",
    text: "Complete maintenance services to keep your vehicle running smoothly and reliably.",
    image: "/services/oil-maintenance.svg",
    intro:
      "Complete maintenance services to keep your vehicle running smoothly and reliably every day.",
    highlights: [
      "General Auto Maintenance",
      "Oil Change",
      "Filter & Fluid Service",
      "Auto Repair",
    ],
  },
  {
    slug: "tire-alignment",
    icon: CircleDot,
    title: "Tire & Alignment",
    text: "Tire inspections, rotation, balancing, and alignment for safer driving in every season.",
    image: "/services/tire-service.svg",
    intro:
      "Tire inspections, replacement recommendations, and dependable service for safer driving in every season.",
    highlights: [
      "Tire Services",
      "Tire Rotation & Balancing",
      "Wheel Alignment",
      "Flat Tire Repair & Replacement",
    ],
  },
  {
    slug: "engine-performance",
    icon: Gauge,
    title: "Engine & Performance",
    text: "Advanced computer diagnostics to identify and resolve engine issues efficiently.",
    image: "/services/auto-repair-diagnostics.svg",
    intro:
      "Advanced computer diagnostics to identify and resolve engine issues efficiently, plus complete engine performance service.",
    highlights: [
      "Engine Diagnostics",
      "Alternator Repair & Services",
      "Fuel System",
      "Carburetors",
      "Overhaul",
      "Tune-up",
    ],
  },
  {
    slug: "transmission-drivetrain",
    icon: Settings2,
    title: "Transmission & Drivetrain",
    text: "Automatic and manual transmission repair, rebuild, and fluid services.",
    image: "/services/transmission-service.svg",
    intro:
      "Automatic and manual transmission repair, rebuild, and fluid services for smooth power delivery.",
    highlights: ["Transmissions", "Clutch Repair & Services", "Axles", "Differential Service"],
  },
  {
    slug: "brakes-safety",
    icon: Disc3,
    title: "Brakes & Safety",
    text: "Complete brake service including pads, rotors, calipers, and fluid flush.",
    image: "/services/brakes-suspension.svg",
    intro:
      "Complete brake service including pads, rotors, calipers, and fluid flush, plus ABS diagnostics and pre-purchase inspections.",
    highlights: [
      "Brake Repair & Services",
      "ABS Services",
      "Inspection Diagnostics",
      "Pre-Purchase Inspection",
    ],
  },
  {
    slug: "electrical-electronics",
    icon: Zap,
    title: "Electrical & Electronics",
    text: "Complete electrical system diagnostics and repair for all vehicle electronics.",
    image: "/services/key-programming.svg",
    intro:
      "Complete electrical system diagnostics and repair for all vehicle electronics, including check-engine-light service and key programming.",
    highlights: [
      "Electrical",
      "Computer Diagnostics",
      "Check Engine Light",
      "Lights",
      "Key Cutting & Programming",
    ],
  },
  {
    slug: "hvac-climate",
    icon: Snowflake,
    title: "HVAC & Climate",
    text: "Complete AC system service, heating repair, and radiator service.",
    image: "/promotions/ac-heat-check.svg",
    intro:
      "Complete AC system service, repair, and refrigerant recharge, plus heating and cooling system service.",
    highlights: ["Automotive AC Service & Repair", "Heating System", "Radiator Repair & Services"],
  },
  {
    slug: "steering-suspension",
    icon: Compass,
    title: "Steering & Suspension",
    text: "Complete steering and suspension repair for smooth, safe driving.",
    image: "/services/brakes-suspension.svg",
    intro:
      "Complete steering and suspension repair for smooth, safe driving, including shocks and struts.",
    highlights: ["Steering and Suspension", "Shocks and Struts"],
  },
  {
    slug: "emissions-environmental",
    icon: Leaf,
    title: "Emissions & Environmental",
    text: "State emissions testing and repairs to ensure compliance.",
    image: "/services/state-inspection.svg",
    intro:
      "State emissions testing and repairs to ensure compliance, plus smog check and exhaust system service.",
    highlights: ["Emissions Test", "Smog Check", "Exhaust System"],
  },
  {
    slug: "specialized-services",
    icon: Hammer,
    title: "Specialized Services",
    text: "Diesel, hybrid, fleet, and body damage services for unique vehicle needs.",
    image: "/services/collision-auto-body.svg",
    intro:
      "Specialized services for less common needs: diesel repair, hybrid vehicle service, fleet maintenance, minor body damage repair, and timing belt replacement.",
    highlights: [
      "Diesel Repair",
      "Hybrid Services",
      "Fleet Service",
      "Body Damage Services",
      "Timing Belt Replacement",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
