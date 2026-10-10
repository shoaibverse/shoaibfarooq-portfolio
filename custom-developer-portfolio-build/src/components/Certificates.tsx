import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, Download, Maximize2, X } from 'lucide-react';
import { CERTIFICATES_DATA } from '../data/portfolioData';
import type { CertificateItem } from '../types';
import { SectionHeading } from './ui/SectionHeading';
import { EASE_OUT, VIEWPORT, staggerContainer, staggerItem } from '../lib/motion';

const KIND_STYLES: Record<CertificateItem['kind'], string> = {
  'Course Completion': 'border-primary/25 bg-primary-tint text-primary-soft',
  Masterclass: 'border-accent/30 bg-accent/10 text-accent-soft',
  Participation: 'border-line bg-surface-deep text-body',
};

export const Certificates: React.FC = () => {
  const [active, setActive] = useState<CertificateItem | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close on Escape, lock page scroll while the lightbox is open, and move focus inside it.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <section id="certificates" className="relative border-t border-line-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Credentials"
          title="Certificates & Training"
          description="Courses and sessions I have completed alongside my degree. Open any certificate to view it in full or download the original."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CERTIFICATES_DATA.map((cert) => (
            <motion.article
              key={cert.id}
              variants={staggerItem}
              className="spotlight edge-glow group flex flex-col overflow-hidden rounded-2xl border border-line-soft bg-surface/60 transition-colors duration-300 hover:border-primary/25"
            >
              <button
                type="button"
                onClick={() => setActive(cert)}
                aria-label={`View certificate: ${cert.title}`}
                className="relative block aspect-[4/3] w-full overflow-hidden bg-surface-deep text-left"
              >
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate from ${cert.issuer}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/45 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-ink">
                    <Maximize2 className="h-3.5 w-3.5" />
                    View certificate
                  </span>
                </span>
              </button>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${KIND_STYLES[cert.kind]}`}
                  >
                    {cert.kind}
                  </span>
                  <span className="font-mono text-[11px] text-muted">{cert.date}</span>
                </div>

                <h3 className="text-lg font-bold leading-snug text-heading">{cert.title}</h3>
                <p className="text-xs font-medium text-primary">{cert.issuer}</p>
                <p className="text-sm leading-relaxed text-body">{cert.description}</p>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-line-soft pt-3">
                  <span className="truncate font-mono text-[11px] text-muted" title={cert.credentialId}>
                    {cert.credentialId ? `ID: ${cert.credentialId}` : 'Certificate of participation'}
                  </span>
                  <a
                    href={cert.file}
                    download
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary-soft"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key="cert-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} certificate`}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/60"
            >
              <div className="flex items-center justify-between gap-4 border-b border-line-soft px-5 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Award className="h-4 w-4 shrink-0 text-primary" />
                  <span className="truncate text-sm font-semibold text-heading">{active.title}</span>
                  <span className="hidden truncate text-xs text-muted sm:inline">· {active.issuer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={active.file}
                    download
                    className="btn-shine inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-ink transition-colors hover:bg-primary-soft"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </a>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setActive(null)}
                    className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-raised hover:text-heading"
                    aria-label="Close certificate"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-auto bg-surface-deep p-3 sm:p-5">
                <img
                  src={active.image}
                  alt={`${active.title} certificate from ${active.issuer}`}
                  className="mx-auto h-auto max-h-[72vh] w-auto max-w-full rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
