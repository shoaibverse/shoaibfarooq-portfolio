import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Mail, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO, NAV_ITEMS } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { Reveal } from './ui/Reveal';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { href: PERSONAL_INFO.github, Icon: GitHubIcon, label: 'GitHub', hover: 'hover:text-heading' },
    { href: PERSONAL_INFO.linkedin, Icon: LinkedInIcon, label: 'LinkedIn', hover: 'hover:text-primary-soft' },
    { href: `mailto:${PERSONAL_INFO.email}`, Icon: Mail, label: 'Email', hover: 'hover:text-heading' },
    { href: PERSONAL_INFO.whatsapp, Icon: MessageCircle, label: 'WhatsApp', hover: 'hover:text-ok' },
  ];

  return (
    <footer className="relative border-t border-line-soft bg-ink/80 py-12 text-xs text-body">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal y={14}>
          <div className="flex flex-col items-center justify-between gap-6 border-b border-line-soft pb-8 md:flex-row">
            <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-line bg-surface text-xs font-bold text-primary">
                  SF
                </span>
                <span className="text-sm font-bold tracking-tight text-heading">{PERSONAL_INFO.name}</span>
              </div>
              <p className="text-xs text-muted">
                {PERSONAL_INFO.role} • Based in {PERSONAL_INFO.location}
              </p>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-4 text-xs">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative text-body transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary/70 after:transition-all after:duration-300 hover:text-heading hover:after:w-full"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {socials.map(({ href, Icon, label, hover }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`rounded-lg border border-line bg-surface p-2 text-body transition-colors duration-200 hover:border-primary/30 ${hover}`}
                  title={label}
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}

              <motion.button
                onClick={scrollToTop}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="ml-2 rounded-lg border border-line bg-surface p-2 text-body transition-colors duration-200 hover:bg-surface-raised hover:text-heading"
                title="Back to top"
                aria-label="Back to top"
              >
                <ArrowUp className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 font-mono text-[11px] text-muted sm:flex-row">
          <span>&copy; 2026 {PERSONAL_INFO.name}. All rights reserved.</span>
          <span>Crafted with React, TypeScript &amp; Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
};
