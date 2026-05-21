"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { formatINRShort } from "@/lib/utils";
import { PHASE_LABELS } from "@/lib/copy";
import type { Phase } from "@/types";

interface TimelineProps {
  phases: Phase[];
  totalDays: number;
}

const ease = [0.16, 1, 0.3, 1] as const;

const PHASE_NAMES = PHASE_LABELS as readonly string[];

export function Timeline({ phases, totalDays }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const totalMonths = Math.ceil(totalDays / 30);

  return (
    <section
      ref={ref}
      aria-labelledby="timeline-heading"
      className="px-6 md:px-12 py-[96px] md:py-[160px] border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="mb-16 md:mb-24"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-4">
            Build timeline
          </p>
          <h2
            id="timeline-heading"
            className="font-serif text-text-primary"
            style={{
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Phase-wise schedule.
          </h2>
          <p className="text-text-tertiary mt-3 font-mono text-[11px] uppercase tracking-[0.14em]">
            ~{totalMonths} months total
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block" aria-hidden="false">
          <div className="relative">
            {/* Animated horizontal line */}
            <div
              className="absolute"
              style={{ top: "5px", left: 0, right: 0, height: "2px", background: "#DDE4ED" }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: "100%",
                  background: "#DDE4ED",
                  transformOrigin: "left center",
                  position: "absolute",
                  inset: 0,
                }}
              />
            </div>

            {/* Phase markers */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${phases.length}, 1fr)` }}>
              {phases.map((phase, i) => {
                const phaseName = PHASE_NAMES[i] ?? phase.name;
                const phaseNum = String(i + 1).padStart(2, "0");

                return (
                  <motion.div
                    key={phase.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.6 + i * 0.2, ease }}
                    className="relative"
                  >
                    {/* Dot */}
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        background: "#0D1F3C",
                        borderRadius: "50%",
                        position: "relative",
                        zIndex: 10,
                        marginBottom: "20px",
                      }}
                    />

                    {/* Phase label above */}
                    <p
                      className="font-mono uppercase mb-2"
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.18em",
                        color: "var(--text-tertiary)",
                        position: "absolute",
                        top: "-22px",
                        left: 0,
                      }}
                    >
                      PHASE {phaseNum}
                    </p>

                    {/* Content below marker */}
                    <div>
                      <p
                        className="font-serif text-text-primary mb-2"
                        style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em" }}
                      >
                        {phaseName}
                      </p>
                      <p
                        className="text-text-secondary mb-0.5"
                        style={{ fontSize: "13px" }}
                      >
                        {Math.ceil(phase.durationDays / 30)} months
                      </p>
                      <p
                        className="font-mono text-text-tertiary tabular-nums"
                        style={{ fontSize: "11px" }}
                      >
                        {phase.paymentPercent}% of total cost
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="flex flex-col md:hidden" style={{ gap: "0" }}>
          <div className="relative">
            {/* Vertical animated line */}
            <div
              className="absolute"
              style={{ left: "2px", top: 0, bottom: 0, width: "2px", background: "#DDE4ED" }}
            >
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#DDE4ED",
                  transformOrigin: "top center",
                  position: "absolute",
                  inset: 0,
                }}
              />
            </div>

            {phases.map((phase, i) => {
              const phaseName = PHASE_NAMES[i] ?? phase.name;
              const phaseNum = String(i + 1).padStart(2, "0");

              return (
                <motion.div
                  key={phase.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.15, ease }}
                  className="flex gap-6 pb-12 last:pb-0"
                >
                  {/* Dot */}
                  <div style={{ flexShrink: 0, paddingTop: "4px" }}>
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        background: "#0D1F3C",
                        borderRadius: "50%",
                        position: "relative",
                        zIndex: 10,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <p
                      className="font-mono uppercase mb-2"
                      style={{ fontSize: "9px", letterSpacing: "0.18em", color: "var(--text-tertiary)" }}
                    >
                      PHASE {phaseNum}
                    </p>
                    <p
                      className="font-serif text-text-primary mb-1"
                      style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em" }}
                    >
                      {phaseName}
                    </p>
                    <p className="text-text-secondary mb-0.5" style={{ fontSize: "13px" }}>
                      {Math.ceil(phase.durationDays / 30)} months &nbsp;Â·&nbsp; {phase.paymentPercent}% of total
                    </p>
                    <p className="text-text-tertiary" style={{ fontSize: "13px", lineHeight: 1.5 }}>
                      {phase.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
