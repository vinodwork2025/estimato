"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { usePlannerStore } from "@/lib/store/planner-store";
import { INTERIOR_RATES } from "@/lib/cost-engine/rates";
import { ProgressBar } from "./ProgressBar";
import { NavigationButtons } from "./NavigationButtons";
import { formatINRShort } from "@/lib/utils";
import { track } from "@/lib/analytics/events";
import type { InteriorLevel } from "@/types";

const INTERIOR_OPTIONS: {
  value: InteriorLevel;
  label: string;
  tagline: string;
  rateKey: string;
  index: string;
}[] = [
  {
    value: "basic",
    rateKey: "basic",
    label: "Basic essentials",
    tagline: "Carpentry only â€” no built-in furniture",
    index: "01",
  },
  {
    value: "modular",
    rateKey: "modular",
    label: "Modular standard",
    tagline: "Modular kitchen and wardrobes",
    index: "02",
  },
  {
    value: "premium",
    rateKey: "premium",
    label: "Full modular",
    tagline: "Full modular and designer finishes",
    index: "03",
  },
  {
    value: "luxury-furnished",
    rateKey: "luxury-furnished",
    label: "Luxury furnished",
    tagline: "Architect-curated, fully furnished",
    index: "04",
  },
];

export function StepInteriors() {
  const router = useRouter();
  const { input, setInput } = usePlannerStore();

  const builtUpArea = input.configuration?.builtUpArea ?? 1500;
  const selected = input.interiorLevel;

  function handleSelect(level: InteriorLevel) {
    setInput({ interiorLevel: level });
  }

  function handleNext() {
    if (!selected) return;
    track("planner_step_completed", { step_number: 6, step_name: "interiors" });
    router.push("/plan/review");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
    >
      <ProgressBar currentStep={6} />

      <div>
        <h1 className="step-title mb-2">What interior level do you want?</h1>
        <p className="text-text-secondary leading-relaxed" style={{ fontSize: "16px" }}>
          Covers furniture, modular work, and built-in fittings.
        </p>
      </div>

      <div className="flex flex-col border-t border-border" role="radiogroup" aria-label="Interior level">
        {INTERIOR_OPTIONS.map((opt, i) => {
          const rate = INTERIOR_RATES[opt.rateKey];
          const totalCost = builtUpArea * rate;
          const isSelected = selected === opt.value;

          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleSelect(opt.value)}
              className="text-left border-b border-border focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30 transition-colors duration-200"
              style={{
                padding: "20px 16px 20px 20px",
                borderLeftWidth: "2px",
                borderLeftColor: isSelected ? "var(--accent)" : "transparent",
              }}
              role="radio"
              aria-checked={isSelected}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p
                    className="font-mono uppercase mb-1.5 transition-colors duration-200"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      color: isSelected ? "var(--accent)" : "var(--text-tertiary)",
                    }}
                  >
                    {opt.index}
                  </p>
                  <p
                    className="font-serif mb-1 transition-colors duration-200"
                    style={{
                      fontSize: "22px",
                      fontWeight: isSelected ? 500 : 400,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.1,
                      color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                    }}
                  >
                    {opt.label}
                  </p>
                  <p style={{ fontSize: "14px", color: "#7B93A8" }}>
                    {opt.tagline}
                  </p>
                </div>

                {/* Cost */}
                <div className="text-right shrink-0">
                  <p className="font-mono tabular-nums" style={{ fontSize: "10px", color: "var(--text-tertiary)" }}>
                    â‚¹{rate.toLocaleString("en-IN")}/sqft
                  </p>
                  <p
                    className="font-mono tabular-nums font-medium"
                    style={{
                      fontSize: "14px",
                      color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                      marginTop: "2px",
                    }}
                  >
                    {formatINRShort(totalCost)}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <NavigationButtons
        onBack={() => router.push("/plan/quality")}
        onNext={handleNext}
        nextDisabled={!selected}
      />
    </motion.div>
  );
}
