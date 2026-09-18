export const featuredProject = {
  slug: 'lending-orchestration-platform',
  type: { en: 'Financial Platform · Java Spring + Camunda', vi: 'Nền tảng Tài chính · Java Spring + Camunda' },
  title: 'Lending Orchestration Platform',
  headline: {
    en: 'A multi-product lending platform serving millions of customers, with ~$10M in monthly disbursement.',
    vi: 'Nền tảng vay đa sản phẩm phục vụ hàng triệu khách hàng, giải ngân ~$10M mỗi tháng.'
  },
  subtitle: {
    en: 'A single platform for multiple loan products and multiple lending partners.',
    vi: 'Một nền tảng chung để vận hành nhiều sản phẩm vay và tích hợp nhiều đối tác cho vay.'
  },
  description: {
    en: 'A centralized lending platform that runs the full loan lifecycle across multiple products and partners. The system covers Camunda-based workflow orchestration, per-product configuration, and the secure money-movement pipes - so launching and governing a new loan product is one platform, not seven.',
    vi: 'Nền tảng cho vay tập trung, xử lý toàn bộ vòng đời khoản vay cho nhiều sản phẩm và nhiều đối tác. Camunda được dùng để điều phối workflow, mỗi sản phẩm có cấu hình riêng, còn các luồng liên quan đến dòng tiền được kiểm soát tập trung. Nhờ đó có thể triển khai và quản lý sản phẩm mới trên cùng một nền tảng thay vì tách thành nhiều hệ thống.'
  },
  tools: 'Java · Spring Boot · Camunda BPM · Angular · React · REST APIs · Microservices',
  impact: {
    en: 'Live in production at scale - millions of customers, ~$10M monthly disbursement.',
    vi: 'Đang chạy production ở quy mô lớn - hàng triệu khách hàng, ~$10M giải ngân mỗi tháng.'
  },
  image: '/images/projects/lending-orchestration-platform.jpg',
  banner: null,
  link: '/projects/lending-orchestration-platform'
}

