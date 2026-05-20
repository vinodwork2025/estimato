"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HOME, AUTHORITY_TILES, SAMPLE_PROJECTION, CTA, TRUST } from "@/lib/copy";

const ease = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  return (
    <section className="relative bg-bg-primary px-6 pt-20 pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[56%_44%] gap-14 xl:gap-28 items-start">

        {/* Text column */}
        <div className="order-2 lg:order-1">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-3 mb-10"
          >
            <div className="h-px w-6 bg-gold shrink-0" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary">
              Free for Indian homeowners · 2026 rates
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="font-serif text-navy mb-10 whitespace-pre-line"
            style={{
              fontSize: "clamp(40px, 6vw, 64px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              fontWeight: 400,
            }}
          >
            {HOME.heroHeadline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              maxWidth: "56ch",
              color: "#3A3530",
              marginBottom: "44px",
            }}
          >
            {HOME.heroSubhead}
          </motion.p>

          {/* Methodology trust nudge */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.27, ease }}
            style={{ fontSize: "13px", color: "#6B635C", marginBottom: "28px" }}
          >
            <Link href="/methodology" className="underline underline-offset-2 decoration-[#D4CCBF] hover:decoration-text-tertiary transition-colors">
              {TRUST.heroNudge}
            </Link>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease }}
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

          {/* Authority tiles — label / 1px bronze rule / body text. No card, no tint. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-border"
          >
            {AUTHORITY_TILES.map((tile) => (
              <div key={tile.label}>
                <p
                  className="font-mono uppercase mb-2"
                  style={{ fontSize: "11px", letterSpacing: "0.18em", color: "var(--text-primary)" }}
                >
                  {tile.label}
                </p>
                <div
                  style={{
                    width: "24px",
                    height: "1px",
                    background: "var(--accent)",
                    marginBottom: "10px",
                  }}
                />
                <p
                  className="leading-relaxed"
                  style={{ fontSize: "15px", color: "#3A3530", maxWidth: "30ch" }}
                >
                  {tile.body}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — typographic projection + photo */}
        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease }}
          >
            {/* Sample projection typographic block */}
            <div className="mb-5">
              <div style={{ height: "1px", background: "var(--accent)", marginBottom: "24px" }} />
              <p
                className="font-mono uppercase mb-4"
                style={{ fontSize: "11px", letterSpacing: "0.22em", color: "var(--text-tertiary)" }}
              >
                {SAMPLE_PROJECTION.label}
              </p>
              <p
                className="font-serif text-navy leading-none tabular-nums mb-2"
                style={{
                  fontSize: "clamp(36px, 5vw, 48px)",
                  fontWeight: 400,
                  letterSpacing: "-0.025em",
                }}
              >
                {SAMPLE_PROJECTION.range}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#3A3530",
                  lineHeight: 1.5,
                  marginBottom: "24px",
                }}
              >
                {SAMPLE_PROJECTION.spec}
              </p>
              <div style={{ height: "1px", background: "var(--accent)" }} />
            </div>

            {/* Home photo — duotone filtered, 16:9, 1px border */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "16 / 9",
                border: "1px solid #D4CCBF",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=85"
                alt="Contemporary home exterior"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
                style={{
                  filter: "grayscale(1) sepia(0.12) brightness(0.95) contrast(1.05)",
                }}
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
