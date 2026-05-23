# Feature Map - Quoc Huy (Jimmy) Portfolio

## Feature index

| ID | Feature | Primary files | Route / anchor |
|----|---------|---------------|----------------|
| F1 | Hero banner | `src/components/Hero.jsx` | `/#top` |
| F2 | Sticky navigation | `src/components/Nav.jsx` | global |
| F3 | Impact highlights | `src/components/Impact.jsx` | `/#impact` |
| F3b | Education list | `src/components/Education.jsx`, `src/data/education.js` | `/#education` |
| F3c | Work experience timeline | `src/components/Experience.jsx`, `src/data/experience.js` | `/#experience` |
| F4 | About + skills grid | `src/components/AboutSkills.jsx`, `Skill.jsx` | `/#about` |
| F4b | Personal interest + masonry image wall | `src/components/PersonalInterest.jsx`, `src/data/personal.js` | `/#personal` |
| F5 | Projects listing (homepage) | `src/components/Projects.jsx`, `FeaturedProject.jsx`, `OtherProject.jsx`, `BannerEmbed.jsx` | `/#work` |
| F5a | All-projects list page | `src/pages/ProjectListPage.jsx` | `/projects` |
| F5b | Blog slider (homepage) | `src/components/Blogs.jsx`, `BlogCard.jsx`, `src/data/blog.js` | `/#blog` |
| F5c | Blog list page (paginated) | `src/pages/BlogListPage.jsx`, `src/components/Pagination.jsx`, `src/data/blog.js` | `/blog` |
| F5d | Blog detail page | `src/pages/BlogDetailPage.jsx`, `src/components/BlogBody.jsx`, `src/data/blog.js` | `/blog/:slug` |
| F6 | Footer / CTA | `src/components/Footer.jsx` | footer |
| F7–F13 | Individual project case studies | `src/projects/*Project.jsx` | `/projects/:slug` |
| FX | Theme tokens (charcoal + bronze) + dark/light toggle | `src/styles/global.css` `:root` / `[data-theme="light"]`, `src/context/ThemeContext.jsx`, `src/components/ThemeToggle.jsx` | global |
| FW | Bilingual i18n (EN/VI) + language toggle | `src/context/LanguageContext.jsx`, `src/utils/i18n.js`, `src/components/LanguageToggle.jsx`, `src/data/ui.js` | global |
| FV | Env-driven mobile content trim | `src/utils/mobileTrim.js`, `src/components/MobileTrimStyles.jsx`, `.env.example` | mobile (≤ `VITE_MOBILE_BREAKPOINT_PX`) |
| FY | Dashboard embed system (currently no embeds registered) | `src/components/project/EmbedSlot.jsx`, `src/embeds/*.tsx`, `src/data/projectEmbeds.js` | reserved for future detail pages |
| FZ | Banner system (home thumbs + detail hero) | `public/banners/*.html`, `BannerEmbed.jsx`, `ProjectShell.jsx` | home + detail (currently no banner HTML files; cards fall back to images) |

---

## F1 - Hero banner (v2 - HUD / dossier layout)

**Purpose:** Full-viewport intro (`100vw × 100dvh`) styled as a cinematic dossier card - responsive art-directed background photo + 4 bronze corner brackets + monospace metadata chips + serif title with italic-bronze accent + skill chip row + contact strip + monogram.

**Layout (CSS grid):**

```
┌─ tag ──────────────────── side ─┐
│                                 │
│  main                      side │
│                                 │
├─ contact ───────────────── mark ┤
└─────────────────────────────────┘
```

| Area | Content |
|------|---------|
| `tag` (top-left)        | Status dot + `PORTFOLIO / 2026 // AVAILABLE FOR HIRE` |
| `side` (right column)   | Stacked info chips (`// EXPERIENCE`, `// BASED IN`, `// ALSO DOES`, `// STATUS`) |
| `main` (center-left)    | `— Senior Software Engineer` eyebrow → serif name with bronze italic accent → italic subtitle → wrapped skill chip row |
| `contact` (bottom-left) | `// EMAIL`, `// PHONE`, `// LINKEDIN` columns |
| `mark` (bottom-right)   | `SE/26` serif monogram + `SENIOR · EST. 2019` tag |

**Data sources:**
- `src/data/profile.js` - the `hud` block drives every HUD piece (see schema below); top-level `contact` drives the contact strip
- `src/data/stats.js` - `heroStats[]` is still exported for legacy compatibility but no longer rendered in the hero

