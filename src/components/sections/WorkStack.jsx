'use client';

import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from '@/components/reactbits/ScrollStack.jsx';
import AnimatedGradientText from '@/components/reactbits/AnimatedGradientText.jsx';
const PROJECTS = [
  {
    id: 'f1', index: '01', title: 'Luxury Residence', location: 'Jakarta Selatan', type: 'Hunian Eksklusif',
    description: 'Wall panel marmer dan profil custom untuk hunian mewah. Desain yang mengutamakan keselarasan cahaya alami dengan material premium di setiap sudut ruang.',
    metric: '12 mgg', metric_label: 'dari konsep hingga serah terima',
    palette_from: '#0d0d0d', palette_via: '#111111', palette_to: '#000000',
    accent_color: 'text-amber-300', image_url: '',
  },
  {
    id: 'f2', index: '02', title: 'Private Office', location: 'BSD, Tangerang', type: 'Ruang Kerja Premium',
    description: 'Kombinasi panel kayu dan metal series untuk kantor eksekutif. Suasana profesional namun tetap hangat dengan sentuhan material alami.',
    metric: '+40%', metric_label: 'peningkatan nilai properti',
    palette_from: '#0f0f0f', palette_via: '#131313', palette_to: '#090909',
    accent_color: 'text-amber-200', image_url: '',
  },
  {
    id: 'f3', index: '03', title: 'Penthouse Suite', location: 'Menteng, Jakarta', type: 'Residensial',
    description: 'Panel batu alam dan finishing metalik untuk penthouse dua lantai. Selesai dalam sembilan minggu dari brief hingga serah terima.',
    metric: '9 mgg', metric_label: 'dari brief hingga serah terima',
    palette_from: '#0c0c0c', palette_via: '#101010', palette_to: '#000000',
    accent_color: 'text-amber-300', image_url: '',
  },
  {
    id: 'f4', index: '04', title: 'Boutique Hotel', location: 'Bali', type: 'Hospitality',
    description: 'Material panel terinspirasi alam tropis untuk lobby dan kamar hotel butik. Palet warna yang menyatu dengan lanskap sekitar.',
    metric: '100%', metric_label: 'kepuasan klien saat soft launch',
    palette_from: '#0e0e0e', palette_via: '#121212', palette_to: '#090909',
    accent_color: 'text-amber-200', image_url: '',
  },
];

export default function WorkStack() {
  const projects = PROJECTS;
  const stackKey = projects.map((p) => p.id).join('-');

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
        <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Tren Desain</p>
        <div className="mt-2 flex items-end justify-between">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Proyek yang{' '}
            <AnimatedGradientText as="span">menjadi standar.</AnimatedGradientText>
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
        {projects.map((p) => {
          const hasImage = Boolean(p.image_url);
          const accent   = p.accent_color ?? 'text-amber-300';
          const tagCls   = accent.includes('200')
            ? 'bg-amber-400/10 text-amber-200 border-amber-400/20'
            : 'bg-amber-400/10 text-amber-300 border-amber-400/25';
          const barCls   = accent.includes('200')
            ? 'bg-gradient-to-r from-amber-300 to-yellow-200'
            : 'bg-gradient-to-r from-amber-400 to-amber-300';

          // Use inline style for gradient so Tailwind purging doesn't break it in prod
          const gradientStyle = hasImage
            ? {}
            : {
                background: `linear-gradient(135deg, ${p.palette_from ?? '#0d0d0d'}, ${p.palette_via ?? '#111'}, ${p.palette_to ?? '#000'})`,
              };

          return (
            <ScrollStackItem
              key={p.id}
              itemClassName="border border-white/8 !h-auto !p-0 !my-0 !rounded-3xl overflow-hidden relative"
            >
              {/* Background: photo or gradient */}
              {hasImage ? (
                <>
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  {/* Dark overlay so text stays readable */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-black/80" />
                </>
              ) : (
                <div className="absolute inset-0" style={gradientStyle} />
              )}

              {/* Card content */}
              <div className="relative flex flex-col gap-6 p-8 sm:p-10 md:p-12">
                {/* Top row */}
                <div className="flex items-start justify-between gap-4">
                  <span className={`font-display text-6xl font-semibold opacity-20 leading-none ${accent}`}>
                    {p.index}
                  </span>
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${tagCls}`}>
                    {p.type}
                  </span>
                </div>

                {/* Title + location */}
                <div>
                  <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl leading-tight">
                    {p.title}
                  </h3>
                  <p className={`mt-1 text-sm font-medium ${accent} opacity-70`}>{p.location}</p>
                </div>

                {/* Description */}
                <p className="max-w-xl text-base text-white/65 leading-relaxed">
                  {p.description}
                </p>

                {/* Metric bar */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-bold ${accent}`}>{p.metric}</span>
                    <span className="text-xs text-white/35 uppercase tracking-wide">{p.metric_label}</span>
                  </div>
                  <div className="h-[2px] w-full rounded-full bg-white/5">
                    <div className={`h-full w-2/3 rounded-full ${barCls}`} />
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          );
        })}
      </ScrollStack>
    </section>
  );
}
