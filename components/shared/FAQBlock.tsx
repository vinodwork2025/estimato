"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  items: ReadonlyArray<FAQItem>;
  title?: string;
  sourcePage?: string;
  schemaId?: string;
}

export function FAQBlock({
  items,
  schemaId = "faq-schema",
}: FAQBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section aria-labelledby={`${schemaId}-title`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        id={schemaId}
      />
      <div className="divide-y divide-border">
        {items.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full text-left py-6 flex items-start justify-between gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
                aria-expanded={open}
                aria-controls={`faq-answer-${schemaId}-${i}`}
              >
                <span
                  className="font-serif text-text-primary leading-snug"
                  style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  {item.question}
                </span>
                <span
                  className="shrink-0 mt-1.5 transition-transform duration-300"
                  style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                  aria-hidden="true"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`faq-answer-${schemaId}-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        height: "1px",
                        background: "var(--accent)",
                        transformOrigin: "left center",
                        marginBottom: "16px",
                      }}
                    />
                    <p className="pb-6 text-text-secondary leading-relaxed" style={{ fontSize: "17px", lineHeight: 1.7 }}>
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
