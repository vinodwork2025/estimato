"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePlannerStore } from "@/lib/store/planner-store";
import { ProgressBar } from "./ProgressBar";
import { track } from "@/lib/analytics/events";
import type { HomeType } from "@/types";

const HOME_TYPES: {
  value: HomeType;
  label: string;
  range: string;
  description: string;
  image: string;
}[] = [
  {
    value: "budget",
    label: "Budget Home",
    range: "₹25L – 50L",
    description: "Practical, durable, minimal frills",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
  },
  {
    value: "contemporary",
    label: "Contemporary",
    range: "₹45L – 1Cr",
    description: "Modern design with flat roof and clean lines",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    value: "duplex",
    label: "Duplex",
    range: "₹40L – 90L",
    description: "Two-level home with internal staircase",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80",
  },
  {
    value: "villa",
    label: "Villa",
    range: "₹50L – 1.2Cr",
    description: "Independent house with garden, single or double floor",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    value: "farmhouse",
    label: "Farmhouse",
    range: "₹35L – 1.5Cr",
    description: "Open layout on agricultural land, informal style",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
  },
  {
    value: "luxury-villa",
    label: "Luxury Villa",
    range: "₹1.2Cr – 3Cr",
    description: "Architect-designed with premium materials throughout",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
  },
];

export function StepHomeType() {
  const router = useRouter();
  const { input, setInput } = usePlannerStore();

  function handleSelect(type: HomeType) {
    setInput({ homeType: type });
    track("planner_step_completed", { step_number: 1, step_name: "home_type" });
    setTimeout(() => router.push("/plan/location"), 320);
  }

  return (
    <div className="flex flex-col gap-8">
      <ProgressBar currentStep={1} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="step-title mb-2">What are you building?</h1>
        <p className="text-body-sm text-text-secondary">
          Select the type that best matches your vision.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {HOME_TYPES.map((type, i) => {
          const selected = input.homeType === type.value;
          return (
            <motion.button
              key={type.value}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.055, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleSelect(type.value)}
              className={`
                group relative overflow-hidden rounded-2xl text-left focus:outline-none
                focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2
                transition-all duration-300
                ${selected
                  ? "ring-2 ring-navy ring-offset-1 shadow-elevation-2"
                  : "hover:shadow-elevation-1 hover:-translate-y-0.5"
                }
              `}
              aria-pressed={selected}
            >
              {/* Full-bleed cinematic image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
                <Image
                  src={type.image}
                  alt={type.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                {/* Strong cinematic overlay */}
                <div className="absolute inset-0 overlay-cinema" />

                {/* Text content over image */}
                <div className="absolute inset-0 flex flex-col justify-end px-4 pb-4 pt-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50 mb-1.5">
                    {type.range}
                  </p>
                  <p className="font-semibold text-sm text-white leading-snug">
                    {type.label}
                  </p>
                  <p className="text-[11px] text-white/55 mt-0.5 leading-snug hidden sm:block">
                    {type.description}
                  </p>
                </div>

                {/* Selected check */}
                {selected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-elevation-1"
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="#0E2146"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
