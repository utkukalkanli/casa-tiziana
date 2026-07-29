/**
 * Every piece of copy and every hard fact on the site, transcribed from
 * `Flyer-CasaTiziana.pdf`. Keep this the single source of truth — components read from
 * it, they do not inline strings. When the flyer changes, this file changes.
 */
export const content = {
  name: 'Casa Tiziana',
  location: 'Val di Sole, Trentino–South Tyrol, Italy',

  // Split the way the flyer sets it: light "Your" / heavy "Basecamp" / light "in the" /
  // heavy "Dolomites". The typography carries the emphasis, so keep the parts separate.
  headline: {
    lead: 'Your',
    main: 'Basecamp',
    connector: 'in the',
    place: 'Dolomites',
  },

  intro:
    'Explore the Dolomites from your apartment in Val di Sole, Trentino. Climb, ride, hike and ' +
    'raft just minutes from your door. Stay like a local and discover the best adventures with ' +
    'insider tips.',

  price: {
    from: 110,
    currency: '€',
    unit: 'night',
    // The asterisk on the flyer resolves to this line.
    note: 'Bring your friends and split the costs',
  },

  // Rendered as "Your apartment:" on the flyer, in this order.
  features: [
    'Up to 6 guests',
    'Fully equipped kitchen',
    'Quiet location near the forest',
    'Private parking',
    'Bike & ski storage',
    'Fast access to trails & outdoor activities',
  ],

  activities: ['Climbing', 'Mountain biking', 'Hiking', 'Rafting', 'Skiing'],

  cta: {
    label: 'Discover our weekend deals',
    // The flyer prints this as a callout with no destination. WhatsApp is the only
    // booking channel it publishes, so the button opens that thread with the enquiry
    // pre-filled — the guest still reviews and sends the message themselves.
    url: 'https://wa.me/393420746693?text=Hi%20Gabriele%2C%20I%27d%20like%20to%20hear%20about%20the%20weekend%20deals%20at%20Casa%20Tiziana.',
  },

  contact: {
    // The flyer leads with WhatsApp — "Text me on whatsapp for info & bookings".
    whatsapp: '+39 342 0746693',
    whatsappUrl: 'https://wa.me/393420746693',
    email: 'gabriele.girardi@proton.me',
  },
}
