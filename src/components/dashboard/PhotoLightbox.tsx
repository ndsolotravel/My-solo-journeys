import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/lib/gallery.functions";

export function PhotoLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const item = items[index];
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        onClick={onPrev}
        className="absolute left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <figure className="flex max-h-full max-w-5xl flex-col items-center">
        <img src={item.image_url} alt={item.caption ?? ""} className="max-h-[80vh] w-auto rounded-lg" />
        {(item.caption || item.category) && (
          <figcaption className="mt-3 text-center text-sm text-white/80">
            {item.caption}
            {item.category ? <span className="ml-2 text-white/50">· {item.category}</span> : null}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
