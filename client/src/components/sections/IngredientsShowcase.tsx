'use client'

import { ScrollAnimation } from '@/components/ScrollAnimation'

const ingredients = [
  {
    name: 'Dates',
    benefit: 'Natural sweetness packed with fiber, potassium, and antioxidants for sustained energy.',
    emoji: '🌴',
  },
  {
    name: 'Almonds',
    benefit: 'Heart-healthy fats, vitamin E, and protein for brain power and skin health.',
    emoji: '🥜',
  },
  {
    name: 'Cashews',
    benefit: 'Creamy texture loaded with minerals for strong bones and immune support.',
    emoji: '🥜',
  },
  {
    name: 'Walnuts',
    benefit: 'Omega-3 powerhouse for brain health and reducing inflammation.',
    emoji: '🌰',
  },
  {
    name: 'Pistachios',
    benefit: 'Complete protein with antioxidants for eye health and weight management.',
    emoji: '🥜',
  },
  {
    name: 'Dark Chocolate',
    benefit: 'Antioxidant-rich indulgence for heart health and mood enhancement.',
    emoji: '🍫',
  },
]

export function IngredientsShowcase() {
  return (
    <section id="ingredients" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              What&apos;s Inside
            </span>
            <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
              Pure <span className="text-gradient">Ingredients</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Every ingredient chosen with purpose. Nothing artificial, ever.
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-3xl transition-colors group-hover:bg-primary/10">
                {ingredient.emoji}
              </div>
              <h3 className="font-display text-xl font-bold text-dark">{ingredient.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{ingredient.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
