/**
 * Page copy and structured content for the 12-section IA (spec §32).
 *
 * Kept as data rather than inlined JSX so the four pillars stay consistent
 * between the summary grid (§32.4) and their detail sections (§32.5–32.8),
 * and so the copy is reviewable in one place.
 *
 * Voice (§28): confident, blunt, editorial. Short sentences. Periods for
 * rhythm. No corporate filler.
 */

export const HERO = {
  headline: ["Build.", "Create.", "Automate."],
  subhead:
    "A digital creative studio for founders who are done settling for average.",
  pill: "Early Access — Dec 2026",
  primaryCta: { label: "Book Your Early Access", href: "#contact" },
  secondaryCta: { label: "What We Do", href: "#pillars" },
} as const;

export const ABOUT = {
  headline: "We build the digital system behind your business.",
  body: [
    "Most studios sell you a deliverable. We build the system that keeps working after the invoice clears.",
    "Brand, website, software, AI, automation, data, growth — connected, not stitched together by four vendors who have never spoken.",
  ],
  /** §32.3 stat callouts. Counted up on scroll per §26.4. */
  stats: [
    { value: 7, label: "Domain Specialists" },
    { value: 4, label: "Service Pillars" },
    { value: 1, label: "Studio Standard" },
  ],
} as const;

/**
 * The four pillars (§32.4), each linking down to its detail section.
 * `index` drives the large numerals that §26.3 asks to read as a deliberate
 * system rather than incidental decoration.
 */
export const PILLARS = [
  {
    index: "01",
    id: "content-video",
    title: "Content & Video",
    summary: "Content that earns attention instead of buying it.",
    services: [
      "Long-Form YouTube",
      "Short-Form Reels & Shorts",
      "Brand Story Films",
      "Campaign & Ad Video",
      "Personal Brand Content",
    ],
  },
  {
    index: "02",
    id: "web-products",
    title: "Web Products",
    summary: "Sites and products built to work while you sleep.",
    services: [
      "Landing Pages",
      "Full Websites",
      "Booking Systems",
      "Client Portals",
      "E-Commerce & Internal Tools",
    ],
  },
  {
    index: "03",
    id: "automation-ai",
    title: "Automation & AI",
    summary: "The work that runs itself at 3 AM.",
    services: [
      "Workflow Automation",
      "AI Assistants",
      "CRM & Lead Routing",
      "Data & Reporting",
    ],
  },
  {
    index: "04",
    id: "brand-design",
    title: "Brand Design",
    summary: "Design that stops the scroll and holds it.",
    services: [
      "Logo & Brand Kit",
      "Content Graphics",
      "UI & Digital Design",
      "Campaign Creatives",
    ],
  },
] as const;

export type Pillar = (typeof PILLARS)[number];
