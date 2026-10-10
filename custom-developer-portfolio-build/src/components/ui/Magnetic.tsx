import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { cn } from '../../utils/cn';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** How strongly the element follows the cursor (0.1 = very subtle). */
  strength?: number;
  /** Hard cap on travel in px so the effect never feels gimmicky. */
  max?: number;
}

/**
 * Desktop-only magnetic hover. Disabled for coarse pointers (touch devices)
 * and for users who prefer reduced motion.
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className,
  strength = 0.22,
  max = 8,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setFinePointer(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const clamp = (value: number) => Math.max(-max, Math.min(max, value));

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!finePointer || prefersReduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      x.set(clamp(offsetX * strength));
      y.set(clamp(offsetY * strength));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [finePointer, prefersReduced, strength, max]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={finePointer && !prefersReduced ? { x: springX, y: springY } : undefined}
      className={cn('inline-flex', className)}
    >
      {children}
    </motion.div>
  );
};
