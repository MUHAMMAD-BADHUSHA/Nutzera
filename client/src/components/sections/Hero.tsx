'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const nuts = [
  { emoji: '🌰', x: 5, y: 15, size: 40, delay: 0, duration: 12 },
  { emoji: '🥜', x: 90, y: 10, size: 35, delay: 0.3, duration: 14 },
  { emoji: '🍫', x: 80, y: 75, size: 38, delay: 0.6, duration: 11 },
  { emoji: '🌴', x: 10, y: 80, size: 42, delay: 0.9, duration: 13 },
  { emoji: '🌰', x: 50, y: 5, size: 30, delay: 1.2, duration: 15 },
  { emoji: '🥜', x: 95, y: 50, size: 32, delay: 1.5, duration: 12 },
  { emoji: '🍫', x: 3, y: 45, size: 36, delay: 1.8, duration: 14 },
  { emoji: '🌴', x: 65, y: 90, size: 40, delay: 2.1, duration: 11 },
  { emoji: '🌰', x: 35, y: 20, size: 28, delay: 2.4, duration: 13 },
  { emoji: '🥜', x: 70, y: 30, size: 34, delay: 2.7, duration: 15 },
  { emoji: '🍫', x: 20, y: 60, size: 30, delay: 3.0, duration: 12 },
  { emoji: '🌴', x: 85, y: 85, size: 38, delay: 3.3, duration: 14 },
  { emoji: '🌰', x: 45, y: 70, size: 26, delay: 3.6, duration: 11 },
  { emoji: '🥜', x: 15, y: 35, size: 32, delay: 3.9, duration: 13 },
  { emoji: '🍫', x: 60, y: 15, size: 28, delay: 4.2, duration: 15 },
]

const particles = [
  { x: 5, y: 20, size: 6, yMove: -120, xMove: 10, duration: 7, delay: 0 },
  { x: 15, y: 60, size: 5, yMove: -100, xMove: -15, duration: 8, delay: 0.5 },
  { x: 25, y: 35, size: 7, yMove: -140, xMove: 20, duration: 6, delay: 1 },
  { x: 35, y: 80, size: 4, yMove: -90, xMove: -10, duration: 9, delay: 1.5 },
  { x: 45, y: 15, size: 8, yMove: -130, xMove: 15, duration: 7, delay: 2 },
  { x: 55, y: 50, size: 5, yMove: -110, xMove: -20, duration: 8, delay: 2.5 },
  { x: 65, y: 70, size: 6, yMove: -100, xMove: 10, duration: 6, delay: 3 },
  { x: 75, y: 25, size: 4, yMove: -80, xMove: -15, duration: 9, delay: 3.5 },
  { x: 85, y: 55, size: 7, yMove: -120, xMove: 20, duration: 7, delay: 4 },
  { x: 95, y: 40, size: 5, yMove: -100, xMove: -10, duration: 8, delay: 4.5 },
  { x: 10, y: 90, size: 6, yMove: -110, xMove: 15, duration: 6, delay: 0.3 },
  { x: 30, y: 45, size: 4, yMove: -90, xMove: -20, duration: 9, delay: 0.8 },
  { x: 50, y: 75, size: 8, yMove: -130, xMove: 10, duration: 7, delay: 1.3 },
  { x: 70, y: 10, size: 5, yMove: -100, xMove: -15, duration: 8, delay: 1.8 },
  { x: 90, y: 65, size: 6, yMove: -120, xMove: 20, duration: 6, delay: 2.3 },
  { x: 20, y: 30, size: 7, yMove: -140, xMove: -10, duration: 9, delay: 2.8 },
  { x: 40, y: 85, size: 4, yMove: -80, xMove: 15, duration: 7, delay: 3.3 },
  { x: 60, y: 40, size: 5, yMove: -100, xMove: -20, duration: 8, delay: 3.8 },
  { x: 80, y: 20, size: 8, yMove: -130, xMove: 10, duration: 6, delay: 4.3 },
  { x: 8, y: 50, size: 6, yMove: -110, xMove: -15, duration: 9, delay: 4.8 },
]

