// Sentry — Node.js server runtime (spec §27, §37).
// Loaded from `instrumentation.ts` via `register()`.
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Marketing site: low volume, so full tracing is affordable and useful.
  tracesSampleRate: 1,
  // No PII — lead form contents must not be shipped to Sentry.
  sendDefaultPii: false,
  enabled: Boolean(process.env.SENTRY_DSN),
  debug: false,
});
