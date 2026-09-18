# Content source (authoring reference)

> **Not bundled in the app.** Long-form copy and project narratives used to map content into `src/data/*` and `src/projects/*`.
>
> - **Priority:** explicit user instructions in chat override this file.
> - **When to update:** on content-change requests, keep this file in sync as the mapping reference unless the user specifies different copy.
> - **Runtime source of truth:** `src/data/*` (homepage) and `src/projects/*` (case studies).
> - **Primary source:** [`Quoc Huy _ Resume.pdf`](./Quoc%20Huy%20_%20Resume.pdf) - the bundled resume PDF that drives the rest of this file.

## Bilingual content rule (EN / VI)

The portfolio ships in **English (default) + Vietnamese**. Each language has its own URL: English at `/...`, Vietnamese at `/vi/...` (same page, twin routes; the URL drives the language and both versions are prerendered + indexed with hreflang pairs). Every user-facing string in `src/data/*` and in the project JSX `CONTENT` consts is either:

- a plain string (proper nouns, framework / tech names, role titles, project names, URLs, dates) - rendered as-is in both languages, or
- a `{ en, vi }` pair (headings, prose, paragraphs, labels, button text) - rendered through `tr(value, lang)` from `src/utils/i18n.js`.

When updating copy:
- Update **both** languages in lockstep unless the change only affects one side.
- Tech terms (Spring Boot, React, MQTT, …) stay in English in both languages.
- Vietnamese copy uses dấu (đầy đủ) and em-dashes (-) rather than `--`.

---

# **Portfolio Homepage**

## **Hero Section** (v2 - HUD / dossier layout)

**Component:** `src/components/Hero.jsx` · **Background:** `<picture>` from `public/images/hero-banners/` (B&W filter + dim gradient) · **Theme:** charcoal `#0a0a0a` shell + bronze gold `#c5a47e` accents

**Layout:** CSS grid with 5 named areas - `tag` (top-left), `side` (right column), `main` (center-left), `contact` (bottom-left), `mark` (bottom-right). 4 bronze corner brackets frame the section.

### Hero text (driven by `profile.hud`)

| Slot | Copy |
|------|------|
| Top tag | `● PORTFOLIO / 2026 // AVAILABLE FOR HIRE` (green pulsing dot) |
| Eyebrow | `- Backend · Platform · Distributed Systems` |
| Title | `Quoc Huy / Jimmy` (`Jimmy` italic + bronze) |
| Subtitle | `Senior Backend & Platform Software Engineer.` |
| Title behaviour | `Quoc Huy / Jimmy` always stays on a single line (`flex-wrap: nowrap; white-space: nowrap`) so the Vietnamese + English name never split across two lines |
| Scale proof | `1-2M users served` · `~$10M/mo lending disbursement` · `500K+ IoT devices` — shown directly under the subtitle so recruiter-facing evidence appears before stack details |
| Skill chips | `Java · Spring Boot` · `Microservices · Camunda` · `NestJS · Realtime Systems` · `MQTT · IoT · Edge` (compact core signals only; broader stack stays in Skills / marquee) |
| Side chip 1 | `// EXPERIENCE` → `5+ years · Professional` |
| Side chip 2 | `// BASED IN` → `Hanoi · GMT+7` |
| Side chip 3 | `// ALSO DOES` → `Full-stack · Mobile · IoT` |
| Side chip 4 | `// STATUS` → `OPEN TO HIRE ✓` (green accent via `accent: 'available'` on the chip) |
| Focus row (in main column) | `// FOCUS` → `Fintech · Distributed Systems · AIoT` (bronze accent value) |
| Contact: Email | `huyquoc.vq@gmail.com` |
| Contact: Phone | `+84 0345 475 336` |
| Contact: LinkedIn | `linkedin.com/in/quoc-huy` (handle); link target `https://linkedin.com/in/quoc-huy-16b896277` |
| Monogram | `SE/26` + `ENGINEERING SINCE 2019` |

