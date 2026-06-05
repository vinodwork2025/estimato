import { NextResponse } from "next/server";
import { createElement } from "react";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      name: string;
      input: Record<string, unknown>;
      result: Record<string, unknown>;
    };

    const { name, input, result } = body;
    if (!name || !input || !result) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Dynamic import — uses the browser build of react-pdf (via webpack browser alias).
    // Works on CF Workers (V8) and in the browser identically.
    const [{ pdf }, { ReportDocument }] = await Promise.all([
      import("@react-pdf/renderer"),
      import("@/components/pdf/ReportDocument"),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blob = await pdf(createElement(ReportDocument as any, { name, input, result })).toBlob();
    const arrayBuffer = await blob.arrayBuffer();

    // Validate PDF magic bytes before uploading
    const header = new Uint8Array(arrayBuffer.slice(0, 4));
    if (!(header[0] === 0x25 && header[1] === 0x50 && header[2] === 0x44 && header[3] === 0x46)) {
      throw new Error("Rendered output is not a valid PDF (bad magic bytes)");
    }

    const supabase = createServerClient();
    const fileName = `report-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.pdf`;

    // Auto-create bucket; safe to call even if it already exists
    await supabase.storage.createBucket("reports", {
      public: true,
      fileSizeLimit: 5 * 1024 * 1024,
      allowedMimeTypes: ["application/pdf"],
    }).catch(() => {/* already exists — continue */});

    const { error: uploadError } = await supabase.storage
      .from("reports")
      .upload(fileName, new Blob([arrayBuffer], { type: "application/pdf" }), {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) throw new Error(`Storage upload failed: ${uploadError.message}`);

    const { data: { publicUrl } } = supabase.storage.from("reports").getPublicUrl(fileName);

    return NextResponse.json({ pdfUrl: publicUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[generate-pdf]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
