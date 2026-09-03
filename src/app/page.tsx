import { About } from "@/components/sections/About";
import { AutomationAI } from "@/components/sections/AutomationAI";
import { BrandDesign } from "@/components/sections/BrandDesign";
import { ContentVideo } from "@/components/sections/ContentVideo";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { WebProducts } from "@/components/sections/WebProducts";

/**
 * The single marketing page — the 12-section IA of spec §32, in order.
 *
 * §32.9–§32.12 follow in Phases 6–7.
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
    </main>
  );
}
