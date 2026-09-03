/**
 * Studio identity and outbound links used by the shell (spec §32.12).
 *
 * Collected here rather than inlined so the placeholder ones below are easy to
 * find and correct in a single place.
 */

export const SITE = {
  name: "ARVA Studios",
  tagline: "We build the digital system behind your business.",
  location: "Bengaluru · Est. 2026",
  /** Repeated nav tags in the footer (§32.12). */
  disciplines: ["Content", "Web", "Automation", "Design"],
} as const;

/**
 * TODO — CONFIRM: no contact address or social handles were supplied with the
 * spec. §32.12 requires all three in the footer, so these are placeholders —
 * plausible, but unverified. Correct them before launch; a footer link that
 * points at the wrong profile is worse than one that points nowhere.
 */
export const CONTACT = {
  email: "hello@arvastudios.in",
  instagram: "https://www.instagram.com/arvastudios",
  linkedin: "https://www.linkedin.com/company/arvastudios",
} as const;

/**
 * Footer navigation (§32.12): three labelled regions.
 *
 * Every destination is an in-page anchor into the 12-section IA, so the hrefs
 * resolve once Phases 4–7 land. Note there are deliberately no "active" states
 * here — see the Footer component for why (§26.1).
 */
export const FOOTER_NAV = [
  {
    label: "Services",
    links: [
      { href: "#content-video", label: "Content & Video" },
      { href: "#web-products", label: "Web Products" },
      { href: "#automation-ai", label: "Automation & AI" },
      { href: "#brand-design", label: "Brand Design" },
    ],
  },
  {
    label: "Studio",
    links: [
      { href: "#about", label: "About" },
      { href: "#pillars", label: "Four Pillars" },
      { href: "#process", label: "Process" },
      { href: "#comparison", label: "Why ARVA" },
    ],
  },
  {
    label: "Connect",
    links: [
      { href: "#contact", label: "Start a Project" },
      { href: `mailto:${CONTACT.email}`, label: CONTACT.email },
      { href: CONTACT.instagram, label: "Instagram", external: true },
      { href: CONTACT.linkedin, label: "LinkedIn", external: true },
    ],
  },
] as const;
