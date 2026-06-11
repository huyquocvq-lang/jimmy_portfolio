# Full Technical Documentation - Quoc Huy (Jimmy) Portfolio

**Repository:** `huyquocvq-lang/portfolio`
**Document version:** 2.0 (resume migration)
**Last aligned to codebase:** React 18 + Vite 5 SPA (web)

---

## ⚠️ Platform clarification

This repository is **not a React Native application**. It is a **React single-page website** built with Vite, targeting browsers (desktop and mobile web). Sections below that refer to iOS, Android, native modules, Metro, or mobile-specific APIs are marked **N/A** with brief rationale.

For mobile-native documentation, a separate React Native codebase would be required.

---

# 1. Project Overview

## What the application does

A personal portfolio website for **Quoc Huy (Jimmy)**, showcasing four-plus years of fullstack engineering experience across digital lending platforms (Viettel Digital), CMS platforms (Magnolia, custom Spring Boot), microservice backends, React Native mobile apps, and IoT/smart-home systems delivered for Viettel Digital, SmartOSC, YooTek Holdings, Hanoi Telecom Corporation, and Eledevo Academy.

**User-facing capabilities:**
- Animated full-screen hero with scroll-driven transitions
- Impact metrics, about narrative, and skills grid
- Featured + grid project previews linking to dedicated case study pages
- Seven uniquely designed project detail pages
- Contact links (LinkedIn, email, phone)
- Responsive layout with mobile navigation drawer

## Main business purpose

Present engineering credibility to recruiters, hiring managers, and clients through real shipped systems (Lending Orchestration Platform, Yoohome AIoT, Dotmar multi-site CMS, custom Zigbee gateway firmware, Hubly community platform with AI moderation) and detailed architectural narratives.

## Key technologies

| Technology | Version (package.json) | Role |
|------------|------------------------|------|
| React | ^18.3.1 | UI library |
| react-dom | ^18.3.1 | DOM rendering |
| Vite | ^5.4.0 | Dev server + production build |
| @vitejs/plugin-react | ^4.3.1 | JSX, Fast Refresh |
| react-router-dom | ^7.15.1 | Client-side routing |
| react-icons | ^5.6.0 | Skill + UI icons (Font Awesome) |

## React version

**React 18.3** (not React Native).

## Main libraries / frameworks

