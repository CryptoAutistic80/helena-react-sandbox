import { useEffect, useRef, useState } from 'react'
import { DoubleSide, Mesh, Texture } from 'three'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { createLandscapeTexture } from '../helpers'

export function CenterStage() {
  const ring = useRef<Mesh>(null)
  const [landscapeTexture, setLandscapeTexture] = useState<Texture | null>(null)

  useFrame((_, delta) => {
    if (!ring.current) return
    ring.current.rotation.z += delta * 0.4
  })

  useEffect(() => {
    let cancelled = false

    createLandscapeTexture()
      .then((texture) => {
        if (cancelled) {
          texture.dispose()
          return
        }
        setLandscapeTexture(texture)
      })
      .catch((error) => {
        console.error('[CenterStage] Unable to prepare landscape texture', error)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => () => {
      landscapeTexture?.dispose()
    },
    [landscapeTexture],
  )

  return (
    <group>
      <mesh position={[0, 0.1, -2.4]}>
        <planeGeometry args={[9, 5]} />
        <meshBasicMaterial
          color="#142236"
          map={landscapeTexture ?? undefined}
          toneMapped={false}
          side={DoubleSide}
        />
      </mesh>

      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.2}>
        <mesh castShadow position={[0, 0.4, 0]}>
          <icosahedronGeometry args={[0.85, 1]} />
          <MeshDistortMaterial
            color="#61dafb"
            speed={2}
            distort={0.35}
            radius={1}
            metalness={0.4}
            roughness={0.1}
          />
        </mesh>
      </Float>

      <Sparkles count={24} scale={[4, 3, 2]} size={2} speed={0.4} opacity={0.4} />

      <mesh ref={ring} position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 2.2, 64]} />
        <meshStandardMaterial
          color="#7fe9ff"
          emissive="#3cc4ff"
          emissiveIntensity={1.5}
          roughness={0.2}
          metalness={0.1}
          side={DoubleSide}
        />
      </mesh>

      <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.2, 48]} />
        <meshStandardMaterial color="#080c12" roughness={0.95} />
      </mesh>
    </group>
  )
}
