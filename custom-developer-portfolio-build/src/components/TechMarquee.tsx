import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATES_DATA, PROJECTS_DATA, SKILLS_DATA } from '../data/portfolioData';
import { CountUp } from './ui/CountUp';
import { EASE_OUT, VIEWPORT, staggerContainer, staggerItemTight } from '../lib/motion';

/**
 * Slim band between the hero and the rest of the page:
 * a looping technology ticker plus three honest numbers.
 */
export const TechMarquee: React.FC = () => {
  const names = Array.from(new Set(SKILLS_DATA.map((s) => s.name)));

  const stats = [
    { value: PROJECTS_DATA.length, label: 'Projects built' },
    { value: SKILLS_DATA.length, label: 'Skills & tools' },
    { value: CERTIFICATES_DATA.length, label: 'Certifications' },
  ];

  return (
    <section aria-label="Technologies and highlights" className="relative border-y border-line-soft bg-surface-deep/50 py-10">
      {/* Ticker. The list is rendered twice so the -50% loop is seamless. */}
      <div className="marquee marquee-mask overflow-hidden" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center gap-3 pr-3">
              {names.map((name) => (
                <li
                  key={`${copy}-${name}`}
                  className="chip whitespace-nowrap rounded-full border border-line bg-surface/70 px-4 py-1.5 font-mono text-xs text-body transition-colors duration-200 hover:border-primary/40 hover:text-heading"
                >
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <motion.dl
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4 px-4 text-center sm:px-6"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={staggerItemTight} transition={{ ease: EASE_OUT }} className="flex flex-col">
            <dt className="order-2 mt-1 text-xs text-muted sm:text-sm">{stat.label}</dt>
            <dd className="font-display text-3xl font-bold text-heading sm:text-4xl">
              <CountUp to={stat.value} className="text-gradient" />
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
};
