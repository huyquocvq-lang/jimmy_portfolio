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
  { en: 'Cloud-managed gateway - remote control, remote diagnostics, and feature add-ons pushed to building operators', vi: 'Gateway được quản lý từ cloud, hỗ trợ điều khiển và chẩn đoán từ xa, đồng thời có thể cập nhật thêm tính năng cho phía vận hành' },
  { en: 'Cross-vendor Zigbee device integration on a single firmware', vi: 'Tích hợp thiết bị Zigbee đa hãng trên cùng một firmware' },
  { en: 'Automatic firmware OTA updates - staged, signed, and reversible', vi: 'Cập nhật firmware OTA theo từng đợt, có ký số và có thể quay lại phiên bản trước khi cần' }
]

const CONTRIBUTIONS = [
  { en: 'Built and maintained the Node.js / Zigbee2MQTT gateway runtime on Debian-based Rockchip hardware.', vi: 'Xây dựng và bảo trì runtime gateway Node.js / Zigbee2MQTT trên phần cứng Rockchip chạy Debian.' },
  { en: 'Integrated cross-vendor Zigbee devices behind one gateway abstraction for local control and cloud management.', vi: 'Tích hợp thiết bị Zigbee từ nhiều hãng qua một lớp gateway chung, phục vụ cả điều khiển cục bộ và quản lý từ cloud.' },
  { en: 'Implemented remote diagnostics and OTA update flows designed for constrained embedded hardware.', vi: 'Triển khai chẩn đoán từ xa và luồng OTA phù hợp với phần cứng nhúng tài nguyên hạn chế.' },
  { en: 'Designed for offline-tolerant operation so local automation and device control continue through cloud outages.', vi: 'Thiết kế để các automation và chức năng điều khiển tại chỗ vẫn hoạt động khi mất kết nối cloud.' }
]

const CHALLENGES = [
  { en: 'Constrained embedded hardware - tight CPU, memory, and storage budgets', vi: 'Phần cứng nhúng có tài nguyên hạn chế về CPU, RAM và dung lượng lưu trữ' },
  { en: 'Stack runs on a Rockchip embedded computer with Debian, not a clean cloud VM', vi: 'Toàn bộ stack chạy trên thiết bị nhúng Rockchip với Debian, nên việc vận hành và tối ưu khác nhiều so với một VM trên cloud' },
  { en: 'Low-latency response requirements between local commands and physical devices', vi: 'Yêu cầu độ trễ thấp giữa lệnh ở nhà và thiết bị vật lý' },
  { en: 'Must keep working when the cloud uplink is offline - the building cannot stop functioning', vi: 'Phải hoạt động ngay cả khi mất kết nối cloud - toà nhà không thể ngừng hoạt động' }
]

const SYSTEM_SCALE = [
  { en: '10,000+ gateways deployed nationwide', vi: '10,000+ gateway triển khai toàn quốc' },
  { en: 'Data integrity and session continuity held through cloud outages', vi: 'Dữ liệu và các phiên đang chạy vẫn được giữ ổn định khi mất kết nối cloud' }
]

const MY_IMPACT = [
  { en: 'Helped make one gateway runtime support heterogeneous Zigbee devices instead of maintaining vendor-specific gateway builds.', vi: 'Giúp một runtime gateway có thể hỗ trợ thiết bị Zigbee từ nhiều hãng, thay vì phải duy trì bản build riêng cho từng vendor.' },
  { en: 'Improved operational resilience through remote diagnostics, OTA flows, and local-first behavior on constrained hardware.', vi: 'Cải thiện khả năng vận hành nhờ chẩn đoán từ xa, cập nhật OTA và ưu tiên xử lý cục bộ trên phần cứng hạn chế tài nguyên.' },
  { en: 'Kept core local automation usable during cloud outages by separating device control from cloud availability.', vi: 'Tách điều khiển thiết bị khỏi kết nối cloud để các automation cốt lõi vẫn hoạt động khi đường truyền bị gián đoạn.' }
]

const CONTENT = {
  stackLabel: { en: 'Stack', vi: 'Stack' },
  contextH: { en: 'Context', vi: 'Bối cảnh' },
  context: {
    en: 'The platform integrates Zigbee devices from many different vendors. The team built custom gateway firmware on top of Zigbee2MQTT, running on a Rockchip-based embedded board with Debian - bridging local devices to a private cloud for remote control and OTA upgrades, while staying functional if that uplink ever goes dark.',
    vi: 'Hệ thống cần hỗ trợ thiết bị Zigbee từ nhiều hãng trên cùng một gateway. Team xây firmware dựa trên Zigbee2MQTT, chạy trên board Rockchip với Debian, kết nối thiết bị tại chỗ với cloud riêng để quản lý từ xa và cập nhật OTA. Các chức năng cục bộ vẫn phải chạy ngay cả khi mất kết nối cloud.'
  },
  roleH: { en: 'Role', vi: 'Vai trò' },
  role: { en: 'Backend / Embedded Developer · DevOps', vi: 'Backend / Embedded Developer · DevOps' },
  ownershipH: { en: 'My Contribution / Ownership', vi: 'Phần tôi trực tiếp phụ trách' },
  useCasesH: { en: 'Highlighted Use Cases', vi: 'Use case nổi bật' },
  challengesH: { en: 'Challenges', vi: 'Thử thách' },
  systemScaleH: { en: 'System Scale', vi: 'Quy mô hệ thống' },
  myImpactH: { en: 'My Impact', vi: 'Tác động từ phần tôi phụ trách' }
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
