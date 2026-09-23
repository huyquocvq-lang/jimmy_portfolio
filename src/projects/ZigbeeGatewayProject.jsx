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
  { en: 'Vendor integrations on the Zigbee side - Tuya, Schneider Electric, Legrand - plus other Zigbee 3.0 devices already covered by Zigbee2MQTT\'s converter library', vi: 'Tích hợp vendor phía Zigbee - Tuya, Schneider Electric, Legrand - cùng các thiết bị Zigbee 3.0 khác đã có sẵn trong thư viện converter của Zigbee2MQTT' },
  { en: 'Data integrity and session continuity held through cloud outages', vi: 'Dữ liệu và các phiên đang chạy vẫn được giữ ổn định khi mất kết nối cloud' }
]

/* Product details: what the gateway actually does in the apartment */
const PRODUCT_FEATURES = [
  { en: 'Zigbee 3.0 coordinator', vi: 'Coordinator Zigbee 3.0' },
  { en: 'Device pairing', vi: 'Ghép nối thiết bị' },
  { en: 'Cross-vendor device support', vi: 'Hỗ trợ thiết bị đa hãng' },
  { en: 'Local scenes & automation', vi: 'Kịch bản & automation tại chỗ' },
  { en: 'Offline-first control', vi: 'Điều khiển offline-first' },
  { en: 'Private cloud link', vi: 'Kết nối cloud riêng' },
  { en: 'Gateway firmware OTA', vi: 'OTA firmware gateway' },
  { en: 'Zigbee device OTA', vi: 'OTA thiết bị Zigbee' },
  { en: 'Remote diagnostics', vi: 'Chẩn đoán từ xa' },
  { en: 'Health & telemetry reporting', vi: 'Báo cáo tình trạng & telemetry' },
  { en: 'Groups & binding', vi: 'Group & binding' },
  { en: 'Store-and-forward sync', vi: 'Đồng bộ store-and-forward' }
]

/* Product details: architecture layers, top (cloud) to bottom (radio) */
const ARCH_LAYERS = [
  {
    layer: { en: 'Cloud', vi: 'Cloud' },
    tech: ['Yoohome platform', 'Private MQTT broker', 'OTA server'],
    note: { en: 'Remote control, operator console, device registry, and the fleet-wide OTA release channel.', vi: 'Điều khiển từ xa, console vận hành, device registry và kênh phát hành OTA cho cả fleet.' }
  },
  {
    layer: { en: 'Cloud agent', vi: 'Cloud agent' },
    tech: ['Node.js', 'MQTT bridge', 'Per-gateway credentials'],
    note: { en: 'Bridges the local bus to the private broker; queues state while offline and replays it when the uplink returns.', vi: 'Bắc cầu bus cục bộ với broker riêng; xếp hàng trạng thái khi offline và phát lại khi uplink trở lại.' }
  },
  {
    layer: { en: 'Local automation', vi: 'Automation tại chỗ' },
    tech: ['Node.js', 'Scene engine', 'Schedules'],
    note: { en: 'Scenes, schedules, and device-to-device rules evaluated on the gateway - no cloud round-trip.', vi: 'Kịch bản, lịch và rule thiết bị-tới-thiết bị được xử lý ngay trên gateway - không cần vòng qua cloud.' }
  },
  {
    layer: { en: 'Zigbee2MQTT', vi: 'Zigbee2MQTT' },
    tech: ['zigbee-herdsman', 'zigbee-herdsman-converters', 'Custom converters'],
    note: { en: 'Zigbee stack + device definitions, exposed as MQTT topics. Custom converters cover vendor devices upstream did not yet support.', vi: 'Zigbee stack + định nghĩa thiết bị, phơi ra dưới dạng MQTT topic. Converter tuỳ chỉnh bổ sung cho thiết bị mà upstream chưa hỗ trợ.' }
  },
  {
    layer: { en: 'Messaging', vi: 'Messaging' },
    tech: ['Local MQTT broker'],
    note: { en: 'One local bus that Zigbee2MQTT, the automation engine, and the cloud agent all speak - decoupled and easy to inspect.', vi: 'Một bus cục bộ mà Zigbee2MQTT, engine automation và cloud agent đều dùng chung - tách rời và dễ quan sát.' }
  },
  {
    layer: { en: 'Supervision & OTA', vi: 'Giám sát & OTA' },
    tech: ['systemd', 'Watchdog', 'Signed OTA', 'Rollback'],
    note: { en: 'Process lifecycle, crash recovery, staged and signed firmware updates with health-checked rollback.', vi: 'Vòng đời tiến trình, phục hồi khi crash, cập nhật firmware theo đợt có ký số kèm rollback dựa trên health check.' }
  },
  {
    layer: { en: 'OS', vi: 'Hệ điều hành' },
    tech: ['Debian', 'Linux kernel', 'Serial / UART'],
    note: { en: 'Trimmed Debian image, kernel and serial link to the coordinator, log rotation and storage budgets tuned for flash wear.', vi: 'Image Debian rút gọn, kernel và cổng serial tới coordinator, xoay vòng log và dung lượng lưu trữ tinh chỉnh để hạn chế mòn flash.' }
  },
  {
    layer: { en: 'Hardware', vi: 'Phần cứng' },
    tech: ['Rockchip SoC', 'Zigbee coordinator module', 'Ethernet / Wi-Fi'],
    note: { en: 'Low-cost ARM board with a Zigbee 3.0 radio; the uplink is whatever the apartment has.', vi: 'Board ARM giá rẻ với radio Zigbee 3.0; uplink dùng bất cứ đường mạng nào căn hộ có.' }
  }
]

