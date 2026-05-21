"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { formatINRShort } from "@/lib/utils";
import { RESULTS } from "@/lib/copy";
import type { CalculationResult } from "@/types";

const LABELS: Record<string, string> = {
  civilStructure: "Civil structure",
  finishes: "Finishes",
  interiors: "Interiors",
  mep: "MEP — electrical & plumbing",
  elevation: "Elevation & facade",
  approvalsAndFees: "Approvals & statutory fees",
  contingency: "Contingency reserve",
};

const ease = [0.16, 1, 0.3, 1] as const;

interface CostBreakdownProps {
  breakdown: CalculationResult["breakdown"];
}

export function CostBreakdown({ breakdown }: CostBreakdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const data = Object.entries(breakdown).map(([key, value]) => ({
    key,
    name: LABELS[key] ?? key,
    value,
  }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <section
      ref={ref}
      aria-labelledby="breakdown-heading"
      className="px-6 md:px-12 py-[96px] md:py-[160px]"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-14 md:gap-24 items-start">

        {/* Left — editorial copy */}
        <div className="md:sticky md:top-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-6">
              Cost breakdown
            </p>
            <h2
              id="breakdown-heading"
              className="font-serif text-text-primary mb-6"
              style={{
                fontSize: "clamp(28px, 4vw, 36px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {RESULTS.breakdownHeadline}
            </h2>
            <p
              className="text-text-secondary leading-relaxed mb-8"
              style={{ fontSize: "16px", maxWidth: "38ch" }}
            >
              {RESULTS.breakdownBody}
            </p>
            <div className="border-t border-border pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-1">
                Total mid estimate
              </p>
              <p
                className="font-serif text-text-primary tabular-nums"
                style={{ fontSize: "28px", fontWeight: 400, letterSpacing: "-0.02em" }}
              >
                {formatINRShort(total)}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right — horizontal bar list */}
        <div className="flex flex-col" style={{ gap: "32px" }}>
          {data.map((item, i) => {
            const pct = (item.value / total) * 100;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span
                    className="text-text-primary"
                    style={{ fontSize: "14px", fontWeight: 500 }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="font-mono text-text-tertiary tabular-nums"
                    style={{ fontSize: "14px" }}
                  >
                    {formatINRShort(item.value)}
                  </span>
                </div>
                <div
                  className="relative overflow-hidden"
                  style={{ height: "2px", background: "#EEF2F7" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : { width: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ height: "100%", background: "#0D1F3C", position: "absolute", left: 0, top: 0 }}
                  />
                </div>
                <p
                  className="font-mono text-text-tertiary mt-1"
                  style={{ fontSize: "10px" }}
                >
                  {pct.toFixed(0)}% of total
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
