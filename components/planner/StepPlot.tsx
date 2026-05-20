"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { usePlannerStore } from "@/lib/store/planner-store";
import { ProgressBar } from "./ProgressBar";
import { NavigationButtons } from "./NavigationButtons";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { track } from "@/lib/analytics/events";
import { PLAN } from "@/lib/copy";
import type { Facing, Slope } from "@/types";

const FACINGS: { value: Facing; label: string }[] = [
  { value: "north",      label: "N"  },
  { value: "north-east", label: "NE" },
  { value: "east",       label: "E"  },
  { value: "south-east", label: "SE" },
  { value: "south",      label: "S"  },
  { value: "south-west", label: "SW" },
  { value: "west",       label: "W"  },
  { value: "north-west", label: "NW" },
];

const SLOPES: { value: Slope; label: string; desc: string }[] = [
  { value: "flat",  label: "Flat",  desc: "No excavation" },
  { value: "mild",  label: "Mild",  desc: "+4% cost" },
  { value: "steep", label: "Steep", desc: "+10% cost" },
];

const schema = z.object({
  length: z.coerce.number().min(15).max(200),
  width: z.coerce.number().min(15).max(200),
  facing: z.enum(["north","south","east","west","north-east","north-west","south-east","south-west"]),
  cornerPlot: z.boolean(),
  roadWidth: z.coerce.number(),
  soilType: z.enum(["red","black-cotton","rocky","sandy","unknown"]),
  slope: z.enum(["flat","mild","steep"]),
});

type FormData = z.infer<typeof schema>;

