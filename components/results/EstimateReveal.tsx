"use client";

import { useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { formatINRShort } from "@/lib/utils";
import { TIER_NAMES } from "@/lib/copy";
import type { CalculationResult, PlannerInput } from "@/types";

interface EstimateRevealProps {
  result: CalculationResult;
  input: Partial<PlannerInput>;
}

const ease = [0.16, 1, 0.3, 1] as const;

function AnimatedCurrencyNumber({ value }: { value: number }) {
  const symbolRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const from = Math.round(value * 0.55);
    const controls = animate(from, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const formatted = formatINRShort(Math.round(v));
        if (symbolRef.current) symbolRef.current.textContent = formatted.charAt(0);
        if (numRef.current) numRef.current.textContent = formatted.slice(1);
      },
    });
    return () => controls.stop();
  }, [value]);

  const initial = formatINRShort(Math.round(value * 0.55));
  return (
    <>
      <span
        ref={symbolRef}
        style={{ fontSize: "60%", verticalAlign: "super", lineHeight: 0 }}
      >
        {initial.charAt(0)}
      </span>
      <span ref={numRef}>{initial.slice(1)}</span>
    </>
  );
}

export function EstimateReveal({ result, input }: EstimateRevealProps) {
  const city = (input.city ?? "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const tierKey = input.qualityTier ?? "economy";
  const tierName = TIER_NAMES[tierKey] ?? tierKey;
  const area = input.configuration?.builtUpArea ?? 0;

  const totalMonths = Math.ceil(result.timeline.totalDays / 30);

  return (
    <section
      className="relative px-6 md:px-12 py-[120px] md:py-[200px]"
      aria-labelledby="estimate-heading"
    >
      {/* Radial gold halo behind the number — subtle depth */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          style={{
            width: "800px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(168,130,59,0.055) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary mb-10 md:mb-14"
        >
          Estimated construction cost
        </motion.p>

        {/* The number */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="mb-10 md:mb-14"
          id="estimate-heading"
        >
          <p
            className="font-serif text-text-primary tabular-nums leading-none"
            style={{
              fontSize: "clamp(64px, 14vw, 144px)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
            aria-label={`${formatINRShort(result.totalRange.min)} to ${formatINRShort(result.totalRange.max)}`}
          >
            <AnimatedCurrencyNumber value={result.totalRange.min} />
            <span
              style={{
                margin: "0 0.3em",
                color: "var(--border-strong)",
                fontWeight: 300,
              }}
            >
              &ndash;
            </span>
            <AnimatedCurrencyNumber value={result.totalRange.max} />
          </p>
        </motion.div>

        {/* Calibration line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="text-text-secondary mb-12 md:mb-16"
          style={{ fontSize: "18px", maxWidth: "56ch", lineHeight: 1.65 }}
        >
          Thoughtfully calibrated for {city}{" "}
          {tierName.toLowerCase()} construction standards, based on verified
          2026 rates{area > 0 ? ` for ${area.toLocaleString("en-IN")} sqft` : ""}.
        </motion.p>

        {/* Metadata row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="flex items-center gap-0"
        >
          <div className="pr-6 md:pr-10">
            <p
              className="font-mono text-text-primary tabular-nums"
              style={{ fontSize: "15px", fontWeight: 500 }}
            >
              ₹{result.costPerSqft.toLocaleString("en-IN")}/sqft
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mt-1">
              Cost per sqft
            </p>
          </div>

          <div
            className="shrink-0"
            style={{
              width: "1px",
              height: "24px",
              background: "var(--accent)",
              opacity: 0.5,
            }}
            aria-hidden="true"
          />

          <div className="px-6 md:px-10">
            <p
              className="font-mono text-text-primary tabular-nums"
              style={{ fontSize: "15px", fontWeight: 500 }}
            >
              {totalMonths}–{totalMonths + 2} months
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mt-1">
              Build duration
            </p>
          </div>

          <div
            className="shrink-0"
            style={{
              width: "1px",
              height: "24px",
              background: "var(--accent)",
              opacity: 0.5,
            }}
            aria-hidden="true"
          />

          <div className="pl-6 md:pl-10">
            <p
              className="font-mono text-text-primary tabular-nums"
              style={{ fontSize: "15px", fontWeight: 500 }}
            >
              8% reserve
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mt-1">
              Contingency recommended
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
