import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as useServerFn } from "./router-BuJVAroo.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { adminListDestinations, adminUpsertDestination, adminUpdateDestinationCoordinates, adminDeleteDestination, adminUploadImage } from "./admin.functions-MvZQXaGD.mjs";
import { adminFetchCountryCoordinates } from "./geocoding.functions-C-OZdE3U.mjs";
import { H as HeroBannerManager } from "./HeroBannerManager-DKwc4zov.mjs";
import { r as resolveMediaUrl } from "./media-DKXRUyGU.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { B as Compass, aC as Plus, h as LoaderCircle, ag as Star, l as FileText, m as MapPin, E as ExternalLink, af as Navigation, aD as Pencil, aw as Trash2, X, b as Sparkles, G as Globe, v as CircleCheck, av as CircleX, a3 as Check, ay as Upload, ax as Save } from "../_libs/lucide-react.mjs";
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
import "./createSsrRpc-BLJWJFkS.mjs";
import "./client-BqBvvzI9.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-DFv8buKs.mjs";
import "./posts.functions-S458rgU7.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./categories.functions-BG32lH_N.mjs";
import "./topics-T4Y39Ysn.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
function AdminDestinations() {
  const listFn = useServerFn(adminListDestinations);
  const saveFn = useServerFn(adminUpsertDestination);
  const updateCoordsFn = useServerFn(adminUpdateDestinationCoordinates);
  const delFn = useServerFn(adminDeleteDestination);
  const uploadFn = useServerFn(adminUploadImage);
  const fetchCountryCoordsFn = useServerFn(adminFetchCountryCoordinates);
  const qc = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-destinations"],
    queryFn: async () => await listFn()
  });
  const [editingOriginal, setEditingOriginal] = reactExports.useState(null);
  const [editingForm, setEditingForm] = reactExports.useState(null);
  const [saveStatus, setSaveStatus] = reactExports.useState("idle");
  const [saveErrorMessage, setSaveErrorMessage] = reactExports.useState(null);
  const [coordStatus, setCoordStatus] = reactExports.useState("idle");
  const [coordErrorMessage, setCoordErrorMessage] = reactExports.useState(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [fetchingCoords, setFetchingCoords] = reactExports.useState(false);
  const [fetchedCoordsInfo, setFetchedCoordsInfo] = reactExports.useState(null);
  function handleStartEdit(d) {
    const initial = {
      id: d.id,
      title: d.title || "",
      slug: d.slug || "",
      country: d.country || "",
      region: d.region ?? "",
      description: d.description ?? "",
      featured_image: d.featured_image ?? "",
      category: d.category ?? "",
      featured: Boolean(d.featured),
      published: d.published !== false,
      latitude: d.latitude != null ? Number(d.latitude) : null,
      longitude: d.longitude != null ? Number(d.longitude) : null
    };
    setEditingOriginal(initial);
    setEditingForm(initial);
    setFetchedCoordsInfo(null);
    setSaveStatus("idle");
    setSaveErrorMessage(null);
    setCoordStatus("idle");
    setCoordErrorMessage(null);
  }
  function handleCloseModal() {
    setEditingOriginal(null);
    setEditingForm(null);
    setFetchedCoordsInfo(null);
    setFetchingCoords(false);
    setSaveStatus("idle");
    setSaveErrorMessage(null);
    setCoordStatus("idle");
    setCoordErrorMessage(null);
  }
  async function handleFetchCoordinates() {
    if (!editingForm) return;
    const countryQuery = (editingForm.country || "").trim();
    if (!countryQuery) {
      toast.error("Please enter a Country first before fetching coordinates.");
      return;
    }
    try {
      setFetchingCoords(true);
      setFetchedCoordsInfo(null);
      const res = await fetchCountryCoordsFn({
        data: {
          country: countryQuery
        }
      });
      if (res && res.success && typeof res.latitude === "number" && typeof res.longitude === "number") {
        updateField("latitude", res.latitude);
        updateField("longitude", res.longitude);
        setFetchedCoordsInfo({
          displayName: res.displayName || countryQuery,
          lat: res.latitude,
          lng: res.longitude
        });
        setCoordStatus("idle");
        toast.success(res.message || `Coordinates populated for "${countryQuery}"!`);
      } else {
        toast.error(res?.message || `Could not find coordinates for "${countryQuery}". Existing coordinates kept unchanged.`);
      }
    } catch (err) {
      toast.error(err.message || "Failed to lookup coordinates. Please check the country name or enter manually.");
    } finally {
      setFetchingCoords(false);
    }
  }
  function updateField(key, value) {
    setEditingForm((prev) => prev ? {
      ...prev,
      [key]: value
    } : prev);
    if (saveStatus !== "idle") {
      setSaveStatus("idle");
      setSaveErrorMessage(null);
    }
  }
  const isDirty = reactExports.useMemo(() => {
    if (!editingForm || !editingOriginal) return false;
    if (!editingOriginal.id) {
      return Boolean(editingForm.title.trim() || editingForm.country.trim() || editingForm.latitude != null || editingForm.longitude != null || editingForm.description?.trim() || editingForm.featured_image?.trim() || editingForm.category?.trim() || editingForm.featured !== void 0);
    }
    return editingForm.title !== editingOriginal.title || (editingForm.slug || "") !== (editingOriginal.slug || "") || editingForm.country !== editingOriginal.country || (editingForm.region || "") !== (editingOriginal.region || "") || (editingForm.description || "") !== (editingOriginal.description || "") || (editingForm.featured_image || "") !== (editingOriginal.featured_image || "") || (editingForm.category || "") !== (editingOriginal.category || "") || editingForm.published !== editingOriginal.published || editingForm.latitude !== editingOriginal.latitude || editingForm.longitude !== editingOriginal.longitude || Boolean(editingForm.featured) !== Boolean(editingOriginal.featured);
  }, [editingForm, editingOriginal]);
  const save = useMutation({
    mutationFn: async (payload) => {
      const cleanLat = payload.latitude !== void 0 && payload.latitude !== null && !isNaN(Number(payload.latitude)) ? Number(payload.latitude) : null;
      const cleanLng = payload.longitude !== void 0 && payload.longitude !== null && !isNaN(Number(payload.longitude)) ? Number(payload.longitude) : null;
      const dataToSave = {
        ...payload,
        featured: Boolean(payload.featured),
        latitude: cleanLat,
        longitude: cleanLng
      };
      return await saveFn({
        data: dataToSave
      });
    },
    onSuccess: (res) => {
      qc.invalidateQueries({
        queryKey: ["admin-destinations"]
      });
      qc.invalidateQueries({
        queryKey: ["destinations"]
      });
      qc.invalidateQueries({
        queryKey: ["photo-archive"]
      });
      qc.invalidateQueries({
        queryKey: ["gallery"]
      });
      const savedRow = res?.destination || editingForm;
      const updated = {
        id: savedRow.id,
        title: savedRow.title,
        slug: savedRow.slug,
        country: savedRow.country,
        region: savedRow.region ?? null,
        description: savedRow.description ?? null,
        featured_image: savedRow.featured_image ?? null,
        category: savedRow.category ?? null,
        featured: Boolean(savedRow.featured),
        published: savedRow.published !== false,
        latitude: savedRow.latitude != null ? Number(savedRow.latitude) : null,
        longitude: savedRow.longitude != null ? Number(savedRow.longitude) : null
      };
      setEditingOriginal(updated);
      setEditingForm(updated);
      setSaveStatus("saved");
      setSaveErrorMessage(null);
      toast.success("Destination saved successfully!");
    },
    onError: (e) => {
      setSaveStatus("error");
      setSaveErrorMessage(e.message || "Database update failed");
      toast.error(e.message || "Failed to save destination");
    }
  });
  const updateCoordsMutation = useMutation({
    mutationFn: async ({
      id,
      latitude,
      longitude
    }) => {
      return await updateCoordsFn({
        data: {
          id,
          latitude,
          longitude
        }
      });
    },
    onSuccess: (res) => {
      qc.invalidateQueries({
        queryKey: ["admin-destinations"]
      });
      qc.invalidateQueries({
        queryKey: ["destinations"]
      });
      const savedRow = res?.destination;
      if (savedRow) {
        setEditingOriginal((prev) => prev ? {
          ...prev,
          latitude: Number(savedRow.latitude),
          longitude: Number(savedRow.longitude)
        } : prev);
        setEditingForm((prev) => prev ? {
          ...prev,
          latitude: Number(savedRow.latitude),
          longitude: Number(savedRow.longitude)
        } : prev);
      }
      setCoordStatus("updated");
      setCoordErrorMessage(null);
      toast.success("Coordinates updated successfully!");
    },
    onError: (e) => {
      setCoordStatus("error");
      setCoordErrorMessage(e.message || "Failed to update coordinates");
      toast.error(e.message || "Failed to update coordinates");
    }
  });
  function handleUpdateCoordinates() {
    if (!editingForm) return;
    if (!editingForm.id) {
      toast.info("Please save the destination first to create the record before updating coordinates.");
      return;
    }
    const lat = editingForm.latitude;
    const lng = editingForm.longitude;
    if (lat === null || lat === void 0 || isNaN(Number(lat)) || Number(lat) < -90 || Number(lat) > 90) {
      toast.error("Please enter a valid Latitude between -90 and 90");
      return;
    }
    if (lng === null || lng === void 0 || isNaN(Number(lng)) || Number(lng) < -180 || Number(lng) > 180) {
      toast.error("Please enter a valid Longitude between -180 and 180");
      return;
    }
    updateCoordsMutation.mutate({
      id: editingForm.id,
      latitude: Number(lat),
      longitude: Number(lng)
    });
  }
  const del = useMutation({
    mutationFn: (id) => delFn({
      data: {
        id
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-destinations"]
      });
      qc.invalidateQueries({
        queryKey: ["destinations"]
      });
      qc.invalidateQueries({
        queryKey: ["photo-archive"]
      });
      qc.invalidateQueries({
        queryKey: ["gallery"]
      });
      toast.success("Destination deleted");
    },
    onError: (e) => toast.error(e.message)
  });
  async function upload(file) {
    try {
      setUploading(true);
      const buf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const {
        url
      } = await uploadFn({
        data: {
          filename: file.name,
          contentType: file.type,
          base64
        }
      });
      updateField("featured_image", url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-2xl bg-brand/10 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-6 w-6 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Destinations Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Manage travel regions, map coordinates, imagery, and linked stories" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleStartEdit({
        title: "",
        country: "Pakistan",
        featured: false,
        published: true
      }), className: "inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 transition-all cursor-pointer shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " New Destination"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroBannerManager, { page: "destinations", autoHint: "Automatically uses the latest suitable destination photo.", manualHint: "Pick a destination photo from the CMS below, upload one, or paste a URL.", optionsLabel: "Destination Photos" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-7 w-7 animate-spin text-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Loading destinations..." })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: (data ?? []).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-accent/40 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video w-full bg-muted overflow-hidden", children: [
          d.featured_image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveMediaUrl(d.featured_image), alt: d.title, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full flex items-center justify-center text-muted-foreground text-xs", children: "No featured image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2.5 left-2.5 flex items-center gap-1.5", children: d.featured ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-amber-500/90 text-white backdrop-blur-xs px-2.5 py-0.5 text-[11px] font-bold shadow-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-white" }),
            " Featured"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded-full bg-background/80 text-muted-foreground backdrop-blur-xs px-2 py-0.5 text-[10px] font-medium border border-border/50", children: "Standard" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2.5 right-2.5 flex items-center gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-xs px-2.5 py-0.5 text-[11px] font-semibold text-foreground shadow-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3 w-3 text-accent" }),
            d.posts_count ?? 0,
            " ",
            d.posts_count === 1 ? "Story" : "Stories"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-accent flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
              d.country,
              d.region ? ` · ${d.region}` : ""
            ] }),
            d.slug && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/destinations/$slug", params: {
              slug: d.slug
            }, target: "_blank", title: "View public destination page", className: "text-muted-foreground hover:text-accent transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground", children: d.title }),
          d.latitude != null && d.longitude != null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-lg px-2.5 py-1 w-fit border border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3 w-3 text-accent shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px]", children: [
              Number(d.latitude).toFixed(4),
              ", ",
              Number(d.longitude).toFixed(4)
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 text-[11px] text-amber-600/90 bg-amber-500/10 rounded-lg px-2 py-0.5 w-fit", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Coordinates not set" }) }),
          d.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-xs text-muted-foreground leading-relaxed", children: d.description })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-t border-border/60 pt-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleStartEdit(d), className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3 text-accent" }),
          " Edit"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          if (d.posts_count > 0) {
            toast.error(`Cannot delete "${d.title}" because ${d.posts_count} story(ies) are assigned to it.`);
            return;
          }
          if (confirm(`Delete destination "${d.title}"?`)) del.mutate(d.id);
        }, className: "ml-auto inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
          " Delete"
        ] })
      ] }) })
    ] }, d.id)) }),
    editingForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm", onClick: handleCloseModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: (e) => e.stopPropagation(), className: "relative flex flex-col w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-2xl border border-border bg-background shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-6 py-4 shrink-0 bg-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-brand/10 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-5 w-5 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground", children: editingForm.id ? "Edit Destination" : "New Destination" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: editingForm.id ? `Managing "${editingForm.title}" region details, coordinates, and status` : "Add a new travel destination with map location" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleCloseModal, className: "inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer", "aria-label": "Close dialog", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      isDirty && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between border-b border-brand/20 bg-brand/10 px-6 py-2 text-xs text-brand animate-fade-in shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: 'You have unsaved changes. Click "Save Changes" below to update the database.' })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "destination-form", onSubmit: (e) => {
        e.preventDefault();
        if (!isDirty || save.isPending) return;
        save.mutate(editingForm);
      }, className: "flex-1 overflow-y-auto p-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: [
            "Destination Title ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingForm.title, onChange: (e) => updateField("title", e.target.value), placeholder: "e.g. K2 Base Camp, Concordia", required: true, className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-medium text-foreground", children: [
              "Country ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingForm.country, onChange: (e) => updateField("country", e.target.value), placeholder: "e.g. Pakistan", required: true, className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none transition-colors" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 pt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleFetchCoordinates, disabled: fetchingCoords, className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-2xs hover:bg-muted hover:border-accent/50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed", title: "Automatically look up geographic coordinates for this country", children: fetchingCoords ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Fetching Coordinates..." })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3.5 w-3.5 text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Fetch Coordinates" })
                ] }) }),
                fetchedCoordsInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 animate-fade-in", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Populated: ",
                    fetchedCoordsInfo.lat.toFixed(4),
                    ", ",
                    fetchedCoordsInfo.lng.toFixed(4)
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Region / Province (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingForm.region ?? "", onChange: (e) => updateField("region", e.target.value), placeholder: "e.g. Gilgit-Baltistan", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none transition-colors" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-2xs space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-xl bg-brand/10 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-4 w-4 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold uppercase tracking-wider text-foreground", children: "Map Coordinates (Manual Latitude & Longitude)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: 'Exact geographic coordinates stored in the database. Use "Fetch Coordinates" above to populate automatically, or edit manually.' })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Latitude" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "any", min: -90, max: 90, value: editingForm.latitude != null ? editingForm.latitude : "", onChange: (e) => {
                const val = e.target.value.trim();
                updateField("latitude", val === "" ? null : parseFloat(val));
                setCoordStatus("idle");
              }, placeholder: "e.g. 35.7444", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none font-mono transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Longitude" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "any", min: -180, max: 180, value: editingForm.longitude != null ? editingForm.longitude : "", onChange: (e) => {
                const val = e.target.value.trim();
                updateField("longitude", val === "" ? null : parseFloat(val));
                setCoordStatus("idle");
              }, placeholder: "e.g. 76.5250", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none font-mono transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: updateCoordsMutation.isPending || editingForm.latitude == null || editingForm.longitude == null, onClick: handleUpdateCoordinates, className: "inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed", children: updateCoordsMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Updating Coordinates..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Update Coordinates" })
              ] }) }),
              coordStatus === "updated" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-xs font-semibold text-emerald-600 animate-fade-in shadow-2xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Coordinates updated" })
              ] }),
              coordStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/25 px-3 py-1 text-xs font-semibold text-red-600 animate-fade-in shadow-2xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: coordErrorMessage || "Failed to update coordinates" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Slug (optional - auto-generated from title if empty)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingForm.slug ?? "", onChange: (e) => updateField("slug", e.target.value), placeholder: "e.g. k2-base-camp-concordia", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: editingForm.description ?? "", onChange: (e) => updateField("description", e.target.value), placeholder: "Brief overview, terrain notes, and highlights of this destination...", className: "w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:border-accent focus:outline-none leading-relaxed resize-y transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editingForm.category ?? "", onChange: (e) => updateField("category", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Mountains", children: "Mountains" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Motorcycle Journeys", children: "Motorcycle Journeys" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Trekking", children: "Trekking" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Adventure", children: "Adventure" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Cultural Experiences", children: "Cultural Experiences" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-2xs space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-1.5 rounded-xl transition-colors ${editingForm.featured ? "bg-amber-500/15 text-amber-500" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-4 w-4 ${editingForm.featured ? "fill-amber-500" : ""}` }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-foreground", children: "Featured Destination" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${editingForm.featured ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30" : "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border border-zinc-500/30"}`, children: editingForm.featured ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 stroke-[3]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ON" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3 stroke-[2.5]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "OFF" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground leading-relaxed", children: [
              "Controls eligibility for the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Featured Destinations" }),
              " section on the homepage and public atlas spotlight."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0 self-start sm:self-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-xl border border-border bg-muted/40 p-1 shadow-inner", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => updateField("featured", true), className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${editingForm.featured ? "bg-emerald-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 stroke-[2.5]" }),
                " ON"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => updateField("featured", false), className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${!editingForm.featured ? "bg-zinc-700 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5 stroke-[2.5]" }),
                " OFF"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", role: "switch", "aria-checked": Boolean(editingForm.featured), "aria-label": "Toggle Featured destination on or off", onClick: () => updateField("featured", !editingForm.featured), className: `relative inline-flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${editingForm.featured ? "bg-emerald-600" : "bg-zinc-300 dark:bg-zinc-700"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `pointer-events-none inline-flex h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out items-center justify-center ${editingForm.featured ? "translate-x-5" : "translate-x-0"}`, children: editingForm.featured ? /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 text-emerald-600 fill-emerald-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-zinc-400" }) }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-foreground mb-1.5", children: "Featured Image" }),
          editingForm.featured_image && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-2.5 aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: editingForm.featured_image, alt: editingForm.title || "Preview", className: "h-full w-full object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateField("featured_image", ""), className: "absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white hover:bg-black transition-colors cursor-pointer", title: "Remove image", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors w-full sm:w-auto shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (e) => e.target.files?.[0] && upload(e.target.files[0]), className: "hidden" }),
              uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
                " Uploading..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5 text-accent" }),
                " Upload Image"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editingForm.featured_image ?? "", onChange: (e) => updateField("featured_image", e.target.value), placeholder: "or paste image URL", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-accent focus:outline-none transition-colors" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2.5 cursor-pointer text-sm font-medium text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editingForm.published !== false, onChange: (e) => updateField("published", e.target.checked), className: "h-4 w-4 rounded border-border text-accent focus:ring-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Published on public site and interactive map" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-3.5 shrink-0 bg-card/95 backdrop-blur-md shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          saveStatus === "saved" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-xs font-semibold text-emerald-600 animate-fade-in shadow-2xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saved to database" })
          ] }),
          saveStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/25 px-3 py-1 text-xs font-semibold text-red-600 animate-fade-in shadow-2xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: saveErrorMessage || "Save failed" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 ml-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleCloseModal, className: "rounded-xl border border-border bg-card px-4 py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", form: "destination-form", disabled: !isDirty || save.isPending || uploading, className: `inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${!isDirty || save.isPending || uploading ? "opacity-50 cursor-not-allowed bg-brand/70 text-white" : "bg-brand text-white shadow-md shadow-brand/20 hover:bg-brand/90 cursor-pointer"}`, children: save.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saving..." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: editingForm.id ? "Save Changes" : "Create Destination" })
          ] }) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminDestinations as component
};
