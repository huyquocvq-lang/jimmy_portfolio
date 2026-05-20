# Content source (authoring reference)

> **Not bundled in the app.** Long-form copy and project narratives used to map content into `src/data/*` and `src/projects/*`.
>
> - **Priority:** explicit user instructions in chat override this file.
> - **When to update:** on content-change requests, keep this file in sync as the mapping reference unless the user specifies different copy.
> - **Runtime source of truth:** `src/data/*` (homepage) and `src/projects/*` (case studies).
> - **Primary source:** [`Quoc Huy _ Resume.pdf`](./Quoc%20Huy%20_%20Resume.pdf) - the bundled resume PDF that drives the rest of this file.

## Bilingual content rule (EN / VI)

The portfolio ships in **English (default) + Vietnamese**. Every user-facing string in `src/data/*` and in the project JSX `CONTENT` consts is either:

- a plain string (proper nouns, framework / tech names, role titles, project names, URLs, dates) - rendered as-is in both languages, or
- a `{ en, vi }` pair (headings, prose, paragraphs, labels, button text) - rendered through `tr(value, lang)` from `src/utils/i18n.js`.

When updating copy:
- Update **both** languages in lockstep unless the change only affects one side.
- Tech terms (Spring Boot, React, MQTT, …) stay in English in both languages.
- Vietnamese copy uses dấu (đầy đủ) and em-dashes (—) rather than `--`.

---

# **Portfolio Homepage**

## **Hero Section** (v2 - HUD / dossier layout)

**Component:** `src/components/Hero.jsx` · **Background:** `<picture>` from `public/hero-banners/` (B&W filter + dim gradient) · **Theme:** charcoal `#0a0a0a` shell + bronze gold `#c5a47e` accents

**Layout:** CSS grid with 5 named areas - `tag` (top-left), `side` (right column), `main` (center-left), `contact` (bottom-left), `mark` (bottom-right). 4 bronze corner brackets frame the section.

### Hero text (driven by `profile.hud`)

| Slot | Copy |
|------|------|
| Top tag | `● PORTFOLIO / 2026 // AVAILABLE FOR HIRE` (green pulsing dot) |
| Eyebrow | `— Senior Software Engineer` |
| Title | `Quoc Huy / Jimmy` (`Jimmy` italic + bronze) |
| Subtitle | `Senior Fullstack` / `Software Engineer.` (second line italic) |
| Skill chips | Java · Spring Boot · React · React Native · Node.js · gRPC · Microservices · Magnolia · Liferay CMS · MySQL · MongoDB · C · C++ · Python · Objective-C (first two pills filled bronze, rest outlined) |
| Side chip 1 | `// EXPERIENCE` → `4+ years · Senior` |
| Side chip 2 | `// BASED IN` → `Hanoi · GMT+7` |
| Side chip 3 | `// ALSO DOES` → `Tech Lead · Firmware` |
| Side chip 4 | `// STATUS` → `OPEN TO HIRE ✓` (green accent via `accent: 'available'` on the chip) |
| Contact: Email | `huyquoc.vq@gmail.com` |
| Contact: Phone | `+84 0345 475 336` |
| Contact: LinkedIn | `linkedin.com/in/quoc-huy` (handle); link target `https://linkedin.com/in/quoc-huy-16b896277` |
| Monogram | `SE/26` + `SENIOR · EST. 2019` |

### Tagline & intro (for nav/footer/meta reuse, not rendered in hero v2)

**Tagline:** I build resilient fullstack systems - from CMS platforms and headless storefronts to IoT gateways and microservice backends.

**Intro:** I have four years of experience as a Full-Stack Engineer, specializing in CMS systems and IoT. I have led development teams, built and managed both frontend and backend systems, and ensured seamless integration. My goal is to become a strong tech leader, continuously learning and sharing knowledge to drive innovation.

**Contact (full):**

- Email: huyquoc.vq@gmail.com
- Phone: +84-345-475-336 (display `+84 0345 475 336`)
- LinkedIn: https://linkedin.com/in/quoc-huy-16b896277
- GitHub: (not provided)
- Resume: bundled PDF at `docs/Quoc Huy _ Resume.pdf`

---

## **Impact Highlights**

Six-tile grid driven by `src/data/stats.js → impactHighlights`:

- **4+ yrs** - Fullstack engineering across CMS platforms, microservices backends, mobile apps, and IoT gateways.
- **5-10** - Team members led at YooTek Holdings; assigned tasks, tracked progress, and reviewed performance.
- **100K+** - Concurrent IoT devices coordinated through the home gateway over Zigbee, Z-Wave, BLE, MQTT, and WebSocket.
- **Headless** - Magnolia CMS + React headless content stack delivered for Dentsu - API-driven content management at enterprise scale.
- **AI on-device** - YOLO + OpenCV computer-vision modules integrated for fire and stroke detection on the smart-home gateway.
- **2 gateways** - Payment gateways (MoMo, VN Pay) and IoT device partners (Legrand, Schneider Electric, Tuya) integrated end-to-end.

