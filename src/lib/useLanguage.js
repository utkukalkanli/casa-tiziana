import { useCallback, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANG, copyFor, isLanguage } from '../content/index.js'

/**
 * The reader's language, and the copy that goes with it.
 *
 * There is one HTML file on GitHub Pages and no server to negotiate with, so the
 * language is chosen in the browser. Three sources, in order of how much they say
 * about intent:
 *
 *   1. `?lang=` in the URL — someone was sent this exact version of the page,
 *   2. localStorage — this visitor has already picked,
 *   3. `navigator.languages` — the browser's own preference, which is how an Italian
 *      or German visitor gets their language without touching the switcher.
 *
 * A choice writes back to both 1 and 2: to storage so the next visit remembers, and to
 * the URL so the page a guest forwards to the rest of their group opens in the language
 * they were reading.
 */

const STORAGE_KEY = 'casa-tiziana:lang'
const PARAM = 'lang'

/**
 * The page's address in the default language, read from the canonical link that
 * vite.config.js stamps into index.html — before the effect below starts rewriting it.
 */
const canonicalUrl =
  document.querySelector('link[rel="canonical"]')?.href ?? window.location.href.split('?')[0]

const urlFor = (code) => (code === DEFAULT_LANG ? canonicalUrl : `${canonicalUrl}?${PARAM}=${code}`)

function stored() {
  // Safari in private browsing throws on access rather than returning null.
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function remember(code) {
  try {
    window.localStorage.setItem(STORAGE_KEY, code)
  } catch {
    /* A visitor who blocks storage still gets the URL parameter. */
  }
}

function preferred() {
  const fromUrl = new URLSearchParams(window.location.search).get(PARAM)?.toLowerCase()
  if (isLanguage(fromUrl)) return fromUrl

  const fromStorage = stored()
  if (isLanguage(fromStorage)) return fromStorage

  // "de-AT", "it-CH" → "de", "it". Ordered by the visitor's own preference.
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag?.toLowerCase().split('-')[0]
    if (isLanguage(base)) return base
  }

  return DEFAULT_LANG
}

function setMeta(attr, name, value) {
  document.head.querySelector(`meta[${attr}="${name}"]`)?.setAttribute('content', value)
}

function setLink(rel, href) {
  document.head.querySelector(`link[rel="${rel}"]`)?.setAttribute('href', href)
}

export function useLanguage() {
  const [code, setCode] = useState(preferred)
  const copy = useMemo(() => copyFor(code), [code])

  const setLang = useCallback((next) => setCode(isLanguage(next) ? next : DEFAULT_LANG), [])

  useEffect(() => {
    const { lang, meta } = copy

    // The whole page is client-rendered, so a crawler already has to run this script
    // to see any copy at all — which means the head it reads is the one we set here.
    document.documentElement.lang = lang.code
    document.title = meta.title
    setMeta('name', 'description', meta.description)
    setMeta('property', 'og:locale', lang.ogLocale)
    setMeta('property', 'og:title', meta.ogTitle)
    setMeta('property', 'og:description', meta.ogDescription)
    setMeta('name', 'twitter:title', meta.ogTitle)
    setMeta('name', 'twitter:description', meta.ogDescription)

    // Each language is its own indexable URL, matching the hreflang set in index.html.
    setLink('canonical', urlFor(lang.code))
    setMeta('property', 'og:url', urlFor(lang.code))

    remember(lang.code)

    // replaceState, not pushState: switching language is not a navigation, and it must
    // not make the back button walk through every language the reader tried. The hash
    // rides along, so switching language halfway down the page stays put.
    const url = new URL(window.location.href)
    if (lang.code === DEFAULT_LANG) url.searchParams.delete(PARAM)
    else url.searchParams.set(PARAM, lang.code)
    window.history.replaceState(null, '', url)
  }, [copy])

  return { ...copy, setLang }
}
