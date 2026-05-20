# Portfolio — Quoc Huy (Jimmy)

React + Vite portfolio for **Quoc Huy (Jimmy)** - Senior Fullstack Software Engineer.
Data is centralized in `src/data/` for easy editing; each project case study has its own JSX + CSS file.

## Content source

The primary content source is the bundled resume at **[docs/Quoc Huy _ Resume.pdf](./docs/Quoc%20Huy%20_%20Resume.pdf)**.
Long-form copy mapping lives in **[docs/CONTENT_SOURCE.md](./docs/CONTENT_SOURCE.md)** (not bundled in the app).
Runtime text is in `src/data/*` and `src/projects/*`. User instructions in chat override the content source file.

## AI / Cursor / Claude

| File | Purpose |
|------|---------|
| [AGENTS.md](./AGENTS.md) | Entry point for AI agents |
| [docs/USAGE_GUIDE.md](./docs/USAGE_GUIDE.md) | Usage guide + doc sync table |
| [docs/AI_AGENT_GUIDE.md](./docs/AI_AGENT_GUIDE.md) | Agent workflows (EN) |
| `.cursor/rules/sync-documentation.mdc` | Rule: every code change must update docs |
| `.cursor/skills/portfolio-site/SKILL.md` | Cursor skill → invoke or auto-load |
| `.claude/skills/portfolio-site/SKILL.md` | Claude Code skill → `/portfolio-site` |
| `.claude/skills/sync-documentation/SKILL.md` | Claude Code skill → `/sync-documentation` |
| [CLAUDE.md](./CLAUDE.md) | Claude Code project instructions |

**Rule:** any code change → update the matching docs in the same commit.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

Node 18+ is required (Vite 5).

## Build for production

```bash
npm run build
# Output: dist/
```

## Folder structure

```
portfolio/
├── public/
│   ├── hero-banners/             ← Responsive hero images (PNG variants)
│   ├── images/
│   │   ├── personal/             ← Pinterest masonry photos (personal_1..6.jpeg)
│   │   └── projects/             ← Per-project card images (mmp-cms.jpg, etc.)
│   └── banners/                  ← Animated banner HTMLs (none ship today)
├── src/
│   ├── data/                     ← ALL CONTENT LIVES HERE
│   │   ├── profile.js            ← Name, role, tagline, contact
│   │   ├── stats.js              ← Hero stats + Impact highlights
│   │   ├── about.js              ← About section copy
│   │   ├── skills.js             ← Skills grid
│   │   ├── skillIcons.js         ← Icon key → react-icons map
│   │   ├── education.js          ← Education list (HUST)
│   │   ├── experience.js         ← Work timeline (SmartOSC, YooTek, …)
│   │   ├── personal.js           ← Personal Interest copy + masonry images
│   │   ├── projects.js           ← Featured + Other projects
│   │   ├── projectEmbeds.js      ← Dashboard registry (empty today)
│   │   ├── blog.js               ← Blog posts (structured body)
│   │   └── ui.js                 ← Hardcoded UI strings (nav, breadcrumbs, footer, etc.) – { en, vi } pairs
│   ├── utils/
│   │   └── i18n.js               ← tr(value, lang) helper for { en, vi } resolution
│   ├── components/               ← Homepage UI components
│   ├── components/project/       ← Shared project shell + embed slot
│   ├── projects/                 ← One JSX per project (unique layouts)
│   ├── styles/
│   │   ├── global.css            ← Theme tokens + homepage styles
│   │   ├── project-shell.css     ← Shared project chrome
│   │   ├── project-intro.css     ← Shared project intro block
│   │   ├── embed-slot.css        ← Dashboard slot styles
│   │   └── projects/             ← Per-project CSS (mmp-cms.css, etc.)
│   ├── App.jsx                   ← Route table
│   └── main.jsx                  ← Entry + ThemeProvider
├── index.html
├── package.json
└── vite.config.js
```

## How to edit content

All editable content lives in `src/data/`. You don't need to touch components.

### Change name, tagline, contact
Edit `src/data/profile.js`

### Change hero stats or impact numbers
Edit `src/data/stats.js`

### Change About text
Edit `src/data/about.js` — `paragraphs` is an array, add/remove freely.

### Change skills
Edit `src/data/skills.js` — array of skill objects (each `icon` key must exist in `skillIcons.js`).

### Add / edit / reorder projects
Edit `src/data/projects.js`:
- `featuredProject` — the pinned project at the top
- `otherProjects` — array; add/remove/reorder items

To swap which project is featured: move the object between `featuredProject` and `otherProjects`. Keep `slug` aligned with the route in `src/App.jsx` and the `slug` prop passed to `ProjectShell` in the project's JSX.

## How to add images

1. Put your image file in `public/images/` (or `public/images/projects/`)
2. Reference it in the data file as `/images/your-file.jpg`
   (path starts with `/`, no `public` prefix — Vite serves `public/` at root)

Example:
```js
image: '/images/projects/mmp-cms.jpg'
```

## Replacing the placeholder images

The current project cards reference image paths that are not yet shipped. Add real images at:

- `public/hero-banners/hero_*.png` (hero responsive variants - existing assets in repo)
- `public/images/projects/mmp-cms.jpg`
- `public/images/projects/dentsu-cms.jpg`
- `public/images/projects/yoolife.jpg`
- `public/images/projects/yooioc.jpg`
- `public/images/projects/vnpt-portal.jpg`
- `public/images/projects/eledevo-landing.jpg`
- `public/images/projects/fruit-market.jpg`

Recommended sizes:
- Hero: art-direct variants in `public/hero-banners/` cover most viewports
- Featured project: 1400×900 (16:10 aspect)
- Other projects: 1200×750 (16:10 aspect)

Avoid uploading internal screenshots, confidential client data, or proprietary code from past employers - use anonymized summaries and architectural visuals that show the engineering thinking without exposing company-specific details.

## Mobile content trim (env-configurable)

How much content is shown on phones is configurable via `.env`. Copy [`.env.example`](./.env.example) to `.env.local` (gitignored) and override any of:

| Var | Default | Effect |
|-----|---------|--------|
| `VITE_MOBILE_PERSONAL_LIMIT` | `4` | First N personal photos shown on mobile |
| `VITE_MOBILE_IMPACT_LIMIT` | `4` | First N Impact highlights shown on mobile |
| `VITE_MOBILE_PROJECTS_LIMIT` | `3` | First N other-project cards shown on mobile (featured always shown) |
| `VITE_MOBILE_HIDE_EXPERIENCE_META` | `true` | Hide Technologies / Outstanding projects rows under each experience entry |
| `VITE_MOBILE_BREAKPOINT_PX` | `768` | Mobile breakpoint width |

Vite inlines `VITE_*` env vars at build time, so after editing `.env` restart `npm run dev`. Setting a limit to `0` hides the section entirely on mobile; setting it to a large number disables the trim.

## Bilingual content (EN / VI)

Site ships in English + Vietnamese; English is the default. Pick the active language from the globe icon in the nav.

Authoring rule for `src/data/*` and per-project `CONTENT` consts:
- Plain string → proper nouns, framework / tech names, role titles, project names, URLs, dates.
- `{ en, vi }` object → headings, paragraphs, labels, button text.

Components read the active language with `useLanguage()` from `src/context/LanguageContext.jsx` and resolve copy with `tr(value, lang)` from `src/utils/i18n.js`. UI strings not tied to a section live in `src/data/ui.js`. When updating copy, edit both EN and VI in the same change.
