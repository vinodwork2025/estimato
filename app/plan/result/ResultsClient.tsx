"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlannerStore } from "@/lib/store/planner-store";
import { ResultCover } from "@/components/results/ResultCover";
import { EstimateReveal } from "@/components/results/EstimateReveal";
import { CostBreakdown } from "@/components/results/CostBreakdown";
import { Timeline } from "@/components/results/Timeline";
import { LifestyleFrame } from "@/components/results/LifestyleFrame";
import { AdvisoryNotes } from "@/components/results/AdvisoryNotes";
import { LeadFormModal } from "@/components/lead-capture/LeadFormModal";
import { SuccessState } from "@/components/lead-capture/SuccessState";
import { Modal } from "@/components/ui/Modal";
import { EstimateLogo } from "@/components/shared/EstimateLogo";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics/events";
import { CTA } from "@/lib/copy";
import Link from "next/link";

type SuccessData = { partnerMatched: boolean; partnerName: string | null; phone: string };

export function ResultsClient() {
  const router = useRouter();
  const { result, input } = usePlannerStore();
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
  const builtUpArea = input.configuration?.builtUpArea ?? 0;

  return (
    <>
      <div className="min-h-screen bg-bg-primary">

        {/* Minimal nav */}
        <header className="border-b border-border px-6 md:px-12 py-4 sticky top-0 z-30 bg-bg-primary">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" aria-label="Estimato home">
              <EstimateLogo size="sm" variant="mark" />
            </Link>
            <Link
              href="/plan"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary hover:text-text-secondary transition-colors"
            >
              New estimate
            </Link>
          </div>
        </header>

        <main>
          {/* Section 1 */}
          <ResultCover input={input} />

          {/* Section 2 */}
          <EstimateReveal result={result} input={input} />

          {/* Section 3 */}
          <CostBreakdown breakdown={result.breakdown} />

          {/* Section 4 */}
          <Timeline phases={result.timeline.phases} totalDays={result.timeline.totalDays} />

          {/* Section 5 */}
          <LifestyleFrame
            scenarios={result.comparisonScenarios}
            selectedTier={qualityTier}
            builtUpArea={builtUpArea}
          />

          {/* Section 6 */}
          <AdvisoryNotes
            insights={result.smartInsights}
            contingency={result.recommendedContingency}
            input={input}
          />

          {/* Footer action */}
          <section
            className="px-6 md:px-12 py-[96px] md:py-[160px] border-t border-border"
            aria-labelledby="footer-cta-heading"
          >
            <div className="max-w-6xl mx-auto">
              <h2
                id="footer-cta-heading"
                className="font-serif text-text-primary mb-6"
                style={{
                  fontSize: "clamp(24px, 3.5vw, 28px)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  maxWidth: "24ch",
                }}
              >
                Continue your build with the right partner.
              </h2>
              <p
                className="text-text-secondary leading-relaxed mb-10"
                style={{ fontSize: "16px", maxWidth: "52ch" }}
              >
                Estimato connects homeowners with vetted architects and contractors
                who have delivered at your chosen specification level. One introduction.
                No obligation.
              </p>
              <Button variant="primary" size="lg" onClick={openLeadForm}>
                {CTA.requestIntro}
              </Button>

              <div className="mt-16 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
                <Link
                  href="/plan"
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary hover:text-text-secondary transition-colors"
                >
                  Start a new estimate
                </Link>
                <Link
                  href="/methodology"
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary hover:text-text-secondary transition-colors"
                >
                  Read the methodology
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>

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
