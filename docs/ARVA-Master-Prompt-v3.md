# ARVA STUDIO — MASTER PROMPT (v3)

> v3 merges two previously separate documents: the brand/experience direction (with the mobile QA pass, v2) and the technical build spec (stack, IA, copy, form logic, exclusions, phased build order). Nothing is removed — see the conflict notes below for the two places these documents actually disagreed.

---

## 0. CHANGE LOG — WHAT CHANGED IN v3

| # | What | Change |
|---|------|--------|
| 1 | Tech stack | Added — was missing entirely from v2 (Next.js/TS/Tailwind/Supabase/Resend/Sentry) |
| 2 | Brand voice | Added — confident/blunt/editorial copy voice, wasn't specified before |
| 3 | Visual design tokens | Added concrete tokens (dark/light section rhythm, accent color placeholder, type pairing, button/radius/breakpoint scale) on top of v2's general principles |
| 4 | Motion & interaction | Added implementation-level rules (stagger, reduced-motion behavior for the splash screen specifically) on top of v2's philosophy |
| 5 | Accessibility & performance | Added hard, checkable targets (WCAG AA, Lighthouse 90+, specific landmark/contrast/keyboard requirements) |
| 6 | Information architecture | Added — full 12-section structure with base copy, previously undocumented |
| 7 | Lead-capture form | Added — full functional spec (fields, validation, email sends, error states, honeypot, consent line) |
| 8 | Explicit exclusions | Added — no payment flow, no admin dashboard, no client portal UI yet, no hamburger nav, no internal pricing math |
| 9 | Environment variables | Added — full list, with placeholder-safety rules for the calendar link |
| 10 | Staged build order | Added — 10 phases, stop-and-review between each |
| 11 | Deliverable checklist | Added |
| 12 | **Conflict resolved** | v2 Section 15 (Imagery) said "prefer cinematic photography." This spec says *no photography/illustration in content sections* — text/typography-led instead. Section 15 is now marked superseded; the no-photography rule wins for the actual build since it matches what's already live. |
| 13 | **Mislabel fixed** | v2's Section 26.1 was written as a "mobile nav menu" fix. It's actually the **footer's** three link columns (Services / Studio / Connect) per the IA below — there is no mobile hamburger menu in this spec at all. Relabeled, no contradiction. |
| 14 | Reconstructed text | The source PDF had a handful of cut-off lines (missing arrow glyphs, a truncated pricing tier, a couple of dropped words). Reconstructed the obvious ones inline; the two I couldn't confidently fill are marked `TODO — CONFIRM` below rather than guessed. |

---

# PART A — BRAND & EXPERIENCE DIRECTION

*(Sections 1–25 below are unchanged from v2, carried forward per the rule not to remove existing direction without reason. Section 15 has an added supersession note — see A.15.)*

## 1. ABOUT ARVA STUDIO

ARVA Studio is a modern digital and creative studio focused on building the digital systems behind businesses.

ARVA should NOT be presented as a traditional "web development agency" or a generic creative agency.

> **We build the digital system behind your business.**

ARVA connects: **Brand → Website → Software → AI → Automation → Data → Growth**

## 2. CORE BRAND POSITIONING

ARVA should feel like a **technology-driven premium studio**, not a cheap digital agency — intelligence, precision, technology, creativity, sophistication, trust, engineering, premium quality, modernity, strategic thinking.

## 3. VISUAL BENCHMARK

Study the *principles* (not the assets) behind Apple (clarity, whitespace, purposeful motion), Rolex (restraint, editorial composition, controlled movement), and Bugatti (immersive scroll, cinematic transitions) — never copy their branding directly.

## 4. THE WEBSITE SHOULD FEEL LIKE AN EXPERIENCE

**Enter → Discover → Understand → Experience → Trust → Convert.** Every section should lead into the next.

## 5. ANIMATION PHILOSOPHY

Every animation must have a purpose: hierarchy, reveal, relationship, depth, attention, connection. Avoid random floating elements, excessive bounce, particles, generic gradients, animation-on-everything.

> "I barely notice the animation, but the website feels incredibly smooth."

## 6. MOTION LANGUAGE

Page entrance (fade/scale/blur-to-sharp/clip-path), scroll (linked transforms, text reveals, progressive disclosure), hover (magnetic buttons, subtle scale, underline transitions), navigation (staggered, never abrupt).

## 7. CINEMATIC SCROLL EXPERIENCE

