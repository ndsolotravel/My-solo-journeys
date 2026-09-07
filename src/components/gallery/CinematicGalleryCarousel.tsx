"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Camera,
  Maximize2,
  ExternalLink,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ArchivePhoto } from "@/lib/photo-archive.functions";
import { useTranslations } from "@/lib/translate/store";

interface CinematicGalleryCarouselProps {
  photos: ArchivePhoto[];
  currentIndex: number;
  onChangeIndex: (index: number) => void;
  onOpenLightbox: (index: number) => void;
}

export function CinematicGalleryCarousel({
  photos,
  currentIndex,
  onChangeIndex,
  onOpenLightbox,
}: CinematicGalleryCarouselProps) {
  const t = useTranslations();
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);

  const total = photos.length;
  const activePhoto = photos[currentIndex];

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    onChangeIndex((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onChangeIndex]);

  const goToNext = useCallback(() => {
    if (total <= 1) return;
    onChangeIndex((currentIndex + 1) % total);
  }, [currentIndex, total, onChangeIndex]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      setTouchDeltaX(e.touches[0].clientX - touchStartX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null) {
      if (touchDeltaX < -40) {
        goToNext();
      } else if (touchDeltaX > 40) {
        goToPrev();
      }
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

  // Compute 3D circular layout state for all slides
  const slideStates = useMemo(() => {
    if (total === 0) return [];
    return photos.map((photo, index) => {
      const rawDiff = index - currentIndex;
      let diff = rawDiff;
      if (total > 2) {
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
      }

      return {
        photo,
        index,
        diff,
        isCenter: diff === 0,
        isLeft: diff === -1,
        isRight: diff === 1,
        isVisible: Math.abs(diff) <= 1,
      };
    });
  }, [photos, currentIndex, total]);

  if (total === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-[1720px] mx-auto select-none px-2 sm:px-4 lg:px-8">
      {/* 3. & 4. Cinematic Depth Carousel Stage */}
      <div
        className="relative w-full overflow-hidden flex items-center justify-center py-4 sm:py-6 h-[440px] sm:h-[520px] md:h-[600px] lg:h-[660px] xl:h-[720px] 2xl:h-[760px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slideStates.map(({ photo, index, diff, isCenter, isLeft, isRight, isVisible }) => {
          let offsetPercent = 0;
          let scale = 1;
          let opacity = 1;
          let brightness = 1;
          let zIndex = 30;
          let pointerEvents: "auto" | "none" = "auto";

          if (isCenter) {
            offsetPercent = 0;
            scale = 1;
            opacity = 1;
            brightness = 1;
            zIndex = 30;
          } else if (isLeft) {
            offsetPercent = -70;
            scale = 0.86;
            opacity = 0.55;
            brightness = 0.72;
            zIndex = 20;
          } else if (isRight) {
            offsetPercent = 70;
            scale = 0.86;
            opacity = 0.55;
            brightness = 0.72;
            zIndex = 20;
          } else {
            offsetPercent = diff > 0 ? 140 : -140;
            scale = 0.7;
            opacity = 0;
            brightness = 0.5;
            zIndex = 10;
            pointerEvents = "none";
          }

          return (
            <div
              key={photo.id || index}
              onClick={() => {
                if (isCenter) {
                  onOpenLightbox(index);
                } else if (isVisible) {
                  onChangeIndex(index);
                }
              }}
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${offsetPercent}%), -50%) scale(${scale})`,
                opacity,
                filter: `brightness(${brightness})`,
                zIndex,
                pointerEvents,
              }}
              className={`absolute transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group ${
                isCenter ? "cursor-zoom-in" : "cursor-pointer hover:opacity-85 hover:filter hover:brightness-90"
              }
              /* Responsive card dimensions */
              w-[84vw] max-w-[360px] h-[390px]
              sm:w-[72vw] sm:max-w-[520px] sm:h-[460px]
              md:w-[64vw] md:max-w-[700px] md:h-[530px]
              lg:w-[58vw] lg:max-w-[860px] lg:h-[600px]
              xl:w-[52vw] xl:max-w-[1020px] xl:h-[660px]
              2xl:w-[48vw] 2xl:max-w-[1140px] 2xl:h-[720px]
              `}
              aria-label={
                isCenter
                  ? `Featured image: ${photo.title}`
                  : `Select photograph: ${photo.title}`
              }
            >
              {/* Photo Frame */}
              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 border border-border/50 shadow-2xl transition-all duration-300 group-hover:border-border/80">
                <img
                  src={photo.image_url}
                  alt={photo.alt_text || photo.title}
                  loading={isCenter ? "eager" : "lazy"}
                  draggable={false}
                  className="w-full h-full object-cover object-center select-none pointer-events-none transition-transform duration-700 group-hover:scale-[1.015]"
                />

                {/* Subtle cinematic gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />

                {/* Category Badge on center card */}
                {isCenter && photo.categories.length > 0 && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 text-white/95 backdrop-blur-md border border-white/20 text-[11px] font-semibold tracking-wider uppercase shadow-md">
                      {t(photo.categories[0].name)}
                    </span>
                  </div>
                )}

                {/* Expand Fullscreen Button on center card */}
                {isCenter && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(index);
                    }}
                    className="absolute top-4 right-4 z-10 p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                    title={t("View fullscreen high-res")}
                    aria-label={t("View fullscreen high-res")}
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                )}

                {/* Location overlay tag on card bottom */}
                {photo.location && (
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white/90">
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium drop-shadow-md truncate max-w-[85%]">
                      <MapPin className="h-3.5 w-3.5 text-brand shrink-0" />
                      <span className="truncate">{t(photo.location)}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 8. Circular Navigation Buttons Below Carousel */}
      <div className="mt-4 sm:mt-6 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Circular Previous Button */}
          <button
            type="button"
            onClick={goToPrev}
            disabled={total <= 1}
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-border/80 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer group active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-brand disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={t("Previous photograph")}
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Slide Indicator & Dots */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-border/60 bg-card/90 backdrop-blur-sm shadow-xs">
            <span className="font-mono text-foreground font-bold text-sm sm:text-base tracking-wider">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-muted-foreground/40 font-mono">/</span>
            <span className="font-mono text-muted-foreground font-medium text-xs sm:text-sm">
              {String(total).padStart(2, "0")}
            </span>

            {/* Micro navigation dots */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2 border-l border-border/60 pl-3">
              {photos.slice(0, 10).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => onChangeIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    dotIdx === currentIndex
                      ? "w-5 bg-brand"
                      : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                />
              ))}
              {total > 10 && (
                <span className="text-[10px] text-muted-foreground font-mono ml-0.5">
                  +{total - 10}
                </span>
              )}
            </div>
          </div>

          {/* Circular Next Button */}
          <button
            type="button"
            onClick={goToNext}
            disabled={total <= 1}
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-border/80 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer group active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-brand disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={t("Next photograph")}
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Navigation keyboard hint */}
        <p className="text-[11px] text-muted-foreground/60 font-medium tracking-wide">
          {t("Use Left / Right arrow keys or swipe to navigate")}
        </p>
      </div>

      {/* 12. Featured Photo Description and Location (CMS Data) */}
      {activePhoto && (
        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto px-4 text-center transition-all duration-500 animate-fade-in">
          {/* Location Badge */}
          {activePhoto.location && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold tracking-wide mb-3">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{t(activePhoto.location)}</span>
            </div>
          )}

          {/* Main Title / Description from CMS */}
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-snug tracking-tight">
            {t(activePhoto.title)}
          </h2>

          {/* Narrative Story from CMS if available */}
          {activePhoto.story && (
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
              {t(activePhoto.story)}
            </p>
          )}

          {/* Metadata Row: Date, Camera, Category, Full Story Link */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-muted-foreground">
            {activePhoto.captured_at && (
              <span className="inline-flex items-center gap-1.5 bg-muted/60 px-2.5 py-1 rounded-md border border-border/40">
                <Calendar className="h-3.5 w-3.5 text-accent" />
                <span>{activePhoto.captured_at}</span>
              </span>
            )}

            {activePhoto.camera && (
              <span className="inline-flex items-center gap-1.5 bg-muted/60 px-2.5 py-1 rounded-md border border-border/40">
                <Camera className="h-3.5 w-3.5 text-accent" />
                <span>{activePhoto.camera}</span>
              </span>
            )}

            {activePhoto.categories.length > 0 && (
              <span className="inline-flex items-center gap-1.5 bg-muted/60 px-2.5 py-1 rounded-md border border-border/40">
                <span className="font-medium text-foreground">
                  {activePhoto.categories.map((c) => c.name).join(", ")}
                </span>
              </span>
            )}

            {activePhoto.slug && (
              <Link
                to="/gallery/$slug"
                params={{ slug: activePhoto.slug }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline transition-colors ml-1"
              >
                <span>{t("View full story")}</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
