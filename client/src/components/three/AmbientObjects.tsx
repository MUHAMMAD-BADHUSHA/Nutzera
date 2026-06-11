'use client'

import dynamic from 'next/dynamic'
import { useDevicePerformance } from '@/hooks/useDevicePerformance'

const Hero3DObjects = dynamic(
  () => import('@/components/three/Hero3DObjects').then((m) => m.Hero3DObjects),
  { ssr: false },
)

interface AmbientObjectsProps {
  className?: string
}

export function AmbientObjects(props: AmbientObjectsProps) {
  const { shouldReduce } = useDevicePerformance()

  if (shouldReduce) return null

  return <Hero3DObjects {...props} />
}
