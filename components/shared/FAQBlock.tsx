"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  items: FAQItem[];
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
                className="w-full text-left py-5 flex items-start justify-between gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 rounded"
                aria-expanded={open}
                aria-controls={`faq-answer-${schemaId}-${i}`}
              >
                <span className="font-medium text-text-primary text-sm leading-relaxed">
                  {item.question}
                </span>
                <span
                  className="shrink-0 mt-0.5 w-5 h-5 rounded-full border border-border flex items-center justify-center transition-transform duration-300"
                  style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                  aria-hidden="true"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
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
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-text-secondary leading-relaxed">
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
