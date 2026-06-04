export const runtime = 'edge';

import { NextResponse } from "next/server";
import type { CalculationResult } from "@/types";
import { buildReportEmailHtml, FROM_REPORTS } from "@/lib/email/report-html";

export async function POST(request: Request) {
  const secret = request.headers.get("x-internal-secret");
  if (!process.env.INTERNAL_API_SECRET || secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { email, name, city, homeType, result, partnerName, pdfUrl } = await request.json() as {
      leadId: string;
      email: string;
      name: string;
      city: string;
      homeType: string;
      result: CalculationResult;
      partnerName: string | null;
      pdfUrl?: string | null;
    };

    const subject = `Your home construction estimate is ready, ${name.split(" ")[0]}`;

    const { error: sendError } = await resend.emails.send({
      from: FROM_REPORTS,
      replyTo: "hello@estimato.in",
      to: email,
      subject,
      html: buildReportEmailHtml({ name, city, homeType, result, partnerName, pdfUrl }),
    });

    if (sendError) throw new Error(sendError.message);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-report error:", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
