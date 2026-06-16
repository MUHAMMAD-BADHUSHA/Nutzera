'use client'

import { useState, useEffect } from 'react'

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number
}

export function useDevicePerformance() {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') {
      return { isLowEnd: false, prefersReducedMotion: false, isMobile: false, shouldReduce: false }
    }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isMobile = window.innerWidth < 768
    const nav = navigator as NavigatorWithMemory
    const deviceMemory = nav.deviceMemory
    const isLowEnd = deviceMemory !== undefined && deviceMemory < 4 && navigator.hardwareConcurrency < 4
    return {
      isLowEnd,
      prefersReducedMotion: mq.matches,
      isMobile,
      shouldReduce: isLowEnd || mq.matches,
    }
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const nav = navigator as NavigatorWithMemory
    const deviceMemory = nav.deviceMemory
    const isLowEnd = deviceMemory !== undefined && deviceMemory < 4 && navigator.hardwareConcurrency < 4
    const handler = (e: MediaQueryListEvent) => {
      setState((prev) => ({ ...prev, prefersReducedMotion: e.matches, shouldReduce: isLowEnd || e.matches }))
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return state
}
