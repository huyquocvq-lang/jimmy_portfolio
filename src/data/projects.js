export const featuredProject = {
  slug: 'mmp-cms',
  type: 'CMS Platform · Java Spring Boot',
  title: "MMP's CMS Website",
  headline: 'High-traffic CMS platform built on Java Spring Boot',
  subtitle:
    'A Java-based content management system designed for large datasets and high-traffic content delivery.',
  description:
    "Built a custom CMS using Java Spring Boot for MMP, focused on serving high-traffic content workloads with large editorial datasets. Designed the backend services, optimized MySQL queries, and exposed REST APIs powering the editorial workflows and public-facing pages.",
  tools:
    'Java · Spring Boot · MySQL · REST APIs · Apache · AWS · GitLab CI/CD',
  impact:
    'Production CMS optimized for high-traffic content delivery and large dataset operations.',
  image: '/images/projects/mmp-cms.jpg',
  banner: null,
  link: '/projects/mmp-cms'
}

export const otherProjects = [
  {
    slug: 'dentsu-cms',
    type: 'Headless CMS · Magnolia + React',
    title: "Dentsu's Headless CMS Website",
    subtitle: 'API-driven content management with Magnolia + React frontend',
    description:
      'Developed a headless CMS for Dentsu using Magnolia CMS for content modeling and a React-based frontend for delivery, with REST and GraphQL APIs powering seamless content rendering across channels.',
    impact: 'Enterprise headless content stack with API-driven delivery',
    image: '/images/projects/dentsu-cms.jpg',
    banner: null,
    link: '/projects/dentsu-cms'
  },
  {
    slug: 'yoolife',
    type: 'Mobile App · React Native',
    title: 'Yoolife Application',
    subtitle: 'Smart-living mobile app for urban residents',
    description:
      'A React Native mobile application for residents of smart urban areas - integrated with IoT devices, payment gateways (MoMo, VN Pay), and a Spring Boot + Nest.js microservices backend over MQTT and WebSocket.',
    impact: 'Consumer-facing IoT app handling real-time device control at scale',
    image: '/images/projects/yoolife.jpg',
    banner: null,
    link: '/projects/yoolife'
  },
  {
    slug: 'yooioc',
    type: 'Operations Platform · Microservices',
    title: 'YooIOC Application',
    subtitle: 'Urban operations management platform',
    description:
      'An operational management application for urban areas covering fundamental tasks like resident services, incident tracking, and device administration - powered by a Spring Boot + Nest.js microservices backend deployed on CMC Cloud.',
    impact: 'Central operations hub for smart-urban-area management',
    image: '/images/projects/yooioc.jpg',
    banner: null,
    link: '/projects/yooioc'
  },
  {
    slug: 'vnpt-portal',
    type: 'Portal · Liferay + Spring',
    title: 'VNPT Portal Information',
    subtitle: 'Liferay-based information portal with Spring Boot APIs',
    description:
      "Built customer-facing portal pages on Liferay backed by a Spring Boot REST API, with query optimization through Spring Data JPA and MySQL to support data-intensive portal features.",
    impact: 'Operational portal serving VNPT customer-facing information needs',
    image: '/images/projects/vnpt-portal.jpg',
    banner: null,
    link: '/projects/vnpt-portal'
  },
  {
    slug: 'eledevo-landing',
    type: 'Marketing Site · React',
    title: 'Eledevo Academy Landing Page',
    subtitle: 'Marketing landing page introducing Eledevo Academy',
    description:
      'A responsive marketing landing page introducing Eledevo Academy and its programs - built with React and Spring on the backend, following RESTful conventions for any data integrations.',
    impact: "Public-facing site supporting the academy's student recruitment",
    image: '/images/projects/eledevo-landing.jpg',
    banner: null,
    link: '/projects/eledevo-landing'
  },
  {
    slug: 'fruit-market',
    type: 'Mobile App · React Native',
    title: 'The Fruit Market Application',
    subtitle: 'E-commerce mobile app for fruit retail',
    description:
      'A React Native mobile application for browsing and purchasing fruit, with Redux + Saga state management and a Spring / Express RESTful backend persisting orders to MySQL / MongoDB.',
    impact: 'End-to-end retail mobile app built during the Eledevo Academy period',
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
