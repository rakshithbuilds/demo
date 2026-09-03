import { Eyebrow } from "@/components/layout/Section";
import { COMPARISON } from "@/lib/content";

/**
 * Comparison split-screen (spec §32.10).
 *
 * True side-by-side from `lg`; below that it stacks dark panel first, then
 * light (§31). Source order is dark-then-light, so the stacking order is the
 * DOM order — no visual reordering that would desync from the reading order.
 *
 * This section sets its own grounds per panel, so it does not use the shared
 * Section wrapper's single tone.
 */
export function Comparison() {
  return (
    <section
      id="comparison"
      data-section=""
      tabIndex={-1}
      aria-labelledby="comparison-heading"
      className="scroll-mt-[calc(var(--header-h-sm)+1.5rem)] outline-none"
    >
      <h2 id="comparison-heading" className="sr-only">
        How ARVA compares to a traditional agency
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Dark panel — first in source, so first when stacked. */}
        <div className="section-dark flex flex-col gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <Eyebrow index="08">The Old Way</Eyebrow>
          <h3 className="type-display text-3xl sm:text-4xl lg:text-5xl">
            {COMPARISON.left.title}
          </h3>
          <ul className="flex flex-col gap-5">
            {COMPARISON.left.points.map((point) => (
              <li
                key={point}
                className="border-t border-rule-dark pt-5 font-body text-base leading-relaxed text-muted"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Light panel */}
        <div className="section-light flex flex-col gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <Eyebrow tone="light">The ARVA Way</Eyebrow>
          <h3 className="type-display text-3xl sm:text-4xl lg:text-5xl">
            {COMPARISON.right.title}
          </h3>
          <ul className="flex flex-col gap-5">
            {COMPARISON.right.points.map((point) => (
              <li
                key={point}
                className="border-t border-rule-light pt-5 font-body text-base leading-relaxed text-ink"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
