import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  Eye,
  Edit3,
  Bold,
  Italic,
  Heading2,
  List,
  Link as LinkIcon,
  FileImage,
  ChevronDown,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { ImageCaptionDialog } from "./ImageCaptionDialog";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

type ImageEntry = {
  index: number;
  src: string;
  alt: string;
  caption: string;
  isFigure: boolean;
  raw: string;
};

function parseImages(content: string): ImageEntry[] {
  const entries: ImageEntry[] = [];

  const figureRegex =
    /<figure>\s*<img\s+[^>]*src="([^"]*)"[^>]*(?:alt="([^"]*)")?[^>]*\/?\s*>\s*(?:<figcaption>([^<]*)<\/figcaption>)?\s*<\/figure>/gi;
  let match: RegExpExecArray | null;
  while ((match = figureRegex.exec(content)) !== null) {
    entries.push({
      index: match.index,
      src: match[1] || "",
      alt: match[2] || "",
      caption: match[3] || "",
      isFigure: true,
      raw: match[0],
    });
  }

  const mdRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  while ((match = mdRegex.exec(content)) !== null) {
    const pos = match.index;
    const alreadyCaptured = entries.some(
      (e) => pos >= e.index && pos < e.index + e.raw.length,
    );
    if (!alreadyCaptured) {
      entries.push({
        index: pos,
        src: match[2] || "",
        alt: match[1] || "",
        caption: "",
        isFigure: false,
        raw: match[0],
      });
    }
  }

  entries.sort((a, b) => a.index - b.index);
  return entries;
}

export function MarkdownEditor({ value, onChange }: Props) {
  const [mode, setMode] = useState<"write" | "preview" | "split">("split");
  const [captionDialogOpen, setCaptionDialogOpen] = useState(false);
  const [captionsOpen, setCaptionsOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editCaption, setEditCaption] = useState("");

  const images = useMemo(() => parseImages(value), [value]);

  const wrap = (before: string, after = before) => {
    const ta = document.getElementById("md-textarea") as HTMLTextAreaElement | null;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.slice(start, end);
    const next =
      value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(next);
    setTimeout(() => {
      ta.focus();
      ta.selectionStart = start + before.length;
      ta.selectionEnd = end + before.length;
    }, 0);
  };

  function handleInsertImage(html: string) {
    const ta = document.getElementById("md-textarea") as HTMLTextAreaElement | null;
    if (ta) {
      const start = ta.selectionStart;
      const next = value.slice(0, start) + html + value.slice(start);
      onChange(next);
    } else {
      onChange(value + html);
    }
  }

  function handleUpdateCaption(imgIndex: number, newCaption: string) {
    const img = images[imgIndex];
    if (!img) return;

    let replacement: string;
    if (newCaption.trim()) {
      replacement = `<figure>\n<img src="${img.src}" alt="${img.alt}" />\n<figcaption>${newCaption}</figcaption>\n</figure>`;
    } else if (img.isFigure) {
      replacement = `![${img.alt}](${img.src})`;
    } else {
      return;
    }

    const before = value.slice(0, img.index);
    const after = value.slice(img.index + img.raw.length);
    onChange(before + replacement + after);
    setEditingIdx(null);
    setEditCaption("");
  }

  function handleRemoveCaption(imgIndex: number) {
    const img = images[imgIndex];
    if (!img || !img.isFigure) return;

    const replacement = `![${img.alt}](${img.src})`;
    const before = value.slice(0, img.index);
    const after = value.slice(img.index + img.raw.length);
    onChange(before + replacement + after);
  }

  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/40 px-2 py-1.5">
        <Tool onClick={() => wrap("**")} icon={<Bold className="h-4 w-4" />} label="Bold" />
        <Tool onClick={() => wrap("*")} icon={<Italic className="h-4 w-4" />} label="Italic" />
        <Tool
          onClick={() => wrap("\n## ", "")}
          icon={<Heading2 className="h-4 w-4" />}
          label="Heading"
        />
        <Tool onClick={() => wrap("\n- ", "")} icon={<List className="h-4 w-4" />} label="List" />
        <Tool
          onClick={() => wrap("[", "](https://)")}
          icon={<LinkIcon className="h-4 w-4" />}
          label="Link"
        />
        <Tool
          onClick={() => setCaptionDialogOpen(true)}
          icon={<FileImage className="h-4 w-4" />}
          label="Image with Caption"
        />
        <div className="ml-auto inline-flex rounded-lg border border-border bg-background p-0.5 text-xs">
          {(["write", "split", "preview"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-md px-2 py-1 capitalize transition cursor-pointer ${
                mode === m ? "bg-foreground text-background" : "text-muted-foreground"
              }`}
            >
              {m === "write" ? (
                <Edit3 className="h-3.5 w-3.5" />
              ) : m === "preview" ? (
                <Eye className="h-3.5 w-3.5" />
              ) : (
                "Split"
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Image Captions Panel */}
      {images.length > 0 && (
        <div className="border-b border-border">
          <button
            type="button"
            onClick={() => setCaptionsOpen(!captionsOpen)}
            className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted/40 transition cursor-pointer"
          >
            {captionsOpen ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
            <FileImage className="h-3.5 w-3.5 text-accent" />
            {images.length} {images.length === 1 ? "image" : "images"} — manage
            captions
          </button>
          {captionsOpen && (
            <div className="px-4 pb-3 space-y-2">
              {images.map((img, i) => (
                <div
                  key={`${img.src}-${i}`}
                  className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-3"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-14 w-14 shrink-0 rounded-lg object-cover border border-border"
                  />
                  <div className="min-w-0 flex-1">
                    {editingIdx === i ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editCaption}
                          onChange={(e) => setEditCaption(e.target.value)}
                          placeholder="Enter caption…"
                          className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter")
                              handleUpdateCaption(i, editCaption);
                            if (e.key === "Escape") {
                              setEditingIdx(null);
                              setEditCaption("");
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleUpdateCaption(i, editCaption)}
                          className="shrink-0 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background hover:opacity-90 cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingIdx(null);
                            setEditCaption("");
                          }}
                          className="shrink-0 rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground hover:bg-muted cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm text-foreground">
                          {img.caption || (
                            <span className="italic text-muted-foreground">
                              No caption
                            </span>
                          )}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingIdx(i);
                            setEditCaption(img.caption);
                          }}
                          className="shrink-0 text-xs text-accent hover:underline cursor-pointer"
                        >
                          {img.caption ? "Edit" : "Add caption"}
                        </button>
                        {img.isFigure && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCaption(i)}
                            className="shrink-0 text-xs text-red-500 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div
        className={`grid ${mode === "split" ? "md:grid-cols-2" : "grid-cols-1"}`}
      >
        {mode !== "preview" && (
          <textarea
            id="md-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your story in Markdown…"
            className="min-h-[480px] w-full resize-y border-0 bg-background p-4 font-mono text-sm outline-none"
          />
        )}
        {mode !== "write" && (
          <div className="min-h-[480px] max-h-[800px] overflow-y-auto border-l border-border p-4 prose-blog text-sm">
            {value.trim() ? (
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{value}</ReactMarkdown>
            ) : (
              <p className="text-muted-foreground">
                Preview will appear here…
              </p>
            )}
          </div>
        )}
      </div>

      <ImageCaptionDialog
        open={captionDialogOpen}
        onClose={() => setCaptionDialogOpen(false)}
        onInsert={handleInsertImage}
      />
    </div>
  );
}

function Tool({
  onClick,
  icon,
  label,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground"
    >
      {icon}
    </button>
  );
}