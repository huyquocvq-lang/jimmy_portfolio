import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import '../styles/projects/zigbee-gateway-firmware.css'

const meta = getProjectCard('zigbee-gateway-firmware')

const STACK = [
  'Node.js', 'Zigbee2MQTT', 'Linux kernel processes', 'MQTT', 'Debian', 'Rockchip', 'OTA tooling'
]

const USE_CASES = [
  { en: 'Cloud-managed gateway - remote control, remote diagnostics, and feature add-ons pushed to building operators', vi: 'Gateway quản lý từ cloud - điều khiển từ xa, chẩn đoán từ xa và bổ sung tính năng đẩy xuống cho ban quản lý' },
  { en: 'Cross-vendor Zigbee device integration on a single firmware', vi: 'Tích hợp thiết bị Zigbee đa hãng trên cùng một firmware' },
  { en: 'Automatic firmware OTA updates - staged, signed, and reversible', vi: 'Cập nhật firmware OTA tự động - staged, có ký số và có thể rollback' }
]

const CHALLENGES = [
  { en: 'Constrained embedded hardware - tight CPU, memory, and storage budgets', vi: 'Phần cứng nhúng tài nguyên hạn chế - ngân sách CPU, RAM và storage đều chặt' },
  { en: 'Stack runs on a Rockchip embedded computer with Debian, not a clean cloud VM', vi: 'Stack chạy trên máy nhúng Rockchip với Debian, không phải VM cloud sạch sẽ' },
  { en: 'Low-latency response requirements between local commands and physical devices', vi: 'Yêu cầu độ trễ thấp giữa lệnh ở nhà và thiết bị vật lý' },
  { en: 'Must keep working when the cloud uplink is offline - the building cannot stop functioning', vi: 'Phải hoạt động ngay cả khi mất kết nối cloud - toà nhà không thể ngừng hoạt động' }
]

const METRICS = [
  { en: '10,000+ gateways deployed nationwide', vi: '10,000+ gateway triển khai toàn quốc' },
  { en: 'Data integrity and session continuity held through cloud outages', vi: 'Toàn vẹn dữ liệu và phiên người dùng được giữ qua các đợt mất cloud' }
]

const CONTENT = {
  stackLabel: { en: 'Stack', vi: 'Stack' },
  contextH: { en: 'Context', vi: 'Bối cảnh' },
  context: {
    en: 'The platform integrates Zigbee devices from many different vendors. The team built custom gateway firmware on top of Zigbee2MQTT, running on a Rockchip-based embedded board with Debian - bridging local devices to a private cloud for remote control and OTA upgrades, while staying functional if that uplink ever goes dark.',
    vi: 'Hệ thống tích hợp thiết bị Zigbee từ nhiều hãng. Team xây firmware gateway tuỳ chỉnh trên nền Zigbee2MQTT, chạy trên board nhúng Rockchip với Debian - kết nối thiết bị local lên cloud riêng để điều khiển từ xa và OTA, đồng thời vẫn hoạt động khi đường lên cloud rớt.'
  },
  roleH: { en: 'Role', vi: 'Vai trò' },
  role: { en: 'Backend / Embedded Developer · DevOps', vi: 'Backend / Embedded Developer · DevOps' },
  useCasesH: { en: 'Highlighted Use Cases', vi: 'Use case nổi bật' },
  challengesH: { en: 'Challenges', vi: 'Thử thách' },
  metricsH: { en: 'Metrics', vi: 'Số liệu' }
}

export default function ZigbeeGatewayProject() {
  const { lang } = useLanguage()

  return (
    <ProjectShell slug="zigbee-gateway-firmware">
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
          <ol>
            {METRICS.map((r, i) => (
              <li key={i}>{tr(r, lang)}</li>
            ))}
          </ol>
        </section>

        <p className="trend-impact">{tr(meta.impact, lang)}</p>
      </article>
    </ProjectShell>
  )
}
