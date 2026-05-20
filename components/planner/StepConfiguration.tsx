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
import { Toggle } from "@/components/ui/Toggle";
import { track } from "@/lib/analytics/events";
import type { ParkingType } from "@/types";

const schema = z.object({
  floors: z.coerce.number().min(1).max(4),
  builtUpArea: z.coerce.number().min(400).max(15000),
  parking: z.enum(["none", "covered", "stilt"]),
  terrace: z.boolean(),
  balconies: z.coerce.number().min(0).max(6),
  lift: z.boolean(),
  basement: z.boolean(),
  homeOffice: z.boolean(),
  rentalFloor: z.boolean(),
});

type FormData = z.infer<typeof schema>;

const FLOOR_OPTIONS = [
  { value: 1, label: "G",   desc: "Ground only" },
  { value: 2, label: "G+1", desc: "2 floors" },
  { value: 3, label: "G+2", desc: "3 floors" },
  { value: 4, label: "G+3", desc: "4 floors" },
];

const PARKING_OPTIONS: { value: ParkingType; label: string; hint: string }[] = [
  { value: "none",    label: "None",    hint: "No parking" },
  { value: "covered", label: "Covered", hint: "+3%" },
  { value: "stilt",   label: "Stilt",   hint: "+6%" },
];

export function StepConfiguration() {
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
      floors: input.configuration?.floors ?? 1,
      builtUpArea: input.configuration?.builtUpArea ?? 1500,
      parking: input.configuration?.parking ?? "none",
      terrace: input.configuration?.terrace ?? false,
      balconies: input.configuration?.balconies ?? 0,
      lift: input.configuration?.lift ?? false,
      basement: input.configuration?.basement ?? false,
      homeOffice: input.configuration?.homeOffice ?? false,
      rentalFloor: input.configuration?.rentalFloor ?? false,
    },
  });

  const floors = watch("floors");
  const parking = watch("parking");
  const balconies = watch("balconies");
  const lift = watch("lift");
  const basement = watch("basement");
  const homeOffice = watch("homeOffice");
  const rentalFloor = watch("rentalFloor");
  const terrace = watch("terrace");

  function onSubmit(data: FormData) {
    setInput({ configuration: data });
    track("planner_step_completed", { step_number: 4, step_name: "configuration" });
    router.push("/plan/quality");
  }

  const selBtn = (active: boolean) =>
    active
      ? "border-navy bg-navy/6 text-navy"
      : "border-border bg-white text-text-primary hover:border-border-strong hover:bg-surface-low";

  const selSubtext = (active: boolean) =>
    active ? "text-navy/55 font-mono" : "text-text-tertiary font-mono";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      noValidate
    >
      <ProgressBar currentStep={4} />

      <div>
        <h1 className="step-title mb-2">How do you want it built?</h1>
        <p className="text-body-sm text-text-secondary">
          Each choice shapes your total cost and timeline.
        </p>
      </div>

      <div className="flex flex-col gap-5">

        {/* Floors */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary mb-3">
            Number of floors
          </p>
          <div className="grid grid-cols-4 gap-2">
            {FLOOR_OPTIONS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setValue("floors", f.value)}
                className={`
                  flex flex-col items-center justify-center gap-0.5 h-16 border font-semibold text-sm transition-all duration-200
                  focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30
                  ${selBtn(floors === f.value)}
                `}
                aria-pressed={floors === f.value}
              >
                <span>{f.label}</span>
                <span className={`text-[10px] ${selSubtext(floors === f.value)}`}>
                  {f.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Built-up area (sqft)"
          type="number"
          inputMode="numeric"
          required
          hint={`Typical for your plot: ${((input.plot?.length ?? 40) * (input.plot?.width ?? 30) * 0.6).toFixed(0)} sqft (60% coverage)`}
          error={errors.builtUpArea?.message}
          {...register("builtUpArea")}
        />

        {/* Parking */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary mb-3">
            Parking
          </p>
          <div className="grid grid-cols-3 gap-2">
            {PARKING_OPTIONS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setValue("parking", p.value)}
                className={`
                  flex flex-col items-center justify-center gap-0.5 h-16 border font-semibold text-sm transition-all duration-200
                  focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30
                  ${selBtn(parking === p.value)}
                `}
                aria-pressed={parking === p.value}
              >
                <span>{p.label}</span>
                <span className={`text-[10px] ${selSubtext(parking === p.value)}`}>
                  {p.hint}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Balconies stepper */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary mb-3">
            Balconies
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setValue("balconies", Math.max(0, balconies - 1))}
              className="w-10 h-10 border border-border bg-white text-lg font-medium text-text-primary hover:border-border-strong hover:bg-surface-low transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30 disabled:opacity-30"
              disabled={balconies === 0}
              aria-label="Decrease balconies"
            >
              −
            </button>
            <span className="text-headline-md font-semibold tabular-nums w-6 text-center text-navy">
              {balconies}
            </span>
            <button
              type="button"
              onClick={() => setValue("balconies", Math.min(6, balconies + 1))}
              className="w-10 h-10 border border-border bg-white text-lg font-medium text-text-primary hover:border-border-strong hover:bg-surface-low transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30 disabled:opacity-30"
              disabled={balconies === 6}
              aria-label="Increase balconies"
            >
              +
            </button>
            {balconies > 0 && (
              <span className="font-mono text-[11px] text-text-tertiary tabular-nums">
                +₹{(balconies * 50000).toLocaleString("en-IN")} approx
              </span>
            )}
          </div>
        </div>

        {/* Toggles */}
        <div className="divide-y divide-border border-t border-border">
          <Toggle label="Terrace" hint="Usable roof terrace" checked={terrace} onChange={(v) => setValue("terrace", v)} />
          <Toggle label="Lift" hint="+₹6.5L installed" checked={lift} onChange={(v) => setValue("lift", v)} />
          <Toggle label="Basement" hint="+22% civil cost" checked={basement} onChange={(v) => setValue("basement", v)} />
          <Toggle label="Home office" hint="+₹1.8L" checked={homeOffice} onChange={(v) => setValue("homeOffice", v)} />
          <Toggle label="Rental floor" hint="Earn rental income from a separate unit" checked={rentalFloor} onChange={(v) => setValue("rentalFloor", v)} />
        </div>

      </div>

      <NavigationButtons onBack={() => router.push("/plan/plot")} />
    </motion.form>
  );
}
