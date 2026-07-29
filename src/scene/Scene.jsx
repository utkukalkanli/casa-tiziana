import { OrbitControls } from '@react-three/drei'
import Chalet from './Chalet.jsx'
import HomeMountain from './HomeMountain.jsx'
import Landscape from './Landscape.jsx'
import Peaks from './Peaks.jsx'
import People from './People.jsx'
import { useReducedMotion } from '../lib/useReducedMotion.js'

export default function Scene() {
  const reducedMotion = useReducedMotion()

  return (
    <>
      <color attach="background" args={['#b9d3e2']} />
      <fog attach="fog" args={['#b9d3e2', 80, 340]} />

      {/* Sky/bounce fill. Without a generous hemisphere term the faces turned away
          from the sun go almost black, since there is no environment map. */}
      <hemisphereLight args={['#dceaf5', '#6b7a56', 1.9]} />
      <directionalLight
        position={[18, 26, 12]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        // Wide enough to cover the routes in routes.js — figures that wander outside
        // this frustum silently lose their shadows halfway through the loop.
        shadow-camera-left={-42}
        shadow-camera-right={42}
        shadow-camera-top={42}
        shadow-camera-bottom={-42}
        shadow-bias={-0.0005}
      />

      <Chalet />
      <Landscape />
      <HomeMountain />
      <People />
      <Peaks />

      <OrbitControls
        makeDefault
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.3}
        enablePan={false}
        // The page scrolls now, and the canvas is fixed across the whole viewport. If
        // the controls kept the wheel, a reader scrolling towards the copy below would
        // dolly the camera instead and never reach it. Rotation is the interaction
        // worth having here; zoom was never load-bearing.
        enableZoom={false}
        minDistance={14}
        maxDistance={44}
        // Lower bound keeps the camera above the horizon so it never dips under the
        // ground plane; upper bound stops a drag from parking it directly overhead,
        // staring down at the roof with the mountains out of frame.
        minPolarAngle={0.95}
        maxPolarAngle={Math.PI / 2 - 0.06}
        target={[0, 3, 0]}
      />
    </>
  )
}
