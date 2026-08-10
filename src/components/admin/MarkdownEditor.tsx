import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Eye, Edit3, Bold, Italic, Heading2, List, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onInsertImage?: () => void;
};

export function MarkdownEditor({ value, onChange, onInsertImage }: Props) {
  const [mode, setMode] = useState<"write" | "preview" | "split">("split");

  const wrap = (before: string, after = before) => {
    const ta = document.getElementById("md-textarea") as HTMLTextAreaElement | null;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.slice(start, end);
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(next);
    setTimeout(() => {
      ta.focus();
      ta.selectionStart = start + before.length;
      ta.selectionEnd = end + before.length;
    }, 0);
  };

  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/40 px-2 py-1.5">
        <Tool onClick={() => wrap("**")} icon={<Bold className="h-4 w-4" />} label="Bold" />
        <Tool onClick={() => wrap("*")} icon={<Italic className="h-4 w-4" />} label="Italic" />
        <Tool onClick={() => wrap("\n## ", "")} icon={<Heading2 className="h-4 w-4" />} label="Heading" />
        <Tool onClick={() => wrap("\n- ", "")} icon={<List className="h-4 w-4" />} label="List" />
        <Tool onClick={() => wrap("[", "](https://)")} icon={<LinkIcon className="h-4 w-4" />} label="Link" />
        {onInsertImage && (
          <Tool onClick={onInsertImage} icon={<ImageIcon className="h-4 w-4" />} label="Image" />
        )}
        <div className="ml-auto inline-flex rounded-lg border border-border bg-background p-0.5 text-xs">
          {(["write", "split", "preview"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-md px-2 py-1 capitalize transition ${
                mode === m ? "bg-foreground text-background" : "text-muted-foreground"
              }`}
            >
              {m === "write" ? <Edit3 className="h-3.5 w-3.5" /> : m === "preview" ? <Eye className="h-3.5 w-3.5" /> : "Split"}
            </button>
          ))}
        </div>
      </div>
      <div className={`grid ${mode === "split" ? "md:grid-cols-2" : "grid-cols-1"}`}>
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
            {value.trim() ? <ReactMarkdown>{value}</ReactMarkdown> : <p className="text-muted-foreground">Preview will appear here…</p>}
          </div>
        )}
      </div>
    </div>
  );
}

function Tool({ onClick, icon, label }: { onClick: () => void; icon: React.ReactNode; label: string }) {
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
