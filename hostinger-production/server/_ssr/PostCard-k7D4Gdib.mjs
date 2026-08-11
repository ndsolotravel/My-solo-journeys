import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useTranslator } from "./router-D4hdc9iv.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { v as Clock, w as ArrowUpRight } from "../_libs/lucide-react.mjs";
function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function PostCard({ post, index = 0 }) {
  const t = useTranslator(["min read", "Read story"]);
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
          post.cover_image && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: post.cover_image,
              alt: post.title,
              loading: "lazy",
              className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground", children: post.category }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(post.published_at ?? post.created_at) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            post.reading_minutes,
            " ",
            t("min read")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1.5 font-display text-xl font-semibold leading-snug group-hover:text-accent transition-colors", children: post.title }),
        post.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 line-clamp-2 text-sm text-muted-foreground", children: post.excerpt }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-2 inline-flex items-center gap-1 text-xs font-medium text-foreground", children: [
          t("Read story"),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })
        ] })
      ] })
    }
  );
}
export {
  PostCard as P
};
