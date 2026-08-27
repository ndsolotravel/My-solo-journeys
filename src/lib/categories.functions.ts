import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Post } from "@/lib/posts.functions";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  status: "active" | "inactive";
  display_order: number;
  seo_title?: string | null;
  seo_description?: string | null;
  post_count?: number;
  created_at?: string;
  updated_at?: string;
};

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "cat-solo-travel",
    name: "Solo Travel",
    slug: "solo-travel",
    description: "Independent expeditions, solo mindset, and journeys into remote frontiers.",
    image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80",
    status: "active",
    display_order: 1,
    seo_title: "Solo Travel Stories & Expedition Logs — ndsolotravel",
    seo_description: "Explore independent solo travel journeys, mountain expeditions, and insights across Pakistan and beyond.",
  },
  {
    id: "cat-motorcycle-journeys",
    name: "Motorcycle Journeys",
    slug: "motorcycle-journeys",
    description: "Long-distance motorcycle adventures, mountain passes, and highway diaries.",
    image_url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&q=80",
    status: "active",
    display_order: 2,
    seo_title: "Solo Motorcycle Journeys & Karakoram Routes — ndsolotravel",
    seo_description: "Motorcycle expedition diaries, high pass crossings, and motorcycle travel stories from northern Pakistan.",
  },
  {
    id: "cat-trekking",
    name: "Trekking",
    slug: "trekking",
    description: "High-altitude trails, base camps, glaciers, and wilderness hiking expeditions.",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    status: "active",
    display_order: 3,
    seo_title: "Trekking & Mountain Expeditions — ndsolotravel",
    seo_description: "Remote trekking diaries from K2 Base Camp, Concordia, Nanga Parbat, and high alpine trails.",
  },
  {
    id: "cat-travel-guides",
    name: "Travel Guides",
    slug: "travel-guides",
    description: "Honest, detailed route guides, logistics, permits, and preparation advice.",
    image_url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80",
    status: "active",
    display_order: 4,
    seo_title: "Mountain Travel Guides & Route Logistics — ndsolotravel",
    seo_description: "Comprehensive, field-tested travel guides for navigating remote destinations safely and independently.",
  },
  {
    id: "cat-destinations",
    name: "Destinations",
    slug: "destinations",
    description: "Alpine valleys, base camps, and remote frontier settlements across Pakistan.",
    image_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80",
    status: "active",
    display_order: 5,
    seo_title: "Destination Highlights & Alpine Valleys — ndsolotravel",
    seo_description: "In-depth explorations of iconic mountain destinations, valleys, and wilderness locations.",
  },
  {
    id: "cat-adventure",
    name: "Adventure",
    slug: "adventure",
    description: "Off-the-beaten-path expeditions and wild frontier crossings.",
    image_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80",
    status: "active",
    display_order: 6,
    seo_title: "Wild Adventures & Frontier Expeditions — ndsolotravel",
    seo_description: "Stories of wilderness survival, wild crossings, and unconventional travel adventures.",
  },
  {
    id: "cat-photography",
    name: "Photography",
    slug: "photography",
    description: "Visual dispatches, landscape photography, and light from high altitudes.",
    image_url: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1600&q=80",
    status: "active",
    display_order: 7,
    seo_title: "High-Altitude Photography & Visual Field Notes — ndsolotravel",
    seo_description: "Visual dispatches and landscape photography capturing the Karakoram and Himalaya in natural light.",
  },
  {
    id: "cat-field-notes",
    name: "Field Notes",
    slug: "field-notes",
    description: "Raw observations, reflections, and thoughts recorded on the road.",
    image_url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80",
    status: "active",
    display_order: 8,
    seo_title: "Field Notes & Solitary Thoughts — ndsolotravel",
    seo_description: "Unfiltered journals and reflections from solitary mountain trails and remote base camps.",
  },
  {
    id: "cat-budget-travel",
    name: "Budget Travel",
    slug: "budget-travel",
    description: "Cost breakdowns, local stays, and practical budget tips for mountain travel.",
    image_url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80",
    status: "active",
    display_order: 9,
    seo_title: "Budget Mountain Travel Tips — ndsolotravel",
    seo_description: "Practical guides and transparent cost breakdowns for traveling remote mountains on a budget.",
  },
  {
    id: "cat-nanga-parbat",
    name: "Nanga Parbat",
    slug: "nanga-parbat",
    description: "Expeditions, base camps, and stories around the Killer Mountain.",
    image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80",
    status: "active",
    display_order: 10,
    seo_title: "Nanga Parbat Stories & Fairy Meadows Guides — ndsolotravel",
    seo_description: "Expedition diaries and trekking accounts from the slopes of the 8,126m Killer Mountain.",
  },
  {
    id: "cat-motorcycle-adventure-travel",
    name: "Motorcycle Adventure Travel",
    slug: "motorcycle-adventure-travel",
    description: "Solo motorcycle expeditions through high mountain passes.",
    image_url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&q=80",
    status: "active",
    display_order: 11,
    seo_title: "Motorcycle Adventure Travel — ndsolotravel",
    seo_description: "High altitude motorcycle touring, mechanical repairs on the road, and pass crossings.",
  },
];

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getStoredCategories(client: any): Promise<Category[]> {
  // 1. Try public.categories table first
  try {
    const { data: tableData, error: tableErr } = await client
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });

    if (!tableErr && tableData && tableData.length > 0) {
      return tableData as Category[];
    }
  } catch {
    // Fall back to site_settings
  }

  // 2. Read from site_settings
  try {
    const { data: settingData, error: settingErr } = await client
      .from("site_settings")
      .select("value")
      .eq("key", "site_categories")
      .maybeSingle();

    if (!settingErr && settingData?.value) {
      const parsed = JSON.parse(settingData.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as Category[];
      }
    }
  } catch {
    // Fall back to default
  }

  return DEFAULT_CATEGORIES;
}

