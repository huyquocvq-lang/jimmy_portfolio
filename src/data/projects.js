export const featuredProject = {
  slug: 'mmp-cms',
  type: { en: 'CMS Platform · Java Spring Boot', vi: 'Nền tảng CMS · Java Spring Boot' },
  title: "MMP's CMS Website",
  headline: {
    en: 'High-traffic CMS platform built on Java Spring Boot',
    vi: 'Nền tảng CMS high-traffic xây trên Java Spring Boot'
  },
  subtitle: {
    en: 'A Java-based content management system designed for large datasets and high-traffic content delivery.',
    vi: 'Hệ thống quản trị nội dung viết bằng Java, thiết kế cho dataset lớn và truyền tải nội dung lưu lượng cao.'
  },
  description: {
    en: 'Built a custom CMS using Java Spring Boot for MMP, focused on serving high-traffic content workloads with large editorial datasets. Designed the backend services, optimized MySQL queries, and exposed REST APIs powering the editorial workflows and public-facing pages.',
    vi: 'Xây dựng một CMS tuỳ chỉnh bằng Java Spring Boot cho MMP, tập trung phục vụ workload nội dung high-traffic với dataset biên tập lớn. Thiết kế các backend service, tối ưu query MySQL, và mở REST API phục vụ workflow biên tập cũng như các trang public-facing.'
  },
  tools: 'Java · Spring Boot · MySQL · REST APIs · Apache · AWS · GitLab CI/CD',
  impact: {
    en: 'Production CMS optimized for high-traffic content delivery and large dataset operations.',
    vi: 'CMS production được tối ưu cho truyền tải nội dung high-traffic và xử lý dataset lớn.'
  },
  image: '/images/projects/mmp-cms.jpg',
  banner: null,
  link: '/projects/mmp-cms'
}

