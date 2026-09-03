import { Eyebrow, Rule, Section } from "@/components/layout/Section";
import { PILLARS } from "@/lib/content";

/**
 * Four Pillars. One Studio. (spec §32.4)
 *
 * 1 column at 360, 2 at sm/md, 4 at lg+.
 *
 * Two §26.3 fixes are built in rather than retrofitted:
 *
 * - **Index numbers read as a deliberate system.** 01–04 are set large in the
 *   display face and in gold, not as incidental small grey labels.
 * - **A connecting rail on mobile.** Stacked, the cards would read as four
 *   isolated boxes; a hairline down the left edge ties them into one system,
 *   which is the §8 point of the whole section. The rail is drawn only in the
 *   single-column layout, where the cards actually stack.
 */
export function Pillars() {
  return (
    <Section id="pillars" tone="dark" labelledBy="pillars-heading">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex max-w-2xl flex-col gap-6">
          <Eyebrow index="02">What We Do</Eyebrow>
          <h2
            id="pillars-heading"
            className="type-display text-4xl sm:text-6xl lg:text-7xl"
          >
            Four Pillars.
            <br />
            One Studio.
          </h2>
          <Rule />
        </div>

        <ul className="relative grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {/* The connecting rail — single-column layout only. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 bottom-2 left-0 w-px bg-gold/25 sm:hidden"
          />

          {PILLARS.map((pillar) => (
            <li
              key={pillar.id}
              className="group relative flex flex-col gap-5 border-t border-rule-dark py-8 pl-6 sm:border-t-0 sm:border-l sm:py-0 sm:pl-6 lg:pl-8"
            >
              {/* The rail's node for this card, on mobile. */}
              <span
                aria-hidden="true"
                className="absolute top-9 -left-[3px] size-[7px] rounded-full bg-gold sm:hidden"
              />

              <span
                aria-hidden="true"
                className="type-display text-4xl text-gold sm:text-5xl"
              >
                {pillar.index}
              </span>

              <div className="flex flex-col gap-3">
                <h3 className="font-body text-xl font-medium text-fog">
                  {pillar.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-mist">
                  {pillar.summary}
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {pillar.services.map((service) => (
                  <li
                    key={service}
                    className="font-body text-sm text-muted"
                  >
                    {service}
                  </li>
                ))}
              </ul>

              {/* §32.4: a full accessible name, not a repeated bare "Explore →".
                  Four identical link names would be useless in a screen
                  reader's link list. */}
              <a
                href={`#${pillar.id}`}
                className="mt-auto inline-flex items-center gap-2 pt-2 font-body text-xs font-medium tracking-[0.16em] text-fog uppercase underline-offset-4 transition-colors duration-200 hover:text-gold hover:underline focus-visible:text-gold"
              >
                Explore
                <span className="sr-only"> {pillar.title} services</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
