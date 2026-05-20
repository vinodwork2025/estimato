"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

const TRUST_STATS = [
  { value: "2,400+", label: "homeowners served" },
  { value: "12+", label: "cities covered" },
  { value: "₹0", label: "cost to homeowners" },
];

export function HomeHero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 38, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 38, damping: 24 });
  const imgX = useTransform(springX, [-1, 1], [-8, 8]);
  const imgY = useTransform(springY, [-1, 1], [-5, 5]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!imageRef.current) return;
    const r = imageRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
    mouseY.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
  }

  return (
    <section className="relative bg-bg-primary px-6 pt-20 pb-32 overflow-hidden">

      {/* Ambient warmth */}
      <div
        className="absolute top-0 left-0 w-[55%] h-[65%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 15% 0%, rgba(184,149,78,0.065) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[56%_44%] gap-14 xl:gap-28 items-center">

        {/* Text column */}
        <div className="order-2 lg:order-1">

          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease }}
            className="inline-flex items-center gap-3 mb-10"
          >
            <div className="h-px w-6 bg-gold shrink-0" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary">
              Free for Indian homeowners · 2026 rates
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.08, ease }}
            className="font-serif text-navy mb-10"
            style={{
              fontSize: "clamp(48px, 7vw, 84px)",
              lineHeight: 0.97,
              letterSpacing: "-0.03em",
              fontWeight: 400,
            }}
          >
            Know the real<br />cost before<br />you build.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="text-body-lg text-text-secondary leading-relaxed mb-11 max-w-[48ch]"
          >
            An honest construction cost estimate in 7 steps — full breakdown,
            phase-wise timeline, and hidden cost warnings.
            No contractor pitch. No sign-up.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32, ease }}
            className="flex flex-col sm:flex-row gap-3 mb-16"
          >
            <Link href="/plan">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-12">
                Get my estimate
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                How it works
              </Button>
            </Link>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-5 pt-10 border-t border-border"
          >
            {TRUST_STATS.map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-serif text-navy tabular-nums mb-1.5"
                  style={{
                    fontSize: "clamp(26px, 3.5vw, 38px)",
                    fontWeight: 400,
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {stat.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Image column */}
        <div
          ref={imageRef}
          className="order-1 lg:order-2 relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            mouseX.set(0);
            mouseY.set(0);
          }}
        >
          {/* Ambient warmth behind image */}
          <div
            className="absolute inset-8 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(184,149,78,0.10) 0%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />

          <motion.div style={{ x: imgX, y: imgY }} className="relative">
            {/* Main image — no rounded corners, pure architectural edge */}
            <div className="relative aspect-[4/5] w-full overflow-hidden shadow-elevation-3">
              <Image
                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=85"
                alt="Contemporary luxury home exterior"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 60%, rgba(28,25,23,0.18) 100%)",
                }}
              />
            </div>

            {/* Floating estimate card */}
            <motion.div
              initial={{ opacity: 0, x: -18, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease }}
              className="absolute -bottom-8 -left-6 bg-bg-elevated p-5 w-[210px]"
              style={{
                boxShadow: "0 20px 56px rgba(28,25,23,0.13), 0 4px 14px rgba(28,25,23,0.07)",
                border: "1px solid var(--border)",
              }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-tertiary mb-2.5">
                Sample estimate
              </p>
              <p
                className="font-serif text-navy leading-none tabular-nums mb-2"
                style={{ fontSize: "30px", fontWeight: 400, letterSpacing: "-0.025em" }}
              >
                ₹68–₹84L
              </p>
              <p className="text-[12px] text-text-secondary mb-3.5 leading-snug">
                1,500 sqft · Hosur · Economy finish
              </p>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-success shrink-0" />
                <span className="text-[11px] text-success font-mono tracking-tight">
                  2026 verified rates
                </span>
              </div>
            </motion.div>

            {/* Top-right marker — architectural, not badge-shaped */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.5, ease }}
              className="absolute -top-4 -right-4 bg-navy text-text-inverse px-4 py-3"
              style={{
                boxShadow: "0 14px 40px rgba(28,25,23,0.24), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em]">
                Free forever
              </p>
              <p className="text-[9px] text-text-inverse/40 mt-0.5 font-mono uppercase tracking-wide">
                No account needed
              </p>
            </motion.div>

            {/* Coverage indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.45 }}
              className="absolute top-5 left-5 bg-bg-elevated/92 backdrop-blur-sm px-3.5 py-2 flex items-center gap-2"
              style={{
                boxShadow: "0 2px 12px rgba(28,25,23,0.10)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
              <span className="text-[11px] font-medium text-navy tracking-tight">
                12+ cities covered
              </span>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