**`profile.hud` schema:**

```js
hud: {
  portfolioYear: '2026',
  availability: 'AVAILABLE FOR HIRE',
  available: true,                   // toggles the green pulsing dot
  eyebrow: 'Senior Software Engineer',
  title: { lead: 'Quoc Huy', accent: 'Jimmy' },
  subtitleLead: 'Senior Fullstack',
  subtitleAccent: 'Software Engineer.',
  chips: [{ label, accent?: true }, ...],     // skill pill row
  sideChips: [{ label, value }, ...],          // 4 right-column chips
  monogram: 'SE/26',
  establishedTag: 'Senior · Est. 2019'
}
```

**Responsive image (`<picture>`):** Browser picks the first `<source>` whose `media` matches AND whose `type` is supported. PNG only by default - WebP wiring is in place and can be enabled by generating `.webp` siblings.

| Media query | Variant |
|-------------|---------|
| `(max-aspect-ratio: 3/4)` | `hero_mobile_portrait` |
| `(min-aspect-ratio: 21/10)` | `hero_ultrawide` |
| `(min-width: 3000px)` | `hero_desktop_4k` |
| `(min-width: 2200px)` | `hero_desktop_qhd` |
| `(min-aspect-ratio: 14/10) and (max-aspect-ratio: 17/10)` | `hero_macbook_13` |
| `(max-aspect-ratio: 14/10)` | `hero_tablet` |
| default `<img>` | `hero_desktop_fhd` |

**Assets:** `public/hero-banners/<variant>.png` (8 art-directed variants). The background photo is rendered with `filter: grayscale(0.9) contrast(1.05) brightness(0.85)` and dimmed by a horizontal gradient on `.hero-shade` so the left side reads as dark for the content blocks.

**Decorative layers (in z-order):**
1. `.hero-bg` - responsive `<picture>`
2. `.hero-shade` - left-heavy gradient dim
3. `.hero-grid` - faint bronze dotted grid (`80px × 80px`, radial-masked)
4. `.hero-curtain` - solid background fade-in on first mount (`.hero--preload → .hero--ready`)
5. `.hero-frame` - content grid
6. 4 × `.hero-corner--{tl,tr,bl,br}` - bronze bracket overlays
7. `.hero-scroll-down` - bottom-center chevron

**Entrance animation:** each major block (`tag-top`, `main`, `side-chips`, `contact`, `mark`, `corners`) fades up with a 150ms stagger when `.hero--ready` is applied.

**Availability accent (green):** the top-tag availability text (`AVAILABLE FOR HIRE`) renders inside `.hero-tag-availability--on` when `profile.hud.available === true`, and any side-chip carrying `accent: 'available'` gets `.hero-side-chip--available` — both styled with the `#6fd28d` mint green to make the hire status pop. Toggle by flipping `profile.hud.available` and adding/removing `accent: 'available'` on the matching chip.

**Staggered side chips:** even-indexed side chips are shifted left by 36px (`.hero-side-chips > .hero-side-chip:nth-child(even) { transform: translateX(-36px) }`) to break the right edge into a zigzag silhouette. Reset to `0` on the ≤768px mobile breakpoint where the chips wrap into a row.

**Responsive:**
- ≥1024px: full grid as drawn
- 769-1023px: side column narrows to 180px
- ≤768px: grid collapses to a single column - tag → main → side chips (row wrap) → contact; monogram hidden

---

## F2 - Navigation

**Purpose:** Sticky header; section links on home; hamburger drawer on mobile; scroll-spy that highlights the link of the section currently in view.

**Data:** `profile.js` - name, `contact.linkedin`, `contact.resume` (currently null), optional `contact.github` (currently null)

**State:**
- `open` boolean for mobile menu (locks `document.body.overflow`)
- `activeSection` derived from `useActiveSection(HOMEPAGE_SECTIONS, isHome)` - an `IntersectionObserver` with `rootMargin: '-30% 0px -55% 0px'` that picks whichever section has the highest visibility ratio inside that band. Only runs on the homepage.

**Active state rules:**
- In-page links (`#impact`, `#experience`, `#about`, `#personal`, `#work`) → active when `activeSection` matches the section id on `/`.
- `Blog` link → active when on `/blog*` route, or when the `#blog` section is in view on home.
- `Projects` link → active when on `/projects` route, or when the `#work` section is in view on home.
- LinkedIn / Resume / GitHub stay inert (external links).

