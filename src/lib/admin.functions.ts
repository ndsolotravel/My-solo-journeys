import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertEditor(userId: string, client?: any) {
  let roles: string[] = [];

  if (client && typeof client.from === "function") {
    const { data } = await client.from("user_roles").select("role").eq("user_id", userId);
    if (data && data.length > 0) {
      roles = data.map((r: { role: string }) => r.role);
    }
  }

  if (roles.length === 0) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    roles = (rows ?? []).map((r) => r.role);
  }

  if (!roles.includes("admin") && !roles.includes("editor")) {
    throw new Error("Forbidden");
  }
  return roles;
}

export const getMyRoles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    let roles: string[] = [];
    if (context.supabase) {
      const { data } = await context.supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", context.userId);
      if (data && data.length > 0) {
        roles = data.map((r) => r.role as string);
      }
    }
    if (roles.length === 0) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data } = await supabaseAdmin
        .from("user_roles")
        .select("role")
        .eq("user_id", context.userId);
      if (data) {
        roles = data.map((r) => r.role as string);
      }
    }
    return roles;
  });

const DEFAULT_SUPABASE_URL = "https://mqoybarqgzzvillignbr.supabase.co";

export function resolveMediaUrl(urlOrPath: string | null | undefined, client?: any): string {
  if (!urlOrPath || typeof urlOrPath !== "string") return "";
  const trimmed = urlOrPath.trim();
  if (!trimmed) return "";

  // Convert Google Drive sharing/file links into direct renderable CDN image links
  if (trimmed.includes("drive.google.com")) {
    const fileIdMatch =
      trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
  }

  // If it's already an absolute HTTP(S) URL or data/blob URI
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }

  // It's a storage path in blog-media (e.g. "userId/filename.jpg" or "/blog-media/userId/filename.jpg")
  let cleanPath = trimmed.replace(/^\/+/, "");
  if (cleanPath.startsWith("blog-media/")) {
    cleanPath = cleanPath.slice("blog-media/".length);
  }

  if (client?.storage?.from) {
    try {
      const { data } = client.storage.from("blog-media").getPublicUrl(cleanPath);
      if (data?.publicUrl) return data.publicUrl;
    } catch {
      // fallback
    }
  }

  const baseUrl =
    (typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
      : "") || DEFAULT_SUPABASE_URL;

  return `${baseUrl.replace(/\/+$/, "")}/storage/v1/object/public/blog-media/${cleanPath}`;
}

