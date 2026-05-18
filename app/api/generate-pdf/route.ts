import { NextResponse } from "next/server";
import { z } from "zod";

const GeneratePDFSchema = z.object({
  input: z.any(),
  result: z.any(),
  leadName: z.string().min(1),
  partner: z.any().nullable(),
  reportId: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = GeneratePDFSchema.parse(body);

    // Dynamic import to avoid SSR issues with @react-pdf/renderer
    const { renderToBuffer } = await import("@react-pdf/renderer");
    const { ReportTemplate } = await import("@/lib/pdf/ReportTemplate");
    const React = await import("react");

    const reportId = data.reportId ?? `EST-${Date.now()}`;
    const generatedDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const element = React.createElement(ReportTemplate, {
      input: data.input,
      result: data.result,
      leadName: data.leadName,
      partner: data.partner,
      reportId,
      generatedDate,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await renderToBuffer(element as any);

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="estimato-report-${reportId}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("generate-pdf error:", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
