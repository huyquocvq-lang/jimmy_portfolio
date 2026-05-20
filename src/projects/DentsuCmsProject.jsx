import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import '../styles/projects/dentsu-cms.css'

const meta = getProjectCard('dentsu-cms')

const LAYERS = [
  {
    num: '01',
    title: { en: 'Content modeling in Magnolia', vi: 'Content modeling trong Magnolia' },
    text: {
      en: 'Designed reusable content types and templates in Magnolia CMS so editors could publish across channels without engineering involvement.',
      vi: 'Thiết kế các content type và template tái sử dụng trong Magnolia CMS để biên tập viên có thể xuất bản qua nhiều kênh mà không cần đến engineering.'
    }
  },
  {
    num: '02',
    title: { en: 'API delivery layer', vi: 'Lớp delivery API' },
    text: {
      en: 'Exposed content via REST and GraphQL endpoints, with caching and authorization so the React frontend could pull only what it needs per route.',
      vi: 'Mở nội dung qua REST và GraphQL endpoint, kèm caching và authorization để frontend React chỉ kéo đúng dữ liệu cần cho từng route.'
    }
  },
  {
    num: '03',
    title: { en: 'React headless frontend', vi: 'Frontend headless React' },
    text: {
      en: 'Built the React frontend that consumes the APIs - server-rendered where it matters for SEO, fully decoupled from the Magnolia backend.',
      vi: 'Xây frontend React consume các API — server-render ở những chỗ quan trọng cho SEO, hoàn toàn tách biệt với Magnolia backend.'
    }
  }
]

const SCORES = [
  {
    name: { en: 'Editor autonomy', vi: 'Tự chủ biên tập' },
    desc: {
      en: 'Reusable components let editors compose pages without code.',
      vi: 'Các component tái sử dụng giúp biên tập viên ghép trang mà không cần code.'
    }
  },
  {
    name: { en: 'API performance', vi: 'Hiệu năng API' },
    desc: {
      en: 'Query batching and caching keep page loads snappy under load.',
      vi: 'Batch query và caching giúp page load mượt khi có tải.'
    }
  },
  {
    name: { en: 'Channel reuse', vi: 'Tái dùng đa kênh' },
    desc: {
      en: 'Same content, multiple frontends - web, partner integrations, future apps.',
      vi: 'Cùng một nội dung, nhiều frontend khác nhau — web, tích hợp đối tác, ứng dụng tương lai.'
    }
  }
]

const CONTENT = {
  budget: { en: 'Enterprise headless content platform', vi: 'Nền tảng nội dung headless cấp doanh nghiệp' },
  problemH: { en: 'Why this existed', vi: 'Vì sao dự án tồn tại' },
  problem: {
    en: 'Dentsu needed a content platform where editors could move quickly and frontends could evolve independently. A monolithic CMS would couple presentation too tightly to the content model. A headless setup, done well, would let multiple frontends consume the same content without rework.',
    vi: 'Dentsu cần một nền tảng nội dung nơi biên tập viên có thể làm nhanh và các frontend phát triển độc lập. Một CMS monolithic sẽ ràng buộc presentation quá chặt với content model. Một setup headless làm chuẩn sẽ cho phép nhiều frontend dùng chung nội dung mà không phải làm lại.'
  },
  layersH: { en: 'Three-layer architecture', vi: 'Kiến trúc ba lớp' },
  formulaH: { en: 'Delivery contract', vi: 'Contract delivery' },
  formula: {
    en: 'Editor publishes in Magnolia → API resolves content tree → React renders on demand',
    vi: 'Biên tập viên xuất bản trên Magnolia → API resolve cây nội dung → React render khi cần'
  },
  formulaSub: {
    en: 'One source of truth for editorial content, independent release cycles for the frontend.',
    vi: 'Một nguồn sự thật duy nhất cho nội dung biên tập, chu kỳ release độc lập cho frontend.'
  },
  scoresH: { en: 'What we cared about', vi: 'Những thứ chúng tôi quan tâm' },
  outputsH: { en: 'What shipped', vi: 'Đã bàn giao' },
  outputs: {
    en: ['Magnolia content model and editor workflows', 'REST and GraphQL APIs with caching', 'React frontend consuming the API', 'CI/CD for the React build and Magnolia modules'],
    vi: ['Content model Magnolia và workflow biên tập', 'API REST và GraphQL có caching', 'Frontend React consume API', 'CI/CD cho React build và module Magnolia']
  },
  footHeadlessVal: { en: 'Headless', vi: 'Headless' },
  footHeadlessLbl: { en: 'CMS architecture', vi: 'Kiến trúc CMS' },
  footStackLbl: { en: 'Stack', vi: 'Stack' }
}

export default function DentsuCmsProject() {
  const { lang } = useLanguage()
  const outputs = CONTENT.outputs[lang] || CONTENT.outputs.en

  return (
    <ProjectShell slug="dentsu-cms">
      <article className="pgm">
        <header className="project-intro">
          <span className="project-intro__eyebrow">{tr(meta.type, lang)}</span>
          <h1>{tr(meta.title, lang)}</h1>
          <p className="project-intro__lead">{tr(meta.subtitle, lang)}</p>
          <div className="pgm-tags">
            <span>Magnolia CMS</span>
            <span>Java</span>
            <span>React</span>
            <span>REST</span>
            <span>GraphQL</span>
          </div>
          <p className="pgm-budget">{tr(CONTENT.budget, lang)}</p>
        </header>

        <section className="pgm-problem">
          <h2>{tr(CONTENT.problemH, lang)}</h2>
          <p>{tr(CONTENT.problem, lang)}</p>
        </section>

        <section className="pgm-layers">
          <h2 className="pgm-section-title">{tr(CONTENT.layersH, lang)}</h2>
          <div className="pgm-layer-stack">
            {LAYERS.map((layer) => (
              <div key={layer.num} className="pgm-layer">
                <span className="pgm-layer-num">{layer.num}</span>
                <div>
                  <h3>{tr(layer.title, lang)}</h3>
                  <p>{tr(layer.text, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pgm-formula">
          <h2>{tr(CONTENT.formulaH, lang)}</h2>
          <code>{tr(CONTENT.formula, lang)}</code>
          <p>{tr(CONTENT.formulaSub, lang)}</p>
        </section>

        <section className="pgm-scores">
          <h2 className="pgm-section-title">{tr(CONTENT.scoresH, lang)}</h2>
          <div className="pgm-score-grid">
            {SCORES.map((s) => (
              <div key={s.name.en} className="pgm-score-card">
                <h3>{tr(s.name, lang)}</h3>
                <p>{tr(s.desc, lang)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pgm-outputs">
          <h2>{tr(CONTENT.outputsH, lang)}</h2>
          <ul>
            {outputs.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </section>

        <footer className="pgm-footer">
          <div>
            <span className="val">{tr(CONTENT.footHeadlessVal, lang)}</span>
            <span className="lbl">{tr(CONTENT.footHeadlessLbl, lang)}</span>
          </div>
          <div>
            <span className="val">Magnolia + React</span>
            <span className="lbl">{tr(CONTENT.footStackLbl, lang)}</span>
          </div>
        </footer>
      </article>
    </ProjectShell>
  )
}
