import { COLORS } from './palette.js'
import { ROUTES } from './routes.js'

/** "Quiet location near the forest" — a fixed scatter, so the layout is stable. */
const TREES = [
  [-11, -6, 2.6],
  [-8.5, -9, 3.4],
  [-13, 1, 3],
  [-9, 6, 2.2],
  [12, -8, 3.1],
  [15, -2, 2.7],
  [10, 9, 2.4],
  [16, 6, 3.3],
  [-16, -2, 2.9],
  [4, -11, 3.2],
  [-3, -13, 2.5],
  [24, -14, 3.0],
  [-26, -10, 2.8],
  [30, 4, 2.6],
]

function Forest() {
  return (
    <group>
      {TREES.map(([x, z, h]) => (
        <group key={`${x},${z}`} position={[x, 0, z]}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.16, 0.8, 6]} />
            <meshStandardMaterial color={COLORS.timberDark} roughness={1} />
          </mesh>
          <mesh position={[0, 0.8 + h / 2, 0]} castShadow>
            <coneGeometry args={[h * 0.32, h, 7]} />
            <meshStandardMaterial color={COLORS.conifer} roughness={1} flatShading />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/** A route rendered as a flat strip. Long axis is local X, matching `pointOn()`. */
function Strip({ route, color, thickness = 0.06, roughness = 1, metalness = 0 }) {
  return (
    <mesh position={route.center} rotation={[0, route.rotY, 0]} receiveShadow>
      <boxGeometry args={[route.length, thickness, route.width]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  )
}

function River() {
  const { river } = ROUTES
  const bankOffset = river.width / 2 + 0.7

  return (
    <group>
      <Strip route={river} color={COLORS.water} roughness={0.22} metalness={0.15} />

      {/* darker channel down the middle, to keep the water from reading as a flat slab */}
      <mesh
        position={[river.center[0], river.center[1] + 0.02, river.center[2]]}
        rotation={[0, river.rotY, 0]}
      >
        <boxGeometry args={[river.length, 0.04, river.width * 0.45]} />
        <meshStandardMaterial color={COLORS.waterDeep} roughness={0.18} metalness={0.2} />
      </mesh>

      {/* gravel banks */}
      {[1, -1].map((side) => (
        <mesh
          key={side}
          position={[
            river.center[0] + side * bankOffset * Math.sin(river.rotY),
            0.03,
            river.center[2] + side * bankOffset * Math.cos(river.rotY),
          ]}
          rotation={[0, river.rotY, 0]}
          receiveShadow
        >
          <boxGeometry args={[river.length, 0.05, 1.4]} />
          <meshStandardMaterial color={COLORS.stone} roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

export default function Landscape() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[900, 900]} />
        <meshStandardMaterial color={COLORS.grass} roughness={1} />
      </mesh>

      <Strip route={ROUTES.bike} color={COLORS.dirt} thickness={0.05} />
      <River />
      <Forest />
    </group>
  )
}