export function extractBlogMediaPath(url: string | null | undefined): string | null {
  if (!url || typeof url !== "string") return null;
  try {
    const cleanUrl = url.split("?")[0].split("#")[0].trim();
    const marker = "/blog-media/";
    const markerIdx = cleanUrl.indexOf(marker);
    if (markerIdx !== -1) {
      const extracted = cleanUrl.slice(markerIdx + marker.length);
      return decodeURIComponent(extracted.replace(/^\/+/, ""));
    }
    // If it's a relative path (e.g. userId/filename.jpg or blog-media/userId/filename.jpg)
    if (
      !cleanUrl.startsWith("http://") &&
      !cleanUrl.startsWith("https://") &&
      !cleanUrl.startsWith("data:") &&
      !cleanUrl.startsWith("blob:")
    ) {
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

// ---------------- POSTS ----------------

const BASE_POST_COLS =
  "id,title,slug,excerpt,content,cover_image,category,tags,featured,published,published_at,scheduled_at,reading_minutes,views,created_at,updated_at,author_name,location_name,latitude,longitude";

const POST_COLS =
  "id,title,slug,excerpt,content,cover_image,category,tags,featured,published,published_at,scheduled_at,reading_minutes,views,created_at,updated_at,destination_id,travel_date,location_name,latitude,longitude,seo_title,seo_description,og_image_url,author_name";

export const adminListPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { data: fullData, error: fullError } = await (client
      .from("posts") as any)
      .select(`${POST_COLS},destinations(id,title,slug)`)
      .order("created_at", { ascending: false });

    if (fullError) {
      const { data, error } = await (client.from("posts") as any)
        .select(BASE_POST_COLS)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data ?? [];
    }

    return fullData ?? [];
  });

export const adminGetPost = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { data: row, error } = await (client.from("posts") as any)
      .select(`${POST_COLS},destinations(id,title,slug),post_gallery(id,image_url,alt_text,sort_order),post_translations(id,language_code,title,excerpt,content,seo_title,seo_description)`)
      .eq("id", data.id)
      .single();

    if (error) throw new Error(error.message);
    return row;
  });

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const adminUpsertPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) =>
    z
      .object({
        id: z.string().uuid().optional(),
        title: z.string().min(1),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        cover_image: z.string().nullable().optional(),
        category: z.string().min(1),
        tags: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
        published: z.boolean().default(false),
        author_name: z.string().nullable().optional(),
        location_name: z.string().nullable().optional(),
        latitude: z.number().min(-90).max(90).nullable().optional(),
        longitude: z.number().min(-180).max(180).nullable().optional(),
        scheduled_at: z.string().nullable().optional(),
        destination_id: z.string().uuid().nullable().optional(),
        travel_date: z.string().nullable().optional(),
        seo_title: z.string().nullable().optional(),
        seo_description: z.string().nullable().optional(),
        og_image_url: z.string().nullable().optional(),
        gallery: z
          .array(
            z.object({
              id: z.string().uuid().optional(),
              image_url: z.string().min(1),
              alt_text: z.string().nullable().optional(),
              sort_order: z.number().int().nonnegative().optional(),
            }),
          )
          .optional(),
      })
      .parse(i),
  )
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const slug = slugify(data.slug || data.title);
    const words = (data.content || "").trim().split(/\s+/).filter(Boolean).length;
    const reading_minutes = Math.max(1, Math.ceil(words / 200));

    const scheduledDate = data.scheduled_at ? new Date(data.scheduled_at) : null;
    const isScheduledFuture = scheduledDate && scheduledDate.getTime() > Date.now();
    const effectivePublished = isScheduledFuture ? false : !!data.published;

    const payload: Record<string, unknown> = {
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
      updated_at: new Date().toISOString(),
    };

    if (data.author_name !== undefined) {
      payload.author_name = data.author_name ? data.author_name.trim() : "Noman";
    }
    if (data.location_name !== undefined) {
      payload.location_name = data.location_name ? data.location_name.trim() : null;
    }
    if (data.latitude !== undefined) {
      payload.latitude = data.latitude !== null && !isNaN(data.latitude) ? data.latitude : null;
    }
    if (data.longitude !== undefined) {
      payload.longitude = data.longitude !== null && !isNaN(data.longitude) ? data.longitude : null;
    }
    if (data.destination_id !== undefined) {
      payload.destination_id = data.destination_id || null;
    }
    if (data.travel_date !== undefined) {
      payload.travel_date = data.travel_date || null;
    }
    if (data.seo_title !== undefined) {
      payload.seo_title = data.seo_title ? data.seo_title.trim() : null;
    }
    if (data.seo_description !== undefined) {
      payload.seo_description = data.seo_description ? data.seo_description.trim() : null;
    }
    if (data.og_image_url !== undefined) {
      payload.og_image_url = data.og_image_url || null;
    }

    if (effectivePublished) {
      payload.published_at = new Date().toISOString();
    }

    let postRow: any = null;
    let postId = data.id;

    if (postId) {
      const { data: updated, error } = await (client.from("posts") as any)
        .update(payload)
        .eq("id", postId)
        .select()
        .single();
      if (error) throw new Error(error.message);
      postRow = updated;
    } else {
      payload.author_id = context.userId;
      const { data: inserted, error } = await (client.from("posts") as any)
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      postRow = inserted;
      postId = inserted.id;
    }

    // Sync post_gallery items if provided
    if (data.gallery !== undefined && postId) {
      try {
        const { data: oldGallery } = await client
          .from("post_gallery")
          .select("image_url")
          .eq("post_id", postId);

        if (oldGallery && oldGallery.length > 0) {
          const newUrls = new Set(data.gallery.map((g) => g.image_url));
          const removedPaths: string[] = [];
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
          sort_order: g.sort_order ?? idx,
        }));
        const { error: galErr } = await client.from("post_gallery").insert(galleryRows);
        if (galErr) throw new Error(galErr.message);
      }
    }

    return postRow;
  });

