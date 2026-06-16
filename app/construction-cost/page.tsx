export const runtime = "edge";

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/construction-cost`;

export const metadata: Metadata = {
  title: "Construction Cost by City | Estimato",
  description:
    "BOQ-verified house construction cost rates for Bangalore and Hosur. All quality tiers, plot sizes, and home types. Updated June 2026.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Construction Cost by City | Estimato",
    description:
      "BOQ-verified house construction cost rates for Bangalore and Hosur. All quality tiers, plot sizes, and home types. Updated June 2026.",
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
      { "@type": "ListItem", position: 2, name: "Construction Cost", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "Construction Cost by City | Estimato",
    url: PAGE_URL,
    description:
      "BOQ-verified house construction cost rates for Bangalore and Hosur. All quality tiers, plot sizes, and home types.",
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Estimato" },
  },
];

const ACTIVE_CITIES = [
  {
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    href: "/construction-cost/bangalore",
    rateRange: "₹1,500 – ₹5,000 / sqft",
    pages: "15 cost pages",
    note: "Basic to luxury · G+1 and G+2 · 6 plot sizes · 3 budget guides",
    active: true,
  },
  {
    slug: "hosur",
    name: "Hosur",
    state: "Tamil Nadu",
    href: "/construction-cost/hosur",
    rateRange: "₹2,100 – ₹4,500 / sqft",
    pages: "20+ cost pages",
    note: "Basic to luxury · G+1 and G+2 · 11 plot sizes · budget guides · calculator",
    active: true,
  },
];

const COMING_SOON = [
  { name: "Chennai", state: "Tamil Nadu" },
  { name: "Coimbatore", state: "Tamil Nadu" },
  { name: "Hyderabad", state: "Telangana" },
  { name: "Pune", state: "Maharashtra" },
];

export default function ConstructionCostIndexPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <SiteHeader
        ctaLabel="Get my estimate →"
        ctaHref="/plan"
        maxWidth="max-w-5xl"
      />

      <main className="bg-bg-primary">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200" style={{ color: "var(--text-tertiary)" }}>Estimato</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>Construction Cost</span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              BOQ-verified rates · India · 2026
            </p>

            <h1
              className="font-serif mb-4"
              style={{
                fontSize: "clamp(32px, 5.5vw, 56px)",
                fontWeight: 400,
                letterSpacing: "-0.025em",
                lineHeight: 1.08,
                color: "var(--text-primary)",
              }}
            >
              Construction cost
              <br className="hidden md:block" /> by city
            </h1>

            <p
              className="font-sans"
              style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "560px" }}
            >
              Verified house construction costs for every city we cover. Rates built from real
              project BOQs and reviewed by practising architects. Updated June 2026.
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── ACTIVE CITIES ─────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-8" style={{ color: "var(--accent)" }}>
              Live rate data
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ACTIVE_CITIES.map((city) => (
              <StaggerItem key={city.slug}>
                <Link
                  href={city.href}
                  className="group block rounded-sm p-7 md:p-9 border transition-colors duration-200 hover:border-accent h-full"
                  style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p
                        className="font-serif group-hover:text-accent transition-colors mb-0.5"
                        style={{ fontSize: "28px", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
                      >
                        {city.name}
                      </p>
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>
                        {city.state}
                      </p>
                    </div>
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-1 shrink-0 mt-1"
                      style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}
                    >
                      Live
                    </span>
                  </div>

                  <p
                    className="font-mono tabular-nums mb-1"
                    style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
                  >
                    {city.rateRange}
                  </p>
                  <p className="font-mono text-[12px] mb-5" style={{ color: "var(--text-tertiary)" }}>
                    civil construction · all tiers
                  </p>

                  <p className="font-sans text-[15px] mb-5" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {city.note}
                  </p>

                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] group-hover:gap-3 transition-all" style={{ color: "var(--accent)" }}>
                    View {city.name} rates
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 4h9M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── COMING SOON ───────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-8" style={{ color: "var(--text-tertiary)" }}>
              Coming soon
            </p>
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COMING_SOON.map((city) => (
              <StaggerItem key={city.name}>
                <div
                  className="rounded-sm px-5 py-5 border"
                  style={{ border: "1px dashed var(--border)", background: "var(--bg-primary)", opacity: 0.6 }}
                >
                  <p className="font-serif mb-0.5" style={{ fontSize: "18px", fontWeight: 400, color: "var(--text-primary)" }}>
                    {city.name}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--text-tertiary)" }}>
                    {city.state}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── FOOTER CTA ────────────────────────────────────────────────────── */}
        <section className="border-t border-border" style={{ background: "var(--text-primary)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20 text-center">
            <AnimateIn direction="up">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(196,154,60,0.85)" }}>Free · No sign-up · Under 2 minutes</p>
              <h2 className="font-serif mb-4" style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1, color: "#FFFFFF" }}>
                Get a personalised cost estimate
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. A cost range, BOQ summary, and payment timeline for your city and build.
              </p>
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85"
                style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}
              >
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
