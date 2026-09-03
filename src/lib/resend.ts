import "server-only";

import { Resend } from "resend";

import { requireServerEnv } from "@/lib/env";

/**
 * Resend client for transactional email (spec §33.2).
 *
 * Constructed per-call so a missing API key throws where the caller can catch
 * it. Email failures must never fail a lead submission that already landed in
 * the database — see the route handler for that split (spec §33.3).
 */
export function createResendClient(): Resend {
  return new Resend(requireServerEnv("RESEND_API_KEY"));
}

/** Verified sender identity, e.g. `ARVA Studio <hello@arvastudios.in>`. */
export function getFromAddress(): string {
  return requireServerEnv("RESEND_FROM_EMAIL");
}

/** Internal inbox that receives new-lead notifications. */
export function getInternalNotificationEmail(): string {
  return requireServerEnv("INTERNAL_NOTIFICATION_EMAIL");
}
