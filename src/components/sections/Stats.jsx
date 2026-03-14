'use client';

import { motion } from 'framer-motion';
import CountUp from '@/components/reactbits/CountUp';
import AnimatedGradientText from '@/components/reactbits/AnimatedGradientText';
const STATS = [
  { id: 'f1', label: 'Proyek interior selesai',      value: 36, suffix: '' },
  { id: 'f2', label: 'Kepuasan klien',               value: 42, suffix: '%' },
  { id: 'f3', label: 'Kota terlayani',               value: 12, suffix: '' },
  { id: 'f4', label: 'Waktu desain ke pemasangan',   value: 9,  suffix: ' mgg' },
];

export default function Stats() {
  const stats = STATS;

  return (
    <section className="px-6" id="studio">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-amber-300/70">Studio Kami</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Interior berkualitas, terukur, dan tepat waktu.</h2>
            <p className="mt-3 max-w-2xl text-white/75">
              Kami menggabungkan strategi desain, visualisasi, pengadaan material, dan pemasangan dalam satu alur kerja.
              Setiap permukaan direncanakan detail sebelum masuk ke ruangan Anda.
            </p>
          </div>
          <AnimatedGradientText className="text-sm font-semibold">Kontrol kualitas ketat · Hasil terjamin</AnimatedGradientText>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-white/0 px-5 py-6"
            >
              <div className="text-4xl font-semibold text-white">
                <CountUp to={item.value} duration={1.8} />
                {item.suffix ? <span className="text-amber-300/75">{item.suffix}</span> : null}
              </div>
              <p className="mt-2 text-sm text-white/60">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
