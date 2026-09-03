import { Wordmark } from "@/components/brand/Logo";
import { FOOTER_NAV, SITE } from "@/lib/site";

/**
 * Footer (spec §32.12), with the §26.1 mobile QA fixes built in rather than
 * retrofitted:
 *
 * - **No default "active" treatment.** §26.1 found footer links defaulting to a
 *   bold+underlined active state. Every link here is a same-page anchor, so no
 *   link is ever "current" — there is deliberately no active style to apply,
 *   and `aria-current` is left off for the same reason. Underline appears on
 *   hover/focus only.
 * - **Clear separation between groups.** Each of the three regions gets its own
 *   labelled `<nav>`, a gold rule under the label, and generous gap above, so
 *   Services / Studio / Connect read as distinct groups when stacked on mobile.
 */
export function Footer() {
  return (
    <footer className="section-dark border-t border-rule-dark px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex max-w-sm flex-col gap-3">
            <Wordmark className="items-start text-2xl" />
            <p className="font-body text-sm leading-relaxed text-mist">
              {SITE.tagline}
            </p>
            <p className="font-body text-xs tracking-[0.18em] text-muted uppercase">
              {SITE.location}
            </p>
          </div>

          {/* Each column is its own labelled landmark, not one nav of 12 links. */}
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-16">
            {FOOTER_NAV.map((group) => (
              <nav key={group.label} aria-label={group.label} className="flex flex-col">
                <h2 className="font-body text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                  {group.label}
                </h2>
                <span
                  aria-hidden="true"
                  className="mt-2 mb-4 block h-px w-8 bg-gold/40"
                />
                <ul className="flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        {...("external" in link && link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-flex min-h-7 items-center font-body text-sm text-mist underline-offset-4 transition-colors duration-200 hover:text-fog hover:underline focus-visible:text-fog focus-visible:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-rule-dark pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-muted">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="font-body text-xs tracking-[0.18em] text-muted uppercase">
            {SITE.disciplines.join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
