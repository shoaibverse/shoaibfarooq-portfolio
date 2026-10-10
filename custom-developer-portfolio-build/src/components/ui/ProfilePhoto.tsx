import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { springSoft } from '../../lib/motion';

/**
 * Portrait used at the top of the About profile card.
 * The crop is tuned with object-position so the face stays in frame at any card width.
 */
export const ProfilePhoto: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.figure
      whileHover={prefersReduced ? undefined : { scale: 1.015 }}
      transition={springSoft}
      className="group relative w-full overflow-hidden rounded-xl border border-line-soft bg-surface-deep shadow-lg shadow-black/30"
    >
      <div className="aspect-[5/4] w-full overflow-hidden">
        <img
          src="/images/profile.jpg"
          alt={`Portrait of ${PERSONAL_INFO.name}`}
          width={900}
          height={900}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: '40% 38%' }}
          className="h-full w-full scale-[1.02] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
        />
      </div>

      {/* Warm grade so the photo sits inside the palette, plus a soft fade at the foot */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-primary/[0.07]" />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-primary/20 transition-all duration-500 group-hover:ring-primary/50" />

      <figcaption className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-line/70 bg-ink/70 px-3 py-1 font-mono text-[11px] text-heading backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
        </span>
        Lahore, Pakistan
      </figcaption>
    </motion.figure>
  );
};
