"use client";

import { useEffect, useState, createElement } from "react";
import { Button } from "@/components/ui/Button";
import { maskPhone } from "@/lib/utils";
import type { PlannerInput, CalculationResult } from "@/types";

interface SuccessStateProps {
  name: string;
  phone: string;
  partnerMatched: boolean;
  partnerName: string | null;
  input: Partial<PlannerInput>;
  result: CalculationResult;
  onClose: () => void;
}

export function SuccessState({ name, phone, partnerMatched, partnerName, input, result, onClose }: SuccessStateProps) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(onClose, 12000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const maskedPhone = `+91 ${maskPhone(phone)}`;

  async function handleDownloadPDF() {
    setPdfLoading(true);
    setPdfError(false);
    try {
      const [{ pdf }, { ReportDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/pdf/ReportDocument"),
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = await pdf(createElement(ReportDocument as any, { name, input, result })).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `estimato-report-${Date.now()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("[PDF download]", err);
      setPdfError(true);
    } finally {
      setPdfLoading(false);
    }
  }

  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D7D5A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17L4 12"/>
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-2">
        Report sent to your email!
      </h3>

      <p className="text-sm text-text-secondary mb-1">
        Check your inbox — the full report with cost breakdown, timeline, and alerts is there.
      </p>

      <p className="text-sm text-text-secondary mb-1">
        Also confirmed on <span className="font-mono font-medium text-text-primary tabular-nums">{maskedPhone}</span>
      </p>

      {partnerMatched && partnerName && (
        <p className="text-sm text-text-secondary mt-3 px-4">
          We have also shared your details with{" "}
          <span className="font-medium text-text-primary">{partnerName}</span>, a verified
          architect in your area. They will reach out within 24 hours.
        </p>
      )}

      {!partnerMatched && (
        <p className="text-sm text-text-secondary mt-3 px-4">
          We will connect you with a verified architect in your area as our partner network grows.
        </p>
      )}

      {pdfError && (
        <p className="text-xs text-error mt-2">PDF generation failed. Try again or check your email report.</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
        <Button
          variant="primary"
          loading={pdfLoading}
          onClick={handleDownloadPDF}
        >
          {pdfLoading ? "Generating PDF…" : "Download PDF"}
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Back to results
        </Button>
      </div>

      <p className="text-xs text-text-tertiary mt-4">Closes automatically</p>
    </div>
  );
}
