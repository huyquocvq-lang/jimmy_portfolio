import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import '../styles/projects/vnpt-portal.css'

const meta = getProjectCard('vnpt-portal')

const SOURCES = ['Liferay portlets', 'Spring Boot APIs', 'MySQL', 'Spring Data JPA', 'Git', 'Trello']

const STEPS = [
  { title: 'Portal pages', text: 'Built customer-facing pages in Liferay with reusable portlets for content blocks.' },
  { title: 'REST backend', text: 'Backed the portal with Spring Boot REST APIs following clean conventions.' },
  { title: 'Query tuning', text: 'Profiled and optimized hot queries with Spring Data JPA so data-heavy pages stayed responsive.' }
]

export default function VnptPortalProject() {
  return (
    <ProjectShell slug="vnpt-portal">
      <article className="glean">
        <header className="project-intro project-intro--center">
          <span className="project-intro__eyebrow">{meta.type}</span>
          <h1>{meta.title}</h1>
          <p className="project-intro__lead">{meta.subtitle}</p>
        </header>

        <section className="glean-why">
          <p>
            VNPT needed a public-facing information portal that could be maintained by a small team
            and extended as the product catalog grew. Liferay gave the editorial surface; Spring
            Boot gave the engineering control over performance.
          </p>
        </section>

        <section className="glean-sources">
          <h2>Stack & tooling</h2>
          <ul>
            {SOURCES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="glean-flow">
          <h2>How it was built</h2>
          <div className="glean-steps">
            {STEPS.map((step, i) => (
              <div key={step.title} className="glean-step">
                <span className="glean-step-n">{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="glean-example">
          <h2>What I did on the team</h2>
          <p>
            Beyond the code, I joined the business analysis discussions to make sure the portal
            actually answered the customer questions VNPT cared about, and used Trello and GitHub
            to keep delivery transparent for the rest of the team.
          </p>
        </aside>
      </article>
    </ProjectShell>
  )
}
