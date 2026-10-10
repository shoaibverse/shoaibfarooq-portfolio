import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, Check, Send, MapPin, Clock, ArrowUpRight, MessageSquare, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { SectionHeading } from './ui/SectionHeading';
import { Magnetic } from './ui/Magnetic';
import { EASE_OUT, VIEWPORT, springSoft, staggerContainer, staggerItem } from '../lib/motion';

interface ContactProps {
  initialSubject?: string;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const Contact: React.FC<ContactProps> = ({ initialSubject, onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject || '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    onShowToast('Email copied to clipboard!', 'success');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      onShowToast('Please fill out all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onShowToast('Message received! I will get back to you shortly.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  const inputClass =
    'w-full rounded-xl border border-line bg-surface-deep px-3.5 py-2.5 text-sm text-heading placeholder:text-muted transition-colors duration-200 hover:border-line hover:bg-surface focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10';

  return (
    <section id="contact" className="relative border-t border-line-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Get In Touch"
          title="Have a project in mind?"
          description="I'm always interested in building useful things, learning new technologies and working on interesting ideas."
        />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Direct channels */}
          <motion.div
            variants={staggerContainer(0.09)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="space-y-4 lg:col-span-5"
          >
            <motion.div
              variants={staggerItem}
              className="rounded-2xl border border-line bg-surface/70 p-5 shadow-md transition-colors duration-300 hover:border-primary/25"
            >
              <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="truncate font-mono text-sm font-semibold text-heading transition-colors duration-200 hover:text-primary-soft sm:text-base"
                >
                  {PERSONAL_INFO.email}
                </a>
                <motion.button
                  onClick={handleCopyEmail}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="shrink-0 rounded-lg bg-surface-raised p-2 text-body transition-colors duration-200 hover:bg-line hover:text-heading"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copiedEmail ? (
                      <motion.span
                        key="check"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.18 }}
                        className="block"
                      >
                        <Check className="h-4 w-4 text-primary" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.18 }}
                        className="block"
                      >
                        <Copy className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  href: PERSONAL_INFO.github,
                  Icon: GitHubIcon,
                  title: 'GitHub',
                  handle: '@shoaibverse',
                  hover: 'group-hover:text-heading',
                },
                {
                  href: PERSONAL_INFO.linkedin,
                  Icon: LinkedInIcon,
                  title: 'LinkedIn',
                  handle: 'in/shoaib-farooq',
                  hover: 'group-hover:text-primary-soft',
                },
                {
                  href: PERSONAL_INFO.whatsapp,
                  Icon: MessageCircle,
                  title: 'WhatsApp',
                  handle: PERSONAL_INFO.phone,
                  hover: 'group-hover:text-ok',
                },
              ].map(({ href, Icon, title, handle, hover }) => (
                <motion.a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  transition={springSoft}
                  className="spotlight edge-glow group flex flex-col justify-between rounded-xl border border-line-soft bg-surface/60 p-4 transition-colors duration-300 hover:border-primary/25"
                >
                  <div className={`flex items-center justify-between text-body ${hover}`}>
                    <Icon className="h-5 w-5" />
                    <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <div className="mt-3">
                    <span className="block text-xs font-bold text-heading">{title}</span>
                    <span className="font-mono text-[11px] text-muted">{handle}</span>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="space-y-2 rounded-xl border border-line-soft bg-surface/40 p-4 text-xs text-body"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>
                  Based in <strong className="text-heading">Lahore, Pakistan</strong> (PKT • UTC+5)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-primary-soft" />
                <span>Typically responds within 24 hours</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-line bg-surface/80 p-6 shadow-xl shadow-black/20 backdrop-blur-md sm:p-8">
              <div className="mb-6 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span>Send a Direct Message</span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="space-y-4 py-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.05 }}
                      className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-primary-tint text-primary"
                    >
                      <Check className="h-6 w-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-heading">Message Dispatched!</h3>
                      <p className="mx-auto mt-1 max-w-sm text-xs text-body">
                        Thank you for reaching out. I have received your message and will reply to your email shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="rounded-xl bg-surface-raised px-4 py-2 text-xs font-medium text-body transition-colors duration-200 hover:bg-line hover:text-heading"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-body">
                          Your Name <span className="text-primary">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Shoaib, Sarah, Alex..."
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-body">
                          Your Email <span className="text-primary">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="mb-1.5 block text-xs font-medium text-body">
                        Subject / Topic
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Project inquiry, collaboration, student question..."
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-body">
                        Your Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hi Shoaib, let's talk about building..."
                        className={`${inputClass} min-h-[100px] resize-y`}
                      />
                    </div>

                    <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
                      <Magnetic strength={0.2} max={7} className="w-full sm:w-auto">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                          className="inline-flex w-full items-center justify-center gap-2 btn-shine rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-ink shadow-md transition-colors duration-200 hover:bg-primary-soft disabled:opacity-50 sm:w-auto"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-ink border-t-transparent" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-3.5 w-3.5" />
                              <span>Send Message</span>
                            </>
                          )}
                        </motion.button>
                      </Magnetic>

                      <span className="font-mono text-[11px] text-muted">
                        or email directly to{' '}
                        <a href={`mailto:${PERSONAL_INFO.email}`} className="text-primary hover:underline">
                          {PERSONAL_INFO.email}
                        </a>
                      </span>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
