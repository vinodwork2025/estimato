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

  const springX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 22 });
  const imgX = useTransform(springX, [-1, 1], [-10, 10]);
  const imgY = useTransform(springY, [-1, 1], [-6, 6]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!imageRef.current) return;
    const r = imageRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
    mouseY.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
  }

  return (
    <section className="relative bg-bg-primary px-6 pt-16 pb-28 overflow-hidden">

      {/* Ambient radial gradient — warm depth, not flat */}
      <div
        className="absolute top-0 left-0 w-[60%] h-[70%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 0%, rgba(197,160,89,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 xl:gap-24 items-center">

        {/* ── Text column ── */}
        <div className="order-2 lg:order-1">

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="h-px w-8 bg-gold shrink-0" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-black">
              Free for Indian homeowners · 2026 rates
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="font-serif text-navy mb-8"
            style={{
              fontSize: "clamp(52px, 7vw, 88px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              fontWeight: 800,
            }}
          >
            Know the real<br />cost before<br />you build.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease }}
            className="text-body-lg text-text-secondary leading-relaxed mb-10 max-w-[52ch]"
          >
            An honest construction cost estimate in 7 steps — full breakdown,
            phase-wise timeline, and hidden cost warnings.
            No contractor pitch. No sign-up.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease }}
            className="flex flex-col sm:flex-row gap-3 mb-14"
          >
            <Link href="/plan">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-12">
                Get my estimate →
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                How it works
              </Button>
            </Link>
          </motion.div>

          {/* Trust stats — large display numbers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 pt-10 border-t border-border"
          >
            {TRUST_STATS.map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-serif text-navy tabular-nums mb-1"
                  style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  {stat.value}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Image column ── */}
        <div
          ref={imageRef}
          className="order-1 lg:order-2 relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        >
          {/* Warm ambient glow behind image */}
          <div className="absolute inset-6 rounded-3xl bg-gold/12 blur-3xl pointer-events-none" />

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
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/20" />
            </div>

            {/* Estimate card — floating bottom-left */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 12 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7, ease }}
              className="absolute -bottom-7 -left-7 bg-white rounded-2xl p-5 w-[220px]"
              style={{
                boxShadow: "0 24px 64px rgba(14,33,70,0.16), 0 4px 16px rgba(14,33,70,0.08)",
                border: "1px solid rgba(226,221,212,0.8)",
              }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-tertiary mb-2.5">
                Sample estimate
              </p>
              <p
                className="font-serif text-navy leading-none tabular-nums mb-2"
                style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.025em" }}
              >
                ₹68–₹84L
              </p>
              <p className="text-xs text-text-secondary mb-3.5 leading-snug">
                1,500 sqft · Hosur · Standard finish
              </p>
              <div className="flex items-center gap-2 bg-success/8 rounded-lg px-2.5 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                <span className="text-[11px] text-success font-semibold font-mono tracking-tight">
                  2026 verified rates
                </span>
              </div>
            </motion.div>

            {/* Top-right navy badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.55, ease }}
              className="absolute -top-5 -right-5 bg-navy text-white rounded-2xl px-4 py-3.5"
              style={{ boxShadow: "0 16px 48px rgba(14,33,70,0.28), inset 0 1px 0 rgba(255,255,255,0.08)" }}
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">
                Free forever
              </p>
              <p className="text-[9px] text-white/45 mt-0.5 font-mono uppercase tracking-wide">
                No account needed
              </p>
            </motion.div>

            {/* Location pill — top-left of image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.45 }}
              className="absolute top-5 left-5 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2.5"
              style={{
                boxShadow: "0 2px 16px rgba(14,33,70,0.12)",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-success shrink-0 shadow-[0_0_0_3px_rgba(45,125,90,0.15)]" />
              <span className="text-xs font-semibold text-navy tracking-tight">12+ cities covered</span>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
