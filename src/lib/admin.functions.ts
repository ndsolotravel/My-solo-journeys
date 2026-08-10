import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertEditor(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: rows } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);
  const roles = (rows ?? []).map((r) => r.role);
  if (!roles.includes("admin") && !roles.includes("editor")) {
    throw new Error("Forbidden");
  }
  return roles;
}

export const getMyRoles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    return (data ?? []).map((r) => r.role as string);
  });

// ---------------- POSTS ----------------

const BASE_POST_COLS =
  "id,title,slug,excerpt,content,cover_image,category,tags,featured,published,published_at,scheduled_at,reading_minutes,views,created_at,updated_at";

const POST_COLS =
  "id,title,slug,excerpt,content,cover_image,category,tags,featured,published,published_at,scheduled_at,reading_minutes,views,created_at,updated_at,destination_id,travel_date,seo_title,seo_description,og_image_url";

export const adminListPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let res = await supabaseAdmin
      .from("posts")
      .select(`${POST_COLS},destinations(title,slug)`)
      .order("updated_at", { ascending: false });
    if (res.error) {
      res = await supabaseAdmin
        .from("posts")
        .select(BASE_POST_COLS)
        .order("updated_at", { ascending: false });
    }
    if (res.error) throw new Error(res.error.message);
    return res.data ?? [];
  });

export const adminGetPost = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let res = await supabaseAdmin
      .from("posts")
      .select(`${POST_COLS},destinations(id,title,slug),post_gallery(id,image_url,alt_text,sort_order)`)
      .eq("id", data.id)
      .maybeSingle();

    if (res.error) {
      res = await supabaseAdmin
        .from("posts")
        .select(BASE_POST_COLS)
        .eq("id", data.id)
        .maybeSingle();
    }

    if (res.error) throw new Error(res.error.message);
    const row = res.data;
    if (!row) return null;
    const gallery = ((row as Record<string, unknown>).post_gallery ?? []) as {
      id: string;
      image_url: string;
      alt_text: string | null;
      sort_order: number;
    }[];
    if (Array.isArray(gallery)) {
      gallery.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    }
    return { ...row, gallery };
  });

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

const postInputSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(200).optional(),
  excerpt: z.string().max(500).optional().nullable(),
  content: z.string().default(""),
  cover_image: z.string().url().optional().nullable().or(z.literal("")),
  category: z.string().min(1).max(80),
  tags: z.array(z.string().max(40)).max(20).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  scheduled_at: z.string().datetime().optional().nullable().or(z.literal("")),
  destination_id: z.string().uuid().optional().nullable().or(z.literal("")),
  travel_date: z.string().optional().nullable().or(z.literal("")),
  seo_title: z.string().max(200).optional().nullable().or(z.literal("")),
  seo_description: z.string().max(500).optional().nullable().or(z.literal("")),
  og_image_url: z.string().url().optional().nullable().or(z.literal("")),
  gallery: z
    .array(
      z.object({
        id: z.string().optional(),
        image_url: z.string().min(1),
        alt_text: z.string().optional().nullable(),
        sort_order: z.number().default(0),
      }),
    )
    .optional(),
});

export const adminUpsertPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => postInputSchema.parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const slug = (data.slug && data.slug.trim()) || slugify(data.title);
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
      published_at: data.published ? new Date().toISOString() : null,
      scheduled_at: scheduled,
      reading_minutes,
      author_id: context.userId,
      destination_id,
      travel_date,
      seo_title: data.seo_title || null,
      seo_description: data.seo_description || null,
      og_image_url,
    };

    let postId = data.id;
    let postRow;

    if (postId) {
      // Preserve existing published_at when republishing
      const { data: existing } = await supabaseAdmin
        .from("posts")
        .select("published_at,published")
        .eq("id", postId)
        .maybeSingle();
      if (existing?.published && data.published && existing.published_at) {
        payload.published_at = existing.published_at;
      }
      const { data: row, error } = await supabaseAdmin
        .from("posts")
        .update(payload)
        .eq("id", postId)
        .select(POST_COLS)
        .single();
      if (error) throw new Error(error.message);
      postRow = row;
    } else {
      const { data: row, error } = await supabaseAdmin
        .from("posts")
        .insert(payload)
        .select(POST_COLS)
        .single();
      if (error) throw new Error(error.message);
      postRow = row;
      postId = row.id;
    }

    // Sync post_gallery items if provided
    if (data.gallery !== undefined && postId) {
      await supabaseAdmin.from("post_gallery").delete().eq("post_id", postId);
      if (data.gallery.length > 0) {
        const galleryRows = data.gallery.map((g, idx) => ({
          post_id: postId,
          image_url: g.image_url,
          alt_text: g.alt_text || null,
          sort_order: g.sort_order ?? idx,
        }));
        const { error: galErr } = await supabaseAdmin.from("post_gallery").insert(galleryRows);
        if (galErr) throw new Error(galErr.message);
      }
    }

    return postRow;
  });

