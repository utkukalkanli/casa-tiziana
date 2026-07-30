import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On GitHub Pages a project site is served from https://<user>.github.io/<repo>/,
// so every asset URL needs that prefix. The deploy workflow passes the repo name in
// as BASE_PATH so this stays correct even if the repository is renamed; locally it
// is unset and the site is served from the root.
const base = process.env.BASE_PATH || '/'

// Absolute origin of the deployed site. The canonical link, the Open Graph URLs, the
// structured data and the sitemap all need the full URL — a base path is not enough,
// since a crawler resolving `/casa-tiziana/` has no idea which host it belongs to.
// The workflow derives this from the push event; the fallback is the current Pages
// address, so a local `npm run build` produces the same output CI does.
const siteUrl = (process.env.SITE_URL || 'https://utkukalkanli.github.io/casa-tiziana/').replace(
  /\/?$/,
  '/',
)

// URLs go into an XML document, where `&` is not a literal. The site's own address has
// none today; a custom domain with a query string one day would.
const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Substitutes %SITE_URL% into index.html and emits robots.txt and sitemap.xml from
 * the same value, so the site's own address is stated in exactly one place.
 *
 * Those two files are generated rather than parked in `public/` precisely because
 * they carry that absolute URL: a static sitemap.xml would go on pointing at the old
 * host after a rename or a move to a custom domain, and a stale sitemap is worse than
 * no sitemap — Google keeps requesting URLs that are not there any more.
 */
function seo() {
  return {
    name: 'casa-tiziana-seo',

    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('%SITE_URL%', siteUrl),
    },

    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `# Casa Tiziana — one page, all of it public.
User-agent: *
Allow: /

Sitemap: ${siteUrl}sitemap.xml
`,
      })

      // One page in three languages. Each language is listed with the full set of
      // alternates including itself, which is what the protocol asks for — and the
      // hreflang block in index.html says the same thing, from the other direction.
      const languages = [
        { code: 'en', url: siteUrl },
        { code: 'it', url: `${siteUrl}?lang=it` },
        { code: 'de', url: `${siteUrl}?lang=de` },
      ]

      const alternates = [...languages, { code: 'x-default', url: siteUrl }]
        .map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${escapeXml(l.url)}"/>`,
        )
        .join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${languages
  .map(
    (l) => `  <url>
    <loc>${escapeXml(l.url)}</loc>
${alternates}
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`,
      })
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), seo()],
})
