import { RoundedBox } from '@react-three/drei'

export function LaptopFrame() {
  return (
    <group position={[0, -0.15, 0]}>
      <RoundedBox args={[5.8, 3.5, 0.28]} radius={0.2} smoothness={6}>
        <meshStandardMaterial
          color="#191b22"
          metalness={0.7}
          roughness={0.3}
        />
      </RoundedBox>

      <RoundedBox args={[5.3, 3, 0.18]} radius={0.16} smoothness={6} position={[0, 0, 0.08]}>
        <meshStandardMaterial color="#04070d" metalness={0.6} roughness={0.4} />
      </RoundedBox>

      <RoundedBox args={[6.6, 0.5, 0.3]} radius={0.1} smoothness={4} position={[0, -2.15, 0.3]}>
        <meshStandardMaterial color="#15171f" metalness={0.65} roughness={0.35} />
      </RoundedBox>

      <mesh position={[0, -2.4, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.6, 4]} />
        <meshStandardMaterial color="#0d1017" metalness={0.4} roughness={0.8} />
      </mesh>

      <mesh position={[0, -2.4, 0.31]}>
        <boxGeometry args={[6.6, 0.1, 0.62]} />
        <meshStandardMaterial color="#1f212a" metalness={0.5} roughness={0.6} />
      </mesh>
    </group>
  )
}
