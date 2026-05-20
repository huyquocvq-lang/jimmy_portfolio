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
