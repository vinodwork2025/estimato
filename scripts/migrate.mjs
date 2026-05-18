import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);

// Split migration into individual statements and run via rpc
const sql = readFileSync(
  new URL("../supabase/migrations/001_initial.sql", import.meta.url),
  "utf-8"
);

// Use Supabase's pg endpoint via fetch (Management API is not available without mgmt token)
// Instead, run via the REST postgres endpoint
const res = await fetch(`${url}/rest/v1/rpc/exec_sql`, {
  method: "POST",
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ sql }),
});

if (!res.ok) {
  // exec_sql rpc may not exist — try alternative approach
  console.log("Direct RPC not available. Trying statement-by-statement...");

  // Split on semicolons and run individual queries via pg meta API
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  let errors = 0;
  for (const stmt of statements) {
    const r = await fetch(`${url}/rest/v1/`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ query: stmt }),
    });
    if (!r.ok) {
      const text = await r.text();
      if (!text.includes("already exists") && !text.includes("duplicate")) {
        console.error(`Statement failed: ${stmt.slice(0, 60)}...`);
        console.error(text);
        errors++;
      }
    }
  }

  if (errors === 0) {
    console.log("Migration complete (with some skipped existing objects).");
  } else {
    console.log(`Migration finished with ${errors} errors.`);
  }
} else {
  console.log("Migration complete.");
}
