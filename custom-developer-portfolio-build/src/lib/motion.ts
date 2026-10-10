import type { Variants, Transition } from 'framer-motion';

/**
 * Shared motion language for the portfolio.
 * Timings are tuned to feel responsive (fast enough to never block reading)
 * but eased enough to feel deliberate and premium.
 */

// Natural "settle" curve — quick start, long gentle finish.
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
// Softer symmetrical curve for hovers and toggles.
export const EASE_SOFT: [number, number, number, number] = [0.33, 1, 0.68, 1];
// Used for background / ambient motion.
export const EASE_AMBIENT: [number, number, number, number] = [0.45, 0, 0.55, 1];

// Scroll reveal trigger: fires slightly before the element is fully in view.
export const VIEWPORT = { once: true, amount: 0.18, margin: '0px 0px -8% 0px' } as const;

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 26,
  mass: 0.7,
};

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 0.5,
};

/** Primary scroll-reveal: fade + short upward travel. */
export const fadeUp = (delay = 0, y = 18, duration = 0.6): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: EASE_OUT },
  },
});

/** Opacity-only reveal for supporting/secondary content. */
export const fadeIn = (delay = 0, duration = 0.5): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration, delay, ease: EASE_OUT } },
});

/** Gentle scale-in, reserved for panels and media. */
export const scaleIn = (delay = 0, duration = 0.65): Variants => ({
  hidden: { opacity: 0, y: 22, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration, delay, ease: EASE_OUT },
  },
});

/** Parent orchestrator for staggered children. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Default child used with staggerContainer. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

/** Smaller travel for dense lists (tags, nav links, list rows). */
export const staggerItemTight: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

/** Word-by-word heading reveal — used once, in the hero. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: { opacity: 1, y: '0em', transition: { duration: 0.7, ease: EASE_OUT } },
};

/** Grid items that re-flow when a filter changes. */
export const filterItem: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, scale: 0.99, transition: { duration: 0.2, ease: EASE_SOFT } },
};
