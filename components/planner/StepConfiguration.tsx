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
import { PLAN } from "@/lib/copy";
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
  { value: 1, label: "Ground only" },
  { value: 2, label: "G+1" },
  { value: 3, label: "G+2" },
  { value: 4, label: "G+3" },
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

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
      noValidate
    >
      <ProgressBar currentStep={4} />

      <div>
        <h1 className="step-title mb-2">{PLAN.step4Question}</h1>
        <p className="text-text-secondary leading-relaxed" style={{ fontSize: "16px" }}>
          {PLAN.step4Subhead}
        </p>
      </div>

      {/* Floors — horizontal text buttons, Inter 18px, bronze underline on select */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary mb-5">
          Number of floors
        </p>
        <div
          className="flex flex-wrap gap-6 md:gap-8 border-b border-border pb-6"
          role="group"
          aria-label="Select floors"
        >
          {FLOOR_OPTIONS.map((f) => {
            const isActive = floors === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setValue("floors", f.value)}
                className="text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30 transition-colors duration-200 pb-1"
                style={{
                  fontSize: "18px",
                  color: isActive ? "var(--accent)" : "var(--text-primary)",
                  borderBottom: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                  fontFamily: "inherit",
                }}
                aria-pressed={isActive}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Built-up area */}
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
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary mb-4">
          Parking
        </p>
        <div className="flex gap-6 border-b border-border pb-6" role="group" aria-label="Parking type">
          {PARKING_OPTIONS.map((p) => {
            const isActive = parking === p.value;
            return (
              <button
                key={p.value}
                type="button"
                onClick={() => setValue("parking", p.value)}
                className="text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30 transition-colors duration-200 pb-1"
                style={{
                  fontSize: "18px",
                  color: isActive ? "var(--accent)" : "var(--text-primary)",
                  borderBottom: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                  fontFamily: "inherit",
                }}
                aria-pressed={isActive}
              >
                {p.label}
                <span
                  className="block font-mono"
                  style={{ fontSize: "11px", color: isActive ? "var(--accent)" : "var(--text-tertiary)", marginTop: "2px" }}
                >
                  {p.hint}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Balconies stepper */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary mb-4">
          Balconies
        </p>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setValue("balconies", Math.max(0, balconies - 1))}
            className="w-8 h-8 border border-border flex items-center justify-center font-medium text-text-primary hover:border-border-strong transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30 disabled:opacity-30"
            disabled={balconies === 0}
            aria-label="Decrease balconies"
          >
            −
          </button>
          <span
            className="font-serif tabular-nums w-8 text-center"
            style={{ fontSize: "32px", fontWeight: 400, color: "var(--text-primary)" }}
          >
            {balconies}
          </span>
          <button
            type="button"
            onClick={() => setValue("balconies", Math.min(6, balconies + 1))}
            className="w-8 h-8 border border-border flex items-center justify-center font-medium text-text-primary hover:border-border-strong transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30 disabled:opacity-30"
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

      <NavigationButtons onBack={() => router.push("/plan/plot")} />
    </motion.form>
  );
}
