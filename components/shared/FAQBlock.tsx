"use client";

import { useState } from "react";

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
  title = "Common questions",
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
      <h2
        id={`${schemaId}-title`}
        className="text-2xl font-semibold text-text-primary mb-8"
      >
        {title}
      </h2>
      <div className="divide-y divide-border">
        {items.map((item, i) => (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              aria-expanded={openIndex === i}
              aria-controls={`faq-answer-${schemaId}-${i}`}
            >
              <span className="font-medium text-text-primary">{item.question}</span>
              <span
                className="text-text-secondary shrink-0 transition-transform duration-200"
                style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              id={`faq-answer-${schemaId}-${i}`}
              hidden={openIndex !== i}
              className="pb-5 text-text-secondary leading-relaxed"
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
