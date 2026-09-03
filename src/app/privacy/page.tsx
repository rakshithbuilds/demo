import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — ARVA Studios",
  description: "How ARVA Studios handles the information you send us.",
};

/**
 * Placeholder privacy policy (spec §33.5).
 *
 * §33.5 allows a placeholder page for launch, but requires the link and the
 * consent line to exist and resolve. This describes what the site actually
 * does today — collect a lead form submission, store it, and email about it —
 * rather than boilerplate claiming practices we do not have.
 *
 * TODO — CONFIRM: replace with a reviewed policy before launch. It should
 * cover the retention period, the processors (Supabase, Resend, Sentry) and
 * their regions, and how to request deletion.
 */
export default function PrivacyPage() {
  return (
    // tabIndex allows the skip link to move focus here, not just scroll.
    <main id="main" tabIndex={-1} className="outline-none">
      <Section id="privacy" tone="dark" labelledBy="privacy-heading">
        <div className="flex max-w-2xl flex-col gap-6">
          <h1
            id="privacy-heading"
            className="type-display text-4xl sm:text-5xl"
          >
            Privacy Policy
          </h1>

          <div className="flex flex-col gap-4 font-body text-base leading-relaxed text-mist">
            <p>
              This is a placeholder policy for launch. It describes what the
              site does today.
            </p>
            <h2 className="pt-4 font-body text-lg font-medium text-fog">
              What we collect
            </h2>
            <p>
              Only what you type into the contact form: your name, email, and
              optionally your company, project type, budget range and message.
              We do not use advertising trackers.
            </p>
            <h2 className="pt-4 font-body text-lg font-medium text-fog">
              What we do with it
            </h2>
            <p>
              We store it so we can reply, and we email you a confirmation.
              We use it to get in touch about your project — nothing else. We do
              not sell it or share it for marketing.
            </p>
            <h2 className="pt-4 font-body text-lg font-medium text-fog">
              Removing your details
            </h2>
            <p>
              Email{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-gold underline underline-offset-4"
              >
                {CONTACT.email}
              </a>{" "}
              and we will delete what we hold.
            </p>
          </div>

          <Link
            href="/"
            className="mt-4 self-start font-body text-sm text-mist underline underline-offset-4 hover:text-gold"
          >
            ← Back to ARVA Studios
          </Link>
        </div>
      </Section>
    </main>
  );
}