### Tagline & intro (for nav/footer/meta reuse, not rendered in hero v2)

**Tagline:** Backend and platform engineer building production systems where software meets money, devices, and scale - with full-stack and mobile experience when the product needs it.

**Intro:** I build and operate backend-heavy production systems across fintech and AIoT, from Java/Spring Boot services and workflow orchestration to realtime messaging and partner integrations. I can own the product end-to-end when needed across React, React Native, and platform infrastructure, and I have led teams of five to ten engineers.

**Contact (full):**

- Email: huyquoc.vq@gmail.com
- Phone: +84-345-475-336 (display `+84 0345 475 336`)
- LinkedIn: https://linkedin.com/in/quoc-huy-16b896277
- GitHub: https://github.com/huyquocvq-lang
- Resume: currently unavailable in the repository; `profile.contact.resume` stays `null` so the CTA remains hidden until a real public PDF is added.

---

## **Impact Highlights**

Tabbed grid driven by `src/data/stats.js → impactTabs[]`. Four tabs: **Overall · LMS · IoT · CMS** (LMS = Lending Management System, not Learning).

**Overall** (4 tiles):
- **10-15 / team** - Team size led across projects; assigning tasks, tracking progress, running code reviews, and evaluating performance.
- **20+** - Production systems shipped across telco-fintech, community, smart-home, and enterprise CMS domains.
- **1-2M users** - Flagship products serving 1-2 million end users in production.
- **10+ clients** - Worked with enterprises, fintech partners, agencies, and individuals.

**LMS - Lending Management System** (5 tiles):
- **5+ partners** - Consumer-lending partners integrated into the orchestration platform: CAKE, VEGA, TINVAY, and more.
- **+$10M / mo** - Monthly disbursement processed by the lending orchestration platform, serving customers in the millions.
- **24/7** - Production system runs 24/7 with high SLA; minimal downtime across the disbursement pipeline.
- **+20% perf** - Pipeline performance lifted ~20% after optimization passes; throughput up, latency down.
- **99.9% success** - Transaction success rate sustained at 99.9% across end-to-end disbursement and reconciliation.

**IoT** (6 tiles):
- **500K+** - Smart-home devices live on the Yoohome AIoT platform.
- **10K+** - Custom Zigbee gateways shipped nationwide (Node.js + Zigbee2MQTT on Rockchip embedded hardware).
- **112K msg/s** - Peak MQTT throughput sustained on the Yoohome message backbone.
- **5 vendors** - IoT ecosystems integrated end-to-end (Tuya, Legrand, Schneider Electric, Panasonic, Rang Dong).
- **Edge AI** - YOLO + OpenCV vision modules run directly on the gateway for fire and fall/stroke detection.
- **Offline-first** - Gateway firmware keeps automation, sessions, and data integrity intact through cloud outages.

**CMS** (5 tiles):
- **10K+** - Users supported on the multi-site CMS in production (editorial approval workflows + personalization rules).
- **1M+ views/mo** - MMP CMS (custom Java Spring Boot stack) serving 1M+ page views per month.
- **Headless** - Magnolia + React headless stack; REST and GraphQL APIs powering cross-channel delivery.
- **~50% faster** - AI agent integrated into the CMS cuts sales-content drafting time roughly in half.
- **20+ rules** - Personalization rules running in production: location, time of day, age, audience segment.

Hero strip mirror (3 stats, legacy `heroStats` export): `5+ yrs · Professional engineering`, `10-15 · Team members led`, `20+ · Production systems shipped`.

---

# **About Me**

**Component:** `src/components/AboutSkills.jsx` (left column) · **Data:** `src/data/about.js`

**Heading:** I build backend-heavy systems where correctness matters: money movement, realtime devices, and production workflows.

**Paragraph 1:** More than five years of professional software engineering across lending platforms, smart-home AIoT, and enterprise CMS, with a focus on backend-heavy production systems that handle high traffic and complex integrations.