export function StepPlot() {
  const router = useRouter();
  const { input, setInput } = usePlannerStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      length: input.plot?.length ?? 40,
      width: input.plot?.width ?? 30,
      facing: input.plot?.facing ?? "north",
      cornerPlot: input.plot?.cornerPlot ?? false,
      roadWidth: input.plot?.roadWidth ?? 30,
      soilType: input.plot?.soilType ?? "unknown",
      slope: input.plot?.slope ?? "flat",
    },
  });

  const length = watch("length");
  const width = watch("width");
  const facing = watch("facing");
  const cornerPlot = watch("cornerPlot");
  const slope = watch("slope");

  const plotArea = Math.round((length || 0) * (width || 0));
  const sliderValue = plotArea;

  function handleSlider(e: React.ChangeEvent<HTMLInputElement>) {
    const area = Number(e.target.value);
    const side = Math.round(Math.sqrt(area));
    setValue("length", side);
    setValue("width", side);
  }

  function onSubmit(data: FormData) {
    setInput({ plot: data });
    track("planner_step_completed", { step_number: 3, step_name: "plot" });
    router.push("/plan/configuration");
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
      noValidate
    >
      <ProgressBar currentStep={3} />

      <div>
        <h1 className="step-title mb-2">{PLAN.step3Question}</h1>
        <p className="text-text-secondary leading-relaxed" style={{ fontSize: "16px" }}>
          Plot dimensions affect foundation and structure costs.
        </p>
      </div>

      {/* Big plot area display */}
      <div className="text-center py-8">
        <p
          className="font-serif text-navy leading-none tabular-nums"
          style={{
            fontSize: "clamp(72px, 14vw, 120px)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
          }}
        >
          {plotArea > 0 ? plotArea.toLocaleString("en-IN") : "—"}
        </p>
        <p style={{ fontSize: "16px", color: "#6B635C", marginTop: "8px" }}>
          square feet
        </p>
      </div>

      {/* Slider */}
      <div style={{ maxWidth: "480px", margin: "0 auto", width: "100%" }}>
        <input
          type="range"
          min={900}
          max={40000}
          step={100}
          value={sliderValue || 1200}
          onChange={handleSlider}
          className="w-full"
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            height: "2px",
            background: `linear-gradient(to right, #1C1917 ${((sliderValue - 900) / (40000 - 900)) * 100}%, #D4CCBF ${((sliderValue - 900) / (40000 - 900)) * 100}%)`,
            borderRadius: "0",
            outline: "none",
            cursor: "pointer",
          }}
          aria-label="Plot area slider"
        />
        <div className="flex justify-between mt-2">
          <span className="font-mono text-[10px] text-text-tertiary tracking-[0.1em]">900</span>
          <span className="font-mono text-[10px] text-text-tertiary tracking-[0.1em]">20,000</span>
          <span className="font-mono text-[10px] text-text-tertiary tracking-[0.1em]">40,000</span>
        </div>
      </div>

      {/* Fine-tune inputs */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary mb-4">
          Or enter dimensions
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary mb-2 block">
              Length (ft)
            </label>
            <input
              type="number"
              min={15}
              max={200}
              className="w-full focus:outline-none"
              style={{
                borderBottom: "1px solid #D4CCBF",
                padding: "8px 0",
                fontSize: "18px",
                color: "var(--text-primary)",
                background: "transparent",
              }}
              {...register("length")}
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary mb-2 block">
              Width (ft)
            </label>
            <input
              type="number"
              min={15}
              max={200}
              className="w-full focus:outline-none"
              style={{
                borderBottom: "1px solid #D4CCBF",
                padding: "8px 0",
                fontSize: "18px",
                color: "var(--text-primary)",
                background: "transparent",
              }}
              {...register("width")}
            />
          </div>
        </div>
      </div>

      {/* Facing — horizontal text buttons */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary mb-4">
          Plot facing
        </p>
        <div className="flex flex-wrap gap-3" role="group" aria-label="Plot facing">
          {FACINGS.map((dir) => {
            const isActive = facing === dir.value;
            return (
              <button
                key={dir.value}
                type="button"
                onClick={() => setValue("facing", dir.value)}
                className="font-mono focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30 transition-colors duration-200"
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  padding: "6px 12px",
                  border: "1px solid",
                  borderColor: isActive ? "var(--accent)" : "var(--border)",
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  background: "transparent",
                }}
                aria-pressed={isActive}
              >
                {dir.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slope */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary mb-4">
          Plot slope
        </p>
        <div className="flex gap-6 border-b border-border pb-6" role="group" aria-label="Plot slope">
          {SLOPES.map((s) => {
            const isActive = slope === s.value;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => setValue("slope", s.value)}
                className="text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30 transition-colors duration-200 pb-1"
                style={{
                  fontSize: "18px",
                  color: isActive ? "var(--accent)" : "var(--text-primary)",
                  borderBottom: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                  fontFamily: "inherit",
                }}
                aria-pressed={isActive}
              >
                {s.label}
                <span
                  className="block font-mono"
                  style={{ fontSize: "11px", color: isActive ? "var(--accent)" : "var(--text-tertiary)", marginTop: "2px" }}
                >
                  {s.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Select
        label="Soil type"
        options={[
          { value: "unknown", label: "I don't know yet" },
          { value: "red", label: "Red soil" },
          { value: "black-cotton", label: "Black cotton soil" },
          { value: "rocky", label: "Rocky / hard rock" },
          { value: "sandy", label: "Sandy soil" },
        ]}
        hint="If unsure, say so — we'll flag it as a risk"
        {...register("soilType")}
      />

      <Select
        label="Road width in front"
        options={[
          { value: "20", label: "20 feet" },
          { value: "30", label: "30 feet" },
          { value: "40", label: "40 feet" },
          { value: "60", label: "60 feet" },
          { value: "80", label: "80 feet or more" },
        ]}
        {...register("roadWidth")}
      />

      <div className="border-t border-border">
        <Toggle
          label="Corner plot"
          hint="+6% structure cost for corner exposure"
          checked={cornerPlot}
          onChange={(v) => setValue("cornerPlot", v)}
        />
      </div>

      <NavigationButtons onBack={() => router.push("/plan/location")} />
    </motion.form>
  );
}
