import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Button / CTA primitive (spec §29.5, §29.7).
 *
 * `primary` is the white-filled pill with black text and a trailing arrow.
 * `secondary` is the quieter bordered control used for nav and inline actions,
 * on the smaller 7px radius rather than the pill.
 */
type Variant = "primary" | "secondary";

/** Which section ground the button sits on. Drives the whole colour flip. */
type Tone = "dark" | "light";

type Arrow = "right" | "down" | "none";

type BaseProps = {
  variant?: Variant;
  tone?: Tone;
  arrow?: Arrow;
  size?: "md" | "lg";
  children: ReactNode;
  className?: string;
  /** Renders the pending label and blocks interaction (spec §33.4). */
  pending?: boolean;
  /** Shown in place of `children` while `pending`. */
  pendingLabel?: string;
};

const BASE = [
  "group relative inline-flex items-center justify-center gap-2",
  "font-body font-medium whitespace-nowrap",
  "transition-[transform,background-color,border-color,color,opacity]",
  "duration-200 ease-out",
  "motion-safe:hover:-translate-y-px active:translate-y-0",
  // A disabled control must read as disabled, never silently do nothing (§29.5).
  "disabled:pointer-events-none disabled:opacity-45",
  "aria-disabled:pointer-events-none aria-disabled:opacity-45",
].join(" ");

const SIZES = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
} as const;

/**
 * TODO — CONFIRM (spec §29.5, open item 4): only the *dark*-background button
 * treatment was legible in the source — white fill, black text, trailing arrow.
 * The `light` tone below is the reconstruction: a dark-filled primary and a
 * bordered secondary, both with dark-on-light text and the same trailing arrow,
 * so CTAs stay legible on cream sections. Confirm before launch.
 */
const VARIANTS: Record<Tone, Record<Variant, string>> = {
  dark: {
    primary: cn(
      "rounded-pill bg-fog text-ink",
      "hover:bg-white",
    ),
    secondary: cn(
      "rounded-control border border-rule-dark text-fog",
      "hover:border-gold hover:text-gold",
    ),
  },
  light: {
    primary: cn(
      "rounded-pill bg-ink text-cream",
      "hover:bg-[#1d1d22]",
    ),
    secondary: cn(
      "rounded-control border border-rule-light text-ink",
      "hover:border-gold-deep hover:text-gold-deep",
    ),
  },
};

const ARROWS: Record<Exclude<Arrow, "none">, string> = {
  right: "→",
  down: "↓",
};

function ArrowGlyph({ arrow }: { arrow: Arrow }) {
  if (arrow === "none") return null;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block transition-transform duration-200 ease-out",
        arrow === "right"
          ? "motion-safe:group-hover:translate-x-1"
          : "motion-safe:group-hover:translate-y-1",
      )}
    >
      {ARROWS[arrow]}
    </span>
  );
}

function classesFor({
  variant = "primary",
  tone = "dark",
  size = "md",
  className,
}: Pick<BaseProps, "variant" | "tone" | "size" | "className">) {
  return cn(BASE, SIZES[size], VARIANTS[tone][variant], className);
}

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant,
  tone,
  size,
  arrow = "right",
  className,
  children,
  pending = false,
  pendingLabel = "Sending…",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      className={classesFor({ variant, tone, size, className })}
    >
      <span>{pending ? pendingLabel : children}</span>
      {/* The arrow is decoration; the label carries the accessible name. */}
      {pending ? null : <ArrowGlyph arrow={arrow} />}
    </button>
  );
}

type ButtonLinkProps = BaseProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">;

/** Anchor styled as a button — for in-page jumps and external booking links. */
export function ButtonLink({
  variant,
  tone,
  size,
  arrow = "right",
  className,
  children,
  href,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      {...rest}
      href={href}
      className={classesFor({ variant, tone, size, className })}
    >
      <span>{children}</span>
      <ArrowGlyph arrow={arrow} />
    </a>
  );
}
