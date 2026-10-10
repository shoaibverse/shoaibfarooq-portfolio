import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, CheckCircle, Code, Layers, Sparkles, Activity, Play, Copy, Check } from 'lucide-react';
import { GitHubIcon } from './Icons';
import { Project } from '../types';
import { EASE_OUT } from '../lib/motion';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

type TriageLevel = 'Priority 1 (Critical)' | 'Priority 2 (Urgent)' | 'Priority 3 (Stable)';

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive' | 'architecture'>('overview');

  // Interactive mini sandbox state for Chhote Tools
  const [jsonInput, setJsonInput] = useState(
    '{"name":"Shoaib Farooq","role":"Computer Science Student","skills":["React","Python","Next.js","AI APIs"],"active":true}'
  );
  const [jsonFormatted, setJsonFormatted] = useState('');
  const [copiedJson, setCopiedJson] = useState(false);

  // Interactive triage simulation state for VitalPulse AI
  const [triageCategory, setTriageCategory] = useState<TriageLevel>('Priority 1 (Critical)');
  const [vitalsBpm, setVitalsBpm] = useState(132);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonFormatted(JSON.stringify(parsed, null, 2));
      onShowToast('JSON formatted and validated successfully!', 'success');
    } catch {
      onShowToast('Invalid JSON syntax provided', 'error');
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonFormatted || jsonInput);
    setCopiedJson(true);
    onShowToast('Copied to clipboard', 'success');
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleRunTriageSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const scenarios: Array<{ cat: TriageLevel; bpm: number }> = [
        { cat: 'Priority 1 (Critical)', bpm: 142 },
        { cat: 'Priority 2 (Urgent)', bpm: 104 },
        { cat: 'Priority 3 (Stable)', bpm: 76 },
      ];
      const random = scenarios[Math.floor(Math.random() * scenarios.length)];
      setTriageCategory(random.cat);
      setVitalsBpm(random.bpm);
      setIsSimulating(false);
      onShowToast('Telemetry updated with AI assessment', 'info');
    }, 600);
  };

  const tabs = [
    { id: 'overview' as const, label: 'Overview & Visuals' },
    { id: 'architecture' as const, label: 'Architecture & Stack' },
  ];

  const detailBlocks = [
    { key: 'frontend', icon: Code, label: 'Frontend Stack', color: 'text-primary', mono: true },
    { key: 'backendOrAI', icon: Sparkles, label: 'Backend / AI Workflows', color: 'text-accent', mono: true },
    { key: 'styling', icon: Layers, label: 'Styling & Aesthetics', color: 'text-primary-soft', mono: false },
    { key: 'architecture', icon: Activity, label: 'Design Architecture', color: 'text-accent-soft', mono: false },
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
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.32, ease: EASE_OUT }}
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-surface text-heading shadow-2xl shadow-black/50"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-line-soft bg-surface/90 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-primary/20 bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-primary-soft">
              {project.category}
            </span>
            <h2 className="max-w-xs truncate text-base font-bold text-heading sm:max-w-md sm:text-lg">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-raised hover:text-heading"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sub Navigation Bar inside Modal */}
        <div className="flex shrink-0 items-center gap-2 border-b border-line-soft bg-ink/40 px-6 pt-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative border-b-2 px-3 py-2 text-xs font-semibold transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-primary text-primary-soft'
                  : 'border-transparent text-body hover:text-heading'
              }`}
            >
              {tab.label}
            </button>
          ))}

          {(project.id === 'chhote-tools' || project.id === 'vitalpulse-ai') && (
            <button
              onClick={() => setActiveTab('interactive')}
              className={`relative flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold transition-colors duration-200 ${
                activeTab === 'interactive'
                  ? 'border-primary text-primary-soft'
                  : 'border-transparent text-body hover:text-heading'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Live Interactive Sandbox</span>
            </button>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="space-y-6 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Hero Mockup Preview */}
              <div className="group relative overflow-hidden rounded-xl border border-line-soft bg-ink shadow-inner">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="h-64 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] sm:h-80"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-xs text-body">
                  <span className="rounded border border-line bg-ink/60 px-2.5 py-1 font-mono backdrop-blur-md">
                    Screenshot: {project.title}
                  </span>
                  <span className="rounded border border-line bg-ink/60 px-2.5 py-1 backdrop-blur-md">
                    Verified Layout
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="mb-2 text-base font-semibold text-heading">About the Project</h3>
                <p className="text-sm leading-relaxed text-body">{project.fullDescription}</p>
              </div>

              {/* Key Technical Highlights */}
              <div>
                <h3 className="mb-3 text-base font-semibold text-heading">Key Features &amp; Objectives</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {project.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2.5 rounded-xl border border-line-soft bg-ink/40 p-3 text-sm text-body"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Tags */}
              <div>
                <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-line bg-ink px-3 py-1 font-mono text-xs text-body"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-base font-semibold text-heading">System &amp; Implementation Overview</h3>
                <p className="text-sm leading-relaxed text-body">
                  Designed with an emphasis on modularity, responsive user experience, and practical software design.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {detailBlocks.map(({ key, icon: Icon, label, color, mono }) => {
                  const value = project.techDetails[key as keyof typeof project.techDetails];
                  if (!value) return null;

                  return (
                    <div key={key} className="rounded-xl border border-line-soft bg-ink/40 p-4">
                      <div
                        className={`mb-2 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider ${color}`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </div>
                      <p className={`text-sm text-body ${mono ? 'font-mono' : ''}`}>{value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl border border-line-soft bg-ink/60 p-4 font-mono text-xs text-muted">
                <div className="mb-1 text-muted/70">// Project Source Structure</div>
                <div>src/</div>
                <div className="pl-4">├── components/ ({project.title} modular UI)</div>
                <div className="pl-4">├── hooks/ (state &amp; data flows)</div>
                <div className="pl-4">├── styles/ (Tailwind configuration)</div>
                <div className="pl-4">└── types/ (TypeScript interfaces)</div>
              </div>
            </div>
          )}

          {activeTab === 'interactive' && (
            <div>
              {project.id === 'chhote-tools' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-heading">
                      Chhote Tools — Mini Live JSON Formatter Sandbox
                    </h3>
                    <button
                      onClick={handleFormatJson}
                      className="inline-flex items-center gap-1.5 btn-shine rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-ink transition-colors hover:bg-primary-soft"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Format &amp; Validate</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-mono text-xs text-muted">Raw JSON Input:</label>
                      <textarea
                        rows={6}
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        className="w-full rounded-lg border border-line bg-ink p-3 font-mono text-xs text-heading transition-colors focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="font-mono text-xs text-muted">Formatted Output:</label>
                        <button
                          onClick={handleCopyJson}
                          className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-heading"
                        >
                          {copiedJson ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                          <span>{copiedJson ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <pre className="h-[150px] w-full overflow-auto rounded-lg border border-line bg-ink p-3 font-mono text-xs text-primary-soft">
                        {jsonFormatted || '// Click "Format & Validate" above'}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {project.id === 'vitalpulse-ai' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-heading">
                        VitalPulse AI — Dispatch Telemetry Simulator
                      </h3>
                      <p className="mt-0.5 text-xs text-muted">
                        Test real-time emergency triage classification
                      </p>
                    </div>
                    <button
                      onClick={handleRunTriageSimulation}
                      disabled={isSimulating}
                      className="inline-flex shrink-0 items-center gap-1.5 btn-shine rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-ink transition-colors hover:bg-primary-soft disabled:opacity-50"
                    >
                      <Activity className={`h-3.5 w-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                      <span>{isSimulating ? 'Analyzing...' : 'Simulate Dispatch'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-line-soft bg-ink p-3.5">
                      <span className="mb-1 block text-xs text-muted">Triage Priority</span>
                      <span
                        className={`text-sm font-bold ${
                          triageCategory.includes('Critical')
                            ? 'text-rose-300'
                            : triageCategory.includes('Urgent')
                              ? 'text-amber-200'
                              : 'text-primary'
                        }`}
                      >
                        {triageCategory}
                      </span>
                    </div>

                    <div className="rounded-xl border border-line-soft bg-ink p-3.5">
                      <span className="mb-1 block text-xs text-muted">Telemetry Heart Rate</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-mono text-xl font-bold text-heading">{vitalsBpm}</span>
                        <span className="text-xs text-muted">BPM</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-line-soft bg-ink p-3.5">
                      <span className="mb-1 block text-xs text-muted">Hospital Bed Status</span>
                      <span className="font-mono text-xs text-primary-soft">ICU: 3 Avail / ER: 8 Avail</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-line-soft bg-ink/80 p-3 text-xs text-body">
                    <span className="font-semibold text-primary">AI Dispatch Assistant Summary:</span>
                    <p className="mt-1 text-muted">
                      Patient presenting elevated vitals. Recommended routing to City Trauma Center ER Bay 04.
                      Automated notification dispatched to incoming intake team.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="flex shrink-0 flex-col justify-between gap-3 border-t border-line-soft bg-surface/90 px-6 py-4 backdrop-blur-md sm:flex-row sm:items-center">
          <div className="text-xs text-muted">Designed &amp; Built by Shoaib Farooq</div>
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-raised px-4 py-2 text-xs font-medium text-body transition-colors hover:bg-line hover:text-heading"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              <span>View Source Code</span>
            </a>
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-shine rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-ink shadow-sm transition-colors hover:bg-primary-soft"
              >
                <span>Open Live Demo</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
