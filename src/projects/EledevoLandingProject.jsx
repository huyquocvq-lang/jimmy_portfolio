import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import '../styles/projects/eledevo-landing.css'

const meta = getProjectCard('eledevo-landing')

const AUDIENCES = [
  { en: 'Prospective students', vi: 'Học viên tiềm năng' },
  { en: 'Hiring partners', vi: 'Đối tác tuyển dụng' },
  { en: 'Returning learners', vi: 'Học viên cũ quay lại' },
  { en: 'Internal staff', vi: 'Nhân sự nội bộ' }
]

const OUTPUTS = [
  { en: 'Course catalog landing', vi: 'Trang giới thiệu danh mục khoá học' },
  { en: 'Program highlights', vi: 'Điểm nổi bật của chương trình' },
  { en: 'Instructor & alumni stories', vi: 'Câu chuyện giảng viên & cựu học viên' },
  { en: 'Contact and enrollment forms', vi: 'Form liên hệ và đăng ký' },
  { en: 'Responsive mobile layout', vi: 'Layout responsive cho mobile' },
  { en: 'SEO-ready meta tags', vi: 'Meta tag sẵn cho SEO' }
]

const CONTENT = {
  visitorLabel: { en: 'Visitor lands', vi: 'Khách ghé thăm' },
  visitorBody: { en: 'Searches for a coding bootcamp in Hanoi.', vi: 'Tìm một bootcamp lập trình tại Hà Nội.' },
  outcomeLabel: { en: 'Outcome', vi: 'Kết quả' },
  outcomeBody: { en: 'Reads program detail, fills the enrollment form.', vi: 'Đọc chi tiết chương trình, điền form đăng ký.' },
  problemH: { en: 'One page to introduce the academy', vi: 'Một trang giới thiệu học viện' },
  problem: {
    en: 'Eledevo Academy needed a clean, fast landing page that explained what the academy offered and made it easy for prospective students to reach out - without a heavy CMS or external page builders.',
    vi: 'Eledevo Academy cần một landing page gọn gàng, nhanh, giải thích rõ học viện cung cấp gì và giúp học viên tiềm năng dễ liên hệ — không cần một CMS nặng hay page builder bên ngoài.'
  },
  audiencesH: { en: 'Who it speaks to', vi: 'Đối tượng hướng đến' },
  outputsH: { en: 'Sections on the page', vi: 'Các phần trên trang' },
  demoH: { en: 'How it was built', vi: 'Cách trang được xây' },
  demo1: {
    en: "The page was built with React on the frontend, backed by a Spring REST API for any content that needed to come from the academy's systems. Layout was responsive from the start, and the forms hit the backend through a simple proxy that handled validation and storage.",
    vi: 'Trang được dựng bằng React ở frontend, backend là Spring REST API cho mọi nội dung cần lấy từ hệ thống của học viện. Layout responsive ngay từ đầu, các form gọi backend qua một proxy đơn giản phụ trách validation và lưu trữ.'
  },
  demo2: {
    en: "It was one of my earlier production projects - a small surface area, but a good first taste of owning a full stack from copy to deployment, while also helping run classes at the academy.",
    vi: 'Đây là một trong những dự án production đầu của tôi — diện tích nhỏ, nhưng là dịp sớm để làm chủ cả full stack từ copy đến deploy, đồng thời vẫn hỗ trợ vận hành các lớp tại học viện.'
  }
}

export default function EledevoLandingProject() {
  const { lang } = useLanguage()

  return (
    <ProjectShell slug="eledevo-landing">
      <article className="air">
        <header className="project-intro project-intro--air">
          <div className="air-hero-text">
            <span className="project-intro__eyebrow">{tr(meta.type, lang)}</span>
            <h1>{tr(meta.title, lang)}</h1>
            <p className="project-intro__lead">{tr(meta.subtitle, lang)}</p>
          </div>
          <div className="air-mock">
            <div className="air-mock-in">
              <span className="air-mock-label">{tr(CONTENT.visitorLabel, lang)}</span>
              <p>{tr(CONTENT.visitorBody, lang)}</p>
            </div>
            <span className="air-arrow">→</span>
            <div className="air-mock-out">
              <span className="air-mock-label">{tr(CONTENT.outcomeLabel, lang)}</span>
              <p>{tr(CONTENT.outcomeBody, lang)}</p>
            </div>
          </div>
        </header>

        <section className="air-problem">
          <h2>{tr(CONTENT.problemH, lang)}</h2>
          <p>{tr(CONTENT.problem, lang)}</p>
        </section>

        <section className="air-audiences">
          <h2>{tr(CONTENT.audiencesH, lang)}</h2>
          <div className="air-pills">
            {AUDIENCES.map((a, i) => (
              <span key={i} className="air-pill">{tr(a, lang)}</span>
            ))}
          </div>
        </section>

        <section className="air-outputs">
          <h2>{tr(CONTENT.outputsH, lang)}</h2>
          <ul className="air-output-list">
            {OUTPUTS.map((o, i) => (
              <li key={i}>{tr(o, lang)}</li>
            ))}
          </ul>
        </section>

        <section className="air-demo">
          <h2>{tr(CONTENT.demoH, lang)}</h2>
          <p>{tr(CONTENT.demo1, lang)}</p>
          <p>{tr(CONTENT.demo2, lang)}</p>
        </section>
      </article>
    </ProjectShell>
  )
}
