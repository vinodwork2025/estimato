import { NextResponse } from "next/server";
import { z } from "zod";
import { calculate } from "@/lib/cost-engine/calculate";
import { createServerClient } from "@/lib/supabase/server";

const PlannerInputSchema = z.object({
  homeType: z.enum(["villa","duplex","farmhouse","contemporary","budget","luxury-villa"]),
  city: z.string().min(1),
  area: z.string().optional(),
  pincode: z.string().optional(),
  plot: z.object({
    length: z.number().min(15).max(200),
    width: z.number().min(15).max(200),
    facing: z.enum(["north","south","east","west","north-east","north-west","south-east","south-west"]),
    cornerPlot: z.boolean(),
    roadWidth: z.number(),
    soilType: z.enum(["red","black-cotton","rocky","sandy","unknown"]),
    slope: z.enum(["flat","mild","steep"]),
  }),
  configuration: z.object({
    floors: z.number().min(1).max(4),
    builtUpArea: z.number().min(400).max(15000),
    parking: z.enum(["none","covered","stilt"]),
    terrace: z.boolean(),
    balconies: z.number().min(0).max(6),
    lift: z.boolean(),
    basement: z.boolean(),
    homeOffice: z.boolean(),
    rentalFloor: z.boolean(),
  }),
  qualityTier: z.enum(["essential","economy","premium","luxury"]),
  interiorLevel: z.enum(["basic","modular","premium","luxury-furnished"]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = PlannerInputSchema.parse(body);
    const result = calculate(input);

    // Log to calculations table (fire-and-forget, non-blocking)
    const supabase = createServerClient();
    const sessionId = request.headers.get("x-session-id") ?? undefined;
    supabase.from("calculations").insert({
      session_id: sessionId,
      input,
      result_total_mid: result.totalRange.mid,
      city: input.city,
      home_type: input.homeType,
      quality_tier: input.qualityTier,
    }).then(() => {});

    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: err.errors },
        { status: 400 }
      );
    }
    await logError("calculate", err);
    return NextResponse.json({ error: "Calculation failed" }, { status: 500 });
  }
}

async function logError(type: string, err: unknown) {
  try {
    const supabase = createServerClient();
    await supabase.from("errors").insert({
      error_type: type,
      message: err instanceof Error ? err.message : String(err),
    });
  } catch {}
}
