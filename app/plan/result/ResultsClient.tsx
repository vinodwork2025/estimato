"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePlannerStore } from "@/lib/store/planner-store";
import { LeadFormModal } from "@/components/lead-capture/LeadFormModal";
import { SuccessState } from "@/components/lead-capture/SuccessState";
import { Modal } from "@/components/ui/Modal";
import { EstimateLogo } from "@/components/shared/EstimateLogo";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics/events";
import { formatINRShort } from "@/lib/utils";
import type { CalculationResult, PlannerInput, QualityTier } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

type SuccessData = { partnerMatched: boolean; partnerName: string | null; phone: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cityLabel(city: string) {
  return city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function homeTypeLabel(ht: string) {
  const map: Record<string, string> = {
    villa: "villa",
    duplex: "duplex",
    farmhouse: "farmhouse",
    contemporary: "contemporary home",
    budget: "budget home",
    "luxury-villa": "luxury villa",
  };
  return map[ht] ?? ht;
}

function daysToMonths(days: number) {
  const m = Math.round(days / 30);
  return m === 1 ? "1 month" : `${m} months`;
}

// ─── Breakdown config ─────────────────────────────────────────────────────────

const BREAKDOWN_META: Record<
  keyof CalculationResult["breakdown"],
  { label: string; desc: string }
> = {
  civilStructure: {
    label: "Foundation & Structure",
    desc: "Footings, columns, slabs, beams, and roof — the structural skeleton of your home.",
  },
  finishes: {
    label: "Flooring & Wall Finishes",
    desc: "Floor tiles, wall plaster, paint, and external cladding.",
  },
  interiors: {
    label: "Interiors",
    desc: "Kitchen cabinets, wardrobes, and built-in furniture based on your finishing tier.",
  },
  mep: {
    label: "Electrical & Plumbing",
    desc: "All wiring, switchboards, pipes, sanitary ware, and water connections.",
  },
  elevation: {
    label: "Exterior & Facade",
    desc: "Main entrance, front elevation, window frames, and boundary compound wall.",
  },
  approvalsAndFees: {
    label: "Approvals & Permits",
    desc: "Building plan approval, BESCOM connection, and statutory government fees.",
  },
  contingency: {
    label: "Contingency Reserve",
    desc: "Buffer for material price changes, labour delays, and unexpected site conditions.",
  },
};

const TIER_LABELS: Record<QualityTier, string> = {
  essential: "Basic",
  economy: "Standard",
  premium: "Premium",
  luxury: "Luxury",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroSection({
  result,
  input,
  onGetPDF,
  onTalkArchitect,
}: {
  result: CalculationResult;
  input: Partial<PlannerInput>;
  onGetPDF: () => void;
  onTalkArchitect: () => void;
}) {
  const ht = homeTypeLabel(input.homeType ?? "home");
  const city = input.city ? cityLabel(input.city) : "your city";
  const tier = TIER_LABELS[input.qualityTier ?? "economy"];
  const sqft = input.configuration?.builtUpArea ?? 0;

  return (
    <section className="px-6 md:px-12 pt-16 pb-20 md:pt-24 md:pb-28" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-5">
            Your estimate · {tier} finish · {sqft.toLocaleString("en-IN")} sqft
          </p>
          <p
            className="text-text-secondary mb-4"
            style={{ fontSize: "18px", lineHeight: 1.5 }}
          >
            Your {ht} in {city} will cost between
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <p
            className="font-serif text-navy tabular-nums"
            style={{
              fontSize: "clamp(52px, 10vw, 96px)",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              marginBottom: "16px",
            }}
          >
            {formatINRShort(result.totalRange.min)} – {formatINRShort(result.totalRange.max)}
          </p>
          <div
            style={{ width: "48px", height: "2px", background: "var(--accent)", marginBottom: "20px" }}
          />
          <p className="font-mono text-text-tertiary" style={{ fontSize: "13px" }}>
            That&apos;s about{" "}
            <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>
              ₹{result.costPerSqft.toLocaleString("en-IN")} per sqft
            </strong>{" "}
            · Confidence: ±6%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="flex flex-col sm:flex-row gap-3 mt-10"
        >
          <Button variant="primary" size="lg" onClick={onTalkArchitect} className="px-10">
            Talk to an architect
          </Button>
          <Button variant="secondary" size="lg" onClick={onGetPDF} className="px-10">
            Download PDF
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-mono text-text-tertiary mt-5"
          style={{ fontSize: "11px", letterSpacing: "0.06em" }}
        >
          Free · No sales call · Based on verified BOQs from real {city} projects
        </motion.p>
      </div>
    </section>
  );
}

function BreakdownSection({ breakdown }: { breakdown: CalculationResult["breakdown"] }) {
  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
  const keys = Object.keys(breakdown) as (keyof CalculationResult["breakdown"])[];

  return (
    <section className="px-6 md:px-12 py-16 md:py-24" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-10"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-3">
            Cost breakdown
          </p>
          <h2
            className="font-serif text-navy"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}
          >
            Where does the money go?
          </h2>
          <p className="text-text-secondary mt-3" style={{ fontSize: "16px", maxWidth: "52ch" }}>
            Seven cost segments — each one a real line item you can discuss with your contractor.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {keys.map((key, i) => {
            const meta = BREAKDOWN_META[key];
            const amount = breakdown[key];
            const pct = total > 0 ? Math.round((amount / total) * 100) : 0;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
                className="p-5 md:p-6"
                style={{
                  background: "white",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-serif text-navy mb-1"
                      style={{ fontSize: "18px", fontWeight: 400, letterSpacing: "-0.01em" }}
                    >
                      {meta.label}
                    </p>
                    <p className="text-text-secondary" style={{ fontSize: "14px", lineHeight: 1.55 }}>
                      {meta.desc}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className="font-serif text-navy tabular-nums"
                      style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.02em" }}
                    >
                      {formatINRShort(amount)}
                    </p>
                    <p className="font-mono text-text-tertiary" style={{ fontSize: "11px" }}>
                      {pct}% of total
                    </p>
                  </div>
                </div>
                <div
                  style={{ height: "3px", background: "var(--border)", borderRadius: "2px" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.07, ease }}
                    style={{ height: "100%", background: "var(--accent)", borderRadius: "2px" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineSection({ phases, totalDays }: { phases: CalculationResult["timeline"]["phases"]; totalDays: number }) {
  return (
    <section className="px-6 md:px-12 py-16 md:py-24" style={{ background: "#FFFFFF", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-10"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-3">
            Build timeline
          </p>
          <h2
            className="font-serif text-navy"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}
          >
            How long will it take?
          </h2>
          <p className="text-text-secondary mt-3" style={{ fontSize: "16px" }}>
            Total build time:{" "}
            <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>
              {daysToMonths(totalDays)}
            </strong>
            , split across four phases.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="p-5"
              style={{
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: "4px",
              }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3"
                style={{ color: "var(--accent)" }}
              >
                Phase {i + 1}
              </p>
              <p
                className="font-serif text-navy mb-1"
                style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em" }}
              >
                {phase.name}
              </p>
              <p
                className="font-mono text-text-tertiary mb-3"
                style={{ fontSize: "12px" }}
              >
                {daysToMonths(phase.durationDays)}
              </p>
              <p className="text-text-secondary" style={{ fontSize: "13px", lineHeight: 1.6 }}>
                {phase.description}
              </p>
              <div
                className="mt-4 pt-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <p className="font-mono text-text-tertiary" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                  PAYMENT DUE
                </p>
                <p
                  className="font-serif text-navy tabular-nums mt-0.5"
                  style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.02em" }}
                >
                  {formatINRShort(phase.cost)}
                </p>
                <p className="font-mono text-text-tertiary" style={{ fontSize: "10px" }}>
                  {phase.paymentPercent}% of total
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WarningsSection({ warnings }: { warnings: CalculationResult["hiddenCostWarnings"] }) {
  if (!warnings || warnings.length === 0) return null;

  const categoryLabel: Record<string, string> = {
    approvals: "Approval risk",
    interiors: "Interior cost risk",
    materials: "Material cost risk",
    labour: "Labour risk",
    overruns: "Cost overrun risk",
  };

  return (
    <section className="px-6 md:px-12 py-16 md:py-24" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-10"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-3">
            Watch out for
          </p>
          <h2
            className="font-serif text-navy"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}
          >
            Things your contractor may not mention.
          </h2>
          <p className="text-text-secondary mt-3" style={{ fontSize: "16px", maxWidth: "52ch" }}>
            These are real cost risks we surface upfront so you can budget for them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {warnings.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.09, ease }}
              className="p-5 md:p-6"
              style={{
                border: "1px solid var(--border)",
                borderRadius: "4px",
                borderLeft: "3px solid var(--accent)",
              }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: "var(--accent)" }}>
                {categoryLabel[w.category] ?? w.category}
              </p>
              <p
                className="font-serif text-navy mb-2"
                style={{ fontSize: "18px", fontWeight: 400, letterSpacing: "-0.01em" }}
              >
                {w.title}
              </p>
              <p className="text-text-secondary mb-4" style={{ fontSize: "14px", lineHeight: 1.65 }}>
                {w.message}
              </p>
              {w.estimatedImpact && (
                <div
                  className="px-3 py-2 font-mono"
                  style={{
                    background: "rgba(168,130,59,0.07)",
                    borderRadius: "2px",
                    fontSize: "12px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Estimated impact: {w.estimatedImpact}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SmartInsightsSection({ insights }: { insights: CalculationResult["smartInsights"] }) {
  if (!insights || insights.length === 0) return null;

  const iconColor: Record<string, string> = {
    opportunity: "var(--accent)",
    warning: "#B8741F",
    note: "var(--text-tertiary)",
  };
  const bgColor: Record<string, string> = {
    opportunity: "rgba(196,154,60,0.06)",
    warning: "rgba(184,116,31,0.06)",
    note: "var(--surface)",
  };
  const typeLabel: Record<string, string> = {
    opportunity: "Opportunity",
    warning: "Watch out",
    note: "Note",
  };

  return (
    <section className="px-6 md:px-12 py-16 md:py-24" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-10"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-3">
            Smart observations
          </p>
          <h2
            className="font-serif text-navy"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}
          >
            Specific to your build.
          </h2>
          <p className="text-text-secondary mt-3" style={{ fontSize: "16px", maxWidth: "52ch" }}>
            Observations based on your plot, city, configuration, and quality choice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.09, ease }}
              className="p-5 md:p-6"
              style={{
                background: bgColor[insight.type] ?? "white",
                border: "1px solid var(--border)",
                borderRadius: "4px",
              }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2"
                style={{ color: iconColor[insight.type] }}
              >
                {typeLabel[insight.type] ?? insight.type}
              </p>
              <p
                className="font-serif text-navy mb-2"
                style={{ fontSize: "18px", fontWeight: 400, letterSpacing: "-0.01em" }}
              >
                {insight.title}
              </p>
              <p className="text-text-secondary" style={{ fontSize: "14px", lineHeight: 1.65 }}>
                {insight.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OtherTiersSection({
  scenarios,
  selected,
}: {
  scenarios: CalculationResult["comparisonScenarios"];
  selected: QualityTier;
}) {
  const tiers: QualityTier[] = ["essential", "economy", "premium", "luxury"];
  const descs: Record<QualityTier, string> = {
    essential: "Practical materials, solid construction.",
    economy: "Elevated finishes, brand sanitary ware.",
    premium: "Architectural quality, imported fittings.",
    luxury: "Italian marble, Kohler, heritage finishes.",
  };

  return (
    <section className="px-6 md:px-12 py-16 md:py-24" style={{ background: "#FFFFFF", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-10"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-3">
            Other options
          </p>
          <h2
            className="font-serif text-navy"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05 }}
          >
            What if you changed the finish level?
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tiers.map((tier, i) => {
            const isSelected = tier === selected;
            const amount = scenarios?.[tier] ?? 0;

            return (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="p-4 md:p-5"
                style={{
                  background: isSelected ? "var(--navy)" : "white",
                  border: "2px solid",
                  borderColor: isSelected ? "var(--navy)" : "var(--border)",
                  borderRadius: "4px",
                }}
              >
                {isSelected && (
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.16em] mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    Your choice
                  </p>
                )}
                <p
                  className="font-serif mb-1"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: isSelected ? "white" : "var(--text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {TIER_LABELS[tier]}
                </p>
                <p
                  className="font-serif tabular-nums mb-2"
                  style={{
                    fontSize: "22px",
                    fontWeight: 300,
                    color: isSelected ? "white" : "var(--navy)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {formatINRShort(amount)}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: isSelected ? "rgba(255,255,255,0.55)" : "var(--text-tertiary)",
                    lineHeight: 1.5,
                  }}
                >
                  {descs[tier]}
                </p>
              </motion.div>
            );
          })}
        </div>
        <p className="font-mono text-text-tertiary mt-4" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
          All figures use the same location, area, and floor count as your estimate. Only the finish level changes.
        </p>
      </div>
    </section>
  );
}

function FooterCTA({ onTalkArchitect }: { onTalkArchitect: () => void }) {
  return (
    <section className="px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <h2
            className="font-serif text-navy mb-5"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1, maxWidth: "22ch" }}
          >
            Want to talk through this with an architect?
          </h2>
          <p className="text-text-secondary mb-8" style={{ fontSize: "16px", maxWidth: "48ch", lineHeight: 1.7 }}>
            We introduce one verified firm in your area. No cold calls, no pressure. You decide if you want to talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary" size="lg" onClick={onTalkArchitect} className="px-10">
              Request one introduction
            </Button>
            <Link href="/plan">
              <Button variant="secondary" size="lg" className="px-10 w-full sm:w-auto">
                Start a new estimate
              </Button>
            </Link>
          </div>

          <div className="mt-16 pt-8 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: "1px solid var(--border)" }}>
            <Link
              href="/methodology"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Read the methodology
            </Link>
            <Link
              href="/"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Estimato home
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ResultsClient() {
  const router = useRouter();
  const { result, input } = usePlannerStore();
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [success, setSuccess] = useState<SuccessData | null>(null);

  useEffect(() => {
    if (!result) {
      router.replace("/plan");
      return;
    }
    track("result_viewed", {
      total_mid: result.totalRange.mid,
      city: input.city ?? "",
      partner_matched: false,
    });
  }, [result, input.city, router]);

  if (!result) return null;

  function openLeadForm() {
    track("architect_intro_requested");
    setShowLeadForm(true);
  }

  function handleSuccess(data: SuccessData) {
    setShowLeadForm(false);
    setSuccess(data);
  }

  const qualityTier = (input.qualityTier ?? "economy") as QualityTier;

  return (
    <>
      <div className="min-h-screen bg-bg-primary">
        <header className="sticky top-0 z-30 bg-bg-primary border-b border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
            <Link href="/" aria-label="Estimato home">
              <EstimateLogo size="sm" variant="mark" />
            </Link>
            <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-[0.18em] hidden md:block">
              Confidence ±6% · BOQ-verified
            </span>
            <Link
              href="/plan"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary hover:text-text-secondary transition-colors"
            >
              New estimate
            </Link>
          </div>
        </header>

        <main>
          <HeroSection
            result={result}
            input={input}
            onGetPDF={openLeadForm}
            onTalkArchitect={openLeadForm}
          />

          <BreakdownSection breakdown={result.breakdown} />

          <TimelineSection
            phases={result.timeline.phases}
            totalDays={result.timeline.totalDays}
          />

          {result.hiddenCostWarnings?.length > 0 && (
            <WarningsSection warnings={result.hiddenCostWarnings} />
          )}

          {result.smartInsights?.length > 0 && (
            <SmartInsightsSection insights={result.smartInsights} />
          )}

          <OtherTiersSection
            scenarios={result.comparisonScenarios ?? { essential: 0, economy: 0, premium: 0, luxury: 0 }}
            selected={qualityTier}
          />

          <FooterCTA onTalkArchitect={openLeadForm} />
        </main>
      </div>

      <LeadFormModal
        open={showLeadForm}
        onClose={() => setShowLeadForm(false)}
        onSuccess={handleSuccess}
        input={input}
        result={result}
        sourcePage="result"
      />

      {success && (
        <Modal open={true} onClose={() => setSuccess(null)} title="Report sent!">
          <SuccessState
            phone={success.phone}
            partnerMatched={success.partnerMatched}
            partnerName={success.partnerName}
            onClose={() => setSuccess(null)}
          />
        </Modal>
      )}
    </>
  );
}
