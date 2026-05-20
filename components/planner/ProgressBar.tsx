"use client";

import { motion } from "framer-motion";

const STEPS = [
  { number: 1, label: "Home type" },
  { number: 2, label: "Location" },
  { number: 3, label: "Plot details" },
  { number: 4, label: "Configuration" },
  { number: 5, label: "Quality" },
  { number: 6, label: "Interiors" },
  { number: 7, label: "Review" },
];

interface ProgressBarProps {
  currentStep: number;
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const pct = ((currentStep - 1) / (STEPS.length - 1)) * 100;
  const stepLabel = STEPS[currentStep - 1]?.label ?? "";
  const stepNum = String(currentStep).padStart(2, "0");
  const totalNum = String(STEPS.length).padStart(2, "0");

  return (
    <div
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={STEPS.length}
      aria-label={`Step ${currentStep} of ${STEPS.length}: ${stepLabel}`}
      className="mb-2"
    >
      {/* Track */}
      <div className="relative h-px w-full" style={{ background: "#E8E3DA" }}>
        <motion.div
          className="absolute left-0 top-0 h-full"
          style={{ background: "#1C1917" }}
          initial={{ width: "0%" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Label below */}
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-tertiary mt-2">
        Step {stepNum} of {totalNum} · {stepLabel}
      </p>
    </div>
  );
}
