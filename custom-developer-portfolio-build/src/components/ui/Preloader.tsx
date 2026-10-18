import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { EASE_OUT } from '../../lib/motion';

interface PreloaderProps {
  /** Called when the intro ends (or is skipped). The parent removes the component via AnimatePresence. */
  onFinish: () => void;
}

/**
 * Set to false to play the full intro on every page load.
 * While true, a refresh inside the same browser tab gets a quick 0.6s fade instead.
 */
const PLAY_ONCE_PER_SESSION = true;
const SEEN_KEY = 'sf-intro-seen';

/** Dot-matrix source baked from the profile photo (background removed, edges and rim-light boosted). */
const HOLOGRAM_SRC = '/images/hologram.png';

// Timeline of the full intro, in milliseconds.
const T_NAME = 1300; // dot → first name
const T_TITLE = 2800; // first name → "PORTFOLIO", hologram starts to materialise
const T_META = 5200; // top bar, role line
const T_END = 8000; // curtain lifts
const FORM_MS = 1900; // how long one dot takes to travel into place
const TAU = Math.PI * 2;

const readSeen = (): boolean => {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

const markSeen = (): void => {
  try {
    window.sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage can be blocked (private mode); the intro simply plays again next time */
  }
};

/* ───────────────────────── hologram helpers ───────────────────────── */

interface Dot {
  gx: number;
  gy: number;
  v: number;
  bucket: number;
  rx: number;
  ry: number;
  delay: number;
  ph: number;
  tx: number;
  ty: number;
  sx: number;
  sy: number;
  r: number;
}

type RGB = [number, number, number];
const LOW: RGB = [227, 154, 42]; // primary-strong
const MID: RGB = [242, 177, 76]; // primary
const HIGH: RGB = [251, 243, 230]; // heading cream

const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

// Eleven pre-built colours; dots are sorted by bucket so fillStyle changes at most eleven times a frame.
const BUCKET_COLORS: string[] = Array.from({ length: 11 }, (_, i) => {
  const v = i / 10;
  const c = v < 0.55 ? mix(LOW, MID, v / 0.55) : mix(MID, HIGH, (v - 0.55) / 0.45);
  return `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`;
});

const easeInOut = (x: number): number => {
  const t = Math.max(0, Math.min(1, x));
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/* ───────────────────────── full cinematic intro ───────────────────────── */

type Phase = 'dot' | 'name' | 'title';

const WORD_GRADIENT: React.CSSProperties = {
  backgroundImage: 'linear-gradient(180deg, #FBF3E6 0%, #CDBFAE 55%, #7A6A58 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
  fontSize: 'clamp(44px, 14vw, 200px)',
};

const Word: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    aria-hidden="true"
    initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE_OUT } }}
    exit={{ opacity: 0, y: -14, filter: 'blur(6px)', transition: { duration: 0.3 } }}
    className="select-none whitespace-nowrap text-center font-sans font-extrabold uppercase leading-none tracking-tighter"
    style={WORD_GRADIENT}
  >
    {children}
  </motion.div>
);

