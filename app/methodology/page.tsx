import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { EstimateLogo } from "@/components/shared/EstimateLogo";

export const metadata: Metadata = {
  title: "How we calculate your projection — Estimato",
  description:
    "The methodology behind Estimato's construction cost projections. Built from verified BOQs, updated quarterly, open to review.",
};

const DATA_SOURCES = [
  {
    title: "Design Intend project BOQs, Hosur belt, 2024–2026",
    body: "We work directly with Design Intend, our founding architecture partner, who has shared anonymised Bill of Quantity data from completed projects in Hosur, Attibele, Bagalur, Sarjapura, and Krishnagiri. These form the primary calibration dataset for Tier 2 town rates. Each BOQ covers civil structure, finishes, MEP, and elevation separately — giving us category-level breakdowns, not just total cost per sqft.",
  },
  {
    title: "Bengaluru material rate surveys, quarterly",
    body: "We track three categories of material prices quarterly: structural materials (steel, cement, aggregate, sand), finish materials (tiles, paint, sanitary ware, electrical fittings), and labour rates by trade. Sources include direct contractor rate cards, retail price lists from major distributors in the Hosur–Electronic City belt, and periodic site visits to verify against actual purchase invoices.",
  },
  {
    title: "Labour cost indices, Hosur–Bengaluru construction belt",
    body: "Labour is the most volatile component of any construction budget. We maintain a rolling index for 11 trades: foundation, masonry, concrete, plumbing rough-in, electrical rough-in, plaster, tiling, carpentry, painting, glazing, and finish MEP. This index is updated when seasonal variation exceeds 4 percent from the prior quarter — typically April and October.",
  },
  {
    title: "Approval and statutory cost data, BBMP and panchayat zones",
    body: "Approval costs vary by jurisdiction, plot area, building height, and local authority. We maintain a lookup table covering 12 local bodies from Bengaluru Urban (BBMP) through Hosur Urban Local Body and the gram panchayats in between. This includes building plan sanction fees, betterment levy, service charges, and inspection costs. These figures are cross-checked against recent approval documentation shared by partner firms.",
  },
];

const FORMULA_LINES = [
  { op: "", var: "Base rate (₹/sqft, by tier, by city)" },
  { op: "×", var: "Plot configuration multiplier" },
  { op: "×", var: "Floors multiplier" },
  { op: "×", var: "Finishing tier multiplier" },
  { op: "+", var: "Statutory and approval allocation" },
  { op: "+", var: "8% contingency reserve" },
  { op: "=", var: "Projection range (±6%)" },
];

const NOT_INCLUDED = [
  "Furniture and movable items",
  "Landscaping beyond basic site levelling and boundary wall",
  "Solar and renewable energy retrofits",
  "Smart home systems and home automation",
  "Architect and structural engineer fees — typically 8 to 12 percent of build cost, billed separately",
  "Interior design fees beyond the finish tier costing",
  "Plot purchase cost, stamp duty, and registration",
];

const VARIANCE_FACTORS = [
  {
    title: "City labour volatility",
    body: "The largest single variable. Labour rates in the Hosur–Bengaluru belt move 4 to 7 percent in peak construction cycles (post-monsoon and pre-summer). Our projections use mid-cycle rates as the baseline.",
  },
  {
    title: "Material rate movement",
    body: "Steel and cement prices fluctuate with national demand and government policy. A 10 percent swing in steel price affects total project cost by approximately 1.5 to 2.5 percent depending on structural complexity.",
  },
  {
    title: "Site-specific approval delays",
    body: "Approval timelines in gram panchayat zones can extend a project by 4 to 8 weeks relative to BBMP zones. This affects the financing cost of the project, not the construction cost directly.",
  },
  {
    title: "Specification changes during construction",
    body: "The most common cause of budget overruns. A change from standard sanitary to premium sanitary mid-project can add ₹2L to ₹4L on a 2,000 sqft build. Our contingency reserve is designed to absorb changes at this scale.",
  },
];

