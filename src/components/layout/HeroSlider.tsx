import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs, index]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={index}
          src={slides[index].src}
          alt={slides[index].alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="group absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/30 p-2.5 text-white backdrop-blur transition hover:bg-black/50 sm:left-6 sm:p-3"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="group absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/30 p-2.5 text-white backdrop-blur transition hover:bg-black/50 sm:right-6 sm:p-3"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
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
        </>
      )}
    </div>
  );
}
