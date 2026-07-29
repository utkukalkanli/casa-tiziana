# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A 3D marketing site for **Casa Tiziana** — a single self-catering holiday apartment in Val di Sole,
Trentino–South Tyrol, Italy, marketed as a basecamp for Dolomites outdoor sports (climbing, MTB,
hiking, rafting, skiing). Vite + React + React Three Fiber, built as a static bundle and published
to **GitHub Pages**.

**It is not a hotel.** There is one property, sleeping up to six, let whole. No room inventory, no
availability calendar, no booking engine — the flyer's call to action is a WhatsApp message, and
the site mirrors that. Resist adding hotel furniture like room-type grids or per-night date pickers
unless the owner asks.

`Flyer-CasaTiziana.pdf` in the repo root is the source material. Everything factual on the site is
transcribed into `src/content.js`; the flyer itself is not shipped to the browser.

## Commands

```bash
npm install
npm run dev        # dev server, http://localhost:5173
npm run build      # production bundle into dist/
npm run preview    # serve dist/ locally
```

There is no test runner and no linter configured.

To reproduce what GitHub Pages will actually serve — the one thing `npm run dev` cannot show you:

```bash
BASE_PATH=/casa-tiziana/ npm run build && npx vite preview --base /casa-tiziana/
```

## Deployment

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. The repository's
Pages source must be set to **GitHub Actions** (Settings → Pages), not a branch — the workflow
uses `upload-pages-artifact`/`deploy-pages`, which a branch-based source ignores.

## The base-path rule

This is the one thing that breaks a Pages deploy while everything looks fine locally.

A project site is served from `https://<user>.github.io/<repo>/`, so assets need that prefix.
`vite.config.js` reads it from `process.env.BASE_PATH`; the workflow passes
`/${{ github.event.repository.name }}/`, which stays correct if the repo is renamed. Locally the
variable is unset and the base is `/`.

Vite rewrites URLs it can see statically — `import`s, `src` attributes in `index.html`. It cannot
see a string handed to a loader at runtime. So:

```js
useGLTF('/models/room.glb')          // works in dev, 404s on Pages
useGLTF(asset('models/room.glb'))    // correct
```

**Every runtime asset path — GLTF, textures, HDRIs, video, audio — goes through `asset()` in
`src/lib/asset.js`.** Anything under `public/` is a runtime asset path.

## Layout

| Path | Role |
|---|---|
| `index.html` | Vite entry. Document `<head>`, meta tags, SEO. |
| `src/App.jsx` | `<Canvas>` setup (camera, dpr, shadows, exposure) plus the DOM overlay. |
| `src/content.js` | Every string and hard fact, transcribed from the flyer. Single source of truth. |
| `src/scene/Scene.jsx` | Composition only: fog, lights, controls, and the five scene modules. |
| `src/scene/Chalet.jsx` | The building. Dimensions at the top drive the roof maths. |
| `src/scene/HomeMountain.jsx` | The near mountain: rock, snow cap, piste, walking path. |
| `src/scene/Landscape.jsx` | Ground, river, bike trail, forest. |
| `src/scene/Peaks.jsx` | Three backdrop ranges. |
| `src/scene/People.jsx` | Hikers, cyclists, skiers, raft — everything animated. |
| `src/scene/routes.js` | Straight-line routes across the valley + position helpers. |
| `src/scene/mountain.js` | Cone geometry of the near mountain + position helpers. |
| `src/scene/palette.js` | Material colours and jacket colours. |
| `src/lib/asset.js` | Base-path-aware asset URLs. See above. |
| `src/lib/useReducedMotion.js` | Reactive `prefers-reduced-motion` hook. |
| `src/index.css` | Design tokens in `:root`, plus overlay and canvas layout. |
| `public/models/` | GLTF/GLB drop point. |

The DOM overlay sits above the canvas and is `pointer-events: none` so it does not swallow orbit
drags — interactive children have to opt back in with `pointer-events: auto`.

## The scene

Everything is procedural — no imported models yet. The chalet is built from primitives driven by
the constants at the top of `Chalet.jsx` (`W`, `D`, `GROUND_H`, `UPPER_H`, `PITCH`); the roof
derives `RISE` and `SLOPE` from them, so changing the footprint keeps the building coherent. It is
a stand-in for the real building until a modelled GLB exists.

### Geometry helpers are the contract

`routes.js` and `mountain.js` hold no components — only geometry and the functions that sample it.
This is the spine of the scene: `Landscape` draws a trail from a route, `People` walks figures
along the *same* route; `HomeMountain` lays a piste on the cone, `People` puts skiers on the *same*
cone. Any time a figure and the ground it stands on are computed independently, they drift apart.

