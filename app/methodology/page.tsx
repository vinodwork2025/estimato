import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { EstimateLogo } from "@/components/shared/EstimateLogo";
import { METHODOLOGY } from "@/lib/copy";

export const metadata: Metadata = {
  title: "How we calculate your projection — Estimato",
  description:
    "The methodology behind Estimato's construction cost projections. Built from verified BOQs, updated quarterly, open to review.",
};

const DATA_SOURCES = [
  {
    label: "SOURCE 01",
    title: "Design Intend project BOQs",
    body: "Bills of Quantity from 14 completed residential projects in the Hosur-Bengaluru belt between 2024 and 2026. Used as the base rate calibration set for the Considered and Refined tiers. Each BOQ covers civil structure, finishes, MEP, and elevation separately — giving us category-level breakdowns, not just total cost per sqft.",
  },
  {
    label: "SOURCE 02",
    title: "Bengaluru material rate survey",
    body: "Quarterly market survey covering cement, steel, aggregates, tile, and joinery. Conducted by Design Intend's procurement team. Updated each quarter and back-tested against project actuals. Structural materials and finish materials are tracked separately.",
  },
  {
    label: "SOURCE 03",
    title: "Labour cost index",
    body: "Daily and contract labour rates tracked across Hosur, Sarjapura, Bagalur, and Whitefield. Adjusted seasonally to reflect peak-cycle premium. This index is updated when seasonal variation exceeds 4 percent from the prior quarter.",
  },
  {
    label: "SOURCE 04",
    title: "Statutory and approval cost data",
    body: "BBMP, panchayat, and approval body fee schedules across all twelve covered zones, updated against published rate cards and verified against project actuals. Includes building plan sanction fees, betterment levy, service charges, and inspection costs.",
  },
];

const FORMULA_LINES: { op: string; var: string; isResult?: boolean }[] = [
  { op: "",  var: "base_rate(city, tier)" },
  { op: "×", var: "plot_configuration_multiplier" },
  { op: "×", var: "floors_multiplier" },
  { op: "×", var: "finishing_tier_multiplier" },
  { op: "+", var: "statutory_allocation" },
  { op: "+", var: "approval_allocation" },
  { op: "+", var: "8% contingency_reserve" },
  { op: "=", var: "projection_range (±6%)", isResult: true },
];

const EXCLUSIONS = [
  {
    title: "Furniture and movables",
    body: "Sofas, beds, dining tables, and appliances are not part of construction cost. Budget separately based on your preferences.",
  },
  {
    title: "Landscaping beyond basic site work",
    body: "Trees, paving, garden lighting, and irrigation systems are not included. Add ₹3L to ₹15L depending on plot size and complexity.",
  },
  {
    title: "Solar and renewable systems",
    body: "Rooftop solar, battery storage, and water heating systems are excluded. A 3kW solar system runs ₹2L to ₹3L installed.",
  },
  {
    title: "Smart home and automation",
    body: "Lighting controls, security systems, and home automation are excluded. Add 1 to 3 percent of construction cost if planning these.",
  },
  {
    title: "Architect and consultant fees",
    body: "Typically 8 to 12 percent of build cost. We do not include these because every architect prices differently and we do not want to bias the projection.",
  },
];

