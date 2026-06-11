import { Link } from 'react-router-dom'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr, localePath } from '../utils/i18n'
import BannerEmbed from './BannerEmbed'

export default function OtherProject({ project }) {
  const { lang } = useLanguage()
  const imgStyle = { backgroundImage: `url(${project.image})` }
  const title = tr(project.title, lang)
  const link = localePath(project.link, lang)

  return (
    <article className="other-project">
      <Link
        to={link}
        className={`thumb${project.banner ? ' thumb--banner' : ''}`}
        aria-label={title}
      >
        {project.banner ? (
          <BannerEmbed src={project.banner} title={`${title} banner`} className="thumb-inner" />
        ) : (
          <span className="thumb-inner" style={imgStyle} aria-hidden="true" />
        )}
      </Link>
      <div className="ptype">{tr(project.type, lang)}</div>
      <h4>
        <Link to={link}>{title}</Link>
      </h4>
      <div className="sub">{tr(project.subtitle, lang)}</div>
      <p>{tr(project.description, lang)}</p>
      <div className="impact-line">{tr(project.impact, lang)}</div>
      <Link to={link} className="link-arrow">{tr(ui.projects.viewProjectArrow, lang)}</Link>
    </article>
  )
}
