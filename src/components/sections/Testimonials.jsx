'use client';

import { motion } from 'framer-motion';
import GlareHover from '@/components/reactbits/GlareHover.jsx';
const QUOTES = [
  {
    id: 'fallback-1',
    name: 'Ibu Ratna Dewi',
    title: 'Pemilik Rumah, Jakarta Selatan',
    quote: 'Hasilnya luar biasa — setiap detail diperhatikan dengan teliti. Rumah kami terasa seperti hotel bintang lima sekarang. Tim Wallpanels.id sangat profesional dan responsif.',
  },
  {
    id: 'fallback-2',
    name: 'Bapak Andi Kurniawan',
    title: 'Direktur, PT Karya Mandiri',
    quote: 'Wallpanels.id membuat kantor kami terasa hidup. Material, tekstur, dan finishing — semuanya dikerjakan tepat waktu dan sesuai ekspektasi.',
  },
];

export default function Testimonials() {
  const quotes = QUOTES;

  return (
    <section className="px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Testimoni</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Kata mereka tentang kami.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {quotes.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
            >
              <GlareHover>
                <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-lg text-white/90">"{item.quote}"</p>
                  <div className="text-sm text-white/75">
                    <p className="font-semibold text-white">{item.name}</p>
                    <p>{item.title}</p>
                  </div>
                </div>
              </GlareHover>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
