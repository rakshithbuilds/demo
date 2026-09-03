"use client";

import { useEffect, useState } from "react";

import { BookACallButton } from "@/components/BookACallButton";
import { LogoMark } from "@/components/brand/Logo";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

/**
 * Persistent sticky header (spec §29.6).
 *
 * Contents are fixed by §34: the logo mark and the CTA cluster, nothing else.
 * There is no hamburger, no mobile menu, and no nav links — deliberately. Do
 * not add them.
 *
 * Shrinks on scroll: reduced height and padding, with a hairline separating it
 * from the content beneath.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      // Coalesce scroll events into one state read per frame; a passive
      // listener plus rAF keeps this off the scrolling critical path (§18).
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        frame = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Sync on mount, in case the page restores mid-scroll.

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-ink/85 backdrop-blur-md",
        "transition-[height,border-color] duration-300 ease-out",
        // The header's own height is the anchor-scroll offset (§32.2); it is
        // published as --header-h so sections can reserve exactly that much.
        scrolled
          ? "h-[var(--header-h-sm)] border-b border-rule-dark"
          : "h-[var(--header-h)] border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          // min-h keeps the logo a comfortable touch target; the text
          // itself is only 18px tall (§19.9).
          className="flex min-h-11 items-center gap-3"
          aria-label="ARVA Studios — back to top"
        >
          <LogoMark />
        </a>

        <div className="flex items-center gap-3">
          {/* Hidden below sm so the CTA cluster never crowds at 360px
              (§26.6). Visibility lives on a wrapper, not on the Pill's own
              className: Pill's base sets `inline-flex`, and a `hidden` passed
              alongside it is decided by Tailwind's source order rather than
              class order — which silently loses. */}
          <span className="hidden sm:contents">
            <Pill accent>Early Access — Dec 2026</Pill>
          </span>
          <BookACallButton />
        </div>
      </div>
    </header>
  );
}
