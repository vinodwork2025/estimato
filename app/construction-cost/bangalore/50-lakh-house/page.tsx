export const runtime = "edge";

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { FAQBlock, type FAQItem } from "@/components/shared/FAQBlock";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { SEED_PARTNERS } from "@/data/partners";
import { BANGALORE_RATES } from "@/lib/data/bangalore-plot-pages";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimato.in";
const PAGE_URL = `${SITE_URL}/construction-cost/bangalore/50-lakh-house`;
const BUDGET = 5000000;

export const metadata: Metadata = {
  title: "What Can You Build for ₹50 Lakh in Bangalore? | Estimato",
  description:
    "See what ₹50 lakh builds in Bangalore in 2026. BUA by quality tier, G+1 viability by plot size. BOQ-verified Bangalore rates, 2026.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "What Can You Build for ₹50 Lakh in Bangalore? | Estimato",
    description: "What ₹50 lakh builds in Bangalore 2026. By quality tier and plot size.",
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
      { "@type": "ListItem", position: 4, name: "₹50 Lakh House", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_URL,
    name: "What Can You Build for ₹50 Lakh in Bangalore?",
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
    desc: "Large floor area on a tight spec. Local materials, no branded fittings. Best for maximising BUA when the plot is large.",
  },
  {
    key: "standard" as const,
    label: "Standard",
    badge: "Best fit at ₹50L",
    bua: buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max),
    desc: "Branded fittings, UPVC windows, Kajaria tiles, mid-grade steel. Full G+1 on a 20×40 or 30×30 plot at comfortable spec.",
  },
  {
    key: "premium" as const,
    label: "Premium",
    badge: null,
    bua: buaFromBudget(BUDGET, BANGALORE_RATES.premium.min, BANGALORE_RATES.premium.max),
    desc: "Quality elevation, Italian tiles, Kohler or CERA fittings, designer staircases. Smaller BUA but a much more refined home.",
  },
  {
    key: "luxury" as const,
    label: "Luxury",
    badge: null,
    bua: buaFromBudget(BUDGET, BANGALORE_RATES.luxury.min, BANGALORE_RATES.luxury.max),
    desc: "Imported marble, concealed MEP, premium brand fittings throughout. Compact but very high-specification. Typical of boutique villas in established Bangalore neighbourhoods.",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What does ₹50 lakh build in Bangalore in 2026?",
    answer:
      `At standard quality (₹${BANGALORE_RATES.standard.min.toLocaleString("en-IN")}–₹${BANGALORE_RATES.standard.max.toLocaleString("en-IN")}/sqft), ₹50 lakh builds ${buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max).min.toLocaleString("en-IN")} to ${buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max).max.toLocaleString("en-IN")} sqft of civil built-up area in Bangalore. That is a full G+1 (two-storey) home on a 20×40 plot, or the ground floor and most of the first floor on a 30×40 plot. At basic quality (₹${BANGALORE_RATES.basic.min.toLocaleString("en-IN")}–₹${BANGALORE_RATES.basic.max.toLocaleString("en-IN")}/sqft), the same budget buys ${buaFromBudget(BUDGET, BANGALORE_RATES.basic.min, BANGALORE_RATES.basic.max).min.toLocaleString("en-IN")} to ${buaFromBudget(BUDGET, BANGALORE_RATES.basic.min, BANGALORE_RATES.basic.max).max.toLocaleString("en-IN")} sqft, enough for a complete G+1 on most medium plots. Civil-only figures: BBMP approval, BESCOM, BWSSB, borewell, and interiors add ₹10 to ₹18 lakh on top.`,
  },
  {
    question: "Is ₹50 lakh enough for a complete G+1 in Bangalore?",
    answer:
      "Yes. ₹50 lakh comfortably covers a full G+1 civil build in Bangalore for plots up to 20×40 at standard quality. For a 30×40 plot G+1 (BUA ≈ 1,440 sqft), the civil cost at standard quality ranges from ₹28.8 to ₹40.3 lakh, which is well within the ₹50 lakh civil budget. For a 30×50 plot G+1 (BUA ≈ 1,800 sqft), civil cost is ₹36 to ₹50.4 lakh, still feasible at the outskirts end of the rate range. The ₹50 lakh budget becomes tight only on larger plots (30×60 or 40×60) at premium quality, where it covers only one floor. For most mid-size Bangalore plots, ₹50 lakh is the right G+1 planning budget.",
  },
  {
    question: "Can I build a 3 BHK in Bangalore for ₹50 lakh?",
    answer:
      "A comfortable 3 BHK in Bangalore requires 1,200 to 1,500 sqft of BUA, with three bedrooms of 120+ sqft, a living-dining room, kitchen, two bathrooms, and a utility area. At standard quality in north or east Bangalore outskirts (₹2,000/sqft), ₹50 lakh buys 2,500 sqft civil BUA, generous for a 3 BHK with room to spare for a study or additional bathroom. At the premium-zone rate of ₹2,800/sqft, the same ₹50 lakh gives 1,786 sqft, still a comfortable 3 BHK. The key constraint at ₹50 lakh is not the budget itself, but getting the layout right: a 3 BHK on a 20×30 plot means compact rooms even at 1,080 sqft. On a 30×40 or larger plot, a well-designed 3 BHK G+1 is the natural outcome of a ₹50 lakh civil spend.",
  },
  {
    question: "Which zone in Bangalore gives the best value at ₹50 lakh?",
    answer:
      "North Bangalore, including Yelahanka, Devanahalli, and the NH44 corridor, always delivers the most BUA per rupee at ₹50 lakh. Construction rates here sit at the lower half of the standard range (₹2,000 to ₹2,200/sqft) due to lower labour costs, laterite soil that cuts foundation depth, and less contractor premium than central or IT-corridor zones. East Bangalore (Whitefield, Sarjapura, Marathahalli) prices are higher at ₹2,200 to ₹2,800/sqft due to lakebed soil requiring deeper pile foundations and elevated IT-zone overhead. Central Bangalore (Koramangala, Indiranagar, Jayanagar) rates are ₹2,800 to ₹4,000+, where ₹50 lakh buys a modest single floor. A ₹50 lakh budget is best matched to the north or east periphery for a full G+1 outcome.",
  },
  {
    question: "How should I split ₹50 lakh between civil and interiors in Bangalore?",
    answer:
      "For a ₹50 lakh total Bangalore home build, allocate roughly 75 to 80 percent (₹37.5 to ₹40 lakh) to civil construction and 20 to 25 percent (₹10 to ₹12.5 lakh) to interiors, approvals, and connections. Civil includes all structural work, masonry, plastering, flooring, external painting, doors, windows, and basic bathroom fixtures specified in the BOQ. Non-civil costs include BBMP plan approval (₹50K to ₹1.5L), BESCOM and BWSSB connection (₹50K to ₹1L), borewell (₹80K to ₹1.5L), compound wall (₹1 to ₹2L), modular kitchen (₹1.5 to ₹3L), wardrobes (₹80K to ₹1.5L), and miscellaneous (₹1 to ₹2L). If you plan to upgrade interiors a lot (high-end kitchen, feature walls, false ceilings throughout), consider a 70/30 split and size the civil build accordingly.",
  },
  {
    question: "What plot size works best for a ₹50 lakh Bangalore build?",
    answer:
      "A 30×40 plot (1,200 sqft) is the ideal match for a ₹50 lakh civil budget in Bangalore. At 60 percent FAR and G+1, BUA = 1,440 sqft. At standard quality (₹2,000 to ₹2,800/sqft), civil cost = ₹28.8 to ₹40.3 lakh, well within budget, leaving ₹10 to ₹21 lakh for interiors and approvals. A 30×50 plot G+1 (BUA = 1,800 sqft) costs ₹36 to ₹50.4 lakh civil, feasible at the outskirts rate end. A 40×60 plot G+1 (BUA = 2,880 sqft) costs ₹57.6 to ₹80.6 lakh civil, beyond ₹50 lakh even at basic rates. The 30×40 G+1 hits the sweet spot where ₹50 lakh covers civil comfortably and still leaves room for a proper interior fit-out.",
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
    href: "/construction-cost/bangalore/30-lakh-house",
    eyebrow: "Lower budget",
    title: "What ₹30 lakh builds in Bangalore",
    desc: "One step down. Smaller plot or one floor.",
  },
  {
    href: "/construction-cost/bangalore/1-crore-house",
    eyebrow: "Higher budget",
    title: "What ₹1 crore builds in Bangalore",
    desc: "Premium and luxury tier outcomes for a ₹1Cr budget.",
  },
  {
    href: "/construction-cost/bangalore/30x40",
    eyebrow: "Best-match plot",
    title: "30×40 plot cost in Bangalore",
    desc: "The most common plot for a ₹50 lakh G+1 build.",
  },
  {
    href: "/construction-cost/bangalore/cost-index",
    eyebrow: "Data source",
    title: "Bangalore Cost Index 2026",
    desc: "Source of all rates on this page. BOQ-verified and dated.",
  },
];

