"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePlannerStore } from "@/lib/store/planner-store";
import { QUALITY_TIERS } from "@/data/quality-tiers";
import { getBaseRate } from "@/lib/cost-engine/rates";
import { ProgressBar } from "./ProgressBar";
import { NavigationButtons } from "./NavigationButtons";
import { formatINRShort } from "@/lib/utils";
import { track } from "@/lib/analytics/events";
import { TIER_NAMES, TIER_DESCRIPTIONS, TIER_MATERIALS, PLAN } from "@/lib/copy";
import type { QualityTier } from "@/types";

const SWATCH_IMAGES: Record<QualityTier, string> = {
  essential: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=240&q=80",
  economy: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=240&q=80",
  premium: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=240&q=80",
  luxury: "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=240&q=80",
};

const DUOTONE = "grayscale(0.8) sepia(0.18) brightness(0.93) contrast(1.06)";

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
        <h1 className="step-title mb-2">{PLAN.step5Question}</h1>
        <p className="text-text-secondary leading-relaxed" style={{ fontSize: "16px" }}>
          {PLAN.step5Subhead}
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
          const tierKey = tier.value as QualityTier;

          return (
            <div
              key={tier.value}
              className="border-b border-border"
              style={{
                borderLeftWidth: "2px",
                borderLeftStyle: "solid",
                borderLeftColor: isSelected ? "var(--accent)" : "transparent",
                transition: "border-left-color 0.2s ease",
              }}
            >
              <button
                onClick={() => {
                  handleSelect(tier.value);
                  setExpanded(isExpanded ? null : tier.value);
                }}
                className="w-full text-left py-5 flex items-start justify-between gap-4 group focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30"
                style={{ paddingLeft: "18px" }}
                aria-pressed={isSelected}
                aria-expanded={isExpanded}
              >
                {/* Left: tier number + name */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-mono uppercase mb-2 transition-colors duration-200"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      color: isSelected ? "var(--accent)" : "var(--text-tertiary)",
                    }}
                  >
                    Tier {num}
                  </p>
                  <p
                    className="font-serif transition-all duration-200"
                    style={{
                      fontSize: "clamp(22px, 3vw, 30px)",
                      fontWeight: isSelected ? 500 : 400,
                      letterSpacing: "-0.012em",
                      lineHeight: 1.05,
                      color: isSelected ? "var(--text-primary)" : "var(--text-tertiary)",
                    }}
                  >
                    {TIER_NAMES[tierKey]}
                  </p>
                </div>

                {/* Right: live cost + chevron */}
                <div className="text-right shrink-0 flex items-center gap-3 pt-1">
                  <span
                    className="font-mono tabular-nums transition-colors duration-200"
                    style={{
                      fontSize: "13px",
                      color: isSelected ? "var(--text-primary)" : "var(--text-tertiary)",
                    }}
                  >
                    ~{formatINRShort(liveCost)}
                  </span>
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="inline-block"
                    style={{ fontSize: "12px", color: "var(--text-tertiary)" }}
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
                    <div className="pb-6 pl-5 pr-4 flex flex-col md:flex-row gap-6 items-start">
                      {/* Description + material details */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="leading-relaxed mb-3"
                          style={{ fontSize: "15px", color: "#3A3530", maxWidth: "44ch", lineHeight: 1.7 }}
                        >
                          {TIER_DESCRIPTIONS[tierKey]}
                        </p>
                        <p
                          className="font-mono text-text-tertiary mb-1"
                          style={{ fontSize: "11px", letterSpacing: "0.1em" }}
                        >
                          ₹{rateForCity.toLocaleString("en-IN")}/sqft
                        </p>
                        <p style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
                          {TIER_MATERIALS[tierKey]}
                        </p>
                      </div>

                      {/* Material swatch — warm duotone */}
                      <div
                        className="relative shrink-0 overflow-hidden w-20 h-20 md:w-[112px] md:h-[112px]"
                        style={{ borderRadius: "2px", border: "1px solid #D4CCBF" }}
                      >
                        <Image
                          src={SWATCH_IMAGES[tierKey]}
                          alt={`${TIER_NAMES[tierKey]} material reference`}
                          fill
                          className="object-cover"
                          sizes="112px"
                          style={{ filter: DUOTONE }}
                        />
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
