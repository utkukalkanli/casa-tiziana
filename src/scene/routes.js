/**
 * The paths through the landscape: the river, the bike trail and the hiking trail.
 *
 * Both halves of the scene read from here — `Landscape` draws the strip of geometry,
 * `People` walks figures along it — so a route can be moved or re-angled in one place
 * without the raft ending up in a field.
 *
 * A route is a straight strip centred on `center`, running along its local X axis and
 * yawed by `rotY`.
 *
 * `travel` is how far either side of centre a figure roams. Two ceilings on it: past
 * ~40 a figure leaves the directional light's shadow camera and silently loses its
 * shadow, and past ~25 it spends most of the loop outside the default camera framing,
 * so the scene reads as empty. Keep it tight — the point of the figures is that they
 * are visible.
 */
export const ROUTES = {
  river: { center: [2, 0.06, 17], rotY: 0.12, width: 8, length: 150, travel: 24 },
  bike: { center: [-1, 0.04, -14], rotY: 0.3, width: 2.2, length: 110, travel: 22 },
}
// The hikers used to have a route here too. They now walk the flank of the near
// mountain instead — see mountain.js, which parameterises positions on the cone
// rather than along a straight strip.

/** World position at distance `s` along a route, measured from its centre. */
export function pointOn(route, s) {
  const [cx, cy, cz] = route.center
  return [cx + s * Math.cos(route.rotY), cy, cz - s * Math.sin(route.rotY)]
}

/**
 * Wrap elapsed time into a position on the route, so a figure loops instead of
 * walking off to infinity. `dir` of -1 sends it the other way.
 */
export function loopAlong(route, t, speed, offset = 0, dir = 1) {
  const span = route.travel * 2
  const raw = (t * speed + offset) * dir
  return (((raw % span) + span) % span) - route.travel
}