**Paragraph 2:** My strongest work is usually backend and platform ownership: service boundaries, workflows, partner integrations, realtime messaging, failure handling, and the operational details that keep systems dependable in production. I can still move across web and mobile when the product needs end-to-end delivery.

**Paragraph 3:** I have also led teams of five to ten engineers through planning, code review, mentoring, and delivery. The direction I am growing toward is technical leadership that stays close to architecture and production systems, not management detached from the code.

**Tech marquee** (mounted at the bottom of the section via `<TechMarquee />`, list in `src/data/skills.js → techMarquee`): Java · Spring Boot · NestJS · Node.js · React · React Native · Next.js · TypeScript · gRPC · GraphQL · REST · WebSocket · MQTT · Camunda BPM · Magnolia CMS · Liferay · MySQL · MongoDB · Redis · Docker · Kubernetes · AWS · CMC Cloud · GitLab CI/CD · AI Agents · LLM Integration · Prompt Engineering · YOLO · OpenCV · Zigbee · Z-Wave · BLE

---

# **Skills**

**Component:** `src/components/AboutSkills.jsx` (right column) · **Data:** `src/data/skills.js`, `src/data/skillIcons.js`

| Icon key | Title | Description |
|----------|-------|-------------|
| `backend`  | Backend & Platform | Java · Spring Boot · NestJS · Microservices · Camunda BPM · gRPC · REST · Realtime systems |
| `frontend` | Product Frontend | ReactJS · Next.js · WordPress · Headless CMS integration · Responsive UI · State management (Redux) |
| `cms`      | Enterprise CMS | Magnolia CMS · Liferay · Custom modules · API-driven content · Headless content delivery |
| `mobile`   | Mobile & Native | React Native · Native modules (Java, Swift, Objective-C) · Redux/Saga · Payment SDKs (MoMo, VN Pay) |
| `data`     | Data & Infrastructure | MySQL · MongoDB · SQL Server · Docker · Kubernetes · AWS · CMC Cloud · Apache · GitLab CI/CD |
| `iot`      | IoT & Edge Systems | Zigbee · Z-Wave · BLE · Home gateway firmware · YOLO · OpenCV · Fire & stroke detection |

---

# **Work Experience**

> Homepage order: this section is rendered immediately after Impact, before Education, to prioritize professional experience for senior-role recruiting.

**Anchor:** `#experience` · **Component:** `src/components/Experience.jsx` · **Data:** `src/data/experience.js`

**Company logos:** each entry supports an optional `logo` path. Use a normalized 512×512 PNG at `public/images/logos/<slug>.png` with a white rounded-square background, transparent corners, and tight centered content using roughly 34px outer padding, then set `logo: '/images/logos/<slug>.png'` on the corresponding entry. The current canonical assets are `eledevo.png`, `htc.png`, `smartosc.png`, `viettel.png`, and `yootek.png`. The image renders directly to the right of the role + company block with no extra border/card chrome. Leave as `null` to skip.

### Viettel Digital - Software Development Specialist · current
Hanoi Capital Region · Jul 2025 – Present · website https://viettel.com.vn

Achievement bullets:
- Build Java / Spring Boot services for a digital lending platform processing up to USD 10M in monthly disbursement.
- Integrate payment and lending-partner flows across the loan lifecycle, including cash-flow and disbursement paths.
- Contribute to platform design for scalability, security, high availability, and transaction integrity across shared lending services.
- Implement Camunda BPM workflows covering application, decisioning, partner hand-offs, and disbursement.

**Technologies:** Java · Native Mobile App · Camunda BPM · Financial System Integration
**Scale:** Up to USD 10M monthly disbursement on the digital lending platform

### SmartOSC - Senior Java Engineer
19F Handico Tower, Pham Hung St, Nam Tu Liem, Hanoi · Oct 2023 – Jun 2025 · website https://www.smartosc.com

