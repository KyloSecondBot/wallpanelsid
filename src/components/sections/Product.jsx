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
const GAP = 16; // gap-4 = 16px

export default function Product() {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pauseTimerRef = useRef(null);
  const rafRef = useRef(0);

  /* Card width based on breakpoint (must match Tailwind classes) */
  const getStep = useCallback(() => {
    const cardW = window.innerWidth >= 640 ? 320 : 280;
    return cardW + GAP;
  }, []);

  /* ── Detect active card from native scroll position ── */
  const syncActive = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getStep();
    /* scrollLeft = i * step when card i is centered (spacers handle the offset) */
    const idx = Math.round(el.scrollLeft / step);
    setActive(Math.max(0, Math.min(idx, COUNT - 1)));
  }, [getStep]);

  /* rAF-throttled scroll listener */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(syncActive);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [syncActive]);

  /* ── Scroll to a specific card index ── */
  const scrollToCard = useCallback((idx) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * getStep(), behavior: 'smooth' });
  }, [getStep]);

  /* ── Auto-advance every 4s ── */
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % COUNT;
        scrollToCard(next);
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, scrollToCard]);

  /* ── Pause on interaction, resume after 8s ── */
  const pauseAutoplay = useCallback(() => {
    setPaused(true);
    clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setPaused(false), 8000);
  }, []);

  useEffect(() => () => clearTimeout(pauseTimerRef.current), []);

  /* Pause on touch/mouse interaction */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => pauseAutoplay();
    el.addEventListener('touchstart', handler, { passive: true });
    el.addEventListener('mousedown', handler);
    return () => {
      el.removeEventListener('touchstart', handler);
      el.removeEventListener('mousedown', handler);
    };
  }, [pauseAutoplay]);

  const handleDot = (i) => {
    scrollToCard(i);
    setActive(i);
    pauseAutoplay();
  };

  return (
    <section id="portfolio-product">
      {/* Header — contained */}
      <div className="mx-auto max-w-6xl px-6">
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
      </div>

      {/* ── Full-width scroll-snap carousel ── */}
      <div className="relative">
        {/* Side fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-black to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-black to-transparent sm:w-24" />

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto"
        >
          {/*
            Spacer = 50vw - cardW/2 - gap
            Mobile: 50vw - 140 - 16 = 50vw - 156px
            SM+:    50vw - 160 - 16 = 50vw - 176px
            This ensures card 0 is centered when scrollLeft = 0.
          */}
          <div
            className="shrink-0 w-[calc(50vw_-_156px)] sm:w-[calc(50vw_-_176px)]"
            aria-hidden="true"
          />

          {SERIES.map((item, i) => {
            const isActive = i === active;
            return (
              <div key={item.id} className="shrink-0 snap-center">
                <div
                  className={`relative h-[400px] w-[280px] overflow-hidden rounded-3xl border shadow-lg shadow-black/40 transition-all duration-500 sm:h-[440px] sm:w-[320px] ${
                    isActive
                      ? 'border-amber-400/40 scale-100 opacity-100'
                      : 'border-white/10 scale-[0.92] opacity-60'
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

                  {isActive && (
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

          {/* Trailing spacer — centers last card */}
          <div
            className="shrink-0 w-[calc(50vw_-_156px)] sm:w-[calc(50vw_-_176px)]"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
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
    </section>
  );
}
