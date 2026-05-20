"use client";

import { motion } from "framer-motion";
import { formatINRShort } from "@/lib/utils";
import type { CalculationResult, PlannerInput } from "@/types";

interface HeroProps {
  result: CalculationResult;
  input: Partial<PlannerInput>;
}

export function ResultHero({ result, input }: HeroProps) {
  const floors = input.configuration?.floors ?? 1;
  const area = input.configuration?.builtUpArea ?? 0;
  const city = (input.city ?? "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const homeType = (input.homeType ?? "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const quality = (input.qualityTier ?? "").replace(/\b\w/g, (c) =>
    c.toUpperCase()
  );

  const specLine = [
    `${area.toLocaleString("en-IN")} sqft`,
    floors === 1 ? "Ground floor" : `G+${floors - 1}`,
    homeType,
    city,
    `${quality} finish`,
  ]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <section
      className="relative bg-navy overflow-hidden px-8 pt-20 pb-16 mb-0"
      aria-labelledby="result-hero-heading"
    >
      {/* Ambient warmth — no grid, no tech */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 0%, rgba(184,149,78,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="h-px w-6 bg-gold/50" />
          <p className="font-mono text-[9px] text-white/35 uppercase tracking-[0.26em]">
            Your construction estimate · 2026 verified rates
          </p>
        </motion.div>

        {/* Primary estimate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <h1
            id="result-hero-heading"
            className="font-serif tabular-nums leading-none"
            style={{
              fontSize: "clamp(48px, 10vw, 84px)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              background:
                "linear-gradient(135deg, #B8954E 0%, #CCB07A 50%, #B8954E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {formatINRShort(result.totalRange.min)} –{" "}
            {formatINRShort(result.totalRange.max)}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
        >
          {/* Secondary data row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10">
            <span className="font-mono text-white/40 text-[11px] tabular-nums">
              Mid&nbsp;{formatINRShort(result.totalRange.mid)}
            </span>
            <span className="text-white/20 font-mono">·</span>
            <span className="font-mono text-white/40 text-[11px] tabular-nums">
              ₹{result.costPerSqft.toLocaleString("en-IN")}/sqft
            </span>
            <span className="text-white/20 font-mono">·</span>
            <span className="font-mono text-white/40 text-[11px]">
              ~{Math.ceil(result.timeline.totalDays / 30)} months
            </span>
          </div>

          {/* Thin gold separator */}
          <div className="w-8 h-px bg-gold/35 mb-7" />

          {/* Spec line — inline, not tag pills */}
          <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.16em] leading-relaxed">
            {specLine}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
