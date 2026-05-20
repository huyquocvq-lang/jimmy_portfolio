import { useEffect, useRef, useState } from 'react'
import { FaGlobe, FaCheck } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const OPTIONS = [
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'vi', label: 'Tiếng Việt', short: 'VI' }
]

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

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
                    setLang(opt.value)
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
