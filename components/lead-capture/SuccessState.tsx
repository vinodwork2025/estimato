"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { maskPhone } from "@/lib/utils";

interface SuccessStateProps {
  phone: string;
  partnerMatched: boolean;
  partnerName: string | null;
  pdfUrl?: string;
  onClose: () => void;
}

export function SuccessState({ phone, partnerMatched, partnerName, pdfUrl, onClose }: SuccessStateProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 10000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const maskedPhone = `+91 ${maskPhone(phone)}`;

  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D7D5A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17L4 12"/>
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {pdfUrl ? "Report ready!" : "Your report is on its way!"}
      </h3>

      {pdfUrl ? (
        <p className="text-sm text-text-secondary mb-1">
          PDF sent to your email · also available below
        </p>
      ) : (
        <p className="text-sm text-text-secondary mb-1">
          Sent to <span className="font-medium text-text-primary tabular-nums">{maskedPhone}</span>
        </p>
      )}

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

      <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
        {pdfUrl && (
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primary">
              Download PDF report
            </Button>
          </a>
        )}
        <Button variant="ghost" onClick={onClose}>
          Back to results
        </Button>
      </div>

      <p className="text-xs text-text-tertiary mt-4">Closes automatically</p>
    </div>
  );
}
