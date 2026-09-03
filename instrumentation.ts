import * as Sentry from "@sentry/nextjs";

/**
 * Next.js instrumentation hook — loads the runtime-appropriate Sentry config
 * exactly once per server process.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

/** Reports errors thrown inside Server Components and Route Handlers. */
export const onRequestError = Sentry.captureRequestError;
