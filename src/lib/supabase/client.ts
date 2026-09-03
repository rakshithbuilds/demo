import { createBrowserClient } from "@supabase/ssr";

import { getPublicSupabaseConfig } from "@/lib/env";

/**
 * Browser Supabase client (Auth + public data).
 *
 * Spec §34: no client portal or login UI is built yet, but Auth is initialised
 * so it can be added later without restructuring. Returns `null` when Supabase
 * env vars are absent so the marketing site still renders in a bare checkout.
 */
export function createSupabaseBrowserClient() {
  const config = getPublicSupabaseConfig();
  if (!config) return null;
  return createBrowserClient(config.url, config.anonKey);
}
