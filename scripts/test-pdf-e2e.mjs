/**
 * End-to-end test: PDF report generation → upload → lead submission → email
 * Run: NODE_TLS_REJECT_UNAUTHORIZED=0 node --env-file=.env.local scripts/test-pdf-e2e.mjs
 */

import { createClient } from "@supabase/supabase-js";

const BASE = "http://localhost:3000";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

function pass(msg) { console.log(`  ✓  ${msg}`); }
function fail(msg) { console.error(`  ✗  ${msg}`); process.exitCode = 1; }
function section(msg) { console.log(`\n── ${msg}`); }

// ─── Minimal valid PDF bytes ───────────────────────────────────────────────────
// A real (tiny) PDF — not empty, passes content-type check
const MINIMAL_PDF = Buffer.from(`%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R>>endobj
xref
0 4
0000000000 65535 f
0000000009 00000 n
0000000052 00000 n
0000000101 00000 n
trailer<</Size 4/Root 1 0 R>>
startxref
170
%%EOF`);

// ─── Test data ─────────────────────────────────────────────────────────────────
const TEST_LEAD = {
  name: "Test User",
  phone: "9876543210",
  countryCode: "+91",
  city: "hosur",
  area: "Bagalur",
  email: "vinod@optiscale360.com",
  planningTimeline: "within-3-months",
  consentToPartnerShare: false,
  calculationInput: {
    homeType: "villa",
    city: "hosur",
    area: "Bagalur",
    plot: { length: 40, width: 30, facing: "north", cornerPlot: false, roadWidth: 20, soilType: "red", slope: "flat" },
    configuration: { floors: 2, builtUpArea: 1500, parking: "covered", terrace: true, balconies: 2, lift: false, basement: false, homeOffice: false, rentalFloor: false },
    qualityTier: "standard",
    interiorLevel: "modular",
  },
  calculationResult: {
    totalRange: { min: 6800000, max: 8400000, mid: 7600000 },
    costPerSqft: 2100,
    timeline: {
      totalDays: 420,
      phases: [
        { name: "Foundation & Structure", durationDays: 90, cost: 2280000, paymentPercent: 30, description: "Excavation, foundation, columns, slabs" },
        { name: "Superstructure & Roof", durationDays: 120, cost: 2660000, paymentPercent: 35, description: "Walls, beams, roof slab, staircase" },
        { name: "MEP, Finishes & Elevation", durationDays: 120, cost: 1900000, paymentPercent: 25, description: "Electrical, plumbing, tiles, paint" },
        { name: "Interiors & Handover", durationDays: 90, cost: 760000, paymentPercent: 10, description: "Kitchen, wardrobes, fixtures" },
      ],
    },
    breakdown: {
      civilStructure: 3192000,
      finishes: 1444000,
      interiors: 912000,
      mep: 760000,
      elevation: 456000,
      approvalsAndFees: 304000,
      contingency: 532000,
    },
    hiddenCostWarnings: [
      { category: "approvals", title: "Soil testing required", message: "Red soil in Bagalur often has variable bearing capacity. A geotechnical report is advisable before finalising foundation design.", estimatedImpact: "₹1,50,000 to ₹4,00,000 if soil is problematic" },
    ],
    smartInsights: [
      { type: "opportunity", title: "Rental income potential", message: "A ground-floor unit or separate floor can earn ₹8,000 to ₹18,000 per month in Hosur." },
    ],
    recommendedContingency: 532000,
    comparisonScenarios: { basic: 5700000, standard: 7600000, premium: 10640000, luxury: 15200000 },
  },
};

// ─── Step 1: Upload PDF ────────────────────────────────────────────────────────
section("Step 1: Upload PDF to /api/upload-pdf");

const formData = new FormData();
formData.append("file", new Blob([MINIMAL_PDF], { type: "application/pdf" }), "report.pdf");

let pdfUrl;
try {
  const res = await fetch(`${BASE}/api/upload-pdf`, { method: "POST", body: formData });
  const json = await res.json();

  if (!res.ok || !json.url) {
    fail(`Upload failed (${res.status}): ${JSON.stringify(json)}`);
  } else {
    pdfUrl = json.url;
    pass(`PDF uploaded → ${pdfUrl}`);
  }
} catch (e) {
  fail(`Upload request failed: ${e.message}`);
}

// ─── Step 2: Verify file exists in Supabase Storage ───────────────────────────
section("Step 2: Verify file is accessible in Supabase Storage");

if (pdfUrl) {
  try {
    const res = await fetch(pdfUrl, { method: "HEAD" });
    if (res.ok) {
      pass(`Public URL returns ${res.status} · Content-Type: ${res.headers.get("content-type")}`);
    } else {
      fail(`File not accessible at URL (${res.status})`);
    }
  } catch (e) {
    fail(`HEAD request to storage URL failed: ${e.message}`);
  }
}

// ─── Step 3: Submit lead with pdfUrl ──────────────────────────────────────────
section("Step 3: Submit lead via /api/submit-lead");

let leadId;
try {
  const res = await fetch(`${BASE}/api/submit-lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...TEST_LEAD, pdfUrl }),
  });
  const json = await res.json();

  if (!res.ok) {
    fail(`Lead submission failed (${res.status}): ${JSON.stringify(json)}`);
  } else {
    leadId = json.leadId;
    pass(`Lead created · id=${leadId} · partnerMatched=${json.partnerMatched}`);
  }
} catch (e) {
  fail(`Submit-lead request failed: ${e.message}`);
}

// ─── Step 4: Verify lead in Supabase DB ───────────────────────────────────────
section("Step 4: Verify lead row in Supabase (pdf_url saved)");

if (leadId) {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("id, name, email, pdf_url, created_at")
      .eq("id", leadId)
      .single();

    if (error) {
      fail(`DB query failed: ${error.message}`);
    } else {
      pass(`Lead found: name=${data.name}, email=${data.email}`);
      if (data.pdf_url) {
        pass(`pdf_url saved: ${data.pdf_url}`);
      } else {
        fail("pdf_url is NULL in DB — not saved correctly");
      }
    }
  } catch (e) {
    fail(`DB verification failed: ${e.message}`);
  }
}

// ─── Step 5: Send report email ─────────────────────────────────────────────────
section("Step 5: Send report email via /api/send-report");

try {
  const res = await fetch(`${BASE}/api/send-report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      leadId,
      email: TEST_LEAD.email,
      name: TEST_LEAD.name,
      city: TEST_LEAD.city,
      homeType: TEST_LEAD.calculationInput.homeType,
      result: TEST_LEAD.calculationResult,
      partnerName: null,
      pdfUrl,
    }),
  });
  const json = await res.json();

  if (!res.ok || !json.success) {
    fail(`Email send failed (${res.status}): ${JSON.stringify(json)}`);
  } else {
    pass(`Email sent to ${TEST_LEAD.email} with PDF link`);
  }
} catch (e) {
  fail(`Send-report request failed: ${e.message}`);
}

// ─── Summary ───────────────────────────────────────────────────────────────────
section("Done");
if (process.exitCode === 1) {
  console.log("\n  One or more steps failed. See ✗ lines above.");
} else {
  console.log(`\n  All steps passed.`);
  console.log(`  PDF URL: ${pdfUrl ?? "none"}`);
  console.log(`  Check ${TEST_LEAD.email} for the email.`);
}
