/**
 * Joins class names, dropping falsy values.
 *
 * Deliberately hand-rolled rather than pulling in `clsx`: it is six lines, and
 * the §31 performance budget is tight enough that a dependency should earn its
 * place.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
