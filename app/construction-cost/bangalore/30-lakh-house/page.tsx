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
const PAGE_URL = `${SITE_URL}/construction-cost/bangalore/30-lakh-house`;
const BUDGET = 3000000;

export const metadata: Metadata = {
  title: "What Can You Build for ₹30 Lakh in Bangalore? | Estimato",
  description:
    "See what ₹30 lakh builds in Bangalore in 2026. Plot size, quality tier, and BUA, worked backward from budget. BOQ-verified Bangalore rates.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "What Can You Build for ₹30 Lakh in Bangalore? | Estimato",
    description: "What ₹30 lakh builds in Bangalore 2026. By quality tier and plot size.",
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
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Construction Cost", item: `${SITE_URL}/construction-cost` },
      { "@type": "ListItem", position: 3, name: "Bangalore", item: `${SITE_URL}/construction-cost/bangalore` },
      { "@type": "ListItem", position: 4, name: "₹30 Lakh House", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "What Can You Build for ₹30 Lakh in Bangalore?",
    url: PAGE_URL,
    dateModified: "2026-06-12",
    inLanguage: "en-IN",
  },
];

function buaFromBudget(budget: number, rateMin: number, rateMax: number) {
  return {
    min: Math.floor(budget / rateMax),
    max: Math.floor(budget / rateMin),
  };
}

