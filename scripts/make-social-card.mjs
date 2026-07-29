/**
 * Draws public/social-card.jpg — the 1200x630 image that Open Graph serves to
 * WhatsApp, Facebook, iMessage, Slack and X.
 *
 *   node scripts/make-social-card.mjs
 *
 * This matters more here than on most sites: the flyer's call to action is a WhatsApp
 * message, so the link is pasted into a chat far more often than it is clicked out of
 * a search result. A link with no card is a bare grey URL in a thread; a link with one
 * is the property.
 *
 * It is drawn rather than screenshotted on purpose. A screenshot of the live scene
 * would need re-taking after every change to the 3D, at whatever the camera's
 * auto-rotation happened to be framing at the time, and the hero's copy is laid out
 * for a tall phone rather than a 1.91:1 card. This redraws the same brand — the
 * flyer's charcoal and teal, the scene's layered ranges — at the card's proportions,
 * with the three facts a reader in a chat window actually needs: where, how many, how
 * much.
 *
 * Text is set in Helvetica/Arial, which the rasteriser resolves against system fonts.
 * If the output ever comes back with the wrong metrics, that is the cause — check the
 * rendered file before committing it.
 */
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const W = 1200
const H = 630

const TEAL = '#7fadad'
const TEAL_DEEP = '#5c8f8f'
const CHARCOAL = '#2c3038'
const SLATE = '#464f5c'
const PAPER = '#f4f2ee'

/** A peak as a triangle, with the snow cap cut off it at a fixed fraction of height. */
function peak({ x, baseY, halfWidth, height, fill, cap = 0, capFill = PAPER }) {
  const apexY = baseY - height
  const body = `<path d="M${x - halfWidth} ${baseY}L${x} ${apexY}L${x + halfWidth} ${baseY}Z" fill="${fill}"/>`
  if (!cap) return body

  // The cap is the similar triangle from the apex down to `cap` of the height, with a
  // slightly ragged underside so it does not read as a paper hat.
  const capH = height * cap
  const capW = halfWidth * cap
  const y = apexY + capH
  const snow =
    `<path d="M${x} ${apexY}` +
    `L${x + capW} ${y}` +
    `L${x + capW * 0.45} ${y - capH * 0.28}` +
    `L${x} ${y + capH * 0.1}` +
    `L${x - capW * 0.5} ${y - capH * 0.22}` +
    `L${x - capW} ${y}Z" fill="${capFill}"/>`
  return body + snow
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="sky" cx="0.78" cy="0.72" r="0.72">
      <stop offset="0" stop-color="#464f5c"/>
      <stop offset="1" stop-color="${CHARCOAL}"/>
    </radialGradient>
    <!-- Insurance only. The range is composed to the right of the copy, so this has
         to do almost nothing — at full strength it drains the teal out of the peaks
         and the card goes grey. -->
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${CHARCOAL}" stop-opacity="0.9"/>
      <stop offset="0.5" stop-color="${CHARCOAL}" stop-opacity="0.45"/>
      <stop offset="0.78" stop-color="${CHARCOAL}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#sky)"/>

  <!-- Back range: low, cool, no snow — depth cue only. Kept clear of the sub-head. -->
  ${peak({ x: 880, baseY: 500, halfWidth: 210, height: 165, fill: SLATE })}
  ${peak({ x: 1130, baseY: 500, halfWidth: 200, height: 140, fill: SLATE })}

  <!-- Mid range. -->
  ${peak({ x: 1190, baseY: 590, halfWidth: 270, height: 265, fill: TEAL_DEEP, cap: 0.32 })}

  <!-- Front peak. Its apex is the only part that reaches headline height, and it
       clears the end of "DOLOMITES" by a comfortable margin. -->
  ${peak({ x: 975, baseY: 630, halfWidth: 335, height: 330, fill: TEAL, cap: 0.34 })}

  <!-- The chalet, in silhouette on the flank of the front peak. Sat well above the
       bottom edge — a card is cropped to a square in some clients, but never from
       below, and a half-cut roof reads as a rendering fault. -->
  <g fill="${CHARCOAL}">
    <rect x="936" y="528" width="88" height="58" rx="3"/>
    <path d="M923 530 980 490 1037 530Z"/>
  </g>
  <g fill="${TEAL}" opacity="0.9">
    <rect x="951" y="545" width="19" height="20" rx="2"/>
    <rect x="990" y="545" width="19" height="20" rx="2"/>
  </g>

  <rect width="${W}" height="${H}" fill="url(#scrim)"/>

  <g font-family="Helvetica, Arial, sans-serif">
    <text x="72" y="150" fill="${TEAL}" font-size="23" font-weight="700" letter-spacing="4.6">
      VAL DI SOLE · TRENTINO · ITALY
    </text>

    <text x="72" y="258" fill="${PAPER}" font-size="86" font-weight="700" letter-spacing="-2">
      <tspan font-weight="400" font-size="50">Your </tspan>BASECAMP
    </text>
    <text x="72" y="348" fill="${PAPER}" font-size="86" font-weight="700" letter-spacing="-2">
      <tspan font-weight="400" font-size="50">in the </tspan>DOLOMITES
    </text>

    <text x="72" y="416" fill="${PAPER}" font-size="27" opacity="0.86">
      Self-catering apartment · sleeps 6 · from €110 a night
    </text>

    <!-- The three activity chips, drawn rather than laid out: fixed widths beat
         guessing at text metrics the rasteriser has not measured yet. -->
    <g transform="translate(72 462)">
      ${['Ski', 'Bike', 'Hike', 'Raft', 'Climb']
        .map((word, i) => {
          const x = i * 112
          return (
            `<rect x="${x}" y="0" width="98" height="42" rx="21" fill="none" stroke="${PAPER}" stroke-opacity="0.4"/>` +
            `<text x="${x + 49}" y="28" fill="${PAPER}" font-size="18" font-weight="600" text-anchor="middle" opacity="0.9">${word}</text>`
          )
        })
        .join('\n      ')}
    </g>

    <text x="72" y="576" fill="${TEAL}" font-size="21" font-weight="700" letter-spacing="1.2">
      Casa Tiziana · book direct on WhatsApp
    </text>
  </g>
</svg>`

const out = 'public/social-card.jpg'

// Flattened onto the brand charcoal: JPEG has no alpha, and letting the encoder pick
// white would put a bright halo behind the snow caps.
const jpeg = await sharp(Buffer.from(svg))
  .flatten({ background: CHARCOAL })
  .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
  .toBuffer()

await writeFile(out, jpeg)
console.log(`${out} — ${W}x${H}, ${(jpeg.length / 1024).toFixed(0)} kB`)
