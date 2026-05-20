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
    tagline: "Carpentry only — no built-in furniture",
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
    label: "Premium",
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
    >
      <ProgressBar currentStep={6} />

      <div>
        <h1 className="step-title mb-2">What interior level do you want?</h1>
        <p className="text-body-sm text-text-secondary">
          Covers furniture, modular work, and built-in fittings.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {INTERIOR_OPTIONS.map((opt, i) => {
          const rate = INTERIOR_RATES[opt.rateKey];
          const totalCost = builtUpArea * rate;
          const isSelected = selected === opt.value;

          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleSelect(opt.value)}
              className={`
                text-left overflow-hidden border transition-all duration-200
                focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30
                ${isSelected
                  ? "border-navy/30"
                  : "border-border bg-white hover:border-border-strong"
                }
              `}
              style={isSelected ? { backgroundColor: "rgba(14,33,70,0.025)" } : { backgroundColor: "#ffffff" }}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-0 px-5 py-4">
                {/* Index number */}
                <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-[0.18em] w-7 shrink-0">
                  {opt.index}
                </span>

                {/* Thin divider */}
                <div className="w-px h-8 bg-border shrink-0 mr-4" />

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-body-sm text-text-primary">{opt.label}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{opt.tagline}</p>
                </div>

                {/* Cost */}
                <div className="text-right shrink-0 mr-3">
                  <p className="font-mono text-[10px] text-text-tertiary tabular-nums">
                    ₹{rate.toLocaleString("en-IN")}/sqft
                  </p>
                  <p
                    className={`font-mono font-bold text-body-sm tabular-nums mt-0.5 ${
                      isSelected ? "text-navy" : "text-text-primary"
                    }`}
                  >
                    {formatINRShort(totalCost)}
                  </p>
                </div>

                {/* Selected indicator */}
                <div
                  className="w-px h-8 shrink-0 transition-colors duration-200"
                  style={{ background: isSelected ? "var(--accent)" : "transparent" }}
                />
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