**Visual treatment:** `.nav-links a.is-active` switches the link to `var(--accent)` and adds a 2px bronze underline pseudo-element 6px below the text. Mobile drawer suppresses the underline pseudo (the row divider already separates entries) and uses colour-only highlight.

**Links pattern:**
- In-page (home): `/#impact`, `/#experience`, `/#about`, `/#personal`, `/#work`
- Routes: `/blog`
- External: LinkedIn (Resume + GitHub render only when non-null in `profile.contact`)
- Logo: `/`

---

## F3 - Impact highlights

**Purpose:** Six quantitative achievements in a responsive grid (engineering capability headline numbers).

**Data:** `src/data/stats.js` - `impactHighlights[]` with `{ big, desc }`. Current values: `4+ yrs`, `5-10`, `100K+`, `Headless`, `AI on-device`, `2 gateways`.

**Component:** `src/components/Impact.jsx`

**Mobile trim:** controlled by `VITE_MOBILE_IMPACT_LIMIT` (default 4) via `<MobileTrimStyles />`.

**Anchor:** `id="impact"`

---

## F3b - Education

**Purpose:** Single graduate engineering program below Impact.

**Data:** `src/data/education.js` - `{ school, degree, focus, location, date, gpa, honors[] }`. Currently one entry: **Hanoi University of Science and Technology** (Computer Engineering, Aug 2018 – Aug 2023, CPA 3.25).

**Component:** `src/components/Education.jsx` - 2-column grid (`220px 1fr` desktop, stacked on mobile). Heading: "Where I studied engineering."

**Anchor:** `id="education"`.

---

## F3c - Work Experience

**Purpose:** Reverse-chronological work history below Education. Bullets from the resume are rewritten as flowing paragraphs; each company also exposes a `meta` table with **Technologies** and **Outstanding projects** rows.

**Data:** `src/data/experience.js` - 5 entries (most recent first):

1. **Viettel Digital** - Software Development Specialist (Jul 2025 – Present) · current
2. **SmartOSC** - Senior Java Engineer (Oct 2023 – Jun 2025)
3. **YooTek Holdings** - Full Stack Developer (Aug 2021 – Feb 2024)
4. **Hanoi Telecom Corporation** - Java Developer (Nov 2020 – Mar 2021)
5. **Eledevo Academy** - Full Stack Developer & IT Lecturer (Aug 2019 – Sep 2020)

Each entry may carry an optional `website` URL. When non-null, `Experience.jsx` renders the company name as an `<a target="_blank" rel="noreferrer" class="exp-company-link exp-company-name">` with the same slide-in underline hover used on project titles (`background-size: 0 2px → 100% 2px`). Companies without a confirmed URL fall back to a plain `<span class="exp-company-name">`.

**Optional `logo`** (string path, e.g. `/images/logos/<slug>.png`): when non-null, `Experience.jsx` renders an `<img class="exp-logo">` to the right of the role + company block on the same row (both desktop and mobile). Asset lives under `public/images/logos/`. Canonical company logos are normalized PNG files at 512×512 with a white rounded-square background, transparent corners, and tight centered content using roughly 34px outer padding (`eledevo.png`, `htc.png`, `smartosc.png`, `viettel.png`, `yootek.png`). Rendered directly with no extra border/card chrome at 84×84 desktop and 60×60 mobile. Leave `logo: null` to skip the image entirely.

**Company name styling:** `.exp-company-name` is 19px, bold (600), bronze (`var(--accent)`) — visibly larger than the location text (`.exp-company-location`, 14px muted). The company line uses `display: flex; flex-wrap: wrap; align-items: baseline` so the location wraps below the name on narrow viewports.

**Component:** `src/components/Experience.jsx`

**Mobile trim:** controlled by `VITE_MOBILE_HIDE_EXPERIENCE_META` (default `true`) - hides the optional Technologies / Outstanding projects rows. The role + period + paragraphs stay visible.

**Anchor:** `id="experience"`

---

## F4 - About + skills

**Purpose:** Two-column layout (about text sticky on desktop); 2×3 skills grid with Font Awesome icons via react-icons. A tech-stack marquee scrolls beneath both columns.

