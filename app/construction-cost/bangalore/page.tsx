export const runtime = "edge";

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { SEED_PARTNERS } from "@/data/partners";
import { BANGALORE_RATES } from "@/lib/data/bangalore-plot-pages";
import { BangalorePlannerCTA } from "./BangalorePlannerCTA";

// ─── Constants ────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/construction-cost/bangalore`;

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Construction Cost Calculator in Bangalore | Estimato",
  description:
    "Get a construction cost estimate for Bangalore in minutes. Rates built from real project BOQs, verified against current Bangalore contractor quotes, 2026.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Construction Cost Calculator in Bangalore | Estimato",
    description:
      "Get a construction cost estimate for Bangalore in minutes. Rates built from real project BOQs, verified against current Bangalore contractor quotes, 2026.",
    url: PAGE_URL,
    type: "website",
    siteName: "Estimato",
    locale: "en_IN",
  },
};

// ─── Schemas ─────────────────────────────────────────────────────────────────

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Estimato",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: "Construction cost intelligence platform for Indian homeowners.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Construction Cost", item: `${SITE_URL}/construction-cost` },
      { "@type": "ListItem", position: 3, name: "Bangalore", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "Construction Cost Calculator in Bangalore 2026",
    url: PAGE_URL,
    description:
      "Bangalore house construction cost hub. BOQ-verified rates across five quality tiers, free estimator, and links to all plot-size and home-type cost pages.",
    dateModified: "2026-06-12",
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Estimato" },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Bangalore Construction Cost Estimator",
    url: `${SITE_URL}/plan`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: "Free construction cost estimator for Bangalore homeowners. Pre-loaded with Bangalore rates.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ar. Chittrarasan",
    jobTitle: "Principal Architect",
    worksFor: { "@type": "Organization", name: "Design Intend", url: "https://designintend.com" },
    sameAs: ["https://designintend.com"],
  },
];

// ─── Rate tiers ───────────────────────────────────────────────────────────────

