'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/* =====================================================================
 * HeroFrameAnimation — Apple-quality scroll-triggered frame animation
 *
 * PERFORMANCE ARCHITECTURE:
 * ─ All 192 frames preloaded as Image objects before interaction
 * ─ HTML5 Canvas with drawImage() (not img tag swapping)
 * ─ requestAnimationFrame for all scroll-linked rendering
 * ─ IntersectionObserver gates the rAF loop (only active when visible)
 * ─ Framer Motion useMotionValue → useTransform for text overlays
 *   (updates DOM directly via motion values — zero React re-renders)
 * ─ Canvas on GPU compositing layer (will-change + translateZ(0))
 * ─ Frame index cached — skips drawImage when index unchanged
 * ─ Canvas 2d context: alpha:false for compositing optimization
 * ===================================================================== */

const TOTAL_FRAMES = 192;
const SCROLL_SCREENS = 5; // 500vh scroll runway

/** Public path for frame i (0-indexed → 1-indexed, zero-padded to 3). */
const frameSrc = (i) =>
  `/images/Hero/frame-${String(i + 1).padStart(3, '0')}.webp`;

/** Entrance animation easing — matches original Hero.jsx */
const EASE = [0.22, 1, 0.36, 1];

/** Headline data for Phase 1 clip-reveal */
const HEADLINE = [
  { text: 'Hadirkan', accent: false },
  { text: 'Kemewahan', accent: true },
  { text: 'di Ruang Anda.', accent: false },
];

