import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, l as literalType, n as numberType } from "../_libs/zod.mjs";
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
const listComments_createServerFn_handler = createServerRpc({
  id: "e05065f3f864b75b292013ba6e01d735d76d87baf4e603ece55e3804c242b6ec",
  name: "listComments",
  filename: "src/lib/comments.functions.ts"
}, (opts) => listComments.__executeServer(opts));
const listComments = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  post_id: stringType().uuid()
}).parse(input)).handler(listComments_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dg1wI_zl.mjs");
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("comments").select("id,post_id,user_id,comment,created_at,guest_name,rating").eq("post_id", data.post_id).order("created_at", {
    ascending: false
  }).limit(200);
  if (error) throw new Error(error.message);
  const userIds = Array.from(new Set((rows ?? []).map((r) => r.user_id).filter((v) => !!v)));
  const profiles = {};
  if (userIds.length) {
    const {
      data: profs
    } = await supabaseAdmin.from("profiles").select("id,username,avatar_url").in("id", userIds);
    for (const p of profs ?? []) profiles[p.id] = {
      username: p.username,
      avatar_url: p.avatar_url
    };
  }
  return (rows ?? []).map((r) => ({
    ...r,
    author: r.user_id ? profiles[r.user_id] ?? null : null
  }));
});
const getPostRatingStats_createServerFn_handler = createServerRpc({
  id: "a6a6adde10821551428be57d40d9e74be905929206d6fd8e4e91a2b9fdcdd3c8",
  name: "getPostRatingStats",
  filename: "src/lib/comments.functions.ts"
}, (opts) => getPostRatingStats.__executeServer(opts));
const getPostRatingStats = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  post_id: stringType().uuid()
}).parse(input)).handler(getPostRatingStats_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dg1wI_zl.mjs");
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("comments").select("rating").eq("post_id", data.post_id).not("rating", "is", null);
  if (error) throw new Error(error.message);
  const ratings = (rows ?? []).map((r) => r.rating);
  const count = ratings.length;
  const avg = count ? ratings.reduce((a, b) => a + b, 0) / count : 0;
  return {
    count,
    average: Math.round(avg * 10) / 10
  };
});
const recentSubmissions = /* @__PURE__ */ new Map();
const postComment_createServerFn_handler = createServerRpc({
  id: "5556f169e10001dd308be5a06d5fcbf749b723ef2e2bb12b2381202346e8276b",
  name: "postComment",
  filename: "src/lib/comments.functions.ts"
}, (opts) => postComment.__executeServer(opts));
const postComment = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  post_id: stringType().uuid(),
  comment: stringType().trim().min(1).max(2e3),
  guest_name: stringType().trim().min(1).max(80).optional(),
  guest_email: stringType().trim().email().max(255).optional().or(literalType("")),
  rating: numberType().int().min(1).max(5).optional(),
  // honeypot — must be empty
  website: stringType().max(0).optional().or(literalType(""))
}).parse(input)).handler(postComment_createServerFn_handler, async ({
  data
}) => {
  if (data.website) return {
    ok: true
  };
  const {
    getRequestIP
  } = await import("./server-7Z2Wk8DL.mjs").then(function(n) {
    return n.s;
  });
  let ip = "unknown";
  try {
    ip = getRequestIP({
      xForwardedFor: true
    }) ?? "unknown";
  } catch {
  }
  const key = `${ip}:${data.post_id}:${data.comment}`;
  const now = Date.now();
  for (const [k, t] of recentSubmissions) {
    if (now - t > 6e4) recentSubmissions.delete(k);
  }
  if (recentSubmissions.has(key)) {
    throw new Error("Duplicate submission. Please wait before posting again.");
  }
  recentSubmissions.set(key, now);
  const {
    supabaseAdmin
  } = await import("./client.server-Dg1wI_zl.mjs");
  const {
    error
  } = await supabaseAdmin.from("comments").insert({
    post_id: data.post_id,
    user_id: null,
    comment: data.comment,
    guest_name: data.guest_name?.trim() || "Anonymous",
    guest_email: data.guest_email || null,
    rating: data.rating ?? null
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  getPostRatingStats_createServerFn_handler,
  listComments_createServerFn_handler,
  postComment_createServerFn_handler
};
