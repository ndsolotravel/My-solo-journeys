import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const ACTIVITY_TIMEOUT_MS = 5 * 60 * 1e3;
const MAX_SESSION_ID_LEN = 128;
function unwrapInput(input) {
  if (input && typeof input === "object" && "data" in input && input.data !== void 0) {
    return input.data;
  }
  return input ?? {};
}
const pingVisitor_createServerFn_handler = createServerRpc({
  id: "520baea3e7c2272f79b5ac53e6ed105f6eccae84814ffc3a8209d4dd1e873603",
  name: "pingVisitor",
  filename: "src/lib/live.functions.ts"
}, (opts) => pingVisitor.__executeServer(opts));
const pingVisitor = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  sessionId: stringType().min(1).max(MAX_SESSION_ID_LEN)
}).parse(unwrapInput(input))).handler(pingVisitor_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dke3QHTZ.mjs");
  try {
    const {
      error: rpcErr
    } = await supabaseAdmin.rpc("upsert_visitor_session", {
      p_session_id: data.sessionId
    });
    if (!rpcErr) return {
      ok: true
    };
  } catch {
  }
  const {
    error: upErr
  } = await supabaseAdmin.from("visitor_sessions").upsert({
    session_id: data.sessionId,
    last_active_at: (/* @__PURE__ */ new Date()).toISOString()
  }, {
    onConflict: "session_id"
  });
  if (upErr) throw new Error(upErr.message);
  return {
    ok: true
  };
});
const getLiveVisitorCount_createServerFn_handler = createServerRpc({
  id: "ffc2428cef4d12b860fc080e49e0dd8562fbc2bf28349768bad7c39f124c82b2",
  name: "getLiveVisitorCount",
  filename: "src/lib/live.functions.ts"
}, (opts) => getLiveVisitorCount.__executeServer(opts));
const getLiveVisitorCount = createServerFn({
  method: "GET"
}).handler(getLiveVisitorCount_createServerFn_handler, async () => {
  const count = await countLive();
  return {
    count
  };
});
const getHitCounterStats_createServerFn_handler = createServerRpc({
  id: "9d766f447f59beab7bc389edb1368cf410c94a9894b90901399b613cc7e230be",
  name: "getHitCounterStats",
  filename: "src/lib/live.functions.ts"
}, (opts) => getHitCounterStats.__executeServer(opts));
const getHitCounterStats = createServerFn({
  method: "GET"
}).handler(getHitCounterStats_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dke3QHTZ.mjs");
  try {
    const {
      data,
      error
    } = await supabaseAdmin.rpc("get_public_hit_stats");
    if (!error && data) {
      const r = data;
      return {
        totalPageHits: Number(r.totalPageHits ?? 0),
        weeklyPageHits: Number(r.weeklyPageHits ?? 0),
        uniqueReaders: Number(r.uniqueReaders ?? 0),
        countries: Number(r.countries ?? 0),
        storiesRead: Number(r.storiesRead ?? 0),
        avgReadingMinutes: Number(r.avgReadingMinutes ?? 0)
      };
    }
  } catch {
  }
  const [sessionsRes, postsRes] = await Promise.all([supabaseAdmin.from("visitor_sessions").select("session_id", {
    count: "exact",
    head: true
  }), supabaseAdmin.from("posts").select("views, reading_minutes").eq("published", true)]);
  const posts = postsRes.data ?? [];
  const storiesRead = posts.reduce((sum, p) => sum + (p.views || 0), 0);
  const totalMins = posts.reduce((sum, p) => sum + (p.reading_minutes || 0), 0);
  const avgReadingMinutes = posts.length > 0 ? Math.round(totalMins / posts.length * 10) / 10 : 0;
  return {
    totalPageHits: 0,
    weeklyPageHits: 0,
    uniqueReaders: sessionsRes.count ?? 0,
    countries: 0,
    storiesRead,
    avgReadingMinutes
  };
});
async function countLive() {
  const {
    supabaseAdmin
  } = await import("./client.server-Dke3QHTZ.mjs");
  try {
    await supabaseAdmin.rpc("cleanup_stale_visitor_sessions");
  } catch {
  }
  const cutoff = new Date(Date.now() - ACTIVITY_TIMEOUT_MS).toISOString();
  const {
    count,
    error
  } = await supabaseAdmin.from("visitor_sessions").select("session_id", {
    count: "exact",
    head: true
  }).gte("last_active_at", cutoff);
  if (error) throw new Error(error.message);
  return count ?? 0;
}
export {
  getHitCounterStats_createServerFn_handler,
  getLiveVisitorCount_createServerFn_handler,
  pingVisitor_createServerFn_handler
};
