import React from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT, VIEWPORT, staggerContainer, staggerItem, staggerItemTight } from '../../lib/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before the reveal begins. */
  delay?: number;
  /** Upward travel distance in px. Keep small for supporting content. */
  y?: number;
  duration?: number;
  amount?: number;
}

/**
 * Scroll-triggered fade-up. Transform is automatically dropped by
 * <MotionConfig reducedMotion="user">, leaving a clean opacity fade.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 18,
  duration = 0.6,
  amount,
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={amount ? { ...VIEWPORT, amount } : VIEWPORT}
    transition={{ duration, delay, ease: EASE_OUT }}
  >
    {children}
  </motion.div>
);

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
}

/** Parent that orchestrates staggered child reveals. */
export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  amount,
}) => (
  <motion.div
    className={className}
    variants={staggerContainer(stagger, delayChildren)}
    initial="hidden"
    whileInView="visible"
    viewport={amount ? { ...VIEWPORT, amount } : VIEWPORT}
  >
    {children}
  </motion.div>
);

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  /** Tight = shorter travel, for dense lists and small supporting elements. */
  tight?: boolean;
}

export const RevealItem: React.FC<RevealItemProps> = ({ children, className, tight }) => (
  <motion.div className={className} variants={tight ? staggerItemTight : staggerItem}>
    {children}
  </motion.div>
);
