import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertEditor } from "@/lib/admin.functions";
import { resolveMediaUrl } from "@/lib/media";

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  image_url: string | null;
  status: "draft" | "published";
  is_breaking: boolean;
  is_active: boolean;
  display_order: number;
  published_at: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export const slugifyNews = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const NEWS_SELECT_COLS =
  "id,title,slug,summary,content,image_url,status,is_breaking,is_active,display_order,published_at,expires_at,created_at,updated_at";

// ============================================================================
// Public Functions
// ============================================================================

/**
 * Fetch all active, published breaking news items whose publication date
 * has arrived and whose expiry date (if set) has not passed.
 */
export const listActiveBreakingNews = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("news")
    .select(NEWS_SELECT_COLS)
    .eq("status", "published")
    .eq("is_active", true)
    .eq("is_breaking", true)
    .lte("published_at", now)
    .or(`expires_at.is.null,expires_at.gte.${now}`)
    .order("display_order", { ascending: true })
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[listActiveBreakingNews] Error fetching breaking news:", error);
    return [] as NewsItem[];
  }

  const items = (data ?? []).map((row: any) => ({
    ...row,
    image_url: row.image_url ? resolveMediaUrl(row.image_url, supabaseAdmin) : null,
  })) as NewsItem[];

  return items;
});

/**
 * Get a single news item by its slug for permalink pages / modals.
 */
export const getNewsBySlug = createServerFn({ method: "GET" })
  .validator((i) => z.object({ slug: z.string().min(1) }).parse(i))
  .handler(async ({ data: input }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("news")
      .select(NEWS_SELECT_COLS)
      .eq("slug", input.slug.trim().toLowerCase())
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    // Check if publicly accessible
    const isPublished = data.status === "published";
    const isActive = data.is_active;
    const isPastPublish = new Date(data.published_at).getTime() <= Date.now();
    const notExpired = !data.expires_at || new Date(data.expires_at).getTime() >= Date.now();

    if (!isPublished || !isActive || !isPastPublish || !notExpired) {
      // If it's not active/published, return null for public
      return null;
    }

    return {
      ...data,
      image_url: data.image_url ? resolveMediaUrl(data.image_url, supabaseAdmin) : null,
    } as NewsItem;
  });

// ============================================================================
// Admin Functions (Secured)
// ============================================================================

/**
 * List all news items for the CMS News Management table.
 */
export const adminListNews = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { data, error } = await client
      .from("news")
      .select(NEWS_SELECT_COLS)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    const items = (data ?? []).map((row: any) => ({
      ...row,
      image_url: row.image_url ? resolveMediaUrl(row.image_url, client) : null,
    })) as NewsItem[];

    return items;
  });

/**
 * Fetch a single news item by ID for editing in CMS.
 */
export const adminGetNews = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data: input }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { data, error } = await client
      .from("news")
      .select(NEWS_SELECT_COLS)
      .eq("id", input.id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      ...data,
      image_url: data.image_url ? resolveMediaUrl(data.image_url, client) : null,
    } as NewsItem;
  });

/**
 * Create or update a news item from CMS.
 */
export const adminUpsertNews = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((i) =>
    z
      .object({
        id: z.string().uuid().optional(),
        title: z.string().min(1, "Headline / Title is required"),
        slug: z.string().optional(),
        summary: z.string().nullable().optional(),
        content: z.string().optional(),
        image_url: z.string().nullable().optional(),
        status: z.enum(["draft", "published"]).default("draft"),
        is_breaking: z.boolean().default(true),
        is_active: z.boolean().default(true),
        display_order: z.number().int().default(0),
        published_at: z.string().optional(),
        expires_at: z.string().nullable().optional(),
      })
      .parse(i),
  )
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const cleanTitle = data.title.trim();
    let cleanSlug = slugifyNews(data.slug || cleanTitle);
    if (!cleanSlug) {
      cleanSlug = `news-${Date.now()}`;
    }

    const pubDate = data.published_at ? new Date(data.published_at).toISOString() : new Date().toISOString();
    const expDate = data.expires_at ? new Date(data.expires_at).toISOString() : null;

    const payload: Record<string, unknown> = {
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
      updated_at: new Date().toISOString(),
    };

    if (data.id) {
      const { data: updated, error } = await client
        .from("news")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          throw new Error(`The slug "${cleanSlug}" is already in use by another news item. Please use a unique slug.`);
        }
        throw new Error(error.message);
      }
      return updated as NewsItem;
    } else {
      payload.created_at = new Date().toISOString();
      const { data: created, error } = await client
        .from("news")
        .insert(payload)
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          throw new Error(`The slug "${cleanSlug}" is already in use. Please choose a different title or custom slug.`);
        }
        throw new Error(error.message);
      }
      return created as NewsItem;
    }
  });

/**
 * Delete a news item.
 */
export const adminDeleteNews = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data: input }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { error } = await client.from("news").delete().eq("id", input.id);
    if (error) {
      throw new Error(error.message);
    }
    return { ok: true, id: input.id };
  });

/**
 * Quick toggle a single boolean or status field on a news item.
 */
export const adminToggleNewsField = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((i) =>
    z
      .object({
        id: z.string().uuid(),
        field: z.enum(["status", "is_breaking", "is_active"]),
        value: z.union([z.boolean(), z.enum(["draft", "published"])]),
      })
      .parse(i),
  )
  .handler(async ({ context, data: input }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { data: updated, error } = await client
      .from("news")
      .update({
        [input.field]: input.value,
        updated_at: new Date().toISOString(),
      })
      .eq("id", input.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return updated as NewsItem;
  });
