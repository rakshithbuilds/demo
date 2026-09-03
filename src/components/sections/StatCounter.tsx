"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-triggered count-up for the About stats (spec §26.4).
 *
 * "Restrained, no bounce": easeOutQuad into the final value, once, when the
 * stat scrolls into view.
 *
 * The final number is what gets server-rendered, so search engines, no-JS
 * visitors and reduced-motion users all read the real figure. The animation
 * then drives `textContent` on the node directly rather than through React
 * state — this is an effect synchronising an external system (the DOM), which
 * avoids a render per frame and the cascading-render problem that comes with
 * animating via setState.
 *
 * Rendered zero-padded to two digits ("07"), matching the §32.3 copy.
 */
export function StatCounter({
  value,
  delayMs = 0,
}: {
  value: number;
  /** Stagger between siblings (§30). */
  delayMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const format = (n: number) => String(n).padStart(2, "0");

    let frame = 0;
    let timeout = 0;
    let started = false;

    // Only zero the number if it is still below the fold, i.e. genuinely
    // unseen. Two reasons:
    //   - If it is already on screen, counting up would mean visibly resetting
    //     a number the visitor is currently reading.
    //   - Zeroing unconditionally means that if the observer never fires — an
    //     unusual viewport, a missed callback — the stat is stuck showing 00
    //     forever. A stat that silently reads zero is worse than one that
    //     never animates.
    if (node.getBoundingClientRect().top <= window.innerHeight) return;
    node.textContent = format(0);

    const run = () => {
      const DURATION = 900;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1);
        const eased = 1 - (1 - t) * (1 - t); // decelerates, never overshoots
        node.textContent = format(Math.round(eased * value));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started) continue;
          started = true;
          observer.disconnect();
          timeout = window.setTimeout(run, delayMs);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      if (timeout) clearTimeout(timeout);
      // Leave the true value behind if this unmounts mid-count.
      node.textContent = format(value);
    };
  }, [value, delayMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
  );
}
