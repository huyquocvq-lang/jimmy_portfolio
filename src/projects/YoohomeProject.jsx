import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import '../styles/projects/yoohome.css'

const meta = getProjectCard('yoohome')

const STACK = [
  'NestJS', 'React Native', 'Java Spring', 'MQTT', 'Microservices',
  'Zigbee2MQTT', 'Kafka', 'OpenAI', 'Redis', 'Bull', 'MongoDB', 'WebSocket', 'Docker', 'Kubernetes'
]

const USE_CASES = [
  { en: 'Role and permission management for building operators - scoped per project, building, block, and apartment', vi: 'Phân quyền cho ban quản lý toà nhà - giới hạn theo dự án, toà, block và từng căn hộ' },
  { en: 'Integration with third-party hardware ecosystems - Zigbee directly through the in-house gateway, vendor cloud APIs where the hardware insists (Tuya, Legrand, Schneider, IP cameras, smart speakers)', vi: 'Tích hợp nhiều hệ phần cứng bên thứ ba: ưu tiên Zigbee trực tiếp qua gateway tự phát triển, và dùng cloud API của hãng khi thiết bị bắt buộc (Tuya, Legrand, Schneider, camera IP, loa thông minh)' },
  { en: 'Centralized device management for both operations staff and end-user smart-home devices - health, firmware, alarms, and energy across every apartment', vi: 'Quản lý tập trung cả thiết bị phục vụ vận hành toà nhà lẫn thiết bị smart-home của cư dân - tình trạng, firmware, cảnh báo và năng lượng của toàn bộ căn hộ' },
  { en: 'AI virtual assistant built on OpenAI, sitting on top of each household\'s own control and telemetry history. Residents talk to it by text or voice - "turn everything off except the bedroom AC", "why was electricity high this week?", "run the dinner scene at 7pm on weekdays" - and it resolves the request into device commands, scene edits, or an answer grounded in that home\'s data. Voice also comes in through integrated smart speakers (Amazon Alexa, OLLI MAIKA).', vi: 'Trợ lý ảo AI xây trên OpenAI, đứng trên chính lịch sử điều khiển và telemetry của từng hộ. Cư dân nói chuyện với nó bằng chữ hoặc giọng nói - "tắt hết trừ điều hoà phòng ngủ", "tuần này sao tốn điện thế?", "bật kịch bản bữa tối lúc 7h tối ngày thường" - và trợ lý quy yêu cầu đó thành lệnh thiết bị, chỉnh kịch bản, hoặc một câu trả lời dựa trên dữ liệu thật của căn nhà. Ra lệnh bằng giọng nói cũng đi qua các loa thông minh đã tích hợp (Amazon Alexa, OLLI MAIKA).' },
  { en: 'Habit learning and proactive automation - the assistant mines control patterns over time (who turns what on, when, under which weather) and proposes routines: "you switch off the water heater around 11pm most nights - want me to do it automatically?" An accepted suggestion becomes a scene in one tap.', vi: 'Học thói quen và tự động hoá chủ động - trợ lý khai thác pattern điều khiển theo thời gian (ai bật gì, lúc nào, thời tiết ra sao) rồi đề xuất routine: "hầu hết các tối bạn tắt bình nóng lạnh khoảng 11h - có muốn tôi làm tự động không?". Gợi ý được chấp nhận trở thành kịch bản chỉ bằng một chạm.' },
  { en: 'Cross-vendor scenes and safety automation - one "come home" scene drives Legrand switches, Tuya curtains, and a Panasonic AC together; fire, gas-leak, and SOS events fan out to the resident and the operator desk at the same time', vi: 'Kịch bản đa hãng và tự động hoá an toàn - một kịch bản "về nhà" điều khiển cùng lúc công tắc Legrand, rèm Tuya và điều hoà Panasonic; sự kiện cháy, rò khí, SOS được đẩy đồng thời tới cư dân và bàn trực của ban quản lý' }
]

