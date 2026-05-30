import { NextResponse } from "next/server";
import { z } from "zod";
import React from "react";
import { createServerClient } from "@/lib/supabase/server";
import { generatePdfLimiter, getIP } from "@/lib/security/ratelimit";
import { ReportDocument } from "@/components/pdf/ReportDocument";

const RequestSchema = z.object({
  name: z.string().min(1).max(100),
  input: z
    .object({
      homeType: z.string(),
      city: z.string(),
      plot: z.record(z.unknown()),
      configuration: z.record(z.unknown()),
      qualityTier: z.string(),
      interiorLevel: z.string(),
    })
    .passthrough(),
  result: z
    .object({
      totalRange: z.object({ min: z.number(), max: z.number(), mid: z.number() }),
      costPerSqft: z.number(),
      timeline: z
        .object({ phases: z.array(z.unknown()), totalDays: z.number() })
        .passthrough(),
      breakdown: z.record(z.number()),
      hiddenCostWarnings: z.array(z.unknown()).default([]),
      smartInsights: z.array(z.unknown()).default([]),
      recommendedContingency: z.number().default(0),
      comparisonScenarios: z
        .object({
          basic: z.number(),
          standard: z.number(),
          premium: z.number(),
          luxury: z.number(),
        })
        .optional(),
      isCustomQuote: z.boolean().optional(),
    })
    .passthrough(),
});

export async function POST(request: Request) {
  const { success } = await generatePdfLimiter.limit(getIP(request));
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { name, input, result } = RequestSchema.parse(body);

    const { pdf } = await import("@react-pdf/renderer");

    const element = React.createElement(ReportDocument, {
      name,
      input: input as Parameters<typeof ReportDocument>[0]["input"],
      result: result as Parameters<typeof ReportDocument>[0]["result"],
    });

    // pdf() types expect DocumentProps root element; ReportDocument wraps Document internally
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await pdf(element as any).toBuffer();

    const supabase = createServerClient();
    const fileName = `report-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.pdf`;

    const { error } = await supabase.storage
      .from("reports")
      .upload(fileName, buffer, { contentType: "application/pdf", upsert: false });

    if (error) throw new Error(error.message);

    const {
      data: { publicUrl },
    } = supabase.storage.from("reports").getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: err.errors },
        { status: 400 }
      );
    }
    console.error("generate-pdf error:", err);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