**Data:**
- `src/data/about.js` - heading "Working at the intersection of CMS platforms, backend services, and IoT systems."
- `src/data/skills.js` - 6 skill objects with engineering-focused descriptions, plus the `techMarquee` array of badge names rendered by `<TechMarquee />`
- `src/data/skillIcons.js` - maps `backend / frontend / cms / mobile / data / iot` to `react-icons/fa` components (`FaServer`, `FaReact`, `FaNewspaper`, `FaMobileAlt`, `FaDatabase`, `FaMicrochip`)

**Tech marquee (`src/components/TechMarquee.jsx`):** seamless horizontal scroll mounted at the bottom of the section. The track duplicates `techMarquee` and animates `translateX(-50%)` over 50s for a clean loop. Hovering pauses the scroll; `prefers-reduced-motion: reduce` disables it. Edges are softly masked with a `mask-image` linear gradient. Tech badge text stays English in both locales.

**Anchor:** `id="about"`

---

## F4b - Personal interest + masonry wall

**Purpose:** Personal copy + Pinterest-style masonry of personal photos between About and Projects.

**Data:** `src/data/personal.js` - heading "A little more about me - outside of work." Three paragraphs covering travel, founding a clothing store, MC / spokesperson work, plus the personal motto.

**Images:** `public/images/personal/personal_1.jpeg` … `personal_8.jpeg` (ordered chronologically by EXIF date taken, JPEG resized to max 1600px width).

**Mobile trim:** controlled by `VITE_MOBILE_PERSONAL_LIMIT` (default 4). The runtime data array is untouched - the trim is a CSS `display: none` block injected by `<MobileTrimStyles />` from `src/utils/mobileTrim.js`.

**Anchor:** `id="personal"`

---

## F5 - Projects listing

**Purpose:** One featured project + six grid cards (7 total) - reflecting the outstanding projects from the resume.

**Data:** `src/data/projects.js`
- `featuredProject` - MMP's CMS Website
- `otherProjects[]` - Dentsu's Headless CMS, Yoolife, YooIOC, VNPT Portal Information, Eledevo Academy Landing Page, The Fruit Market Application
- Helpers: `getAllProjects()`, `getProjectCard(slug)`
- All cards currently have `banner: null` and reference an image under `public/images/projects/<slug>.jpg`. The image directory is empty by default, so `OtherProject` / `FeaturedProject` simply render the dark fallback inner panel until images are added.

**Mobile trim:** controlled by `VITE_MOBILE_PROJECTS_LIMIT` (default 3, applied to the other-projects grid only - the featured card is always shown). The section header keeps the **View all →** link to `/projects` for the full grid.

**Anchor:** `id="work"`

---

## F5a - All-projects list page

**Route:** `/projects` · **Component:** `src/pages/ProjectListPage.jsx`

A standalone page that lists every project from `src/data/projects.js`. Reuses `Nav`, `Footer`, `FeaturedProject`, `OtherProject` - no new card design. No pagination (7 projects fits in one grid).

Reached via the **View all →** link in the homepage `Projects` section header (`ui.projects.viewAll`).

---

## F5b - Blog slider (homepage)

**Anchor:** `id="blog"` · **Component:** `src/components/Blogs.jsx`

Single-row horizontal slider rendered between `Projects` and `Footer` on the homepage.

| Piece | Detail |
|-------|--------|
| Data | `src/data/blog.js` - `getAllPosts()` returns posts sorted by `date` desc |
| Card | `src/components/BlogCard.jsx` - cover image, date, read time, title (clamped 2 lines), excerpt (clamped 3 lines), tag chips, CTA |
| Slider | CSS `scroll-snap-type: x mandatory` track with grid auto-flow column; native scroll on touch / trackpad; arrow buttons (prev/next) for desktop mouse users (hidden ≤768px). Arrows enable/disable based on `scrollLeft` + `scrollWidth - clientWidth` thresholds. |
| Header | Eyebrow + heading + **View all →** link (`ui.blog.viewAll`) → `/blog` |
| Empty state | `ui.blog.empty` rendered when `getAllPosts()` returns `[]` |

---

## F5c - Blog list page

**Route:** `/blog` · **Component:** `src/pages/BlogListPage.jsx`

Paginated grid of all posts.

| Piece | Detail |
|-------|--------|
| Page size | 9 posts per page |
| URL param | `?page=N` (1-indexed, clamped to `[1, totalPages]`) |
| Layout | `.list-page-grid.blog-grid` - 3 cols ≥1024px, 2 cols 769-1023px, 1 col ≤768px |
| Pagination | `src/components/Pagination.jsx` - prev/next buttons + page numbers with ellipses (always shows 1, last, and ±1 around current) |
| Scroll | `window.scrollTo(0,0)` on page change |
| Empty state | `ui.blog.empty` |

