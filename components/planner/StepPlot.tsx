"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { usePlannerStore } from "@/lib/store/planner-store";
import { ProgressBar } from "./ProgressBar";
import { NavigationButtons } from "./NavigationButtons";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { track } from "@/lib/analytics/events";
import type { Facing, Slope } from "@/types";

const COMPASS: { value: Facing; label: string; pos: string }[] = [
  { value: "north-west", label: "NW", pos: "col-start-1 row-start-1" },
  { value: "north",      label: "N",  pos: "col-start-2 row-start-1" },
  { value: "north-east", label: "NE", pos: "col-start-3 row-start-1" },
  { value: "west",       label: "W",  pos: "col-start-1 row-start-2" },
  { value: "east",       label: "E",  pos: "col-start-3 row-start-2" },
  { value: "south-west", label: "SW", pos: "col-start-1 row-start-3" },
  { value: "south",      label: "S",  pos: "col-start-2 row-start-3" },
  { value: "south-east", label: "SE", pos: "col-start-3 row-start-3" },
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
    formState: { errors },
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

  const plotArea = (length || 0) * (width || 0);

  function onSubmit(data: FormData) {
    setInput({ plot: data });
    track("planner_step_completed", { step_number: 3, step_name: "plot" });
    router.push("/plan/configuration");
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      noValidate
    >
      <ProgressBar currentStep={3} />

      <div>
        <h1 className="step-title mb-2">Tell us about your plot.</h1>
        <p className="text-body-sm text-text-secondary">
          Plot size and conditions affect foundation and structure costs.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Dimensions */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Length (feet)"
            type="number"
            inputMode="numeric"
            min={15}
            max={200}
            required
            error={errors.length?.message}
            {...register("length")}
          />
          <Input
            label="Width (feet)"
            type="number"
            inputMode="numeric"
            min={15}
            max={200}
            required
            error={errors.width?.message}
            {...register("width")}
          />
        </div>

        {/* Plot area live display */}
        {plotArea > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-border"
          >
            <span className="label-arch">Plot area</span>
            <span className="font-mono font-bold text-navy text-body-sm tabular-nums">
              {plotArea.toLocaleString("en-IN")} sqft
            </span>
            <div className="ml-auto flex items-center gap-2.5">
              <div className="w-px h-3 bg-border" />
              <span className="font-mono text-[11px] text-text-tertiary tabular-nums">
                ≈{(plotArea / 9).toFixed(0)} sq.yd
              </span>
            </div>
          </motion.div>
        )}

        {/* Compass */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary mb-3">
            Plot facing
          </p>
          <div className="grid grid-cols-3 grid-rows-3 gap-2 w-44">
            {COMPASS.map((dir) => (
              <button
                key={dir.value}
                type="button"
                onClick={() => setValue("facing", dir.value)}
                className={`
                  ${dir.pos} h-11 rounded-xl text-xs font-semibold transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-navy
                  ${facing === dir.value
                    ? "border border-navy bg-navy/6 text-navy"
                    : "border border-border bg-white text-text-secondary hover:border-border-strong hover:bg-surface-low"
                  }
                `}
                aria-pressed={facing === dir.value}
              >
                {dir.label}
              </button>
            ))}
            {/* Center — plot marker */}
            <div className="col-start-2 row-start-2 h-11 rounded-xl bg-navy/5 border border-navy/10 flex items-center justify-center">
              <span className="label-arch" style={{ color: "var(--navy)", opacity: 0.4 }}>Plot</span>
            </div>
          </div>
        </div>

        <Toggle
          label="Corner plot"
          hint="+6% structure cost for corner exposure"
          checked={cornerPlot}
          onChange={(v) => setValue("cornerPlot", v)}
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

        {/* Slope */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary mb-3">
            Plot slope
          </p>
          <div className="grid grid-cols-3 gap-2">
            {SLOPES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setValue("slope", s.value)}
                className={`
                  flex flex-col items-center justify-center gap-0.5 h-16 rounded-xl border text-sm font-semibold transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-navy
                  ${slope === s.value
                    ? "border-navy bg-navy/6 text-navy"
                    : "border-border bg-white text-text-primary hover:border-border-strong hover:bg-surface-low"
                  }
                `}
                aria-pressed={slope === s.value}
              >
                <span>{s.label}</span>
                <span className={`text-[11px] font-normal font-mono ${slope === s.value ? "text-navy/55" : "text-text-tertiary"}`}>
                  {s.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <NavigationButtons onBack={() => router.push("/plan/location")} />
    </motion.form>
  );
}
