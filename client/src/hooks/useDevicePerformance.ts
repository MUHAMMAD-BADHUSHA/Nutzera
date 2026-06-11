'use client'

import { useState, useEffect } from 'react'

export function useDevicePerformance() {
  const [state, setState] = useState({
    isLowEnd: false,
    prefersReducedMotion: false,
    isMobile: false,
    shouldReduce: false,
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isMobile = window.innerWidth < 768
    const deviceMemory = (navigator as any).deviceMemory
    const isLowEnd =
      deviceMemory !== undefined && deviceMemory < 4
      && navigator.hardwareConcurrency < 4

    setState({
      isLowEnd,
      prefersReducedMotion: mq.matches,
      isMobile,
      shouldReduce: isLowEnd || mq.matches,
    })

    const handler = (e: MediaQueryListEvent) => {
      setState((prev) => ({ ...prev, prefersReducedMotion: e.matches, shouldReduce: isLowEnd || e.matches }))
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return state
}
