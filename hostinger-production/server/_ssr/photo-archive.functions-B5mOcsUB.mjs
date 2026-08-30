import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import { a as assertEditor } from "./admin.functions-OVCuV9an.mjs";
import { r as resolveMediaUrl, e as extractBlogMediaPath } from "./media-DUkNwMwq.mjs";
import { s as slugify } from "./categories.functions-D00H7s-R.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/ws.mjs";
import { o as objectType, s as stringType, b as booleanType, n as numberType, a as arrayType } from "../_libs/zod.mjs";
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
const DEFAULT_PHOTO_SELECT = "id,title,slug,image_url,location,captured_at,story,camera,alt_text,width,height,published,sort_order,created_at";
function isPublishedPhotoRow(row) {
  return row.published !== false;
}
function mapPhotoRow(row, _categoriesById, client) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    image_url: resolveMediaUrl(row.image_url, client),
    location: row.location,
    captured_at: row.captured_at,
    story: row.story,
    camera: row.camera,
    alt_text: row.alt_text,
    categories: [],
    sort_order: row.sort_order,
    published: row.published
  };
}
async function loadPhotoArchiveData(client, opts = {}) {
  const [categoryResult, linkResult, photoResult] = await Promise.all([client.from("photo_categories").select("id,name,slug,description,image_url,display_order").order("display_order", {
    ascending: true
  }), client.from("photo_category_links").select("photo_id,category_id"), client.from("photos").select(DEFAULT_PHOTO_SELECT).order("sort_order", {
    ascending: true
  }).limit(800)]);
  const categories = (categoryResult.data ?? []).map((c) => ({
    ...c,
    image_url: c.image_url ? resolveMediaUrl(c.image_url, client) : null,
    photo_count: 0
  }));
  const catById = new Map(categories.map((c) => [c.id, c]));
  const catLinks = linkResult.data ?? [];
  const photosByPhotoId = /* @__PURE__ */ new Map();
  for (const row of photoResult.data ?? []) {
    if (!opts.includeUnpublished && row.published !== true) continue;
    const photo = mapPhotoRow(row, catById, client);
    photosByPhotoId.set(photo.id, photo);
    const countSet = /* @__PURE__ */ new Set();
    for (const link of catLinks) {
      if (link.photo_id !== photo.id) continue;
      const cat = catById.get(link.category_id);
      if (!cat || countSet.has(cat.id)) continue;
      countSet.add(cat.id);
      photo.categories.push({
        id: cat.id,
        name: cat.name,
        slug: cat.slug
      });
      cat.photo_count++;
    }
  }
  const orderedPhotos = [...photosByPhotoId.values()];
  let photos = orderedPhotos;
  if (opts.category && opts.category.trim()) {
    const want = opts.category.trim().toLowerCase();
    photos = photos.filter((p) => p.categories.some((c) => c.slug.toLowerCase() === want));
  }
  if (opts.q && opts.q.trim()) {
    const needle = opts.q.trim().toLowerCase();
    photos = photos.filter((p) => [p.title, p.location, p.story, p.alt_text, p.categories.map((c) => c.name).join(" ")].filter(Boolean).some((v) => v.toLowerCase().includes(needle)));
  }
  return {
    photos,
    categories
  };
}
const listPhotoArchive_createServerFn_handler = createServerRpc({
  id: "477f53872e7f74097d1fa91e6ad5d40dac65aeed83df8c36f4fd079c43c79773",
  name: "listPhotoArchive",
  filename: "src/lib/photo-archive.functions.ts"
}, (opts) => listPhotoArchive.__executeServer(opts));
const listPhotoArchive = createServerFn({
  method: "GET"
}).validator((input) => {
  const parsed = objectType({
    category: stringType().min(1).max(100).optional(),
    q: stringType().max(200).optional()
  }).catch({}).parse(input);
  return {
    category: parsed.category || void 0,
    q: parsed.q || void 0
  };
}).handler(listPhotoArchive_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dg1wI_zl.mjs");
  const {
    photos,
    categories
  } = await loadPhotoArchiveData(supabaseAdmin, data);
  return {
    photos,
    categories
  };
});
const listPhotoArchiveCategories_createServerFn_handler = createServerRpc({
  id: "ba70e233a1a340449b0a9c04f41d3bfa879520d9d9f43bb40082e415c13ddc54",
  name: "listPhotoArchiveCategories",
  filename: "src/lib/photo-archive.functions.ts"
}, (opts) => listPhotoArchiveCategories.__executeServer(opts));
const listPhotoArchiveCategories = createServerFn({
  method: "GET"
}).handler(listPhotoArchiveCategories_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dg1wI_zl.mjs");
  const {
    categories
  } = await loadPhotoArchiveData(supabaseAdmin);
  return categories;
});
const getPhotoArchiveItem_createServerFn_handler = createServerRpc({
  id: "b367243e57a421cc6fa8fd64d1952a4bf0595671d54415b13474edecf1b12e8b",
  name: "getPhotoArchiveItem",
  filename: "src/lib/photo-archive.functions.ts"
}, (opts) => getPhotoArchiveItem.__executeServer(opts));
const getPhotoArchiveItem = createServerFn({
  method: "GET"
}).validator((input) => objectType({
  slug: stringType().min(1).max(200)
}).parse(input)).handler(getPhotoArchiveItem_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dg1wI_zl.mjs");
  const client = supabaseAdmin;
  const [photoResult, categoryResult, linkResult, orderResult] = await Promise.all([client.from("photos").select(DEFAULT_PHOTO_SELECT).eq("slug", data.slug.toLowerCase().trim()).maybeSingle(), client.from("photo_categories").select("id,name,slug").order("display_order", {
    ascending: true
  }), client.from("photo_category_links").select("photo_id,category_id"), client.from("photos").select("id,slug,title,image_url").eq("published", true).order("sort_order", {
    ascending: true
  }).limit(800)]);
  const row = photoResult.data;
  if (!row || row.published === false) {
    return {
      photo: null,
      prev: null,
      next: null
    };
  }
  const catById = new Map((categoryResult.data ?? []).map((c) => [c.id, c]));
  const links = linkResult.data ?? [];
  const categories = links.filter((l) => l.photo_id === row.id).map((l) => catById.get(l.category_id)).filter(Boolean).map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug
  }));
  const photo = {
    id: row.id,
    slug: row.slug,
    title: row.title,
    image_url: resolveMediaUrl(row.image_url, client),
    location: row.location,
    captured_at: row.captured_at,
    story: row.story,
    camera: row.camera,
    alt_text: row.alt_text,
    categories,
    sort_order: row.sort_order,
    published: row.published
  };
  const ordered = (orderResult.data ?? []).filter(isPublishedPhotoRow);
  const idx = ordered.findIndex((p) => p.id === row.id);
  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;
  const toNavRef = (p) => ({
    slug: p.slug,
    title: p.title,
    image_url: resolveMediaUrl(p.image_url, client)
  });
  return {
    photo,
    prev: prev ? toNavRef(prev) : null,
    next: next ? toNavRef(next) : null
  };
});
const editorPhotoSchema = objectType({
  id: stringType().uuid().optional(),
  slug: stringType().min(1).max(200).optional(),
  title: stringType().min(1, "Photo title is required"),
  image_url: stringType().min(1),
  location: stringType().max(300).nullable().optional(),
  captured_at: stringType().max(20).nullable().optional(),
  story: stringType().max(5e3).nullable().optional(),
  camera: stringType().max(200).nullable().optional(),
  alt_text: stringType().min(1, "Alt text is required for every photograph"),
  category_ids: arrayType(stringType().uuid()).default([]),
  sort_order: numberType().int().default(0),
  published: booleanType().default(true)
});
const adminListPhotoArchiveEditor_createServerFn_handler = createServerRpc({
  id: "9d3815ba8d21ac288fade4d64664efa1a878b219163ce728f0835b6d4609a8ba",
  name: "adminListPhotoArchiveEditor",
  filename: "src/lib/photo-archive.functions.ts"
}, (opts) => adminListPhotoArchiveEditor.__executeServer(opts));
const adminListPhotoArchiveEditor = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminListPhotoArchiveEditor_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    photos,
    categories
  } = await loadPhotoArchiveData(client, {
    includeUnpublished: true
  });
  const editorPhotos = photos.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    image_url: p.image_url,
    location: p.location ?? "",
    captured_at: p.captured_at,
    story: p.story ?? "",
    camera: p.camera ?? "",
    alt_text: p.alt_text,
    category_ids: p.categories.map((c) => c.id),
    sort_order: p.sort_order,
    published: p.published
  }));
  return {
    photos: editorPhotos,
    categories
  };
});
const adminSavePhotoArchive_createServerFn_handler = createServerRpc({
  id: "f5f858d73d0f7d6f9650dfff1baaa30fd44f254b2d84009c5eeec3643eb99a0a",
  name: "adminSavePhotoArchive",
  filename: "src/lib/photo-archive.functions.ts"
}, (opts) => adminSavePhotoArchive.__executeServer(opts));
const adminSavePhotoArchive = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => objectType({
  photos: arrayType(editorPhotoSchema),
  deletedIds: arrayType(stringType().uuid()).default([])
}).parse(input)).handler(adminSavePhotoArchive_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data: existingRows
  } = await client.from("photos").select("id,slug,image_url");
  const existing = new Map((existingRows ?? []).map((r) => [r.id, r]));
  const usedSlugs = new Set((existingRows ?? []).map((r) => r.slug));
  const finalizeSlug = (title, preferred) => {
    let base = slugify(title);
    if (!base) base = "photo";
    let candidate = base;
    let n = 2;
    while (usedSlugs.has(candidate)) candidate = `${base}-${n++}`;
    usedSlugs.add(candidate);
    return candidate;
  };
  const removeStorageIfNeeded = async (oldUrl, keepUrl) => {
    if (!oldUrl || oldUrl === keepUrl) return;
    const path = extractBlogMediaPath(oldUrl);
    if (!path) return;
    try {
      await client.storage.from("blog-media").remove([path]);
    } catch (err) {
      console.warn("[adminSavePhotoArchive] Storage cleanup error:", err);
    }
  };
  const results = [];
  for (const photo of data.photos) {
    if (photo.id) {
      const prev = existing.get(photo.id);
      const nextSlug = photo.slug && photo.slug.trim() ? photo.slug.trim() : prev?.slug ?? finalizeSlug(photo.title);
      const {
        error: updateError
      } = await client.from("photos").update({
        title: photo.title,
        slug: nextSlug,
        image_url: photo.image_url,
        location: photo.location || null,
        captured_at: photo.captured_at || null,
        story: photo.story || null,
        camera: photo.camera || null,
        alt_text: photo.alt_text,
        published: photo.published,
        sort_order: photo.sort_order
      }).eq("id", photo.id);
      if (updateError) throw new Error(updateError.message);
      await removeStorageIfNeeded(prev?.image_url, photo.image_url);
      results.push({
        id: photo.id,
        slug: nextSlug
      });
    } else {
      const slug = finalizeSlug(photo.title);
      const {
        data: inserted,
        error: insertError
      } = await client.from("photos").insert({
        title: photo.title,
        slug,
        image_url: photo.image_url,
        location: photo.location || null,
        captured_at: photo.captured_at || null,
        story: photo.story || null,
        camera: photo.camera || null,
        alt_text: photo.alt_text,
        published: photo.published,
        sort_order: photo.sort_order
      }).select("id,slug").single();
      if (insertError) throw new Error(insertError.message);
      results.push({
        id: inserted.id,
        slug: inserted.slug
      });
    }
    const savedId = photo.id ?? results[results.length - 1].id;
    await client.from("photo_category_links").delete().eq("photo_id", savedId);
    if (photo.category_ids.length > 0) {
      const {
        error: linkError
      } = await client.from("photo_category_links").insert(photo.category_ids.map((category_id) => ({
        photo_id: savedId,
        category_id
      })));
      if (linkError) throw new Error(linkError.message);
    }
  }
  for (const id of data.deletedIds) {
    const row = existing.get(id);
    await client.from("photos").delete().eq("id", id);
    await removeStorageIfNeeded(row?.image_url);
  }
  return {
    ok: true,
    photos: results
  };
});
export {
  adminListPhotoArchiveEditor_createServerFn_handler,
  adminSavePhotoArchive_createServerFn_handler,
  getPhotoArchiveItem_createServerFn_handler,
  listPhotoArchiveCategories_createServerFn_handler,
  listPhotoArchive_createServerFn_handler
};
