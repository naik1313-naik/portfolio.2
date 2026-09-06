import { useMemo, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { clamp, lerp, prefersReducedMotion } from '../../lib/utils'

function makeSNTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!
  const draw = () => {
    ctx.clearRect(0, 0, 512, 512)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = '900 300px "Syne Variable", sans-serif'
    ctx.shadowColor = '#ff4b1f'
    ctx.shadowBlur = 64
    ctx.fillStyle = '#f4f0e8'
    ctx.fillText('SN', 256, 262)
    ctx.font = '900 96px "Syne Variable", sans-serif'
    ctx.shadowBlur = 22
    ctx.fillStyle = '#ff4b1f'
    ctx.fillText('*', 402, 168)
  }
  draw()
  if (document.fonts && typeof document.fonts.load === 'function') {
    document.fonts.load('900 300px "Syne Variable"').then(() => {
      draw()
      tex.needsUpdate = true
    })
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

function SpaceMark({ texture }: { texture: THREE.CanvasTexture }) {
  const layers = useMemo(() => {
    const count = 28
    const gap = 0.034
    return Array.from({ length: count }, (_, i) => ({
      z: (i - (count - 1) / 2) * gap,
      scale: 1 - Math.pow(Math.abs(i - (count - 1) / 2) / ((count - 1) / 2), 2) * 0.06,
    }))
  }, [])
  return (
    <group scale={1.65}>
      {layers.map((layer, i) => (
        <mesh key={i} position={[0, 0, layer.z]} scale={layer.scale}>
          <planeGeometry args={[1.35, 1.35]} />
          <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

function SceneSN() {
  const spin = useRef<THREE.Group>(null)
  const texture = useMemo(makeSNTexture, [])

  useFrame(({ camera }) => {
    const sc = clamp(window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight), 0, 1)
    if (spin.current) {
      spin.current.position.y = lerp(0, -0.9, sc)
      spin.current.scale.setScalar(lerp(1, 0.9, sc))
    }
    camera.position.z = lerp(7.6, 9.2, sc)
    camera.position.x = lerp(0, 0.3, sc)
    camera.lookAt(0, spin.current?.position.y ?? 0, 0)
  })

  return (
    <group ref={spin}>
      <group rotation={[0.22, -0.55, 0.1]}>
        <SpaceMark texture={texture} />
      </group>
    </group>
  )
}

export default function Orb() {
  const reduced = prefersReducedMotion()

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: false }}
      frameloop={reduced ? 'demand' : 'always'}
      resize={{ scroll: false }}
    >
      <Suspense fallback={null}>
        <SceneSN />
      </Suspense>
    </Canvas>
  )
}