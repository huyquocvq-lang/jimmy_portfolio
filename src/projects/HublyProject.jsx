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
  { en: 'Hubchat - encrypted messaging with video and conference calls', vi: 'Hubchat - nhắn tin mã hoá kèm video và conference call' },
  { en: 'ID Hub - KYC via passport, national ID, or driver\'s license', vi: 'ID Hub - KYC qua passport, CCCD hoặc GPLX' },
  { en: 'DotAds - internal ads platform with revenue share for creators', vi: 'DotAds - nền tảng ads nội bộ, chia sẻ doanh thu cho creator' },
  { en: 'Hubpoints rewards, Hubstream livestream, Multihub, and ACA (auto content aggregator)', vi: 'Hubpoints (reward), Hubstream (livestream), Multihub và ACA (auto content aggregator)' },
  { en: 'Hub Packs by market segment, plus CRM hooks into Google / Microsoft / Apple Calendar, HubSpot, Salesforce, and Slack', vi: 'Hub Packs theo phân khúc thị trường, kèm hook CRM cho Google / Microsoft / Apple Calendar, HubSpot, Salesforce và Slack' }
]

const CONTRIBUTIONS = [
  { en: 'Worked across the NestJS / Moleculer backend, Vue / Nuxt web app, and Flutter mobile surface as a senior full-stack engineer.', vi: 'Làm xuyên backend NestJS / Moleculer, web Vue / Nuxt và mobile Flutter ở vai trò senior full-stack engineer.' },
  { en: 'Delivered search, taxonomy, invite, and permissions work across platform modules and production data flows.', vi: 'Triển khai search, taxonomy, invite và permissions qua nhiều module platform và luồng dữ liệu production.' },
  { en: 'Contributed to the Sendbird-to-proprietary-chat migration path while protecting existing production conversations.', vi: 'Tham gia lộ trình migrate từ Sendbird sang chat riêng trong khi bảo vệ các cuộc hội thoại production hiện có.' },
  { en: 'Integrated and maintained external platform services including Algolia, messaging, moderation, and realtime dependencies.', vi: 'Tích hợp và duy trì các service ngoài của platform gồm Algolia, messaging, moderation và các dependency realtime.' }
]

const CHALLENGES = [
  { en: 'Broad surface area - community, moderation, commerce, ads, rewards, and livestream on one platform', vi: 'Phạm vi rộng - community, moderation, commerce, ads, reward và livestream trên cùng một platform' },
  { en: 'Heavy reliance on external services (AWS, OpenAI, Algolia, Hive, Bodyguard, Tisane, YOTI, Sendbird, Pusher) - each one is its own failure mode', vi: 'Phụ thuộc nhiều service ngoài (AWS, OpenAI, Algolia, Hive, Bodyguard, Tisane, YOTI, Sendbird, Pusher) - mỗi cái là một kiểu failure mode riêng' },
  { en: 'Migrating from Sendbird to a proprietary chat without breaking live conversations', vi: 'Migrate từ Sendbird sang chat độc quyền mà không làm gãy các cuộc hội thoại đang sống' },
  { en: 'Legacy Vue 2 + Nuxt 2 frontend that needs a credible Vue 3 migration plan, not just intent', vi: 'Frontend legacy Vue 2 + Nuxt 2 cần một kế hoạch migrate Vue 3 đáng tin cậy, không phải chỉ nói mồm' }
]

const SYSTEM_SCALE = [
  { en: 'Global community platform spanning community, chat, KYC, ads, rewards, livestream, and moderation.', vi: 'Platform community toàn cầu gồm community, chat, KYC, ads, reward, livestream và moderation.' },
  { en: 'Hubshield moderation covers text, image, video, audio, OCR, and GIF across 30+ languages.', vi: 'Hubshield moderation bao phủ text, ảnh, video, audio, OCR và GIF trên 30+ ngôn ngữ.' },
  { en: 'Multiple external dependencies across search, messaging, identity, AI moderation, and realtime delivery.', vi: 'Nhiều dependency ngoài cho search, messaging, identity, AI moderation và realtime delivery.' }
]

const MY_IMPACT = [
  { en: 'Delivered search, taxonomy, invite, and permissions work that improved discoverability and access-control behavior across the product.', vi: 'Triển khai search, taxonomy, invite và permissions, cải thiện khả năng tìm kiếm và access control trên sản phẩm.' },
  { en: 'Helped de-risk the Sendbird migration by working on the path toward proprietary chat without treating live conversations as disposable state.', vi: 'Góp phần giảm rủi ro migration khỏi Sendbird bằng cách xây lộ trình sang chat riêng mà không coi conversation đang hoạt động là state có thể bỏ.' },
  { en: 'Worked across backend, web, and mobile boundaries so platform changes remained compatible across product surfaces.', vi: 'Làm việc xuyên backend, web và mobile để thay đổi platform vẫn tương thích giữa các bề mặt sản phẩm.' }
]

const CONTENT = {
  stackLabel: { en: 'Stack', vi: 'Stack' },
  contextH: { en: 'Context', vi: 'Bối cảnh' },
  context: {
    en: 'A global online community platform for brands, community builders, admins, and creators. The product\'s stated mission is to be the first global community platform that proactively detects and prevents harmful content. Its differentiator is Hubshield AI - proprietary moderation across text, image, video, audio, OCR, and GIF, in 30+ languages.',
    vi: 'Nền tảng community trực tuyến toàn cầu cho brand, community builder, admin và creator. Sản phẩm đặt mục tiêu trở thành nền tảng community toàn cầu đầu tiên chủ động phát hiện và ngăn chặn nội dung độc hại. Điểm khác biệt là Hubshield AI - moderation độc quyền cho text, ảnh, video, audio, OCR và GIF, trong 30+ ngôn ngữ.'
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
