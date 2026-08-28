import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/ws.mjs";
import { o as objectType, s as stringType, n as numberType, e as enumType } from "../_libs/zod.mjs";
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
const DEFAULT_CATEGORIES = [{
  id: "cat-solo-travel",
  name: "Solo Travel",
  slug: "solo-travel",
  description: "Independent expeditions, solo mindset, and journeys into remote frontiers.",
  image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80",
  status: "active",
  display_order: 1,
  seo_title: "Solo Travel Stories & Expedition Logs — ndsolotravel",
  seo_description: "Explore independent solo travel journeys, mountain expeditions, and insights across Pakistan and beyond."
}, {
  id: "cat-motorcycle-journeys",
  name: "Motorcycle Journeys",
  slug: "motorcycle-journeys",
  description: "Long-distance motorcycle adventures, mountain passes, and highway diaries.",
  image_url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&q=80",
  status: "active",
  display_order: 2,
  seo_title: "Solo Motorcycle Journeys & Karakoram Routes — ndsolotravel",
  seo_description: "Motorcycle expedition diaries, high pass crossings, and motorcycle travel stories from northern Pakistan."
}, {
  id: "cat-trekking",
  name: "Trekking",
  slug: "trekking",
  description: "High-altitude trails, base camps, glaciers, and wilderness hiking expeditions.",
  image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
  status: "active",
  display_order: 3,
  seo_title: "Trekking & Mountain Expeditions — ndsolotravel",
  seo_description: "Remote trekking diaries from K2 Base Camp, Concordia, Nanga Parbat, and high alpine trails."
}, {
  id: "cat-travel-guides",
  name: "Travel Guides",
  slug: "travel-guides",
  description: "Honest, detailed route guides, logistics, permits, and preparation advice.",
  image_url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80",
  status: "active",
  display_order: 4,
  seo_title: "Mountain Travel Guides & Route Logistics — ndsolotravel",
  seo_description: "Comprehensive, field-tested travel guides for navigating remote destinations safely and independently."
}, {
  id: "cat-destinations",
  name: "Destinations",
  slug: "destinations",
  description: "Alpine valleys, base camps, and remote frontier settlements across Pakistan.",
  image_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80",
  status: "active",
  display_order: 5,
  seo_title: "Destination Highlights & Alpine Valleys — ndsolotravel",
  seo_description: "In-depth explorations of iconic mountain destinations, valleys, and wilderness locations."
}, {
  id: "cat-adventure",
  name: "Adventure",
  slug: "adventure",
  description: "Off-the-beaten-path expeditions and wild frontier crossings.",
  image_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80",
  status: "active",
  display_order: 6,
  seo_title: "Wild Adventures & Frontier Expeditions — ndsolotravel",
  seo_description: "Stories of wilderness survival, wild crossings, and unconventional travel adventures."
}, {
  id: "cat-photography",
  name: "Photography",
  slug: "photography",
  description: "Visual dispatches, landscape photography, and light from high altitudes.",
  image_url: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1600&q=80",
  status: "active",
  display_order: 7,
  seo_title: "High-Altitude Photography & Visual Field Notes — ndsolotravel",
  seo_description: "Visual dispatches and landscape photography capturing the Karakoram and Himalaya in natural light."
}, {
  id: "cat-field-notes",
  name: "Field Notes",
  slug: "field-notes",
  description: "Raw observations, reflections, and thoughts recorded on the road.",
  image_url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80",
  status: "active",
  display_order: 8,
  seo_title: "Field Notes & Solitary Thoughts — ndsolotravel",
  seo_description: "Unfiltered journals and reflections from solitary mountain trails and remote base camps."
}, {
  id: "cat-budget-travel",
  name: "Budget Travel",
  slug: "budget-travel",
  description: "Cost breakdowns, local stays, and practical budget tips for mountain travel.",
  image_url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80",
  status: "active",
  display_order: 9,
  seo_title: "Budget Mountain Travel Tips — ndsolotravel",
  seo_description: "Practical guides and transparent cost breakdowns for traveling remote mountains on a budget."
}, {
  id: "cat-nanga-parbat",
  name: "Nanga Parbat",
  slug: "nanga-parbat",
  description: "Expeditions, base camps, and stories around the Killer Mountain.",
  image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80",
  status: "active",
  display_order: 10,
  seo_title: "Nanga Parbat Stories & Fairy Meadows Guides — ndsolotravel",
  seo_description: "Expedition diaries and trekking accounts from the slopes of the 8,126m Killer Mountain."
}, {
  id: "cat-motorcycle-adventure-travel",
  name: "Motorcycle Adventure Travel",
  slug: "motorcycle-adventure-travel",
  description: "Solo motorcycle expeditions through high mountain passes.",
  image_url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&q=80",
  status: "active",
  display_order: 11,
  seo_title: "Motorcycle Adventure Travel — ndsolotravel",
  seo_description: "High altitude motorcycle touring, mechanical repairs on the road, and pass crossings."
}];
function slugify(text) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
async function getStoredCategories(client) {
  try {
    const {
      data: tableData,
      error: tableErr
    } = await client.from("categories").select("*").order("display_order", {
      ascending: true
    });
    if (!tableErr && tableData && tableData.length > 0) {
      return tableData;
    }
  } catch {
  }
  try {
    const {
      data: settingData,
      error: settingErr
    } = await client.from("site_settings").select("value").eq("key", "site_categories").maybeSingle();
    if (!settingErr && settingData?.value) {
      const parsed = JSON.parse(settingData.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
  }
  return DEFAULT_CATEGORIES;
}
async function persistCategories(client, categories) {
  categories.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  try {
    const jsonStr = JSON.stringify(categories);
    await client.from("site_settings").upsert({
      key: "site_categories",
      value: jsonStr,
      description: "Dynamic list of blog categories for CMS and navigation",
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }, {
      onConflict: "key"
    });
  } catch (err) {
    console.warn("[persistCategories] site_settings update notice:", err);
  }
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
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }, {
        onConflict: "slug"
      });
    }
  } catch {
  }
}
const listCategories_createServerFn_handler = createServerRpc({
  id: "11f09a767096a7c8056f64f933b9d4604fa74357d694e1436af5782976dc3b74",
  name: "listCategories",
  filename: "src/lib/categories.functions.ts"
}, (opts) => listCategories.__executeServer(opts));
const listCategories = createServerFn({
  method: "GET"
}).handler(listCategories_createServerFn_handler, async () => {
  try {
    const {
      supabaseAdmin
    } = await import("./client.server-Dg1wI_zl.mjs");
    const [categories, {
      data: postsData
    }] = await Promise.all([getStoredCategories(supabaseAdmin), supabaseAdmin.from("posts").select("id, category, published").eq("published", true)]);
    const publishedPosts = postsData ?? [];
    const activeList = categories.filter((c) => c.status === "active").map((c) => {
      const matchingCount = publishedPosts.filter((p) => (p.category || "").trim().toLowerCase() === c.name.trim().toLowerCase() || (p.category || "").trim().toLowerCase() === c.slug.trim().toLowerCase()).length;
      return {
        ...c,
        post_count: matchingCount
      };
    });
    return activeList.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  } catch (err) {
    console.error("[listCategories] Error:", err);
    return DEFAULT_CATEGORIES.filter((c) => c.status === "active");
  }
});
const getCategoryBySlug_createServerFn_handler = createServerRpc({
  id: "36c6a4e76a76bf4a189af9bbed4e4d6439e9a4acdb9c4f52ab791b173a03cbe1",
  name: "getCategoryBySlug",
  filename: "src/lib/categories.functions.ts"
}, (opts) => getCategoryBySlug.__executeServer(opts));
const getCategoryBySlug = createServerFn({
  method: "GET"
}).validator((input) => objectType({
  slug: stringType().min(1)
}).parse(input)).handler(getCategoryBySlug_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      supabaseAdmin
    } = await import("./client.server-Dg1wI_zl.mjs");
    const {
      resolveMediaUrl
    } = await import("./admin.functions-67-zmleM.mjs").then((n) => n.x);
    const cleanSlug = data.slug.toLowerCase().trim();
    const categories = await getStoredCategories(supabaseAdmin);
    const category = categories.find((c) => c.slug.toLowerCase() === cleanSlug);
    if (!category) return null;
    const {
      data: postsData,
      error
    } = await supabaseAdmin.from("posts").select("id,title,slug,excerpt,content,cover_image,category,tags,featured,views,reading_minutes,published_at,created_at,author_name,location_name,latitude,longitude,destination_id,destinations(title,slug),post_gallery(id,image_url,alt_text,sort_order),post_translations(language_code,title,excerpt,content)").eq("published", true).order("published_at", {
      ascending: false
    });
    if (error) {
      console.error("[getCategoryBySlug] Posts error:", error);
    }
    const matchingPosts = (postsData ?? []).filter((p) => {
      const pCat = (p.category || "").trim().toLowerCase();
      return pCat === category.name.trim().toLowerCase() || pCat === category.slug.trim().toLowerCase() || Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase() === category.slug);
    }).map((p) => ({
      ...p,
      cover_image: p.cover_image ? resolveMediaUrl(p.cover_image, supabaseAdmin) : null,
      gallery: p.post_gallery ?? []
    }));
    return {
      category: {
        ...category,
        post_count: matchingPosts.length
      },
      posts: matchingPosts
    };
  } catch (err) {
    console.error("[getCategoryBySlug] Error:", err);
    return null;
  }
});
const adminListCategories_createServerFn_handler = createServerRpc({
  id: "85dbbed3f83f5c7974101e536e5abd4a20f4781da47096aacd133095d93fc1f1",
  name: "adminListCategories",
  filename: "src/lib/categories.functions.ts"
}, (opts) => adminListCategories.__executeServer(opts));
const adminListCategories = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminListCategories_createServerFn_handler, async ({
  context
}) => {
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const [categories, {
    data: postsData
  }] = await Promise.all([getStoredCategories(client), client.from("posts").select("id, category, published")]);
  const allPosts = postsData ?? [];
  const categoriesWithCount = categories.map((c) => {
    const count = allPosts.filter((p) => (p.category || "").trim().toLowerCase() === c.name.trim().toLowerCase() || (p.category || "").trim().toLowerCase() === c.slug.trim().toLowerCase()).length;
    return {
      ...c,
      post_count: count
    };
  });
  return categoriesWithCount.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
});
const adminUpsertCategory_createServerFn_handler = createServerRpc({
  id: "4184e107b02cc5d3386f814d73d2a7f40796b5b94d0a73f13fa8faa643f6df33",
  name: "adminUpsertCategory",
  filename: "src/lib/categories.functions.ts"
}, (opts) => adminUpsertCategory.__executeServer(opts));
const adminUpsertCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => objectType({
  id: stringType().optional(),
  name: stringType().min(1, "Category name is required").max(100),
  slug: stringType().max(100).optional(),
  description: stringType().max(500).optional().nullable(),
  image_url: stringType().optional().nullable(),
  status: enumType(["active", "inactive"]).default("active"),
  display_order: numberType().int().default(0),
  seo_title: stringType().max(200).optional().nullable(),
  seo_description: stringType().max(500).optional().nullable()
}).parse(input)).handler(adminUpsertCategory_createServerFn_handler, async ({
  context,
  data
}) => {
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const categories = await getStoredCategories(client);
  const name = data.name.trim();
  const slug = data.slug?.trim() ? slugify(data.slug) : slugify(name);
  if (!slug) {
    throw new Error("Could not generate a valid URL slug for category");
  }
  const duplicate = categories.find((c) => c.id !== data.id && c.name.toLowerCase() === name.toLowerCase() || c.id !== data.id && c.slug.toLowerCase() === slug.toLowerCase());
  if (duplicate) {
    if (duplicate.name.toLowerCase() === name.toLowerCase()) {
      throw new Error(`Category name "${name}" already exists`);
    }
    throw new Error(`Category slug "${slug}" already exists`);
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  let updatedCategory;
  if (data.id) {
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
      updated_at: now
    };
    categories[idx] = updatedCategory;
    if (oldName !== name) {
      try {
        await client.from("posts").update({
          category: name
        }).eq("category", oldName);
      } catch (err) {
        console.warn("[adminUpsertCategory] Post category rename note:", err);
      }
    }
  } else {
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
      updated_at: now
    };
    categories.push(updatedCategory);
  }
  await persistCategories(client, categories);
  return updatedCategory;
});
const adminDeleteCategory_createServerFn_handler = createServerRpc({
  id: "1032c4f50ff9d1b08d12ac5e025fafed9684ba93d59634e544902732947b5f98",
  name: "adminDeleteCategory",
  filename: "src/lib/categories.functions.ts"
}, (opts) => adminDeleteCategory.__executeServer(opts));
const adminDeleteCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => objectType({
  id: stringType().min(1)
}).parse(input)).handler(adminDeleteCategory_createServerFn_handler, async ({
  context,
  data
}) => {
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const categories = await getStoredCategories(client);
  const category = categories.find((c) => c.id === data.id);
  if (!category) {
    throw new Error("Category not found");
  }
  const {
    data: postsData
  } = await client.from("posts").select("id, title, category").or(`category.eq."${category.name}",category.eq."${category.slug}"`);
  const assignedPosts = postsData ?? [];
  if (assignedPosts.length > 0) {
    throw new Error(`This category is currently assigned to ${assignedPosts.length} blog post${assignedPosts.length === 1 ? "" : "s"}. Please reassign these posts before deleting the category.`);
  }
  const filtered = categories.filter((c) => c.id !== data.id);
  await persistCategories(client, filtered);
  try {
    await client.from("categories").delete().eq("slug", category.slug);
  } catch {
  }
  return {
    success: true,
    message: `Category "${category.name}" deleted successfully`
  };
});
export {
  adminDeleteCategory_createServerFn_handler,
  adminListCategories_createServerFn_handler,
  adminUpsertCategory_createServerFn_handler,
  getCategoryBySlug_createServerFn_handler,
  listCategories_createServerFn_handler
};
