import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { V as Route$j, W as authorNameQO, c as useLanguage, u as useTranslations, X as NewsletterForm, b as useServerFn } from "./router-B1ksNLyj.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery, u as useQueryClient, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as createSsrRpc } from "./admin.functions-67-zmleM.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { P as PostCard } from "./PostCard-N_pwtKX9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as PageBreadcrumbs } from "./PageBreadcrumbs-Cdr65Svs.mjs";
import "../_libs/ws.mjs";
import "../_libs/seroval.mjs";
import { U as User, N as Calendar, q as Clock, a5 as List, a6 as Image, X, o as ChevronLeft, n as ChevronRight, s as ArrowLeft, f as ArrowRight, m as MapPin, a7 as Navigation, Z as Check, _ as Share2, a8 as Star } from "../_libs/lucide-react.mjs";
import { M as Markdown } from "../_libs/react-markdown.mjs";
import { r as rehypeRaw } from "../_libs/rehype-raw.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { o as objectType, s as stringType, l as literalType, n as numberType } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./client-BaIz-VBI.mjs";
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
import "crypto";
import "stream";
import "util";
import "./auth-middleware-BO6ULLpK.mjs";
import "./media-fm7scLsn.mjs";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
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
import "../_libs/hast-util-raw.mjs";
import "../_libs/html-void-elements.mjs";
import "../_libs/parse5.mjs";
import "../_libs/entities.mjs";
import "../_libs/web-namespaces.mjs";
import "../_libs/zwitch.mjs";
import "../_libs/hast-util-from-parse5.mjs";
import "../_libs/hastscript.mjs";
import "../_libs/hast-util-parse-selector.mjs";
import "../_libs/vfile-location.mjs";
import "../_libs/hast-util-to-parse5.mjs";
const listComments = createServerFn({
  method: "GET"
}).validator((input) => objectType({
  post_id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("e05065f3f864b75b292013ba6e01d735d76d87baf4e603ece55e3804c242b6ec"));
const getPostRatingStats = createServerFn({
  method: "GET"
}).validator((input) => objectType({
  post_id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("a6a6adde10821551428be57d40d9e74be905929206d6fd8e4e91a2b9fdcdd3c8"));
const postComment = createServerFn({
  method: "POST"
}).validator((input) => objectType({
  post_id: stringType().uuid(),
  comment: stringType().trim().min(1).max(2e3),
  guest_name: stringType().trim().min(1).max(80).optional(),
  guest_email: stringType().trim().email().max(255).optional().or(literalType("")),
  rating: numberType().int().min(1).max(5).optional(),
  // honeypot — must be empty
  website: stringType().max(0).optional().or(literalType(""))
}).parse(input)).handler(createSsrRpc("5556f169e10001dd308be5a06d5fcbf749b723ef2e2bb12b2381202346e8276b"));
function BlogPostMap({ locationName, latitude, longitude, title }) {
  const ref = reactExports.useRef(null);
  const mapRef = reactExports.useRef(null);
  const [mapLoaded, setMapLoaded] = reactExports.useState(false);
  const isValidLat = typeof latitude === "number" && !isNaN(latitude) && latitude >= -90 && latitude <= 90;
  const isValidLng = typeof longitude === "number" && !isNaN(longitude) && longitude >= -180 && longitude <= 180;
  reactExports.useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    if (!isValidLat || !isValidLng || latitude == null || longitude == null) return;
    let isMounted = true;
    if (mapRef.current) {
      try {
        mapRef.current.remove();
      } catch (e) {
      }
      mapRef.current = null;
    }
    if (ref.current._leaflet_id) {
      delete ref.current._leaflet_id;
    }
    import("../_libs/leaflet.mjs").then(function(n) {
      return n.l;
    }).then((LModule) => {
      if (!isMounted || !ref.current || mapRef.current) return;
      const L = LModule.default || LModule;
      if (ref.current._leaflet_id) {
        delete ref.current._leaflet_id;
      }
      const map = L.map(ref.current, {
        scrollWheelZoom: false,
        zoomControl: true
      }).setView([latitude, longitude], 10);
      const primaryTileLayer = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>',
          maxZoom: 19,
          subdomains: "abcd"
        }
      );
      primaryTileLayer.on("tileerror", () => {
        if (!map.hasLayer(fallbackTileLayer)) {
          map.removeLayer(primaryTileLayer);
          fallbackTileLayer.addTo(map);
        }
      });
      const fallbackTileLayer = L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
          maxZoom: 18
        }
      );
      primaryTileLayer.addTo(map);
      const pinIcon = L.divIcon({
        className: "custom-blog-pin",
        html: `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;">
            <div style="position:absolute;width:24px;height:24px;border-radius:9999px;background:rgba(255,122,0,0.3);animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;"></div>
            <div style="width:16px;height:16px;border-radius:9999px;background:#FF7A00;border:2.5px solid #ffffff;box-shadow:0 2px 6px rgba(0,0,0,0.4);position:relative;z-index:2;"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -14]
      });
      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 180px; padding: 2px;">
          ${title ? `<p style="font-size: 13px; font-weight: bold; margin: 0 0 4px; color: #111;">${title}</p>` : ""}
          ${locationName ? `<p style="font-size: 12px; margin: 0 0 6px; color: #555; display: flex; align-items: center; gap: 4px;">📍 ${locationName}</p>` : ""}
          <p style="font-size: 11px; margin: 0; color: #888;">Coordinates: ${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E</p>
        </div>
      `;
      L.marker([latitude, longitude], { icon: pinIcon, title: locationName || title || "Location" }).addTo(map).bindPopup(popupContent).openPopup();
      mapRef.current = map;
      setMapLoaded(true);
    });
    return () => {
      isMounted = false;
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {
        }
        mapRef.current = null;
      }
    };
  }, [latitude, longitude, locationName, title, isValidLat, isValidLng]);
  if (!isValidLat || !isValidLng || latitude == null || longitude == null) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-[#FF7A00]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: locationName || "Story Coordinates" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3.5 w-3.5 text-[#FF7A00]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          latitude.toFixed(4),
          "° N, ",
          longitude.toFixed(4),
          "° E"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[340px] w-full sm:h-[400px]", children: [
      !mapLoaded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center bg-muted/40 animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Loading location map..." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref,
          role: "region",
          "aria-label": `Interactive map of ${locationName || "story location"}`,
          className: "h-full w-full"
        }
      )
    ] })
  ] });
}
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
const getAuthorProfile = createServerFn({
  method: "GET"
}).validator((input) => objectType({
  name: stringType().min(1)
}).parse(input)).handler(createSsrRpc("14ab03ae1250075d926f835d8ad6f723f4c041147b45e9f7c6606a8a82741e17"));
function getInitials(name) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function AuthorProfile({
  authorName,
  postTitle,
  authorImage
}) {
  const t = useTranslations();
  const fetchProfile = useServerFn(getAuthorProfile);
  const [profile, setProfile] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const copyTimeoutRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    fetchProfile({ data: { name: authorName } }).then(setProfile).catch(() => {
    });
  }, [authorName, fetchProfile]);
  reactExports.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);
  const fallbackCopy = async (url) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else if (typeof document !== "undefined") {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      toast.success(t("Link copied"));
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      toast.error(t("Failed to copy link"));
    }
  };
  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareTitle = postTitle || (typeof document !== "undefined" ? document.title : "") || "ndsolotravel";
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: shareTitle,
          url
        });
      } catch (err) {
        if (err?.name === "AbortError") {
          return;
        }
        await fallbackCopy(url);
      }
    } else {
      await fallbackCopy(url);
    }
  };
  const isHussain = profile?.username && profile.username.trim().toLowerCase() === "hussain" || authorName.trim().toLowerCase() === "hussain" || authorName.trim().toLowerCase() === "noman";
  const name = profile?.username || (isHussain ? "Hussain" : authorName);
  const bio = profile?.bio || (isHussain ? "Solo traveler, motorcyclist, and explorer capturing the wild landscapes and hidden roads of the Himalayas, Karakoram, and beyond." : null);
  const avatar = authorImage?.trim() || (isHussain ? "/images/author-hussain.jpg" : profile?.avatar_url);
  const initials = getInitials(name);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-5", children: [
    avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: avatar,
        alt: name,
        className: "h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-accent/20 shadow-sm"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent/10 ring-2 ring-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-accent", children: initials }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center sm:text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center sm:justify-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: t(name) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-2.5 w-2.5" }),
          t("Author")
        ] })
      ] }),
      bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground max-w-lg", children: t(bio) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3.5 flex items-center justify-center sm:justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleShare,
          "aria-label": copied ? t("Link copied") : t("Share"),
          className: `inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95 min-h-[34px] ${copied ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "border-border bg-background/80 hover:bg-accent/10 hover:border-accent/40 text-foreground"}`,
          children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-emerald-500 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Link copied") })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3.5 w-3.5 text-accent shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Share") })
          ] })
        }
      ) })
    ] })
  ] }) });
}
const pageTurnVariants = {
  enter: (direction) => ({
    rotateY: direction > 0 ? 70 : -70,
    opacity: 0,
    scale: 0.9
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: (direction) => ({
    rotateY: direction > 0 ? -70 : 70,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: [0.7, 0, 0.84, 0]
    }
  })
};
function extractText(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node && node.props?.children) {
    return extractText(node.props.children);
  }
  return "";
}
function translateMarkdownChildren(node, t, isDbTranslated) {
  if (isDbTranslated || node == null || typeof node === "boolean") return node;
  if (typeof node === "string") {
    const trimmed = node.trim();
    if (!trimmed) return node;
    if (/^[0-9\s.,/#!$%^&*;:{}=\-_`~()]+$/.test(trimmed)) return node;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || /^https?:\/\//.test(trimmed)) return node;
    const translated = t(trimmed);
    const leading = node.match(/^\s*/)?.[0] || "";
    const trailing = node.match(/\s*$/)?.[0] || "";
    return leading + translated + trailing;
  }
  if (typeof node === "number") return node;
  if (Array.isArray(node)) {
    return node.map((child, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: translateMarkdownChildren(child, t, isDbTranslated) }, i));
  }
  if (typeof node === "object" && reactExports.isValidElement(node)) {
    const el = node;
    if (el.type === "code" || el.type === "pre") return el;
    if (el.props && "children" in el.props) {
      return reactExports.cloneElement(el, {
        ...el.props,
        children: translateMarkdownChildren(el.props.children, t, isDbTranslated)
      });
    }
  }
  return node;
}
function PostPage() {
  const loaderData = Route$j.useLoaderData();
  const {
    post,
    related
  } = loaderData;
  const {
    data: globalAuthor
  } = useQuery({
    ...authorNameQO,
    initialData: loaderData?.authorName
  });
  const authorName = globalAuthor || loaderData?.authorName || "Hussain";
  const postAuthor = post?.author_name || authorName;
  const {
    lang
  } = useLanguage();
  const t = useTranslations();
  const dbTrans = reactExports.useMemo(() => {
    if (!post || lang === "en") return null;
    return post.post_translations?.find((x) => x.language_code === lang) ?? null;
  }, [post, lang]);
  const isDbTranslated = !!dbTrans;
  const localizedPost = reactExports.useMemo(() => {
    if (!post) return null;
    if (lang === "en") return post;
    if (dbTrans) {
      return {
        ...post,
        title: dbTrans.title || post.title,
        excerpt: dbTrans.excerpt || post.excerpt,
        content: dbTrans.content || post.content,
        category: dbTrans.category || post.category,
        seo_title: dbTrans.seo_title || post.seo_title,
        seo_description: dbTrans.seo_description || post.seo_description
      };
    }
    return {
      ...post,
      title: t(post.title),
      excerpt: post.excerpt ? t(post.excerpt) : post.excerpt,
      content: post.content,
      category: t(post.category),
      seo_title: post.seo_title ? t(post.seo_title) : post.seo_title,
      seo_description: post.seo_description ? t(post.seo_description) : post.seo_description
    };
  }, [post, lang, dbTrans, t]);
  const localizedRelated = related;
  const toc = reactExports.useMemo(() => {
    if (!localizedPost?.content) return [];
    const lines = localizedPost.content.split("\n");
    const items = [];
    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const rawText = match[2].trim().replace(/[*_~`]/g, "");
        const id = rawText.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
        const text = isDbTranslated ? rawText : t(rawText);
        items.push({
          id,
          text,
          level
        });
      }
    });
    return items;
  }, [localizedPost, isDbTranslated, t]);
  const [[activeImageIndex, direction], setActiveImageState] = reactExports.useState([null, 0]);
  const gallery = post?.gallery ?? [];
  const activeItem = activeImageIndex !== null ? gallery[activeImageIndex] : null;
  const handlePrevImage = () => {
    if (activeImageIndex === null || gallery.length === 0) return;
    setActiveImageState(([curr]) => curr === null ? [null, 0] : [(curr - 1 + gallery.length) % gallery.length, -1]);
  };
  const handleNextImage = () => {
    if (activeImageIndex === null || gallery.length === 0) return;
    setActiveImageState(([curr]) => curr === null ? [null, 0] : [(curr + 1) % gallery.length, 1]);
  };
  reactExports.useEffect(() => {
    if (activeImageIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") setActiveImageState([null, 0]);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, gallery.length]);
  if (!post || !localizedPost) return null;
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
  const prevStory = localizedRelated[0] ?? null;
  const nextStory = localizedRelated[1] ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReadingProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "banner-hover relative h-[60vh] min-h-[420px] w-full overflow-hidden", children: [
      post.cover_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.cover_image, alt: localizedPost.title, referrerPolicy: "no-referrer", className: "h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-4 pb-12 text-white sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageBreadcrumbs, { items: [{
          label: "Stories",
          href: "/blog"
        }, {
          label: localizedPost.title
        }] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs uppercase tracking-[0.2em] text-accent", children: t(localizedPost.category) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl", children: localizedPost.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap items-center gap-4 text-xs text-white/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 font-semibold text-white", children: [
            post.author_image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.author_image_url, alt: postAuthor, className: "h-4 w-4 rounded-full object-cover ring-1 ring-white/30" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5 text-accent" }),
            "By ",
            postAuthor,
            " · ndsolotravel"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
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
      localizedPost.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl leading-relaxed text-muted-foreground border-l-2 border-accent pl-4 py-1 italic", children: localizedPost.excerpt }),
      toc.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { "aria-label": t("Table of Contents"), className: "my-8 rounded-2xl border border-border bg-card p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-display text-sm font-semibold text-foreground mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Expedition Contents") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-xs", children: toc.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { style: {
          paddingLeft: item.level === 3 ? "1.25rem" : "0"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `#${item.id}`, className: "text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-accent/60" }),
          item.text
        ] }) }, item.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose-blog mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { rehypePlugins: [rehypeRaw], components: {
          h1: ({
            children
          }) => {
            const raw = extractText(children);
            const id = raw.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
            return /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { id, className: "scroll-mt-24 font-display text-3xl font-bold mt-10 mb-4 text-foreground", children: translateMarkdownChildren(children, t, isDbTranslated) });
          },
          h2: ({
            children
          }) => {
            const raw = extractText(children);
            const id = raw.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
            return /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id, className: "scroll-mt-24 font-display text-2xl font-bold mt-10 mb-4 text-foreground", children: translateMarkdownChildren(children, t, isDbTranslated) });
          },
          h3: ({
            children
          }) => {
            const raw = extractText(children);
            const id = raw.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
            return /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id, className: "scroll-mt-24 font-display text-xl font-semibold mt-8 mb-3 text-foreground", children: translateMarkdownChildren(children, t, isDbTranslated) });
          },
          h4: ({
            children
          }) => {
            const raw = extractText(children);
            const id = raw.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
            return /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { id, className: "scroll-mt-24 font-display text-lg font-semibold mt-6 mb-2 text-foreground", children: translateMarkdownChildren(children, t, isDbTranslated) });
          },
          p: ({
            children
          }) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed mb-5 text-foreground", children: translateMarkdownChildren(children, t, isDbTranslated) }),
          li: ({
            children
          }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "mb-2 leading-relaxed text-foreground", children: translateMarkdownChildren(children, t, isDbTranslated) }),
          blockquote: ({
            children
          }) => /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "my-6 border-l-4 border-accent bg-muted/40 py-3.5 px-5 italic rounded-r-xl text-base text-foreground shadow-sm", children: translateMarkdownChildren(children, t, isDbTranslated) }),
          figcaption: ({
            children
          }) => /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "mt-2 text-center text-xs text-muted-foreground italic", children: translateMarkdownChildren(children, t, isDbTranslated) }),
          img: ({
            src,
            alt,
            ...props
          }) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: alt && !isDbTranslated ? t(alt) : alt, referrerPolicy: "no-referrer", className: "my-6 rounded-2xl w-full object-cover", ...props })
        }, children: localizedPost.content }),
        post.latitude != null && post.longitude != null && /* @__PURE__ */ jsxRuntimeExports.jsx(BlogPostMap, { locationName: post.location_name, latitude: post.latitude, longitude: post.longitude, title: localizedPost.title })
      ] }),
      gallery.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-14 rounded-2xl border border-border bg-card p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl font-bold flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-5 w-5 text-accent" }),
          " ",
          t("Photo Gallery")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: gallery.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { whileHover: {
          scale: 1.02
        }, onClick: () => setActiveImageState([idx, 0]), className: "group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-muted/30 aspect-4/3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image_url, alt: item.alt_text || `${localizedPost.title} photo ${idx + 1}`, className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" }),
          item.alt_text && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 line-clamp-2", children: item.alt_text })
        ] }, item.id || idx)) })
      ] }),
      activeItem && activeImageIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-md transition-all duration-300", onClick: () => setActiveImageState([null, 0]), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-4 top-4 sm:left-6 sm:top-6 z-[52]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-black/75 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20 backdrop-blur-md shadow-lg", children: [
          activeImageIndex + 1,
          " / ",
          gallery.length
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Close", onClick: (e) => {
          e.stopPropagation();
          setActiveImageState([null, 0]);
        }, className: "absolute right-4 top-4 sm:right-6 sm:top-6 z-[52] flex h-11 w-11 items-center justify-center rounded-full bg-black/75 text-white border border-white/20 backdrop-blur-md hover:bg-black/95 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex max-h-[85vh] max-w-[95vw] sm:max-w-[90vw] items-center justify-center overflow-hidden rounded-2xl shadow-2xl bg-black/40 [perspective:1200px]", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, custom: direction, mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: activeItem.image_url, alt: activeItem.alt_text || "Zoomed photo", custom: direction, variants: pageTurnVariants, initial: "enter", animate: "center", exit: "exit", className: "max-h-[85vh] max-w-[95vw] sm:max-w-[90vw] rounded-2xl object-contain select-none shadow-2xl", style: {
            backfaceVisibility: "hidden"
          } }, activeItem.id || activeImageIndex) }),
          gallery.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Previous photo", onClick: (e) => {
            e.stopPropagation();
            handlePrevImage();
          }, className: "absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/75 hover:bg-black/95 text-white border-2 border-white/40 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-7 w-7 sm:h-8 sm:w-8 text-white drop-shadow-md" }) }),
          gallery.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Next photo", onClick: (e) => {
            e.stopPropagation();
            handleNextImage();
          }, className: "absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/75 hover:bg-black/95 text-white border-2 border-white/40 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-7 w-7 sm:h-8 sm:w-8 text-white drop-shadow-md" }) })
        ] }),
        activeItem.alt_text && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[52] max-w-lg w-[90vw] text-center pointer-events-none", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "inline-block rounded-2xl bg-black/80 px-5 py-2.5 text-xs sm:text-sm font-medium text-white border border-white/20 backdrop-blur-md shadow-xl", children: activeItem.alt_text }) })
      ] }),
      post.tags?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex flex-wrap gap-2", children: post.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", search: {
        tag
      }, className: "rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-accent hover:text-accent", children: [
        "#",
        tag
      ] }, tag)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AuthorProfile, { authorName: postAuthor, postTitle: localizedPost.title, authorImage: post.author_image_url }),
      (prevStory || nextStory) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid gap-4 sm:grid-cols-2 border-t border-border pt-8", children: [
        prevStory ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
          slug: prevStory.slug
        }, className: "group flex flex-col p-4 rounded-2xl border border-border hover:border-accent/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3 w-3" }),
            " ",
            t("Previous Story")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 font-display text-base font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1", children: t(prevStory.title) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
        nextStory ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
          slug: nextStory.slug
        }, className: "group flex flex-col p-4 rounded-2xl border border-border hover:border-accent/50 transition-colors text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center justify-end gap-1", children: [
            t("Next Story"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 font-display text-base font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1", children: t(nextStory.title) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-14 rounded-3xl border border-border bg-muted/30 p-6 sm:p-8 text-center shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold", children: t("Enjoyed this dispatch?") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground max-w-md mx-auto", children: t("Get an email when a new expedition story drops. No spam, no algorithm noise.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterForm, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsSection, { postId: post.id })
    ] }),
    localizedRelated.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: t("Keep reading") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: localizedRelated.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: p, index: i }, p.id)) })
    ] })
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
  postId
}) {
  const t = useTranslations();
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
      toast.success(t("Post review"));
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
        const displayName = c.guest_name || c.author?.username || "Traveller";
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
      comments && comments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Be the first to leave a review." })
    ] })
  ] });
}
export {
  PostPage as component
};