Hero: **Build. Create. Automate.** As the user scrolls, the ARVA ecosystem becomes visible piece by piece.

## 8. VISUALIZING THE ARVA SYSTEM

**BUSINESS → Brand → Website → Software → AI → Automation → Data → Growth** as an interactive visual system, not a static list.

## 9. SERVICES

Group into systems, not a boring grid: **Digital Products**, **AI & Automation**, **Creative**, **Growth**. (See Part B, Section 32.4 for the actual four pillars used in the live IA: Content & Video / Web Products / Automation & AI / Brand Design.)

## 10. CASE STUDIES

Tell the story: **Before → Challenge → System → Transformation → Result.**

## 11. ARVA DIFFERENTIATOR

> **ARVA combines creative production with technology, AI and automation.**

## 12. PREMIUM DESIGN RULE

Feel expensive without trying to look expensive. Avoid excessive gold, fake luxury, unnecessary gradients, glassmorphism, glowing blobs, stock-agency visuals, too many colors — **and any raw system/debug UI reaching production** (see 26.6).

Premium comes from: **Typography + Spacing + Composition + Motion + Imagery + Restraint.**

## 13. TYPOGRAPHY

Strong display type, clean body type, large headlines, short paragraphs, confidence through whitespace. (See Part B, Section 29.3 for the specific typeface pairing now specified.)

## 14. COLOR SYSTEM

Minimal, restrained: near-black, white, subtle grays, one accent color. (See Part B, Section 29.2 — the accent is now specified as warm gold/amber, exact hex pending confirmation.)

## 15. IMAGERY — SUPERSEDED, SEE NOTE

Original guidance: prefer cinematic photography, high-quality product imagery, architectural imagery, abstract technology visuals, sophisticated 3D renders.

**Superseded by the technical build spec (Part B):** this is a text/typography-led site by explicit instruction — *no photography or illustration anywhere in content sections*. Use big decorative numerals, numbered eyebrows, and negative space instead. A small logo mark (wordmark/monogram, not a photo) is fine for header/footer identity. This note is left visible rather than silently deleting the original guidance, in case it's revisited for a future phase (e.g. case studies, once they exist).

## 16. INTERACTIVE ELEMENTS

Hover over **AI** → reveal AI integrations, intelligent assistants, workflows. Hover over **Automation** → reveal CRM, lead routing, orchestration. Hover over **Web** → reveal websites, SaaS, dashboards, portals. (Needs a touch-equivalent — see 26.5.)

## 17. CURSOR & MICRO-INTERACTIONS

Custom cursor used selectively and never distractingly. N/A on touch devices.

## 18. PERFORMANCE

Fast load, optimized images, lazy loading, GPU-friendly (transform/opacity) animation, minimal JS for simple fades/scales.

## 19. MOBILE EXPERIENCE (tightened in v2, still current)

1. Max 2 primary CTAs above the fold.
2. Decorative graphics never intersect interactive elements at any breakpoint.
3. Decorative motion is contained to its originating section (mask/fade boundary).
4. Ghost/background numerals keep 16px+ clearance from foreground headline text down to 360px.
5. Inline metadata next to a title stacks below it under ~380px.
6. Numbered systems (index numbers, step numbers) stay large/high-contrast enough to read as deliberate.
7. No dev/debug/system UI in production.
8. Touch equivalents for every hover interaction.
9. Prioritize touch interactions, readable type, simplified motion, fast loading.

## 20. RESPONSIVE EXPERIENCE

Mobile, tablet, laptop, desktop, ultra-wide — composition adapts, doesn't just scale.

## 21. ACCESSIBILITY

Respect `prefers-reduced-motion`: remove large transitions, reduce parallax/scaling, simplify page transitions, preserve hierarchy. (See Part B, Section 31 for hard, checkable targets.)

## 22. TECHNICAL QUALITY

Componentized, maintainable, scalable, responsive, accessible, SEO-friendly, performant, production-ready.

## 23. DESIGN PRINCIPLE

> **Every pixel must have a reason. Every animation must have a purpose. Every section must move the story forward.**

## 24. FINAL EXPERIENCE TARGET

Apple's clarity × Rolex's restraint × Bugatti's immersion × ARVA's own identity.

> "This isn't a normal agency website." → "They clearly understand technology." → **"I want ARVA to build our system."**

## 25. IMPLEMENTATION INSTRUCTION

