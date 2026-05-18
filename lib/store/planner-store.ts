"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlannerInput, CalculationResult } from "@/types";

interface PlannerState {
  currentStep: number;
  input: Partial<PlannerInput>;
  isCalculating: boolean;
  result: CalculationResult | null;
  setInput: (partial: Partial<PlannerInput>) => void;
  setResult: (result: CalculationResult) => void;
  setCalculating: (v: boolean) => void;
  resetPlanner: () => void;
  goToStep: (step: number) => void;
}

export const usePlannerStore = create<PlannerState>()(
  persist(
    (set) => ({
      currentStep: 1,
      input: {},
      isCalculating: false,
      result: null,
      setInput: (partial) =>
        set((state) => ({ input: { ...state.input, ...partial } })),
      setResult: (result) => set({ result }),
      setCalculating: (v) => set({ isCalculating: v }),
      resetPlanner: () =>
        set({ currentStep: 1, input: {}, result: null, isCalculating: false }),
      goToStep: (step) => set({ currentStep: step }),
    }),
    { name: "estimato-planner" }
  )
);
