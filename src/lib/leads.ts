/**
 * Lead-capture field definitions and validation (spec §33.1, §33.2).
 *
 * Deliberately shared between the browser and the route handler so the two
 * cannot drift: §33.2 requires validation on both sides, and duplicating the
 * rules is how they end up disagreeing. No `server-only` here — this module is
 * imported by the client form.
 */

/** §33.1 project types, matching the four pillars plus an escape hatch. */
export const PROJECT_TYPES = [
  "Content & Video",
  "Web Products",
  "Automation & AI",
  "Brand Design",
  "Not sure yet",
] as const;

/**
 * Budget bands. §33.1 requires the dropdown but does not enumerate the
 * options, so these are derived from the published §32.6/§32.7 price points
 * rather than invented from nothing.
 */
export const BUDGET_RANGES = [
  "Under ₹25,000",
  "₹25,000 – 50,000",
  "₹50,000 – 1,00,000",
  "₹1,00,000+",
  "Not sure yet",
] as const;

export type LeadInput = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budgetRange: string;
  message: string;
  /** Honeypot (§33.6). Must stay empty; bots fill it in. */
  website: string;
};

export type FieldErrors = Partial<Record<keyof LeadInput, string>>;

export const EMPTY_LEAD: LeadInput = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budgetRange: "",
  message: "",
  website: "",
};

const MAX = {
  name: 120,
  email: 254, // RFC 5321 maximum length of an address
  company: 160,
  message: 4000,
} as const;

/**
 * Pragmatic address check: something before an @, something after it, a dot,
 * and no whitespace. Deliberately not a full RFC 5322 grammar — that rejects
 * real addresses more often than it catches fake ones, and delivery is the
 * only real proof anyway.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export type ValidationResult =
  | { ok: true; value: LeadInput }
  | { ok: false; errors: FieldErrors };

export function validateLead(raw: Partial<Record<keyof LeadInput, unknown>>): ValidationResult {
  const value: LeadInput = {
    name: str(raw.name),
    email: str(raw.email),
    company: str(raw.company),
    projectType: str(raw.projectType),
    budgetRange: str(raw.budgetRange),
    message: str(raw.message),
    website: str(raw.website),
  };

  const errors: FieldErrors = {};

  if (!value.name) {
    errors.name = "Please tell us your name.";
  } else if (value.name.length > MAX.name) {
    errors.name = `Please keep this under ${MAX.name} characters.`;
  }

  if (!value.email) {
    errors.email = "We need an email to reply to.";
  } else if (value.email.length > MAX.email || !EMAIL_PATTERN.test(value.email)) {
    errors.email = "That does not look like a valid email address.";
  }

  if (value.company.length > MAX.company) {
    errors.company = `Please keep this under ${MAX.company} characters.`;
  }

  // Optional, but if supplied it must be one of ours — a value outside the
  // list means a tampered payload, not a typo.
  if (value.projectType && !PROJECT_TYPES.includes(value.projectType as (typeof PROJECT_TYPES)[number])) {
    errors.projectType = "Please choose one of the listed options.";
  }

  if (value.budgetRange && !BUDGET_RANGES.includes(value.budgetRange as (typeof BUDGET_RANGES)[number])) {
    errors.budgetRange = "Please choose one of the listed options.";
  }

  if (value.message.length > MAX.message) {
    errors.message = `Please keep this under ${MAX.message} characters.`;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value };
}

function str(input: unknown): string {
  return typeof input === "string" ? input.trim() : "";
}
