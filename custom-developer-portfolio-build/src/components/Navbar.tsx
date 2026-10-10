import React, { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from 'framer-motion';
import { FileText, Search, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, PERSONAL_INFO } from '../data/portfolioData';
import { Magnetic } from './ui/Magnetic';
import { EASE_OUT, staggerContainer, staggerItemTight } from '../lib/motion';

interface NavbarProps {
  /** Released by the app once the preloader has begun fading out. */
  isReady: boolean;
  onOpenResume: () => void;
  onOpenCommand: () => void;
}

/** Two-bar hamburger that morphs into a cross. */
const MenuToggle: React.FC<{ open: boolean }> = ({ open }) => (
  <span className="relative block h-4 w-5" aria-hidden="true">
    <motion.span
      className="absolute left-0 block h-[1.5px] w-5 rounded-full bg-current"
      initial={false}
      animate={open ? { top: 7, rotate: 45 } : { top: 3, rotate: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
    />
    <motion.span
      className="absolute left-0 block h-[1.5px] w-5 rounded-full bg-current"
      initial={false}
      animate={open ? { top: 7, rotate: -45 } : { top: 11, rotate: 0, width: 14 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
    />
  </span>
);

export const Navbar: React.FC<NavbarProps> = ({ isReady, onOpenResume, onOpenCommand }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollY, scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 24);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(href.replace('#', ''));
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={isReady ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="fixed inset-x-0 top-0 z-40"
    >
      {/* Backdrop layer — fades in rather than snapping */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="absolute inset-0 border-b border-line-soft bg-ink/80 shadow-lg shadow-black/20 backdrop-blur-md"
      />

      <motion.div
        initial={false}
        animate={{ paddingTop: isScrolled ? 12 : 20, paddingBottom: isScrolled ? 12 : 20 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="relative mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        {/* Monogram */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="group flex items-center gap-2.5"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface text-sm font-bold tracking-wider text-primary shadow-sm transition-colors duration-300 group-hover:border-primary/40 group-hover:text-primary-soft"
          >
            {PERSONAL_INFO.monogram}
          </motion.div>
          <div className="hidden flex-col sm:flex">
            <span className="text-xs font-semibold leading-none tracking-tight text-heading transition-colors duration-200 group-hover:text-primary-soft">
              {PERSONAL_INFO.name}
            </span>
            <span className="mt-0.5 font-mono text-[10px] text-muted">CS & Web Dev</span>
          </div>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 rounded-full border border-line-soft bg-surface/60 p-1.5 backdrop-blur-md md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
                  isActive ? 'text-heading' : 'text-body hover:text-heading'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-primary/20 bg-surface-raised shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-2 rounded-lg border border-line-soft bg-surface/60 px-2.5 py-1.5 font-mono text-xs text-body transition-colors duration-200 hover:border-line hover:bg-surface-raised hover:text-heading"
            title="Open quick command palette (⌘K)"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden text-[11px] lg:inline">Search</span>
            <kbd className="rounded border border-line bg-surface-raised px-1.5 py-0.5 text-[9px] text-muted">
              ⌘K
            </kbd>
          </button>

          <motion.button
            onClick={onOpenResume}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-raised px-3.5 py-1.5 text-xs font-medium text-heading transition-colors duration-200 hover:border-line hover:bg-surface"
          >
            <FileText className="h-3.5 w-3.5 text-primary" />
            <span>Resume</span>
          </motion.button>

          <Magnetic strength={0.2} max={6}>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              className="group inline-flex items-center gap-1 btn-shine rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-ink shadow-sm transition-colors duration-200 hover:bg-primary-soft"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.a>
          </Magnetic>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenCommand}
            className="rounded-lg border border-line-soft bg-surface/60 p-2 text-body transition-colors hover:text-heading"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-lg border border-line bg-surface p-2.5 text-body transition-colors hover:text-heading"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <MenuToggle open={mobileMenuOpen} />
          </button>
        </div>
      </motion.div>

      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScale }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-primary/70 via-primary/40 to-accent/40"
      />

      {/* Mobile drawer */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="relative overflow-hidden border-b border-line-soft bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <motion.div
              variants={staggerContainer(0.045, 0.06)}
              initial="hidden"
              animate="visible"
              className="space-y-3 px-4 pb-6 pt-3"
            >
              <div className="flex flex-col space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.button
                      key={item.label}
                      variants={staggerItemTight}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-surface-raised font-semibold text-primary'
                          : 'text-body hover:bg-surface/70 hover:text-heading'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>

              <motion.div
                variants={staggerItemTight}
                className="grid grid-cols-2 gap-2 border-t border-line-soft pt-3"
              >
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs font-medium text-heading active:scale-[0.98]"
                >
                  <FileText className="h-3.5 w-3.5 text-primary" />
                  <span>View Resume</span>
                </button>

                <button
                  onClick={() => handleNavClick('#contact')}
                  className="flex items-center justify-center gap-1.5 btn-shine rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-ink active:scale-[0.98]"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
