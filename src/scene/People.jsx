import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { COLORS, JACKETS } from './palette.js'
import { ROUTES, pointOn, loopAlong } from './routes.js'
import {
  HOME_MOUNTAIN as M,
  SLOPE_PITCH,
  PISTE_ANGLE,
  PATH_ANGLE,
  TRAIL_SURFACE,
  onSlope,
  facingDownhill,
} from './mountain.js'
import { useReducedMotion } from '../lib/useReducedMotion.js'

// With motion suppressed the figures still need to be somewhere sensible, so every
// loop is evaluated at this fixed time instead of at zero — which would stack them
// all at the start of their routes.
const FROZEN_T = 6

/**
 * A figure, roughly 1.8 units tall. One unit is one metre elsewhere in the scene
 * (the chalet's ground floor is 3), so these read at human scale beside the building.
 */
function Person({ jacket, pack = false, seated = false }) {
  return (
    <group>
      {!seated && (
        <mesh position={[0, 0.45, 0]} castShadow>
          <capsuleGeometry args={[0.13, 0.55, 4, 8]} />
          <meshStandardMaterial color="#2f3a46" roughness={1} />
        </mesh>
      )}

      <mesh position={[0, seated ? 0.42 : 1.15, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.6, 4, 10]} />
        <meshStandardMaterial color={jacket} roughness={0.9} />
      </mesh>

      <mesh position={[0, seated ? 0.92 : 1.65, 0]} castShadow>
        <sphereGeometry args={[0.17, 12, 10]} />
        <meshStandardMaterial color={COLORS.skin} roughness={1} />
      </mesh>

      {pack && (
        <mesh position={[-0.24, 1.2, 0]} castShadow>
          <boxGeometry args={[0.22, 0.5, 0.34]} />
          <meshStandardMaterial color={COLORS.dirt} roughness={1} />
        </mesh>
      )}
    </group>
  )
}

/**
 * Walkers climbing the mountain path. They ascend the flank, and when they reach the
 * top they restart at the bottom — a loop rather than a there-and-back, because a
 * pair repeatedly walking backwards down the hill reads worse than a hard cut.
 */
function Hikers() {
  const group = useRef()
  const reduced = useReducedMotion()

  // Stop short of both ends: at d = 0 they would stand on the apex, and at the base
  // edge they would step off the cone into thin air.
  const dTop = M.radius * 0.18
  const dBottom = M.radius * 0.97
  const climbSpeed = 1.4

  useFrame((state) => {
    const t = reduced ? FROZEN_T : state.clock.getElapsedTime()
    const span = dBottom - dTop
    const travelled = (t * climbSpeed) % span
    const d = dBottom - travelled
    const [x, y, z] = onSlope(PATH_ANGLE, d, TRAIL_SURFACE)
    group.current.position.set(x, y, z)
    // Facing downhill points them out; they are going up, so add half a turn.
    group.current.rotation.y = facingDownhill(PATH_ANGLE) + Math.PI
  })

  return (
    <group ref={group}>
      {[0, -1.4].map((offset, i) => (
        <Walker key={offset} x={offset} jacket={JACKETS[i]} phase={i * 1.7} pack />
      ))}
    </group>
  )
}

/** A single figure with a walking bob, positioned relative to its group. */
function Walker({ x, jacket, phase, pack }) {
  const ref = useRef()
  const reduced = useReducedMotion()

  useFrame((state) => {
    const t = reduced ? FROZEN_T : state.clock.getElapsedTime()
    ref.current.position.y = Math.abs(Math.sin(t * 4 + phase)) * 0.07
    ref.current.rotation.z = Math.sin(t * 4 + phase) * 0.04
  })

  return (
    <group ref={ref} position={[x, 0, 0]}>
      <Person jacket={jacket} pack={pack} />
    </group>
  )
}

/** A skier carving down the piste, slaloming as they descend. */
function Skier({ jacket, offset = 0, speed = 9, sway = 0.13 }) {
  const group = useRef()
  const body = useRef()
  const reduced = useReducedMotion()

  const dTop = M.radius * 0.2
  const dBottom = M.radius * 0.96

  useFrame((state) => {
    const t = reduced ? FROZEN_T : state.clock.getElapsedTime()
    const span = dBottom - dTop
    const d = dTop + (((t * speed + offset) % span) + span) % span
    const angle = PISTE_ANGLE + Math.sin(t * 1.6 + offset) * sway

    const [x, y, z] = onSlope(angle, d, TRAIL_SURFACE)
    group.current.position.set(x, y, z)
    group.current.rotation.y = facingDownhill(angle)
    // Bank into the turn, rolling about the fall line.
    body.current.rotation.x = Math.sin(t * 1.6 + offset) * 0.25
  })

  return (
    <group ref={group}>
      {/* Skis sit flush with the flank. Deliberately chunkier than scale strictly
          warrants — at the distance the camera views the piste from, a realistically
          thin ski is sub-pixel and simply disappears. */}
      <group rotation={[0, 0, -SLOPE_PITCH]}>
        {[0.17, -0.17].map((sz) => (
          <mesh key={sz} position={[0.12, 0.06, sz]} castShadow>
            <boxGeometry args={[1.8, 0.09, 0.17]} />
            <meshStandardMaterial color={JACKETS[1]} roughness={0.5} metalness={0.2} />
          </mesh>
        ))}
      </group>

      {/* ...but the rider only takes half the slope angle. A skier balances against
          gravity, not perpendicular to the piste; tilting them the full amount makes
          them look felled rather than upright. */}
      <group ref={body} rotation={[0, 0, -SLOPE_PITCH * 0.5]} scale={0.9}>
        <Person jacket={jacket} />
      </group>
    </group>
  )
}

