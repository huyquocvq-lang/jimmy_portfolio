import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import '../styles/projects/eledevo-landing.css'

const meta = getProjectCard('eledevo-landing')

const AUDIENCES = [
  'Prospective students',
  'Hiring partners',
  'Returning learners',
  'Internal staff'
]

const OUTPUTS = [
  'Course catalog landing',
  'Program highlights',
  'Instructor & alumni stories',
  'Contact and enrollment forms',
  'Responsive mobile layout',
  'SEO-ready meta tags'
]

export default function EledevoLandingProject() {
  return (
    <ProjectShell slug="eledevo-landing">
      <article className="air">
        <header className="project-intro project-intro--air">
          <div className="air-hero-text">
            <span className="project-intro__eyebrow">{meta.type}</span>
            <h1>{meta.title}</h1>
            <p className="project-intro__lead">{meta.subtitle}</p>
          </div>
          <div className="air-mock">
            <div className="air-mock-in">
              <span className="air-mock-label">Visitor lands</span>
              <p>Searches for a coding bootcamp in Hanoi.</p>
            </div>
            <span className="air-arrow">→</span>
            <div className="air-mock-out">
              <span className="air-mock-label">Outcome</span>
              <p>Reads program detail, fills the enrollment form.</p>
            </div>
          </div>
        </header>

        <section className="air-problem">
          <h2>One page to introduce the academy</h2>
          <p>
            Eledevo Academy needed a clean, fast landing page that explained what the academy
            offered and made it easy for prospective students to reach out - without a heavy CMS or
            external page builders.
          </p>
        </section>

        <section className="air-audiences">
          <h2>Who it speaks to</h2>
          <div className="air-pills">
            {AUDIENCES.map((a) => (
              <span key={a} className="air-pill">{a}</span>
            ))}
          </div>
        </section>

        <section className="air-outputs">
          <h2>Sections on the page</h2>
          <ul className="air-output-list">
            {OUTPUTS.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>

        <section className="air-demo">
          <h2>How it was built</h2>
          <p>
            The page was built with React on the frontend, backed by a Spring REST API for any
            content that needed to come from the academy&apos;s systems. Layout was responsive
            from the start, and the forms hit the backend through a simple proxy that handled
            validation and storage.
          </p>
          <p>
            It was one of my earlier production projects - a small surface area, but a good first
            taste of owning a full stack from copy to deployment, while also helping run classes at
            the academy.
          </p>
        </section>
      </article>
    </ProjectShell>
  )
}
