'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    if (typeof window !== 'undefined') {
      ;(window as any).lenis = lenis
    }

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      if (typeof window !== 'undefined') {
        ;(window as any).lenis = null
      }
      lenis.destroy()
    }
  }, [])
}