export const adminDeletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminTogglePublish = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid(), published: z.boolean() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("posts")
      .update({
        published: data.published,
        published_at: data.published ? new Date().toISOString() : null,
        scheduled_at: data.published ? null : undefined,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- DESTINATIONS ----------------

const destInputSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(200).optional(),
  country: z.string().min(1).max(120),
  region: z.string().max(120).optional().nullable(),
  description: z.string().max(4000).optional().nullable(),
  featured_image: z.string().url().optional().nullable().or(z.literal("")),
  published: z.boolean().default(true),
});

export const adminListDestinations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("destinations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminUpsertDestination = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => destInputSchema.parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const slug = (data.slug && data.slug.trim()) || slugify(data.title);
    const payload = {
      title: data.title,
      slug,
      country: data.country,
      region: data.region || null,
      description: data.description || null,
      featured_image: data.featured_image || null,
      published: data.published,
    };
    if (data.id) {
      const { error } = await supabaseAdmin.from("destinations").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("destinations").insert(payload);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const adminDeleteDestination = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("destinations").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- COMMENTS ----------------

export const adminListComments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("comments")
      .select("id,post_id,comment,guest_name,guest_email,rating,created_at,posts(title,slug)")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminDeleteComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("comments").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- CONTACT MESSAGES ----------------

export const adminListMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("contact_messages")
      .select("id,name,email,subject,message,status,created_at")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminUpdateMessageStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "read", "replied"]),
      })
      .parse(i),
  )
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("contact_messages")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- ANALYTICS ----------------

export const adminAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [posts, comments, subs, msgs, top] = await Promise.all([
      supabaseAdmin.from("posts").select("id,published,scheduled_at,views", { count: "exact" }),
      supabaseAdmin.from("comments").select("id,rating", { count: "exact", head: false }),
      supabaseAdmin.from("subscribers").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("contact_messages").select("id", { count: "exact", head: true }),
      supabaseAdmin
        .from("posts")
        .select("id,title,slug,views")
        .eq("published", true)
        .order("views", { ascending: false })
        .limit(5),
    ]);
    const allPosts = posts.data ?? [];
    const ratings = (comments.data ?? []).map((c) => c.rating).filter((r): r is number => !!r);
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
      topPosts: top.data ?? [],
    };
  });

// ---------------- IMAGE UPLOAD ----------------

export const adminUploadImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) =>
    z
      .object({
        filename: z.string().min(1).max(200),
        contentType: z.string().min(1).max(100),
        base64: z.string().min(1),
      })
      .parse(i),
  )
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId);
    if (!data.contentType.startsWith("image/")) throw new Error("Only image uploads allowed");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const buf = Buffer.from(data.base64, "base64");
    if (buf.byteLength > 8 * 1024 * 1024) throw new Error("Max 8 MB");
    const ext = (data.filename.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${context.userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabaseAdmin.storage
      .from("blog-media")
      .upload(path, buf, { contentType: data.contentType, upsert: false });
    if (error) throw new Error(error.message);
    // Bucket is private (workspace policy blocks public buckets), so issue
    // a long-lived signed URL (~10 years) for the cover image.
    const { data: signed, error: signErr } = await supabaseAdmin.storage
      .from("blog-media")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (signErr) throw new Error(signErr.message);
    return { url: signed.signedUrl, path };
  });