Hero strip mirror (3 stats): `4+ yrs · Fullstack experience`, `5-10 · Team members led`, `10+ · Production systems shipped`.

---

# **About Me**

**Component:** `src/components/AboutSkills.jsx` (left column) · **Data:** `src/data/about.js`

**Heading:** Working at the intersection of CMS platforms, backend services, and IoT systems.

**Paragraph 1:** I bring four years of fullstack engineering experience across CMS platforms, microservice backends, mobile applications, and IoT gateways - with a focus on shipping production systems that handle high traffic and complex device integrations.

**Paragraph 2:** One of my strongest areas is owning a system end-to-end: building Java Spring Boot and Nest.js backends, integrating with MySQL and MongoDB at scale, wiring up MQTT and WebSocket pipelines for real-time telemetry, and exposing the result through React, React Native, and headless CMS frontends.

**Paragraph 3:** I have led development teams of 5 to 10 engineers, mentored junior developers, and pushed best practices around CI/CD, code review, and clean architecture. My goal is to keep growing into a strong technical leader who learns continuously and shares knowledge to drive innovation.

---

# **Skills**

**Component:** `src/components/AboutSkills.jsx` (right column) · **Data:** `src/data/skills.js`, `src/data/skillIcons.js`

| Icon key | Title | Description |
|----------|-------|-------------|
| `backend`  | Backend Engineering | Java Spring Boot · Node.js · NestJS · gRPC · Microservices · REST · GraphQL · WebSocket · MQTT |
| `frontend` | Web Frontend | ReactJS · Next.js · WordPress · Headless CMS integration · Responsive UI · State management (Redux) |
| `cms`      | CMS Frameworks | Magnolia CMS · Liferay · Custom modules · API-driven content · Headless content delivery |
| `mobile`   | Mobile Development | React Native · Native modules (Java, Swift, Objective-C) · Redux/Saga · Payment SDKs (MoMo, VN Pay) |
| `data`     | Databases & Infra | MySQL · MongoDB · SQL Server · Docker · Kubernetes · AWS · CMC Cloud · Apache · GitLab CI/CD |
| `iot`      | IoT & AI Modules | Zigbee · Z-Wave · BLE · Home gateway firmware · YOLO · OpenCV · Fire & stroke detection |

---

# **Education**

**Anchor:** `#education` · **Component:** `src/components/Education.jsx` · **Data:** `src/data/education.js`

1. **Hanoi University of Science and Technology** - Engineering Degree, Computer Engineering · Hanoi, Vietnam · Aug 2018 – Aug 2023 · CPA 3.25 / 4.0 · Engineering degree: Very Good
   - Graduation topic: a platform to connect, manage, and control smart devices from separate manufacturers, with data collection and recommended actions for the user.

---

# **Work Experience**

**Anchor:** `#experience` · **Component:** `src/components/Experience.jsx` · **Data:** `src/data/experience.js`

### SmartOSC - Senior Java Engineer
19F Handico Tower, Pham Hung St, Nam Tu Liem, Hanoi · Oct 2023 – Present

Developed and maintained Magnolia CMS solutions, optimized performance, and built custom modules for enterprise content workflows. Built Java-based backend services, optimized MySQL queries, and developed RESTful and GraphQL APIs powering headless content delivery. Created and integrated a React-based headless frontend for seamless content rendering across web channels. Managed Apache configurations, improved security posture, and optimized system performance under production load. Implemented GitLab CI/CD pipelines for automated testing and deployment, and mentored junior developers on best practices and code quality.

**Technologies:** Magnolia CMS · Java Core · Spring Boot · MySQL · React · Apache · AWS · GitLab CI/CD
**Outstanding projects:** MMP's CMS Website (Java Spring Boot · high-traffic optimization) · Dentsu's Headless CMS (Magnolia + React)

### YooTek Holdings - Full Stack Developer
Nam Tu Liem, Hanoi · Aug 2021 – Feb 2024

Built a microservices backend with Java Spring Boot and Nest.js, optimizing MySQL, MongoDB, WebSocket, and MQTT pipelines to handle high-traffic IoT and consumer systems. Developed mobile applications with React Native, integrated native modules in Java and Swift, and managed application state with Redux. Integrated payment gateways (MoMo, VN Pay) and IoT devices (Legrand, Schneider Electric, Tuya), and deployed services on CMC Cloud using Docker and Kubernetes. Developed a home gateway for smart devices over Zigbee, Z-Wave, and BLE, and implemented AI modules with YOLO and OpenCV for fire and stroke detection. Led a team of 5-10 engineers - assigned tasks, tracked progress, ran code reviews, and evaluated performance.

