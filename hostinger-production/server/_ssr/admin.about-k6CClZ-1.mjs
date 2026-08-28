import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { b as useServerFn } from "./router-B1ksNLyj.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { j as adminGetAboutEditor, k as adminSaveAboutSettings, p as parseJson, A as ABOUT_DEFAULTS, a as aboutPortrait, D as DEFAULT_HERO_BADGES, b as DEFAULT_DOSSIER_ITEMS, c as DEFAULT_WHY_TRAVEL_CARDS, d as DEFAULT_MOTORCYCLE_FEATURES, e as DEFAULT_TREKKING_CARDS, f as DEFAULT_PHILOSOPHY_CARDS, g as DEFAULT_NUMBER_STATS, h as DEFAULT_TERRAIN_TAGS, i as DEFAULT_CONTENT_CARDS } from "./about.functions-4rnRhDFN.mjs";
import { c as adminUploadImage } from "./admin.functions-67-zmleM.mjs";
import { r as resolveMediaUrl } from "./media-fm7scLsn.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { h as LoaderCircle, U as User, ag as Eye, $ as ExternalLink, at as RotateCcw, ap as Save, b as Sparkles, v as Compass, aQ as Heart, B as Bike, y as Mountain, Q as Quote, w as Shield, G as Globe, z as Layers, D as Flag, S as Search, af as Settings, a6 as Image, an as Trash2, ao as Upload, au as Plus, l as FileText, W as Wrench } from "../_libs/lucide-react.mjs";
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
import "./auth-middleware-BO6ULLpK.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
const SECTIONS = [{
  id: "hero",
  label: "1. Hero Section",
  icon: Compass
}, {
  id: "profile",
  label: "2. Introduction & Profile",
  icon: User
}, {
  id: "why-travel",
  label: "3. Why I Travel",
  icon: Heart
}, {
  id: "motorcycle",
  label: "4. Motorcycle Adventures",
  icon: Bike
}, {
  id: "trekking",
  label: "5. Trekking & High Altitude",
  icon: Mountain
}, {
  id: "philosophy",
  label: "6. Philosophy Quote",
  icon: Quote
}, {
  id: "philosophy-cards",
  label: "7. Philosophy Cards",
  icon: Shield
}, {
  id: "numbers",
  label: "8. Journey in Numbers",
  icon: Globe
}, {
  id: "content",
  label: "9. What You Will Find",
  icon: Layers
}, {
  id: "cta",
  label: "10. Final Call To Action",
  icon: Flag
}, {
  id: "seo",
  label: "11. SEO Management",
  icon: Search
}, {
  id: "settings",
  label: "12. Page Settings",
  icon: Settings
}];
function ToggleSwitch({
  checked,
  onChange,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 cursor-pointer select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: (e) => {
      e.preventDefault();
      onChange(!checked);
    }, className: `relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${checked ? "bg-accent" : "bg-muted-foreground/30"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? "translate-x-4" : "translate-x-0"}` }) }),
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: label })
  ] });
}
function AdminAboutPage() {
  const getEditorFn = useServerFn(adminGetAboutEditor);
  const saveSettingsFn = useServerFn(adminSaveAboutSettings);
  const uploadFn = useServerFn(adminUploadImage);
  const queryClient = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-about"],
    queryFn: () => getEditorFn()
  });
  const [activeSection, setActiveSection] = reactExports.useState("hero");
  const [draft, setDraft] = reactExports.useState({});
  const [original, setOriginal] = reactExports.useState({});
  const [isDirty, setIsDirty] = reactExports.useState(false);
  const [uploadingField, setUploadingField] = reactExports.useState(null);
  const heroFileInputRef = reactExports.useRef(null);
  const profileFileInputRef = reactExports.useRef(null);
  const motoFileInputRef = reactExports.useRef(null);
  const trekFileInputRef = reactExports.useRef(null);
  const ogFileInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (data?.settings) {
      setOriginal(data.settings);
      setDraft(data.settings);
      setIsDirty(false);
    }
  }, [data]);
  const updateField = (key, value) => {
    setDraft((prev) => ({
      ...prev,
      [key]: value
    }));
    setIsDirty(true);
  };
  const handleReset = () => {
    setDraft(original);
    setIsDirty(false);
    toast.info("Changes reset to last saved state");
  };
  const handleFileUpload = async (e, fieldKey) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPEG, PNG, WebP)");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image file must be smaller than 8MB");
      return;
    }
    const toastId = toast.loading(`Uploading ${file.name}...`);
    setUploadingField(fieldKey);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result;
          const res = await uploadFn({
            data: {
              dataUrl: base64Data,
              filename: `about-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
              folder: "about"
            }
          });
          if (res?.url) {
            updateField(fieldKey, res.url);
            toast.success("Image uploaded and set successfully!", {
              id: toastId
            });
          } else {
            throw new Error("Upload did not return a valid URL");
          }
        } catch (err) {
          toast.error(err.message || "Failed to upload image", {
            id: toastId
          });
        } finally {
          setUploadingField(null);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast.error(err.message || "Failed to process image file", {
        id: toastId
      });
      setUploadingField(null);
    } finally {
      e.target.value = "";
    }
  };
  const saveMutation = useMutation({
    mutationFn: async () => {
      return await saveSettingsFn({
        data: {
          settings: draft
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-about"]
      });
      queryClient.invalidateQueries({
        queryKey: ["public-site-settings"]
      });
      setOriginal(draft);
      setIsDirty(false);
      toast.success("About page saved successfully! All updates are live.");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to save about page changes");
    }
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-96 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Loading About Page Management..." })
    ] }) });
  }
  const heroBadges = parseJson(draft.about_hero_badges, DEFAULT_HERO_BADGES);
  const dossierItems = parseJson(draft.about_profile_dossier, DEFAULT_DOSSIER_ITEMS);
  const whyTravelCards = parseJson(draft.about_why_travel_cards, DEFAULT_WHY_TRAVEL_CARDS);
  const motorcycleFeatures = parseJson(draft.about_motorcycle_features, DEFAULT_MOTORCYCLE_FEATURES);
  const trekkingCards = parseJson(draft.about_trekking_cards, DEFAULT_TREKKING_CARDS);
  const philosophyCards = parseJson(draft.about_philosophy_cards, DEFAULT_PHILOSOPHY_CARDS);
  const numberStats = parseJson(draft.about_numbers_stats, DEFAULT_NUMBER_STATS);
  const terrainTags = parseJson(draft.about_numbers_tags, DEFAULT_TERRAIN_TAGS);
  const contentCards = parseJson(draft.about_content_cards, DEFAULT_CONTENT_CARDS);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-16 z-20 flex flex-col gap-4 border-b border-border bg-background pb-6 pt-2 sm:flex-row sm:items-center sm:justify-between sm:pt-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-2xl bg-brand/10 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-6 w-6 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "About Page Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Complete structured control over all 10 visual sections, SEO, and page visibility." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/about", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View Live Page" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 text-muted-foreground ml-0.5" })
        ] }),
        isDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleReset, disabled: saveMutation.isPending, className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reset" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => saveMutation.mutate(), disabled: !isDirty || saveMutation.isPending, className: "inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer", children: [
          saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: saveMutation.isPending ? "Saving..." : "Save Changes" })
        ] })
      ] })
    ] }),
    isDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl bg-brand/10 border border-brand/20 px-4 py-2.5 text-xs text-brand animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 shrink-0 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: 'You have unsaved changes. Click "Save Changes" to apply them to the live About page.' })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => saveMutation.mutate(), disabled: saveMutation.isPending, className: "font-bold underline hover:opacity-80 cursor-pointer", children: "Save now" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: heroFileInputRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => handleFileUpload(e, "about_hero_image") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: profileFileInputRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => handleFileUpload(e, "about_profile_image") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: motoFileInputRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => handleFileUpload(e, "about_motorcycle_image") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: trekFileInputRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => handleFileUpload(e, "about_trekking_image") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: ogFileInputRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => handleFileUpload(e, "about_og_image") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 overflow-x-auto border-b border-border pb-2 scrollbar-thin", children: SECTIONS.map((sec) => {
      const Icon = sec.icon;
      const isActive = activeSection === sec.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveSection(sec.id), className: `flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${isActive ? "bg-brand text-white shadow-sm shadow-brand/20 font-semibold" : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-3.5 w-3.5 ${isActive ? "text-white" : "text-accent"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sec.label })
      ] }, sec.id);
    }) }),
    activeSection === "hero" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-4 w-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Section 1: Hero Content" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: draft.about_hero_enabled !== "false", onChange: (val) => updateField("about_hero_enabled", val ? "true" : "false"), label: draft.about_hero_enabled !== "false" ? "Enabled" : "Disabled" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Hero Eyebrow / Label" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_hero_label ?? "", onChange: (e) => updateField("about_hero_label", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Hero Main Headline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_hero_headline ?? "", onChange: (e) => updateField("about_hero_headline", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none font-display font-bold" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Hero Supporting Text / Subtitle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: draft.about_hero_subtitle ?? "", onChange: (e) => updateField("about_hero_subtitle", e.target.value), className: "w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:border-accent focus:outline-none leading-relaxed" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hero Background Image" })
            ] }),
            draft.about_hero_image && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => updateField("about_hero_image", ""), className: "inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reset to Default" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Image URL or Google Drive Link" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_hero_image ?? "", onChange: (e) => updateField("about_hero_image", e.target.value), placeholder: "https://... or Google Drive link", className: "flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => heroFileInputRef.current?.click(), disabled: uploadingField === "about_hero_image", className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors cursor-pointer", children: [
                uploadingField === "about_hero_image" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: draft.about_hero_image ? "Replace" : "Upload" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Hero Image Alt Text" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_hero_image_alt ?? "", onChange: (e) => updateField("about_hero_image_alt", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-accent focus:outline-none" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground", children: [
              "Hero Adventure Badges (",
              heroBadges.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
              const newItem = {
                id: String(Date.now()),
                icon: "Compass",
                label: "New Badge",
                enabled: true
              };
              updateField("about_hero_badges", JSON.stringify([...heroBadges, newItem]));
            }, className: "inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Badge" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: heroBadges.map((badge, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl border border-border/80 bg-background/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Icon name (e.g. Bike, Mountain, Globe, Camera)", value: badge.icon, onChange: (e) => {
              const updated = [...heroBadges];
              updated[idx].icon = e.target.value;
              updateField("about_hero_badges", JSON.stringify(updated));
            }, className: "w-32 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Badge label", value: badge.label, onChange: (e) => {
              const updated = [...heroBadges];
              updated[idx].label = e.target.value;
              updateField("about_hero_badges", JSON.stringify(updated));
            }, className: "flex-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground font-medium" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: badge.enabled, onChange: (val) => {
              const updated = [...heroBadges];
              updated[idx].enabled = val;
              updateField("about_hero_badges", JSON.stringify(updated));
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
              const updated = heroBadges.filter((_, i) => i !== idx);
              updateField("about_hero_badges", JSON.stringify(updated));
            }, className: "text-red-500 hover:text-red-600 p-1 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
          ] }, badge.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hero Preview" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-zinc-950", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveMediaUrl(draft.about_hero_image || ABOUT_DEFAULTS.about_hero_image), alt: "Hero preview", className: "h-full w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 flex flex-col justify-end p-4 text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-accent", children: draft.about_hero_label || ABOUT_DEFAULTS.about_hero_label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-base font-bold leading-tight mt-1 line-clamp-2", children: draft.about_hero_headline || ABOUT_DEFAULTS.about_hero_headline })
          ] })
        ] })
      ] }) })
    ] }),
    activeSection === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Profile Portrait" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: draft.about_profile_enabled !== "false", onChange: (val) => updateField("about_profile_enabled", val ? "true" : "false"), label: draft.about_profile_enabled !== "false" ? "Enabled" : "Disabled" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/5] w-full max-w-[260px] mx-auto overflow-hidden rounded-2xl border border-border bg-muted shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: draft.about_profile_image ? resolveMediaUrl(draft.about_profile_image) : aboutPortrait, alt: "Portrait preview", className: "h-full w-full object-cover object-center" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Portrait URL or Google Drive Link" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_profile_image ?? "", onChange: (e) => updateField("about_profile_image", e.target.value), placeholder: "https://... or Google Drive link", className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => profileFileInputRef.current?.click(), disabled: uploadingField === "about_profile_image", className: "w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors cursor-pointer", children: [
              uploadingField === "about_profile_image" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: draft.about_profile_image ? "Replace Portrait" : "Upload Portrait" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_profile_name ?? "", onChange: (e) => updateField("about_profile_name", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Role" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_profile_role ?? "", onChange: (e) => updateField("about_profile_role", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Tagline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_profile_tagline ?? "", onChange: (e) => updateField("about_profile_tagline", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Portrait Alt Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_profile_image_alt ?? "", onChange: (e) => updateField("about_profile_image_alt", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Expedition Dossier (",
                dossierItems.length,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
              const newItem = {
                id: String(Date.now()),
                label: "New Spec",
                value: "Spec Value",
                icon: "MapPin",
                enabled: true
              };
              updateField("about_profile_dossier", JSON.stringify([...dossierItems, newItem]));
            }, className: "inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Spec" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: dossierItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-xl border border-border/80 bg-background/60 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Label", value: item.label, onChange: (e) => {
                const updated = [...dossierItems];
                updated[idx].label = e.target.value;
                updateField("about_profile_dossier", JSON.stringify(updated));
              }, className: "flex-1 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Icon", value: item.icon, onChange: (e) => {
                const updated = [...dossierItems];
                updated[idx].icon = e.target.value;
                updateField("about_profile_dossier", JSON.stringify(updated));
              }, className: "w-24 rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: item.enabled, onChange: (val) => {
                const updated = [...dossierItems];
                updated[idx].enabled = val;
                updateField("about_profile_dossier", JSON.stringify(updated));
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                const updated = dossierItems.filter((_, i) => i !== idx);
                updateField("about_profile_dossier", JSON.stringify(updated));
              }, className: "text-red-500 hover:text-red-600 p-1 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Value", value: item.value, onChange: (e) => {
              const updated = [...dossierItems];
              updated[idx].value = e.target.value;
              updateField("about_profile_dossier", JSON.stringify(updated));
            }, className: "w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground" })
          ] }, item.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Biography & Narrative" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Section Eyebrow" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_profile_eyebrow ?? "", onChange: (e) => updateField("about_profile_eyebrow", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Biography Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_biography_title ?? "", onChange: (e) => updateField("about_biography_title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-semibold" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Introduction Lead Paragraph" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: draft.about_biography_intro ?? "", onChange: (e) => updateField("about_biography_intro", e.target.value), className: "w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground leading-relaxed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Biography Body Paragraphs (separated by blank lines)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 7, value: draft.about_biography_paragraphs ?? "", onChange: (e) => updateField("about_biography_paragraphs", e.target.value), className: "w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground leading-relaxed font-mono" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-border/80 bg-muted/40 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-4 w-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-foreground", children: "Engineering Callout Box" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-medium text-muted-foreground mb-1", children: "Callout Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_profile_highlight_title ?? "", onChange: (e) => updateField("about_profile_highlight_title", e.target.value), className: "w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-medium text-muted-foreground mb-1", children: "Callout Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: draft.about_profile_highlight_text ?? "", onChange: (e) => updateField("about_profile_highlight_text", e.target.value), className: "w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-3 rounded-xl border border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: "Primary CTA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Button Text", value: draft.about_profile_cta_primary_text ?? "", onChange: (e) => updateField("about_profile_cta_primary_text", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "URL", value: draft.about_profile_cta_primary_url ?? "", onChange: (e) => updateField("about_profile_cta_primary_url", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-3 rounded-xl border border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: "Secondary CTA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Button Text", value: draft.about_profile_cta_secondary_text ?? "", onChange: (e) => updateField("about_profile_cta_secondary_text", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "URL", value: draft.about_profile_cta_secondary_url ?? "", onChange: (e) => updateField("about_profile_cta_secondary_url", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground" })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    activeSection === "why-travel" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Section 3: Why I Travel" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: draft.about_why_travel_enabled !== "false", onChange: (val) => updateField("about_why_travel_enabled", val ? "true" : "false"), label: draft.about_why_travel_enabled !== "false" ? "Enabled" : "Disabled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Section Eyebrow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_why_travel_eyebrow ?? "", onChange: (e) => updateField("about_why_travel_eyebrow", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Section Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_why_travel_title ?? "", onChange: (e) => updateField("about_why_travel_title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none font-semibold" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Section Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: draft.about_why_travel_description ?? "", onChange: (e) => updateField("about_why_travel_description", e.target.value), className: "w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:border-accent focus:outline-none" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground", children: [
            "Why I Travel Cards (",
            whyTravelCards.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
            const newCard = {
              id: String(Date.now()),
              icon: "Compass",
              title: "New Travel Principle",
              description: "Principle description explaining the ethos.",
              order: whyTravelCards.length + 1,
              enabled: true
            };
            updateField("about_why_travel_cards", JSON.stringify([...whyTravelCards, newCard]));
          }, className: "inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Card" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-4", children: whyTravelCards.map((card, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-border/80 bg-background/60 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Icon (e.g. Compass, Heart, Shield)", value: card.icon, onChange: (e) => {
              const updated = [...whyTravelCards];
              updated[idx].icon = e.target.value;
              updateField("about_why_travel_cards", JSON.stringify(updated));
            }, className: "w-28 rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: card.enabled, onChange: (val) => {
                const updated = [...whyTravelCards];
                updated[idx].enabled = val;
                updateField("about_why_travel_cards", JSON.stringify(updated));
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                const updated = whyTravelCards.filter((_, i) => i !== idx);
                updateField("about_why_travel_cards", JSON.stringify(updated));
              }, className: "text-red-500 hover:text-red-600 p-1 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-medium text-muted-foreground mb-1", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: card.title, onChange: (e) => {
              const updated = [...whyTravelCards];
              updated[idx].title = e.target.value;
              updateField("about_why_travel_cards", JSON.stringify(updated));
            }, className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground font-semibold" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-medium text-muted-foreground mb-1", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, value: card.description, onChange: (e) => {
              const updated = [...whyTravelCards];
              updated[idx].description = e.target.value;
              updateField("about_why_travel_cards", JSON.stringify(updated));
            }, className: "w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground leading-relaxed" })
          ] })
        ] }, card.id)) })
      ] })
    ] }),
    activeSection === "motorcycle" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { className: "h-4 w-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Section 4: Motorcycle Adventures" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: draft.about_motorcycle_enabled !== "false", onChange: (val) => updateField("about_motorcycle_enabled", val ? "true" : "false"), label: draft.about_motorcycle_enabled !== "false" ? "Enabled" : "Disabled" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Eyebrow" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_motorcycle_eyebrow ?? "", onChange: (e) => updateField("about_motorcycle_eyebrow", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Image Badge" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_motorcycle_badge ?? "", onChange: (e) => updateField("about_motorcycle_badge", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_motorcycle_title ?? "", onChange: (e) => updateField("about_motorcycle_title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-semibold" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: draft.about_motorcycle_description ?? "", onChange: (e) => updateField("about_motorcycle_description", e.target.value), className: "w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground leading-relaxed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "CTA Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_motorcycle_cta_text ?? "", onChange: (e) => updateField("about_motorcycle_cta_text", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "CTA URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_motorcycle_cta_url ?? "", onChange: (e) => updateField("about_motorcycle_cta_url", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Atmospheric Image" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_motorcycle_image ?? "", onChange: (e) => updateField("about_motorcycle_image", e.target.value), placeholder: "https://... or Google Drive link", className: "flex-1 rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => motoFileInputRef.current?.click(), disabled: uploadingField === "about_motorcycle_image", className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors cursor-pointer", children: [
              uploadingField === "about_motorcycle_image" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Upload" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Alt Text", value: draft.about_motorcycle_image_alt ?? "", onChange: (e) => updateField("about_motorcycle_image_alt", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground", children: [
              "Motorcycle Feature Points (",
              motorcycleFeatures.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
              const newItem = {
                id: String(Date.now()),
                icon: "Route",
                title: "New Feature Point",
                description: "Feature description detailing terrain or mechanics.",
                order: motorcycleFeatures.length + 1,
                enabled: true
              };
              updateField("about_motorcycle_features", JSON.stringify([...motorcycleFeatures, newItem]));
            }, className: "inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Feature" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: motorcycleFeatures.map((feat, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 rounded-xl border border-border/80 bg-background/60 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Icon (e.g. Route, Wrench)", value: feat.icon, onChange: (e) => {
                const updated = [...motorcycleFeatures];
                updated[idx].icon = e.target.value;
                updateField("about_motorcycle_features", JSON.stringify(updated));
              }, className: "w-28 rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Feature Title", value: feat.title, onChange: (e) => {
                const updated = [...motorcycleFeatures];
                updated[idx].title = e.target.value;
                updateField("about_motorcycle_features", JSON.stringify(updated));
              }, className: "flex-1 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: feat.enabled, onChange: (val) => {
                const updated = [...motorcycleFeatures];
                updated[idx].enabled = val;
                updateField("about_motorcycle_features", JSON.stringify(updated));
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                const updated = motorcycleFeatures.filter((_, i) => i !== idx);
                updateField("about_motorcycle_features", JSON.stringify(updated));
              }, className: "text-red-500 hover:text-red-600 p-1 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, placeholder: "Description", value: feat.description, onChange: (e) => {
              const updated = [...motorcycleFeatures];
              updated[idx].description = e.target.value;
              updateField("about_motorcycle_features", JSON.stringify(updated));
            }, className: "w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground leading-relaxed" })
          ] }, feat.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Dark Cinematic Preview" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-zinc-950", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveMediaUrl(draft.about_motorcycle_image || ABOUT_DEFAULTS.about_motorcycle_image), alt: "Preview", className: "h-full w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-accent", children: draft.about_motorcycle_badge || ABOUT_DEFAULTS.about_motorcycle_badge }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-base font-bold mt-1", children: draft.about_motorcycle_title || ABOUT_DEFAULTS.about_motorcycle_title })
          ] })
        ] })
      ] }) })
    ] }),
    activeSection === "trekking" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "h-4 w-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Section 5: Trekking & High Altitude" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: draft.about_trekking_enabled !== "false", onChange: (val) => updateField("about_trekking_enabled", val ? "true" : "false"), label: draft.about_trekking_enabled !== "false" ? "Enabled" : "Disabled" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Eyebrow" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_trekking_eyebrow ?? "", onChange: (e) => updateField("about_trekking_eyebrow", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_trekking_title ?? "", onChange: (e) => updateField("about_trekking_title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-semibold" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: draft.about_trekking_description ?? "", onChange: (e) => updateField("about_trekking_description", e.target.value), className: "w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground leading-relaxed" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mountain Image & Location Overlay" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_trekking_image ?? "", onChange: (e) => updateField("about_trekking_image", e.target.value), placeholder: "https://... or Google Drive link", className: "flex-1 rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => trekFileInputRef.current?.click(), disabled: uploadingField === "about_trekking_image", className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors cursor-pointer", children: [
              uploadingField === "about_trekking_image" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Upload" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Alt Text", value: draft.about_trekking_image_alt ?? "", onChange: (e) => updateField("about_trekking_image_alt", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Location Label (e.g. Himalayan Solitude)", value: draft.about_trekking_location_label ?? "", onChange: (e) => updateField("about_trekking_location_label", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Location Quote (e.g. Against the silence of 8,000-meter giants...)", value: draft.about_trekking_location_quote ?? "", onChange: (e) => updateField("about_trekking_location_quote", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground", children: [
              "Trekking Feature Cards (",
              trekkingCards.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
              const newItem = {
                id: String(Date.now()),
                icon: "CheckCircle2",
                title: "New High Altitude Trail",
                description: "Trail specifics, pass altitude, and terrain.",
                order: trekkingCards.length + 1,
                enabled: true
              };
              updateField("about_trekking_cards", JSON.stringify([...trekkingCards, newItem]));
            }, className: "inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Trail" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: trekkingCards.map((card, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 rounded-xl border border-border/80 bg-background/60 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: card.title, onChange: (e) => {
                const updated = [...trekkingCards];
                updated[idx].title = e.target.value;
                updateField("about_trekking_cards", JSON.stringify(updated));
              }, className: "flex-1 rounded-lg border border-border bg-background px-2 py-1 text-xs font-semibold text-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: card.enabled, onChange: (val) => {
                  const updated = [...trekkingCards];
                  updated[idx].enabled = val;
                  updateField("about_trekking_cards", JSON.stringify(updated));
                } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                  const updated = trekkingCards.filter((_, i) => i !== idx);
                  updateField("about_trekking_cards", JSON.stringify(updated));
                }, className: "text-red-500 hover:text-red-600 p-1 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: card.description, onChange: (e) => {
              const updated = [...trekkingCards];
              updated[idx].description = e.target.value;
              updateField("about_trekking_cards", JSON.stringify(updated));
            }, className: "w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground leading-relaxed" })
          ] }, card.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Alpine Image Preview" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-zinc-950", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveMediaUrl(draft.about_trekking_image || ABOUT_DEFAULTS.about_trekking_image), alt: "Preview", className: "h-full w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-accent", children: draft.about_trekking_location_label || ABOUT_DEFAULTS.about_trekking_location_label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-200 mt-1 line-clamp-2", children: draft.about_trekking_location_quote || ABOUT_DEFAULTS.about_trekking_location_quote })
          ] })
        ] })
      ] }) })
    ] }),
    activeSection === "philosophy" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-4 w-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Section 6: Travel Philosophy Quote Box" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: draft.about_philosophy_enabled !== "false", onChange: (val) => updateField("about_philosophy_enabled", val ? "true" : "false"), label: draft.about_philosophy_enabled !== "false" ? "Enabled" : "Disabled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Featured Large Quote" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: draft.about_philosophy_quote ?? "", onChange: (e) => updateField("about_philosophy_quote", e.target.value), className: "w-full rounded-xl border border-border bg-background p-3.5 text-base italic font-serif text-foreground focus:border-accent focus:outline-none leading-relaxed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Supporting Philosophy Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, value: draft.about_philosophy_description ?? "", onChange: (e) => updateField("about_philosophy_description", e.target.value), className: "w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:border-accent focus:outline-none leading-relaxed" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Quote Box Preview" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-muted/40 p-6 border border-border/50 shadow-sm space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-base italic leading-relaxed text-foreground font-serif", children: [
            "“",
            draft.about_philosophy_quote || ABOUT_DEFAULTS.about_philosophy_quote,
            "”"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed pt-1", children: draft.about_philosophy_description || ABOUT_DEFAULTS.about_philosophy_description })
        ] })
      ] }) })
    ] }),
    activeSection === "philosophy-cards" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Section 7: 4 Pillars of the Travel Ethos" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
            const nextNum = String(philosophyCards.length + 1).padStart(2, "0");
            const newCard = {
              id: String(Date.now()),
              number: nextNum,
              title: "New Ethos Pillar",
              description: "Description of this exploration principle.",
              order: philosophyCards.length + 1,
              enabled: true
            };
            updateField("about_philosophy_cards", JSON.stringify([...philosophyCards, newCard]));
          }, className: "inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Pillar" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: draft.about_philosophy_cards_enabled !== "false", onChange: (val) => updateField("about_philosophy_cards_enabled", val ? "true" : "false"), label: draft.about_philosophy_cards_enabled !== "false" ? "Enabled" : "Disabled" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: philosophyCards.map((card, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-border/80 bg-background/60 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "01", value: card.number, onChange: (e) => {
            const updated = [...philosophyCards];
            updated[idx].number = e.target.value;
            updateField("about_philosophy_cards", JSON.stringify(updated));
          }, className: "w-12 rounded-lg border border-border bg-background px-2 py-1 text-xs font-bold text-accent text-center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: card.enabled, onChange: (val) => {
              const updated = [...philosophyCards];
              updated[idx].enabled = val;
              updateField("about_philosophy_cards", JSON.stringify(updated));
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
              const updated = philosophyCards.filter((_, i) => i !== idx);
              updateField("about_philosophy_cards", JSON.stringify(updated));
            }, className: "text-red-500 hover:text-red-600 p-1 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-medium text-muted-foreground mb-1", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: card.title, onChange: (e) => {
            const updated = [...philosophyCards];
            updated[idx].title = e.target.value;
            updateField("about_philosophy_cards", JSON.stringify(updated));
          }, className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground font-semibold" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-medium text-muted-foreground mb-1", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: card.description, onChange: (e) => {
            const updated = [...philosophyCards];
            updated[idx].description = e.target.value;
            updateField("about_philosophy_cards", JSON.stringify(updated));
          }, className: "w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground leading-relaxed" })
        ] })
      ] }, card.id)) })
    ] }) }),
    activeSection === "numbers" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Section 8: Journey in Numbers (Milestones)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: draft.about_numbers_enabled !== "false", onChange: (val) => updateField("about_numbers_enabled", val ? "true" : "false"), label: draft.about_numbers_enabled !== "false" ? "Enabled" : "Disabled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Eyebrow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_numbers_eyebrow ?? "", onChange: (e) => updateField("about_numbers_eyebrow", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_numbers_title ?? "", onChange: (e) => updateField("about_numbers_title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-semibold" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: draft.about_numbers_description ?? "", onChange: (e) => updateField("about_numbers_description", e.target.value), className: "w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground", children: [
            "Key Milestone Statistics (",
            numberStats.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
            const newStat = {
              id: String(Date.now()),
              value: "100+",
              label: "New Milestone",
              description: "Independent exploration",
              order: numberStats.length + 1,
              enabled: true
            };
            updateField("about_numbers_stats", JSON.stringify([...numberStats, newStat]));
          }, className: "inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Stat" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: numberStats.map((stat, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-border/80 bg-background/60 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold text-muted-foreground uppercase", children: [
              "Stat #",
              idx + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: stat.enabled, onChange: (val) => {
                const updated = [...numberStats];
                updated[idx].enabled = val;
                updateField("about_numbers_stats", JSON.stringify(updated));
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                const updated = numberStats.filter((_, i) => i !== idx);
                updateField("about_numbers_stats", JSON.stringify(updated));
              }, className: "text-red-500 hover:text-red-600 p-1 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-medium text-muted-foreground mb-1", children: "Big Number / Value" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: stat.value, onChange: (e) => {
              const updated = [...numberStats];
              updated[idx].value = e.target.value;
              updateField("about_numbers_stats", JSON.stringify(updated));
            }, className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-base font-bold text-brand" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-medium text-muted-foreground mb-1", children: "Label" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: stat.label, onChange: (e) => {
              const updated = [...numberStats];
              updated[idx].label = e.target.value;
              updateField("about_numbers_stats", JSON.stringify(updated));
            }, className: "w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground font-semibold" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-medium text-muted-foreground mb-1", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: stat.description, onChange: (e) => {
              const updated = [...numberStats];
              updated[idx].description = e.target.value;
              updateField("about_numbers_stats", JSON.stringify(updated));
            }, className: "w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground" })
          ] })
        ] }, stat.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground", children: [
              "Notable Expeditions & Terrains Explored (",
              terrainTags.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Dynamically editable badges shown beneath the statistics." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
            const newTag = {
              id: String(Date.now()),
              name: "New Expedition Route",
              order: terrainTags.length + 1,
              enabled: true
            };
            updateField("about_numbers_tags", JSON.stringify([...terrainTags, newTag]));
          }, className: "inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Tag" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Section Headline for Tags" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_numbers_tags_label ?? "", onChange: (e) => updateField("about_numbers_tags_label", e.target.value), className: "w-full max-w-md rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2.5 pt-2", children: terrainTags.map((tag, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-background text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: tag.name, onChange: (e) => {
            const updated = [...terrainTags];
            updated[idx].name = e.target.value;
            updateField("about_numbers_tags", JSON.stringify(updated));
          }, className: "bg-transparent border-none focus:outline-none text-xs text-foreground w-40 font-medium" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: tag.enabled, onChange: (val) => {
            const updated = [...terrainTags];
            updated[idx].enabled = val;
            updateField("about_numbers_tags", JSON.stringify(updated));
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            const updated = terrainTags.filter((_, i) => i !== idx);
            updateField("about_numbers_tags", JSON.stringify(updated));
          }, className: "text-red-500 hover:text-red-600 p-0.5 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
        ] }, tag.id)) })
      ] })
    ] }),
    activeSection === "content" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Section 9: What You Will Find on NDSOLOTRAVEL" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: draft.about_content_enabled !== "false", onChange: (val) => updateField("about_content_enabled", val ? "true" : "false"), label: draft.about_content_enabled !== "false" ? "Enabled" : "Disabled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Eyebrow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_content_eyebrow ?? "", onChange: (e) => updateField("about_content_eyebrow", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_content_title ?? "", onChange: (e) => updateField("about_content_title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-semibold" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: draft.about_content_description ?? "", onChange: (e) => updateField("about_content_description", e.target.value), className: "w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground", children: [
            "Content Pillars (",
            contentCards.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
            const newCard = {
              id: String(Date.now()),
              icon: "Compass",
              title: "New Content Pillar",
              description: "Pillar description detailing resources or stories.",
              ctaText: "Explore",
              ctaUrl: "/blog",
              order: contentCards.length + 1,
              enabled: true
            };
            updateField("about_content_cards", JSON.stringify([...contentCards, newCard]));
          }, className: "inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Pillar" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-4", children: contentCards.map((card, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-border/80 bg-background/60 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Icon (e.g. Compass, MapPin)", value: card.icon, onChange: (e) => {
              const updated = [...contentCards];
              updated[idx].icon = e.target.value;
              updateField("about_content_cards", JSON.stringify(updated));
            }, className: "w-28 rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: card.enabled, onChange: (val) => {
                const updated = [...contentCards];
                updated[idx].enabled = val;
                updateField("about_content_cards", JSON.stringify(updated));
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                const updated = contentCards.filter((_, i) => i !== idx);
                updateField("about_content_cards", JSON.stringify(updated));
              }, className: "text-red-500 hover:text-red-600 p-1 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-medium text-muted-foreground mb-1", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: card.title, onChange: (e) => {
              const updated = [...contentCards];
              updated[idx].title = e.target.value;
              updateField("about_content_cards", JSON.stringify(updated));
            }, className: "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground font-semibold" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-medium text-muted-foreground mb-1", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: card.description, onChange: (e) => {
              const updated = [...contentCards];
              updated[idx].description = e.target.value;
              updateField("about_content_cards", JSON.stringify(updated));
            }, className: "w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground leading-relaxed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "CTA Text", value: card.ctaText, onChange: (e) => {
              const updated = [...contentCards];
              updated[idx].ctaText = e.target.value;
              updateField("about_content_cards", JSON.stringify(updated));
            }, className: "w-full rounded-lg border border-border bg-background px-2 py-1 text-xs text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "CTA URL", value: card.ctaUrl, onChange: (e) => {
              const updated = [...contentCards];
              updated[idx].ctaUrl = e.target.value;
              updateField("about_content_cards", JSON.stringify(updated));
            }, className: "w-full rounded-lg border border-border bg-background px-2 py-1 text-xs text-foreground" })
          ] })
        ] }, card.id)) })
      ] })
    ] }),
    activeSection === "cta" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "h-4 w-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Section 10: Final Call To Action" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: draft.about_cta_enabled !== "false", onChange: (val) => updateField("about_cta_enabled", val ? "true" : "false"), label: draft.about_cta_enabled !== "false" ? "Enabled" : "Disabled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Eyebrow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_cta_eyebrow ?? "", onChange: (e) => updateField("about_cta_eyebrow", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_cta_title ?? "", onChange: (e) => updateField("about_cta_title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-semibold" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: draft.about_cta_description ?? "", onChange: (e) => updateField("about_cta_description", e.target.value), className: "w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground leading-relaxed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-3 rounded-xl border border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: "Primary Button" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Text", value: draft.about_cta_primary_text ?? "", onChange: (e) => updateField("about_cta_primary_text", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "URL", value: draft.about_cta_primary_url ?? "", onChange: (e) => updateField("about_cta_primary_url", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-3 rounded-xl border border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: "Secondary Button" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Text", value: draft.about_cta_secondary_text ?? "", onChange: (e) => updateField("about_cta_secondary_text", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "URL", value: draft.about_cta_secondary_url ?? "", onChange: (e) => updateField("about_cta_secondary_url", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-3 rounded-xl border border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: "Tertiary Button" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Text", value: draft.about_cta_tertiary_text ?? "", onChange: (e) => updateField("about_cta_tertiary_text", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "URL", value: draft.about_cta_tertiary_url ?? "", onChange: (e) => updateField("about_cta_tertiary_url", e.target.value), className: "w-full rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CTA Preview" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-2xl bg-zinc-950 border border-white/10 text-white space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-accent", children: draft.about_cta_eyebrow || ABOUT_DEFAULTS.about_cta_eyebrow }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg font-bold", children: draft.about_cta_title || ABOUT_DEFAULTS.about_cta_title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-300 leading-relaxed font-light", children: draft.about_cta_description || ABOUT_DEFAULTS.about_cta_description })
        ] })
      ] }) })
    ] }),
    activeSection === "seo" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground flex items-center gap-2 border-b border-border/60 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Section 11: SEO & Social Metadata" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Page SEO Title Tag" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_seo_title ?? "", onChange: (e) => updateField("about_seo_title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Meta Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: draft.about_seo_description ?? "", onChange: (e) => updateField("about_seo_description", e.target.value), className: "w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:border-accent focus:outline-none leading-relaxed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Open Graph Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_og_title ?? "", onChange: (e) => updateField("about_og_title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Canonical URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_canonical_url ?? "", onChange: (e) => updateField("about_canonical_url", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Open Graph Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: draft.about_og_description ?? "", onChange: (e) => updateField("about_og_description", e.target.value), className: "w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Open Graph Share Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: draft.about_og_image ?? "", onChange: (e) => updateField("about_og_image", e.target.value), placeholder: "https://... or upload", className: "flex-1 rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => ogFileInputRef.current?.click(), disabled: uploadingField === "about_og_image", className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors cursor-pointer", children: [
              uploadingField === "about_og_image" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Upload" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    activeSection === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground flex items-center gap-2 border-b border-border/60 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Section 12: Page Visibility & Settings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl border border-border/80 bg-background/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Page Published Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Controls whether the public /about page is accessible to visitors." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { checked: draft.about_published !== "false", onChange: (val) => updateField("about_published", val ? "true" : "false"), label: draft.about_published !== "false" ? "Published" : "Draft" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl border border-border/80 bg-background/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Page Visibility" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Current visibility mode for search engines and site navigation." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: draft.about_page_visibility ?? "public", onChange: (e) => updateField("about_page_visibility", e.target.value), className: "rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "public", children: "Public (Indexed)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "unlisted", children: "Unlisted" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "private", children: "Private (Admin only)" })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminAboutPage as component
};
