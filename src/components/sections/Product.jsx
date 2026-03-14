'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import AnimatedGradientText from '@/components/reactbits/AnimatedGradientText.jsx';

const SERIES = [
  {
    id: 'marble',
    title: 'Marble Series',
    tagline: 'Keanggunan abadi di setiap urat',
    description: 'Wall panel bermotif marmer premium yang menghadirkan kemegahan batu alam ke dalam interior Anda.',
    image: '/images/1.1.webp',
  },
  {
    id: 'stone',
    title: 'Stone Series',
    tagline: 'Keindahan alami, permukaan halus',
    description: 'Tekstur batu alam yang menambah kedalaman dan karakter pada ruang hunian maupun komersial.',
    image: '/images/2.1.webp',
  },
  {
    id: 'fabric',
    title: 'Fabric Pattern',
    tagline: 'Tekstur lembut, tampilan elegan',
    description: 'Pola terinspirasi kain yang memberikan kesan hangat dan sentuhan nyata dengan perawatan mudah.',
    image: '/images/1.2.webp',
  },
  {
    id: 'wood',
    title: 'Wood Series',
    tagline: 'Kehangatan alam, tahan lama',
    description: 'Panel bermotif kayu untuk interior yang tak lekang waktu — tanpa amplas, tanpa pelapis, tanpa pudar.',
    image: '/images/2.2.webp',
  },
  {
    id: 'metal',
    title: 'Metal Series',
    tagline: 'Sentuhan industrial, tampilan modern',
    description: 'Finishing metalik elegan untuk ruang kontemporer yang menuntut kesan sophisticated.',
    image: '/images/1.3.webp',
  },
  {
    id: 'profile',
    title: 'Profile Panel',
    tagline: 'Dimensi bertemu desain',
    description: 'Panel bertekstur 3D yang mengubah dinding polos menjadi elemen artistik permainan cahaya dan bayangan.',
    image: '/images/2.3.webp',
  },
];

const COUNT = SERIES.length;

/* Shortest circular offset: -2, -1, 0, 1, 2, 3 */
function getOffset(i, active) {
  let diff = i - active;
  if (diff > COUNT / 2) diff -= COUNT;
  if (diff < -COUNT / 2) diff += COUNT;
  return diff;
}

/* Position + style each card based on offset from center */
function getCardStyle(offset) {
  const abs = Math.abs(offset);
  if (abs === 0) return { x: 0, rotateY: 0, scale: 1, z: 10, opacity: 1, blur: 0 };
  if (abs === 1) return { x: offset * 290, rotateY: offset * -32, scale: 0.82, z: 0, opacity: 0.6, blur: 0 };
  if (abs === 2) return { x: offset * 420, rotateY: offset * -45, scale: 0.66, z: -60, opacity: 0.3, blur: 2 };
  return { x: 0, rotateY: 0, scale: 0.5, z: -100, opacity: 0, blur: 4 };
}

/* ── Single coverflow card ── */
function CoverCard({ item, index, active, onClick }) {
  const offset = getOffset(index, active);
  const style = getCardStyle(offset);
  const isFront = offset === 0;

  return (
    <motion.div
      className="absolute left-1/2 top-0 w-[280px] h-[400px] sm:w-[320px] sm:h-[440px] origin-center"
      style={{ perspective: 1200 }}
      animate={{
        x: `calc(-50% + ${style.x}px)`,
        rotateY: style.rotateY,
        scale: style.scale,
        opacity: style.opacity,
        zIndex: 10 - Math.abs(offset),
        filter: style.blur ? `blur(${style.blur}px)` : 'blur(0px)',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 26, mass: 0.9 }}
      onClick={() => onClick(index)}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.title}`}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-3xl border shadow-[0_25px_80px_rgba(0,0,0,0.6)] transition-colors duration-500 ${
          isFront ? 'border-amber-400/30 cursor-default' : 'border-white/10 cursor-pointer'
        }`}
      >
        {/* Image */}
        <motion.img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading={index < 3 ? 'eager' : 'lazy'}
          animate={{ scale: isFront ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5" />

        {/* Active glow edge */}
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent transition-opacity duration-500 ${isFront ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-amber-400/20 to-transparent transition-opacity duration-500 ${isFront ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-amber-400/20 to-transparent transition-opacity duration-500 ${isFront ? 'opacity-100' : 'opacity-0'}`} />

        {/* Badge */}
        <div className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 backdrop-blur-md">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1.5 p-5 sm:p-6">
          <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl leading-tight">
            {item.title}
          </h3>
          <p className="text-sm font-medium text-amber-300/80">{item.tagline}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Product() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((p) => (p + 1) % COUNT), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + COUNT) % COUNT), []);

  /* Auto-rotate */
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const handleClick = (i) => {
    if (i === active) return;
    setActive(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  };

  const handleNav = (fn) => {
    fn();
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  };

  return (
    <section id="portfolio-product" className="px-6">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Koleksi Kami</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Wall panel untuk{' '}
              <AnimatedGradientText as="span">setiap visi.</AnimatedGradientText>
            </h2>
            <p className="text-sm text-white/35">6 seri · Kemungkinan tak terbatas</p>
          </div>
        </motion.div>

        {/* Coverflow carousel */}
        <div
          className="relative mx-auto overflow-hidden"
          style={{ height: '480px' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Side fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-black to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-black to-transparent sm:w-32" />

          {/* Ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-amber-400/5 blur-[80px]" />

          {/* Cards */}
          <div className="relative h-full w-full" style={{ perspective: '1200px' }}>
            {SERIES.map((item, i) => (
              <CoverCard
                key={item.id}
                item={item}
                index={i}
                active={active}
                onClick={handleClick}
              />
            ))}
          </div>
        </div>

        {/* Description panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={SERIES[active].id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-lg text-center"
          >
            <p className="text-base leading-relaxed text-white/55">{SERIES[active].description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => handleNav(prev)}
            aria-label="Previous series"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition hover:border-amber-400/30 hover:bg-white/10 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {SERIES.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleClick(i)}
                aria-label={`View ${item.title}`}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? 'h-2 w-7 bg-amber-400'
                    : 'h-2 w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => handleNav(next)}
            aria-label="Next series"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition hover:border-amber-400/30 hover:bg-white/10 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
