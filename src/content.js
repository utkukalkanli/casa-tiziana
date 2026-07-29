/**
 * Every piece of copy and every hard fact on the site, transcribed from
 * `Flyer-CasaTiziana.pdf`. Keep this the single source of truth — components read from
 * it, they do not inline strings. When the flyer changes, this file changes.
 */
export const content = {
  name: 'Casa Tiziana',
  location: 'Val di Sole, Trentino–South Tyrol, Italy',
  // The location line is also the link to the Maps pin (`contact.maps`). Nothing on
  // the flyer says so, so the site has to: this label is what makes the link legible
  // as a link on a phone, where there is no hover to discover it with.
  locationCta: 'View on map',

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

/**
 * Long-form page copy, below the 3D hero.
 *
 * This exists for search as much as for the reader: the hero is ~90 words, and no
 * page ranks for anything but its own name on 90 words. Everything here is either
 * transcribed from the flyer or a checkable fact about the valley — the cycle path
 * really does run through Carciato, the rafting centre really is in Dimaro village.
 * Do not add amenities the flyer does not list (no wifi, no linen, no check-in
 * times) — an invented amenity is a complaint at the door.
 */
export const sections = {
  scrollCue: 'The valley',

  about: {
    id: 'apartment',
    title: 'The apartment',
    lede:
      'Casa Tiziana is a self-catering holiday apartment in Carciato, a hamlet of Dimaro Folgarida ' +
      'in the Val di Sole, Trentino. It is let whole — one group at a time, up to six people — so ' +
      'the kitchen, the parking and the storage are yours for the stay rather than shared with a ' +
      'front desk.',
    body: [
      'It is built for people who arrive with equipment. Bikes and skis go in the store rather than ' +
        'up the stairs, the car goes on the private parking rather than circling the village, and ' +
        'the kitchen is equipped well enough that you can eat properly on a day you got back late ' +
        'from the hill.',
      'The setting is quiet — the last houses before the forest — but it is not remote. The valley ' +
        'floor, the river and the cycle path are a walk away, and the lifts are a few minutes by car.',
    ],
  },

  location: {
    id: 'location',
    title: 'Where you are',
    lede:
      'Val di Sole runs west from the Brenta Dolomites towards the Ortles–Cevedale, with the Noce ' +
      'river along its floor. Dimaro Folgarida sits in the middle of it, between the Adamello-Brenta ' +
      'Nature Park to the south and Stelvio National Park to the north.',
    facts: [
      {
        label: 'Skiing',
        detail:
          'The Folgarida gondola is about 4 km up the road. From it, Folgarida–Marilleva links by ' +
          'lift to Madonna di Campiglio and Pinzolo — roughly 150 km of connected piste in the ' +
          'Skiarea Campiglio Dolomiti di Brenta, skiable without taking the skis off.',
      },
      {
        label: 'Rafting',
        detail:
          'The Noce is rated among the best whitewater rivers in Europe, and the rafting centres ' +
          'that run it are in Dimaro village itself — the closest activity to the door, and the ' +
          'reason people who have never paddled before end up doing it here.',
      },
      {
        label: 'Cycling',
        detail:
          'The Val di Sole cycle path follows the Noce for some 33 km along the valley floor and ' +
          'runs through Carciato. It is flat enough for children, and it connects the villages ' +
          'without putting anyone on the main road.',
      },
      {
        label: 'Mountain biking',
        detail:
          'Val di Sole is a UCI Bike City Region, and the World Cup downhill and cross-country ' +
          'courses at Daolasa are a few kilometres down the valley. The lifts carry bikes in ' +
          'summer, so the descents do not have to be earned twice.',
      },
      {
        label: 'Hiking and climbing',
        detail:
          'Paths leave from the forest behind the house and climb towards the Presanella and ' +
          'Brenta groups; the Brenta Dolomites are UNESCO World Heritage and hold some of the ' +
          'oldest via ferrata in the Alps. Ask before you go — knowing which route is in ' +
          'condition this week is what a local is for.',
      },
    ],
  },

  seasons: {
    id: 'seasons',
    title: 'When to come',
    items: [
      {
        label: 'Winter',
        detail:
          'December to early April. Ski and board the Campiglio–Folgarida–Marilleva circuit, with ' +
          'the ski store downstairs and the lift road clear of the traffic that clogs the resort ' +
          'villages higher up.',
      },
      {
        label: 'Spring',
        detail:
          'April to June. Snowmelt puts the Noce at its highest and fastest, which is the season ' +
          'rafting guides look forward to. The lower trails dry out first.',
      },
      {
        label: 'Summer',
        detail:
          'June to September. The whole valley is in use at once — bikes on the lifts, families on ' +
          'the cycle path, and long days on the high paths under the Brenta.',
      },
      {
        label: 'Autumn',
        detail:
          'September to November. The quietest and, for walking, arguably the best: stable weather, ' +
          'larches turning, and the valley to yourself.',
      },
    ],
  },

  faq: {
    id: 'questions',
    title: 'Common questions',
    items: [
      {
        q: 'How many people does Casa Tiziana sleep?',
        a:
          'Up to six. The apartment is let whole to one group, which is what makes the per-person ' +
          'cost work — the nightly rate starts at €110 whether there are two of you or six.',
      },
      {
        q: 'Is there parking?',
        a:
          'Yes, private parking at the property, included. Useful in a valley where village parking ' +
          'is tight in February and August.',
      },
      {
        q: 'Where do bikes and skis go?',
        a:
          'There is dedicated bike and ski storage, so equipment does not come through the living ' +
          'space and does not spend the night on a roof rack.',
      },
      {
        q: 'How far are the ski lifts?',
        a:
          'The Folgarida gondola is roughly 4 km — a few minutes by car. From there the lift system ' +
          'connects through to Madonna di Campiglio and Pinzolo.',
      },
      {
        q: 'Do I need a car?',
        a:
          'It makes the valley much easier, and the parking is there for it. Without one you can ' +
          'still reach the cycle path and the river on foot, and Val di Sole has a train line and ' +
          'ski buses along the valley floor.',
      },
      {
        q: 'How do I book?',
        a:
          'Message Gabriele on WhatsApp — that is the booking channel, and the fastest way to ask ' +
          'about dates, weekend deals, or what the conditions are doing this week.',
      },
    ],
  },

  closing: {
    title: 'Ask about dates',
    body:
      'Casa Tiziana is one apartment, booked directly with its owner. Send a message with your ' +
      'dates and how many of you there are.',
  },
}
