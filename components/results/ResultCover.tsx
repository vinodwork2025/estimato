"use client";

import { motion } from "framer-motion";
import type { PlannerInput } from "@/types";
import { TIER_NAMES, RESULTS } from "@/lib/copy";

interface ResultCoverProps {
  input: Partial<PlannerInput>;
  userName?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function ResultCover({ input, userName }: ResultCoverProps) {
  const city = (input.city ?? "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const homeType = (input.homeType ?? "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const monthYear = today.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const tierKey = input.qualityTier ?? "economy";
  const tierName = TIER_NAMES[tierKey] ?? tierKey;

  return (
    <section
      className="relative min-h-screen flex flex-col bg-bg-primary"
      aria-label="Projection cover"
    >
      {/* Top label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="pt-4 px-6 md:px-12"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary">
          {RESULTS.coverLabel}
        </p>
      </motion.div>

      {/* Center composition */}
      <div className="flex-1 flex flex-col items-start justify-center px-6 md:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <h1
            className="font-serif text-text-primary mb-8"
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              maxWidth: "16ch",
            }}
          >
            A projection for your{" "}
            <span className="text-text-tertiary">{homeType}</span>
            {city ? (
              <>
                {" "}in{" "}
                <span className="text-text-tertiary">{city}</span>.
              </>
            ) : (
              "."
            )}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="text-text-secondary leading-relaxed mb-2"
          style={{ fontSize: "16px", maxWidth: "52ch" }}
        >
          Built from verified construction BOQs and live market rate inputs
          across {city || "your city"}. Calibrated for {tierName} standards.
          Updated {monthYear}.
        </motion.p>
      </div>

      {/* Bottom label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease }}
        className="pb-6 px-6 md:px-12"
      >
        <div className="w-full h-px bg-border mb-6" />
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
          Prepared on {dateStr}
          {userName ? ` · Confidential to ${userName}` : ""}
        </p>
      </motion.div>
    </section>
  );
}
