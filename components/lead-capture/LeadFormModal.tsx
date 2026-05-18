"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { track } from "@/lib/analytics/events";
import type { PlannerInput, CalculationResult } from "@/types";

const schema = z.object({
  name: z.string().min(2, "Enter your name").max(100),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit number"),
  area: z.string().optional(),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  planningTimeline: z.enum(["within-3-months", "3-6-months", "6-12-months", "exploring"]),
  consentToPartnerShare: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface LeadFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (result: { partnerMatched: boolean; partnerName: string | null; phone: string }) => void;
  input: Partial<PlannerInput>;
  result: CalculationResult;
  sourcePage?: string;
}

export function LeadFormModal({
  open,
  onClose,
  onSuccess,
  input,
  result,
  sourcePage,
}: LeadFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      area: input.area ?? "",
      planningTimeline: "within-3-months",
      consentToPartnerShare: true,
    },
  });

  const consent = watch("consentToPartnerShare");

  async function onSubmit(data: FormData) {
    setLoading(true);
    setServerError(null);
    track("pdf_form_submitted", {
      planning_timeline: data.planningTimeline,
      city: input.city ?? "",
      partner_consent: data.consentToPartnerShare,
    });

    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          countryCode: "+91",
          city: input.city ?? "",
          area: data.area,
          email: data.email || undefined,
          planningTimeline: data.planningTimeline,
          consentToPartnerShare: data.consentToPartnerShare,
          calculationInput: input,
          calculationResult: result,
          sourcePage,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      const json = await res.json();
      onSuccess({
        partnerMatched: json.partnerMatched,
        partnerName: json.partnerName,
        phone: data.phone,
      });
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Get your full report">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <Input
          label="Your name"
          placeholder="e.g. Ravi Kumar"
          required
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

        <div>
          <label className="text-sm font-medium text-text-primary block mb-1.5">
            WhatsApp number <span className="text-error" aria-label="required">*</span>
          </label>
          <div className="flex gap-2">
            <span className="h-12 px-3 flex items-center border border-border rounded bg-bg-primary text-text-secondary text-sm">
              +91
            </span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="9876543210"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              className="flex-1 h-12 px-4 rounded border text-text-primary placeholder:text-text-tertiary bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus:border-accent border-border"
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <p role="alert" className="text-sm text-error mt-1">{errors.phone.message}</p>
          )}
        </div>

        <Input
          label="Plot location"
          placeholder={`${input.area ? input.area + ", " : ""}${input.city ?? ""}`}
          hint="Auto-filled from your inputs"
          {...register("area")}
        />

        <Input
          label="Email (optional)"
          type="email"
          placeholder="ravi@example.com"
          hint="We'll send your PDF here"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Select
          label="When are you planning to build?"
          required
          options={[
            { value: "within-3-months", label: "Within 3 months" },
            { value: "3-6-months", label: "3 to 6 months" },
            { value: "6-12-months", label: "6 to 12 months" },
            { value: "exploring", label: "Just exploring" },
          ]}
          error={errors.planningTimeline?.message}
          {...register("planningTimeline")}
        />

        <div className="border border-border rounded-card px-4">
          <Toggle
            label="Connect me with a verified architect in my area"
            hint="We share your details with one partner only"
            checked={consent}
            onChange={(v) => setValue("consentToPartnerShare", v)}
          />
        </div>

        {serverError && (
          <p role="alert" className="text-sm text-error bg-red-50 border border-red-200 rounded p-3">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          className="w-full h-12 mt-2"
        >
          Send my report
        </Button>

        <p className="text-xs text-center text-text-tertiary">
          No spam. We share your details only with one verified partner if you allow us.
        </p>
      </form>
    </Modal>
  );
}
