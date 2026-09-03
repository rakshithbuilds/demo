import type { Metadata } from "next";
import { Anton, Archivo } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { getSiteUrl } from "@/lib/env";
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

const TITLE = "ARVA Studios — Build. Create. Automate.";
const DESCRIPTION =
  "A digital creative studio for founders who are done settling for average. Content, web products, automation and brand design from one Bengaluru studio.";

/**
 * SEO metadata (spec §31), derived from the hero copy since none was supplied.
 *
 * The Open Graph image is `src/app/opengraph-image.png`, which Next.js picks up
 * by file convention and wires into the tags automatically — no photography,
 * just the type system (§29.4).
 */
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: TITLE, template: "%s — ARVA Studios" },
  description: DESCRIPTION,
  applicationName: "ARVA Studios",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ARVA Studios",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
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