export const otherProjects = [
  {
    slug: 'dentsu-cms',
    type: { en: 'Headless CMS · Magnolia + React', vi: 'Headless CMS · Magnolia + React' },
    title: "Dentsu's Headless CMS Website",
    subtitle: {
      en: 'API-driven content management with Magnolia + React frontend',
      vi: 'Quản trị nội dung API-driven với frontend Magnolia + React'
    },
    description: {
      en: 'Developed a headless CMS for Dentsu using Magnolia CMS for content modeling and a React-based frontend for delivery, with REST and GraphQL APIs powering seamless content rendering across channels.',
      vi: 'Phát triển headless CMS cho Dentsu sử dụng Magnolia CMS cho content modeling và frontend React cho delivery, với REST và GraphQL API giúp render nội dung mượt mà qua các kênh.'
    },
    impact: {
      en: 'Enterprise headless content stack with API-driven delivery',
      vi: 'Stack headless content cấp doanh nghiệp với delivery API-driven'
    },
    image: '/images/projects/dentsu-cms.jpg',
    banner: null,
    link: '/projects/dentsu-cms'
  },
  {
    slug: 'yoolife',
    type: { en: 'Mobile App · React Native', vi: 'Ứng dụng Mobile · React Native' },
    title: 'Yoolife Application',
    subtitle: {
      en: 'Smart-living mobile app for urban residents',
      vi: 'Ứng dụng mobile smart-living cho cư dân khu đô thị'
    },
    description: {
      en: 'A React Native mobile application for residents of smart urban areas - integrated with IoT devices, payment gateways (MoMo, VN Pay), and a Spring Boot + Nest.js microservices backend over MQTT and WebSocket.',
      vi: 'Ứng dụng mobile React Native dành cho cư dân khu đô thị thông minh — tích hợp thiết bị IoT, cổng thanh toán (MoMo, VN Pay), và backend microservice Spring Boot + Nest.js qua MQTT và WebSocket.'
    },
    impact: {
      en: 'Consumer-facing IoT app handling real-time device control at scale',
      vi: 'Ứng dụng IoT cho người dùng cuối, xử lý điều khiển thiết bị real-time ở quy mô lớn'
    },
    image: '/images/projects/yoolife.jpg',
    banner: null,
    link: '/projects/yoolife'
  },
  {
    slug: 'yooioc',
    type: { en: 'Operations Platform · Microservices', vi: 'Nền tảng Vận hành · Microservices' },
    title: 'YooIOC Application',
    subtitle: {
      en: 'Urban operations management platform',
      vi: 'Nền tảng quản lý vận hành khu đô thị'
    },
    description: {
      en: 'An operational management application for urban areas covering fundamental tasks like resident services, incident tracking, and device administration - powered by a Spring Boot + Nest.js microservices backend deployed on CMC Cloud.',
      vi: 'Ứng dụng quản lý vận hành cho khu đô thị, bao gồm các tác vụ cơ bản như dịch vụ cư dân, theo dõi sự cố và quản trị thiết bị — chạy trên backend microservice Spring Boot + Nest.js deploy trên CMC Cloud.'
    },
    impact: {
      en: 'Central operations hub for smart-urban-area management',
      vi: 'Trung tâm vận hành cho việc quản lý khu đô thị thông minh'
    },
    image: '/images/projects/yooioc.jpg',
    banner: null,
    link: '/projects/yooioc'
  },
  {
    slug: 'vnpt-portal',
    type: { en: 'Portal · Liferay + Spring', vi: 'Portal · Liferay + Spring' },
    title: 'VNPT Portal Information',
    subtitle: {
      en: 'Liferay-based information portal with Spring Boot APIs',
      vi: 'Portal thông tin dựa trên Liferay với API Spring Boot'
    },
    description: {
      en: 'Built customer-facing portal pages on Liferay backed by a Spring Boot REST API, with query optimization through Spring Data JPA and MySQL to support data-intensive portal features.',
      vi: 'Xây các trang portal cho khách hàng trên Liferay, backend là Spring Boot REST API, tối ưu truy vấn qua Spring Data JPA và MySQL để hỗ trợ các tính năng portal nặng dữ liệu.'
    },
    impact: {
      en: "Operational portal serving VNPT customer-facing information needs",
      vi: 'Portal vận hành phục vụ nhu cầu thông tin khách hàng của VNPT'
    },
    image: '/images/projects/vnpt-portal.jpg',
    banner: null,
    link: '/projects/vnpt-portal'
  },
  {
    slug: 'eledevo-landing',
    type: { en: 'Marketing Site · React', vi: 'Marketing Site · React' },
    title: 'Eledevo Academy Landing Page',
    subtitle: {
      en: 'Marketing landing page introducing Eledevo Academy',
      vi: 'Landing page marketing giới thiệu Eledevo Academy'
    },
    description: {
      en: 'A responsive marketing landing page introducing Eledevo Academy and its programs - built with React and Spring on the backend, following RESTful conventions for any data integrations.',
      vi: 'Landing page marketing responsive giới thiệu Eledevo Academy và các chương trình của học viện — viết bằng React, backend Spring, tuân theo chuẩn RESTful cho mọi tích hợp dữ liệu.'
    },
    impact: {
      en: "Public-facing site supporting the academy's student recruitment",
      vi: 'Trang public hỗ trợ học viện tuyển sinh học viên'
    },
    image: '/images/projects/eledevo-landing.jpg',
    banner: null,
    link: '/projects/eledevo-landing'
  },
  {
    slug: 'fruit-market',
    type: { en: 'Mobile App · React Native', vi: 'Ứng dụng Mobile · React Native' },
    title: 'The Fruit Market Application',
    subtitle: {
      en: 'E-commerce mobile app for fruit retail',
      vi: 'Ứng dụng e-commerce mobile cho bán lẻ trái cây'
    },
    description: {
      en: 'A React Native mobile application for browsing and purchasing fruit, with Redux + Saga state management and a Spring / Express RESTful backend persisting orders to MySQL / MongoDB.',
      vi: 'Ứng dụng mobile React Native để duyệt và mua trái cây, quản lý state bằng Redux + Saga, backend RESTful Spring / Express lưu đơn hàng vào MySQL / MongoDB.'
    },
    impact: {
      en: 'End-to-end retail mobile app built during the Eledevo Academy period',
      vi: 'Ứng dụng mobile bán lẻ end-to-end thực hiện trong giai đoạn Eledevo Academy'
    },
    image: '/images/projects/fruit-market.jpg',
    banner: null,
    link: '/projects/fruit-market'
  }
]

export function getAllProjects() {
  return [featuredProject, ...otherProjects]
}

export function getProjectCard(slug) {
  return getAllProjects().find((p) => p.slug === slug)
}
