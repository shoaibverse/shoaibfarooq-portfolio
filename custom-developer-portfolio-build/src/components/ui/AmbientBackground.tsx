import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Page atmosphere:
 *  - three slow aurora fields (marigold, peach and sage) driven by CSS keyframes,
 *    so they cost almost nothing on the main thread;
 *  - a soft light that trails the cursor on fine pointers only;
 *  - a dot texture and vignette to keep the gradients from looking flat.
 * Everything is static when the user prefers reduced motion.
 */
export const AmbientBackground: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  const px = useMotionValue(-400);
  const py = useMotionValue(-400);
  const sx = useSpring(px, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 90, damping: 22, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setFinePointer(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!finePointer || prefersReduced) return;
    const onMove = (e: PointerEvent) => {
      // Offset by half the glow size so the light is centred on the cursor.
      px.set(e.clientX - 240);
      py.set(e.clientY - 240);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [finePointer, prefersReduced, px, py]);

  const motionClass = (name: string) => (prefersReduced ? '' : name);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink" />

      {/* Aurora fields */}
      <div
        className={`${motionClass('aurora-a')} absolute -top-48 left-[4%] h-[38rem] w-[38rem] rounded-full bg-primary-strong/[0.15] blur-[140px]`}
      />
      <div
        className={`${motionClass('aurora-b')} absolute top-[38%] -right-24 h-[34rem] w-[34rem] rounded-full bg-accent/[0.09] blur-[150px]`}
      />
      <div
        className={`${motionClass('aurora-c')} absolute -bottom-40 left-[28%] h-[32rem] w-[32rem] rounded-full bg-sage/[0.09] blur-[160px]`}
      />

      {/* Cursor-following light (desktop only) */}
      {finePointer && !prefersReduced && (
        <motion.div
          style={{ x: sx, y: sy }}
          className="absolute left-0 top-0 h-[30rem] w-[30rem] rounded-full bg-primary/[0.07] blur-[110px]"
        />
      )}

      <div className="absolute inset-0 bg-dot-matrix opacity-[0.3]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,7,5,0.88)_100%)]" />
    </div>
  );
};