export default function MethodologyPage() {
  const lastUpdated = "May 2026";
  const nextUpdate = "August 2026";

  return (
    <div className="min-h-screen bg-bg-primary">
      <SiteHeader />

      <main className="px-6 md:px-12 max-w-4xl mx-auto">

        {/* Hero */}
        <section className="pt-20 pb-24 md:pt-28 md:pb-32 border-b border-border">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-8">
            Methodology
          </p>
          <h1
            className="font-serif text-text-primary mb-8"
            style={{
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            How we calculate your projection.
          </h1>
          <p
            className="text-text-secondary leading-relaxed"
            style={{ fontSize: "17px", maxWidth: "64ch", lineHeight: 1.8 }}
          >
            Every projection on Estimato is built from verified construction BOQs
            collected directly from architecture and contracting firms working in
            the Hosur–Bengaluru belt. We update our rates quarterly against real
            project data — not published indices or national averages. The
            methodology is open. If something looks wrong, write to us.
          </p>
        </section>

        {/* Data sources */}
        <section className="py-20 md:py-28 border-b border-border" aria-labelledby="data-sources-heading">
          <h2
            id="data-sources-heading"
            className="font-serif text-text-primary mb-14"
            style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            The data sources.
          </h2>
          <div className="flex flex-col" style={{ gap: "0" }}>
            {DATA_SOURCES.map((source, i) => (
              <div
                key={i}
                className="py-10 border-b border-border last:border-0"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-tertiary mb-4">
                  Source {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="font-serif text-text-primary mb-5"
                  style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.2 }}
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

        {/* The formula */}
        <section className="py-20 md:py-28 border-b border-border" aria-labelledby="formula-heading">
          <h2
            id="formula-heading"
            className="font-serif text-text-primary mb-6"
            style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            The formula.
          </h2>
          <p
            className="text-text-secondary leading-relaxed mb-14"
            style={{ fontSize: "16px", maxWidth: "56ch", lineHeight: 1.8 }}
          >
            Simplified for transparency. The actual calculation adjusts for
            dozens of sub-variables, but the structure below reflects how cost
            is built up in every projection.
          </p>
          <div className="flex flex-col" style={{ gap: "14px" }}>
            {FORMULA_LINES.map((line, i) => (
              <div key={i} className="flex items-baseline gap-6">
                <span
                  className="font-serif text-text-tertiary tabular-nums shrink-0"
                  style={{ fontSize: "22px", fontWeight: 300, width: "20px", textAlign: "right" }}
                >
                  {line.op}
                </span>
                <span
                  className="font-mono text-text-primary"
                  style={{
                    fontSize: "14px",
                    letterSpacing: "0.01em",
                    borderBottom: i === FORMULA_LINES.length - 1 ? "none" : undefined,
                    fontWeight: i === FORMULA_LINES.length - 1 ? 500 : 400,
                    color: i === FORMULA_LINES.length - 1 ? "var(--accent)" : undefined,
                  }}
                >
                  {line.var}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* What we don't include */}
        <section className="py-20 md:py-28 border-b border-border" aria-labelledby="exclusions-heading">
          <h2
            id="exclusions-heading"
            className="font-serif text-text-primary mb-6"
            style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            What we do not include.
          </h2>
          <p
            className="text-text-secondary leading-relaxed mb-12"
            style={{ fontSize: "16px", maxWidth: "56ch", lineHeight: 1.8 }}
          >
            This honesty is the product. Most platforms bury these omissions in
            footnotes. We list them prominently because a homeowner who
            understands scope makes better decisions.
          </p>
          <div className="flex flex-col" style={{ gap: "0" }}>
            {NOT_INCLUDED.map((item, i) => (
              <div
                key={i}
                className="flex gap-6 py-5 border-b border-border last:border-0"
              >
                <span
                  className="font-mono text-text-tertiary tabular-nums shrink-0"
                  style={{ fontSize: "11px", letterSpacing: "0.1em" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="text-text-secondary leading-relaxed"
                  style={{ fontSize: "16px", lineHeight: 1.7 }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Confidence range */}
        <section className="py-20 md:py-28 border-b border-border" aria-labelledby="confidence-heading">
          <h2
            id="confidence-heading"
            className="font-serif text-text-primary mb-6"
            style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            The ±6% confidence range.
          </h2>
          <p
            className="text-text-secondary leading-relaxed mb-14"
            style={{ fontSize: "16px", maxWidth: "56ch", lineHeight: 1.8 }}
          >
            We give you a range rather than a single number because construction
            budgets are not deterministic. Here is what drives the variance in
            our projections.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {VARIANCE_FACTORS.map((factor, i) => (
              <div key={i} className="py-8 md:pr-12 border-b border-border">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-tertiary mb-3">
                  Factor {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="font-serif text-text-primary mb-3"
                  style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.2 }}
                >
                  {factor.title}
                </h3>
                <p
                  className="text-text-secondary leading-relaxed"
                  style={{ fontSize: "15px", lineHeight: 1.75 }}
                >
                  {factor.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Update cadence */}
        <section className="py-20 md:py-28 border-b border-border" aria-labelledby="updates-heading">
          <h2
            id="updates-heading"
            className="font-serif text-text-primary mb-6"
            style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Update cadence.
          </h2>
          <p
            className="text-text-secondary leading-relaxed mb-8"
            style={{ fontSize: "16px", maxWidth: "56ch", lineHeight: 1.8 }}
          >
            Rates are reviewed quarterly. A full update happens when any
            category moves more than 4 percent from the prior quarter.
            Partial updates happen as new BOQ data arrives from partner
            firms. Every projection includes the month and year the rates
            were verified.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary w-28 shrink-0">
                Last updated
              </span>
              <span className="font-mono text-text-primary" style={{ fontSize: "13px" }}>
                {lastUpdated}
              </span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary w-28 shrink-0">
                Next review
              </span>
              <span className="font-mono text-text-primary" style={{ fontSize: "13px" }}>
                {nextUpdate}
              </span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary w-28 shrink-0">
                Cadence
              </span>
              <span className="font-mono text-text-primary" style={{ fontSize: "13px" }}>
                Quarterly minimum, event-driven otherwise
              </span>
            </div>
          </div>
        </section>

        {/* Open invitation */}
        <section className="py-20 md:py-28">
          <h2
            className="font-serif text-text-primary mb-6"
            style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            An open invitation.
          </h2>
          <p
            className="text-text-secondary leading-relaxed mb-6"
            style={{ fontSize: "16px", maxWidth: "56ch", lineHeight: 1.8 }}
          >
            If you have project BOQ data from completed builds in the
            Hosur–Bengaluru belt that would improve our calibration, we would
            like to see it. We update only against real project data — no
            estimates, no indices, no surveys without invoice backing.
          </p>
          <p
            className="text-text-secondary leading-relaxed"
            style={{ fontSize: "16px", maxWidth: "56ch", lineHeight: 1.8 }}
          >
            Write to{" "}
            <a
              href="mailto:methodology@estimato.in"
              className="text-text-primary underline underline-offset-2 decoration-border hover:decoration-text-tertiary transition-colors"
            >
              methodology@estimato.in
            </a>
            . We will respond within one working week.
          </p>
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
              <Link href="/plan" className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 hover:text-white/90 transition-colors">Start planning</Link>
            </nav>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.1em]">
              © {new Date().getFullYear()} Estimato · estimato.in
            </p>
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.1em]">
              Methodology updated {lastUpdated}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
