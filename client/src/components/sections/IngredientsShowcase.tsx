'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'

const ingredients = [
  {
    name: 'Dates',
    benefit: 'Natural sweetness packed with fiber, potassium, and antioxidants for sustained energy.',
    emoji: '🌴',
    color: '#0B3D2E',
    nutrition: 'Rich in fiber, potassium, magnesium',
  },
  {
    name: 'Almonds',
    benefit: 'Heart-healthy fats, vitamin E, and protein for brain power and skin health.',
    emoji: '🥜',
    color: '#D4A017',
    nutrition: 'High in vitamin E, protein, healthy fats',
  },
  {
    name: 'Cashews',
    benefit: 'Creamy texture loaded with minerals for strong bones and immune support.',
    emoji: '🥜',
    color: '#1F7A53',
    nutrition: 'Zinc, iron, magnesium rich',
  },
  {
    name: 'Walnuts',
    benefit: 'Omega-3 powerhouse for brain health and reducing inflammation.',
    emoji: '🌰',
    color: '#5BBF6A',
    nutrition: 'Omega-3, antioxidants, protein',
  },
  {
    name: 'Pistachios',
    benefit: 'Complete protein with antioxidants for eye health and weight management.',
    emoji: '🥜',
    color: '#1F7A53',
    nutrition: 'Complete protein, lutein, zeaxanthin',
  },
  {
    name: 'Dark Chocolate',
    benefit: 'Antioxidant-rich indulgence for heart health and mood enhancement.',
    emoji: '🍫',
    color: '#0B3D2E',
    nutrition: 'Flavonoids, iron, magnesium',
  },
]

function IngredientCard({ ingredient, index }: { ingredient: typeof ingredients[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="glass relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
        <div className="relative z-10">
          <motion.div
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl text-4xl"
            style={{ backgroundColor: `${ingredient.color}15` }}
            animate={{ rotate: isHovered ? 10 : 0, scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {ingredient.emoji}
          </motion.div>

          <h3 className="font-display text-xl font-bold text-dark">{ingredient.name}</h3>

          <AnimatePresence>
            <motion.div
              className="overflow-hidden"
              animate={{ height: isHovered ? 'auto' : 60 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {ingredient.benefit}
              </p>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 rounded-xl bg-primary/5 p-3"
                  >
                    <p className="text-xs font-medium text-primary">
                      {ingredient.nutrition}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at 50% 50%, ${ingredient.color}08, transparent 40%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        <div
          className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-5 transition-opacity duration-500 group-hover:opacity-10"
          style={{ backgroundColor: ingredient.color }}
        />
      </div>
    </motion.div>
  )
}

export function IngredientsShowcase() {
  return (
    <section id="ingredients" className="relative overflow-hidden bg-dark py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,191,106,0.05),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-primary-accent backdrop-blur-sm">
              What&apos;s Inside
            </span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Pure <span className="text-gradient-gold">Ingredients</span>
            </h2>
            <p className="mt-4 text-lg text-white/60">
              Every ingredient chosen with purpose. Nothing artificial, ever.
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ingredients.map((ingredient, i) => (
            <IngredientCard key={ingredient.name} ingredient={ingredient} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
