"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatINRShort } from "@/lib/utils";
import { track } from "@/lib/analytics/events";
import type { CalculationResult, QualityTier } from "@/types";

const TIER_LABELS: Record<QualityTier, string> = {
  essential: "Essential",
  economy: "Standard",
  premium: "Premium",
  luxury: "Luxury",
};

const TIER_MATERIALS: Record<QualityTier, string> = {
  essential: "Local tiles, standard fittings",
  economy: "Kajaria, Hindware, Anchor",
  premium: "Somany, Jaquar, Legrand",
  luxury: "Italian marble, Kohler, Schneider",
};

interface ScenarioComparisonProps {
  scenarios: CalculationResult["comparisonScenarios"];
  selectedTier: QualityTier;
}

export function ScenarioComparison({ scenarios, selectedTier }: ScenarioComparisonProps) {
  const [active, setActive] = useState<QualityTier>(selectedTier);
  const tiers: QualityTier[] = ["essential", "economy", "premium", "luxury"];
  const baseValue = scenarios[selectedTier];
  const delta = scenarios[active] - baseValue;

  function handleSelect(tier: QualityTier) {
    setActive(tier);
    track("scenario_compared", { from_tier: selectedTier, to_tier: tier });
  }

  return (
    <section aria-labelledby="scenarios-heading" className="py-8">
      <p className="label-arch mb-2">Quality comparison</p>
      <h2 id="scenarios-heading" className="font-serif text-headline-md text-text-primary mb-1">
        What if you changed quality?
      </h2>
      <p className="text-body-sm text-text-secondary mb-6">
        See how the total shifts across all four tiers.
      </p>

      {/* Tier selector */}
      <div className="grid grid-cols-4 gap-1.5 mb-6">
        {tiers.map((tier) => (
          <button
            key={tier}
            onClick={() => handleSelect(tier)}
            className={`py-3 px-2 rounded-xl border text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy ${
              active === tier
                ? "border-navy/20 bg-navy/5 text-navy"
                : "border-border bg-white text-text-secondary hover:border-border-strong"
            }`}
            aria-pressed={active === tier}
          >
            <p className={`text-xs font-semibold ${active === tier ? "text-navy" : "text-text-primary"}`}>
              {TIER_LABELS[tier]}
            </p>
            {tier === selectedTier && (
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-navy/40 block mt-0.5">
                Your pick
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Animated display — flat, no nested card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.18 }}
          className="pt-4 border-t border-border"
        >
          <p className="label-arch mb-3">{TIER_LABELS[active]} build</p>
          <p className="font-serif text-[42px] text-text-primary tabular-nums leading-none mb-2">
            {formatINRShort(scenarios[active])}
          </p>
          {active !== selectedTier && (
            <p className={`font-mono text-sm font-semibold tabular-nums mb-2 ${delta > 0 ? "text-warning" : "text-success"}`}>
              {delta > 0 ? "+" : ""}{formatINRShort(Math.abs(delta))} vs your selection
            </p>
          )}
          <p className="text-xs text-text-tertiary font-mono">{TIER_MATERIALS[active]}</p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
