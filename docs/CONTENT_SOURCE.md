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
| Subtitle | `Senior Backend Engineer — Fintech & AIoT` |
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

**Tagline:** Backend engineer building production systems where software meets money, devices, and scale - with full-stack and mobile experience when the product needs it.

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
- **5-10 / team** - Team size led across projects; planning, implementation coordination, code reviews, mentoring, and delivery tracking.
- **5+ years** - Professional software engineering across fintech, AIoT, enterprise CMS, web, and mobile delivery.
- **1-2M users** - Flagship products serving 1-2 million end users in production.
- **End-to-end** - Hands-on ownership spanning backend services, workflow orchestration, realtime systems, mobile clients, and production infrastructure.

**LMS - Lending Management System** (5 tiles):
- **5+ partners** - Consumer-lending partners integrated into the orchestration platform: CAKE, VEGA, TINVAY, and more.
- **+$10M / mo** - Monthly disbursement processed by the lending orchestration platform, serving customers in the millions.
- **24/7** - Production system runs 24/7 with high SLA; minimal downtime across the disbursement pipeline.
- **Multi-product** - Multiple lending products share one orchestration platform while keeping product-specific policies and partner flows isolated.
- **Camunda BPM** - Workflow orchestration spans application, decisioning, partner hand-offs, and disbursement.

**IoT** (6 tiles):
- **500K+** - Smart-home devices live on the Yoohome AIoT platform.
- **10K+** - Custom Zigbee gateways shipped nationwide (Node.js + Zigbee2MQTT on Rockchip embedded hardware).
- **5 vendors** - IoT ecosystems integrated end-to-end (Tuya, Legrand, Schneider Electric, Panasonic, Rang Dong).
- **Edge AI** - YOLO + OpenCV vision modules run directly on the gateway for fire and fall/stroke detection.
- **Offline-first** - Gateway firmware keeps automation, sessions, and data integrity intact through cloud outages.

**CMS** (5 tiles):
- **10K+** - Users supported on the multi-site CMS in production (editorial approval workflows + personalization rules).
- **3 sites** - Multi-site Magnolia setup with one authoring environment feeding three public delivery instances.
- **Headless** - Magnolia + React headless stack; REST and GraphQL APIs powering cross-channel delivery.
- **Workflow** - Editorial approval and role hand-offs built into the CMS authoring flow.
- **Personalized** - Rule-driven experiences by location, time, age group, and audience segment.

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

## Yoohome - Smart Home & AIoT Platform (current case study, `yoohome`)

Runtime: `src/data/projects.js` (card) + `src/projects/YoohomeProject.jsx` (full copy, EN/VI pairs). Last content pass: 2026-09-22 (owner chat instructions - these override the notes below).

**Type:** AIoT Platform · NestJS + React Native + MQTT · **Role:** Fullstack Developer · Tech Lead (YooTek Holdings, Aug 2021 – Feb 2024)
**Card impact:** 500K+ devices and 10K+ users in production across 10+ buildings and 1,000+ apartments.
**Product reference:** https://yootek.vn/tin-tuc-su-kien/yoohome-giai-phap-nha-thong-minh-dot-pha-cho-cuoc-song-hien-dai/ (14 device groups, AI "quản gia" that learns habits, wake-up / come-home / dinner scenes, text + voice control, operator console). OLLI MAIKA lists Yoohome as a supported smart-home ecosystem.

