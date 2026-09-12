import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { T as TOPIC_CLUSTERS, g as getTopicBySlug } from "./topics-T4Y39Ysn.mjs";
import { extractCountryFromLocation } from "./posts.functions-BXjHMmZB.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "./createSsrRpc-BLJWJFkS.mjs";
const listActiveTopics_createServerFn_handler = createServerRpc({
  id: "9161b4436f201e809bf5082c23fa618ba73a6a57ac9f0eb8d0f3c04852e32d0d",
  name: "listActiveTopics",
  filename: "src/lib/topics.functions.ts"
}, (opts) => listActiveTopics.__executeServer(opts));
const listActiveTopics = createServerFn({
  method: "GET"
}).handler(listActiveTopics_createServerFn_handler, async () => {
  try {
    const {
      supabaseAdmin
    } = await import("./client.server-CVdEp4yu.mjs");
    const {
      resolveMediaUrl
    } = await import("./admin.functions-BnsOwYmY.mjs");
    const {
      data: postsData,
      error: postErr
    } = await supabaseAdmin.from("posts").select("id,title,slug,cover_image,category,tags,destination_id,location_name,published_at,created_at,destinations(id,title,slug,country,region)").eq("published", true).order("published_at", {
      ascending: false,
      nullsFirst: false
    });
    if (postErr) {
      console.error("[listActiveTopics] Posts query error:", postErr.message);
    }
    const {
      data: destsData,
      error: destErr
    } = await supabaseAdmin.from("destinations").select("id,title,slug,featured_image,country,region");
    if (destErr) {
      console.error("[listActiveTopics] Destinations query error:", destErr.message);
    }
    const posts = postsData ?? [];
    const destinations = destsData ?? [];
    const activeTopics = [];
    for (const topic of TOPIC_CLUSTERS) {
      const topicCountry = (topic.country || "").trim().toLowerCase();
      const matchingPosts = posts.filter((p) => {
        const postCountry = (p.destinations?.country || extractCountryFromLocation(p.location_name) || "").trim().toLowerCase();
        if (topicCountry && postCountry && postCountry !== topicCountry) {
          return false;
        }
        if (topic.destinationSlugs && topic.destinationSlugs.length > 0) {
          const dSlug = p.destinations?.slug;
          if (dSlug && topic.destinationSlugs.some((ds) => ds.toLowerCase() === dSlug.toLowerCase())) {
            return true;
          }
        }
        const postCat = (p.category || "").trim().toLowerCase();
        const matchCat = topic.categories.some((c) => c.toLowerCase() === postCat);
        const postTags = Array.isArray(p.tags) ? p.tags.map((t) => String(t).trim().toLowerCase()) : [];
        const matchTag = topic.tags.some((t) => postTags.includes(t.toLowerCase()));
        if (!matchCat && !matchTag) return false;
        if (topicCountry && !postCountry) {
          const loc = (p.location_name || "").toLowerCase();
          if (!loc.includes(topicCountry)) return false;
        }
        return true;
      });
      const matchingDests = destinations.filter((d) => {
        const destCountry = (d.country || "").trim().toLowerCase();
        if (topicCountry && destCountry && destCountry !== topicCountry) {
          return false;
        }
        if (topic.destinationSlugs && topic.destinationSlugs.length > 0) {
          if (topic.destinationSlugs.some((ds) => ds.toLowerCase() === (d.slug || "").toLowerCase())) {
            return true;
          }
        }
        const title = (d.title || "").toLowerCase();
        const region = (d.region || "").toLowerCase();
        return topic.tags.some((t) => {
          const lowTag = t.toLowerCase();
          return title.includes(lowTag) || region.includes(lowTag);
        });
      });
      const postCount = matchingPosts.length;
      const destinationCount = matchingDests.length;
      if (postCount > 0 || destinationCount > 0) {
        let previewImage = "";
        if (topic.heroImage && topic.heroImage.trim()) {
          previewImage = resolveMediaUrl(topic.heroImage, supabaseAdmin);
        } else if (matchingPosts[0]?.cover_image) {
          previewImage = resolveMediaUrl(matchingPosts[0].cover_image, supabaseAdmin);
        } else if (matchingDests[0]?.featured_image) {
          previewImage = resolveMediaUrl(matchingDests[0].featured_image, supabaseAdmin);
        }
        activeTopics.push({
          ...topic,
          postCount,
          destinationCount,
          previewImage: previewImage || ""
        });
      }
    }
    return activeTopics;
  } catch (err) {
    console.error("[listActiveTopics] Error:", err);
    return [];
  }
});
const getTopicCluster_createServerFn_handler = createServerRpc({
  id: "8c6e7c8fac799d8bc78df9bc76e4b36e6d4e852682711602c40868363265359f",
  name: "getTopicCluster",
  filename: "src/lib/topics.functions.ts"
}, (opts) => getTopicCluster.__executeServer(opts));
const getTopicCluster = createServerFn({
  method: "GET"
}).validator((input) => objectType({
  slug: stringType().min(1)
}).parse(input)).handler(getTopicCluster_createServerFn_handler, async ({
  data
}) => {
  const topic = getTopicBySlug(data.slug);
  if (!topic) return null;
  try {
    const {
      supabaseAdmin
    } = await import("./client.server-CVdEp4yu.mjs");
    const {
      resolveMediaUrl
    } = await import("./admin.functions-BnsOwYmY.mjs");
    const topicCountry = (topic.country || "").trim().toLowerCase();
    const query = supabaseAdmin.from("posts").select("id,title,slug,excerpt,cover_image,category,tags,featured,views,reading_minutes,published_at,created_at,author_name,location_name,seo_title,seo_description,og_image_url,destination_id,destinations(id,title,slug,country,region)").eq("published", true).order("published_at", {
      ascending: false,
      nullsFirst: false
    });
    const {
      data: posts,
      error
    } = await query;
    if (error) {
      console.error("[getTopicCluster] Query error:", error.message);
      return {
        ...topic,
        posts: []
      };
    }
    const allPosts = posts ?? [];
    const matchingPosts = allPosts.filter((p) => {
      const postCountry = (p.destinations?.country || extractCountryFromLocation(p.location_name) || "").trim().toLowerCase();
      if (topicCountry && postCountry && postCountry !== topicCountry) {
        return false;
      }
      if (topic.destinationSlugs && topic.destinationSlugs.length > 0) {
        const dSlug = p.destinations?.slug;
        if (dSlug && topic.destinationSlugs.some((ds) => ds.toLowerCase() === dSlug.toLowerCase())) {
          return true;
        }
      }
      const postCat = (p.category || "").trim().toLowerCase();
      const matchCat = topic.categories.some((c) => c.toLowerCase() === postCat);
      const postTags = Array.isArray(p.tags) ? p.tags.map((t) => String(t).trim().toLowerCase()) : [];
      const matchTag = topic.tags.some((t) => postTags.includes(t.toLowerCase()));
      if (!matchCat && !matchTag) return false;
      if (topicCountry && !postCountry) {
        const loc = (p.location_name || "").toLowerCase();
        if (!loc.includes(topicCountry)) return false;
      }
      return true;
    });
    const resolved = matchingPosts.map((p) => ({
      ...p,
      cover_image: p.cover_image ? resolveMediaUrl(p.cover_image, supabaseAdmin) : null,
      og_image_url: p.og_image_url ? resolveMediaUrl(p.og_image_url, supabaseAdmin) : null
    }));
    let heroImg = topic.heroImage ? resolveMediaUrl(topic.heroImage, supabaseAdmin) : "";
    if (!heroImg && resolved[0]?.cover_image) {
      heroImg = resolved[0].cover_image;
    }
    return {
      ...topic,
      heroImage: heroImg,
      posts: resolved
    };
  } catch (err) {
    console.error("[getTopicCluster] Error:", err);
    return {
      ...topic,
      posts: []
    };
  }
});
export {
  getTopicCluster_createServerFn_handler,
  listActiveTopics_createServerFn_handler
};
