import { COLORS } from './palette.js'

// Base sits below the horizon so the ranges rise out of the ground plane rather
// than floating on it.
const BASE_Y = -8
const SNOW_FRACTION = 0.26 // of a peak's height, measured down from the tip
const SNOW_MIN_HEIGHT = 60

/**
 * Three ranges at increasing distance: [x, height, radius, sides, yaw].
 * Sides vary between 4 and 6 so the silhouettes don't repeat; the yaw turns each
 * cone so no two present the same face.
 */
const BANDS = [
  {
    z: -135,
    color: COLORS.rockNear,
    peaks: [
      [-150, 58, 38, 5, 0.4],
      [-58, 72, 44, 4, 1.1],
      [40, 54, 34, 6, 0.2],
      [128, 64, 40, 5, 0.8],
      [232, 50, 32, 4, 1.4],
    ],
  },
  {
    z: -225,
    color: COLORS.rockMid,
    peaks: [
      [-262, 96, 60, 5, 0.9],
      [-120, 114, 68, 4, 0.3],
      [16, 88, 54, 6, 1.2],
      [150, 108, 64, 5, 0.6],
      [300, 92, 58, 4, 0.1],
    ],
  },
  {
    z: -340,
    color: COLORS.rockFar,
    peaks: [
      [-340, 140, 88, 4, 0.7],
      [-160, 158, 96, 5, 0.2],
      [30, 128, 80, 6, 1.0],
      [210, 150, 92, 5, 1.3],
      [380, 134, 84, 4, 0.5],
    ],
  },
]

function Peak({ h, r, sides, yaw, color }) {
  const capH = h * SNOW_FRACTION
  const capR = r * SNOW_FRACTION

  return (
    <group rotation={[0, yaw, 0]}>
      <mesh position={[0, BASE_Y + h / 2, 0]}>
        <coneGeometry args={[r, h, sides]} />
        {/* fog={false} is the point: at this distance the scene fog would blend the
            ranges into the sky colour exactly and they would vanish. Opting out lets
            them read as flat silhouettes, and the per-band colour does the job fog
            would otherwise do. */}
        <meshStandardMaterial color={color} roughness={1} flatShading fog={false} />
      </mesh>

      {h >= SNOW_MIN_HEIGHT && (
        <mesh position={[0, BASE_Y + h - capH / 2, 0]}>
          <coneGeometry args={[capR, capH, sides]} />
          <meshStandardMaterial color={COLORS.snow} roughness={0.95} flatShading fog={false} />
        </mesh>
      )}
    </group>
  )
}

export default function Peaks() {
  return (
    <group>
      {BANDS.map((band) =>
        band.peaks.map(([x, h, r, sides, yaw]) => (
          <group key={`${band.z}:${x}`} position={[x, 0, band.z]}>
            <Peak h={h} r={r} sides={sides} yaw={yaw} color={band.color} />
          </group>
        )),
      )}
    </group>
  )
}
