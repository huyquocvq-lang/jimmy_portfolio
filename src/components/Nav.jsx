import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr, localePath, stripLocale } from '../utils/i18n'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'

const HOMEPAGE_SECTIONS = ['impact', 'experience', 'about', 'work', 'personal', 'blog']

/**
 * Scroll-spy hook: returns the id of the section the user is currently
 * "inside" — defined as the last section (in document order) whose top has
 * crossed the trigger line at ~35% of the viewport. Returns `null` only
 * while the user is still above all watched sections (e.g. on the hero).
 * Always picks exactly one section once scrolled past the hero, so the
 * highlight does not flicker out between sections.
 */
function useActiveSection(ids, enabled) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!enabled || ids.length === 0 || typeof window === 'undefined') {
      setActive(null)
      return undefined
    }

    const compute = () => {
      const trigger = window.innerHeight * 0.35
      const positions = ids
        .map((id) => {
          const el = document.getElementById(id)
          if (!el) return null
          return { id, top: el.getBoundingClientRect().top }
        })
        .filter(Boolean)
        .sort((a, b) => a.top - b.top)

      let current = null
      for (const p of positions) {
        if (p.top <= trigger) current = p.id
        else break
      }
      setActive(current)
    }

    compute()
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        compute()
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', compute)
    }
  }, [enabled, ids.join('|')])

  return active
}

export default function Nav() {
  const { contact } = profile
  const { lang } = useLanguage()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  // Language-neutral path: '/vi/blog' and '/blog' are the same logical page.
  const { path: neutralPath } = stripLocale(location.pathname)
  const lp = (p) => localePath(p, lang)
  const homeHref = lp('/')

  const isHome = neutralPath === '/'
  const isBlogRoute = neutralPath === '/blog' || neutralPath.startsWith('/blog/')
  const isProjectsList = neutralPath === '/projects'
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
        <a href={homeHref} className="nav-logo" onClick={close} aria-label={profile.name}>
          <img
            src="/favicon/favicon-128x128.png"
            srcSet="/favicon/favicon-96x96.png 1x, /favicon/favicon-256x256.png 2x"
            alt=""
            className="nav-logo__icon"
            width="44"
            height="44"
            loading="eager"
            decoding="async"
          />
          <span className="nav-logo__text">{profile.hud?.title?.accent || 'Jimmy'}</span>
        </a>

        <div className="nav-actions">
          <ul className="nav-links" id="nav-menu">
            <li>
              <a href={`${homeHref}#impact`} onClick={close} className={sectionLinkClass('impact')}>
                {tr(ui.nav.impact, lang)}
              </a>
            </li>
            <li>
              <a href={`${homeHref}#experience`} onClick={close} className={sectionLinkClass('experience')}>
                {tr(ui.nav.experience, lang)}
              </a>
            </li>
            <li>
              <a href={`${homeHref}#about`} onClick={close} className={sectionLinkClass('about')}>
                {tr(ui.nav.about, lang)}
              </a>
            </li>
            <li>
              <a href={`${homeHref}#work`} onClick={close} className={projectsActive ? 'is-active' : ''}>
                {tr(ui.nav.projects, lang)}
              </a>
            </li>
            <li>
              <a href={`${homeHref}#personal`} onClick={close} className={sectionLinkClass('personal')}>
                {tr(ui.nav.interests, lang)}
              </a>
            </li>
            <li>
              <Link to={lp('/blog')} onClick={close} className={blogActive ? 'is-active' : ''}>
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
