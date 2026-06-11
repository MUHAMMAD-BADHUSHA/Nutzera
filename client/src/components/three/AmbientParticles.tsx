'use client'

import dynamic from 'next/dynamic'
import { useDevicePerformance } from '@/hooks/useDevicePerformance'

const ParticleField = dynamic(
  () => import('@/components/three/ParticleField').then((m) => m.ParticleField),
  { ssr: false },
)

interface AmbientParticlesProps {
  count?: number
  color?: string
  speed?: number
  className?: string
}

export function AmbientParticles(props: AmbientParticlesProps) {
  const { shouldReduce } = useDevicePerformance()

  if (shouldReduce) return null

  return <ParticleField {...props} />
}
