'use client';

import { motion } from 'framer-motion';

// Press / media logos
const logoBloomberg  = '/images/Bloomberg Logo.webp';
const logoForbes     = '/images/Forbes Logo.webp';
const logoVogue      = '/images/Vogue-Logo.webp';
const logoCNBC       = '/images/cnbc indonesia Logo.webp';
const logoTempo      = '/images/Tempo Logo.webp';
const logoCNN        = '/images/CNN_Indonesia Logo.webp';
const logoTribun     = '/images/tribunnews Logo.webp';

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
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    label: '200+',
    desc: 'Tenaga profesional',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    label: 'Nasional',
    desc: 'Layanan di seluruh Indonesia',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
    ),
    label: '#1',
    desc: 'Desain & bangun interior',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    label: 'End-to-end',
    desc: 'Dari konsep sampai serah terima',
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
              Perusahaan desain &amp; bangun interior terdepan di Indonesia.
            </h2>
            <p className="text-sm text-white/35 sm:text-right sm:max-w-xs">Sejak 2018 · Jakarta, Indonesia</p>
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
                Dengan kualitas dan hasil yang terbukti, Wallpanels.id menghadirkan solusi terbaik untuk
                memenuhi kebutuhan <span className="font-semibold text-white">interior hunian mewah</span>.
              </p>
              <p className="text-base leading-relaxed text-white/60">
                Didukung lebih dari <span className="font-semibold text-amber-300">200 tenaga profesional</span> dan
                layanan se-Indonesia, kami berkomitmen mengubah setiap ruang menjadi pengalaman yang tak lekang oleh waktu —
                dari konsep dan pemilihan material hingga produksi, pemasangan, dan styling akhir.
              </p>
              <p className="text-base leading-relaxed text-white/60">
                Dari hunian eksklusif di Jakarta hingga proyek hospitality di seluruh nusantara,
                tim kami mewujudkan setiap visi dengan presisi dan sentuhan desain kelas atas.
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

        {/* ── "Featured In" — dual counter-scrolling marquee ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-5"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.32em] text-white/35">
            Diliput Oleh
          </p>

          {/* ── Row 1: scrolls left ── */}
          <PressRow logos={PRESS} className="press-track" />

          {/* ── Row 2: scrolls right (reversed order for contrast) ── */}
          <PressRow logos={[...PRESS].reverse()} className="press-track-reverse" />

          <p className="text-center text-xs text-white/28">Dan berbagai media ternama lainnya.</p>
        </motion.div>

      </div>
    </section>
  );
}

/* ── PressRow: one scrolling strip ── */
function PressRow({ logos, className }) {
  return (
    <div className="relative overflow-hidden py-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-black to-transparent" />
      <div className={`${className} flex w-max items-center gap-4`}>
        {[...logos, ...logos].map((logo, i) => (
          <PressCard key={i} logo={logo} />
        ))}
      </div>
    </div>
  );
}

/* ── PressCard: individual logo pill ── */
function PressCard({ logo }) {
  return (
    <div className="press-pill group flex-none flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-5 backdrop-blur-sm">
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
