'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
      {/* Fine grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 text-center pt-24 pb-16">
        {/* Ornament */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-[10px] font-body font-600 tracking-[0.4em] uppercase text-[#D4AF37]">
            Est. in Chomu, Rajasthan
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.15}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-none mb-4"
        >
          <span className="block text-white">Goyal</span>
          <span className="block gold-shimmer italic">Jewellers</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
          className="font-body text-sm tracking-[0.2em] uppercase text-[#BFBFBF] mt-6 mb-10"
        >
          Exquisite Gold & Diamond Jewellery · Naya Bajar, Chomu
        </motion.p>

        {/* Ornament divider */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.4}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-gold text-lg">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.5}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/#categories" className="btn-gold-filled gap-2 min-w-[200px]">
            Explore Collections
          </Link>
          <a
            href="https://wa.me/919928529683"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold min-w-[200px]"
          >
            Order on WhatsApp
          </a>
        </motion.div>

        {/* Store info strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.65}
          className="mt-16 pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
        >
          {[
            { icon: '📍', text: 'Naya Bajar, Chomu, Rajasthan' },
            { icon: '📞', text: '+91 99285 29683' },
            { icon: '🕙', text: '10:30 AM – 07:30 PM' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span className="text-base">{item.icon}</span>
              <span className="text-[11px] font-body tracking-widest text-[#BFBFBF] uppercase">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-body tracking-[0.3em] uppercase text-[#6B6B6B]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
