"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Wordmark } from "@/components/brand/Logo";
import { SITE } from "@/lib/site";

/**
 * Splash screen (spec §32.1).
 *
 * Full-black, centred wordmark, auto-dismissing into the hero after ~2.6s.
 *
 * TODO — CONFIRM (open item 7): the source spec cut off after "do not rely".
 * Implemented as the reconstruction — *do not rely on the auto-dismiss timer
 * alone as the only way past the splash* — hence the always-visible,
 * keyboard-operable Skip control below. Confirm the intended wording.
 *
 * Reduced motion (§30): the splash-to-hero transition is **shortened, not
 * removed**. The global reduced-motion rule in globals.css zeroes transitions
 * everywhere, so this component opts back in via .splash-fade, which restores a
 * brief duration inside that media query.
 */

const HOLD_MS = 2600;
const HOLD_MS_REDUCED = 600;

export function Splash() {
  const [dismissed, setDismissed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const skipRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  const dismiss = useCallback(() => {
    setLeaving(true);
    // Unmount after the fade so the overlay stops intercepting anything.
    const id = window.setTimeout(() => {
      setDismissed(true);
      // The Skip button is about to disappear from mid-document, which would
      // leave the sequential focus starting point there — the next Tab would
      // land on the header and quietly bypass the skip link. Hand focus back
      // to the top instead. Programmatic focus does not match :focus-visible
      // for pointer users, so nothing flashes on screen for them.
      document.getElementById("skip-to-content")?.focus();
    }, 700);
    timers.current.push(id);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(dismiss, reduced ? HOLD_MS_REDUCED : HOLD_MS);
    timers.current.push(id);

    // Put focus on Skip immediately so a keyboard user's first Tab/Enter acts
    // on the splash rather than on content hidden behind it.
    skipRef.current?.focus();

    const captured = timers.current;
    return () => captured.forEach(clearTimeout);
  }, [dismiss]);

  // Escape is the conventional way out of a full-screen overlay.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dismiss]);

  if (dismissed) return null;

  return (
    <div
      role="dialog"
      aria-label="Intro"
      className={[
        "fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4",
        "bg-black px-6 text-center",
        "splash-fade",
        leaving ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <Wordmark className="text-4xl sm:text-6xl" />
      <p className="font-body text-xs tracking-[0.24em] text-muted uppercase">
        {SITE.location}
      </p>

      <button
        ref={skipRef}
        type="button"
        onClick={dismiss}
        className={[
          "mt-6 inline-flex items-center gap-2 rounded-control px-4 py-2",
          "font-body text-xs font-medium tracking-[0.16em] uppercase",
          "border border-rule-dark text-mist",
          "transition-colors duration-200 hover:border-gold hover:text-gold",
        ].join(" ")}
      >
        Skip
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
