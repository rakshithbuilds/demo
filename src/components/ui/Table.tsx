import type { ReactNode, ThHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

/**
 * Table primitive (spec §31).
 *
 * Pricing must render as a *real* table with scoped headers, not a grid of
 * divs — so these are thin styled wrappers over real table elements rather
 * than an abstraction that hides them. `scope` is required on every header
 * cell, which is why `Th` takes it as a mandatory prop.
 *
 * Below `md` the pricing block switches to stacked cards entirely (§31); that
 * swap lives with the pricing section, not here.
 */

export function Table({
  caption,
  children,
  className,
}: {
  /** Visually hidden by default — screen readers still get the table's purpose. */
  caption: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    // Wide content scrolls inside its own container rather than the page body.
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full border-collapse text-left", className)}>
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return <thead>{children}</thead>;
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function Tr({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr className={cn("border-b border-rule-dark last:border-b-0", className)}>
      {children}
    </tr>
  );
}

export function Th({
  children,
  scope,
  className,
  ...rest
}: {
  children: ReactNode;
  /** Mandatory: row headers make the pricing table navigable (§31). */
  scope: "col" | "row";
  className?: string;
} & Omit<ThHTMLAttributes<HTMLTableCellElement>, "scope" | "className">) {
  const isColumn = scope === "col";
  return (
    <th
      {...rest}
      scope={scope}
      className={cn(
        "py-4 pr-6 align-middle font-body",
        isColumn
          ? "text-xs font-medium tracking-[0.14em] text-muted uppercase"
          : "text-base font-normal text-fog",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("py-4 align-middle font-body text-base", className)}>
      {children}
    </td>
  );
}
