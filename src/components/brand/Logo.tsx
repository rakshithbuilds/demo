import { cn } from "@/lib/cn";

/**
 * ARVA Studios brand lockup.
 *
 * TODO — REPLACE WITH SUPPLIED ASSET. The real logo files (white-on-black and
 * black-on-white) were shared but never reached the repo. What follows is a
 * *typeset stand-in* that matches the real mark's structure — thin, wide,
 * geometric caps over a small letterspaced "STUDIOS" — not the mark itself.
 * The real one has a distinctive tailed R that type alone cannot reproduce.
 *
 * To swap in the real thing:
 *   1. Drop the files in `public/brand/` as `arva-wordmark-light.svg`
 *      (white glyph, transparent background) and `arva-wordmark-dark.svg`
 *      (black glyph, transparent background). SVG strongly preferred — it
 *      stays crisp at every size and costs almost nothing against the §31
 *      performance budget. If only PNG exists, trim the padding and keep the
 *      background transparent, otherwise the light version shows a white box
 *      on the cream sections.
 *   2. Replace the markup in `Wordmark` below with an <img>, keeping the same
 *      props and the same accessible name.
 * Nothing else in the app needs to change — every usage goes through here.
 */

/**
 * The stacked lockup: "ARVA" with "STUDIOS" centred beneath.
 *
 * Uses the body face at a light weight, not the Anton display face — the brand
 * mark is thin and wide, the opposite of the headline treatment.
 */
export function Wordmark({
  className,
  tone = "dark",
}: {
  className?: string;
  /** Which section ground it sits on: `dark` renders light, `light` renders dark. */
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col items-center leading-none",
        tone === "dark" ? "text-fog" : "text-ink",
        className,
      )}
    >
      <span className="font-body font-light tracking-[0.18em] uppercase">
        ARVA
      </span>
      <span className="mt-[0.35em] font-body text-[0.32em] font-normal tracking-[0.42em] uppercase">
        Studios
      </span>
    </span>
  );
}

/**
 * Compact single-line mark for the sticky header, where vertical space is
 * scarce and the stacked lockup would shrink past legibility.
 */
export function LogoMark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "font-body text-lg font-light tracking-[0.2em] uppercase leading-none",
        tone === "dark" ? "text-fog" : "text-ink",
        className,
      )}
    >
      ARVA
    </span>
  );
}
