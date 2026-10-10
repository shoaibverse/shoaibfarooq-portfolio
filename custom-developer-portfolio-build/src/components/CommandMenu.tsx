import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  FileText,
  Mail,
  Home,
  User,
  Wrench,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Download,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { EASE_OUT, staggerContainer, staggerItemTight } from '../lib/motion';

interface CommandMenuProps {
  onClose: () => void;
  onOpenResume: () => void;
  onSelectProject: (projectId: string) => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  onClose,
  onOpenResume,
  onSelectProject,
  onShowToast,
}) => {
  const [query, setQuery] = useState('');

  // Reset the query whenever the palette is re-opened
  useEffect(() => {
    setQuery('');
  }, []);

  const scrollTo = (id: string) => {
    onClose();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    onShowToast('Email copied to clipboard!', 'success');
    onClose();
  };

  const actions = [
    {
      category: 'Navigation',
      items: [
        { label: 'Go to Home', icon: Home, action: () => scrollTo('home') },
        { label: 'Go to About Me', icon: User, action: () => scrollTo('about') },
        { label: 'Go to Skills & Toolkit', icon: Wrench, action: () => scrollTo('skills') },
        { label: 'Go to Projects', icon: FolderGit2, action: () => scrollTo('projects') },
        { label: 'Go to Services', icon: Briefcase, action: () => scrollTo('services') },
        { label: 'Go to Currently Learning', icon: GraduationCap, action: () => scrollTo('learning') },
        { label: 'Go to Contact', icon: Mail, action: () => scrollTo('contact') },
      ],
    },
    {
      category: 'Projects',
      items: PROJECTS_DATA.map((p) => ({
        label: `View: ${p.title}`,
        icon: Sparkles,
        action: () => {
          onClose();
          onSelectProject(p.id);
        },
      })),
    },
    {
      category: 'Quick Actions & Links',
      items: [
        {
          label: 'View Developer Resume',
          icon: FileText,
          action: () => {
            onClose();
            onOpenResume();
          },
        },
        {
          label: 'Download CV (PDF)',
          icon: Download,
          action: () => {
            const a = document.createElement('a');
            a.href = PERSONAL_INFO.cvUrl;
            a.download = 'Shoaib_Farooq_CV.pdf';
            a.click();
            onClose();
          },
        },
        {
          label: 'Download ATS Resume (PDF)',
          icon: Download,
          action: () => {
            const a = document.createElement('a');
            a.href = PERSONAL_INFO.resumeUrl;
            a.download = 'Shoaib_Farooq_Resume_ATS.pdf';
            a.click();
            onClose();
          },
        },
        {
          label: `Copy Email (${PERSONAL_INFO.email})`,
          icon: Mail,
          action: copyEmail,
        },
        {
          label: 'Chat on WhatsApp',
          icon: MessageCircle,
          action: () => {
            window.open(PERSONAL_INFO.whatsapp, '_blank');
            onClose();
          },
        },
        {
          label: 'Visit GitHub Profile',
          icon: GitHubIcon,
          action: () => {
            window.open(PERSONAL_INFO.github, '_blank');
            onClose();
          },
        },
        {
          label: 'Visit LinkedIn Profile',
          icon: LinkedInIcon,
          action: () => {
            window.open(PERSONAL_INFO.linkedin, '_blank');
            onClose();
          },
        },
      ],
    },
  ];

  const filteredCategories = actions
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Command Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: -8 }}
        transition={{ duration: 0.24, ease: EASE_OUT }}
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface text-heading shadow-2xl shadow-black/50"
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 border-b border-line-soft bg-surface/90 px-4 py-3">
          <Search className="h-5 w-5 text-muted" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search sections, projects, tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-heading placeholder:text-muted focus:outline-none"
          />
          <kbd className="rounded border border-line bg-ink px-2 py-0.5 font-mono text-[10px] text-muted">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 space-y-4 overflow-y-auto p-2">
          {filteredCategories.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted">
              No commands or projects match &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredCategories.map((group) => (
              <motion.div
                key={group.category}
                variants={staggerContainer(0.025)}
                initial="hidden"
                animate="visible"
                className="space-y-1"
              >
                <div className="px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                  {group.category}
                </div>
                {group.items.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.button
                      key={idx}
                      variants={staggerItemTight}
                      onClick={item.action}
                      className="group flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs text-body transition-colors duration-200 hover:bg-surface-raised hover:text-heading"
                    >
                      <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-ink p-1.5 text-primary transition-colors duration-200 group-hover:bg-line">
                          <IconComponent className="h-4 w-4" />
                        </span>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-muted transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:text-primary" />
                    </motion.button>
                  );
                })}
              </motion.div>
            ))
          )}
        </div>

        {/* Footer Navigation Tip */}
        <div className="flex items-center justify-between border-t border-line-soft bg-ink/60 px-4 py-2 font-mono text-[11px] text-muted">
          <span>Shoaib Farooq Portfolio Quick Commands</span>
          <span className="hidden sm:inline">Use ↑ ↓ or click to navigate</span>
        </div>
      </motion.div>
    </div>
  );
};
