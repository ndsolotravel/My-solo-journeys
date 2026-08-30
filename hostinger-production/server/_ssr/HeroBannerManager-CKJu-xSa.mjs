import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { f as useServerFn, X as adminGetPageHeroEditor, F as adminUpdateSetting, Y as listDestinations, Z as listGallery, _ as PAGE_HERO_KEYS } from "./router-DTYunwUp.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { d as adminUploadImage } from "./admin.functions-OVCuV9an.mjs";
import { r as resolveMediaUrl } from "./media-DUkNwMwq.mjs";
import { aJ as BookMarked, b as Sparkles, h as LoaderCircle, q as CircleCheck, at as Upload, ap as CircleX, ar as RotateCcw, as as Save, aK as ImageOff } from "../_libs/lucide-react.mjs";
function DefaultBannerPreview({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full w-full flex-col items-center justify-center gap-2 bg-zinc-950 p-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "h-6 w-6 text-muted-foreground/50" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "Default banner" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] leading-relaxed text-muted-foreground/70", children: label })
  ] });
}
function HeroBannerManager({
  page,
  title = "Hero Banner Management",
  description = "Configure the banner image at the top of this page.",
  autoHint = "Automatically uses a suitable image from this page's existing content.",
  manualHint = "Pick an image manually from the CMS content below, upload one, or paste a URL.",
  optionsLabel = "Available CMS Images"
}) {
  const qc = useQueryClient();
  const getEditorFn = useServerFn(adminGetPageHeroEditor);
  const updateSettingFn = useServerFn(adminUpdateSetting);
  const uploadFn = useServerFn(adminUploadImage);
  const keys = PAGE_HERO_KEYS[page];
  const destinationsFn = useServerFn(listDestinations);
  const galleryFn = useServerFn(listGallery);
  const { data: saved } = useQuery({
    queryKey: ["page-hero-editor", page],
    queryFn: async () => await getEditorFn({ data: page })
  });
  const { data: options } = useQuery({
    queryKey: ["page-hero-options", page],
    queryFn: async () => {
      if (page === "destinations") {
        const rows = await destinationsFn();
        return (rows ?? []).map((d) => ({
          value: d.featured_image || "",
          label: d.title || "Destination",
          image: d.featured_image || ""
        })).filter((o) => Boolean(o.image));
      }
      const items = await galleryFn();
      return (items ?? []).map((g) => ({
        value: g.image_url || "",
        label: g.caption || "Gallery image",
        image: g.image_url || ""
      })).filter((o) => Boolean(o.image));
    }
  });
  const [draftMode, setDraftMode] = reactExports.useState("auto");
  const [draftImage, setDraftImage] = reactExports.useState("");
  const [isLoaded, setIsLoaded] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState(false);
  const [txtValue, setTxtValue] = reactExports.useState("");
  reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (saved && !isLoaded) {
      setDraftMode(saved.mode);
      setDraftImage(saved.image);
      setTxtValue(resolveMediaUrl(saved.image));
      setIsLoaded(true);
    }
  }, [saved, isLoaded]);
  const isDirty = reactExports.useMemo(
    () => isLoaded && (draftMode !== (saved?.mode ?? "auto") || draftImage !== (saved?.image ?? "")),
    [isLoaded, draftMode, draftImage, saved]
  );
  const autoSource = reactExports.useMemo(() => {
    if (saved?.mode !== "auto") return null;
    if (saved?.autoImage) return saved.autoImage;
    return (options ?? []).find((o) => o.image)?.image ?? "";
  }, [saved, options]);
  const effectiveImage = draftMode === "manual" ? draftImage.trim() ? resolveMediaUrl(draftImage) : "" : saved?.mode === "auto" ? autoSource : "";
  const save = useMutation({
    mutationFn: async () => {
      await updateSettingFn({
        data: {
          key: keys.mode,
          value: draftMode,
          description: `Hero banner mode for the ${page} page (auto|manual)`
        }
      });
      await updateSettingFn({
        data: {
          key: keys.image,
          value: draftImage,
          description: `Manual hero banner image for the ${page} page`
        }
      });
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["page-hero-editor", page] });
      await qc.invalidateQueries({ queryKey: ["page-hero", page] });
      toast.success("Hero banner settings saved!");
    },
    onError: (e) => {
      toast.error(e.message || "Failed to save hero banner settings");
    }
  });
  function handleReset() {
    setDraftMode(saved?.mode ?? "auto");
    setDraftImage(saved?.image ?? "");
    setTxtValue(resolveMediaUrl(saved?.image ?? ""));
  }
  async function upload(file) {
    try {
      setUploading(true);
      const buf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const { url } = await uploadFn({
        data: { filename: file.name, contentType: file.type, base64 }
      });
      setDraftImage(url);
      setTxtValue(resolveMediaUrl(url));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold flex items-center gap-2 text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "h-5 w-5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
        " Public"
      ] })
    ] }),
    !isLoaded ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-32 items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-accent" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setDraftMode("auto"),
            className: `flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition cursor-pointer ${draftMode === "auto" ? "border-accent bg-accent/10 text-accent font-medium shadow-xs" : "border-border bg-background hover:bg-muted"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `p-2 rounded-lg ${draftMode === "auto" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold", children: "Auto Mode" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: autoHint })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setDraftMode("manual"),
            className: `flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition cursor-pointer ${draftMode === "manual" ? "border-brand bg-brand/10 text-brand font-medium shadow-xs" : "border-border bg-background hover:bg-muted"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `p-2 rounded-lg ${draftMode === "manual" ? "bg-brand/20 text-brand" : "bg-muted text-muted-foreground"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold", children: "Manual Mode" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: manualHint })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground", children: "Live Preview (16:9)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-zinc-950", children: effectiveImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: effectiveImage,
            alt: "Current hero banner preview",
            className: "h-full w-full object-cover object-center"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          DefaultBannerPreview,
          {
            label: draftMode === "manual" ? "No manual image set — the default banner will be shown." : "No suitable image found yet — the default banner will be shown."
          }
        ) })
      ] }),
      draftMode === "auto" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-accent/25 bg-accent/5 p-4 space-y-2 animate-fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Automatically Selected From CMS Content" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-[11px]", children: "Updates automatically as content changes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Switching to Manual preserves this automatic selection in the background — your manual choice will be restored whenever you switch back." })
      ] }),
      draftMode === "manual" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground", children: optionsLabel }),
          options && options.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5", children: options.map((option) => {
            const selected = resolveMediaUrl(draftImage) === option.image;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setDraftImage(option.value);
                  setTxtValue(option.image);
                },
                className: `group overflow-hidden rounded-xl border text-left transition cursor-pointer ${selected ? "border-accent ring-1 ring-accent bg-accent/10" : "border-border bg-background hover:border-accent/50"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] w-full overflow-hidden bg-muted", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: option.image,
                        alt: option.label,
                        loading: "lazy",
                        className: "h-full w-full object-cover object-center transition-transform group-hover:scale-105"
                      }
                    ),
                    selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-1.5 right-1.5 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-background", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
                      " Selected"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate px-2 py-1.5 text-[11px] font-medium text-foreground", children: option.label })
                ]
              },
              option.value
            );
          }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl border border-dashed border-border bg-muted/30 p-4 text-xs text-muted-foreground", children: "No images available in CMS content yet. Upload an image or paste a URL below." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground", children: "Image URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors w-full sm:w-auto shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  onChange: (e) => e.target.files?.[0] && upload(e.target.files[0]),
                  className: "hidden"
                }
              ),
              uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
                " Uploading..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5 text-accent" }),
                " Upload Image"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: txtValue,
                onChange: (e) => {
                  const val = e.target.value;
                  setTxtValue(val);
                  setDraftImage(val);
                },
                placeholder: "or paste/CMS image URL",
                className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none transition-colors"
              }
            ),
            effectiveImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setDraftImage("");
                  setTxtValue("");
                },
                className: "inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition cursor-pointer font-medium shrink-0",
                children: "Clear to Default"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          save.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
            " Saving..."
          ] }),
          save.isSuccess && !isDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-xs font-semibold text-emerald-600 animate-fade-in", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
            " Saved to database"
          ] }),
          save.isError && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/25 px-3 py-1 text-xs font-semibold text-red-600 animate-fade-in", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
            " Save failed"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 ml-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleReset,
              disabled: !isDirty || save.isPending,
              className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
                " Reset"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => save.mutate(),
              disabled: !isDirty || save.isPending || uploading,
              className: `inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${!isDirty || save.isPending || uploading ? "opacity-50 cursor-not-allowed bg-brand/70 text-white" : "bg-brand text-white shadow-md shadow-brand/20 hover:bg-brand/90"}`,
              children: save.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saving..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Save Hero Banner" })
              ] })
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  HeroBannerManager as H
};
