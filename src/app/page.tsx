/**
 * Phase 0 holding page.
 *
 * The real 12-section marketing page (spec §32) is built across Phases 4–7.
 * This exists so the scaffold builds and runs cleanly.
 */
export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 p-8 text-center">
      <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase">
        Phase 0 — Scaffold
      </p>
      <h1 className="text-2xl font-semibold">ARVA Studios</h1>
      <p className="text-sm text-neutral-500">Bengaluru · Est. 2026</p>
    </main>
  );
}
