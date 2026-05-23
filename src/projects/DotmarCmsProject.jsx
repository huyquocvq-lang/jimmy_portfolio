import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import '../styles/projects/dotmar-cms.css'

const meta = getProjectCard('dotmar-cms')

const STACK = [
  'Magnolia CMS', 'Java', 'React', 'Apache Tomcat', 'REST APIs'
]

const USE_CASES = [
  { en: 'One author instance feeding multiple public instances - multi-site, multi-language', vi: 'Một author instance phục vụ nhiều public instance - đa site, đa ngôn ngữ' },
  { en: 'Editorial approval workflow with explicit hand-offs between roles', vi: 'Workflow phê duyệt biên tập, hand-off giữa các vai trò được định nghĩa rõ' },
  { en: 'Personalization by location, time of day, age group, and audience segment', vi: 'Personalization theo vị trí, khung giờ, độ tuổi và segment khách hàng' },
  { en: 'AI agent that drafts content for editors to review - author-in-the-loop, not auto-publish', vi: 'AI agent soạn nội dung để biên tập viên review - author-in-the-loop, không auto-publish' }
]

const CHALLENGES = [
  { en: 'A CMS stack the team had not shipped on before - steep learning curve from day one', vi: 'Stack CMS team chưa từng ship - learning curve dốc ngay từ ngày đầu' },
  { en: 'Approval workflow is easy to over-engineer into a bottleneck if you do not push back on requirements', vi: 'Approval workflow rất dễ over-engineer thành bottleneck nếu không phản biện lại yêu cầu' },
  { en: 'Sales integration is where the value lives - and the hardest part to actually ship', vi: 'Sales integration là nơi giá trị thực sự nằm - cũng là phần khó ship nhất' }
]

const METRICS = [
  { en: '3 sites · 1 author instance · 3 public instances', vi: '3 site · 1 author instance · 3 public instance' },
  { en: 'CMS scaled for ~10,000 users', vi: 'CMS scale cho ~10,000 người dùng' },
  { en: 'Personalization policies and rules engine running in production', vi: 'Personalization và rules engine đang chạy production' }
]

const CONTENT = {
  stackLabel: { en: 'Stack', vi: 'Stack' },
  contextH: { en: 'Context', vi: 'Bối cảnh' },
  context: {
    en: 'Dotmar Engineering Plastics distributes semi-finished engineering thermoplastics and conveyor components across Australia and New Zealand - PTFE, Nylon, Acetal/POM, PEEK, PVC, HDPE, Polycarbonate, Acrylic, Polyurethane, plus CNC machining and custom-parts services. The brief was for a CMS that genuinely supports the sales motion - multi-site, multi-language, with personalization and editorial workflows that actually mirror the team\'s real process.',
    vi: 'Dotmar Engineering Plastics phân phối nhựa kỹ thuật và linh kiện băng tải tại Úc và New Zealand - PTFE, Nylon, Acetal/POM, PEEK, PVC, HDPE, Polycarbonate, Acrylic, Polyurethane, kèm dịch vụ CNC và gia công custom. Yêu cầu là một CMS hỗ trợ thật sự cho quy trình sales - đa site, đa ngôn ngữ, kèm personalization và workflow biên tập phản ánh đúng cách team đang làm.'
  },
  roleH: { en: 'Role', vi: 'Vai trò' },
  role: { en: 'Fullstack Developer · Tech Lead', vi: 'Fullstack Developer · Tech Lead' },
  useCasesH: { en: 'Highlighted Use Cases', vi: 'Use case nổi bật' },
  challengesH: { en: 'Challenges', vi: 'Thử thách' },
  metricsH: { en: 'Metrics', vi: 'Số liệu' }
}

export default function DotmarCmsProject() {
  const { lang } = useLanguage()

  return (
    <ProjectShell slug="dotmar-cms">
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