const TIER_SCENARIOS = [
  {
    key: "basic" as const,
    label: "Basic",
    badge: null,
    bua: buaFromBudget(BUDGET, BANGALORE_RATES.basic.min, BANGALORE_RATES.basic.max),
    desc: "Functional structure, local materials, no branded fittings. Max built area on budget.",
  },
  {
    key: "standard" as const,
    label: "Standard",
    badge: "Best fit at ₹30L",
    bua: buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max),
    desc: "Branded fittings, UPVC windows, mid-grade tiles. The most liveable outcome at this budget.",
  },
  {
    key: "premium" as const,
    label: "Premium",
    badge: null,
    bua: buaFromBudget(BUDGET, BANGALORE_RATES.premium.min, BANGALORE_RATES.premium.max),
    desc: "Quality materials throughout, but a smaller floor area. Compact premium home.",
  },
  {
    key: "luxury" as const,
    label: "Luxury",
    badge: null,
    bua: buaFromBudget(BUDGET, BANGALORE_RATES.luxury.min, BANGALORE_RATES.luxury.max),
    desc: "Imported marble and high-end fittings, but a very compact footprint. Studio-scale luxury.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What does ₹30 lakh build in Bangalore in 2026?",
    answer:
      `At standard quality (₹${BANGALORE_RATES.standard.min.toLocaleString("en-IN")}–₹${BANGALORE_RATES.standard.max.toLocaleString("en-IN")}/sqft), ₹30 lakh builds ${buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max).min.toLocaleString("en-IN")} to ${buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max).max.toLocaleString("en-IN")} sqft of built-up area in Bangalore. That is typically a ground floor (single-storey) home on a 20×30 or 20×40 plot, or the civil work for one floor of a G+1 on a 30×40 plot. At basic quality (₹${BANGALORE_RATES.basic.min.toLocaleString("en-IN")}–₹${BANGALORE_RATES.basic.max.toLocaleString("en-IN")}/sqft), the same ₹30 lakh buys ${buaFromBudget(BUDGET, BANGALORE_RATES.basic.min, BANGALORE_RATES.basic.max).min.toLocaleString("en-IN")} to ${buaFromBudget(BUDGET, BANGALORE_RATES.basic.min, BANGALORE_RATES.basic.max).max.toLocaleString("en-IN")} sqft. These are civil-only figures. BBMP approval, BESCOM, borewell, compound wall, and interiors come on top.`,
  },
  {
    question: "Is ₹30 lakh enough to build a complete house in Bangalore?",
    answer:
      "₹30 lakh is enough for a modest complete civil build in Bangalore, specifically a single ground-floor home on a small plot (20×30 to 20×40) at standard quality. It is not enough for a full G+1 on a 30×40 plot at standard quality (which needs ₹28.8 to ₹40.3 lakh in civil cost alone). To convert ₹30 lakh into a complete move-in home, you would need to phase construction (build one floor now, add the second later) or choose a north Bangalore outskirts location where rates are at the low end of the range. Always add ₹8 to ₹15 lakh for approvals, connections, borewell, compound wall, and basic interiors.",
  },
  {
    question: "Where in Bangalore can I build the most with ₹30 lakh?",
    answer:
      "North Bangalore outskirts, including Yelahanka, Devanahalli, and Hebbal corridor, always deliver the best built area per rupee because: (1) laterite soil means shallower, cheaper foundations; (2) labour rates are lower than IT-corridor zones; (3) contractor overhead is lower. A ₹30 lakh build in north Bangalore at standard quality yields 1,071 to 1,500 sqft BUA. The same budget in Koramangala or Indiranagar would yield much less floor area because the urban premium pushes rates toward the top of the range.",
  },
  {
    question: "Can I build a 2 BHK in Bangalore for ₹30 lakh?",
    answer:
      "A compact 2 BHK requires about 800 to 1,000 sqft of built-up area to be liveable, with two bedrooms of 120+ sqft each, a living-dining, kitchen, bathroom, and utility. At standard quality in north or outskirts Bangalore (₹2,000 per sqft), ₹30 lakh buys 1,500 sqft BUA, which is comfortably more than a 2 BHK. At the upper end of standard (₹2,800/sqft, applicable to IT corridor or central zones), ₹30 lakh buys 1,071 sqft, which is tight for a 2 BHK but possible with a well-designed layout. At basic quality, a 2 BHK is well within the ₹30 lakh budget across Bangalore.",
  },
  {
    question: "What quality of construction does ₹30 lakh give in Bangalore?",
    answer:
      "At ₹30 lakh in Bangalore in 2026, you can get standard quality (Kajaria tiles, UPVC windows, Jaquar basic chrome fittings, mid-grade cement and steel) for a built area of 1,071 to 1,500 sqft. Alternatively, you can get basic quality (plain vitrified tiles, aluminium windows, ISI fittings, local brands) for 1,364 to 2,000 sqft. The right choice depends on whether you prioritise quality of finish or quantity of floor area. For a primary home you plan to live in long-term, standard quality holds better over time and is easier to rent or resell.",
  },
  {
    question: "How much does ₹30 lakh buy in Hosur vs Bangalore?",
    answer:
      `In Hosur at standard quality (₹${(2100).toLocaleString("en-IN")}–₹${(2400).toLocaleString("en-IN")}/sqft), ₹30 lakh buys 1,250 to 1,429 sqft of BUA, a comfortable ground-floor 2 BHK. In Bangalore at standard quality (₹${BANGALORE_RATES.standard.min.toLocaleString("en-IN")}–₹${BANGALORE_RATES.standard.max.toLocaleString("en-IN")}/sqft), the same budget buys ${buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max).min.toLocaleString("en-IN")} to ${buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max).max.toLocaleString("en-IN")} sqft, a similar range at the Bangalore outskirts, and less at urban central rates. Hosur is always 10 to 20 percent more cost-efficient for the same quality specification.`,
  },
];

const INTERNAL_LINKS = [
  {
    href: "/construction-cost/bangalore",
    eyebrow: "Hub",
    title: "Bangalore construction rates",
    desc: "Full rate table for Bangalore across all tiers.",
  },
  {
    href: "/construction-cost/bangalore/50-lakh-house",
    eyebrow: "Higher budget",
    title: "What ₹50 lakh builds in Bangalore",
    desc: "One step up. More floor area or better quality.",
  },
  {
    href: "/construction-cost/bangalore/20x30",
    eyebrow: "Plot size",
    title: "20×30 plot cost in Bangalore",
    desc: "The most common plot for a ₹30 lakh build.",
  },
  {
    href: "/construction-cost/bangalore/cost-index",
    eyebrow: "Data source",
    title: "Bangalore Cost Index 2026",
    desc: "Source of all rates on this page. BOQ-verified and dated.",
  },
];

