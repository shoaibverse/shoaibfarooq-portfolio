import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, Terminal, Wrench, Sparkles, Layout, Cpu, Check } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillCategory } from '../types';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { VIEWPORT, filterItem, springSoft, staggerContainer } from '../lib/motion';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'All'>('All');

  const categories: Array<{
    id: SkillCategory | 'All';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'All', label: 'All Technologies', icon: Code2 },
    { id: 'Frontend', label: 'Frontend', icon: Layout },
    { id: 'Programming', label: 'Programming', icon: Terminal },
    { id: 'AI', label: 'AI & LLMs', icon: Sparkles },
    { id: 'Tools', label: 'Tools & Workflow', icon: Wrench },
  ];

  const filteredSkills =
    selectedCategory === 'All' ? SKILLS_DATA : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  /**
   * Categories are separated with tints from a single indigo family so the
   * section stays cohesive with the brand palette instead of turning rainbow.
   */
  const categoryStyles: Record<SkillCategory, { badge: string; icon: string; border: string }> = {
    Frontend: {
      badge: 'text-primary bg-primary-tint border-primary/20',
      icon: 'text-primary',
      border: 'hover:border-primary/25',
    },
    Programming: {
      badge: 'text-body bg-surface-deep border-line',
      icon: 'text-body',
      border: 'hover:border-line hover:bg-surface-raised',
    },
    AI: {
      badge: 'text-body bg-surface-deep border-line',
      icon: 'text-body',
      border: 'hover:border-line hover:bg-surface-raised',
    },
    Tools: {
      badge: 'text-body bg-surface-deep border-line',
      icon: 'text-body',
      border: 'hover:border-line hover:bg-surface-raised',
    },
  };

  const categoryIcon = (category: SkillCategory) => {
    switch (category) {
      case 'Frontend':
        return Layout;
      case 'Programming':
        return Terminal;
      case 'AI':
        return Sparkles;
      case 'Tools':
        return Cpu;
    }
  };

  const filters = (
    <div className="flex flex-wrap gap-1.5 rounded-xl border border-line bg-surface/80 p-1">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
              isSelected ? 'text-heading' : 'text-body hover:text-heading'
            }`}
          >
            {isSelected && (
              <motion.span
                layoutId="skill-filter-pill"
                className="absolute inset-0 -z-10 rounded-lg bg-surface-raised shadow-sm"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-primary' : ''}`} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <section id="skills" className="relative border-t border-line-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Technical Stack"
          title="Skills & Technologies"
          description="Languages, libraries, and tools I use to build responsive web applications and AI-enabled software."
          trailing={filters}
          className="mb-10"
        />

        {/* Grid re-flows smoothly when a filter changes */}
        <motion.div
          layout
          variants={staggerContainer(0.04)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const style = categoryStyles[skill.category];
              const Icon = categoryIcon(skill.category);
              return (
                <motion.div
                  key={skill.name}
                  layout="position"
                  variants={filterItem}
                  exit="exit"
                  whileHover={{ y: -4 }}
                  transition={springSoft}
                  className={`spotlight edge-glow group flex flex-col justify-between rounded-xl border border-line-soft bg-surface/60 p-4 transition-colors duration-300 hover:bg-surface ${style.border}`}
                >
                  <div>
                    <div className="mb-2.5 flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        {/* Icon reacts on card hover */}
                        <motion.span
                          className="icon-pop flex h-7 w-7 items-center justify-center rounded-lg border border-line-soft bg-ink"
                          whileHover={{ rotate: -6 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                        >
                          <Icon
                            className={`h-3.5 w-3.5 ${style.icon} transition-transform duration-300 ease-out group-hover:scale-110`}
                          />
                        </motion.span>
                        <span className="text-sm font-bold text-heading">{skill.name}</span>
                      </div>
                      <span className={`rounded border px-2 py-0.5 font-mono text-[10px] ${style.badge}`}>
                        {skill.category}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-muted">{skill.description}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-line-soft pt-3 font-mono text-[11px] text-muted">
                    <span className="flex items-center gap-1 text-body">
                      <Check className="h-3 w-3 text-primary" />
                      <span>Hands-on usage</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.05} y={14} className="mt-8">
          <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-line-soft bg-surface/30 p-4 text-xs text-body sm:flex-row">
            <div className="flex items-center gap-2.5">
              <Cpu className="h-4 w-4 shrink-0 text-primary" />
              <span>
                Every skill listed represents hands-on project experience, coursework implementation, and ongoing
                practice.
              </span>
            </div>
            <span className="shrink-0 font-mono text-muted">Updated 2026</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
