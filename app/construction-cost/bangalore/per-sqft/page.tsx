export const runtime = "edge";

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { SEED_PARTNERS } from "@/data/partners";
import { BANGALORE_RATES } from "@/lib/data/bangalore-plot-pages";
import { BangalorePlannerCTA } from "../BangalorePlannerCTA";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/construction-cost/bangalore/per-sqft`;

export const metadata: Metadata = {
  title: "Construction Cost per Sqft in Bangalore | Estimato",
  description:
    "Current construction cost per sqft in Bangalore across five quality tiers. Real BOQ-backed rates, verified against 2026 contractor quotes.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Construction Cost per Sqft in Bangalore | Estimato",
    description:
      "Current construction cost per sqft in Bangalore across five quality tiers. Real BOQ-backed rates, verified against 2026 contractor quotes.",
    url: PAGE_URL,
    type: "website",
    siteName: "Estimato",
    locale: "en_IN",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Estimato",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Construction Cost", item: `${SITE_URL}/construction-cost` },
      { "@type": "ListItem", position: 3, name: "Bangalore", item: `${SITE_URL}/construction-cost/bangalore` },
      { "@type": "ListItem", position: 4, name: "Per Sqft", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "Construction Cost per Sqft in Bangalore 2026",
    url: PAGE_URL,
    dateModified: "2026-06-12",
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Estimato" },
  },
];

const TYPOLOGIES = [
  {
    type: "Compact G+1",
    desc: "600–900 sqft BUA per floor. Common on 20×30 and 20×40 plots.",
    standard: { min: BANGALORE_RATES.standard.min, max: BANGALORE_RATES.standard.max },
    premium: { min: BANGALORE_RATES.premium.min, max: BANGALORE_RATES.premium.max },
    note: "Tight layouts; compact kitchens and bathrooms. Minimal interior wall waste.",
  },
  {
    type: "Standard G+1",
    desc: "1,000–1,600 sqft BUA per floor. Common on 30×40 to 30×50 plots.",
    standard: { min: BANGALORE_RATES.standard.min, max: BANGALORE_RATES.standard.max },
    premium: { min: BANGALORE_RATES.premium.min, max: BANGALORE_RATES.premium.max },
    note: "The most common brief in Bangalore. Full 3 BHK per floor comfortably.",
    badge: "Most common",
  },
  {
    type: "Large G+1 / Duplex",
    desc: "1,600–2,400 sqft BUA per floor. Common on 30×60 to 40×60 plots.",
    standard: { min: BANGALORE_RATES.standard.min, max: BANGALORE_RATES.standard.max },
    premium: { min: BANGALORE_RATES.premium.min, max: BANGALORE_RATES.premium.max },
    note: "More internal wall area per floor footprint. MEP layout more complex.",
  },
  {
    type: "Villa / G+2",
    desc: "2,400–5,000+ sqft total BUA. Large sites, multi-floor.",
    standard: { min: BANGALORE_RATES.standard.min, max: BANGALORE_RATES.standard.max },
    premium: { min: BANGALORE_RATES.premium.min, max: BANGALORE_RATES.premium.max },
    note: "Economies of scale on structure offset by elevator provision and staircase duplication.",
  },
];

const COST_BREAKDOWN = [
  { category: "Gray structure (columns, beams, slabs)", percent: "28–34%" },
  { category: "Brickwork and plastering", percent: "12–16%" },
  { category: "Flooring (tiling, granite, etc.)", percent: "10–14%" },
  { category: "Electrical wiring and panel", percent: "7–9%" },
  { category: "Plumbing and sanitaryware", percent: "7–9%" },
  { category: "Doors and windows", percent: "8–11%" },
  { category: "Painting (interior and exterior)", percent: "5–7%" },
  { category: "Waterproofing", percent: "3–5%" },
  { category: "Foundation (normal soil)", percent: "4–7%" },
  { category: "Overhead and contractor margin", percent: "8–12%" },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is the per-sqft construction cost in Bangalore in 2026?",
    answer:
      "Bangalore construction cost per sqft in 2026 ranges from ₹1,500 to ₹2,200 (basic), ₹2,000 to ₹2,800 (standard), ₹2,600 to ₹3,500 (premium), and ₹3,500 to ₹5,000 (luxury). These are built-up area (BUA) rates verified from real project BOQs. The spread within each tier covers zone variation. North Bangalore outskirts sit at the low end; central Bangalore is at the high end.",
  },
  {
    question: "Does the per-sqft rate apply to built-up area or carpet area?",
    answer:
      "Bangalore contractors quote on built-up area (BUA), which includes carpet area plus wall thickness. BUA is always larger than carpet area. Typically, carpet area is 75 to 82 percent of BUA, depending on wall thickness and common area design. The rates on this page are per sqft of BUA. If a contractor quotes you per sqft of carpet area, the number will appear 15 to 25 percent lower but represents the same total cost.",
  },
  {
    question: "Why is the Bangalore per-sqft rate given as a range, not a single number?",
    answer:
      "Because a single number would be misleading. Three factors create real variation within any quality tier: zone (north Bangalore outskirts vs central Bangalore can differ by ₹600 to ₹900 per sqft on the same spec), soil type (lakebed soil in east Bangalore needs deep foundations that add to cost), and contractor quality and overhead structure. The range reflects these real differences rather than averaging them away into a number that no homeowner will actually receive.",
  },
  {
    question: "How does the Bangalore per-sqft rate compare to Hosur?",
    answer:
      "Hosur standard rates are ₹2,100 to ₹2,400 per sqft. Bangalore standard rates range from ₹2,000 to ₹2,800 per sqft. The lower end of the Bangalore range (outskirts like Yelahanka, Devanahalli) is broadly comparable to Hosur. The upper end (Indiranagar, Koramangala, Whitefield) is 15 to 25 percent higher. For outskirts Bangalore builds, Hosur rates are a useful cross-check.",
  },
  {
    question: "What does the per-sqft rate not cover in Bangalore?",
    answer:
      "The per-sqft rate covers civil construction of the habitable shell only. It does not cover: BBMP or BDA plan approval and khata (₹50,000 to ₹2,00,000+), BESCOM power and BWSSB water connections (₹20,000 to ₹1,00,000), deep foundations for soft or rocky soil (₹300 to ₹450 extra per sqft of footprint), compound wall and gates (₹1 to ₹3 lakh), borewell (₹80,000 to ₹2,00,000), and interiors including modular kitchen, wardrobes, and false ceilings (₹3 to ₹15 lakh+).",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/construction-cost/bangalore",
    eyebrow: "Hub",
    title: "Bangalore construction rates",
    desc: "Full tier rate table and all Bangalore cost pages.",
  },
  {
    href: "/construction-cost/bangalore/cost-index",
    eyebrow: "Data source",
    title: "Bangalore Cost Index 2026",
    desc: "Source data, material prices, and zone variation behind these rates.",
  },
  {
    href: "/construction-cost/bangalore/30x40",
    eyebrow: "Plot calculator",
    title: "30×40 plot cost in Bangalore",
    desc: "Per-sqft rates applied to Bangalore's most common plot size.",
  },
  {
    href: "/construction-cost/bangalore/50-lakh-house",
    eyebrow: "Budget reverse",
    title: "What ₹50 lakh builds in Bangalore",
    desc: "Work backward from budget to sqft at each quality tier.",
  },
];

export default function BangalorePerSqftPage() {
  const partner = SEED_PARTNERS.find((p) => p.id === "design-intend")!;

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <SiteHeader ctaLabel="Get my estimate →" ctaHref="/plan?city=bangalore&from=blr-per-sqft" maxWidth="max-w-5xl" />

      <main className="bg-bg-primary">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            <nav className="flex items-center gap-2 mb-8 flex-wrap" aria-label="Breadcrumb">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Estimato</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <Link href="/construction-cost/bangalore" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Bangalore</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>Per Sqft</span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Bangalore · Construction cost per sqft · June 2026
            </p>

            <h1
              className="font-serif mb-4"
              style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08, color: "var(--text-primary)" }}
            >
              Construction cost per sqft
              <br className="hidden md:block" /> in Bangalore
            </h1>

            <p className="font-sans mb-8" style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "620px" }}>
              Current construction cost per sqft in Bangalore across five quality tiers. Includes a breakdown by cost
              category, typology comparison, and zone variation notes. Rates backed by real BOQs from Bangalore
              and Hosur projects, verified June 2026. Source:{" "}
              <Link href="/construction-cost/bangalore/cost-index" className="underline" style={{ color: "var(--accent)" }}>
                Bangalore Construction Cost Index 2026
              </Link>.
            </p>

            {/* Rate summary box */}
            <div className="rounded-sm p-6 md:p-8" style={{ border: "1.5px solid var(--accent)", background: "rgba(196,154,60,0.04)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--accent)" }}>
                Current Bangalore rates (per sqft of built-up area, June 2026)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { tier: "Basic", r: BANGALORE_RATES.basic },
                  { tier: "Standard", r: BANGALORE_RATES.standard },
                  { tier: "Premium", r: BANGALORE_RATES.premium },
                  { tier: "Luxury", r: BANGALORE_RATES.luxury },
                ].map(({ tier, r }) => (
                  <div key={tier}>
                    <p className="font-mono text-[11px] mb-1" style={{ color: "var(--text-tertiary)" }}>{tier}</p>
                    <p className="font-mono tabular-nums" style={{ fontSize: "18px", fontWeight: 500, color: "var(--text-primary)" }}>
                      ₹{r.min.toLocaleString("en-IN")}–{r.max.toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── TYPOLOGY TABLE ───────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="typology-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>By home configuration</p>
            <h2 id="typology-heading" className="font-serif mb-3" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Per-sqft rates by typology
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: "580px" }}>
              The per-sqft rate is the same across typologies within a quality tier. The difference is in built-up area
              and how efficiently the floor plan uses space. Notes below reflect practical cost factors per typology.
            </p>
          </AnimateIn>

          <StaggerContainer className="divide-y divide-border border-t border-border">
            {TYPOLOGIES.map(({ type, desc, standard, premium, note, badge }) => (
              <StaggerItem key={type}>
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_260px] gap-4 md:gap-8 py-7 items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-serif" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{type}</p>
                      {badge && (
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5" style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}>{badge}</span>
                      )}
                    </div>
                    <p className="font-mono" style={{ fontSize: "12px", color: "var(--text-tertiary)", lineHeight: 1.5 }}>{desc}</p>
                  </div>
                  <div className="md:pt-1">
                    <p className="font-sans" style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.65 }}>{note}</p>
                  </div>
                  <div className="md:pt-1">
                    <div className="space-y-2">
                      <div>
                        <p className="font-mono text-[11px] mb-0.5" style={{ color: "var(--text-tertiary)" }}>Standard</p>
                        <p className="font-mono tabular-nums" style={{ fontSize: "16px", color: "var(--text-primary)" }}>₹{standard.min.toLocaleString("en-IN")}–₹{standard.max.toLocaleString("en-IN")}/sqft</p>
                      </div>
                      <div>
                        <p className="font-mono text-[11px] mb-0.5" style={{ color: "var(--text-tertiary)" }}>Premium</p>
                        <p className="font-mono tabular-nums" style={{ fontSize: "16px", color: "var(--text-primary)" }}>₹{premium.min.toLocaleString("en-IN")}–₹{premium.max.toLocaleString("en-IN")}/sqft</p>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── COST BREAKDOWN ───────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="breakdown-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>What the sqft rate is made of</p>
            <h2 id="breakdown-heading" className="font-serif mb-4" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Cost breakdown by category
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: "560px" }}>
              At standard quality, this is how the ₹2,000–₹2,800/sqft breaks down across construction categories.
              Premium and luxury tiers shift toward flooring, fittings, and finishes.
            </p>
          </AnimateIn>

          <StaggerContainer className="divide-y divide-border border-t border-border" style={{ maxWidth: "680px" }}>
            {COST_BREAKDOWN.map(({ category, percent }) => (
              <StaggerItem key={category}>
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <p className="font-sans" style={{ fontSize: "17px", color: "var(--text-secondary)" }}>{category}</p>
                  <p className="font-mono tabular-nums shrink-0" style={{ fontSize: "16px", fontWeight: 500, color: "var(--text-primary)" }}>{percent}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── CONTENT ──────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <div className="space-y-6" style={{ maxWidth: "680px" }}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The per-sqft rate in Bangalore is a shorthand for the full civil cost of constructing one square foot
                of built-up area, from foundation to paint. It is a useful planning number. But it flattens two real
                variables that every homeowner should understand before comparing quotes from different builders.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The first variable is specification: a ₹2,800 per sqft quote that includes Kajaria tiles, UPVC
                windows, and Jaquar fittings is very different from a ₹2,800 quote that specifies generic
                tiles, aluminium windows, and basic fittings. Both are "standard" in the builder's vocabulary.
                Always ask for a specification list alongside the per-sqft rate. If the builder cannot produce one,
                treat the rate as unreliable.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The second variable is what the rate excludes. Most Bangalore builders quote civil work only.
                BBMP approval, BESCOM connection, BWSSB connection, borewell, compound wall, and all interior
                fit-out are excluded unless explicitly written into the BOQ. A rate of ₹2,400 per sqft with a
                full exclusion list can end up costing the homeowner ₹3,100 effective per sqft once all-in costs
                are divided by built-up area. This is not deception. It is how the market is structured.
                Verify what is in and what is out before signing any agreement.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── CALCULATOR WIDGET ─────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <BangalorePlannerCTA sourcePage="blr-per-sqft" />
          </AnimateIn>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="faq-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Common questions</p>
            <h2 id="faq-heading" className="font-serif mb-10" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Per-sqft in Bangalore
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="bangalore-per-sqft-faq" />
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── PARTNER ──────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="partner-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Bangalore & Hosur partner</p>
            <h2 id="partner-heading" className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>Verified architect on the ground</h2>
            <div className="rounded-sm p-7 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8 items-start" style={{ border: "1px solid var(--border)" }}>
              <div>
                <p className="font-serif mb-1" style={{ fontSize: "24px", fontWeight: 400, color: "var(--text-primary)" }}>{partner.name}</p>
                <p className="font-sans mb-4" style={{ fontSize: "16px", color: "var(--accent)" }}>{partner.tagline}</p>
                <p className="font-sans mb-6" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  Led by {partner.founderName}. {partner.founderBio} Active territory: Bengaluru, Hosur, Sarjapura, Attibele, and Bagalur.
                  Rates on this page are reviewed from active project BOQs.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={`https://wa.me/${partner.whatsappNumber?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em]" style={{ background: "var(--text-primary)", color: "#ffffff", borderRadius: "2px" }}>WhatsApp</a>
                  {partner.websiteUrl && <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] border" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}>Website ↗</a>}
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

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── INTERNAL LINKS ───────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="related-heading">
          <AnimateIn direction="up">
            <h2 id="related-heading" className="font-serif mb-8" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>Related pages</h2>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTERNAL_LINKS.map(({ href, eyebrow, title, desc }) => (
              <StaggerItem key={href}>
                <Link href={href} className="block rounded-sm p-6 border transition-colors duration-200 group hover:border-navy" style={{ border: "1px solid var(--border)" }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: "var(--accent)" }}>{eyebrow}</p>
                  <p className="font-serif mb-2 group-hover:text-navy transition-colors" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{title}</p>
                  <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── FOOTER CTA ───────────────────────────────────────────────────── */}
        <section className="border-t border-border" style={{ background: "var(--text-primary)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20 text-center">
            <AnimateIn direction="up">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(196,154,60,0.85)" }}>Free · No sign-up · Under 2 minutes</p>
              <h2 className="font-serif mb-4" style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1, color: "#FFFFFF" }}>
                Turn these rates into your estimate
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. A personalised cost range, material quantities, and a payment
                timeline built from Bangalore BOQs.
              </p>
              <Link href="/plan?city=bangalore&from=blr-per-sqft-footer" className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85" style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}>
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
