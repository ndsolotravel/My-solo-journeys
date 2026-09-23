"use client";

import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Camera, Calendar, Download } from "lucide-react";

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  photos: Array<{
    id: string;
    image_url: string;
    title?: string | null;
    alt_text?: string | null;
    location?: string | null;
    captured_at?: string | null;
    camera?: string | null;
    categories: Array<{ name: string; slug: string }>;
  }>;
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onNavigate,
}: GalleryLightboxProps) {
  const photo = photos[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + photos.length) % photos.length);
      } else if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % photos.length);
      }
    },
    [isOpen, onClose, photos.length, currentIndex, onNavigate],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !photo) return null;

  const formatDate = (value: string | null | undefined): string | null => {
    if (!value) return null;
    const d = new Date(`${value}T00:00:00`);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const handleImageLoad = () => {
    // Image loaded successfully
  };

  const handleImageError = () => {
    // Handle broken image
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-6 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
    >
      <div
        className="relative max-h-[92vh] max-w-[95vw] w-full flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5 bg-black/60 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand/20 border border-brand/30 px-2.5 py-1 text-xs font-bold text-white">
              {currentIndex + 1} / {photos.length}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white/90 truncate max-w-md">
              {photo.title || "Untitled"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const link = document.createElement("a");
                link.href = photo.image_url;
                link.download = photo.title ?? "photograph.jpg";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              title="Download image"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Image Area */}
        <div className="relative flex-1 flex items-center justify-center bg-zinc-950 p-4 sm:p-6 min-h-[40vh] max-h-[72vh] overflow-hidden">
          {/* Previous Button */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((currentIndex - 1 + photos.length) % photos.length);
              }}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/80 hover:bg-black/90 hover:text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Image */}
          <img
            src={photo.image_url}
            alt={photo.alt_text || photo.title || `Photo ${currentIndex + 1}`}
            className="max-h-[68vh] max-w-full rounded-lg object-contain shadow-2xl mx-auto"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          {/* Next Button */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((currentIndex + 1) % photos.length);
              }}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/80 hover:bg-black/90 hover:text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Footer Metadata */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10 px-5 py-3 bg-black/60 text-xs text-white/70 shrink-0">
          <div className="flex flex-wrap items-center gap-2 truncate max-w-md">
            {photo.categories.length > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
                {photo.categories[0].name}
              </span>
            )}
            {photo.location && (
              <div className="flex items-center gap-1.5 text-white/80">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="hidden sm:inline line-clamp-1">{photo.location}</span>
              </div>
            )}
            {formatDate(photo.captured_at ?? null) && (
              <div className="flex items-center gap-1.5 text-white/70">
                <Calendar className="h-3 w-3 shrink-0" />
                <span>{formatDate(photo.captured_at)!}</span>
              </div>
            )}
            {photo.camera && (
              <div className="flex items-center gap-1.5 text-white/70">
                <Camera className="h-3 w-3 shrink-0" />
                <span>{photo.camera}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-[11px] text-white/60">
            <span>Use ← / → keys to navigate, Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
