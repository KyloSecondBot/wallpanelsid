'use client';

import { motion } from 'framer-motion';
import GlareHover from '@/components/reactbits/GlareHover.jsx';
const SERVICES = [
  {
    id: 'f1',
    title: 'Penjualan Retail',
    description: 'Kamu bisa beli wall panel satuan langsung dari kami. Tinggal pilih motif, ukuran, dan kami siapkan.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    id: 'f2',
    title: 'Desain 3D',
    description: 'Tim kami bantu visualisasikan interior kamu dalam bentuk 3D, biar hasilnya bisa kebayang sebelum diproduksi.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    id: 'f3',
    title: 'Produksi & Pemasangan',
    description: 'Dari produksi sampai pasang di lokasi, semua kami handle. Kamu tinggal terima beres.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
      </svg>
    ),
  },
];

export default function Services() {
  const services = SERVICES;

  return (
    <section id="services" className="px-6">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Layanan Kami</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Semua yang dibutuhkan untuk mewujudkan interior impian.</h2>
          <p className="max-w-3xl text-white/75">
            Tim Wallpanels Indonesia, dari penjualan wall panel secara retail,
            desain 3D, produksi, sampai pemasangan langsung di lokasi kamu.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <GlareHover>
                <div className="flex h-full flex-col space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-amber-400/80">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-auto text-sm leading-relaxed text-white/60">{service.description}</p>
                </div>
              </GlareHover>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
