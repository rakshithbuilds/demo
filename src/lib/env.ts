/**
 * Central environment access (spec §35).
 *
 * Env vars are read here and nowhere else, so there is exactly one place to
 * audit for hardcoded values. `NEXT_PUBLIC_*` references must stay statically
 * analysable (`process.env.NEXT_PUBLIC_X`) for Next.js to inline them.
 */

/**
 * The placeholder shipped in `.env.example`. Treated as "not configured yet"
 * so a half-set-up environment behaves the same as an unset one.
 *
 * TODO — CONFIRM (spec §33.7, open item 2): the real Google Calendar
 * scheduling URL has not been supplied. Until `NEXT_PUBLIC_CALENDAR_LINK` is
 * set to it, `getCalendarLink()` returns null and every "Book a Call" caller
 * hides or relabels itself. Nothing needs to change in code when the link
 * arrives — only the env var.
 */
export const CALENDAR_LINK_PLACEHOLDER =
  "https://calendar.google.com/calendar/appointments/REPLACE_ME";

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * The external Google Calendar scheduling URL, or `null` when it is unset or
 * still the placeholder.
 *
 * Spec §33.7: callers MUST handle `null` by hiding the "Book a Call" button or
 * relabelling it — never by linking to a dead placeholder URL.
 */
export function getCalendarLink(): string | null {
  const raw = clean(process.env.NEXT_PUBLIC_CALENDAR_LINK);
  if (!raw || raw === CALENDAR_LINK_PLACEHOLDER) return null;
  return raw;
}

/**
 * Canonical site origin, used to build absolute Open Graph and canonical URLs.
 * Falls back to the production domain so metadata is still well-formed in a
 * checkout with no env file.
 */
export function getSiteUrl(): string {
  return clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://arvastudios.in";
}

/** Supabase URL + anon key. Public by design; safe to reach the browser. */
export function getPublicSupabaseConfig(): { url: string; anonKey: string } | null {
  const url = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const anonKey = clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

/**
 * Reads a server-only env var, throwing a named error when absent.
 * Never call this from a Client Component.
 */
export function requireServerEnv(name: string): string {
  const value = clean(process.env[name]);
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. See .env.example.`,
    );
  }
  return value;
}
