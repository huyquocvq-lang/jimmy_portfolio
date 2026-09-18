// Each entry may carry a `logo` field pointing at a file in
// `public/images/logos/`. Render is conditional - leave as `null` if no logo
// asset is available. Recommended: normalized 512x512 PNG, white rounded
// square with transparent corners and tight centered content. Example:
// `logo: '/images/logos/viettel.png'`.
export const experience = [
  {
    company: { en: 'Viettel Digital Services', vi: 'Nền tảng Lending Telco-Fintech' },
    website: "https://viettel.vn/",
    logo: '/images/logos/viettel.png',
    role: 'Software Development Specialist',
    location: { en: 'Hanoi, Vietnam', vi: 'Hà Nội, Việt Nam' },
    start: 'Jul 2025',
    end: { en: 'Present', vi: 'Hiện tại' },
    bullets: [
      {
        en: 'Build Java / Spring Boot services for a digital lending platform processing up to USD 10M in monthly disbursement.',
        vi: 'Xây các service Java / Spring Boot cho nền tảng lending số xử lý tới 10 triệu USD giải ngân mỗi tháng.'
      },
      {
        en: 'Integrate payment and lending-partner flows across the loan lifecycle, including cash-flow and disbursement paths.',
        vi: 'Tích hợp luồng thanh toán và đối tác cho vay xuyên suốt vòng đời khoản vay, gồm cả dòng tiền và giải ngân.'
      },
      {
        en: 'Contribute to platform design for scalability, security, high availability, and transaction integrity across shared lending services.',
        vi: 'Tham gia thiết kế platform cho khả năng mở rộng, bảo mật, độ sẵn sàng cao và toàn vẹn giao dịch trên các service lending dùng chung.'
      },
      {
        en: 'Implement Camunda BPM workflows covering application, decisioning, partner hand-offs, and disbursement.',
        vi: 'Triển khai workflow Camunda BPM cho các bước đăng ký, decisioning, hand-off đối tác và giải ngân.'
      }
    ],
    meta: [
      {
        label: { en: 'Technologies', vi: 'Công nghệ' },
        value: 'Java · Spring Boot · Camunda BPM · Native Mobile · Financial System Integration'
      },
      {
        label: { en: 'Scale', vi: 'Quy mô' },
        value: {
          en: 'Up to USD 10M monthly disbursement on the digital lending platform',
          vi: 'Giải ngân tới 10 triệu USD/tháng trên nền tảng lending số'
        }
      }
    ]
  },
  {
    company: 'SmartOSC',
    website: 'https://www.smartosc.com',
    logo: '/images/logos/smartosc.png',
    role: 'Senior Java Engineer',
    location: {
      en: '19F Handico Tower, Pham Hung St, Nam Tu Liem, Hanoi',
      vi: 'Tầng 19 toà Handico, đường Phạm Hùng, Nam Từ Liêm, Hà Nội'
    },
    start: 'Oct 2023',
    end: 'Jun 2025',
    bullets: [
      {
        en: 'Built Magnolia CMS solutions for enterprise multi-site clients, including custom modules, editorial workflows, and performance tuning.',
        vi: 'Xây giải pháp Magnolia CMS cho khách hàng doanh nghiệp đa site, gồm module tuỳ chỉnh, editorial workflow và tối ưu hiệu năng.'
      },
      {
        en: 'Shipped Java backend services, optimized MySQL queries, and delivered REST / GraphQL APIs for headless content distribution.',
        vi: 'Ship backend service Java, tối ưu query MySQL và triển khai REST / GraphQL API cho headless content delivery.'
      },
      {
        en: 'Integrated React headless frontends with shared CMS content models to avoid duplicated templates across channels.',
        vi: 'Tích hợp frontend React headless với content model dùng chung để tránh duplicate template giữa các kênh.'
      },
      {
        en: 'Hardened Apache / Tomcat production configuration and improved runtime stability under load.',
        vi: 'Siết cấu hình Apache / Tomcat production và cải thiện độ ổn định runtime dưới tải.'
      },
      {
        en: 'Set up GitLab CI/CD for automated test / deploy flows and mentored junior engineers through code review.',
        vi: 'Dựng GitLab CI/CD cho test / deploy tự động và mentor junior qua code review.'
      }
    ],
    meta: [
      {
        label: { en: 'Technologies', vi: 'Công nghệ' },
        value: 'Magnolia CMS · Java Core · Spring Boot · MySQL · React · Apache · AWS · GitLab CI/CD'
      },
      {
        label: { en: 'Outstanding projects', vi: 'Dự án tiêu biểu' },
        value: {
          en: 'Dotmar Multi-Site CMS (Magnolia + Java + React · personalization + AI authoring)',
          vi: 'Dotmar Multi-Site CMS (Magnolia + Java + React · personalization + AI soạn nội dung)'
        }
      }
    ]
  },
  {
    company: 'YooTek Holdings',
    website: "https://yootek.vn/",
    logo: '/images/logos/yootek.png',
    role: 'Full Stack Developer',
    location: { en: 'Nam Tu Liem, Hanoi', vi: 'Nam Từ Liêm, Hà Nội' },
    start: 'Aug 2021',
    end: 'Feb 2024',
    bullets: [
      {
        en: 'Built Java Spring Boot / NestJS microservices and tuned MySQL, MongoDB, WebSocket, and MQTT paths for high-traffic IoT workloads.',
        vi: 'Xây microservice Java Spring Boot / NestJS và tối ưu MySQL, MongoDB, WebSocket, MQTT cho workload IoT lưu lượng cao.'
      },
      {
        en: 'Shipped React Native applications with Java / Swift native modules and Redux-based state management.',
        vi: 'Ship ứng dụng React Native với native module Java / Swift và state management bằng Redux.'
      },
      {
        en: 'Integrated MoMo / VNPay and multi-vendor IoT ecosystems including Legrand, Schneider Electric, and Tuya; deployed with Docker / Kubernetes.',
        vi: 'Tích hợp MoMo / VNPay cùng hệ IoT đa hãng gồm Legrand, Schneider Electric và Tuya; deploy bằng Docker / Kubernetes.'
      },
      {
        en: 'Designed smart-home gateway capabilities across Zigbee, Z-Wave, and BLE, including edge AI modules with YOLO / OpenCV.',
        vi: 'Thiết kế capability gateway smart-home qua Zigbee, Z-Wave và BLE, gồm module edge AI với YOLO / OpenCV.'
      },
      {
        en: 'Led a 5-10 engineer team across planning, implementation coordination, code review, mentoring, and delivery tracking.',
        vi: 'Dẫn dắt team 5-10 kỹ sư qua planning, điều phối triển khai, code review, mentoring và theo dõi delivery.'
      }
    ],
    meta: [
      {
        label: { en: 'Technologies', vi: 'Công nghệ' },
        value: 'Spring Boot · React Native · Python · Node.js · NestJS · MQTT · RabbitMQ · Microservices · MongoDB · Docker · Kubernetes'
      },
      {
        label: { en: 'Outstanding projects', vi: 'Dự án tiêu biểu' },
        value: {
          en: 'Yoohome AIoT platform · Custom Zigbee Gateway Firmware',
          vi: 'Nền tảng AIoT Yoohome · Firmware gateway Zigbee tuỳ chỉnh'
        }
      }
    ]
  },
  {
    company: 'Hanoi Telecom Corporation',
    website: "https://hanoitelecom.com/",
    logo: '/images/logos/htc.png',
    role: 'Java Developer',
    location: { en: 'My Dinh 1, Hanoi', vi: 'Mỹ Đình 1, Hà Nội' },
    start: 'Nov 2020',
    end: 'Mar 2021',
    bullets: [
      {
        en: 'Built customer-facing Liferay portals and Spring Boot REST services.',
        vi: 'Xây portal khách hàng bằng Liferay và các REST service Spring Boot.'
      },
      {
        en: 'Optimized Spring Data JPA / MySQL access patterns for data-heavy portal features.',
        vi: 'Tối ưu access pattern Spring Data JPA / MySQL cho các tính năng portal nặng dữ liệu.'
      },
      {
        en: 'Contributed to requirements analysis and delivery tracking with the product team.',
        vi: 'Tham gia phân tích yêu cầu và theo dõi delivery cùng product team.'
      }
    ],
    meta: [
      {
        label: { en: 'Technologies', vi: 'Công nghệ' },
        value: 'Spring Framework · MySQL · Liferay · Java · Git · Trello'
      },
      {
        label: { en: 'Outstanding projects', vi: 'Dự án tiêu biểu' },
        value: {
          en: 'Customer portal modernization with Liferay + Spring Boot',
          vi: 'Hiện đại hoá portal khách hàng với Liferay + Spring Boot'
        }
      }
    ]
  },
  {
    company: 'Eledevo Academy',
    website: 'https://www.google.com/search?q=eledevo+Academy+website',
    logo: '/images/logos/eledevo.png',
    role: 'Full Stack Developer & IT Lecturer',
    location: { en: 'Hanoi', vi: 'Hà Nội' },
    start: 'Aug 2019',
    end: 'Sep 2020',
    bullets: [
      {
        en: 'Progressed from Java intern to a part-time full-stack and teaching role.',
        vi: 'Từ Java intern chuyển sang vai trò part-time kết hợp full-stack và giảng dạy.'
      },
      {
        en: 'Built Spring / Express APIs and shipped React / React Native applications with Redux / Saga.',
        vi: 'Xây API bằng Spring / Express và ship ứng dụng React / React Native với Redux / Saga.'
      },
      {
        en: 'Taught programming fundamentals through hands-on Spring, Node.js, and React CRUD projects.',
        vi: 'Dạy lập trình nền tảng qua các project CRUD thực hành với Spring, Node.js và React.'
      },
      {
        en: 'Mentored 1-3 interns per cohort through onboarding and project delivery.',
        vi: 'Mentor 1-3 intern mỗi cohort qua onboarding và delivery dự án.'
      }
    ],
    meta: [
      {
        label: { en: 'Technologies', vi: 'Công nghệ' },
        value: 'Spring Framework · React · React Native · JavaScript · Java · MySQL · MongoDB'
      },
      {
        label: { en: 'Outstanding projects', vi: 'Dự án tiêu biểu' },
        value: {
          en: 'Programming curriculum for Spring / Node.js / React · The Fruit Market mobile app',
          vi: 'Giáo trình lập trình Spring / Node.js / React · Ứng dụng The Fruit Market'
        }
      }
    ]
  }
]
