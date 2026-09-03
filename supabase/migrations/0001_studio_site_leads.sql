-- ARVA Studio — lead capture schema (spec §27, §33.2)
--
-- Run this against your Supabase project before using the lead form:
--   Supabase Dashboard -> SQL Editor -> paste -> Run
--   (or `supabase db push` if you use the Supabase CLI)
--
-- IMPORTANT follow-up step: PostgREST only serves schemas that are explicitly
-- exposed. After running this, add `studio_site` to
--   Dashboard -> Project Settings -> API -> Exposed schemas
-- otherwise every request to this table returns PGRST106 (schema not found).

create schema if not exists studio_site;

create table if not exists studio_site.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text        not null,
  email        text        not null,
  company      text,
  project_type text,
  budget_range text,
  message      text
);

-- Leads are reviewed in the Supabase table editor for now (spec §34 — no admin
-- dashboard is built), so the newest-first lookup is the only access pattern.
create index if not exists leads_created_at_idx
  on studio_site.leads (created_at desc);

-- Row Level Security ------------------------------------------------------
-- Enabled with NO permissive policies, deliberately. The public anon key can
-- therefore neither read nor write this table. Inserts happen exclusively
-- server-side through the service-role key, which bypasses RLS. This keeps
-- lead data unreadable from the browser even though the anon key is public.
alter table studio_site.leads enable row level security;

-- Explicitly ensure the anon/authenticated roles hold no table grants either
-- (defence in depth: grants and RLS are separate gates).
revoke all on studio_site.leads from anon, authenticated;

-- The service role needs schema + table access to insert from the API route.
grant usage on schema studio_site to service_role;
grant select, insert on studio_site.leads to service_role;
