'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import AnimatedGradientText from '@/components/reactbits/AnimatedGradientText.jsx';

const SERIES = [
  {
    id: 'marble',
    title: 'Marble Series',
    tagline: 'Luxury look. Kesan marmer premium.',
    image: '/images/1.1.webp',
  },
  {
    id: 'stone',
    title: 'Stone Series',
    tagline: 'Raw and bold. Nuansa batu alam.',
    image: '/images/2.1.webp',
  },
  {
    id: 'fabric',
    title: 'Fabric Pattern',
    tagline: 'Tampilan elegan.',
    image: '/images/1.2.webp',
  },
  {
    id: 'wood',
    title: 'Wood Series',
    tagline: 'Nature look. Warm tropical vibe.',
    image: '/images/2.2.webp',
  },
  {
    id: 'metal',
    title: 'Metal Series',
    tagline: 'Industrial edge. Clean metallic finish.',
    image: '/images/1.3.webp',
  },
  {
    id: 'profile',
    title: 'Profile Panel',
    tagline: 'Dimensi 3D. Dinding jadi hidup.',
    image: '/images/2.3.webp',
  },
];

const COUNT = SERIES.length;

/* Shortest circular offset: keeps values in -2…3 range */
function getOffset(i, active) {
  let diff = i - active;
  if (diff > COUNT / 2) diff -= COUNT;
  if (diff < -COUNT / 2) diff += COUNT;
  return diff;
}

/*
 * CSS-driven coverflow styles per offset.
 * Desktop: full 3D with rotateY + perspective (looks premium).
 * Mobile:  flat 2D with translateX + scale only (no 3D = much lighter on GPU).
 * The browser compositor handles the CSS transition on the GPU — zero JS per frame.
 */
function getCardTransform(offset, isMobile) {
  const abs = Math.abs(offset);
  if (isMobile) {
    /* 2D layout — no rotateY, no perspective needed */
    if (abs === 0) return { transform: 'translateX(-50%) scale(1)', zIndex: 10, opacity: 1 };
    if (abs === 1) return { transform: `translateX(calc(-50% + ${offset * 200}px)) scale(0.85)`, zIndex: 5, opacity: 0.5 };
    if (abs === 2) return { transform: `translateX(calc(-50% + ${offset * 340}px)) scale(0.72)`, zIndex: 2, opacity: 0.2 };
    return { transform: 'translateX(-50%) scale(0.5)', zIndex: 0, opacity: 0 };
  }
  /* Desktop: full 3D coverflow */
  if (abs === 0) return { transform: 'translateX(-50%) rotateY(0deg) scale(1)', zIndex: 10, opacity: 1 };
  if (abs === 1) return { transform: `translateX(calc(-50% + ${offset * 290}px)) rotateY(${offset * -32}deg) scale(0.82)`, zIndex: 5, opacity: 0.55 };
  if (abs === 2) return { transform: `translateX(calc(-50% + ${offset * 420}px)) rotateY(${offset * -45}deg) scale(0.66)`, zIndex: 2, opacity: 0.25 };
  return { transform: 'translateX(-50%) scale(0.5)', zIndex: 0, opacity: 0 };
}

export default function Product() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pauseTimerRef = useRef(null);
  const touchRef = useRef({ startX: 0, startY: 0, swiped: false });

  /* Detect mobile once on mount + resize */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const next = useCallback(() => setActive((p) => (p + 1) % COUNT), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + COUNT) % COUNT), []);

  /* Auto-rotate */
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, next]);

  /* Pause on interaction, resume after 8s */
  const pauseAutoplay = useCallback(() => {
    setPaused(true);
    clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setPaused(false), 8000);
  }, []);

  useEffect(() => () => clearTimeout(pauseTimerRef.current), []);

  const handleInteraction = useCallback(() => {
    pauseAutoplay();
  }, [pauseAutoplay]);

  const handleClick = (i) => {
    if (i === active) return;
    setActive(i);
    handleInteraction();
  };

  /* Touch swipe */
  const onTouchStart = (e) => {
    touchRef.current = { startX: e.touches[0].clientX, startY: e.touches[0].clientY, swiped: false };
  };

  const onTouchMove = (e) => {
    if (touchRef.current.swiped) return;
    const dx = e.touches[0].clientX - touchRef.current.startX;
    const dy = e.touches[0].clientY - touchRef.current.startY;
    if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      touchRef.current.swiped = true;
      if (dx < 0) next(); else prev();
      handleInteraction();
    }
  };

  /* Mouse drag for desktop */
  const mouseRef = useRef({ startX: 0, dragging: false });

  const onMouseDown = (e) => {
    mouseRef.current = { startX: e.clientX, dragging: true };
  };

  const onMouseMove = (e) => {
    if (!mouseRef.current.dragging) return;
    const dx = e.clientX - mouseRef.current.startX;
    if (Math.abs(dx) > 50) {
      mouseRef.current.dragging = false;
      if (dx < 0) next(); else prev();
      handleInteraction();
    }
  };

  const onMouseUp = () => {
    mouseRef.current.dragging = false;
  };

  const handleDot = (i) => {
    setActive(i);
    handleInteraction();
  };

  return (
    <section id="portfolio-product" className="px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.55 }}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Koleksi Kami</p>
          <div className="mt-2">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Wall panel untuk{' '}
              <AnimatedGradientText as="span">setiap visi.</AnimatedGradientText>
            </h2>
          </div>
        </motion.div>

        {/* ── Coverflow carousel — CSS transitions, no Framer spring ── */}
        <div
          className="relative mx-auto overflow-hidden cursor-grab active:cursor-grabbing select-none"
          style={{ height: '480px' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { setPaused(false); onMouseUp(); }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          {/* Side fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-black to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-black to-transparent sm:w-32" />

          {/* Ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-amber-400/4 blur-3xl" />

          {/* Cards — positioned with CSS transforms + transition */}
          <div className="relative h-full w-full" style={isMobile ? undefined : { perspective: '1200px' }}>
            {SERIES.map((item, i) => {
              const offset = getOffset(i, active);
              const style = getCardTransform(offset, isMobile);
              const isFront = offset === 0;
              const abs = Math.abs(offset);

              return (
                <div
                  key={item.id}
                  className="absolute left-1/2 top-0 w-[280px] h-[400px] sm:w-[320px] sm:h-[440px] origin-center will-change-transform"
                  style={{
                    ...style,
                    transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    backfaceVisibility: 'hidden',
                    pointerEvents: abs > 2 ? 'none' : 'auto',
                  }}
                  onClick={() => handleClick(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${item.title}`}
                >
                  <div
                    className={`relative h-full w-full overflow-hidden rounded-3xl border shadow-lg shadow-black/40 transition-colors duration-300 ${
                      isFront ? 'border-amber-400/30 cursor-default' : 'border-white/10 cursor-pointer'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading={i < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5" />

                    {isFront && (
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                    )}

                    <div className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1.5 p-5 sm:p-6">
                      <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-amber-300/80">{item.tagline}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-2 flex justify-center gap-2">
          {SERIES.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleDot(i)}
              aria-label={`View ${item.title}`}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? 'h-2 w-7 bg-amber-400'
                  : 'h-2 w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
