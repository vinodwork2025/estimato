"use client";

import { useState } from "react";

interface EmbedButtonProps {
  cityLabel: string;
  month: string;
  pageUrl: string;
}

export function EmbedButton({ cityLabel, month, pageUrl }: EmbedButtonProps) {
  const [citeState, setCiteState] = useState<"idle" | "copied">("idle");
  const [embedState, setEmbedState] = useState<"idle" | "copied">("idle");

  const citation = `Building material prices in ${cityLabel}, ${month}. Source: Estimato (estimato.in). ${pageUrl}`;
  const embedCode = `<iframe src="${pageUrl}" width="100%" height="640" style="border:1px solid #e2d8d4;border-radius:4px" title="Building material prices in ${cityLabel}" loading="lazy"></iframe>`;

  async function copy(text: string, setState: (s: "idle" | "copied") => void) {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
      setTimeout(() => setState("idle"), 2200);
    } catch {
      setState("idle");
    }
  }

  const btnBase: React.CSSProperties = {
    height: 36, padding: "0 16px", borderRadius: 2, cursor: "pointer",
    fontFamily: "monospace", fontSize: 11, textTransform: "uppercase",
    letterSpacing: "0.14em", transition: "all 150ms",
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      <button
        onClick={() => copy(citation, setCiteState)}
        style={{
          ...btnBase,
          background: citeState === "copied" ? "rgba(196,154,60,0.12)" : "transparent",
          border: "1px solid var(--accent)",
          color: "var(--accent)",
        }}
      >
        {citeState === "copied" ? "Copied!" : "Copy citation"}
      </button>
      <button
        onClick={() => copy(embedCode, setEmbedState)}
        style={{
          ...btnBase,
          background: embedState === "copied" ? "rgba(14,33,70,0.06)" : "transparent",
          border: "1px solid var(--border)",
          color: "var(--text-secondary)",
        }}
      >
        {embedState === "copied" ? "Copied!" : "Copy embed"}
      </button>
    </div>
  );
}
