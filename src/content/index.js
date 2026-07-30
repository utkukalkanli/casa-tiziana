/**
 * The copy layer. Components read from `copyFor(code)` and never inline a string.
 *
 * Three languages, one page: English is the default, Italian is the closest market and
 * German is the valley's second one. Each language file holds prose only — the facts
 * that do not translate come from `facts.js` and are merged in here, so the nightly
 * rate and the phone number are written once for all three.
 */
import de from './de.js'
import en from './en.js'
import { facts, whatsapp } from './facts.js'
import it from './it.js'

/** Also the language of `index.html` as it is served, and the site's canonical URL. */
export const DEFAULT_LANG = 'en'

/**
 * In switcher order. `short` is the label on the button, `label` names the language in
 * that language (never "German" in an Italian UI), `ogLocale` is what Open Graph wants.
 */
export const LANGUAGES = [
  { code: 'en', short: 'EN', label: 'English', ogLocale: 'en_GB' },
  { code: 'it', short: 'IT', label: 'Italiano', ogLocale: 'it_IT', currencyAfter: true },
  { code: 'de', short: 'DE', label: 'Deutsch', ogLocale: 'de_DE', currencyAfter: true },
]

const COPY = { en, it, de }

/**
 * Section ids are URL fragments: the scroll cue points at one, and a link someone has
 * already sent has to keep working. Fixed here rather than repeated per language, both
 * so they cannot drift and so switching language does not move the anchors.
 */
const IDS = {
  about: 'apartment',
  gallery: 'photos',
  location: 'location',
  seasons: 'seasons',
  faq: 'questions',
}

/** Guards anything read from the URL, from storage or from the browser's languages. */
export function isLanguage(code) {
  return typeof code === 'string' && code in COPY
}

// "€110" reads as English; Italian and German put the symbol after the number. The
// number itself stays in facts.js either way.
function rate({ from, currency }, { currencyAfter }) {
  return currencyAfter ? `${from} ${currency}` : `${currency}${from}`
}

/**
 * Everything the page renders in one language. Falls back to the default rather than
 * throwing — a stale `?lang=` in someone's bookmark should show the site, not a blank
 * screen.
 */
export function copyFor(code) {
  const lang = LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0]
  const copy = COPY[lang.code]

  return {
    lang,
    meta: copy.meta,

    content: {
      ...copy.content,
      name: facts.name,
      contact: facts.contact,
      place: facts.place,
      price: { ...facts.price, ...copy.content.price, rate: rate(facts.price, lang) },
      cta: { label: copy.content.cta.label, url: whatsapp(copy.content.cta.message) },
    },

    sections: Object.fromEntries(
      Object.entries(copy.sections).map(([key, value]) => [
        key,
        key in IDS ? { ...value, id: IDS[key] } : value,
      ]),
    ),
  }
}
