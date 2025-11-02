import { Scene } from './components/Scene'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Scene />
      <div className="content-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to the Future</h1>
          <p className="hero-subtitle">
            Explore immersive 3D experiences powered by React Three Fiber
          </p>
          <div className="hero-actions">
            <button className="cta-button primary">Get Started</button>
            <button className="cta-button secondary">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
