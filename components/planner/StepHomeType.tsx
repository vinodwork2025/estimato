"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { usePlannerStore } from "@/lib/store/planner-store";
import { ProgressBar } from "./ProgressBar";
import { track } from "@/lib/analytics/events";
import { PLAN } from "@/lib/copy";
import { HOME_TYPES } from "@/data/home-types";
import type { HomeType } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

export function StepHomeType() {
  const router = useRouter();
  const { input, setInput } = usePlannerStore();
  const selected = input.homeType;

  function handleSelect(type: HomeType) {
    setInput({ homeType: type });
    track("planner_step_completed", { step_number: 1, step_name: "home_type" });
    setTimeout(() => router.push("/plan/location"), 400);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      className="flex flex-col gap-6"
    >
      <ProgressBar currentStep={1} />

      <div>
        <h1 className="step-title mb-2">{PLAN.step1Question}</h1>
        <p className="text-text-secondary leading-relaxed" style={{ fontSize: "16px" }}>
          {PLAN.step1Subhead}
        </p>
      </div>

      <div className="flex flex-col border-t border-border" role="radiogroup" aria-label="Select home type">
        {HOME_TYPES.map((type, i) => {
          const isSelected = selected === type.value;
          const num = String(i + 1).padStart(2, "0");

          return (
            <button
              key={type.value}
              type="button"
              onClick={() => handleSelect(type.value as HomeType)}
              role="radio"
              aria-checked={isSelected}
              className="text-left border-b border-border focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30 transition-colors duration-200 relative"
              style={{
                padding: "24px 24px 24px 20px",
                borderLeftWidth: "2px",
                borderLeftColor: isSelected ? "var(--accent)" : "transparent",
                backgroundColor: isSelected ? "var(--bg-primary)" : undefined,
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F0EBE3";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "";
                }
              }}
            >
              <p
                className="font-mono uppercase mb-2 transition-colors duration-200"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  color: isSelected ? "var(--accent)" : "var(--text-tertiary)",
                }}
              >
                TYPE {num}
              </p>
              <p
                className="font-serif mb-1.5 transition-colors duration-200"
                style={{
                  fontSize: "28px",
                  fontWeight: 400,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.05,
                  color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                }}
              >
                {type.label}
              </p>
              <p style={{ fontSize: "16px", color: "#6B635C", lineHeight: 1.45 }}>
                {type.description}
              </p>
              {isSelected && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono uppercase mt-3"
                  style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--text-tertiary)" }}
                >
                  Taking you to the next step…
                </motion.p>
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