const RATE_TIERS = [
  {
    key: "basic" as const,
    label: "Basic",
    badge: null,
    description: "Sound structure, standard blocks, basic vitrified tiles, standard paint. Functional, no brand fittings.",
    interior: "No built-ins",
    typical: "₹10–₹16 lakh for a 600–720 sqft G+1",
  },
  {
    key: "standard" as const,
    label: "Standard",
    badge: "Most common",
    description: "Branded cement and steel, mid-grade tiles or granite, teak main door, UPVC windows, Jaquar or Hindware fittings.",
    interior: "Modular kitchen rough-in, wardrobe provision",
    typical: "₹29–₹56 lakh for a 1,200–2,000 sqft G+1",
  },
  {
    key: "premium" as const,
    label: "Premium",
    badge: null,
    description: "Stone or large-format flooring, designer false ceilings, system windows, upgraded sanitaryware throughout.",
    interior: "Full modular with designer finishes",
    typical: "₹47–₹70 lakh for a 1,500–2,000 sqft G+1",
  },
  {
    key: "luxury" as const,
    label: "Luxury",
    badge: null,
    description: "Imported marble, hardwood floors, home automation provisions, central HVAC rough-in, bespoke finishes.",
    interior: "Architect-curated, fully furnished",
    typical: "₹63–₹1 Cr for a 1,500–2,000 sqft G+1",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is the construction cost per sqft in Bangalore in 2026?",
    answer:
      "Construction cost per sqft in Bangalore ranges from ₹1,500 to ₹2,200 for basic quality, ₹2,000 to ₹2,800 for standard, ₹2,600 to ₹3,500 for premium, and ₹3,500 to ₹5,000 for luxury. These are built-up area civil construction rates verified against current Bangalore BOQs and contractor quotes, as of June 2026. They do not include land, BBMP approvals, utility connections, or interiors.",
  },
  {
    question: "How much does it cost to build a house in Bangalore?",
    answer:
      "For a standard G+1 on a 30×40 plot (the most common brief in Bangalore), civil construction runs ₹28.8 to ₹40.3 lakh for approximately 1,440 sqft of built-up area. Adding BBMP approval, BESCOM power connection, borewell, compound wall, and basic interiors brings the full move-in budget to ₹40 to ₹58 lakh. Costs vary a lot by zone. North Bangalore outskirts are the cheapest. Central Bangalore (Indiranagar, Koramangala) is the most expensive.",
  },
  {
    question: "How does Bangalore construction cost compare to Hosur?",
    answer:
      "Hosur base rates are ₹2,100 to ₹2,400 per sqft at standard quality. Bangalore standard rates range from ₹2,000 to ₹2,800 per sqft. The lower end (north Bangalore outskirts) is comparable to Hosur. The upper end (IT corridor, central zones) runs 10 to 25 percent higher. The gap is driven by labour demand in IT corridors, logistics costs in congested central areas, and soil remediation needs in east Bangalore lake zones.",
  },
  {
    question: "Which areas of Bangalore are cheapest to build in?",
    answer:
      "North Bangalore, including Devanahalli, Yelahanka, and Hebbal, is always the most cost-effective zone for construction. Hard laterite soil means shallow, cheap foundations. Lower congestion means better logistics. Labour demand is lower than the IT corridor. Construction rates here are ₹2,000 to ₹2,800 per sqft at standard quality, often at the low end of that range. East Bangalore near Sarjapur and Whitefield runs 10 to 20 percent higher due to IT-corridor demand and, in some pockets, soft lakebed soil.",
  },
  {
    question: "What are the hidden costs in Bangalore construction?",
    answer:
      "Five costs regularly exceed first-time estimates in Bangalore: BBMP plan approval and khata (₹50,000 to ₹2 lakh), BESCOM and BWSSB utility connections (₹20,000 to ₹1 lakh), deep foundations on soft lakebed soil in east Bangalore (₹300 to ₹450 per sqft extra on footprint area), compound wall and gates (₹1 to ₹3 lakh), and interiors, including modular kitchen, wardrobes, and false ceiling (₹3 to ₹15 lakh). These add ₹8 to ₹25 lakh on top of the civil per-sqft quote.",
  },
  {
    question: "Do I need BBMP approval to build in Bangalore?",
    answer:
      "Yes. BBMP (Bruhat Bengaluru Mahanagara Palike) plan approval is mandatory for all residential construction in BBMP jurisdiction, and BDA approval is required for BDA-layout plots. The approval involves submitting architectural drawings prepared by a licensed architect, structural drawings, and site ownership documents. Self-certification schemes (for plots below certain sizes) have reduced approval timelines to 7 to 30 days. Building without approval risks demolition notices, BBMP compounding fees, and difficulty in resale and khata transfer.",
  },
];

// ─── Child page links ─────────────────────────────────────────────────────────

