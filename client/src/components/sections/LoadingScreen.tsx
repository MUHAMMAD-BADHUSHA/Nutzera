'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => setIsLoading(false)
    video.addEventListener('ended', handleEnded)

    const fallback = setTimeout(() => setIsLoading(false), 8000)
    return () => {
      video.removeEventListener('ended', handleEnded)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dark"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-dark/30" />

          <motion.button
            className="absolute bottom-8 right-8 z-10 rounded-full border border-white/20 px-5 py-2 text-xs tracking-wider text-white/70 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLoading(false)}
          >
            Skip Intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
