import { Eyebrow, Rule, Section } from "@/components/layout/Section";
import { CONTENT_VIDEO } from "@/lib/content";

/** Content & Video detail (spec §32.5). */
export function ContentVideo() {
  return (
    <Section id="content-video" tone="dark" labelledBy="content-video-heading">
      <div className="flex flex-col gap-10 lg:gap-14">
        <div className="flex max-w-2xl flex-col gap-6">
          <Eyebrow index="03">Content &amp; Video</Eyebrow>
          <h2
            id="content-video-heading"
            className="type-display text-4xl sm:text-5xl lg:text-6xl"
          >
            {CONTENT_VIDEO.headline}
          </h2>
          <Rule />
        </div>

        {/* The callout sits beside the list from lg up and drops below it on
            mobile (§32.5) — source order already puts the list first, so the
            mobile stacking needs no reordering. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <dl className="flex flex-col">
            {CONTENT_VIDEO.items.map((item) => (
              <div
                key={item.name}
                className="flex flex-col gap-1 border-t border-rule-dark py-5 last:border-b"
              >
                <dt className="font-body text-lg font-medium text-fog">
                  {item.name}
                </dt>
                <dd className="font-body text-sm leading-relaxed text-mist">
                  {item.note}
                </dd>
              </div>
            ))}
          </dl>

          <aside className="flex h-fit flex-col gap-4 rounded-control border border-rule-dark bg-ink-raised p-8">
            <span aria-hidden="true" className="type-display text-5xl text-gold">
              06
            </span>
            <p className="type-display text-2xl leading-tight text-fog">
              {CONTENT_VIDEO.callout}
            </p>
          </aside>
        </div>
      </div>
    </Section>
  );
}