The mistake this design exists to prevent, which was made and fixed once already: the piste is a
slab lying **on** the rock, so the walkable surface is `TRAIL_SURFACE`
(`TRAIL_LIFT + TRAIL_THICKNESS / 2`), not the cone and not `TRAIL_LIFT`. Placing figures at the
wrong one buries them — skis disappear first, then feet. Always position via `onSlope(...,
TRAIL_SURFACE)`.

Other non-obvious choices, all load-bearing:

- **The near mountain's height:radius ratio is a design constraint, not a look.** It sets the flank
  angle, and skiers are tilted to match it. At 41° they read as lying down; keep it near 30°.
- **Skiers take only half the slope angle**, with their skis at the full angle in a separate group.
  A skier balances against gravity, not perpendicular to the piste.
- **`minPolarAngle` is clamped at 0.95**, or a drag parks the camera overhead staring at the roof.
- **Figure `travel` spans are kept tight** (~20–25). Wider and figures spend most of the loop
  outside the default framing, or outside the shadow camera, which silently drops their shadows.

- **The distant peaks set `fog={false}`.** They sit ~250 units out, where the scene fog would blend
  them into the sky colour exactly and the range would disappear. Opting them out of fog is what
  makes them read as horizon silhouettes.
- **`toneMappingExposure` is raised to 1.35** in `App.jsx`. R3F tone-maps with ACES Filmic by
  default, which renders a bright daylight scene noticeably flat and grey. There is also no
  environment map, so `hemisphereLight` carries all the fill — turn it down and shadowed faces go
  nearly black.

## Conventions and constraints

- **No drei component that fetches from a CDN.** `<Environment preset="...">`, `<Text>` with a
  remote font URL and similar helpers pull from pmndrs' asset host at runtime. They add a
  third-party dependency to a site that is otherwise fully self-contained, and they fail closed.
  Use explicit lights, or download the asset into `public/` and reference it through `asset()`.
- **Copy lives in `src/content.js`, never inline in a component.** Components destructure from it.
  The flyer is the upstream source; when it changes, that file changes first.
- **Design tokens** are CSS custom properties in `:root` (`src/index.css`), sampled from the
  flyer's teal/charcoal palette. Scene material colours are a separate `COLORS` object in
  `Scene.jsx` — they describe physical materials (stucco, timber, rock), not brand, so the two
  sets are deliberately not shared.
- **The overlay carries its own scrim.** The sky behind the canvas is light and the camera
  auto-orbits, so white copy cannot rely on whatever happens to be behind it. The gradient on
  `.overlay` is what guarantees contrast — don't remove it without replacing the mechanism.
- **Reduced motion**: auto-rotate is gated on `useReducedMotion()`. Any new idle animation —
  camera drift, floating elements, scroll parallax — needs the same gate.
- **Asset budget matters more than usual here.** GitHub Pages caps a file at 100MB and a site at
  ~1GB, but the real limit is mobile: the JS bundle is already ~300kB gzipped (three.js + drei +
  React). Compress GLTF with Draco or Meshopt and textures with KTX2 before committing them. A raw
  Blender export is routinely 50–100MB and will make the site unusable regardless of hosting.
- **No custom HTTP headers on Pages.** Nothing requiring COOP/COEP (`SharedArrayBuffer`) will work.
- **Routing**: the site is currently a single page. Adding client-side routes means deep links
  404 on Pages — fix by emitting `404.html` as a copy of `index.html` at build time, or use
  `HashRouter`.

## Content sourcing

- **The flyer's photographs have not been extracted or used.** The rafting, climbing and MTB shots
  look like licensed stock; the building shot may be the owner's own. Confirm rights with Gabriele
  before putting any of them on the site, and get originals rather than pulling 72dpi crops out of
  the PDF.
- **`src/content.js` contains the owner's personal phone number and email**, exactly as published
  on the flyer. That is intended — it is the booking channel — but it means the repo and the built
  site carry personal contact details. Worth a moment's thought before making the repo public.

## Repository note

The working directory is `~/Developer/gabriele/` but the GitHub repo is
**`utkukalkanli/casa-tiziana`**, so the Pages base path is `/casa-tiziana/`, not `/gabriele/`.
Nothing hard-codes either — the workflow reads the repo name from the push event — but don't be
caught out by the mismatch when reproducing a production build locally.

`~/Developer/` also sits under a git repository rooted at the **home directory**. This project has
its own repo, so `git` commands run from here are correctly scoped — but verify with
`git rev-parse --show-toplevel` before any commit if something looks off.
