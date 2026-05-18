"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

const TRUST_STATS = [
  { value: "2,400+", label: "homeowners" },
  { value: "12+", label: "cities" },
  { value: "2026", label: "verified rates" },
];

export function HomeHero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 22 });
  const imgX = useTransform(springX, [-1, 1], [-8, 8]);
  const imgY = useTransform(springY, [-1, 1], [-5, 5]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!imageRef.current) return;
    const r = imageRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
    mouseY.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
  }

  return (
    <section className="bg-bg-primary px-6 pt-14 pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[52%_48%] gap-10 xl:gap-20 items-center">

        {/* Text column */}
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-3 mb-9"
          >
            <div className="h-px w-7 bg-gold shrink-0" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary">
              Free for Indian homeowners · 2026 rates
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease }}
            className="font-serif text-navy mb-7"
            style={{
              fontSize: "clamp(42px, 5vw, 66px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Know the true cost<br />of your{" "}
            <em className="not-italic text-navy/70">dream home.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease }}
            className="text-body-lg text-text-secondary leading-relaxed mb-10 max-w-md"
          >
            An honest construction cost estimate in 7 steps — full breakdown,
            phase-wise timeline, and hidden cost warnings. No contractor pitch. No sign-up.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="flex flex-col sm:flex-row gap-3 mb-12"
          >
            <Link href="/plan">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-10">
                Start planning
              </Button>
            </Link>
            <Link href="/about">
              <button className="h-12 px-8 rounded-full font-semibold text-sm text-navy border border-border hover:border-navy/30 hover:bg-navy/4 transition-all duration-200 w-full sm:w-auto">
                See how it works
              </button>
            </Link>
          </motion.div>

          {/* Trust stats row — more architectural */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.48 }}
            className="flex items-center gap-8 pt-8 border-t border-border"
          >
            {TRUST_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono font-semibold text-navy text-sm tabular-nums">{stat.value}</p>
                <p className="text-xs text-text-tertiary mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Image column */}
        <div
          ref={imageRef}
          className="order-1 lg:order-2 relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-8 rounded-3xl bg-gold/10 blur-3xl pointer-events-none" />

          <motion.div style={{ x: imgX, y: imgY }} className="relative">
            {/* Main image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-elevation-3">
              <Image
                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=85"
                alt="Contemporary luxury home exterior"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/15" />
            </div>

            {/* Estimate card — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -16, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.72, duration: 0.65, ease }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 border border-border w-[210px]"
              style={{ boxShadow: "0 20px 60px rgba(14,33,70,0.14), 0 4px 16px rgba(14,33,70,0.07)" }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-tertiary mb-2">
                Sample estimate
              </p>
              <p className="font-serif text-[30px] text-navy leading-none tabular-nums mb-1.5">
                ₹68–₹84L
              </p>
              <p className="text-xs text-text-secondary mb-3">
                1,500 sqft · Hosur · Standard
              </p>
              <div className="flex items-center gap-2 bg-success/8 rounded-lg px-2.5 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                <span className="text-[11px] text-success font-semibold font-mono">
                  2026 verified rates
                </span>
              </div>
            </motion.div>

            {/* Top-right badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.88, duration: 0.5, ease }}
              className="absolute -top-4 -right-4 bg-navy text-white rounded-2xl px-4 py-3"
              style={{ boxShadow: "0 12px 40px rgba(14,33,70,0.22)" }}
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider">
                Free forever
              </p>
              <p className="text-[9px] text-white/40 mt-0.5 font-mono uppercase tracking-wide">
                No account needed
              </p>
            </motion.div>

            {/* Location pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.4 }}
              className="absolute top-5 left-5 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2"
              style={{ boxShadow: "0 2px 12px rgba(14,33,70,0.10)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
              <span className="text-xs font-semibold text-navy">12+ cities covered</span>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
