import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import '../styles/projects/yoolife.css'

const meta = getProjectCard('yoolife')

const STACK = [
  'React Native', 'Redux', 'Spring Boot', 'NestJS', 'MQTT', 'WebSocket', 'MongoDB', 'MySQL', 'MoMo', 'VN Pay'
]

const FEATURES = [
  { en: 'Resident services and notifications', vi: 'Dịch vụ cư dân và thông báo' },
  { en: 'Real-time smart-home device control', vi: 'Điều khiển thiết bị smart-home real-time' },
  { en: 'Payment gateway integration (MoMo, VN Pay)', vi: 'Tích hợp cổng thanh toán (MoMo, VN Pay)' },
  { en: 'Push notifications and household messaging', vi: 'Push notification và nhắn tin theo hộ gia đình' },
  { en: 'Native modules for Zigbee / Z-Wave / BLE bridging', vi: 'Native module cầu nối Zigbee / Z-Wave / BLE' }
]

const CONTENT = {
  stackLabel: { en: 'Stack', vi: 'Stack' },
  problemH: { en: 'Problem', vi: 'Bài toán' },
  problem: {
    en: 'Residents of smart urban areas needed a single mobile app to control devices, pay bills, and stay connected with their community - across a fleet of IoT vendors, payment partners, and backend microservices.',
    vi: 'Cư dân khu đô thị thông minh cần một ứng dụng mobile duy nhất để điều khiển thiết bị, thanh toán hoá đơn và kết nối cộng đồng — qua hàng loạt vendor IoT, đối tác thanh toán và microservice backend.'
  },
  methodH: { en: 'Method', vi: 'Phương pháp' },
  method: {
    en: 'Built the mobile app in React Native with native modules for low-level device communication, wired it to a Spring Boot + NestJS backend over MQTT and WebSocket, and integrated MoMo and VN Pay for payments. Deployed on CMC Cloud with Docker and Kubernetes.',
    vi: 'Xây app mobile bằng React Native với native module cho giao tiếp thiết bị tầng thấp, kết nối tới backend Spring Boot + NestJS qua MQTT và WebSocket, tích hợp MoMo và VN Pay cho thanh toán. Deploy trên CMC Cloud với Docker và Kubernetes.'
  },
  featuresH: { en: 'What it does', vi: 'Tính năng' }
}

export default function YoolifeProject() {
  const { lang } = useLanguage()

  return (
    <ProjectShell slug="yoolife">
      <article className="trend">
        <header className="project-intro project-intro--trend">
          <span className="project-intro__eyebrow">{tr(meta.type, lang)}</span>
          <h1>{tr(meta.title, lang)}</h1>
          <p className="project-intro__lead">{tr(meta.subtitle, lang)}</p>
        </header>

        <section className="trend-metrics">
          <p className="trend-label">{tr(CONTENT.stackLabel, lang)}</p>
          <div className="trend-chips">
            {STACK.map((m) => (
              <span key={m} className="trend-chip">{m}</span>
            ))}
          </div>
        </section>

        <section className="trend-narrative">
          <div className="trend-col">
            <h2>{tr(CONTENT.problemH, lang)}</h2>
            <p>{tr(CONTENT.problem, lang)}</p>
          </div>
          <div className="trend-col">
            <h2>{tr(CONTENT.methodH, lang)}</h2>
            <p>{tr(CONTENT.method, lang)}</p>
          </div>
        </section>

        <section className="trend-recs">
          <h2>{tr(CONTENT.featuresH, lang)}</h2>
          <ol>
            {FEATURES.map((r, i) => (
              <li key={i}>{tr(r, lang)}</li>
            ))}
          </ol>
        </section>

        <p className="trend-impact">{tr(meta.impact, lang)}</p>
      </article>
    </ProjectShell>
  )
}
