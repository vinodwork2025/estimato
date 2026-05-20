"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { formatINRShort } from "@/lib/utils";
import { TIER_NAMES, TIER_DESCRIPTIONS, RESULTS } from "@/lib/copy";
import type { CalculationResult, QualityTier } from "@/types";

interface LifestyleFrameProps {
  scenarios: CalculationResult["comparisonScenarios"];
  selectedTier: QualityTier;
  builtUpArea: number;
}

const TIERS: QualityTier[] = ["essential", "economy", "premium", "luxury"];

const ease = [0.16, 1, 0.3, 1] as const;

export function LifestyleFrame({ scenarios, selectedTier, builtUpArea }: LifestyleFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      aria-labelledby="lifestyle-heading"
      className="px-6 md:px-12 py-[96px] md:py-[160px] border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="mb-14 md:mb-20"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-4">
            Tier comparison
          </p>
          <h2
            id="lifestyle-heading"
            className="font-serif text-text-primary mb-4"
            style={{
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {RESULTS.lifestyleHeadline}
          </h2>
          <p className="text-text-secondary leading-relaxed" style={{ fontSize: "16px", maxWidth: "52ch" }}>
            {RESULTS.lifestyleBody}
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll snap. Desktop: 2×2 grid. */}
        <div
          className="flex overflow-x-auto md:grid md:grid-cols-2 md:overflow-visible hide-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
          role="list"
        >
          {TIERS.map((tier, i) => {
            const isSelected = tier === selectedTier;
            const tierValue = scenarios[tier];
            const selectedValue = scenarios[selectedTier];
            const delta = tierValue - selectedValue;
            const tierNum = String(i + 1).padStart(2, "0");

            return (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
                role="listitem"
                style={{
                  borderTop: "1px solid #D4CCBF",
                  padding: "32px 24px 40px",
                  position: "relative",
                  minWidth: "min(82vw, 300px)",
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                }}
              >
                {/* Tier number */}
                <p
                  className="font-mono uppercase mb-4"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    color: isSelected ? "var(--accent)" : "var(--text-tertiary)",
                  }}
                >
                  TIER {tierNum}
                </p>

                {/* Tier name */}
                <h3
                  className="font-serif text-text-primary mb-4"
                  style={{
                    fontSize: "clamp(22px, 3vw, 32px)",
                    fontWeight: isSelected ? 500 : 400,
                    letterSpacing: "-0.015em",
                    lineHeight: 1.05,
                  }}
                >
                  {TIER_NAMES[tier]}
                </h3>

                {/* Description */}
                <p
                  className="text-text-secondary mb-6 leading-relaxed"
                  style={{ fontSize: "15px", maxWidth: "32ch" }}
                >
                  {TIER_DESCRIPTIONS[tier]}
                </p>

                {/* Cost range */}
                <p
                  className="font-mono text-text-tertiary tabular-nums mb-4"
                  style={{ fontSize: "13px" }}
                >
                  {formatINRShort(tierValue)}
                  {builtUpArea > 0
                    ? ` for ${builtUpArea.toLocaleString("en-IN")} sqft`
                    : ""}
                </p>

                {/* Delta vs selected (for non-selected tiers) */}
                {!isSelected && delta !== 0 && (
                  <p
                    className="font-mono tabular-nums"
                    style={{
                      fontSize: "11px",
                      color: delta > 0 ? "var(--warning)" : "var(--success)",
                    }}
                  >
                    {delta > 0 ? "+" : ""}
                    {formatINRShort(Math.abs(delta))} vs your projection
                  </p>
                )}

                {/* Selected indicator */}
                {isSelected && (
                  <p
                    className="font-mono uppercase"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.16em",
                      color: "var(--accent)",
                    }}
                  >
                    Selected for your projection
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
