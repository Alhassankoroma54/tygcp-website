/**
 * Minimal in-memory rate limiter for the public form endpoints.
 *
 * HONEST LIMITATION: this uses a plain in-memory Map, which only works
 * within a single warm serverless function instance. On Vercel, concurrent
 * or cold-started instances each get their own empty map, so a determined
 * attacker spreading requests across instances is not fully stopped by this
 * alone. It DOES stop the common case (a script hammering one endpoint in a
 * tight loop) and costs nothing to run. For real production-grade rate
 * limiting shared across all instances, swap this for Vercel KV / Upstash
 * Redis (@upstash/ratelimit is the standard pairing) — the call site
 * (`checkRateLimit`) is already isolated to one function so that swap
 * touches one file, not every API route.
 */

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

type Bucket = { count: number; windowStart: number };
const buckets = new Map<string, Bucket>();

// Prevent unbounded memory growth in a long-lived warm instance.
const MAX_TRACKED_KEYS = 5000;

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now - existing.windowStart > WINDOW_MS) {
    if (buckets.size >= MAX_TRACKED_KEYS) buckets.clear();
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((existing.windowStart + WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  existing.count += 1;
  return { allowed: true };
}

/** Best-effort client identifier from standard proxy headers (Vercel sets x-forwarded-for). */
export function getClientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
