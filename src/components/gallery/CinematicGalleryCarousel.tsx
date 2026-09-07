"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
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

  // Compute 5-stage layered circular layout state matching reference design
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
        isImmediateLeft: diff === -1,
        isImmediateRight: diff === 1,
        isFarLeft: diff === -2,
        isFarRight: diff === 2,
        isVisible: Math.abs(diff) <= 2,
      };
    });
  }, [photos, currentIndex, total]);

  if (total === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-[1720px] mx-auto select-none px-2 sm:px-4 lg:px-8">
      {/* 3. & 4. Cinematic Depth Carousel Stage (5-Card Layered Horizon) */}
      <div
        className="relative w-full overflow-hidden flex items-center justify-center py-6 sm:py-8 h-[460px] sm:h-[540px] md:h-[600px] lg:h-[650px] xl:h-[700px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slideStates.map(
          ({
            photo,
            index,
            diff,
            isCenter,
            isImmediateLeft,
            isImmediateRight,
            isFarLeft,
            isFarRight,
            isVisible,
          }) => {
            let offsetPercent = 0;
            let scale = 1;
            let opacity = 1;
            let brightness = 1;
            let zIndex = 30;
            let pointerEvents: "auto" | "none" = "auto";

            if (isCenter) {
              offsetPercent = 0;
              scale = 1.05;
              opacity = 1;
              brightness = 1;
              zIndex = 30;
            } else if (isImmediateLeft) {
              offsetPercent = -62;
              scale = 0.88;
              opacity = 0.8;
              brightness = 0.88;
              zIndex = 20;
            } else if (isImmediateRight) {
              offsetPercent = 62;
              scale = 0.88;
              opacity = 0.8;
              brightness = 0.88;
              zIndex = 20;
            } else if (isFarLeft) {
              offsetPercent = -118;
              scale = 0.76;
              opacity = 0.45;
              brightness = 0.72;
              zIndex = 10;
            } else if (isFarRight) {
              offsetPercent = 118;
              scale = 0.76;
              opacity = 0.45;
              brightness = 0.72;
              zIndex = 10;
            } else {
              offsetPercent = diff > 0 ? 160 : -160;
              scale = 0.65;
              opacity = 0;
              brightness = 0.5;
              zIndex = 5;
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
                  isCenter
                    ? "cursor-zoom-in"
                    : "cursor-pointer hover:opacity-95 hover:filter hover:brightness-95"
                }
                /* Elegant portrait aspect card dimensions matching reference screenshot */
                w-[74vw] max-w-[300px] h-[400px]
                sm:w-[46vw] sm:max-w-[360px] sm:h-[470px]
                md:w-[36vw] md:max-w-[400px] md:h-[530px]
                lg:w-[30vw] lg:max-w-[440px] lg:h-[580px]
                xl:w-[26vw] xl:max-w-[480px] xl:h-[630px]
                2xl:w-[24vw] 2xl:max-w-[510px] 2xl:h-[660px]
                `}
                aria-label={
                  isCenter
                    ? `Featured image: ${photo.title}`
                    : `Select photograph: ${photo.title}`
                }
              >
                {/* Photo Card with Rounded Corners and Layered Elevation */}
                <div
                  className={`relative w-full h-full rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden bg-zinc-950 border transition-all duration-300 ${
                    isCenter
                      ? "border-white/20 dark:border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
                      : "border-border/40 shadow-xl"
                  }`}
                >
                  <img
                    src={photo.image_url}
                    alt={photo.alt_text || photo.title}
                    loading={isCenter ? "eager" : "lazy"}
                    draggable={false}
                    className="w-full h-full object-cover object-center select-none pointer-events-none transition-transform duration-700 group-hover:scale-[1.02]"
                  />

                  {/* Subtle inner gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

                  {/* Category Pill on featured center card */}
                  {isCenter && photo.categories.length > 0 && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 text-white/95 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase shadow-md">
                        {t(photo.categories[0].name)}
                      </span>
                    </div>
                  )}

                  {/* Fullscreen icon button on center card */}
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
                </div>
              </div>
              );
            })}
      </div>

      {/* 8. Minimalist Circular Navigation Buttons (← and →) directly below carousel */}
      <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3">
        {/* Previous Circular Button */}
        <button
          type="button"
          onClick={goToPrev}
          disabled={total <= 1}
          className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-border/80 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground shadow-xs transition-all duration-200 flex items-center justify-center cursor-pointer group active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-brand disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label={t("Previous photograph")}
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Next Circular Button */}
        <button
          type="button"
          onClick={goToNext}
          disabled={total <= 1}
          className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-border/80 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground shadow-xs transition-all duration-200 flex items-center justify-center cursor-pointer group active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-brand disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label={t("Next photograph")}
        >
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* 12. Featured Photo Description, Location & Metadata beneath featured image */}
      {activePhoto && (
        <div className="mt-6 sm:mt-8 max-w-2xl mx-auto px-4 text-center transition-all duration-500 animate-fade-in">
          {/* Location Badge */}
          {activePhoto.location && (
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand tracking-wide mb-2">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{t(activePhoto.location)}</span>
            </div>
          )}

          {/* Main Title / Description from CMS */}
          <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-snug tracking-tight">
            {t(activePhoto.title)}
          </h2>

          {/* Narrative Story from CMS if available */}
          {activePhoto.story && (
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed italic max-w-lg mx-auto">
              {t(activePhoto.story)}
            </p>
          )}

          {/* Metadata Row: Date, Camera, Category, Full Story Link */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs text-muted-foreground">
            {activePhoto.captured_at && (
              <span className="inline-flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-md border border-border/40 text-[11px]">
                <Calendar className="h-3 w-3 text-accent" />
                <span>{activePhoto.captured_at}</span>
              </span>
            )}

            {activePhoto.camera && (
              <span className="inline-flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-md border border-border/40 text-[11px]">
                <Camera className="h-3 w-3 text-accent" />
                <span>{activePhoto.camera}</span>
              </span>
            )}

            {activePhoto.slug && (
              <Link
                to="/gallery/$slug"
                params={{ slug: activePhoto.slug }}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:underline transition-colors"
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
