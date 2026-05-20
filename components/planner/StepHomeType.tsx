"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePlannerStore } from "@/lib/store/planner-store";
import { ProgressBar } from "./ProgressBar";
import { track } from "@/lib/analytics/events";
import type { HomeType } from "@/types";

const HOME_TYPES: {
  value: HomeType;
  label: string;
  tagline: string;
  range: string;
  image: string;
}[] = [
  {
    value: "budget",
    label: "Budget Home",
    tagline: "Practical, durable. No excess.",
    range: "₹25L – 50L",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
  },
  {
    value: "contemporary",
    label: "Contemporary",
    tagline: "Modern lines. Clean flat roof.",
    range: "₹45L – 1Cr",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
  },
  {
    value: "duplex",
    label: "Duplex",
    tagline: "Two levels, one cohesive home.",
    range: "₹40L – 90L",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    value: "villa",
    label: "Villa",
    tagline: "Independent. Garden-facing.",
    range: "₹50L – 1.2Cr",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
  },
  {
    value: "farmhouse",
    label: "Farmhouse",
    tagline: "Open plan on open land.",
    range: "₹35L – 1.5Cr",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    value: "luxury-villa",
    label: "Luxury Villa",
    tagline: "Architect-designed. Premium throughout.",
    range: "₹1.2Cr – 3Cr",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85",
  },
];

export function StepHomeType() {
  const router = useRouter();
  const { input, setInput } = usePlannerStore();
  const [preview, setPreview] = useState<HomeType>(
    input.homeType ?? "contemporary"
  );

  const previewType = HOME_TYPES.find((t) => t.value === preview) ?? HOME_TYPES[1];
  const selected = input.homeType;

  function handleSelect(type: HomeType) {
    setInput({ homeType: type });
    setPreview(type);
    track("planner_step_completed", { step_number: 1, step_name: "home_type" });
    setTimeout(() => router.push("/plan/location"), 400);
  }

  return (
    <div className="flex flex-col gap-0 -mx-5">
      <div className="px-5">
        <ProgressBar currentStep={1} />
      </div>

      {/* Cinematic image — full width within planner column */}
      <div className="relative overflow-hidden" style={{ height: "clamp(240px, 48vh, 400px)" }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={preview}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0, 0.67, 0] }}
            className="absolute inset-0"
          >
            <Image
              src={previewType.image}
              alt={previewType.label}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 672px) 100vw, 672px"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/82 via-[#1C1917]/22 to-transparent pointer-events-none" />

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={preview}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/45 mb-1.5">
                {previewType.range}
              </p>
              <h2
                className="font-serif text-white"
                style={{
                  fontSize: "clamp(28px, 5vw, 44px)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                {previewType.label}
              </h2>
              <p className="text-white/50 text-sm mt-1.5 font-light">
                {previewType.tagline}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Selected indicator — thin gold bar at bottom */}
        {selected && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold origin-left"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </div>

      {/* Type selector — horizontal scroll */}
      <div className="px-5 pt-5 pb-2">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-tertiary mb-4">
          What are you building?
        </p>

        <div className="flex hide-scrollbar overflow-x-auto -mx-5 px-5 pb-1 gap-0 border-b border-border">
          {HOME_TYPES.map((type) => {
            const isSelected = selected === type.value;
            const isPreviewing = preview === type.value && !isSelected;

            return (
              <button
                key={type.value}
                onMouseEnter={() => setPreview(type.value)}
                onFocus={() => setPreview(type.value)}
                onClick={() => handleSelect(type.value)}
                className={`
                  relative shrink-0 text-left px-3 pb-3 pt-1 transition-all duration-200
                  focus:outline-none focus-visible:ring-1 focus-visible:ring-navy/30
                  border-b-[2px] -mb-px
                  ${isSelected
                    ? "border-gold"
                    : isPreviewing
                      ? "border-text-tertiary/30"
                      : "border-transparent"
                  }
                `}
                aria-pressed={isSelected}
              >
                <span
                  className="font-serif whitespace-nowrap block transition-colors duration-200"
                  style={{
                    fontSize: "15px",
                    fontWeight: isSelected ? 500 : 400,
                    color: isSelected
                      ? "var(--text-primary)"
                      : isPreviewing
                        ? "var(--text-secondary)"
                        : "var(--text-tertiary)",
                    letterSpacing: "-0.008em",
                  }}
                >
                  {type.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue hint */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-5 pt-3"
        >
          <p className="font-mono text-[10px] text-text-tertiary tracking-[0.12em]">
            Taking you to the next step…
          </p>
        </motion.div>
      )}
    </div>
  );
}
