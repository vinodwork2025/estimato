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
      className="sticky bottom-0 z-10 md:static flex items-center justify-between gap-4 border-t border-border bg-bg-primary -mx-5 px-5 md:mx-0 md:px-0 pt-4 pb-4 md:pb-0 md:pt-8 mt-6"
    >
      {showBack && onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary hover:text-text-secondary transition-colors duration-200 min-h-[48px] flex items-center"
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
        className="min-w-[140px] min-h-[48px]"
      >
        {nextLabel}
      </Button>
    </motion.div>
  );
}
