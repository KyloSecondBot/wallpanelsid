'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Press / media logos
const logoBloomberg  = '/images/press/Bloomberg Logo.webp';
const logoForbes     = '/images/press/Forbes Logo.webp';
const logoVogue      = '/images/press/Vogue-Logo.webp';
const logoCNBC       = '/images/press/cnbc indonesia Logo.webp';
const logoTempo      = '/images/press/Tempo Logo.webp';
const logoCNN        = '/images/press/CNN_Indonesia Logo.webp';
const logoTribun     = '/images/press/tribunnews Logo.webp';

const PRESS = [
  { src: logoBloomberg, alt: 'Bloomberg',      forceWhite: true  },
  { src: logoForbes,    alt: 'Forbes',         forceWhite: true  },
  { src: logoVogue,     alt: 'Vogue',          forceWhite: true  },
  { src: logoCNBC,      alt: 'CNBC Indonesia', forceWhite: false },
  { src: logoTempo,     alt: 'Tempo',          forceWhite: false },
  { src: logoCNN,       alt: 'CNN Indonesia',  forceWhite: false },
  { src: logoTribun,    alt: 'Tribun News',    forceWhite: false },
];

const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    label: 'JHI Group',
    desc: 'Sejak 2025',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    label: '100+',
    desc: 'Tenaga profesional',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m-5.522-12.1-.003-.108c0-.794.645-1.44 1.44-1.44h.004c.776 0 1.404.628 1.404 1.404 0 .396-.162.776-.45 1.05l-.19.19M3.887 15.903 12 21.75l7.94-5.814" />
      </svg>
    ),
    label: 'Nasional',
    desc: 'Layanan di seluruh Indonesia',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    label: 'End-to-end',
    desc: 'Menjual produk satuan sampai jasa design dan build',
  },
];

export default function About() {
  return (
    <section id="about" className="px-6">
      <div className="mx-auto max-w-6xl space-y-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Tentang Kami</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-xl text-3xl font-semibold text-white sm:text-4xl">
              Wallpanels Indonesia
            </h2>
          </div>
        </motion.div>

        {/* ── Main card ── */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/8 via-white/4 to-white/0 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
          {/* Background radial glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 15% 40%, rgba(173,158,143,0.1), transparent 40%), radial-gradient(circle at 85% 20%, rgba(173,158,143,0.06), transparent 38%)',
            }}
          />

          <div className="relative grid gap-0 lg:grid-cols-2">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center gap-5 px-8 py-10 sm:px-10 lg:py-12"
            >
              <p className="text-base leading-relaxed text-white/80 sm:text-lg">
                Wallpanels Indonesia didirikan pada 2025 dengan fokus utama untuk <span className="font-semibold text-white">wall panel system &amp; cabinetry</span> interior residential dan komersil dengan pemasangan cepat &amp; perawatan mudah.
              </p>
              <p className="text-base leading-relaxed text-white/60">
                Gudang Wallpanels Indonesia berlokasi di Tangerang, dan melayani seluruh Indonesia. Menyediakan jasa dari pengadaan bahan saja hingga jasa design dan build jika dibutuhkan.
              </p>
            </motion.div>

            {/* Right: pillars grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="grid grid-cols-2 gap-px border-t border-white/8 lg:border-l lg:border-t-0"
            >
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
                  className="group flex flex-col gap-3 border-white/8 bg-white/3 p-6 transition hover:bg-white/6 [&:nth-child(odd)]:border-r [&:nth-child(-n+2)]:border-b"
                >
                  <span className="text-amber-300/60 transition group-hover:text-amber-300">
                    {p.icon}
                  </span>
                  <div>
                    <p className="font-display text-2xl font-semibold text-white">{p.label}</p>
                    <p className="mt-0.5 text-xs text-white/38">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── "Featured In" - dual counter-scrolling marquee ── */}
        <PressBanner press={PRESS} />

      </div>
    </section>
  );
}

/*
 * PressBanner — IO-gated marquee.
 * Pauses CSS animation when scrolled off-screen so it doesn't eat GPU
 * while the user is elsewhere on the page.
 */
function PressBanner({ press }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-5"
    >
      <p className="text-center text-xs font-semibold uppercase tracking-[0.32em] text-white/35">
        Diliput Oleh
      </p>
      <PressRow logos={press} className="press-track" paused={!visible} />
      <PressRow logos={[...press].reverse()} className="press-track-reverse" paused={!visible} />
      <p className="text-center text-xs text-white/28">Dan berbagai media ternama lainnya.</p>
    </motion.div>
  );
}

/* ── PressRow: one scrolling strip ── */
function PressRow({ logos, className, paused }) {
  return (
    <div className="relative overflow-hidden py-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-black to-transparent" />
      <div
        className={`${className} flex w-max items-center gap-4`}
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <PressCard key={i} logo={logo} />
        ))}
      </div>
    </div>
  );
}

/*
 * PressCard — individual logo pill.
 * NO backdrop-blur (was causing 28 Gaussian blurs per frame on mobile).
 * Solid semi-transparent bg instead.
 */
function PressCard({ logo }) {
  return (
    <div className="press-pill group flex-none flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] px-7 py-5 sm:backdrop-blur-sm">
      <div className="flex h-10 w-32 items-center justify-center">
        <img
          src={logo.src}
          alt={logo.alt}
          className={[
            'max-h-full max-w-full object-contain transition-opacity duration-300',
            logo.forceWhite
              ? 'brightness-0 invert opacity-70 group-hover:opacity-100'
              : 'opacity-85 group-hover:opacity-100',
          ].join(' ')}
          loading="lazy"
          draggable={false}
        />
      </div>
    </div>
  );
}