- **Routing:** `react-router-dom` (`BrowserRouter`, `Routes`, `Route`, `Link`, `Navigate`)
- **Icons:** `react-icons/fa` (`FaChevronDown`, `FaBars`, `FaTimes`, skill icons)
- **Styling:** Global CSS + per-page CSS (no UI framework)
- **Analytics:** `@vercel/analytics/react` (`<Analytics />` mounted once in `App.jsx`; auto-tracks page views + react-router route changes on Vercel deploys)
- **SEO / prerender:** `src/components/Seo.jsx` (per-route head metadata + JSON-LD) + `puppeteer` (devDependency, used only by `scripts/prerender.mjs` at build time to snapshot every route into static HTML and generate `dist/sitemap.xml`). `@sparticuz/chromium` + `puppeteer-core` (devDependencies) drive the CI path: on Vercel/CI (`process.env.VERCEL`/`CI`) the prerenderer launches the self-contained sparticuz Chromium build directly (the build image has no bundled Chrome and lacks Chrome's shared libraries); locally it uses puppeteer's bundled Chrome and only falls back to sparticuz if that cannot start. The preview server is started with `open:false` so it does not inherit `server.open:true` from `vite.config.js` and try to spawn a browser on the headless build.

---

# 2. Project Structure

```
portfolio/
├── index.html                 # HTML shell, font CDN links
├── package.json
├── tsconfig.json              # TS config (allowJs; powers src/data/blog.ts typing)
├── vite.config.js             # Vite + SPA mode
├── scripts/
│   └── generate-project-previews.mjs # Generates anonymized project placeholders
├── .gitignore
├── README.md                  # Developer setup guide
├── docs/
│   ├── CONTENT_SOURCE.md      # Authoring / mapping reference (not bundled)
│   ├── USAGE_GUIDE.md
│   ├── FULL_DOCUMENTATION.md
│   ├── AI_AGENT_GUIDE.md
│   ├── ARCHITECTURE_OVERVIEW.md
│   ├── FEATURE_MAP.md
│   └── API_FLOW.md
├── public/
│   └── images/                # Static assets (served at /images/...)
│   └── favicon/               # Browser/mobile favicon variants (served at /favicon/...)
│       ├── personal/*.jpeg
│       └── projects/*.jpg     # 1600x1000 project preview thumbnails
└── src/
    ├── main.jsx               # ReactDOM.createRoot entry
    ├── App.jsx                # Route definitions
    ├── pages/
    │   └── HomePage.jsx       # Landing page composition
    ├── components/
    │   ├── Hero.jsx
    │   ├── Nav.jsx
    │   ├── Impact.jsx
    │   ├── AboutSkills.jsx
    │   ├── Skill.jsx
    │   ├── Projects.jsx
    │   ├── FeaturedProject.jsx
    │   ├── OtherProject.jsx
    │   ├── Footer.jsx
    │   └── project/
    │       └── ProjectShell.jsx
    ├── projects/              # One file per case study (unique UI)
    │   ├── LendingPlatformProject.jsx     # Featured
    │   ├── YoohomeProject.jsx
    │   ├── DotmarCmsProject.jsx
    │   ├── ZigbeeGatewayProject.jsx
    │   └── HublyProject.jsx
    ├── data/                  # Static content modules
    │   ├── profile.js
    │   ├── stats.js
    │   ├── about.js
    │   ├── skills.js
    │   ├── skillIcons.js
    │   ├── education.js
    │   ├── experience.js
    │   ├── personal.js
    │   ├── projects.js
    │   └── projectEmbeds.js   # Empty registry; preserved for future dashboards
    └── styles/
        ├── global.css
        ├── project-shell.css
        └── projects/          # Per-project stylesheets
```

## Folder responsibilities

### `/src/pages`

| File | Purpose |
|------|---------|
| `HomePage.jsx` | Composes homepage sections; handles hash scroll on mount |

### `/src/components`

| File | Purpose |
|------|---------|
| `Hero.jsx` | Full-viewport responsive `<picture>` background + left-anchored text panel + CTA |
| `Nav.jsx` | Sticky nav, mobile hamburger |
| `Impact.jsx` | Impact metrics grid |
| `Education.jsx` | Education list (graduate programs) |
| `Experience.jsx` | Reverse-chronological work timeline |
| `AboutSkills.jsx` | About column + skills grid |
| `Skill.jsx` | Single skill cell with icon |
| `PersonalInterest.jsx` | Personal copy + Pinterest-style masonry image wall |
| `Projects.jsx` | Featured + other projects section (auto-counts) |
| `FeaturedProject.jsx` | Large project card; renders `<BannerEmbed>` when `banner` set |
| `OtherProject.jsx` | Grid project card; ditto |
| `BannerEmbed.jsx` | Sandboxed `<iframe>` wrapper for `public/banners/*.html` |
| `Footer.jsx` | CTA + contact columns |
| `project/ProjectShell.jsx` | Wrapper for all project detail pages - hero banner + breadcrumbs + pager |
| `project/EmbedSlot.jsx` | Lazy slot for dashboards; fullscreen toggle |

### `/src/projects`

**One React component per case study** - each with custom markup and dedicated CSS. This is intentional; do not merge into a generic template.

### `/src/data`

**Single source of truth for homepage content and project card metadata.** Editing these files does not change long-form copy inside `src/projects/*.jsx` (that content is co-located in each project file).

### `/src/styles`

| File | Scope |
|------|-------|
| `global.css` | Reset, typography, `:root` theme tokens, homepage, nav, responsive breakpoints |
| `project-shell.css` | Hero banner, breadcrumbs, prev/next pager |
| `project-intro.css` | Shared project intro block |
| `embed-slot.css` | Dashboard slot (canvas + fullscreen) |
| `projects/*.css` | Scoped to one project page (`.wp-*`, `.pgm-*`, `.retro-*`, `.air-*`, etc.) |

### `/src/embeds`

Claude artifact dashboards as `.tsx` files. One file per detail page; lazy-loaded by `EmbedSlot`. See `src/embeds/README.md` for the full wiring guide.

### `/public`

Files copied verbatim to build output root. Image URLs start with `/images/`. Banner URLs start with `/banners/`.

| Subfolder | Purpose |
|-----------|---------|
| `public/images/hero-banners/` | 8 responsive hero variants (`hero_*.webp` + `.png`) consumed by `<picture>` in `Hero.jsx` |
| `public/images/` | Project preview JPEGs, personal masonry photos, agent screenshots |
| `public/favicon/` | Transparent portrait favicon set: ICO, desktop PNG sizes, Apple touch icon, Android Chrome PNG/WebP variants, and `site.webmanifest` |
| `public/og-image.png` | Social sharing preview image referenced by absolute Open Graph / Twitter URLs in `index.html` |
| `public/banners/` | Self-contained animated HTML banner per project (canonical source, edit in place) |

### `/scripts`

| File | Purpose |
|------|---------|
| `generate-project-previews.mjs` | Builds anonymized SVG placeholder mockups and rasterizes them to `public/images/projects/<slug>.jpg` at 1600×1000 when no approved real/reference visual is available. |

---

# 3. Application Architecture

## Pattern: Data-driven static SPA

- **Presentation components** read imported JSON-like modules from `src/data/`.
- **Project pages** embed narrative structure in dedicated JSX files.
- **No global state manager** - local state only where interaction requires it (hero, nav menu).

## Data flow

```
src/data/*.js  →  import in components  →  render HTML
public/images  →  URL references       →  browser fetches static files
User click     →  react-router Link    →  swap route component, no full reload
```

## State management flow

| Component | State | Purpose |
|-----------|-------|---------|
| `Hero` | (none) | Pure presentation - `<picture>` handles art direction, CSS handles layout/hover |
| `Nav` | `open` | Mobile drawer |
| `EmbedSlot` | `fullscreen` | Toggle dashboard fullscreen view |
| `ThemeProvider` | `theme` | Dark/light theme; persisted to `localStorage['portfolio-theme']` |
| `LanguageProvider` | `lang` | EN/VI; persisted to `localStorage['portfolio-language']`; default `en` |
| `LanguageToggle` | `open` | Dropdown open/close state |
| Banner iframe (inline JS) | `--scale` CSS var | Scale 560×510 canvas to iframe width |

No Redux, Zustand, MobX, or React Query. The only React Contexts are `ThemeContext` and `LanguageContext`.

## API communication flow

**None internally.** See [API_FLOW.md](./API_FLOW.md).

## Navigation structure

- **Router-level:** 1 home + 7 project routes (`src/App.jsx`)
- **Within home:** hash anchors `#impact`, `#about`, `#work`, `#personal`, `#top`
- **Between projects:** `ProjectShell` prev/next uses `getAllProjects()` order

## Dependency relationships

See diagram in [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md).

---

# 4. Environment Setup

## Required tools

| Tool | Version |
|------|---------|
| Node.js | **18+** recommended (Vite 5 requirement) |
| npm | 8+ |

## Installation

```bash
git clone git@github.com:huyquocvq-lang/portfolio.git
cd portfolio
npm install
```

## Environment variables

**None configured.** No `.env` files in repo. Optional future: `VITE_*` for CMS/API.

## iOS setup

**N/A** - not a native iOS project.

## Android setup

**N/A** - not a native Android project.

## Run commands

```bash
npm run dev       # Development: http://localhost:5173 (auto-open per vite.config)
npm run build     # Production build → dist/ (vite build + node scripts/prerender.mjs)
npm run build:spa # Vite build only - skips prerender/sitemap (not for production deploys)
npm run prerender # Re-run prerender + sitemap against an existing dist/
npm run preview   # Preview production build locally
```

## Build output

`dist/` contains `index.html`, hashed JS/CSS assets, copied `public/` files (`robots.txt`, `llms.txt`, `og-image.jpg`, images incl. `.webp` hero banners), plus prerender artifacts: `sitemap.xml` (24 URLs with hreflang annotations) and one `<route>/index.html` per route **in both languages** (`/...` EN and `/vi/...` VI) with the full rendered DOM, per-route meta, localized canonical, and hreflang pair baked in (crawlers without JS get real content; React mounts over it). Deploy as static site with SPA fallback - static files are matched before the fallback.

---

# 5. Navigation System

## Hierarchy

```
/  (HomePage)
├── #top        Hero
├── #impact     Impact
├── #education  Education
├── #experience Work Experience
├── #about      About + Skills
├── #work       Projects
├── #personal   Personal Interest + masonry
└── (Footer)

/projects                      # All-projects list page
/projects/lending-orchestration-platform   # Featured - Lending Orchestration Platform
/projects/yoohome              # Yoohome - Smart Home & AIoT Platform
/projects/dotmar-cms           # Dotmar Multi-Site CMS
/projects/zigbee-gateway-firmware          # Custom Zigbee Gateway Firmware
/projects/hubly                # Hubly - Community Platform with AI Moderation

/blog                          # Blog list (paginated, 9/page, ?page=N)
/blog/:slug                    # Blog detail (renders structured body)
*                              # NotFoundPage - catch-all 404 (noindex)

/vi, /vi/projects, /vi/blog/:slug, ...   # Vietnamese twin of every route above
                                          # (URL drives the language; toggle navigates between twins)
```

## Stack navigation

**N/A** - web SPA uses flat route table, not React Navigation stacks.

## Tab navigation

**N/A.**

## Deep linking

| Type | Example | Handler |
|------|---------|---------|
| Project route | `/projects/hubly` | `react-router-dom` |
| Home section | `/#work` | `HomePage` useEffect + `getElementById` |
| External | LinkedIn URL | `<a target="_blank">` |

## Route naming convention

- Lowercase kebab-case slugs: `hubly`, `lending-orchestration-platform`, `dotmar-cms`
- Prefix: `/projects/`
- Slug defined in `projects.js` → must match `App.jsx` route and `ProjectShell` `slug` prop

## Navigation guards / auth

**None.** All routes are public.

---

# 6. State Management

## Global state

**Not implemented.**

## Local state examples

### Hero entrance (`src/components/Hero.jsx`)

```javascript
const [ready, setReady] = useState(false)

useEffect(() => {
  const id = requestAnimationFrame(() => {
    requestAnimationFrame(() => setReady(true))
  })
  return () => cancelAnimationFrame(id)
}, [])
```

CSS class: `hero--preload` → `hero--ready`.

### Hero scroll (`Hero.jsx`)

```javascript
const progress = Math.min(1, Math.max(0, scrolled / (height * 0.55)))
```

Drives inline `opacity` / `transform` on `.hero-main` and `.hero-scroll-name`.

### Nav drawer (`Nav.jsx`)

```javascript
const [open, setOpen] = useState(false)
// Side effect: document.body.style.overflow = open ? 'hidden' : ''
```

## Store / actions / reducers / async / side effects

**N/A** - no Redux or similar.

Side effects limited to:
- `useEffect` for scroll listeners, keyboard Escape, hash scroll
- No `async` data fetching

---

# 7. API Layer

**Not present.** See [API_FLOW.md](./API_FLOW.md) for external links and future migration notes.

---

# 8. Authentication & Security

| Topic | Status |
|-------|--------|
| Login flow | N/A |
| Session management | N/A |
| Secure storage | N/A |
| Permissions | N/A |
| Biometric | N/A |
| Encryption | N/A |

**Security considerations for static site:**
- No secrets in frontend bundle
- External links use `rel="noreferrer"` where `target="_blank"`
- No user-submitted data / forms

---

# 9. Components System

## Shared UI components

| Component | Reusable? | Notes |
|-----------|-----------|-------|
| `Skill` | Yes | Props: `icon`, `title`, `desc` |
| `FeaturedProject` | Yes | Props: `project` object; renders `<BannerEmbed>` if `project.banner` set |
| `OtherProject` | Yes | Props: `project` object; ditto |
| `BannerEmbed` | Yes | Props: `src`, `title`, `className`; sandboxed iframe |
| `PersonalInterest` | No (singleton) | Reads `personal.js` |
| `ProjectShell` | Yes (project pages only) | Props: `slug`, `children`; embeds banner + breadcrumbs + pager |
| `EmbedSlot` | Yes (project pages only) | Props: `embedKey`, `title`; lazy-loads from `src/embeds/` |
| Section components | Homepage-specific | Hero, Impact, etc. |

## Styling system

- **Global CSS** with BEM-like section classes (`.hero`, `.impact`, `.projects`, `.personal`)
- **Project-specific** class prefixes (`.wp-`, `.pgm-`, `.trend-`, `.retro-`, `.air-`, `.glean-`, `.pfm-`)
- **CSS variables** in `:root` for theme tokens, fonts, and base size

## Theme system

Two themes share one set of tokens. **Dark is the default** and lives on `:root`; **light is an attribute override** on `:root[data-theme="light"]`. The active theme is controlled by `ThemeContext` and an anti-FOUC inline script in `index.html`.

| Token | Dark | Light | Use |
|-------|------|-------|-----|
| `--bg-primary` | `#1a1a1a` | `#ffffff` | Body + most sections |
| `--bg-elevated` | `#222222` | `#f4f4f4` | Cards, panels |
| `--bg-elevated-2` | `#2a2a2a` | `#ececec` | Tiles, dashboard surrounds |
| `--accent` | `#c5a47e` | `#c5a47e` | Eyebrows, links, CTA, accent borders (bronze - same in both themes for brand) |
| `--accent-hover` | `#d4b896` | `#b89468` | Accent hover state |
| `--text-heading` | `#ffffff` | `#1a1a1a` | Headings, big stat numbers, nav links |
| `--text-body` | `#a0a0a0` | `#555555` | Paragraph copy, footer body |
| `--text-muted` | `#808080` | `#888888` | Labels, captions, meta, footer-bottom |
| `--text-on-accent` | `#ffffff` | `#ffffff` | Text inside accent-filled buttons |
| `--border-subtle` | `#2a2a2a` | `#e5e5e5` | Quiet section dividers, footer rules |
| `--border-accent` | `rgba(197,164,126,0.35)` | `rgba(197,164,126,0.5)` | Accented separators |
| `--text-on-dark`, `--text-on-dark-soft`, `--text-on-dark-muted`, `--text-on-dark-faint`, `--border-on-dark` | white-on-dark family | unchanged | Surfaces that stay dark in both themes (hero overlay copy, lightbox chrome). |

### Dark/light toggle implementation

| Piece | File | Notes |
|-------|------|-------|
| Context + hook | `src/context/ThemeContext.jsx` | Exports `ThemeProvider` and `useTheme()` → `{ theme, setTheme, toggleTheme }`. Persists to `localStorage` key `portfolio-theme`; first visit falls back to `window.matchMedia('(prefers-color-scheme: light)')`. On every change, writes `document.documentElement.dataset.theme` and updates `<meta name="theme-color">`. |
| Provider mount | `src/main.jsx` | `<ThemeProvider>` wraps `<App />`. |
| UI control | `src/components/ThemeToggle.jsx` | Sun/moon icon button with accessible `aria-label`. Mounted in `Nav.jsx` `.nav-actions` so it appears on every page (homepage + project pages via `ProjectShell`), desktop and mobile. |
| Anti-FOUC | `index.html` `<head>` | Inline `<script>` reads `localStorage` (then `prefers-color-scheme`) and sets `data-theme` + `theme-color` meta before the React bundle parses. |

### Surfaces excluded from theme switching

- **Hero** (`Hero.jsx`) - copy sits on top of an image with a fixed dark overlay (`rgba(0,0,0,0.55)`). White text is intentional in both themes for readability.
- **Animated banner iframes** - any future `public/banners/*.html` is rendered as a sandboxed iframe with its own palette; the surrounding card/hero wrapper follows the site theme.
- **Animated banners** (`public/banners/*.html`) - self-contained iframed documents with their own colors; not driven by the host site's `data-theme`. Their card/hero wrappers (border, fallback bg) **do** follow the site theme.
- **Dashboard embeds** (`src/embeds/*Dashboard.tsx`) - Claude artifact exports with hard-coded palettes. The surrounding `EmbedSlot` chrome (border, title, fullscreen overlay) follows the site theme.

Display font: Cormorant Garamond (`.author-name`). Body: Source Sans Pro.

## Design conventions

- Uppercase eyebrows with wide letter-spacing (bronze accent)
- Light font weights (300) for headings on dark surfaces
- Hover accent on project titles and CTAs
- Hero overlays + embedded dashboards keep their own internal palettes - site shell theme applies around them
- Mobile breakpoint: **768px** (primary), **960px**, **520px**

---

# 10. Business Logic

## Homepage features

| Feature | Screens / sections | Data | Logic location |
|---------|-------------------|------|----------------|
| Hero | `#top` | `profile`, `heroStats` | `Hero.jsx` |
| Impact | `#impact` | `impactHighlights` | `Impact.jsx` |
| About | `#about` | `about` | `AboutSkills.jsx` |
| Skills | `#about` | `skills`, `skillIcons` | `Skill.jsx` |
| Personal Interest | `#personal` | `personal.js` | `PersonalInterest.jsx` |
| Projects | `#work` | `projects.js`, `public/banners/*.html` | `Projects.jsx`, `BannerEmbed.jsx` |

## Project features (F7–F13)

Documented in [FEATURE_MAP.md](./FEATURE_MAP.md). Each project file contains its own static narrative - no shared business logic module. No detail page currently mounts `EmbedSlot`; the wiring is kept for future dashboards.

---

# 11. Custom Hooks

**No `src/hooks/` directory.** Custom hook patterns are inlined:

| Pattern | File | Equivalent hook name (conceptual) |
|---------|------|-----------------------------------|
| Scroll progress | `Hero.jsx` | Would be `useHeroScrollProgress` |
| Menu lock | `Nav.jsx` | Would be `useMobileNav` |
| Hash scroll | `HomePage.jsx` | Would be `useHashScroll` |
| Scroll to top | `ProjectShell.jsx` | Would be `useScrollOnMount` |

If extracting hooks, prefer:

```
src/hooks/useHeroScrollProgress.js
```

---

# 12. Utilities & Helpers

## Shared helpers (`src/data/projects.js`)

```javascript
export function getAllProjects() {
  return [featuredProject, ...otherProjects]
}

export function getProjectCard(slug) {
  return getAllProjects().find((p) => p.slug === slug)
}
```

## Icon map (`src/data/skillIcons.js`)

Maps string keys → React icon components.

## Validation logic

**None** - static content, no forms.

## Constants

Content constants live in data files, not a separate `constants.js`.

---

# 13. Error Handling

| Layer | Implementation |
|-------|----------------|
| Global error boundary | **Not implemented** |
| API errors | N/A |
| Crash reporting | N/A |
| Logging | `console` only (none in production code) |
| Invalid routes | No catch-all `Route`; host must SPA-fallback |

**Recommendation:** Add React error boundary at `App.jsx` level for production.

---

# 14. Performance Optimization

| Technique | Usage |
|-----------|--------|
| Memoization (`useMemo`/`memo`) | **Not used** - small static tree |
| Lazy loading (`React.lazy`) | **Not used** - bundle is small |
| List virtualization | N/A - short lists |
| Image optimization | Manual - use compressed JPG/WebP in `public/` |
| Scroll listeners | `{ passive: true }` on hero scroll |
| CSS animations | GPU-friendly `transform`/`opacity` on hero |

**Caching:** Browser HTTP cache for static assets; no service worker.

---

# 15. Native Modules

**N/A** - web-only project. No `ios/`, `android/`, or native bridges.

---

# 16. Testing

| Type | Status |
|------|--------|
| Unit tests | Not present |
| Integration tests | Not present |
| E2E (Detox, Playwright) | Not configured |
| Test structure | N/A |

**Suggested:** Playwright for smoke tests (home load, each project route, mobile nav).

---

# 17. CI/CD

| Item | Status |
|------|--------|
| GitHub Actions | Not in repo |
| Fastlane | N/A |
| Bitrise | N/A |
| CodePush / OTA | N/A |

**Manual deploy:** `npm run build` → upload `dist/` to static host (e.g. GitHub Pages).

**Production metadata:** `index.html` uses `https://www.jimmyvu.info/` as the canonical site URL and as the origin for `/og-image.png` in Open Graph / Twitter tags. The Vercel config redirects `https://jimmyvu.info/*` to `https://www.jimmyvu.info/*`, so both www and non-www shared links resolve to the same preview metadata.

---

# 18. Coding Conventions

## Naming

| Entity | Convention | Example |
|--------|------------|---------|
| Components | PascalCase | `LendingPlatformProject.jsx` |
| Data files | camelCase exports | `featuredProject` |
| CSS classes | kebab-case, prefixed per page | `.wp-insight` |
| Routes | kebab-case | `/projects/hubly` |
| Slugs | kebab-case | `lending-orchestration-platform` |

## Folder conventions

- Homepage components in `src/components/`
- Case study pages in `src/projects/`
- Content in `src/data/`

## Component patterns

- Function components only
- Default exports for pages/components
- Named exports for data arrays/objects

## Styling conventions

- One global CSS import in `main.jsx`
- Per-project CSS imported in that project file only
- Avoid inline styles except dynamic hero scroll values

## Git

- `main` branch
- Remote: `git@github.com:huyquocvq-lang/portfolio.git`

---

# 19. AI Agent Guidelines

See dedicated [AI_AGENT_GUIDE.md](./AI_AGENT_GUIDE.md).

**Summary:**
- ✅ Edit `src/data/*` for homepage copy
- ✅ Edit individual `src/projects/*` + CSS for case study design
- ✅ Use approved real/reference visuals for project previews; use `node scripts/generate-project-previews.mjs --force` only for anonymized placeholders
- ⚠️ Keep `slug`, routes, and links synchronized
- ❌ Do not add Redux/API without explicit request
- ❌ Do not treat as React Native

---

# 20. Suggested Improvements

## Architecture

| Improvement | Benefit |
|-------------|---------|
| `React.lazy` per project route | Smaller initial bundle |
| Catch-all route + 404 page | Better unknown URL handling |
| Extract `useHeroScroll`, `useBodyScrollLock` hooks | Cleaner components |
| Optional MDX for project content | Edit copy without touching JSX |

## Performance

| Improvement | Benefit |
|-------------|---------|
| WebP images + `srcset` | Faster LCP on hero |
| Preload hero image in `index.html` | Faster first paint |
| `font-display: swap` already via Google Fonts | - |

## Refactoring

| Improvement | Benefit |
|-------------|---------|
| TypeScript migration | Safer data shape for projects |
| Shared `Section` primitives | Less duplicated CSS for eyebrows/headings |
| Centralize project meta in data files | Single edit for title/tools/impact on detail pages |

## Security

| Improvement | Benefit |
|-------------|---------|
| CSP headers on host | Mitigate XSS if forms added later |
| `rel="noopener noreferrer"` on all external links | Tab-nabbing protection (partially done) |

## Scalability

| Improvement | Benefit |
|-------------|---------|
| CMS (Sanity/Contentful) | Non-dev content updates |
| Auto-generate route table from `projects.js` | Fewer manual `App.jsx` edits |
| Component tests for `getAllProjects` ordering | Stable pager |

---

## Appendix A - `profile.js` schema

```javascript
{
  name: string,         // "Quoc Huy (Jimmy)" - used by Nav logo + Footer
  role: string,         // ` · `-separated specialty list (reused in nav/meta)
  tagline: string,
  intro: string,
  currentRole: { title, company },
  industries: string,
  hud: {                                       // drives the v2 hero layout
    portfolioYear: string,
    availability: string,                      // top-tag text
    available: boolean,                        // toggles green pulsing dot
    eyebrow: string,                           // `- Senior Software Engineer`
    title: { lead: string, accent: string },   // `Quoc Huy` / `Jimmy`
    subtitleLead: string,
    subtitleAccent: string,                    // italic second line
    chips: Array<{ label: string, accent?: boolean }>,
    sideChips: Array<{ label: string, value: string }>,
    monogram: string,                          // `SE/26`
    establishedTag: string                     // `Senior · Est. 2019`
  },
  contact: {
    linkedin,
    linkedinHandle | null,                     // shorter display label
    resume | null,
    phone | null,
    phoneDisplay | null,                       // formatted display variant
    email | null,
    github | null
  }
}
```

Hero background images live in `public/images/hero-banners/` and are not referenced from `profile.js`.

## Appendix B - Project card schema (`projects.js`)

```javascript
{
  slug: string,
  type: string,
  title: string,
  headline?: string,      // featured only
  subtitle: string,
  description: string,
  tools?: string,         // featured only
  impact: string,
  image: string,          // /images/projects/<slug>.jpg preview + ProjectShell fallback
  banner?: string,        // /banners/<slug>.html - enables BannerEmbed on home + detail
  link: string            // must match App.jsx path
}
```

Current project previews are 1600×1000 JPEG thumbnails kept in `public/images/projects/`. Prefer approved real/reference visuals such as public marketing images, product screenshots, or sanitized UI captures; use `scripts/generate-project-previews.mjs` only for anonymized placeholders when no approved visual source exists.

## Appendix B-bis - Personal interest schema (`personal.js`)

```javascript
{
  eyebrow: string,
  heading: string,
  paragraphs: string[],
  images: Array<{ src: string, alt: string }>
}
```

## Appendix B-ter - Dashboard embed schema (`projectEmbeds.js`)

```javascript
{
  [key: string]: {
    embedKey: string,     // matches a key in EmbedSlot dashboards map
    title: string         // shown above the slot
  }
}
```

The matching entry in `src/components/project/EmbedSlot.jsx`:

```javascript
const dashboards = {
  [key]: lazy(() => import('../../embeds/MyDashboard'))
}
```

## Appendix D - i18n bilingual data shape

Every user-facing string in `src/data/*` and the per-page `CONTENT` consts inside `src/projects/*Project.jsx` follows the same rule: plain string for proper nouns / tech terms, `{ en, vi }` object for translated copy.

```ts
type Translatable = string | { en: string; vi: string }

// Examples in src/data/profile.js
const profile = {
  name: 'Quoc Huy (Jimmy)',                 // plain - proper noun
  role: 'Senior Fullstack Software Engineer · CMS Platforms · IoT · Tech Lead', // plain - tech terms
  tagline: { en: 'I build…', vi: 'Tôi xây…' },  // translated
  hud: {
    sideChips: [
      { label: { en: 'Experience', vi: 'Kinh nghiệm' },
        value: { en: '4+ years · Senior', vi: '4+ năm · Senior' } },
      { label: { en: 'Also Does', vi: 'Kiêm nhiệm' },
        value: 'Tech Lead · Firmware' }       // plain - tech role
    ]
  }
}
```

**Consumption:**

```jsx
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'

function Component() {
  const { lang } = useLanguage()
  return <h1>{tr(profile.tagline, lang)}</h1>
}
```

`tr(value, lang)`:
- string / number → returned unchanged
- `{ en, vi }` → returns `value[lang]` (falls back to `value.en` if the requested lang is missing)
- otherwise → returned unchanged

UI strings not tied to a section's data file live in `src/data/ui.js` (nav labels, breadcrumbs, pager, footer headings, embed slot text).

---

## Appendix C - Related documentation

| Document | Audience |
|----------|----------|
| [AI_AGENT_GUIDE.md](./AI_AGENT_GUIDE.md) | AI coding agents |
| [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md) | Architects / senior devs |
| [FEATURE_MAP.md](./FEATURE_MAP.md) | Product / feature owners |
| [API_FLOW.md](./API_FLOW.md) | Backend engineers (future API) |
| [CONTENT_SOURCE.md](./CONTENT_SOURCE.md) | Authoring / mapping reference (user instructions override) |
| [USAGE_GUIDE.md](./USAGE_GUIDE.md) | Usage + doc sync |

---

*End of full documentation.*