Achievement bullets:
- Built Magnolia CMS solutions for enterprise multi-site clients, including custom modules, editorial workflows, and performance tuning.
- Shipped Java backend services, optimized MySQL queries, and delivered REST / GraphQL APIs for headless content distribution.
- Integrated React headless frontends with shared CMS content models to avoid duplicated templates across channels.
- Hardened Apache / Tomcat production configuration and improved runtime stability under load.
- Set up GitLab CI/CD for automated test / deploy flows and mentored junior engineers through code review.

**Technologies:** Magnolia CMS · Java Core · Spring Boot · MySQL · React · Apache · AWS · GitLab CI/CD
**Outstanding projects:** MMP's CMS Website (Java Spring Boot · high-traffic optimization) · Dentsu's Headless CMS (Magnolia + React)

### YooTek Holdings - Full Stack Developer
Nam Tu Liem, Hanoi · Aug 2021 – Feb 2024

Achievement bullets:
- Built Java Spring Boot / NestJS microservices and tuned MySQL, MongoDB, WebSocket, and MQTT paths for high-traffic IoT workloads.
- Shipped React Native applications with Java / Swift native modules and Redux-based state management.
- Integrated MoMo / VNPay and multi-vendor IoT ecosystems including Legrand, Schneider Electric, and Tuya; deployed with Docker / Kubernetes.
- Designed smart-home gateway capabilities across Zigbee, Z-Wave, and BLE, including edge AI modules with YOLO / OpenCV.
- Led a 5-10 engineer team across planning, implementation coordination, code review, mentoring, and delivery tracking.

**Technologies:** Spring Boot · React Native · Python · Node.js · NestJS · MQTT · RabbitMQ · Microservices · MongoDB · Docker · Kubernetes
**Outstanding projects:** Yoolife (urban residents app) · YooIOC (urban operations management app)

### Hanoi Telecom Corporation - Java Developer
My Dinh 1, Hanoi · Nov 2020 – Mar 2021

Achievement bullets:
- Built customer-facing Liferay portals and Spring Boot REST services.
- Optimized Spring Data JPA / MySQL access patterns for data-heavy portal features.
- Contributed to requirements analysis and delivery tracking with the product team.

**Technologies:** Spring Framework · MySQL · Liferay · Java · Git · Trello
**Outstanding projects:** VNPT Portal Information

### Eledevo Academy - Full Stack Developer & IT Lecturer
Hanoi · Aug 2019 – Sep 2020

Achievement bullets:
- Progressed from Java intern to a part-time full-stack and teaching role.
- Built Spring / Express APIs and shipped React / React Native applications with Redux / Saga.
- Taught programming fundamentals through hands-on Spring, Node.js, and React CRUD projects.
- Mentored 1-3 interns per cohort through onboarding and project delivery.

**Technologies:** Spring Framework · React · React Native · JavaScript · Java · MySQL · MongoDB
**Outstanding projects:** Eledevo Academy landing page · The Fruit Market application

---

---

# **Education**

> Homepage order: Education is rendered after Work Experience.

**Anchor:** `#education` · **Component:** `src/components/Education.jsx` · **Data:** `src/data/education.js`

1. **Hanoi University of Science and Technology** - Engineering Degree, Computer Engineering · Hanoi, Vietnam · Aug 2018 – Aug 2023 · CPA 3.25 / 4.0 · Engineering degree: Very Good
   - Graduation topic: a platform to connect, manage, and control smart devices from separate manufacturers, with data collection and recommended actions for the user.

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

# **Personal Interest**

**Anchor:** `#personal` · **Component:** `src/components/PersonalInterest.jsx` · **Data:** `src/data/personal.js`

**Eyebrow:** Personal Interest
**Heading:** A little more about me - outside of work.

**Copy:** Outside engineering, I run a small clothing shop and have worked as MC / company spokesperson for smart-home product launches. Those experiences sharpened negotiation, technical communication, live Q&A, and product empathy.

**Languages:** Vietnamese, English.

