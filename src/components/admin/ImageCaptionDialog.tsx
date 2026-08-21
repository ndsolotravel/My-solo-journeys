import { useState, useRef, useEffect } from "react";
import { X, Upload, Loader2, FileImage } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { adminUploadImage } from "@/lib/admin.functions";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  onInsert: (html: string) => void;
};

function resolveImageUrl(urlOrPath: string | null | undefined): string {
  if (!urlOrPath || typeof urlOrPath !== "string") return "";
  const trimmed = urlOrPath.trim();
  if (!trimmed) return "";
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }
  let cleanPath = trimmed.replace(/^\/+/, "");
  if (cleanPath.startsWith("blog-media/")) {
    cleanPath = cleanPath.slice("blog-media/".length);
  }
  return `https://mqoybarqgzzvillignbr.supabase.co/storage/v1/object/public/blog-media/${cleanPath}`;
}

export function ImageCaptionDialog({ open, onClose, onInsert }: Props) {
  const uploadFn = useServerFn(adminUploadImage);
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setImageUrl("");
      setAltText("");
      setCaption("");
    }
  }, [open]);

  if (!open) return null;

  async function handleFileUpload(file: File) {
    setUploading(true);
    try {
      const buf = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      const { url } = await uploadFn({
        data: { filename: file.name, contentType: file.type, base64 },
      });
      setImageUrl(resolveImageUrl(url));
      if (!altText) setAltText(file.name.replace(/\.[^.]+$/, ""));
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  function buildHtml(): string {
    const src = imageUrl.trim();
    if (!src) return "";
    const alt = altText.trim();
    const cap = caption.trim();
    if (cap) {
      return `\n<figure>\n<img src="${src}" alt="${alt}" />\n<figcaption>${cap}</figcaption>\n</figure>\n`;
    }
    return `\n![${alt}](${src})\n`;
  }

  function handleInsert() {
    const html = buildHtml();
    if (!html) {
      toast.error("Please add an image URL");
      return;
    }
    onInsert(html);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden border border-border bg-background shadow-2xl sm:rounded-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border bg-card/60 px-5 py-3">
          <div className="flex items-center gap-2 font-display text-lg font-semibold">
            <FileImage className="h-5 w-5 text-accent" /> Insert Image
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {/* File upload */}
          <div>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInput.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Uploading…
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" /> Upload Image
                </>
              )}
            </button>
            <p className="mt-1 text-xs text-muted-foreground">or paste a URL below</p>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="cap-img-url" className="block text-xs font-semibold text-foreground mb-1.5">
              Image URL *
            </label>
            <input
              id="cap-img-url"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... or blog-media/..."
              className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            />
          </div>

          {/* Alt text */}
          <div>
            <label htmlFor="cap-alt" className="block text-xs font-semibold text-foreground mb-1.5">
              Alt Text
            </label>
            <input
              id="cap-alt"
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Describe the image"
              className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            />
          </div>

          {/* Caption */}
          <div>
            <label htmlFor="cap-caption" className="block text-xs font-semibold text-foreground mb-1.5">
              Photo Caption
            </label>
            <input
              id="cap-caption"
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Optional caption displayed below the image"
              className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Leave empty to insert without a caption
            </p>
          </div>

          {/* Preview */}
          {imageUrl && (
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                Preview
              </p>
              <figure className="m-0">
                <img
                  src={imageUrl}
                  alt={altText}
                  className="w-full max-h-48 object-cover rounded-lg"
                />
                {caption && (
                  <figcaption className="mt-2 text-center text-xs text-muted-foreground italic">
                    {caption}
                  </figcaption>
                )}
              </figure>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 z-10 flex items-center justify-end gap-2 border-t border-border bg-background/95 px-5 py-3 backdrop-blur">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleInsert}
            disabled={!imageUrl.trim()}
            className="rounded-full bg-foreground px-5 py-2 text-xs font-semibold text-background hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
}
