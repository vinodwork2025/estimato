import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

const { data, error } = await supabase.storage.createBucket("reports", {
  public: true,
  fileSizeLimit: 5242880, // 5 MB
  allowedMimeTypes: ["application/pdf"],
});

if (error && !error.message.includes("already exists")) {
  console.error("Failed to create bucket:", error.message);
  process.exit(1);
}

console.log(error?.message?.includes("already exists")
  ? "Bucket 'reports' already exists — skipped."
  : "Bucket 'reports' created successfully."
);
