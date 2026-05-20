import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'

export default function Nav() {
  const { contact } = profile
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    document.body.style.overflow = open ? 'hidden' : ''
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <nav className={`nav${open ? ' nav--open' : ''}`} id="header">
      <div className="nav-inner">
        <a href="/" className="nav-logo author-name" onClick={close}>
          {profile.name}
        </a>

        <div className="nav-actions">
          <ul className="nav-links" id="nav-menu">
            <li><a href="/#impact" onClick={close}>{tr(ui.nav.impact, lang)}</a></li>
            <li><a href="/#experience" onClick={close}>{tr(ui.nav.experience, lang)}</a></li>
            <li><a href="/#about" onClick={close}>{tr(ui.nav.about, lang)}</a></li>
            <li><a href="/#personal" onClick={close}>{tr(ui.nav.interests, lang)}</a></li>
            <li><a href="/#work" onClick={close}>{tr(ui.nav.projects, lang)}</a></li>
            <li><Link to="/blog" onClick={close}>{tr(ui.nav.blog, lang)}</Link></li>
            {contact.linkedin && (
              <li><a href={contact.linkedin} target="_blank" rel="noreferrer" onClick={close}>{tr(ui.nav.linkedin, lang)}</a></li>
            )}
            {contact.resume && (
              <li><a href={contact.resume} target="_blank" rel="noreferrer" onClick={close}>{tr(ui.nav.resume, lang)}</a></li>
            )}
            {contact.github && (
              <li><a href={contact.github} target="_blank" rel="noreferrer" onClick={close}>{tr(ui.nav.github, lang)}</a></li>
            )}
          </ul>

          <LanguageToggle />
          <ThemeToggle />

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? tr(ui.nav.closeMenu, lang) : tr(ui.nav.openMenu, lang)}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {open && <button type="button" className="nav-backdrop" aria-label={tr(ui.nav.closeMenu, lang)} onClick={close} />}
    </nav>
  )
}
