'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
  color?: string
  speed?: number
  className?: string
}

function createCircleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 32, 32)
  return new THREE.CanvasTexture(canvas)
}

export function ParticleField({ count = 35, color = '#C4A44A', speed = 0.2, className }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement!
    const width = parent.clientWidth
    const height = parent.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 12

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const velocities: number[] = []

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3
      velocities.push((Math.random() - 0.5) * speed * 0.008)
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const texture = createCircleTexture()
    const material = new THREE.PointsMaterial({
      size: 0.12,
      map: texture,
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    let animationId: number

    const animate = () => {
      const pos = geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += velocities[i]
        if (pos[i * 3 + 1] > 12) pos[i * 3 + 1] = -12
        if (pos[i * 3 + 1] < -12) pos[i * 3 + 1] = 12
      }
      geometry.attributes.position.needsUpdate = true
      particles.rotation.y += 0.00015
      particles.rotation.x += 0.00005
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      const w = parent.clientWidth
      const h = parent.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      texture.dispose()
    }
  }, [count, color, speed])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  )
}
