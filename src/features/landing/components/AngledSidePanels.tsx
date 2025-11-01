import { DoubleSide } from 'three'

export function AngledSidePanels() {
  return (
    <group position={[0, -0.5, -1.4]}>
      <mesh position={[-4, 0, 0]} rotation={[0, Math.PI / 6, 0]}>
        <planeGeometry args={[3.4, 4.4]} />
        <meshStandardMaterial
          color="#141823"
          roughness={0.75}
          metalness={0.25}
          side={DoubleSide}
        />
      </mesh>
      <mesh position={[4, 0, 0]} rotation={[0, -Math.PI / 6, 0]}>
        <planeGeometry args={[3.4, 4.4]} />
        <meshStandardMaterial
          color="#141823"
          roughness={0.75}
          metalness={0.25}
          side={DoubleSide}
        />
      </mesh>
      <mesh position={[-3.7, -2.1, 0.6]} rotation={[Math.PI / 2.4, Math.PI / 5, 0]}>
        <planeGeometry args={[3.2, 1.6]} />
        <meshStandardMaterial color="#090b13" metalness={0.55} roughness={0.4} />
      </mesh>
      <mesh position={[3.7, -2.1, 0.6]} rotation={[Math.PI / 2.4, -Math.PI / 5, 0]}>
        <planeGeometry args={[3.2, 1.6]} />
        <meshStandardMaterial color="#090b13" metalness={0.55} roughness={0.4} />
      </mesh>
    </group>
  )
}
