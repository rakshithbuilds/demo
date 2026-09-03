import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Spec §29.4: no photography or illustration in content sections, so the
  // image optimiser is unused. Kept default rather than configured.
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withSentryConfig(nextConfig, {
  // Source-map upload only runs when CI supplies credentials; local and
  // preview builds skip it instead of failing.
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  // Hide generated source maps from the public bundle.
  sourcemaps: { deleteSourcemapsAfterUpload: true },
});
