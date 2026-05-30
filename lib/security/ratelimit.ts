import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Limiter = { limit: (key: string) => Promise<{ success: boolean }> };

function passthrough(): Limiter {
  return { limit: async () => ({ success: true }) };
}

function buildLimiter(requests: number, window: Parameters<typeof Ratelimit.slidingWindow>[1]): Limiter {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return passthrough();
  }
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(requests, window),
    ephemeralCache: new Map(),
  });
}

export const calculateLimiter = buildLimiter(30, "1 m");
export const submitLeadLimiter = buildLimiter(5, "1 h");
export const uploadLimiter = buildLimiter(5, "1 h");
export const generatePdfLimiter = buildLimiter(5, "1 h");

export function getIP(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}
