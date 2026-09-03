/**
 * "Skip to content" (spec §31) — the first focusable element on the page.
 *
 * Deliberately not built on `sr-only` / `not-sr-only`: `not-sr-only` resets
 * `padding` to 0, which silently flattened this control to a 20px-tall strip
 * when focused — below the WCAG 2.5.8 target floor. Translating it off-screen
 * instead keeps its real box, so the focused control is a full-size button.
 *
 * It stays in the accessibility tree throughout; only its position moves.
 */
export function SkipLink() {
  return (
    <a
      id="skip-to-content"
      href="#main"
      className="fixed top-3 left-3 z-[200] -translate-y-[300%] rounded-control bg-fog px-4 py-3 font-body text-sm font-medium text-ink transition-transform duration-150 focus-visible:translate-y-0"
    >
      Skip to content
    </a>
  );
}
