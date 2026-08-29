import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useTranslations, e as settingsQO } from "./router-DDkqhyL0.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { v as Compass, b as Sparkles, w as Shield, m as MapPin, W as Wrench, f as ArrowRight, x as Send, B as Bike, R as Route, y as Mountain, p as CircleCheck, Q as Quote, G as Globe, z as Layers, D as Flag, E as LucideIcons } from "../_libs/lucide-react.mjs";
import { A as ABOUT_DEFAULTS, p as parseJson, D as DEFAULT_HERO_BADGES, a as aboutPortrait, b as DEFAULT_DOSSIER_ITEMS, c as DEFAULT_WHY_TRAVEL_CARDS, d as DEFAULT_MOTORCYCLE_FEATURES, e as DEFAULT_TREKKING_CARDS, f as DEFAULT_PHILOSOPHY_CARDS, g as DEFAULT_NUMBER_STATS, h as DEFAULT_TERRAIN_TAGS, i as DEFAULT_CONTENT_CARDS } from "./about.functions-4rnRhDFN.mjs";
import { r as resolveMediaUrl } from "./media-fm7scLsn.mjs";
import { B as BreadcrumbJsonLd, P as PageBreadcrumbs } from "./PageBreadcrumbs-DE4hlmNs.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
function DynamicIcon({
  name,
  className,
  fallback: FallbackIcon
}) {
  const IconComponent = LucideIcons[name] || FallbackIcon || Compass;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className });
}
function AboutPage() {
  const t = useTranslations();
  const {
    data: settings
  } = useSuspenseQuery(settingsQO);
  const heroEnabled = settings?.about_hero_enabled !== "false";
  const heroImage = settings?.about_hero_image ? resolveMediaUrl(settings.about_hero_image) : "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80&auto=format";
  const heroImageAlt = settings?.about_hero_image_alt || "Karakoram mountain pass and solo road";
  const heroLabel = settings?.about_hero_label || ABOUT_DEFAULTS.about_hero_label;
  const heroHeadline = settings?.about_hero_headline || ABOUT_DEFAULTS.about_hero_headline;
  const heroSubtitle = settings?.about_hero_subtitle || ABOUT_DEFAULTS.about_hero_subtitle;
  const heroBadges = parseJson(settings?.about_hero_badges, DEFAULT_HERO_BADGES).filter((b) => b.enabled);
  const profileEnabled = settings?.about_profile_enabled !== "false";
  const portraitSrc = settings?.about_profile_image ? resolveMediaUrl(settings.about_profile_image) : settings?.about_image_url ? resolveMediaUrl(settings.about_image_url) : aboutPortrait;
  const profileImageAlt = settings?.about_profile_image_alt || "Hussain — Solo explorer behind NDSOLOTRAVEL";
  const profileName = settings?.about_profile_name || ABOUT_DEFAULTS.about_profile_name;
  const profileRole = settings?.about_profile_role || ABOUT_DEFAULTS.about_profile_role;
  const profileTagline = settings?.about_profile_tagline || ABOUT_DEFAULTS.about_profile_tagline;
  const profileEyebrow = settings?.about_profile_eyebrow || ABOUT_DEFAULTS.about_profile_eyebrow;
  const biographyTitle = settings?.about_biography_title || ABOUT_DEFAULTS.about_biography_title;
  const biographyIntro = settings?.about_biography_intro || ABOUT_DEFAULTS.about_biography_intro;
  const biographyParagraphs = (settings?.about_biography_paragraphs || ABOUT_DEFAULTS.about_biography_paragraphs).split("\n\n").filter(Boolean);
  const profileHighlightTitle = settings?.about_profile_highlight_title || ABOUT_DEFAULTS.about_profile_highlight_title;
  const profileHighlightText = settings?.about_profile_highlight_text || ABOUT_DEFAULTS.about_profile_highlight_text;
  const dossierItems = parseJson(settings?.about_profile_dossier, DEFAULT_DOSSIER_ITEMS).filter((d) => d.enabled);
  const profileCtaPrimaryText = settings?.about_profile_cta_primary_text || ABOUT_DEFAULTS.about_profile_cta_primary_text;
  const profileCtaPrimaryUrl = settings?.about_profile_cta_primary_url || ABOUT_DEFAULTS.about_profile_cta_primary_url;
  const profileCtaSecondaryText = settings?.about_profile_cta_secondary_text || ABOUT_DEFAULTS.about_profile_cta_secondary_text;
  const profileCtaSecondaryUrl = settings?.about_profile_cta_secondary_url || ABOUT_DEFAULTS.about_profile_cta_secondary_url;
  const whyTravelEnabled = settings?.about_why_travel_enabled !== "false";
  const whyTravelEyebrow = settings?.about_why_travel_eyebrow || ABOUT_DEFAULTS.about_why_travel_eyebrow;
  const whyTravelTitle = settings?.about_why_travel_title || ABOUT_DEFAULTS.about_why_travel_title;
  const whyTravelDescription = settings?.about_why_travel_description || ABOUT_DEFAULTS.about_why_travel_description;
  const whyTravelCards = parseJson(settings?.about_why_travel_cards, DEFAULT_WHY_TRAVEL_CARDS).filter((c) => c.enabled).sort((a, b) => a.order - b.order);
  const motorcycleEnabled = settings?.about_motorcycle_enabled !== "false";
  const motorcycleEyebrow = settings?.about_motorcycle_eyebrow || ABOUT_DEFAULTS.about_motorcycle_eyebrow;
  const motorcycleBadge = settings?.about_motorcycle_badge || ABOUT_DEFAULTS.about_motorcycle_badge;
  const motorcycleTitle = settings?.about_motorcycle_title || ABOUT_DEFAULTS.about_motorcycle_title;
  const motorcycleDescription = settings?.about_motorcycle_description || ABOUT_DEFAULTS.about_motorcycle_description;
  const motorcycleImage = settings?.about_motorcycle_image ? resolveMediaUrl(settings.about_motorcycle_image) : ABOUT_DEFAULTS.about_motorcycle_image;
  const motorcycleImageAlt = settings?.about_motorcycle_image_alt || ABOUT_DEFAULTS.about_motorcycle_image_alt;
  const motorcycleFeatures = parseJson(settings?.about_motorcycle_features, DEFAULT_MOTORCYCLE_FEATURES).filter((f) => f.enabled).sort((a, b) => a.order - b.order);
  const motorcycleCtaText = settings?.about_motorcycle_cta_text || ABOUT_DEFAULTS.about_motorcycle_cta_text;
  const motorcycleCtaUrl = settings?.about_motorcycle_cta_url || ABOUT_DEFAULTS.about_motorcycle_cta_url;
  const trekkingEnabled = settings?.about_trekking_enabled !== "false";
  const trekkingEyebrow = settings?.about_trekking_eyebrow || ABOUT_DEFAULTS.about_trekking_eyebrow;
  const trekkingTitle = settings?.about_trekking_title || ABOUT_DEFAULTS.about_trekking_title;
  const trekkingDescription = settings?.about_trekking_description || ABOUT_DEFAULTS.about_trekking_description;
  const trekkingImage = settings?.about_trekking_image ? resolveMediaUrl(settings.about_trekking_image) : ABOUT_DEFAULTS.about_trekking_image;
  const trekkingImageAlt = settings?.about_trekking_image_alt || ABOUT_DEFAULTS.about_trekking_image_alt;
  const trekkingLocationLabel = settings?.about_trekking_location_label || ABOUT_DEFAULTS.about_trekking_location_label;
  const trekkingLocationQuote = settings?.about_trekking_location_quote || ABOUT_DEFAULTS.about_trekking_location_quote;
  const trekkingCards = parseJson(settings?.about_trekking_cards, DEFAULT_TREKKING_CARDS).filter((c) => c.enabled).sort((a, b) => a.order - b.order);
  const philosophyEnabled = settings?.about_philosophy_enabled !== "false";
  settings?.about_philosophy_eyebrow || ABOUT_DEFAULTS.about_philosophy_eyebrow;
  const philosophyQuote = settings?.about_philosophy_quote || ABOUT_DEFAULTS.about_philosophy_quote;
  const philosophyDescription = settings?.about_philosophy_description || ABOUT_DEFAULTS.about_philosophy_description;
  const philosophyCardsEnabled = settings?.about_philosophy_cards_enabled !== "false";
  const philosophyCards = parseJson(settings?.about_philosophy_cards, DEFAULT_PHILOSOPHY_CARDS).filter((c) => c.enabled).sort((a, b) => a.order - b.order);
  const numbersEnabled = settings?.about_numbers_enabled !== "false";
  const numbersEyebrow = settings?.about_numbers_eyebrow || ABOUT_DEFAULTS.about_numbers_eyebrow;
  const numbersTitle = settings?.about_numbers_title || ABOUT_DEFAULTS.about_numbers_title;
  const numbersDescription = settings?.about_numbers_description || ABOUT_DEFAULTS.about_numbers_description;
  const numbersStats = parseJson(settings?.about_numbers_stats, DEFAULT_NUMBER_STATS).filter((s) => s.enabled).sort((a, b) => a.order - b.order);
  const numbersTagsLabel = settings?.about_numbers_tags_label || ABOUT_DEFAULTS.about_numbers_tags_label;
  const numbersTags = parseJson(settings?.about_numbers_tags, DEFAULT_TERRAIN_TAGS).filter((tItem) => tItem.enabled).sort((a, b) => a.order - b.order);
  const contentEnabled = settings?.about_content_enabled !== "false";
  const contentEyebrow = settings?.about_content_eyebrow || ABOUT_DEFAULTS.about_content_eyebrow;
  const contentTitle = settings?.about_content_title || ABOUT_DEFAULTS.about_content_title;
  const contentDescription = settings?.about_content_description || ABOUT_DEFAULTS.about_content_description;
  const contentCards = parseJson(settings?.about_content_cards, DEFAULT_CONTENT_CARDS).filter((c) => c.enabled).sort((a, b) => a.order - b.order);
  const ctaEnabled = settings?.about_cta_enabled !== "false";
  const ctaEyebrow = settings?.about_cta_eyebrow || ABOUT_DEFAULTS.about_cta_eyebrow;
  const ctaTitle = settings?.about_cta_title || ABOUT_DEFAULTS.about_cta_title;
  const ctaDescription = settings?.about_cta_description || ABOUT_DEFAULTS.about_cta_description;
  const ctaPrimaryText = settings?.about_cta_primary_text || ABOUT_DEFAULTS.about_cta_primary_text;
  const ctaPrimaryUrl = settings?.about_cta_primary_url || ABOUT_DEFAULTS.about_cta_primary_url;
  const ctaSecondaryText = settings?.about_cta_secondary_text || ABOUT_DEFAULTS.about_cta_secondary_text;
  const ctaSecondaryUrl = settings?.about_cta_secondary_url || ABOUT_DEFAULTS.about_cta_secondary_url;
  const ctaTertiaryText = settings?.about_cta_tertiary_text || ABOUT_DEFAULTS.about_cta_tertiary_text;
  const ctaTertiaryUrl = settings?.about_cta_tertiary_url || ABOUT_DEFAULTS.about_cta_tertiary_url;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen w-full overflow-x-clip bg-background text-foreground selection:bg-brand/20 selection:text-brand", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbJsonLd, { items: [{
      label: "About"
    }] }),
    heroEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "banner-hover relative min-h-[65vh] lg:min-h-[75vh] w-full flex items-end overflow-hidden bg-zinc-950", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImage, alt: heroImageAlt, loading: "eager", fetchPriority: "high", referrerPolicy: "no-referrer", onError: (e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80&auto=format";
        }, className: "h-full w-full object-cover object-center transform motion-safe:animate-fade-in duration-1000" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.7)_100%)]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-full max-w-7xl mx-auto px-4 pb-12 pt-28 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 15
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.5
        }, className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-[0.2em] text-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-3.5 h-3.5 text-accent animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(heroLabel) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.h1, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.1
        }, className: "font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]", children: t(heroHeadline) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.2
        }, className: "text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-2xl font-light", children: t(heroSubtitle) }),
        heroBadges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.3
        }, className: "flex flex-wrap gap-2.5 pt-2", children: heroBadges.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-medium text-white/90 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicIcon, { name: badge.icon, className: "w-3.5 h-3.5 text-accent", fallback: Compass }),
          t(badge.label)
        ] }, badge.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageBreadcrumbs, { items: [{
          label: "About"
        }] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-24", children: [
      profileEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-12 lg:gap-16 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-1.5 bg-gradient-to-tr from-brand/30 via-accent/20 to-transparent rounded-[2.5rem] blur-xl opacity-75 group-hover:opacity-100 transition duration-700" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[2rem] border border-border/80 bg-card shadow-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: portraitSrc, alt: profileImageAlt, loading: "eager", referrerPolicy: "no-referrer", onError: (e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = aboutPortrait;
              }, className: "w-full aspect-[4/5] object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-white", children: t(profileRole) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-1.5 rounded-full bg-brand text-white shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest font-semibold text-accent mb-1", children: t("NDSOLOTRAVEL") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold", children: t(profileName) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-300 font-light", children: t(profileTagline) })
              ] })
            ] })
          ] }),
          dossierItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pb-3 border-b border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-wider text-foreground", children: t("Expedition Dossier") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid grid-cols-2 gap-4 text-sm", children: dossierItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: t(item.label) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "font-semibold text-foreground mt-0.5 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicIcon, { name: item.icon, className: "w-3.5 h-3.5 text-accent shrink-0", fallback: MapPin }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(item.value) })
              ] })
            ] }, item.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-6 bg-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(profileEyebrow) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight", children: t(biographyTitle) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-5 leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 font-medium text-lg leading-relaxed", children: t(biographyIntro) }),
            biographyParagraphs.map((para, idx) => {
              if (idx === 1 && profileHighlightTitle) {
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t(para) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-2xl bg-muted/40 border-l-4 border-accent my-6 space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-foreground font-semibold text-base", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-4 h-4 text-accent" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(profileHighlightTitle) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed m-0", children: t(profileHighlightText) })
                  ] })
                ] }, idx);
              }
              return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t(para) }, idx);
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: profileCtaPrimaryUrl, className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand/90 transition-colors shadow-md shadow-brand/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(profileCtaPrimaryText) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: profileCtaSecondaryUrl, className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted border border-border text-foreground font-semibold text-sm hover:bg-muted/80 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(profileCtaSecondaryText) })
            ] })
          ] })
        ] })
      ] }) }),
      whyTravelEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-3.5 h-3.5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(whyTravelEyebrow) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight", children: t(whyTravelTitle) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg leading-relaxed", children: t(whyTravelDescription) })
        ] }),
        whyTravelCards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: whyTravelCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border/80 bg-card p-8 shadow-sm hover:shadow-md transition-shadow space-y-4 relative overflow-hidden group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicIcon, { name: card.icon, className: "w-6 h-6 text-accent", fallback: Compass }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground", children: t(card.title) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: t(card.description) })
        ] }, card.id)) })
      ] }),
      motorcycleEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-3xl border border-border/80 bg-zinc-950 text-white overflow-hidden shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-6 relative h-[360px] lg:h-[540px] w-full overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: motorcycleImage, alt: motorcycleImageAlt, className: "h-full w-full object-cover object-center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 left-6 right-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(motorcycleBadge) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-6 p-8 sm:p-12 lg:p-14 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-accent", children: t(motorcycleEyebrow) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight", children: t(motorcycleTitle) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-300 text-base sm:text-lg leading-relaxed font-light", children: t(motorcycleDescription) }),
          motorcycleFeatures.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 pt-2", children: motorcycleFeatures.map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-white/10 text-accent shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicIcon, { name: feat.icon, className: "w-4 h-4", fallback: Route }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white", children: t(feat.title) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-zinc-400 mt-0.5 leading-relaxed", children: t(feat.description) })
            ] })
          ] }, feat.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: motorcycleCtaUrl, className: "inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(motorcycleCtaText) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] }) })
        ] })
      ] }) }),
      trekkingEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid lg:grid-cols-12 gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-6 space-y-6 order-2 lg:order-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(trekkingEyebrow) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight", children: t(trekkingTitle) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg leading-relaxed", children: t(trekkingDescription) }),
          trekkingCards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4 pt-2", children: trekkingCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl border border-border/80 bg-card space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-foreground text-sm flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicIcon, { name: card.icon, className: "w-4 h-4 text-accent", fallback: CircleCheck }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(card.title) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: t(card.description) })
          ] }, card.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-6 order-1 lg:order-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-border shadow-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: trekkingImage, alt: trekkingImageAlt, className: "w-full aspect-[4/3] object-cover object-center transition-transform duration-700 hover:scale-[1.03]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-6 right-6 text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase font-semibold tracking-wider text-accent", children: t(trekkingLocationLabel) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-200 mt-1 font-light", children: t(trekkingLocationQuote) })
          ] })
        ] }) })
      ] }),
      philosophyEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-[2.5rem] bg-gradient-to-br from-card via-muted/30 to-card border border-border/80 p-8 sm:p-12 lg:p-16 text-center shadow-lg overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-48 h-48 bg-brand/10 rounded-full blur-3xl pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-3xl mx-auto space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex p-3 rounded-2xl bg-brand/10 text-brand mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-8 h-8 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight tracking-tight", children: [
              "“",
              t(philosophyQuote),
              "”"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light", children: t(philosophyDescription) })
          ] })
        ] }),
        philosophyCardsEnabled && philosophyCards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: philosophyCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-2xl border border-border/80 bg-card space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-accent", children: card.number }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-foreground", children: t(card.title) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-muted-foreground leading-relaxed", children: t(card.description) })
        ] }, card.id)) })
      ] }),
      numbersEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-border/80 bg-muted/30 p-8 sm:p-12 space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(numbersEyebrow) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight", children: t(numbersTitle) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-md", children: t(numbersDescription) })
        ] }),
        numbersStats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6", children: numbersStats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-2xl bg-card border border-border/80 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-4xl sm:text-5xl font-black text-brand tracking-tight", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-foreground", children: t(stat.label) }),
          stat.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t(stat.description) })
        ] }, stat.id)) }),
        numbersTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: t(numbersTagsLabel) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: numbersTags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1.5 rounded-lg bg-card border border-border/80 text-xs font-medium text-foreground/90 shadow-2xs hover:border-accent/40 transition-colors", children: t(tag.name) }, tag.id)) })
        ] })
      ] }),
      contentEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(contentEyebrow) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight", children: t(contentTitle) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg leading-relaxed", children: t(contentDescription) })
        ] }),
        contentCards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: contentCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: card.ctaUrl, className: "group p-6 rounded-3xl border border-border/80 bg-card hover:border-brand/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicIcon, { name: card.icon, className: "w-6 h-6 text-accent", fallback: Compass }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground group-hover:text-brand transition-colors", children: t(card.title) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-muted-foreground leading-relaxed", children: t(card.description) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-6 flex items-center text-xs font-semibold text-accent gap-1 group-hover:translate-x-1 transition-transform", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(card.ctaText) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
          ] })
        ] }, card.id)) })
      ] }),
      ctaEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white p-8 sm:p-14 lg:p-16 border border-white/10 shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-brand/20 rounded-full blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-3xl space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(ctaEyebrow) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight", children: t(ctaTitle) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-300 text-base sm:text-lg leading-relaxed font-light", children: t(ctaDescription) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: ctaPrimaryUrl, className: "inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand/90 transition-colors shadow-lg shadow-brand/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(ctaPrimaryText) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: ctaSecondaryUrl, className: "inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(ctaSecondaryText) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: ctaTertiaryUrl, className: "inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-transparent border border-white/20 text-white/90 font-semibold text-sm hover:text-white hover:border-white/40 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(ctaTertiaryText) })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AboutPage as component
};