---

## F5d - Blog detail page

**Route:** `/blog/:slug` · **Component:** `src/pages/BlogDetailPage.jsx`

Renders a single post. If the slug is unknown, redirects to `/blog`.

| Piece | Detail |
|-------|--------|
| Cover | Hero band using `post.cover` as `background-image`; falls back to a bronze gradient when `cover` is null |
| Breadcrumbs | Home → Blog → current title |
| Header | Date + read time + title + excerpt + tag chips |
| Body | `src/components/BlogBody.jsx` renders the structured `body` array via switch. Block types: `paragraph`, `heading` (level 2/3), `list`, `code` (with optional `lang` badge), `quote`, `callout`, `image` (with optional caption). Text fields are `{ en, vi }` pairs. |
| Pager | Prev/next post from `getAdjacentPosts(slug)` (order matches `getAllPosts()`) |
| Back link | `← Back to blog` → `/blog` |

### `blog.js` schema

```ts
type Block =
  | { type: 'paragraph', text: Translatable }
  | { type: 'heading', level: 2 | 3, text: Translatable }
  | { type: 'list', items: Translatable[] }
  | { type: 'code', lang?: string, code: string }       // code stays plain text
  | { type: 'quote', text: Translatable }
  | { type: 'callout', text: Translatable }
  | { type: 'image', src: string, alt: Translatable, caption?: Translatable }

interface BlogPost {
  slug: string
  title: Translatable
  excerpt: Translatable
  date: string              // ISO YYYY-MM-DD - sorted desc by getAllPosts()
  cover: string | null      // path under /public/images/blog/
  tags: string[]            // plain strings (tech / topic keywords)
  readMinutes?: number
  body: Block[]
}
```

Helpers exported alongside the `blog` array:
- `getAllPosts()` - posts sorted by `date` desc
- `getPostBySlug(slug)` - single post or `null`
- `getAdjacentPosts(slug)` - `{ prev, next }` for the detail pager

---

## F6 - Footer

**Purpose:** CTA, contact columns. Currently exposes LinkedIn, email (`huyquoc.vq@gmail.com`), and phone from `profile.contact`. Heading: "Have a fullstack problem worth solving?"

**Data:** `profile.js`

**File:** `src/components/Footer.jsx`

---

## Project shell (all detail pages)

Provides Nav, hero banner (image or `<BannerEmbed>` iframe), breadcrumbs (Home → Projects → current title), `children`, prev/next pager, and Footer. Banner falls back to the dark fallback panel when neither `project.banner` nor a readable `project.image` is available.

---

## F7 - MMP's CMS Website (Featured)

| Field | Value |
|-------|-------|
| Route | `/projects/mmp-cms` |
| Component | `src/projects/MmpCmsProject.jsx` |
| Styles | `src/styles/projects/mmp-cms.css` (legacy `.wp-*` class set) |
| Layout | Intro → key insight banner → split (problem + approach) → recommendation → impact stats → tools |
| Source | SmartOSC outstanding project: Java Spring Boot CMS optimized for high traffic and large datasets |

## F8 - Dentsu's Headless CMS Website

| Field | Value |
|-------|-------|
| Route | `/projects/dentsu-cms` |
| Component | `src/projects/DentsuCmsProject.jsx` |
| Styles | `src/styles/projects/dentsu-cms.css` (legacy `.pgm-*` class set) |
| Layout | Intro + tag chips → why-it-existed → 3-layer architecture → delivery contract → score cards → outputs → footer stats |
| Source | SmartOSC outstanding project: Magnolia + React headless CMS |

## F9 - Yoolife Application

| Field | Value |
|-------|-------|
| Route | `/projects/yoolife` |
| Component | `src/projects/YoolifeProject.jsx` |
| Styles | `src/styles/projects/yoolife.css` (legacy `.trend-*` class set) |
| Layout | Intro → stack chips → problem/method → ordered list of features → impact line |
| Source | YooTek Holdings outstanding project: React Native consumer app for urban residents |

## F10 - YooIOC Application

