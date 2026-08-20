import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/ws.mjs";
import { o as objectType, s as stringType, a as arrayType, n as numberType, b as booleanType, l as literalType, e as enumType } from "../_libs/zod.mjs";
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
async function assertEditor(userId, client) {
  let roles = [];
  if (client && typeof client.from === "function") {
    const {
      data
    } = await client.from("user_roles").select("role").eq("user_id", userId);
    if (data && data.length > 0) {
      roles = data.map((r) => r.role);
    }
  }
  if (roles.length === 0) {
    const {
      supabaseAdmin
    } = await import("./client.server-Dg1wI_zl.mjs");
    const {
      data: rows
    } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId);
    roles = (rows ?? []).map((r) => r.role);
  }
  if (!roles.includes("admin") && !roles.includes("editor")) {
    throw new Error("Forbidden");
  }
  return roles;
}
const getMyRoles_createServerFn_handler = createServerRpc({
  id: "bc043367e3258bc0750efadc2962d5983ded7a90f892e25e8da034f07aee469d",
  name: "getMyRoles",
  filename: "src/lib/admin.functions.ts"
}, (opts) => getMyRoles.__executeServer(opts));
const getMyRoles = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getMyRoles_createServerFn_handler, async ({
  context
}) => {
  let roles = [];
  if (context.supabase) {
    const {
      data
    } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId);
    if (data && data.length > 0) {
      roles = data.map((r) => r.role);
    }
  }
  if (roles.length === 0) {
    const {
      supabaseAdmin
    } = await import("./client.server-Dg1wI_zl.mjs");
    const {
      data
    } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId);
    if (data) {
      roles = data.map((r) => r.role);
    }
  }
  return roles;
});
const DEFAULT_SUPABASE_URL = "https://mqoybarqgzzvillignbr.supabase.co";
function resolveMediaUrl(urlOrPath, client) {
  if (!urlOrPath || typeof urlOrPath !== "string") return "";
  const trimmed = urlOrPath.trim();
  if (!trimmed) return "";
  if (trimmed.includes("drive.google.com")) {
    const fileIdMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return trimmed;
  }
  let cleanPath = trimmed.replace(/^\/+/, "");
  if (cleanPath.startsWith("blog-media/")) {
    cleanPath = cleanPath.slice("blog-media/".length);
  }
  if (client?.storage?.from) {
    try {
      const {
        data
      } = client.storage.from("blog-media").getPublicUrl(cleanPath);
      if (data?.publicUrl) return data.publicUrl;
    } catch {
    }
  }
  const baseUrl = (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL : "") || DEFAULT_SUPABASE_URL;
  return `${baseUrl.replace(/\/+$/, "")}/storage/v1/object/public/blog-media/${cleanPath}`;
}
function extractBlogMediaPath(url) {
  if (!url || typeof url !== "string") return null;
  try {
    const cleanUrl = url.split("?")[0].split("#")[0].trim();
    const marker = "/blog-media/";
    const markerIdx = cleanUrl.indexOf(marker);
    if (markerIdx !== -1) {
      const extracted = cleanUrl.slice(markerIdx + marker.length);
      return decodeURIComponent(extracted.replace(/^\/+/, ""));
    }
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://") && !cleanUrl.startsWith("data:") && !cleanUrl.startsWith("blob:")) {
      let path = cleanUrl.replace(/^\/+/, "");
      if (path.startsWith("blog-media/")) {
        path = path.slice("blog-media/".length);
      }
      return decodeURIComponent(path);
    }
  } catch (e) {
    console.warn("[extractBlogMediaPath] Failed to parse url:", url, e);
  }
  return null;
}
const BASE_POST_COLS = "id,title,slug,excerpt,content,cover_image,category,tags,featured,published,published_at,scheduled_at,reading_minutes,views,created_at,updated_at,author_name,location_name,latitude,longitude";
const POST_COLS = "id,title,slug,excerpt,content,cover_image,category,tags,featured,published,published_at,scheduled_at,reading_minutes,views,created_at,updated_at,destination_id,travel_date,location_name,latitude,longitude,seo_title,seo_description,og_image_url,author_name";
const adminListPosts_createServerFn_handler = createServerRpc({
  id: "c36083dfd2f49d453c7629b8a868d6b2b5a7c9fc0ff160379cfd2d3adcba24b4",
  name: "adminListPosts",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminListPosts.__executeServer(opts));
const adminListPosts = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminListPosts_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data: fullData,
    error: fullError
  } = await client.from("posts").select(`${POST_COLS},destinations(id,title,slug)`).order("created_at", {
    ascending: false
  });
  if (fullError) {
    const {
      data,
      error
    } = await client.from("posts").select(BASE_POST_COLS).order("created_at", {
      ascending: false
    });
    if (error) throw new Error(error.message);
    return data ?? [];
  }
  return fullData ?? [];
});
const adminGetPost_createServerFn_handler = createServerRpc({
  id: "39cc3b2fa50fed380c22addea0464b62e9c7ba06bba85ecf08a5487be7b1b408",
  name: "adminGetPost",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminGetPost.__executeServer(opts));
const adminGetPost = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(adminGetPost_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data: row,
    error
  } = await client.from("posts").select(`${POST_COLS},destinations(id,title,slug),post_gallery(id,image_url,alt_text,sort_order),post_translations(id,language_code,title,excerpt,content,seo_title,seo_description)`).eq("id", data.id).single();
  if (error) throw new Error(error.message);
  return row;
});
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
const adminUpsertPost_createServerFn_handler = createServerRpc({
  id: "ad25067aac02edfbbef739e707988bc188b8eedd0ff973f2468774a4919f719f",
  name: "adminUpsertPost",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminUpsertPost.__executeServer(opts));
const adminUpsertPost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid().optional(),
  title: stringType().min(1),
  slug: stringType().optional(),
  excerpt: stringType().optional(),
  content: stringType().optional(),
  cover_image: stringType().nullable().optional(),
  category: stringType().min(1),
  tags: arrayType(stringType()).default([]),
  featured: booleanType().default(false),
  published: booleanType().default(false),
  author_name: stringType().nullable().optional(),
  location_name: stringType().nullable().optional(),
  latitude: numberType().min(-90).max(90).nullable().optional(),
  longitude: numberType().min(-180).max(180).nullable().optional(),
  scheduled_at: stringType().nullable().optional(),
  destination_id: stringType().uuid().nullable().optional(),
  travel_date: stringType().nullable().optional(),
  seo_title: stringType().nullable().optional(),
  seo_description: stringType().nullable().optional(),
  og_image_url: stringType().nullable().optional(),
  gallery: arrayType(objectType({
    id: stringType().optional(),
    image_url: stringType().min(1),
    alt_text: stringType().nullable().optional(),
    sort_order: numberType().int().nonnegative().optional()
  })).optional()
}).parse(i)).handler(adminUpsertPost_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const slug = slugify(data.slug || data.title);
  const words = (data.content || "").trim().split(/\s+/).filter(Boolean).length;
  const reading_minutes = Math.max(1, Math.ceil(words / 200));
  const scheduledDate = data.scheduled_at ? new Date(data.scheduled_at) : null;
  const isScheduledFuture = scheduledDate && scheduledDate.getTime() > Date.now();
  const effectivePublished = isScheduledFuture ? false : !!data.published;
  const payload = {
    title: data.title.trim(),
    slug,
    excerpt: (data.excerpt || "").trim(),
    content: data.content || "",
    cover_image: data.cover_image || null,
    category: data.category,
    tags: data.tags,
    featured: !!data.featured,
    published: effectivePublished,
    scheduled_at: data.scheduled_at ? new Date(data.scheduled_at).toISOString() : null,
    reading_minutes,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (data.author_name !== void 0) {
    payload.author_name = data.author_name ? data.author_name.trim() : "Noman";
  }
  if (data.location_name !== void 0) {
    payload.location_name = data.location_name ? data.location_name.trim() : null;
  }
  if (data.latitude !== void 0) {
    payload.latitude = data.latitude !== null && !isNaN(data.latitude) ? data.latitude : null;
  }
  if (data.longitude !== void 0) {
    payload.longitude = data.longitude !== null && !isNaN(data.longitude) ? data.longitude : null;
  }
  if (data.destination_id !== void 0) {
    payload.destination_id = data.destination_id || null;
  }
  if (data.travel_date !== void 0) {
    payload.travel_date = data.travel_date || null;
  }
  if (data.seo_title !== void 0) {
    payload.seo_title = data.seo_title ? data.seo_title.trim() : null;
  }
  if (data.seo_description !== void 0) {
    payload.seo_description = data.seo_description ? data.seo_description.trim() : null;
  }
  if (data.og_image_url !== void 0) {
    payload.og_image_url = data.og_image_url || null;
  }
  if (effectivePublished) {
    payload.published_at = (/* @__PURE__ */ new Date()).toISOString();
  }
  let postRow = null;
  let postId = data.id;
  if (postId) {
    const {
      data: updated,
      error
    } = await client.from("posts").update(payload).eq("id", postId).select().single();
    if (error) throw new Error(error.message);
    postRow = updated;
  } else {
    payload.author_id = context.userId;
    const {
      data: inserted,
      error
    } = await client.from("posts").insert(payload).select().single();
    if (error) throw new Error(error.message);
    postRow = inserted;
    postId = inserted.id;
  }
  if (data.gallery !== void 0 && postId) {
    try {
      const {
        data: oldGallery
      } = await client.from("post_gallery").select("image_url").eq("post_id", postId);
      if (oldGallery && oldGallery.length > 0) {
        const newUrls = new Set(data.gallery.map((g) => g.image_url));
        const removedPaths = [];
        for (const old of oldGallery) {
          if (!newUrls.has(old.image_url)) {
            const path = extractBlogMediaPath(old.image_url);
            if (path && !removedPaths.includes(path)) {
              removedPaths.push(path);
            }
          }
        }
        if (removedPaths.length > 0) {
          try {
            await client.storage.from("blog-media").remove(removedPaths);
          } catch (storageCleanupErr) {
            console.warn("[adminUpsertPost] Storage cleanup error:", storageCleanupErr);
          }
        }
      }
    } catch (e) {
      console.warn("[adminUpsertPost] Could not inspect old gallery for storage cleanup:", e);
    }
    await client.from("post_gallery").delete().eq("post_id", postId);
    if (data.gallery.length > 0) {
      const galleryRows = data.gallery.map((g, idx) => ({
        post_id: postId,
        image_url: g.image_url,
        alt_text: g.alt_text || null,
        sort_order: g.sort_order ?? idx
      }));
      const {
        error: galErr
      } = await client.from("post_gallery").insert(galleryRows);
      if (galErr) throw new Error(galErr.message);
    }
  }
  return postRow;
});
const adminDeleteGalleryImage_createServerFn_handler = createServerRpc({
  id: "35a26a0d373d3402f12b62248b04295a44839f563a7aadf486bfec03bb13a626",
  name: "adminDeleteGalleryImage",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteGalleryImage.__executeServer(opts));
const adminDeleteGalleryImage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  postId: stringType().uuid().optional(),
  galleryId: stringType().optional(),
  imageUrl: stringType().min(1)
}).parse(i)).handler(adminDeleteGalleryImage_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  if (data.galleryId && !data.galleryId.startsWith("post-cover-") && !data.galleryId.startsWith("post-content-")) {
    const actualId = data.galleryId.startsWith("post-gal-") ? data.galleryId.replace("post-gal-", "") : data.galleryId;
    const {
      error: delErr
    } = await client.from("post_gallery").delete().eq("id", actualId);
    if (delErr) console.warn("[adminDeleteGalleryImage] Delete by ID error:", delErr);
  }
  if (data.postId) {
    const resolvedInput = resolveMediaUrl(data.imageUrl, client);
    const inputMedia = extractBlogMediaPath(data.imageUrl);
    const urlsToDelete = Array.from(new Set([data.imageUrl, resolvedInput, inputMedia].filter(Boolean)));
    for (const u of urlsToDelete) {
      await client.from("post_gallery").delete().eq("post_id", data.postId).eq("image_url", u);
    }
    const {
      data: post
    } = await client.from("posts").select("id, cover_image").eq("id", data.postId).maybeSingle();
    if (post && post.cover_image) {
      const resolvedCover = resolveMediaUrl(post.cover_image, client);
      const coverMedia = extractBlogMediaPath(post.cover_image);
      if (post.cover_image === data.imageUrl || resolvedCover && resolvedInput && resolvedCover === resolvedInput || coverMedia && inputMedia && coverMedia === inputMedia) {
        await client.from("posts").update({
          cover_image: null
        }).eq("id", data.postId);
      }
    }
  }
  const storagePath = extractBlogMediaPath(data.imageUrl);
  if (storagePath) {
    try {
      await client.storage.from("blog-media").remove([storagePath]);
    } catch (err) {
      console.warn("[adminDeleteGalleryImage] Storage cleanup warning:", err);
    }
  }
  return {
    ok: true
  };
});
function extractMarkdownImages(markdown) {
  if (!markdown || typeof markdown !== "string") return [];
  const results = [];
  const mdRegex = /!\[([^\]]*)\]\((https?:\/\/[^\s)]+|\/[^\s)]+|blog-media\/[^\s)]+)\)/g;
  let match;
  while ((match = mdRegex.exec(markdown)) !== null) {
    if (match[2]) {
      results.push({
        alt: match[1] || "",
        url: match[2]
      });
    }
  }
  return results;
}
const adminListGalleries_createServerFn_handler = createServerRpc({
  id: "4b7fc69aa39af6873d95485ed4e6c306bbd8d0d452062d731076390369fe6b59",
  name: "adminListGalleries",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminListGalleries.__executeServer(opts));
const adminListGalleries = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminListGalleries_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data: postsData,
    error: postsErr
  } = await client.from("posts").select("id, title, slug, content, cover_image, published, created_at, updated_at").order("updated_at", {
    ascending: false
  });
  if (postsErr) throw new Error(postsErr.message);
  const {
    data: allGallery,
    error: galErr
  } = await client.from("post_gallery").select("id, post_id, image_url, alt_text, sort_order, created_at").order("sort_order", {
    ascending: true
  });
  if (galErr) {
    console.warn("[adminListGalleries] Warning fetching post_gallery:", galErr);
  }
  const galleryByPostId = /* @__PURE__ */ new Map();
  (allGallery ?? []).forEach((g) => {
    const pid = g.post_id;
    if (pid) {
      if (!galleryByPostId.has(pid)) {
        galleryByPostId.set(pid, []);
      }
      galleryByPostId.get(pid).push(g);
    }
  });
  const posts = (postsData ?? []).map((p) => {
    const seenUrls = /* @__PURE__ */ new Set();
    const gallery = [];
    const addGalleryItem = (item, rawUrl) => {
      if (!rawUrl || typeof rawUrl !== "string") return;
      const cleanKey = rawUrl.trim().toLowerCase();
      if (seenUrls.has(cleanKey)) return;
      seenUrls.add(cleanKey);
      gallery.push(item);
    };
    const postGalList = galleryByPostId.get(p.id) ?? [];
    postGalList.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    for (const pg of postGalList) {
      if (pg.image_url && typeof pg.image_url === "string" && pg.image_url.trim()) {
        addGalleryItem({
          id: pg.id,
          post_id: p.id,
          image_url: resolveMediaUrl(pg.image_url, client),
          alt_text: pg.alt_text ?? p.title ?? "",
          sort_order: pg.sort_order ?? gallery.length,
          created_at: pg.created_at
        }, pg.image_url);
      }
    }
    if (p.cover_image && typeof p.cover_image === "string" && p.cover_image.trim()) {
      addGalleryItem({
        id: `post-cover-${p.id}`,
        post_id: p.id,
        image_url: resolveMediaUrl(p.cover_image, client),
        alt_text: p.title ?? "",
        sort_order: gallery.length,
        is_cover: true,
        created_at: p.created_at
      }, p.cover_image);
    }
    const contentImages = extractMarkdownImages(p.content);
    for (let i = 0; i < contentImages.length; i++) {
      const ci = contentImages[i];
      addGalleryItem({
        id: `post-content-${p.id}-${i}`,
        post_id: p.id,
        image_url: resolveMediaUrl(ci.url, client),
        alt_text: ci.alt || p.title || "",
        sort_order: gallery.length,
        created_at: p.created_at
      }, ci.url);
    }
    gallery.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      cover_image: resolveMediaUrl(p.cover_image, client),
      published: p.published,
      created_at: p.created_at,
      updated_at: p.updated_at,
      gallery,
      galleryCount: gallery.length
    };
  });
  return posts;
});
const adminSavePostGallery_createServerFn_handler = createServerRpc({
  id: "b0b73bd3a4810feefc0ceeb115307173606c2d95a2b18e268b2844b70c5bacef",
  name: "adminSavePostGallery",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminSavePostGallery.__executeServer(opts));
const adminSavePostGallery = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  postId: stringType().uuid(),
  gallery: arrayType(objectType({
    id: stringType().optional(),
    image_url: stringType().min(1),
    alt_text: stringType().nullable().optional(),
    sort_order: numberType().int().nonnegative().optional()
  }))
}).parse(i)).handler(adminSavePostGallery_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  try {
    const {
      data: oldGallery
    } = await client.from("post_gallery").select("image_url").eq("post_id", data.postId);
    if (oldGallery && oldGallery.length > 0) {
      const newUrls = new Set(data.gallery.map((g) => g.image_url));
      const removedPaths = [];
      for (const old of oldGallery) {
        if (!newUrls.has(old.image_url)) {
          const path = extractBlogMediaPath(old.image_url);
          if (path && !removedPaths.includes(path)) {
            removedPaths.push(path);
          }
        }
      }
      if (removedPaths.length > 0) {
        try {
          await client.storage.from("blog-media").remove(removedPaths);
        } catch (storageCleanupErr) {
          console.warn("[adminSavePostGallery] Storage cleanup error:", storageCleanupErr);
        }
      }
    }
  } catch (e) {
    console.warn("[adminSavePostGallery] Could not inspect old gallery:", e);
  }
  await client.from("post_gallery").delete().eq("post_id", data.postId);
  if (data.gallery.length > 0) {
    const rows = data.gallery.map((g, idx) => ({
      post_id: data.postId,
      image_url: g.image_url,
      alt_text: g.alt_text || null,
      sort_order: g.sort_order ?? idx
    }));
    const {
      error: insErr
    } = await client.from("post_gallery").insert(rows);
    if (insErr) throw new Error(insErr.message);
  }
  return {
    ok: true
  };
});
const adminDeletePost_createServerFn_handler = createServerRpc({
  id: "706974d253749a4b207ea9f45681167b7d9acb69ae04a29b711b2519d6b957f5",
  name: "adminDeletePost",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeletePost.__executeServer(opts));
const adminDeletePost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(adminDeletePost_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data: post,
    error: fetchError
  } = await client.from("posts").select("id, cover_image, og_image_url, post_gallery(image_url)").eq("id", data.id).maybeSingle();
  if (fetchError) {
    console.error("[adminDeletePost] Error locating post:", fetchError);
    throw new Error(fetchError.message || "Failed to locate post for deletion");
  }
  if (!post) {
    console.error("[adminDeletePost] Post not found or unauthorized:", data.id);
    throw new Error("Unable to delete this blog post: Post not found or permission denied.");
  }
  const storagePaths = [];
  const coverPath = extractBlogMediaPath(post.cover_image);
  if (coverPath) storagePaths.push(coverPath);
  const ogPath = extractBlogMediaPath(post.og_image_url);
  if (ogPath && !storagePaths.includes(ogPath)) storagePaths.push(ogPath);
  if (Array.isArray(post.post_gallery)) {
    for (const item of post.post_gallery) {
      const galPath = extractBlogMediaPath(item?.image_url);
      if (galPath && !storagePaths.includes(galPath)) {
        storagePaths.push(galPath);
      }
    }
  }
  if (storagePaths.length > 0) {
    try {
      const {
        error: storageErr
      } = await client.storage.from("blog-media").remove(storagePaths);
      if (storageErr) {
        console.warn("[adminDeletePost] Warning removing post storage files:", storageErr);
      }
    } catch (err) {
      console.warn("[adminDeletePost] Storage cleanup caught exception:", err);
    }
  }
  try {
    await client.from("post_gallery").delete().eq("post_id", data.id);
  } catch (galErr) {
    console.warn("[adminDeletePost] Warning cleaning post_gallery:", galErr);
  }
  const {
    data: deletedRows,
    error: deleteError
  } = await client.from("posts").delete().eq("id", data.id).select("id");
  if (deleteError) {
    console.error("[adminDeletePost] Supabase DELETE error:", deleteError);
    throw new Error(deleteError.message || "Unable to delete this blog post. Please try again.");
  }
  if (!deletedRows || deletedRows.length === 0) {
    console.error("[adminDeletePost] Zero rows affected during delete for post ID:", data.id);
    throw new Error("Unable to delete this blog post. The post was not found or deletion permission was denied.");
  }
  return {
    ok: true,
    id: data.id
  };
});
const adminTogglePublish_createServerFn_handler = createServerRpc({
  id: "4587620b23cd42114286fc00c107bde8089ec278c221ff7eebee1dec6af9875c",
  name: "adminTogglePublish",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminTogglePublish.__executeServer(opts));
const adminTogglePublish = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid(),
  published: booleanType()
}).parse(i)).handler(adminTogglePublish_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data: updated,
    error
  } = await client.from("posts").update({
    published: data.published,
    published_at: data.published ? (/* @__PURE__ */ new Date()).toISOString() : null,
    scheduled_at: data.published ? null : void 0
  }).eq("id", data.id).select("id");
  if (error) throw new Error(error.message);
  if (!updated || updated.length === 0) {
    throw new Error("Unable to update post status: Post not found or permission denied.");
  }
  return {
    ok: true
  };
});
const destInputSchema = objectType({
  id: stringType().uuid().optional(),
  title: stringType().trim().min(1).max(200),
  slug: stringType().trim().min(1).max(200).optional(),
  country: stringType().min(1).max(120),
  region: stringType().max(120).optional().nullable(),
  description: stringType().max(4e3).optional().nullable(),
  featured_image: stringType().url().optional().nullable().or(literalType("")),
  published: booleanType().default(true)
});
const adminListDestinations_createServerFn_handler = createServerRpc({
  id: "c8d7c18700bbea254b71d38c25a5baae5134ab94d54a719f78ce477f129a7854",
  name: "adminListDestinations",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminListDestinations.__executeServer(opts));
const adminListDestinations = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminListDestinations_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data,
    error
  } = await client.from("destinations").select("*").order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const adminUpsertDestination_createServerFn_handler = createServerRpc({
  id: "7d4026e9578e6fdf78470f8c8447b5536226df925c9d7afda40f0c5417bd2f77",
  name: "adminUpsertDestination",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminUpsertDestination.__executeServer(opts));
const adminUpsertDestination = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => destInputSchema.parse(i)).handler(adminUpsertDestination_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const slug = data.slug && data.slug.trim() || slugify(data.title);
  const payload = {
    title: data.title,
    slug,
    country: data.country,
    region: data.region || null,
    description: data.description || null,
    featured_image: data.featured_image || null,
    published: data.published
  };
  if (data.id) {
    const {
      error
    } = await client.from("destinations").update(payload).eq("id", data.id);
    if (error) throw new Error(error.message);
  } else {
    const {
      error
    } = await client.from("destinations").insert(payload);
    if (error) throw new Error(error.message);
  }
  return {
    ok: true
  };
});
const adminDeleteDestination_createServerFn_handler = createServerRpc({
  id: "22dbf5a0bd1aa4105a7bf3eff794bd8738e2b5fef5f61aec5d79f152ea65a351",
  name: "adminDeleteDestination",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteDestination.__executeServer(opts));
const adminDeleteDestination = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(adminDeleteDestination_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data: deleted,
    error
  } = await client.from("destinations").delete().eq("id", data.id).select("id");
  if (error) throw new Error(error.message);
  if (!deleted || deleted.length === 0) {
    throw new Error("Unable to delete destination: Not found or permission denied.");
  }
  return {
    ok: true
  };
});
const adminListComments_createServerFn_handler = createServerRpc({
  id: "041edda5bad3e8b83429c688f7fbe59e6c6dbe398445ee4624099f4b361b1a74",
  name: "adminListComments",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminListComments.__executeServer(opts));
const adminListComments = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminListComments_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data,
    error
  } = await client.from("comments").select("id,post_id,comment,guest_name,guest_email,rating,created_at,posts(title,slug)").order("created_at", {
    ascending: false
  }).limit(500);
  if (error) throw new Error(error.message);
  return data ?? [];
});
const adminDeleteComment_createServerFn_handler = createServerRpc({
  id: "6db5b19256028e899bf7983d6f88dd59c4706a4416ab35c9dfd77daf135aa118",
  name: "adminDeleteComment",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteComment.__executeServer(opts));
const adminDeleteComment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(adminDeleteComment_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data: deleted,
    error
  } = await client.from("comments").delete().eq("id", data.id).select("id");
  if (error) throw new Error(error.message);
  if (!deleted || deleted.length === 0) {
    throw new Error("Unable to delete comment: Not found or permission denied.");
  }
  return {
    ok: true
  };
});
const adminListMessages_createServerFn_handler = createServerRpc({
  id: "a93dcca664db7845b2d7a9b6c8f0b0f7cb52a62972f962422ce68f8dd2e3fd1e",
  name: "adminListMessages",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminListMessages.__executeServer(opts));
const adminListMessages = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminListMessages_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data: msgData,
    error: msgError
  } = await client.from("messages").select("id,name,email,subject,message,is_read,created_at").order("created_at", {
    ascending: false
  }).limit(500);
  if (!msgError && msgData) {
    return msgData.map((m) => ({
      ...m,
      is_read: Boolean(m.is_read),
      status: m.is_read ? "read" : "new"
    }));
  }
  const {
    data: cmData,
    error: cmError
  } = await client.from("contact_messages").select("id,name,email,subject,message,status,created_at").order("created_at", {
    ascending: false
  }).limit(500);
  if (cmError) throw new Error(cmError.message);
  return (cmData ?? []).map((m) => ({
    ...m,
    is_read: m.status === "read" || m.status === "replied",
    status: m.status || "new"
  }));
});
const adminUpdateMessageStatus_createServerFn_handler = createServerRpc({
  id: "373fbb90a7481a50b31f610c285b9e222e7b94cde4e0f85bb3942716793b8ca6",
  name: "adminUpdateMessageStatus",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminUpdateMessageStatus.__executeServer(opts));
const adminUpdateMessageStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid(),
  status: enumType(["new", "read", "replied"]).optional(),
  is_read: booleanType().optional()
}).parse(i)).handler(adminUpdateMessageStatus_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const isRead = typeof data.is_read === "boolean" ? data.is_read : data.status === "read" || data.status === "replied";
  const {
    error: msgErr
  } = await client.from("messages").update({
    is_read: isRead
  }).eq("id", data.id);
  if (data.status) {
    try {
      await client.from("contact_messages").update({
        status: data.status
      }).eq("id", data.id);
    } catch {
    }
  }
  if (msgErr) {
    const {
      error: cmErr
    } = await client.from("contact_messages").update({
      status: data.status || (isRead ? "read" : "new")
    }).eq("id", data.id);
    if (cmErr) throw new Error(msgErr.message);
  }
  return {
    ok: true
  };
});
const adminDeleteMessage_createServerFn_handler = createServerRpc({
  id: "8eec2cf3796c533b3105ae32ffff41f9d081738ea9252d35057f78d72160727a",
  name: "adminDeleteMessage",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteMessage.__executeServer(opts));
const adminDeleteMessage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(adminDeleteMessage_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    error: msgErr
  } = await client.from("messages").delete().eq("id", data.id);
  try {
    await client.from("contact_messages").delete().eq("id", data.id);
  } catch {
  }
  if (msgErr) {
    const {
      error: cmErr
    } = await client.from("contact_messages").delete().eq("id", data.id);
    if (cmErr) throw new Error(msgErr.message);
  }
  return {
    ok: true
  };
});
const adminAnalytics_createServerFn_handler = createServerRpc({
  id: "ad0c092d9068302d584e4ee6c929270ef251348f837bd3ea129892db963c741d",
  name: "adminAnalytics",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminAnalytics.__executeServer(opts));
const adminAnalytics = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminAnalytics_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const [posts, comments, subs, msgs, top] = await Promise.all([client.from("posts").select("id,published,scheduled_at,views", {
    count: "exact"
  }), client.from("comments").select("id,rating", {
    count: "exact",
    head: false
  }), client.from("subscribers").select("id", {
    count: "exact",
    head: true
  }), client.from("messages").select("id", {
    count: "exact",
    head: true
  }), client.from("posts").select("id,title,slug,views").eq("published", true).order("views", {
    ascending: false
  }).limit(5)]);
  const allPosts = posts.data ?? [];
  const ratings = (comments.data ?? []).map((c) => c.rating).filter((r) => !!r);
  const avgRating = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
  return {
    posts: posts.count ?? 0,
    published: allPosts.filter((p) => p.published).length,
    scheduled: allPosts.filter((p) => !p.published && p.scheduled_at).length,
    drafts: allPosts.filter((p) => !p.published && !p.scheduled_at).length,
    totalViews: allPosts.reduce((a, b) => a + (b.views ?? 0), 0),
    comments: comments.count ?? 0,
    avgRating: Math.round(avgRating * 10) / 10,
    subscribers: subs.count ?? 0,
    messages: msgs.count ?? 0,
    topPosts: top.data ?? []
  };
});
const adminUploadImage_createServerFn_handler = createServerRpc({
  id: "72eaf964ab7ce14d623874daf7be210de5431691ecf47076df88fef9c15ca3d3",
  name: "adminUploadImage",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminUploadImage.__executeServer(opts));
const adminUploadImage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  filename: stringType().min(1).max(200),
  contentType: stringType().min(1).max(100),
  base64: stringType().min(1)
}).parse(i)).handler(adminUploadImage_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  if (!data.contentType.startsWith("image/")) throw new Error("Only image uploads allowed");
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const buf = Buffer.from(data.base64, "base64");
  if (buf.byteLength > 8 * 1024 * 1024) throw new Error("Max 8 MB");
  const ext = (data.filename.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${context.userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bucketName = "blog-media";
  let {
    error
  } = await client.storage.from(bucketName).upload(path, buf, {
    contentType: data.contentType,
    upsert: false
  });
  if (error && error.message && error.message.toLowerCase().includes("bucket not found")) {
    try {
      const {
        error: createErr
      } = await client.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 8388608,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]
      });
      if (!createErr) {
        const retry = await client.storage.from(bucketName).upload(path, buf, {
          contentType: data.contentType,
          upsert: false
        });
        error = retry.error;
      }
    } catch (createErr) {
      console.warn("[adminUploadImage] Auto-create bucket attempt error:", createErr);
    }
  }
  if (error) {
    console.error("[adminUploadImage] Storage upload error:", error);
    if (error.message && error.message.toLowerCase().includes("bucket not found")) {
      throw new Error(`Supabase Storage bucket "${bucketName}" was not found. Please create the "${bucketName}" bucket in your Supabase Storage dashboard (set to Public) or run migration 20260820000000_create_blog_media_bucket.sql.`);
    }
    throw new Error(error.message || "Failed to upload image to storage");
  }
  const {
    data: pubData
  } = client.storage.from(bucketName).getPublicUrl(path);
  let finalUrl = pubData?.publicUrl;
  if (!finalUrl || finalUrl.includes("/undefined")) {
    const {
      data: signed,
      error: signErr
    } = await client.storage.from(bucketName).createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (signErr) throw new Error(signErr.message);
    finalUrl = signed.signedUrl;
  }
  return {
    url: finalUrl,
    path
  };
});
export {
  adminAnalytics_createServerFn_handler,
  adminDeleteComment_createServerFn_handler,
  adminDeleteDestination_createServerFn_handler,
  adminDeleteGalleryImage_createServerFn_handler,
  adminDeleteMessage_createServerFn_handler,
  adminDeletePost_createServerFn_handler,
  adminGetPost_createServerFn_handler,
  adminListComments_createServerFn_handler,
  adminListDestinations_createServerFn_handler,
  adminListGalleries_createServerFn_handler,
  adminListMessages_createServerFn_handler,
  adminListPosts_createServerFn_handler,
  adminSavePostGallery_createServerFn_handler,
  adminTogglePublish_createServerFn_handler,
  adminUpdateMessageStatus_createServerFn_handler,
  adminUploadImage_createServerFn_handler,
  adminUpsertDestination_createServerFn_handler,
  adminUpsertPost_createServerFn_handler,
  getMyRoles_createServerFn_handler
};