**Technologies:** Spring Boot · React Native · Python · Node.js · NestJS · MQTT · RabbitMQ · Microservices · MongoDB · Docker · Kubernetes
**Outstanding projects:** Yoolife (urban residents app) · YooIOC (urban operations management app)

### Hanoi Telecom Corporation - Java Developer
My Dinh 1, Hanoi · Nov 2020 – Mar 2021

Used the Liferay framework to construct customers' websites and built backend services with Spring Boot following REST API conventions. Researched algorithms and query optimization with Spring Data JPA and MySQL to support data-intensive portal features. Participated in business analysis and used tools like Trello and GitHub to monitor progress with the team.

**Technologies:** Spring Framework · MySQL · Liferay · Java · Git · Trello
**Outstanding projects:** VNPT Portal Information

### Eledevo Academy - Full Stack Developer & IT Lecturer
Hanoi · Aug 2019 – Sep 2020

Started as a Java intern at Eledevo Academy and later transitioned to a part-time role focused on production work and teaching. Developed APIs with Spring and Express following RESTful principles, and built web and mobile applications using React and React Native with Redux and Saga. Taught basic programming, helping students build CRUD-based applications with Spring, Node.js, and React. Supported employees and led a team of 1 to 3 interns through onboarding and project delivery.

**Technologies:** Spring Framework · React · React Native · JavaScript · Java · MySQL · MongoDB
**Outstanding projects:** Eledevo Academy landing page · The Fruit Market application

---

# **Personal Interest**

**Anchor:** `#personal` · **Component:** `src/components/PersonalInterest.jsx` · **Data:** `src/data/personal.js`

**Eyebrow:** Personal Interest
**Heading:** A little more about me - outside of work.

**Paragraph 1:** Outside of code, I love to travel and discover new lands, food, and people. I describe myself as strong, assertive, and someone who genuinely enjoys challenges - which is probably why I keep gravitating toward complex systems at work.

**Paragraph 2:** I also founded a small clothing store, where I handle supplier negotiation, online sales content, and the Facebook page. On top of that, I have served as the MC and company spokesperson for several smart-home and automation product launches - presenting new product features at launches and related events.

**Paragraph 3:** "Learn from yesterday, live for today, hope for tomorrow." I try to keep improving new skills, sharing knowledge, and finding small ways to balance the analytical side of engineering with the creative side of building a brand.

**Languages:** Vietnamese, English.

**Images:** Pinterest-style masonry wall built from `public/images/personal/personal_1.jpeg` … `personal_8.jpeg` (ordered chronologically by EXIF date taken). CSS `column-count: 3 / 2 / 1` responsive; hover scales image to 1.05.

---

# **Projects (7 total: 1 featured + 6 others)**

Card data is the runtime contract in `src/data/projects.js`. Each project has its own dedicated `*.jsx` and `*.css` (no shared template).

| # | Slug | Title | Route | JSX | CSS |
|---|------|-------|-------|-----|-----|
| 01 (Featured) | `mmp-cms` | MMP's CMS Website | `/projects/mmp-cms` | `MmpCmsProject.jsx` | `mmp-cms.css` |
| 02 | `dentsu-cms` | Dentsu's Headless CMS Website | `/projects/dentsu-cms` | `DentsuCmsProject.jsx` | `dentsu-cms.css` |
| 03 | `yoolife` | Yoolife Application | `/projects/yoolife` | `YoolifeProject.jsx` | `yoolife.css` |
| 04 | `yooioc` | YooIOC Application | `/projects/yooioc` | `YooIocProject.jsx` | `yooioc.css` |
| 05 | `vnpt-portal` | VNPT Portal Information | `/projects/vnpt-portal` | `VnptPortalProject.jsx` | `vnpt-portal.css` |
| 06 | `eledevo-landing` | Eledevo Academy Landing Page | `/projects/eledevo-landing` | `EledevoLandingProject.jsx` | `eledevo-landing.css` |
| 07 | `fruit-market` | The Fruit Market Application | `/projects/fruit-market` | `FruitMarketProject.jsx` | `fruit-market.css` |

---

## Project 1 (Featured): MMP's CMS Website