export const adminDeleteGalleryImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) =>
    z
      .object({
        postId: z.string().uuid().optional(),
        galleryId: z.string().uuid().optional(),
        imageUrl: z.string().min(1),
      })
      .parse(i),
  )
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    // 1. Delete from database table post_gallery
    if (data.galleryId) {
      const { error: delErr } = await client.from("post_gallery").delete().eq("id", data.galleryId);
      if (delErr) console.warn("[adminDeleteGalleryImage] Delete by ID error:", delErr);
    }
    if (data.postId) {
      const { error: delErr } = await client
        .from("post_gallery")
        .delete()
        .eq("post_id", data.postId)
        .eq("image_url", data.imageUrl);
      if (delErr) console.warn("[adminDeleteGalleryImage] Delete by post_id error:", delErr);
    }

    // 2. Clean up file from Supabase Storage bucket blog-media
    const storagePath = extractBlogMediaPath(data.imageUrl);
    if (storagePath) {
      try {
        await client.storage.from("blog-media").remove([storagePath]);
      } catch (err) {
        console.warn("[adminDeleteGalleryImage] Storage cleanup warning:", err);
      }
    }

    return { ok: true };
  });

export const adminListGalleries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    // 1. Fetch all posts
    const { data: postsData, error: postsErr } = await (client
      .from("posts") as any)
      .select("id, title, slug, cover_image, published, created_at, updated_at")
      .order("updated_at", { ascending: false });

    if (postsErr) throw new Error(postsErr.message);

    // 2. Fetch all gallery records directly from post_gallery
    const { data: allGallery, error: galErr } = await (client
      .from("post_gallery") as any)
      .select("id, post_id, image_url, alt_text, sort_order, created_at")
      .order("sort_order", { ascending: true });

    if (galErr) {
      console.warn("[adminListGalleries] Warning fetching post_gallery:", galErr);
    }

    // 3. Map gallery items to their respective post
    const galleryByPostId = new Map<string, any[]>();
    ((allGallery as any[]) ?? []).forEach((g: any) => {
      const pid = g.post_id;
      if (pid) {
        if (!galleryByPostId.has(pid)) {
          galleryByPostId.set(pid, []);
        }
        galleryByPostId.get(pid)!.push({
          id: g.id,
          post_id: g.post_id,
          image_url: resolveMediaUrl(g.image_url, client),
          alt_text: g.alt_text ?? "",
          sort_order: g.sort_order ?? 0,
          created_at: g.created_at,
        });
      }
    });

    const posts = ((postsData as any[]) ?? []).map((p: any) => {
      const gallery = galleryByPostId.get(p.id) ?? [];
      gallery.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      return {
        ...p,
        cover_image: resolveMediaUrl(p.cover_image, client),
        gallery,
        galleryCount: gallery.length,
      };
    });

    return posts;
  });

export const adminSavePostGallery = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) =>
    z
      .object({
        postId: z.string().uuid(),
        gallery: z.array(
          z.object({
            id: z.string().uuid().optional(),
            image_url: z.string().min(1),
            alt_text: z.string().nullable().optional(),
            sort_order: z.number().int().nonnegative().optional(),
          }),
        ),
      })
      .parse(i),
  )
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    // Find old gallery items to clean up removed storage images
    try {
      const { data: oldGallery } = await client
        .from("post_gallery")
        .select("image_url")
        .eq("post_id", data.postId);

      if (oldGallery && oldGallery.length > 0) {
        const newUrls = new Set(data.gallery.map((g) => g.image_url));
        const removedPaths: string[] = [];
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
        sort_order: g.sort_order ?? idx,
      }));
      const { error: insErr } = await client.from("post_gallery").insert(rows);
      if (insErr) throw new Error(insErr.message);
    }

    return { ok: true };
  });

