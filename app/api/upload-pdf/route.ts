export const runtime = "edge";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { uploadLimiter, getIP } from "@/lib/security/ratelimit";

const PDF_MAGIC = [0x25, 0x50, 0x44, 0x46]; // %PDF

export async function POST(request: Request) {
  const { success } = await uploadLimiter.limit(getIP(request));
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 413 });
    }

    // Validate real PDF magic bytes — not client-supplied MIME type
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    if (!PDF_MAGIC.every((b, i) => bytes[i] === b)) {
      return NextResponse.json({ error: "Invalid file format" }, { status: 400 });
    }

    const supabase = createServerClient();
    const fileName = `report-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.pdf`;
    const pdfBlob = new Blob([arrayBuffer], { type: "application/pdf" });

    const { error } = await supabase.storage
      .from("reports")
      .upload(fileName, pdfBlob, { contentType: "application/pdf", upsert: false });

    if (error) throw new Error(error.message);

    const { data: { publicUrl } } = supabase.storage
      .from("reports")
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error("upload-pdf error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
