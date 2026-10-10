import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { EASE_OUT } from '../../lib/motion';

interface PreloaderProps {
  /** Called once the count reaches 100. The parent removes the component via AnimatePresence. */
  onFinish: () => void;
}

// Whole intro lasts about 1.5s: long enough to feel designed, short enough to never annoy.
const DURATION_MS = 1500;
const DURATION_MS_REDUCED = 350;

const RING_RADIUS = 46;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/**
 * Intro sequence: a ring draws itself around the monogram while a counter
 * climbs to 100, then the screen lifts away like a curtain.
 */
export const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const prefersReduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  // Keep the latest callback in a ref so a parent re-render never restarts the clock.
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const total = prefersReduced ? DURATION_MS_REDUCED : DURATION_MS;
    const start = performance.now();
    let frame = 0;
    let done = false;

    const tick = (now: number) => {
      const t = Math.min((now - start) / total, 1);
      // ease-out cubic: fast start, gentle landing
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else if (!done) {
        done = true;
        window.setTimeout(() => onFinishRef.current(), prefersReduced ? 0 : 140);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [prefersReduced]);

  return (
    <motion.div
      exit={prefersReduced ? { opacity: 0 } : { y: '-100%' }}
      transition={{ duration: prefersReduced ? 0.15 : 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="relative flex h-32 w-32 items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden="true">
          <defs>
            <linearGradient id="preloader-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F2B14C" />
              <stop offset="100%" stopColor="#F2907B" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r={RING_RADIUS} fill="none" stroke="#2A221B" strokeWidth="1.5" />
          <circle
            cx="50"
            cy="50"
            r={RING_RADIUS}
            fill="none"
            stroke="url(#preloader-ring)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={RING_LENGTH}
            strokeDashoffset={RING_LENGTH * (1 - progress / 100)}
          />
        </svg>

        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-gradient font-display text-3xl font-extrabold tracking-wide"
        >
          {PERSONAL_INFO.monogram}
        </motion.span>
      </div>

      <div className="mt-8 flex items-center gap-3 font-mono text-xs text-muted">
        <span className="tabular-nums text-body">{String(progress).padStart(3, '0')}</span>
        <span className="h-px w-10 bg-line" />
        <span>{PERSONAL_INFO.name}</span>
      </div>
    </motion.div>
  );
};
