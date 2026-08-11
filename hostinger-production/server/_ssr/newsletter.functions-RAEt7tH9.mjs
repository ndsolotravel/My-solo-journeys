import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn, b as getRequestHeader } from "./server-7Z2Wk8DL.mjs";
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
const subscribe_createServerFn_handler = createServerRpc({
  id: "47788b7666be982aca3ef5f15a2fcc6897f28fce0ebb29e9fb1da0ab79c42b13",
  name: "subscribe",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => subscribe.__executeServer(opts));
const subscribe = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  email: stringType().email()
}).parse(input)).handler(subscribe_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dke3QHTZ.mjs");
  const {
    error
  } = await supabaseAdmin.from("subscribers").insert({
    email: data.email.toLowerCase()
  });
  if (error && !error.message.includes("duplicate")) throw new Error(error.message);
  return {
    ok: true
  };
});
const contactSchema = objectType({
  name: stringType().trim().min(1).max(120),
  email: stringType().trim().email().max(320),
  subject: stringType().trim().max(200).optional().default(""),
  message: stringType().trim().min(1).max(5e3),
  // Honeypot — bots fill all fields; humans never see it
  website: stringType().max(0).optional().default("")
});
async function sha256(input) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
const sendContact_createServerFn_handler = createServerRpc({
  id: "ca369ea727ea5123aa5fee3fbc329cf735853eecfa76d8574d642a4ea46deb77",
  name: "sendContact",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => sendContact.__executeServer(opts));
const sendContact = createServerFn({
  method: "POST"
}).inputValidator((input) => contactSchema.parse(input)).handler(sendContact_createServerFn_handler, async ({
  data
}) => {
  if (data.website && data.website.length > 0) {
    return {
      ok: true
    };
  }
  const {
    supabaseAdmin
  } = await import("./client.server-Dke3QHTZ.mjs");
  const ip = getRequestHeader("cf-connecting-ip") || getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = await sha256(`ndsolo:${ip}`);
  const since = new Date(Date.now() - 10 * 60 * 1e3).toISOString();
  const {
    count
  } = await supabaseAdmin.from("contact_messages").select("id", {
    count: "exact",
    head: true
  }).eq("ip_hash", ipHash).gte("created_at", since);
  if ((count ?? 0) >= 3) {
    throw new Error("Too many messages. Please try again in a few minutes.");
  }
  const subject = data.subject?.trim() || null;
  const {
    error
  } = await supabaseAdmin.from("contact_messages").insert({
    name: data.name,
    email: data.email.toLowerCase(),
    subject,
    message: data.message,
    ip_hash: ipHash,
    status: "new"
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const sendContactReply_createServerFn_handler = createServerRpc({
  id: "2c4583f12bce21ae798f1680d431270090538471e946cd081e4b8d8460ec2b1a",
  name: "sendContactReply",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => sendContactReply.__executeServer(opts));
const sendContactReply = createServerFn({
  method: "POST"
}).handler(sendContactReply_createServerFn_handler, async () => ({
  ok: true
}));
export {
  sendContactReply_createServerFn_handler,
  sendContact_createServerFn_handler,
  subscribe_createServerFn_handler
};
