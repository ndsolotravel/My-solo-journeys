import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { listAllPostSlugs } from "@/lib/posts.functions";
import { listDestinations } from "@/lib/destinations.functions";
import { listCategories } from "@/lib/categories.functions";
import { getAllTopicSlugs } from "@/lib/topics";

const BASE_URL = "https://ndsolotravel.com";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = await listAllPostSlugs();
        const dests = await listDestinations();
        let categories: any[] = [];
        try {
          categories = await listCategories();
        } catch {
          // ignore error
        }

        const staticEntries = [
          { path: "/", priority: "1.0", changefreq: "weekly" as const },
          { path: "/blog", priority: "0.9", changefreq: "daily" as const },
          { path: "/destinations", priority: "0.8", changefreq: "weekly" as const },
          { path: "/gallery", priority: "0.7", changefreq: "weekly" as const },
          { path: "/about", priority: "0.6", changefreq: "monthly" as const },
          { path: "/contact", priority: "0.5", changefreq: "monthly" as const },
          { path: "/privacy-policy", priority: "0.3", changefreq: "monthly" as const },
          { path: "/disclaimer", priority: "0.3", changefreq: "monthly" as const },
        ];

        const postEntries = posts
          .filter((p) => p.slug && p.slug.trim())
          .map((p) => ({
            path: `/blog/${p.slug.trim()}`,
            lastmod: p.updated_at ? new Date(p.updated_at).toISOString() : undefined,
            changefreq: "monthly" as const,
            priority: "0.8",
          }));

        const destEntries = dests
          .filter((d) => d.slug && d.slug.trim())
          .map((d) => {
            // Normalize slug if old un-migrated slug was present
            const cleanSlug = d.slug.trim() === "Mahe=Praslin-La digue=Seychelles"
              ? "seychelles-mahe-praslin-la-digue"
              : d.slug.trim();
            return {
              path: `/destinations/${cleanSlug}`,
              changefreq: "weekly" as const,
              priority: "0.8",
            };
          });

        const topicEntries = getAllTopicSlugs().map((slug) => ({
          path: `/topics/${slug}`,
          changefreq: "weekly" as const,
          priority: "0.7",
        }));

        const categoryEntries = categories
          .filter((c) => (c.post_count ?? 0) > 0 && c.slug)
          .map((c) => ({
            path: `/category/${c.slug}`,
            changefreq: "weekly" as const,
            priority: "0.7",
          }));

        const all = [...staticEntries, ...postEntries, ...destEntries, ...topicEntries, ...categoryEntries];

        const urls = all.map((e) => {
          const loc = escapeXml(`${BASE_URL}${e.path}`);
          const lastmodTag = "lastmod" in e && e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : "";
          return `  <url><loc>${loc}</loc>${lastmodTag}<changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`;
        });

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        });
      },
    },
  },
});
