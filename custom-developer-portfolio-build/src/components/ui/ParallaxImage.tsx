import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Container classes — must define the visible height. */
  className?: string;
  imgClassName?: string;
  /** Vertical drift as a percentage of image height. Keep ≤ 7 to stay subtle. */
  range?: number;
  priority?: boolean;
}

/**
 * Image that drifts gently as it passes through the viewport.
 * The image is intentionally taller than its frame so the drift never
 * exposes an edge. Parallax is skipped entirely for reduced-motion users.
 */
export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className,
  imgClassName,
  range = 6,
  priority = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={prefersReduced ? undefined : { y }}
        className={cn(
          'absolute left-0 -top-[9%] h-[118%] w-full object-cover object-top will-change-transform',
          imgClassName
        )}
      />
    </div>
  );
};
