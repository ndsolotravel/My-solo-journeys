import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getOptimizedImageUrl, getImageSrcSet } from "@/lib/media";

export type HeroSlide = {
  src: string;
  alt: string;
};

type Props = {
  slides: HeroSlide[];
  intervalMs?: number;
  className?: string;
};

export function HeroSlider({ slides, intervalMs = 10000, className = "" }: Props) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  if (count === 0) {
    return <div className={`absolute inset-0 bg-zinc-950 ${className}`} aria-hidden />;
  }

  const prevSlide = useCallback(() => {
    if (count < 2) return;
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const nextSlide = useCallback(() => {
    if (count < 2) return;
    setIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs, index]);

  const currentSlide = slides[index];
  const isLcpSlide = index === 0;
  const optimizedSrc = getOptimizedImageUrl(currentSlide.src, 1600);
  const srcSet = getImageSrcSet(currentSlide.src, [640, 1024, 1600, 2048]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <AnimatePresence initial={false} mode="sync">
        {currentSlide.src ? (
          <motion.img
            key={index}
            src={optimizedSrc}
            srcSet={srcSet || undefined}
            sizes="100vw"
            alt={currentSlide.alt}
            initial={isLcpSlide ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            loading={isLcpSlide ? "eager" : "lazy"}
            fetchPriority={isLcpSlide ? "high" : "auto"}
            className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
          />
        ) : (
          <div
            key={index}
            className="absolute inset-0 bg-zinc-900"
            aria-hidden
          />
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />

      {/* Navigation Arrows: Desktop and Tablet only, hidden on mobile */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Hero image"
            className="hidden md:inline-flex absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 h-11 w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white/85 backdrop-blur-md transition-all duration-200 hover:bg-black/65 hover:text-white hover:border-white/50 hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 cursor-pointer pointer-events-auto group"
          >
            <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Hero image"
            className="hidden md:inline-flex absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 h-11 w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white/85 backdrop-blur-md transition-all duration-200 hover:bg-black/65 hover:text-white hover:border-white/50 hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 cursor-pointer pointer-events-auto group"
          >
            <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </>
      )}

      {count > 1 && (
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