const COMMAND_FLOW = ['App / Cloud', 'Cloud agent', 'Local MQTT', 'Zigbee2MQTT', 'Coordinator', 'Device', 'State report', 'Cloud']
const OFFLINE_FLOW = ['Device event', 'Zigbee2MQTT', 'Local MQTT', 'Automation engine', 'Device']
const OTA_FLOW = ['OTA server', 'Signed manifest', 'Download', 'Verify', 'Stage', 'Swap + reboot', 'Health check', 'Commit / rollback']

const CONTENT = {
  stackLabel: { en: 'Stack', vi: 'Stack' },
  contextH: { en: 'Context', vi: 'Bối cảnh' },
  context: [
    {
      en: 'This gateway is the edge layer of the Yoohome smart-home platform: every apartment gets one, and it is the box every Zigbee switch, sensor, curtain motor and lock in that home actually talks to. The cloud handles remote control, operator management and fleet updates - but a light switch cannot depend on an internet connection, so the gateway has to be a complete local controller in its own right.',
      vi: 'Gateway này là lớp edge của nền tảng smart-home Yoohome: mỗi căn hộ có một chiếc, và đó là thiết bị mà mọi công tắc, cảm biến, động cơ rèm hay khoá Zigbee trong nhà thực sự nói chuyện cùng. Cloud lo phần điều khiển từ xa, quản lý vận hành và cập nhật cả fleet - nhưng một công tắc đèn không thể phụ thuộc vào đường internet, nên gateway phải là một bộ điều khiển cục bộ hoàn chỉnh.'
    },
    {
      en: 'Rather than writing a Zigbee stack from scratch, the firmware is built on Zigbee2MQTT, the open-source Node.js bridge: zigbee-herdsman drives the Zigbee coordinator over a serial link, zigbee-herdsman-converters carries device definitions for thousands of products from Tuya, Schneider Electric, Legrand and many other vendors, and everything is exposed as plain MQTT topics - device state, set / get commands, pairing, groups, binding and end-device OTA. That gave the team broad, well-tested device support on day one, and a stable MQTT contract the rest of the firmware could build against.',
      vi: 'Thay vì viết một Zigbee stack từ đầu, firmware được xây trên Zigbee2MQTT - bridge mã nguồn mở viết bằng Node.js: zigbee-herdsman điều khiển Zigbee coordinator qua cổng serial, zigbee-herdsman-converters chứa định nghĩa cho hàng nghìn thiết bị của Tuya, Schneider Electric, Legrand và nhiều hãng khác, và toàn bộ được phơi ra dưới dạng MQTT topic thuần - trạng thái thiết bị, lệnh set / get, ghép nối, group, binding và OTA cho end device. Nhờ vậy team có ngay nền hỗ trợ thiết bị rộng và đã được kiểm chứng, cùng một MQTT contract ổn định để phần còn lại của firmware xây lên trên.'
    },
    {
      en: 'The custom part is everything around that core: a Node.js supervisor that owns the process lifecycle, a cloud agent that bridges the local MQTT bus to Yoohome\'s private broker with per-gateway credentials, a local scene / automation engine that keeps running when the uplink is gone, custom converters for vendor devices Zigbee2MQTT did not yet know, and the OTA and remote-diagnostics tooling needed to operate a fleet of 10,000+ boxes nobody can walk up to. All of it runs on a Rockchip embedded board with Debian, inside tight CPU, memory and storage budgets.',
      vi: 'Phần tuỳ chỉnh là toàn bộ những gì bao quanh lõi đó: một supervisor Node.js quản lý vòng đời tiến trình, một cloud agent bắc cầu MQTT bus cục bộ với broker riêng của Yoohome bằng credential riêng cho từng gateway, một engine kịch bản / automation tại chỗ vẫn chạy khi mất uplink, các converter tuỳ chỉnh cho thiết bị mà Zigbee2MQTT chưa hỗ trợ, cùng bộ công cụ OTA và chẩn đoán từ xa để vận hành một fleet hơn 10,000 thiết bị mà không ai có thể đến tận nơi. Tất cả chạy trên board nhúng Rockchip với Debian, trong giới hạn CPU, RAM và dung lượng lưu trữ rất chặt.'
    }
  ],
  roleH: { en: 'Role', vi: 'Vai trò' },
  role: { en: 'Backend / Embedded Developer · DevOps', vi: 'Backend / Embedded Developer · DevOps' },
  roleMeta: {
    en: 'Gateway runtime on top of Zigbee2MQTT, cross-vendor device integration, OTA and remote diagnostics · YooTek Holdings · Aug 2021 – Feb 2024',
    vi: 'Runtime gateway trên nền Zigbee2MQTT, tích hợp thiết bị đa hãng, OTA và chẩn đoán từ xa · YooTek Holdings · 08/2021 – 02/2024'
  },
  ownershipH: { en: 'My Contribution / Ownership', vi: 'Phần tôi trực tiếp phụ trách' },
  useCasesH: { en: 'Highlighted Use Cases', vi: 'Use case nổi bật' },
  challengesH: { en: 'Challenges', vi: 'Thử thách' },
  systemScaleH: { en: 'System Scale', vi: 'Quy mô hệ thống' },
  productH: { en: 'Product Details', vi: 'Chi tiết sản phẩm' },
  productSubH: { en: 'The product', vi: 'Sản phẩm' },
  productIntro: {
    en: 'The gateway ships as hardware plus firmware with every Yoohome apartment. Residents never see it - they see lights that respond instantly and scenes that still run when the internet is down. Operators see a fleet they can diagnose and update from one place.',
    vi: 'Gateway được bàn giao dưới dạng phần cứng kèm firmware cùng mỗi căn hộ Yoohome. Cư dân không nhìn thấy nó - họ chỉ thấy đèn phản hồi tức thì và kịch bản vẫn chạy khi mất internet. Ban vận hành thì thấy một fleet có thể chẩn đoán và cập nhật từ một nơi.'
  },
  techSubH: { en: 'Under the hood', vi: 'Kỹ thuật' },
  techIntro: {
    en: 'Layered top to bottom - from Yoohome\'s cloud down to the radio. Zigbee2MQTT is the core; everything else is what turns it into a product that can be shipped, updated and operated at fleet scale.',
    vi: 'Xếp lớp từ trên xuống - từ cloud của Yoohome tới sóng radio. Zigbee2MQTT là phần lõi; những thứ còn lại là phần biến nó thành một sản phẩm có thể bàn giao, cập nhật và vận hành ở quy mô fleet.'
  },
  commandFlowH: { en: 'Remote command path', vi: 'Luồng lệnh từ xa' },
  offlineFlowH: { en: 'Offline path - no cloud in the loop', vi: 'Luồng offline - không cần cloud' },
  otaFlowH: { en: 'Firmware OTA path', vi: 'Luồng OTA firmware' }
}

