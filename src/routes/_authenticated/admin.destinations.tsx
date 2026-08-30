import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Plus,
  Trash2,
  Pencil,
  X,
  MapPin,
  Upload,
  Loader2,
  ExternalLink,
  FileText,
  Save,
  CheckCircle2,
  XCircle,
  Compass,
  Navigation,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminListDestinations,
  adminUpsertDestination,
  adminUpdateDestinationCoordinates,
  adminDeleteDestination,
  adminUploadImage,
  resolveMediaUrl,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/destinations")({
  component: AdminDestinations,
});

type Dest = {
  id?: string;
  title: string;
  slug?: string;
  country: string;
  region?: string | null;
  description?: string | null;
  featured_image?: string | null;
  published?: boolean;
  latitude?: number | null;
  longitude?: number | null;
  posts_count?: number;
};

function AdminDestinations() {
  const listFn = useServerFn(adminListDestinations);
  const saveFn = useServerFn(adminUpsertDestination);
  const updateCoordsFn = useServerFn(adminUpdateDestinationCoordinates);
  const delFn = useServerFn(adminDeleteDestination);
  const uploadFn = useServerFn(adminUploadImage);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery<any>({
    queryKey: ["admin-destinations"],
    queryFn: async () => await listFn(),
  });

  const [editingOriginal, setEditingOriginal] = useState<Dest | null>(null);
  const [editingForm, setEditingForm] = useState<Dest | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [saveErrorMessage, setSaveErrorMessage] = useState<string | null>(null);
  const [coordStatus, setCoordStatus] = useState<"idle" | "updated" | "error">("idle");
  const [coordErrorMessage, setCoordErrorMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  function handleStartEdit(d: Dest) {
    const initial: Dest = {
      id: d.id,
      title: d.title || "",
      slug: d.slug || "",
      country: d.country || "",
      region: d.region ?? "",
      description: d.description ?? "",
      featured_image: d.featured_image ?? "",
      published: d.published !== false,
      latitude: d.latitude != null ? Number(d.latitude) : null,
      longitude: d.longitude != null ? Number(d.longitude) : null,
    };
    setEditingOriginal(initial);
    setEditingForm(initial);
    setSaveStatus("idle");
    setSaveErrorMessage(null);
    setCoordStatus("idle");
    setCoordErrorMessage(null);
  }

  function handleCloseModal() {
    setEditingOriginal(null);
    setEditingForm(null);
    setSaveStatus("idle");
    setSaveErrorMessage(null);
    setCoordStatus("idle");
    setCoordErrorMessage(null);
  }

  function updateField<K extends keyof Dest>(key: K, value: Dest[K]) {
    setEditingForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    if (saveStatus !== "idle") {
      setSaveStatus("idle");
      setSaveErrorMessage(null);
    }
  }

  // Dirty state: true when current form values differ from the original/saved state
  const isDirty = useMemo(() => {
    if (!editingForm || !editingOriginal) return false;
    if (!editingOriginal.id) {
      return Boolean(
        editingForm.title.trim() ||
          editingForm.country.trim() ||
          editingForm.latitude != null ||
          editingForm.longitude != null ||
          editingForm.description?.trim() ||
          editingForm.featured_image?.trim(),
      );
    }
    return (
      editingForm.title !== editingOriginal.title ||
      (editingForm.slug || "") !== (editingOriginal.slug || "") ||
      editingForm.country !== editingOriginal.country ||
      (editingForm.region || "") !== (editingOriginal.region || "") ||
      (editingForm.description || "") !== (editingOriginal.description || "") ||
      (editingForm.featured_image || "") !== (editingOriginal.featured_image || "") ||
      editingForm.published !== editingOriginal.published ||
      editingForm.latitude !== editingOriginal.latitude ||
      editingForm.longitude !== editingOriginal.longitude
    );
  }, [editingForm, editingOriginal]);

  const save = useMutation({
    mutationFn: async (payload: Dest) => {
      const cleanLat =
        payload.latitude !== undefined && payload.latitude !== null && !isNaN(Number(payload.latitude))
          ? Number(payload.latitude)
          : null;
      const cleanLng =
        payload.longitude !== undefined && payload.longitude !== null && !isNaN(Number(payload.longitude))
          ? Number(payload.longitude)
          : null;

      const dataToSave = {
        ...payload,
        latitude: cleanLat,
        longitude: cleanLng,
      };

      return await saveFn({ data: dataToSave as never });
    },
    onSuccess: (res: any) => {
      qc.invalidateQueries({ queryKey: ["admin-destinations"] });
      qc.invalidateQueries({ queryKey: ["destinations"] });

      const savedRow = res?.destination || editingForm;
      const updated: Dest = {
        id: savedRow.id,
        title: savedRow.title,
        slug: savedRow.slug,
        country: savedRow.country,
        region: savedRow.region ?? null,
        description: savedRow.description ?? null,
        featured_image: savedRow.featured_image ?? null,
        published: savedRow.published !== false,
        latitude: savedRow.latitude != null ? Number(savedRow.latitude) : null,
        longitude: savedRow.longitude != null ? Number(savedRow.longitude) : null,
      };

      setEditingOriginal(updated);
      setEditingForm(updated);
      setSaveStatus("saved");
      setSaveErrorMessage(null);
      toast.success("Destination saved successfully!");
    },
    onError: (e: Error) => {
      setSaveStatus("error");
      setSaveErrorMessage(e.message || "Database update failed");
      toast.error(e.message || "Failed to save destination");
    },
  });

  const updateCoordsMutation = useMutation({
    mutationFn: async ({ id, latitude, longitude }: { id: string; latitude: number; longitude: number }) => {
      return await updateCoordsFn({ data: { id, latitude, longitude } });
    },
    onSuccess: (res: any) => {
      qc.invalidateQueries({ queryKey: ["admin-destinations"] });
      qc.invalidateQueries({ queryKey: ["destinations"] });
      const savedRow = res?.destination;
      if (savedRow) {
        setEditingOriginal((prev) =>
          prev
            ? {
                ...prev,
                latitude: Number(savedRow.latitude),
                longitude: Number(savedRow.longitude),
              }
            : prev,
        );
        setEditingForm((prev) =>
          prev
            ? {
                ...prev,
                latitude: Number(savedRow.latitude),
                longitude: Number(savedRow.longitude),
              }
            : prev,
        );
      }
      setCoordStatus("updated");
      setCoordErrorMessage(null);
      toast.success("Coordinates updated successfully!");
    },
    onError: (e: Error) => {
      setCoordStatus("error");
      setCoordErrorMessage(e.message || "Failed to update coordinates");
      toast.error(e.message || "Failed to update coordinates");
    },
  });

  function handleUpdateCoordinates() {
    if (!editingForm) return;
    if (!editingForm.id) {
      toast.info("Please save the destination first to create the record before updating coordinates.");
      return;
    }
    const lat = editingForm.latitude;
    const lng = editingForm.longitude;
    if (lat === null || lat === undefined || isNaN(Number(lat)) || Number(lat) < -90 || Number(lat) > 90) {
      toast.error("Please enter a valid Latitude between -90 and 90");
      return;
    }
    if (lng === null || lng === undefined || isNaN(Number(lng)) || Number(lng) < -180 || Number(lng) > 180) {
      toast.error("Please enter a valid Longitude between -180 and 180");
      return;
    }
    updateCoordsMutation.mutate({
      id: editingForm.id,
      latitude: Number(lat),
      longitude: Number(lng),
    });
  }

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-destinations"] });
      qc.invalidateQueries({ queryKey: ["destinations"] });
      toast.success("Destination deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function upload(file: File) {
    try {
      setUploading(true);
      const buf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const { url } = await uploadFn({
        data: { filename: file.name, contentType: file.type, base64 },
      });
      updateField("featured_image", url);
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar matching About Page Management */}
      <div className="sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-brand/10 text-brand">
            <Compass className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Destinations Management
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage travel regions, map coordinates, imagery, and linked stories
            </p>
          </div>
        </div>

        <button
          onClick={() => handleStartEdit({ title: "", country: "Pakistan", published: true })}
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 transition-all cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" /> New Destination
        </button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="h-7 w-7 animate-spin text-accent" />
            <p className="text-sm">Loading destinations...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(data ?? []).map((d: any) => (
            <div
              key={d.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-accent/40 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full bg-muted overflow-hidden">
                  {d.featured_image ? (
                    <img
                      src={resolveMediaUrl(d.featured_image)}
                      alt={d.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
                      No featured image
                    </div>
                  )}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-xs px-2.5 py-0.5 text-[11px] font-semibold text-foreground shadow-xs">
                      <FileText className="h-3 w-3 text-accent" />
                      {d.posts_count ?? 0} {d.posts_count === 1 ? "Story" : "Stories"}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-xs font-medium text-accent flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {d.country}
                      {d.region ? ` · ${d.region}` : ""}
                    </p>
                    {d.slug && (
                      <Link
                        to="/destinations/$slug"
                        params={{ slug: d.slug }}
                        target="_blank"
                        title="View public destination page"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>

                  <h3 className="font-display text-base font-bold text-foreground">{d.title}</h3>

                  {/* Manual Coordinates Badge */}
                  {d.latitude != null && d.longitude != null ? (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-lg px-2.5 py-1 w-fit border border-border/50">
                      <Navigation className="h-3 w-3 text-accent shrink-0" />
                      <span className="font-mono text-[11px]">
                        {Number(d.latitude).toFixed(4)}, {Number(d.longitude).toFixed(4)}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-600/90 bg-amber-500/10 rounded-lg px-2 py-0.5 w-fit">
                      <span>Coordinates not set</span>
                    </div>
                  )}

                  {d.description && (
                    <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                      {d.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex items-center gap-2 border-t border-border/60 pt-3.5">
                  <button
                    onClick={() => handleStartEdit(d as Dest)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    <Pencil className="h-3 w-3 text-accent" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      if (d.posts_count > 0) {
                        toast.error(
                          `Cannot delete "${d.title}" because ${d.posts_count} story(ies) are assigned to it.`,
                        );
                        return;
                      }
                      if (confirm(`Delete destination "${d.title}"?`)) del.mutate(d.id);
                    }}
                    className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Destination Edit/Create Modal */}
      {editingForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-2xl border border-border bg-background shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0 bg-background">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand/10 text-brand">
                  <Compass className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">
                    {editingForm.id ? "Edit Destination" : "New Destination"}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {editingForm.id
                      ? `Managing "${editingForm.title}" region details, coordinates, and status`
                      : "Add a new travel destination with map location"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Unsaved Changes Banner */}
            {isDirty && (
              <div className="flex items-center justify-between border-b border-brand/20 bg-brand/10 px-6 py-2 text-xs text-brand animate-fade-in shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  <span className="font-medium">
                    You have unsaved changes. Click &quot;Save Changes&quot; below to update the database.
                  </span>
                </div>
              </div>
            )}

            {/* Scrollable Form Body */}
            <form
              id="destination-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!isDirty || save.isPending) return;
                save.mutate(editingForm);
              }}
              className="flex-1 overflow-y-auto p-6 space-y-5"
            >
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Destination Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingForm.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="e.g. K2 Base Camp, Concordia"
                  required
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingForm.country}
                    onChange={(e) => updateField("country", e.target.value)}
                    placeholder="e.g. Pakistan"
                    required
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Region / Province (optional)
                  </label>
                  <input
                    type="text"
                    value={editingForm.region ?? ""}
                    onChange={(e) => updateField("region", e.target.value)}
                    placeholder="e.g. Gilgit-Baltistan"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Manual Coordinates Box */}
              <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-brand/10 text-brand">
                    <Navigation className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                      Map Coordinates (Manual Latitude & Longitude)
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      Exact geographic coordinates stored directly in the database. For &quot;K2 Base Camp, Concordia&quot;, these represent the Concordia campsite.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      min={-90}
                      max={90}
                      value={editingForm.latitude != null ? editingForm.latitude : ""}
                      onChange={(e) => {
                        const val = e.target.value.trim();
                        updateField("latitude", val === "" ? null : parseFloat(val));
                        setCoordStatus("idle");
                      }}
                      placeholder="e.g. 35.7444"
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      min={-180}
                      max={180}
                      value={editingForm.longitude != null ? editingForm.longitude : ""}
                      onChange={(e) => {
                        const val = e.target.value.trim();
                        updateField("longitude", val === "" ? null : parseFloat(val));
                        setCoordStatus("idle");
                      }}
                      placeholder="e.g. 76.5250"
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none font-mono transition-colors"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      disabled={updateCoordsMutation.isPending || editingForm.latitude == null || editingForm.longitude == null}
                      onClick={handleUpdateCoordinates}
                      className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updateCoordsMutation.isPending ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Updating Coordinates...</span>
                        </>
                      ) : (
                        <>
                          <Navigation className="h-3.5 w-3.5" />
                          <span>Update Coordinates</span>
                        </>
                      )}
                    </button>

                    {coordStatus === "updated" && (
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-xs font-semibold text-emerald-600 animate-fade-in shadow-2xs">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Coordinates updated</span>
                      </div>
                    )}

                    {coordStatus === "error" && (
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/25 px-3 py-1 text-xs font-semibold text-red-600 animate-fade-in shadow-2xs">
                        <XCircle className="h-3.5 w-3.5" />
                        <span>{coordErrorMessage || "Failed to update coordinates"}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Slug (optional - auto-generated from title if empty)
                </label>
                <input
                  type="text"
                  value={editingForm.slug ?? ""}
                  onChange={(e) => updateField("slug", e.target.value)}
                  placeholder="e.g. k2-base-camp-concordia"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingForm.description ?? ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Brief overview, terrain notes, and highlights of this destination..."
                  className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:border-accent focus:outline-none leading-relaxed resize-y transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Featured Image
                </label>
                {editingForm.featured_image && (
                  <div className="relative mb-2.5 aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
                    <img
                      src={editingForm.featured_image}
                      alt={editingForm.title || "Preview"}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => updateField("featured_image", "")}
                      className="absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white hover:bg-black transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors w-full sm:w-auto shrink-0">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
                      className="hidden"
                    />
                    {uploading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5 text-accent" /> Upload Image
                      </>
                    )}
                  </label>
                  <input
                    value={editingForm.featured_image ?? ""}
                    onChange={(e) => updateField("featured_image", e.target.value)}
                    placeholder="or paste image URL"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="inline-flex items-center gap-2.5 cursor-pointer text-sm font-medium text-foreground">
                  <input
                    type="checkbox"
                    checked={editingForm.published !== false}
                    onChange={(e) => updateField("published", e.target.checked)}
                    className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <span>Published on public site and interactive map</span>
                </label>
              </div>
            </form>

            {/* Modal Footer with Save Status and Controls */}
            <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-3.5 shrink-0 bg-card/95 backdrop-blur-md shadow-xs">
              {/* Dynamic Status Indicator */}
              <div className="flex items-center gap-2">
                {saveStatus === "saved" && (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-xs font-semibold text-emerald-600 animate-fade-in shadow-2xs">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Saved to database</span>
                  </div>
                )}
                {saveStatus === "error" && (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/25 px-3 py-1 text-xs font-semibold text-red-600 animate-fade-in shadow-2xs">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>{saveErrorMessage || "Save failed"}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2.5 ml-auto">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-xl border border-border bg-card px-4 py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="destination-form"
                  disabled={!isDirty || save.isPending || uploading}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                    !isDirty || save.isPending || uploading
                      ? "opacity-50 cursor-not-allowed bg-brand/70 text-white"
                      : "bg-brand text-white shadow-md shadow-brand/20 hover:bg-brand/90 cursor-pointer"
                  }`}
                >
                  {save.isPending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>{editingForm.id ? "Save Changes" : "Create Destination"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
