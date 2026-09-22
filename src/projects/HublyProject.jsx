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
  { en: 'Community templates for Business, Education, Sports, Charity, Public Sector, Personal, and Family use cases, with different onboarding, roles, visibility rules, and moderation needs behind the same product surface.', vi: 'Community template cho Business, Education, Sports, Charity, Public Sector, Personal và Family, mỗi nhóm có onboarding, vai trò, visibility rule và nhu cầu moderation khác nhau nhưng vẫn chạy trên cùng một product surface.' },
  { en: 'Hubchat with encrypted one-to-one and group messaging, video calls, conference calls, realtime delivery, and the migration path from Sendbird toward an in-house chat stack.', vi: 'Hubchat hỗ trợ nhắn tin mã hoá một-một và nhóm, gọi video, conference call, realtime delivery và lộ trình chuyển từ Sendbird sang hệ thống chat riêng.' },
  { en: 'ID Hub for KYC using passport, national ID, or driver\'s license flows, connected to identity providers so high-trust communities can verify members before sensitive actions.', vi: 'ID Hub xử lý KYC bằng passport, CCCD hoặc GPLX, kết nối với identity provider để các community cần độ tin cậy cao có thể xác minh thành viên trước những thao tác nhạy cảm.' },
  { en: 'DotAds for internal advertising and creator revenue share: campaign placement, audience targeting, creator-side earning logic, and reporting tied back to communities.', vi: 'DotAds cho quảng cáo nội bộ và chia sẻ doanh thu với creator: vị trí campaign, targeting theo audience, logic earning phía creator và báo cáo gắn lại với từng community.' },
  { en: 'Hubpoints, Hubstream, Multihub, and ACA (auto content aggregator), giving communities a way to reward activity, run livestream events, operate several hubs, and aggregate content automatically.', vi: 'Hubpoints, Hubstream, Multihub và ACA (auto content aggregator) giúp community thưởng hoạt động, tổ chức livestream, vận hành nhiều hub và tự động gom nội dung.' },
  { en: 'Hub Packs and CRM hooks into Google / Microsoft / Apple Calendar, HubSpot, Salesforce, and Slack, so the platform can adapt to segment-specific operations instead of staying as a generic social feed.', vi: 'Hub Packs và CRM hook với Google / Microsoft / Apple Calendar, HubSpot, Salesforce và Slack giúp platform phục vụ vận hành theo từng phân khúc, thay vì chỉ là một social feed chung chung.' }
]

const CONTRIBUTIONS = [
  { en: 'Worked across the NestJS / Moleculer backend, Vue 2 / Nuxt 2 web app, and Flutter mobile app as a senior full-stack engineer, keeping API contracts and user flows aligned across all three surfaces.', vi: 'Làm trên cả backend NestJS / Moleculer, web Vue 2 / Nuxt 2 và app Flutter ở vai trò Senior Full-stack Engineer, đảm bảo contract API và luồng người dùng khớp nhau giữa các surface.' },
  { en: 'Built and maintained community discovery flows: Algolia-backed search, taxonomy, category mapping, invite flows, and permission checks used by community owners and members.', vi: 'Xây và duy trì các luồng discovery cho community: search qua Algolia, taxonomy, mapping category, luồng invite và kiểm tra phân quyền cho owner và member.' },
  { en: 'Contributed to the Sendbird-to-proprietary-chat migration by working on compatibility paths, data transition concerns, and production behavior where existing conversations could not be treated as disposable state.', vi: 'Tham gia migration từ Sendbird sang chat riêng bằng cách xử lý compatibility path, bài toán chuyển dữ liệu và hành vi production khi các cuộc hội thoại hiện hữu không thể bị xem như dữ liệu có thể bỏ đi.' },
  { en: 'Integrated platform dependencies around search, realtime messaging, moderation, identity verification, background jobs, and queues, including Redis / Bull job handling and third-party failure behavior.', vi: 'Tích hợp các dependency cho search, realtime messaging, moderation, xác minh danh tính, background job và queue, gồm Redis / Bull và cách hệ thống phản ứng khi dịch vụ ngoài lỗi.' },
  { en: 'Worked on admin and creator-facing workflows where role, invite, moderation status, and content state had to stay consistent between backend services, web dashboards, and the mobile client.', vi: 'Làm các workflow cho admin và creator, trong đó role, invite, moderation status và trạng thái nội dung phải nhất quán giữa backend service, web dashboard và mobile client.' }
]