function FloatingNuts() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {nuts.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: item.size,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 0.15, 0.25, 0.15, 0],
            scale: [0.3, 0.8, 1, 0.8, 0.3],
            rotate: [0, 45, 90, 135, 180],
            y: [0, -40, -20, -50, 0],
            x: [0, 15, -15, 10, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {particles.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-primary-accent/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0, 1.5, 0],
            y: [0, p.yMove],
            x: [0, p.xMove],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const handleLeave = () => setPosition({ x: 0, y: 0 })

  const Wrapper = href ? 'a' : 'div'

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="inline-block"
    >
      <motion.div
        className={className}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <Wrapper href={href} className="block">
          {children}
        </Wrapper>
      </motion.div>
    </div>
  )
}

function ProductDisplay() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const rotateX = useTransform(springY, [0, 1], [10, -10])
  const rotateY = useTransform(springX, [0, 1], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-full w-full items-center justify-center perspective-[1200px]"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-gradient-to-br from-primary-accent/20 via-primary-light/10 to-transparent blur-3xl" />
        <div className="absolute h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(91,191,106,0.08)_0%,transparent_70%)]" />
      </div>

      <motion.div
        className="relative flex items-center justify-center"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="relative z-20 -mr-12 md:-mr-20"
          initial={{ opacity: 0, x: 80, y: 40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 4.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="relative"
            animate={{ y: [0, -15, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src="/chocobar.png"
              alt="Dark Chocolate Nuts Bar"
              className="h-auto w-[260px] drop-shadow-2xl md:w-[380px]"
              style={{ filter: 'drop-shadow(0 30px 60px rgba(11,61,46,0.3))' }}
            />
            <div className="pointer-events-none absolute -inset-10 bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-30 blur-xl" />
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10 -ml-12 mt-12 md:-ml-20 md:mt-20"
          initial={{ opacity: 0, x: -80, y: 40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 4.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="relative"
            animate={{ y: [0, -10, 0], rotate: [2, -2, 2] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src="/datebar.png"
              alt="Dates & Nuts Energy Bar"
              className="h-auto w-[240px] drop-shadow-2xl md:w-[350px]"
              style={{ filter: 'drop-shadow(0 30px 60px rgba(11,61,46,0.25))' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function AnimatedScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 5.5, duration: 0.8 }}
    >
      <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-medium">
        Scroll
      </span>
      <div className="flex flex-col items-center gap-1">
        <motion.div className="h-12 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
        <motion.div
          className="h-2 w-2 rounded-full bg-primary-accent/80"
          animate={{ y: [0, 16, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative pt-36 w-full overflow-hidden bg-dark">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(91,191,106,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(212,160,23,0.08)_0%,transparent_50%)]" />

      <motion.div
        className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary-accent/5 blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gold/5 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <FloatingNuts />

      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col px-6 md:flex-row md:items-center md:px-10 lg:px-16">
        <div className="flex flex-1 flex-col justify-center pt-24 md:pt-0 md:pr-8 lg:pr-16">
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-primary-accent backdrop-blur-sm w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 0.6 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-accent animate-pulse" />
            Premium Healthy Nutrition
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-5xl leading-[1.05] text-white md:text-6xl lg:text-7xl xl:text-8xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.1, duration: 0.01 }}
            >
              <motion.span
                className="block"
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ delay: 4.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Nature&apos;s Energy.
              </motion.span>
              <motion.span
                className="block text-gradient mt-1"
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ delay: 4.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Crafted Better.
              </motion.span>
            </motion.h1>
          </div>

          <div className="overflow-hidden mt-6">
            <motion.p
              className="text-base leading-relaxed text-white/60 max-w-md md:text-lg"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 4.4, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Premium dates, nuts and dark chocolate bars made for modern lifestyles.
            </motion.p>
          </div>

          <motion.div
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.6, duration: 0.6 }}
          >
            <MagneticButton href="#products">
              <button className="group relative overflow-hidden rounded-full bg-primary-accent px-8 py-4 text-sm font-semibold text-dark shadow-2xl shadow-primary-accent/30 transition-all hover:bg-primary-light">
                <span className="relative z-10">Explore Products</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-accent to-primary-light"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </MagneticButton>

            <MagneticButton href="#story">
              <button className="group flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:border-primary-accent hover:text-primary-accent">
                Discover Benefits
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        <div className="flex-1 hidden md:flex md:items-center md:justify-center">
          <ProductDisplay />
        </div>
      </div>

      <AnimatedScrollIndicator />
    </section>
  )
}
