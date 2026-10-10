import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Sparkles, Eye, ArrowUpRight } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { GitHubIcon } from './Icons';
import { SectionHeading } from './ui/SectionHeading';
import { ParallaxImage } from './ui/ParallaxImage';
import { EASE_OUT, VIEWPORT, filterItem, springSoft, staggerContainer } from '../lib/motion';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<'All' | 'AI / Tool' | 'Concept' | 'Web App'>('All');

  const filteredProjects = filter === 'All' ? PROJECTS_DATA : PROJECTS_DATA.filter((p) => p.category === filter);

  const filters = (
    <div className="flex flex-wrap gap-1.5 rounded-xl border border-line bg-surface/80 p-1">
      {(['All', 'AI / Tool', 'Web App', 'Concept'] as const).map((cat) => {
        const isSelected = filter === cat;
        return (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
              isSelected ? 'text-heading' : 'text-body hover:text-heading'
            }`}
          >
            {isSelected && (
              <motion.span
                layoutId="project-filter-pill"
                className="absolute inset-0 -z-10 rounded-lg bg-surface-raised shadow-sm"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            {cat === 'All' ? `All Projects (${PROJECTS_DATA.length})` : cat}
          </button>
        );
      })}
    </div>
  );

  return (
    <section id="projects" className="relative border-t border-line-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Selected Work"
          title="Things I've built"
          description="Real projects and interface concepts demonstrating modern web engineering, clean frontend design, and AI tooling."
          trailing={filters}
        />

        <motion.div
          layout
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isFeatured = project.featured;
              const isWide = isFeatured && filter === 'All';

              return (
                <motion.article
                  key={project.id}
                  layout="position"
                  variants={filterItem}
                  exit="exit"
                  whileHover={{ y: -6 }}
                  transition={springSoft}
                  className={`spotlight edge-glow group flex flex-col justify-between overflow-hidden rounded-2xl border border-line-soft bg-surface/70 transition-colors duration-300 hover:border-primary/25 hover:shadow-xl hover:shadow-black/40 ${
                    isWide ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div>
                    {/* Media with scroll parallax + hover scale */}
                    <button
                      onClick={() => onSelectProject(project)}
                      aria-label={`View ${project.title} breakdown`}
                      className="relative block h-52 w-full cursor-pointer overflow-hidden bg-ink text-left sm:h-60"
                    >
                      <ParallaxImage
                        src={project.image}
                        alt={`${project.title} interface preview`}
                        className="h-full w-full"
                        imgClassName="opacity-90 transition-[transform,opacity] duration-[900ms] ease-out group-hover:scale-[1.06] group-hover:opacity-100"
                        range={5}
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />

                      <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                        <span className="rounded-full border border-line bg-ink/70 px-2.5 py-1 text-[11px] font-medium text-body shadow-sm backdrop-blur-md">
                          {project.category}
                        </span>
                        {isFeatured && (
                          <span className="flex items-center gap-1 rounded-full bg-sage px-2.5 py-1 text-[11px] font-semibold text-primary-ink shadow-sm">
                            <Sparkles className="h-3 w-3 fill-current" />
                            <span>Featured</span>
                          </span>
                        )}
                      </div>

                      {/* Hover affordance */}
                      <div className="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 ease-out group-hover:opacity-100">
                        <span className="inline-flex translate-y-1.5 items-center gap-1.5 rounded-xl border border-line bg-surface/90 px-3.5 py-2 text-xs font-semibold text-heading shadow-lg transition-transform duration-300 ease-out group-hover:translate-y-0">
                          <Eye className="h-3.5 w-3.5 text-primary" />
                          <span>View Project Breakdown</span>
                        </span>
                      </div>
                    </button>

                    <div className="p-6">
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="mb-2 cursor-pointer text-lg font-bold text-heading transition-colors duration-200 group-hover:text-primary-soft"
                      >
                        {project.title}
                      </h3>

                      <p className="mb-4 text-xs leading-relaxed text-body sm:text-sm">
                        {project.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="chip rounded-md border border-line-soft bg-ink px-2.5 py-0.5 font-mono text-[11px] text-muted transition-colors duration-200 group-hover:text-body"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-line-soft bg-ink/40 px-6 py-4">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="group/link flex items-center gap-1 text-xs font-medium text-body transition-colors duration-200 hover:text-heading"
                    >
                      <span>Details &amp; Architecture</span>
                      <ArrowUpRight className="h-3 w-3 transition-transform duration-300 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.94 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="rounded-lg p-2 text-body transition-colors duration-200 hover:bg-surface-raised hover:text-heading"
                        title="View GitHub Repository"
                        aria-label={`${project.title} GitHub repository`}
                      >
                        <GitHubIcon className="h-4 w-4" />
                      </motion.a>

                      {project.liveDemoUrl && (
                        <motion.a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                          className="inline-flex items-center gap-1 btn-shine rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-ink transition-colors duration-200 hover:bg-primary-soft"
                          title="Open live website or demo"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="h-3 w-3" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
          className="mt-8 text-center font-mono text-[11px] text-muted"
        >
          Select any project to open its breakdown — stack, architecture notes and live sandboxes.
        </motion.p>
      </div>
    </section>
  );
};
