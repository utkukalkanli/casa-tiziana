import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On GitHub Pages a project site is served from https://<user>.github.io/<repo>/,
// so every asset URL needs that prefix. The deploy workflow passes the repo name in
// as BASE_PATH so this stays correct even if the repository is renamed; locally it
// is unset and the site is served from the root.
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react()],
})
