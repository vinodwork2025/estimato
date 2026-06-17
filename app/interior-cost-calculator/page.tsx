export const runtime = "edge";

import type { Metadata } from "next";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { InteriorCalculator } from "./InteriorCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/interior-cost-calculator`;

export const metadata: Metadata = {
  title: "Interior Cost Calculator for Bangalore & Hosur | Estimato",
  description:
    "Estimate your home interior cost in Bangalore and Hosur. Get a verified range for modular kitchen, wardrobes, flooring, false ceiling, furniture, and more. Free, no sign-up.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Interior Cost Calculator for Bangalore & Hosur | Estimato",
    description:
      "Get a verified interior cost estimate for your home in Bangalore or Hosur. Modular kitchen, wardrobes, flooring, false ceiling, furniture. Free, under 2 minutes.",
    url: PAGE_URL,
    type: "website",
    siteName: "Estimato",
    locale: "en_IN",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Interior Cost Calculator", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "Interior Cost Calculator for Bangalore & Hosur | Estimato",
    url: PAGE_URL,
    description:
      "Free interior cost calculator for Bangalore and Hosur. Ranges for all scope items and finish tiers.",
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Estimato" },
  },
];

export default function InteriorCostCalculatorPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <SiteHeader ctaLabel="Get my estimate →" ctaHref="/plan" maxWidth="max-w-5xl" />
      <main className="bg-bg-primary min-h-screen">
        <InteriorCalculator />
      </main>
    </>
  );
}
