/**
 * The photographs, in the order they appear in the gallery.
 *
 * Provenance: Gabriele's own pictures, taken from the property's earlier Google Sites
 * page at appartamentitiziana.it (same phone number, same property). The stock-looking
 * shots that site also carries — rafting, mountain biking, via ferrata, skiing, a
 * charcuterie board — are deliberately **not** here: they look licensed, the licence is
 * not ours, and a stock photo of somebody else's river is not what sells this house.
 *
 * IDs are file names, not copy. The words describing each picture live in the language
 * files under `sections.gallery.alts`, keyed by the same id.
 *
 * ⚠ The old site is "Appartamenti Tiziana", plural, and these frames show more than one
 * kitchen and four bedrooms — more than one apartment is in here. Casa Tiziana is one
 * unit sleeping six, so ask Gabriele which of these are actually it and delete the
 * lines that are not. A photo of a room a guest will not get is the same mistake as an
 * amenity the flyer does not offer.
 */

/** Both widths exist in `public/photos/` as `<id>-<width>.webp`. */
export const PHOTO_WIDTHS = [760, 1520]

/**
 * Every file was resized from the same 8:7 originals, so one intrinsic size covers all
 * of them — which is what lets the grid reserve space and not shift as they load.
 */
export const PHOTO_SIZE = { width: 1520, height: 1330 }

export const photos = [
  'house',
  'living',
  'kitchen',
  'bedroom-double',
  'bedroom-window',
  'bedroom-twin',
  'bedroom-wardrobe',
  'dining',
  'kitchen-second',
  'balcony',
  'terrace',
  'window',
  'village',
  'courtyard',
]
