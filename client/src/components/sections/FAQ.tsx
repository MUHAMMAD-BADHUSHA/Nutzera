'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What ingredients are used in Nutzera bars?',
    a: 'Our bars are made with 100% natural ingredients: premium nuts (walnuts, almonds, cashews, peanuts), dates, pumpkin seeds, and dark chocolate. No artificial preservatives, flavors, or sweeteners.',
  },
  {
    q: 'How should I store Nutzera bars?',
    a: 'Store in a cool, dry place away from direct sunlight. For best texture, keep at room temperature. In warmer months, refrigeration helps maintain the chocolate\'s snap.',
  },
  {
    q: 'Is there any added sugar in Nutzera bars?',
    a: 'Zero added sugar. Our sweetness comes entirely from Medjool dates, which provide natural sugars along with fiber, potassium, and antioxidants.',
  },
  {
    q: 'How much protein is in each bar?',
    a: 'Our Dates & Nuts bar contains 8g of plant-based protein, while the Dark Chocolate bar provides 7g. Protein comes from the nuts and seeds in every bar.',
  },
  {
    q: 'What is the shelf life of Nutzera bars?',
    a: 'Our bars have a shelf life of 12 months when stored properly. Each bar is packaged to maintain peak freshness and nutritional value.',
  },
  {
    q: 'Are Nutzera bars suitable for vegans?',
    a: 'Absolutely. Both our bars are 100% plant-based, made with vegan dark chocolate and no animal products whatsoever.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              FAQ
            </span>
            <h2 className="font-display text-3xl leading-tight text-dark md:text-5xl lg:text-6xl">
              Got{' '}
              <span className="text-gradient">Questions</span>
            </h2>
          </div>
        </ScrollAnimation>

        <div className="mt-16 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <button
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="pr-4 font-medium text-dark">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-100 px-6 py-4">
                        <p className="text-sm leading-relaxed text-gray-500">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
