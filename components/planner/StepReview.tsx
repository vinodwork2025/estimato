"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePlannerStore } from "@/lib/store/planner-store";
import { ProgressBar } from "./ProgressBar";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics/events";
import { CTA } from "@/lib/copy";
import { HOME_TYPES } from "@/data/home-types";
import { QUALITY_TIERS } from "@/data/quality-tiers";
import { CITIES } from "@/data/cities";
import type { PlannerInput } from "@/types";

function ReviewRow({
  label,
  value,
  editHref,
}: {
  label: string;
  value: string;
  editHref: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-4 border-b border-white/8 last:border-0">
      <div className="min-w-0">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 mb-1">
          {label}
        </p>
        <p className="text-sm font-medium text-white/85 leading-snug">{value}</p>
      </div>
      <a
        href={editHref}
        className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-gold/55 hover:text-gold transition-colors mt-0.5"
      >
        Edit
      </a>
    </div>
  );
}

export function StepReview() {
  const router = useRouter();
  const { input, setResult, setCalculating } = usePlannerStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const homeType = HOME_TYPES.find((h) => h.value === input.homeType);
  const qualityTier = QUALITY_TIERS.find((q) => q.value === input.qualityTier);
  const city = CITIES.find((c) => c.value === input.city);

  const isComplete =
    input.homeType &&
    input.city &&
    input.plot &&
    input.configuration &&
    input.qualityTier &&
    input.interiorLevel;

  async function handleCalculate() {
    if (!isComplete) return;
    setLoading(true);
    setCalculating(true);
    setError(null);

    try {
      const result = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input as PlannerInput),
      });

      if (!result.ok) throw new Error("Calculation failed");
      const data = await result.json();
      setResult(data);
      track("planner_completed", {
        home_type: input.homeType ?? "",
        city: input.city ?? "",
        quality_tier: input.qualityTier ?? "",
        total_mid: data.totalRange.mid,
      });
      router.push("/plan/result");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      setCalculating(false);
    }
  }

  const config = input.configuration;
  const plot = input.plot;

  const interiorLabel =
    input.interiorLevel === "luxury-furnished"
      ? "Luxury furnished"
      : input.interiorLevel
      ? input.interiorLevel.charAt(0).toUpperCase() + input.interiorLevel.slice(1)
      : "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
    >
      <ProgressBar currentStep={7} />

      <div>
        <h1 className="step-title mb-2">Review your selections.</h1>
        <p className="text-body-sm text-text-secondary">
          Everything look right? We&apos;ll calculate your estimate in seconds.
        </p>
      </div>

      {/* Dark summary */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-navy px-6 py-2 overflow-hidden relative"
      >

        <ReviewRow
          label="Home type"
          value={homeType?.label ?? "—"}
          editHref="/plan"
        />
        <ReviewRow
          label="Location"
          value={[city?.label, input.area].filter(Boolean).join(", ") || "—"}
          editHref="/plan/location"
        />
        {plot && (
          <ReviewRow
            label="Plot"
            value={`${plot.length}×${plot.width} ft · ${plot.facing} facing · ${plot.soilType} soil · ${plot.slope} slope`}
            editHref="/plan/plot"
          />
        )}
        {config && (
          <ReviewRow
            label="Configuration"
            value={[
              config.floors === 1 ? "Ground floor" : `G+${config.floors - 1}`,
              `${config.builtUpArea.toLocaleString("en-IN")} sqft`,
              config.parking !== "none" ? `${config.parking} parking` : null,
              config.basement ? "basement" : null,
              config.lift ? "lift" : null,
            ].filter(Boolean).join(" · ")}
            editHref="/plan/configuration"
          />
        )}
        <ReviewRow
          label="Quality tier"
          value={qualityTier?.label ?? "—"}
          editHref="/plan/quality"
        />
        <ReviewRow
          label="Interior level"
          value={interiorLabel}
          editHref="/plan/interiors"
        />
      </motion.div>

      {!isComplete && (
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-warning border border-warning/30 px-4 py-3">
          Some steps are incomplete. Go back and fill in the missing details.
        </p>
      )}

      {error && (
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-error border border-error/30 px-4 py-3" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 pt-2">
        <Button
          variant="gold"
          onClick={handleCalculate}
          disabled={!isComplete}
          loading={loading}
          className="w-full h-14 text-base"
        >
          {loading ? "Calculating your estimate…" : CTA.planFinal}
        </Button>
        <p className="text-[10px] text-center text-text-tertiary font-mono uppercase tracking-[0.14em]">
          Free · 2 seconds · No sign-up needed
        </p>
      </div>
    </motion.div>
  );
}
