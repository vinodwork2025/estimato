"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/lib/copy";

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  loading?: boolean;
  showBack?: boolean;
}

export function NavigationButtons({
  onBack,
  onNext,
  nextLabel = CTA.planNext,
  nextDisabled = false,
  loading = false,
  showBack = true,
}: NavigationButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex items-center justify-between gap-4 pt-8 mt-6 border-t border-border"
    >
      {showBack && onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary hover:text-text-secondary transition-colors duration-200"
        >
          Back
        </button>
      ) : (
        <div />
      )}

      <Button
        variant="gold"
        onClick={onNext}
        disabled={nextDisabled}
        loading={loading}
        type={onNext ? "button" : "submit"}
        className="min-w-[140px]"
      >
        {nextLabel}
      </Button>
    </motion.div>
  );
}
