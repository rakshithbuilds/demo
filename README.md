# ARVA Studio — Marketing Site

The marketing site for ARVA Studio, a 7-person digital and creative studio in
Bengaluru. Mobile-first, dark-mode-led, typography-driven.

Built to the spec in [`docs/ARVA-Master-Prompt-v3.md`](docs/ARVA-Master-Prompt-v3.md).
That document is the source of truth; this README covers stack and local setup
only.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Database / Auth / Storage | Supabase (Postgres, `studio_site` schema) |
| Transactional email | Resend |
| Error monitoring | Sentry |

This stack is fixed by spec §27 — no substitutions.

## Prerequisites

- Node.js 20.9+ (Next.js 16 minimum; built against Node 22)
- A Supabase project
- A Resend account with a verified sending domain
- A Sentry project (optional for local dev — the SDK no-ops without a DSN)

## Local setup

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev
```

The site runs at http://localhost:3000.

### 1. Database

Run `supabase/migrations/0001_studio_site_leads.sql` against your project
(Dashboard → SQL Editor, or `supabase db push`). It creates the `studio_site`
schema, the `leads` table, and enables RLS.

**Then expose the schema:** Dashboard → Project Settings → API → *Exposed
schemas* → add `studio_site`. PostgREST only serves schemas listed there;
without this step every insert fails with `PGRST106`.

### 2. Environment variables

All variables are documented in `.env.example`. Summary:

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | Anon key (RLS-constrained) |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Lead inserts; bypasses RLS |
| `RESEND_API_KEY` | **server only** | Transactional email |
| `RESEND_FROM_EMAIL` | **server only** | Verified sender identity |
| `INTERNAL_NOTIFICATION_EMAIL` | **server only** | Receives new-lead alerts |
| `SENTRY_DSN` | **server only** | Server-side error reporting |
| `NEXT_PUBLIC_SENTRY_DSN` | public | Browser error reporting |
| `NEXT_PUBLIC_CALENDAR_LINK` | public | Google Calendar booking page |

Never commit real values. `.env.example` is the only env file in version
control.

**Calendar link:** while `NEXT_PUBLIC_CALENDAR_LINK` is unset or still the
placeholder from `.env.example`, the "Book a Call" button is hidden or
relabelled rather than linking to a dead URL (spec §33.7). Set the real link to
switch it on.

**Source maps:** Sentry uploads them only when `SENTRY_ORG`, `SENTRY_PROJECT`,
and `SENTRY_AUTH_TOKEN` are present (CI). Local builds skip upload.

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Architecture notes

- `src/lib/env.ts` — the single place env vars are read.
- `src/lib/supabase/admin.ts` — service-role client, `server-only`. Never import
  from a Client Component.
- `src/lib/supabase/client.ts` / `server.ts` — Supabase Auth, initialised but
  unused. No login or portal UI exists yet (spec §34); this is so one can be
  added later without restructuring.
- `instrumentation.ts` / `instrumentation-client.ts` — Sentry init for server,
  edge, and browser runtimes.

## Deliberately not built

Per spec §34: no payment/checkout flow, no e-signature, no admin dashboard
(leads are reviewed in the Supabase table editor), no client portal UI, and no
hamburger/mobile nav — the header only ever holds the logo mark and CTA cluster.
