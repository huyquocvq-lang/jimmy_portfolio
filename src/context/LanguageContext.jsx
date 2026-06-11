import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, stripLocale } from '../utils/i18n'

/**
 * Language state. The URL is the source of truth: `/...` renders English,
 * `/vi/...` renders Vietnamese. `<LanguageSync>` (in App.jsx) pushes the
 * URL-derived language into this context on every navigation; switching
 * language is done by NAVIGATING to the twin URL (see LanguageToggle), never
 * by calling `setLang` alone - a bare `setLang` would be reverted by the next
 * sync. SEO depends on this split: each language has its own URL, canonical,
 * and hreflang pair.
 */

function readInitialLang() {
  if (typeof window !== 'undefined') {
    return stripLocale(window.location.pathname).lang
  }
  return DEFAULT_LANGUAGE
}

const LanguageContext = createContext({
  lang: DEFAULT_LANGUAGE,
  setLang: () => {}
})

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang)

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  const setLang = useCallback((next) => {
    if (LANGUAGES.includes(next)) setLangState(next)
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
