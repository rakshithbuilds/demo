import { Eyebrow, Rule, Section } from "@/components/layout/Section";
import { BRAND_DESIGN } from "@/lib/content";

/** Brand Design detail (spec §32.8) — 1 col at 360, 2 at sm, 3 at lg+. */
export function BrandDesign() {
  return (
    <Section id="brand-design" tone="dark" labelledBy="brand-design-heading">
      <div className="flex flex-col gap-10 lg:gap-14">
        <div className="flex max-w-2xl flex-col gap-6">
          <Eyebrow index="06">Brand Design</Eyebrow>
          <h2
            id="brand-design-heading"
            className="type-display text-4xl sm:text-5xl lg:text-6xl"
          >
            {BRAND_DESIGN.headline}
          </h2>
          <Rule />
        </div>

        <ul className="grid grid-cols-1 gap-x-10 gap-y-px sm:grid-cols-2 lg:grid-cols-3">
          {BRAND_DESIGN.items.map((item) => (
            <li
              key={item.name}
              className="flex flex-col gap-2 border-t border-rule-dark py-6"
            >
              <h3 className="font-body text-base font-medium text-fog">
                {item.name}
              </h3>
              <p className="font-body text-sm leading-relaxed text-mist">
                {item.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
