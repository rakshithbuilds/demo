import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";

/**
 * The single marketing page — the 12-section IA of spec §32, in order.
 *
 * Sections land phase by phase; §32.5–§32.12 follow in Phases 5–7.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Pillars />
    </main>
  );
}
