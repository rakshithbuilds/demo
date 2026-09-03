// Sentry — Edge runtime (proxy / edge route handlers).
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1,
  sendDefaultPii: false,
  enabled: Boolean(process.env.SENTRY_DSN),
  debug: false,
});
