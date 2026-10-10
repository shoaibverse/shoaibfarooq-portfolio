import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Mail, Copy, Check, Terminal, Sparkles, Code2, Play, MessageCircle, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { Magnetic } from './ui/Magnetic';
import { useTypewriter } from '../hooks/useTypewriter';
import { EASE_OUT, staggerContainer, staggerItem, staggerItemTight, wordReveal } from '../lib/motion';

interface HeroProps {
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  /** Released by the app once the preloader has begun fading out. */
  isReady: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onShowToast, isReady }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'profile' | 'ai' | 'stack'>('profile');
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Gentle scroll parallax: the workspace panel lifts slightly as the page moves.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.55]);

  // 3D tilt: the workspace panel leans toward the pointer (fine pointers only).
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 140, damping: 18, mass: 0.5 });
  const rotateY = useSpring(tiltY, { stiffness: 140, damping: 18, mass: 0.5 });

  const handleTilt = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 9);
    tiltX.set(-py * 9);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const typedRole = useTypewriter(PERSONAL_INFO.roles, !prefersReduced);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    onShowToast('Email copied to clipboard!', 'success');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleRunCode = () => {
    if (activeCodeTab === 'profile') {
      setTerminalOutput('Shoaib Farooq ready: Python, machine learning and web projects online.');
    } else if (activeCodeTab === 'ai') {
      setTerminalOutput('AI Engine: Prompt validated. Structured output generated with 0 hallucinations.');
    } else {
      setTerminalOutput('Build tools active: Vite, Tailwind, TypeScript compilation successful.');
    }
  };

  const codeSnippets = {
    profile: `// ShoaibFarooq.ts
export const developer: StudentEngineer = {
  name: "Shoaib Farooq",
  role: "CS Student & Web Developer",
  location: "Lahore, Pakistan",
  focusAreas: [
    "Python & Machine Learning",
    "Modern Web Interfaces",
    "AI-powered Applications"
  ],
  currentlyBuilding: "AI tools and responsive web apps",
  status: "Ready for collaborations"
};`,
    ai: `# AiPipeline.py
from llm_tooling import StructuredAgent, ContextGuard

async def execute_intelligent_workflow(user_query: str):
    agent = StructuredAgent(
        model="gpt-4o-mini",
        schema=EmergencyDispatchSchema,
        temperature=0.2
    )
    # Extract intent & synthesize structured triage report
    triage_payload = await agent.run(user_query)
    return triage_payload.to_json()`,
    stack: `{
  "developer": "Shoaib Farooq",
  "primaryStack": {
    "frontend": ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    "languages": ["Python", "C++", "Dart", "JavaScript"],
    "ai_tooling": ["OpenAI API", "Structured Outputs", "Prompt Eng."],
    "environment": ["VS Code", "Git", "GitHub", "Figma"]
  },
  "openFor": ["Internships", "Client Projects", "Collaborations"]
}`,
  };

  const headingWords = ['Hi,', "I'm"];

  const tabs = [
    { id: 'profile' as const, label: 'Shoaib.ts', icon: Code2, accent: 'text-primary', active: 'text-primary-soft' },
    { id: 'ai' as const, label: 'Agent.py', icon: Sparkles, accent: 'text-accent', active: 'text-accent-soft' },
    { id: 'stack' as const, label: 'Stack.json', icon: null, accent: '', active: 'text-primary-soft' },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[90vh] items-center overflow-hidden pb-16 pt-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-30" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Orchestrator: held at "hidden" until the preloader releases the page */}
        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          animate={isReady ? 'visible' : 'hidden'}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8"
        >
          {/* Left: copy */}
          <motion.div variants={staggerContainer(0.09)} className="space-y-6 lg:col-span-7">
            <motion.div variants={staggerItemTight}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
                </span>
                <span className="font-medium text-body">
                  {typedRole}
                  {!prefersReduced && <span className="caret" aria-hidden="true" />}
                </span>
              </span>
            </motion.div>

            {/* Word-by-word reveal — used only here, where the hierarchy earns it */}
            <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-heading sm:text-5xl lg:text-6xl">
              <span className="sr-only">Hi, I&apos;m Shoaib Farooq.</span>
              <motion.span
                aria-hidden="true"
                variants={staggerContainer(0.07)}
                className="inline-flex flex-wrap gap-x-[0.3em]"
              >
                {headingWords.map((word) => (
                  <span key={word} className="inline-block overflow-hidden py-[0.06em]">
                    <motion.span variants={wordReveal} className="inline-block">
                      {word}
                    </motion.span>
                  </span>
                ))}
                <span className="inline-block overflow-hidden py-[0.06em]">
                  <motion.span
                    variants={wordReveal}
                    className="text-gradient inline-block"
                  >
                    Shoaib Farooq.
                  </motion.span>
                </span>
              </motion.span>
            </h1>

            <motion.p
              variants={staggerItem}
              className="max-w-xl text-base leading-relaxed text-body sm:text-lg"
            >
              {PERSONAL_INFO.bioSupporting}
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-3 pt-2">
              <Magnetic strength={0.25} max={9}>
                <motion.a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                  className="group inline-flex items-center justify-center gap-2 btn-shine rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-ink shadow-md shadow-primary/10 transition-colors duration-200 hover:bg-primary-soft"
                >
                  <span>View My Work</span>
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
                </motion.a>
              </Magnetic>

              <Magnetic strength={0.22} max={8}>
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-medium text-heading transition-colors duration-200 hover:border-primary/30 hover:bg-surface-raised"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <span>Let&apos;s Talk</span>
                </motion.a>
              </Magnetic>

              <Magnetic strength={0.22} max={8}>
                <motion.a
                  href={PERSONAL_INFO.cvUrl}
                  download="Shoaib_Farooq_CV.pdf"
                  onClick={() => onShowToast('Downloading CV (PDF)...', 'success')}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary-tint px-5 py-3 text-sm font-medium text-primary-soft transition-colors duration-200 hover:border-primary/60 hover:bg-surface-raised"
                >
                  <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  <span>Download CV</span>
                </motion.a>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={staggerItemTight}
              className="flex flex-wrap items-center gap-4 pt-4 text-xs text-body"
            >
              <div className="flex items-center gap-2">
                {[
                  { href: PERSONAL_INFO.github, label: 'GitHub', Icon: GitHubIcon, hover: 'hover:text-heading' },
                  { href: PERSONAL_INFO.linkedin, label: 'LinkedIn', Icon: LinkedInIcon, hover: 'hover:text-primary-soft' },
                ].map(({ href, label, Icon, hover }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} profile`}
                    title={label}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className={`rounded-lg border border-line bg-surface/80 p-2 text-body transition-colors duration-200 hover:border-line ${hover}`}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
                <motion.a
                  href={PERSONAL_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  title="WhatsApp"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="rounded-lg border border-line bg-surface/80 p-2 text-body transition-colors duration-200 hover:border-line hover:text-ok"
                >
                  <MessageCircle className="h-4 w-4" />
                </motion.a>
              </div>

              <div className="hidden h-4 w-px bg-line sm:block" />

              <motion.button
                onClick={handleCopyEmail}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="group inline-flex items-center gap-2 rounded-lg border border-line-soft bg-surface/60 px-3 py-1.5 font-mono text-xs text-body transition-colors duration-200 hover:border-line hover:bg-surface-raised"
                title="Click to copy email address"
              >
                <span>{PERSONAL_INFO.email}</span>
                <AnimatePresence mode="wait" initial={false}>
                  {copiedEmail ? (
                    <motion.span
                      key="check"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Copy className="h-3.5 w-3.5 text-muted group-hover:text-body" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: abstract workspace.
              Entrance lives on the outer element, scroll-parallax on the inner one,
              so the two transforms compose instead of fighting over `y`. */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 26, scale: 0.985 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.8, ease: EASE_OUT },
              },
            }}
            onPointerMove={handleTilt}
            onPointerLeave={resetTilt}
            style={{ perspective: 1000 }}
            className="lg:col-span-5"
          >
            <motion.div
              style={
                prefersReduced
                  ? undefined
                  : { y: panelY, opacity: panelOpacity, rotateX, rotateY, transformStyle: 'preserve-3d' }
              }
              className="relative overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-2xl shadow-primary-strong/10 backdrop-blur-md"
            >
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-line-soft bg-ink/60 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-400/70" />
                  <span className="h-3 w-3 rounded-full bg-amber-300/70" />
                  <span className="h-3 w-3 rounded-full bg-ok/80" />
                </div>

                <div className="flex items-center gap-1 rounded-lg border border-line-soft bg-ink p-0.5 font-mono text-[11px]">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeCodeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveCodeTab(tab.id);
                          setTerminalOutput(null);
                        }}
                        className={`relative flex items-center gap-1 rounded px-2.5 py-1 transition-colors duration-200 ${
                          isActive ? `${tab.active} font-medium` : 'text-body hover:text-heading'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="hero-tab"
                            className="absolute inset-0 -z-10 rounded bg-surface-raised"
                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          />
                        )}
                        {Icon && <Icon className={`h-3 w-3 ${tab.accent}`} />}
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <motion.button
                  onClick={handleRunCode}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                  className="rounded p-1 text-body transition-colors hover:bg-surface-raised hover:text-primary"
                  title="Run code snippet"
                  aria-label="Run code snippet"
                >
                  <Play className="h-3.5 w-3.5" />
                </motion.button>
              </div>

              {/* Code body — cross-fades between tabs */}
              <div className="min-h-[220px] overflow-x-auto bg-ink p-4 font-mono text-[12px] leading-relaxed text-body">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.pre
                    key={activeCodeTab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className="selection:bg-primary/30"
                  >
                    <code>{codeSnippets[activeCodeTab]}</code>
                  </motion.pre>
                </AnimatePresence>
              </div>

              {/* Terminal strip */}
              <div className="flex items-center justify-between border-t border-line-soft bg-ink/90 px-4 py-2.5 font-mono text-[11px] text-body">
                <div className="flex items-center gap-2 overflow-hidden truncate">
                  <Terminal className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={terminalOutput ?? 'idle'}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.22, ease: EASE_OUT }}
                      className="truncate"
                    >
                      {terminalOutput ? (
                        <span className="text-primary-soft">{terminalOutput}</span>
                      ) : (
                        <span className="text-muted">$ status: building and studying in Lahore 🇵🇰</span>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <button
                  onClick={handleRunCode}
                  className="ml-2 shrink-0 text-[10px] text-muted underline transition-colors hover:text-primary"
                >
                   Run
                 </button>
               </div>
             </motion.div>

            {/* Quick facts */}
            <motion.div
              variants={staggerContainer(0.07, 0.35)}
              className="mt-4 grid grid-cols-3 gap-2 text-center text-xs"
            >
              {[
                { label: 'Role', value: 'CS Student' },
                { label: 'Location', value: 'Lahore, PK' },
                { label: 'Focus', value: 'Python & AI' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItemTight}
                  className="rounded-xl border border-line-soft bg-surface/60 p-2.5 transition-colors duration-200 hover:border-line"
                >
                  <span className="block font-mono text-[10px] uppercase text-muted">{stat.label}</span>
                  <span className="font-semibold text-heading">{stat.value}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
