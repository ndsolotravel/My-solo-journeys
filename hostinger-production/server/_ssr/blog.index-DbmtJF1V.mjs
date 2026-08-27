import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useTranslations, b as Route$m, c as blogQO, g as categoriesQO, C as CATEGORIES, h as authorNameQO$1, e as destQO, f as activeTopicsQO } from "./router-kn1dHUrL.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useSuspenseQuery, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as PostCard } from "./PostCard-DhzkT9Y_.mjs";
import { P as PageBreadcrumbs, B as BreadcrumbJsonLd } from "./PageBreadcrumbs-BXmNalQL.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { b as Sparkles, p as Clock, l as MapPin, f as ArrowRight, S as Search, P as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./admin.functions-DGJYtjjS.mjs";
import "./auth-middleware-BO6ULLpK.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "./client-BaIz-VBI.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const POPULAR_TAGS = ["Karakoram", "Nanga Parbat", "Solo Ride", "Camping", "Passes", "Gear"];
function BlogIndex() {
  const t = useTranslations();
  const search = Route$m.useSearch();
  const navigate = Route$m.useNavigate();
  const {
    data
  } = useSuspenseQuery(blogQO({
    category: search.category,
    tag: search.tag,
    search: search.q,
    sort: search.sort,
    destination: search.destination
  }));
  const {
    data: destinations
  } = useSuspenseQuery(destQO);
  const {
    data: activeTopics
  } = useSuspenseQuery(activeTopicsQO);
  const {
    data: dynamicCategories
  } = useQuery(categoriesQO);
  const displayCategories = reactExports.useMemo(() => {
    if (dynamicCategories && dynamicCategories.length > 0) {
      return dynamicCategories.map((c) => c.name);
    }
    return [...CATEGORIES];
  }, [dynamicCategories]);
  const {
    data: globalAuthor
  } = useQuery(authorNameQO$1);
  const authorName = globalAuthor || "Hussain";
  let posts = data.posts;
  if (search.destination) {
    posts = posts.filter((p) => p.destinations?.slug === search.destination || p.destination_id === search.destination);
  }
  const [q, setQ] = reactExports.useState(search.q ?? "");
  const featuredPost = reactExports.useMemo(() => {
    if (search.category || search.tag || search.q || search.destination) return null;
    return posts.find((p) => p.featured) || posts[0];
  }, [posts, search]);
  const gridPosts = reactExports.useMemo(() => {
    if (!featuredPost) return posts;
    return posts.filter((p) => p.id !== featuredPost.id);
  }, [posts, featuredPost]);
  const hasActiveFilters = Boolean(search.category || search.tag || search.q || search.destination || search.sort);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[45vh] min-h-[320px] w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=80", alt: "Expedition trail at sunrise", className: "h-full w-full object-cover object-center" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/85" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
          " ",
          t("Expedition Journal")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl", children: t("Stories from the road, the trail, and the saddle.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PageBreadcrumbs, { items: [{
          label: "Stories"
        }] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 max-w-xl text-sm text-white/80", children: [
          data.total,
          " ",
          data.total === 1 ? t("story") : t("stories"),
          " ",
          t("published from remote borders and high mountain passes.")
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbJsonLd, { items: [{
        label: "Stories",
        href: "/blog"
      }] }),
      featuredPost && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
        slug: featuredPost.slug
      }, className: "group grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-xl md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] md:aspect-auto overflow-hidden bg-muted", children: [
          featuredPost.cover_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: featuredPost.cover_image, alt: featuredPost.title, className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow", children: t("Featured Story") }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col justify-between p-6 sm:p-8 lg:p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: [
            featuredPost.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-accent/10 px-2 py-0.5 font-medium text-accent", children: t(featuredPost.category) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              " ",
              featuredPost.reading_minutes,
              " ",
              t("min read")
            ] }),
            featuredPost.location_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              " ",
              featuredPost.location_name
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-accent sm:text-3xl", children: t(featuredPost.title) }),
          featuredPost.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm sm:text-base text-muted-foreground line-clamp-3 leading-relaxed", children: t(featuredPost.excerpt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between border-t border-border/60 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "By ",
              featuredPost.author_name || authorName,
              " · ",
              new Date(featuredPost.published_at ?? featuredPost.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform", children: [
              t("Read story"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 rtl:rotate-180" })
            ] })
          ] })
        ] }) })
      ] }) }),
      !hasActiveFilters && activeTopics.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent", children: t("Explore Topics") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-6 font-display text-xl font-bold text-foreground", children: t("Deep dives into the places and adventures that matter.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: activeTopics.map((topic) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/topics/$slug", params: {
          slug: topic.slug
        }, className: "group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-accent/40 hover:shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-36 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: topic.previewImage || topic.heroImage, alt: topic.title, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground group-hover:text-accent transition-colors", children: t(topic.title) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground line-clamp-2", children: t(topic.subtitle) })
          ] })
        ] }, topic.slug)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 space-y-6 rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
            e.preventDefault();
            navigate({
              search: (prev) => ({
                ...prev,
                q: q || void 0
              })
            });
          }, className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: t("Search stories, trails, passes…"), className: "w-full rounded-full border border-border bg-background py-2.5 pl-11 pr-4 text-sm outline-none focus:border-accent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: search.destination ?? "", onChange: (e) => navigate({
              search: (prev) => ({
                ...prev,
                destination: e.target.value || void 0
              })
            }), "aria-label": t("Filter by destination"), className: "rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground outline-none focus:border-accent cursor-pointer pr-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: t("All Destinations") }),
              destinations.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: d.slug, children: [
                d.title,
                " (",
                d.country,
                ")"
              ] }, d.id))
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-full border border-border bg-background p-1 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => navigate({
                search: (prev) => ({
                  ...prev,
                  sort: void 0
                })
              }), className: `rounded-full px-3 py-1 transition-colors ${!search.sort || search.sort === "latest" ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:text-foreground"}`, children: t("Newest") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => navigate({
                search: (prev) => ({
                  ...prev,
                  sort: "popular"
                })
              }), className: `rounded-full px-3 py-1 transition-colors ${search.sort === "popular" ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:text-foreground"}`, children: t("Most Popular") })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 border-t border-border/60 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3 w-3 text-accent" }),
            " ",
            t("Categories")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", search: (prev) => ({
            ...prev,
            category: void 0
          }), className: `rounded-full border px-3.5 py-1 text-xs transition-colors ${!search.category ? "border-foreground bg-foreground text-background font-medium" : "border-border hover:border-accent"}`, children: t("All") }),
          displayCategories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", search: (prev) => ({
            ...prev,
            category: c
          }), className: `rounded-full border px-3.5 py-1 text-xs transition-colors ${search.category === c ? "border-foreground bg-foreground text-background font-medium" : "border-border hover:border-accent"}`, children: t(c) }, c))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-2 text-[11px] text-muted-foreground uppercase tracking-wider", children: [
            t("Topics"),
            ":"
          ] }),
          POPULAR_TAGS.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", search: (prev) => ({
            ...prev,
            tag: search.tag === tag ? void 0 : tag
          }), className: `rounded-md border px-2.5 py-0.5 text-[11px] transition-colors ${search.tag === tag ? "border-accent bg-accent/10 text-accent font-medium" : "border-border/60 text-muted-foreground hover:border-accent"}`, children: [
            "#",
            tag
          ] }, tag)),
          hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", search: {}, className: "ml-auto text-xs text-accent hover:underline font-medium", children: t("Clear all filters") })
        ] })
      ] }),
      gridPosts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card p-16 text-center shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground", children: t("No expedition stories found") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t("Try adjusting your search criteria or clearing filters.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", search: {}, className: "mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background hover:opacity-90", children: t("View all stories") })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: gridPosts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: p, index: i }, p.id)) })
    ] })
  ] });
}
export {
  BlogIndex as component
};
