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
  const city = (input.city ?? "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const homeType = (input.homeType ?? "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const quality = (input.qualityTier ?? "").replace(/\b\w/g, (c) => c.toUpperCase());

  const tags = [
    `${area.toLocaleString("en-IN")} sqft`,
    floors === 1 ? "Ground floor" : `G+${floors - 1}`,
    homeType,
    city,
    `${quality} finish`,
  ].filter(Boolean);

  return (
    <section
      className="relative bg-navy overflow-hidden px-8 pt-16 pb-12 mb-0 rounded-3xl"
      aria-labelledby="result-hero-heading"
    >
      {/* Subtle warm glow — no grid, no tech pattern */}
      <div className="absolute top-0 left-1/4 w-96 h-48 bg-gold/8 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-gold/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="font-mono text-[10px] text-white/35 uppercase tracking-[0.25em] mb-8"
        >
          Your construction estimate · 2026 verified rates
        </motion.p>

        {/* Primary estimate display */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3"
        >
          <h1
            id="result-hero-heading"
            className="font-serif tabular-nums leading-none"
            style={{
              fontSize: "clamp(44px, 8vw, 72px)",
              background: "linear-gradient(135deg, #C5A059 0%, #E9C176 55%, #C5A059 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {formatINRShort(result.totalRange.min)} – {formatINRShort(result.totalRange.max)}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Secondary stats */}
          <p className="text-white/40 text-sm tabular-nums font-mono mb-10">
            Mid estimate {formatINRShort(result.totalRange.mid)}
            <span className="mx-3 opacity-40">·</span>
            ₹{result.costPerSqft.toLocaleString("en-IN")}/sqft
            <span className="mx-3 opacity-40">·</span>
            ~{Math.ceil(result.timeline.totalDays / 30)} months
          </p>

          {/* Thin gold rule */}
          <div className="flex justify-center mb-7">
            <div className="w-8 h-px bg-gold/40" />
          </div>

          {/* Config tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/6 border border-white/10 text-white/50 text-xs font-mono uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
