import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getPublicSupabaseConfig } from "@/lib/env";

/**
 * Cookie-backed Supabase client for Server Components and Route Handlers.
 *
 * Spec §34: no protected route or portal UI exists yet — this is here so Auth
 * is genuinely initialised and a login flow can be added later without
 * restructuring the app. Uses the anon key and respects RLS (unlike
 * `createAdminClient`).
 *
 * Note: `cookies()` is async in Next.js 16, hence the async factory.
 */
export async function createSupabaseServerClient() {
  const config = getPublicSupabaseConfig();
  if (!config) return null;

  const cookieStore = await cookies();

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Components cannot set cookies. Safe to ignore: once a login
          // flow exists, session refresh happens in a Route Handler or proxy.
        }
      },
    },
  });
}
