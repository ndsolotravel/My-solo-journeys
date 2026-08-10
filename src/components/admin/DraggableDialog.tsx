import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  width?: number;
};

export function DraggableDialog({ open, onClose, title, children, footer, width = 1100 }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  function onHeaderPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDesktop) return;
    const target = e.target as HTMLElement;
    if (target.closest("button, input, a, [data-no-drag]")) return;
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: pos?.x ?? rect.left,
      origY: pos?.y ?? rect.top,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onHeaderPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current || !dialogRef.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    const rect = dialogRef.current.getBoundingClientRect();
    const margin = 40;
    const maxX = window.innerWidth - margin;
    const maxY = window.innerHeight - margin;
    const minX = margin - rect.width;
    const minY = 0;
    setPos({
      x: Math.min(maxX, Math.max(minX, dragState.current.origX + dx)),
      y: Math.min(maxY, Math.max(minY, dragState.current.origY + dy)),
    });
  }

  function onHeaderPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    dragState.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  const positioned = isDesktop && pos;
  const style: React.CSSProperties = positioned
    ? { left: pos.x, top: pos.y, width, maxWidth: "calc(100vw - 32px)" }
    : isDesktop
      ? { width, maxWidth: "calc(100vw - 32px)" }
      : {};

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className={`relative flex max-h-[100dvh] w-full flex-col overflow-hidden border border-border bg-background shadow-2xl sm:max-h-[90vh] sm:rounded-2xl ${positioned ? "absolute" : ""}`}
        style={style}
      >
        <div
          onPointerDown={onHeaderPointerDown}
          onPointerMove={onHeaderPointerMove}
          onPointerUp={onHeaderPointerUp}
          onPointerCancel={onHeaderPointerUp}
          className={`flex items-center justify-between gap-3 border-b border-border bg-card/60 px-5 py-3 ${isDesktop ? "cursor-move select-none" : ""}`}
        >
          <div className="min-w-0 flex-1 truncate font-display text-lg font-semibold">{title}</div>
          <button
            type="button"
            onClick={onClose}
            data-no-drag
            aria-label="Close dialog"
            className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer && (
          <div className="sticky bottom-0 z-10 flex items-center justify-end gap-2 border-t border-border bg-background/95 px-5 py-3 backdrop-blur">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
