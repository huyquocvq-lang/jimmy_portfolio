import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaGlobe, FaCheck } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import { localePath, stripLocale } from '../utils/i18n'

const OPTIONS = [
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'vi', label: 'Tiếng Việt', short: 'VI' }
]

export default function LanguageToggle() {
  const { lang } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  // Language switching = navigating to the twin URL (/x ↔ /vi/x). The URL is
  // the source of truth; LanguageSync in App.jsx updates the context from it.
  const switchTo = (next) => {
    if (next === lang) return
    const { path } = stripLocale(location.pathname)
    navigate(`${localePath(path, next)}${location.search}${location.hash}`)
  }

  useEffect(() => {
    if (!open) return undefined
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = OPTIONS.find((o) => o.value === lang) ?? OPTIONS[0]

  return (
    <div className="lang-toggle" ref={rootRef}>
      <button
        type="button"
        className="lang-toggle__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Change language (currently ${current.label})`}
        onClick={() => setOpen((v) => !v)}
      >
        <FaGlobe className="lang-toggle__icon" aria-hidden="true" />
        <span className="lang-toggle__code">{current.short}</span>
      </button>

      {open && (
        <ul className="lang-toggle__menu" role="listbox" aria-label="Languages">
          {OPTIONS.map((opt) => {
            const active = opt.value === lang
            return (
              <li key={opt.value} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`lang-toggle__item${active ? ' lang-toggle__item--active' : ''}`}
                  onClick={() => {
                    switchTo(opt.value)
                    setOpen(false)
                  }}
                >
                  <span className="lang-toggle__item-label">{opt.label}</span>
                  <span className="lang-toggle__item-mark" aria-hidden="true">
                    {active && <FaCheck />}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
