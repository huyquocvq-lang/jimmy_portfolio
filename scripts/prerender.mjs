/**
 * Post-build prerender + sitemap generation.
 *
 * Runs after `vite build` (see package.json "build"). Serves dist/ with the
 * Vite preview server, renders every route in headless Chrome, and writes the
 * resulting HTML to dist/<route>/index.html. Crawlers that do not execute
 * JavaScript (GPTBot, ClaudeBot, PerplexityBot, social scrapers) receive the
 * full page content, per-route meta from src/components/Seo.jsx included;
 * React mounts over the static HTML for real users.
 *
 * Bilingual: every route is rendered twice - `/...` (English) and `/vi/...`
 * (Vietnamese). The language is URL-derived (see LanguageContext), so the
 * snapshot of a /vi page contains Vietnamese copy, `html lang="vi"`, a
 * localized canonical, and hreflang alternates injected by Seo.jsx.
 *
 * Routes are derived from src/data/projects.js and src/data/blog.js so new
 * projects/posts are picked up automatically. The same list feeds
 * dist/sitemap.xml (with xhtml:link hreflang annotations) - single source of
 * truth, no drift.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { preview } from 'vite'
import puppeteer from 'puppeteer'
import { getAllProjects } from '../src/data/projects.js'
import { getAllPosts } from '../src/data/blog.js'
import { localePath } from '../src/utils/i18n.js'

const ORIGIN = 'https://www.jimmyvu.info'

const projects = getAllProjects()
const posts = getAllPosts()

// Language-neutral routes; each expands to an EN + VI URL pair.
const baseRoutes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/projects', priority: '0.9' },
  ...projects.map((p) => ({ path: p.link, priority: '0.8' })),
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  ...posts.map((p) => ({ path: `/blog/${p.slug}`, priority: '0.6', lastmod: p.date }))
]

const routes = baseRoutes.flatMap((r) => [
  { ...r, url: r.path, base: r.path },
  { ...r, url: localePath(r.path, 'vi'), base: r.path }
])

function alternateLinks(basePath) {
  return [
    `    <xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}${basePath}"/>`,
    `    <xhtml:link rel="alternate" hreflang="vi" href="${ORIGIN}${localePath(basePath, 'vi')}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${basePath}"/>`
  ].join('\n')
}

function buildSitemap() {
  const urls = routes
    .map((r) => {
      const parts = [`    <loc>${ORIGIN}${r.url}</loc>`, alternateLinks(r.base)]
      if (r.lastmod) parts.push(`    <lastmod>${r.lastmod}</lastmod>`)
      if (r.changefreq) parts.push(`    <changefreq>${r.changefreq}</changefreq>`)
      parts.push(`    <priority>${r.priority}</priority>`)
      return `  <url>\n${parts.join('\n')}\n  </url>`
    })
    .join('\n')
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n' +
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    `${urls}\n</urlset>\n`
  )
}

/**
 * Launch headless Chrome via the self-contained @sparticuz/chromium build -
 * a Chromium that ships its own shared libraries, made for stripped-down CI
 * images (e.g. Vercel's Amazon Linux 2023, which lacks libnss3 and has no
 * bundled Chrome in the puppeteer cache).
 */
async function launchSparticuz(baseArgs) {
  const { default: chromium } = await import('@sparticuz/chromium')
  const { default: puppeteerCore } = await import('puppeteer-core')
  return puppeteerCore.launch({
    args: [...chromium.args, ...baseArgs],
    executablePath: await chromium.executablePath(),
    headless: 'shell'
  })
}

/**
 * On Vercel/CI there is no bundled Chrome, so go straight to @sparticuz/chromium
 * (avoids a guaranteed-to-fail launch attempt and its noisy error). Locally,
 * use puppeteer's bundled Chrome and only fall back if it cannot start.
 */
async function launchBrowser() {
  const baseArgs = ['--no-sandbox', '--disable-setuid-sandbox']
  if (process.env.VERCEL || process.env.CI) return launchSparticuz(baseArgs)
  try {
    return await puppeteer.launch({ args: baseArgs })
  } catch (err) {
    console.warn(`bundled Chrome launch failed (${err.message}); using @sparticuz/chromium`)
    return launchSparticuz(baseArgs)
  }
}

async function main() {
  writeFileSync('dist/sitemap.xml', buildSitemap())
  console.log(`sitemap.xml written (${routes.length} URLs)`)

  // open:false so the preview server does not inherit server.open:true from
  // vite.config.js and try to spawn a browser (xdg-open) on the headless build.
  const server = await preview({ preview: { port: 4173, strictPort: false, open: false } })
  const base = server.resolvedUrls.local[0].replace(/\/$/, '')

  const browser = await launchBrowser()
  const page = await browser.newPage()

  try {
    for (const route of routes) {
      await page.goto(`${base}${route.url}`, { waitUntil: 'networkidle0', timeout: 60000 })
      // Vercel Analytics + Speed Insights re-inject their own tags on
      // hydration - drop the captured copies so prerendered pages do not load
      // them twice.
      await page.evaluate(() => {
        document
          .querySelectorAll(
            'script[src*="/_vercel/insights"], script[src*="/_vercel/speed-insights"], script[data-sdkn]'
          )
          .forEach((el) => el.remove())
      })
      const html = await page.content()
      const file =
        route.url === '/' ? 'dist/index.html' : join('dist', route.url, 'index.html')
      mkdirSync(dirname(file), { recursive: true })
      writeFileSync(file, `<!DOCTYPE html>\n${html.replace(/^<!DOCTYPE html>/i, '').trim()}\n`)
      console.log(`prerendered ${route.url}`)
    }
  } finally {
    await browser.close()
    await new Promise((resolve) => server.httpServer.close(resolve))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