| Field | Value |
|-------|-------|
| Route | `/projects/yooioc` |
| Component | `src/projects/YooIocProject.jsx` |
| Styles | `src/styles/projects/yooioc.css` (legacy `.pfm-*` class set) |
| Layout | Intro + headline stats → context paragraph → bento feature grid → daily reference |
| Source | YooTek Holdings outstanding project: urban operations management platform |

## F11 - VNPT Portal Information

| Field | Value |
|-------|-------|
| Route | `/projects/vnpt-portal` |
| Component | `src/projects/VnptPortalProject.jsx` |
| Styles | `src/styles/projects/vnpt-portal.css` (legacy `.glean-*` class set) |
| Layout | Centered intro → why-it-existed → stack list → ordered build steps → team / process aside |
| Source | Hanoi Telecom Corporation outstanding project: Liferay + Spring Boot portal |

## F12 - Eledevo Academy Landing Page

| Field | Value |
|-------|-------|
| Route | `/projects/eledevo-landing` |
| Component | `src/projects/EledevoLandingProject.jsx` |
| Styles | `src/styles/projects/eledevo-landing.css` (legacy `.air-*` class set) |
| Layout | Intro + visitor-flow mock → problem → audience pills → output sections list → build narrative |
| Source | Eledevo Academy outstanding project: marketing landing page for the academy |

## F13 - The Fruit Market Application

| Field | Value |
|-------|-------|
| Route | `/projects/fruit-market` |
| Component | `src/projects/FruitMarketProject.jsx` |
| Styles | `src/styles/projects/fruit-market.css` (legacy `.retro-*` class set) |
| Layout | Centered intro → problem → what-it-does → implementation choices → 5-step end-to-end flow → 3 tab cards → note |
| Source | Eledevo Academy outstanding project: React Native + Spring/Express e-commerce app |

---

## Shared project chrome (all F7–F13)

**Component:** `src/components/project/ProjectShell.jsx`

Provides Nav · banner (image or iframe) + dim overlay · breadcrumbs · `children` · prev/next pager (from `getAllProjects()` order) · Footer · `window.scrollTo(0, 0)` on slug change.

---

## FW - Bilingual i18n (EN/VI) + language toggle

**Default language:** English. User selection persists in `localStorage` under `portfolio-language`.

| Piece | File | Notes |
|-------|------|-------|
| Provider + hook | `src/context/LanguageContext.jsx` | Exports `LanguageProvider` and `useLanguage()` → `{ lang, setLang, toggleLang }`. Persists to `localStorage['portfolio-language']`. Default is `en`. Writes `<html lang="...">`. |
| Translation helper | `src/utils/i18n.js` | `tr(value, lang)` returns `value[lang]` when `value` looks like `{ en, vi }`, otherwise returns the value unchanged. Safe to call on plain strings, numbers, or untranslated nodes - keeps proper nouns / tech terms passthrough. Also exports `LANGUAGES = ['en','vi']` and `DEFAULT_LANGUAGE = 'en'`. |
| Provider mount | `src/main.jsx` | `<LanguageProvider>` wraps `<ThemeProvider>` so theme + language coexist. |
| UI control | `src/components/LanguageToggle.jsx` | Globe icon + EN/VI code + dropdown menu with the two options (full names: English / Tiếng Việt). Closes on outside click or Escape. Mounted next to `ThemeToggle` in `Nav.jsx` `.nav-actions`. |
| UI strings registry | `src/data/ui.js` | Every UI string not tied to a section's data file (nav labels, breadcrumbs, pager, footer headings, embed slot, impact/education/experience/projects eyebrows + headings). Each value is a `{ en, vi }` pair. |

**Translation policy (used across data + project pages):**
- Proper nouns, tech / framework names, role titles, project names → plain string (same EN/VI).
- Headings, prose, paragraphs, labels, button text → `{ en, vi }` pair, consumed via `tr(...)`.
- Project case studies own their bilingual copy inside a local `CONTENT` const at the top of the JSX file (alongside any inline lists).

**Components reading the language:** every homepage section component, the seven project pages, `ProjectShell`, `EmbedSlot`, `Footer`, and `Nav` import `useLanguage` + `tr`.

---

## FV - Env-driven mobile content trim

The amount of content shown on phones is read from Vite env vars at build time and injected as a single `<style>` block via `<MobileTrimStyles />` (mounted in `src/main.jsx` next to the providers).

