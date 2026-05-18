"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatINRShort } from "@/lib/utils";
import { OPTIONAL_ADDITIONS } from "@/data/optional-additions";
import { track } from "@/lib/analytics/events";

interface OptionalAdditionsProps {
  baseTotalMid: number;
}

export function OptionalAdditions({ baseTotalMid }: OptionalAdditionsProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelected(next);
    const addition = OPTIONAL_ADDITIONS.find((a) => a.id === id);
    track("optional_addition_toggled", {
      addition_name: id,
      enabled: !selected.has(id),
    });
    void addition;
  }

  const addedCost = OPTIONAL_ADDITIONS.filter((a) => selected.has(a.id)).reduce(
    (sum, a) => sum + Math.round((a.costMin + a.costMax) / 2),
    0
  );

  const newTotal = baseTotalMid + addedCost;

  return (
    <section aria-labelledby="additions-heading" className="py-8">
      <p className="label-arch mb-2">Extras</p>
      <h2 id="additions-heading" className="font-serif text-headline-md text-text-primary mb-1">
        Optional additions
      </h2>
      <p className="text-body-sm text-text-secondary mb-6">
        Toggle to see how each addition affects your total.
      </p>

      <div className="flex flex-col gap-2 mb-6">
        {OPTIONAL_ADDITIONS.map((addition) => {
          const isSelected = selected.has(addition.id);
          return (
            <button
              key={addition.id}
              onClick={() => toggle(addition.id)}
              className={`flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy ${
                isSelected
                  ? "border-navy/20 bg-navy/4"
                  : "border-border bg-white hover:border-border-strong"
              }`}
              style={isSelected ? { backgroundColor: "rgba(14,33,70,0.025)" } : {}}
              aria-pressed={isSelected}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{addition.label}</p>
                {addition.savingsNote && (
                  <p className="text-xs text-success mt-0.5 font-mono">{addition.savingsNote}</p>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-xs text-text-secondary tabular-nums">
                  {addition.costDisplay}
                </span>
                {/* Check square */}
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${
                    isSelected ? "bg-navy border-navy" : "border-border"
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path
                        d="M1 3.5L3.5 6L8 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {addedCost > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="pt-5 border-t border-border flex items-end justify-between"
          >
            <div>
              <p className="label-arch mb-1.5">Updated total</p>
              <p className="font-serif text-[32px] text-navy tabular-nums leading-none">
                {formatINRShort(newTotal)}
              </p>
            </div>
            <div className="text-right">
              <p className="label-arch mb-1.5">Additions</p>
              <p className="font-mono font-semibold text-warning tabular-nums text-body-sm">
                +{formatINRShort(addedCost)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