const CONFIDENCE_FACTORS = [
  {
    num: "01",
    title: "Labour rate movement during the build period",
    body: "Labour is the most volatile component. Rates in the Hosur–Bengaluru belt move 4 to 7 percent in peak construction cycles. Our projections use mid-cycle rates as the baseline. Plan finishing milestones outside peak cycles where possible.",
  },
  {
    num: "02",
    title: "Material rate movement quarter-on-quarter",
    body: "Steel and cement prices fluctuate with national demand and government policy. A 10 percent swing in steel affects total cost by 1.5 to 2.5 percent depending on structural complexity. We update base rates quarterly to absorb this.",
  },
  {
    num: "03",
    title: "Site-specific approval and statutory delays",
    body: "Approval timelines in gram panchayat zones can extend a project by 4 to 8 weeks relative to BBMP zones. This affects financing cost, not construction cost directly, but it changes the effective project budget.",
  },
  {
    num: "04",
    title: "Specification changes during construction",
    body: "The most common cause of budget overruns. A mid-project upgrade from standard to premium sanitary fittings adds ₹2L to ₹4L on a 2,000 sqft build. Our contingency reserve is designed to absorb changes at this scale.",
  },
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <SiteHeader />

      <main className="px-6 md:px-12 max-w-4xl mx-auto">

        {/* Section 1 — Cover */}
        <section className="pt-20 pb-24 md:pt-28 md:pb-32 border-b border-border">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-10">
            {METHODOLOGY.pageLabel}
          </p>
          <h1
            className="font-serif text-text-primary mb-8 whitespace-pre-line"
            style={{
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            {METHODOLOGY.heroHeadline}
          </h1>
          <p
            className="text-text-secondary leading-relaxed"
            style={{ fontSize: "18px", maxWidth: "56ch", lineHeight: 1.75, color: "#3A3530" }}
          >
            {METHODOLOGY.heroBody}
          </p>
        </section>

        {/* Section 2 — Data sources */}
        <section className="py-20 md:py-28 border-b border-border" aria-labelledby="data-sources-heading">
          <h2
            id="data-sources-heading"
            className="font-serif text-text-primary mb-14"
            style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            {METHODOLOGY.sourcesHeadline}
          </h2>
          <div className="flex flex-col">
            {DATA_SOURCES.map((source, i) => (
              <div
                key={i}
                className="py-10 border-t border-border"
                style={{ borderLeftWidth: "1px", borderLeftColor: "var(--accent)", paddingLeft: "20px" }}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-tertiary mb-4">
                  {source.label}
                </p>
                <h3
                  className="font-serif text-text-primary mb-5"
                  style={{ fontSize: "24px", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.15 }}
                >
                  {source.title}
                </h3>
                <p
                  className="text-text-secondary leading-relaxed"
                  style={{ fontSize: "16px", maxWidth: "64ch", lineHeight: 1.8 }}
                >
                  {source.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — The formula */}
        <section className="py-20 md:py-28 border-b border-border" aria-labelledby="formula-heading">
          <h2
            id="formula-heading"
            className="font-serif text-text-primary mb-6"
            style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            {METHODOLOGY.formulaHeadline}
          </h2>
          <p
            className="text-text-secondary leading-relaxed mb-14"
            style={{ fontSize: "17px", maxWidth: "56ch", lineHeight: 1.75 }}
          >
            {METHODOLOGY.formulaIntro}
          </p>
          <div
            className="flex flex-col mx-auto md:mx-0"
            style={{ gap: "0", maxWidth: "480px" }}
          >
            {FORMULA_LINES.map((line, i) => (
              <div key={i} className="flex items-baseline gap-5 py-2">
                <span
                  className="font-serif shrink-0 tabular-nums text-right"
                  style={{
                    fontSize: "20px",
                    fontWeight: 300,
                    width: "20px",
                    color: line.isResult ? "var(--accent)" : "var(--text-tertiary)",
                    lineHeight: 2.2,
                  }}
                >
                  {line.op}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "14px",
                    letterSpacing: "0.02em",
                    lineHeight: 2.2,
                    fontWeight: line.isResult ? 500 : 400,
                    color: line.isResult ? "var(--accent)" : "var(--text-primary)",
                  }}
                >
                  {line.var}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 — What is not included */}
        <section className="py-20 md:py-28 border-b border-border" aria-labelledby="exclusions-heading">
          <h2
            id="exclusions-heading"
            className="font-serif text-text-primary mb-6"
            style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            {METHODOLOGY.exclusionsHeadline}
          </h2>
          <p
            className="text-text-secondary leading-relaxed mb-12"
            style={{ fontSize: "17px", maxWidth: "56ch", lineHeight: 1.75 }}
          >
            {METHODOLOGY.exclusionsIntro}
          </p>
          <div className="flex flex-col">
            {EXCLUSIONS.map((item, i) => (
              <div key={i} className="py-6 border-t border-border">
                <h3
                  className="font-serif text-text-primary mb-2"
                  style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.2 }}
                >
                  {item.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: "15px", color: "#3A3530", lineHeight: 1.75, maxWidth: "60ch" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 — Confidence and variance */}
        <section className="py-20 md:py-28 border-b border-border" aria-labelledby="confidence-heading">
          <h2
            id="confidence-heading"
            className="font-serif text-text-primary mb-6"
            style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            {METHODOLOGY.confidenceHeadline}
          </h2>
          <p
            className="text-text-secondary leading-relaxed mb-14"
            style={{ fontSize: "17px", maxWidth: "64ch", lineHeight: 1.75 }}
          >
            {METHODOLOGY.confidenceIntro}
          </p>
          <div className="flex flex-col">
            {CONFIDENCE_FACTORS.map((factor) => (
              <div key={factor.num} className="py-8 border-t border-border flex gap-8 items-start">
                <span
                  className="font-mono text-text-tertiary shrink-0 tabular-nums"
                  style={{ fontSize: "11px", letterSpacing: "0.12em", marginTop: "4px" }}
                >
                  {factor.num}
                </span>
                <div>
                  <h3
                    className="font-serif text-text-primary mb-3"
                    style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.2 }}
                  >
                    {factor.title}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ fontSize: "16px", color: "#3A3530", lineHeight: 1.75, maxWidth: "60ch" }}
                  >
                    {factor.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 — Update cadence */}
        <section className="py-20 md:py-28 border-b border-border" aria-labelledby="cadence-heading">
          <h2
            id="cadence-heading"
            className="font-serif text-text-primary mb-5"
            style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            {METHODOLOGY.cadenceHeadline}
          </h2>
          <p
            className="text-text-secondary leading-relaxed mb-8"
            style={{ fontSize: "16px", maxWidth: "56ch", lineHeight: 1.8 }}
          >
            {METHODOLOGY.cadenceBody}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
            {METHODOLOGY.lastUpdated}
          </p>
        </section>

        {/* Section 7 — Open challenge */}
        <section className="py-20 md:py-28 text-center">
          <h2
            className="font-serif text-text-primary mb-5"
            style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            {METHODOLOGY.challengeHeadline}
          </h2>
          <p
            className="text-text-secondary leading-relaxed mb-5 mx-auto"
            style={{ fontSize: "16px", maxWidth: "56ch", lineHeight: 1.8 }}
          >
            {METHODOLOGY.challengeBody}
          </p>
          <a
            href={`mailto:${METHODOLOGY.challengeEmail}`}
            className="text-text-primary underline underline-offset-2 decoration-border hover:decoration-text-tertiary transition-colors"
            style={{ fontSize: "16px" }}
          >
            {METHODOLOGY.challengeEmail}
          </a>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-navy border-t border-white/10 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <EstimateLogo size="lg" variant="light" />
              <p className="font-mono text-[10px] text-white/40 mt-3 uppercase tracking-[0.1em]">
                Honest construction cost estimates for Indian homeowners.
              </p>
            </div>
            <nav className="flex flex-col sm:flex-row gap-x-8 gap-y-3" aria-label="Footer navigation">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 hover:text-white/90 transition-colors">Home</Link>
              <Link href="/about" className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 hover:text-white/90 transition-colors">About</Link>
              <Link href="/plan" className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 hover:text-white/90 transition-colors">Begin your projection</Link>
            </nav>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.1em]">
              © {new Date().getFullYear()} Estimato · estimato.in
            </p>
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.1em]">
              {METHODOLOGY.lastUpdated}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
