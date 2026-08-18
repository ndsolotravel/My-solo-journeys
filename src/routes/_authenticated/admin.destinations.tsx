import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2, Pencil, X, MapPin, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  adminListDestinations,
  adminUpsertDestination,
  adminDeleteDestination,
  adminUploadImage,
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
};

function AdminDestinations() {
  const listFn = useServerFn(adminListDestinations);
  const saveFn = useServerFn(adminUpsertDestination);
  const delFn = useServerFn(adminDeleteDestination);
  const uploadFn = useServerFn(adminUploadImage);
  const qc = useQueryClient();
  const { data } = useQuery<any>({
    queryKey: ["admin-destinations"],
    queryFn: async () => await listFn(),
  });
  const [editing, setEditing] = useState<Dest | null>(null);
  const [uploading, setUploading] = useState(false);

  const save = useMutation({
    mutationFn: (d: Dest) => saveFn({ data: d as never }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-destinations"] });
      setEditing(null);
      toast.success("Destination saved successfully");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-destinations"] });
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
      setEditing((d) => (d ? { ...d, featured_image: url } : d));
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Destinations</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage travel regions, countries, and destination guides
          </p>
        </div>
        <button
          onClick={() => setEditing({ title: "", country: "", published: true })}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition cursor-pointer shadow-sm"
        >
          <Plus className="h-4 w-4" /> New Destination
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(data ?? []).map((d: any) => (
          <div
            key={d.id}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-accent/40"
          >
            {d.featured_image ? (
              <img
                src={d.featured_image}
                alt={d.title}
                className="aspect-video w-full object-cover"
              />
            ) : (
              <div className="aspect-video w-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                No featured image
              </div>
            )}
            <div className="p-4">
              <p className="text-xs font-medium text-accent flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {d.country}
                {d.region ? ` · ${d.region}` : ""}
              </p>
              <h3 className="mt-1 font-display text-base font-semibold">{d.title}</h3>
              {d.description && (
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {d.description}
                </p>
              )}
              <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-3">
                <button
                  onClick={() => setEditing(d as Dest)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <Pencil className="h-3 w-3" /> Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${d.title}"?`)) del.mutate(d.id);
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

      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm"
          onClick={() => setEditing(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col w-full max-w-xl max-h-[92vh] sm:max-h-[88vh] rounded-2xl border border-border bg-background shadow-2xl overflow-hidden"
          >
            {/* Fixed Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6 shrink-0 bg-background">
              <div>
                <h2 className="font-display text-xl font-bold">
                  {editing.id ? "Edit Destination" : "New Destination"}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {editing.id
                    ? "Update region details, imagery, and status"
                    : "Add a new travel destination or region"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form
              id="destination-form"
              onSubmit={(e) => {
                e.preventDefault();
                save.mutate(editing);
              }}
              className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4"
            >
              <Input
                label="Destination Title"
                value={editing.title}
                onChange={(v) => setEditing({ ...editing, title: v })}
                placeholder="e.g. Phander Valley"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Country"
                  value={editing.country}
                  onChange={(v) => setEditing({ ...editing, country: v })}
                  placeholder="e.g. Pakistan"
                  required
                />
                <Input
                  label="Region / Province (optional)"
                  value={editing.region ?? ""}
                  onChange={(v) => setEditing({ ...editing, region: v })}
                  placeholder="e.g. Gilgit-Baltistan"
                />
              </div>

              <Input
                label="Slug (optional - auto-generated if blank)"
                value={editing.slug ?? ""}
                onChange={(v) => setEditing({ ...editing, slug: v })}
                placeholder="e.g. phander-valley"
              />

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  placeholder="Brief overview, terrain notes, and highlights of this destination..."
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-y"
                />
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Featured Image
                </label>
                {editing.featured_image && (
                  <div className="relative mt-2 aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
                    <img
                      src={editing.featured_image}
                      alt={editing.title || "Preview"}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setEditing({ ...editing, featured_image: "" })}
                      className="absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white hover:bg-black transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
                <div className="mt-2 flex flex-col sm:flex-row gap-2 items-center">
                  <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border bg-muted/40 px-3.5 py-2 text-xs font-medium hover:bg-muted transition-colors w-full sm:w-auto shrink-0">
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
                        <Upload className="h-3.5 w-3.5" /> Upload File
                      </>
                    )}
                  </label>
                  <input
                    value={editing.featured_image ?? ""}
                    onChange={(e) => setEditing({ ...editing, featured_image: e.target.value })}
                    placeholder="or paste image URL / Google Drive link"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="inline-flex items-center gap-2.5 cursor-pointer text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={editing.published !== false}
                    onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                    className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <span>Published on public site</span>
                </label>
              </div>
            </form>

            {/* Fixed Footer with Always-Reachable Save and Cancel */}
            <div className="flex items-center justify-end gap-2.5 border-t border-border px-5 py-3.5 sm:px-6 shrink-0 bg-muted/30">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-full border border-border bg-background px-4 py-2 text-xs sm:text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="destination-form"
                disabled={save.isPending || uploading}
                className="rounded-full bg-foreground px-5 py-2 text-xs sm:text-sm font-medium text-background hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shadow-sm"
              >
                {save.isPending ? "Saving…" : editing.id ? "Update Destination" : "Save Destination"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
      />
    </div>
  );
}

