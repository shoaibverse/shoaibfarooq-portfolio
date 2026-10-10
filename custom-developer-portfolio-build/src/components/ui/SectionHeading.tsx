import React from 'react';
import { motion } from 'framer-motion';
import { VIEWPORT, staggerContainer, staggerItem, staggerItemTight } from '../../lib/motion';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  /** Right-aligned content such as filter controls. */
  trailing?: React.ReactNode;
  className?: string;
}

/**
 * Consistent section header with a light top-down stagger:
 * label → title → description → trailing controls.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  description,
  trailing,
  className,
}) => (
  <motion.div
    variants={staggerContainer(0.09)}
    initial="hidden"
    whileInView="visible"
    viewport={VIEWPORT}
    className={cn(
      'mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
      className
    )}
  >
    <div className="max-w-2xl">
      <motion.div
        variants={staggerItemTight}
        className="mb-3.5 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-primary"
      >
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span>{label}</span>
      </motion.div>

      <motion.h2
        variants={staggerItem}
        className="text-balance text-3xl font-bold tracking-tight text-heading sm:text-4xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={staggerItem}
          className="measure-md mt-3 text-sm leading-relaxed text-body sm:text-[15px]"
        >
          {description}
        </motion.p>
      )}
    </div>

    {trailing && (
      <motion.div variants={staggerItemTight} className="shrink-0">
        {trailing}
      </motion.div>
    )}
  </motion.div>
);
