export const SHOP = {
  legalName: "Norwood Gulf",
  name: "Norwood Gulf",
  tagline: "Auto Repair & Tire Service",
  ownerName: "William Ajjouri",
  founderName: "Ghattas Ajjouri",
  phone: "7812557368",
  phoneDisplay: "(781) 255-7368",
  phone2: "7812557369",
  phoneDisplay2: "(781) 255-7369",
  email: "norwoodgulfservice@gmail.com",
  address: "707 Neponset Street, Norwood, MA 02062",
  hours: [
    { day: "Mon – Fri", time: "7:00am – 6:00pm EST" },
    { day: "Saturday", time: "7:00am – 3:00pm EST" },
    { day: "Sunday", time: "Closed" },
  ],
  gasStationHours: [
    { day: "Mon – Sat", time: "6:00am – 9:30pm" },
    { day: "Sunday", time: "8:00am – 8:00pm" },
  ],
  founded: 1993,
  yearsInBusiness: new Date().getFullYear() - 1993,
  rating: 4.6,
  satisfaction: 98,
  googleUrl:
    "https://www.google.com/maps/search/?api=1&query=Norwood+Gulf+707+Neponset+Street+Norwood+MA",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=707+Neponset+Street,+Norwood,+MA+02062&output=embed",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=707+Neponset+Street,+Norwood,+MA+02062",
  facebookUrl: "https://www.facebook.com/norwoodgulf",
  instagramUrl: "https://www.instagram.com/norwoodgulf",
};

export const NAV = [
  {
    label: "Why Us",
    href: "/why-us",
    description: "Family-run since 1993, ASE-certified techs, and clear explanations before any work begins.",
  },
  {
    label: "Services",
    href: "/services",
    description: "Auto repair, tire service, state inspection, and everything in between.",
  },
  {
    label: "Process",
    href: "/process",
    description: "How booking, diagnosis and pickup work — start to finish.",
  },
  {
    label: "Reviews",
    href: "/reviews",
    description: "What drivers say about the shop and the work.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Hours, location, phone, and a callback request form.",
  },
] as const;

/** Real expansion history from norwoodgulf.com's About page. */
export const JOURNEY = [
  {
    year: "1993",
    title: "Founding",
    text: "Ghattas Ajjouri establishes Norwood Gulf, laying the foundation for a legacy of trusted automotive service in the community.",
  },
  {
    year: "2012",
    title: "First expansion",
    text: "Ghattas' son, William Ajjouri, joins full-time, kicking off our first major expansion. We added state inspection stickers, expanded to 3 bays, introduced self-service options, and built a larger convenience store.",
  },
  {
    year: "2023",
    title: "Second expansion",
    text: "Focused on customer experience and accessibility, we completed our second expansion featuring a significantly larger parking lot and a dedicated, comfortable waiting area for our clients.",
  },
  {
    year: "2026",
    title: "Third expansion",
    text: "Our latest expansion brings 3 additional garage bays (totaling 9), a fully updated waiting area, and new state-of-the-art self-service air and vacuum pumps for better overall utility.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    actor: "You",
    title: "Book your visit",
    text: "Schedule online, call, or stop by — same-day appointments are often available.",
    detail: "We confirm your appointment within 2 business hours.",
  },
  {
    actor: "Our team",
    title: "We diagnose & explain",
    text: "We inspect the vehicle with computer diagnostics and walk you through exactly what it needs, in plain language, before any work begins.",
    detail: "Written estimate — nothing starts without your OK.",
  },
  {
    actor: "Your technician",
    title: "We fix it right",
    text: "Your ASE-certified technician completes the work and the car is road-ready for pickup.",
    detail: "Free local pick-up & drop-off available.",
  },
] as const;

/** Posted service hours as [openMinutes, closeMinutes) from midnight, indexed by getDay() (0 = Sunday). */
const HOURS_BY_DAY: ReadonlyArray<readonly [number, number] | null> = [
  null,
  [7 * 60, 18 * 60],
  [7 * 60, 18 * 60],
  [7 * 60, 18 * 60],
  [7 * 60, 18 * 60],
  [7 * 60, 18 * 60],
  [7 * 60, 15 * 60],
];

const DAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatMinutes(total: number) {
  const h24 = Math.floor(total / 60);
  const m = total % 60;
  const suffix = h24 >= 12 ? "pm" : "am";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return m === 0 ? `${h12}${suffix}` : `${h12}:${String(m).padStart(2, "0")}${suffix}`;
}

export function getESTDate(now = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  let weekdayStr = "";
  let hour = 0;
  let minute = 0;

  for (const part of parts) {
    if (part.type === "weekday") weekdayStr = part.value;
    if (part.type === "hour") hour = parseInt(part.value, 10);
    if (part.type === "minute") minute = parseInt(part.value, 10);
  }

  if (hour === 24) hour = 0;

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    day: dayMap[weekdayStr] ?? 0,
    minutes: hour * 60 + minute,
  };
}

export function getOpenStatus(now = new Date()) {
  const est = getESTDate(now);
  const minutes = est.minutes;
  const todayDay = est.day;
  const today = HOURS_BY_DAY[todayDay];

  if (today && minutes >= today[0] && minutes < today[1]) {
    return { open: true as const, label: `Open until ${formatMinutes(today[1])} EST` };
  }

  for (let ahead = 0; ahead < 8; ahead++) {
    const day = (todayDay + ahead) % 7;
    const window = HOURS_BY_DAY[day];
    if (!window) continue;
    if (ahead === 0 && minutes >= window[0]) continue;

    const when = ahead === 0 ? "today" : ahead === 1 ? "tomorrow" : DAY_LABELS[day];
    return { open: false as const, label: `Opens ${when} at ${formatMinutes(window[0])} EST` };
  }

  return { open: false as const, label: "Closed" };
}

export const SERVICE_OPTIONS = [
  "Brake Repair & Service",
  "Oil Change & Fluid Service",
  "Engine Diagnostics",
  "Transmission Service",
  "Tire Services",
  "AC & Climate Control",
  "Electrical Systems",
  "Suspension & Steering",
  "State Inspection",
  "Other / Not Sure",
];
