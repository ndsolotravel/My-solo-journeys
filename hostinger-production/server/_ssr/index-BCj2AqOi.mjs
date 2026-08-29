import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useTranslations, c as useLanguage, Q as slugify, C as CATEGORIES, X as NewsletterForm, Y as postsQO, Z as featuredQO, _ as destQO$2, $ as topicsQO, a0 as galleryQO, a1 as motoQO, a2 as journeyStatsQO, a3 as homepageQO, a4 as breakingNewsQO, S as SITE } from "./router-4rQzLbsf.mjs";
import { f as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { g as gsapWithCSS, S as ScrollTrigger } from "../_libs/gsap.mjs";
import { r as resolveMediaUrl } from "./media-fm7scLsn.mjs";
import { D as Dialog, a as DialogContent } from "./dialog-DcfalasJ.mjs";
import { A as AdSlot } from "./AdSlot-DPYKPH6A.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { H as Earth, B as Bike, J as Camera, R as Route, N as Calendar, f as ArrowRight, m as MapPin, O as LayoutGrid, P as Map, o as ChevronLeft, n as ChevronRight, V as Flame, q as Clock, Z as Check, _ as Share2, $ as ExternalLink, a0 as ArrowUpRight, I as Instagram, Y as Youtube, T as Twitter, y as Mountain, v as Compass } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./admin.functions-67-zmleM.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
if (typeof window !== "undefined") {
  gsapWithCSS.registerPlugin(ScrollTrigger);
}
function CountUp({
  end,
  duration = 2,
  suffix = ""
}) {
  const ref = reactExports.useRef(null);
  const [display, setDisplay] = reactExports.useState(end);
  reactExports.useEffect(() => {
    if (!ref.current) return;
    const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(end);
      return;
    }
    setDisplay(0);
    const obj = { v: 0 };
    const tween = gsapWithCSS.to(obj, {
      v: end,
      duration,
      ease: "power3.out",
      onUpdate: () => setDisplay(Math.round(obj.v)),
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true
      }
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [end, duration]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, className: "tabular-nums", children: [
    display.toLocaleString(),
    suffix
  ] });
}
if (typeof window !== "undefined") {
  gsapWithCSS.registerPlugin(ScrollTrigger);
}
function useGsapReveal() {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsapWithCSS.context(() => {
      const headings = root.querySelectorAll('[data-reveal="heading"]');
      const cards = root.querySelectorAll('[data-reveal="card"]');
      const featured = root.querySelectorAll('[data-reveal="featured"]');
      const info = root.querySelectorAll('[data-reveal="info"]');
      const tl = gsapWithCSS.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true
        }
      });
      tl.from(headings, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08
      }).from(
        cards,
        {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08
        },
        "-=0.3"
      ).from(
        featured,
        {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
          onStart: () => {
            featured.forEach((el) => el.classList.add("is-glowing"));
          }
        },
        "-=0.3"
      ).from(
        info,
        {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08
        },
        "-=0.4"
      );
    }, root);
    return () => ctx.revert();
  }, []);
  return ref;
}
function DestinationCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] w-full rounded-2xl bg-muted" }) });
}
function HeroSlider({ slides, intervalMs = 1e4, className = "" }) {
  const [index, setIndex] = reactExports.useState(0);
  const count = slides.length;
  const prevSlide = reactExports.useCallback(() => {
    if (count < 2) return;
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);
  const nextSlide = reactExports.useCallback(() => {
    if (count < 2) return;
    setIndex((i) => (i + 1) % count);
  }, [count]);
  reactExports.useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs, index]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `absolute inset-0 overflow-hidden ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, mode: "sync", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.img,
      {
        src: slides[index].src,
        alt: slides[index].alt,
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 1.1, ease: "easeInOut" },
        loading: index === 0 ? "eager" : "lazy",
        fetchPriority: index === 0 ? "high" : "auto",
        className: "absolute inset-0 h-full w-full object-cover animate-ken-burns"
      },
      index
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" }),
    count > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: prevSlide,
          "aria-label": "Previous Hero image",
          className: "hidden md:inline-flex absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 h-11 w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white/85 backdrop-blur-md transition-all duration-200 hover:bg-black/65 hover:text-white hover:border-white/50 hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 cursor-pointer pointer-events-auto group",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5 lg:h-6 lg:w-6 transition-transform duration-200 group-hover:-translate-x-0.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: nextSlide,
          "aria-label": "Next Hero image",
          className: "hidden md:inline-flex absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 h-11 w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white/85 backdrop-blur-md transition-all duration-200 hover:bg-black/65 hover:text-white hover:border-white/50 hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 cursor-pointer pointer-events-auto group",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 lg:h-6 lg:w-6 transition-transform duration-200 group-hover:translate-x-0.5" })
        }
      )
    ] }),
    count > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2", children: slides.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setIndex(i),
        "aria-label": `Go to slide ${i + 1}`,
        className: `h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"}`
      },
      i
    )) })
  ] });
}
function SectionHeading({
  title,
  subtitle,
  badge,
  linkText,
  linkTo,
  linkHash,
  rightElement,
  accentColor = "#FF7A00",
  className = ""
}) {
  const t = useTranslations();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mb-8 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl", children: t(title) }),
        badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline-flex items-center rounded-full bg-[#FF7A00]/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#FF7A00]", children: t(badge) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex flex-1 mx-4 h-[2px] rounded-full bg-gradient-to-r from-[#FF7A00] via-border to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
        rightElement,
        linkText && linkTo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: linkTo,
            hash: linkHash,
            className: "inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-[#FF7A00]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(linkText) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180", children: "→" })
            ]
          }
        )
      ] })
    ] }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: t(subtitle) })
  ] });
}
function formatDate$2(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function TrendingStories({
  primaryPost,
  secondaryPosts,
  categories
}) {
  const t = useTranslations();
  const { lang } = useLanguage();
  const getPostTitle = (p) => {
    if (lang !== "en" && p.post_translations) {
      const trans = p.post_translations.find((x) => x.language_code === lang);
      if (trans?.title) return trans.title;
    }
    return t(p.title);
  };
  const getPostExcerpt = (p) => {
    if (lang !== "en" && p.post_translations) {
      const trans = p.post_translations.find((x) => x.language_code === lang);
      if (trans?.excerpt) return trans.excerpt;
    }
    return p.excerpt ? t(p.excerpt) : null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-12 w-full min-w-0", children: [
    primaryPost ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.article,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-md lg:col-span-5 w-full min-w-0",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: { slug: primaryPost.slug }, className: "flex h-full flex-col w-full min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] w-full overflow-hidden bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: primaryPost.cover_image ? resolveMediaUrl(primaryPost.cover_image) : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80",
                alt: getPostTitle(primaryPost),
                loading: "lazy",
                onError: (e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes("unsplash.com")) {
                    target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";
                  }
                },
                className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-3 rtl:left-auto rtl:right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-[#FF7A00] px-2.5 py-1 text-[11px] sm:px-3 sm:py-1 sm:text-xs font-semibold uppercase tracking-wider text-white shadow-sm", children: t(primaryPost.category || "Story") }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col justify-between p-4 sm:p-6 w-full min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 text-[#FF7A00]/80" }),
                  formatDate$2(primaryPost.published_at || primaryPost.created_at)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "text-muted-foreground/50", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 text-[#FF7A00]/80" }),
                  primaryPost.reading_minutes,
                  " ",
                  t("min read")
                ] }),
                primaryPost.destinations ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "text-muted-foreground/50", children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[#FF7A00] font-medium min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: t(primaryPost.destinations.title) })
                  ] })
                ] }) : primaryPost.location_name ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "text-muted-foreground/50", children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-muted-foreground min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-[#FF7A00] shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: primaryPost.location_name })
                  ] })
                ] }) : null
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2.5 sm:mt-3 font-display text-xl sm:text-2xl lg:text-3xl font-bold leading-snug text-foreground transition-colors group-hover:text-[#FF7A00] break-words [overflow-wrap:anywhere]", children: getPostTitle(primaryPost) }),
              getPostExcerpt(primaryPost) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground line-clamp-3 break-words leading-relaxed", children: getPostExcerpt(primaryPost) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FF7A00]", children: [
              t("Read full story"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" })
            ] }) })
          ] })
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 lg:col-span-5 w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("No stories available") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 sm:gap-4 lg:col-span-4 w-full min-w-0", children: secondaryPosts.map((post, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.article,
      {
        initial: { opacity: 0, y: 15 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: idx * 0.08 },
        className: "group flex flex-1 flex-col justify-center rounded-2xl border border-border bg-card p-3 sm:p-4 shadow-sm transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-md w-full min-w-0",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: { slug: post.slug }, className: "flex items-center gap-3 sm:gap-4 w-full min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-20 w-22 sm:h-28 sm:w-32 shrink-0 overflow-hidden rounded-xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: post.cover_image ? resolveMediaUrl(post.cover_image) : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=75",
              alt: getPostTitle(post),
              loading: "lazy",
              onError: (e) => {
                const target = e.currentTarget;
                if (!target.src.includes("unsplash.com")) {
                  target.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=75";
                }
              },
              className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col justify-between py-0.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold uppercase tracking-wider text-[#FF7A00]", children: t(post.category || "Story") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "text-muted-foreground/50", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: formatDate$2(post.published_at || post.created_at) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-1 font-display text-sm sm:text-base font-bold leading-snug text-foreground transition-colors group-hover:text-[#FF7A00] line-clamp-2 break-words [overflow-wrap:anywhere]", children: getPostTitle(post) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 sm:mt-2 flex items-center gap-1 text-[11px] sm:text-xs font-medium text-muted-foreground group-hover:text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Read story") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:scale-x-[-1]" })
            ] })
          ] })
        ] })
      },
      post.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col rounded-2xl border border-border bg-card p-3.5 sm:p-4 shadow-sm lg:col-span-3 w-full min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between border-b border-border pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base sm:text-lg font-bold tracking-tight text-foreground", children: t("Categories") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/blog",
            className: "text-xs font-medium text-muted-foreground hover:text-[#FF7A00] transition-colors",
            children: [
              t("View all"),
              " →"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 sm:gap-2.5", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: cat.linkTo,
          className: "group relative flex items-center justify-between overflow-hidden rounded-xl border border-border/60 bg-muted/30 p-2.5 transition-all duration-200 hover:border-[#FF7A00]/40 hover:bg-muted min-w-0",
          children: [
            cat.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: resolveMediaUrl(cat.image),
                alt: cat.name,
                className: "absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-30"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex items-center gap-2.5 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs sm:text-sm font-semibold text-foreground group-hover:text-[#FF7A00] transition-colors truncate", children: t(cat.name) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10 inline-flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-background/80 px-1.5 text-[10px] font-bold text-muted-foreground shadow-xs group-hover:bg-[#FF7A00] group-hover:text-white transition-colors", children: cat.count })
          ]
        },
        cat.name
      )) })
    ] })
  ] });
}
function formatDate$1(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function FeaturedGrid({
  mainFeatured,
  secondaryFeatured,
  stats
}) {
  const t = useTranslations();
  const { lang } = useLanguage();
  const getPostTitle = (p) => {
    if (lang !== "en" && p.post_translations) {
      const trans = p.post_translations.find((x) => x.language_code === lang);
      if (trans?.title) return trans.title;
    }
    return t(p.title);
  };
  const getPostExcerpt = (p) => {
    if (lang !== "en" && p.post_translations) {
      const trans = p.post_translations.find((x) => x.language_code === lang);
      if (trans?.excerpt) return trans.excerpt;
    }
    return p.excerpt ? t(p.excerpt) : null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-12 w-full min-w-0", children: [
    mainFeatured && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.article,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-md lg:col-span-5 w-full min-w-0",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: { slug: mainFeatured.slug }, className: "flex h-full flex-col w-full min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] w-full overflow-hidden bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: mainFeatured.cover_image ? resolveMediaUrl(mainFeatured.cover_image) : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80",
                alt: getPostTitle(mainFeatured),
                loading: "lazy",
                onError: (e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes("unsplash.com")) {
                    target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";
                  }
                },
                className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-3 rtl:left-auto rtl:right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-[#FF7A00] px-2.5 py-1 text-[11px] sm:px-3 sm:py-1 sm:text-xs font-semibold uppercase tracking-wider text-white shadow-sm", children: t(mainFeatured.category || "Featured") }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col justify-between p-4 sm:p-6 w-full min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 text-[#FF7A00]/80" }),
                  formatDate$1(mainFeatured.published_at || mainFeatured.created_at)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "text-muted-foreground/50", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 text-[#FF7A00]/80" }),
                  mainFeatured.reading_minutes,
                  " ",
                  t("min read")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2.5 sm:mt-3 font-display text-xl sm:text-2xl lg:text-3xl font-bold leading-snug text-foreground transition-colors group-hover:text-[#FF7A00] break-words [overflow-wrap:anywhere]", children: getPostTitle(mainFeatured) }),
              getPostExcerpt(mainFeatured) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground line-clamp-3 break-words leading-relaxed", children: getPostExcerpt(mainFeatured) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FF7A00]", children: [
              t("Read full story"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" })
            ] }) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:gap-4 lg:col-span-4 w-full min-w-0", children: [
      secondaryFeatured.slice(0, 2).map((post, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.article,
        {
          initial: { opacity: 0, y: 15 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: idx * 0.1 },
          className: "group relative flex-1 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-md min-h-[160px] sm:min-h-[170px] w-full min-w-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: { slug: post.slug }, className: "block h-full w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: post.cover_image ? resolveMediaUrl(post.cover_image) : "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=75",
                alt: getPostTitle(post),
                loading: "lazy",
                onError: (e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes("unsplash.com")) {
                    target.src = "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=75";
                  }
                },
                className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex h-full flex-col justify-between p-4 sm:p-5 text-white min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white", children: t(post.category || "Featured") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] sm:text-xs text-white/75 shrink-0", children: formatDate$1(post.published_at || post.created_at) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-base sm:text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#FF7A00] line-clamp-2 break-words [overflow-wrap:anywhere]", children: getPostTitle(post) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#FF7A00]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Read story") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:scale-x-[-1]" })
                ] })
              ] })
            ] })
          ] })
        },
        post.id
      )),
      secondaryFeatured.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full min-h-[160px] sm:min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("More stories coming soon") }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col rounded-2xl border border-border bg-card p-3.5 sm:p-4 shadow-sm lg:col-span-3 w-full min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 border-b border-border pb-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-[#FF7A00]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FF7A00]", children: t("Connect") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-display text-base sm:text-lg font-bold text-foreground", children: t("Follow the Journey") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: SITE.socials.instagram,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center justify-between rounded-xl bg-[#E1306C]/10 px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-[#E1306C]/20 min-w-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E1306C] text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-3.5 w-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold truncate", children: t("Instagram") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-semibold text-[#E1306C] shrink-0", children: [
                t("Follow"),
                " →"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: SITE.socials.youtube,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center justify-between rounded-xl bg-[#FF0000]/10 px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-[#FF0000]/20 min-w-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FF0000] text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "h-3.5 w-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold truncate", children: t("YouTube") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-semibold text-[#FF0000] shrink-0", children: [
                t("Subscribe"),
                " →"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: SITE.socials.twitter,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center justify-between rounded-xl bg-foreground/5 px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/10 min-w-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "h-3.5 w-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold truncate", children: "X (Twitter)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-semibold text-muted-foreground shrink-0", children: [
                t("Follow"),
                " →"
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-xl border border-border/80 bg-muted/40 p-3 w-full min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF7A00]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { className: "h-3.5 w-3.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: t("Expedition Stats") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 grid grid-cols-2 gap-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-background p-2 border border-border/50 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base sm:text-lg font-bold text-foreground truncate", children: stats.countries }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground truncate", children: t("Countries") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-background p-2 border border-border/50 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base sm:text-lg font-bold text-[#FF7A00] truncate", children: stats.trips }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground truncate", children: t("Trips") })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function formatRelativeTime(dateStr) {
  const date = new Date(dateStr);
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1e3 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 5) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}
function BreakingNewsSection({ items, className }) {
  if (!items || items.length === 0) {
    return null;
  }
  const [activeModalItem, setActiveModalItem] = reactExports.useState(null);
  const [copiedLink, setCopiedLink] = reactExports.useState(false);
  const repeatedItems = reactExports.useMemo(() => {
    if (items.length === 1) {
      return Array(6).fill(items[0]);
    }
    if (items.length === 2) {
      return [...items, ...items, ...items, ...items];
    }
    if (items.length <= 4) {
      return [...items, ...items, ...items];
    }
    return [...items, ...items];
  }, [items]);
  const handleCopyShare = (slug) => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/news/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className || ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "ticker-container group relative flex h-10 sm:h-11 w-full items-center overflow-hidden rounded-xl border border-red-500/30 bg-black/80 sm:bg-black/70 backdrop-blur-xl shadow-lg shadow-black/40 transition-all duration-300 hover:border-red-500/50 hover:bg-black/90",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-12 -top-12 h-28 w-28 rounded-full bg-red-600/25 blur-2xl opacity-70 transition-opacity group-hover:opacity-100" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-12 -bottom-12 h-28 w-28 rounded-full bg-[#FF7A00]/20 blur-2xl opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 flex shrink-0 items-center gap-2 bg-gradient-to-r from-red-600 via-red-600 to-red-700 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black tracking-wider text-white uppercase shadow-md shadow-red-950/60 select-none rounded-l-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-white" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5 fill-white" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "BREAKING NEWS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline sm:hidden", children: "BREAKING" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-[102px] sm:left-[148px] inset-y-0 w-8 sm:w-12 bg-gradient-to-r from-black/90 sm:from-black/80 to-transparent z-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-black/90 sm:from-black/80 to-transparent z-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 overflow-hidden h-full flex items-center select-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-ticker flex items-center shrink-0", children: repeatedItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveModalItem(item),
                  className: "group/item inline-flex items-center gap-2 text-left cursor-pointer transition-colors focus:outline-none",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs sm:text-sm font-medium text-neutral-100 group-hover/item:text-[#FF7A00] transition-colors tracking-normal", children: item.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-sans text-neutral-400 group-hover/item:text-neutral-300", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 text-neutral-500" }),
                      formatRelativeTime(item.published_at)
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mx-4 sm:mx-6 inline-flex items-center gap-1 text-red-500/80 font-bold select-none opacity-80", "aria-hidden": "true", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#FF7A00] animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-red-400/90 font-mono", children: "//" })
              ] })
            ] }, `t1-${item.id}-${idx}`)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-ticker flex items-center shrink-0", "aria-hidden": "true", children: repeatedItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveModalItem(item),
                  tabIndex: -1,
                  className: "group/item inline-flex items-center gap-2 text-left cursor-pointer transition-colors focus:outline-none",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs sm:text-sm font-medium text-neutral-100 group-hover/item:text-[#FF7A00] transition-colors tracking-normal", children: item.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-sans text-neutral-400 group-hover/item:text-neutral-300", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 text-neutral-500" }),
                      formatRelativeTime(item.published_at)
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mx-4 sm:mx-6 inline-flex items-center gap-1 text-red-500/80 font-bold select-none opacity-80", "aria-hidden": "true", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#FF7A00] animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-red-400/90 font-mono", children: "//" })
              ] })
            ] }, `t2-${item.id}-${idx}`)) })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!activeModalItem, onOpenChange: (open) => !open && setActiveModalItem(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 bg-background border border-border", children: activeModalItem && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-red-600/10 border border-red-600/20 px-3 py-1 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5 fill-current animate-pulse" }),
            "Breaking News Dispatch"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(activeModalItem.published_at).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1 font-mono", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
          new Date(activeModalItem.published_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug", children: activeModalItem.title }),
      activeModalItem.summary && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border-l-4 border-[#FF7A00] bg-[#FF7A00]/5 p-4 text-sm sm:text-base font-medium text-foreground/90 leading-relaxed", children: activeModalItem.summary }),
      activeModalItem.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden rounded-2xl border border-border shadow-md max-h-80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: resolveMediaUrl(activeModalItem.image_url),
          alt: activeModalItem.title,
          className: "h-full w-full object-cover"
        }
      ) }),
      activeModalItem.content && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm sm:prose-base dark:prose-invert max-w-none whitespace-pre-wrap text-foreground/90 leading-relaxed pt-2", children: activeModalItem.content }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-border text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => handleCopyShare(activeModalItem.slug),
            className: "inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium hover:bg-muted transition-colors",
            children: copiedLink ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-emerald-600" }),
              " Copied Link!"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3.5 w-3.5" }),
              " Share Dispatch"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/news/$slug",
            params: { slug: activeModalItem.slug },
            className: "inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background hover:opacity-90 transition-opacity",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Full Article Page" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
            ]
          }
        ) })
      ] })
    ] }) }) })
  ] });
}
const DestinationsMap = reactExports.lazy(() => import("./DestinationsMap-a9zX4mDU.mjs").then((m) => ({
  default: m.DestinationsMap
})));
const DEFAULT_HERO_SLIDES = [{
  src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=80",
  alt: "Nanga Parbat at sunrise"
}, {
  src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80",
  alt: "Mountain road at dusk"
}, {
  src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2000&q=80",
  alt: "Trekker on alpine ridge"
}];
function getTopicIcon(topic) {
  const text = `${topic.slug} ${topic.title} ${topic.categories.join(" ")} ${topic.tags.join(" ")}`.toLowerCase();
  if (text.includes("motorcycle") || text.includes("bike") || text.includes("ride")) return Bike;
  if (text.includes("trek") || text.includes("hike") || text.includes("mountain")) return Mountain;
  if (text.includes("photo") || text.includes("camera")) return Camera;
  if (text.includes("guide") || text.includes("tourism") || text.includes("pakistan")) return Earth;
  return Compass;
}
function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function HomePage() {
  const t = useTranslations();
  const {
    lang
  } = useLanguage();
  const {
    data: postsData
  } = useSuspenseQuery(postsQO);
  const {
    data: featuredData
  } = useSuspenseQuery(featuredQO);
  const {
    data: destinationsData
  } = useSuspenseQuery(destQO$2);
  const {
    data: activeTopicsData
  } = useSuspenseQuery(topicsQO);
  const {
    data: galleryData
  } = useSuspenseQuery(galleryQO);
  const {
    data: motoData
  } = useSuspenseQuery(motoQO);
  const {
    data: journeyStats
  } = useSuspenseQuery(journeyStatsQO);
  const {
    data: homepageConfig
  } = useSuspenseQuery(homepageQO);
  const {
    data: breakingNews
  } = useSuspenseQuery(breakingNewsQO);
  const activeTopics = activeTopicsData ?? [];
  const allPosts = postsData.posts ?? [];
  const featuredPosts = featuredData.posts ?? [];
  const destinations = destinationsData ?? [];
  const gallery = galleryData ?? [];
  const heroSettings = homepageConfig?.settings ?? {};
  const heroMode = heroSettings.homepage_hero_mode === "manual" ? "manual" : "auto";
  const heroSource = homepageConfig?.heroPost ?? null;
  heroMode === "manual" && heroSource ? heroSource : allPosts[0] ?? null;
  const heroFloatingPosts = allPosts.slice(1, 3);
  const heroImagesMode = heroSettings.homepage_hero_images_mode === "manual" ? "manual" : "auto";
  const heroImagePosts = homepageConfig?.heroImagePosts ?? [];
  const manualHeroImageUrls = [heroSettings.homepage_hero_image, heroSettings.homepage_hero_image_2, heroSettings.homepage_hero_image_3];
  const heroSlides = Array.from({
    length: 3
  }, (_, i) => {
    let src = null;
    let alt = DEFAULT_HERO_SLIDES[i].alt;
    if (heroImagesMode === "manual") {
      src = manualHeroImageUrls[i]?.trim() || null;
      alt = `Hero background ${i + 1}`;
    } else {
      const p = heroImagePosts[i];
      src = p?.cover_image ?? null;
      alt = p?.title || DEFAULT_HERO_SLIDES[i].alt;
    }
    if (src) return {
      src: resolveMediaUrl(src),
      alt
    };
    return DEFAULT_HERO_SLIDES[i];
  });
  const trendingPrimary = allPosts[0] ?? null;
  const trendingSecondary = allPosts.slice(1, 4);
  const categoryMap = reactExports.useMemo(() => {
    const counts = {};
    for (const p of allPosts) {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    }
    const cats = Object.entries(counts).map(([name, count]) => {
      const matchedTopic = activeTopics.find((t2) => t2.categories.some((c) => c.toLowerCase() === name.toLowerCase()));
      return {
        name,
        count,
        image: matchedTopic?.previewImage || void 0,
        linkTo: `/category/${slugify(name)}`
      };
    });
    if (cats.length === 0) {
      return CATEGORIES.slice(0, 5).map((name) => ({
        name,
        count: 1,
        linkTo: `/category/${slugify(name)}`
      }));
    }
    return cats.slice(0, 5);
  }, [allPosts, activeTopics]);
  const featuredMode = heroSettings.homepage_featured_mode === "manual" ? "manual" : "auto";
  const mainFeatured = (featuredMode === "manual" ? homepageConfig?.featuredPost : featuredPosts[0]) || featuredPosts[0] || allPosts[0] || null;
  const secondaryFeatured = featuredPosts.filter((p) => p.id !== mainFeatured?.id).slice(0, 2);
  if (secondaryFeatured.length < 2) {
    const fillers = allPosts.filter((p) => p.id !== mainFeatured?.id && !secondaryFeatured.some((sf) => sf.id === p.id));
    secondaryFeatured.push(...fillers.slice(0, 2 - secondaryFeatured.length));
  }
  const motoPosts = motoData?.posts ?? [];
  const latestMoto = motoPosts[0] ?? null;
  const latestDest = destinations[0] ?? null;
  const latestPhoto = gallery[0] ?? null;
  const latestPhotoCaption = latestPhoto?.caption || "";
  const [destView, setDestView] = reactExports.useState("grid");
  useNavigate();
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash === "interactive-map" || hash === "map") {
      setDestView("map");
      requestAnimationFrame(() => document.getElementById("interactive-map")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      }));
    } else if (hash === "journey-in-numbers") {
      requestAnimationFrame(() => document.getElementById("journey-in-numbers")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      }));
    }
  }, []);
  const calculatedCountries = journeyStats?.countriesCount ?? 1;
  const countriesMode = heroSettings.homepage_stat_countries_mode === "manual" ? "manual" : "auto";
  const countries = countriesMode === "manual" ? Number(heroSettings.homepage_stat_countries) || 1 : calculatedCountries;
  const stats = [{
    icon: Earth,
    label: t("Countries Covered in Blogs"),
    value: countries,
    suffix: "",
    featured: false
  }, {
    icon: Bike,
    label: t("Solo Motorcycle Trips"),
    value: Number(heroSettings.homepage_stat_trips) || 102,
    suffix: "",
    featured: false
  }, {
    icon: Camera,
    label: t("Photos Captured"),
    value: Number(heroSettings.homepage_stat_photos) || 200,
    suffix: heroSettings.homepage_stat_photos_suffix || "K+",
    featured: false
  }, {
    icon: Route,
    label: t("Kilometres Travelled"),
    value: Number(heroSettings.homepage_stat_kilometres) || 18420,
    suffix: heroSettings.homepage_stat_kilometres_suffix || " km",
    featured: true
  }, {
    icon: Calendar,
    label: t("Days on the Road"),
    value: Number(heroSettings.homepage_stat_days) || 142,
    suffix: "",
    featured: false
  }];
  const journeyRef = useGsapReveal();
  const isExternal = (link) => {
    const target = (link || "").trim().toLowerCase();
    return target.startsWith("http://") || target.startsWith("https://") || target.startsWith("mailto:");
  };
  const heroPrimaryTo = heroSettings.homepage_hero_button_link?.trim() || "/blog";
  const heroSecondaryTo = heroSettings.homepage_hero_secondary_button_link?.trim() || "/destinations";
  const getPostTitle = (p) => {
    if (lang !== "en" && "post_translations" in p && p.post_translations) {
      const trans = p.post_translations.find((x) => x.language_code === lang);
      if (trans?.title) return trans.title;
    }
    return t(p.title);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-14 sm:space-y-20 lg:space-y-24 w-full min-w-0 overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-[max(100svh,600px)] overflow-hidden flex flex-col justify-between w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSlider, { slides: heroSlides }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-auto relative z-20 w-full pt-20 sm:pt-22 lg:pt-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreakingNewsSection, { items: breakingNews ?? [] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-12 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end w-full min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 w-full min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { initial: {
            opacity: 0,
            y: 20
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.6
          }, className: "inline-flex w-fit items-center rounded-full border border-white/30 bg-white/10 px-3.5 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md", children: t(heroSettings.homepage_hero_badge || "Solo · Slow · Cinematic") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
            opacity: 0,
            y: 30
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.8,
            delay: 0.1
          }, className: "mt-4 sm:mt-5 max-w-4xl font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] sm:leading-[1.12] text-white tracking-tight break-words [overflow-wrap:anywhere]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: t(heroSettings.homepage_hero_title || "Stories from the high places") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[#FF7A00] mt-1 sm:mt-1.5", children: t(heroSettings.homepage_hero_title_highlight || "Most people only fly over.") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
            opacity: 0,
            y: 30
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.8,
            delay: 0.2
          }, className: "mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base lg:text-lg text-white/85 leading-relaxed", children: t(heroSettings.homepage_hero_description || "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            y: 30
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.8,
            delay: 0.35
          }, className: "pointer-events-auto mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:w-auto", children: [
            isExternal(heroPrimaryTo) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: heroPrimaryTo, target: heroPrimaryTo.startsWith("http") ? "_blank" : void 0, rel: heroPrimaryTo.startsWith("http") ? "noopener noreferrer" : void 0, className: "inline-flex items-center justify-center gap-2 rounded-full bg-[#FF7A00] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF7A00]/90 transition-colors shadow-md text-center", children: [
              t(heroSettings.homepage_hero_button_text || "Read the stories"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 rtl:rotate-180" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: heroPrimaryTo, className: "inline-flex items-center justify-center gap-2 rounded-full bg-[#FF7A00] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF7A00]/90 transition-colors shadow-md text-center", children: [
              t(heroSettings.homepage_hero_button_text || "Read the stories"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 rtl:rotate-180" })
            ] }),
            isExternal(heroSecondaryTo) ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: heroSecondaryTo, target: heroSecondaryTo.startsWith("http") ? "_blank" : void 0, rel: heroSecondaryTo.startsWith("http") ? "noopener noreferrer" : void 0, className: "inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-black/20 backdrop-blur-md px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors text-center", children: t(heroSettings.homepage_hero_secondary_button_text || "Explore destinations") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: heroSecondaryTo, className: "inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-black/20 backdrop-blur-md px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors text-center", children: t(heroSettings.homepage_hero_secondary_button_text || "Explore destinations") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-auto hidden lg:col-span-4 lg:flex lg:flex-col lg:gap-3 lg:justify-end", children: heroFloatingPosts.map((hp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
          slug: hp.slug
        }, className: "group flex items-center gap-3 rounded-2xl border border-white/20 bg-black/50 p-2.5 backdrop-blur-md transition-all duration-300 hover:border-[#FF7A00]/60 hover:bg-black/70 shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-14 w-18 shrink-0 overflow-hidden rounded-xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: hp.cover_image ? resolveMediaUrl(hp.cover_image) : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=75", alt: getPostTitle(hp), className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[10px] text-white/70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-2.5 w-2.5 text-[#FF7A00]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(hp.published_at || hp.created_at) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-0.5 line-clamp-2 font-display text-xs font-bold leading-snug text-white transition-colors group-hover:text-[#FF7A00]", children: getPostTitle(hp) })
          ] })
        ] }, hp.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-8 lg:px-8 w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdSlot, { slotId: "homepage-hero-bottom", format: "horizontal", label: t("Advertisement") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 lg:space-y-24 mt-6 sm:mt-10 w-full min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "trending-stories-heading", className: "w-full min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { title: "Latest Stories", badge: "Trending", subtitle: "Fresh dispatches from the high passes, trails, and solitary highways.", linkText: "View all stories", linkTo: "/blog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingStories, { primaryPost: trendingPrimary, secondaryPosts: trendingSecondary, categories: categoryMap })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "featured-stories-heading", className: "w-full min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { title: "Featured Expeditions", badge: "Curated", subtitle: "Handpicked long-form stories and remote trail guides.", linkText: "All expeditions", linkTo: "/blog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedGrid, { mainFeatured, secondaryFeatured, stats: {
          countries,
          trips: Number(heroSettings.homepage_stat_trips) || 102,
          photos: Number(heroSettings.homepage_stat_photos) || 200,
          photosSuffix: heroSettings.homepage_stat_photos_suffix || "K+",
          kilometres: Number(heroSettings.homepage_stat_kilometres) || 18420,
          kilometresSuffix: heroSettings.homepage_stat_kilometres_suffix || " km"
        } })
      ] }),
      activeTopics.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "explore-topics-heading", className: "w-full min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { title: "Explore Topics", badge: "Journeys", subtitle: "Deep dives and curated journeys into the wild — each backed by published stories and route guides.", linkText: "All topics", linkTo: "/blog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 w-full min-w-0", children: [
          activeTopics[0] && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
            opacity: 0,
            y: 20
          }, whileInView: {
            opacity: 1,
            y: 0
          }, viewport: {
            once: true
          }, transition: {
            duration: 0.5
          }, className: "md:col-span-2 lg:col-span-1 lg:row-span-2 w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/topics/$slug", params: {
            slug: activeTopics[0].slug
          }, className: "group relative flex h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-lg w-full min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: activeTopics[0].previewImage || activeTopics[0].heroImage, alt: activeTopics[0].title, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-4 sm:p-6 text-white min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-[#FF7A00] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm mb-3", children: [
                (() => {
                  const Icon = getTopicIcon(activeTopics[0]);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" });
                })(),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  activeTopics[0].postCount,
                  " ",
                  activeTopics[0].postCount === 1 ? t("story") : t("stories")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-white transition-colors group-hover:text-[#FF7A00] break-words [overflow-wrap:anywhere]", children: t(activeTopics[0].title) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs sm:text-sm text-white/80 line-clamp-3", children: t(activeTopics[0].subtitle || activeTopics[0].description) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF7A00]", children: [
                t("Explore Topic"),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" })
              ] })
            ] })
          ] }) }),
          activeTopics.slice(1, 5).map((topic, idx) => {
            const Icon = getTopicIcon(topic);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              opacity: 0,
              y: 15
            }, whileInView: {
              opacity: 1,
              y: 0
            }, viewport: {
              once: true
            }, transition: {
              duration: 0.4,
              delay: idx * 0.08
            }, className: "w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/topics/$slug", params: {
              slug: topic.slug
            }, className: "group relative flex h-full min-h-[190px] sm:min-h-[210px] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-md w-full min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: topic.previewImage || topic.heroImage, alt: topic.title, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-4 sm:p-5 text-white min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FF7A00] backdrop-blur-md border border-white/10 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    topic.postCount,
                    " ",
                    topic.postCount === 1 ? t("story") : t("stories")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base sm:text-lg font-bold leading-tight text-white transition-colors group-hover:text-[#FF7A00] line-clamp-2 break-words [overflow-wrap:anywhere]", children: t(topic.title) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/75 line-clamp-1", children: t(topic.subtitle || topic.description) })
              ] })
            ] }) }, topic.slug);
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdSlot, { slotId: "homepage-mid-content", format: "horizontal", label: t("Advertisement") }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "journey-in-numbers", "aria-labelledby": "journey-numbers-heading", className: "scroll-mt-24 border-y border-border bg-muted/20 py-12 sm:py-16 w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: journeyRef, className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-reveal": "heading", className: "text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A00]", children: t("By the numbers") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { "data-reveal": "heading", id: "journey-numbers-heading", className: "mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl", children: t("Journey in numbers") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-reveal": "heading", className: "max-w-md text-xs text-muted-foreground sm:text-sm", children: t("A quiet tally of countries crossed, trips ridden and photographs made along the way.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2.5 sm:gap-3.5 sm:grid-cols-3 lg:grid-cols-5 w-full min-w-0", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-reveal": s.featured ? "featured" : "card", className: `jin-card rounded-2xl border border-border bg-card p-3 sm:p-4.5 transition-all duration-300 hover:border-[#FF7A00]/40 w-full min-w-0 overflow-hidden ${s.featured ? "jin-featured" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-[#FF7A00]/10 text-[#FF7A00]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 sm:mt-3 font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { end: s.value, suffix: s.suffix }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-muted-foreground leading-snug min-w-0", children: s.label })
      ] }, s.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 sm:mt-8 grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full min-w-0", children: [
        latestMoto && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { "data-reveal": "info", to: "/blog/$slug", params: {
          slug: latestMoto.slug
        }, className: "jin-card group relative block overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 hover:border-[#FF7A00]/50 aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[150px] w-full min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: latestMoto.cover_image || "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=75", alt: latestMoto.title, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full flex-col justify-between p-4 text-white min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex w-fit items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#FF7A00] backdrop-blur-md border border-white/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { className: "h-3 w-3" }),
              " ",
              t("Latest trip")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-2 font-display text-sm font-semibold text-white group-hover:text-[#FF7A00] transition-colors break-words", children: latestMoto.title })
          ] })
        ] }),
        latestDest && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { "data-reveal": "info", to: "/destinations/$slug", params: {
          slug: latestDest.slug
        }, className: "jin-card group relative block overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 hover:border-[#FF7A00]/50 aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[150px] w-full min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: latestDest.featured_image || "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=75", alt: latestDest.title, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full flex-col justify-between p-4 text-white min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex w-fit items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#FF7A00] backdrop-blur-md border border-white/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              " ",
              t("Recent destination")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-2 font-display text-sm font-semibold text-white group-hover:text-[#FF7A00] transition-colors break-words", children: latestDest.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-[11px] text-white/70 truncate", children: [
                latestDest.country,
                latestDest.region ? ` · ${latestDest.region}` : ""
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { "data-reveal": "info", to: "/destinations", hash: "interactive-map", className: "jin-card group relative block overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 hover:border-[#FF7A00]/50 aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[150px] w-full min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=75", alt: "Karakoram Highway", loading: "lazy", className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full flex-col justify-between p-4 text-white min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex w-fit items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#FF7A00] backdrop-blur-md border border-white/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { className: "h-3 w-3" }),
              " ",
              t("Longest journey")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold text-white group-hover:text-[#FF7A00] transition-colors truncate", children: "Karakoram Highway" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11px] text-white/70 truncate", children: "1,840 km · Solo Route" })
            ] })
          ] })
        ] }),
        latestPhoto && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { "data-reveal": "info", to: "/gallery", className: "jin-card group relative block overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 hover:border-[#FF7A00]/50 aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[150px] w-full min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: latestPhoto.image_url || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=75", alt: latestPhotoCaption || "Gallery photo", loading: "lazy", className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full flex-col justify-between p-4 text-white min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex w-fit items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#FF7A00] backdrop-blur-md border border-white/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3 w-3" }),
              " ",
              t("Latest photo")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-2 font-display text-sm font-semibold text-white group-hover:text-[#FF7A00] transition-colors break-words", children: latestPhotoCaption || "From the gallery" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 lg:space-y-24 w-full min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "interactive-map", "aria-labelledby": "featured-destinations-heading", className: "scroll-mt-24 w-full min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { title: "Featured Destinations", badge: "Where to Go", subtitle: "Iconic base camps, alpine valleys, and high-altitude highways.", linkText: "All destinations", linkTo: "/destinations", rightElement: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "tablist", "aria-label": t("View destinations as map or grid"), className: "inline-flex items-center rounded-full border border-border bg-background p-1 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { role: "tab", "aria-selected": destView === "grid", onClick: () => setDestView("grid"), className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors ${destView === "grid" ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:text-foreground"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Grid") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { role: "tab", "aria-selected": destView === "map", onClick: () => setDestView("map"), className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors ${destView === "map" ? "bg-[#FF7A00] text-white font-medium shadow-xs" : "text-muted-foreground hover:text-foreground"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Map") })
          ] })
        ] }) }),
        destView === "map" ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[340px] sm:h-[440px] lg:h-[480px] w-full animate-pulse rounded-2xl border border-border bg-muted/30" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DestinationsMap, { destinations }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full min-w-0", children: destinations.length === 0 ? Array.from({
          length: 4
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DestinationCardSkeleton, {}, i)) : destinations.slice(0, 8).map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.article, { initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          duration: 0.4,
          delay: i * 0.05
        }, className: "group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-[#FF7A00]/40 hover:shadow-md w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/destinations/$slug", params: {
          slug: d.slug
        }, className: "block w-full min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.featured_image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80", alt: d.title, loading: "lazy", onError: (e) => {
              const target = e.currentTarget;
              if (!target.src.includes("unsplash.com")) {
                target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";
              }
            }, className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-4 text-white min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-semibold uppercase tracking-wider text-[#FF7A00] truncate", children: [
                t(d.country),
                d.region ? ` · ${t(d.region)}` : ""
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-0.5 font-display text-base sm:text-lg font-bold leading-tight group-hover:text-[#FF7A00] transition-colors break-words", children: t(d.title) })
            ] })
          ] }),
          d.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3.5 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-xs text-muted-foreground break-words", children: t(d.description) }) })
        ] }) }, d.id)) })
      ] }),
      gallery.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "field-notes-heading", className: "w-full min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { title: "Field Notes & Photography", badge: "Visual Journal", subtitle: "Moments captured in silence above 4,000 metres across the Karakoram and Himalaya.", linkText: "Full gallery", linkTo: "/gallery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full min-w-0", children: [
          gallery[0] && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
            opacity: 0,
            y: 15
          }, whileInView: {
            opacity: 1,
            y: 0
          }, viewport: {
            once: true
          }, transition: {
            duration: 0.5
          }, className: "sm:col-span-2 lg:col-span-2 lg:row-span-2 w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/gallery", className: "group relative block aspect-[16/10] sm:aspect-auto sm:h-full min-h-[240px] sm:min-h-[260px] lg:min-h-[360px] overflow-hidden rounded-2xl border border-border bg-muted shadow-sm w-full min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: gallery[0].image_url, alt: gallery[0].caption || "Expedition photograph", loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-[#FF7A00] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white", children: t("Spotlight") }),
              gallery[0].caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-sm sm:text-base font-bold text-white line-clamp-2 break-words", children: t(gallery[0].caption) })
            ] }) })
          ] }) }),
          gallery.slice(1, 5).map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
            opacity: 0,
            y: 15
          }, whileInView: {
            opacity: 1,
            y: 0
          }, viewport: {
            once: true
          }, transition: {
            duration: 0.4,
            delay: idx * 0.05
          }, className: "w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/gallery", className: "group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted shadow-sm w-full min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image_url, alt: item.caption || "Expedition photograph", loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3.5", children: item.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-white line-clamp-2 break-words", children: t(item.caption) }) })
          ] }) }, item.id || idx))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdSlot, { slotId: "homepage-above-newsletter", format: "horizontal", label: t("Advertisement") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-labelledby": "newsletter-heading", className: "pb-6 sm:pb-8 w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl sm:rounded-3xl border border-border bg-gradient-to-br from-card to-muted/50 p-6 sm:p-12 text-center shadow-sm w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-[#FF7A00]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A00]", children: t("Join the Journey") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "newsletter-heading", className: "mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground break-words", children: t("Get the next dispatch") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 sm:mt-3 text-xs sm:text-sm text-muted-foreground sm:text-base leading-relaxed", children: t("One email when a new expedition story drops. No spam, no algorithm noise.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-5 sm:mt-6 max-w-md w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterForm, {}) })
      ] }) }) })
    ] })
  ] });
}
export {
  HomePage as component
};