async function persistCategories(client: any, categories: Category[]) {
  // Sort by display_order
  categories.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  // 1. Persist to site_settings
  try {
    const jsonStr = JSON.stringify(categories);
    await client.from("site_settings").upsert(
      {
        key: "site_categories",
        value: jsonStr,
        description: "Dynamic list of blog categories for CMS and navigation",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" },
    );
  } catch (err) {
    console.warn("[persistCategories] site_settings update notice:", err);
  }

  // 2. Also try writing to categories table if present
  try {
    for (const c of categories) {
      await client.from("categories").upsert({
        name: c.name,
        slug: c.slug,
        description: c.description || null,
        image_url: c.image_url || null,
        status: c.status || "active",
        display_order: c.display_order ?? 0,
        seo_title: c.seo_title || null,
        seo_description: c.seo_description || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: "slug" });
    }
  } catch {
    // categories table not available yet
  }
}

// ---------------- Public Functions ----------------

export const listCategories = createServerFn({ method: "GET" }).handler(
  async (): Promise<Category[]> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const [categories, { data: postsData }] = await Promise.all([
        getStoredCategories(supabaseAdmin),
        supabaseAdmin
          .from("posts")
          .select("id, category, published")
          .eq("published", true),
      ]);

      const publishedPosts = postsData ?? [];

      // Calculate post counts per category (case-insensitive)
      const activeList = categories
        .filter((c) => c.status === "active")
        .map((c) => {
          const matchingCount = publishedPosts.filter(
            (p: any) =>
              (p.category || "").trim().toLowerCase() === c.name.trim().toLowerCase() ||
              (p.category || "").trim().toLowerCase() === c.slug.trim().toLowerCase(),
          ).length;
          return { ...c, post_count: matchingCount };
        });

      return activeList.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
    } catch (err) {
      console.error("[listCategories] Error:", err);
      return DEFAULT_CATEGORIES.filter((c) => c.status === "active");
    }
  },
);

export const getCategoryBySlug = createServerFn({ method: "GET" })
  .validator((input) =>
    z
      .object({
        slug: z.string().min(1),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<{ category: Category; posts: Post[] } | null> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { resolveMediaUrl } = await import("@/lib/admin.functions");
      const cleanSlug = data.slug.toLowerCase().trim();

      const categories = await getStoredCategories(supabaseAdmin);
      const category = categories.find((c) => c.slug.toLowerCase() === cleanSlug);

      if (!category) return null;

      // Query published posts matching category name or slug
      const { data: postsData, error } = await supabaseAdmin
        .from("posts")
        .select(
          "id,title,slug,excerpt,content,cover_image,category,tags,featured,views,reading_minutes,published_at,created_at,author_name,location_name,latitude,longitude,destination_id,destinations(title,slug),post_gallery(id,image_url,alt_text,sort_order),post_translations(language_code,title,excerpt,content)",
        )
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) {
        console.error("[getCategoryBySlug] Posts error:", error);
      }

      const matchingPosts = (postsData ?? [])
        .filter((p: any) => {
          const pCat = (p.category || "").trim().toLowerCase();
          return (
            pCat === category.name.trim().toLowerCase() ||
            pCat === category.slug.trim().toLowerCase() ||
            (Array.isArray(p.tags) && p.tags.some((t: string) => t.toLowerCase() === category.slug))
          );
        })
        .map((p: any) => ({
          ...p,
          cover_image: p.cover_image ? resolveMediaUrl(p.cover_image, supabaseAdmin) : null,
          gallery: p.post_gallery ?? [],
        }));

      return {
        category: {
          ...category,
          post_count: matchingPosts.length,
        },
        posts: matchingPosts as Post[],
      };
    } catch (err) {
      console.error("[getCategoryBySlug] Error:", err);
      return null;
    }
  });

