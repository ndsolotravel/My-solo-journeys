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

export function HeroSlider({ slides, intervalMs = 12000, className = "" }: Props) {
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
  const optimizedSrc = getOptimizedImageUrl(currentSlide.src, 1920);
  const srcSet = getImageSrcSet(currentSlide.src, [640, 1024, 1600, 1920, 2560]);

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
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            loading={isLcpSlide ? "eager" : "lazy"}
            fetchPriority={isLcpSlide ? "high" : "auto"}
            decoding={isLcpSlide ? "sync" : "async"}
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover animate-ken-burns-slow"
          />
        ) : (
          <div
            key={index}
            className="absolute inset-0 bg-zinc-950"
            aria-hidden
          />
        )}
      </AnimatePresence>
      
      {/* Multi-layer gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />

      {/* Navigation Arrows: Desktop and Tablet only, hidden on mobile */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Hero image"
            className="hidden md:inline-flex absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30 h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-black/50 hover:text-white hover:border-white/40 hover:scale-105 active:scale-95 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 cursor-pointer pointer-events-auto group"
          >
            <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Hero image"
            className="hidden md:inline-flex absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-black/50 hover:text-white hover:border-white/40 hover:scale-105 active:scale-95 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 cursor-pointer pointer-events-auto group"
          >
            <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </>
      )}

      {count > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-10 bg-white shadow-lg" : "w-3 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