const CHILD_PAGES = {
  plotSizes: [
    { href: "/construction-cost/bangalore/20x30", label: "20×30 plot" },
    { href: "/construction-cost/bangalore/30x40", label: "30×40 plot" },
    { href: "/construction-cost/bangalore/30x50", label: "30×50 plot" },
    { href: "/construction-cost/bangalore/30x60", label: "30×60 plot" },
    { href: "/construction-cost/bangalore/40x60", label: "40×60 plot" },
    { href: "/construction-cost/bangalore/50x80", label: "50×80 plot" },
  ],
  homeTypes: [
    { href: "/construction-cost/bangalore/duplex", label: "Duplex" },
    { href: "/construction-cost/bangalore/g-plus-1", label: "G+1 House" },
    { href: "/construction-cost/bangalore/g-plus-2", label: "G+2 House" },
  ],
  budgets: [
    { href: "/construction-cost/bangalore/30-lakh-house", label: "₹30 lakh budget" },
    { href: "/construction-cost/bangalore/50-lakh-house", label: "₹50 lakh budget" },
    { href: "/construction-cost/bangalore/1-crore-house", label: "₹1 crore budget" },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BangaloreHubPage() {
  const partner = SEED_PARTNERS.find((p) => p.id === "design-intend")!;

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
        ctaHref="/plan?city=bangalore&from=blr-hub"
        maxWidth="max-w-5xl"
      />

      <main className="bg-bg-primary">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            <nav className="flex items-center gap-2 mb-8 flex-wrap" aria-label="Breadcrumb">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200" style={{ color: "var(--text-tertiary)" }}>Estimato</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>Bangalore</span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Bangalore · House construction costs · BOQ-verified rates 2026
            </p>
            <p className="font-mono text-[11px] mb-4" style={{ color: "var(--text-tertiary)" }}>Last updated: June 2026</p>

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
              <br className="hidden md:block" /> in Bangalore
            </h1>

            <p
              className="font-sans mb-8"
              style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "600px" }}
            >
              What it actually costs to build a house in Bangalore in 2026. Covers quality tier, plot size,
              home type, and budget. All rates are built from real project BOQs and verified against current
              Bangalore contractor quotes. Reviewed by Ar. Chittrarasan, Principal Architect (ex-Gensler), Design Intend.
            </p>

            {/* Quick rate summary */}
            <div
              className="rounded-sm p-6 md:p-8"
              style={{ border: "1.5px solid var(--accent)", background: "rgba(196,154,60,0.04)" }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
                Current Bangalore standard rates (per sqft, built-up area)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {RATE_TIERS.map(({ key, label }) => (
                  <div key={key}>
                    <p className="font-mono text-[11px] mb-1" style={{ color: "var(--text-tertiary)" }}>{label}</p>
                    <p className="font-mono tabular-nums" style={{ fontSize: "18px", fontWeight: 500, color: "var(--text-primary)" }}>
                      ₹{BANGALORE_RATES[key].min.toLocaleString("en-IN")}–{BANGALORE_RATES[key].max.toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-mono mt-4" style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                Source:{" "}
                <Link href="/construction-cost/bangalore/cost-index" className="underline" style={{ color: "var(--accent)" }}>
                  Bangalore Construction Cost Index 2026
                </Link>
                {" "}· Updated June 2026
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── COST INDEX LINK (prominent) ───────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-10">
          <AnimateIn direction="up">
            <Link
              href="/construction-cost/bangalore/cost-index"
              className="flex items-center justify-between rounded-sm p-6 md:p-8 group hover:border-accent transition-colors"
              style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>Rate authority</p>
                <p className="font-serif mb-2 group-hover:text-accent transition-colors" style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
                  Bangalore Construction Cost Index 2026
                </p>
                <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  Full five-tier rate table with sourced data, material price index, zone variation, and worked examples.
                  Updated June 2026. Reviewed by a practising architect.
                </p>
              </div>
              <svg className="ml-6 shrink-0" width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M1 7h16M11 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }} />
              </svg>
            </Link>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── RATE BANDS ───────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="rate-bands-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
              Bangalore · June 2026 · Civil construction only
            </p>
            <h2
              id="rate-bands-heading"
              className="font-serif mb-2"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Construction rates by quality tier
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.65 }}>
              These are ranges verified from real BOQs and contractor quotes. The spread within each tier
              reflects zone variation. North Bangalore outskirts sit at the low end; central is at the high end.
            </p>
          </AnimateIn>

          <StaggerContainer className="divide-y divide-border border-t border-border">
            {RATE_TIERS.map(({ key, label, badge, description, interior, typical }) => (
              <StaggerItem key={key}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_200px] gap-4 md:gap-8 py-7 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <p className="font-serif" style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{label}</p>
                      {badge && (
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5" style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}>{badge}</span>
                      )}
                    </div>
                    <p className="font-mono tabular-nums" style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                      <strong>₹{BANGALORE_RATES[key].min.toLocaleString("en-IN")}</strong>
                      <span style={{ fontSize: "16px", color: "var(--text-tertiary)", margin: "0 6px" }}>–</span>
                      <strong>₹{BANGALORE_RATES[key].max.toLocaleString("en-IN")}</strong>
                    </p>
                    <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>per sqft</p>
                  </div>
                  <div className="md:pt-1 space-y-2">
                    <p className="font-sans" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.65 }}>{description}</p>
                    <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>Interior: {interior}</p>
                    <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>Typical: {typical}</p>
                  </div>
                  <div className="flex items-center gap-3 md:justify-end">
                    <div className="w-full md:w-32 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.round((BANGALORE_RATES[key].mid / 5000) * 100)}%`, background: "var(--accent)" }} />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}

            {/* Ultra Luxury */}
            <StaggerItem>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_200px] gap-4 md:gap-8 py-7 items-start">
                <div>
                  <p className="font-serif mb-1" style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>Ultra Luxury</p>
                  <p className="font-mono" style={{ fontSize: "18px", color: "var(--text-tertiary)" }}>Custom quote</p>
                  <p className="font-mono" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>₹5,000+ per sqft</p>
                </div>
                <div className="md:pt-1">
                  <p className="font-sans mb-3" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                    Imported materials, specialised foundations, full architect-led design. No published rate. Priced to the project.
                  </p>
                  <Link
                    href="/plan?city=bangalore&from=blr-hub-ultra"
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
                    style={{ color: "var(--accent)" }}
                  >
                    Speak to Design Intend
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 4h9M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                </div>
                <div className="flex items-center gap-3 md:justify-end">
                  <div className="w-full md:w-32 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div className="h-full rounded-full" style={{ width: "100%", background: "var(--accent)" }} />
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <AnimateIn direction="up" delay={0.1}>
            <p className="font-mono mt-8 pt-6 border-t border-border" style={{ fontSize: "14px", color: "var(--text-tertiary)", lineHeight: 1.7 }}>
              Rates built from real project BOQs and verified against current Bangalore contractor quotes, 2026.
              Full source list: <Link href="/construction-cost/bangalore/cost-index" className="underline" style={{ color: "var(--accent)" }}>Bangalore Cost Index</Link>.
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── CALCULATOR WIDGET ─────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <BangalorePlannerCTA />
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── ALL CHILD PAGES ───────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="pages-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>All Bangalore cost pages</p>
            <h2
              id="pages-heading"
              className="font-serif mb-10"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Find your exact build scenario
            </h2>
          </AnimateIn>

          {/* Plot sizes */}
          <div className="mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-5" style={{ color: "var(--text-tertiary)" }}>By plot size</p>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CHILD_PAGES.plotSizes.map(({ href, label }) => (
                <StaggerItem key={href}>
                  <Link
                    href={href}
                    className="block rounded-sm px-5 py-4 border transition-colors duration-200 group hover:border-accent"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <p className="font-serif group-hover:text-accent transition-colors" style={{ fontSize: "18px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
                      {label} house cost
                    </p>
                    <p className="font-mono mt-1" style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>Bangalore · G+1 · 2026</p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Home types */}
          <div className="mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-5" style={{ color: "var(--text-tertiary)" }}>By home type</p>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CHILD_PAGES.homeTypes.map(({ href, label }) => (
                <StaggerItem key={href}>
                  <Link
                    href={href}
                    className="block rounded-sm px-5 py-4 border transition-colors duration-200 group hover:border-accent"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <p className="font-serif group-hover:text-accent transition-colors" style={{ fontSize: "18px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
                      {label} construction cost
                    </p>
                    <p className="font-mono mt-1" style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>Bangalore · 2026</p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Budgets */}
          <div className="mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-5" style={{ color: "var(--text-tertiary)" }}>By budget</p>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CHILD_PAGES.budgets.map(({ href, label }) => (
                <StaggerItem key={href}>
                  <Link
                    href={href}
                    className="block rounded-sm px-5 py-4 border transition-colors duration-200 group hover:border-accent"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <p className="font-serif group-hover:text-accent transition-colors" style={{ fontSize: "18px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
                      {label}
                    </p>
                    <p className="font-mono mt-1" style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>What can you build in Bangalore?</p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Data pages */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-5" style={{ color: "var(--text-tertiary)" }}>Data pages</p>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  href: "/construction-cost/bangalore/cost-index",
                  label: "Bangalore Construction Cost Index 2026",
                  note: "Rate source · Material prices · Zone variation",
                },
                {
                  href: "/construction-cost/bangalore/per-sqft",
                  label: "Construction cost per sqft in Bangalore",
                  note: "By home type · Breakdown by cost category",
                },
              ].map(({ href, label, note }) => (
                <StaggerItem key={href}>
                  <Link
                    href={href}
                    className="block rounded-sm px-5 py-4 border transition-colors duration-200 group hover:border-accent"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <p className="font-serif group-hover:text-accent transition-colors" style={{ fontSize: "18px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
                      {label}
                    </p>
                    <p className="font-mono mt-1" style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{note}</p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="faq-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Common questions</p>
            <h2
              id="faq-heading"
              className="font-serif mb-10"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Bangalore construction costs
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="bangalore-hub-faq" />
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── PARTNER CARD ─────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="partner-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Bangalore & Hosur partner</p>
            <h2
              id="partner-heading"
              className="font-serif mb-8"
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Verified architect on the ground
            </h2>
            <div
              className="rounded-sm p-7 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8 items-start"
              style={{ border: "1px solid var(--border)", background: "var(--bg-primary)" }}
            >
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <p className="font-serif" style={{ fontSize: "24px", fontWeight: 400, letterSpacing: "-0.015em", color: "var(--text-primary)" }}>{partner.name}</p>
                  {partner.isFounding && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5" style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}>Founding partner</span>
                  )}
                </div>
                <p className="font-sans mb-4" style={{ fontSize: "16px", color: "var(--accent)", lineHeight: 1.5 }}>{partner.tagline}</p>
                <p className="font-sans mb-6" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  Led by {partner.founderName}. {partner.founderBio} Active territory: Bengaluru, Hosur, Sarjapura, Attibele, and Bagalur.
                  Rates on this page are reviewed by the Design Intend team from active project BOQs.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={`https://wa.me/${partner.whatsappNumber?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-80" style={{ background: "var(--text-primary)", color: "#ffffff", borderRadius: "2px" }}>WhatsApp</a>
                  <a href={`mailto:${partner.email}`} className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] border transition-colors" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}>Email</a>
                  {partner.websiteUrl && (
                    <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] border transition-colors" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}>Website ↗</a>
                  )}
                </div>
              </div>
              <div className="rounded-sm p-5" style={{ background: "rgba(196,154,60,0.04)", border: "1px solid rgba(196,154,60,0.15)" }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--accent)" }}>Services</p>
                {["Architecture & design", "BBMP approval support", "Structural drawings", "Turnkey construction", "Interior fit-out", "Project management"].map((s) => (
                  <p key={s} className="font-mono py-2 border-b last:border-b-0" style={{ fontSize: "14px", color: "var(--text-secondary)", borderColor: "rgba(196,154,60,0.12)" }}>{s}</p>
                ))}
              </div>
            </div>
          </AnimateIn>
        </section>

        {/* ── FOOTER CTA ───────────────────────────────────────────────────── */}
        <section className="border-t border-border" style={{ background: "var(--text-primary)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20 text-center">
            <AnimateIn direction="up">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(196,154,60,0.85)" }}>Free · No sign-up · Under 2 minutes</p>
              <h2 className="font-serif mb-4" style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1, color: "#FFFFFF" }}>
                Plan your Bangalore build
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. A cost range, BOQ summary, and payment timeline
                built from real Bangalore project data.
              </p>
              <Link
                href="/plan?city=bangalore&from=blr-hub-footer"
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