| Env var | Default | Controls |
|---------|---------|----------|
| `VITE_MOBILE_PERSONAL_LIMIT` | `4` | First N personal-photo tiles shown on mobile |
| `VITE_MOBILE_IMPACT_LIMIT` | `4` | First N Impact highlights shown on mobile |
| `VITE_MOBILE_PROJECTS_LIMIT` | `3` | First N other-project cards shown on mobile (featured always shown) |
| `VITE_MOBILE_HIDE_EXPERIENCE_META` | `true` | Hide Technologies / Outstanding projects rows under each experience entry |
| `VITE_MOBILE_BREAKPOINT_PX` | `768` | Mobile breakpoint - the `@media (max-width: …)` value |

**Notes:**
- Vite inlines `import.meta.env.VITE_*` at build time. Changing a value requires restarting `npm run dev`.
- A limit of `0` hides the section entirely on mobile; a value above the rendered count effectively disables the trim.
- See [`.env.example`](../.env.example) for the canonical template; copy to `.env.local` for personal overrides (gitignored).

---

## FX - Theme tokens + dark/light toggle

Charcoal + bronze gold dark default with a runtime **dark ↔ light** toggle. Unchanged from the previous portfolio iteration.

### Theme switching

| Piece | File | Notes |
|-------|------|-------|
| Provider + hook | `src/context/ThemeContext.jsx` | `theme`, `setTheme`, `toggleTheme`. `localStorage` key `portfolio-theme`. |
| Mount | `src/main.jsx` | Wraps `<App />` in `<ThemeProvider>`. |
| UI | `src/components/ThemeToggle.jsx` | Sun/moon icon button in `Nav.jsx` `.nav-actions`. |
| Anti-FOUC | `index.html` inline `<script>` in `<head>` | Resolves theme before bundle loads. |

Token table is unchanged - see `src/styles/global.css`.

---

## FY - Dashboard embed system

| Piece | File |
|-------|------|
| Slot component | `src/components/project/EmbedSlot.jsx` - lazy-loads from `dashboards` map (currently empty); supports Fullscreen toggle (Esc to exit) |
| Keys + titles | `src/data/projectEmbeds.js` (currently empty object) |
| TSX dashboards | `src/embeds/*Dashboard.tsx` (none currently shipped) |
| Styles | `src/styles/embed-slot.css` |
| Docs | `src/embeds/README.md` (wiring guide) |

The current project set (CMS, mobile, IoT, portals) does not ship interactive dashboards. The wiring is kept so future projects can register their own with three small edits (registry, lazy import, JSX mount).

---

## FZ - Banner system

Animated banner support is preserved but no banner HTML files ship with the current project set; the home cards render their image fallback.

| Piece | File |
|-------|------|
| Banner HTML | `public/banners/<slug>.html` (none ship today) |
| Iframe wrapper | `src/components/BannerEmbed.jsx` - sandboxed iframe wrapper, still used by `FeaturedProject` / `OtherProject` / `ProjectShell` when a card has a non-null `banner` |
| Home card mount | `FeaturedProject.jsx` / `OtherProject.jsx` |
| Detail hero mount | `ProjectShell.jsx` |

To add a banner: create `public/banners/<slug>.html` and set `banner: '/banners/<slug>.html'` on the matching card in `src/data/projects.js`.

---

## Content source of truth

| Layer | File | Role |
|-------|------|------|
| Mapping reference | `docs/CONTENT_SOURCE.md` | Original copy from `docs/Quoc Huy _ Resume.pdf` mapped to runtime files |
| Homepage runtime | `src/data/*` | What the app actually renders |
| Project runtime | `src/projects/*Project.jsx` | Case study copy and layout |

**Priority:** explicit user instructions in chat override `CONTENT_SOURCE.md`.

---

## Feature dependency matrix

| Feature | Depends on |
|---------|------------|
| Hero | `profile`, `stats.heroStats` |
| Nav | `profile.contact` + section anchors `#impact`, `#experience`, `#about`, `#personal`, `#work` |
| Personal Interest | `personal.images[]` files present in `public/images/personal/` |
| Projects cards | `projects.js` links matching `App.jsx` routes; `banner` path matching a file in `public/banners/` when set |
| Project pages | `projects.js` for pager + optional `getProjectCard`; matching key in `projectEmbeds.js` + lazy entry in `EmbedSlot.jsx` only if a dashboard is added |
| Skill icons | `skills.icon` key ∈ `skillIconMap` keys |
| Theme | All non-hero surfaces reference `var(--*)` tokens from `global.css :root` |
