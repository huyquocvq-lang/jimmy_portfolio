import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FeaturedProject from '../components/FeaturedProject'
import OtherProject from '../components/OtherProject'
import { featuredProject, otherProjects } from '../data/projects'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'

export default function ProjectListPage() {
  const { lang } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Nav />
      <main className="list-page" id="project-list">
        <div className="list-page-inner">
          <header className="list-page-header">
            <div className="eyebrow">{tr(ui.projects.listEyebrow, lang)}</div>
            <h1>{tr(ui.projects.listHeading, lang)}</h1>
            <Link to="/" className="list-page-back">{tr(ui.projects.backHome, lang)}</Link>
          </header>

          <FeaturedProject project={featuredProject} />

          <div className="other-projects-label">{tr(ui.projects.moreWork, lang)}</div>
          <div className="other-projects">
            {otherProjects.map((p, i) => (
              <OtherProject key={i} project={p} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
