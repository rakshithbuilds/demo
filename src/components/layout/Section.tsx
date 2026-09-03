import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Section wrapper for the 12-section IA (spec §32).
 *
 * Carries three things every section needs, so no section has to remember them:
 *
 * - the anchor `id`, plus `data-section` which the stylesheet uses to apply the
 *   sticky-header scroll offset;
 * - `tabindex={-1}`, so that following an in-page link moves *focus* to the
 *   section and not just the viewport — otherwise a keyboard user's next Tab
 *   resumes from wherever they were before the jump;
 * - the dark/cream ground from the §29.1 rhythm.
 */
export function Section({
  id,
  tone,
  children,
  className,
  labelledBy,
  padding = "default",
}: {
  id: string;
  tone: "dark" | "light";
  children: ReactNode;
  className?: string;
  /** id of the section's own heading, so the landmark is named. */
  labelledBy?: string;
  /**
   * `none` drops the standard vertical rhythm for sections that set their own
   * (the hero). Kept as a prop rather than a className override because two
   * competing padding utilities resolve by stylesheet order, not class order.
   */
  padding?: "default" | "none";
}) {
  return (
    <section
      id={id}
      data-section=""
      tabIndex={-1}
      aria-labelledby={labelledBy}
      className={cn(
        tone === "dark" ? "section-dark" : "section-light",
        // Focus lands here from anchor jumps; the ring would frame the entire
        // viewport-tall section, which reads as a rendering glitch rather than
        // a focus cue. The heading inside is the real destination.
        "scroll-mt-[calc(var(--header-h-sm)+1.5rem)] outline-none",
        padding === "default"
          ? "px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
          : "px-5 sm:px-8 lg:px-12",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

/**
 * Numbered eyebrow above a section heading — "03 / CONTENT & VIDEO" (§29.4).
 * The one place gold appears as text.
 */
export function Eyebrow({
  index,
  children,
  tone = "dark",
  className,
}: {
  /** Two-digit section number, e.g. "03". */
  index?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-body text-xs font-medium tracking-[0.2em] uppercase",
        tone === "dark" ? "text-gold" : "text-gold-deep",
        className,
      )}
    >
      {index ? (
        <>
          <span className="tabular-nums">{index}</span>
          <span aria-hidden="true"> / </span>
          {/* The slash is decorative; without hiding it, screen readers
              announce "03 slash content and video". */}
          <span className="sr-only"> </span>
        </>
      ) : null}
      {children}
    </p>
  );
}

/** The thin gold rule that sits under section headlines (§29.2). */
export function Rule({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block h-px w-16",
        tone === "dark" ? "bg-gold" : "bg-gold-deep",
      )}
    />
  );
}
