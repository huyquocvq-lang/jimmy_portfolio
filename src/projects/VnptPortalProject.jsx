import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import '../styles/projects/vnpt-portal.css'

const meta = getProjectCard('vnpt-portal')

const SOURCES = ['Liferay portlets', 'Spring Boot APIs', 'MySQL', 'Spring Data JPA', 'Git', 'Trello']

const STEPS = [
  {
    title: { en: 'Portal pages', vi: 'Các trang portal' },
    text: {
      en: 'Built customer-facing pages in Liferay with reusable portlets for content blocks.',
      vi: 'Xây các trang phục vụ khách hàng trên Liferay với các portlet tái sử dụng cho khối nội dung.'
    }
  },
  {
    title: { en: 'REST backend', vi: 'Backend REST' },
    text: {
      en: 'Backed the portal with Spring Boot REST APIs following clean conventions.',
      vi: 'Hậu thuẫn portal bằng Spring Boot REST API tuân thủ các convention sạch.'
    }
  },
  {
    title: { en: 'Query tuning', vi: 'Tinh chỉnh truy vấn' },
    text: {
      en: 'Profiled and optimized hot queries with Spring Data JPA so data-heavy pages stayed responsive.',
      vi: 'Profile và tối ưu các query nóng bằng Spring Data JPA để các trang nặng dữ liệu vẫn phản hồi nhanh.'
    }
  }
]

const CONTENT = {
  why: {
    en: 'VNPT needed a public-facing information portal that could be maintained by a small team and extended as the product catalog grew. Liferay gave the editorial surface; Spring Boot gave the engineering control over performance.',
    vi: 'VNPT cần một portal thông tin public có thể được duy trì bởi một team nhỏ và mở rộng khi danh mục sản phẩm lớn dần. Liferay cung cấp bề mặt biên tập; Spring Boot mang lại quyền kiểm soát hiệu năng cho engineering.'
  },
  sourcesH: { en: 'Stack & tooling', vi: 'Stack & công cụ' },
  flowH: { en: 'How it was built', vi: 'Cách dự án được xây' },
  asideH: { en: 'What I did on the team', vi: 'Vai trò của tôi trong team' },
  aside: {
    en: 'Beyond the code, I joined the business analysis discussions to make sure the portal actually answered the customer questions VNPT cared about, and used Trello and GitHub to keep delivery transparent for the rest of the team.',
    vi: 'Ngoài việc code, tôi tham gia các buổi phân tích nghiệp vụ để đảm bảo portal trả lời đúng những câu hỏi khách hàng mà VNPT quan tâm, và dùng Trello và GitHub để giữ tiến độ minh bạch cho cả team.'
  }
}

export default function VnptPortalProject() {
  const { lang } = useLanguage()

  return (
    <ProjectShell slug="vnpt-portal">
      <article className="glean">
        <header className="project-intro project-intro--center">
          <span className="project-intro__eyebrow">{tr(meta.type, lang)}</span>
          <h1>{tr(meta.title, lang)}</h1>
          <p className="project-intro__lead">{tr(meta.subtitle, lang)}</p>
        </header>

        <section className="glean-why">
          <p>{tr(CONTENT.why, lang)}</p>
        </section>

        <section className="glean-sources">
          <h2>{tr(CONTENT.sourcesH, lang)}</h2>
          <ul>
            {SOURCES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="glean-flow">
          <h2>{tr(CONTENT.flowH, lang)}</h2>
          <div className="glean-steps">
            {STEPS.map((step, i) => (
              <div key={i} className="glean-step">
                <span className="glean-step-n">{i + 1}</span>
                <div>
                  <h3>{tr(step.title, lang)}</h3>
                  <p>{tr(step.text, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="glean-example">
          <h2>{tr(CONTENT.asideH, lang)}</h2>
          <p>{tr(CONTENT.aside, lang)}</p>
        </aside>
      </article>
    </ProjectShell>
  )
}