const CHALLENGES = [
  { en: 'The platform surface is unusually broad: community setup, moderation, chat, KYC, ads, rewards, livestream, content aggregation, CRM hooks, and mobile/web parity all affect the same user account and permission model.', vi: 'Phạm vi platform rất rộng: tạo community, moderation, chat, KYC, quảng cáo, reward, livestream, content aggregation, CRM hook và parity giữa mobile/web đều đụng tới cùng user account và mô hình phân quyền.' },
  { en: 'Hubshield depends on several AI and moderation providers. Text, image, video, audio, OCR, and GIF checks have different latency, confidence, retry, and fallback behavior, so moderation cannot be handled like a single API call.', vi: 'Hubshield phụ thuộc vào nhiều provider AI và moderation. Text, ảnh, video, audio, OCR và GIF có latency, confidence, retry và fallback khác nhau, nên moderation không thể xử lý như một API call đơn giản.' },
  { en: 'Migrating away from Sendbird meant preserving live conversation behavior while gradually introducing proprietary chat capabilities, data ownership, and internal control over realtime messaging.', vi: 'Rời Sendbird đồng nghĩa phải giữ hành vi chat đang chạy ổn định, đồng thời từng bước đưa vào khả năng chat riêng, quyền sở hữu dữ liệu và kiểm soát realtime messaging trong nội bộ.' },
  { en: 'Vue 2 + Nuxt 2 created a frontend modernization problem: new features still had to ship, while the team needed a practical Vue 3 path that did not freeze product delivery.', vi: 'Vue 2 + Nuxt 2 tạo ra bài toán hiện đại hoá frontend: vẫn phải ship feature mới, nhưng cần một lộ trình Vue 3 thực tế không làm đóng băng delivery.' },
  { en: 'External-service heavy architecture required defensive integration work around AWS, OpenAI, Algolia, Hive, Bodyguard, Tisane, YOTI, Sendbird, and Pusher, each with separate limits and incident patterns.', vi: 'Kiến trúc phụ thuộc nhiều dịch vụ ngoài nên cần defensive integration quanh AWS, OpenAI, Algolia, Hive, Bodyguard, Tisane, YOTI, Sendbird và Pusher; mỗi dịch vụ có limit và kiểu sự cố riêng.' }
]

const SYSTEM_SCALE = [
  { en: 'Global community product covering communities, chat, KYC, ads, creator rewards, livestream, content aggregation, CRM integrations, and AI moderation.', vi: 'Sản phẩm community toàn cầu bao gồm community, chat, KYC, ads, creator reward, livestream, content aggregation, CRM integration và AI moderation.' },
  { en: 'Hubshield moderation covers text, image, video, audio, OCR, and GIF across 30+ languages, combining proprietary logic with providers such as OpenAI, AWS Rekognition, Hive, Bodyguard, and Tisane.', vi: 'Hubshield moderation bao phủ text, ảnh, video, audio, OCR và GIF trên 30+ ngôn ngữ, kết hợp logic riêng với các provider như OpenAI, AWS Rekognition, Hive, Bodyguard và Tisane.' },
  { en: 'Multi-client delivery across Vue 2 / Nuxt 2 web, Flutter mobile, NestJS / Moleculer services, MongoDB / Redis data paths, queues, realtime events, and third-party SaaS integrations.', vi: 'Delivery đa client gồm web Vue 2 / Nuxt 2, mobile Flutter, service NestJS / Moleculer, data path MongoDB / Redis, queue, realtime event và tích hợp SaaS bên ngoài.' },
  { en: 'Seven community categories and several monetization / engagement modules run on the same platform model, so role checks, moderation state, content visibility, and notifications must remain consistent.', vi: 'Bảy nhóm community cùng nhiều module monetization / engagement chạy trên cùng một mô hình platform, nên role check, moderation state, visibility nội dung và notification phải nhất quán.' }
]

