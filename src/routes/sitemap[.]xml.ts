import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { listAllPostSlugs } from "@/lib/posts.functions";
import { listDestinations } from "@/lib/destinations.functions";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = await listAllPostSlugs();
        const dests = await listDestinations();
        const staticEntries = [
          { path: "/", priority: "1.0", changefreq: "weekly" as const },
          { path: "/blog", priority: "0.9", changefreq: "daily" as const },
          { path: "/destinations", priority: "0.8", changefreq: "weekly" as const },
          { path: "/gallery", priority: "0.7", changefreq: "weekly" as const },
          { path: "/about", priority: "0.5", changefreq: "monthly" as const },
          { path: "/contact", priority: "0.4", changefreq: "monthly" as const },
        ];
        const postEntries = posts.map((p) => ({
          path: `/blog/${p.slug}`,
          lastmod: p.updated_at,
          changefreq: "monthly" as const,
          priority: "0.8",
        }));
        const destEntries = dests.map((d) => ({
          path: `/destinations/${d.slug}`,
          changefreq: "monthly" as const,
          priority: "0.6",
        }));
        const all = [...staticEntries, ...postEntries, ...destEntries];
        const urls = all.map(
          (e) =>
            `  <url><loc>${BASE_URL}${e.path}</loc>${"lastmod" in e && e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}<changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
