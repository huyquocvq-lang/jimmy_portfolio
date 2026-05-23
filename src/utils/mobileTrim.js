/**
 * Mobile content-trim configuration.
 *
 * Vite inlines `import.meta.env.VITE_*` at build time, so changing any of the
 * variables below requires restarting `npm run dev`. Defaults match what the
 * portfolio shipped with: personal photos 4, impact highlights 4, other
 * projects 3, experience meta hidden. Override any value via `.env.local`
 * (gitignored) or a deployment env-var. Set a limit to 0 to hide the section
 * entirely on mobile; set a very large number (e.g. 99) to disable the trim.
 */
const env = import.meta.env

function readInt(value, fallback) {
  if (value == null || value === '') return fallback
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) && n >= 0 ? n : fallback
}

function readBool(value, fallback) {
  if (value == null || value === '') return fallback
  return /^(true|1|yes|on)$/i.test(String(value).trim())
}

export const mobileTrim = {
  personalLimit: readInt(env.VITE_MOBILE_PERSONAL_LIMIT, 4),
  impactLimit: readInt(env.VITE_MOBILE_IMPACT_LIMIT, 4),
  projectsLimit: readInt(env.VITE_MOBILE_PROJECTS_LIMIT, 3),
  hideExperienceMeta: readBool(env.VITE_MOBILE_HIDE_EXPERIENCE_META, true),
  breakpointPx: readInt(env.VITE_MOBILE_BREAKPOINT_PX, 768)
}

/**
 * Build the @media block that enforces the configured trim. Each `limit`
 * means "show the first N tiles" - items at index `limit + 1` and beyond are
 * hidden with `display: none`. A limit of 0 hides the section entirely; any
 * value greater than the rendered count disables the trim for that section.
 */
export function mobileTrimCSS(config = mobileTrim) {
  const { personalLimit, impactLimit, projectsLimit, hideExperienceMeta, breakpointPx } = config
  const rules = [
    `.personal-tile:nth-of-type(n + ${personalLimit + 1}) { display: none; }`,
    `.impact-item:nth-of-type(n + ${impactLimit + 1}) { display: none; }`,
    `.other-projects > .other-project:nth-of-type(n + ${projectsLimit + 1}) { display: none; }`
  ]
  if (hideExperienceMeta) rules.push('.exp-meta { display: none; }')
  return `@media (max-width: ${breakpointPx}px) {\n  ${rules.join('\n  ')}\n}`
}
