"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatINRShort } from "@/lib/utils";
import type { CalculationResult } from "@/types";

const SEGMENT_COLORS = [
  "#C8633A",
  "#0E2146",
  "#4A5568",
  "#C5A059",
  "#2D7D5A",
  "#8492A6",
  "#D4D2CC",
];

const LABELS: Record<string, string> = {
  civilStructure: "Civil structure",
  finishes: "Finishes",
  interiors: "Interiors",
  mep: "MEP (electrical & plumbing)",
  elevation: "Elevation",
  approvalsAndFees: "Approvals & fees",
  contingency: "Contingency",
};

interface CostBreakdownProps {
  breakdown: CalculationResult["breakdown"];
}

export function CostBreakdown({ breakdown }: CostBreakdownProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const data = Object.entries(breakdown).map(([key, value], i) => ({
    key,
    name: LABELS[key] ?? key,
    value,
    color: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
  }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <section aria-labelledby="breakdown-heading" className="py-8">
      <p className="label-arch mb-2">Cost breakdown</p>
      <h2 id="breakdown-heading" className="font-serif text-headline-md text-text-primary mb-1">
        Where every rupee goes
      </h2>
      <p className="text-body-sm text-text-secondary mb-8">
        7-segment breakdown of your mid estimate.
      </p>

      {/* Stacked bar */}
      <div className="flex h-2 rounded-full overflow-hidden mb-8 gap-px">
        {data.map((item) => (
          <motion.div
            key={item.key}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: `${(item.value / total) * 100}%`,
              background: item.color,
              originX: 0,
              opacity: activeKey === null || activeKey === item.key ? 1 : 0.2,
            }}
            className="transition-opacity duration-200"
          />
        ))}
      </div>

      {/* Line items */}
      <div className="flex flex-col divide-y divide-border">
        {data.map((item) => {
          const pct = ((item.value / total) * 100).toFixed(0);
          const active = activeKey === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActiveKey(active ? null : item.key)}
              className={`
                w-full flex items-center gap-4 py-3.5 px-3 rounded-xl -mx-3 text-left
                transition-all duration-200
                ${active ? "bg-surface-low" : "hover:bg-surface-low/50"}
              `}
              aria-pressed={active}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: item.color }}
                aria-hidden="true"
              />
              <span className="flex-1 text-body-sm font-medium text-text-primary">
                {item.name}
              </span>
              <div className="hidden sm:flex items-center gap-2 w-28">
                <div className="flex-1 h-px bg-border overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full"
                    style={{ background: item.color }}
                  />
                </div>
                <span className="font-mono text-[10px] text-text-tertiary w-8 text-right tabular-nums">
                  {pct}%
                </span>
              </div>
              <span className="font-mono font-semibold text-body-sm text-text-primary tabular-nums w-20 text-right">
                {formatINRShort(item.value)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Total */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 pt-4 border-t border-border-strong flex justify-between items-center px-3"
      >
        <span className="text-body-sm font-medium text-text-secondary">Total (mid estimate)</span>
        <span className="font-mono font-bold text-headline-sm text-text-primary tabular-nums">
          {formatINRShort(total)}
        </span>
      </motion.div>
    </section>
  );
}
