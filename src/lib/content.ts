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

/* ------------------------------------------------------------------------ */
/* Pillar detail sections (§32.5–§32.8)                                       */
/* ------------------------------------------------------------------------ */

export const CONTENT_VIDEO = {
  headline: "Content That Moves People.",
  items: [
    { name: "Long-Form YouTube", note: "Episodes that build an audience, not just views." },
    { name: "Short-Form Reels & Shorts", note: "Vertical cuts engineered for reach." },
    { name: "Brand Story Films", note: "The film that explains why you exist." },
    { name: "Campaign & Ad Video", note: "Creative built to convert, not to win awards." },
    { name: "Personal Brand Content", note: "Founder-led content, produced on a system." },
  ],
  callout: "One shoot day. Six formats. Infinite reach.",
} as const;

export const WEB_PRODUCTS = {
  headline: "Products Built to Work While You Sleep.",
  /**
   * Confirmed pricing (§32.6). These are public-facing starting prices —
   * §34 forbids any payment flow, so they are informational only.
   */
  pricing: [
    { product: "Landing Page", price: "₹18,000+" },
    { product: "Full Website", price: "₹35,000+" },
    { product: "Booking System", price: "₹45,000+" },
    { product: "Client Portal", price: "₹60,000+" },
    { product: "E-Commerce & Internal Tool", price: "₹75,000+" },
  ],
  note: "All prices are starting points. We scope after a conversation. Conversations are free.",
  builtWith: [
    "Next.js",
    "Framer",
    "Supabase",
    "Neon",
    "Clerk",
    "Vercel",
    "Cloudflare R2",
  ],
} as const;

export const AUTOMATION_AI = {
  headline: "Your Business Running at 3 AM.",
  tiers: [
    {
      name: "Starter",
      price: "₹18,000 – 25,000",
      points: [
        "One workflow, automated end to end",
        "Lead capture straight into your CRM",
        "Email and WhatsApp notifications",
      ],
    },
    {
      name: "Growth",
      price: "₹35,000 – 60,000",
      points: [
        "Multi-step workflows across tools",
        "An AI assistant trained on your data",
        "CRM, lead routing and reporting",
      ],
    },
    {
      /**
       * TODO — CONFIRM (spec §32.7, open item 6): the source was cut off at
       * "Full-Sta…" with no visible figure. The name below is the doc's
       * partial reconstruction. The price is deliberately NOT reconstructed —
       * there was no fragment of a number to work from, and inventing a public
       * price is worse than saying it is scoped. Replace both once confirmed.
       */
      name: "Full-Stack / Enterprise",
      price: "Scoped on request",
      priceUnconfirmed: true,
      points: [
        "Systems across the whole business",
        "Custom integrations and data pipelines",
        "Ongoing orchestration and support",
      ],
    },
  ],
  note: "Ongoing support from ₹5,000/month.",
} as const;

export const BRAND_DESIGN = {
  headline: "Design That Stops the Scroll.",
  items: [
    { name: "Logo & Brand Kit", note: "The identity and the rules that keep it consistent." },
    { name: "Content Graphics", note: "Templates your team can actually reuse." },
    { name: "UI & Digital Design", note: "Interfaces designed to be built, not just admired." },
    { name: "Campaign Creatives", note: "One idea, every placement it needs." },
    { name: "Professional Assets", note: "Decks, profiles and documents that hold up." },
    { name: "Production Design", note: "Sets, thumbnails and on-screen graphics." },
  ],
} as const;

/* ------------------------------------------------------------------------ */
/* Process + Comparison (§32.9–§32.10)                                        */
/* ------------------------------------------------------------------------ */

export const PROCESS = {
  headline: ["Four Steps.", "One Standard."],
  steps: [
    {
      index: "01",
      name: "Discover",
      meta: "Week 0",
      body: "We start with your business, not your brief. What is broken, what is working, and what the gap is costing you.",
    },
    {
      index: "02",
      name: "Architect",
      meta: "Week 1",
      body: "We map the system before anyone opens a design tool. Scope, structure, and what finished actually means.",
    },
    {
      index: "03",
      name: "Build",
      meta: "Weeks 1–4",
      body: "We build in the open. You see progress every week, not a reveal at the end.",
    },
    {
      index: "04",
      name: "Deliver",
      meta: "Done Means Done",
      body: "Handover, documentation, and a system your team can run without us in the room.",
    },
  ],
} as const;

export const COMPARISON = {
  left: {
    title: "What Most Agencies Do",
    points: [
      "One service. Four vendors. No shared vision.",
      "Volume over quality.",
      "Cold outreach.",
    ],
  },
  right: {
    title: "What ARVA Does",
    points: [
      "One studio. Content + Web + Automation + Design. Connected.",
      "Fewer deliverables. More intentional. Each one built to last.",
      "Content that earns clients. Work that proves itself. Legacy, not just output.",
    ],
  },
} as const;
