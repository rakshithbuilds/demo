import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { HERO } from "@/lib/content";

/**
 * Hero (spec §32.2). Carries the page's single `<h1>` (§31).
 *
 * Exactly two CTAs above the fold, per §30 and §19.1 — the primary jumps to
 * the lead form, the secondary down to the pillars. Both rely on the Phase 3
 * scroll offset rather than any JS.
 */
export function Hero() {
  return (
    <Section id="hero" tone="dark" padding="none" className="relative overflow-hidden">
      {/* Decorative ghost wordmark (§29.4 — typography, never photography).
          §26.6 requires it to stay clear of the nav and the CTA cluster at
          every breakpoint, and §19.3 requires it not to bleed into the next
          section: hence `overflow-hidden` on the section, a fade mask at the
          bottom edge, and a position that sits behind the copy rather than
          across it. It is inert to pointer and assistive tech. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12%] bottom-[8%] -z-0 select-none type-display text-[28vw] leading-none text-white/[0.035] sm:-right-[6%] sm:text-[22vw] lg:text-[16vw]"
        style={{
          maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 55%, transparent 100%)",
        }}
      >
        ARVA
      </span>

      <div className="relative z-10 flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center gap-8 py-16 sm:gap-10">
        <div className="flex flex-col gap-6">
          <Pill accent className="self-start">
            {HERO.pill}
          </Pill>

          <h1 className="type-display text-[3.25rem] leading-[0.9] sm:text-8xl lg:text-[9rem]">
            {HERO.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="max-w-lg font-body text-base leading-relaxed text-mist sm:text-lg">
            {HERO.subhead}
          </p>
        </div>

        {/* Two CTAs, no more (§30). They wrap rather than crowd at 360px
            (§26.6). */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <ButtonLink href={HERO.primaryCta.href} size="lg">
            {HERO.primaryCta.label}
          </ButtonLink>
          <ButtonLink
            href={HERO.secondaryCta.href}
            variant="secondary"
            size="lg"
            arrow="down"
          >
            {HERO.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
