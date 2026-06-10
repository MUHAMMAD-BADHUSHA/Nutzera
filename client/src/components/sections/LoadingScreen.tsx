'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-dark"
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="max-h-[100vh] max-w-[100vw] w-auto h-auto object-cover md:max-h-screen md:w-ful"
          >
            <source src="/loadingVideo.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
