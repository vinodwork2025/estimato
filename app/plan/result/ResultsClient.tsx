"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlannerStore } from "@/lib/store/planner-store";
import { matchPartnerForCity } from "@/lib/partner-routing/match";
import { ResultHero } from "@/components/results/Hero";
import { CostBreakdown } from "@/components/results/CostBreakdown";
import { ScenarioComparison } from "@/components/results/ScenarioComparison";
import { Timeline } from "@/components/results/Timeline";
import { HiddenCosts } from "@/components/results/HiddenCosts";
import { SmartInsights } from "@/components/results/SmartInsights";
import { OptionalAdditions } from "@/components/results/OptionalAdditions";
import { PartnerCard, GenericPartnerCTA } from "@/components/results/PartnerCard";
import { StickyCTA } from "@/components/results/StickyCTA";
import { LeadFormModal } from "@/components/lead-capture/LeadFormModal";
import { SuccessState } from "@/components/lead-capture/SuccessState";
import { Modal } from "@/components/ui/Modal";
import { EstimateLogo } from "@/components/shared/EstimateLogo";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics/events";
import type { Partner } from "@/types";
import Link from "next/link";

type SuccessData = { partnerMatched: boolean; partnerName: string | null; phone: string };

function ResultSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`bg-white border-t border-border px-6 py-8 ${className}`}>
      {children}
    </section>
  );
}

export function ResultsClient() {
  const router = useRouter();
  const { result, input } = usePlannerStore();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [success, setSuccess] = useState<SuccessData | null>(null);

  useEffect(() => {
    if (!result) {
      router.replace("/plan");
      return;
    }
    track("result_viewed", {
      total_mid: result.totalRange.mid,
      city: input.city ?? "",
      partner_matched: false,
    });
    if (input.city) {
      matchPartnerForCity(input.city).then(setPartner);
    }
  }, [result, input.city, router]);

  if (!result) return null;

  function openLeadForm() {
    track("pdf_form_opened");
    setShowLeadForm(true);
  }

  function handleSuccess(data: SuccessData) {
    setShowLeadForm(false);
    setSuccess(data);
  }

  const qualityTier = input.qualityTier ?? "economy";

  return (
    <>
      <div className="min-h-screen bg-bg-primary pb-24 md:pb-0">

        {/* Header */}
        <header className="border-b border-border bg-white px-4 py-4 sticky top-0 z-30">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <Link href="/">
              <EstimateLogo size="sm" />
            </Link>
            <Button variant="secondary" size="sm" onClick={openLeadForm}>
              Get PDF report
            </Button>
          </div>
        </header>

        <main className="max-w-3xl mx-auto">

          {/* Hero — full-width, no horizontal padding on container */}
          <div className="px-4 pt-6 pb-0">
            <ResultHero result={result} input={input} />
          </div>

          {/* Sections — editorial stacked, unified border rhythm */}
          <div className="mt-6 rounded-2xl overflow-hidden border border-border mx-4">

            <ResultSection>
              <CostBreakdown breakdown={result.breakdown} />
            </ResultSection>

            <ResultSection>
              <ScenarioComparison
                scenarios={result.comparisonScenarios}
                selectedTier={qualityTier}
              />
            </ResultSection>

            <ResultSection>
              <Timeline phases={result.timeline.phases} totalDays={result.timeline.totalDays} />
            </ResultSection>

            <ResultSection>
              <HiddenCosts warnings={result.hiddenCostWarnings} />
            </ResultSection>

            <ResultSection>
              <SmartInsights
                insights={result.smartInsights}
                contingency={result.recommendedContingency}
              />
            </ResultSection>

            <ResultSection>
              <OptionalAdditions baseTotalMid={result.totalRange.mid} />
            </ResultSection>

          </div>

          {/* Partner / CTA — separate card */}
          <div className="mx-4 mt-4 mb-4">
            {partner ? (
              <PartnerCard partner={partner} onGetReport={openLeadForm} />
            ) : (
              <GenericPartnerCTA onGetReport={openLeadForm} />
            )}
          </div>

          <div className="text-center pb-10">
            <Link
              href="/plan"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Start a new estimate
            </Link>
          </div>

        </main>
      </div>

      <StickyCTA totalMid={result.totalRange.mid} onCTAClick={openLeadForm} />

      <LeadFormModal
        open={showLeadForm}
        onClose={() => setShowLeadForm(false)}
        onSuccess={handleSuccess}
        input={input}
        result={result}
        sourcePage="result"
      />

      {success && (
        <Modal open={true} onClose={() => setSuccess(null)} title="Report sent!">
          <SuccessState
            phone={success.phone}
            partnerMatched={success.partnerMatched}
            partnerName={success.partnerName}
            onClose={() => setSuccess(null)}
          />
        </Modal>
      )}
    </>
  );
}
