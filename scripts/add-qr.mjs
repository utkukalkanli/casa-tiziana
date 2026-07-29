/**
 * Stamps a QR code for the live site onto the printed flyer.
 *
 *   node scripts/add-qr.mjs            # inline: tucks a QR card into the existing layout
 *   node scripts/add-qr.mjs --corner   # corner: one large card in the sky beside "Italy"
 *   node scripts/add-qr.mjs --band     # band:   scales the flyer down, adds a footer strip
 *
 * Each layout is an alternative, not a layer — every run starts from the clean
 * source, so --corner produces a flyer carrying only the corner code.
 *
 * The source PDF is never modified — each run writes a new file. Re-run after any
 * change to SITE_URL; a printed QR cannot be redirected, so the URL must be final
 * before this goes to a printer.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import QRCode from 'qrcode'

const SITE_URL = 'https://utkukalkanli.github.io/casa-tiziana/'
const SOURCE = 'Flyer-CasaTiziana.pdf'

const TEAL = rgb(0.498, 0.678, 0.678)
const CHARCOAL = rgb(0.173, 0.188, 0.22)
const WHITE = rgb(1, 1, 1)

/**
 * The flyer has no empty region big enough for a comfortable QR. Every candidate was
 * measured off an 848x1200 render of page 1 (596/848 pt per px):
 *
 *   right of the email      collides with "...for info & bookings"
 *   below the deals pill    only ~39pt tall
 *   right of the price pill clear, but boxed in by the mountain photo at ~53pt
 *
 * The last is the only workable spot. A strictly non-colliding card there is ~41pt,
 * which is under the 1.5cm floor for a reliable print, so the card is deliberately
 * oversized: it keeps a margin from the price pill on its left and the body copy
 * above — the two elements a collision would actually read as a mistake — and laps
 * onto the photo circles on its right and below, where an opaque white card with a
 * teal keyline reads as a sticker rather than a clash.
 *
 * The four edges are each pinned to something, so nudge with care:
 *   x     >= 306   clears the "110 €/night" pill
 *   y+size <= 476  clears the last line of body copy
 *   x+size, y      lap onto the Dolomites and climber circles by design
 */
const INLINE = { x: 306, y: 407, size: 66, quiet: 6 }

/**
 * Twice the inline card (132pt / 4.7cm), in the patch of sky and forest right of
 * "...Trentino-South Tyrol, Italy". Nothing but photograph is under it, which is why
 * this is the only spot on the flyer that takes a code this size.
 *
 * Measured off the same render. Only the left edge has a hard limit — the type on
 * this half of the flyer is all left-aligned and ends well before the card:
 *   x >= 400        clears "Italy" (ends at 389) and "BASECAMP" (ends at 390)
 *   x + size <= 570 keeps the right page margin near the ~30pt the flyer uses
 *   y + size <= 823 leaves page above the card, so a trim cannot bite it
 *
 * "DOLOMITES" tops out at 661 but ends at x 405, so it constrains nothing here;
 * the card can drop past that line without touching it.
 */
const CORNER = { x: 432, y: 650, size: 132, quiet: 12, border: 2.5 }

const BAND = { height: 74 }

async function qrPng(doc) {
  // margin: 0 because the quiet zone is drawn as part of the white card below —
  // letting the library add its own would shrink the modules for no benefit.
  const buf = await QRCode.toBuffer(SITE_URL, {
    errorCorrectionLevel: 'M',
    margin: 0,
    width: 900,
    color: { dark: '#2C3038ff', light: '#ffffffff' },
  })
  return doc.embedPng(buf)
}

/**
 * Draws one QR card. The white fill is functional, not decorative: over a dark
 * panel or a photograph a bare code has neither contrast nor a quiet zone.
 */
function drawCard(page, { x, y, size, quiet, border = 1.5 }, qr) {
  page.drawRectangle({
    x,
    y,
    width: size,
    height: size,
    color: WHITE,
    borderColor: TEAL,
    borderWidth: border,
  })

  page.drawImage(qr, {
    x: x + quiet,
    y: y + quiet,
    width: size - quiet * 2,
    height: size - quiet * 2,
  })
}

async function bandLayout(doc, srcDoc, qr) {
  const [srcPage] = await srcDoc.getPages()
  const { width, height } = srcPage.getSize()

  const page = doc.addPage([width, height])
  const embedded = await doc.embedPage(srcPage)

  // Uniform scale, so the artwork is never distorted. Reserving a footer strip
  // therefore also inserts side margins — unavoidable without cropping.
  const scale = (height - BAND.height) / height
  const drawnWidth = width * scale
  page.drawRectangle({ x: 0, y: 0, width, height, color: WHITE })
  page.drawPage(embedded, {
    x: (width - drawnWidth) / 2,
    y: BAND.height,
    xScale: scale,
    yScale: scale,
  })

  const bold = await doc.embedFont(StandardFonts.HelveticaBold)
  const regular = await doc.embedFont(StandardFonts.Helvetica)

  const qrSize = BAND.height - 16
  const qrX = 40
  const qrY = 8
  page.drawImage(qr, { x: qrX, y: qrY, width: qrSize, height: qrSize })

  const textX = qrX + qrSize + 14
  page.drawText('See the place in 3D', {
    x: textX,
    y: qrY + qrSize - 20,
    size: 15,
    font: bold,
    color: CHARCOAL,
  })
  page.drawText('Scan for photos, the location and booking', {
    x: textX,
    y: qrY + qrSize - 37,
    size: 9.5,
    font: regular,
    color: CHARCOAL,
  })
  page.drawText(SITE_URL, {
    x: textX,
    y: qrY + qrSize - 51,
    size: 8.5,
    font: regular,
    color: TEAL,
  })
}

async function main() {
  const band = process.argv.includes('--band')
  const corner = process.argv.includes('--corner')
  const srcBytes = await readFile(SOURCE)

  let doc
  let out
  if (band) {
    out = 'Flyer-CasaTiziana-QR-band.pdf'
    doc = await PDFDocument.create()
    const srcDoc = await PDFDocument.load(srcBytes)
    const qr = await qrPng(doc)
    await bandLayout(doc, srcDoc, qr)
  } else {
    out = corner ? 'Flyer-CasaTiziana-QR-corner.pdf' : 'Flyer-CasaTiziana-QR.pdf'
    doc = await PDFDocument.load(srcBytes)
    const qr = await qrPng(doc)
    const [page] = doc.getPages()
    drawCard(page, corner ? CORNER : INLINE, qr)
  }

  await writeFile(out, await doc.save())
  console.log(`wrote ${out} -> ${SITE_URL}`)
}

main()