function Cyclist({ jacket, offset = 0, dir = 1, speed = 5 }) {
  const route = ROUTES.bike
  const group = useRef()
  const wheels = useRef([])
  const reduced = useReducedMotion()

  useFrame((state) => {
    const t = reduced ? FROZEN_T : state.clock.getElapsedTime()
    const s = loopAlong(route, t, speed, offset, dir)
    const [x, y, z] = pointOn(route, s)
    group.current.position.set(x, y, z)
    // Riding "backwards" along the route means facing the other way, otherwise the
    // second rider moonwalks down the trail.
    group.current.rotation.y = route.rotY + (dir < 0 ? Math.PI : 0)
    // Roll the wheels at the rate the bike is actually travelling: one radian of
    // wheel per 0.33 units of ground, negative because +X travel spins clockwise
    // when the wheel lies in the XY plane.
    for (const w of wheels.current) if (w) w.rotation.z = -(s / 0.33) * dir
  })

  return (
    <group ref={group}>
      {[0.5, -0.5].map((wx, i) => (
        <mesh
          key={wx}
          ref={(el) => (wheels.current[i] = el)}
          position={[wx, 0.33, 0]}
          castShadow
        >
          <torusGeometry args={[0.33, 0.045, 6, 16]} />
          <meshStandardMaterial color="#23282e" roughness={0.8} />
        </mesh>
      ))}

      {/* frame */}
      <mesh position={[0, 0.52, 0]} rotation={[0, 0, 0.25]} castShadow>
        <boxGeometry args={[1.0, 0.06, 0.06]} />
        <meshStandardMaterial color={JACKETS[2]} roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[-0.18, 0.66, 0]} castShadow>
        <boxGeometry args={[0.06, 0.34, 0.06]} />
        <meshStandardMaterial color="#23282e" roughness={0.7} />
      </mesh>
      <mesh position={[0.46, 0.72, 0]} castShadow>
        <boxGeometry args={[0.06, 0.4, 0.42]} />
        <meshStandardMaterial color="#23282e" roughness={0.7} />
      </mesh>

      {/* rider, tipped forward over the bars */}
      <group position={[0, 0.62, 0]} rotation={[0, 0, -0.55]} scale={0.82}>
        <Person jacket={jacket} seated />
      </group>
    </group>
  )
}

/** Inflatable raft with four paddlers, drifting downstream. */
function Raft() {
  const route = ROUTES.river
  const group = useRef()
  const reduced = useReducedMotion()

  // Two rows of two, facing downstream.
  const seats = [
    [0.5, 0.42],
    [0.5, -0.42],
    [-0.45, 0.42],
    [-0.45, -0.42],
  ]

  useFrame((state) => {
    const t = reduced ? FROZEN_T : state.clock.getElapsedTime()
    const s = loopAlong(route, t, 3.2)
    const [x, y, z] = pointOn(route, s)
    group.current.position.set(x, y + Math.sin(t * 1.8) * 0.05, z)
    group.current.rotation.y = route.rotY
    group.current.rotation.z = Math.sin(t * 1.3) * 0.04
    group.current.rotation.x = Math.sin(t * 2.1 + 1) * 0.03
  })

  return (
    <group ref={group}>
      {/* tube */}
      <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[1.15, 0.24, 8, 20]} />
        <meshStandardMaterial color="#d8d3c6" roughness={0.7} />
      </mesh>
      {/* floor */}
      <mesh position={[0, 0.16, 0]} receiveShadow>
        <cylinderGeometry args={[1.0, 1.0, 0.08, 20]} />
        <meshStandardMaterial color="#3f4750" roughness={0.9} />
      </mesh>

      {seats.map(([sx, sz], i) => (
        <group key={`${sx},${sz}`} position={[sx, 0.24, sz]} scale={0.78}>
          <Person jacket={JACKETS[i]} seated />
          {/* paddle, angled out over the side */}
          <group
            position={[0, 0.5, Math.sign(sz) * 0.3]}
            rotation={[Math.sign(sz) * 0.75, 0, 0.2]}
          >
            <mesh castShadow>
              <boxGeometry args={[0.05, 1.25, 0.05]} />
              <meshStandardMaterial color={COLORS.dirt} roughness={0.9} />
            </mesh>
            <mesh position={[0, -0.68, 0]} castShadow>
              <boxGeometry args={[0.03, 0.3, 0.2]} />
              <meshStandardMaterial color={JACKETS[1]} roughness={0.8} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  )
}

export default function People() {
  return (
    <group>
      <Hikers />
      {/* Two riders, opposed and offset, so the trail is rarely empty from any
          given camera angle. */}
      <Cyclist jacket={JACKETS[3]} offset={0} />
      <Cyclist jacket={JACKETS[4]} offset={19} dir={-1} speed={4.2} />
      <Skier jacket={JACKETS[0]} offset={0} />
      <Skier jacket={JACKETS[2]} offset={17} speed={7.5} sway={0.09} />
      <Skier jacket={JACKETS[5]} offset={31} speed={10.5} sway={0.16} />
      <Raft />
    </group>
  )
}
