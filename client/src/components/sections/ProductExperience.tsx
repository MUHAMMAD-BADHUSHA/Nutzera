'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'

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
  },
]

export function ProductExperience() {
  return (
    <section id="products" className="relative overflow-hidden bg-gray-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
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

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {products.map((product, i) => (
            <ScrollAnimation key={product.name} direction={i === 0 ? 'right' : 'left'} delay={i * 0.15}>
              <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all hover:shadow-2xl hover:shadow-primary/5">
                <div className="relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={260}
                      height={340}
                      className="h-auto w-[180px] object-contain drop-shadow-xl md:w-[220px]"
                    />
                  </motion.div>
                </div>

                <div className="p-8 md:p-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-dark">{product.name}</h3>
                      <p className="mt-1 text-sm text-gold-dark">{product.tagline}</p>
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-500">
                      New
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-gray-500">{product.description}</p>

                  <div className="mt-6 grid grid-cols-4 gap-4 rounded-xl bg-gray-50 p-4">
                    <div className="text-center">
                      <p className="font-display text-lg font-bold text-dark">{product.calories}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Calories</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-lg font-bold text-primary">{product.protein}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Protein</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-lg font-bold text-primary">{product.fiber}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Fiber</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-lg font-bold text-dark">{product.sugar}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Sugar</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500"
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
