"use client";

import Image from "next/image";
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
    const message = encodeURIComponent("Hi, I got your contact from Estimato. I'd like to discuss my home construction project.");
    window.open(`https://wa.me/${number}?text=${message}`, "_blank", "noopener");
  }

  function handleReport() {
    track("partner_card_clicked", { partner_slug: partner.slug, cta_type: "pdf_report" });
    onGetReport();
  }

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden">
      {/* Header strip */}
      <div className="px-6 pt-6 pb-5 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <PartnerBadge />
            <h3 className="font-serif text-headline-md text-text-primary mt-2 mb-0.5">
              {partner.name}
            </h3>
            <p className="text-body-sm text-text-secondary">{partner.tagline}</p>
          </div>
          {partner.logoUrl && (
            <Image
              src={partner.logoUrl}
              alt={`${partner.name} logo`}
              width={56}
              height={56}
              className="object-contain rounded-xl"
            />
          )}
        </div>
      </div>

      {/* Founder block */}
      <div className="px-6 py-5 border-b border-border">
        <div className="flex items-start gap-4">
          {partner.founderPhotoUrl && (
            <Image
              src={partner.founderPhotoUrl}
              alt={partner.founderName}
              width={44}
              height={44}
              className="rounded-full object-cover shrink-0"
            />
          )}
          <div className="min-w-0">
            <p className="font-semibold text-text-primary text-sm">{partner.founderName}</p>
            <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{partner.founderBio}</p>
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
    <div className="bg-navy rounded-2xl px-6 py-8 text-center relative overflow-hidden">
      {/* Warm glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-gold/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative">
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35 mb-4">
          Free 12-page report
        </p>
        <h3 className="font-serif text-headline-md text-white mb-2">
          Get your detailed PDF report
        </h3>
        <p className="text-sm text-white/50 mb-7 max-w-xs mx-auto leading-relaxed">
          Full cost breakdown, timeline, hidden cost warnings, and smart observations — delivered free.
        </p>
        <Button variant="gold" onClick={onGetReport} className="w-full max-w-xs mx-auto shadow-glow-gold">
          Get my report →
        </Button>
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/25 mt-4">
          Free · We share your details only with one verified partner if you choose
        </p>
      </div>
    </div>
  );
}
