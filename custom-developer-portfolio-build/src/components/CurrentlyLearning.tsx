import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Brain, Sparkles, Terminal, BookMarked, ArrowUpRight } from 'lucide-react';
import { LEARNING_DATA, PERSONAL_INFO } from '../data/portfolioData';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { VIEWPORT, springSoft, staggerContainer, staggerItem } from '../lib/motion';

export const CurrentlyLearning: React.FC = () => {
  // Single neutral icon colour so the section reads as a stack,
  // not a rainbow of tinted cards.
  const iconClass = 'h-5 w-5 text-body';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className={iconClass} />;
      case 'Code2':
        return <Code2 className={iconClass} />;
      case 'Brain':
        return <Brain className={iconClass} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      case 'Terminal':
        return <Terminal className={iconClass} />;
      default:
        return <BookMarked className={iconClass} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Core Focus':
        return 'bg-primary-tint text-primary border-primary/20';
      case 'Active Exploration':
        return 'bg-surface-deep text-body border-line';
      case 'In Progress':
        return 'bg-surface-deep text-muted border-line';
      default:
        return 'bg-surface-deep text-body border-line';
    }
  };

  return (
    <section id="learning" className="relative border-t border-line-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Growth & Development"
          title="Currently Learning & Building"
          description="As a Computer Science student, here are the key domains, technical concepts, and engineering topics I am actively studying, practicing, and building projects with."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {LEARNING_DATA.map((item) => (
            <motion.div
              key={item.id}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={springSoft}
              className="spotlight edge-glow group flex flex-col justify-between rounded-2xl border border-line-soft bg-surface/60 p-6 transition-colors duration-300 hover:border-primary/25 hover:bg-surface"
            >
              <div>
                <div className="mb-4 flex items-start justify-between gap-3">
                  <motion.div
                    whileHover={{ rotate: -5, scale: 1.06 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 14 }}
                    className="icon-pop rounded-xl border border-line-soft bg-ink p-2.5"
                  >
                    {getIcon(item.icon)}
                  </motion.div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${getStatusBadge(item.status)}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                    {item.category}
                  </span>
                  <h3 className="mt-0.5 text-lg font-bold text-heading transition-colors duration-200 group-hover:text-primary-soft">
                    {item.title}
                  </h3>
                </div>

                <p className="mb-5 text-xs leading-relaxed text-muted">{item.description}</p>

                <div className="space-y-2">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                    Active Study Topics:
                  </span>
                  <ul className="space-y-1.5">
                    {item.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-body">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70 transition-colors duration-300 group-hover:bg-primary" />
                        <span className="leading-snug">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line-soft pt-3 font-mono text-[11px] text-muted">
                <span>Domain: {item.title}</span>
                <span className="flex items-center gap-1 text-primary">In progress</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.05} y={14} className="mt-10">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-line-soft bg-surface/40 p-5 sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-primary" />
              <p className="text-xs text-body sm:text-sm">
                <strong className="text-heading">Continuous Evolution:</strong> I regularly document insights from
                courses, books, and code experiments to sharpen my software engineering intuition.
              </p>
            </div>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-1 font-mono text-xs font-semibold text-primary transition-colors duration-200 hover:text-primary-soft"
            >
              <span>Follow on GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
