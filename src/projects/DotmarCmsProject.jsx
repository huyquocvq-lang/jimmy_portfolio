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
  { en: 'Editorial approval workflow with explicit hand-offs between roles', vi: 'Quy trình duyệt nội dung có các bước chuyển việc rõ ràng giữa từng vai trò' },
  { en: 'Personalization by location, time of day, age group, and audience segment', vi: 'Cá nhân hoá nội dung theo vị trí, thời gian, độ tuổi và từng nhóm khách hàng' },
  { en: 'AI agent that drafts content for editors to review - author-in-the-loop, not auto-publish', vi: 'AI hỗ trợ soạn nội dung để biên tập viên kiểm tra trước khi xuất bản, không tự động publish' }
]

const CONTRIBUTIONS = [
  { en: 'Built Magnolia / Java backend capabilities and custom CMS modules for the multi-site setup.', vi: 'Xây các capability backend Magnolia / Java và module CMS tuỳ chỉnh cho mô hình multi-site.' },
  { en: 'Implemented editorial workflow and API-driven content delivery used by the React headless frontend.', vi: 'Triển khai editorial workflow và content delivery qua API cho frontend React headless.' },
  { en: 'Worked on personalization and rule-driven experiences while keeping authoring practical for content teams.', vi: 'Làm phần personalization và trải nghiệm theo rule nhưng vẫn giữ quy trình authoring thực tế cho content team.' },
  { en: 'Contributed to performance, deployment, and production-readiness work around Apache / Tomcat and the CMS runtime.', vi: 'Tham gia tối ưu hiệu năng, deployment và production-readiness quanh Apache / Tomcat và runtime CMS.' }
]

const CHALLENGES = [
  { en: 'A CMS stack the team had not shipped on before - steep learning curve from day one', vi: 'Stack CMS team chưa từng ship - learning curve dốc ngay từ ngày đầu' },
  { en: 'Approval workflow is easy to over-engineer into a bottleneck if you do not push back on requirements', vi: 'Approval workflow rất dễ over-engineer thành bottleneck nếu không phản biện lại yêu cầu' },
  { en: 'Sales integration is where the value lives - and the hardest part to actually ship', vi: 'Sales integration là nơi giá trị thực sự nằm - cũng là phần khó ship nhất' }
]

const SYSTEM_SCALE = [
  { en: '3 sites · 1 author instance · 3 public instances', vi: '3 site · 1 môi trường biên tập · 3 public instance' },
  { en: 'CMS scaled for ~10,000 users', vi: 'CMS phục vụ khoảng 10K người dùng' },
  { en: 'Personalization policies and rules engine running in production', vi: 'Cá nhân hoá và rules engine đang chạy trên production' }
]

const MY_IMPACT = [
  { en: 'Helped turn a complex multi-site CMS into a repeatable authoring and delivery model across markets.', vi: 'Góp phần biến một CMS multi-site phức tạp thành mô hình authoring và delivery có thể lặp lại giữa các thị trường.' },
  { en: 'Improved editorial usability by implementing explicit workflow hand-offs instead of relying on ad-hoc publishing steps.', vi: 'Cải thiện trải nghiệm biên tập bằng workflow hand-off rõ ràng thay vì phụ thuộc vào các bước publish thủ công rời rạc.' },
  { en: 'Connected backend CMS capabilities to a headless React delivery layer while keeping deployment and runtime concerns production-ready.', vi: 'Kết nối capability backend CMS với lớp delivery React headless, đồng thời giữ deployment và runtime ở trạng thái sẵn sàng production.' }
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
  ownershipH: { en: 'Phần tôi trực tiếp phụ trách', vi: 'Phần tôi trực tiếp phụ trách' },
  useCasesH: { en: 'Một số use case chính', vi: 'Use case nổi bật' },
  challengesH: { en: 'Challenges', vi: 'Thử thách' },
  systemScaleH: { en: 'System Scale', vi: 'Quy mô hệ thống' },
  myImpactH: { en: 'Kết quả từ phần tôi phụ trách', vi: 'Tác động từ phần tôi phụ trách' }
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
          <h2>{tr(CONTENT.ownershipH, lang)}</h2>
          <ol>
            {CONTRIBUTIONS.map((r, i) => (
              <li key={i}>{tr(r, lang)}</li>
            ))}
          </ol>
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
          <h2>{tr(CONTENT.systemScaleH, lang)}</h2>
          <ol>
            {SYSTEM_SCALE.map((r, i) => (
              <li key={i}>{tr(r, lang)}</li>
            ))}
          </ol>
        </section>

        <section className="trend-recs">
          <h2>{tr(CONTENT.myImpactH, lang)}</h2>
          <ol>
            {MY_IMPACT.map((r, i) => (
              <li key={i}>{tr(r, lang)}</li>
            ))}
          </ol>
        </section>

        <p className="trend-impact">{tr(meta.impact, lang)}</p>
      </article>
    </ProjectShell>
  )
}
