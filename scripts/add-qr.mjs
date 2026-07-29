/**
 * Stamps a QR code for the live site onto the printed flyer.
 *
 *   node scripts/add-qr.mjs            # inline: tucks a QR card into the existing layout
 *   node scripts/add-qr.mjs --band     # band:   scales the flyer down, adds a footer strip
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
 * The last is the only non-colliding spot, and it forces a 42pt (1.5cm) code —
 * about 0.5mm per module, which scans but has no margin for a bad print. Prefer
 * --band, which affords 2cm.
 */
const INLINE = { x: 310, y: 418, size: 52, quiet: 5 }

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

async function inlineLayout(doc, page, qr) {
  const { x, y, size, quiet } = INLINE

  // White card: on a dark background a QR has no contrast and no quiet zone, so
  // this is functional, not decorative.
  page.drawRectangle({
    x,
    y,
    width: size,
    height: size,
    color: WHITE,
    borderColor: TEAL,
    borderWidth: 1.5,
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
  const srcBytes = await readFile(SOURCE)

  const out = band ? 'Flyer-CasaTiziana-QR-band.pdf' : 'Flyer-CasaTiziana-QR.pdf'

  let doc
  if (band) {
    doc = await PDFDocument.create()
    const srcDoc = await PDFDocument.load(srcBytes)
    const qr = await qrPng(doc)
    await bandLayout(doc, srcDoc, qr)
  } else {
    doc = await PDFDocument.load(srcBytes)
    const qr = await qrPng(doc)
    const [page] = doc.getPages()
    await inlineLayout(doc, page, qr)
  }

  await writeFile(out, await doc.save())
  console.log(`wrote ${out} -> ${SITE_URL}`)
}

main()
