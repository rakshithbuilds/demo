import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

import { validateLead, type FieldErrors } from "@/lib/leads";
import {
  createResendClient,
  getFromAddress,
  getInternalNotificationEmail,
} from "@/lib/resend";
import { createAdminClient, type LeadInsert } from "@/lib/supabase/admin";

/**
 * Lead capture (spec §33.2, §33.3).
 *
 * The two failure modes are handled differently on purpose:
 *
 * - **Insert fails** → the lead is lost, so the visitor is told, with their
 *   data preserved client-side so they can retry.
 * - **Insert succeeds, email fails** → the lead is safe. Telling the visitor
 *   it failed would be a lie that makes them submit twice. They see success;
 *   the email failure goes to Sentry for us to chase (§33.3).
 */

export type LeadResponse = {
  ok: boolean;
  message?: string;
  errors?: FieldErrors;
};

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json<LeadResponse>(
      { ok: false, message: "We could not read that submission. Please try again." },
      { status: 400 },
    );
  }

  const result = validateLead(
    (payload ?? {}) as Partial<Record<string, unknown>>,
  );

  if (!result.ok) {
    return NextResponse.json<LeadResponse>(
      { ok: false, message: "Please check the highlighted fields.", errors: result.errors },
      { status: 400 },
    );
  }

  const lead = result.value;

  // §33.6: a filled honeypot is a bot. Respond exactly as if it worked —
  // revealing the trap just teaches the next attempt to avoid it — but write
  // nothing and send nothing.
  if (lead.website) {
    return NextResponse.json<LeadResponse>({ ok: true });
  }

  const row: LeadInsert = {
    name: lead.name,
    email: lead.email,
    company: lead.company || null,
    project_type: lead.projectType || null,
    budget_range: lead.budgetRange || null,
    message: lead.message || null,
  };

  // ---- 1. Persist. A failure here is the one the visitor must hear about. --
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("leads").insert(row);
    if (error) throw new Error(`Supabase insert failed: ${error.message}`);
  } catch (error) {
    Sentry.captureException(error, { tags: { route: "lead", stage: "insert" } });
    return NextResponse.json<LeadResponse>(
      {
        ok: false,
        message:
          "Something went wrong saving your details. Please try again — or email us directly.",
      },
      { status: 500 },
    );
  }

  // ---- 2. Notify. The lead is already safe; failures here never surface. ---
  try {
    await sendEmails(lead);
  } catch (error) {
    Sentry.captureException(error, { tags: { route: "lead", stage: "email" } });
  }

  return NextResponse.json<LeadResponse>({ ok: true });
}

async function sendEmails(lead: {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budgetRange: string;
  message: string;
}) {
  const resend = createResendClient();
  const from = getFromAddress();

  const detail = (label: string, value: string) =>
    value ? `${label}: ${value}` : null;

  const summary = [
    detail("Name", lead.name),
    detail("Email", lead.email),
    detail("Company", lead.company),
    detail("Project type", lead.projectType),
    detail("Budget", lead.budgetRange),
    detail("Message", lead.message),
  ]
    .filter(Boolean)
    .join("\n");

  // Sent together so one failure does not silently skip the other; the caller
  // logs whatever rejects.
  const results = await Promise.allSettled([
    resend.emails.send({
      from,
      to: lead.email,
      subject: "Thanks — we'll be in touch",
      text: [
        `${lead.name},`,
        "",
        "Thanks for reaching out to ARVA Studios. We'll be in touch within 1 business day.",
        "",
        "— ARVA Studios",
        "Bengaluru",
      ].join("\n"),
    }),
    resend.emails.send({
      from,
      to: getInternalNotificationEmail(),
      replyTo: lead.email,
      subject: `New lead: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      text: summary,
    }),
  ]);

  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length > 0) {
    throw new AggregateError(
      failures.map((f) => (f as PromiseRejectedResult).reason),
      "One or more lead emails failed to send",
    );
  }

  // Resend reports per-message errors in the body rather than by throwing.
  for (const r of results) {
    if (r.status === "fulfilled" && r.value.error) {
      throw new Error(`Resend rejected a message: ${r.value.error.message}`);
    }
  }
}
