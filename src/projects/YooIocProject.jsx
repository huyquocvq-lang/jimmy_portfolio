import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import '../styles/projects/yooioc.css'

const meta = getProjectCard('yooioc')

const FEATURES = [
  {
    title: { en: 'Resident & ticket management', vi: 'Quản lý cư dân & ticket' },
    text: {
      en: 'Central view of residents, service requests, and incident tickets with assignment to the right operations team.',
      vi: 'Tổng quan tập trung về cư dân, yêu cầu dịch vụ và ticket sự cố, kèm phân công cho đúng đội vận hành.'
    }
  },
  {
    title: { en: 'Device & vendor admin', vi: 'Quản trị thiết bị & vendor' },
    text: {
      en: 'Administer IoT devices, integrations with Legrand, Schneider Electric, and Tuya, and track device health across buildings.',
      vi: 'Quản trị thiết bị IoT, tích hợp Legrand, Schneider Electric và Tuya, theo dõi tình trạng thiết bị qua các toà nhà.'
    }
  },
  {
    title: { en: 'Microservices backend', vi: 'Backend microservice' },
    text: {
      en: 'Spring Boot + NestJS services communicating over MQTT, WebSocket, and RabbitMQ - each domain isolated and deployable independently.',
      vi: 'Các service Spring Boot + NestJS giao tiếp qua MQTT, WebSocket và RabbitMQ — mỗi domain tách biệt và deploy độc lập.'
    }
  },
  {
    title: { en: 'Dashboards & reporting', vi: 'Dashboard & báo cáo' },
    text: {
      en: 'Operational dashboards on top of MongoDB and MySQL data, exposing trends needed for daily operations of urban areas.',
      vi: 'Dashboard vận hành dựng trên dữ liệu MongoDB và MySQL, đưa ra các xu hướng cần thiết cho công việc vận hành khu đô thị hàng ngày.'
    }
  },
  {
    title: { en: 'Cloud deployment', vi: 'Deploy cloud' },
    text: {
      en: 'Deployed on CMC Cloud with Docker and Kubernetes for repeatable releases and horizontal scaling under load.',
      vi: 'Deploy trên CMC Cloud với Docker và Kubernetes để release lặp lại và scale ngang khi tải tăng.'
    }
  }
]

const CONTENT = {
  lead: {
    en: 'One operations hub: residents, tickets, devices, and reporting in one platform.',
    vi: 'Một trung tâm vận hành duy nhất: cư dân, ticket, thiết bị và báo cáo gói gọn trong cùng nền tảng.'
  },
  statMulti: { en: 'Multi-service', vi: 'Đa service' },
  statBackend: { en: 'backend', vi: 'backend' },
  statK8s: 'K8s',
  statK8sBody: { en: 'on CMC Cloud', vi: 'trên CMC Cloud' },
  context: {
    en: 'Before YooIOC, urban operations were spread across vendor consoles and manual files - slow and hard to coordinate. The team needed one platform that operators could use to run a smart urban area day to day.',
    vi: 'Trước khi có YooIOC, công việc vận hành khu đô thị phải làm trên nhiều console vendor và file thủ công — chậm và khó phối hợp. Team cần một nền tảng duy nhất để vận hành viên có thể chạy khu đô thị thông minh hàng ngày.'
  },
  dailyH: { en: 'Daily reference', vi: 'Tham chiếu hàng ngày' },
  daily: {
    en: "Became the operations team's primary tool for running urban areas - replacing a scattered set of vendor consoles and manual processes with one platform.",
    vi: 'Trở thành công cụ chính của đội vận hành khu đô thị — thay thế tập console vendor rời rạc và các quy trình thủ công bằng một nền tảng duy nhất.'
  }
}

export default function YooIocProject() {
  const { lang } = useLanguage()

  return (
    <ProjectShell slug="yooioc">
      <article className="pfm">
        <header className="project-intro">
          <p className="project-intro__eyebrow">{tr(meta.type, lang)}</p>
          <h1>{tr(meta.title, lang)}</h1>
          <p className="project-intro__lead">{tr(CONTENT.lead, lang)}</p>
          <div className="pfm-stat-row">
            <span><strong>{tr(CONTENT.statMulti, lang)}</strong> {tr(CONTENT.statBackend, lang)}</span>
            <span><strong>{CONTENT.statK8s}</strong> {tr(CONTENT.statK8sBody, lang)}</span>
          </div>
        </header>

        <section className="pfm-context">
          <p>{tr(CONTENT.context, lang)}</p>
        </section>

        <div className="pfm-bento">
          {FEATURES.map((f, i) => (
            <article key={i} className={`pfm-card pfm-card--${i + 1}`}>
              <h2>{tr(f.title, lang)}</h2>
              <p>{tr(f.text, lang)}</p>
            </article>
          ))}
        </div>

        <section className="pfm-daily">
          <h2>{tr(CONTENT.dailyH, lang)}</h2>
          <p>{tr(CONTENT.daily, lang)}</p>
        </section>
      </article>
    </ProjectShell>
  )
}
