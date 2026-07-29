/**
 * Material colours for the 3D scene. These describe physical materials — stucco,
 * timber, rock, water — not the brand, so they are deliberately separate from the
 * CSS custom properties in `index.css`, which carry the flyer's teal/charcoal identity.
 */
export const COLORS = {
  stucco: '#efe9df',
  timber: '#7a5638',
  timberDark: '#5d4029',
  roof: '#4a4038',
  stone: '#8d8a83',
  grass: '#6f7f57',
  conifer: '#31462f',
  water: '#4d8ba6',
  waterDeep: '#3b6f88',
  dirt: '#9a7d5c',
  skin: '#d9a882',
  trim: '#f6f2ea',
  shutter: '#8c4a30',
  glass: '#5f7f92',

  // The near mountain is close enough to be lit like scenery rather than backdrop, so
  // it takes a warmer, darker rock than the bands behind it. It also has to hold a
  // white piste against it — the blue-grey backdrop tones do not.
  rockHome: '#6b7169',

  // Mountain bands, near to far. The lightening is atmospheric perspective done by
  // hand — these meshes opt out of fog (see Peaks.jsx), so nothing else fades them.
  rockNear: '#63798a',
  rockMid: '#7d94a6',
  rockFar: '#9db3c3',
  snow: '#f2f6f8',
}

/** Jacket colours for the figures — picked to stay legible against grass and water. */
export const JACKETS = ['#c8452f', '#e0a52e', '#2f7fa8', '#d96a2b', '#4a9c6b', '#b8423f']
