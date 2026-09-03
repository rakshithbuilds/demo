import { Eyebrow, Rule, Section } from "@/components/layout/Section";
import { LeadForm } from "@/components/sections/LeadForm";
import { BookACallButton } from "@/components/BookACallButton";
import { FINAL_CTA } from "@/lib/content";

/**
 * Final CTA (spec §32.11), with the lead form inline (§33).
 *
 * The hero's primary CTA and the footer's "Start a Project" both target
 * `#contact`, which is this section — the Phase 3 offset keeps the heading
 * clear of the sticky header on arrival.
 */
export function FinalCta() {
  return (
    <Section id="contact" tone="dark" labelledBy="contact-heading">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <Eyebrow index="09">Start Here</Eyebrow>
          <h2
            id="contact-heading"
            className="type-display text-4xl sm:text-5xl lg:text-6xl"
          >
            {FINAL_CTA.headline}
          </h2>
          <Rule />
          <p className="max-w-lg font-body text-base leading-relaxed text-mist sm:text-lg">
            {FINAL_CTA.body}
          </p>

          <dl className="flex flex-wrap gap-x-12 gap-y-6 border-t border-rule-dark pt-8">
            {FINAL_CTA.milestones.map((milestone) => (
              <div key={milestone.label} className="flex flex-col gap-1">
                <dt className="font-body text-xs font-medium tracking-[0.18em] text-muted uppercase">
                  {milestone.label}
                </dt>
                <dd className="type-display text-2xl text-gold">
                  {milestone.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-4">
            <BookACallButton size="lg" className="self-start" />
            <p className="font-body text-sm text-muted">
              {FINAL_CTA.reassurance}
            </p>
          </div>
        </div>

        <div className="lg:pt-2">
          <LeadForm />
        </div>
      </div>
    </Section>
  );
}
