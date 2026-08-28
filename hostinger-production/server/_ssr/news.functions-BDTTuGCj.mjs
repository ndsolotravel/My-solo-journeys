import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import { a as assertEditor } from "./admin.functions-67-zmleM.mjs";
import { r as resolveMediaUrl } from "./media-fm7scLsn.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/ws.mjs";
import { o as objectType, s as stringType, n as numberType, b as booleanType, e as enumType, u as unionType } from "../_libs/zod.mjs";
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
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
const slugifyNews = (s) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
const NEWS_SELECT_COLS = "id,title,slug,summary,content,image_url,status,is_breaking,is_active,display_order,published_at,expires_at,created_at,updated_at";
const listActiveBreakingNews_createServerFn_handler = createServerRpc({
  id: "486857c8379099907b55d46ffdf446e4a695401a89b8881496b2b96cab631c1a",
  name: "listActiveBreakingNews",
  filename: "src/lib/news.functions.ts"
}, (opts) => listActiveBreakingNews.__executeServer(opts));
const listActiveBreakingNews = createServerFn({
  method: "GET"
}).handler(listActiveBreakingNews_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dg1wI_zl.mjs");
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const {
    data,
    error
  } = await supabaseAdmin.from("news").select(NEWS_SELECT_COLS).eq("status", "published").eq("is_active", true).eq("is_breaking", true).lte("published_at", now).or(`expires_at.is.null,expires_at.gte.${now}`).order("display_order", {
    ascending: true
  }).order("published_at", {
    ascending: false
  });
  if (error) {
    console.error("[listActiveBreakingNews] Error fetching breaking news:", error);
    return [];
  }
  const items = (data ?? []).map((row) => ({
    ...row,
    image_url: row.image_url ? resolveMediaUrl(row.image_url, supabaseAdmin) : null
  }));
  return items;
});
const getNewsBySlug_createServerFn_handler = createServerRpc({
  id: "61a9150fa218b72ed0c6bb9ad2f4443dcd173e369c003c759c6b9c53413600a1",
  name: "getNewsBySlug",
  filename: "src/lib/news.functions.ts"
}, (opts) => getNewsBySlug.__executeServer(opts));
const getNewsBySlug = createServerFn({
  method: "GET"
}).validator((i) => objectType({
  slug: stringType().min(1)
}).parse(i)).handler(getNewsBySlug_createServerFn_handler, async ({
  data: input
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dg1wI_zl.mjs");
  (/* @__PURE__ */ new Date()).toISOString();
  const {
    data,
    error
  } = await supabaseAdmin.from("news").select(NEWS_SELECT_COLS).eq("slug", input.slug.trim().toLowerCase()).maybeSingle();
  if (error || !data) {
    return null;
  }
  const isPublished = data.status === "published";
  const isActive = data.is_active;
  const isPastPublish = new Date(data.published_at).getTime() <= Date.now();
  const notExpired = !data.expires_at || new Date(data.expires_at).getTime() >= Date.now();
  if (!isPublished || !isActive || !isPastPublish || !notExpired) {
    return null;
  }
  return {
    ...data,
    image_url: data.image_url ? resolveMediaUrl(data.image_url, supabaseAdmin) : null
  };
});
const adminListNews_createServerFn_handler = createServerRpc({
  id: "584ce841751771fbef6119f99552b491ccebe94a948e7f3bed85100b354de852",
  name: "adminListNews",
  filename: "src/lib/news.functions.ts"
}, (opts) => adminListNews.__executeServer(opts));
const adminListNews = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminListNews_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data,
    error
  } = await client.from("news").select(NEWS_SELECT_COLS).order("created_at", {
    ascending: false
  });
  if (error) {
    throw new Error(error.message);
  }
  const items = (data ?? []).map((row) => ({
    ...row,
    image_url: row.image_url ? resolveMediaUrl(row.image_url, client) : null
  }));
  return items;
});
const adminGetNews_createServerFn_handler = createServerRpc({
  id: "b56f884a287c0306c0fb06adf8aaa620bbe1bb3b1901cc25d9178aa8d506afd7",
  name: "adminGetNews",
  filename: "src/lib/news.functions.ts"
}, (opts) => adminGetNews.__executeServer(opts));
const adminGetNews = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(adminGetNews_createServerFn_handler, async ({
  context,
  data: input
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data,
    error
  } = await client.from("news").select(NEWS_SELECT_COLS).eq("id", input.id).single();
  if (error) {
    throw new Error(error.message);
  }
  return {
    ...data,
    image_url: data.image_url ? resolveMediaUrl(data.image_url, client) : null
  };
});
const adminUpsertNews_createServerFn_handler = createServerRpc({
  id: "48e2a0283115b28497c09e9e66c78ce0455d953cb099457800b4d638580447e3",
  name: "adminUpsertNews",
  filename: "src/lib/news.functions.ts"
}, (opts) => adminUpsertNews.__executeServer(opts));
const adminUpsertNews = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid().optional(),
  title: stringType().min(1, "Headline / Title is required"),
  slug: stringType().optional(),
  summary: stringType().nullable().optional(),
  content: stringType().optional(),
  image_url: stringType().nullable().optional(),
  status: enumType(["draft", "published"]).default("draft"),
  is_breaking: booleanType().default(true),
  is_active: booleanType().default(true),
  display_order: numberType().int().default(0),
  published_at: stringType().optional(),
  expires_at: stringType().nullable().optional()
}).parse(i)).handler(adminUpsertNews_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const cleanTitle = data.title.trim();
  let cleanSlug = slugifyNews(data.slug || cleanTitle);
  if (!cleanSlug) {
    cleanSlug = `news-${Date.now()}`;
  }
  const pubDate = data.published_at ? new Date(data.published_at).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
  const expDate = data.expires_at ? new Date(data.expires_at).toISOString() : null;
  const payload = {
    title: cleanTitle,
    slug: cleanSlug,
    summary: data.summary ? data.summary.trim() : null,
    content: data.content || "",
    image_url: data.image_url ? data.image_url.trim() : null,
    status: data.status,
    is_breaking: !!data.is_breaking,
    is_active: !!data.is_active,
    display_order: Number(data.display_order) || 0,
    published_at: pubDate,
    expires_at: expDate,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (data.id) {
    const {
      data: updated,
      error
    } = await client.from("news").update(payload).eq("id", data.id).select().single();
    if (error) {
      if (error.code === "23505") {
        throw new Error(`The slug "${cleanSlug}" is already in use by another news item. Please use a unique slug.`);
      }
      throw new Error(error.message);
    }
    return updated;
  } else {
    payload.created_at = (/* @__PURE__ */ new Date()).toISOString();
    const {
      data: created,
      error
    } = await client.from("news").insert(payload).select().single();
    if (error) {
      if (error.code === "23505") {
        throw new Error(`The slug "${cleanSlug}" is already in use. Please choose a different title or custom slug.`);
      }
      throw new Error(error.message);
    }
    return created;
  }
});
const adminDeleteNews_createServerFn_handler = createServerRpc({
  id: "b6826ab77e000899a4d100302815e39fd62a663f61924c668747fd79f74de277",
  name: "adminDeleteNews",
  filename: "src/lib/news.functions.ts"
}, (opts) => adminDeleteNews.__executeServer(opts));
const adminDeleteNews = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(adminDeleteNews_createServerFn_handler, async ({
  context,
  data: input
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    error
  } = await client.from("news").delete().eq("id", input.id);
  if (error) {
    throw new Error(error.message);
  }
  return {
    ok: true,
    id: input.id
  };
});
const adminToggleNewsField_createServerFn_handler = createServerRpc({
  id: "6b29b55bfd05b4cb01529beef06ba2ff9b94857498899a07140b95ba7889c19f",
  name: "adminToggleNewsField",
  filename: "src/lib/news.functions.ts"
}, (opts) => adminToggleNewsField.__executeServer(opts));
const adminToggleNewsField = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid(),
  field: enumType(["status", "is_breaking", "is_active"]),
  value: unionType([booleanType(), enumType(["draft", "published"])])
}).parse(i)).handler(adminToggleNewsField_createServerFn_handler, async ({
  context,
  data: input
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data: updated,
    error
  } = await client.from("news").update({
    [input.field]: input.value,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", input.id).select().single();
  if (error) {
    throw new Error(error.message);
  }
  return updated;
});
export {
  adminDeleteNews_createServerFn_handler,
  adminGetNews_createServerFn_handler,
  adminListNews_createServerFn_handler,
  adminToggleNewsField_createServerFn_handler,
  adminUpsertNews_createServerFn_handler,
  getNewsBySlug_createServerFn_handler,
  listActiveBreakingNews_createServerFn_handler
};
