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
const PAGE_URL = `${SITE_URL}/construction-cost/bangalore/1-crore-house`;
const BUDGET = 10000000;

export const metadata: Metadata = {
  title: "What Can You Build for ₹1 Crore in Bangalore? | Estimato",
  description:
    "See what ₹1 crore builds in Bangalore in 2026. Premium & luxury G+2 villas, large G+1, plot size guide, and zone breakdown. BOQ-verified Bangalore rates.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "What Can You Build for ₹1 Crore in Bangalore? | Estimato",
    description: "What ₹1 crore builds in Bangalore 2026. By quality tier and home type.",
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
      { "@type": "ListItem", position: 4, name: "₹1 Crore House", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "What Can You Build for ₹1 Crore in Bangalore?",
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
    desc: "Extremely large footprint. A full G+2 villa or multiple independent units. Practical only when maximising lettable area, not quality of living.",
  },
  {
    key: "standard" as const,
    label: "Standard",
    badge: null,
    bua: buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max),
    desc: "A large G+2 home (4,000–5,000 sqft BUA) or two independent G+1 homes on a single large plot. The most common ₹1Cr construction outcome in Bangalore.",
  },
  {
    key: "premium" as const,
    label: "Premium",
    badge: "Best fit at ₹1Cr",
    bua: buaFromBudget(BUDGET, BANGALORE_RATES.premium.min, BANGALORE_RATES.premium.max),
    desc: "Well-specified G+2 villa (2,857–3,846 sqft) with Italian tiles, Kohler fittings, feature elevation, and designer staircase. High-resale potential in Bangalore.",
  },
  {
    key: "luxury" as const,
    label: "Luxury",
    badge: null,
    bua: buaFromBudget(BUDGET, BANGALORE_RATES.luxury.min, BANGALORE_RATES.luxury.max),
    desc: "Boutique villa with imported marble, concealed MEP, Gessi or Duravit fittings. 2,000–2,857 sqft of ultra-high-specification living space.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What does ₹1 crore build in Bangalore in 2026?",
    answer:
      `At premium quality (₹${BANGALORE_RATES.premium.min.toLocaleString("en-IN")}–₹${BANGALORE_RATES.premium.max.toLocaleString("en-IN")}/sqft), ₹1 crore builds ${buaFromBudget(BUDGET, BANGALORE_RATES.premium.min, BANGALORE_RATES.premium.max).min.toLocaleString("en-IN")} to ${buaFromBudget(BUDGET, BANGALORE_RATES.premium.min, BANGALORE_RATES.premium.max).max.toLocaleString("en-IN")} sqft, a complete G+2 villa on a 30×40 or 30×50 plot with Italian finishes, Kohler sanitary ware, and high-specification MEP. At standard quality (₹${BANGALORE_RATES.standard.min.toLocaleString("en-IN")}–₹${BANGALORE_RATES.standard.max.toLocaleString("en-IN")}/sqft), the same ₹1 crore civil budget builds ${buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max).min.toLocaleString("en-IN")} to ${buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max).max.toLocaleString("en-IN")} sqft, a large G+2 home or two independent G+1 homes for rental income. Civil-only; BBMP approval (separate sanction for G+2), BESCOM, BWSSB, borewell, landscaping, and interiors add ₹20 to ₹40 lakh more.`,
  },
  {
    question: "Is ₹1 crore enough for a G+2 villa in Bangalore?",
    answer:
      "Yes. ₹1 crore is a fully adequate G+2 civil budget for most Bangalore plots at standard to premium quality. A 30×40 plot G+2 (BUA = 2,160 sqft) costs ₹56.2 to ₹75.6 lakh at premium quality, well within budget. A 30×50 G+2 (BUA = 2,700 sqft) costs ₹70.2 to ₹94.5 lakh at premium, still within range. A 40×60 G+2 (BUA = 4,320 sqft) at standard quality costs ₹86.4 to ₹1.21 Cr, just at the ceiling at the high rate end. The budget tightens only on large plots (50×80) at premium quality, where the civil cost alone exceeds ₹2 crore. For most residential G+2 builds in Bangalore, ₹1 crore is the right planning budget at premium quality.",
  },
  {
    question: "What home type gives the best return on ₹1 crore in Bangalore?",
    answer:
      "For capital appreciation, a premium G+2 villa on a 30×40 plot in east Bangalore (Whitefield, Sarjapura) gives the strongest resale multiple. Premium spec homes in IT-corridor locations always transact at ₹8,000 to ₹12,000/sqft, against a construction cost of ₹2,600 to ₹3,500/sqft. For rental income, a standard-quality G+2 on a 30×60 or 40×60 plot structured as three independent units (two G+1 stacked plus a ground-floor annexe) generates ₹35,000 to ₹70,000/month in rental in east and north Bangalore. The yield on a three-unit structure is typically 4 to 6 percent per year on total cost including land, versus 2 to 3 percent on a single-family premium villa. Both are legitimate strategies; the right answer depends on whether you prioritise resale appreciation or monthly cash flow.",
  },
  {
    question: "How does ₹1 crore in Bangalore compare to other cities?",
    answer:
      "₹1 crore in Hosur (outskirts, 50 km from Bangalore) buys roughly 40 to 50 percent more BUA than the same budget in Bangalore city. Hosur standard rates (₹2,100–₹2,400/sqft) vs Bangalore standard (₹2,000–₹2,800/sqft) are not dramatically different. The true difference is in foundation cost (flat basalt rock in Hosur vs mixed lakebed/laterite in Bangalore), approval cost (Hosur Regional Development Authority fees are lower than BBMP), and land cost. In Mysuru, ₹1 crore builds a comparable specification villa as Bangalore outskirts. In Chennai, premium rates are ₹2,800 to ₹4,200/sqft, similar to Bangalore urban. Hyderabad rates (₹2,000 to ₹3,200/sqft) are slightly cheaper than Bangalore for equivalent quality, while Pune and Mumbai rates are much higher.",
  },
  {
    question: "What are the non-civil costs on a ₹1 crore Bangalore build?",
    answer:
      "A ₹1 crore civil Bangalore G+2 build carries the following non-civil costs: BBMP plan approval and G+2 separate structural sanction (₹1.5 to ₹4 lakh); BESCOM HT/LT connection (₹80K to ₹1.5L); BWSSB connection (₹50K to ₹1L); borewell with pump and tank (₹1.5 to ₹2.5L); compound wall and gate for a medium plot (₹2 to ₹4L); landscaping if plot allows (₹1 to ₹3L); modular kitchen (₹3 to ₹8L); wardrobes across 4 bedrooms (₹2 to ₹5L); false ceilings and feature lighting (₹2 to ₹5L); air conditioning provision (₹1.5 to ₹4L); and miscellaneous contingency (₹2 to ₹5L). Total non-civil addition: ₹18 to ₹43 lakh. Plan a total project budget of ₹1.2 to ₹1.45 crore for a ₹1Cr civil build.",
  },
  {
    question: "Should I build a premium G+2 or standard-quality rental property for ₹1 crore in Bangalore?",
    answer:
      "This is the central strategic question at the ₹1Cr price point in Bangalore. A premium G+2 single-family home (2,857–3,846 sqft at ₹2,600–₹3,500/sqft) maximises resale value and personal quality of living, but generates no income during construction and low yield thereafter. A standard-quality multi-unit G+2 (3,571–5,000 sqft at ₹2,000–₹2,800/sqft) structured as 3 to 4 independent units generates ₹40,000 to ₹90,000/month in rental in Whitefield or Sarjapura, a gross yield of 5 to 10 percent on the civil spend alone. The optimal answer for most Bangalore homebuilders: build a premium-quality owner-occupied first floor, and a standard-quality rental second floor and annexe. This hybrid captures both lifestyle quality and income without sacrificing either entirely.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/construction-cost/bangalore",
    eyebrow: "Hub",
    title: "Bangalore construction rates",
    desc: "Full rate table for Bangalore across all tiers and plot sizes.",
  },
  {
    href: "/construction-cost/bangalore/50-lakh-house",
    eyebrow: "Lower budget",
    title: "What ₹50 lakh builds in Bangalore",
    desc: "Full G+1 outcomes at the ₹50L civil budget.",
  },
  {
    href: "/construction-cost/bangalore/g-plus-2",
    eyebrow: "Home type",
    title: "G+2 construction cost in Bangalore",
    desc: "Structural requirements and cost breakdown for a three-storey Bangalore home.",
  },
  {
    href: "/construction-cost/bangalore/40x60",
    eyebrow: "Large plot",
    title: "40×60 plot cost in Bangalore",
    desc: "The most common large plot for a ₹1Cr G+2 build.",
  },
  {
    href: "/construction-cost/bangalore/cost-index",
    eyebrow: "Data source",
    title: "Bangalore Cost Index 2026",
    desc: "Source of all rates on this page. BOQ-verified and dated.",
  },
];

