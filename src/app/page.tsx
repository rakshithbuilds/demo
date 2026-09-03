import { About } from "@/components/sections/About";
import { AutomationAI } from "@/components/sections/AutomationAI";
import { BrandDesign } from "@/components/sections/BrandDesign";
import { Comparison } from "@/components/sections/Comparison";
import { ContentVideo } from "@/components/sections/ContentVideo";
import { FinalCta } from "@/components/sections/FinalCta";
import { Splash } from "@/components/layout/Splash";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Process } from "@/components/sections/Process";
import { WebProducts } from "@/components/sections/WebProducts";

/**
 * The single marketing page — the 12-section IA of spec §32, in order.
 *
 * All 12 sections are present; the footer lives in the root layout.
 */
export default function Home() {
  return (
    // tabIndex allows the skip link to move focus here, not just scroll.
    <main id="main" tabIndex={-1} className="outline-none">
      {/* The splash is the entrance to the site (§32.1, §4), so it belongs to
          this route — not the root layout, where it also played over the
          privacy page and stole first focus there. */}
      <Splash />
      <Hero />
      <About />
      <Pillars />
      <ContentVideo />
      <WebProducts />
      <AutomationAI />
      <BrandDesign />
      <Process />
      <Comparison />
      <FinalCta />
    </main>
  );
}