export const otherProjects = [
  {
    slug: 'yoohome',
    type: { en: 'AIoT Platform · NestJS + React Native + MQTT', vi: 'Nền tảng AIoT · NestJS + React Native + MQTT' },
    title: 'Yoohome - Smart Home & AIoT Platform',
    subtitle: {
      en: 'Smart-home control plus an AI assistant trained on the data the household generates.',
      vi: 'Điều khiển smart-home cùng một trợ lý AI học từ chính dữ liệu hộ gia đình tạo ra.'
    },
    description: {
      en: 'Tech-lead on Yoohome - an AIoT platform that unifies smart-home control and centralized building operations. The work covered the MQTT realtime backbone, multi-vendor hardware integrations, and a data pipeline that feeds an in-app virtual assistant - all under strict latency and safety guarantees.',
      vi: 'Ở Yoohome, tôi phụ trách kỹ thuật cho nền tảng AIoT kết hợp điều khiển nhà thông minh và vận hành toà nhà tập trung. Công việc chính gồm hệ thống realtime qua MQTT, tích hợp thiết bị từ nhiều hãng và pipeline dữ liệu cho trợ lý ảo trong ứng dụng, với yêu cầu cao về độ trễ và an toàn.'
    },
    tools: 'NestJS · React Native · Java Spring · MQTT · Microservices · Zigbee2MQTT · Kafka · OpenAI · Redis · MongoDB',
    impact: {
      en: '500K+ devices and 10K+ users in production across multiple smart-building deployments.',
      vi: '500K+ thiết bị và 10K+ người dùng production trên nhiều dự án smart-building.'
    },
    image: '/images/projects/yoohome.jpg',
    banner: null,
    link: '/projects/yoohome'
  },
  {
    slug: 'dotmar-cms',
    type: { en: 'Enterprise CMS · Magnolia + Java + React', vi: 'CMS Doanh nghiệp · Magnolia + Java + React' },
    title: 'Dotmar Multi-Site CMS',
    subtitle: {
      en: 'One author instance, three public sites, multi-language - built around sales.',
      vi: 'Một hệ thống biên tập quản lý ba site public, hỗ trợ nhiều ngôn ngữ và nội dung phục vụ bán hàng.'
    },
    description: {
      en: 'A multi-site CMS for Dotmar on Magnolia + Java + React. One author instance feeds multiple public instances across markets and languages, with editorial approval workflows, rule-driven personalization, and an AI authoring agent to speed up sales-focused content.',
      vi: 'CMS đa site cho Dotmar trên Magnolia + Java + React. Một author instance phục vụ nhiều public instance theo thị trường và ngôn ngữ, kèm approval workflow biên tập, personalization theo rule và AI agent để soạn nội dung phục vụ sales nhanh hơn.'
    },
    tools: 'Magnolia CMS · Java · React · Apache Tomcat · REST APIs',
    impact: {
      en: 'Multi-site CMS in production for ~10K users with live personalization rules.',
      vi: 'CMS đa site chạy production cho ~10K người dùng với rule personalization hoạt động thực tế.'
    },
    image: '/images/projects/dotmar-cms.jpg',
    banner: null,
    link: '/projects/dotmar-cms'
  },
  {
    slug: 'zigbee-gateway-firmware',
    type: { en: 'Embedded Platform · Node.js + Zigbee2MQTT + Debian', vi: 'Nền tảng Nhúng · Node.js + Zigbee2MQTT + Debian' },
    title: 'Custom Zigbee Gateway Firmware',
    subtitle: {
      en: 'A Zigbee gateway that keeps working when the cloud goes away.',
      vi: 'Gateway Zigbee vẫn tiếp tục hoạt động ngay cả khi mất kết nối cloud.'
    },
    description: {
      en: 'Custom Zigbee gateway firmware on Node.js and Zigbee2MQTT, running on Rockchip embedded hardware with Debian. Designed for cross-vendor devices, remote operator control, automatic OTA, and offline-tolerant operation - all under tight CPU, memory, and storage budgets.',
      vi: 'Firmware gateway Zigbee tuỳ chỉnh trên Node.js và Zigbee2MQTT, chạy trên phần cứng nhúng Rockchip với Debian. Thiết kế cho thiết bị đa hãng, điều khiển từ xa, OTA tự động và hoạt động khi mất mạng - dưới ràng buộc CPU, RAM và storage rất chặt.'
    },
    tools: 'Node.js · Zigbee2MQTT · Linux kernel processes · MQTT · Debian · Rockchip · OTA tooling',
    impact: {
      en: '10,000+ gateways deployed nationwide, holding up through cloud outages.',
      vi: 'Hơn 10,000 gateway triển khai toàn quốc, vẫn ổn định qua những lần mất cloud.'
    },
    image: '/images/projects/zigbee-gateway-firmware.jpg',
    banner: null,
    link: '/projects/zigbee-gateway-firmware'
  },
  {
    slug: 'hubly',
    type: { en: 'Community Platform · NestJS + Vue/Nuxt + Flutter', vi: 'Nền tảng Community · NestJS + Vue/Nuxt + Flutter' },
    title: 'Hubly - Community Platform with AI Moderation',
    subtitle: {
      en: 'A community platform with proprietary multi-modal AI moderation across 30+ languages.',
      vi: 'Nền tảng cộng đồng với hệ thống AI kiểm duyệt nhiều loại nội dung và hỗ trợ hơn 30 ngôn ngữ.'
    },
    description: {
      en: 'Senior fullstack on Hubly - a global community platform covering chat, KYC, ads, rewards, and livestream. The differentiator is Hubshield AI: proactive multi-modal moderation across text, image, video, audio, OCR, and GIF in 30+ languages. I worked across the NestJS / Moleculer backends, the Vue 2 + Nuxt 2 web frontend, and the Flutter mobile app - and helped drive the Sendbird → proprietary chat migration without breaking production.',
      vi: 'Tại Hubly, tôi làm full-stack trên nền tảng cộng đồng toàn cầu gồm chat, KYC, quảng cáo, điểm thưởng và livestream. Hubshield AI kiểm duyệt chủ động text, ảnh, video, audio, OCR và GIF bằng hơn 30 ngôn ngữ. Tôi làm cả backend NestJS / Moleculer, web Vue 2 + Nuxt 2 và ứng dụng Flutter, đồng thời tham gia chuyển hệ thống chat từ Sendbird sang giải pháp riêng mà không làm gián đoạn dữ liệu đang chạy.'
    },
    tools: 'NestJS · Moleculer · PHP · Prisma · MongoDB · Redis · Bull · Algolia · OpenAI · Vue/Nuxt · Flutter · Pusher',
    impact: {
      en: 'Global community platform in production with proprietary AI moderation across 30+ languages.',
      vi: 'Nền tảng community toàn cầu chạy production với moderation AI độc quyền cho 30+ ngôn ngữ.'
    },
    image: '/images/projects/hubly.jpg',
    banner: null,
    link: '/projects/hubly'
  }
]

export function getAllProjects() {
  return [featuredProject, ...otherProjects]
}

export function getProjectCard(slug) {
  return getAllProjects().find((p) => p.slug === slug)
}