const CONTRIBUTIONS = [
  { en: 'Designed the backend architecture from the ground up on NestJS microservices - device registry, command & control, telemetry ingestion, scene engine, notification, and assistant services - around an MQTT broker for device traffic and Kafka for the event stream, so each path scales on its own. We deliberately built our own core instead of adopting a packaged IoT platform; the device model borrows Zigbee2MQTT / Home Assistant conventions (device → capabilities → state) so hardware from any vendor lands in the same shape.', vi: 'Thiết kế kiến trúc backend từ đầu trên NestJS microservices - device registry, command & control, telemetry ingestion, scene engine, notification và assistant service - xoay quanh MQTT broker cho traffic thiết bị và Kafka cho event stream, để từng luồng scale độc lập. Team chủ động xây core riêng thay vì dùng một IoT platform đóng gói sẵn; mô hình thiết bị mượn quy ước của Zigbee2MQTT / Home Assistant (device → capability → state) để phần cứng của hãng nào cũng quy về cùng một dạng.' },
  { en: 'Designed the data model: a building → block → floor → apartment → room → device hierarchy as the multi-tenant backbone; a device registry holding vendor, protocol, gateway binding, and capability descriptors; desired-vs-reported state (device shadow) with hot state in Redis and durable state in MongoDB; telemetry written as time-bucketed series and streamed through Kafka to analytics and the assistant\'s learning pipeline; and an append-only command / ack log so every safety-critical action is auditable.', vi: 'Thiết kế base dữ liệu: cây toà nhà → block → tầng → căn hộ → phòng → thiết bị làm xương sống multi-tenant; device registry lưu vendor, protocol, gateway gắn kèm và mô tả capability; trạng thái desired / reported (device shadow) với hot state trên Redis và bản bền vững trên MongoDB; telemetry ghi theo bucket thời gian và stream qua Kafka sang analytics và pipeline học của trợ lý; cùng một command / ack log chỉ ghi thêm để mọi thao tác liên quan an toàn đều truy vết được.' },
  { en: 'Built the realtime control path end to end: app → API → command queue (Bull on Redis) → MQTT → gateway / device → ack → state pushed back to the client over WebSocket - with idempotent commands, per-device-class timeouts, and retry policies.', vi: 'Xây luồng điều khiển realtime từ đầu đến cuối: app → API → hàng đợi lệnh (Bull trên Redis) → MQTT → gateway / thiết bị → ack → đẩy trạng thái về client qua WebSocket - với lệnh idempotent, timeout theo từng nhóm thiết bị và chính sách retry riêng.' },
  { en: 'Designed and integrated multi-vendor device flows behind one adapter interface: Zigbee natively through the in-house gateway (Zigbee2MQTT), and vendor cloud APIs for Tuya, Legrand, Schneider Electric, Panasonic, Rang Dong, IP camera lines, and voice speakers (Amazon Alexa, OLLI MAIKA).', vi: 'Thiết kế và tích hợp luồng thiết bị đa hãng sau một adapter interface chung: Zigbee trực tiếp qua gateway tự phát triển (Zigbee2MQTT), và cloud API của hãng cho Tuya, Legrand, Schneider Electric, Panasonic, Rạng Đông, các dòng camera IP và loa thông minh (Amazon Alexa, OLLI MAIKA).' },
  { en: 'Owned the telemetry and data platform - ingestion, queueing, storage layout, and retention - designed so the data serves today\'s dashboards and tomorrow\'s workloads: assistant training, energy analytics, anomaly detection.', vi: 'Phụ trách nền tảng telemetry và dữ liệu - ingestion, queue, cách tổ chức lưu trữ và retention - thiết kế để dữ liệu vừa phục vụ dashboard hiện tại, vừa sẵn sàng cho các bài toán về sau: huấn luyện trợ lý, phân tích năng lượng, phát hiện bất thường.' },
  { en: 'Led full-stack delivery across the NestJS services and the React Native app (device control, scenes, assistant chat, native modules), and led a 5-10 engineer team through planning, code review, mentoring, and delivery coordination.', vi: 'Dẫn dắt delivery full-stack qua các service NestJS và app React Native (điều khiển thiết bị, kịch bản, chat với trợ lý, native module), đồng thời dẫn team 5-10 kỹ sư qua phân việc, code review, mentoring và điều phối delivery.' }
]

