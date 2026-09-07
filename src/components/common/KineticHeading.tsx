import { ElementType, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface KineticHeadingProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export function KineticHeading({
  as: Tag = "h2",
  children,
  className = "",
  delay = 0,
  threshold = 0.2,
}: KineticHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || typeof children !== "string") {
    return <Tag className={className}>{children}</Tag>;
  }

  // Split into words for staggered kinetic flow
  const words = children.split(" ");

  return (
    <Tag className={`kinetic-mask ${className}`} aria-label={children}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap gap-x-[0.28em] gap-y-0">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden py-0.5">
            <motion.span
              initial={{ y: "115%", opacity: 0.1 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, amount: threshold }}
              transition={{
                duration: 0.75,
                delay: delay + i * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block will-change-transform"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
