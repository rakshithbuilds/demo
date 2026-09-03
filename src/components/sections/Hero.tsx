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
          §19.2/§26.6 require it never to intersect an interactive element at
          ANY breakpoint. Rather than nudging offsets per breakpoint, it lives
          in a fixed-height band pinned to the bottom of the hero, and the
          content reserves exactly that much bottom padding — so an overlap is
          structurally impossible rather than merely untested. The band also
          clips it, satisfying §19.3's containment rule. */}
      <div
        aria-hidden="true"
        data-hero-decor=""
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-28 overflow-hidden sm:h-36 lg:h-48"
        style={{
          maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 55%, transparent 100%)",
        }}
      >
        <span className="absolute -right-[6%] bottom-[-0.16em] select-none type-display text-[26vw] leading-none text-white/[0.04] lg:text-[16vw]">
          ARVA
        </span>
      </div>

      <div className="relative z-10 flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center gap-8 pt-16 pb-28 sm:gap-10 sm:pb-36 lg:pb-48">
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
