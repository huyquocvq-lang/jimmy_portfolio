import { Link } from 'react-router-dom'
import { featuredProject, otherProjects } from '../data/projects'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import FeaturedProject from './FeaturedProject'
import OtherProject from './OtherProject'

export default function Projects() {
  const { lang } = useLanguage()
  const totalCount = 1 + otherProjects.length
  const countLabel = String(totalCount).padStart(2, '0') + ' ' + tr(ui.projects.count, lang)

  return (
    <section className="projects" id="work">
      <div className="projects-inner">

        <div className="projects-header">
          <div className="titles">
            <div className="eyebrow">{tr(ui.projects.eyebrow, lang)}</div>
            <h2>{tr(ui.projects.heading, lang)}</h2>
          </div>
          <div className="projects-header-meta">
            <div className="count">{countLabel}</div>
            <Link to="/projects" className="projects-viewall">{tr(ui.projects.viewAll, lang)}</Link>
          </div>
        </div>

        {/* FEATURED */}
        <FeaturedProject project={featuredProject} />

        {/* OTHERS GRID */}
        <div className="other-projects-label">{tr(ui.projects.moreWork, lang)}</div>
        <div className="other-projects">
          {otherProjects.map((p, i) => (
            <OtherProject key={i} project={p} />
          ))}
        </div>

      </div>
    </section>
  )
}
