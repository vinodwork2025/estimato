"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    number: "01",
    title: "Tell us about\nyour build",
    body: "Home type, location, plot size, floors, and quality tier — 7 quick steps. No signup, no salesperson waiting on the other end.",
    checks: ["Home type & style", "City & locality", "Plot dimensions & soil", "Floors, area & add-ons", "Quality and interior tier"],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Architectural blueprints and construction plans",
  },
  {
    number: "02",
    title: "Get an honest\nestimate",
    body: "We calculate a cost range from verified 2026 market data — with a 7-category breakdown, phase timeline, and hidden cost warnings flagged upfront.",
    checks: ["7-category cost breakdown", "Phase-wise payment timeline", "₹/sqft comparison by city", "Hidden costs flagged early"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Construction cost estimate on screen",
  },
  {
    number: "03",
    title: "Connect if\nyou choose to",
    body: "Optionally connect with one verified architecture firm in your area. We evaluated them — not a paid directory. No cold calls, no data sold.",
    checks: ["One verified firm, no spam", "WhatsApp PDF report (12 pages)", "No commitment required", "Your data is never sold"],
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Architect consultation meeting",
  },
];

function Step({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const flip = index % 2 === 1;

  return (
    <div ref={ref} className="relative py-20 border-b border-border last:border-0 overflow-hidden">
      {/* Decorative background step number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className={`absolute top-4 pointer-events-none select-none font-serif text-[clamp(120px,18vw,200px)] leading-none text-navy/[0.035] ${flip ? "right-0 -mr-4" : "left-0 -ml-4"}`}
        aria-hidden="true"
      >
        {step.number}
      </motion.div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: flip ? 36 : -36 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease }}
          className={flip ? "lg:order-2" : "lg:order-1"}
        >
          <div className="relative aspect-[3/2] rounded-2xl overflow-hidden group">
            <Image
              src={step.image}
              alt={step.imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy/10 to-transparent" />
            <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-md border border-white/15 rounded-xl px-3 py-1.5">
              <span className="font-mono text-[10px] text-white/75 uppercase tracking-[0.18em]">
                Step {step.number}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: flip ? -36 : 36 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.22, ease }}
          className={flip ? "lg:order-1" : "lg:order-2"}
        >
          <p className="label-arch mb-5">Step {step.number}</p>
          <h3
            className="font-serif text-navy mb-5"
            style={{
              fontSize: "clamp(32px, 3.5vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              whiteSpace: "pre-line",
            }}
          >
            {step.title}
          </h3>
          <p className="text-body text-text-secondary leading-relaxed mb-7 max-w-md">{step.body}</p>

          <ul className="space-y-3">
            {step.checks.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.38 + i * 0.07, duration: 0.4, ease }}
                className="flex items-center gap-3"
              >
                <span className="w-4 h-4 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                    <path d="M1 3.5L3 5.5L7 1" stroke="#2D7D5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-body-sm text-navy font-medium">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export function HomeProcess() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true });

  return (
    <section className="bg-white border-t border-border px-6" aria-labelledby="process-heading">
      <div className="max-w-6xl mx-auto">
        <div ref={headRef} className="py-16 border-b border-border">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="label-arch mb-3"
          >
            The process
          </motion.p>
          <motion.h2
            id="process-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-serif text-headline-xl text-navy"
          >
            From blank plot to<br />clear budget — in 3 steps
          </motion.h2>
        </div>

        {STEPS.map((step, i) => (
          <Step key={step.number} step={step} index={i} />
        ))}

        <div className="py-14 flex flex-col sm:flex-row items-center gap-6 justify-between border-t border-border">
          <div>
            <p className="font-semibold text-navy text-headline-sm">Ready to know your numbers?</p>
            <p className="text-body-sm text-text-secondary mt-1">Takes 3 minutes. Free. No sign-up.</p>
          </div>
          <Link href="/plan">
            <Button variant="primary" size="lg" className="px-10 shrink-0">
              Start planning →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
