'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { Star, Leaf, Zap, Heart } from 'lucide-react'

const products = [
  {
    name: 'Dates & Nuts Energy Bar',
    tagline: "Nature's sweetest combination",
    description: 'A perfect blend of premium dates and handpicked nuts, crafted for sustained natural energy throughout your day.',
    image: '/datebar.png',
    calories: '220',
    protein: '8g',
    fiber: '5g',
    sugar: '12g',
    ingredients: ['Dates', 'Walnut', 'Almond', 'Cashew', 'Pumpkin Seeds'],
    tags: ['100% Natural', 'Instant Energy', 'Heart Healthy'],
    accent: 'from-amber-500/10 to-orange-500/10',
    accentText: 'text-amber-600',
    accentBg: 'bg-amber-50',
  },
  {
    name: 'Dark Chocolate Bar',
    tagline: 'Decadence meets nutrition',
    description: 'Rich 70% dark chocolate enrobed around our signature date-nut blend. Antioxidant-rich indulgence that fuels both body and soul.',
    image: '/chocobar.png',
    calories: '240',
    protein: '7g',
    fiber: '6g',
    sugar: '14g',
    ingredients: ['Dark Chocolate', 'Dates', 'Almond', 'Cashew', 'Sea Salt'],
    tags: ['Antioxidants', 'Heart Healthy', 'Plant Based'],
    accent: 'from-purple-500/10 to-pink-500/10',
    accentText: 'text-purple-600',
    accentBg: 'bg-purple-50',
  },
]

const nutritionIcons = {
  Calories: Zap,
  Protein: Star,
  Fiber: Leaf,
  Sugar: Heart,
}

export function ProductExperience() {
  return (
    <section id="products" className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.03),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              Our Products
            </span>
            <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
              Crafted for{' '}
              <span className="text-gradient-gold">Every Moment</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Two bars, crafted for every moment of your day.
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {products.map((product, i) => (
            <ScrollAnimation key={product.name} direction={i === 0 ? 'right' : 'left'} delay={i * 0.15}>
              <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:border-gray-200">
                {/* Image Section */}
                <div className={`relative flex items-center justify-center bg-gradient-to-br ${product.accent} p-8 md:p-12 min-h-[320px] md:min-h-[380px]`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_70%)]" />
                  <motion.div
                    className="relative z-10"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={280}
                      height={380}
                      className="h-auto w-[200px] object-contain drop-shadow-2xl md:w-[260px] transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>

                  {/* Decorative Elements */}
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${product.accentBg} ${product.accentText}`}>
                      New
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8">
                  <div className="mb-4">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-dark">{product.name}</h3>
                    <p className={`mt-1 text-sm font-medium ${product.accentText}`}>{product.tagline}</p>
                  </div>

                  <p className="text-sm leading-relaxed text-gray-500">{product.description}</p>

                  {/* Nutrition Grid */}
                  <div className="mt-6 grid grid-cols-4 gap-2 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/80 p-4">
                    {[
                      { label: 'Calories', value: product.calories, icon: Zap },
                      { label: 'Protein', value: product.protein, icon: Star },
                      { label: 'Fiber', value: product.fiber, icon: Leaf },
                      { label: 'Sugar', value: product.sugar, icon: Heart },
                    ].map((item) => (
                      <div key={item.label} className="text-center group/item">
                        <div className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm group-hover/item:shadow-md transition-shadow">
                          <item.icon size={14} className="text-primary" />
                        </div>
                        <p className="font-display text-base font-bold text-dark">{item.value}</p>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Ingredients */}
                  <div className="mt-5">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Ingredients</p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.ingredients.map((ing) => (
                        <span
                          key={ing}
                          className="rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/10"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 bg-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