export const adminDeletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    // 1. Fetch post and gallery info to discover storage media before deletion
    const { data: post, error: fetchError } = await client
      .from("posts")
      .select("id, cover_image, og_image_url, post_gallery(image_url)")
      .eq("id", data.id)
      .maybeSingle();

    if (fetchError) {
      console.error("[adminDeletePost] Error locating post:", fetchError);
      throw new Error(fetchError.message || "Failed to locate post for deletion");
    }

    if (!post) {
      console.error("[adminDeletePost] Post not found or unauthorized:", data.id);
      throw new Error("Unable to delete this blog post: Post not found or permission denied.");
    }

    // 2. Clean up associated images from Supabase Storage (blog-media)
    const storagePaths: string[] = [];
    const coverPath = extractBlogMediaPath(post.cover_image);
    if (coverPath) storagePaths.push(coverPath);

    const ogPath = extractBlogMediaPath(post.og_image_url);
    if (ogPath && !storagePaths.includes(ogPath)) storagePaths.push(ogPath);

    if (Array.isArray((post as any).post_gallery)) {
      for (const item of (post as any).post_gallery) {
        const galPath = extractBlogMediaPath(item?.image_url);
        if (galPath && !storagePaths.includes(galPath)) {
          storagePaths.push(galPath);
        }
      }
    }

    if (storagePaths.length > 0) {
      try {
        const { error: storageErr } = await client.storage
          .from("blog-media")
          .remove(storagePaths);
        if (storageErr) {
          console.warn("[adminDeletePost] Warning removing post storage files:", storageErr);
        }
      } catch (err) {
        console.warn("[adminDeletePost] Storage cleanup caught exception:", err);
      }
    }

    // 3. Explicitly delete related gallery items if needed (defense-in-depth)
    try {
      await client.from("post_gallery").delete().eq("post_id", data.id);
    } catch (galErr) {
      console.warn("[adminDeletePost] Warning cleaning post_gallery:", galErr);
    }

    // 4. Perform atomic DELETE on posts table with row confirmation
    const { data: deletedRows, error: deleteError } = await client
      .from("posts")
      .delete()
      .eq("id", data.id)
      .select("id");

    if (deleteError) {
      console.error("[adminDeletePost] Supabase DELETE error:", deleteError);
      throw new Error(deleteError.message || "Unable to delete this blog post. Please try again.");
    }

    if (!deletedRows || deletedRows.length === 0) {
      console.error("[adminDeletePost] Zero rows affected during delete for post ID:", data.id);
      throw new Error("Unable to delete this blog post. The post was not found or deletion permission was denied.");
    }

    return { ok: true, id: data.id };
  });

export const adminTogglePublish = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid(), published: z.boolean() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { data: updated, error } = await client
      .from("posts")
      .update({
        published: data.published,
        published_at: data.published ? new Date().toISOString() : null,
        scheduled_at: data.published ? null : undefined,
      })
      .eq("id", data.id)
      .select("id");
    if (error) throw new Error(error.message);
    if (!updated || updated.length === 0) {
      throw new Error("Unable to update post status: Post not found or permission denied.");
    }
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
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { data, error } = await client
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
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
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
      const { error } = await client.from("destinations").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await client.from("destinations").insert(payload);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const adminDeleteDestination = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { data: deleted, error } = await client.from("destinations").delete().eq("id", data.id).select("id");
    if (error) throw new Error(error.message);
    if (!deleted || deleted.length === 0) {
      throw new Error("Unable to delete destination: Not found or permission denied.");
    }
    return { ok: true };
  });

// ---------------- COMMENTS ----------------

export const adminListComments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { data, error } = await client
      .from("comments")
      .select("id,post_id,comment,guest_name,guest_email,rating,created_at,posts(title,slug)")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return (data ?? []) as any[];
  });

export const adminDeleteComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { data: deleted, error } = await client.from("comments").delete().eq("id", data.id).select("id");
    if (error) throw new Error(error.message);
    if (!deleted || deleted.length === 0) {
      throw new Error("Unable to delete comment: Not found or permission denied.");
    }
    return { ok: true };
  });

// ---------------- CONTACT MESSAGES ----------------

