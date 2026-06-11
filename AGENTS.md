# AGENTS.md - Quoc Huy (Jimmy) Portfolio

> **Read this file before changing code.** This repo is **React 18 + Vite 5** (web), **not React Native**.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ (vite build + SEO prerender: scripts/prerender.mjs → static HTML per route + sitemap.xml)
```

Node **18+** required.

## Required when changing code

**Every code or config change must update the matching documentation in the same PR/commit.**  
See mapping table: [docs/USAGE_GUIDE.md](docs/USAGE_GUIDE.md#42-mapping-code-change--documentation).

Do not merge if docs are out of sync with the code.

## Documentation map

| Goal | File |
|------|------|
| Usage guide + doc sync table | [docs/USAGE_GUIDE.md](docs/USAGE_GUIDE.md) |
| AI agent quick reference | [docs/AI_AGENT_GUIDE.md](docs/AI_AGENT_GUIDE.md) |
| Architecture | [docs/ARCHITECTURE_OVERVIEW.md](docs/ARCHITECTURE_OVERVIEW.md) |
| Feature → file | [docs/FEATURE_MAP.md](docs/FEATURE_MAP.md) |
| Static assets | [docs/API_FLOW.md](docs/API_FLOW.md) |
| Full reference | [docs/FULL_DOCUMENTATION.md](docs/FULL_DOCUMENTATION.md) |
| Content source (mapping reference) | [docs/CONTENT_SOURCE.md](docs/CONTENT_SOURCE.md) |

## Quick content edits

| Change | File |
|--------|------|
| Name, tagline, contact | `src/data/profile.js` |
| Impact / hero stats | `src/data/stats.js` |
| About | `src/data/about.js` |
| Skills | `src/data/skills.js` + `src/data/skillIcons.js` |
| Personal Interest (copy + photos) | `src/data/personal.js` (+ `public/images/personal/*.jpeg`) |
| Project card (homepage) | `src/data/projects.js` |
| Project page (layout + copy) | `src/projects/<Name>Project.jsx` + `src/styles/projects/<name>.css` |
| Blog post (data + body) | `src/data/blog.js` (append object; structured `body` array) |
| Blog slider / list / detail layout | `src/components/Blogs.jsx`, `src/components/BlogCard.jsx`, `src/components/BlogBody.jsx`, `src/pages/BlogListPage.jsx`, `src/pages/BlogDetailPage.jsx`, `src/styles/blog.css` |
| All-projects list page | `src/pages/ProjectListPage.jsx` |
| Mobile content trim (env-configurable) | `src/utils/mobileTrim.js`, `src/components/MobileTrimStyles.jsx`, `.env.example` (`VITE_MOBILE_*`) |
| Animated banner (home thumb + detail hero) | `public/banners/<slug>.html` (edit in place) |
| Dashboard embed | `src/embeds/<Name>Dashboard.tsx` + register in `EmbedSlot.jsx` + `projectEmbeds.js` |
| Theme tokens (dark + light) | `src/styles/global.css` `:root` (dark defaults) + `:root[data-theme="light"]` (light overrides) |
| Theme toggle wiring | `src/context/ThemeContext.jsx`, `src/components/ThemeToggle.jsx`, anti-FOUC script in `index.html` |
| Language toggle (EN/VI) | `src/context/LanguageContext.jsx`, `src/utils/i18n.js` (`tr` helper), `src/components/LanguageToggle.jsx`, UI strings in `src/data/ui.js` |
| New route | `src/App.jsx` + `projects.js` slug/link |
| SEO meta / canonical / JSON-LD per route | `src/components/Seo.jsx` (rendered once per page; project pages via `ProjectShell`) |
| Sitemap / prerender / crawler files | `scripts/prerender.mjs` (routes derive from `projects.js` + `blog.js`), `public/robots.txt`, `public/llms.txt`, entity JSON-LD in `index.html` |

## Architecture summary

- **Home:** `src/pages/HomePage.jsx` → Hero, Nav, Impact, Education, Experience, AboutSkills, **PersonalInterest**, Projects, **Blogs**, Footer
- **Projects:** 7 separate files in `src/projects/` (`MmpCmsProject`, `DentsuCmsProject`, `YoolifeProject`, `YooIocProject`, `VnptPortalProject`, `EledevoLandingProject`, `FruitMarketProject`) - **no** shared generic template
- **Shell:** `src/components/project/ProjectShell.jsx` - Nav, hero banner (iframe or image) + dim overlay, breadcrumbs, prev/next, Footer
- **Banners:** `BannerEmbed.jsx` renders `public/banners/<slug>.html` as a sandboxed iframe (currently no banners ship; cards fall back to images)
- **Dashboards:** `EmbedSlot.jsx` lazy-loads `src/embeds/*Dashboard.tsx` (registry currently empty; wiring kept for future projects)
- **Theme:** charcoal + bronze gold dark default; light theme via `:root[data-theme="light"]` override. Tokens on `:root` of `global.css`, referenced via `var(--*)`. Toggle in nav (`ThemeToggle`), state in `ThemeContext`, persisted to `localStorage`.
- **State:** local only for most components (`Hero`, `Nav`, `EmbedSlot` fullscreen) + two React Contexts (`ThemeContext` for dark/light, `LanguageContext` for EN/VI). No Redux, no API.
- **i18n:** strings in `src/data/*` and per-project `CONTENT` consts are `{ en, vi }` pairs (plain string passthrough for proper nouns / tech terms); read via `tr(value, lang)` from `src/utils/i18n.js`. Default language is **English**. **The URL is the source of truth:** every route is mounted twice (`/...` EN, `/vi/...` VI from the `PAGES` table in `App.jsx`); `LanguageSync` derives `lang` from the pathname; internal links must wrap paths in `localePath(path, lang)`; the toggle navigates to the twin URL. No localStorage persistence.

## AI tooling

| Tool | What | Path |
|------|------|------|
| Cursor rule | Doc sync (always on) | `.cursor/rules/sync-documentation.mdc` |
| Cursor skill | Portfolio workflow | `.cursor/skills/portfolio-site/SKILL.md` |
| Claude Code skill | Portfolio workflow | `.claude/skills/portfolio-site/SKILL.md` → `/portfolio-site` |
| Claude Code skill | Doc sync | `.claude/skills/sync-documentation/SKILL.md` → `/sync-documentation` |

## Do not assume

- React Native, Expo, iOS/Android native
- Backend API, auth, or `.env` secrets
- `framer-motion` (not in this project)
