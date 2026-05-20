import { Link } from 'react-router-dom'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import BannerEmbed from './BannerEmbed'

export default function FeaturedProject({ project }) {
  const { lang } = useLanguage()
  const imgStyle = { backgroundImage: `url(${project.image})` }
  const title = tr(project.title, lang)

  return (
    <article className="featured-project">
      <div className="featured-tag">{tr(ui.projects.featuredTag, lang)}</div>
      <Link
        to={project.link}
        className={`featured-img${project.banner ? ' featured-img--banner' : ''}`}
        aria-label={title}
      >
        {project.banner ? (
          <BannerEmbed src={project.banner} title={`${title} banner`} className="featured-img-inner" />
        ) : (
          <div className="featured-img-inner" style={imgStyle} aria-hidden="true" />
        )}
      </Link>
      <div className="featured-content">
        <div className="ftype">{tr(project.type, lang)}</div>
        <h3>
          <Link to={project.link}>{title}</Link>
        </h3>
        <div className="fsub">{tr(project.subtitle, lang)}</div>
        <p>{tr(project.description, lang)}</p>
        <div className="featured-meta">
          <div><strong>{tr(ui.projects.toolsLabel, lang)}</strong> {tr(project.tools, lang)}</div>
          <div><strong>{tr(ui.projects.impactLabel, lang)}</strong> {tr(project.impact, lang)}</div>
        </div>
        <Link to={project.link} className="btn-outline">{tr(ui.projects.viewProject, lang)}</Link>
      </div>
    </article>
  )
}
