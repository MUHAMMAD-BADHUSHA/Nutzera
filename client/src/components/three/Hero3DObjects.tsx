'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'

type NutType = 'almond' | 'cashew' | 'walnut' | 'date'

interface NutConfig {
  type: NutType
  color: string
  emissive: string
  size: number
  x: number
  y: number
  z: number
  floatSpeed: number
  floatAmp: number
  rotSpeedX: number
  rotSpeedY: number
  rotSpeedZ: number
  phase: number
}

const CONFIGS: NutConfig[] = [
  { type: 'almond', color: '#E8C4A0', emissive: '#D4A574', size: 1.8, x: -4, y: 1, z: -3, floatSpeed: 0.6, floatAmp: 0.6, rotSpeedX: 0.3, rotSpeedY: 0.5, rotSpeedZ: 0.2, phase: 0 },
  { type: 'walnut', color: '#C4A050', emissive: '#8B6914', size: 2.0, x: 4.5, y: -1.5, z: -4, floatSpeed: 0.4, floatAmp: 0.7, rotSpeedX: 0.4, rotSpeedY: 0.3, rotSpeedZ: 0.1, phase: 1.2 },
  { type: 'date', color: '#6B4C3A', emissive: '#4A3728', size: 2.2, x: -2.5, y: -2.5, z: -5, floatSpeed: 0.5, floatAmp: 0.5, rotSpeedX: 0.2, rotSpeedY: 0.6, rotSpeedZ: 0.3, phase: 2.5 },
  { type: 'cashew', color: '#F5E6CA', emissive: '#E8D5B0', size: 1.6, x: 3, y: 2.5, z: -3.5, floatSpeed: 0.7, floatAmp: 0.5, rotSpeedX: 0.5, rotSpeedY: 0.2, rotSpeedZ: 0.4, phase: 0.8 },
  { type: 'almond', color: '#E8C4A0', emissive: '#D4A574', size: 1.5, x: 5.5, y: -2.5, z: -6, floatSpeed: 0.3, floatAmp: 0.5, rotSpeedX: 0.2, rotSpeedY: 0.4, rotSpeedZ: 0.1, phase: 3.1 },
  { type: 'walnut', color: '#C4A050', emissive: '#8B6914', size: 1.7, x: -5, y: -0.5, z: -5.5, floatSpeed: 0.5, floatAmp: 0.6, rotSpeedX: 0.3, rotSpeedY: 0.5, rotSpeedZ: 0.2, phase: 1.8 },
  { type: 'date', color: '#6B4C3A', emissive: '#4A3728', size: 1.9, x: -1.5, y: 3, z: -7, floatSpeed: 0.4, floatAmp: 0.7, rotSpeedX: 0.4, rotSpeedY: 0.3, rotSpeedZ: 0.3, phase: 4.2 },
]

function createGeometry(type: NutType): THREE.BufferGeometry {
  switch (type) {
    case 'almond': {
      const geo = new THREE.SphereGeometry(1, 5, 5)
      geo.scale(1, 0.45, 0.65)
      return geo
    }
    case 'cashew': {
      const geo = new THREE.SphereGeometry(1, 5, 5)
      geo.scale(1.3, 0.35, 0.75)
      return geo
    }
    case 'walnut': {
      const geo = new THREE.SphereGeometry(1, 5, 5)
      const pos = geo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        const y = pos.getY(i)
        const z = pos.getZ(i)
        pos.setXYZ(i, x * (1 + Math.sin(x * 8 + y * 6 + z * 7) * 0.1 + Math.cos(y * 5 + z * 9) * 0.08), y * (1 + Math.sin(x * 8 + y * 6 + z * 7) * 0.1 + Math.cos(y * 5 + z * 9) * 0.08), z * (1 + Math.sin(x * 8 + y * 6 + z * 7) * 0.1 + Math.cos(y * 5 + z * 9) * 0.08))
      }
      pos.needsUpdate = true
      geo.computeVertexNormals()
      return geo
    }
    case 'date': {
      const geo = new THREE.SphereGeometry(1, 5, 5)
      geo.scale(0.9, 1.9, 0.75)
      return geo
    }
  }
}

export function Hero3DObjects({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animIdRef = useRef<number>(0)
  const runningRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement!
    const w = parent.clientWidth
    const h = parent.clientHeight
    if (w === 0 || h === 0) return

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 30)
    camera.position.set(0, 0.5, 5)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    scene.add(new THREE.AmbientLight(0xffffff, 0.7))

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2)
    keyLight.position.set(4, 6, 5)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xffcc88, 0.5)
    fillLight.position.set(-3, 1, 4)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0x88ccff, 0.4)
    rimLight.position.set(0, -3, -4)
    scene.add(rimLight)

    const group = new THREE.Group()
    scene.add(group)

    const objects: { mesh: THREE.Mesh; config: NutConfig; baseY: number }[] = []

    for (const cfg of CONFIGS) {
      const geo = createGeometry(cfg.type)
      const mat = new THREE.MeshPhongMaterial({
        color: cfg.color,
        emissive: cfg.emissive,
        emissiveIntensity: 0.06,
        shininess: 20,
        transparent: true,
        opacity: 0.65,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(cfg.x, cfg.y, cfg.z)
      mesh.scale.setScalar(cfg.size)
      objects.push({ mesh, config: cfg, baseY: cfg.y })
      group.add(mesh)
    }

    function animate(time: number) {
      if (!runningRef.current) {
        animIdRef.current = requestAnimationFrame(animate)
        return
      }

      const t = time * 0.001
      for (const { mesh, config, baseY } of objects) {
        mesh.position.y = baseY + Math.sin(t * config.floatSpeed + config.phase) * config.floatAmp
        mesh.rotation.x += config.rotSpeedX * 0.005
        mesh.rotation.y += config.rotSpeedY * 0.005
        mesh.rotation.z += config.rotSpeedZ * 0.005
      }

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      group.rotation.x += (my * 0.04 - group.rotation.x) * 0.02
      group.rotation.y += (mx * 0.06 - group.rotation.y) * 0.02

      renderer.render(scene, camera)
      animIdRef.current = requestAnimationFrame(animate)
    }
    animIdRef.current = requestAnimationFrame(animate)

    const isTouch = window.innerWidth < 768
    const handleMouse = (e: MouseEvent) => {
      if (isTouch) return
      mouseRef.current = {
        x: (e.clientX / w) * 2 - 1,
        y: -((e.clientY / h) * 2 - 1),
      }
    }
    const handleResize = () => {
      const pw = parent.clientWidth
      const ph = parent.clientHeight
      if (pw === 0 || ph === 0) return
      camera.aspect = pw / ph
      camera.updateProjectionMatrix()
      renderer.setSize(pw, ph)
    }

    const observer = new IntersectionObserver(
      ([entry]) => { runningRef.current = entry.isIntersecting },
      { threshold: 0 },
    )
    observer.observe(parent)

    window.addEventListener('mousemove', handleMouse, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      runningRef.current = false
      cancelAnimationFrame(animIdRef.current)
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      for (const { mesh } of objects) {
        mesh.geometry.dispose()
        ;(mesh.material as THREE.Material).dispose()
      }
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
