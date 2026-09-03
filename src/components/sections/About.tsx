import { Eyebrow, Rule, Section } from "@/components/layout/Section";
import { StatCounter } from "@/components/sections/StatCounter";
import { ABOUT } from "@/lib/content";

/**
 * About / Manifesto (spec §32.3) — the first cream section in the §29.1
 * rhythm.
 */
export function About() {
  return (
    <Section id="about" tone="light" labelledBy="about-heading">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex max-w-3xl flex-col gap-6">
          <Eyebrow index="01" tone="light">
            The Studio
          </Eyebrow>
          <h2
            id="about-heading"
            className="type-display text-4xl sm:text-6xl lg:text-7xl"
          >
            {ABOUT.headline}
          </h2>
          <Rule tone="light" />
          <div className="flex flex-col gap-4">
            {ABOUT.body.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-2xl font-body text-base leading-relaxed text-ink-soft sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Stat callouts. A definition list is the honest markup here: each
            number is a value for a labelled term. */}
        <dl className="grid grid-cols-1 gap-8 border-t border-rule-light pt-10 sm:grid-cols-3">
          {ABOUT.stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <dd className="type-display text-6xl text-ink sm:text-7xl">
                <StatCounter value={stat.value} delayMs={i * 120} />
              </dd>
              <dt className="font-body text-xs font-medium tracking-[0.18em] text-ink-soft uppercase">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