**Images:** Curated 3-image strip using `personal_2.jpeg`, `personal_5.jpeg`, and `personal_8.jpeg`. Desktop/tablet show a compact 3-column grid; mobile stacks to one column. The section is intentionally smaller than the engineering sections.

---

# **Suggested Tagline Options**

- I build resilient fullstack systems - from CMS platforms and headless storefronts to IoT gateways and microservice backends.
- Four years of fullstack engineering across CMS, IoT, and mobile - shipped to production.
- Leading small teams, owning systems end-to-end.

---

# **Blog**

**Anchor:** `id="blog"` · **Homepage section:** `src/components/Blogs.jsx` · **List page:** `/blog` → `src/pages/BlogListPage.jsx` · **Detail page:** `/blog/:slug` → `src/pages/BlogDetailPage.jsx` · **Data:** `src/data/blog.ts`

The homepage shows a single-row horizontal slider with newest posts; the `View all →` link routes to a paginated list page (9 posts per page). Each post has its own detail page rendered from a structured `body` array.

## Authoring rules

- One object per post in the `blog` array (`src/data/blog.ts`).
- Required: `slug`, `title`, `excerpt`, `date` (ISO `YYYY-MM-DD`), `tags` (plain strings), `body` (array of blocks). Optional: `cover` (path under `/images/blog/<slug>.jpg`), `readMinutes`.
- Text fields (`title`, `excerpt`, block text, image alt/caption) are `{ en, vi }` pairs - same bilingual rule as elsewhere.
- Tags / code snippets / language labels stay as plain strings.
- Block types: `paragraph`, `heading` (level 2 or 3), `list` (items: translatable strings), `code` (`{ lang, code }`), `quote`, `callout`, `image` (`{ src, alt, caption? }`), `html` (`{ html }` - author-only raw markup, rendered via dangerouslySetInnerHTML), `video` (`{ src, embed?, poster?, title?, caption? }` - native `<video>` or `<iframe>` embed when `embed: true`).

## Seed posts (current)

| Slug | Title | Date |
|------|-------|------|
| `building-high-traffic-cms-with-spring-boot` | Building a high-traffic CMS with Java Spring Boot | 2025-09-12 |
| `going-headless-with-magnolia-and-react` | Going headless with Magnolia + React | 2025-07-04 |
| `bridging-zigbee-zwave-ble-in-one-gateway` | Bridging Zigbee, Z-Wave and BLE in one home gateway | 2024-11-18 |
| `leading-a-small-engineering-team` | Notes on leading a 5-10 person engineering team | 2024-03-22 |
| `running-zigbee2mqtt-in-production` | Running Zigbee2MQTT in production: what actually breaks | 2026-04-30 |
| `kafka-vs-redis-choosing-the-backbone` | Kafka vs Redis: choosing the backbone for async work | 2026-03-15 |
| `javascript-tricks-i-reach-for` | JavaScript tricks I reach for every week | 2026-02-02 |

> The three 2026 posts demo the new block types: `running-zigbee2mqtt-in-production` uses `video` (both embed + native), `kafka-vs-redis-choosing-the-backbone` uses an `html` comparison table. Video media paths (`/videos/blog/*.mp4`, the YouTube `VIDEO_ID`) are placeholders to replace with real assets.

---

For the website, avoid uploading internal screenshots, confidential client data, or proprietary code from past employers. Use anonymized summaries and architectural descriptions that show the engineering thinking without exposing company-specific details.

### Case-study ownership rule

Every shipped project case study now includes a **My Contribution / Ownership** section immediately after Context / Role. This section must describe only work Jimmy personally owned or directly contributed to.

Each case study also separates **System Scale** from **My Impact**:
- **System Scale** = production reach, throughput, deployment size, or product scope belonging to the overall system/team.
- **My Impact** = outcomes attributable to Jimmy's own work. Use qualitative outcomes when a defensible personal metric is unavailable; never convert a project-wide number into personal impact without evidence.
