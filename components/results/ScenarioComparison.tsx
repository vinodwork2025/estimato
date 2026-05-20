"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatINRShort } from "@/lib/utils";
import { track } from "@/lib/analytics/events";
import type { CalculationResult, QualityTier } from "@/types";

const TIER_LABELS: Record<QualityTier, string> = {
  essential: "Essential",
  economy: "Economy",
  premium: "Premium",
  luxury: "Luxury",
};

const TIER_DETAIL: Record<QualityTier, { tagline: string; materials: string }> = {
  essential: {
    tagline: "Functional, durable, no frills.",
    materials: "Local tiles, standard sanitary, basic electricals",
  },
  economy: {
    tagline: "Smart material choices, honest build.",
    materials: "Kajaria flooring, Hindware sanitary, Anchor switches",
  },
  premium: {
    tagline: "Branded fittings, refined finishes.",
    materials: "Somany Duragres, Jaquar fittings, Legrand switches",
  },
  luxury: {
    tagline: "Architect-grade. Top-tier throughout.",
    materials: "Italian marble, Kohler sanitary, Schneider electrics",
  },
};

interface ScenarioComparisonProps {
  scenarios: CalculationResult["comparisonScenarios"];
  selectedTier: QualityTier;
}

export function ScenarioComparison({
  scenarios,
  selectedTier,
}: ScenarioComparisonProps) {
  const [active, setActive] = useState<QualityTier>(selectedTier);
  const tiers: QualityTier[] = ["essential", "economy", "premium", "luxury"];
  const baseValue = scenarios[selectedTier];
  const maxValue = Math.max(...tiers.map((t) => scenarios[t]));

  function handleSelect(tier: QualityTier) {
    setActive(tier);
    track("scenario_compared", { from_tier: selectedTier, to_tier: tier });
  }

  return (
    <section aria-labelledby="scenarios-heading" className="py-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-px w-5 bg-gold/50" />
        <p className="label-arch">Quality comparison</p>
      </div>
      <h2
        id="scenarios-heading"
        className="font-serif text-text-primary mb-1"
        style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, letterSpacing: "-0.01em" }}
      >
        What if you changed quality?
      </h2>
      <p className="text-body-sm text-text-secondary mb-8">
        See the total shift across all four tiers.
      </p>

      {/* Editorial tier list */}
      <div className="border-t border-border">
        {tiers.map((tier, i) => {
          const value = scenarios[tier];
          const delta = value - baseValue;
          const isActive = active === tier;
          const isYourChoice = tier === selectedTier;
          const barWidth = Math.round((value / maxValue) * 100);
          const num = String(i + 1).padStart(2, "0");

          return (
            <div key={tier} className="border-b border-border">
              <button
                onClick={() => handleSelect(tier)}
                className="w-full text-left py-5 flex items-baseline justify-between gap-4 group focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30 rounded-sm"
                aria-pressed={isActive}
              >
                <div className="flex items-baseline gap-4 min-w-0">
                  <span
                    className="font-mono shrink-0 tabular-nums transition-colors duration-300"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      color: isActive ? "var(--gold)" : "var(--border-strong)",
                    }}
                  >
                    {num}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2.5 flex-wrap">
                      <span
                        className="font-serif transition-all duration-300"
                        style={{
                          fontSize: "clamp(18px, 3vw, 22px)",
                          fontWeight: isActive ? 500 : 400,
                          color: isActive
                            ? "var(--text-primary)"
                            : "var(--text-tertiary)",
                          letterSpacing: "-0.01em",
                          lineHeight: 1.15,
                        }}
                      >
                        {TIER_LABELS[tier]}
                      </span>
                      {isYourChoice && (
                        <span
                          className="font-mono text-[9px] uppercase tracking-[0.12em]"
                          style={{ color: "var(--gold)", paddingBottom: "1px" }}
                        >
                          your choice
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 flex items-baseline gap-3">
                  <span
                    className="font-mono tabular-nums transition-all duration-300"
                    style={{
                      fontSize: "13px",
                      color: isActive
                        ? "var(--text-primary)"
                        : "var(--text-tertiary)",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {formatINRShort(value)}
                  </span>
                  <motion.span
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="inline-block"
                    style={{ fontSize: "12px", color: "var(--border-strong)" }}
                    aria-hidden="true"
                  >
                    ↓
                  </motion.span>
                </div>
              </button>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-10 pr-0">
                      {/* Delta vs selection */}
                      {tier !== selectedTier && (
                        <p
                          className="font-mono text-[11px] font-medium tabular-nums mb-3"
                          style={{
                            color: delta > 0 ? "var(--warning)" : "var(--success)",
                          }}
                        >
                          {delta > 0 ? "+" : ""}
                          {formatINRShort(Math.abs(delta))} vs your selection
                        </p>
                      )}

                      {/* Relative scale bar */}
                      <div className="h-px bg-border mb-4 relative overflow-hidden rounded-full" style={{ width: "100%" }}>
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-0 top-0 h-full bg-gold origin-left"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>

                      <p className="text-body-sm text-text-secondary mb-2">
                        {TIER_DETAIL[tier].tagline}
                      </p>
                      <p className="font-mono text-[10px] text-text-tertiary">
                        {TIER_DETAIL[tier].materials}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