export const adminListMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { data: msgData, error: msgError } = await client
      .from("messages")
      .select("id,name,email,subject,message,is_read,created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (!msgError && msgData) {
      return msgData.map((m: any) => ({
        ...m,
        is_read: Boolean(m.is_read),
        status: m.is_read ? "read" : "new",
      }));
    }

    const { data: cmData, error: cmError } = await client
      .from("contact_messages")
      .select("id,name,email,subject,message,status,created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (cmError) throw new Error(cmError.message);
    return (cmData ?? []).map((m: any) => ({
      ...m,
      is_read: m.status === "read" || m.status === "replied",
      status: m.status || "new",
    }));
  });

export const adminUpdateMessageStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "read", "replied"]).optional(),
        is_read: z.boolean().optional(),
      })
      .parse(i),
  )
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    
    const isRead = typeof data.is_read === "boolean" ? data.is_read : (data.status === "read" || data.status === "replied");

    const { error: msgErr } = await client
      .from("messages")
      .update({ is_read: isRead })
      .eq("id", data.id);

    if (data.status) {
      try {
        await client.from("contact_messages").update({ status: data.status }).eq("id", data.id);
      } catch {}
    }

    if (msgErr) {
      const { error: cmErr } = await client
        .from("contact_messages")
        .update({ status: data.status || (isRead ? "read" : "new") })
        .eq("id", data.id);
      if (cmErr) throw new Error(msgErr.message);
    }
    return { ok: true };
  });

export const adminDeleteMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { error: msgErr } = await client.from("messages").delete().eq("id", data.id);
    try {
      await client.from("contact_messages").delete().eq("id", data.id);
    } catch {}
    if (msgErr) {
      const { error: cmErr } = await client.from("contact_messages").delete().eq("id", data.id);
      if (cmErr) throw new Error(msgErr.message);
    }
    return { ok: true };
  });

// ---------------- ANALYTICS ----------------

export const adminAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const [posts, comments, subs, msgs, top] = await Promise.all([
      client.from("posts").select("id,published,scheduled_at,views", { count: "exact" }),
      client.from("comments").select("id,rating", { count: "exact", head: false }),
      client.from("subscribers").select("id", { count: "exact", head: true }),
      client.from("messages").select("id", { count: "exact", head: true }),
      client
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
      topPosts: (top.data ?? []) as any[],
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
    await assertEditor(context.userId, context.supabase);
    if (!data.contentType.startsWith("image/")) throw new Error("Only image uploads allowed");
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const buf = Buffer.from(data.base64, "base64");
    if (buf.byteLength > 8 * 1024 * 1024) throw new Error("Max 8 MB");
    const ext = (data.filename.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${context.userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const bucketName = "blog-media";

    // Attempt upload
    let { error } = await client.storage
      .from(bucketName)
      .upload(path, buf, { contentType: data.contentType, upsert: false });

    // If bucket not found, attempt to automatically create the bucket and retry upload
    if (error && error.message && error.message.toLowerCase().includes("bucket not found")) {
      try {
        const { error: createErr } = await client.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 8388608,
          allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"],
        });
        if (!createErr) {
          const retry = await client.storage
            .from(bucketName)
            .upload(path, buf, { contentType: data.contentType, upsert: false });
          error = retry.error;
        }
      } catch (createErr) {
        console.warn("[adminUploadImage] Auto-create bucket attempt error:", createErr);
      }
    }

    if (error) {
      console.error("[adminUploadImage] Storage upload error:", error);
      if (error.message && error.message.toLowerCase().includes("bucket not found")) {
        throw new Error(
          `Supabase Storage bucket "${bucketName}" was not found. Please create the "${bucketName}" bucket in your Supabase Storage dashboard (set to Public) or run migration 20260820000000_create_blog_media_bucket.sql.`,
        );
      }
      throw new Error(error.message || "Failed to upload image to storage");
    }

    // Get public URL for the uploaded image
    const { data: pubData } = client.storage.from(bucketName).getPublicUrl(path);
    let finalUrl = pubData?.publicUrl;

    if (!finalUrl || finalUrl.includes("/undefined")) {
      const { data: signed, error: signErr } = await client.storage
        .from(bucketName)
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      if (signErr) throw new Error(signErr.message);
      finalUrl = signed.signedUrl;
    }

    return { url: finalUrl, path };
  });


