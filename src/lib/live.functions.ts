import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Live visitor tracking for the "Live Now" counter.
 *
 * Sessions are tracked in the `visitor_sessions` table:
 *   - session_id  : UUID generated on the client, kept in localStorage so all
 *                   tabs of the same browser share one session (no inflation).
 *   - last_active_at : bumped by a client heartbeat while the tab is open.
 *
 * A session counts as "live" while last_active_at is within ACTIVITY_TIMEOUT_MS.
 */

export const ACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
const MAX_SESSION_ID_LEN = 128;

function unwrapInput(input: any) {
  if (input && typeof input === "object" && "data" in input && input.data !== undefined) {
    return input.data;
  }
  return input ?? {};
}

/** Upsert one heartbeat row for a visitor session. */
export const pingVisitor = createServerFn({ method: "POST" })
  .inputValidator((input: any) =>
    z
      .object({
        sessionId: z.string().min(1).max(MAX_SESSION_ID_LEN),
      })
      .parse(unwrapInput(input)),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Try atomic RPC upsert first
    try {
      const { error: rpcErr } = await supabaseAdmin.rpc("upsert_visitor_session", {
        p_session_id: data.sessionId,
      });
      if (!rpcErr) return { ok: true };
    } catch {
      // Fallback
    }

    const { error: upErr } = await (supabaseAdmin
      .from("visitor_sessions") as any)
      .upsert(
        { session_id: data.sessionId, last_active_at: new Date().toISOString() },
        { onConflict: "session_id" },
      );
    if (upErr) throw new Error(upErr.message);
    return { ok: true };
  });

/** Count visitors whose heartbeat is within the active window. */
export const getLiveVisitorCount = createServerFn({ method: "GET" }).handler(async () => {
  const count = await countLive();
  return { count };
});

async function countLive(): Promise<number> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  // Lazy cleanup of obsolete sessions > 365 days
  try {
    await supabaseAdmin.rpc("cleanup_stale_visitor_sessions");
  } catch {
    // cleanup function may not exist yet on old deployments — ignore
  }

  const cutoff = new Date(Date.now() - ACTIVITY_TIMEOUT_MS).toISOString();
  const { count, error } = await supabaseAdmin
    .from("visitor_sessions")
    .select("session_id", { count: "exact", head: true })
    .gte("last_active_at", cutoff);
  if (error) throw new Error(error.message);
  return count ?? 0;
}