**Type:** CMS Platform · Java Spring Boot
**Headline:** High-traffic CMS platform built on Java Spring Boot
**Subtitle:** A Java-based content management system designed for large datasets and high-traffic content delivery.
**Tools:** Java · Spring Boot · MySQL · REST APIs · Apache · AWS · GitLab CI/CD
**Impact:** Production CMS optimized for high-traffic content delivery and large dataset operations.
**From resume:** "MMP's CMS Website: Built a CMS website using Java Spring Boot, optimized for high traffic and large datasets." (SmartOSC, Oct 2023 – Present)

## Project 2: Dentsu's Headless CMS Website

**Type:** Headless CMS · Magnolia + React
**Subtitle:** API-driven content management with Magnolia + React frontend
**Impact:** Enterprise headless content stack with API-driven delivery
**From resume:** "Dentsu's CMS Website (Headless CMS): Developed a headless CMS with Magnolia and React, ensuring seamless API-driven content management." (SmartOSC)

## Project 3: Yoolife Application

**Type:** Mobile App · React Native
**Subtitle:** Smart-living mobile app for urban residents
**Impact:** Consumer-facing IoT app handling real-time device control at scale
**From resume:** "Yoolife Application: An application designed for residents of urban areas." (YooTek Holdings, Aug 2021 – Feb 2024)

## Project 4: YooIOC Application

**Type:** Operations Platform · Microservices
**Subtitle:** Urban operations management platform
**Impact:** Central operations hub for smart-urban-area management
**From resume:** "YooIOC Application: An application designed for the operational management of urban areas, focusing on fundamental tasks." (YooTek Holdings)

## Project 5: VNPT Portal Information

**Type:** Portal · Liferay + Spring
**Subtitle:** Liferay-based information portal with Spring Boot APIs
**Impact:** Operational portal serving VNPT customer-facing information needs
**From resume:** "VNPT portal information" outstanding project under Hanoi Telecom Corporation, Nov 2020 – Mar 2021.

## Project 6: Eledevo Academy Landing Page

**Type:** Marketing Site · React
**Subtitle:** Marketing landing page introducing Eledevo Academy
**Impact:** Public-facing site supporting the academy's student recruitment
**From resume:** "Landing page to introduce Eledevo Academy" outstanding project under Eledevo Academy, Aug 2019 – Sep 2020.

## Project 7: The Fruit Market Application

**Type:** Mobile App · React Native
**Subtitle:** E-commerce mobile app for fruit retail
**Impact:** End-to-end retail mobile app built during the Eledevo Academy period
**From resume:** "The Fruit Market application" outstanding project under Eledevo Academy.

---

# **Suggested Tagline Options**

- I build resilient fullstack systems - from CMS platforms and headless storefronts to IoT gateways and microservice backends.
- Four years of fullstack engineering across CMS, IoT, and mobile - shipped to production.
- Leading small teams, owning systems end-to-end.

---

# **Blog**

**Anchor:** `id="blog"` · **Homepage section:** `src/components/Blogs.jsx` · **List page:** `/blog` → `src/pages/BlogListPage.jsx` · **Detail page:** `/blog/:slug` → `src/pages/BlogDetailPage.jsx` · **Data:** `src/data/blog.js`

The homepage shows a single-row horizontal slider with newest posts; the `View all →` link routes to a paginated list page (9 posts per page). Each post has its own detail page rendered from a structured `body` array.

## Authoring rules

- One object per post in the `blog` array (`src/data/blog.js`).
- Required: `slug`, `title`, `excerpt`, `date` (ISO `YYYY-MM-DD`), `tags` (plain strings), `body` (array of blocks). Optional: `cover` (path under `/images/blog/<slug>.jpg`), `readMinutes`.
- Text fields (`title`, `excerpt`, block text, image alt/caption) are `{ en, vi }` pairs - same bilingual rule as elsewhere.
- Tags / code snippets / language labels stay as plain strings.
- Block types: `paragraph`, `heading` (level 2 or 3), `list` (items: translatable strings), `code` (`{ lang, code }`), `quote`, `callout`, `image` (`{ src, alt, caption? }`).

## Seed posts (current)

| Slug | Title | Date |
|------|-------|------|
| `building-high-traffic-cms-with-spring-boot` | Building a high-traffic CMS with Java Spring Boot | 2025-09-12 |
| `going-headless-with-magnolia-and-react` | Going headless with Magnolia + React | 2025-07-04 |
| `bridging-zigbee-zwave-ble-in-one-gateway` | Bridging Zigbee, Z-Wave and BLE in one home gateway | 2024-11-18 |
| `leading-a-small-engineering-team` | Notes on leading a 5-10 person engineering team | 2024-03-22 |

---

For the website, avoid uploading internal screenshots, confidential client data, or proprietary code from past employers. Use anonymized summaries and architectural descriptions that show the engineering thinking without exposing company-specific details.