export default function Blr1CrorePage() {
  const partner = SEED_PARTNERS.find((p) => p.id === "design-intend")!;
  const stdBua = buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max);
  const premBua = buaFromBudget(BUDGET, BANGALORE_RATES.premium.min, BANGALORE_RATES.premium.max);

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <SiteHeader ctaLabel="Get my estimate →" ctaHref="/plan?city=bangalore&from=blr-1Cr" maxWidth="max-w-5xl" />

      <main className="bg-bg-primary">

        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            <nav className="flex items-center gap-2 mb-8 flex-wrap" aria-label="Breadcrumb">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Estimato</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <Link href="/construction-cost/bangalore" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Bangalore</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>₹1 Crore House</span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Bangalore · ₹1 crore budget · Villa & G+2 · 2026
            </p>

            <h1 className="font-serif mb-4" style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08, color: "var(--text-primary)" }}>
              What ₹1 crore builds
              <br className="hidden md:block" /> in Bangalore
            </h1>

            <p className="font-sans mb-8" style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "620px" }}>
              ₹1 crore is a premium G+2 villa budget in Bangalore, enough for a complete three-storey home at
              premium quality, or a large multi-unit property at standard quality. Here is exactly what it buys
              across all four quality tiers, worked backward from budget to built area.
              Civil-only figures; interiors, approvals, and connections add ₹20 to ₹40 lakh more.
            </p>

            <div className="rounded-sm p-6 md:p-8" style={{ border: "1.5px solid var(--accent)", background: "rgba(196,154,60,0.04)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Quick answer</p>
              <p className="font-sans" style={{ fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.8, color: "var(--text-primary)" }}>
                ₹1 crore at <strong>premium quality</strong> in Bangalore buys{" "}
                <strong>{premBua.min.toLocaleString("en-IN")} to {premBua.max.toLocaleString("en-IN")} sqft</strong>{" "}
                civil BUA, a fully specified G+2 villa on a 30×40 or 30×50 plot with Italian finishes and
                designer elevation. At <strong>standard quality</strong>, the same budget reaches{" "}
                <strong>{stdBua.min.toLocaleString("en-IN")} to {stdBua.max.toLocaleString("en-IN")} sqft</strong>{" "}
                , a large G+2 home or two independent G+1 units for rental income.
                North Bangalore outskirts rate applies at the upper end of each BUA range.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── TIER TABLE ───────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="tiers-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>₹1 crore budget · Built area by quality tier</p>
            <h2 id="tiers-heading" className="font-serif mb-10" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              What ₹1 crore buys across tiers
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
                    <p className="font-mono mb-2" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>civil BUA from ₹1 crore budget</p>
                    <p className="font-sans" style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                  <div className="flex items-center gap-3 md:justify-end">
                    <div className="w-full md:w-28 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.round((bua.max / 7000) * 100))}%`, background: "var(--accent)" }} />
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
              Civil work only. Excludes BBMP approval, BESCOM, BWSSB, borewell, landscaping, and interiors.
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── G+2 VIABILITY TABLE ────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="g2-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>G+2 viability by plot size</p>
            <h2 id="g2-heading" className="font-serif mb-6" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              ₹1Cr vs G+2 at premium quality
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "620px" }}>
              G+2 BUA = plot × 0.60 FAR × 3 floors. Premium quality rate = ₹2,600 to ₹3,500/sqft (most common for ₹1Cr builds).
            </p>
          </AnimateIn>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ fontSize: "15px" }}>
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  <th className="pb-4 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--text-tertiary)" }}>Plot</th>
                  <th className="pb-4 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--text-tertiary)" }}>G+2 BUA</th>
                  <th className="pb-4 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--text-tertiary)" }}>Civil cost (premium)</th>
                  <th className="pb-4 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--text-tertiary)" }}>₹1Cr covers?</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                {[
                  { plot: "30×30", bua: 1620, low: 42.1, high: 56.7, verdict: "Yes, comfortably", verdictColor: "#22c55e" },
                  { plot: "30×40", bua: 2160, low: 56.2, high: 75.6, verdict: "Yes", verdictColor: "#22c55e" },
                  { plot: "30×50", bua: 2700, low: 70.2, high: 94.5, verdict: "Yes at outskirts rates", verdictColor: "#22c55e" },
                  { plot: "30×60", bua: 3240, low: 84.2, high: 113.4, verdict: "Marginal, budget needed at high end", verdictColor: "#f59e0b" },
                  { plot: "40×60", bua: 4320, low: 112.3, high: 151.2, verdict: "Standard quality only", verdictColor: "#ef4444" },
                  { plot: "50×80", bua: 7200, low: 187.2, high: 252.0, verdict: "Under-funded. Standard G+1 only", verdictColor: "#ef4444" },
                ].map(({ plot, bua, low, high, verdict, verdictColor }) => (
                  <tr key={plot} className="py-4">
                    <td className="py-4 pr-6 font-mono tabular-nums" style={{ color: "var(--text-primary)" }}>{plot}</td>
                    <td className="py-4 pr-6 font-mono tabular-nums" style={{ color: "var(--text-secondary)" }}>{bua.toLocaleString("en-IN")} sqft</td>
                    <td className="py-4 pr-6 font-mono tabular-nums" style={{ color: "var(--text-secondary)" }}>₹{low.toFixed(1)}L – ₹{high.toFixed(1)}L</td>
                    <td className="py-4 font-mono text-[13px]" style={{ color: verdictColor }}>{verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AnimateIn direction="up" delay={0.1}>
            <p className="font-mono mt-6 pt-4 border-t border-border" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
              BUA = plot × 0.60 FAR × 3 floors. Premium range ₹2,600–₹3,500/sqft.
              Civil cost only; BBMP G+2 structural sanction and non-civil add ₹20–₹40L.
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Planning your ₹1 crore build</p>
            <h2 className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              How to deploy ₹1 crore in Bangalore
            </h2>
            <div className="space-y-6" style={{ maxWidth: "680px" }}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                ₹1 crore in Bangalore unlocks G+2 construction, with three floors requiring independent sanctioning under
                BBMP. Unlike a G+1 which requires only a plan approval and completion certificate, a G+2 in
                Bangalore requires a separate structural stability certificate from a licensed structural engineer,
                a soil investigation report (borehole test), and in some zones an NOC from the fire department.
                These approvals add ₹2 to ₹4 lakh and 45 to 90 days to the pre-construction timeline. Planning
                the G+2 approval in parallel with plot registration and design is essential to avoid delays once
                construction begins.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The structural design for a G+2 in Bangalore differs a lot from a G+1. Columns must be
                proportioned for three-storey loads from the foundation, adding approximately 8 to 12 percent
                to the civil cost compared to a G+1 of equivalent BUA. This upfront structural investment means
                that a G+2 built to G+2 load spec from foundation stage costs ₹2,600 to ₹3,500/sqft at premium,
                while a G+1 later converted to G+2 by adding a floor (common but risky) costs ₹3,200 to ₹4,500/sqft
                total because the foundation must be retrofitted. Building to three-storey spec from the start
                is the right call whenever a ₹1 crore budget is available.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                Zone selection matters a great deal at the ₹1 crore level in Bangalore. East Bangalore, including Whitefield,
                Sarjapura, and Marathahalli, is where premium G+2 villas command the highest resale and rental
                premiums, driven by IT workforce demand. A premium G+2 here (2,857 to 3,846 sqft at ₹2,600 to
                ₹3,500/sqft) transacts on resale at ₹8,000 to ₹14,000/sqft inclusive of land, representing a
                significant appreciation over construction cost. North Bangalore (Devanahalli, Yelahanka) offers
                the best BUA per rupee due to lower soil costs and contractor rates, but resale premiums are
                lower than the IT corridor. Central Bangalore plots command extremely high land values and the
                civil cost is only 30 to 40 percent of total project cost, making the ₹1 crore civil budget
                feel constrained on a central plot even if it is fully adequate for the structure itself.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── CALCULATOR WIDGET ─────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <BangalorePlannerCTA sourcePage="blr-1Cr" />
          </AnimateIn>
        </section>

        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="faq-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Common questions</p>
            <h2 id="faq-heading" className="font-serif mb-10" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              ₹1 crore house in Bangalore
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="bangalore-1-crore-faq" />
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
                {["Architecture & design", "BBMP G+2 approval", "Structural drawings", "Turnkey construction", "Interior fit-out", "Project management"].map((s) => (
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
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                Plan your ₹1 crore Bangalore build
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. Cost range, material list, and payment timeline for your actual plot and quality spec.
              </p>
              <Link href="/plan?city=bangalore&from=blr-1Cr-footer" className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em]" style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}>
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
