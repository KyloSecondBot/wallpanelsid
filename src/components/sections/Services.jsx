'use client';

import { motion } from 'framer-motion';
import GlareHover from '@/components/reactbits/GlareHover.jsx';
const SERVICES = [
  {
    id: 'f1', title: 'Konsep & Desain',
    bullet_1: 'Strategi palet warna & material',
    bullet_2: 'Visualisasi 3D & perencanaan ruang',
    bullet_3: 'Panduan finishing & furnishing',
  },
  {
    id: 'f2', title: 'Produksi & Pengadaan',
    bullet_1: 'Koordinasi vendor & supplier',
    bullet_2: 'Dokumen siap produksi',
    bullet_3: 'Logistik tepat waktu',
  },
  {
    id: 'f3', title: 'Instalasi & Perawatan',
    bullet_1: 'Pemasangan di lokasi',
    bullet_2: 'Kurasi styling & dekorasi',
    bullet_3: 'Pemeliharaan & pembaruan berkala',
  },
];

export default function Services() {
  const services = SERVICES;

  return (
    <section id="services" className="px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Layanan Kami</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Semua yang dibutuhkan untuk mewujudkan ruang impian.</h2>
          <p className="max-w-3xl text-white/75">
            Satu tim menangani seluruh proses: konsep, desain, pengadaan material, hingga pemasangan.
            Kami siap menangani proyek hunian maupun komersial Anda.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, idx) => {
            const bullets = [service.bullet_1, service.bullet_2, service.bullet_3].filter(Boolean);
            return (
              <motion.div
                key={service.id}
                initial={{ y: 16, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.55, delay: idx * 0.06 }}
              >
                <GlareHover>
                  <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-300 via-yellow-300 to-amber-200 opacity-90" />
                    </div>
                    <ul className="space-y-2 text-sm text-white/80">
                      {bullets.map((line) => (
                        <li key={line} className="flex items-start gap-2">
                          <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-amber-400/70" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlareHover>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
