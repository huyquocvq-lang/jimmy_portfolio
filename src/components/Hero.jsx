import { Fragment, useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { profile } from '../data/profile'

const HERO_BASE = '/hero-banners'
const HERO_FALLBACK = 'hero_desktop_fhd'

// Order matters: <picture> picks the first <source> whose media matches AND
// whose format is supported. Most specific first; ultrawide before generic
// landscape; width caps (4K, QHD) before aspect-ratio buckets.
const HERO_SOURCES = [
  ['(max-aspect-ratio: 3/4)', 'hero_mobile_portrait'],
  ['(min-aspect-ratio: 21/10)', 'hero_ultrawide'],
  ['(min-width: 3000px)', 'hero_desktop_4k'],
  ['(min-width: 2200px)', 'hero_desktop_qhd'],
  ['(min-aspect-ratio: 14/10) and (max-aspect-ratio: 17/10)', 'hero_macbook_13'],
  ['(max-aspect-ratio: 14/10)', 'hero_tablet']
]

const WEBP_ENABLED = false

export default function Hero() {
  const [ready, setReady] = useState(false)
  const heroRef = useRef(null)
  const { hud, contact } = profile

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setReady(true))
    })
    return () => cancelAnimationFrame(id)
  }, [])

  const handleScrollDown = (e) => {
    e.preventDefault()
    document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className={`hero hero--v2 ${ready ? 'hero--ready' : 'hero--preload'}`}
      id="top"
    >
      {/* Responsive background photo */}
      <picture className="hero-bg" aria-hidden="true">
        {HERO_SOURCES.map(([media, slug]) => (
          <Fragment key={slug}>
            {WEBP_ENABLED && (
              <source media={media} srcSet={`${HERO_BASE}/${slug}.webp`} type="image/webp" />
            )}
            <source media={media} srcSet={`${HERO_BASE}/${slug}.png`} type="image/png" />
          </Fragment>
        ))}
        {WEBP_ENABLED && (
          <source srcSet={`${HERO_BASE}/${HERO_FALLBACK}.webp`} type="image/webp" />
        )}
        <img
          src={`${HERO_BASE}/${HERO_FALLBACK}.png`}
          alt=""
          className="hero-bg-img"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </picture>

      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-curtain" aria-hidden="true" />

      {/* 4 corner brackets */}
      <div className="hero-corner hero-corner--tl" aria-hidden="true" />
      <div className="hero-corner hero-corner--tr" aria-hidden="true" />
      <div className="hero-corner hero-corner--bl" aria-hidden="true" />
      <div className="hero-corner hero-corner--br" aria-hidden="true" />

      <div className="hero-frame">
        {/* Top-left portfolio tag */}
        <div className="hero-tag-top">
          <span className={`hero-tag-dot${hud.available ? ' hero-tag-dot--on' : ''}`} aria-hidden="true" />
          <span className="hero-tag-text">
            PORTFOLIO <span className="hero-tag-sep">/</span> {hud.portfolioYear}{' '}
            <span className="hero-tag-slash">//</span> {hud.availability}
          </span>
        </div>

        {/* Side info chips (right column) */}
        <ul className="hero-side-chips" aria-label="Profile metadata">
          {hud.sideChips.map((chip) => (
            <li key={chip.label} className="hero-side-chip">
              <span className="hero-side-chip__label">// {chip.label.toUpperCase()}</span>
              <span className="hero-side-chip__value">{chip.value}</span>
            </li>
          ))}
        </ul>

        {/* Main heading block */}
        <div className="hero-main">
          <span className="hero-eyebrow">— {hud.eyebrow}</span>
          <h1 className="hero-title">
            <span className="hero-title__lead">{hud.title.lead}</span>
            <span className="hero-title__divider" aria-hidden="true">/</span>
            <span className="hero-title__accent">{hud.title.accent}</span>
          </h1>
          <p className="hero-subtitle">
            {hud.subtitleLead}
            <br />
            <span className="hero-subtitle__accent">{hud.subtitleAccent}</span>
          </p>

          <ul className="hero-chips" aria-label="Tech stack">
            {hud.chips.map((chip) => (
              <li
                key={chip.label}
                className={`hero-chip${chip.accent ? ' hero-chip--accent' : ''}`}
              >
                {chip.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom-left contact strip */}
        <div className="hero-contact" aria-label="Contact">
          {contact.email && (
            <div className="hero-contact-col">
              <span className="hero-contact-label">// Email</span>
              <a href={`mailto:${contact.email}`} className="hero-contact-value">
                {contact.email}
              </a>
            </div>
          )}
          {(contact.phoneDisplay || contact.phone) && (
            <div className="hero-contact-col">
              <span className="hero-contact-label">// Phone</span>
              <a
                href={`tel:${(contact.phone || '').replace(/[^+\d]/g, '')}`}
                className="hero-contact-value"
              >
                {contact.phoneDisplay || contact.phone}
              </a>
            </div>
          )}
          {contact.linkedin && (
            <div className="hero-contact-col">
              <span className="hero-contact-label">// LinkedIn</span>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hero-contact-value"
              >
                {contact.linkedinHandle || contact.linkedin}
              </a>
            </div>
          )}
        </div>

        {/* Bottom-right monogram */}
        <div className="hero-mark" aria-hidden="true">
          <span className="hero-mark__big">{hud.monogram}</span>
          <span className="hero-mark__tag">{hud.establishedTag}</span>
        </div>
      </div>

      <a
        href="#impact"
        className="hero-scroll-down"
        onClick={handleScrollDown}
        aria-label="Scroll to content"
      >
        <FaChevronDown />
      </a>
    </section>
  )
}
