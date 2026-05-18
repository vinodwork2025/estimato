import type { Metadata } from "next";
import { ResultsClient } from "./ResultsClient";

export const metadata: Metadata = {
  title: "Your home construction estimate",
  description: "See your detailed cost breakdown, timeline, and smart insights for your home build.",
  robots: { index: false, follow: false },
};

export default function ResultPage() {
  return <ResultsClient />;
}
