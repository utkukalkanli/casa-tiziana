/**
 * Resolve a path in `public/` to a URL that works under the GitHub Pages base path.
 *
 * Vite rewrites asset URLs it can see statically (imports, `src` attributes in HTML),
 * but a string handed to a loader at runtime — `useGLTF('/models/room.glb')` — is
 * opaque to it and will 404 in production while working fine on the dev server.
 * Every runtime asset path must go through this helper.
 *
 *   useGLTF(asset('models/room.glb'))
 */
export function asset(path) {
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`
}
