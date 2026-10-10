import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { Certificates } from './components/Certificates';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { CurrentlyLearning } from './components/CurrentlyLearning';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';
import { CommandMenu } from './components/CommandMenu';
import { ToastContainer, ToastMessage } from './components/Toast';
import { AmbientBackground } from './components/ui/AmbientBackground';
import { Preloader } from './components/ui/Preloader';
import { Project } from './types';
import { PROJECTS_DATA } from './data/portfolioData';
import { playSubtleClick } from './utils/audio';

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactSubject, setContactSubject] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // 'loading' → preloader mounted; 'ready' → preloader removed (exit plays) and hero released.
  const [hasLoaded, setHasLoaded] = useState(false);

  const anyOverlayOpen = isResumeOpen || isCommandOpen || Boolean(selectedProject);

  const addToast = useCallback((text: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, text, type }]);
    playSubtleClick(type === 'success' ? 'success' : 'click');

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Global shortcuts: ⌘K / Ctrl+K toggles the palette, Escape dismisses overlays.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
        playSubtleClick('pop');
        return;
      }

      if (e.key === 'Escape') {
        setIsCommandOpen(false);
        setIsResumeOpen(false);
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cursor spotlight: one delegated listener feeds --mx / --my to whichever
  // `.spotlight` card the pointer is over, so cards need no handlers of their own.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>('.spotlight');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

  // Lock background scrolling while an overlay or the preloader is visible.
  useEffect(() => {
    document.body.style.overflow = anyOverlayOpen || !hasLoaded ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [anyOverlayOpen, hasLoaded]);

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setContactSubject(`Inquiry regarding ${serviceTitle}`);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    addToast(`Selected service: "${serviceTitle}"`, 'info');
  };

  const handleSelectProjectById = (projectId: string) => {
    const found = PROJECTS_DATA.find((p) => p.id === projectId);
    if (found) {
      setSelectedProject(found);
      playSubtleClick('click');
    }
  };

  return (
    // reducedMotion="user" strips transform/layout animation for users who ask for it,
    // leaving clean opacity fades instead of removing feedback entirely.
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen flex-col font-sans text-body selection:bg-primary/20 selection:text-primary-soft">
        <AmbientBackground />

        <Navbar
          isReady={hasLoaded}
          onOpenResume={() => {
            setIsResumeOpen(true);
            playSubtleClick('click');
          }}
          onOpenCommand={() => {
            setIsCommandOpen(true);
            playSubtleClick('pop');
          }}
        />

        <main className="flex-1">
          <Hero onShowToast={addToast} isReady={hasLoaded} />
          <TechMarquee />
          <About />
          <Skills />
          <Projects
            onSelectProject={(project) => {
              setSelectedProject(project);
              playSubtleClick('click');
            }}
          />
          <Services onSelectServiceForContact={handleSelectServiceForContact} />
          <CurrentlyLearning />
          <Certificates />
          <Contact initialSubject={contactSubject} onShowToast={addToast} />
        </main>

        <Footer />

        {/* Preloader: removing it lets AnimatePresence run the fade-out */}
        <AnimatePresence>
          {!hasLoaded && <Preloader key="preloader" onFinish={() => setHasLoaded(true)} />}
        </AnimatePresence>

        {/* Overlays mount/unmount through AnimatePresence so they animate both ways */}
        <AnimatePresence>
          {isResumeOpen && (
            <ResumeModal key="resume" onClose={() => setIsResumeOpen(false)} onShowToast={addToast} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              key={selectedProject.id}
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              onShowToast={addToast}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isCommandOpen && (
            <CommandMenu
              key="command"
              onClose={() => setIsCommandOpen(false)}
              onOpenResume={() => {
                setIsResumeOpen(true);
                playSubtleClick('click');
              }}
              onSelectProject={handleSelectProjectById}
              onShowToast={addToast}
            />
          )}
        </AnimatePresence>

        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    </MotionConfig>
  );
}

export default App;
