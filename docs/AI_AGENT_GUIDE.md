# AI Agent Guide - Quoc Huy (Jimmy) Portfolio

> **Read this first.** This repo is a **React 18 + Vite 5** fullstack engineering portfolio website, **not React Native**. Do not add `react-native`, `expo`, or mobile native folders unless explicitly requested.

## Mandatory: sync documentation

**Every code/config change must update the relevant docs in the same task** (same commit/PR).  
See mapping table: [USAGE_GUIDE.md](./USAGE_GUIDE.md#42-mapping-code-change--documentation).  
Entry points: [AGENTS.md](../AGENTS.md); Cursor: rule `.cursor/rules/sync-documentation.mdc`, skill `.cursor/skills/portfolio-site/SKILL.md`; Claude Code: `.claude/skills/portfolio-site/SKILL.md` (`/portfolio-site`), `.claude/skills/sync-documentation/SKILL.md` (`/sync-documentation`).

## Quick facts

| Item | Value |
|------|-------|
| Framework | React 18.3 |
| Bundler | Vite 5.4 |
| Router | react-router-dom 7.x |
| Icons | react-icons (Font Awesome subset) |
| State | Local `useState` / `useEffect` + two global React Contexts: `ThemeContext` (dark/light) and `LanguageContext` (EN/VI) |
| Backend | None |
| Styling | Plain CSS files (no Tailwind, no CSS modules) |

## Safe to modify ✅

| Area | Files | Risk |
|------|-------|------|
| Copy / metrics | `src/data/profile.js`, `stats.js`, `about.js`, `skills.js`, `personal.js`, `education.js`, `experience.js` | Low |
| Project card blurbs | `src/data/projects.js` | Low - keep `slug` + `link` + `banner` in sync |
| Single project layout | `src/projects/<Name>Project.jsx` + matching `src/styles/projects/*.css` | Low if isolated |
| Homepage section styles | `src/styles/global.css` | Medium - affects whole site (theme vars in `:root` are global) |
| Footer / Impact text | `src/components/Footer.jsx`, `Impact.jsx` | Low |
| Personal photos | `public/images/personal/personal_*.jpeg` | Low |
| Project preview images | `public/images/projects/*.jpg`, `scripts/generate-project-previews.mjs` | Low - previews are anonymized mockups; use `--force` only when intentionally replacing generated JPEGs |
| Banner HTML | `public/banners/<slug>.html` | Low - keep the `.banner-fit` wrapper + scale JS |
| Dashboard embed body | `src/embeds/*Dashboard.tsx` (overwrite in place; keep default export) | Low |
| Images | `public/images/**` | Low |
| Favicon assets | `public/favicon/**`, `index.html` favicon links | Low |
| Content mapping reference | `docs/CONTENT_SOURCE.md` | Low (not bundled; user chat overrides) |

## Dangerous / core ⚠️

| Area | Why |
|------|-----|
| `src/App.jsx` routes | Missing route = 404 on deploy; wrong component = broken page |
| `projects.js` slug/link order | Breaks prev/next pager in `ProjectShell` |
| `getAllProjects()` order | Featured is always index 0 for pager |
| `Hero.jsx` `<picture>` source order | Most-specific media first; WebP before PNG within each art-direction. Reordering can pick the wrong image (or none) |
| `Hero.jsx` HUD layout | Layout is a 5-area CSS grid (`tag` / `side` / `main` / `contact` / `mark`); `profile.hud` is the source of truth for every piece. Renaming a `hud.*` key breaks the matching block silently. |
| Mobile content trim (≤ `VITE_MOBILE_BREAKPOINT_PX`) | Personal photos, Impact highlights, Other projects, and Experience meta rows are reduced via `:nth-of-type` / `display: none` injected at runtime by `<MobileTrimStyles />`. Values come from `VITE_MOBILE_*` env vars (see `.env.example`); Vite inlines them at build time, so restart the dev server after editing `.env`. Source data is untouched. |
| Nav scroll-spy (`Nav.jsx`) | `useActiveSection` uses `IntersectionObserver` against `HOMEPAGE_SECTIONS` ids. Only runs on the homepage (`isHome`). Adding / renaming a homepage section requires updating the `HOMEPAGE_SECTIONS` array. The Blog and Projects links also factor in `useLocation` for route-based active state. |
| Tech marquee (`TechMarquee.jsx`) | Reads `techMarquee` from `src/data/skills.js`. The track duplicates the list to fake an infinite loop; if you change the badge count, the `50s` keyframe duration may need a tweak so the scroll speed stays comfortable. Hover and `prefers-reduced-motion` pause / disable the animation. |
| Favicon set (`public/favicon/*`) | Full set + PWA manifest is wired in `index.html` `<head>`. `Nav.jsx` reuses `favicon-96x96.png` (64/128/256 srcSet) as the brand logo in the header. Replacing the favicon means regenerating the set and keeping the same filenames so no link tags need to change. |
| `public/images/hero-banners/*` filenames | Hard-coded slugs (`hero_mobile_portrait`, `hero_ultrawide`, …) - renaming breaks `Hero.jsx` |
| `Nav.jsx` body scroll lock | Regressions trap scroll on mobile |
| `skillIcons.js` keys | Unknown `icon` key in `skills.js` → blank icon |
| `ProjectShell.jsx` | Shared by all 5 project pages |
| `BannerEmbed.jsx` + `public/banners/*.html` | Banner HTML must keep `.banner-fit` 560×510 + inline JS that sets `--scale` |
| `EmbedSlot.jsx` `dashboards` map | Missing entry for an embed key in `projectEmbeds.js` → silently renders nothing |
| Theme tokens in `:root` (`global.css`) | Renaming a `--*` variable breaks every file that consumes it - refactor with care |
| `src/utils/i18n.js` `tr()` shape | Returns `value[lang]` only when the value looks like `{ en, vi }`. Renaming the `en` / `vi` keys silently makes everything fall back to passthrough. Always pass `lang` from `useLanguage()`, never hardcode. |
| `src/data/ui.js` keys | Imported by Nav/Hero/Footer/Impact/Education/Experience/Projects/ProjectShell/EmbedSlot - renaming a key breaks the matching label silently. |

## Project dashboard embeds

TSX exports live in `src/embeds/`, lazy-loaded by `EmbedSlot.jsx` + `projectEmbeds.js`.

| Embed key | Route |
|-----------|-------|
| _(no embeds registered today - `dashboards` map and `projectEmbeds` object are empty)_ | - |

The current project set (CMS, mobile, IoT, portals) does not ship interactive dashboards. The wiring is preserved so a future project can add one with three small edits - registry, lazy import, JSX mount. See `src/embeds/README.md`.

## Banner system (home thumbs + detail hero)

Banner support is preserved but no banner HTML files ship with the current project set - cards fall back to images (or the dark fallback panel when images are absent).

| Piece | Detail |
|-------|--------|
| Files | `public/banners/<slug>.html` - canonical source, edit in place (none currently shipped) |
| Native canvas | 560 × 510 inside `.banner-fit` |
| Scaling | Inline `<script>` sets `--scale = window.innerWidth / 560` on `<html>`; CSS uses `transform: scale(var(--scale))`. **Do not** revert to `transform: scale(calc(100vw/560))` - that's invalid CSS (length where a number is required) and silently leaves scale at 1 |
| Wrapper | `src/components/BannerEmbed.jsx` - sandboxed iframe (`allow-scripts allow-same-origin`), `loading="lazy"` |
| Mount | Home: `FeaturedProject` / `OtherProject`; Detail: `ProjectShell` when `project.banner` ends in `.html`/`.svg` |
| Detail overlay | `radial-gradient` + `linear-gradient` dim on `.project-shell-banner--embed::after` |

To add a banner: create `public/banners/<slug>.html` (copy the wrapper + scale script pattern from any prior banner in git history) and set `banner: '/banners/<slug>.html'` on the matching card in `src/data/projects.js`.

## Theme tokens + dark/light toggle

CSS variables on `:root` in `src/styles/global.css` define the **dark** defaults; `:root[data-theme="light"]` overrides them with a light palette. Use `var(--*)`, never hardcode the swatch.

| Token | Dark | Light | Purpose |
|-------|------|-------|---------|
| `--bg-primary` | `#1a1a1a` | `#ffffff` | Body / most sections |
| `--bg-elevated` | `#222222` | `#f4f4f4` | Cards, panels |
| `--bg-elevated-2` | `#2a2a2a` | `#ececec` | Tiles, dashboard surrounds |
| `--accent` | `#c5a47e` | `#b89468` | Eyebrows, links, CTA, accent borders (bronze; darker variant on light for AA contrast) |
| `--accent-hover` | `#d4b896` | `#a67f54` | Accent hover |
| `--text-heading` | `#ffffff` | `#0d0d0d` | Headings, big numbers, nav links |
| `--text-body` | `#d0d0d0` | `#2a2a2a` | Paragraph copy |
| `--text-muted` | `#a8a8a8` | `#555555` | Labels, captions |
| `--text-on-accent` | `#ffffff` | `#ffffff` | Text on accent-filled buttons |
| `--border-subtle` | `#2a2a2a` | `#d8d8d8` | Section dividers |
| `--border-accent` | `rgba(197,164,126,0.35)` | `rgba(184,148,104,0.55)` | Featured / Impact separators |

Theme switching:

- `src/context/ThemeContext.jsx` - `ThemeProvider` wraps `<App />` in `main.jsx`. Hook: `useTheme()` → `{ theme, setTheme, toggleTheme }`.
- `src/components/ThemeToggle.jsx` - sun/moon button mounted in `Nav.jsx` `.nav-actions` (visible on home + project pages, desktop + mobile).
- Preference persisted to `localStorage` key `portfolio-theme`. First visit reads `prefers-color-scheme`.
- `index.html` `<head>` runs an inline anti-FOUC script that sets `data-theme` and the `<meta name="theme-color">` before the React bundle loads.

Always-dark surfaces (kept dark in both themes) - hero overlay copy, AI rewriter lightbox, banner iframes, dashboard internal palettes - use the `--text-on-dark*` / `--border-on-dark` family or are inherently isolated (sandboxed iframe, Claude artifact dashboards).

## Personal interest section (F4b)

- Component: `src/components/PersonalInterest.jsx` · anchor `#personal`
- Data: `src/data/personal.js` (eyebrow, heading, paragraphs, images)
- Layout: Pinterest-style CSS-columns masonry (3 / 2 / 1 cols responsive)
- Photos: `public/images/personal/personal_1.jpeg` … `personal_8.jpeg` (ordered chronologically; HEIC originals must be converted to JPEG via `sips -s format jpeg -Z 1600` before web use - HEIC does not render in Chrome / Firefox / Edge)

## i18n (EN / VI)

Default language is **English**. User selection persists in `localStorage['portfolio-language']`.

| Piece | File |
|-------|------|
| Provider + hook | `src/context/LanguageContext.jsx` (`LanguageProvider`, `useLanguage()` → `{ lang, setLang, toggleLang }`) |
| Helper | `src/utils/i18n.js` - `tr(value, lang)` resolves `{ en, vi }` objects, passes through everything else (proper nouns, tech terms) |
| Toggle UI | `src/components/LanguageToggle.jsx` - globe icon + EN/VI code + dropdown |
| UI strings | `src/data/ui.js` - every label not tied to a section's data file (nav, breadcrumbs, pager, footer headings, embed slot) |

**Authoring rule:** any new user-facing string should be `{ en: '...', vi: '...' }`. Proper nouns, framework / tech names, role titles, project names stay as plain strings. Project case studies keep their per-page bilingual copy in a local `CONTENT` const at the top of the JSX file.

To add a new homepage section: import `{ useLanguage } from '../context/LanguageContext'` and `{ tr } from '../utils/i18n'`, then wrap each translatable value with `tr(value, lang)`.

## Routes

Top-level pages:

| Route | Component | Notes |
|-------|-----------|-------|
| `/` | `HomePage` | Hero → Impact → Education → Experience → AboutSkills → Projects → PersonalInterest → Blogs → Footer |
| `/projects` | `ProjectListPage` | All projects in one grid, no pagination |
| `/projects/:slug` | one of 5 `*Project.jsx` files | Individual case study |
| `/blog` | `BlogListPage` | Paginated grid (9/page, `?page=N`) |
| `/blog/:slug` | `BlogDetailPage` | Structured body renderer (BlogBody) |

Project slug → JSX:

| Slug | Route | JSX component |
|------|-------|---------------|
| `lending-orchestration-platform` (Featured) | `/projects/lending-orchestration-platform` | `src/projects/LendingPlatformProject.jsx` |
| `yoohome` | `/projects/yoohome` | `src/projects/YoohomeProject.jsx` |
| `dotmar-cms` | `/projects/dotmar-cms` | `src/projects/DotmarCmsProject.jsx` |
| `zigbee-gateway-firmware` | `/projects/zigbee-gateway-firmware` | `src/projects/ZigbeeGatewayProject.jsx` |
| `hubly` | `/projects/hubly` | `src/projects/HublyProject.jsx` |

## Blog system

| Piece | File |
|-------|------|
| Data + helpers | `src/data/blog.js` - `getAllPosts()` (sorted desc), `getPostBySlug(slug)`, `getAdjacentPosts(slug)` |
| Card | `src/components/BlogCard.jsx` - reused by slider + list page |
| Slider | `src/components/Blogs.jsx` - CSS scroll-snap + arrow buttons; mounted on home between `Projects` and `Footer` |
| Body renderer | `src/components/BlogBody.jsx` - switch over block `type` (`paragraph`, `heading`, `list`, `code`, `quote`, `callout`, `image`) |
| Pagination | `src/components/Pagination.jsx` - `?page=N` URL param, ellipses around first/last/current |
| List page | `src/pages/BlogListPage.jsx` |
| Detail page | `src/pages/BlogDetailPage.jsx` - redirects to `/blog` if slug unknown |
| Styles | `src/styles/blog.css` (loaded from `src/main.jsx`) |

Adding a post: append to the `blog` array in `src/data/blog.js`. Required fields: `slug`, `title`, `excerpt`, `date` (ISO `YYYY-MM-DD`), `tags`, `body`. Cover image path is optional. Body block text fields use `{ en, vi }` pairs.

Each page reuses one of the legacy CSS class prefixes (`.wp-`, `.pgm-`, `.trend-`, `.pfm-`, `.glean-`, `.air-`, `.retro-`) for layout - matching the renamed CSS file under `src/styles/projects/`.

---

## Do NOT assume exists

- Redux / Zustand
- Multiple Context providers (only `ThemeContext` exists - see `src/context/ThemeContext.jsx`)
- `src/api/`, `src/services/`, `src/hooks/` (no custom hooks folder yet)
- Environment variables: only `VITE_MOBILE_*` are wired (mobile content trim). See `.env.example` for the canonical list and defaults.
- Tests (`*.test.*` absent)
- CI config in repo
- React Native / Expo / `app.json`

## Workflow: edit homepage text

1. Check `docs/CONTENT_SOURCE.md` for the intended copy (mapping only).
2. Apply changes to `src/data/*` - **user chat instructions override** `CONTENT_SOURCE.md`.
3. If narrative changed, update the matching section in `docs/CONTENT_SOURCE.md` unless the user gave one-off copy.
4. Run `npm run dev` and verify `/#impact`, `/#about`, `/#work`.
5. Update `docs/FEATURE_MAP.md` if feature scope changed.
6. Check mobile (`≤768px`) in DevTools.

## Workflow: add a new project (8th)

1. **Data** - Add object to `otherProjects` (or swap featured) in `src/data/projects.js`:

```javascript
{
  slug: 'my-new-project',
  type: 'Category · Tags',
  title: 'Short Title',
  subtitle: 'One line',
  description: 'Card teaser for homepage grid',
  impact: 'One line impact',
  image: '/images/projects/my-new-project.jpg',
  banner: '/banners/my-new-project.html', // optional animated banner
  link: '/projects/my-new-project'
}
```

2. **Page** - Create `src/projects/MyNewProject.jsx`:

```javascript
import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import '../styles/projects/my-new-project.css'

const meta = getProjectCard('my-new-project')

export default function MyNewProject() {
  return (
    <ProjectShell slug="my-new-project">
      <article className="myproj">
        {/* Custom layout - do not copy generic template */}
        <h1>{meta.title}</h1>
      </article>
    </ProjectShell>
  )
}
```

3. **Styles** - `src/styles/projects/my-new-project.css` (unique class prefix).

4. **Route** - `src/App.jsx`:

```javascript
import MyNewProject from './projects/MyNewProject'
// ...
<Route path="/projects/my-new-project" element={<MyNewProject />} />
```

5. **Assets** - `public/images/projects/my-new-project.jpg` (fallback). For the current seven shipped projects, previews are generated by `node scripts/generate-project-previews.mjs --force`; for a new project, either add a matching anonymized preview manually or extend that script. Optionally add `public/banners/my-new-project.html` (use any existing banner file as a template - keep the `.banner-fit` 560×510 wrapper and inline `--scale` script).

6. **Dashboard (optional)** - Drop `MyNewDashboard.tsx` in `src/embeds/`; register in `src/components/project/EmbedSlot.jsx` `dashboards` map; add `myNew: { embedKey: 'myNew', title: '…' }` to `src/data/projectEmbeds.js`; mount `<EmbedSlot {...projectEmbeds.myNew} />` on the page.

7. **Verify** - Homepage card links, project page, prev/next pager order, banner fits at any width.

8. **Docs** - Update `FEATURE_MAP.md`, `ARCHITECTURE_OVERVIEW.md`, `FULL_DOCUMENTATION.md`, `API_FLOW.md`, `src/embeds/README.md` (if you added an embed), and `AGENTS.md` if routes changed.

## Workflow: add homepage section

1. Create `src/components/MySection.jsx` with `id="my-section"` on root element.
2. Add data file if needed: `src/data/mySection.js`.
3. Import in `src/pages/HomePage.jsx` (order matters visually).
4. Style in `src/styles/global.css`.
5. Add nav link in `src/components/Nav.jsx`: `<a href="/#my-section">`.

## Workflow: change project page design only

- Edit **only** `src/projects/<Project>.jsx` and `src/styles/projects/<project>.css`.
- Do **not** change `ProjectShell` unless all projects need the change.
- `ProjectShell` slug prop must match `projects.js` slug.

## Workflow: add skill card

1. Add icon key to `src/data/skillIcons.js` (import from `react-icons/fa` or other pack).
2. Add entry to `src/data/skills.js` with matching `icon` key.
3. Grid auto-updates via `AboutSkills.jsx` map.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output: dist/
npm run preview  # serve production build
```

**Node:** Vite 5 requires Node 18+ (see `package.json` engines warnings on Node 16).

## Deployment note for agents

After `npm run build`, deploy `dist/` with SPA fallback to `index.html` for `/projects/*` routes.

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `href="#work"` on project page | Use `href="/#work"` or `<Link to="/#work">` |
| `motion.div` typo in JSX | Use `motion.div` - project has no framer-motion; use `div` |
| Shared generic project template | Each project must keep its own JSX/CSS file |
| Huge images in repo | Optimize; reference paths under `public/images/` |
| Editing only `projects.js` for case study body | Long-form content lives in `src/projects/*.jsx` |

## File path cheat sheet

```
src/main.jsx              Entry, CSS imports, ThemeProvider wrap
src/App.jsx               Routes
src/context/ThemeContext.jsx  Dark/light theme provider + useTheme hook
src/components/ThemeToggle.jsx  Sun/moon button (mounted in Nav)
src/pages/HomePage.jsx    Landing composition
src/components/Hero.jsx   Banner + scroll effects
src/components/Nav.jsx    Header + mobile menu
src/components/PersonalInterest.jsx  Interest copy + masonry wall
src/components/BannerEmbed.jsx       Sandboxed iframe for project banners
src/data/profile.js       Name, role, tagline, intro, contact
src/data/projects.js      Cards + slugs + helpers + banner paths
src/data/personal.js      Personal interest copy + image list
src/data/projectEmbeds.js Embed keys → titles
src/embeds/*Dashboard.tsx Lazy-loaded Claude artifact exports
src/components/project/EmbedSlot.jsx    Dashboard slot + fullscreen
src/components/project/ProjectShell.jsx Shared project wrapper (hero banner + breadcrumbs + pager)
src/projects/*Project.jsx               Individual case studies
src/styles/global.css                   Theme vars (:root) + homepage responsive
src/styles/project-shell.css            Shell chrome
src/styles/projects/*.css               Per-project page styles
public/images/hero-banners/hero_*.{webp,png}   Art-directed hero variants (8 sizes × 2 formats)
public/banners/<slug>.html              Canonical animated banner per project
public/images/projects/*.jpg            Anonymized 1600x1000 project previews
public/images/personal/*.jpeg           Personal interest masonry photos
public/images/agents/*.png              AI rewriter demo screenshots
public/favicon/*                        Transparent portrait favicon variants and web app manifest
scripts/generate-project-previews.mjs   Regenerates current project preview JPEGs
docs/CONTENT_SOURCE.md                  Authoring reference for mapping (not runtime)
```

## When to ask the human

- Adding npm dependencies (keep bundle lean)
- Changing URL structure / slugs (breaks bookmarks)
- Adding backend, auth, or forms
- Converting to React Native (greenfield, not migration)
- Committing secrets or `.env` files

## Related docs

- [USAGE_GUIDE.md](./USAGE_GUIDE.md) - usage guide + doc sync table
- [AGENTS.md](../AGENTS.md) - root entry for Cursor / Claude
- [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)
- [FEATURE_MAP.md](./FEATURE_MAP.md)
- [API_FLOW.md](./API_FLOW.md)
- [FULL_DOCUMENTATION.md](./FULL_DOCUMENTATION.md)
