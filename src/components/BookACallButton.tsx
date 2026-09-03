import { Button, ButtonLink } from "@/components/ui/Button";
import { getCalendarLink } from "@/lib/env";

/**
 * "Book a Call →" (spec §33.7).
 *
 * A simpler, separate control from the lead form — it links out to an external
 * Google Calendar scheduling page. When `NEXT_PUBLIC_CALENDAR_LINK` is unset or
 * still the placeholder, the spec requires hiding or relabelling it rather than
 * linking to a dead URL, so it degrades to a clearly-disabled button that says
 * so. It never silently does nothing (§29.5).
 */
export function BookACallButton({
  tone = "dark",
  size = "md",
  className,
}: {
  tone?: "dark" | "light";
  size?: "md" | "lg";
  className?: string;
}) {
  const href = getCalendarLink();

  if (!href) {
    return (
      <Button
        tone={tone}
        size={size}
        variant="secondary"
        arrow="none"
        disabled
        className={className}
      >
        Calendar link coming soon
      </Button>
    );
  }

  return (
    <ButtonLink
      href={href}
      tone={tone}
      size={size}
      variant="secondary"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      Book a Call
    </ButtonLink>
  );
}
