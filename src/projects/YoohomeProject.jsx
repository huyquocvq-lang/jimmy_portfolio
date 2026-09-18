import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import '../styles/projects/yoohome.css'

const meta = getProjectCard('yoohome')

const STACK = [
  'NestJS', 'React Native', 'Java Spring', 'MQTT', 'Microservices',
  'Zigbee2MQTT', 'Kafka', 'OpenAI', 'Redis', 'Bull', 'MongoDB'
]

const USE_CASES = [
  { en: 'Role and permission management for building operators', vi: 'Phân quyền cho ban quản lý toà nhà' },
  { en: 'Integration with third-party hardware ecosystems - Zigbee directly, vendor cloud APIs where the hardware insists', vi: 'Tích hợp các hệ phần cứng bên thứ ba - Zigbee trực tiếp, API cloud của vendor ở những chỗ phần cứng bắt buộc' },
  { en: 'Centralized device management for both operations staff and end-user smart-home devices', vi: 'Quản lý thiết bị tập trung cho cả ban vận hành và thiết bị smart-home của người dùng cuối' },
  { en: 'Telemetry and control-data ingestion that feeds an in-app virtual assistant', vi: 'Thu thập telemetry và dữ liệu điều khiển để nuôi trợ lý ảo trong app' }
]

const CONTRIBUTIONS = [
  { en: 'Led full-stack delivery across NestJS services, React Native clients, and the realtime MQTT backbone.', vi: 'Dẫn dắt delivery full-stack qua các service NestJS, client React Native và backbone realtime MQTT.' },
  { en: 'Designed and integrated multi-vendor device flows across Zigbee and vendor cloud APIs such as Tuya, Legrand, and Schneider Electric.', vi: 'Thiết kế và tích hợp luồng thiết bị đa hãng qua Zigbee và các API cloud của vendor như Tuya, Legrand và Schneider Electric.' },
  { en: 'Worked on telemetry, control-data, queueing, and storage paths that support realtime device control at production scale.', vi: 'Làm trực tiếp trên các luồng telemetry, control-data, queue và storage phục vụ điều khiển thiết bị realtime ở quy mô production.' },
  { en: 'Led a 5-10 engineer team through task planning, code review, mentoring, and delivery coordination.', vi: 'Dẫn dắt team 5-10 kỹ sư qua phân việc, code review, mentoring và điều phối delivery.' }
]

const CHALLENGES = [
  { en: 'Realtime, low-latency requirements - the user expects a light switch to feel like a light switch', vi: 'Yêu cầu realtime, độ trễ thấp - người dùng mong công tắc đèn cảm giác đúng là công tắc đèn' },
  { en: 'Bursty message load in peak household-activity windows (think 7am and 6pm)', vi: 'Tải message tăng đột biến vào khung giờ sinh hoạt cao điểm (kiểu 7h sáng và 6h chiều)' },
  { en: 'A long tail of third-party hardware, each speaking a slightly different dialect', vi: 'Phần cứng bên thứ ba thì nhiều và đa dạng, mỗi bên nói một phương ngữ hơi khác' },
  { en: 'Safety-critical surface area - fire alarms, door locks, gas leak detectors. No room for "eventually consistent" here.', vi: 'Phạm vi an toàn quan trọng - báo cháy, khoá cửa, cảm biến rò khí. Ở đây không có chỗ cho "eventually consistent".' }
]

const SYSTEM_SCALE = [
  { en: 'Live deployments include 90 Lang Street and Royal Da Nang', vi: 'Triển khai thực tế tại 90 Láng và Royal Đà Nẵng' },
  { en: '500,000+ devices operating 24/7', vi: '500,000+ thiết bị hoạt động 24/7' },
  { en: '10,000+ end users', vi: '10,000+ người dùng cuối' },
  { en: 'Vendor integrations - Tuya, Legrand, Schneider Electric, Panasonic, Rang Dong', vi: 'Tích hợp vendor - Tuya, Legrand, Schneider Electric, Panasonic, Rạng Đông' }
]

const MY_IMPACT = [
  { en: 'Helped keep realtime control reliable across a mixed device ecosystem by working across MQTT, queues, storage, and client behavior instead of treating them as separate layers.', vi: 'Góp phần giữ điều khiển realtime ổn định trên hệ thiết bị hỗn hợp bằng cách xử lý MQTT, queue, storage và client behavior như một luồng thống nhất thay vì các layer rời rạc.' },
  { en: 'Reduced integration fragmentation by bringing multiple vendor device flows behind shared backend and mobile patterns.', vi: 'Giảm phân mảnh tích hợp bằng cách đưa nhiều luồng thiết bị vendor về các pattern backend và mobile dùng chung.' },
  { en: 'Improved delivery consistency by leading a 5-10 engineer team through code review, mentoring, and implementation coordination.', vi: 'Cải thiện tính nhất quán khi delivery bằng việc dẫn dắt team 5-10 kỹ sư qua code review, mentoring và điều phối triển khai.' }
]

const CONTENT = {
  stackLabel: { en: 'Stack', vi: 'Stack' },
  contextH: { en: 'Context', vi: 'Bối cảnh' },
  context: {
    en: 'An AIoT platform that lets residents control their smart-home devices and gives building operators a centralized management view. The app also doubles as a daily-life virtual assistant - it learns from control and management data over time, so the more it is used, the better it gets at predicting what the household actually wants.',
    vi: 'Một nền tảng AIoT cho phép cư dân điều khiển thiết bị smart-home và cho ban quản lý toà nhà một trung tâm điều hành tập trung. App cũng đóng vai trò trợ lý ảo cho cuộc sống hàng ngày - học dần từ dữ liệu điều khiển và vận hành, càng dùng càng đoán trúng nhu cầu của hộ gia đình.'
  },
  roleH: { en: 'Role', vi: 'Vai trò' },
  role: { en: 'Fullstack Developer · Tech Lead', vi: 'Fullstack Developer · Tech Lead' },
  ownershipH: { en: 'My Contribution / Ownership', vi: 'Phần tôi trực tiếp phụ trách' },
  useCasesH: { en: 'Highlighted Use Cases', vi: 'Use case nổi bật' },
  challengesH: { en: 'Challenges', vi: 'Thử thách' },
  systemScaleH: { en: 'System Scale', vi: 'Quy mô hệ thống' },
  myImpactH: { en: 'My Impact', vi: 'Tác động từ phần tôi phụ trách' },
  linksH: { en: 'Product Links', vi: 'Link sản phẩm' }
}

export default function YoohomeProject() {
  const { lang } = useLanguage()

  return (
    <ProjectShell slug="yoohome">
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

        <section className="trend-recs">
          <h2>{tr(CONTENT.linksH, lang)}</h2>
          <ul className="link-list">
            <li>
              <a href="https://play.google.com/store/apps/details?id=com.yootek.home&hl=vi" target="_blank" rel="noopener noreferrer">
                Google Play - Yoohome
              </a>
            </li>
            <li>
              <a href="https://apps.apple.com/vn/app/yoohome/id6476431240" target="_blank" rel="noopener noreferrer">
                App Store - Yoohome
              </a>
            </li>
          </ul>
        </section>

        <p className="trend-impact">{tr(meta.impact, lang)}</p>
      </article>
    </ProjectShell>
  )
}
