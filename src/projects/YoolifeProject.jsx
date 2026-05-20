import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import '../styles/projects/yoolife.css'

const meta = getProjectCard('yoolife')

const STACK = [
  'React Native', 'Redux', 'Spring Boot', 'NestJS', 'MQTT', 'WebSocket', 'MongoDB', 'MySQL', 'MoMo', 'VN Pay'
]

const FEATURES = [
  'Resident services and notifications',
  'Real-time smart-home device control',
  'Payment gateway integration (MoMo, VN Pay)',
  'Push notifications and household messaging',
  'Native modules for Zigbee / Z-Wave / BLE bridging'
]

export default function YoolifeProject() {
  return (
    <ProjectShell slug="yoolife">
      <article className="trend">
        <header className="project-intro project-intro--trend">
          <span className="project-intro__eyebrow">{meta.type}</span>
          <h1>{meta.title}</h1>
          <p className="project-intro__lead">{meta.subtitle}</p>
        </header>

        <section className="trend-metrics">
          <p className="trend-label">Stack</p>
          <div className="trend-chips">
            {STACK.map((m) => (
              <span key={m} className="trend-chip">{m}</span>
            ))}
          </div>
        </section>

        <section className="trend-narrative">
          <div className="trend-col">
            <h2>Problem</h2>
            <p>
              Residents of smart urban areas needed a single mobile app to control devices, pay
              bills, and stay connected with their community - across a fleet of IoT vendors,
              payment partners, and backend microservices.
            </p>
          </div>
          <div className="trend-col">
            <h2>Method</h2>
            <p>
              Built the mobile app in React Native with native modules for low-level device
              communication, wired it to a Spring Boot + NestJS backend over MQTT and WebSocket,
              and integrated MoMo and VN Pay for payments. Deployed on CMC Cloud with Docker and
              Kubernetes.
            </p>
          </div>
        </section>

        <section className="trend-recs">
          <h2>What it does</h2>
          <ol>
            {FEATURES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ol>
        </section>

        <p className="trend-impact">{meta.impact}</p>
      </article>
    </ProjectShell>
  )
}
