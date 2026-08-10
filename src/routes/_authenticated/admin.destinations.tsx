import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { toast } from "sonner";
import { adminListDestinations, adminUpsertDestination, adminDeleteDestination, adminUploadImage } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/destinations")({
  component: AdminDestinations,
});

type Dest = { id?: string; title: string; slug?: string; country: string; region?: string | null; description?: string | null; featured_image?: string | null; published?: boolean };

function AdminDestinations() {
  const listFn = useServerFn(adminListDestinations);
  const saveFn = useServerFn(adminUpsertDestination);
  const delFn = useServerFn(adminDeleteDestination);
  const uploadFn = useServerFn(adminUploadImage);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["admin-destinations"], queryFn: () => listFn() });
  const [editing, setEditing] = useState<Dest | null>(null);

  const save = useMutation({
    mutationFn: (d: Dest) => saveFn({ data: d as never }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-destinations"] }); setEditing(null); toast.success("Saved"); },
    onError: (e: Error) => toast.error(e.message),
  });
  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-destinations"] }); toast.success("Deleted"); },
    onError: (e: Error) => toast.error(e.message),
  });

  async function upload(file: File) {
    const buf = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
    const { url } = await uploadFn({ data: { filename: file.name, contentType: file.type, base64 } });
    setEditing((d) => d ? { ...d, featured_image: url } : d);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Destinations</h1>
        <button onClick={() => setEditing({ title: "", country: "", published: true })} className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-background">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(data ?? []).map((d) => (
          <div key={d.id} className="overflow-hidden rounded-2xl border border-border">
            {d.featured_image && <img src={d.featured_image} alt={d.title} className="aspect-video w-full object-cover" />}
            <div className="p-4">
              <p className="text-xs text-muted-foreground">{d.country}{d.region ? ` · ${d.region}` : ""}</p>
              <h3 className="mt-1 font-display font-semibold">{d.title}</h3>
              <div className="mt-3 flex items-center gap-2">
                <button onClick={() => setEditing(d as Dest)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent"><Pencil className="h-3 w-3" /> Edit</button>
                <button onClick={() => { if (confirm("Delete?")) del.mutate(d.id); }} className="ml-auto inline-flex items-center gap-1 text-xs text-red-500"><Trash2 className="h-3 w-3" /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 p-4" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="mx-auto mt-10 max-w-xl rounded-2xl bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{editing.id ? "Edit destination" : "New destination"}</h2>
              <button onClick={() => setEditing(null)}><X className="h-4 w-4" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); save.mutate(editing); }} className="mt-4 space-y-3">
              <Input label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} required />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Country" value={editing.country} onChange={(v) => setEditing({ ...editing, country: v })} required />
                <Input label="Region" value={editing.region ?? ""} onChange={(v) => setEditing({ ...editing, region: v })} />
              </div>
              <Input label="Slug (optional)" value={editing.slug ?? ""} onChange={(v) => setEditing({ ...editing, slug: v })} />
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Description</label>
                <textarea rows={4} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Featured image</label>
                {editing.featured_image && <img src={editing.featured_image} className="mt-2 aspect-video w-full rounded-lg object-cover" />}
                <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} className="mt-2 text-xs" />
                <input value={editing.featured_image ?? ""} onChange={(e) => setEditing({ ...editing, featured_image: e.target.value })} placeholder="or paste URL" className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.published !== false} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} /> Published
              </label>
              <button disabled={save.isPending} className="mt-2 w-full rounded-full bg-foreground py-2.5 text-sm text-background disabled:opacity-50">{save.isPending ? "Saving…" : "Save"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, required }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} required={required} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
    </div>
  );
}
