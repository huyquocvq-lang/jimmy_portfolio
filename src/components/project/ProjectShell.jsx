import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../Nav'
import Footer from '../Footer'
import BannerEmbed from '../BannerEmbed'
import { getAllProjects, getProjectCard } from '../../data/projects'
import { ui } from '../../data/ui'
import { useLanguage } from '../../context/LanguageContext'
import { tr } from '../../utils/i18n'

export default function ProjectShell({ slug, children }) {
  const { lang } = useLanguage()
  const project = getProjectCard(slug)
  const all = getAllProjects()
  const index = all.findIndex((p) => p.slug === slug)
  const prev = index > 0 ? all[index - 1] : null
  const next = index < all.length - 1 ? all[index + 1] : null
  const title = project ? tr(project.title, lang) : tr(ui.shell.fallbackTitle, lang)

  const isEmbeddedBanner =
    typeof project?.banner === 'string' &&
    /\.(html?|svg)(\?|#|$)/i.test(project.banner)
  const imageSrc = isEmbeddedBanner ? project?.image : project?.banner ?? project?.image

  const [bannerOk, setBannerOk] = useState(!imageSrc)

  useEffect(() => {
    window.scrollTo(0, 0)
    setBannerOk(!imageSrc)
  }, [slug, imageSrc])

  useEffect(() => {
    if (!imageSrc || isEmbeddedBanner) return undefined
    const img = new Image()
    img.onload = () => setBannerOk(true)
    img.onerror = () => setBannerOk(false)
    img.src = imageSrc
  }, [imageSrc, isEmbeddedBanner])

  const showImageBanner = !isEmbeddedBanner && imageSrc && bannerOk

  return (
    <>
      <Nav />
      <div className="project-shell">
        {isEmbeddedBanner ? (
          <div className="project-shell-banner project-shell-banner--embed">
            <BannerEmbed
              src={project.banner}
              title={`${title} banner`}
              className="project-shell-banner-frame"
            />
          </div>
        ) : (
          <div
            className={`project-shell-banner${showImageBanner ? '' : ' project-shell-banner--fallback'}`}
            style={showImageBanner ? { backgroundImage: `url(${imageSrc})` } : undefined}
            role="img"
            aria-label=""
          />
        )}

        <div className="project-shell-breadcrumbs-bar">
          <div className="project-shell-breadcrumbs-wrap">
            <nav className="project-shell-breadcrumbs" aria-label={tr(ui.shell.breadcrumbAria, lang)}>
              <Link to="/">{tr(ui.shell.breadcrumbHome, lang)}</Link>
              <span className="project-shell-breadcrumbs__sep" aria-hidden="true">/</span>
              <Link to="/#work">{tr(ui.shell.breadcrumbProjects, lang)}</Link>
              <span className="project-shell-breadcrumbs__sep" aria-hidden="true">/</span>
              <span className="project-shell-breadcrumbs__current" aria-current="page">
                {title}
              </span>
            </nav>
          </div>
        </div>

        {children}

        {(prev || next) && (
          <nav className="project-shell-pager" aria-label={tr(ui.shell.pagerAria, lang)}>
            {prev ? (
              <Link to={prev.link} className="project-shell-pager-link">
                <span className="dir">{tr(ui.shell.previous, lang)}</span>
                <span className="name">{tr(prev.title, lang)}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={next.link}
                className="project-shell-pager-link project-shell-pager-link--next"
              >
                <span className="dir">{tr(ui.shell.next, lang)}</span>
                <span className="name">{tr(next.title, lang)}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
      <Footer />
    </>
  )
}
