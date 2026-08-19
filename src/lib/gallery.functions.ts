import { createServerFn } from "@tanstack/react-start";
import { resolveMediaUrl } from "@/lib/admin.functions";

export type GalleryItem = {
  id: string;
  image_url: string;
  caption: string | null;
  category: string | null;
  width: number | null;
  height: number | null;
  post_id?: string | null;
};

function extractMarkdownImages(markdown?: string | null): { url: string; alt: string }[] {
  if (!markdown || typeof markdown !== "string") return [];
  const results: { url: string; alt: string }[] = [];
  const mdRegex = /!\[([^\]]*)\]\((https?:\/\/[^\s)]+|\/[^\s)]+|blog-media\/[^\s)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = mdRegex.exec(markdown)) !== null) {
    if (match[2]) {
      results.push({ alt: match[1] || "", url: match[2] });
    }
  }
  return results;
}

export const listGallery = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  // 1. Fetch site settings to resolve About page picture & author name
  const { data: settings } = await supabaseAdmin
    .from("site_settings")
    .select("key, value")
    .in("key", ["about_image_url", "blog_author_name"]);

  const aboutSetting = settings?.find((s) => s.key === "about_image_url");
  const authorSetting = settings?.find((s) => s.key === "blog_author_name");
  const authorName = authorSetting?.value?.trim() || "Noman";
  const aboutImageUrl = aboutSetting?.value?.trim()
    ? resolveMediaUrl(aboutSetting.value.trim(), supabaseAdmin)
    : "/assets/nd-about.jpg";

  // 2. Fetch all published posts with their cover_image and post_gallery items
  const { data: posts, error: postsError } = await (supabaseAdmin
    .from("posts") as any)
    .select(
      "id, title, slug, content, cover_image, category, created_at, published_at, post_gallery(id, image_url, alt_text, sort_order, created_at)",
    )
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (postsError) {
    console.warn("[listGallery] Error fetching posts gallery:", postsError);
  }

  const items: GalleryItem[] = [];
  const seenUrls = new Set<string>();

  const addItem = (item: GalleryItem, rawUrl: string) => {
    if (!rawUrl || typeof rawUrl !== "string") return;
    const cleanKey = rawUrl.trim().toLowerCase();
    if (seenUrls.has(cleanKey)) return;
    seenUrls.add(cleanKey);
    items.push(item);
  };

  // A. Add About Page Picture
  if (aboutImageUrl) {
    addItem(
      {
        id: "about-portrait",
        image_url: aboutImageUrl,
        caption: `${authorName} — ndsolotravel`,
        category: "About",
        width: 1200,
        height: 1600,
      },
      aboutImageUrl,
    );
  }

  // B. Add images from published posts (Cover Photo, Post Gallery, and Markdown images)
  if (posts && Array.isArray(posts)) {
    for (const post of posts) {
      // 1. Cover Photo
      if (post.cover_image && typeof post.cover_image === "string" && post.cover_image.trim()) {
        const resolved = resolveMediaUrl(post.cover_image, supabaseAdmin);
        if (resolved) {
          addItem(
            {
              id: `post-cover-${post.id}`,
              image_url: resolved,
              caption: post.title || null,
              category: post.category || "Mountains",
              width: 1600,
              height: 1067,
              post_id: post.id,
            },
            post.cover_image,
          );
        }
      }

      // 2. Post Gallery items
      const postGalleryItems = (post as any).post_gallery;
      if (Array.isArray(postGalleryItems)) {
        const sorted = [...postGalleryItems].sort(
          (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
        );
        for (const pg of sorted) {
          if (pg.image_url && typeof pg.image_url === "string" && pg.image_url.trim()) {
            const resolved = resolveMediaUrl(pg.image_url, supabaseAdmin);
            if (resolved) {
              addItem(
                {
                  id: `post-gal-${pg.id}`,
                  image_url: resolved,
                  caption: pg.alt_text || post.title || null,
                  category: post.category || "Mountains",
                  width: 1600,
                  height: 1067,
                  post_id: post.id,
                },
                pg.image_url,
              );
            }
          }
        }
      }

      // 3. Markdown content images
      const contentImages = extractMarkdownImages(post.content);
      for (let i = 0; i < contentImages.length; i++) {
        const ci = contentImages[i];
        const resolved = resolveMediaUrl(ci.url, supabaseAdmin);
        if (resolved) {
          addItem(
            {
              id: `post-content-${post.id}-${i}`,
              image_url: resolved,
              caption: ci.alt || post.title || null,
              category: post.category || "Mountains",
              width: 1600,
              height: 1067,
              post_id: post.id,
            },
            ci.url,
          );
        }
      }
    }
  }

  return items;
});

