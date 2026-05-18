"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { usePlannerStore } from "@/lib/store/planner-store";
import { CITIES } from "@/data/cities";
import { ProgressBar } from "./ProgressBar";
import { NavigationButtons } from "./NavigationButtons";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { track } from "@/lib/analytics/events";

const schema = z.object({
  city: z.string().min(1, "Select a city"),
  area: z.string().optional(),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Enter a 6-digit pincode")
    .optional()
    .or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export function StepLocation() {
  const router = useRouter();
  const { input, setInput } = usePlannerStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      city: input.city ?? "",
      area: input.area ?? "",
      pincode: input.pincode ?? "",
    },
  });

  function onSubmit(data: FormData) {
    setInput({ city: data.city, area: data.area, pincode: data.pincode });
    track("planner_step_completed", { step_number: 2, step_name: "location" });
    router.push("/plan/plot");
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
      <ProgressBar currentStep={2} />

      <div>
        <h1 className="step-title mb-2">Where is your plot?</h1>
        <p className="text-body-sm text-text-secondary">
          Location significantly affects material costs and labour rates.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <Select
          label="City"
          options={CITIES}
          placeholder="Select a city"
          required
          error={errors.city?.message}
          {...register("city")}
        />
        <Input
          label="Area or locality"
          placeholder="e.g. Thally Road, Sipcot"
          hint="Optional — helps narrow down your estimate"
          {...register("area")}
        />
        <Input
          label="Pincode"
          placeholder="e.g. 635109"
          inputMode="numeric"
          maxLength={6}
          hint="Optional"
          error={errors.pincode?.message}
          {...register("pincode")}
        />
      </div>

      <NavigationButtons onBack={() => router.push("/plan")} nextLabel="Next" />
    </motion.form>
  );
}
