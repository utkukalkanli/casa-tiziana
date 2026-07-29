import { useEffect, useState } from 'react'

/**
 * Reports whether the observed element is at least partly on screen.
 *
 * Used to stop the render loop once the reader has scrolled past the hero. The
 * canvas is `position: fixed`, so without this it would go on drawing an
 * auto-rotating 3D scene, at up to 2× DPR, behind an opaque wall of text — invisible
 * work, paid for in battery on exactly the phone the flyer's QR code leads to.
 *
 * Takes a ref rather than returning one so the caller keeps ownership of the node.
 */
export function useInView(ref, { rootMargin = '0px' } = {}) {
  // Start true: the observer's first callback lands after paint, and a false start
  // would freeze the scene for a frame or two on load, at the one moment it is the
  // whole point of the page.
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
