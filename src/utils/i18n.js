/**
 * i18n helper.
 *
 * Data files store user-facing strings either as a plain string (for proper
 * nouns, tech terms, links - same across EN/VI) or as a `{ en, vi }` object
 * for translated copy. `tr` returns the language-appropriate text and
 * gracefully falls back so partially translated trees still render.
 */
export const LANGUAGES = ['en', 'vi']
export const DEFAULT_LANGUAGE = 'en'

export function tr(value, lang = DEFAULT_LANGUAGE) {
  if (value == null) return ''
  if (typeof value === 'string' || typeof value === 'number') return value
  if (typeof value === 'object' && (value.en !== undefined || value.vi !== undefined)) {
    return value[lang] ?? value[DEFAULT_LANGUAGE] ?? ''
  }
  return value
}

/** Map an array, applying `tr` on a field of each item. */
export function trList(list, lang, field = 'label') {
  return (list ?? []).map((item) => ({ ...item, [field]: tr(item[field], lang) }))
}

/**
 * Locale-aware URL helpers. The URL is the source of truth for language:
 * English lives at `/...`, Vietnamese at `/vi/...`. Data files keep
 * language-neutral (English) paths - e.g. `projects.js` `link` stays
 * `/projects/<slug>` - and links are localized at render time.
 */

/** Prefix a language-neutral path with `/vi` when rendering Vietnamese. */
export function localePath(path, lang) {
  if (lang !== 'vi') return path
  if (path === '/') return '/vi'
  if (path === '/vi' || path.startsWith('/vi/')) return path
  return `/vi${path}`
}

/** Split a pathname into `{ lang, path }` where `path` is language-neutral. */
export function stripLocale(pathname) {
  if (pathname === '/vi' || pathname === '/vi/') return { lang: 'vi', path: '/' }
  if (pathname.startsWith('/vi/')) return { lang: 'vi', path: pathname.slice(3) }
  return { lang: DEFAULT_LANGUAGE, path: pathname }
}
