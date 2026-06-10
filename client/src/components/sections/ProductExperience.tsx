'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Leaf, Sparkles, Heart, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const products = [
  {
    id: 'dates-nuts',
    name: 'Dates & Nuts Energy Bar',
    tagline: 'Nature\'s sweetest combination',
    description: 'A perfect blend of premium dates and handpicked nuts, crafted for sustained natural energy throughout your day.',
    image: '/datebar.png',
    color: '#0B3D2E',
    features: [
      { icon: Leaf, text: '100% Natural' },
      { icon: Zap, text: 'Instant Energy' },
      { icon: Heart, text: 'Heart Healthy' },
    ],
    ingredients: ['Dates', 'Walnut', 'Almond', 'Cashew', 'Pumpkin Seeds'],
    nutrition: { calories: '220', protein: '8g', fiber: '5g', sugar: '12g' },
  },
  {
    id: 'choco-nuts',
    name: 'Dark Chocolate Nuts Bar',
    tagline: 'Indulgence meets nutrition',
    description: 'Premium dark chocolate meets crunchy nuts in a bar that proves healthy can be absolutely delicious.',
    image: '/chocobar.png',
    color: '#0B3D2E',
    features: [
      { icon: Sparkles, text: 'Rich in Antioxidants' },
      { icon: Leaf, text: 'No Added Sugar' },
      { icon: Zap, text: 'Sustained Energy' },
    ],
    ingredients: ['Dark Chocolate', 'Almond', 'Cashew', 'Walnut', 'Peanut'],
    nutrition: { calories: '240', protein: '9g', fiber: '4g', sugar: '8g' },
  },
]

function ProductCard({ product, isActive }: { product: typeof products[0]; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const rotateX = useTransform(springY, [0, 1], [8, -8])
  const rotateY = useTransform(springX, [0, 1], [-8, 8])

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
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center perspective-[1200px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary-accent/15 via-primary-light/10 to-transparent blur-3xl" />
      </div>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-auto w-[280px] drop-shadow-2xl md:w-[350px]"
            style={{ filter: 'drop-shadow(0 30px 60px rgba(11,61,46,0.3))' }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function ProductExperience() {
  const [activeProduct, setActiveProduct] = useState(0)
  const product = products[activeProduct]

  return (
    <section id="products" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(11,61,46,0.02),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              Our Products
            </span>
            <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
              Crafted for{' '}
              <span className="text-gradient">Every Moment</span>
            </h2>
          </div>
        </ScrollAnimation>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <ProductCard product={product} isActive={true} />
          </div>

          <div className="order-1 flex flex-col justify-center lg:order-2">
            <div className="flex gap-4 mb-8">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProduct(i)}
                  className={cn(
                    'rounded-full px-6 py-3 text-sm font-medium transition-all duration-300',
                    activeProduct === i
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-white text-text-muted hover:bg-primary/5'
                  )}
                >
                  {p.name.split(' ')[0]} {p.name.split(' ')[1]}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-display text-3xl font-bold text-dark md:text-4xl">
                  {product.name}
                </h3>
                <p className="mt-2 text-lg text-primary-accent">{product.tagline}</p>
                <p className="mt-4 text-text-muted">{product.description}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {product.features.map((feature) => (
                    <div
                      key={feature.text}
                      className="flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 text-sm text-primary"
                    >
                      <feature.icon className="h-4 w-4" />
                      {feature.text}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-4 gap-4">
                  {Object.entries(product.nutrition).map(([key, value]) => (
                    <div key={key} className="rounded-xl bg-white p-4 text-center shadow-sm">
                      <span className="block font-display text-xl font-bold text-primary">{value}</span>
                      <span className="text-xs text-text-muted capitalize">{key}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="rounded-full bg-dark/5 px-4 py-1.5 text-xs font-medium text-dark/70"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
