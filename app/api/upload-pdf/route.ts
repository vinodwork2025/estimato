export const runtime = "edge";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Missing or invalid file" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 413 });
    }

    const supabase = createServerClient();
    const fileName = `report-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.pdf`;

    const { error } = await supabase.storage
      .from("reports")
      .upload(fileName, file, { contentType: "application/pdf", upsert: false });

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
