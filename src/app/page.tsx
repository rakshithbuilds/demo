import { About } from "@/components/sections/About";
import { AutomationAI } from "@/components/sections/AutomationAI";
import { BrandDesign } from "@/components/sections/BrandDesign";
import { Comparison } from "@/components/sections/Comparison";
import { ContentVideo } from "@/components/sections/ContentVideo";
import { FinalCta } from "@/components/sections/FinalCta";
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
    <main>
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
