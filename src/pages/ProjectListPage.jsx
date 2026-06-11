import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FeaturedProject from '../components/FeaturedProject'
import OtherProject from '../components/OtherProject'
import { featuredProject, otherProjects } from '../data/projects'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr, localePath } from '../utils/i18n'

export default function ProjectListPage() {
  const { lang } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Seo
        title={{
          en: 'Projects — Fintech, AIoT & Enterprise CMS Case Studies',
          vi: 'Dự án — Case study Fintech, AIoT & CMS doanh nghiệp'
        }}
        description={{
          en: 'Production systems by Jimmy Vu: a lending orchestration platform disbursing ~$10M/month, an AIoT platform with 500K+ devices, custom Zigbee gateway firmware, and multi-site enterprise CMS. Java, Spring Boot, React Native, Node.js.',
          vi: 'Các hệ thống production của Jimmy Vu: nền tảng lending giải ngân ~$10M/tháng, nền tảng AIoT 500K+ thiết bị, firmware gateway Zigbee tuỳ chỉnh và CMS đa site doanh nghiệp. Java, Spring Boot, React Native, Node.js.'
        }}
        path="/projects"
      />
      <Nav />
      <main className="list-page" id="project-list">
        <div className="list-page-inner">
          <header className="list-page-header">
            <div className="eyebrow">{tr(ui.projects.listEyebrow, lang)}</div>
            <h1>{tr(ui.projects.listHeading, lang)}</h1>
            <Link to={localePath('/', lang)} className="list-page-back">{tr(ui.projects.backHome, lang)}</Link>
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