const CinematicIntro: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const formStartRef = useRef(0);
  const doneRef = useRef(false);
  const onFinishRef = useRef(onFinish);
  const [phase, setPhase] = useState<Phase>('dot');
  const [showMeta, setShowMeta] = useState(false);

  // Keep the latest callback in a ref so a parent re-render never restarts the clock.
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    markSeen();
    onFinishRef.current();
  }, []);

  // Timeline + keyboard skip.
  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase('name'), T_NAME),
      window.setTimeout(() => {
        setPhase('title');
        formStartRef.current = performance.now();
      }, T_TITLE),
      window.setTimeout(() => setShowMeta(true), T_META),
      window.setTimeout(finish, T_END),
    ];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener('keydown', onKey);
    };
  }, [finish]);

  // Hologram: sample the baked dot map, then fly the dots into place and keep them alive.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = window.innerWidth < 700 ? 64 : 96;
    let W = 0;
    let H = 0;
    let ox = 0;
    let oy = 0;
    let dispW = 0;
    let dispH = 0;
    let aspect = 1;
    let dots: Dot[] = [];
    let raf = 0;
    let cancelled = false;

    // glitch state
    let nextGlitch = 0;
    let gUntil = 0;
    let gY = 0;
    let gH = 0;
    let gDx = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Bust anchored to the bottom edge, as tall as fits.
      dispH = Math.min(H * 0.9, (W * 1.04) / aspect);
      dispW = dispH * aspect;
      ox = (W - dispW) / 2;
      oy = H - dispH;
      const cell = dispW / cols;

      for (const d of dots) {
        d.tx = ox + (d.gx + 0.5) * cell;
        d.ty = oy + (d.gy + 0.5) * cell;
        d.sx = d.tx + d.rx * W * 0.5;
        d.sy = d.ty + d.ry * H * 0.5;
        d.r = cell * (0.16 + 0.36 * d.v);
      }
    };

    const build = (img: HTMLImageElement) => {
      const off = document.createElement('canvas');
      off.width = img.naturalWidth;
      off.height = img.naturalHeight;
      const octx = off.getContext('2d', { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(img, 0, 0);
      const data = octx.getImageData(0, 0, off.width, off.height).data;
      aspect = off.width / off.height;

      const sample = (x: number, y: number): number => {
        const px = Math.min(off.width - 1, Math.max(0, Math.round(x)));
        const py = Math.min(off.height - 1, Math.max(0, Math.round(y)));
        return data[(py * off.width + px) * 4] / 255;
      };

      const cell = off.width / cols;
      const rows = Math.floor(off.height / cell);
      const q = cell * 0.28;
      const next: Dot[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = (c + 0.5) * cell;
          const cy = (r + 0.5) * cell;
          const v =
            (sample(cx, cy) * 2 + sample(cx - q, cy) + sample(cx + q, cy) + sample(cx, cy - q) + sample(cx, cy + q)) / 6;
          if (v <= 0.07) continue;
          next.push({
            gx: c,
            gy: r,
            v,
            bucket: Math.round(v * 10),
            rx: Math.random() * 2 - 1,
            ry: Math.random() * 2 - 1,
            // Top rows land first, so the figure scans in from the head down.
            delay: Math.min(0.4, (r / rows) * 0.28 + Math.random() * 0.12),
            ph: Math.random() * TAU,
            tx: 0,
            ty: 0,
            sx: 0,
            sy: 0,
            r: 0,
          });
        }
      }
      next.sort((a, b) => a.bucket - b.bucket);
      dots = next;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, W, H);
      if (dots.length === 0) return;

      const t0 = formStartRef.current;
      const elapsed = t0 ? now - t0 : -1;
      const formed = elapsed > FORM_MS * 1.4;

      if (formed && now > nextGlitch) {
        gUntil = now + 110;
        gY = oy + Math.random() * dispH * 0.8;
        gH = 14 + Math.random() * 54;
        gDx = (Math.random() - 0.5) * 18;
        nextGlitch = now + 1400 + Math.random() * 1800;
      }
      const glitching = now < gUntil;
      const flicker = glitching ? 0.78 : 0.94 + 0.06 * Math.sin(now / 55);
      const scanY = oy + ((now / 2600) % 1) * dispH;

      let lastBucket = -1;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const drift = now / 1700 + d.ph;
        const bx = d.sx + Math.cos(drift) * 6;
        const by = d.sy + Math.sin(drift * 1.2) * 6;
        const k = elapsed >= 0 ? easeInOut(elapsed / FORM_MS - d.delay) : 0;

        let x = bx + (d.tx - bx) * k;
        let y = by + (d.ty - by) * k;
        let alpha = (0.08 + 0.92 * k) * (0.5 + 0.5 * d.v);
        let r = d.r * (0.45 + 0.55 * k);

        if (k >= 1) {
          x += Math.sin(now / 420 + d.ph * 3) * 0.5;
          const dy = Math.abs(y - scanY);
          if (dy < 24) {
            const b = 1 - dy / 24;
            alpha += 0.55 * b;
            r *= 1 + 0.5 * b;
          }
          if (glitching && y > gY && y < gY + gH) x += gDx;
        }

        ctx.globalAlpha = Math.min(1, alpha * flicker);
        if (d.bucket !== lastBucket) {
          ctx.fillStyle = BUCKET_COLORS[d.bucket];
          lastBucket = d.bucket;
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, TAU);
        ctx.fill();
      }

      // The scan bar itself.
      if (elapsed > FORM_MS) {
        const fade = Math.min(1, (elapsed - FORM_MS) / 600);
        const g = ctx.createLinearGradient(ox, 0, ox + dispW, 0);
        g.addColorStop(0, 'rgba(242,177,76,0)');
        g.addColorStop(0.5, 'rgba(251,217,160,0.6)');
        g.addColorStop(1, 'rgba(242,177,76,0)');
        ctx.globalAlpha = fade;
        ctx.fillStyle = g;
        ctx.fillRect(ox, scanY - 1, dispW, 2);
      }
      ctx.globalAlpha = 1;
    };

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      build(img);
      resize();
    };
    img.src = HOLOGRAM_SRC;

    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Warm glow the hologram "projects" onto */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 60% at 50% 78%, rgba(242,177,76,0.16), transparent 70%)' }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      {/* CRT scanlines + vignette sell the projection */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.85) 0px, rgba(0,0,0,0.85) 1px, transparent 1px, transparent 3px)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(10,8,6,0.75) 100%)' }}
      />

      {/* Stage 1: dot and arc */}
      <AnimatePresence>
        {phase === 'dot' && (
          <motion.div
            key="loader"
            className="absolute inset-0 z-10 flex items-center justify-center"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative h-24 w-24">
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              >
                <path d="M 50 4 A 46 46 0 0 1 96 50" fill="none" stroke="#FBD9A0" strokeWidth="3" strokeLinecap="round" />
              </motion.svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="block h-3.5 w-3.5 rounded-full bg-heading"
                  style={{ boxShadow: '0 0 20px rgba(251,217,160,0.8)' }}
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2 and 3: name, then PORTFOLIO in front of the hologram */}
      <div className="pointer-events-none absolute inset-x-0 top-[60%] z-20 flex -translate-y-1/2 justify-center px-4">
        <AnimatePresence mode="wait">
          {phase === 'name' && <Word key="name">{PERSONAL_INFO.name.split(' ')[0]}</Word>}
          {phase === 'title' && <Word key="title">Portfolio</Word>}
        </AnimatePresence>
      </div>

      {/* Chrome that appears once the hologram has settled */}
      {showMeta && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-10 sm:py-7"
          >
            <div className="flex items-center gap-3">
              <span className="text-gradient font-display text-xl font-extrabold">{PERSONAL_INFO.monogram}</span>
              <span className="hidden font-mono text-xs tracking-[0.18em] text-heading sm:inline">
                {PERSONAL_INFO.name.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-body">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
              </span>
              {PERSONAL_INFO.availabilityStatus}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            className="absolute bottom-16 left-5 z-20 sm:bottom-8 sm:left-10"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Profile · hologram online</p>
            <p className="mt-1 text-sm font-semibold text-heading sm:text-lg">
              {PERSONAL_INFO.roles[0]} <span className="text-muted">·</span> {PERSONAL_INFO.roles[2]}
            </p>
          </motion.div>
        </>
      )}

      <motion.button
        type="button"
        onClick={finish}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-5 right-5 z-30 rounded-full border border-line px-4 py-1.5 font-mono text-[11px] tracking-wider text-muted transition-colors hover:border-primary hover:text-heading focus-visible:border-primary focus-visible:text-heading focus-visible:outline-none sm:bottom-8 sm:right-10"
      >
        Skip intro
      </motion.button>

      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: T_END / 1000, ease: 'linear' }}
        className="absolute bottom-0 left-0 z-30 h-[2px] w-full origin-left bg-gradient-to-r from-primary to-accent"
      />
    </div>
  );
};

