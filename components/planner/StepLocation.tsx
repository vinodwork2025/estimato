"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePlannerStore } from "@/lib/store/planner-store";
import { CITIES } from "@/data/cities";
import { CITY_CONFIDENCE, PLAN, TRUST } from "@/lib/copy";
import { ProgressBar } from "./ProgressBar";
import { NavigationButtons } from "./NavigationButtons";
import { track } from "@/lib/analytics/events";

const ease = [0.16, 1, 0.3, 1] as const;

export function StepLocation() {
  const router = useRouter();
  const { input, setInput } = usePlannerStore();
  const [selected, setSelected] = useState<string>(input.city ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSelect(city: string) {
    setSelected(city);
    setError(null);
    setInput({ city });
  }

  function handleNext() {
    if (!selected) {
      setError("Select a city to continue.");
      return;
    }
    track("planner_step_completed", { step_number: 2, step_name: "location" });
    router.push("/plan/plot");
  }

  const cities = CITIES.filter((c) => c.value !== "other");
  const other = CITIES.find((c) => c.value === "other");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      className="flex flex-col gap-6"
    >
      <ProgressBar currentStep={2} />

      <div>
        <h1 className="step-title mb-3">{PLAN.step2Question}</h1>
        <p className="text-text-secondary leading-relaxed" style={{ fontSize: "16px", maxWidth: "56ch", color: "var(--text-tertiary)" }}>
          {PLAN.step2Subhead}
        </p>
      </div>

      {/* City list */}
      <div className="flex flex-col border-t border-border" role="radiogroup" aria-label="Select city">
        {cities.map((city) => {
          const conf = CITY_CONFIDENCE[city.value];
          const isSelected = selected === city.value;

          return (
            <button
              key={city.value}
              type="button"
              onClick={() => handleSelect(city.value)}
              role="radio"
              aria-checked={isSelected}
              className="flex items-baseline justify-between py-4 border-b border-border text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30 group transition-colors duration-200"
              style={{
                paddingLeft: "20px",
                borderLeftWidth: "2px",
                borderLeftColor: isSelected ? "var(--accent)" : "transparent",
              }}
            >
              <span
                className="font-serif transition-colors duration-200"
                style={{
                  fontSize: "22px",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                }}
              >
                {city.label}
              </span>
              {conf && (
                <span
                  className="font-mono text-right leading-snug shrink-0 ml-4 transition-colors duration-200"
                  style={{
                    fontSize: "11px",
                    color: isSelected ? "var(--accent)" : "var(--text-tertiary)",
                  }}
                >
                  {conf.boqs} verified BOQs · {conf.variance} variance
                </span>
              )}
            </button>
          );
        })}

        {/* Other */}
        {other && (
          <button
            key="other"
            type="button"
            onClick={() => handleSelect("other")}
            role="radio"
            aria-checked={selected === "other"}
            className="flex items-baseline justify-between py-4 border-b border-border text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30 transition-colors duration-200"
            style={{
              paddingLeft: "20px",
              borderLeftWidth: "2px",
              borderLeftColor: selected === "other" ? "var(--accent)" : "transparent",
            }}
          >
            <span
              className="font-serif transition-colors duration-200"
              style={{
                fontSize: "22px",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: selected === "other" ? "var(--text-primary)" : "var(--text-secondary)",
              }}
            >
              Other location
            </span>
            <span
              className="font-mono text-right leading-snug shrink-0 ml-4"
              style={{ fontSize: "11px", color: "var(--text-tertiary)" }}
            >
              {CITY_CONFIDENCE["other"]?.boqs} BOQs · {CITY_CONFIDENCE["other"]?.variance} variance
            </span>
          </button>
        )}
      </div>

      {error && (
        <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--warning)" }}>
          {error}
        </p>
      )}

      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary">
        {PLAN.confidenceNote}
      </p>

      <NavigationButtons
        onBack={() => router.push("/plan")}
        onNext={handleNext}
        nextDisabled={!selected}
      />
    </motion.div>
  );
}
