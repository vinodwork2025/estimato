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
  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;
  const stepLabel = STEPS[currentStep - 1]?.label ?? "";

  return (
    <div
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={STEPS.length}
      aria-label={`Step ${currentStep} of ${STEPS.length}: ${stepLabel}`}
    >
      {/* Step counter + name */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary">
          {String(currentStep).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-secondary">
          {stepLabel}
        </span>
      </div>

      {/* Thin progress track — architectural line, no rounded dot */}
      <div className="relative h-px w-full bg-border">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gold"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
