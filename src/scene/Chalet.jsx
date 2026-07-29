import { useMemo } from 'react'
import * as THREE from 'three'
import { COLORS } from './palette.js'

// Chalet dimensions. The roof maths below all derive from these, so the building
// stays coherent if you resize it.
export const W = 8 // width, along X (ridge runs this way)
export const D = 6 // depth, along Z
const GROUND_H = 3 // stucco ground floor
const UPPER_H = 2.6 // timber upper floor
const EAVE_Y = GROUND_H + UPPER_H
const PITCH = THREE.MathUtils.degToRad(38)
const RISE = (D / 2) * Math.tan(PITCH) // ridge height above the eaves
const SLOPE = D / 2 / Math.cos(PITCH) // eave-to-ridge run

/** Gabled roof: two sloped planes plus a triangular end wall at each gable. */
function Roof() {
  const gable = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-D / 2, 0)
    s.lineTo(D / 2, 0)
    s.lineTo(0, RISE)
    s.closePath()
    return s
  }, [])

  // Nudge each plane down-slope so the overhang lands at the eave rather than
  // splitting evenly between eave and ridge.
  const overhang = 0.9
  const planeLen = SLOPE + overhang
  const shift = overhang / 2
  const z = D / 4 + shift * Math.cos(PITCH)
  const y = EAVE_Y + RISE / 2 - shift * Math.sin(PITCH)

  return (
    <group>
      {[1, -1].map((dir) => (
        <mesh
          key={dir}
          position={[0, y, dir * z]}
          rotation={[dir * PITCH, 0, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[W + 1.2, 0.26, planeLen]} />
          <meshStandardMaterial color={COLORS.roof} roughness={0.85} />
        </mesh>
      ))}

      {[1, -1].map((dir) => (
        <mesh
          key={dir}
          position={[dir * (W / 2), EAVE_Y, 0]}
          rotation={[0, dir * (Math.PI / 2), 0]}
          castShadow
        >
          <extrudeGeometry args={[gable, { depth: 0.25, bevelEnabled: false }]} />
          <meshStandardMaterial color={COLORS.timber} roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

/** Balcony slab plus rail, projecting from one face of the upper floor. */
function Balcony({ position, rotation = [0, 0, 0], length }) {
  const posts = useMemo(
    () => Array.from({ length: Math.floor(length / 0.5) }, (_, i) => -length / 2 + 0.25 + i * 0.5),
    [length],
  )

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[length, 0.16, 1.4]} />
        <meshStandardMaterial color={COLORS.timberDark} roughness={0.9} />
      </mesh>

      {posts.map((x) => (
        <mesh key={x} position={[x, 0.5, 0.62]} castShadow>
          <boxGeometry args={[0.08, 0.9, 0.08]} />
          <meshStandardMaterial color={COLORS.timber} roughness={0.9} />
        </mesh>
      ))}

      <mesh position={[0, 0.95, 0.62]} castShadow>
        <boxGeometry args={[length, 0.12, 0.16]} />
        <meshStandardMaterial color={COLORS.timber} roughness={0.9} />
      </mesh>
    </group>
  )
}

/**
 * Openings are applied as thin panels proud of the wall rather than cut through it —
 * boolean subtraction on box geometry would need CSG, and at this scale a recessed
 * frame reads the same. `depth` pushes each panel just clear of its wall face.
 */
function Window({ position, rotation = [0, 0, 0], w = 0.9, h = 1.1, shutters = true }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[w + 0.16, h + 0.16, 0.06]} />
        <meshStandardMaterial color={COLORS.trim} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[w, h, 0.06]} />
        <meshStandardMaterial
          color={COLORS.glass}
          roughness={0.12}
          metalness={0.45}
          envMapIntensity={0.6}
        />
      </mesh>
      {/* glazing bar */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.05, h, 0.03]} />
        <meshStandardMaterial color={COLORS.trim} roughness={0.8} />
      </mesh>

      {shutters &&
        [1, -1].map((side) => (
          <mesh key={side} position={[side * (w / 2 + 0.22), 0, 0.06]}>
            <boxGeometry args={[0.4, h + 0.12, 0.05]} />
            <meshStandardMaterial color={COLORS.shutter} roughness={0.85} />
          </mesh>
        ))}
    </group>
  )
}

function Door({ position, rotation = [0, 0, 0], w = 1.0, h = 2.1, color }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[w + 0.18, h + 0.1, 0.06]} />
        <meshStandardMaterial color={COLORS.trim} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[w, h, 0.06]} />
        <meshStandardMaterial color={color ?? COLORS.timberDark} roughness={0.75} />
      </mesh>
      {/* handle */}
      <mesh position={[w / 2 - 0.16, 0, 0.08]}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshStandardMaterial color="#c9b27a" roughness={0.35} metalness={0.7} />
      </mesh>
    </group>
  )
}

