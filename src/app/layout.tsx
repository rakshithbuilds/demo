import type { Metadata } from "next";
import { Anton, Archivo } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import "./globals.css";

/**
 * Display face (spec §29.3): heavy, condensed grotesk for editorial/brutalist
 * headlines at huge scale. Anton ships a single weight that is already heavy —
 * there is no lighter cut to fall back to, which is the point.
 */
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/**
 * Body face (spec §29.3): clean grotesk with a full variable weight axis, so
 * body copy can sit thin and gray without switching families.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

// Placeholder metadata for Phase 1. Full SEO metadata (title, description,
// OG image) derived from the hero copy lands with the real page — spec §31.
export const metadata: Metadata = {
  title: "ARVA Studios — Build. Create. Automate.",
  description:
    "A digital creative studio for founders who are done settling for average.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" id="top">
        {/* First focusable element on the page (§31). */}
        <SkipLink />
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
