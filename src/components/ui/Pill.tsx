import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Small status/utility pill (spec §29.6) — e.g. the "Early Access — Dec 2026"
 * tag beside the nav, and the "Built With" tech badges in §32.6.
 */
export function Pill({
  children,
  tone = "dark",
  accent = false,
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  /** Draws the label in gold. Reserved for the one live status tag. */
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-3 py-1",
        "font-body text-[11px] font-medium tracking-[0.14em] uppercase",
        tone === "dark"
          ? cn("border-rule-dark", accent ? "text-gold" : "text-mist")
          : cn("border-rule-light", accent ? "text-gold-deep" : "text-ink-soft"),
        className,
      )}
    >
      {children}
    </span>
  );
}
