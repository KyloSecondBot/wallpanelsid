'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PHOTOS = [
  { src: '/images/product/Hero%20Portfolio/LV%203.webp',           kb: 'kb-tl' },
  { src: '/images/product/Hero%20Portfolio/KAMAR.MASTER%202.webp', kb: 'kb-tr' },
  { src: '/images/product/Hero%20Portfolio/KMR.UTM%203.webp',      kb: 'kb-bl' },
  { src: '/images/product/Hero%20Portfolio/LV%205.webp',           kb: 'kb-br' },
  { src: '/images/product/Hero%20Portfolio/LV%204.webp',           kb: 'kb-tl' },
  { src: '/images/product/Hero%20Portfolio/KMR.TAMU%201.webp',     kb: 'kb-tr' },
  { src: '/images/product/Hero%20Portfolio/KAMAR.ANAK%201.webp',   kb: 'kb-bl' },
];

const HEADLINE = [
  { text: 'Hadirkan', accent: false },
  { text: 'Kemewahan', accent: true },
  { text: 'di Ruang Anda.', accent: false },
];

const Overlays = () => (
  <>
    <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/60 via-black/10 to-black/60" />
    <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/35 via-transparent to-black/50" />
  </>
);

export default function HeroGallery() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shuffled, setShuffled] = useState(PHOTOS);

  const sectionRef = useRef(null);
  const photoRefs = useRef([]);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  const p3Ref = useRef(null);
  const siRef = useRef(null);

  // Phase 1 entrance refs
  const badgeRef = useRef(null);
  const wordRefs = useRef([]);
  const paraRef  = useRef(null);
  const btnsRef  = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    setShuffled([...PHOTOS].sort(() => Math.random() - 0.5));
    setReady(true);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Phase 1 entrance animation ───────────────────────────────────────────
  // useGSAP runs in useLayoutEffect — fires before the browser paints the
  // hydrated content, so gsap.set() establishes the hidden initial state
  // without a visible flash, then the timeline plays in.
  useGSAP(() => {
    const badge = badgeRef.current;
    const words = wordRefs.current.filter(Boolean);
    const para  = paraRef.current;
    const btns  = btnsRef.current;
    if (!badge || !words.length || !para || !btns) return;

    if (reduce) {
      // Prefers reduced motion — make everything visible instantly
      gsap.set([badge, para, btns], { opacity: 1, y: 0 });
      gsap.set(words, { y: '0%' });
      return;
    }

    // Reinforce the inline-style initial states so GSAP owns the properties
    gsap.set([badge, para, btns], { y: 20 }); // opacity:0 already on element
    gsap.set(words, { y: '108%' });            // already on element, GSAP takes over

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to(badge, { opacity: 1, y: 0, duration: 0.5  }, 0.05)
      .to(words, { y: '0%',    duration: 0.55, stagger: 0.07 }, 0.08)
      .to(para,  { opacity: 1, y: 0, duration: 0.45 }, 0.26)
      .to(btns,  { opacity: 1, y: 0, duration: 0.45 }, 0.34);
  }, { dependencies: [] });

  // ── Scroll trigger (phases 1→2→3) ───────────────────────────────────────
  const photoCount = isMobile && ready ? 3 : 4;
  const visiblePhotos = shuffled.slice(0, photoCount);

  useGSAP(() => {
    if (!ready || !sectionRef.current) return;

    const p  = photoRefs.current.slice(0, photoCount);
    const tp1 = p1Ref.current;
    const tp2 = p2Ref.current;
    const tp3 = p3Ref.current;
    const si  = siRef.current;
    if (p.some(el => !el) || !tp1 || !tp2 || !tp3) return;

    gsap.set(tp2, { y: 24 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    if (isMobile) {
      tl
        .to(si,   { opacity: 0,         duration: 0.10 }, 0)
        .to(tp1,  { opacity: 0, y: -24, duration: 0.25 }, 0.40)
        .to(p[0], { opacity: 0,         duration: 0.28 }, 0.65)
        .to(p[1], { opacity: 1,         duration: 0.28 }, 0.65)
        .to(tp2,  { opacity: 1, y: 0,   duration: 0.25 }, 0.90)
        .to(tp2,  { opacity: 0, y: -24, duration: 0.25 }, 1.38)
        .to(p[1], { opacity: 0,         duration: 0.28 }, 1.50)
        .to(p[2], { opacity: 1,         duration: 0.28 }, 1.50)
        .to(tp3,  { opacity: 1,         duration: 0.25 }, 1.72);
    } else {
      tl
        .to(si,   { opacity: 0,         duration: 0.12 }, 0)
        .to(tp1,  { opacity: 0, y: -24, duration: 0.28 }, 0.52)
        .to(p[0], { opacity: 0,         duration: 0.32 }, 0.82)
        .to(p[1], { opacity: 1,         duration: 0.32 }, 0.82)
        .to(tp2,  { opacity: 1, y: 0,   duration: 0.28 }, 1.08)
        .to(tp2,  { opacity: 0, y: -24, duration: 0.28 }, 1.68)
        .to(p[1], { opacity: 0,         duration: 0.32 }, 1.82)
        .to(p[2], { opacity: 1,         duration: 0.32 }, 1.82)
        .to(tp3,  { opacity: 1,         duration: 0.28 }, 2.08)
        .to(p[2], { opacity: 0,         duration: 0.32 }, 2.62)
        .to(p[3], { opacity: 1,         duration: 0.32 }, 2.62);
    }
  }, { dependencies: [ready, isMobile, shuffled] });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative bg-black"
      style={{ height: isMobile && ready ? '520vh' : '520vh' }}
    >
      <div className="sticky top-0 h-[100dvh] w-full">
        {/* Photo layers */}
        {visiblePhotos.map((photo, i) => (
          <div
            key={i}
            ref={el => { photoRefs.current[i] = el; }}
            className={`absolute inset-0 overflow-hidden${i > 0 ? ' opacity-0' : ''}`}
          >
            <img
              src={photo.src}
              alt=""
              draggable={false}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="h-full w-full object-cover"
              style={{ animation: reduce ? 'none' : `${photo.kb} 14s ease-in-out infinite alternate` }}
            />
          </div>
        ))}
        <Overlays />

        {/* ── Phase 1 ── */}
        <div ref={p1Ref} className="pointer-events-none absolute inset-0 z-10 flex items-center">
          <div className="pointer-events-auto mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 sm:px-8 lg:px-12">

            {/* Badge — opacity:0 in SSR HTML prevents first-paint flash */}
            <div
              ref={badgeRef}
              style={{ opacity: 0 }}
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-amber-400/20 bg-amber-400/[0.08] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/80"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400 shadow-[0_0_8px_rgba(173,158,143,0.8)]" />
              Wall Panels System & Cabinetry · Sejak 2025
            </div>

            <h1 className="flex flex-col gap-0 text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[82px]">
              {HEADLINE.map(({ text, accent }, idx) => (
                <div
                  key={idx}
                  className="-mb-[0.15em] pb-[0.15em]"
                  style={{ clipPath: 'inset(-0.08em -0.55em -0.22em -0.18em)' }}
                >
                  {/* transform in SSR HTML keeps words behind clipPath before GSAP loads */}
                  <span
                    ref={el => { wordRefs.current[idx] = el; }}
                    className="block"
                    style={{ transform: 'translateY(108%)' }}
                  >
                    {accent ? (
                      <span
                        className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200"
                        style={{ paddingRight: '0.4em', paddingLeft: '0.05em' }}
                      >
                        {text}
                      </span>
                    ) : text}
                  </span>
                </div>
              ))}
            </h1>

            <p
              ref={paraRef}
              style={{ opacity: 0 }}
              className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            >
              Pasang wall panel gaperlu ribet! Wallpanels Indonesia menghadirkan
              solusi wall panel modern untuk residensial, kantor, hingga restoran!
            </p>

            <div
              ref={btnsRef}
              style={{ opacity: 0 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="https://wa.me/6287888879305?text=Hello%20Wallpanels%20Indonesia%2C%20I%27m%20interested%20in%20your%20wall%20panel%20solutions."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 px-7 py-3.5 text-sm font-bold text-black shadow-[0_0_50px_rgba(173,158,143,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_80px_rgba(173,158,143,0.65)]"
              >
                Hubungi Kami
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#portfolio-product"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
              >
                Lihat Koleksi
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Phase 2 — "Hemat 70%" ── */}
        <div
          ref={p2Ref}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-10 text-center opacity-0 sm:px-16"
        >
          <div className="pointer-events-auto w-full max-w-4xl">
            <h2 className="flex flex-col gap-0 text-[2.2rem] font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              <span>Hemat waktu & biaya</span>
              <span>
                hingga{' '}
                <span
                  className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200"
                  style={{ paddingRight: '0.35em' }}
                >
                  70%
                </span>
              </span>
              <span>dibandingkan wall panel HPL</span>
            </h2>
          </div>
        </div>

        {/* ── Phase 3 — "Interior Cepat Beres !" ── */}
        <div
          ref={p3Ref}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-10 text-center opacity-0 sm:px-16"
        >
          <div className="pointer-events-auto w-full max-w-4xl">
            <h2 className="text-[2.5rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl xl:text-[82px]">
              Interior{' '}
              <br className="sm:hidden" />
              <span
                className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200"
                style={{ paddingRight: '0.4em' }}
              >
                Cepat Beres
              </span>
              {' '}!
            </h2>
            <div className="mt-6 sm:mt-8">
              <motion.div
                className="inline-flex flex-col items-center gap-2 text-white/40"
                animate={reduce ? {} : { opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
                  Gulir ke bawah
                </span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={siRef}
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/30"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Gulir</span>
          <div className="h-10 w-px overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-amber-400/70 to-transparent"
              animate={reduce ? {} : { y: ['-100%', '100%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
