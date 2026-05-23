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

const CHALLENGES = [
  { en: 'Realtime, low-latency requirements - the user expects a light switch to feel like a light switch', vi: 'Yêu cầu realtime, độ trễ thấp - người dùng mong công tắc đèn cảm giác đúng là công tắc đèn' },
  { en: 'Bursty message load in peak household-activity windows (think 7am and 6pm)', vi: 'Tải message tăng đột biến vào khung giờ sinh hoạt cao điểm (kiểu 7h sáng và 6h chiều)' },
  { en: 'A long tail of third-party hardware, each speaking a slightly different dialect', vi: 'Phần cứng bên thứ ba thì nhiều và đa dạng, mỗi bên nói một phương ngữ hơi khác' },
  { en: 'Safety-critical surface area - fire alarms, door locks, gas leak detectors. No room for "eventually consistent" here.', vi: 'Phạm vi an toàn quan trọng - báo cháy, khoá cửa, cảm biến rò khí. Ở đây không có chỗ cho "eventually consistent".' }
]

const METRICS_TABLE = [
  { metric: 'Device connections', baseline: '500K', peak: '500K', plan: '1.5M (3× headroom)' },
  { metric: 'MQTT msg/s', baseline: '42K', peak: '112K', plan: '300K (2.7× peak)' },
  { metric: 'Bandwidth', baseline: '8.4 MB/s', peak: '100 MB/s (with camera)', plan: '2 Gbps' },
  { metric: 'Storage growth', baseline: '1.9 TB/day', peak: '~same', plan: '20 TB total (with tiering)' },
  { metric: 'API req/s', baseline: '100', peak: '500', plan: '2000 (4× peak)' },
  { metric: 'WebSocket concurrent', baseline: '18K', peak: '30K', plan: '100K' },
  { metric: 'Kafka throughput', baseline: '42K msg/s', peak: '112K msg/s', plan: '500K msg/s (4×)' },
  { metric: 'DB writes/s (post-filter)', baseline: '4K', peak: '12K', plan: '50K' }
]

const ECOSYSTEM = [
  { en: 'Live deployments include 90 Lang Street and Royal Da Nang', vi: 'Triển khai thực tế tại 90 Láng và Royal Đà Nẵng' },
  { en: '500,000+ devices operating 24/7', vi: '500,000+ thiết bị hoạt động 24/7' },
  { en: '10,000+ end users', vi: '10,000+ người dùng cuối' },
  { en: 'Vendor integrations - Tuya, Legrand, Schneider Electric, Panasonic, Rang Dong', vi: 'Tích hợp vendor - Tuya, Legrand, Schneider Electric, Panasonic, Rạng Đông' }
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
  useCasesH: { en: 'Highlighted Use Cases', vi: 'Use case nổi bật' },
  challengesH: { en: 'Challenges', vi: 'Thử thách' },
  metricsH: { en: 'Capacity Profile', vi: 'Hồ sơ tải' },
  ecosystemH: { en: 'Deployments & Ecosystem', vi: 'Triển khai & Hệ sinh thái' },
  linksH: { en: 'Product Links', vi: 'Link sản phẩm' },
  thMetric: { en: 'Metric', vi: 'Chỉ số' },
  thBaseline: { en: 'Baseline', vi: 'Baseline' },
  thPeak: { en: 'Peak', vi: 'Peak' },
  thPlan: { en: 'Capacity Plan', vi: 'Capacity Plan' }
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
          <div className="metrics-table-wrap">
            <table className="metrics-table">
              <thead>
                <tr>
                  <th>{tr(CONTENT.thMetric, lang)}</th>
                  <th>{tr(CONTENT.thBaseline, lang)}</th>
                  <th>{tr(CONTENT.thPeak, lang)}</th>
                  <th>{tr(CONTENT.thPlan, lang)}</th>
                </tr>
              </thead>
              <tbody>
                {METRICS_TABLE.map((row, i) => (
                  <tr key={i}>
                    <td>{row.metric}</td>
                    <td>{row.baseline}</td>
                    <td>{row.peak}</td>
                    <td>{row.plan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="trend-recs">
          <h2>{tr(CONTENT.ecosystemH, lang)}</h2>
          <ol>
            {ECOSYSTEM.map((r, i) => (
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
