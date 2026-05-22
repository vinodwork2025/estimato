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



  const springX = useSpring(mouseX, { stiffness: 28, damping: 20 });

  const springY = useSpring(mouseY, { stiffness: 28, damping: 20 });

  const imgX = useTransform(springX, [-1, 1], [-10, 10]);

  const imgY = useTransform(springY, [-1, 1], [-6, 6]);



  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {

    if (!imageRef.current) return;

    const r = imageRef.current.getBoundingClientRect();

    mouseX.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2));

    mouseY.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2));

  }



  return (

    <section className="relative bg-bg-primary px-6 pt-20 md:pt-28 pb-20 md:pb-52 overflow-hidden">



      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[56fr_44fr] gap-16 xl:gap-32 items-center">



        {/* Text column */}

        <div>



          <motion.div

            initial={{ opacity: 0, x: -14 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.6, ease }}

            className="inline-flex items-center gap-3 mb-10"

          >

            <div className="h-px w-8 bg-gold/60 shrink-0" />

            <span className="font-mono text-[12px] uppercase tracking-[0.24em] text-text-secondary">

              Free for Indian homeowners · 2026 verified rates

            </span>

          </motion.div>



          <motion.h1

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 1.0, delay: 0.1, ease }}

            className="font-serif text-navy mb-6 whitespace-pre-line"

            style={{

              fontSize: "clamp(44px, 6.5vw, 76px)",

              lineHeight: 1.02,

              letterSpacing: "-0.032em",

              fontWeight: 400,

            }}

          >

            {HOME.heroHeadline}

          </motion.h1>



          {/* Animated gold separator */}

          <motion.div

            initial={{ scaleX: 0 }}

            animate={{ scaleX: 1 }}

            transition={{ duration: 0.65, delay: 0.3, ease }}

            style={{

              width: "44px",

              height: "1px",

              background: "var(--gold)",

              marginBottom: "22px",

              transformOrigin: "left",

            }}

          />



          <motion.p

            initial={{ opacity: 0, y: 12 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.7, delay: 0.32, ease }}

            className="text-text-secondary leading-relaxed mb-10"

            style={{ fontSize: "18px", maxWidth: "46ch", lineHeight: 1.72 }}

          >

            {HOME.heroSubhead}

          </motion.p>



          <motion.div

            initial={{ opacity: 0, y: 10 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.55, delay: 0.42, ease }}

            className="flex flex-col sm:flex-row gap-3 mb-14"

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



          {/* Authority stats — serif labels, bronze accents */}

          <motion.div

            initial={{ opacity: 0, y: 8 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.8, delay: 0.55 }}

            className="grid grid-cols-3 gap-4 pt-9 border-t border-border"

          >

            {AUTHORITY_STATS.map((stat, i) => (

              <motion.div

                key={stat.label}

                initial={{ opacity: 0, y: 6 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5, delay: 0.6 + i * 0.09 }}

              >

                <div

                  style={{

                    width: "20px",

                    height: "1px",

                    background: "var(--accent)",

                    opacity: 0.5,

                    marginBottom: "10px",

                  }}

                />

                <p

                  className="font-serif text-navy mb-1"

                  style={{

                    fontSize: "16px",

                    fontWeight: 400,

                    letterSpacing: "-0.01em",

                    lineHeight: 1.2,

                  }}

                >

                  {stat.label}

                </p>

                <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-text-secondary leading-snug">

                  {stat.sublabel}

                </p>

              </motion.div>

            ))}

          </motion.div>

        </div>



        {/* Image column */}

        <div

          ref={imageRef}

          className="relative"

          onMouseMove={handleMouseMove}

          onMouseLeave={() => {

            mouseX.set(0);

            mouseY.set(0);

          }}

        >

          <motion.div style={{ x: imgX, y: imgY }} className="relative">



            {/* Main image — warm duotone, considered crop */}

            <div

              className="relative aspect-[4/5] w-full overflow-hidden"

              style={{ borderRadius: "2px" }}

            >

              <Image

                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=90"

                alt="Contemporary South Indian home — architectural exterior"

                fill

                priority

                className="object-cover"

                sizes="(max-width: 1024px) 100vw, 46vw"

                style={{

                  filter: "grayscale(0.6) sepia(0.25) brightness(0.87) contrast(1.08)",

                  objectPosition: "center 15%",

                }}

              />

              {/* Bottom vignette — depth without heaviness */}

              <div

                aria-hidden="true"

                style={{

                  position: "absolute",

                  inset: 0,

                  background: "linear-gradient(to bottom, transparent 55%, rgba(13,31,60,0.22) 100%)",

                }}

              />

            </div>



            {/* Floating projection card — structured, no card chrome */}

            <motion.div

              initial={{ opacity: 0, x: -20, y: 14 }}

              animate={{ opacity: 1, x: 0, y: 0 }}

              transition={{ delay: 0.85, duration: 0.75, ease }}

              className="absolute -bottom-10 -left-8 bg-bg-primary hidden lg:block"

              style={{

                border: "1px solid var(--border)",

                width: "228px",

                padding: "18px 20px 20px",

              }}

            >

              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-text-secondary mb-3">

                Sample projection

              </p>

              <p

                className="font-serif text-navy leading-none tabular-nums"

                style={{ fontSize: "34px", fontWeight: 300, letterSpacing: "-0.03em" }}

              >

                ₹76L

              </p>

              <div

                style={{

                  height: "1px",

                  background: "var(--accent)",

                  width: "32px",

                  margin: "12px 0",

                }}

              />

              <div className="flex flex-col gap-2">

                {[

                  { k: "Area", v: "1,500 sqft" },

                  { k: "City", v: "Hosur" },

                  { k: "Tier", v: "Refined Living" },

                ].map((row) => (

                  <div key={row.k} className="flex justify-between items-baseline">

                    <span

                      className="font-mono uppercase text-text-secondary"

                      style={{ fontSize: "9px", letterSpacing: "0.12em" }}

                    >

                      {row.k}

                    </span>

                    <span

                      className="font-mono text-text-secondary tabular-nums"

                      style={{ fontSize: "11px" }}

                    >

                      {row.v}

                    </span>

                  </div>

                ))}

              </div>

            </motion.div>



            {/* Top-right badge — editorial, not startup */}

            <motion.div

              initial={{ opacity: 0, y: -8 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 1.0, duration: 0.5, ease }}

              className="absolute -top-5 -right-5 bg-navy hidden lg:block"

              style={{ padding: "13px 17px" }}

            >

              <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/80">

                BOQ-based

              </p>

              <p className="font-mono text-[11px] text-white/35 mt-0.5 uppercase tracking-[0.1em]">

                2026 verified

              </p>

            </motion.div>



          </motion.div>

        </div>



      </div>

    </section>

  );

}

