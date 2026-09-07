import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxMediaProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  speed?: number; // Normalized speed, e.g., 0.15
  aspectRatio?: string;
  loading?: "lazy" | "eager";
}

export function ParallaxMedia({
  src,
  alt,
  className = "",
  imgClassName = "",
  speed = 0.12,
  aspectRatio = "aspect-[16/10]",
  loading = "lazy",
}: ParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate subtle vertical travel (e.g., -6% to +6% of container height)
  const percentRange = speed * 50;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${percentRange}%`, `${percentRange}%`]
  );

  return (
    <div
      ref={containerRef}
      className={`parallax-container ${aspectRatio} w-full overflow-hidden bg-muted ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        style={{ y: shouldReduceMotion ? 0 : y, scale: shouldReduceMotion ? 1 : 1.14 }}
        className={`h-full w-full object-cover transition-transform duration-700 will-change-transform ${imgClassName}`}
      />
    </div>
  );
}