Page sections and the intent behind each (owner's brief):

| Section | Intent |
|---------|--------|
| Role | Moved out of the context/role two-column block into the header, directly under the project title, as an emphasised block: label → "Fullstack Developer · Tech Lead" → meta line (owned backend architecture, data model, realtime control path · led 5-10 engineers · YooTek Holdings · Aug 2021 – Feb 2024). |
| Context | Full-width single column. Longer narrative: new-build apartments, resident app + operator control plane, assistant that learns from control / management data, multi-vendor hardware (Zigbee via in-house gateway, Wi-Fi / cloud devices such as cameras and speakers via vendor APIs). |
| My Contribution / Ownership | Emphasise system design: backend built from scratch on NestJS microservices (device registry, command & control, telemetry, scene engine, notification, assistant) around MQTT + Kafka; device model borrows Zigbee2MQTT / Home Assistant conventions (device → capability → state); data model = building → block → floor → apartment → room → device, device registry, desired/reported shadow (Redis hot + MongoDB durable), time-bucketed telemetry streamed via Kafka, append-only command / ack log; realtime control path (Bull → MQTT → gateway → ack → WebSocket); multi-vendor adapters; telemetry / data platform; team lead 5-10. |
| Highlighted Use Cases | AI assistant written to sound premium: OpenAI on top of the household's own control + telemetry history, natural-language commands / Q&A / scene edits, voice through Alexa + OLLI MAIKA, habit learning with proactive routine suggestions, cross-vendor scenes + safety fan-out. |
| Challenges | Removed the "light switch should feel like a light switch" line and the "no room for eventually consistent" line. Added: large, business-critical data volume that must serve future workloads (assistant training, energy analytics, predictive maintenance). |
| System Scale | 10+ buildings, 1,000+ apartments (90 Lang Street, Royal Da Nang), 500K+ devices, 10K+ users; vendors now include IP camera lines and smart speakers (Amazon Alexa, OLLI MAIKA). |
| My Impact | **Removed** for this page on the owner's request. |
| Product Details (new) | Two parts: "The product" (feature grid of 14 categories from the yootek.vn article) and "Under the hood" (architecture layers Clients → Core services → Messaging → Data → AI → Edge → Devices & vendors → Runtime, plus two flow strips: realtime command path and telemetry / data path). |
| Product Links | App Store + Google Play links, each with a static QR SVG (`public/images/projects/yoohome/`) so visitors can scan to install on iOS / Android. |

Assumptions to confirm with the owner (written as plausible engineering narrative, not verified facts): the "own core instead of a packaged IoT platform" framing, the Zigbee2MQTT / Home Assistant device-model borrowing, the Redis-hot / MongoDB-durable shadow split, time-bucketed telemetry, and the append-only command / ack log.

---

## Dotmar Multi-Site CMS (current case study, `dotmar-cms`)

Runtime: `src/data/projects.js` (card) + `src/projects/DotmarCmsProject.jsx` (full copy, EN/VI pairs). Last content pass: 2026-09-22 (owner's review comments - these override the notes below).

**Type:** Enterprise CMS · Magnolia + Java + React · **Role:** Fullstack Developer · Tech Lead - **main developer on the project** (SmartOSC, Oct 2023 – Jun 2025 tenure; project dates not published)
**Card impact:** Multi-site CMS in production for ~10K users with live personalization rules.
**Card tools:** Magnolia CMS · Java Core · React · GraphQL · REST APIs · MySQL · Apache Tomcat · Windows Server
**Product reference:** https://www.dotmar.com.au/ (Australia) and https://www.dotmar.co.nz/ (New Zealand) - both live on Magnolia (DAM `/dam/jcr:` and `/.imaging/focalarea/` paths visible); nav Products / Applications / Industries / Capabilities / Insights; 7 product divisions, 10 industries, AU ↔ NZ region switcher. The owner's "3 sites / 3 public instances" figure is kept as given - only two public domains are verified.

Owner's review comments (2026-09-22) and how each was applied:

| # | Comment | Applied as |
|---|---------|------------|
| 1 | Role should sit right under the project name and be emphasised | `.dm-role` block between `<h1>` and the lead: label + bold `Fullstack Developer · Tech Lead` + one-line "main developer" note. Role column removed from the Context grid (`.dm-narrative` is single column). |
| 2 | Context too thin | Three paragraphs: who Dotmar is (since 1967, largest ANZ distributor, 7 divisions / 10 industries / 8 machining centres, site = sales front door); the brief via SmartOSC (author → per-market public instances, shared catalogue, workflow + personalization + AI agent); on-prem delivery on Windows Server + Tomcat. |
| 3 | Stack missing Java Core and GraphQL | Added `Java Core`, `GraphQL` (plus `MySQL`, `Windows Server`) to the page chips and the card `tools`. |
| 4 | Ownership: deploy on Windows Server + Apache Tomcat; "I did most of it"; features built on the Magnolia framework | First item states main-developer ownership; dedicated items for Magnolia feature implementation and for the Windows / Tomcat deployment (Windows services, JVM / connector tuning, Apache in front, publishing between instances, release procedure). Card description also ends with the main-developer sentence. |
| 5 | Use cases need more detail | Each use case is now a short paragraph with a concrete example (AU / NZ overrides, author → reviewer → publisher with scheduled publishing, Queensland / after-hours / mining-segment personalization examples, AI draft entering the workflow, catalogue + quote routing, headless delivery). |
| 6 | Challenges did not make sense | Replaced with six concrete engineering challenges (see FEATURE_MAP F9). |
| 7 | System Scale: more detail; spell out the personalization rules | Four items; the personalization item carries a nested `details` list naming each rule family (location, time of day, age group, audience segment) with the concrete effect of each, plus how rules combine (AND on a segment, default fallback, persona preview). |
| 8 | Drop "My Impact" | `MY_IMPACT` const and section removed. |
| 9 | Add product + technical details | New **Product Details** section mirroring Yoohome: 14-item feature grid ("The product") + 8 architecture layers and two flow strips ("Under the hood"). |
| 10 | No product link | New **Product Links** section with external cards for dotmar.com.au and dotmar.co.nz (no QR - web links, not app stores). |

Assumptions to confirm with the owner (written as plausible engineering narrative, not verified facts): the exact workflow roles (author → reviewer → publisher) and scheduled publishing; the personalization rule effects (branch / phone by geo-IP, CTA swap by business hours, age-group tone variant, segment by pages visited / referral / declared industry); the AI agent's inputs (structured product data + brand guidelines) and provenance flag; MySQL as the JCR persistence store; Apache HTTP Server in front of Tomcat; "hundreds of product and material pages"; and the third site / third public instance (not identified publicly).

---

## Custom Zigbee Gateway Firmware (current case study, `zigbee-gateway-firmware`)

Runtime: `src/data/projects.js` (card) + `src/projects/ZigbeeGatewayProject.jsx` (full copy, EN/VI pairs). Last content pass: 2026-09-22 (owner's review comments - these override the notes below).

**Type:** Embedded Platform · Node.js + Zigbee2MQTT + Debian · **Role:** Backend / Embedded Developer · DevOps (YooTek Holdings, Aug 2021 – Feb 2024 - the gateway is the edge layer of the Yoohome platform)
**Card impact:** 10,000+ gateways deployed nationwide, holding up through cloud outages.
**Card tools:** Node.js · Zigbee2MQTT · Linux kernel processes · MQTT · Debian · Rockchip · OTA tooling
**Upstream reference:** Zigbee2MQTT (https://www.zigbee2mqtt.io/) - open-source Node.js bridge; `zigbee-herdsman` drives the coordinator over serial, `zigbee-herdsman-converters` holds the device definitions, everything is exposed as MQTT topics (state, `set` / `get`, `bridge/*` for pairing, groups, binding, end-device OTA).

Owner's review comments (2026-09-22) and how each was applied:

| # | Comment | Applied as |
|---|---------|------------|
| 1 | Role should sit right under the project name and be emphasised | `.zb-role` block between `<h1>` and the lead: label → `Backend / Embedded Developer · DevOps` → meta line (gateway runtime on Zigbee2MQTT, cross-vendor integration, OTA + remote diagnostics · YooTek Holdings · Aug 2021 – Feb 2024). Role column removed from the Context grid (`.zb-narrative` is single column). |
| 2 | Context too thin; say it is based on Zigbee2MQTT | Three paragraphs: (1) the gateway as the edge of Yoohome - one per apartment, the box every Zigbee device talks to, must be a full local controller; (2) built on Zigbee2MQTT instead of a from-scratch stack - what `zigbee-herdsman` / `zigbee-herdsman-converters` give (thousands of devices from Tuya, Schneider Electric, Legrand...), the MQTT contract; (3) the custom part around that core - supervisor, cloud agent, local automation engine, custom converters, OTA + diagnostics tooling - on Rockchip / Debian under tight budgets. |
| 3 | System Scale: add the vendors worked with (Tuya, SE, Legrand) | New item: "Vendor integrations on the Zigbee side - Tuya, Schneider Electric, Legrand - plus other Zigbee 3.0 devices already covered by Zigbee2MQTT's converter library". |
| 4 | Drop "My Impact" | `MY_IMPACT` const and section removed. |
| 5 | Add product details | New **Product Details** section mirroring Yoohome / Dotmar: 12-item feature grid ("The product": coordinator, pairing, cross-vendor, local scenes, offline-first, cloud link, gateway OTA, device OTA, diagnostics, telemetry, groups & binding, store-and-forward) + 8 architecture layers Cloud → Cloud agent → Local automation → Zigbee2MQTT → Messaging → Supervision & OTA → OS → Hardware ("Under the hood") + three flow strips (remote command path, offline path with no cloud in the loop, firmware OTA path). No Product Links section - the gateway is hardware shipped with Yoohome, not a downloadable product. |

Assumptions to confirm with the owner (written as plausible engineering narrative, not verified facts): the Node.js supervisor + separate cloud-agent process split; per-gateway credentials for the private broker; store-and-forward queueing while offline; custom converters written for devices upstream did not support; systemd + watchdog supervision; signed / staged OTA with health-checked rollback (the OTA flow strip); a local MQTT broker on the gateway (broker not named); the Zigbee coordinator module family (not named); Ethernet / Wi-Fi uplink.

---

## Hubly - Community Platform with AI Moderation (current case study, `hubly`)

Runtime: `src/data/projects.js` (card) + `src/projects/HublyProject.jsx` (full copy, EN/VI pairs). Last content pass: 2026-09-22 (owner's review comments - these override the notes below). The requested `hubly-project-research.vi.txt` file was not present in the workspace at edit time, so this pass uses the existing Hubly runtime copy plus the owner's three review comments.

**Type:** Community Platform · NestJS + Vue/Nuxt + Flutter · **Role:** Senior Fullstack Engineer
**Card impact:** Global community platform in production with proprietary AI moderation across 30+ languages.
**Card tools:** NestJS · Moleculer · PHP · Prisma · MongoDB · Redis · Bull · Algolia · OpenAI · Vue/Nuxt · Flutter · Pusher
**Product reference in runtime copy:** global community platform covering community setup, chat, KYC, ads, rewards, livestream, content aggregation, CRM hooks, and Hubshield AI moderation across text, image, video, audio, OCR, and GIF.

Owner's review comments (2026-09-22) and how each was applied:

| # | Comment | Applied as |
|---|---------|------------|
| 1 | Role should sit right under the project name and be highlighted | `.hb-role` block between `<h1>` and the lead: label → `Senior Fullstack Engineer` → meta line (backend / web / mobile delivery · search / taxonomy / invite / permissions · Sendbird migration support). Role column removed from the Context grid. |
| 2 | Read `hubly-project-research.vi.txt` and expand the remaining sections in more detail | The file was not available in the workspace, so the page was expanded from the current Hubly copy: 3 context paragraphs, 5 ownership items, 6 detailed use cases, 5 challenges, 4 system-scale items, and a new Product Details section. |
| 3 | Remove "Tác động từ phần tôi phụ trách" | `MY_IMPACT` const and section removed. The page now goes from System Scale to Product Details to the card impact line. |

Page sections and the intent behind each:

| Section | Intent |
|---------|--------|
| Role | Emphasised block directly under the project title, matching the newer Yoohome / Dotmar / Zigbee case-study pattern. |
| Context | Full-width narrative: Hubly is a global community platform, Hubshield AI is the differentiator, and the engineering surface spans NestJS / Moleculer, MongoDB / Redis / Bull, Vue 2 / Nuxt 2, Flutter, realtime, search, moderation, and SaaS integrations. |
| My Contribution / Ownership | Focuses on Jimmy's actual contribution: cross-surface backend/web/mobile delivery, community discovery, Algolia search, taxonomy/category mapping, invite and permissions, Sendbird migration support, external integrations, and admin / creator workflows. |
| Highlighted Use Cases | Details community templates, Hubchat, ID Hub KYC, DotAds, Hubpoints / Hubstream / Multihub / ACA, Hub Packs, and CRM hooks. |
| Challenges | Broad product surface, multi-provider moderation behavior, Sendbird migration, Vue 2 / Nuxt 2 modernization, and defensive integration across external services. |
| System Scale | Describes global product scope, Hubshield coverage across 30+ languages and media types, multi-client delivery, and consistency needs across seven community categories plus monetization / engagement modules. |
| Product Details | New section with product feature cards and "Under the hood" architecture layers: Clients, Backend services, Data & jobs, Search & discovery, Moderation, Realtime & chat; includes moderation, community discovery, and chat migration flow strips. |
| My Impact | Removed for this page on the owner's request. |

Assumptions to confirm with the owner (written as plausible engineering narrative, not verified facts): exact proprietary-chat architecture after Sendbird, identity-verification provider details, how Hubshield combines provider scores / fallback logic, CRM integration depth for HubSpot / Salesforce / Slack, which modules Jimmy owned versus maintained, and whether `hubly-project-research.vi.txt` exists outside the repo and should replace or refine this copy.

---

## Legacy project list (v1 site - superseded by the current 5-project set, kept for reference)

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
- Exception: the **Yoohome**, **Dotmar**, **Zigbee**, and **Hubly** pages have no My Impact section (owner's request, 2026-09-22) - their ownership story lives in My Contribution / Ownership and the Product Details "Under the hood" block instead.


### Metric defensibility rule

Public metrics must be attributable to a project or role and easy to explain in an interview. Avoid publishing optimization percentages, success rates, throughput estimates, capacity plans, or business-impact percentages unless the source and measurement method are known. Prefer system-scale facts or qualitative engineering outcomes when attribution is unclear.

### Vietnamese copy style
Vietnamese copy should read like native technical writing, not a sentence-by-sentence translation of the English version. Keep familiar engineering terms such as backend, production, workflow, realtime, CMS, MQTT, and CI/CD when they are clearer than forced translations; write the surrounding prose naturally and avoid hybrid phrases such as “ownership hands-on”, “ship service”, or “failure mode riêng”.