const CHALLENGES = [
  { en: 'Realtime, low-latency control end to end - app → cloud → gateway → device → confirmation back on screen', vi: 'Điều khiển realtime, độ trễ thấp xuyên suốt - app → cloud → gateway → thiết bị → xác nhận trở lại màn hình' },
  { en: 'Bursty message load in peak household-activity windows (think 7am and 6pm)', vi: 'Tải message tăng đột biến vào khung giờ sinh hoạt cao điểm (kiểu 7h sáng và 6h chiều)' },
  { en: 'A long tail of third-party hardware, each speaking a slightly different dialect', vi: 'Phần cứng bên thứ ba thì nhiều và đa dạng, mỗi bên nói một phương ngữ hơi khác' },
  { en: 'Safety-critical surface area - fire alarms, door locks, gas-leak detectors - where every event has to be delivered, acknowledged, and auditable', vi: 'Phạm vi an toàn quan trọng - báo cháy, khoá cửa, cảm biến rò khí - nơi mọi sự kiện đều phải tới nơi, có xác nhận và truy vết được' },
  { en: 'Large, business-critical data volume - hundreds of thousands of devices reporting around the clock. The data had to be cheap enough to keep and structured well enough to serve future workloads (assistant training, energy analytics, predictive maintenance), not just today\'s dashboards', vi: 'Khối lượng dữ liệu lớn và quan trọng - hàng trăm nghìn thiết bị báo cáo liên tục 24/7. Dữ liệu vừa phải đủ rẻ để giữ lại, vừa phải có cấu trúc đủ tốt để phục vụ các bài toán tương lai (huấn luyện trợ lý, phân tích năng lượng, bảo trì dự đoán), chứ không chỉ dashboard hôm nay' }
]

const SYSTEM_SCALE = [
  { en: 'Live in 10+ residential buildings and 1,000+ apartments, including 90 Lang Street and Royal Da Nang', vi: 'Đang vận hành tại hơn 10 toà nhà và hơn 1.000 căn hộ, trong đó có 90 Láng và Royal Đà Nẵng' },
  { en: '500,000+ devices operating 24/7', vi: 'Hơn 500K thiết bị hoạt động liên tục' },
  { en: '10,000+ end users', vi: '10,000+ người dùng cuối' },
  { en: 'Vendor integrations - Tuya, Legrand, Schneider Electric, Panasonic, Rang Dong, plus IP camera lines and smart speakers such as Amazon Alexa and OLLI MAIKA', vi: 'Tích hợp vendor - Tuya, Legrand, Schneider Electric, Panasonic, Rạng Đông, cùng các dòng camera IP và loa thông minh như Amazon Alexa, OLLI MAIKA' }
]

/* Product details: what the resident / operator actually gets */
const PRODUCT_FEATURES = [
  { en: 'Lighting', vi: 'Chiếu sáng' },
  { en: 'Curtains', vi: 'Rèm cửa' },
  { en: 'Air conditioning', vi: 'Điều hoà' },
  { en: 'Door access', vi: 'Kiểm soát ra vào' },
  { en: 'Security & cameras', vi: 'An ninh & camera' },
  { en: 'Fire alarm', vi: 'Báo cháy' },
  { en: 'Air & water quality', vi: 'Chất lượng không khí & nước' },
  { en: 'Energy monitoring', vi: 'Giám sát năng lượng' },
  { en: 'Multi-zone audio', vi: 'Âm thanh đa vùng' },
  { en: 'Home appliances', vi: 'Gia dụng thông minh' },
  { en: 'Scenes & schedules', vi: 'Kịch bản & lịch' },
  { en: 'Voice & AI assistant', vi: 'Giọng nói & trợ lý AI' },
  { en: 'Emergency SOS', vi: 'SOS khẩn cấp' },
  { en: 'Operator console', vi: 'Console ban quản lý' }
]

