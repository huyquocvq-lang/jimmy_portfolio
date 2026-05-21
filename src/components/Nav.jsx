import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'

const HOMEPAGE_SECTIONS = ['impact', 'experience', 'about', 'personal', 'work', 'blog']

/**
 * Scroll-spy hook: returns the id of the section that currently has the
 * largest visible area inside the configured root-margin band, or `null`
 * when none of the watched sections are in view.
 */
function useActiveSection(ids, enabled) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!enabled || ids.length === 0 || typeof window === 'undefined') {
      setActive(null)
      return undefined
    }

    const ratios = new Map()
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el) => el != null)

    if (elements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target.id, entry.intersectionRatio))
        let bestId = null
        let bestRatio = 0
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestId = id
            bestRatio = ratio
          }
        })
        setActive(bestRatio > 0.1 ? bestId : null)
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [enabled, ids.join('|')])

  return active
}

export default function Nav() {
  const { contact } = profile
  const { lang } = useLanguage()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const isHome = location.pathname === '/'
  const isBlogRoute = location.pathname === '/blog' || location.pathname.startsWith('/blog/')
  const isProjectsList = location.pathname === '/projects'
  const activeSection = useActiveSection(HOMEPAGE_SECTIONS, isHome)

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

  const sectionLinkClass = (id) =>
    isHome && activeSection === id ? 'is-active' : ''
  const projectsActive =
    (isHome && activeSection === 'work') || isProjectsList
  const blogActive = (isHome && activeSection === 'blog') || isBlogRoute

  return (
    <nav className={`nav${open ? ' nav--open' : ''}`} id="header">
      <div className="nav-inner">
        <a href="/" className="nav-logo author-name" onClick={close}>
          {profile.name}
        </a>

        <div className="nav-actions">
          <ul className="nav-links" id="nav-menu">
            <li>
              <a href="/#impact" onClick={close} className={sectionLinkClass('impact')}>
                {tr(ui.nav.impact, lang)}
              </a>
            </li>
            <li>
              <a href="/#experience" onClick={close} className={sectionLinkClass('experience')}>
                {tr(ui.nav.experience, lang)}
              </a>
            </li>
            <li>
              <a href="/#about" onClick={close} className={sectionLinkClass('about')}>
                {tr(ui.nav.about, lang)}
              </a>
            </li>
            <li>
              <a href="/#personal" onClick={close} className={sectionLinkClass('personal')}>
                {tr(ui.nav.interests, lang)}
              </a>
            </li>
            <li>
              <a href="/#work" onClick={close} className={projectsActive ? 'is-active' : ''}>
                {tr(ui.nav.projects, lang)}
              </a>
            </li>
            <li>
              <Link to="/blog" onClick={close} className={blogActive ? 'is-active' : ''}>
                {tr(ui.nav.blog, lang)}
              </Link>
            </li>
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
