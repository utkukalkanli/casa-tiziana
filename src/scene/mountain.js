/**
 * The near mountain — the one with people on it.
 *
 * It is a cone, so any point on its surface is a function of a compass angle and a
 * horizontal distance from the axis. `onSlope()` is that function, and it is what
 * keeps the skiers, the hikers, the piste and the path all agreeing about where the
 * ground is. Change the cone here and everything on it follows.
 */
export const HOME_MOUNTAIN = {
  center: [-52, 0, -100],
  base: -8, // sits below the ground plane so it rises out of the valley floor
  // Height to radius sets the flank angle, and the flank angle is what the skiers
  // stand on. At 52 wide this cone was 41°, which is a cliff, not a piste — figures
  // tilted to match it read as lying down. A broad base keeps it near 30°.
  height: 44,
  radius: 72,
  // Enough sides that the facets are shallow: figures placed on the ideal cone sit
  // at most 0.9% of the radius off the real surface, which is invisible at this
  // scale. Drop it to 5 or 6 like the backdrop peaks and they visibly float.
  sides: 24,
}

/** Angle of the flank below horizontal. */
export const SLOPE_PITCH = Math.atan(HOME_MOUNTAIN.height / HOME_MOUNTAIN.radius)

/** Slant distance from apex to base edge — the length of a full run. */
export const SLANT = Math.hypot(HOME_MOUNTAIN.height, HOME_MOUNTAIN.radius)

/** The two used flanks, as compass angles in the XZ plane. */
export const PISTE_ANGLE = 0.6
export const PATH_ANGLE = 1.45

// The piste and the path are slabs laid on the rock, so the surface people actually
// stand on is the slab's TOP, not the cone. These three constants exist so that fact
// lives in one place: HomeMountain builds the slab from the first two, People stands
// figures on TRAIL_SURFACE. Place a figure at TRAIL_LIFT instead and it sinks half a
// slab into the snow — skis vanish first, then feet.
export const TRAIL_LIFT = 0.35
export const TRAIL_THICKNESS = 0.3
export const TRAIL_SURFACE = TRAIL_LIFT + TRAIL_THICKNESS / 2

/**
 * World position on the flank at compass `angle`, `d` out from the axis.
 * `lift` offsets along the surface normal — use it to keep a strip from
 * z-fighting with the rock, or to stand a figure on top rather than in it.
 */
export function onSlope(angle, d, lift = 0) {
  const { center, base, height, radius } = HOME_MOUNTAIN
  const y = base + height * (1 - d / radius)
  return [
    center[0] + d * Math.cos(angle) + lift * Math.sin(SLOPE_PITCH) * Math.cos(angle),
    y + lift * Math.cos(SLOPE_PITCH),
    center[2] + d * Math.sin(angle) + lift * Math.sin(SLOPE_PITCH) * Math.sin(angle),
  ]
}

/**
 * Yaw that points a figure's local +X down the fall line at `angle`.
 * A group rotated by `y` maps local +X to (cos y, 0, -sin y), so the sign flips.
 */
export function facingDownhill(angle) {
  return -angle
}
