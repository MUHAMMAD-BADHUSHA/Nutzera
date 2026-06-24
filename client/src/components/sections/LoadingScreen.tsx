'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('loaderShown')
    }
    return true
  })

  useEffect(() => {
    if (!isLoading) return

    sessionStorage.setItem('loaderShown', 'true')
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-99999 flex items-center justify-center bg-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <Image src="/logo.jpeg" alt="Logo" width={200} height={200} />
            <motion.div
              className="mx-auto mt-3 h-0.5 w-0 rounded-full bg-primary"
              animate={{ width: 80 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
