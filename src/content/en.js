/**
 * English copy — the original, transcribed from `Flyer-CasaTiziana.pdf`. The flyer is
 * the upstream source for `content`; `sections` is the prose page, which the flyer has
 * no equivalent of.
 *
 * This file is the reference shape. `it.js` and `de.js` mirror it key for key — a key
 * missing there renders as `undefined`, so translate the structure, never trim it.
 * Hard facts (price, phone, address) live in `facts.js` and are merged in.
 */
export default {
  /** Document head. Swapped by `useLanguage` when the reader changes language. */
  meta: {
    title: 'Casa Tiziana — Holiday Apartment in Val di Sole, Dolomites',
    description:
      'Self-catering apartment for up to 6 in Dimaro Folgarida, Val di Sole. Ski, bike, hike and ' +
      'raft in the Dolomites from €110 a night. Book direct on WhatsApp.',
    ogTitle: 'Casa Tiziana — Your Basecamp in the Dolomites',
    ogDescription:
      'A self-catering apartment for up to 6 in Val di Sole, Trentino. Climbing, mountain biking, ' +
      'hiking, rafting and skiing from the door. From €110 a night.',
  },

  content: {
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
      // pre-filled, in the language the reader is on.
      message: "Hi Gabriele, I'd like to hear about the weekend deals at Casa Tiziana.",
    },

    /** Chrome: the words that are not copy but still have to be translated. */
    ui: {
      rentsFrom: 'Rents from',
      bookWhatsApp: 'Book on WhatsApp',
      languageLabel: 'Language',
    },
  },

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
  sections: {
    scrollCue: 'The valley',

    about: {
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

    /**
     * The gallery. `alts` is keyed by the ids in `photos.js` — the pictures are the
     * owner's own, and the alt text describes what is in each frame rather than
     * repeating the section heading, because for a reader on a screen reader this is
     * the only version of the photograph there is.
     */
    gallery: {
      title: 'Photographs',
      lede:
        'The apartment and the village, photographed by the owner. Shot wide, so the rooms read a ' +
        'little rounder than they stand.',
      hint: 'Select a photo to see it larger',
      close: 'Close',
      previous: 'Previous photo',
      next: 'Next photo',
      alts: {
        house: 'Casa Tiziana seen from the lane, with its timber balcony and the mountainside behind.',
        living: 'The living room: a sofa, and a dining table set under a window onto the valley.',
        kitchen: 'The kitchen in pine, with a gas range and a table to eat at beside it.',
        'bedroom-double': 'A double bedroom with a window onto the garden.',
        'bedroom-window': 'A bright double bedroom looking up the valley.',
        'bedroom-twin': 'A bedroom with two beds and a wooden wardrobe.',
        'bedroom-wardrobe': 'A single bedroom with a full-height wardrobe.',
        dining: 'The dining room, with a table for six under a low arched window.',
        'kitchen-second': 'A second kitchen, with a dishwasher, an oven and a table by the window.',
        balcony: 'The balcony, looking down the valley over the rooftops of Carciato.',
        terrace: 'The paved terrace and garden, with a picnic table under a pergola.',
        window: 'An open window onto the garden and the mountains beyond it.',
        village: 'The rooftops of Carciato and the wooded slopes of Val di Sole.',
        courtyard: 'The parking at the property, off the lane behind the house.',
      },
    },

    location: {
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
  },
}
