import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Group, Vector3 } from 'three'

interface InteractiveModelProps {
  path: string
  position: [number, number, number]
  name?: string
}

export function InteractiveModel({
  path,
  position,
}: InteractiveModelProps) {
  const { scene } = useGLTF(path)
  const groupRef = useRef<Group>(null)
  const { viewport, pointer } = useThree()
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  
  // Spring physics for smooth animations
  const scaleVelocity = useRef(0)
  const targetScale = useRef(1)
  const currentScale = useRef(1)
  
  const basePosition = useRef(new Vector3(...position))
  const mouseOffset = useRef(new Vector3(0, 0, 0))
  const velocity = useRef(new Vector3(0, 0, 0))
  const targetPosition = useRef(new Vector3(...position))
  const currentPosition = useRef(new Vector3(...position))
  
  // Rotation state
  const rotationVelocity = useRef({ x: 0, y: 0, z: 0 })
  const currentRotation = useRef({ x: 0, y: 0, z: 0 })
  
  // Click animation state
  const clickTime = useRef(0)

  // Clone the scene to avoid mutating the original
  const clonedScene = scene.clone()

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Spring-based scale animation
    const scaleSpring = 15
    const scaleDamping = 0.85
    
    if (isHovered) {
      targetScale.current = 1.15
    } else if (isClicked) {
      targetScale.current = 1.25
    } else {
      targetScale.current = 1
    }

    const scaleDiff = targetScale.current - currentScale.current
    scaleVelocity.current += scaleDiff * scaleSpring * delta
    scaleVelocity.current *= scaleDamping
    currentScale.current += scaleVelocity.current * delta
    
    groupRef.current.scale.setScalar(currentScale.current)

    // Mouse following effect - smooth 3D offset based on pointer position
    if (isHovered || isClicked) {
      const followStrength = isClicked ? 0.8 : 0.5
      const targetOffset = new Vector3(
        pointer.x * viewport.width * 0.3 * followStrength,
        pointer.y * viewport.height * 0.3 * followStrength,
        (pointer.x + pointer.y) * 0.2 * followStrength
      )
      mouseOffset.current.lerp(targetOffset, delta * 6)
    } else {
      mouseOffset.current.lerp(new Vector3(0, 0, 0), delta * 4)
    }

    // Click animation - fluid impulse
    if (isClicked) {
      clickTime.current += delta
      
      // Impulse-based rotation
      const impulseDecay = 0.92
      rotationVelocity.current.x *= impulseDecay
      rotationVelocity.current.y *= impulseDecay
      rotationVelocity.current.z *= impulseDecay
      
      if (clickTime.current < 0.1) {
        // Initial impulse on click
        rotationVelocity.current.y += delta * 8
        rotationVelocity.current.x += delta * 4
      }
      
      // Floating effect
      const floatHeight = Math.sin(state.clock.elapsedTime * 3) * 0.3
      mouseOffset.current.y += floatHeight * delta * 2
    } else {
      clickTime.current = 0
      rotationVelocity.current.x *= 0.95
      rotationVelocity.current.y *= 0.95
      rotationVelocity.current.z *= 0.95
    }

    // Apply rotation velocities
    currentRotation.current.x += rotationVelocity.current.x * delta
    currentRotation.current.y += rotationVelocity.current.y * delta
    currentRotation.current.z += rotationVelocity.current.z * delta
    
    // Base rotation with smooth acceleration
    const baseRotationSpeed = isHovered ? 1.2 : 0.4
    const rotationAccel = isHovered ? 0.8 : 0.3
    
    if (isHovered && !isClicked) {
      // Smooth rotation increase on hover
      currentRotation.current.y += baseRotationSpeed * delta
      currentRotation.current.x += Math.sin(state.clock.elapsedTime * 2) * rotationAccel * delta
    } else if (!isClicked) {
      // Gentle idle rotation
      currentRotation.current.y += baseRotationSpeed * delta * 0.5
    }

    groupRef.current.rotation.set(
      currentRotation.current.x,
      currentRotation.current.y,
      currentRotation.current.z
    )

    // Smooth position with spring physics
    targetPosition.current.copy(basePosition.current).add(mouseOffset.current)
    
    const springStrength = 12
    const damping = 0.85
    const diff = targetPosition.current.clone().sub(currentPosition.current)
    velocity.current.add(diff.multiplyScalar(springStrength * delta))
    velocity.current.multiplyScalar(damping)
    currentPosition.current.add(velocity.current.clone().multiplyScalar(delta))
    
    groupRef.current.position.copy(currentPosition.current)
  })

  const handlePointerEnter = (e: any) => {
    e.stopPropagation()
    setIsHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerLeave = (e: any) => {
    e.stopPropagation()
    setIsHovered(false)
    document.body.style.cursor = 'default'
  }

  const handleClick = (e: any) => {
    e.stopPropagation()
    const wasClicked = isClicked
    setIsClicked(!wasClicked)
    
    if (!wasClicked) {
      // Add rotational impulse on click
      rotationVelocity.current.y += 2
      rotationVelocity.current.x += 0.8
      clickTime.current = 0
      
      // Auto-reset after animation
      setTimeout(() => {
        setIsClicked(false)
      }, 3000)
    }
  }

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <primitive object={clonedScene} />
    </group>
  )
}

