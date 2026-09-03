import { cn } from "@/lib/cn";

/**
 * Logo mark (spec §29.4, §29.6) — a small square monogram. The only non-text
 * graphic the design allows; there is no photography or illustration anywhere
 * in content sections.
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
      aria-hidden="true"
      className={cn(
        "inline-grid size-8 shrink-0 place-items-center rounded-[6px] font-display text-lg leading-none",
        tone === "dark" ? "bg-fog text-ink" : "bg-ink text-cream",
        className,
      )}
    >
      A
    </span>
  );
}

/** Full wordmark, used on the splash and in the footer. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display tracking-[0.02em] uppercase", className)}>
      ARVA Studios
    </span>
  );
}