/* ───────────────────────── quick intro (repeat visits, reduced motion) ───────────────────────── */

const QuickIntro: React.FC<{ onFinish: () => void; reduced: boolean }> = ({ onFinish, reduced }) => {
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const id = window.setTimeout(() => onFinishRef.current(), reduced ? 150 : 650);
    return () => window.clearTimeout(id);
  }, [reduced]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="text-gradient font-display text-4xl font-extrabold tracking-wide"
      >
        {PERSONAL_INFO.monogram}
      </motion.span>
    </div>
  );
};

/* ───────────────────────── public component ───────────────────────── */

/**
 * Intro sequence: a dot and arc, the first name, then PORTFOLIO while a dot-matrix
 * hologram of the profile photo materialises behind it. Plays in full once per session;
 * repeat visits and reduced-motion users get a quick fade. The screen then lifts away like a curtain.
 */
export const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const prefersReduced = useReducedMotion();
  const [quick] = useState(() => Boolean(prefersReduced) || (PLAY_ONCE_PER_SESSION && readSeen()));

  return (
    <motion.div
      exit={prefersReduced ? { opacity: 0 } : { y: '-100%' }}
      transition={{ duration: prefersReduced ? 0.15 : 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] overflow-hidden bg-ink"
      role="status"
      aria-label="Loading portfolio"
    >
      {quick ? (
        <QuickIntro onFinish={onFinish} reduced={Boolean(prefersReduced)} />
      ) : (
        <CinematicIntro onFinish={onFinish} />
      )}
    </motion.div>
  );
};
