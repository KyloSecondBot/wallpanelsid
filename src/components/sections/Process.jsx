'use client';

import { motion } from 'framer-motion';
/* ── Icon map ── */
const ICONS = {
  money: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h6v7.5H4.5V3Zm0 7.5v10.5m6-10.5 4.5 3.75V21m0-10.5 4.5 3.75V21M10.5 3v7.5m4.5 0V3h4.5v7.5" />
    </svg>
  ),
};

const STEPS = [
  { id: 'f1', num: '01', title_en: 'Survey Lokasi',          title_id: 'Site Survey',       description: 'Tim kami datang ke lokasi Bapak/Ibu buat ukur ruangan dan diskusi langsung, biar kami paham keseluruhan konsep yang diinginkan.',           icon_name: 'location' },
  { id: 'f2', num: '02', title_en: 'Penawaran Harga',        title_id: 'Price Quotation',   description: 'Kami buatkan rincian harga berdasarkan hasil survey. Bapak/Ibu bisa sesuaikan dengan budget dan kebutuhan.',                    icon_name: 'money' },
  { id: 'f3', num: '03', title_en: 'Desain',                 title_id: 'Design',            description: 'Proses desain langsung jalan, koordinasi lewat grup WhatsApp. Ada batasan revisi supaya prosesnya tetap efisien.',                          icon_name: 'design' },
  { id: 'f4', num: '04', title_en: 'Kunjungan Pabrik',       title_id: 'Factory Visit',     description: 'Tahap ini opsional. Bapak/Ibu boleh mampir ke pabrik atau proyek yang lagi jalan buat lihat langsung kualitas kerja kami.',                 icon_name: 'factory' },
  { id: 'f5', num: '05', title_en: 'Proses Produksi',        title_id: 'Production',        description: 'Semua item kami produksi sesuai penawaran harga yang sudah disetujui. Kualitas tetap jadi prioritas utama.',                                icon_name: 'wrench' },
  { id: 'f6', num: '06', title_en: 'Instalasi',              title_id: 'Installation',      description: 'Barang dikirim dan instalasi dimulai di lokasi Bapak/Ibu. Setelah selesai, kami kasih warranty 12 bulan untuk semua pekerjaan.',            icon_name: 'home' },
];

export default function Process() {
  const steps = STEPS;

  return (
    <section id="process" className="px-6">
      <div className="mx-auto max-w-6xl space-y-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Proses Kerja</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Cara kami mewujudkan interior impian kamu.
            </h2>
            <p className="text-sm text-white/30">Enam langkah, cepat beres !</p>
          </div>
        </motion.div>

        {/* Step grid */}
        <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {/* Connector line - desktop only */}
          <div className="pointer-events-none absolute left-0 right-0 top-[44px] hidden h-px lg:block overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:border-white/25 hover:bg-white/[0.07] transition-colors duration-300"
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 60px rgba(255,255,255,0.07)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              {/* Top-edge shimmer */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Watermark number */}
              <span className="pointer-events-none absolute -right-1 -top-2 select-none font-display text-8xl font-bold leading-none text-white/[0.04] group-hover:text-white/[0.07] transition-colors duration-300">
                {step.num}
              </span>

              {/* Icon */}
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40 transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/10 group-hover:text-white">
                {ICONS[step.icon_name] ?? ICONS.home}
              </div>

              {/* Step number pill */}
              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35 transition-all duration-300 group-hover:border-white/25 group-hover:text-white/80">
                {step.num}
              </span>

              {/* Titles */}
              <div className="relative z-10 space-y-0.5">
                <h3 className="text-sm font-semibold text-white/85 transition-colors duration-300 group-hover:text-white">
                  {step.title_en}
                </h3>
                <p className="text-[11px] text-white/30 transition-colors duration-300 group-hover:text-white/50">
                  {step.title_id}
                </p>
              </div>

              {/* Description */}
              <p className="relative z-10 text-xs leading-relaxed text-white/35 transition-colors duration-300 group-hover:text-white/60">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
