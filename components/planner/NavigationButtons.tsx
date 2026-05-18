"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

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
  nextLabel = "Continue",
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
          className="flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors duration-200 group"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden="true"
          >
            <path
              d="M9 11L5 7L9 3"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em]">Back</span>
        </button>
      ) : (
        <div />
      )}

      <Button
        variant="primary"
        onClick={onNext}
        disabled={nextDisabled}
        loading={loading}
        type={onNext ? "button" : "submit"}
        className="min-w-[140px]"
      >
        {nextLabel}
        {!loading && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M5 3L9 7L5 11"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Button>
    </motion.div>
  );
}