const PRODUCT_FEATURES = [
  { title: 'Community types', text: { en: 'Reusable setup patterns for business, education, sports, charity, public-sector, personal, and family communities.', vi: 'Các pattern thiết lập lại được cho community doanh nghiệp, giáo dục, thể thao, thiện nguyện, khu vực công, cá nhân và gia đình.' } },
  { title: 'Hubshield AI', text: { en: 'Multi-modal moderation for text, image, video, audio, OCR, and GIF, with provider orchestration across 30+ languages.', vi: 'Moderation đa loại nội dung cho text, ảnh, video, audio, OCR và GIF, điều phối nhiều provider trên 30+ ngôn ngữ.' } },
  { title: 'Hubchat', text: { en: 'Realtime messaging, calls, and conferencing, with a long-term path from Sendbird to a proprietary chat system.', vi: 'Messaging realtime, call và conference, với lộ trình dài hạn từ Sendbird sang hệ thống chat riêng.' } },
  { title: 'ID Hub', text: { en: 'Identity verification through passport, national ID, and driver-license flows for higher-trust communities.', vi: 'Xác minh danh tính qua passport, CCCD và GPLX cho các community cần độ tin cậy cao.' } },
  { title: 'DotAds', text: { en: 'Internal ads and creator revenue-share workflows tied to community audiences and campaign placements.', vi: 'Quảng cáo nội bộ và workflow chia sẻ doanh thu với creator, gắn với audience và vị trí campaign trong community.' } },
  { title: 'Engagement modules', text: { en: 'Hubpoints, Hubstream, Multihub, and ACA for rewards, livestream events, multi-hub operations, and content aggregation.', vi: 'Hubpoints, Hubstream, Multihub và ACA cho reward, livestream, vận hành nhiều hub và tự động gom nội dung.' } }
]

const ARCH_LAYERS = [
  { title: 'Clients', tech: ['Vue 2', 'Nuxt 2', 'Flutter'], note: { en: 'Web dashboards and mobile flows share account, community, invite, moderation, and chat APIs.', vi: 'Web dashboard và mobile dùng chung API cho account, community, invite, moderation và chat.' } },
  { title: 'Backend services', tech: ['NestJS', 'Moleculer', 'Node.js', 'PHP'], note: { en: 'Domain services handle communities, users, permissions, content, campaigns, rewards, and integrations.', vi: 'Các domain service xử lý community, user, permission, content, campaign, reward và integration.' } },
  { title: 'Data & jobs', tech: ['MongoDB', 'Prisma', 'Redis', 'Bull'], note: { en: 'Document data, relational access paths, cache, queues, retries, and background workflows support async product behavior.', vi: 'Document data, relational access path, cache, queue, retry và background workflow phục vụ các hành vi async của sản phẩm.' } },
  { title: 'Search & discovery', tech: ['Algolia', 'Taxonomy'], note: { en: 'Search, category mapping, and discovery logic make large community and content surfaces navigable.', vi: 'Search, mapping category và logic discovery giúp người dùng tìm được community và nội dung trong bề mặt sản phẩm lớn.' } },
  { title: 'Moderation', tech: ['OpenAI', 'AWS Rekognition', 'Hive', 'Bodyguard', 'Tisane'], note: { en: 'Provider orchestration powers Hubshield checks across media types and languages.', vi: 'Điều phối provider cho Hubshield kiểm tra nhiều loại media và nhiều ngôn ngữ.' } },
  { title: 'Realtime & chat', tech: ['Pusher', 'Sendbird'], note: { en: 'Realtime events and legacy chat infrastructure were maintained while proprietary chat capabilities were introduced.', vi: 'Realtime event và hạ tầng chat cũ được duy trì trong lúc đưa dần khả năng chat riêng vào hệ thống.' } }
]

const FLOWS = [
  {
    title: { en: 'Moderation path', vi: 'Luồng moderation' },
    steps: ['Content event', 'Media classifier', 'Provider checks', 'Hubshield decision', 'User / admin action']
  },
  {
    title: { en: 'Community discovery path', vi: 'Luồng discovery community' },
    steps: ['Community data', 'Taxonomy', 'Algolia index', 'Search / filters', 'Invite or join flow']
  },
  {
    title: { en: 'Chat migration path', vi: 'Luồng migration chat' },
    steps: ['Existing Sendbird state', 'Compatibility layer', 'Internal APIs', 'Realtime events', 'Proprietary chat']
  }
]

