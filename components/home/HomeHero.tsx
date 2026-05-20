"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HOME, AUTHORITY_STATS, CTA } from "@/lib/copy";

const ease = [0.16, 1, 0.3, 1] as const;

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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.08, ease }}
            className="font-serif text-navy mb-10 whitespace-pre-line"
            style={{
              fontSize: "clamp(44px, 7vw, 80px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              fontWeight: 400,
            }}
          >
            {HOME.heroHeadline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="text-text-secondary leading-relaxed mb-11"
            style={{ fontSize: "18px", maxWidth: "48ch" }}
          >
            {HOME.heroSubhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32, ease }}
            className="flex flex-col sm:flex-row gap-3 mb-16"
          >
            <Link href="/plan">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-12">
                {CTA.heroPrimary}
              </Button>
            </Link>
            <Link href="/methodology">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                {CTA.heroSecondary}
              </Button>
            </Link>
          </motion.div>

          {/* Authority stats — no vanity numbers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-5 pt-10 border-t border-border"
          >
            {AUTHORITY_STATS.map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-navy mb-1.5"
                  style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "-0.01em" }}
                >
                  {stat.label}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary leading-snug">
                  {stat.sublabel}
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
          <motion.div style={{ x: imgX, y: imgY }} className="relative">
            {/* Main image — duotone art direction */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=85"
                alt="Contemporary home exterior"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
                style={{
                  filter: "grayscale(1) sepia(0.15) brightness(0.92) contrast(1.05)",
                }}
              />
            </div>

            {/* Floating estimate — editorial style, no card chrome */}
            <motion.div
              initial={{ opacity: 0, x: -18, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease }}
              className="absolute -bottom-8 -left-6 p-5 w-[210px] bg-bg-primary"
              style={{ border: "1px solid var(--border)" }}
            >
              <div style={{ height: "1px", background: "#D4CCBF", marginBottom: "14px" }} />
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-tertiary mb-2.5">
                Sample estimate
              </p>
              <p
                className="font-serif text-navy leading-none tabular-nums mb-2"
                style={{ fontSize: "28px", fontWeight: 400, letterSpacing: "-0.025em" }}
              >
                ₹68–₹84L
              </p>
              <p className="text-text-secondary mb-0" style={{ fontSize: "12px", lineHeight: 1.5 }}>
                1,500 sqft · Hosur · Refined Living
              </p>
              <div style={{ height: "1px", background: "#D4CCBF", marginTop: "14px" }} />
            </motion.div>

            {/* Top-right marker */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.5, ease }}
              className="absolute -top-4 -right-4 bg-navy text-text-inverse px-4 py-3"
            >
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em]">
                Free forever
              </p>
              <p className="text-[9px] text-text-inverse/40 mt-0.5 font-mono uppercase tracking-wide">
                No account needed
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
