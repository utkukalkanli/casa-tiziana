import { useCallback, useEffect, useRef, useState } from 'react'
import { PHOTO_SIZE, PHOTO_WIDTHS, photos } from './content/photos.js'
import { asset } from './lib/asset.js'

/**
 * The photographs of the apartment: a grid that opens into a lightbox.
 *
 * The 3D hero says what the place is *for*; this says what it actually looks like, and
 * it is the section a guest deciding between two apartments reads hardest. Everything
 * about it is defensive of the page's two hard budgets:
 *
 * - **Weight.** Two widths per picture in WebP, `loading="lazy"`, and the grid is well
 *   below the fold, so a phone that never scrolls this far downloads none of it.
 * - **Layout.** Every file is the same 8:7, and `width`/`height` are set from
 *   `PHOTO_SIZE`, so the grid reserves its space before a byte of image arrives. Without
 *   that the whole page below jumps as each one lands.
 *
 * Paths go through `asset()`: these live in `public/`, so they are runtime URLs that
 * Vite cannot rewrite, and a bare `/photos/...` would 404 under the Pages base path.
 */

const [SMALL, LARGE] = PHOTO_WIDTHS

const src = (id, width) => asset(`photos/${id}-${width}.webp`)

/**
 * What a tile actually measures — this is what decides whether the browser fetches the
 * 760 or the 1520 file. Guess high and every thumbnail on a 2× screen pulls the large
 * one, and fourteen of those cost more than the rest of the site put together. Above
 * 68rem the band stops growing at 1088px, so its four columns are about 265px each.
 */
const TILE_SIZES =
  '(min-width: 68rem) 265px, (min-width: 64rem) 25vw, (min-width: 40rem) 45vw, 80vw'

export default function Gallery({ copy }) {
  // Index of the photo in the lightbox, or null when it is closed.
  const [open, setOpen] = useState(null)
  // The thumbnail that opened it, so focus goes back where it came from on close.
  const opener = useRef(null)
  const closeButton = useRef(null)

  const close = useCallback(() => {
    setOpen(null)
    opener.current?.focus()
  }, [])

  const step = useCallback(
    (by) => setOpen((i) => (i === null ? i : (i + by + photos.length) % photos.length)),
    [],
  )

  // Escape closes, arrows walk the set — a lightbox that can only be dismissed by
  // hitting a small × is a trap on a keyboard.
  useEffect(() => {
    if (open === null) return

    const onKey = (event) => {
      if (event.key === 'Escape') close()
      else if (event.key === 'ArrowRight') step(1)
      else if (event.key === 'ArrowLeft') step(-1)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, step])

  // Move focus into the overlay when it opens, so the next Tab lands on its own
  // controls rather than continuing down the page behind it. On *opening* only: doing
  // it on every index change would yank focus off the next button after one press, and
  // walking the set from the keyboard would take a Tab between every photo.
  const wasOpen = useRef(false)
  useEffect(() => {
    if (open !== null && !wasOpen.current) closeButton.current?.focus()
    wasOpen.current = open !== null
  }, [open])

  const current = open === null ? null : photos[open]

  return (
    <section className="band" id={copy.id}>
      <h2>{copy.title}</h2>
      <p className="lede">{copy.lede}</p>
      <p className="gallery-hint">{copy.hint}</p>

      <ul className="gallery">
        {photos.map((id, index) => (
          <li key={id}>
            {/* The button takes its accessible name from the image's alt text, which is
                why there is no aria-label here to override it. */}
            <button
              type="button"
              onClick={(event) => {
                opener.current = event.currentTarget
                setOpen(index)
              }}
            >
              <img
                src={src(id, SMALL)}
                srcSet={`${src(id, SMALL)} ${SMALL}w, ${src(id, LARGE)} ${LARGE}w`}
                sizes={TILE_SIZES}
                width={PHOTO_SIZE.width}
                height={PHOTO_SIZE.height}
                loading="lazy"
                decoding="async"
                alt={copy.alts[id]}
              />
            </button>
          </li>
        ))}
      </ul>

      {current && (
        /* Clicking the backdrop closes; clicking the picture must not. Hence the target
           check rather than a handler on the whole overlay. */
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={copy.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <button
            type="button"
            className="lightbox-close"
            ref={closeButton}
            onClick={close}
            aria-label={copy.close}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <figure className="lightbox-figure">
            <img
              src={src(current, LARGE)}
              width={PHOTO_SIZE.width}
              height={PHOTO_SIZE.height}
              alt={copy.alts[current]}
            />
            <figcaption>
              {copy.alts[current]}
              <span className="lightbox-count" aria-hidden="true">
                {open + 1} / {photos.length}
              </span>
            </figcaption>
          </figure>

          <div className="lightbox-nav">
            <button type="button" onClick={() => step(-1)} aria-label={copy.previous}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button type="button" onClick={() => step(1)} aria-label={copy.next}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