const CONTENT = {
  stackLabel: { en: 'Stack', vi: 'Stack' },
  contextH: { en: 'Context', vi: 'Bối cảnh' },
  context: [
    {
      en: 'Hubly is a global online community platform for brands, community builders, admins, creators, and members. It is not only a social feed: the product combines community setup, member onboarding, chat, KYC, ads, rewards, livestream, automated content aggregation, and CRM-style integrations.',
      vi: 'Hubly là nền tảng community trực tuyến toàn cầu cho brand, người xây community, admin, creator và member. Sản phẩm không chỉ là social feed: nó kết hợp tạo community, onboarding thành viên, chat, KYC, quảng cáo, reward, livestream, tự động gom nội dung và các tích hợp kiểu CRM.'
    },
    {
      en: 'The product differentiator is Hubshield AI, a proprietary moderation layer that proactively detects harmful content across text, image, video, audio, OCR, and GIF in more than 30 languages. Under the hood it combines internal rules with external AI / moderation providers, then feeds those decisions back into user, content, and admin workflows.',
      vi: 'Điểm khác biệt chính là Hubshield AI, lớp moderation riêng giúp phát hiện chủ động nội dung độc hại trên text, ảnh, video, audio, OCR và GIF bằng hơn 30 ngôn ngữ. Bên dưới, hệ thống kết hợp rule nội bộ với các provider AI / moderation bên ngoài, sau đó đưa kết quả về lại workflow của user, content và admin.'
    },
    {
      en: 'The engineering environment was full-stack and multi-client: NestJS / Moleculer services, MongoDB / Redis / Bull data and job paths, Vue 2 + Nuxt 2 for web, Flutter for mobile, plus realtime and SaaS integrations such as Algolia, Pusher, Sendbird, identity verification, calendar tools, HubSpot, Salesforce, and Slack.',
      vi: 'Môi trường kỹ thuật là full-stack và multi-client: service NestJS / Moleculer, data và job path với MongoDB / Redis / Bull, web Vue 2 + Nuxt 2, mobile Flutter, cùng realtime và SaaS integration như Algolia, Pusher, Sendbird, xác minh danh tính, calendar, HubSpot, Salesforce và Slack.'
    }
  ],
  roleH: { en: 'Role', vi: 'Vai trò' },
  role: { en: 'Senior Fullstack Engineer', vi: 'Senior Fullstack Engineer' },
  roleMeta: {
    en: 'Backend, web, and mobile delivery · search / taxonomy / invite / permissions · Sendbird migration support',
    vi: 'Backend, web và mobile delivery · search / taxonomy / invite / permission · hỗ trợ migration khỏi Sendbird'
  },
  ownershipH: { en: 'My Contribution / Ownership', vi: 'Phần tôi trực tiếp phụ trách' },
  useCasesH: { en: 'Highlighted Use Cases', vi: 'Use case nổi bật' },
  challengesH: { en: 'Challenges', vi: 'Thử thách' },
  systemScaleH: { en: 'System Scale', vi: 'Quy mô hệ thống' },
  productDetailsH: { en: 'Product Details', vi: 'Chi tiết sản phẩm' },
  productH: { en: 'The product', vi: 'Sản phẩm' },
  underHoodH: { en: 'Under the hood', vi: 'Bên trong hệ thống' }
}

export default function HublyProject() {
  const { lang } = useLanguage()

  return (
    <ProjectShell slug="hubly">
      <article className="trend">
        <header className="project-intro project-intro--trend">
          <span className="project-intro__eyebrow">{tr(meta.type, lang)}</span>
          <h1>{tr(meta.title, lang)}</h1>
          <div className="hb-role">
            <span className="hb-role__label">{tr(CONTENT.roleH, lang)}</span>
            <strong className="hb-role__title">{tr(CONTENT.role, lang)}</strong>
            <span className="hb-role__meta">{tr(CONTENT.roleMeta, lang)}</span>
          </div>
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

        <section className="trend-narrative hb-narrative">
          <div className="trend-col">
            <h2>{tr(CONTENT.contextH, lang)}</h2>
            {CONTENT.context.map((paragraph, i) => (
              <p key={i}>{tr(paragraph, lang)}</p>
            ))}
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

        <section className="trend-recs hb-details">
          <h2>{tr(CONTENT.productDetailsH, lang)}</h2>
          <h3>{tr(CONTENT.productH, lang)}</h3>
          <div className="hb-feature-grid">
            {PRODUCT_FEATURES.map((feature) => (
              <article key={feature.title} className="hb-feature">
                <strong>{feature.title}</strong>
                <p>{tr(feature.text, lang)}</p>
              </article>
            ))}
          </div>

          <h3>{tr(CONTENT.underHoodH, lang)}</h3>
          <div className="hb-arch">
            {ARCH_LAYERS.map((layer) => (
              <article key={layer.title} className="hb-arch__row">
                <div>
                  <strong>{layer.title}</strong>
                  <p>{tr(layer.note, lang)}</p>
                </div>
                <div className="trend-chips">
                  {layer.tech.map((tech) => (
                    <span key={tech} className="trend-chip trend-chip--sm">{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="hb-flow-grid">
            {FLOWS.map((flow) => (
              <article key={tr(flow.title, lang)} className="hb-flow">
                <strong>{tr(flow.title, lang)}</strong>
                <div>
                  {flow.steps.map((step, i) => (
                    <span key={step}>{step}{i < flow.steps.length - 1 ? ' →' : ''}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <p className="trend-impact">{tr(meta.impact, lang)}</p>
      </article>
    </ProjectShell>
  )
}
