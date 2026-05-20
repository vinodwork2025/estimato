"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlannerStore } from "@/lib/store/planner-store";
import { QUALITY_TIERS } from "@/data/quality-tiers";
import { getBaseRate } from "@/lib/cost-engine/rates";
import { ProgressBar } from "./ProgressBar";
import { NavigationButtons } from "./NavigationButtons";
import { formatINRShort } from "@/lib/utils";
import { track } from "@/lib/analytics/events";
import type { QualityTier } from "@/types";

export function StepQuality() {
  const router = useRouter();
  const { input, setInput } = usePlannerStore();
  const [expanded, setExpanded] = useState<QualityTier | null>(
    input.qualityTier ?? null
  );

  const city = input.city ?? "hosur";
  const builtUpArea = input.configuration?.builtUpArea ?? 1500;
  const selected = input.qualityTier;

  function handleSelect(tier: QualityTier) {
    setInput({ qualityTier: tier });
    setExpanded(tier);
  }

  function handleNext() {
    if (!selected) return;
    track("planner_step_completed", { step_number: 5, step_name: "quality" });
    router.push("/plan/interiors");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
    >
      <ProgressBar currentStep={5} />

      <div>
        <h1 className="step-title mb-2">Choose your quality level.</h1>
        <p className="text-body-sm text-text-secondary">
          Sets the material standard for your entire home.
        </p>
      </div>

      {/* Editorial tier list */}
      <div className="border-t border-border">
        {QUALITY_TIERS.map((tier, i) => {
          const rateForCity = getBaseRate(city, tier.value);
          const liveCost = builtUpArea * rateForCity;
          const isSelected = selected === tier.value;
          const isExpanded = expanded === tier.value;
          const num = String(i + 1).padStart(2, "0");

          return (
            <div key={tier.value} className="border-b border-border">
              <button
                onClick={() => {
                  handleSelect(tier.value);
                  setExpanded(isExpanded ? null : tier.value);
                }}
                className="w-full text-left py-5 flex items-baseline justify-between gap-4 group focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30 rounded-sm"
                aria-pressed={isSelected}
                aria-expanded={isExpanded}
              >
                <div className="flex items-baseline gap-4 min-w-0">
                  <span
                    className="font-mono shrink-0 tabular-nums transition-colors duration-300"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      color: isSelected ? "var(--gold)" : "var(--border-strong)",
                    }}
                  >
                    {num}
                  </span>
                  <span
                    className="font-serif transition-all duration-300"
                    style={{
                      fontSize: "clamp(20px, 3.5vw, 26px)",
                      fontWeight: isSelected ? 500 : 400,
                      color: isSelected
                        ? "var(--text-primary)"
                        : "var(--text-tertiary)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.1,
                    }}
                  >
                    {tier.label}
                  </span>
                </div>

                <div className="text-right shrink-0 flex items-baseline gap-3">
                  <span
                    className="font-mono tabular-nums transition-all duration-300"
                    style={{
                      fontSize: "13px",
                      color: isSelected
                        ? "var(--text-primary)"
                        : "var(--text-tertiary)",
                      fontWeight: isSelected ? 500 : 400,
                    }}
                  >
                    ~{formatINRShort(liveCost)}
                  </span>
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-border-strong inline-block"
                    style={{ fontSize: "12px" }}
                    aria-hidden="true"
                  >
                    ↓
                  </motion.span>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-10 pr-0">
                      <p className="text-body-sm text-text-secondary mb-3 leading-relaxed max-w-[44ch]">
                        {tier.tagline}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                        <span className="font-mono text-[10px] text-text-tertiary">
                          ₹{rateForCity.toLocaleString("en-IN")}/sqft
                        </span>
                        <span
                          className="font-mono text-[10px] text-text-tertiary"
                          style={{ color: "var(--border-strong)" }}
                        >
                          ·
                        </span>
                        <span className="font-mono text-[10px] text-text-tertiary">
                          {tier.materials}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {!selected && (
        <p className="font-mono text-[10px] text-text-tertiary tracking-[0.1em] text-center py-2">
          Select a quality level to continue
        </p>
      )}

      <NavigationButtons
        onBack={() => router.push("/plan/configuration")}
        onNext={handleNext}
        nextDisabled={!selected}
      />
    </motion.div>
  );
}
