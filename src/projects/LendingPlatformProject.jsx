import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import '../styles/projects/lending-orchestration-platform.css'

const meta = getProjectCard('lending-orchestration-platform')

const STACK = [
  'Java', 'Spring Boot', 'Camunda BPM', 'Angular', 'React', 'REST APIs', 'Microservices'
]

const USE_CASES = [
  { en: 'Product catalog and lifecycle management for a diverse set of loan products', vi: 'Quản lý catalog và vòng đời cho một danh mục sản phẩm vay đa dạng' },
  { en: 'BPMN-driven loan workflow orchestration on Camunda', vi: 'Điều phối luồng vay theo BPMN trên Camunda' },
  { en: 'Per-product policy and decisioning configuration', vi: 'Cấu hình chính sách và decisioning theo từng sản phẩm' },
  { en: 'Centralized monitoring across partner integrations', vi: 'Giám sát tập trung trên các integration đối tác' }
]

const CHALLENGES = [
  { en: 'Each loan product has its own flow and credit policy - the platform has to host all of them without forcing a shared shape', vi: 'Mỗi sản phẩm vay có flow và chính sách tín dụng riêng - platform phải chứa được tất cả mà không ép vào một khuôn chung' },
  { en: 'Changes must stay isolated so a tweak to one product cannot regress another live flow', vi: 'Thay đổi phải được cô lập để chỉnh một sản phẩm không kéo theo regression cho sản phẩm khác đang chạy' },
  { en: 'Central governance without becoming a bottleneck for partner-specific logic', vi: 'Quản trị tập trung mà không trở thành bottleneck cho logic riêng của từng đối tác' },
  { en: 'Security and integrity guarantees for customer funds, end-to-end', vi: 'Đảm bảo bảo mật và toàn vẹn cho dòng tiền của khách hàng, từ đầu đến cuối' }
]

const METRICS = [
  { en: 'Customer base in the millions', vi: 'Tập khách hàng quy mô hàng triệu' },
  { en: 'Monthly disbursement up to ~$10M USD', vi: 'Giải ngân hàng tháng lên tới ~$10M USD' },
  { en: 'Multiple loan products live on the same platform', vi: 'Nhiều sản phẩm vay cùng chạy trên một platform' }
]

const CONTENT = {
  stackLabel: { en: 'Stack', vi: 'Stack' },
  contextH: { en: 'Context', vi: 'Bối cảnh' },
  context: {
    en: 'A large telco-fintech operator partners with several financial institutions to offer lending products. Running each product as its own isolated stack was no longer practical, so the team built a single platform to manage products, route applications, and configure flows centrally - turning a months-long product launch into something measured in weeks.',
    vi: 'Một đơn vị telco-fintech lớn hợp tác với nhiều đối tác tài chính để cung cấp dịch vụ vay. Vận hành riêng lẻ từng sản phẩm thành stack độc lập không còn hợp lý, nên team xây một platform duy nhất để quản lý sản phẩm, điều hướng hồ sơ và cấu hình luồng tập trung - biến một lần ra mắt sản phẩm vốn dài hàng tháng thành chuyện vài tuần.'
  },
  roleH: { en: 'Role', vi: 'Vai trò' },
  role: { en: 'Software Engineer - Backend / Platform', vi: 'Software Engineer - Backend / Platform' },
  useCasesH: { en: 'Highlighted Use Cases', vi: 'Use case nổi bật' },
  challengesH: { en: 'Challenges', vi: 'Thử thách' },
  metricsH: { en: 'Metrics', vi: 'Số liệu' }
}

export default function LendingPlatformProject() {
  const { lang } = useLanguage()

  return (
    <ProjectShell slug="lending-orchestration-platform">
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
            <h2>{tr(CONTENT.contextH, lang)}</h2>
            <p>{tr(CONTENT.context, lang)}</p>
          </div>
          <div className="trend-col">
            <h2>{tr(CONTENT.roleH, lang)}</h2>
            <p>{tr(CONTENT.role, lang)}</p>
          </div>
        </section>

        <section className="trend-recs">
          <h2>{tr(CONTENT.useCasesH, lang)}</h2>
          <ol>
            {USE_CASES.map((r, i) => (
              <li key={i}>{tr(r, lang)}</li>
            ))}
          </ol>
        </section>

        <section className="trend-recs">
          <h2>{tr(CONTENT.challengesH, lang)}</h2>
          <ol>
            {CHALLENGES.map((r, i) => (
              <li key={i}>{tr(r, lang)}</li>
            ))}
          </ol>
        </section>

        <section className="trend-recs">
          <h2>{tr(CONTENT.metricsH, lang)}</h2>
          <ol>
            {METRICS.map((r, i) => (
              <li key={i}>{tr(r, lang)}</li>
            ))}
          </ol>
        </section>

        <p className="trend-impact">{tr(meta.impact, lang)}</p>
      </article>
    </ProjectShell>
  )
}