/** Front face is +Z, back is -Z, gable ends are ±X. */
function Openings() {
  const frontZ = D / 2 + 0.04
  const backZ = -(D / 2 + 0.04)
  const sideX = W / 2 + 0.04
  const faceBack = [0, Math.PI, 0]
  const faceLeft = [0, -Math.PI / 2, 0]
  const faceRight = [0, Math.PI / 2, 0]

  return (
    <group>
      {/* ground floor, front: entrance flanked by windows */}
      <Door position={[-1.6, 1.05, frontZ]} />
      <Window position={[0.9, 1.6, frontZ]} />
      <Window position={[2.9, 1.6, frontZ]} />

      {/* ground floor, back and ends */}
      <Window position={[-2.2, 1.6, backZ]} rotation={faceBack} />
      <Window position={[1.4, 1.6, backZ]} rotation={faceBack} />
      <Window position={[-sideX, 1.6, 1.4]} rotation={faceLeft} w={0.8} />
      <Window position={[-sideX, 1.6, -1.4]} rotation={faceLeft} w={0.8} />
      <Window position={[sideX, 1.6, -1.4]} rotation={faceRight} w={0.8} />

      {/* upper floor: balcony doors front and left, windows elsewhere */}
      <Door position={[-1.2, 4.15, frontZ]} w={0.95} h={2.0} color={COLORS.glass} />
      <Door position={[1.6, 4.15, frontZ]} w={0.95} h={2.0} color={COLORS.glass} />
      <Window position={[3.2, 4.4, frontZ]} h={1.0} />
      <Window position={[-2.4, 4.4, backZ]} rotation={faceBack} h={1.0} />
      <Window position={[0.4, 4.4, backZ]} rotation={faceBack} h={1.0} />
      <Window position={[2.9, 4.4, backZ]} rotation={faceBack} h={1.0} />
      <Door position={[-sideX, 4.15, 0]} rotation={faceLeft} w={0.95} h={2.0} color={COLORS.glass} />
      <Window position={[sideX, 4.4, 1.5]} rotation={faceRight} h={1.0} w={0.8} />

      {/* gable vents, up in the triangle */}
      {[1, -1].map((dir) => (
        <mesh key={dir} position={[dir * (W / 2 + 0.28), EAVE_Y + 0.75, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.06, 0.55, 0.7]} />
          <meshStandardMaterial color={COLORS.timberDark} roughness={0.9} />
        </mesh>
      ))}

      {/* garage door, on the +X face of the annex */}
      <Door
        position={[W / 2 + 3.02, 0.95, 0.6]}
        rotation={faceRight}
        w={2.4}
        h={1.7}
        color={COLORS.shutter}
      />
    </group>
  )
}

export default function Chalet() {
  return (
    <group>
      {/* stucco ground floor */}
      <mesh position={[0, GROUND_H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, GROUND_H, D]} />
        <meshStandardMaterial color={COLORS.stucco} roughness={0.9} />
      </mesh>

      {/* timber upper floor */}
      <mesh position={[0, GROUND_H + UPPER_H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[W - 0.1, UPPER_H, D - 0.1]} />
        <meshStandardMaterial color={COLORS.timber} roughness={0.95} />
      </mesh>

      <Balcony position={[0, GROUND_H + 0.1, D / 2 + 0.6]} length={W + 1} />
      <Balcony
        position={[-(W / 2 + 0.6), GROUND_H + 0.1, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        length={D + 1}
      />

      <Roof />
      <Openings />

      {/* garage cut into the slope, as on the flyer — overlapped into the main
          block by 0.2 so the two never show a seam as the camera orbits */}
      <mesh position={[W / 2 + 1.4, 1.1, 0.6]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 2.2, 4]} />
        <meshStandardMaterial color={COLORS.stucco} roughness={0.9} />
      </mesh>
      <mesh position={[W / 2 + 1.4, 2.25, 0.6]} castShadow>
        <boxGeometry args={[3.4, 0.2, 4.2]} />
        <meshStandardMaterial color={COLORS.roof} roughness={0.85} />
      </mesh>

      {/* stone retaining wall */}
      <mesh position={[1, 0.55, D / 2 + 5]} castShadow receiveShadow>
        <boxGeometry args={[16, 1.1, 0.6]} />
        <meshStandardMaterial color={COLORS.stone} roughness={1} />
      </mesh>
    </group>
  )
}