Preserve architecture, don't remove functionality without reason, improve rather than replace, identify where motion helps vs. hurts usability, maintain consistency, prioritize performance and mobile, and remember the objective is **"feel like a world-class digital product,"** not "make it animated."

## 26. MOBILE QA FIXES — ROUND 1 (from v2)

**26.1 Footer Link Columns** *(relabeled from "mobile nav" — this is the footer's three-column nav per Section 32.12, not a hamburger menu)*
- Remove the bold+underline "active" treatment from a footer link unless it matches the current route — never default to an active-looking state.
- Add clearer separation between the Services / Studio / Connect groups (more gap above each label, or a thin low-opacity divider).

**26.2 Process Section**
- Keep the background numeral ("07"-style ghost number) at least 16px clear of the headline text on viewports under ~400px.
- Stack step meta tags ("WEEK 0" etc.) below the step title on narrow viewports instead of forcing them inline.

**26.3 Service/Pillar Cards**
- Increase index-number size/contrast so 03/04/05-style numbering reads as a deliberate system.
- Add a subtle connecting rail down the left edge of stacked cards on mobile, so they read as one connected system per Section 8, not an isolated grid.

**26.4 About Section**
- Mask/fade the hero's decorative graphic so it doesn't bleed into this section on scroll.
- Add a scroll-triggered, staggered count-up to the stat numbers (07 / 04 / 01) — restrained, no bounce.

**26.5 Touch Equivalents**
- Define a tap or scroll-triggered equivalent for every hover-only interaction (AI/Automation/Web reveals in Section 16) so mobile users get the same information desktop users get on hover.

**26.6 Hero**
- Keep the decorative graphic clear of the "Calendar — soon"/CTA cluster and the nav at every breakpoint.
- Max two CTAs above the fold on mobile (see Part B, Section 30's 2-CTA rule, which formalizes this).
- Confirm any "Spinning up Servers"-style toast is a preview-environment artifact, not something shipping to production — see Section 30 note.

---

# PART B — TECHNICAL BUILD SPEC

*(New in v3 — this is the functional/engineering spec: what to actually build, with what stack, in what order.)*

## 27. TECH STACK

Use exactly this — not defaults:

- **Next.js (App Router) + TypeScript**
- **Tailwind CSS**
- **Supabase** for Postgres + Auth + Storage — one project, a dedicated `studio_site` schema
- **Resend** for transactional email
- **Sentry** for error monitoring

Do **not** use MongoDB or FastAPI. If any of the above isn't available on the build platform, say so before substituting anything — don't silently swap in a different stack.

## 28. BRAND VOICE

Confident, blunt, editorial. Short, punchy sentences. Periods used for rhythm ("Build. Create. Automate."). No corporate filler, no stock-photo cheerfulness.

## 29. VISUAL DESIGN SYSTEM — TOKENS

**29.1 Section rhythm — dark-mode-first**, alternating with off-white/cream every few scrolls.
`TODO — CONFIRM`: the exact section-by-section light/dark assignment was truncated in the source spec. Best reconstruction from the rest of the doc (About and Process are explicitly called out as light/cream; splash, hero, comparison-left, final CTA, and footer read as dark from context):
Splash (black) → Hero (dark) → About (light/cream) → Four Pillars (dark) → four detail sections (dark) → Process (light/cream) → Comparison (dark/light split) → Final CTA (dark) → Footer (dark).
Confirm this sequence before implementing the alternating rhythm literally.

**29.2 Accent color** — one only, warm gold/amber.
`TODO — CONFIRM HEX`: exact value was intentionally left unset in the source ("confirm before build, do not guess a brand color"). Do not invent a hex — block on this.
Used sparingly: eyebrow labels, numbered section tags, thin divider rules under headlines, price figures, hover underlines. Must not bleed into general UI chrome.

**29.3 Typography** — a heavy, condensed/compressed grotesk display face for headlines (huge scale, tight tracking, multi-line, editorial/brutalist) paired with a clean, thin sans-serif for body copy in gray tones. Pick real, distinctive fonts that achieve this look — don't fall back to a generic system font if the originals aren't available.

**29.4 Imagery** — none in content sections. Big decorative numerals, numbered eyebrows ("03 / CONTENT & VIDEO"), generous negative space. Small logo mark (wordmark/monogram) only, for header/footer.

**29.5 Buttons** — white filled pill/rectangular CTAs, black text, trailing arrow (→), on dark backgrounds.
`TODO — CONFIRM`: the light-background button treatment was cut off in the source. Reconstructed as: on light/cream sections, use a dark-filled or outlined/bordered variant with dark text and the same trailing arrow, so CTAs stay legible against both section colors — confirm this is the intended pairing before building it. Disabled buttons must show a clear disabled state, never silently do nothing.

**29.6 Header** — persistent, sticky. Small square logo mark, right-aligned utility pill + "Book a Call →" button. Shrinks on scroll (reduced height/padding, subtle shadow/border separating it from content beneath).

**29.7 Design tokens** — 4px spacing scale; pill radius (9999px) for primary hero/CTA buttons; smaller radius (6–8px) for secondary/nav buttons; standard breakpoints at 360 / 640 / 768 / 1024 / 1280 / 1536.

## 30. MOTION & INTERACTION — IMPLEMENTATION RULES

- Scroll-triggered reveals as each section enters viewport — subtle fade/slide, slight stagger between siblings, never flashy.
- Hover states on every card/button — slight scale or underline-in, nothing more.
- Respect `prefers-reduced-motion`: disable non-essential motion, and **shorten (don't remove) the splash-to-hero transition** specifically for these users.
- Lightweight only — no heavy WebGL/3D, no heavy JS animation runtime for simple fades/scales. Must load fast on a cheap Android phone over 4G.
- Max two primary CTAs above the fold on mobile (formalizes the Section 19 rule).
- Any loading/status toast (e.g. a "Spinning up Servers" style message) must never overlap live content — and if it's a preview-environment artifact only, confirm it's stripped from the production build (ties to Section 26.6).

## 31. ACCESSIBILITY & PERFORMANCE — HARD REQUIREMENTS

Not nice-to-haves:

- **WCAG AA contrast**, including gray body text on black backgrounds — recheck once the gold hex and grays are locked; this is the easiest thing to get wrong in a dark-mode design.
- Full keyboard navigation, visible focus states (gold-accent focus ring), semantic HTML: one `<h1>` on the hero, `<h2>` per remaining section, a real `<table>` with scoped headers for pricing, `<nav>`/`<main>`/`<footer>` landmarks, alt text on every meaningful element.
- "Skip to content" link as the first focusable element on the page.
- **Mobile-first, primary target 360px wide, not desktop.**
  - Comparison split-screen stacks vertically (dark panel first, then light panel) below `lg`; true side-by-side from `lg` up.
  - Web Products pricing becomes a stacked list of price cards below `md`; renders as a real `<table>` from `md` up.
- **Target Lighthouse 90+** on Performance, Accessibility, Best Practices, and SEO. Basic SEO metadata (title, meta description, OG image) with sensible defaults derived from the hero copy, even though none was supplied.

## 32. INFORMATION ARCHITECTURE — 12 SECTIONS, IN ORDER

Base copy below — adapt lightly for flow, keep the meaning and punch. Do not reorder, add, or drop sections.

**32.1 Splash** — full-black screen, centered "ARVA STUDIOS" wordmark, "Bengaluru · Est. 2026" tag. Auto-dismisses into the hero after ~2.5–3 seconds. Must also show an explicit, always-visible, keyboard-operable "Skip →" control — `TODO — CONFIRM`: the source cuts off after "do not rely" — reconstructed as *do not rely on the auto-dismiss timer alone as the only way past the splash*; confirm this is the intended wording of the requirement.

**32.2 Hero** — headline "Build. Create. Automate." / subhead "A digital creative studio for founders who are done settling for average." Two CTAs: primary "Book Your Early Access →" (smooth-scrolls to the lead-capture form, offset below the sticky header), secondary "What We Do ↓" (scrolls to the pillars section, same offset behavior). "Early Access — Dec 2026" pill near the nav. This is the page's one `<h1>`.

**32.3 About / Manifesto** (light/cream) — statement headline, short studio description, three stat callouts: "07 Domain Specialists", "04 Service Pillars", "01 Studio Standard".

**32.4 Four Pillars. One Studio.** — 4-column grid (1-col at 360px, 2-col at sm/md, 4-col at lg+): Content & Video / Web Products / Automation & AI / Brand Design, each with a short service list and a link down to its detail section. Give each anchor link a full accessible name (e.g. "Explore Content & Video services"), not a bare repeated "Explore →".

**32.5 Content & Video detail** — headline "Content That Moves People." List (real markup, one-line descriptor each): Long-Form YouTube, Short-Form Reels & Shorts, Brand Story Films, Campaign & Ad Video, Personal Brand Content. Side stat callout: "One shoot day. Six formats. Infinite reach." (moves below the list on mobile).

**32.6 Web Products detail** — headline "Products Built to Work While You Sleep." Pricing table (starting prices, INR):

| Product | Starting Price |
|---|---|
| Landing Page | ₹18,000+ |
| Full Website | ₹35,000+ |
| Booking System | ₹45,000+ |
| Client Portal | ₹60,000+ |
| E-Commerce & Internal Tool | ₹75,000+ |

`TODO — CONFIRM`: exact figures reconstructed from a partially cut-off table in the source (only "18,000", "45,000", "60,000", "75,000" and a lone "35" were legible) — cross-check against the studio's actual current pricing before shipping.

Footer note: "All prices are starting points. We scope after a conversation. Conversations are free." "Built With" tech badge row: Next.js, Framer, Supabase, Neon, Clerk, Vercel, Cloudflare R2. Real `<table>` with scoped row headers; stacked price-card layout below `md`.

**32.7 Automation & AI detail** — headline "Your Business Running at 3 AM." Three-tier pricing in the same "₹X,XXX+" family:

- **Starter** — ₹18,000–25,000
- **Growth** — ₹35,000–60,000
- **Full-Stack / Enterprise** — `TODO — CONFIRM`: tier name and price range were cut off in the source ("Full-Sta…" with no visible number). Confirm both the tier name and range before build.

Each tier gets a short bullet list, as its own labeled section. Footer note on a ₹5,000/month retainer plan.

**32.8 Brand Design detail** — headline "Design That Stops the Scroll." 6-item grid (1-col at 360px, 2-col at sm, 3-col at lg+): Logo & Brand Kit, Content Graphics, UI & Digital Design, Campaign Creatives, Professional Assets, Production Design.

**32.9 Process** (light/cream) — "Four Steps. One Standard." — Discover (Week 0) → Architect (Week 1) → Build (Weeks 1–4) → Deliver (Done Means Done), one short paragraph each, as an ordered list, stacked vertically at all sizes.

**32.10 Comparison split-screen** — Left (dark), "What Most Agencies Do": "One service. Four vendors. No shared vision." / "Volume over quality." / "Cold outreach." Right (light), "What ARVA Does": "One studio. Content + Web + Automation + Design. Connected." / "Fewer deliverables. More intentional. Each one built to last." / "Content that earns clients. Work that proves itself. Legacy, not just output." True side-by-side from `lg` up; stacks dark-panel-first then light-panel below `lg`.

**32.11 Final CTA** — headline "Let's Build Something That Lasts.", short paragraph, pre-booking/launch date callouts (Early Access Dec 2026, Full Launch Jan 1 2027), big CTA "Book Your Consultation →", reassurance line "No commitment. No agency speak. Just a real conversation." Scrolls to the lead-capture form in this same section.

**32.12 Footer** — logo + tagline, three link columns (**Services** / **Studio** / **Connect**) each as a labeled nav region, social links (Instagram, LinkedIn), contact email, copyright line, repeated nav tags "Content · Web · Automation · Design". *(This is the section that Section 26.1's fixes apply to.)*

## 33. LEAD-CAPTURE FORM — FULL SPEC

The core functional requirement. Build it for real — don't fake it. Lives inline in Section 32.11 (Final CTA), not a separate page.

**33.1 Fields**
- Name (required)
- Email (required, validated)
- Company (optional)
- Project type (dropdown: Content & Video / Web Products / Automation & AI / Brand Design / Not sure yet)
- Budget range (dropdown, optional)
- Message (textarea, optional)

**33.2 On submit**
- Validate client-side and server-side.
- Insert a row into `studio_site.leads` (columns: `id`, `created_at`, `name`, `email`, `company`, `project_type`, `budget_range`, `message`).
- Send two emails via Resend: a confirmation to the submitter ("Thanks — we'll be in touch within 1 business day") and a notification to `INTERNAL_NOTIFICATION_EMAIL` with the lead details.

**33.3 Error handling — no silent failures**
- DB insert fails → show a clear inline error, field-level messages from server validation where applicable, retry-friendly message, preserved form data.
- DB insert succeeds but email send fails → still show the user success (their lead *was* captured), but log the email failure to Sentry. Never tell the user their submission failed when it actually succeeded.

**33.4 Loading state**
- Disable the button and change its label while submitting (e.g. "Sending…"). Never leave it dead/unlabeled.

**33.5 Consent**
- One-line consent note under submit (e.g. "We'll only use this to get in touch about your project."), linking to `/privacy`. Placeholder policy page is fine for launch — the link and line must exist.

**33.6 Spam protection**
- No CAPTCHA needed yet. Add a honeypot field: if filled, respond as if the submission succeeded (don't reveal the trap to the bot) but don't insert the row or send emails.

**33.7 "Book a Call →" button**
- Separate, simpler button (used elsewhere on the page) linking out to an external Google Calendar scheduling page, via `NEXT_PUBLIC_CALENDAR_LINK`.
- `TODO — CONFIRM`: real scheduling URL — placeholder only until provided.
- If the env var is unset or still equals the placeholder value at build/runtime, **hide** the button or relabel it ("Calendar link coming soon") instead of linking to a dead placeholder. Never hardcode the link elsewhere.

## 34. EXPLICIT EXCLUSIONS — DO NOT BUILD

- No payment/checkout flow of any kind. Pricing is informational only ("starting from") — no "Pay Now"/"Buy" button anywhere.
- No e-signature/contract integration.
- No admin dashboard for viewing leads — reviewed directly in the Supabase table editor for now.
- No client login/portal UI yet — but **do** initialize Supabase Auth (even with no protected route yet) so this can be added later without restructuring.
- No internal pricing math, revenue splits, or team compensation anywhere in UI or copy — public-facing pricing only, exactly the numbers in Section 32.6/32.7.
- **No hamburger/mobile nav menu** — the header only ever contains the logo mark and the CTA cluster. Don't invent additional nav links. *(Reconfirms that Section 26.1's footer fixes are correctly scoped to the footer, not the header.)*

## 35. ENVIRONMENT VARIABLES

Declare, read from env, never hardcode values:

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only), `RESEND_API_KEY`, `SENTRY_DSN`, `NEXT_PUBLIC_CALENDAR_LINK`, `INTERNAL_NOTIFICATION_EMAIL` (server-only).

Real values provided after the build — use placeholder/example values in any `.env.example`. Never commit real values.

## 36. STAGED BUILD ORDER

Build and check off in order — don't skip ahead. Stop after each phase for review before continuing:

- **Phase 0** — project scaffold (Next.js/TS/Tailwind, Supabase project + `studio_site.leads` table + RLS, Resend + Sentry wiring, `.env.example`, README).
- **Phase 1** — design tokens + primitives (Button, Input/Select/Textarea, Pill, Table).
- **Phase 2** — app shell (sticky/shrinking header, footer, splash w/ skip control).
- **Phase 3** — navigation/anchor-scroll behavior with header-offset.
- **Phase 4** — Hero, About, Four Pillars.
- **Phase 5** — the four pillar detail sections (incl. both pricing blocks, responsive/table treatment).
- **Phase 6** — Process + Comparison (incl. mobile stacking).
- **Phase 7** — Final CTA + full lead-capture form (all states above) + Footer.
- **Phase 8** — responsive refinement pass across all 12 sections.
- **Phase 9** — accessibility pass (skip link, focus rings, ARIA, contrast).
- **Phase 10** — performance pass (fonts, listeners, deps) — verify Lighthouse 90+ across all four categories, mobile throttled.

Do not fold multiple phases into one uncheckable change.

## 37. DELIVERABLE CHECKLIST

- Fully responsive, tested down to 360px width.
- Lead form actually writes to Supabase and actually sends email via Resend — not simulated.
- Sentry initialized on both frontend and API routes.
- README explaining the stack and how to run the project locally.
- Ready for GitHub export — clean commit history, no secrets committed.

---

## OPEN ITEMS BEFORE BUILD (all `TODO — CONFIRM` items, collected)

1. **Gold accent hex** (29.2) — explicitly left unset in the source; must not be guessed.
2. **Google Calendar scheduling link** (33.7) — placeholder only.
3. **Section-by-section dark/light rhythm** (29.1) — reconstructed from context, needs a sanity check.
4. **Light-background button treatment** (29.5) — reconstructed, needs confirmation.
5. **Web Products pricing table figures** (32.6) — partially illegible in source, reconstructed from fragments.
6. **Automation & AI third pricing tier** — name and range both missing from source (32.7).
7. **Splash skip-control wording** (32.1) — reconstructed from a cut-off sentence.
