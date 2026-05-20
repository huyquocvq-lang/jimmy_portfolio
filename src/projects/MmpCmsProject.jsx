import ProjectShell from '../components/project/ProjectShell'
import { featuredProject as meta } from '../data/projects'
import '../styles/projects/mmp-cms.css'

export default function MmpCmsProject() {
  return (
    <ProjectShell slug="mmp-cms">
      <article className="wp">
        <header className="project-intro">
          <span className="project-intro__eyebrow">{meta.type}</span>
          <h1 className="wp-title">{meta.headline}</h1>
          <p className="project-intro__lead">{meta.subtitle}</p>
        </header>

        <div className="wp-insight">
          <p className="wp-insight-label">Key insight</p>
          <p className="wp-insight-text">
            A CMS aimed at editorial scale needs to be tuned for the{' '}
            <strong>traffic shape</strong>, not just the data shape - so the work focused on
            request paths, caching layers, and database access from day one.
          </p>
        </div>

        <div className="wp-body">
          <div className="wp-split">
            <section className="wp-block">
              <h2>Business problem</h2>
              <p>
                MMP needed a CMS that could handle large content datasets and serve high-traffic
                public pages without sacrificing the editorial experience. The old workflow was
                fragmented across tools and could not scale with the publishing volume.
              </p>
            </section>
            <section className="wp-block">
              <h2>Approach</h2>
              <p>
                I built the system on Java Spring Boot, with MySQL as the primary store and Apache
                fronting requests. I optimized hot queries with proper indexing and pagination,
                exposed REST APIs for editorial workflows, and wired GitLab CI/CD for safe
                deployments.
              </p>
            </section>
          </div>

          <aside className="wp-rec">
            <h2>What it delivers</h2>
            <p className="wp-rec-main">A custom CMS tuned for high traffic</p>
            <p>
              Editorial workflows, content modeling, and public delivery in one codebase - tuned
              for the volume MMP runs at.
            </p>
          </aside>

          <section className="wp-impact">
            <div className="wp-stat">
              <span className="wp-stat-val">High</span>
              <span className="wp-stat-lbl">Traffic capacity</span>
            </div>
            <div className="wp-stat">
              <span className="wp-stat-val">Large</span>
              <span className="wp-stat-lbl">Editorial dataset</span>
            </div>
          </section>

          <p className="wp-tools">
            <strong>Tools</strong> {meta.tools}
          </p>
        </div>
      </article>
    </ProjectShell>
  )
}