/* Product details: architecture layers, top (client) to bottom (hardware) */
const ARCH_LAYERS = [
  {
    layer: { en: 'Clients', vi: 'Client' },
    tech: ['React Native (iOS / Android)', 'Operator web', 'WebSocket'],
    note: { en: 'Resident app and operator console. Device state is pushed, never polled.', vi: 'App cư dân và console vận hành. Trạng thái thiết bị được đẩy về, không polling.' }
  },
  {
    layer: { en: 'Core services', vi: 'Core service' },
    tech: ['NestJS microservices', 'Java Spring'],
    note: { en: 'Device registry, command & control, scene engine, notifications, RBAC. Java Spring covers building-operations services.', vi: 'Device registry, command & control, scene engine, notification, RBAC. Java Spring đảm nhiệm các service vận hành toà nhà.' }
  },
  {
    layer: { en: 'Messaging', vi: 'Messaging' },
    tech: ['MQTT broker', 'Kafka', 'Bull / Redis'],
    note: { en: 'MQTT for device traffic, Kafka for the event stream, Bull for command queues, timeouts, and retries.', vi: 'MQTT cho traffic thiết bị, Kafka cho event stream, Bull cho hàng đợi lệnh, timeout và retry.' }
  },
  {
    layer: { en: 'Data', vi: 'Dữ liệu' },
    tech: ['MongoDB', 'Redis'],
    note: { en: 'Device shadow (hot in Redis, durable in MongoDB), time-bucketed telemetry, append-only command / ack log.', vi: 'Device shadow (hot trên Redis, bền vững trên MongoDB), telemetry theo bucket thời gian, command / ack log chỉ ghi thêm.' }
  },
  {
    layer: { en: 'AI', vi: 'AI' },
    tech: ['OpenAI', 'Telemetry history'],
    note: { en: 'Natural-language control, Q&A over the home\'s own data, habit learning and routine suggestions.', vi: 'Điều khiển bằng ngôn ngữ tự nhiên, hỏi đáp trên dữ liệu của chính căn nhà, học thói quen và gợi ý routine.' }
  },
  {
    layer: { en: 'Edge', vi: 'Edge' },
    tech: ['In-house gateway', 'Zigbee2MQTT', 'Rockchip / Debian'],
    note: { en: 'Local automation and control that keeps working through cloud outages; signed, staged OTA.', vi: 'Automation và điều khiển tại chỗ vẫn chạy khi mất cloud; OTA có ký số, phát hành theo đợt.' }
  },
  {
    layer: { en: 'Devices & vendors', vi: 'Thiết bị & vendor' },
    tech: ['Zigbee', 'Wi-Fi', 'Vendor cloud APIs', 'IP cameras', 'Alexa / OLLI MAIKA'],
    note: { en: 'Tuya, Legrand, Schneider Electric, Panasonic, Rang Dong and more - every vendor mapped to the same device → capability → state shape.', vi: 'Tuya, Legrand, Schneider Electric, Panasonic, Rạng Đông và nhiều hãng khác - tất cả quy về cùng một dạng device → capability → state.' }
  },
  {
    layer: { en: 'Runtime', vi: 'Runtime' },
    tech: ['Docker', 'Kubernetes'],
    note: { en: 'Containerized services, scaled per path - control, ingestion, and assistant workloads grow independently.', vi: 'Service đóng container, scale theo từng luồng - điều khiển, ingestion và trợ lý tăng trưởng độc lập.' }
  }
]

const COMMAND_FLOW = ['App', 'API', 'Queue (Bull)', 'MQTT', 'Gateway', 'Device', 'Ack', 'WebSocket', 'App']
const DATA_FLOW = ['Device', 'MQTT', 'Ingestion', 'Kafka', 'MongoDB (time-series)', 'Analytics / Assistant']

const STORE_LINKS = [
  {
    key: 'ios',
    store: 'App Store',
    platform: 'iOS',
    href: 'https://apps.apple.com/vn/app/yoohome/id6476431240',
    qr: '/images/projects/yoohome/qr-app-store.svg',
    label: { en: 'Download on the App Store', vi: 'Tải trên App Store' }
  },
  {
    key: 'android',
    store: 'Google Play',
    platform: 'Android',
    href: 'https://play.google.com/store/apps/details?id=com.yootek.home',
    qr: '/images/projects/yoohome/qr-google-play.svg',
    label: { en: 'Get it on Google Play', vi: 'Tải trên Google Play' }
  }
]

