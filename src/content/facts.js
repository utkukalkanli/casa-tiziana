/**
 * The facts that do not translate: the property's name, the number on the price, the
 * booking channel, the address behind the Maps pin.
 *
 * They are stated once here and merged into every language by `index.js`, because a
 * phone number or a nightly rate written out in three copy files drifts in three
 * directions. Only prose belongs in `en.js` / `it.js` / `de.js`.
 */

// The one place the number itself appears. `contact.whatsapp` is the same number
// formatted for a human to read.
const WHATSAPP_NUMBER = '393420746693'

/**
 * WhatsApp deep link, optionally with the enquiry pre-filled. The guest still reviews
 * and sends the message themselves — this only opens the thread with text in the box,
 * which is why the text is per-language.
 */
export function whatsapp(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

export const facts = {
  name: 'Casa Tiziana',

  price: {
    from: 110,
    currency: '€',
  },

  contact: {
    // The flyer leads with WhatsApp — "Text me on whatsapp for info & bookings".
    whatsapp: '+39 342 0746693',
    whatsappUrl: whatsapp(),
    email: 'gabriele.girardi@proton.me',
    // Google Maps short link for the property. Shortlinks resolve server-side, so
    // this one cannot be verified from the code — if the pin ever moves, replace it
    // here rather than patching a component.
    maps: 'https://maps.app.goo.gl/wory6CLtPR8x2Ac19',
  },

  /**
   * Search-facing facts. Not on the flyer — resolved from the Maps pin above, which
   * redirects to 46.324029, 10.8827959 → Via Blanchette, Carciato, a frazione of the
   * comune of Dimaro Folgarida (TN).
   *
   * The precise placename is the whole point: nobody searches "Trentino–South Tyrol"
   * when booking a bed, they search "Dimaro", "Folgarida" or "Val di Sole". The hero
   * keeps the flyer's broad wording; this is what the crawler and the structured data
   * read. Street number is deliberately omitted — the pin locates the property, and a
   * house number on a public page is more exposure than a holiday let needs.
   *
   * Placenames, not prose: they are the same in every language, and the colophon that
   * renders them has to match the structured data in index.html exactly.
   */
  place: {
    locality: 'Carciato',
    comune: 'Dimaro Folgarida',
    valley: 'Val di Sole',
    province: 'Trento',
    provinceCode: 'TN',
    region: 'Trentino-Alto Adige',
    postalCode: '38027',
    country: 'Italy',
    countryCode: 'IT',
    lat: 46.324029,
    lng: 10.8827959,
  },
}
