import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-pliCjlCu.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, a as arrayType, n as numberType, l as literalType, b as booleanType, e as enumType } from "../_libs/zod.mjs";
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
async function assertEditor(userId) {
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const {
    data: rows
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId);
  const roles = (rows ?? []).map((r) => r.role);
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
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const {
    data
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId);
  return (data ?? []).map((r) => r.role);
});
const BASE_POST_COLS = "id,title,slug,excerpt,content,cover_image,category,tags,featured,published,published_at,scheduled_at,reading_minutes,views,created_at,updated_at";
const POST_COLS = "id,title,slug,excerpt,content,cover_image,category,tags,featured,published,published_at,scheduled_at,reading_minutes,views,created_at,updated_at,destination_id,travel_date,seo_title,seo_description,og_image_url";
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
  await assertEditor(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  let res = await supabaseAdmin.from("posts").select(`${POST_COLS},destinations(title,slug)`).order("updated_at", {
    ascending: false
  });
  if (res.error) {
    res = await supabaseAdmin.from("posts").select(BASE_POST_COLS).order("updated_at", {
      ascending: false
    });
  }
  if (res.error) throw new Error(res.error.message);
  return res.data ?? [];
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
  await assertEditor(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  let res = await supabaseAdmin.from("posts").select(`${POST_COLS},destinations(id,title,slug),post_gallery(id,image_url,alt_text,sort_order)`).eq("id", data.id).maybeSingle();
  if (res.error) {
    res = await supabaseAdmin.from("posts").select(BASE_POST_COLS).eq("id", data.id).maybeSingle();
  }
  if (res.error) throw new Error(res.error.message);
  const row = res.data;
  if (!row) return null;
  const gallery = row.post_gallery ?? [];
  if (Array.isArray(gallery)) {
    gallery.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  }
  return {
    ...row,
    gallery
  };
});
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
const postInputSchema = objectType({
  id: stringType().uuid().optional(),
  title: stringType().trim().min(1).max(200),
  slug: stringType().trim().min(1).max(200).optional(),
  excerpt: stringType().max(500).optional().nullable(),
  content: stringType().default(""),
  cover_image: stringType().url().optional().nullable().or(literalType("")),
  category: stringType().min(1).max(80),
  tags: arrayType(stringType().max(40)).max(20).default([]),
  featured: booleanType().default(false),
  published: booleanType().default(false),
  scheduled_at: stringType().datetime().optional().nullable().or(literalType("")),
  destination_id: stringType().uuid().optional().nullable().or(literalType("")),
  travel_date: stringType().optional().nullable().or(literalType("")),
  seo_title: stringType().max(200).optional().nullable().or(literalType("")),
  seo_description: stringType().max(500).optional().nullable().or(literalType("")),
  og_image_url: stringType().url().optional().nullable().or(literalType("")),
  gallery: arrayType(objectType({
    id: stringType().optional(),
    image_url: stringType().min(1),
    alt_text: stringType().optional().nullable(),
    sort_order: numberType().default(0)
  })).optional()
});
const adminUpsertPost_createServerFn_handler = createServerRpc({
  id: "ad25067aac02edfbbef739e707988bc188b8eedd0ff973f2468774a4919f719f",
  name: "adminUpsertPost",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminUpsertPost.__executeServer(opts));
const adminUpsertPost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => postInputSchema.parse(i)).handler(adminUpsertPost_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const slug = data.slug && data.slug.trim() || slugify(data.title);
  const reading_minutes = Math.max(1, Math.round((data.content || "").split(/\s+/).length / 200));
  const scheduled = data.scheduled_at && data.scheduled_at !== "" ? data.scheduled_at : null;
  const cover = data.cover_image && data.cover_image !== "" ? data.cover_image : null;
  const destination_id = data.destination_id && data.destination_id !== "" ? data.destination_id : null;
  const travel_date = data.travel_date && data.travel_date !== "" ? data.travel_date : null;
  const og_image_url = data.og_image_url && data.og_image_url !== "" ? data.og_image_url : null;
  const payload = {
    title: data.title,
    slug,
    excerpt: data.excerpt || null,
    content: data.content,
    cover_image: cover,
    category: data.category,
    tags: data.tags,
    featured: data.featured,
    published: data.published,
    published_at: data.published ? (/* @__PURE__ */ new Date()).toISOString() : null,
    scheduled_at: scheduled,
    reading_minutes,
    author_id: context.userId,
    destination_id,
    travel_date,
    seo_title: data.seo_title || null,
    seo_description: data.seo_description || null,
    og_image_url
  };
  let postId = data.id;
  let postRow;
  if (postId) {
    const {
      data: existing
    } = await supabaseAdmin.from("posts").select("published_at,published").eq("id", postId).maybeSingle();
    if (existing?.published && data.published && existing.published_at) {
      payload.published_at = existing.published_at;
    }
    const {
      data: row,
      error
    } = await supabaseAdmin.from("posts").update(payload).eq("id", postId).select(POST_COLS).single();
    if (error) throw new Error(error.message);
    postRow = row;
  } else {
    const {
      data: row,
      error
    } = await supabaseAdmin.from("posts").insert(payload).select(POST_COLS).single();
    if (error) throw new Error(error.message);
    postRow = row;
    postId = row.id;
  }
  if (data.gallery !== void 0 && postId) {
    await supabaseAdmin.from("post_gallery").delete().eq("post_id", postId);
    if (data.gallery.length > 0) {
      const galleryRows = data.gallery.map((g, idx) => ({
        post_id: postId,
        image_url: g.image_url,
        alt_text: g.alt_text || null,
        sort_order: g.sort_order ?? idx
      }));
      const {
        error: galErr
      } = await supabaseAdmin.from("post_gallery").insert(galleryRows);
      if (galErr) throw new Error(galErr.message);
    }
  }
  return postRow;
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
  await assertEditor(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const {
    error
  } = await supabaseAdmin.from("posts").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
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
  await assertEditor(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const {
    error
  } = await supabaseAdmin.from("posts").update({
    published: data.published,
    published_at: data.published ? (/* @__PURE__ */ new Date()).toISOString() : null,
    scheduled_at: data.published ? null : void 0
  }).eq("id", data.id);
  if (error) throw new Error(error.message);
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
  await assertEditor(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("destinations").select("*").order("created_at", {
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
  await assertEditor(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
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
    } = await supabaseAdmin.from("destinations").update(payload).eq("id", data.id);
    if (error) throw new Error(error.message);
  } else {
    const {
      error
    } = await supabaseAdmin.from("destinations").insert(payload);
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
  await assertEditor(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const {
    error
  } = await supabaseAdmin.from("destinations").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
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
  await assertEditor(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("comments").select("id,post_id,comment,guest_name,guest_email,rating,created_at,posts(title,slug)").order("created_at", {
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
  await assertEditor(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const {
    error
  } = await supabaseAdmin.from("comments").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
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
  await assertEditor(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("contact_messages").select("id,name,email,subject,message,status,created_at").order("created_at", {
    ascending: false
  }).limit(500);
  if (error) throw new Error(error.message);
  return data ?? [];
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
  status: enumType(["new", "read", "replied"])
}).parse(i)).handler(adminUpdateMessageStatus_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const {
    error
  } = await supabaseAdmin.from("contact_messages").update({
    status: data.status
  }).eq("id", data.id);
  if (error) throw new Error(error.message);
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
  await assertEditor(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const {
    error
  } = await supabaseAdmin.from("contact_messages").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
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
  await assertEditor(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const [posts, comments, subs, msgs, top] = await Promise.all([supabaseAdmin.from("posts").select("id,published,scheduled_at,views", {
    count: "exact"
  }), supabaseAdmin.from("comments").select("id,rating", {
    count: "exact",
    head: false
  }), supabaseAdmin.from("subscribers").select("id", {
    count: "exact",
    head: true
  }), supabaseAdmin.from("contact_messages").select("id", {
    count: "exact",
    head: true
  }), supabaseAdmin.from("posts").select("id,title,slug,views").eq("published", true).order("views", {
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
  await assertEditor(context.userId);
  if (!data.contentType.startsWith("image/")) throw new Error("Only image uploads allowed");
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const buf = Buffer.from(data.base64, "base64");
  if (buf.byteLength > 8 * 1024 * 1024) throw new Error("Max 8 MB");
  const ext = (data.filename.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${context.userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const {
    error
  } = await supabaseAdmin.storage.from("blog-media").upload(path, buf, {
    contentType: data.contentType,
    upsert: false
  });
  if (error) throw new Error(error.message);
  const {
    data: signed,
    error: signErr
  } = await supabaseAdmin.storage.from("blog-media").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (signErr) throw new Error(signErr.message);
  return {
    url: signed.signedUrl,
    path
  };
});
export {
  adminAnalytics_createServerFn_handler,
  adminDeleteComment_createServerFn_handler,
  adminDeleteDestination_createServerFn_handler,
  adminDeleteMessage_createServerFn_handler,
  adminDeletePost_createServerFn_handler,
  adminGetPost_createServerFn_handler,
  adminListComments_createServerFn_handler,
  adminListDestinations_createServerFn_handler,
  adminListMessages_createServerFn_handler,
  adminListPosts_createServerFn_handler,
  adminTogglePublish_createServerFn_handler,
  adminUpdateMessageStatus_createServerFn_handler,
  adminUploadImage_createServerFn_handler,
  adminUpsertDestination_createServerFn_handler,
  adminUpsertPost_createServerFn_handler,
  getMyRoles_createServerFn_handler
};
