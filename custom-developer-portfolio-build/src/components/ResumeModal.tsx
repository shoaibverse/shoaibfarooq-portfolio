import React from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download, Mail, MapPin, GraduationCap, Code2, Sparkles, ExternalLink } from 'lucide-react';
import { RESUME_DATA, PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';
import { EASE_OUT } from '../lib/motion';

interface ResumeModalProps {
  onClose: () => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ onClose, onShowToast }) => {
  const handlePrint = () => {
    window.print();
  };

  const skillGroups = [
    { title: 'Frontend Development', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'], accent: false },
    { title: 'Programming Languages', skills: ['Python', 'C++', 'Dart', 'TypeScript'], accent: false },
    { title: 'AI & LLMs', skills: ['AI API Integration', 'LLM Engineering', 'Prompt Engineering', 'AI App Dev'], accent: true },
    { title: 'Developer Tools', skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Vite'], accent: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.32, ease: EASE_OUT }}
        className="print-surface relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-surface text-heading shadow-2xl shadow-black/50"
      >
        {/* Header Bar */}
        <div className="print-hide flex shrink-0 items-center justify-between border-b border-line-soft bg-surface/90 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
            <h3 className="text-sm font-semibold tracking-wide text-heading">
              Shoaib Farooq — Developer Resume
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg bg-surface-raised px-3 py-1.5 text-xs font-medium text-body transition-colors hover:bg-line hover:text-heading"
              title="Print or Save as PDF"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <a
              href={PERSONAL_INFO.cvUrl}
              download="Shoaib_Farooq_CV.pdf"
              onClick={() => onShowToast('Downloading CV (PDF)...', 'success')}
              className="btn-shine inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-ink transition-colors hover:bg-primary-soft"
              title="Download full CV (PDF)"
            >
              <Download className="h-3.5 w-3.5" />
              <span>CV</span>
            </a>
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Shoaib_Farooq_Resume_ATS.pdf"
              onClick={() => onShowToast('Downloading ATS Resume (PDF)...', 'success')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/25 bg-primary-tint px-3 py-1.5 text-xs font-medium text-primary-soft transition-colors hover:border-primary/40"
              title="Download ATS-friendly resume (PDF)"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Resume</span>
            </a>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-raised hover:text-heading"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Resume Body */}
        <div className="space-y-6 overflow-y-auto p-6 text-sm sm:p-8">
          {/* Top Info */}
          <div className="border-b border-line-soft pb-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                  {RESUME_DATA.name}
                </h1>
                <p className="mt-1 font-medium text-primary">{RESUME_DATA.title}</p>
              </div>
              <div className="flex flex-col gap-1 text-xs text-muted">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{RESUME_DATA.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" />
                  <a
                    href={`mailto:${RESUME_DATA.email}`}
                    className="transition-colors hover:text-primary-soft"
                  >
                    {RESUME_DATA.email}
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-body sm:text-sm">{RESUME_DATA.summary}</p>
          </div>

          {/* Education */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <GraduationCap className="h-4 w-4" />
              <span>Education</span>
            </div>
            <div className="rounded-xl border border-line-soft bg-ink/40 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-heading">{RESUME_DATA.education.degree}</h4>
                  <p className="mt-0.5 text-xs text-muted">{RESUME_DATA.education.focus}</p>
                </div>
                <span className="rounded-full border border-primary/20 bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-primary-soft">
                  {RESUME_DATA.education.status}
                </span>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Code2 className="h-4 w-4" />
              <span>Technical Skills</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.title} className="rounded-lg border border-line-soft bg-ink/30 p-3">
                  <span className="mb-1.5 block text-xs font-semibold text-heading">{group.title}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((s) => (
                      <span
                        key={s}
                        className={`rounded border px-2 py-0.5 text-xs ${
                          group.accent
                            ? 'border-primary/20 bg-primary-tint text-primary-soft'
                            : 'border-line bg-surface-raised text-body'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Featured Project Highlights</span>
            </div>
            <div className="space-y-3">
              {PROJECTS_DATA.slice(0, 3).map((project) => (
                <div key={project.id} className="rounded-xl border border-line-soft bg-ink/30 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-heading">{project.title}</h4>
                    <span className="text-xs text-muted">{project.tags.slice(0, 3).join(' • ')}</span>
                  </div>
                  <p className="mt-1 text-xs text-body">{project.shortDescription}</p>
                  <ul className="mt-2 space-y-1">
                    {project.highlights.slice(0, 2).map((h, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-xs text-muted">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="print-hide flex shrink-0 items-center justify-between border-t border-line-soft bg-surface/90 px-6 py-4 text-xs text-muted backdrop-blur-md">
          <span>
            Shoaib Farooq • {PERSONAL_INFO.location}
          </span>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <span>github.com/shoaibverse</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};
