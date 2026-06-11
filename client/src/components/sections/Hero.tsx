'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { AmbientObjects } from '@/components/three/AmbientObjects'

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-dark text-white min-h-dvh flex items-center">
      <AmbientObjects className="absolute inset-0 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(48,109,41,0.15)_0%,transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(196,164,74,0.05)_0%,transparent_50%)]" />

      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-primary/5 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid min-h-dvh items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="pt-28 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-primary-light backdrop-blur-sm">
                Premium Healthy Nutrition
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-4xl leading-[1.1] md:text-4xl lg:text-4xl xl:text-6xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Nature&apos;s Energy.
              <br />
              <span className="text-gradient-gold">Crafted Better.</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-md text-base leading-relaxed text-gray-400 md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Premium dates, nuts and dark chocolate bars made for modern lifestyles.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="#products"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark"
              >
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#story"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/20 px-8 py-3.5 text-sm font-semibold text-white/80 transition-all hover:border-primary hover:text-primary"
              >
                Discover Benefits
              </a>
            </motion.div>
          </div>

          <div className="relative flex items-center justify-center pb-12 md:pb-0">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-gold/10 rounded-full blur-3xl" />

              <div className="relative z-10 flex items-end gap-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Image
                    src="/datebar.png"
                    alt="Dates & Nuts Energy Bar"
                    width={280}
                    height={380}
                    priority
                    className="h-auto w-[180px] object-contain drop-shadow-2xl md:w-[260px] lg:w-[280px]"
                  />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="mb-4"
                >
                  <Image
                    src="/chocobar.png"
                    alt="Dark Chocolate Nuts Bar"
                    width={280}
                    height={380}
                    priority
                    className="h-auto w-[180px] object-contain drop-shadow-2xl md:w-[260px] lg:w-[280px]"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-medium">
          Scroll
        </span>
        <motion.div
          className="h-1 w-1 rounded-full bg-white/60"
          animate={{ y: [0, 6, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
