import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/cn";

/**
 * Form primitives for the lead-capture form (spec §33).
 *
 * Every control is label-bound by id and wires `aria-invalid` +
 * `aria-describedby` to its error text, so server-side field errors (§33.3)
 * are announced rather than merely coloured.
 */

const CONTROL = [
  "w-full rounded-control border bg-ink-raised px-4 py-3",
  "font-body text-base text-fog placeholder:text-muted",
  "border-rule-dark transition-colors duration-200",
  "hover:border-white/25",
  "focus:border-gold focus:outline-none",
  "aria-[invalid=true]:border-red-400",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

function FieldShell({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-body text-xs font-medium tracking-[0.12em] text-mist uppercase"
      >
        {label}
        {required ? (
          <span className="ml-1 text-gold" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-[10px] tracking-normal text-muted normal-case">
            (optional)
          </span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="font-body text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="font-body text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Links a control to whichever of hint/error is currently rendered. */
function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

type SharedProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
};

export function Input({
  id,
  label,
  error,
  hint,
  className,
  ...rest
}: SharedProps & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={rest.required}>
      <input
        {...rest}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(CONTROL, className)}
      />
    </FieldShell>
  );
}

export function Textarea({
  id,
  label,
  error,
  hint,
  className,
  ...rest
}: SharedProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className">) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={rest.required}>
      <textarea
        {...rest}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(CONTROL, "min-h-32 resize-y", className)}
      />
    </FieldShell>
  );
}

export function Select({
  id,
  label,
  error,
  hint,
  className,
  children,
  ...rest
}: SharedProps & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className">) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={rest.required}>
      <select
        {...rest}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(CONTROL, "appearance-none pr-10", className)}
      >
        {children}
      </select>
    </FieldShell>
  );
}
