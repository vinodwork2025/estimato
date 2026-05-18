"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatINRShort } from "@/lib/utils";

interface StickyCTAProps {
  totalMid: number;
  onCTAClick: () => void;
}

export function StickyCTA({ totalMid, onCTAClick }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border px-4 py-3 md:hidden"
      role="complementary"
      aria-label="Get your report"
    >
      <div className="flex items-center gap-3 max-w-2xl mx-auto">
        <div className="flex-1 min-w-0">
          <p className="label-arch mb-0.5">Your estimate</p>
          <p className="font-serif text-navy tabular-nums text-headline-sm truncate leading-none">
            {formatINRShort(totalMid)}
          </p>
        </div>
        <Button variant="primary" onClick={onCTAClick} className="shrink-0">
          Get PDF report
        </Button>
      </div>
    </div>
  );
}
