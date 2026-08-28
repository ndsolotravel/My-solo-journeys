import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useTranslations, c as useLanguage } from "./router-CwfUlP7t.mjs";
import { r as resolveMediaUrl } from "./media-fm7scLsn.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { m as MapPin, q as Clock, a0 as ArrowUpRight } from "../_libs/lucide-react.mjs";
function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function PostCard({ post, index = 0 }) {
  const t = useTranslations();
  const { lang } = useLanguage();
  const localizedPost = reactExports.useMemo(() => {
    if (lang === "en") return post;
    const translation = post.post_translations?.find((x) => x.language_code === lang);
    if (translation) {
      return {
        ...post,
        title: translation.title || post.title,
        excerpt: translation.excerpt || post.excerpt
      };
    }
    return {
      ...post,
      title: t(post.title),
      excerpt: post.excerpt ? t(post.excerpt) : post.excerpt
    };
  }, [post, lang, t]);
  const coverUrl = reactExports.useMemo(() => {
    const raw = localizedPost.cover_image || post.cover_image;
    return raw ? resolveMediaUrl(raw) : "";
  }, [localizedPost.cover_image, post.cover_image]);
  const destination = post.destinations;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.article,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.5, delay: Math.min(index * 0.05, 0.3) },
      className: "group",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog/$slug", params: { slug: post.slug }, className: "block h-full w-full", children: coverUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: coverUrl,
              alt: localizedPost.title,
              loading: "lazy",
              referrerPolicy: "no-referrer",
              onError: (e) => {
                const target = e.currentTarget;
                if (!target.src.includes("unsplash.com")) {
                  target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";
                }
              },
              className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider", children: t("No Image") }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-3 top-3 rtl:left-auto rtl:right-3 flex flex-wrap items-center gap-1.5 pointer-events-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-xs shadow-xs", children: t(localizedPost.category) }),
            destination ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/destinations/$slug",
                params: { slug: destination.slug },
                className: "inline-flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 text-xs font-medium text-white shadow-xs hover:bg-accent transition-colors backdrop-blur-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: localizedPost.location_name || t(destination.title) })
                ]
              }
            ) : localizedPost.location_name ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 text-xs font-medium text-white shadow-xs backdrop-blur-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: localizedPost.location_name })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(localizedPost.published_at ?? localizedPost.created_at) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            localizedPost.reading_minutes,
            " ",
            t("min read")
          ] }),
          (destination || localizedPost.location_name) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
            destination ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/destinations/$slug",
                params: { slug: destination.slug },
                className: "inline-flex items-center gap-1 text-accent hover:underline font-medium",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
                  localizedPost.location_name || t(destination.title)
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-accent font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              localizedPost.location_name
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: { slug: post.slug }, className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1.5 font-display text-xl font-semibold leading-snug group-hover:text-accent transition-colors", children: localizedPost.title }),
          localizedPost.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 line-clamp-2 text-sm text-muted-foreground", children: localizedPost.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-2 inline-flex items-center gap-1 text-xs font-medium text-foreground", children: [
            t("Read story"),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:scale-x-[-1]" })
          ] })
        ] })
      ] })
    }
  );
}
export {
  PostCard as P
};