export default function Blr50LakhPage() {
  const partner = SEED_PARTNERS.find((p) => p.id === "design-intend")!;

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <SiteHeader ctaLabel="Get my estimate →" ctaHref="/plan?city=bangalore&from=blr-50L" maxWidth="max-w-5xl" />

      <main className="bg-bg-primary">

        <section className="max-w-5xl mx-auto px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <AnimateIn direction="up">
            <nav className="flex items-center gap-2 mb-8 flex-wrap" aria-label="Breadcrumb">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Estimato</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <Link href="/construction-cost/bangalore" className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-tertiary)" }}>Bangalore</Link>
              <span className="font-mono text-[11px]" style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--text-primary)" }}>₹50L House</span>
            </nav>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              Bangalore · ₹50 lakh budget · G+1 viability · 2026
            </p>

            <h1 className="font-serif mb-4" style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08, color: "var(--text-primary)" }}>
              What ₹50 lakh builds
              <br className="hidden md:block" /> in Bangalore
            </h1>

            <p className="font-sans mb-8" style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "620px" }}>
              ₹50 lakh is a full G+1 budget for most mid-size Bangalore plots, the civil budget for a complete
              two-storey home on a 20×40 to 30×40 plot at standard quality. Here is exactly what it buys
              across all four quality tiers, worked backward from budget to built area.
              All figures are civil-only; approvals, connections, and interiors add ₹10 to ₹18 lakh more.
            </p>

            <div className="rounded-sm p-6 md:p-8" style={{ border: "1.5px solid var(--accent)", background: "rgba(196,154,60,0.04)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Quick answer</p>
              <p className="font-sans" style={{ fontSize: "clamp(15px, 2vw, 17px)", lineHeight: 1.8, color: "var(--text-primary)" }}>
                ₹50 lakh at <strong>standard quality</strong> in Bangalore buys{" "}
                <strong>{buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max).min.toLocaleString("en-IN")} to {buaFromBudget(BUDGET, BANGALORE_RATES.standard.min, BANGALORE_RATES.standard.max).max.toLocaleString("en-IN")} sqft</strong>{" "}
                of built-up area, a full G+1 on a 20×40 plot, or a well-specified ground floor plus partial first floor
                on a 30×40. At <strong>basic quality</strong>, the same budget reaches{" "}
                <strong>{buaFromBudget(BUDGET, BANGALORE_RATES.basic.min, BANGALORE_RATES.basic.max).min.toLocaleString("en-IN")} to {buaFromBudget(BUDGET, BANGALORE_RATES.basic.min, BANGALORE_RATES.basic.max).max.toLocaleString("en-IN")} sqft</strong>{" "}
                , enough for a full G+1 on a 30×40 or 30×50 plot. North Bangalore outskirts rate applies at the high end of each BUA range.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── TIER TABLE ───────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="tiers-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>₹50 lakh budget · Built area by quality tier</p>
            <h2 id="tiers-heading" className="font-serif mb-10" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              What ₹50 lakh buys across tiers
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
                    <p className="font-mono mb-2" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>civil BUA from ₹50 lakh budget</p>
                    <p className="font-sans" style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                  <div className="flex items-center gap-3 md:justify-end">
                    <div className="w-full md:w-28 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.round((bua.max / 3500) * 100))}%`, background: "var(--accent)" }} />
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
              Civil work only. Excludes BBMP approval, BESCOM, BWSSB, borewell, compound wall, and interiors.
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        {/* ── PLOT–BUDGET MATCH TABLE ───────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="plots-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>G+1 viability by plot size</p>
            <h2 id="plots-heading" className="font-serif mb-6" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Can ₹50L build a full G+1?
            </h2>
            <p className="font-sans mb-10" style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "620px" }}>
              G+1 BUA = plot area × 0.60 FAR × 2 floors. Standard quality rate = ₹2,000 to ₹2,800/sqft. Here is
              how ₹50 lakh stacks up against the most common Bangalore plot sizes.
            </p>
          </AnimateIn>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ fontSize: "15px" }}>
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  <th className="pb-4 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--text-tertiary)" }}>Plot</th>
                  <th className="pb-4 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--text-tertiary)" }}>G+1 BUA</th>
                  <th className="pb-4 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--text-tertiary)" }}>Civil cost (standard)</th>
                  <th className="pb-4 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--text-tertiary)" }}>₹50L covers?</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                {[
                  { plot: "20×30", bua: 720, low: 14.4, high: 20.2, verdict: "Yes, easily", verdictColor: "#22c55e" },
                  { plot: "20×40", bua: 960, low: 19.2, high: 26.9, verdict: "Yes, comfortably", verdictColor: "#22c55e" },
                  { plot: "30×30", bua: 1080, low: 21.6, high: 30.2, verdict: "Yes", verdictColor: "#22c55e" },
                  { plot: "30×40", bua: 1440, low: 28.8, high: 40.3, verdict: "Yes, fully", verdictColor: "#22c55e" },
                  { plot: "30×50", bua: 1800, low: 36.0, high: 50.4, verdict: "Marginal at outskirts", verdictColor: "#f59e0b" },
                  { plot: "30×60", bua: 2160, low: 43.2, high: 60.5, verdict: "One floor only at central rates", verdictColor: "#ef4444" },
                  { plot: "40×60", bua: 2880, low: 57.6, high: 80.6, verdict: "Under-funded for G+1", verdictColor: "#ef4444" },
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
              BUA = plot × 0.60 FAR × 2 floors. Standard range ₹2,000–₹2,800/sqft.
              Verdict is for civil cost only. Approvals and fit-out are additional.
            </p>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Planning your ₹50 lakh build</p>
            <h2 className="font-serif mb-8" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              How to deploy ₹50 lakh in Bangalore
            </h2>
            <div className="space-y-6" style={{ maxWidth: "680px" }}>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                ₹50 lakh is the natural G+1 budget for Bangalore&apos;s most common plot sizes, the range where you
                can build a complete two-storey home at standard quality without phasing. On a 30×40 plot with G+1
                (BUA 1,440 sqft), the civil cost at standard quality runs ₹28.8 to ₹40.3 lakh, leaving ₹10 to
                ₹21 lakh for approvals, connections, and interior fit-out. On a 30×50 plot, the math is tighter
                at ₹36 to ₹50.4 lakh civil, still workable in north Bangalore where the lower rate end applies.
                For anything larger, ₹50 lakh is a ground-floor civil budget, not a full G+1 budget.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                The zone you build in clearly affects what ₹50 lakh delivers. In north Bangalore (Yelahanka,
                Devanahalli, Hebbal corridor), laterite soil reduces foundation cost by ₹1.5 to ₹3 lakh compared
                to lakebed zones, and contractor rates sit at the lower end of the standard range. In east Bangalore
                (Whitefield, Sarjapura, Marathahalli), lakebed soil means pile foundations add ₹3 to ₹6 lakh to
                civil cost, and IT-zone labour rates are 10 to 15 percent higher. In central Bangalore (Koramangala,
                Indiranagar, Basavanagudi), rates push to ₹2,800 to ₹4,000/sqft and ₹50 lakh covers only a single
                floor on most plots. The identical ₹50 lakh budget builds more in the north than the centre.
              </p>
              <p className="font-sans" style={{ fontSize: "19px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                At the ₹50 lakh price point, the decision between standard and premium quality is a real one. Standard
                quality (Kajaria tiles, UPVC windows, Jaquar basic chrome fittings) at ₹2,000 to ₹2,800/sqft gives
                1,786 to 2,500 sqft civil BUA, a full G+1 with room for comfortable rooms and balconies. Premium
                quality (Italian tiles, Kohler fittings, designer staircase, feature elevation) at ₹2,600 to ₹3,500/sqft
                gives 1,429 to 1,923 sqft, a smaller home with much more finish. For a primary residence
                that you intend to occupy for 10+ years, premium quality on a compact footprint is often better than
                standard quality on a larger one, especially in Bangalore&apos;s rental market where spec matters more
                than size in the ₹40K to ₹80K monthly bracket.
              </p>
            </div>
          </AnimateIn>
        </section>

        <div className="max-w-5xl mx-auto px-5 md:px-10"><div className="h-px" style={{ background: "var(--border)" }} /></div>

        <section className="max-w-5xl mx-auto px-5 md:px-10 py-14 md:py-20" aria-labelledby="faq-heading">
          <AnimateIn direction="up">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>Common questions</p>
            <h2 id="faq-heading" className="font-serif mb-10" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              ₹50 lakh house in Bangalore
            </h2>
          </AnimateIn>
          <FAQBlock items={FAQ_ITEMS} schemaId="bangalore-50-lakh-faq" />
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
                Plan your ₹50 lakh Bangalore build
              </h2>
              <p className="font-sans mb-8 mx-auto" style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
                Five questions. Cost range, material list, and payment timeline for your actual plot and quality spec.
              </p>
              <Link href="/plan?city=bangalore&from=blr-50L-footer" className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.12em]" style={{ background: "var(--accent)", color: "#ffffff", borderRadius: "2px" }}>
                Begin my estimate →
              </Link>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
