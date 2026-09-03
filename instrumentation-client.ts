// Sentry — browser runtime. Next.js loads this file automatically on the client.
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  sendDefaultPii: false,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  debug: false,
  // Session Replay is deliberately off: it would capture lead-form keystrokes
  // and adds client JS weight the Lighthouse budget (spec §31) can't spare.
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
});

/** Instruments client-side navigations for tracing. */
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
