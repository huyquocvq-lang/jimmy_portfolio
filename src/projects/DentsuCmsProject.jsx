import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import '../styles/projects/dentsu-cms.css'

const meta = getProjectCard('dentsu-cms')

const LAYERS = [
  {
    num: '01',
    title: 'Content modeling in Magnolia',
    text: 'Designed reusable content types and templates in Magnolia CMS so editors could publish across channels without engineering involvement.'
  },
  {
    num: '02',
    title: 'API delivery layer',
    text: 'Exposed content via REST and GraphQL endpoints, with caching and authorization so the React frontend could pull only what it needs per route.'
  },
  {
    num: '03',
    title: 'React headless frontend',
    text: 'Built the React frontend that consumes the APIs - server-rendered where it matters for SEO, fully decoupled from the Magnolia backend.'
  }
]

const SCORES = [
  { name: 'Editor autonomy', desc: 'Reusable components let editors compose pages without code.' },
  { name: 'API performance', desc: 'Query batching and caching keep page loads snappy under load.' },
  { name: 'Channel reuse', desc: 'Same content, multiple frontends - web, partner integrations, future apps.' }
]

export default function DentsuCmsProject() {
  return (
    <ProjectShell slug="dentsu-cms">
      <article className="pgm">
        <header className="project-intro">
          <span className="project-intro__eyebrow">{meta.type}</span>
          <h1>{meta.title}</h1>
          <p className="project-intro__lead">{meta.subtitle}</p>
          <div className="pgm-tags">
            <span>Magnolia CMS</span>
            <span>Java</span>
            <span>React</span>
            <span>REST</span>
            <span>GraphQL</span>
          </div>
          <p className="pgm-budget">Enterprise headless content platform</p>
        </header>

        <section className="pgm-problem">
          <h2>Why this existed</h2>
          <p>
            Dentsu needed a content platform where editors could move quickly and frontends could
            evolve independently. A monolithic CMS would couple presentation too tightly to the
            content model. A headless setup, done well, would let multiple frontends consume the
            same content without rework.
          </p>
        </section>

        <section className="pgm-layers">
          <h2 className="pgm-section-title">Three-layer architecture</h2>
          <div className="pgm-layer-stack">
            {LAYERS.map((layer) => (
              <div key={layer.num} className="pgm-layer">
                <span className="pgm-layer-num">{layer.num}</span>
                <div>
                  <h3>{layer.title}</h3>
                  <p>{layer.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pgm-formula">
          <h2>Delivery contract</h2>
          <code>
            Editor publishes in Magnolia → API resolves content tree → React renders on demand
          </code>
          <p>
            One source of truth for editorial content, independent release cycles for the
            frontend.
          </p>
        </section>

        <section className="pgm-scores">
          <h2 className="pgm-section-title">What we cared about</h2>
          <div className="pgm-score-grid">
            {SCORES.map((s) => (
              <div key={s.name} className="pgm-score-card">
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pgm-outputs">
          <h2>What shipped</h2>
          <ul>
            <li>Magnolia content model and editor workflows</li>
            <li>REST and GraphQL APIs with caching</li>
            <li>React frontend consuming the API</li>
            <li>CI/CD for the React build and Magnolia modules</li>
          </ul>
        </section>

        <footer className="pgm-footer">
          <div>
            <span className="val">Headless</span>
            <span className="lbl">CMS architecture</span>
          </div>
          <div>
            <span className="val">Magnolia + React</span>
            <span className="lbl">Stack</span>
          </div>
        </footer>
      </article>
    </ProjectShell>
  )
}
