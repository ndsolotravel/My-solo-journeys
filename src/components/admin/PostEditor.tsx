import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { Upload, Loader2, Save, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { MarkdownEditor } from "./MarkdownEditor";
import { DraggableDialog } from "./DraggableDialog";
import { adminUpsertPost, adminUploadImage } from "@/lib/admin.functions";
import { CATEGORIES } from "@/lib/site";

type Post = {
  id?: string;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  content?: string | null;
  cover_image?: string | null;
  category?: string | null;
  tags?: string[] | null;
  featured?: boolean | null;
  published?: boolean | null;
  scheduled_at?: string | null;
};

export function PostEditor({ initial, asDialog = !initial }: { initial?: Post | null; asDialog?: boolean }) {
  const navigate = useNavigate();
  const upsertFn = useServerFn(adminUpsertPost);
  const uploadFn = useServerFn(adminUploadImage);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [cover, setCover] = useState(initial?.cover_image ?? "");
  const [category, setCategory] = useState(initial?.category ?? CATEGORIES[0]);
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [featured, setFeatured] = useState(!!initial?.featured);
  const [published, setPublished] = useState(!!initial?.published);
  const [scheduledAt, setScheduledAt] = useState<string>(
    initial?.scheduled_at ? toLocalInput(initial.scheduled_at) : "",
  );
  const [uploading, setUploading] = useState<"cover" | "inline" | null>(null);
  const coverInput = useRef<HTMLInputElement>(null);
  const inlineInput = useRef<HTMLInputElement>(null);
  const formId = "post-editor-form";

  const save = useMutation({
    mutationFn: (payload: Record<string, unknown>) => upsertFn({ data: payload as never }),
    onSuccess: (row) => {
      toast.success(initial?.id ? "Post updated" : "Post created");
      if (!initial?.id && row && typeof row === "object" && "id" in row) {
        navigate({ to: "/admin/posts/$id", params: { id: (row as { id: string }).id } });
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function uploadFile(file: File, kind: "cover" | "inline") {
    setUploading(kind);
    try {
      const buf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const { url } = await uploadFn({ data: { filename: file.name, contentType: file.type, base64 } });
      if (kind === "cover") setCover(url);
      else setContent((c) => `${c}\n\n![](${url})\n`);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(null);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title is required");
    save.mutate({
      id: initial?.id,
      title,
      slug: slug || undefined,
      excerpt,
      content,
      cover_image: cover || null,
      category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      featured,
      published,
      scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null,
    });
  }

  function close() {
    navigate({ to: "/admin/posts" });
  }

  const body = (
    <form id={formId} onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <Field label="Title">
          <input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={200} className={input} placeholder="Story title…" />
        </Field>
        <Field label="Slug" hint="Auto-generated from title if blank">
          <input value={slug} onChange={(e) => setSlug(e.target.value)} maxLength={200} placeholder="my-story" className={input} />
        </Field>
        <Field label="Excerpt" hint="Shown in cards and meta description">
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} maxLength={500} className={input + " resize-y"} />
        </Field>
        <Field label="Content">
          <MarkdownEditor value={content} onChange={setContent} onInsertImage={() => inlineInput.current?.click()} />
          <input ref={inlineInput} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "inline")} />
          {uploading === "inline" && <p className="text-xs text-muted-foreground"><Loader2 className="inline h-3 w-3 animate-spin" /> Uploading…</p>}
        </Field>
      </div>

      <aside className="space-y-4">
        <div className="rounded-2xl border border-border p-4 space-y-3">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Publish</p>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={published} onChange={(e) => { setPublished(e.target.checked); if (e.target.checked) setScheduledAt(""); }} />
            Published
          </label>
          <Field label="Schedule" hint="Auto-publish at this time">
            <input type="datetime-local" disabled={published} value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} className={input + " disabled:opacity-50"} />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            Featured on homepage
          </label>
        </div>

        <div className="rounded-2xl border border-border p-4 space-y-3">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Cover image</p>
          <div className="min-h-[140px]">
            {cover ? (
              <div className="relative">
                <img src={cover} alt="Cover" className="max-h-48 w-full rounded-lg object-cover" />
                <button type="button" onClick={() => setCover("")} className="mt-2 text-xs text-muted-foreground transition hover:text-red-500">Remove</button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => coverInput.current?.click()}
                className="group flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background p-6 text-sm text-muted-foreground shadow-sm transition-[background-color,box-shadow,color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent/5 hover:text-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {uploading === "cover" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" />}
                <span>Browse to upload cover</span>
              </button>
            )}
          </div>
          <input ref={coverInput} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "cover")} />
          <input value={cover} onChange={(e) => setCover(e.target.value)} placeholder="…or paste image URL" className={input} />
        </div>

        <div className="rounded-2xl border border-border p-4 space-y-3">
          <Field label="Category">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={input}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Tags" hint="Comma-separated">
            <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="trekking, karakoram" className={input} />
          </Field>
        </div>
      </aside>
    </form>
  );

  const footerActions = (
    <>
      {initial?.slug && (
        <a href={`/blog/${initial.slug}`} target="_blank" rel="noreferrer" className="mr-auto inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs transition hover:border-accent">
          <ExternalLink className="h-3 w-3" /> View live
        </a>
      )}
      <label className="mr-2 hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
        Publish
      </label>
      <button
        type="button"
        onClick={close}
        className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm transition hover:bg-muted"
      >
        Cancel
      </button>
      <button
        type="submit"
        form={formId}
        disabled={save.isPending}
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background shadow-sm transition hover:shadow-md disabled:opacity-50"
      >
        {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save Post
      </button>
    </>
  );

  if (asDialog) {
    return (
      <DraggableDialog open onClose={close} title={initial?.id ? "Edit post" : "New post"} footer={footerActions}>
        {body}
      </DraggableDialog>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold">{initial?.id ? "Edit post" : "New post"}</h1>
        <div className="flex items-center gap-2">{footerActions}</div>
      </div>
      {body}
    </div>
  );
}

const input = "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function toLocalInput(iso: string) {
  const d = new Date(iso);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60_000);
  return local.toISOString().slice(0, 16);
}

