import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import '../styles/projects/hubly.css'

const meta = getProjectCard('hubly')

const STACK = [
  'NestJS', 'Moleculer', 'Node.js', 'PHP', 'Prisma', 'MongoDB', 'Redis', 'Bull',
  'Algolia', 'OpenAI', 'AWS Rekognition', 'Hive', 'Bodyguard', 'Tisane',
  'Vue 2', 'Nuxt 2', 'Flutter', 'Pusher', 'Sendbird'
]

const USE_CASES = [
  { en: 'Seven community types - Business, Education, Sports, Charity, Public Sector, Personal, Family', vi: 'Bảy loại community - Doanh nghiệp, Giáo dục, Thể thao, Từ thiện, Khu vực công, Cá nhân, Gia đình' },
  { en: 'Hubchat - encrypted messaging with video and conference calls', vi: 'Hubchat - nhắn tin mã hoá, gọi video và họp nhóm' },
  { en: 'ID Hub - KYC via passport, national ID, or driver\'s license', vi: 'ID Hub - KYC qua passport, CCCD hoặc GPLX' },
  { en: 'DotAds - internal ads platform with revenue share for creators', vi: 'DotAds - nền tảng quảng cáo nội bộ, chia sẻ doanh thu cho người sáng tạo nội dung' },
  { en: 'Hubpoints rewards, Hubstream livestream, Multihub, and ACA (auto content aggregator)', vi: 'Hubpoints (reward), Hubstream (livestream), Multihub và ACA (auto content aggregator)' },
  { en: 'Hub Packs by market segment, plus CRM hooks into Google / Microsoft / Apple Calendar, HubSpot, Salesforce, and Slack', vi: 'Hub Packs theo phân khúc thị trường, kèm hook CRM cho Google / Microsoft / Apple Calendar, HubSpot, Salesforce và Slack' }
]

const CONTRIBUTIONS = [
  { en: 'Worked across the NestJS / Moleculer backend, Vue / Nuxt web app, and Flutter mobile surface as a senior full-stack engineer.', vi: 'Làm cả backend NestJS / Moleculer, web Vue / Nuxt và ứng dụng Flutter ở vai trò Senior Full-stack Engineer.' },
  { en: 'Delivered search, taxonomy, invite, and permissions work across platform modules and production data flows.', vi: 'Phát triển các phần search, taxonomy, lời mời và phân quyền trên nhiều module của hệ thống.' },
  { en: 'Contributed to the Sendbird-to-proprietary-chat migration path while protecting existing production conversations.', vi: 'Tham gia chuyển từ Sendbird sang hệ thống chat riêng mà vẫn giữ an toàn cho các cuộc hội thoại đang hoạt động.' },
  { en: 'Integrated and maintained external platform services including Algolia, messaging, moderation, and realtime dependencies.', vi: 'Tích hợp và duy trì các dịch vụ bên ngoài như Algolia, messaging, moderation và các thành phần realtime.' }
]

const CHALLENGES = [
  { en: 'Broad surface area - community, moderation, commerce, ads, rewards, and livestream on one platform', vi: 'Phạm vi rộng - community, moderation, commerce, ads, reward và livestream trên cùng một platform' },
  { en: 'Heavy reliance on external services (AWS, OpenAI, Algolia, Hive, Bodyguard, Tisane, YOTI, Sendbird, Pusher) - each one is its own failure mode', vi: 'Hệ thống phụ thuộc vào nhiều dịch vụ bên ngoài như AWS, OpenAI, Algolia, Hive, Bodyguard, Tisane, YOTI, Sendbird và Pusher; mỗi dịch vụ đều có cách lỗi và rủi ro vận hành khác nhau' },
  { en: 'Migrating from Sendbird to a proprietary chat without breaking live conversations', vi: 'Chuyển từ Sendbird sang hệ thống chat riêng mà không làm gián đoạn các cuộc hội thoại đang hoạt động' },
  { en: 'Legacy Vue 2 + Nuxt 2 frontend that needs a credible Vue 3 migration plan, not just intent', vi: 'Frontend Vue 2 + Nuxt 2 đã cũ, cần một kế hoạch chuyển lên Vue 3 có thể triển khai thực tế chứ không chỉ dừng ở định hướng' }
]

const SYSTEM_SCALE = [
  { en: 'Global community platform spanning community, chat, KYC, ads, rewards, livestream, and moderation.', vi: 'Platform community toàn cầu gồm community, chat, KYC, ads, reward, livestream và moderation.' },
  { en: 'Hubshield moderation covers text, image, video, audio, OCR, and GIF across 30+ languages.', vi: 'Hubshield moderation bao phủ text, ảnh, video, audio, OCR và GIF trên 30+ ngôn ngữ.' },
  { en: 'Multiple external dependencies across search, messaging, identity, AI moderation, and realtime delivery.', vi: 'Nhiều dependency ngoài cho search, messaging, identity, AI moderation và realtime delivery.' }
]

const MY_IMPACT = [
  { en: 'Delivered search, taxonomy, invite, and permissions work that improved discoverability and access-control behavior across the product.', vi: 'Phát triển search, taxonomy, lời mời và phân quyền, giúp việc tìm nội dung và kiểm soát quyền truy cập rõ ràng hơn.' },
  { en: 'Helped de-risk the Sendbird migration by working on the path toward proprietary chat without treating live conversations as disposable state.', vi: 'Góp phần giảm rủi ro khi rời Sendbird bằng cách thiết kế lộ trình chuyển sang chat riêng mà vẫn bảo toàn các cuộc hội thoại đang hoạt động.' },
  { en: 'Worked across backend, web, and mobile boundaries so platform changes remained compatible across product surfaces.', vi: 'Phối hợp thay đổi giữa backend, web và mobile để các phần của sản phẩm vẫn tương thích với nhau.' }
]

const CONTENT = {
  stackLabel: { en: 'Stack', vi: 'Stack' },
  contextH: { en: 'Context', vi: 'Bối cảnh' },
  context: {
    en: 'A global online community platform for brands, community builders, admins, and creators. The product\'s stated mission is to be the first global community platform that proactively detects and prevents harmful content. Its differentiator is Hubshield AI - proprietary moderation across text, image, video, audio, OCR, and GIF, in 30+ languages.',
    vi: 'Hubly là nền tảng cộng đồng trực tuyến cho thương hiệu, người xây cộng đồng, quản trị viên và creator. Điểm nổi bật là Hubshield AI, hệ thống chủ động phát hiện và ngăn chặn nội dung độc hại trên text, ảnh, video, audio, OCR và GIF, hỗ trợ hơn 30 ngôn ngữ.'
  },
  roleH: { en: 'Role', vi: 'Vai trò' },
  role: { en: 'Senior Fullstack Engineer', vi: 'Senior Fullstack Engineer' },
  ownershipH: { en: 'My Contribution / Ownership', vi: 'Phần tôi trực tiếp phụ trách' },
  useCasesH: { en: 'Highlighted Use Cases', vi: 'Use case nổi bật' },
  challengesH: { en: 'Challenges', vi: 'Thử thách' },
  systemScaleH: { en: 'System Scale', vi: 'Quy mô hệ thống' },
  myImpactH: { en: 'My Impact', vi: 'Tác động từ phần tôi phụ trách' }
}

export default function HublyProject() {
  const { lang } = useLanguage()

  return (
    <ProjectShell slug="hubly">
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
