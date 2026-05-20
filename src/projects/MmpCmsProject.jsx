import ProjectShell from '../components/project/ProjectShell'
import { featuredProject as meta } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import '../styles/projects/mmp-cms.css'

const CONTENT = {
  insightLabel: { en: 'Key insight', vi: 'Insight chính' },
  insight: {
    en: ['A CMS aimed at editorial scale needs to be tuned for the ', 'traffic shape', ', not just the data shape - so the work focused on request paths, caching layers, and database access from day one.'],
    vi: ['Một CMS hướng tới quy mô biên tập cần được tinh chỉnh theo ', 'hình thái traffic', ', không chỉ theo hình thái dữ liệu — nên ngay từ ngày đầu công việc tập trung vào đường đi của request, các lớp cache và cách truy cập database.']
  },
  problemHeading: { en: 'Business problem', vi: 'Bài toán nghiệp vụ' },
  problem: {
    en: 'MMP needed a CMS that could handle large content datasets and serve high-traffic public pages without sacrificing the editorial experience. The old workflow was fragmented across tools and could not scale with the publishing volume.',
    vi: 'MMP cần một CMS có thể xử lý dataset nội dung lớn và phục vụ các trang public high-traffic mà vẫn giữ trải nghiệm biên tập mượt mà. Workflow cũ bị phân mảnh qua nhiều công cụ và không scale được theo khối lượng xuất bản.'
  },
  approachHeading: { en: 'Approach', vi: 'Cách tiếp cận' },
  approach: {
    en: 'I built the system on Java Spring Boot, with MySQL as the primary store and Apache fronting requests. I optimized hot queries with proper indexing and pagination, exposed REST APIs for editorial workflows, and wired GitLab CI/CD for safe deployments.',
    vi: 'Tôi xây hệ thống trên Java Spring Boot, dùng MySQL làm store chính và Apache đứng trước nhận request. Tôi tối ưu các query nóng bằng index và phân trang phù hợp, mở REST API cho workflow biên tập, và dựng GitLab CI/CD cho deploy an toàn.'
  },
  recHeading: { en: 'What it delivers', vi: 'Kết quả' },
  recMain: { en: 'A custom CMS tuned for high traffic', vi: 'Một CMS tuỳ chỉnh tối ưu cho high traffic' },
  recBody: {
    en: 'Editorial workflows, content modeling, and public delivery in one codebase - tuned for the volume MMP runs at.',
    vi: 'Workflow biên tập, content modeling và delivery public nằm trong cùng một codebase — tinh chỉnh đúng theo quy mô của MMP.'
  },
  statHighVal: { en: 'High', vi: 'Cao' },
  statHighLbl: { en: 'Traffic capacity', vi: 'Sức chứa traffic' },
  statLargeVal: { en: 'Large', vi: 'Lớn' },
  statLargeLbl: { en: 'Editorial dataset', vi: 'Dataset biên tập' },
  toolsLabel: { en: 'Tools', vi: 'Công cụ' }
}

export default function MmpCmsProject() {
  const { lang } = useLanguage()
  const insightParts = CONTENT.insight[lang] || CONTENT.insight.en

  return (
    <ProjectShell slug="mmp-cms">
      <article className="wp">
        <header className="project-intro">
          <span className="project-intro__eyebrow">{tr(meta.type, lang)}</span>
          <h1 className="wp-title">{tr(meta.headline, lang)}</h1>
          <p className="project-intro__lead">{tr(meta.subtitle, lang)}</p>
        </header>

        <div className="wp-insight">
          <p className="wp-insight-label">{tr(CONTENT.insightLabel, lang)}</p>
          <p className="wp-insight-text">
            {insightParts[0]}
            <strong>{insightParts[1]}</strong>
            {insightParts[2]}
          </p>
        </div>

        <div className="wp-body">
          <div className="wp-split">
            <section className="wp-block">
              <h2>{tr(CONTENT.problemHeading, lang)}</h2>
              <p>{tr(CONTENT.problem, lang)}</p>
            </section>
            <section className="wp-block">
              <h2>{tr(CONTENT.approachHeading, lang)}</h2>
              <p>{tr(CONTENT.approach, lang)}</p>
            </section>
          </div>

          <aside className="wp-rec">
            <h2>{tr(CONTENT.recHeading, lang)}</h2>
            <p className="wp-rec-main">{tr(CONTENT.recMain, lang)}</p>
            <p>{tr(CONTENT.recBody, lang)}</p>
          </aside>

          <section className="wp-impact">
            <div className="wp-stat">
              <span className="wp-stat-val">{tr(CONTENT.statHighVal, lang)}</span>
              <span className="wp-stat-lbl">{tr(CONTENT.statHighLbl, lang)}</span>
            </div>
            <div className="wp-stat">
              <span className="wp-stat-val">{tr(CONTENT.statLargeVal, lang)}</span>
              <span className="wp-stat-lbl">{tr(CONTENT.statLargeLbl, lang)}</span>
            </div>
          </section>

          <p className="wp-tools">
            <strong>{tr(CONTENT.toolsLabel, lang)}</strong> {tr(meta.tools, lang)}
          </p>
        </div>
      </article>
    </ProjectShell>
  )
}
