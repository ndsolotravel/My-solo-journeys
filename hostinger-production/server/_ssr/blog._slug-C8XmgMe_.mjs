import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, b as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { x as Route$9, u as useTranslator, a as useServerFn, w as createSsrRpc } from "./router-Pb4k1ggT.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { P as PostCard } from "./PostCard-BAPeSPfi.mjs";
import { a as useLocalizedPosts } from "./useLocalized-cp7Zp1YA.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { y as ArrowLeft, f as MapPin, l as Calendar, v as Clock, z as Image, D as Share2, H as Star } from "../_libs/lucide-react.mjs";
import { M as Markdown } from "../_libs/react-markdown.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { o as objectType, s as stringType, l as literalType, n as numberType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./client-BaX1TKIB.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-7J1GkVFt.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/devlop.mjs";
import "../_libs/unified.mjs";
import "../_libs/bail.mjs";
import "../_libs/extend.mjs";
import "../_libs/is-plain-obj.mjs";
import "../_libs/trough.mjs";
import "../_libs/vfile.mjs";
import "../_libs/vfile-message.mjs";
import "../_libs/unist-util-stringify-position.mjs";
import "node:process";
import "node:path";
import "node:url";
import "../_libs/remark-parse.mjs";
import "../_libs/mdast-util-from-markdown.mjs";
import "../_libs/micromark-util-decode-numeric-character-reference+[...].mjs";
import "../_libs/micromark-util-decode-string.mjs";
import "../_libs/decode-named-character-reference+[...].mjs";
import "../_libs/character-entities.mjs";
import "../_libs/micromark-util-normalize-identifier+[...].mjs";
import "../_libs/micromark.mjs";
import "../_libs/micromark-util-combine-extensions+[...].mjs";
import "../_libs/micromark-util-chunked.mjs";
import "../_libs/micromark-factory-space.mjs";
import "../_libs/micromark-util-character.mjs";
import "../_libs/micromark-core-commonmark.mjs";
import "../_libs/micromark-util-classify-character+[...].mjs";
import "../_libs/micromark-util-resolve-all.mjs";
import "../_libs/micromark-util-subtokenize.mjs";
import "../_libs/micromark-factory-destination.mjs";
import "../_libs/micromark-factory-label.mjs";
import "../_libs/micromark-factory-title.mjs";
import "../_libs/micromark-factory-whitespace.mjs";
import "../_libs/micromark-util-html-tag-name.mjs";
import "../_libs/mdast-util-to-string.mjs";
import "../_libs/remark-rehype.mjs";
import "../_libs/mdast-util-to-hast.mjs";
import "../_libs/ungap__structured-clone.mjs";
import "../_libs/micromark-util-sanitize-uri.mjs";
import "../_libs/unist-util-position.mjs";
import "../_libs/trim-lines.mjs";
import "../_libs/unist-util-visit.mjs";
import "../_libs/unist-util-visit-parents.mjs";
import "../_libs/unist-util-is.mjs";
import "../_libs/hast-util-to-jsx-runtime.mjs";
import "../_libs/comma-separated-tokens.mjs";
import "../_libs/property-information.mjs";
import "../_libs/space-separated-tokens.mjs";
import "../_libs/style-to-js.mjs";
import "../_libs/style-to-object.mjs";
import "../_libs/inline-style-parser.mjs";
import "../_libs/hast-util-whitespace.mjs";
import "../_libs/estree-util-is-identifier-name.mjs";
import "../_libs/html-url-attributes.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const listComments = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  post_id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("e05065f3f864b75b292013ba6e01d735d76d87baf4e603ece55e3804c242b6ec"));
const getPostRatingStats = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  post_id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("a6a6adde10821551428be57d40d9e74be905929206d6fd8e4e91a2b9fdcdd3c8"));
const postComment = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  post_id: stringType().uuid(),
  comment: stringType().trim().min(1).max(2e3),
  guest_name: stringType().trim().min(1).max(80).optional(),
  guest_email: stringType().trim().email().max(255).optional().or(literalType("")),
  rating: numberType().int().min(1).max(5).optional(),
  // honeypot — must be empty
  website: stringType().max(0).optional().or(literalType(""))
}).parse(input)).handler(createSsrRpc("5556f169e10001dd308be5a06d5fcbf749b723ef2e2bb12b2381202346e8276b"));
function ReadingProgress() {
  const [p, setP] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? scrolled / total * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed left-0 right-0 top-0 z-[60] h-0.5 bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-accent transition-[width]", style: { width: `${p}%` } }) });
}
function PostPage() {
  const {
    post,
    related
  } = Route$9.useLoaderData();
  const localizedPost = useLocalizedPosts(post ? [post] : [], {
    includeContent: true
  })[0] ?? post;
  const localizedRelated = useLocalizedPosts(related);
  const [activeImage, setActiveImage] = reactExports.useState(null);
  const t = useTranslator(["Stories", "min read", "Keep reading", "Story not found", "This trail has been moved or doesn't exist.", "Back to all stories", "Reviews & Comments", "rating", "ratings", "Your rating", "Name (optional)", "Email (optional, not shown)", "Share your thoughts…", "No account needed. Email is private.", "Post review", "Posting…", "Be the first to leave a review.", "Could not post review", "Please write a review", "Share", "Facebook", "LinkedIn", "Copy link", "Link copied", "Reviews & Comments", "Your rating", "Rating", "Review posted", "Traveller", "Photo Gallery", "Traveled on", "Destination"]);
  if (!post) return null;
  const date = new Date(post.published_at ?? post.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const formattedTravelDate = post.travel_date ? new Date(post.travel_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }) : null;
  const dest = post.destinations;
  const gallery = post.gallery ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReadingProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[60vh] min-h-[420px] w-full overflow-hidden", children: [
      post.cover_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.cover_image, alt: localizedPost.title, className: "h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-4 pb-12 text-white sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-2 text-xs text-white/80 hover:text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3 w-3" }),
            " ",
            t("Stories")
          ] }),
          dest && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/destinations/$slug", params: {
            slug: dest.slug
          }, className: "inline-flex items-center gap-1 rounded-full bg-accent/20 backdrop-blur-md px-3 py-1 text-xs font-medium text-amber-300 hover:bg-accent/30 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
            " ",
            dest.title
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs uppercase tracking-[0.2em] text-accent", children: localizedPost.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl", children: localizedPost.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap items-center gap-4 text-xs text-white/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: date }),
          formattedTravelDate && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-amber-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
              " ",
              t("Traveled on"),
              " ",
              formattedTravelDate
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            " ",
            post.reading_minutes,
            " ",
            t("min read")
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-12 max-w-3xl px-4 sm:px-6", children: [
      post.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl leading-relaxed text-muted-foreground", children: localizedPost.excerpt }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose-blog mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { children: localizedPost.content }) }),
      gallery.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-14 rounded-2xl border border-border bg-card p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl font-bold flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-5 w-5 text-accent" }),
          " ",
          t("Photo Gallery")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: gallery.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { whileHover: {
          scale: 1.02
        }, onClick: () => setActiveImage(item.image_url), className: "group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-muted/30 aspect-4/3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image_url, alt: item.alt_text || `${localizedPost.title} photo ${idx + 1}`, className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" }),
          item.alt_text && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 line-clamp-2", children: item.alt_text })
        ] }, item.id || idx)) })
      ] }),
      activeImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xs", onClick: () => setActiveImage(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: activeImage, alt: "Zoomed photo", className: "max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl" }) }),
      post.tags?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex flex-wrap gap-2", children: post.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", search: {
        tag
      }, className: "rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-accent hover:text-accent", children: [
        "#",
        t(tag)
      ] }, tag)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShareBar, { title: localizedPost.title, t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsSection, { postId: post.id, t })
    ] }),
    localizedRelated.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: t("Keep reading") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: localizedRelated.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: p, index: i }, p.id)) })
    ] })
  ] });
}
function ShareBar({
  title,
  t
}) {
  const [url, setUrl] = reactExports.useState("");
  reactExports.useEffect(() => setUrl(window.location.href), []);
  const enc = encodeURIComponent(url);
  const tt = encodeURIComponent(title);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex items-center gap-3 border-y border-border py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: t("Share") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://twitter.com/intent/tweet?url=${enc}&text=${tt}`, target: "_blank", rel: "noreferrer", className: "text-xs hover:text-accent", children: "X" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://www.facebook.com/sharer/sharer.php?u=${enc}`, target: "_blank", rel: "noreferrer", className: "text-xs hover:text-accent", children: t("Facebook") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc}`, target: "_blank", rel: "noreferrer", className: "text-xs hover:text-accent", children: t("LinkedIn") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
      navigator.clipboard.writeText(url);
      toast.success(t("Link copied"));
    }, className: "ml-auto text-xs text-muted-foreground hover:text-accent", children: t("Copy link") })
  ] });
}
function StarDisplay({
  value,
  size = 16
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-0.5", "aria-label": `${value} out of 5 stars`, children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { style: {
    width: size,
    height: size
  }, className: i <= Math.round(value) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40" }, i)) });
}
function StarPicker({
  value,
  onChange
}) {
  const [hover, setHover] = reactExports.useState(0);
  const active = hover || value;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-1", role: "radiogroup", "aria-label": "Rating", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.button, { type: "button", role: "radio", "aria-checked": value === i, "aria-label": `${i} star${i > 1 ? "s" : ""}`, onMouseEnter: () => setHover(i), onMouseLeave: () => setHover(0), onClick: () => onChange(i), whileTap: {
    scale: 0.85
  }, whileHover: {
    scale: 1.15
  }, className: "rounded p-1 outline-none focus-visible:ring-2 focus-visible:ring-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-7 w-7 transition-colors ${i <= active ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}` }) }, i)) });
}
function CommentsSection({
  postId,
  t
}) {
  const listFn = useServerFn(listComments);
  const postFn = useServerFn(postComment);
  const statsFn = useServerFn(getPostRatingStats);
  const qc = useQueryClient();
  const {
    data: comments
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => listFn({
      data: {
        post_id: postId
      }
    })
  });
  const {
    data: stats
  } = useQuery({
    queryKey: ["rating-stats", postId],
    queryFn: () => statsFn({
      data: {
        post_id: postId
      }
    })
  });
  const [text, setText] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [rating, setRating] = reactExports.useState(0);
  const [website, setWebsite] = reactExports.useState("");
  const [submittedAt, setSubmittedAt] = reactExports.useState(0);
  const mut = useMutation({
    mutationFn: () => postFn({
      data: {
        post_id: postId,
        comment: text,
        guest_name: name.trim() || void 0,
        guest_email: email.trim() || void 0,
        rating: rating || void 0,
        website
      }
    }),
    onSuccess: () => {
      setText("");
      setRating(0);
      toast.success(t("Review posted"));
      qc.invalidateQueries({
        queryKey: ["comments", postId]
      });
      qc.invalidateQueries({
        queryKey: ["rating-stats", postId]
      });
    },
    onError: (e) => toast.error(e.message || t("Could not post review"))
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return toast.error(t("Please write a review"));
    const now = Date.now();
    if (now - submittedAt < 4e3) return;
    setSubmittedAt(now);
    mut.mutate();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold", children: t("Reviews & Comments") }),
      stats && stats.count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StarDisplay, { value: stats.average, size: 18 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          stats.average.toFixed(1),
          " · ",
          stats.count,
          " ",
          stats.count === 1 ? t("rating") : t("ratings")
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "mt-6 rounded-2xl border border-border bg-muted/20 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: t("Your rating") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StarPicker, { value: rating, onChange: setRating })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: t("Name (optional)"), maxLength: 80, className: "rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: t("Email (optional, not shown)"), maxLength: 255, className: "rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: text, onChange: (e) => setText(e.target.value), rows: 3, maxLength: 2e3, placeholder: t("Share your thoughts…"), className: "mt-3 w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-accent", required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", name: "website", value: website, onChange: (e) => setWebsite(e.target.value), tabIndex: -1, autoComplete: "off", "aria-hidden": "true", className: "absolute left-[-9999px] top-auto h-0 w-0 opacity-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("No account needed. Email is private.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: mut.isPending || !text.trim(), className: "rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50", children: mut.isPending ? "…" : t("Post review") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
      (comments ?? []).map((c, i) => {
        const displayName = c.guest_name || c.author?.username || t("Traveller");
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 8
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.25,
          delay: Math.min(i * 0.03, 0.2)
        }, className: "border-b border-border pb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold uppercase", children: displayName.slice(0, 1) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: displayName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(c.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                }) })
              ] })
            ] }),
            c.rating ? /* @__PURE__ */ jsxRuntimeExports.jsx(StarDisplay, { value: c.rating }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed whitespace-pre-wrap", children: c.comment })
        ] }, c.id);
      }),
      comments && comments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("Be the first to leave a review.") })
    ] })
  ] });
}
export {
  PostPage as component
};
