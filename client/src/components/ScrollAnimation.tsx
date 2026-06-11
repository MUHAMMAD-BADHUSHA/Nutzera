'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  scale?: number
}

export function ScrollAnimation({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 60,
  once = true,
  scale,
}: ScrollAnimationProps) {
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: once })

  const directionVariants = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div
        initial={{
          opacity: 0,
          ...directionVariants[direction],
          ...(scale ? { scale } : {}),
        }}
        animate={
          isVisible
            ? { opacity: 1, x: 0, y: 0, scale: 1 }
            : { opacity: 0, ...directionVariants[direction], ...(scale ? { scale } : {}) }
        }
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div ref={ref}>
      <motion.div
        className={className}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
            },
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
  distance = 40,
}: {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}) {
  const dirVariants = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          ...dirVariants[direction],
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
