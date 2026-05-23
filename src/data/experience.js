// Each entry may carry a `logo` field pointing at a file in
// `public/images/logos/`. Render is conditional - leave as `null` if no logo
// asset is available. Recommended: normalized 512x512 PNG, white rounded
// square with transparent corners and tight centered content. Example:
// `logo: '/images/logos/viettel.png'`.
export const experience = [
  {
    company: { en: 'Viettel Digital Services', vi: 'Nền tảng Lending Telco-Fintech' },
    website: null,
    logo: '/images/logos/viettel.png',
    role: 'Software Development Specialist',
    location: { en: 'Hanoi, Vietnam', vi: 'Hà Nội, Việt Nam' },
    start: 'Jul 2025',
    end: { en: 'Present', vi: 'Hiện tại' },
    paragraphs: [
      {
        en: 'On the platform team for a large-scale digital lending product that disburses up to USD 10M per month. The work sits at the intersection of fintech, telco-grade infrastructure, and partner integrations.',
        vi: 'Trong team platform cho một sản phẩm lending số quy mô lớn, giải ngân tới 10 triệu USD mỗi tháng. Công việc nằm ở giao điểm giữa fintech, hạ tầng telco và các integration đối tác.'
      },
      {
        en: 'Build and maintain Java backend services, wire up payment flows, and manage cash-flow connections with lending partners across the loan lifecycle.',
        vi: 'Xây và bảo trì các backend service Java, ráp luồng thanh toán và quản lý dòng tiền với các đối tác cho vay trong suốt vòng đời khoản vay.'
      },
      {
        en: 'Contribute to system design for scalability, security, and high availability across the lending platform, and support native mobile apps that consume the same APIs.',
        vi: 'Tham gia thiết kế hệ thống cho khả năng mở rộng, bảo mật và độ sẵn sàng cao trên toàn nền tảng, đồng thời hỗ trợ các app mobile native dùng chung bộ API.'
      },
      {
        en: 'Implement business workflows on Camunda BPM to orchestrate the loan lifecycle from application through disbursement.',
        vi: 'Triển khai business workflow trên Camunda BPM để điều phối vòng đời khoản vay từ đăng ký đến giải ngân.'
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
    paragraphs: [
      {
        en: 'Built and maintained Magnolia CMS solutions for enterprise clients - performance tuning, custom modules, and editorial workflows for content teams running multi-site setups.',
        vi: 'Xây và bảo trì các giải pháp Magnolia CMS cho khách hàng doanh nghiệp - tối ưu hiệu năng, làm module tuỳ chỉnh và workflow biên tập cho các team nội dung vận hành nhiều site.'
      },
      {
        en: 'Wrote Java backend services, tuned MySQL queries, and shipped REST and GraphQL APIs powering headless content delivery to multiple frontends.',
        vi: 'Viết backend service Java, tune query MySQL và ship REST cùng GraphQL API phục vụ headless content delivery cho nhiều frontend.'
      },
      {
        en: 'Built and integrated a React headless frontend so editorial output rendered cleanly across web channels with no template duplication.',
        vi: 'Xây và tích hợp frontend React headless để output biên tập render gọn gàng qua nhiều kênh web mà không bị trùng template.'
      },
      {
        en: 'Managed Apache configs, hardened security posture, and kept response times sane under production load.',
        vi: 'Quản lý cấu hình Apache, siết security posture và giữ thời gian phản hồi ổn định dưới tải production.'
      },
      {
        en: 'Set up GitLab CI/CD pipelines for automated testing and deployment, and mentored junior developers on review habits and code quality.',
        vi: 'Dựng pipeline GitLab CI/CD cho testing và deploy tự động, đồng thời mentor các dev junior về thói quen review và chất lượng code.'
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
    website: null,
    logo: '/images/logos/yootek.png',
    role: 'Full Stack Developer',
    location: { en: 'Nam Tu Liem, Hanoi', vi: 'Nam Từ Liêm, Hà Nội' },
    start: 'Aug 2021',
    end: 'Feb 2024',
    paragraphs: [
      {
        en: 'Built a microservices backend in Java Spring Boot and NestJS - tuning MySQL, MongoDB, WebSocket, and MQTT pipelines to absorb the load from high-traffic IoT and consumer workloads.',
        vi: 'Xây backend microservice với Java Spring Boot và NestJS - tune MySQL, MongoDB, WebSocket và MQTT để chịu được tải từ các workload IoT và người dùng thường xuyên cao điểm.'
      },
      {
        en: 'Shipped mobile apps in React Native with native modules in Java and Swift, and managed application state with Redux.',
        vi: 'Ship các app mobile với React Native, viết native module bằng Java và Swift, quản lý state ứng dụng với Redux.'
      },
      {
        en: 'Integrated payment gateways (MoMo, VN Pay) and IoT devices (Legrand, Schneider Electric, Tuya), and deployed services on CMC Cloud with Docker and Kubernetes.',
        vi: 'Tích hợp cổng thanh toán (MoMo, VN Pay) và thiết bị IoT (Legrand, Schneider Electric, Tuya), deploy service trên CMC Cloud bằng Docker và Kubernetes.'
      },
      {
        en: 'Designed a home gateway for smart devices over Zigbee, Z-Wave, and BLE, plus on-device AI modules with YOLO and OpenCV for fire and stroke detection.',
        vi: 'Thiết kế home gateway cho thiết bị thông minh qua Zigbee, Z-Wave và BLE, kèm module AI on-device với YOLO và OpenCV cho phát hiện cháy và đột quỵ.'
      },
      {
        en: 'Led a team of five to ten engineers - task planning, progress tracking, code reviews, and performance evaluations.',
        vi: 'Dẫn dắt nhóm năm đến mười kỹ sư - phân việc, theo dõi tiến độ, code review và đánh giá hiệu suất.'
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
    website: null,
    logo: '/images/logos/htc.png',
    role: 'Java Developer',
    location: { en: 'My Dinh 1, Hanoi', vi: 'Mỹ Đình 1, Hà Nội' },
    start: 'Nov 2020',
    end: 'Mar 2021',
    paragraphs: [
      {
        en: 'Used the Liferay framework to build customer-facing portal sites, and wrote backend services in Spring Boot following REST conventions.',
        vi: 'Dùng framework Liferay để dựng các portal cho khách hàng, viết backend service Spring Boot theo chuẩn REST.'
      },
      {
        en: 'Researched algorithms and query optimization with Spring Data JPA and MySQL to keep data-heavy portal features responsive.',
        vi: 'Nghiên cứu thuật toán và tối ưu query với Spring Data JPA và MySQL để giữ các tính năng portal nặng dữ liệu vẫn phản hồi nhanh.'
      },
      {
        en: 'Joined business analysis and used Trello and GitHub to track progress with the team.',
        vi: 'Tham gia phân tích nghiệp vụ và dùng Trello, GitHub để theo dõi tiến độ cùng team.'
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
    website: null,
    logo: '/images/logos/eledevo.png',
    role: 'Full Stack Developer & IT Lecturer',
    location: { en: 'Hanoi', vi: 'Hà Nội' },
    start: 'Aug 2019',
    end: 'Sep 2020',
    paragraphs: [
      {
        en: 'Started as a Java intern, then moved into a part-time role split between production work and teaching.',
        vi: 'Bắt đầu là Java intern, sau đó chuyển sang vị trí part-time chia đôi giữa công việc production và giảng dạy.'
      },
      {
        en: 'Wrote APIs in Spring and Express following RESTful principles, and shipped web and mobile apps with React and React Native, Redux, and Saga.',
        vi: 'Viết API bằng Spring và Express theo nguyên tắc RESTful, ship app web và mobile với React và React Native, Redux và Saga.'
      },
      {
        en: 'Taught programming fundamentals, walking students through building CRUD apps in Spring, Node.js, and React.',
        vi: 'Dạy lập trình cơ bản, đi cùng học viên qua việc xây các ứng dụng CRUD bằng Spring, Node.js và React.'
      },
      {
        en: 'Supported staff and led one to three interns per cohort through onboarding and project delivery.',
        vi: 'Hỗ trợ nhân viên và dẫn dắt một đến ba intern mỗi đợt qua onboarding và bàn giao dự án.'
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
