import { c as createServerRpc } from "./createServerRpc-JqS14xvu.mjs";
import { h as createServerFn } from "./server-L180zLid.mjs";

import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";

import "../_libs/h3-v2.mjs";
import "../_libs/unenv.mjs";


import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";





import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
const ACTIVITY_TIMEOUT_MS = 5 * 60 * 1e3;
const MAX_SESSION_ID_LEN = 128;
const pingVisitor_createServerFn_handler = createServerRpc({
  id: "520baea3e7c2272f79b5ac53e6ed105f6eccae84814ffc3a8209d4dd1e873603",
  name: "pingVisitor",
  filename: "src/lib/live.functions.ts"
}, (opts) => pingVisitor.__executeServer(opts));
const pingVisitor = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  sessionId: stringType().min(1).max(MAX_SESSION_ID_LEN)
}).parse(input ?? {})).handler(pingVisitor_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D0LtTSQy.mjs");
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
async function countLive() {
  const {
    supabaseAdmin
  } = await import("./client.server-D0LtTSQy.mjs");
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
  getLiveVisitorCount_createServerFn_handler,
  pingVisitor_createServerFn_handler
};
