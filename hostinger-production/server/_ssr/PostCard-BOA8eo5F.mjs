import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useTranslations, f as useLanguage } from "./router-DI8cL3Jq.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { s as Clock, t as ArrowUpRight } from "../_libs/lucide-react.mjs";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.article,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.5, delay: Math.min(index * 0.05, 0.3) },
      className: "group",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: { slug: post.slug }, className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted", children: [
          localizedPost.cover_image && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: localizedPost.cover_image,
              alt: localizedPost.title,
              loading: "lazy",
              className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-3 rtl:left-auto rtl:right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground", children: t(localizedPost.category) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(localizedPost.published_at ?? localizedPost.created_at) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            localizedPost.reading_minutes,
            " ",
            t("min read")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1.5 font-display text-xl font-semibold leading-snug group-hover:text-accent transition-colors", children: localizedPost.title }),
        localizedPost.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 line-clamp-2 text-sm text-muted-foreground", children: localizedPost.excerpt }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-2 inline-flex items-center gap-1 text-xs font-medium text-foreground", children: [
          t("Read story"),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:scale-x-[-1]" })
        ] })
      ] })
    }
  );
}
export {
  PostCard as P
};
