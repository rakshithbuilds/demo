"use client";

import Link from "next/link";
import { useId, useState } from "react";

import type { LeadResponse } from "@/app/api/lead/route";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import {
  BUDGET_RANGES,
  EMPTY_LEAD,
  PROJECT_TYPES,
  validateLead,
  type FieldErrors,
  type LeadInput,
} from "@/lib/leads";

/**
 * Lead-capture form (spec §33). Lives inline in the Final CTA section, not on
 * a page of its own (§33).
 *
 * Real submission: it POSTs to /api/lead, which writes to Supabase and sends
 * through Resend. Nothing here is simulated.
 */
export function LeadForm() {
  const uid = useId();
  const [values, setValues] = useState<LeadInput>(EMPTY_LEAD);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  const field = (name: keyof LeadInput) => `${uid}-${name}`;

  const update = (name: keyof LeadInput, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the visitor edits it; leaving stale red
    // text under a field they just fixed reads as broken.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    setFormError(null);

    // Client-side pass first (§33.2) so obvious mistakes never cost a request.
    const local = validateLead(values);
    if (!local.ok) {
      setErrors(local.errors);
      setFormError("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    setPending(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: LeadResponse = await response.json().catch(() => ({ ok: false }));

      if (!response.ok || !data.ok) {
        // Field-level messages from the server take precedence (§33.3).
        if (data.errors) setErrors(data.errors);
        setFormError(
          data.message ??
            "Something went wrong. Please try again in a moment.",
        );
        return;
      }

      setDone(true);
    } catch {
      // Network failure. The form keeps every value so retrying costs nothing
      // (§33.3 — preserved form data).
      setFormError(
        "We could not reach the server. Check your connection and try again.",
      );
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div
        role="status"
        className="flex flex-col gap-3 rounded-control border border-gold/40 bg-ink-raised p-8"
      >
        <p className="type-display text-3xl text-fog">You&rsquo;re in.</p>
        <p className="font-body text-base leading-relaxed text-mist">
          Thanks — we&rsquo;ll be in touch within 1 business day. Check your
          inbox for a confirmation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {/* Honeypot (§33.6). Hidden from sight and from assistive tech, and
          excluded from tab order — a human should never encounter it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={field("website")}>Website</label>
        <input
          id={field("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id={field("name")}
          label="Name"
          name="name"
          required
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <Input
          id={field("email")}
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={(e) => update("email", e.target.value)}
        />
        <Input
          id={field("company")}
          label="Company"
          name="company"
          autoComplete="organization"
          value={values.company}
          error={errors.company}
          onChange={(e) => update("company", e.target.value)}
        />
        <Select
          id={field("projectType")}
          label="Project type"
          name="projectType"
          value={values.projectType}
          error={errors.projectType}
          onChange={(e) => update("projectType", e.target.value)}
        >
          <option value="">Select one</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <Select
          id={field("budgetRange")}
          label="Budget range"
          name="budgetRange"
          value={values.budgetRange}
          error={errors.budgetRange}
          onChange={(e) => update("budgetRange", e.target.value)}
        >
          <option value="">Select one</option>
          {BUDGET_RANGES.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </Select>
        <div className="sm:col-span-2">
          <Textarea
            id={field("message")}
            label="Message"
            name="message"
            rows={5}
            placeholder="Tell us what you're building."
            value={values.message}
            error={errors.message}
            onChange={(e) => update("message", e.target.value)}
          />
        </div>
      </div>

      {/* Announced, not merely coloured — a visitor using a screen reader has
          to hear that the submission failed. */}
      {formError ? (
        <p
          role="alert"
          className="rounded-control border border-red-400/40 bg-red-950/30 px-4 py-3 font-body text-sm text-red-300"
        >
          {formError}
        </p>
      ) : null}

      <div className="flex flex-col gap-3">
        <Button type="submit" size="lg" pending={pending} className="self-start">
          Send It
        </Button>
        <p className="font-body text-xs leading-relaxed text-muted">
          We&rsquo;ll only use this to get in touch about your project. See our{" "}
          <Link
            href="/privacy"
            className="text-mist underline underline-offset-4 hover:text-gold"
          >
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
