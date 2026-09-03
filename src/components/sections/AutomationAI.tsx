import { Eyebrow, Rule, Section } from "@/components/layout/Section";
import { AUTOMATION_AI } from "@/lib/content";

/**
 * Automation & AI detail (spec §32.7).
 *
 * Each tier is its own labelled region with its own heading, per §32.7, rather
 * than three visually-distinct but structurally-flat blocks.
 */
export function AutomationAI() {
  return (
    <Section id="automation-ai" tone="dark" labelledBy="automation-ai-heading">
      <div className="flex flex-col gap-10 lg:gap-14">
        <div className="flex max-w-2xl flex-col gap-6">
          <Eyebrow index="05">Automation &amp; AI</Eyebrow>
          <h2
            id="automation-ai-heading"
            className="type-display text-4xl sm:text-5xl lg:text-6xl"
          >
            {AUTOMATION_AI.headline}
          </h2>
          <Rule />
        </div>

        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {AUTOMATION_AI.tiers.map((tier) => {
            const headingId = `tier-${tier.name.toLowerCase().replace(/[^a-z]+/g, "-")}`;
            return (
              <li key={tier.name}>
                <section
                  aria-labelledby={headingId}
                  className="flex h-full flex-col gap-5 rounded-control border border-rule-dark bg-ink-raised p-6 lg:p-8"
                >
                  <div className="flex flex-col gap-2">
                    <h3
                      id={headingId}
                      className="font-body text-lg font-medium text-fog"
                    >
                      {tier.name}
                    </h3>
                    {/* TODO — CONFIRM (§32.7, open item 6): the third tier's
                        price was cut off in the source with no fragment to
                        reconstruct from. Rather than invent a public figure it
                        renders as "scoped on request", which is also what the
                        §32.6 footer note promises. Replace once confirmed. */}
                    <p
                      className={
                        "priceUnconfirmed" in tier && tier.priceUnconfirmed
                          ? "font-body text-base text-mist"
                          : "font-body text-xl text-gold tabular-nums"
                      }
                    >
                      {tier.price}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    {tier.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 font-body text-sm leading-relaxed text-mist"
                      >
                        <span aria-hidden="true" className="text-gold">
                          —
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </section>
              </li>
            );
          })}
        </ul>

        <p className="max-w-xl font-body text-sm leading-relaxed text-mist">
          {AUTOMATION_AI.note}
        </p>
      </div>
    </Section>
  );
}
