'use client';

import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from '@/components/reactbits/ScrollStack.jsx';
import AnimatedGradientText from '@/components/reactbits/AnimatedGradientText.jsx';

const STRENGTHS = [
  {
    id: 's1',
    icon: '/images/strength-eco.webp',
    title: 'Environmental Protection',
    subtitle: 'Ramah Lingkungan',
    description: 'Material bebas formaldehida dan dapat didaur ulang. Diproduksi dengan proses ramah lingkungan untuk masa depan yang lebih hijau.',
    palette_from: '#0d0d0d',
    palette_via: '#111111',
    palette_to: '#000000',
  },
  {
    id: 's2',
    icon: '/images/strength-flame.webp',
    title: 'Flame-retardant',
    subtitle: 'Tahan Api',
    description: 'Memenuhi standar ketahanan api kelas B1. Memberikan perlindungan ekstra dan keamanan maksimal untuk hunian maupun ruang komersial.',
    palette_from: '#0f0f0f',
    palette_via: '#131313',
    palette_to: '#090909',
  },
  {
    id: 's3',
    icon: '/images/strength-water.webp',
    title: 'Waterproof',
    subtitle: 'Tahan Air',
    description: 'Panel tahan air yang cocok untuk area lembap seperti kamar mandi dan dapur. Tidak mengembang, tidak berjamur.',
    palette_from: '#0c0c0c',
    palette_via: '#101010',
    palette_to: '#000000',
  },
  {
    id: 's4',
    icon: '/images/strength-flex.webp',
    title: 'Bendable / Flexible',
    subtitle: 'Fleksibel',
    description: 'Dapat dilengkungkan untuk mengikuti kontur dinding melengkung. Fleksibilitas tinggi tanpa mengorbankan kekuatan dan estetika.',
    palette_from: '#0e0e0e',
    palette_via: '#121212',
    palette_to: '#090909',
  },
  {
    id: 's5',
    icon: '/images/strength-insect.webp',
    title: 'Insect Prevention',
    subtitle: 'Anti Serangga',
    description: 'Formulasi material yang tahan terhadap rayap dan serangga perusak. Dinding Anda tetap utuh dan bersih dalam jangka panjang.',
    palette_from: '#0d0d0d',
    palette_via: '#101010',
    palette_to: '#000000',
  },
];

export default function WorkStack() {
  const stackKey = STRENGTHS.map((s) => s.id).join('-');

  return (
    <section className="relative">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-6xl px-6 pb-4"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Keunggulan Produk</p>
        <div className="mt-2 flex items-end justify-between">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Mengapa memilih{' '}
            <AnimatedGradientText as="span">wall panel kami.</AnimatedGradientText>
          </h2>
          <p className="hidden text-sm text-white/35 sm:block">Scroll untuk melihat</p>
        </div>
      </motion.div>

      <ScrollStack
        key={stackKey}
        useWindowScroll
        itemDistance={120}
        itemScale={0.04}
        itemStackDistance={24}
        stackPosition="18%"
        scaleEndPosition="8%"
        baseScale={0.84}
      >
        {STRENGTHS.map((s) => {
          const gradientStyle = {
            background: `linear-gradient(135deg, ${s.palette_from}, ${s.palette_via}, ${s.palette_to})`,
          };

          return (
            <ScrollStackItem
              key={s.id}
              itemClassName="border border-white/8 !h-auto !p-0 !my-0 !rounded-3xl overflow-hidden relative"
            >
              <div className="absolute inset-0" style={gradientStyle} />

              {/* Card content */}
              <div className="relative flex flex-col gap-5 p-8 sm:p-10 md:p-12">
                {/* Top row: icon + subtitle badge */}
                <div className="flex items-start justify-between gap-4">
                  <img
                    src={s.icon}
                    alt={s.title}
                    className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium tracking-wide text-amber-300">
                    {s.subtitle}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl leading-tight">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="max-w-xl text-base text-white/55 leading-relaxed">
                  {s.description}
                </p>

                {/* Bottom accent line */}
                <div className="h-[2px] w-full rounded-full bg-white/5">
                  <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-amber-400 to-amber-300" />
                </div>
              </div>
            </ScrollStackItem>
          );
        })}
      </ScrollStack>
    </section>
  );
}
