"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { EstimateLogo } from "./EstimateLogo";
import type { PlannerInput } from "@/types";

interface CalculatorWidgetProps {
  prefilledInput?: Partial<PlannerInput>;
  sourcePage?: string;
  ctaVariant?: "primary" | "ghost";
  partnerId?: string;
  compact?: boolean;
}

export function CalculatorWidget({
  prefilledInput,
  sourcePage,
  ctaVariant = "primary",
  compact = false,
}: CalculatorWidgetProps) {
  const planUrl = prefilledInput
    ? `/plan?source=${encodeURIComponent(sourcePage ?? "")}&prefill=${encodeURIComponent(JSON.stringify(prefilledInput))}`
    : "/plan";

  if (compact) {
    return (
      <div className="bg-white border border-border rounded-card p-4 flex items-center justify-between gap-4">
        <div>
          <p className="font-medium text-text-primary text-sm">Get a free cost estimate</p>
          <p className="text-xs text-text-secondary">7 steps. No signup.</p>
        </div>
        <Link href={planUrl}>
          <Button variant={ctaVariant} size="sm">
            Start planning
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-card p-6 text-center">
      <div className="flex justify-center mb-4">
        <EstimateLogo size="sm" />
      </div>
      <h3 className="font-semibold text-text-primary mb-2">
        Plan your home construction cost
      </h3>
      <p className="text-sm text-text-secondary mb-6">
        7 steps. Honest numbers. Free for homeowners.
      </p>
      <Link href={planUrl}>
        <Button variant={ctaVariant} className="w-full">
          Get my estimate
        </Button>
      </Link>
      <p className="text-xs text-text-tertiary mt-3">
        Takes 3 minutes · No spam
      </p>
    </div>
  );
}