const CONTENT = {
  stackLabel: { en: 'Stack', vi: 'Stack' },
  contextH: { en: 'Context', vi: 'Bối cảnh' },
  context: {
    en: 'Yoohome is YooTek\'s AIoT smart-home platform, built for new apartment projects where the developer wants every unit handed over with smart-home capability out of the box and the building operator wants one control plane for the whole site. Residents use the mobile app to control lighting, curtains, air conditioning, door access, cameras, and safety sensors, and to run scenes (wake-up, leave-home, come-home, dinner); operators get a centralized view of access, alarms, energy, and device health across every apartment. The app also acts as a household virtual assistant - it takes text or voice commands, learns from control and management data over time, and gradually suggests routines that fit the way the household actually lives. Under the hood, that means one platform that has to speak to hardware from many vendors - Zigbee devices through our own gateway, Wi-Fi / cloud devices such as cameras and smart speakers through vendor APIs - while keeping control realtime and safety-critical events reliable.',
    vi: 'Yoohome là nền tảng AIoT smart-home của YooTek, làm cho các dự án chung cư mới - nơi chủ đầu tư muốn mỗi căn hộ bàn giao đã sẵn smart-home, còn ban quản lý muốn một hệ thống điều hành chung cho cả toà. Cư dân dùng app để điều khiển chiếu sáng, rèm, điều hoà, khoá cửa, camera, cảm biến an toàn và chạy các kịch bản (thức dậy, ra khỏi nhà, về nhà, bữa tối); ban quản lý có màn hình tập trung để theo dõi ra vào, cảnh báo, năng lượng và tình trạng thiết bị của toàn bộ căn hộ. App đồng thời là trợ lý ảo cho hộ gia đình: nhận lệnh bằng chữ hoặc giọng nói, học dần từ dữ liệu điều khiển và vận hành, rồi gợi ý các routine đúng với cách gia đình đó thực sự sinh hoạt. Về mặt kỹ thuật, đây là một nền tảng phải nói chuyện được với phần cứng của rất nhiều hãng - thiết bị Zigbee qua gateway tự phát triển, thiết bị Wi-Fi / cloud như camera và loa thông minh qua API của hãng - mà vẫn giữ điều khiển realtime và các sự kiện an toàn luôn tin cậy.'
  },
  roleH: { en: 'Role', vi: 'Vai trò' },
  role: { en: 'Fullstack Developer · Tech Lead', vi: 'Fullstack Developer · Tech Lead' },
  roleMeta: {
    en: 'Owned backend architecture, data model, and the realtime control path · led a 5-10 engineer team · YooTek Holdings · Aug 2021 – Feb 2024',
    vi: 'Phụ trách kiến trúc backend, base dữ liệu và luồng điều khiển realtime · dẫn team 5-10 kỹ sư · YooTek Holdings · 08/2021 – 02/2024'
  },
  ownershipH: { en: 'My Contribution / Ownership', vi: 'Phần tôi trực tiếp phụ trách' },
  useCasesH: { en: 'Highlighted Use Cases', vi: 'Use case nổi bật' },
  challengesH: { en: 'Challenges', vi: 'Thử thách' },
  systemScaleH: { en: 'System Scale', vi: 'Quy mô hệ thống' },
  productH: { en: 'Product Details', vi: 'Chi tiết sản phẩm' },
  productSubH: { en: 'The product', vi: 'Sản phẩm' },
  productIntro: {
    en: 'Yoohome ships as software plus IoT hardware for new-build apartments. The resident app covers the whole home; the operator console covers the whole building. Everything below runs on the same platform and the same device model.',
    vi: 'Yoohome bàn giao dưới dạng phần mềm kèm thiết bị IoT cho căn hộ mới. App cư dân bao trọn căn nhà; console vận hành bao trọn toà nhà. Mọi thứ bên dưới chạy trên cùng một nền tảng và cùng một mô hình thiết bị.'
  },
  techSubH: { en: 'Under the hood', vi: 'Kỹ thuật' },
  techIntro: {
    en: 'Layered top to bottom - from the screen the resident taps to the relay that clicks. Each layer is replaceable on its own; the device → capability → state model is the contract that holds them together.',
    vi: 'Xếp lớp từ trên xuống - từ màn hình cư dân chạm tới relay đóng cắt. Mỗi lớp có thể thay thế độc lập; mô hình device → capability → state là hợp đồng giữ chúng lại với nhau.'
  },
  commandFlowH: { en: 'Realtime command path', vi: 'Luồng lệnh realtime' },
  dataFlowH: { en: 'Telemetry / data path', vi: 'Luồng telemetry / dữ liệu' },
  linksH: { en: 'Product Links', vi: 'Link sản phẩm' },
  linksHint: { en: 'Scan a code with your phone to install on iOS or Android, or open the store link directly.', vi: 'Quét mã bằng điện thoại để cài trên iOS hoặc Android, hoặc mở trực tiếp link store.' },
  qrAlt: { en: 'QR code to download Yoohome on', vi: 'Mã QR tải Yoohome trên' }
}