export default function HeroFrameAnimation() {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [loadPct, setLoadPct] = useState(0);
  const [revealed, setRevealed] = useState(false); // entrance animations gate

  /* ── Refs ─────────────────────────────────────────────────── */
  const canvasRef = useRef(null);
  const sectionRef = useRef(null); // outer 500vh scroll runway
  const ctxRef = useRef(null);     // cached canvas 2d context
  const framesRef = useRef([]);    // preloaded Image objects
  const lastIdxRef = useRef(-1);   // last drawn frame (skip redraw if same)
  const rafRef = useRef(0);        // rAF handle for cleanup

  /* ── Scroll progress as Framer Motion value ────────────────
   * Updated imperatively in the rAF loop. Drives all text overlay
   * transitions without any React state updates / re-renders.     */
  const scrollProg = useMotionValue(0);

  /* ── Phase 1 (0%–32%): visible at start, fades out ────────
   * Panels 1–2 of 6 are in the spotlight.
   * Shows full hero text: eyebrow, headline, body, CTAs.         */
  const p1Op = useTransform(scrollProg, [0, 0.22, 0.32], [1, 1, 0]);
  const p1Y  = useTransform(scrollProg, [0, 0.22, 0.32], [0, 0, -20]);

  /* ── Phase 2 (35%–65%): fade in → hold → fade out ─────────
   * The kinetic wave ripples across panels 3–4.
   * "Dari Pemilihan Material, hingga Pemasangan Sempurna."       */
  const p2Op = useTransform(scrollProg, [0.35, 0.42, 0.58, 0.65], [0, 1, 1, 0]);
  const p2Y  = useTransform(scrollProg, [0.35, 0.42, 0.58, 0.65], [20, 0, 0, -20]);

  /* ── Phase 3 (70%–100%): fade in, hold through end ────────
   * Final fluted panel locks into the lit position.
   * "Interior Cepat Beres !"                                     */
  const p3Op = useTransform(scrollProg, [0.70, 0.78], [0, 1]);
  const p3Y  = useTransform(scrollProg, [0.70, 0.78], [20, 0]);

  /* ── Scroll indicator: fades quickly on first scroll ────── */
  const scrollIndOp = useTransform(scrollProg, [0, 0.04], [0.55, 0]);

  /* ══════════════════════════════════════════════════════════════
   * drawFrame — render a single frame to canvas with cover-fit
   *
   * Works in physical pixel space (canvas.width includes dpr)
   * so the image renders at native retina resolution.
   * ══════════════════════════════════════════════════════════════ */
  const drawFrame = useCallback((index) => {
    const ctx = ctxRef.current;
    const img = framesRef.current[index];
    if (!ctx || !img || !img.naturalWidth) return;

    const cvs = canvasRef.current;
    const cw = cvs.width;
    const ch = cvs.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // object-fit: cover — scale to fill canvas, then center-crop
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) * 0.5, (ch - dh) * 0.5, dw, dh);
  }, []);

  /* ══════════════════════════════════════════════════════════════
   * 1. PRELOAD — load all 192 frames into memory before interaction
   * ══════════════════════════════════════════════════════════════ */
  useEffect(() => {
    let loaded = 0;
    const imgs = new Array(TOTAL_FRAMES);

    const tasks = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          imgs[i] = img;
          loaded++;
          setLoadPct(Math.floor((loaded / TOTAL_FRAMES) * 100));
          resolve();
        };
        img.src = frameSrc(i);
      })
    );

    Promise.all(tasks).then(() => {
      framesRef.current = imgs;
      setLoading(false);
    });
  }, []);

  /* ══════════════════════════════════════════════════════════════
   * 2. CANVAS SIZING — retina-aware, responsive to viewport resize
   *
   * Sets canvas pixel buffer to viewport × devicePixelRatio.
   * CSS stays at 100% via w-full h-full — browser scales down
   * the high-res buffer for crisp rendering on retina displays.
   * ══════════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (loading) return;
    const cvs = canvasRef.current;
    if (!cvs) return;

    // Cache context once. alpha:false → compositor skips alpha blending.
    ctxRef.current = cvs.getContext('2d', { alpha: false });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      cvs.width = window.innerWidth * dpr;
      cvs.height = window.innerHeight * dpr;
      drawFrame(Math.max(0, lastIdxRef.current));
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loading, drawFrame]);

  /* ══════════════════════════════════════════════════════════════
   * 3. SCROLL → FRAME SYNC (the core animation loop)
   *
   * IntersectionObserver gates the entire system:
   *   visible → attach passive scroll listener + start rAF loop
   *   hidden  → detach + cancel (saves resources on rest of page)
   *
   * Passive scroll listener ensures we never block the main thread.
   * rAF reads getBoundingClientRect for sub-pixel accuracy, maps
   * scroll progress [0,1] → frame index [0,191], draws only when
   * the index actually changed.
   * ══════════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (loading) return;
    const section = sectionRef.current;
    if (!section) return;

    let active = false;

    /* rAF tick — decoupled from scroll events for jank-free rendering */
    const tick = () => {
      if (!active) return;

      const rect = section.getBoundingClientRect();
      const range = section.offsetHeight - window.innerHeight;
      const t = Math.max(0, Math.min(1, -rect.top / range));

      // Drive text overlay transforms (no React re-render)
      scrollProg.set(t);

      // Map progress → frame index. Math.floor prevents flickering.
      const idx = Math.min(TOTAL_FRAMES - 1, Math.floor(t * TOTAL_FRAMES));

      // Only call drawImage when the frame actually changed
      if (idx !== lastIdxRef.current) {
        drawFrame(idx);
        lastIdxRef.current = idx;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    /* Passive scroll listener — never blocks the main thread */
    const onScroll = () => {};

    /* IntersectionObserver — only run rAF when section is in view */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          active = true;
          window.addEventListener('scroll', onScroll, { passive: true });
          rafRef.current = requestAnimationFrame(tick);
        } else {
          active = false;
          window.removeEventListener('scroll', onScroll);
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0 },
    );

    observer.observe(section);

    return () => {
      active = false;
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [loading, drawFrame, scrollProg]);

  /* ══════════════════════════════════════════════════════════════
   * 4. DRAW FIRST FRAME once preloading completes
   * ══════════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (!loading && lastIdxRef.current < 0) {
      drawFrame(0);
      lastIdxRef.current = 0;
    }
  }, [loading, drawFrame]);

  /* ══════════════════════════════════════════════════════════════
   * 5. REVEAL — gate entrance animations until loading screen
   *    starts fading. Gives a cinematic "curtain lift" effect.
   * ══════════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setRevealed(true), 250);
      return () => clearTimeout(t);
    }
  }, [loading]);

  /* ═══════════════════════════════════════════════════════════ */
  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative"
      style={{ height: `${SCROLL_SCREENS * 100}vh`, background: '#000' }}
    >
      {/* ── Sticky viewport (pinned at top:0 while scrolling the runway) ── */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{
          height: '100dvh',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        {/* ── Loading screen ── */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loader"
              className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-black"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <p className="text-sm font-medium tracking-[0.35em] text-white/40">
                {loadPct}%
              </p>
              <div className="h-[1px] w-48 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300"
                  style={{
                    width: `${loadPct}%`,
                    transition: 'width 120ms ease-out',
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Canvas (GPU-composited) ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)',
            background: '#000',
          }}
        />

        {/* ── Vignette overlays for text readability ── */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(0deg, rgba(0,0,0,0.45) 0%, transparent 25%, transparent 80%, rgba(0,0,0,0.35) 100%)',
          }}
        />

        {/* ═══════════════════════════════════════════════════════════
         *  PHASE 1 — Left-aligned hero intro (0% – 32%)
         *  Panels 1-2 are in the spotlight.
         *
         *  Text matches original Hero.jsx exactly:
         *  eyebrow pill, clip-reveal headline with italic amber
         *  gradient "Kemewahan", body copy, dual CTAs.
         * ═══════════════════════════════════════════════════════════ */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 flex items-center"
          style={{ opacity: p1Op, y: p1Y }}
        >
          <div className="pointer-events-auto mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 sm:px-8 lg:px-12">
            {/* Eyebrow pill — identical to Hero.jsx */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={revealed ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-amber-400/20 bg-amber-400/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/80"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400 shadow-[0_0_8px_rgba(173,158,143,0.8)]" />
              Studio Desain Interior · Sejak 2018
            </motion.div>

            {/* Headline — clip-reveal per line, identical to Hero.jsx */}
            <h1 className="flex flex-col gap-0 text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[82px]">
              {HEADLINE.map(({ text, accent }, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: '105%' }}
                    animate={revealed ? { y: '0%' } : false}
                    transition={{
                      duration: 0.85,
                      ease: EASE,
                      delay: i * 0.11,
                    }}
                  >
                    {accent ? (
                      <span className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200">
                        {text}
                      </span>
                    ) : (
                      text
                    )}
                  </motion.span>
                </div>
              ))}
            </h1>

            {/* Body copy */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={revealed ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, ease: EASE, delay: 0.38 }}
              className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            >
              wallpanels.id menghadirkan solusi wall panel elegan untuk hunian,
              ruang komersial, dan tempat kerja modern — dari pemilihan material
              hingga pemasangan sempurna.
            </motion.p>

            {/* CTAs — identical to Hero.jsx */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={revealed ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, ease: EASE, delay: 0.48 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 px-7 py-3.5 text-sm font-bold text-black shadow-[0_0_50px_rgba(173,158,143,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_80px_rgba(173,158,143,0.65)]"
              >
                Hubungi Kami
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#portfolio-product"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
              >
                Lihat Koleksi
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
         *  PHASE 2 — Center-aligned mid-roll (35% – 65%)
         *  The kinetic wave is rippling across panels 3-4.
         *  Matches the "material selection" narrative.
         * ═══════════════════════════════════════════════════════════ */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center"
          style={{ opacity: p2Op, y: p2Y }}
        >
          <div className="pointer-events-auto max-w-4xl">
            <h2 className="flex flex-col gap-0 text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              <span>Dari Pemilihan</span>
              <span className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200">
                Material,
              </span>
              <span>hingga Pemasangan</span>
              <span>Sempurna.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              Material WPC tahan air, tahan rayap, tanpa perawatan khusus.
            </p>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
         *  PHASE 3 — Center-aligned finale (70% – 100%)
         *  The fluted profile panel has risen and locked into place.
         *  Brand tagline + CTA.
         * ═══════════════════════════════════════════════════════════ */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center"
          style={{ opacity: p3Op, y: p3Y }}
        >
          <div className="pointer-events-auto max-w-4xl">
            <h2 className="text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[82px]">
              Interior{' '}
              <span className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200">
                Cepat Beres
              </span>{' '}
              !
            </h2>
            <div className="mt-8 flex flex-col items-center gap-2">
              <motion.div
                className="flex flex-col items-center gap-2 text-white/40"
                animate={reduce ? {} : { opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Gulir ke bawah</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Scroll indicator — identical to Hero.jsx ── */}
        <motion.div
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/30"
          style={{ opacity: scrollIndOp }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Gulir</span>
          <div className="h-10 w-px overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-amber-400/70 to-transparent"
              animate={reduce ? {} : { y: ['-100%', '100%'] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
