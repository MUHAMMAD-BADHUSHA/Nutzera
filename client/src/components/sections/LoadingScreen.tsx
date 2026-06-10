'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 2200
    const interval = 30
    const step = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 400)
          return 100
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-dark"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-8 rounded-full bg-primary-accent/10 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <img
                src="/logo2.png"
                alt="Nutzera"
                className="relative h-20 w-auto md:h-24"
              />
            </div>

            <motion.p
              className="mt-6 text-sm text-white/40 tracking-wider uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Premium Healthy Nutrition
            </motion.p>
          </motion.div>

          <div className="relative mt-12">
            <div className="h-1 w-56 overflow-hidden rounded-full bg-white/5 md:w-72">
              <motion.div
                className="h-full rounded-full"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #5BBF6A, #D4A017, #5BBF6A)' }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <motion.div
              className="absolute -bottom-7 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="font-mono text-xs text-white/30 tracking-widest">
                {String(Math.round(progress)).padStart(2, '0')}%
              </span>
            </motion.div>
          </div>

          <motion.div
            className="mt-20 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-primary-accent/40"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
