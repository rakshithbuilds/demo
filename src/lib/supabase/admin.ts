import "server-only";

import { createClient } from "@supabase/supabase-js";

import { requireServerEnv } from "@/lib/env";

/** A row in `studio_site.leads` (spec §33.2). */
export type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  project_type: string | null;
  budget_range: string | null;
  message: string | null;
};

/** The subset we insert; the DB fills `id` and `created_at`. */
export type LeadInsert = Omit<LeadRow, "id" | "created_at">;

/**
 * Service-role Supabase client, scoped to the `studio_site` schema.
 *
 * This key bypasses RLS, so this module is `server-only` and must never be
 * imported from a Client Component. Created per-request rather than as a
 * module singleton so a missing env var surfaces at call time (inside the
 * route's try/catch) instead of crashing at import time.
 */
export function createAdminClient() {
  return createClient(
    requireServerEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireServerEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: { persistSession: false, autoRefreshToken: false },
      db: { schema: "studio_site" },
    },
  );
}
