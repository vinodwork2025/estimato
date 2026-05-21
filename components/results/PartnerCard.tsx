"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PartnerBadge } from "@/components/partners/PartnerBadge";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics/events";
import type { Partner } from "@/types";

interface PartnerCardProps {
  partner: Partner;
  onGetReport: () => void;
}

export function PartnerCard({ partner, onGetReport }: PartnerCardProps) {
  function handleWhatsApp() {
    track("whatsapp_cta_clicked", { partner_slug: partner.slug });
    const number = partner.whatsappNumber.replace(/\D/g, "");
    const message = encodeURIComponent(
      "Hi, I got your contact from Estimato. I'd like to discuss my home construction project."
    );
    window.open(`https://wa.me/${number}?text=${message}`, "_blank", "noopener");
  }

  function handleReport() {
    track("partner_card_clicked", { partner_slug: partner.slug, cta_type: "pdf_report" });
    onGetReport();
  }

  return (
    <div
      className="bg-bg-elevated border border-border overflow-hidden"
      style={{ boxShadow: "0 2px 8px rgba(13,31,60,0.06)" }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <PartnerBadge />
            <h3
              className="font-serif text-text-primary mt-2 mb-0.5"
              style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              {partner.name}
            </h3>
            <p className="text-body-sm text-text-secondary">{partner.tagline}</p>
          </div>
          {partner.logoUrl && (
            <Image
              src={partner.logoUrl}
              alt={`${partner.name} logo`}
              width={48}
              height={48}
              className="object-contain shrink-0"
            />
          )}
        </div>
      </div>

      {/* Founder */}
      <div className="px-6 py-5 border-b border-border">
        <div className="flex items-start gap-4">
          {partner.founderPhotoUrl && (
            <Image
              src={partner.founderPhotoUrl}
              alt={partner.founderName}
              width={40}
              height={40}
              className="object-cover shrink-0"
              style={{ aspectRatio: "1/1" }}
            />
          )}
          <div className="min-w-0">
            <p className="font-medium text-text-primary text-sm">{partner.founderName}</p>
            <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
              {partner.founderBio}
            </p>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="px-6 py-5 flex flex-col sm:flex-row gap-2.5">
        <Button variant="primary" onClick={handleReport} className="flex-1">
          Get detailed PDF report
        </Button>
        <Button variant="secondary" onClick={handleWhatsApp} className="flex-1">
          Talk to {partner.founderName.split(" ")[0]}
        </Button>
      </div>
    </div>
  );
}

export function GenericPartnerCTA({ onGetReport }: { onGetReport: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-navy overflow-hidden"
      style={{ padding: "3rem 2.5rem" }}
    >
      {/* Ambient */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 20% 0%, rgba(184,149,78,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-5 bg-gold/40" />
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/35">
            Complimentary report
          </p>
        </div>

        {/* Heading */}
        <h3
          className="font-serif text-white mb-3"
          style={{
            fontSize: "clamp(24px, 4vw, 32px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Your 12-page construction<br />planning report. Free.
        </h3>

        {/* Description */}
        <p className="text-white/45 text-sm mb-8 max-w-[44ch] leading-relaxed">
          Full cost breakdown · Phase-wise timeline · Hidden cost warnings ·
          Smart observations. Delivered to your inbox.
        </p>

        {/* CTA */}
        <Button
          variant="gold"
          onClick={onGetReport}
          size="lg"
          className="w-full sm:w-auto min-w-[200px]"
        >
          Get my report
        </Button>

        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/22 mt-5">
          Free · No spam · One verified partner contact if you choose
        </p>
      </div>
    </motion.div>
  );
}
