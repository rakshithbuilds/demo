import { Eyebrow, Rule, Section } from "@/components/layout/Section";
import { Pill } from "@/components/ui/Pill";
import { Table, TBody, Td, Th, THead, Tr } from "@/components/ui/Table";
import { WEB_PRODUCTS } from "@/lib/content";

/**
 * Web Products detail (spec §32.6).
 *
 * §31 requires two distinct treatments for the pricing: a real `<table>` with
 * scoped row headers from `md` up, and a stacked list of price cards below it.
 * Both are rendered and toggled with `hidden`, which is `display: none` — so
 * assistive tech only ever encounters one of them, never a duplicate.
 * Restyling a single table into cards would mean overriding `display` on table
 * elements, which is exactly what breaks their semantics.
 *
 * Prices are informational only. §34 forbids any checkout or "Buy" affordance.
 */
export function WebProducts() {
  return (
    <Section id="web-products" tone="dark" labelledBy="web-products-heading">
      <div className="flex flex-col gap-10 lg:gap-14">
        <div className="flex max-w-2xl flex-col gap-6">
          <Eyebrow index="04">Web Products</Eyebrow>
          <h2
            id="web-products-heading"
            className="type-display text-4xl sm:text-5xl lg:text-6xl"
          >
            {WEB_PRODUCTS.headline}
          </h2>
          <Rule />
        </div>

        {/* md and up — the real table */}
        <div className="hidden md:block">
          <Table caption="Web product starting prices in Indian rupees">
            <THead>
              <Tr>
                <Th scope="col">Product</Th>
                <Th scope="col" className="pr-0 text-right">
                  Starting Price
                </Th>
              </Tr>
            </THead>
            <TBody>
              {WEB_PRODUCTS.pricing.map((row) => (
                <Tr key={row.product}>
                  <Th scope="row">{row.product}</Th>
                  <Td className="pr-0 text-right text-gold tabular-nums">
                    {row.price}
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </div>

        {/* below md — stacked price cards */}
        <ul className="flex flex-col gap-3 md:hidden">
          {WEB_PRODUCTS.pricing.map((row) => (
            <li
              key={row.product}
              className="flex items-baseline justify-between gap-4 rounded-control border border-rule-dark bg-ink-raised px-5 py-4"
            >
              <span className="font-body text-base text-fog">{row.product}</span>
              <span className="font-body text-base text-gold tabular-nums">
                {row.price}
              </span>
            </li>
          ))}
        </ul>

        <p className="max-w-xl font-body text-sm leading-relaxed text-mist">
          {WEB_PRODUCTS.note}
        </p>

        <div className="flex flex-col gap-4 border-t border-rule-dark pt-8">
          <h3 className="font-body text-xs font-medium tracking-[0.2em] text-muted uppercase">
            Built With
          </h3>
          <ul className="flex flex-wrap gap-2">
            {WEB_PRODUCTS.builtWith.map((tech) => (
              <li key={tech}>
                <Pill>{tech}</Pill>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
