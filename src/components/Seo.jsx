import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { tr, localePath } from '../utils/i18n'

/**
 * Per-route SEO head manager.
 *
 * Updates title, meta description, canonical, Open Graph / Twitter tags,
 * robots, hreflang alternates, and an optional route-level JSON-LD block.
 * Every page renders exactly one <Seo>; values always overwrite the previous
 * route's, so no cleanup is needed on unmount.
 *
 * Bilingual: `title` / `description` accept plain strings or `{ en, vi }`
 * objects (resolved with `tr` against the URL-derived language). `path` is
 * always the LANGUAGE-NEUTRAL path (e.g. `/blog/foo`); the canonical is
 * localized to `/vi/...` on Vietnamese routes and every page emits
 * `hreflang="en" / "vi" / "x-default"` alternate links pointing at the pair.
 *
 * `npm run build` prerenders each route in both languages
 * (scripts/prerender.mjs), baking the values this component sets into the
 * static HTML that crawlers receive.
 */

const ORIGIN = 'https://www.jimmyvu.info'
const SITE_SUFFIX = ' | Jimmy Vu'
const DEFAULT_IMAGE = '/og-image.jpg'
const DEFAULT_IMAGE_ALT = 'Jimmy Vu — Senior Full Stack Developer portfolio cover'

export default function Seo({
  title,
  description,
  path,
  image,
  type = 'website',
  noindex = false,
  jsonLd = null
}) {
  const { lang } = useLanguage()

  useEffect(() => {
    const url = `${ORIGIN}${localePath(path, lang)}`
    const img = image ? `${ORIGIN}${image}` : `${ORIGIN}${DEFAULT_IMAGE}`
    const resolvedTitle = tr(title, lang)
    const resolvedDescription = tr(description, lang)
    const fullTitle =
      resolvedTitle.endsWith(SITE_SUFFIX) || path === '/'
        ? resolvedTitle
        : `${resolvedTitle}${SITE_SUFFIX}`

    document.title = fullTitle
    setMeta('name', 'description', resolvedDescription)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', resolvedDescription)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)
    setMeta('property', 'og:image:secure_url', img)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:locale', lang === 'vi' ? 'vi_VN' : 'en_US')
    setMeta('property', 'og:locale:alternate', lang === 'vi' ? 'en_US' : 'vi_VN')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', resolvedDescription)
    setMeta('name', 'twitter:image', img)

    // og:image companion tags: index.html hard-codes type/width/height/alt
    // for the default 1200x681 og-image.jpg. Page-specific covers have other
    // dimensions, so drop the now-wrong tags (scrapers measure the image
    // themselves) and describe the actual image in the alt.
    if (image) {
      removeMeta('property', 'og:image:type')
      removeMeta('property', 'og:image:width')
      removeMeta('property', 'og:image:height')
      setMeta('property', 'og:image:alt', resolvedTitle)
      setMeta('name', 'twitter:image:alt', resolvedTitle)
    } else {
      setMeta('property', 'og:image:type', 'image/jpeg')
      setMeta('property', 'og:image:width', '1200')
      setMeta('property', 'og:image:height', '681')
      setMeta('property', 'og:image:alt', DEFAULT_IMAGE_ALT)
      setMeta('name', 'twitter:image:alt', DEFAULT_IMAGE_ALT)
    }
    setLink('canonical', url)
    setAlternates(noindex ? null : path)

    if (noindex) {
      setMeta('name', 'robots', 'noindex, nofollow')
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove()
    }

    setJsonLd(jsonLd)
  }, [title, description, path, image, type, noindex, jsonLd, lang])

  return null
}

function setMeta(attr, key, value) {
  if (value == null) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function removeMeta(attr, key) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove()
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// hreflang pair for the current page. `path` is language-neutral; pass null
// (noindex pages) to remove the alternates entirely.
function setAlternates(path) {
  document.head.querySelectorAll('link[data-seo-alt]').forEach((el) => el.remove())
  if (path == null) return
  const pairs = [
    ['en', `${ORIGIN}${path}`],
    ['vi', `${ORIGIN}${localePath(path, 'vi')}`],
    ['x-default', `${ORIGIN}${path}`]
  ]
  for (const [hreflang, href] of pairs) {
    const el = document.createElement('link')
    el.setAttribute('rel', 'alternate')
    el.setAttribute('hreflang', hreflang)
    el.setAttribute('href', href)
    el.setAttribute('data-seo-alt', '')
    document.head.appendChild(el)
  }
}

// Route-level JSON-LD lives in one tagged <script> so each page replaces the
// previous page's block (the site-global Person/WebSite graph in index.html
// is untouched).
function setJsonLd(data) {
  let el = document.head.querySelector('script[data-seo-jsonld]')
  if (!data) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.setAttribute('type', 'application/ld+json')
    el.setAttribute('data-seo-jsonld', '')
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export const PERSON_ID = `${ORIGIN}/#person`

/**
 * BreadcrumbList JSON-LD. `items` carry language-neutral paths and
 * already-resolved display names; URLs are localized for `lang`.
 */
export function breadcrumbJsonLd(items, lang = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${ORIGIN}${localePath(item.path, lang)}`
    }))
  }
}
