"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { usePlannerStore } from "@/lib/store/planner-store";
import { QUALITY_TIERS } from "@/data/quality-tiers";
import { getBaseRate } from "@/lib/cost-engine/rates";
import { ProgressBar } from "./ProgressBar";
import { NavigationButtons } from "./NavigationButtons";
import { formatINRShort } from "@/lib/utils";
import { track } from "@/lib/analytics/events";
import type { QualityTier } from "@/types";

const TIER_VISUAL: Record<string, { bar: string; badge?: string }> = {
  essential: { bar: "#C8C2B8" },
  standard:  { bar: "#2D7D5A", badge: "Most popular" },
  premium:   { bar: "#C5A059" },
  luxury:    { bar: "#0E2146", badge: "Top tier" },
};

export function StepQuality() {
  const router = useRouter();
  const { input, setInput } = usePlannerStore();

  const city = input.city ?? "hosur";
  const builtUpArea = input.configuration?.builtUpArea ?? 1500;
  const selected = input.qualityTier;

  function handleSelect(tier: QualityTier) {
    setInput({ qualityTier: tier });
  }

  function handleNext() {
    if (!selected) return;
    track("planner_step_completed", { step_number: 5, step_name: "quality" });
    router.push("/plan/interiors");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
    >
      <ProgressBar currentStep={5} />

      <div>
        <h1 className="step-title mb-2">Choose your quality level.</h1>
        <p className="text-body-sm text-text-secondary">
          Sets the material standard for your structure and finishes.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {QUALITY_TIERS.map((tier, i) => {
          const rateForCity = getBaseRate(city, tier.value);
          const liveCost = builtUpArea * rateForCity;
          const visual = TIER_VISUAL[tier.value] ?? { bar: "#C8C2B8" };
          const isSelected = selected === tier.value;

          return (
            <motion.button
              key={tier.value}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleSelect(tier.value)}
              className={`
                relative text-left overflow-hidden rounded-2xl border transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-navy
                ${isSelected
                  ? "border-navy/20 shadow-card"
                  : "border-border bg-white hover:border-border-strong hover:shadow-card"
                }
              `}
              style={isSelected ? { backgroundColor: "rgba(14,33,70,0.025)" } : { backgroundColor: "#ffffff" }}
              aria-pressed={isSelected}
            >
              <div className="flex items-stretch">
                {/* Left accent bar */}
                <div
                  className="w-[3px] shrink-0 rounded-l-2xl transition-opacity duration-300"
                  style={{
                    background: visual.bar,
                    opacity: isSelected ? 1 : 0.3,
                  }}
                />

                {/* Content */}
                <div className="flex-1 px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Tier name row */}
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="font-semibold text-body text-text-primary">
                          {tier.label}
                        </span>
                        {visual.badge && (
                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-success/10 text-success font-mono uppercase tracking-wide">
                            {visual.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-body-sm text-text-secondary mb-0.5">
                        {tier.tagline}
                      </p>
                      <p className="text-xs text-text-tertiary leading-relaxed">
                        {tier.materials}
                      </p>
                    </div>

                    {/* Rate + estimated civil cost */}
                    <div className="text-right shrink-0">
                      <p className="font-mono text-[10px] text-text-tertiary tabular-nums">
                        ₹{rateForCity.toLocaleString("en-IN")}/sqft
                      </p>
                      <p
                        className={`font-mono font-bold text-body-sm tabular-nums mt-1 ${
                          isSelected ? "text-navy" : "text-text-primary"
                        }`}
                      >
                        ~{formatINRShort(liveCost)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Selected check on right edge */}
                <div className="flex items-center pr-4">
                  {isSelected ? (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="w-5 h-5 rounded-full bg-navy flex items-center justify-center"
                    >
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none" aria-hidden="true">
                        <path
                          d="M1 3.5L3 5.5L7 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-border" />
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <NavigationButtons
        onBack={() => router.push("/plan/configuration")}
        onNext={handleNext}
        nextDisabled={!selected}
      />
    </motion.div>
  );
}
