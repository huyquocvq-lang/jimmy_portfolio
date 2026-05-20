import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import '../styles/projects/yooioc.css'

const meta = getProjectCard('yooioc')

const FEATURES = [
  {
    title: 'Resident & ticket management',
    text: 'Central view of residents, service requests, and incident tickets with assignment to the right operations team.'
  },
  {
    title: 'Device & vendor admin',
    text: 'Administer IoT devices, integrations with Legrand, Schneider Electric, and Tuya, and track device health across buildings.'
  },
  {
    title: 'Microservices backend',
    text: 'Spring Boot + NestJS services communicating over MQTT, WebSocket, and RabbitMQ - each domain isolated and deployable independently.'
  },
  {
    title: 'Dashboards & reporting',
    text: 'Operational dashboards on top of MongoDB and MySQL data, exposing trends needed for daily operations of urban areas.'
  },
  {
    title: 'Cloud deployment',
    text: 'Deployed on CMC Cloud with Docker and Kubernetes for repeatable releases and horizontal scaling under load.'
  }
]

export default function YooIocProject() {
  return (
    <ProjectShell slug="yooioc">
      <article className="pfm">
        <header className="project-intro">
          <p className="project-intro__eyebrow">{meta.type}</p>
          <h1>{meta.title}</h1>
          <p className="project-intro__lead">
            One operations hub: residents, tickets, devices, and reporting in one platform.
          </p>
          <div className="pfm-stat-row">
            <span><strong>Multi-service</strong> backend</span>
            <span><strong>K8s</strong> on CMC Cloud</span>
          </div>
        </header>

        <section className="pfm-context">
          <p>
            Before YooIOC, urban operations were spread across vendor consoles and manual files -
            slow and hard to coordinate. The team needed one platform that operators could use to
            run a smart urban area day to day.
          </p>
        </section>

        <div className="pfm-bento">
          {FEATURES.map((f, i) => (
            <article key={f.title} className={`pfm-card pfm-card--${i + 1}`}>
              <h2>{f.title}</h2>
              <p>{f.text}</p>
            </article>
          ))}
        </div>

        <section className="pfm-daily">
          <h2>Daily reference</h2>
          <p>
            Became the operations team&apos;s primary tool for running urban areas - replacing a
            scattered set of vendor consoles and manual processes with one platform.
          </p>
        </section>
      </article>
    </ProjectShell>
  )
}
