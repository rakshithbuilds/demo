/**
 * WCAG contrast audit for the ARVA palette (spec §31).
 *
 * Dark-mode designs get gray-on-black contrast wrong easily, and the gold was
 * only confirmed late — so the pairings we actually ship are asserted here
 * rather than eyeballed. Run: `npm run check:contrast`
 */

const TOKENS = {
  ink: "#0a0a0a",
  "ink-raised": "#131316",
  cream: "#f4f1ea",
  "cream-raised": "#eae6dc",
  fog: "#ededef",
  mist: "#a8a8b3",
  muted: "#83838f",
  "ink-soft": "#5a5a63",
  gold: "#c9a227",
  "gold-deep": "#7d6212",
};

/** Pairings the design actually uses, with the level each must clear. */
const PAIRS = [
  // [foreground, background, minimum ratio, what it is]
  ["fog", "ink", 4.5, "primary text on dark"],
  ["mist", "ink", 4.5, "body text on dark"],
  ["muted", "ink", 4.5, "tertiary text on dark"],
  ["gold", "ink", 4.5, "eyebrows / price figures on dark"],
  ["fog", "ink-raised", 4.5, "primary text on raised dark"],
  ["mist", "ink-raised", 4.5, "body text on raised dark"],
  ["gold", "ink-raised", 4.5, "accent on raised dark"],
  ["ink", "cream", 4.5, "primary text on cream"],
  ["ink-soft", "cream", 4.5, "body text on cream"],
  ["gold-deep", "cream", 4.5, "eyebrows / accent on cream"],
  ["ink", "cream-raised", 4.5, "primary text on raised cream"],
  ["ink-soft", "cream-raised", 4.5, "body text on raised cream"],
  ["gold-deep", "cream-raised", 4.5, "accent on raised cream"],
  // Non-text: focus rings and UI boundaries need 3:1 (WCAG 2.2 §1.4.11).
  ["gold", "ink", 3, "focus ring on dark"],
  ["gold-deep", "cream", 3, "focus ring on cream"],
  ["ink", "gold", 4.5, "black label on gold fill"],
  ["cream", "ink", 4.5, "white-pill button text (inverted)"],
];

function channel(v) {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

let failed = 0;
console.log("\n  ARVA palette — WCAG contrast audit\n");

for (const [fg, bg, min, label] of PAIRS) {
  const r = ratio(TOKENS[fg], TOKENS[bg]);
  const ok = r >= min;
  if (!ok) failed++;
  const status = ok ? "PASS" : "FAIL";
  console.log(
    `  ${status}  ${r.toFixed(2).padStart(6)}:1  (min ${min})  ${fg} on ${bg} — ${label}`,
  );
}

console.log(
  failed === 0
    ? `\n  All ${PAIRS.length} pairings clear WCAG AA.\n`
    : `\n  ${failed} of ${PAIRS.length} pairings FAIL.\n`,
);

process.exit(failed === 0 ? 0 : 1);
