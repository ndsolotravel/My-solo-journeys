import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DFv8buKs.mjs";
import { assertEditor } from "./admin.functions-MvZQXaGD.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/ws.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createSsrRpc-BLJWJFkS.mjs";
import "./media-DKXRUyGU.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
const subscribe_createServerFn_handler = createServerRpc({
  id: "47788b7666be982aca3ef5f15a2fcc6897f28fce0ebb29e9fb1da0ab79c42b13",
  name: "subscribe",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => subscribe.__executeServer(opts));
const subscribe = createServerFn({
  method: "POST"
}).validator((input) => {
  const raw = input && typeof input === "object" && "data" in input ? input.data : input;
  const record = raw && typeof raw === "object" ? raw : {};
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const sessionId = typeof record.sessionId === "string" ? record.sessionId.trim() : "";
  return objectType({
    email: stringType().email("Please enter a valid email address."),
    sessionId: stringType().optional().default("")
  }).parse({
    email,
    sessionId
  });
}).handler(subscribe_createServerFn_handler, async ({
  data
}) => {
  const subscriberEmail = data.email.trim().toLowerCase();
  console.log(`[subscribe] Processing newsletter subscription for: <${subscriberEmail}>`);
  const {
    supabaseAdmin
  } = await import("./client.server-CVdEp4yu.mjs");
  let isNew = true;
  const {
    data: rpcRaw,
    error: dbError
  } = await supabaseAdmin.rpc("newsletter_subscribe", {
    p_email: subscriberEmail
  });
  const rpcData = rpcRaw;
  if (dbError) {
    console.warn(`[subscribe] newsletter_subscribe RPC error (${dbError.message}). Attempting direct insert fallback...`);
    const {
      data: insertRow,
      error: insertErr
    } = await supabaseAdmin.from("subscribers").insert({
      email: subscriberEmail,
      status: "active"
    }).select("id").maybeSingle();
    if (insertErr) {
      if (insertErr.code === "23505" || insertErr.message?.toLowerCase().includes("unique") || insertErr.message?.toLowerCase().includes("duplicate")) {
        console.log(`[subscribe] Fallback detected existing subscriber: <${subscriberEmail}>`);
        return {
          ok: true,
          created: false,
          alreadySubscribed: true,
          message: "You are already subscribed."
        };
      }
      console.error(`[subscribe] Direct insert fallback error: ${insertErr.message}`);
      throw new Error("Subscription could not be saved. Please try again later or email us directly at contact@ndsolotravel.com.");
    }
    insertRow?.id ?? null;
    isNew = true;
  } else {
    if (!rpcData?.id) {
      console.error(`[subscribe] Subscriber insert returned no id.`);
      throw new Error("Subscription could not be saved. Please try again later or email us directly at contact@ndsolotravel.com.");
    }
    rpcData.id;
    isNew = rpcData.created !== false;
  }
  if (data.sessionId) {
    try {
      const {
        error: linkErr
      } = await supabaseAdmin.rpc("upsert_visitor_session", {
        p_session_id: data.sessionId,
        p_subscriber_email: subscriberEmail
      });
      if (linkErr) {
        await supabaseAdmin.from("visitor_sessions").update({
          subscriber_email: subscriberEmail
        }).eq("session_id", data.sessionId);
      }
    } catch (err) {
      console.warn(`[subscribe] Could not link subscriber email to session <${data.sessionId}>:`, err);
    }
  }
  if (!isNew) {
    console.log(`[subscribe] Subscriber already exists in Supabase: <${subscriberEmail}>`);
    return {
      ok: true,
      created: false,
      alreadySubscribed: true,
      message: "You are already subscribed."
    };
  }
  console.log(`[subscribe] New subscriber record saved in Supabase: <${subscriberEmail}>`);
  return {
    ok: true,
    created: true,
    alreadySubscribed: false,
    message: "Subscribed. Welcome aboard."
  };
});
const adminListSubscribers_createServerFn_handler = createServerRpc({
  id: "720444115414c1dc4c9ac4ddd501401a50a0fce2886ec398bcb73b9ac5519a3f",
  name: "adminListSubscribers",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => adminListSubscribers.__executeServer(opts));
const adminListSubscribers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminListSubscribers_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-CVdEp4yu.mjs")).supabaseAdmin;
  const {
    data: fullData,
    error: fullError
  } = await client.from("subscribers").select("id, email, status, subscribed_at").order("subscribed_at", {
    ascending: false
  });
  if (!fullError && fullData) {
    return fullData.map((r) => ({
      id: r.id,
      email: r.email,
      status: r.status === "unsubscribed" ? "unsubscribed" : "active",
      subscribed_at: r.subscribed_at
    }));
  }
  const {
    data: basicData,
    error: basicError
  } = await client.from("subscribers").select("id, email, subscribed_at").order("subscribed_at", {
    ascending: false
  });
  if (basicError) throw new Error(basicError.message);
  return (basicData ?? []).map((r) => ({
    id: r.id,
    email: r.email,
    status: "active",
    subscribed_at: r.subscribed_at
  }));
});
const adminUpdateSubscriberStatus_createServerFn_handler = createServerRpc({
  id: "36147828ec7f00cb3fa62463e9b7c81359c52057f31406b51e60ec2e09cd0023",
  name: "adminUpdateSubscriberStatus",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => adminUpdateSubscriberStatus.__executeServer(opts));
const adminUpdateSubscriberStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => {
  const raw = input && typeof input === "object" && "data" in input ? input.data : input;
  return objectType({
    id: stringType().uuid(),
    status: enumType(["active", "unsubscribed"])
  }).parse(raw);
}).handler(adminUpdateSubscriberStatus_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-CVdEp4yu.mjs")).supabaseAdmin;
  const {
    error
  } = await client.from("subscribers").update({
    status: data.status
  }).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const adminDeleteSubscriber_createServerFn_handler = createServerRpc({
  id: "75c289fbf36a05cdded0534cf68c668e0d9e882b0f80347e2e9541902a86093e",
  name: "adminDeleteSubscriber",
  filename: "src/lib/newsletter.functions.ts"
}, (opts) => adminDeleteSubscriber.__executeServer(opts));
const adminDeleteSubscriber = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => {
  const raw = input && typeof input === "object" && "data" in input ? input.data : input;
  return objectType({
    id: stringType().uuid()
  }).parse(raw);
}).handler(adminDeleteSubscriber_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-CVdEp4yu.mjs")).supabaseAdmin;
  const {
    error
  } = await client.from("subscribers").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  adminDeleteSubscriber_createServerFn_handler,
  adminListSubscribers_createServerFn_handler,
  adminUpdateSubscriberStatus_createServerFn_handler,
  subscribe_createServerFn_handler
};
