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
| `NEXT_PUBLIC_SITE_URL` | public | Canonical origin for OG/canonical URLs |

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

## Verification

Measured on the production build, mobile viewport with 4G throttling.
Accessibility, Best Practices and SEO sit at 100. Performance is **bimodal**
across runs, and the splash screen is why:

| Largest Contentful Paint | Performance | What LCP landed on |
|---|---|---|
| 2.0s | 97–98 | the splash's own wordmark |
| 3.0s | 89–92 | the hero, after the splash cleared |

The splash holds 2.6s and fades over 700ms (spec §32.1), so the hero is not
visible until ~3.3s. Which element Lighthouse counts as the largest contentful
paint therefore varies run to run, and with it the score — six runs ranged 89
to 98.

This is structural, not measurement noise: a mandated 2.6s intro genuinely
delays the largest element. Three ways to widen the margin, none applied
because all three touch a spec'd design decision:

1. Accept it — the spec requires the splash; scores sit around the target.
2. Shorten the hold toward the 2.5s floor §32.1 allows.
3. Set the splash wordmark larger than the hero headline, so LCP reliably
   resolves to the splash at ~1.2s.

Numbers above come from this container, which is virtualized and has no
dedicated GPU. Re-measure on the deployed site before treating any of them as
final.

`npm run check:contrast` asserts the 17 colour pairings the design actually
uses against WCAG AA — dark-mode grey-on-black is the easiest thing to get
wrong, so it is measured rather than eyeballed.

The Open Graph image is `src/app/opengraph-image.png`, rendered from the site's
own typography. Next.js picks it up by file convention.

## Architecture notes

- `src/lib/env.ts` — the single place env vars are read.
- `src/lib/supabase/admin.ts` — service-role client, `server-only`. Never import
  from a Client Component.
- `src/lib/supabase/client.ts` / `server.ts` — Supabase Auth, initialised but
  unused. No login or portal UI exists yet (spec §34); this is so one can be
  added later without restructuring.
- `instrumentation.ts` / `instrumentation-client.ts` — Sentry init for server,
  edge, and browser runtimes.

## Before launch

Items the spec left open, each flagged with a `TODO — CONFIRM` at its point of
use in the code:

| What | Where |
|---|---|
| Real logo files | `public/brand/README.md` — currently a typeset stand-in |
| Automation & AI third tier price | `src/lib/content.ts` — renders "Scoped on request" rather than an invented figure |
| Contact email and social URLs | `src/lib/site.ts` — placeholders |
| Google Calendar link | `.env.example` — button hides itself until set |
| Section light/dark rhythm | `src/app/globals.css` — reconstructed from context |
| Light-background button treatment | `src/components/ui/Button.tsx` — reconstructed |
| Splash skip-control wording | `src/components/layout/Splash.tsx` — reconstructed |
| Privacy policy | `src/app/privacy/page.tsx` — placeholder describing current behaviour |

## Deliberately not built

Per spec §34: no payment/checkout flow, no e-signature, no admin dashboard
(leads are reviewed in the Supabase table editor), no client portal UI, and no
hamburger/mobile nav — the header only ever holds the logo mark and CTA cluster.