// ---------------- Admin Functions ----------------

export const adminListCategories = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Category[]> => {
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const [categories, { data: postsData }] = await Promise.all([
      getStoredCategories(client),
      client.from("posts").select("id, category, published"),
    ]);

    const allPosts = postsData ?? [];

    const categoriesWithCount = categories.map((c) => {
      const count = allPosts.filter(
        (p: any) =>
          (p.category || "").trim().toLowerCase() === c.name.trim().toLowerCase() ||
          (p.category || "").trim().toLowerCase() === c.slug.trim().toLowerCase(),
      ).length;
      return { ...c, post_count: count };
    });

    return categoriesWithCount.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  });

export const adminUpsertCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input) =>
    z
      .object({
        id: z.string().optional(),
        name: z.string().min(1, "Category name is required").max(100),
        slug: z.string().max(100).optional(),
        description: z.string().max(500).optional().nullable(),
        image_url: z.string().optional().nullable(),
        status: z.enum(["active", "inactive"]).default("active"),
        display_order: z.number().int().default(0),
        seo_title: z.string().max(200).optional().nullable(),
        seo_description: z.string().max(500).optional().nullable(),
      })
      .parse(input),
  )
  .handler(async ({ context, data }): Promise<Category> => {
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const categories = await getStoredCategories(client);

    const name = data.name.trim();
    const slug = data.slug?.trim() ? slugify(data.slug) : slugify(name);

    if (!slug) {
      throw new Error("Could not generate a valid URL slug for category");
    }

    // Check duplicate name or slug (except for current item)
    const duplicate = categories.find(
      (c) =>
        (c.id !== data.id && c.name.toLowerCase() === name.toLowerCase()) ||
        (c.id !== data.id && c.slug.toLowerCase() === slug.toLowerCase()),
    );

    if (duplicate) {
      if (duplicate.name.toLowerCase() === name.toLowerCase()) {
        throw new Error(`Category name "${name}" already exists`);
      }
      throw new Error(`Category slug "${slug}" already exists`);
    }

    const now = new Date().toISOString();
    let updatedCategory: Category;

    if (data.id) {
      // Edit existing
      const idx = categories.findIndex((c) => c.id === data.id);
      if (idx === -1) {
        throw new Error("Category not found");
      }
      const existing = categories[idx];
      const oldName = existing.name;

      updatedCategory = {
        ...existing,
        name,
        slug,
        description: data.description ?? null,
        image_url: data.image_url ?? null,
        status: data.status,
        display_order: data.display_order ?? 0,
        seo_title: data.seo_title ?? null,
        seo_description: data.seo_description ?? null,
        updated_at: now,
      };

      categories[idx] = updatedCategory;

      // If category name changed, update existing posts that had the old category name
      if (oldName !== name) {
        try {
          await client
            .from("posts")
            .update({ category: name })
            .eq("category", oldName);
        } catch (err) {
          console.warn("[adminUpsertCategory] Post category rename note:", err);
        }
      }
    } else {
      // Create new
      const newId = `cat-${slug}-${Date.now().toString(36)}`;
      updatedCategory = {
        id: newId,
        name,
        slug,
        description: data.description ?? null,
        image_url: data.image_url ?? null,
        status: data.status,
        display_order: data.display_order ?? categories.length + 1,
        seo_title: data.seo_title ?? null,
        seo_description: data.seo_description ?? null,
        created_at: now,
        updated_at: now,
      };
      categories.push(updatedCategory);
    }

    await persistCategories(client, categories);
    return updatedCategory;
  });

export const adminDeleteCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input) =>
    z
      .object({
        id: z.string().min(1),
      })
      .parse(input),
  )
  .handler(async ({ context, data }): Promise<{ success: boolean; message: string }> => {
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const categories = await getStoredCategories(client);

    const category = categories.find((c) => c.id === data.id);
    if (!category) {
      throw new Error("Category not found");
    }

    // Safety check: Count assigned posts
    const { data: postsData } = await client
      .from("posts")
      .select("id, title, category")
      .or(`category.eq."${category.name}",category.eq."${category.slug}"`);

    const assignedPosts = postsData ?? [];
    if (assignedPosts.length > 0) {
      throw new Error(
        `This category is currently assigned to ${assignedPosts.length} blog post${
          assignedPosts.length === 1 ? "" : "s"
        }. Please reassign these posts before deleting the category.`,
      );
    }

    const filtered = categories.filter((c) => c.id !== data.id);
    await persistCategories(client, filtered);

    // Also attempt delete from categories table if available
    try {
      await client.from("categories").delete().eq("slug", category.slug);
    } catch {
      // Table delete ignored
    }

    return {
      success: true,
      message: `Category "${category.name}" deleted successfully`,
    };
  });
