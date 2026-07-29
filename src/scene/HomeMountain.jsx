import { COLORS } from './palette.js'
import {
  HOME_MOUNTAIN as M,
  SLOPE_PITCH,
  SLANT,
  PISTE_ANGLE,
  PATH_ANGLE,
  TRAIL_LIFT,
  TRAIL_THICKNESS,
} from './mountain.js'

// Of the height, measured down from the summit. Keep this well above the piste's
// upper end or the white run disappears into the white cap.
const CAP_FRACTION = 0.3

/**
 * A strip laid down one flank, from summit to base. Local +X is the fall line and
 * local +Y is the surface normal, so `lift` pushes it clear of the rock without
 * z-fighting.
 */
function Flank({ angle, width, color, roughness = 1 }) {
  return (
    <group position={[M.center[0], 0, M.center[2]]} rotation={[0, -angle, 0]}>
      <group position={[M.radius / 2, M.base + M.height / 2, 0]} rotation={[0, 0, -SLOPE_PITCH]}>
        <mesh position={[0, TRAIL_LIFT, 0]} receiveShadow>
          <boxGeometry args={[SLANT, TRAIL_THICKNESS, width]} />
          <meshStandardMaterial color={color} roughness={roughness} />
        </mesh>
      </group>
    </group>
  )
}

export default function HomeMountain() {
  const capHeight = M.height * CAP_FRACTION
  const capRadius = M.radius * CAP_FRACTION

  return (
    <group>
      <mesh position={[M.center[0], M.base + M.height / 2, M.center[2]]} castShadow receiveShadow>
        <coneGeometry args={[M.radius, M.height, M.sides]} />
        <meshStandardMaterial color={COLORS.rockHome} roughness={1} flatShading />
      </mesh>

      <mesh
        position={[M.center[0], M.base + M.height - capHeight / 2, M.center[2]]}
        castShadow
        receiveShadow
      >
        <coneGeometry args={[capRadius, capHeight, M.sides]} />
        <meshStandardMaterial color={COLORS.snow} roughness={0.9} flatShading />
      </mesh>

      {/* groomed piste, and the walking path on the far flank */}
      <Flank angle={PISTE_ANGLE} width={13} color={COLORS.snow} roughness={0.85} />
      <Flank angle={PATH_ANGLE} width={2.6} color={COLORS.dirt} />
    </group>
  )
}
