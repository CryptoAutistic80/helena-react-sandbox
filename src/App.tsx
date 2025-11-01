import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, PerspectiveCamera } from '@react-three/drei'
import { AngledSidePanels, CenterStage, LaptopFrame } from './features/landing/components'
import './App.css'

function App() {
  return (
    <div className="landing-page">
      <main className="landing-content">
        <section className="landing-copy">
          <p className="tag">Now streaming in 3D</p>
          <h1>Shape immersive product stories.</h1>
          <p className="lead">
            Design, animate, and ship interactive product walk-throughs straight from your
            browser. Helena Studio keeps your visuals responsive while rendering in real
            time, so every launch feels cinematic.
          </p>
          <div className="landing-actions">
            <a className="cta primary" href="#">Start building</a>
            <a className="cta" href="#">View docs</a>
          </div>
        </section>

        <section className="stage-band">
          <div className="stage-shell">
            <Canvas className="stage-canvas" dpr={[1, 2]} shadows>
              <color attach="background" args={["#03050a"]} />
              <PerspectiveCamera makeDefault position={[0, 0.6, 8]} fov={40} />

              <ambientLight intensity={0.6} />
              <directionalLight
                castShadow
                intensity={1.3}
                position={[5.2, 6.5, 6]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <spotLight
                castShadow
                position={[-4.5, 6.5, 3.2]}
                angle={0.65}
                penumbra={0.5}
                intensity={0.8}
                color="#62afff"
              />

              <AngledSidePanels />
              <LaptopFrame />
              <CenterStage />

              <ContactShadows position={[0, -2.8, 0]} opacity={0.35} scale={12} blur={2.5} far={5} />
              <Environment preset="city" />
            </Canvas>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