export default function YoohomeProject() {
  const { lang } = useLanguage()

  const renderFlow = (steps) => (
    <div className="yh-flow">
      {steps.map((s, i) => (
        <span key={`${s}-${i}`} className="yh-flow__item">
          <span className="yh-flow__step">{s}</span>
          {i < steps.length - 1 && <span className="yh-flow__arrow" aria-hidden="true">→</span>}
        </span>
      ))}
    </div>
  )

  return (
    <ProjectShell slug="yoohome">
      <article className="trend">
        <header className="project-intro project-intro--trend">
          <span className="project-intro__eyebrow">{tr(meta.type, lang)}</span>
          <h1>{tr(meta.title, lang)}</h1>
          <div className="yh-role">
            <span className="yh-role__label">{tr(CONTENT.roleH, lang)}</span>
            <strong className="yh-role__title">{tr(CONTENT.role, lang)}</strong>
            <span className="yh-role__meta">{tr(CONTENT.roleMeta, lang)}</span>
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

        <section className="trend-narrative yh-narrative">
          <div className="trend-col">
            <h2>{tr(CONTENT.contextH, lang)}</h2>
            <p>{tr(CONTENT.context, lang)}</p>
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

        <section className="trend-recs yh-product">
          <h2>{tr(CONTENT.productH, lang)}</h2>

          <h3>{tr(CONTENT.productSubH, lang)}</h3>
          <p className="yh-product__intro">{tr(CONTENT.productIntro, lang)}</p>
          <ul className="yh-feature-grid">
            {PRODUCT_FEATURES.map((f, i) => (
              <li key={i} className="yh-feature">{tr(f, lang)}</li>
            ))}
          </ul>

          <h3>{tr(CONTENT.techSubH, lang)}</h3>
          <p className="yh-product__intro">{tr(CONTENT.techIntro, lang)}</p>
          <div className="yh-arch">
            {ARCH_LAYERS.map((row, i) => (
              <div key={i} className="yh-arch__row">
                <div className="yh-arch__layer">{tr(row.layer, lang)}</div>
                <div className="yh-arch__tech">
                  {row.tech.map((t) => (
                    <span key={t} className="trend-chip trend-chip--sm">{t}</span>
                  ))}
                </div>
                <p className="yh-arch__note">{tr(row.note, lang)}</p>
              </div>
            ))}
          </div>

          <p className="trend-label yh-flow__label">{tr(CONTENT.commandFlowH, lang)}</p>
          {renderFlow(COMMAND_FLOW)}
          <p className="trend-label yh-flow__label">{tr(CONTENT.dataFlowH, lang)}</p>
          {renderFlow(DATA_FLOW)}
        </section>

        <section className="trend-recs">
          <h2>{tr(CONTENT.linksH, lang)}</h2>
          <p className="yh-store__hint">{tr(CONTENT.linksHint, lang)}</p>
          <div className="yh-store-grid">
            {STORE_LINKS.map((s) => (
              <a
                key={s.key}
                className="yh-store"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="yh-store__qr"
                  src={s.qr}
                  alt={`${tr(CONTENT.qrAlt, lang)} ${s.platform}`}
                  width="160"
                  height="160"
                  loading="lazy"
                />
                <span className="yh-store__platform">{s.platform}</span>
                <span className="yh-store__label">{tr(s.label, lang)}</span>
                <span className="yh-store__name">{s.store} ↗</span>
              </a>
            ))}
          </div>
        </section>

        <p className="trend-impact">{tr(meta.impact, lang)}</p>
      </article>
    </ProjectShell>
  )
}
