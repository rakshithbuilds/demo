import { Eyebrow, Rule, Section } from "@/components/layout/Section";
import { PROCESS } from "@/lib/content";

/**
 * Process (spec §32.9) — the second cream section. An ordered list, stacked
 * vertically at every size.
 *
 * Both §26.2 fixes are structural rather than tuned:
 *
 * - **Ghost numeral clearance.** The earlier build let the background numeral
 *   collide with the headline under ~400px. Rather than tuning offsets per
 *   breakpoint, the numeral is scoped to the *steps* container, which begins
 *   below the headline block — so it cannot reach the headline at any width.
 * - **Step meta stacks under ~380px.** "WEEK 0" and friends sit inline beside
 *   the step name from 380px up and drop below it under that (§19.5).
 */
export function Process() {
  return (
    <Section id="process" tone="light" labelledBy="process-heading">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex max-w-2xl flex-col gap-6">
          <Eyebrow index="07" tone="light">
            How We Work
          </Eyebrow>
          <h2
            id="process-heading"
            className="type-display text-4xl sm:text-6xl lg:text-7xl"
          >
            {PROCESS.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <Rule tone="light" />
        </div>

        {/* The ghost numeral lives here, not at section level — it physically
            cannot overlap the headline above. */}
        <div className="relative overflow-hidden">
          {/* data-ghost-numeral marks the §26.2 background numeral, whose
              clearance from the headline is asserted in QA rather than
              eyeballed. */}
          <span
            aria-hidden="true"
            data-ghost-numeral=""
            className="pointer-events-none absolute -top-6 -right-4 select-none type-display text-[7rem] leading-none text-ink/[0.05] sm:text-[12rem] lg:text-[16rem]"
          >
            04
          </span>

          <ol className="relative flex flex-col">
            {PROCESS.steps.map((step) => (
              <li
                key={step.name}
                className="flex flex-col gap-3 border-t border-rule-light py-8 last:border-b sm:flex-row sm:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="type-display text-2xl text-gold-deep sm:w-16 sm:shrink-0 sm:text-3xl"
                >
                  {step.index}
                </span>

                <div className="flex flex-col gap-2">
                  {/* Inline from 380px, stacked below it (§19.5, §26.2). */}
                  <div className="flex flex-col gap-1 min-[380px]:flex-row min-[380px]:items-baseline min-[380px]:gap-4">
                    <h3 className="font-body text-xl font-medium text-ink">
                      {step.name}
                    </h3>
                    <span className="font-body text-xs font-medium tracking-[0.18em] text-gold-deep uppercase">
                      {step.meta}
                    </span>
                  </div>
                  <p className="max-w-2xl font-body text-base leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