export default function ZigbeeGatewayProject() {
  const { lang } = useLanguage()

  const renderFlow = (steps) => (
    <div className="zb-flow">
      {steps.map((s, i) => (
        <span key={`${s}-${i}`} className="zb-flow__item">
          <span className="zb-flow__step">{s}</span>
          {i < steps.length - 1 && <span className="zb-flow__arrow" aria-hidden="true">→</span>}
        </span>
      ))}
    </div>
  )

  return (
    <ProjectShell slug="zigbee-gateway-firmware">
      <article className="trend">
        <header className="project-intro project-intro--trend">
          <span className="project-intro__eyebrow">{tr(meta.type, lang)}</span>
          <h1>{tr(meta.title, lang)}</h1>
          <div className="zb-role">
            <span className="zb-role__label">{tr(CONTENT.roleH, lang)}</span>
            <strong className="zb-role__title">{tr(CONTENT.role, lang)}</strong>
            <span className="zb-role__meta">{tr(CONTENT.roleMeta, lang)}</span>
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

        <section className="trend-narrative zb-narrative">
          <div className="trend-col">
            <h2>{tr(CONTENT.contextH, lang)}</h2>
            {CONTENT.context.map((p, i) => (
              <p key={i}>{tr(p, lang)}</p>
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

        <section className="trend-recs zb-product">
          <h2>{tr(CONTENT.productH, lang)}</h2>

          <h3>{tr(CONTENT.productSubH, lang)}</h3>
          <p className="zb-product__intro">{tr(CONTENT.productIntro, lang)}</p>
          <ul className="zb-feature-grid">
            {PRODUCT_FEATURES.map((f, i) => (
              <li key={i} className="zb-feature">{tr(f, lang)}</li>
            ))}
          </ul>

          <h3>{tr(CONTENT.techSubH, lang)}</h3>
          <p className="zb-product__intro">{tr(CONTENT.techIntro, lang)}</p>
          <div className="zb-arch">
            {ARCH_LAYERS.map((row, i) => (
              <div key={i} className="zb-arch__row">
                <div className="zb-arch__layer">{tr(row.layer, lang)}</div>
                <div className="zb-arch__tech">
                  {row.tech.map((t) => (
                    <span key={t} className="trend-chip trend-chip--sm">{t}</span>
                  ))}
                </div>
                <p className="zb-arch__note">{tr(row.note, lang)}</p>
              </div>
            ))}
          </div>

          <p className="trend-label zb-flow__label">{tr(CONTENT.commandFlowH, lang)}</p>
          {renderFlow(COMMAND_FLOW)}
          <p className="trend-label zb-flow__label">{tr(CONTENT.offlineFlowH, lang)}</p>
          {renderFlow(OFFLINE_FLOW)}
          <p className="trend-label zb-flow__label">{tr(CONTENT.otaFlowH, lang)}</p>
          {renderFlow(OTA_FLOW)}
        </section>

        <p className="trend-impact">{tr(meta.impact, lang)}</p>
      </article>
    </ProjectShell>
  )
}
