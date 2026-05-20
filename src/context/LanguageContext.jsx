import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES } from '../utils/i18n'

const STORAGE_KEY = 'portfolio-language'

function readInitialLang() {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (LANGUAGES.includes(stored)) return stored
    } catch {}
  }
  return DEFAULT_LANGUAGE
}

const LanguageContext = createContext({
  lang: DEFAULT_LANGUAGE,
  setLang: () => {},
  toggleLang: () => {}
})

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang)

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {}
  }, [lang])

  const setLang = useCallback((next) => {
    if (LANGUAGES.includes(next)) setLangState(next)
  }, [])

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'en' ? 'vi' : 'en'))
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
