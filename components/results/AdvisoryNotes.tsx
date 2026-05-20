"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RESULTS } from "@/lib/copy";
import type { Insight, CalculationResult } from "@/types";

interface AdvisoryNotesProps {
  insights: Insight[];
  contingency: number;
  input?: {
    city?: string;
    qualityTier?: string;
    configuration?: { builtUpArea?: number };
  };
}

const ease = [0.16, 1, 0.3, 1] as const;

// Rewrite each insight into advisory voice at write-time
function toAdvisoryVoice(insight: Insight, index: number): string {
  // If the message is already well-written, use it.
  // Otherwise, apply editorial framing.
  const msg = insight.message;
  // Strip generic AI framing patterns
  return msg
    .replace(/^Note that /i, "")
    .replace(/^Please note /i, "")
    .replace(/^It is worth noting that /i, "")
    .replace(/^It's important to /i, "")
    .replace(/^You should /i, "")
    .replace(/^Consider /i, "");
}

export function AdvisoryNotes({ insights, contingency, input }: AdvisoryNotesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const city = (input?.city ?? "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Always show contingency as a note
  const contingencyNote = {
    title: "Contingency reserve",
    message: `Set aside ₹${Math.round(contingency / 100000)}L as a buffer before you begin. Construction budgets shift—material prices, monsoon delays, and specification changes are the three most common causes. Eight percent covers most projects without padding.`,
  };

  // Merge AI insights with the contingency note
  const notes = [
    ...insights.slice(0, 4),
    ...(insights.length < 4 ? [{ type: "note" as const, title: contingencyNote.title, message: contingencyNote.message }] : []),
  ];

  return (
    <section
      ref={ref}
      aria-labelledby="advisory-heading"
      className="px-6 md:px-12 py-[96px] md:py-[160px] border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="mb-14 md:mb-20"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-4">
            Advisory notes
          </p>
          <h2
            id="advisory-heading"
            className="font-serif text-text-primary mb-6"
            style={{
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {RESULTS.advisoryHeadline}
          </h2>
          <p
            className="text-text-secondary leading-relaxed"
            style={{ fontSize: "16px", maxWidth: "56ch" }}
          >
            {RESULTS.advisoryBody}
          </p>
        </motion.div>

        {/* Notes */}
        <div className="flex flex-col" style={{ gap: "0" }}>
          {notes.map((note, i) => {
            const noteNum = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                className="flex gap-5 py-8 border-b border-border first:border-t first:border-border"
              >
                {/* Bronze vertical rule */}
                <div
                  style={{
                    width: "1px",
                    height: "24px",
                    background: "var(--accent)",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p
                    className="font-mono uppercase mb-3"
                    style={{ fontSize: "9px", letterSpacing: "0.18em", color: "var(--text-tertiary)" }}
                  >
                    Observation {noteNum}
                  </p>
                  <p
                    className="text-text-primary leading-relaxed"
                    style={{ fontSize: "17px", lineHeight: 1.65, maxWidth: "60ch" }}
                  >
                    {toAdvisoryVoice(note, i)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