export default function Blr30LakhPage() {
  const partner = SEED_PARTNERS.find((p) => p.id === "design-intend")!;

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <SiteHeader ctaLabel="Get my estimate →" ctaHref="/plan?city=bangalore&from=blr-30L" maxWidth="max-w-5xl" />

      <main className="bg-bg-primary">

        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            <nav className="flex items-center gap-2 mb-8 flex-wrap" aria-label="Breadcrumb">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Estimato</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <Link href="/construction-cost/bangalore" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Bangalore</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>₹30L House</span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Bangalore · ₹30 lakh budget · What you get · 2026
            </p>

            <h1 className="font-serif mb-4" style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08, color: "var(--text-primary)" }}>
              What ₹30 lakh builds
              <br className="hidden md:block" /> in Bangalore
            </h1>

            <p className="font-sans mb-8" style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "620px" }}>
              ₹30 lakh is a tight but real civil construction budget in Bangalore in 2026. It works best on a small
              plot (20×30 to 20×40) in north or outskirts Bangalore, at standard or basic quality. Here is exactly
              what it buys across quality tiers, worked backward from budget to built area.
              All figures are civil-only; move-in costs add ₹8 to ₹15 lakh more.
            </p>

            <div className="rounded-sm p-6 md:p-8" style={{ border: "1.5px solid var(--accent)", background: "rgba(196,154,60,0.04)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Quick answer</p>
              <p className="font-sans" style={{ fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.8, color: "var(--text-primary)" }}>
                ₹30 lakh at <strong>standard quality</strong> in Bangalore buys{" "}
                <strong>{buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max).min.toLocaleString("en-IN")} to {buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max).max.toLocaleString("en-IN")} sqft</strong>{" "}
                of built-up area, a ground-floor home on a 20×30 to 20×40 plot, or the civil work for one floor
                of a G+1. At <strong>basic quality</strong>, the same budget stretches to{" "}
                <strong>{buaFromBudget(BUDGET, BANGALORE_RATES.basic.min, BANGALORE_RATES.basic.max).min.toLocaleString("en-IN")} to {buaFromBudget(BUDGET, BANGALORE_RATES.basic.min, BANGALORE_RATES.basic.max).max.toLocaleString("en-IN")} sqft</strong>.
                North Bangalore outskirts deliver more floor area for the same budget than IT-corridor or central zones.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── TIER TABLE ───────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="tiers-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>₹30 lakh budget · What you get by quality tier</p>
            <h2 id="tiers-heading" className="font-serif mb-10" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Built area you get per tier
            </h2>
          </AnimateIn>
          <StaggerContainer className="divide-y divide-border border-t border-border">
            {TIER_SCENARIOS.map(({ key, label, badge, bua, desc }) => (
              <StaggerItem key={key}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_200px] gap-4 md:gap-8 py-7 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <p className="font-serif" style={{ fontSize: "22px", fontWeight: 400, color: "var(--text-primary)" }}>{label}</p>
                      {badge && <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5" style={{ background: "rgba(196,154,60,0.12)", color: "var(--accent)", borderRadius: "2px" }}>{badge}</span>}
                    </div>
                    <p className="font-mono" style={{ fontSize: "14px", color: "var(--text-tertiary)" }}>₹{BANGALORE_RATES[key].min.toLocaleString("en-IN")}–₹{BANGALORE_RATES[key].max.toLocaleString("en-IN")}/sqft</p>
                  </div>
                  <div className="md:pt-1">
                    <p className="font-mono tabular-nums mb-1" style={{ fontSize: "22px", fontWeight: 500, color: "var(--text-primary)" }}>
                      {bua.min.toLocaleString("en-IN")} – {bua.max.toLocaleString("en-IN")} sqft
                    </p>
                    <p className="font-mono mb-2" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>civil BUA from ₹30 lakh budget</p>
                    <p className="font-sans" style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                  <div className="flex items-center gap-3 md:justify-end">
                    <div className="w-full md:w-28 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.round((bua.max / 2500) * 100))}%`, background: "var(--accent)" }} />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimateIn direction="up" delay={0.1}>
            <p className="font-mono mt-6 pt-4 border-t border-border" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
              Rates from{" "}
              <Link href="/construction-cost/bangalore/cost-index" className="underline" style={{ color: "var(--accent)" }}>Bangalore Cost Index 2026</Link>.
              Civil work only. Excludes BBMP approval, BESCOM, borewell, compound wall, and interiors.
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Planning your ₹30 lakh build</p>
            <h2 className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              How to make ₹30 lakh work in Bangalore
            </h2>
            <div className="space-y-6" style={{ maxWidth: "680px" }}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                ₹30 lakh in Bangalore is not a budget for a full G+1 in the city's established zones. But it is a
                real construction budget for smart builders who choose their plot location and phase their build
                carefully. The most effective use of ₹30 lakh civil budget in Bangalore in 2026 is a ground-floor
                home on a 20×30 plot in north Bangalore at standard quality, leaving the first-floor structure
                roughed in (columns and slab poured, no walls or finishes) for a second phase. This is a common
                strategy in Yelahanka, Devanahalli, and Hebbal corridors where plot prices are lower and laterite
                soil cuts foundation cost.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The total move-in budget from ₹30 lakh civil is typically ₹38 to ₹48 lakh. Add BBMP plan
                approval (₹50,000 to ₹1.5 lakh), BESCOM and BWSSB connections (₹30,000 to ₹80,000), borewell
                (₹80,000 to ₹1.5 lakh), compound wall (₹80,000 to ₹1.5 lakh for a small plot), and basic interior
                fit-out including kitchen shelves, one wardrobe, and bathroom fittings (₹2 to ₹4 lakh). These costs
                are non-negotiable. There is no move-in ready home that avoids them.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                One critical decision at this budget is between basic and standard quality. Basic quality at ₹1,500
                to ₹2,200 per sqft gives more floor area but uses non-branded materials that show wear faster and
                are harder to repair or replace. Standard quality at ₹2,000 to ₹2,800 per sqft gives less floor
                area but a more durable, marketable home. For a primary residence in Bangalore, standard quality
                is almost always the right call at the ₹30 lakh price point. The extra cost per sqft is small,
                and the long-term maintenance savings and resale premium are real.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── CALCULATOR WIDGET ─────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <BangalorePlannerCTA sourcePage="blr-30L" />
          </AnimateIn>
        </section>

        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="faq-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Common questions</p>
            <h2 id="faq-heading" className="font-serif mb-10" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              ₹30 lakh house in Bangalore
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="bangalore-30-lakh-faq" />
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="partner-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Bangalore & Hosur partner</p>
            <h2 id="partner-heading" className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>Verified architect on the ground</h2>
            <div className="rounded-sm p-7 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8" style={{ border: "1px solid var(--border)" }}>
              <div>
                <p className="font-serif mb-1" style={{ fontSize: "24px", fontWeight: 400, color: "var(--text-primary)" }}>{partner.name}</p>
                <p className="font-sans mb-4" style={{ fontSize: "16px", color: "var(--accent)" }}>{partner.tagline}</p>
                <p className="font-sans mb-6" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  Led by {partner.founderName}. {partner.founderBio} Active territory: Bengaluru, Hosur, Sarjapura, Attibele, and Bagalur.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={`https://wa.me/${partner.whatsappNumber?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em]" style={{ background: "var(--text-primary)", color: "#ffffff", borderRadius: "2px" }}>WhatsApp</a>
                  {partner.websiteUrl && <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] border" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}>Website ↗</a>}
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

        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="related-heading">
          <AnimateIn direction="up">
            <h2 id="related-heading" className="font-serif mb-8" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>Related pages</h2>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTERNAL_LINKS.map(({ href, eyebrow, title, desc }) => (
              <StaggerItem key={href}>
                <Link href={href} className="block rounded-sm p-6 border transition-colors duration-200 group hover:border-navy" style={{ border: "1px solid var(--border)" }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: "var(--accent)" }}>{eyebrow}</p>
                  <p className="font-serif mb-2 group-hover:text-navy transition-colors" style={{ fontSize: "20px", fontWeight: 400, color: "var(--text-primary)" }}>{title}</p>
                  <p className="font-sans" style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section className="border-t border-border" style={{ background: "var(--text-primary)" }}>
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20 text-center">
            <AnimateIn direction="up">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(196,154,60,0.85)" }}>Free · No sign-up · Under 2 minutes</p>
              <h2 className="font-serif mb-4" style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1, color: "#FFFFFF" }}>
                Plan your ₹30 lakh Bangalore build
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. Cost range, material list, and payment timeline for your actual plot and quality spec.
              </p>
              <Link href="/plan?city=bangalore&from=blr-30L-footer" className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em]" style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}>
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
