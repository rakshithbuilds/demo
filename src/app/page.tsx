import { Button, ButtonLink } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { Pill } from "@/components/ui/Pill";
import { Table, TBody, Td, Th, THead, Tr } from "@/components/ui/Table";

/**
 * Phase 1 specimen page — the token layer and primitives on both section
 * grounds, for review. Replaced by the real 12-section page in Phases 4–7.
 */

const SWATCHES = [
  ["ink", "#0A0A0A", "dark ground"],
  ["ink-raised", "#131316", "raised dark"],
  ["cream", "#F4F1EA", "light ground"],
  ["cream-raised", "#EAE6DC", "raised cream"],
  ["fog", "#EDEDEF", "primary / dark · 16.9:1"],
  ["mist", "#A8A8B3", "body / dark · 8.4:1"],
  ["muted", "#83838F", "tertiary / dark · 5.3:1"],
  ["ink-soft", "#5A5A63", "body / cream · 6.1:1"],
  ["gold", "#C9A227", "accent / dark · 8.2:1"],
  ["gold-deep", "#7D6212", "accent / cream · 5.1:1"],
] as const;

function Eyebrow({ children, light }: { children: string; light?: boolean }) {
  return (
    <p
      className={`font-body text-xs font-medium tracking-[0.2em] uppercase ${
        light ? "text-gold-deep" : "text-gold"
      }`}
    >
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <main>
      {/* ---------------- Dark ground ---------------- */}
      <section className="section-dark px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-14">
          <div className="flex flex-col gap-4">
            <Eyebrow>Phase 1 / Design Tokens</Eyebrow>
            <h1 className="type-display text-5xl sm:text-7xl lg:text-8xl">
              Build.
              <br />
              Create.
              <br />
              Automate.
            </h1>
            <div className="h-px w-24 bg-gold" />
            <p className="max-w-xl font-body text-base leading-relaxed text-mist">
              Anton for display, Archivo for body. One accent. Near-black and
              cream. Everything below is the primitive set — no page sections yet.
            </p>
          </div>

          {/* Palette */}
          <div className="flex flex-col gap-4">
            <Eyebrow>Palette</Eyebrow>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {SWATCHES.map(([name, hex, note]) => (
                <li
                  key={name}
                  className="flex flex-col gap-2 rounded-control border border-rule-dark p-3"
                >
                  <span
                    className="h-10 w-full rounded-[4px] border border-rule-dark"
                    style={{ background: hex }}
                  />
                  <span className="font-body text-xs text-fog">{name}</span>
                  <span className="font-body text-[11px] text-muted">{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons on dark */}
          <div className="flex flex-col gap-4">
            <Eyebrow>Buttons / On Dark</Eyebrow>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg">Book Your Early Access</Button>
              <Button variant="secondary" arrow="down">
                What We Do
              </Button>
              <Button disabled>Disabled</Button>
              <Button pending>Submit</Button>
            </div>
          </div>

          {/* Pills */}
          <div className="flex flex-col gap-4">
            <Eyebrow>Pills</Eyebrow>
            <div className="flex flex-wrap items-center gap-3">
              <Pill accent>Early Access — Dec 2026</Pill>
              <Pill>Next.js</Pill>
              <Pill>Supabase</Pill>
              <Pill>Vercel</Pill>
            </div>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            <Eyebrow>Form Controls</Eyebrow>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input id="spec-name" label="Name" required placeholder="Your name" />
              <Input
                id="spec-email"
                label="Email"
                type="email"
                required
                error="Enter a valid email address."
                defaultValue="not-an-email"
              />
              <Select id="spec-project" label="Project type" required defaultValue="">
                <option value="" disabled>
                  Select one
                </option>
                <option>Content &amp; Video</option>
                <option>Web Products</option>
                <option>Automation &amp; AI</option>
                <option>Brand Design</option>
                <option>Not sure yet</option>
              </Select>
              <Input
                id="spec-company"
                label="Company"
                hint="Helps us scope the conversation."
              />
              <div className="sm:col-span-2">
                <Textarea id="spec-message" label="Message" placeholder="Tell us what you're building." />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="flex flex-col gap-4">
            <Eyebrow>Table</Eyebrow>
            <Table caption="Example pricing table showing scoped row headers">
              <THead>
                <Tr>
                  <Th scope="col">Product</Th>
                  <Th scope="col" className="text-right">
                    Starting Price
                  </Th>
                </Tr>
              </THead>
              <TBody>
                {[
                  ["Landing Page", "₹18,000+"],
                  ["Full Website", "₹35,000+"],
                  ["Booking System", "₹45,000+"],
                ].map(([product, price]) => (
                  <Tr key={product}>
                    <Th scope="row">{product}</Th>
                    <Td className="text-right text-gold">{price}</Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </div>
        </div>
      </section>

      {/* ---------------- Light ground ---------------- */}
      <section className="section-light px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Eyebrow light>Phase 1 / Light Section</Eyebrow>
            <h2 className="type-display text-4xl sm:text-6xl">
              Four Steps. One Standard.
            </h2>
            <div className="h-px w-24 bg-gold-deep" />
            <p className="max-w-xl font-body text-base leading-relaxed text-ink-soft">
              The same primitives on cream. Accent darkens to #7D6212 so it still
              clears AA — one hue, two tints, never a second brand colour.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Eyebrow light>Buttons / On Light</Eyebrow>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href="#" tone="light" size="lg">
                Book Your Consultation
              </ButtonLink>
              <Button tone="light" variant="secondary" arrow="down">
                What We Do
              </Button>
              <Button tone="light" disabled>
                Disabled
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Pill tone="light" accent>
                Early Access — Dec 2026
              </Pill>
              <Pill tone="light">Bengaluru · Est. 2026</Pill>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
