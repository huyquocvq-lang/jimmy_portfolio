import { Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'

/**
 * Build the path for a given page number using react-router-friendly URL
 * search params. `basePath` is the route (e.g. `/blog`); `current` highlights
 * the active button.
 */
function pageHref(basePath, page) {
  if (page <= 1) return basePath
  return `${basePath}?page=${page}`
}

function visiblePages(current, total) {
  // Always show first + last + window of 3 around current; ellipses between.
  const set = new Set([1, total, current - 1, current, current + 1])
  const pages = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const out = []
  let prev = 0
  for (const p of pages) {
    if (p - prev > 1) out.push('…')
    out.push(p)
    prev = p
  }
  return out
}

export default function Pagination({ basePath, current, total }) {
  const { lang } = useLanguage()
  if (total <= 1) return null

  const prev = current > 1 ? current - 1 : null
  const next = current < total ? current + 1 : null
  const items = visiblePages(current, total)

  return (
    <nav className="pagination" aria-label={tr(ui.pagination.aria, lang)}>
      {prev ? (
        <Link to={pageHref(basePath, prev)} className="pagination__btn" rel="prev">
          <FaChevronLeft aria-hidden="true" />
          <span>{tr(ui.pagination.prev, lang)}</span>
        </Link>
      ) : (
        <span className="pagination__btn pagination__btn--disabled" aria-disabled="true">
          <FaChevronLeft aria-hidden="true" />
          <span>{tr(ui.pagination.prev, lang)}</span>
        </span>
      )}

      <ol className="pagination__list">
        {items.map((p, i) =>
          p === '…' ? (
            <li key={`gap-${i}`} className="pagination__gap" aria-hidden="true">…</li>
          ) : p === current ? (
            <li key={p} className="pagination__page pagination__page--active" aria-current="page">{p}</li>
          ) : (
            <li key={p} className="pagination__page">
              <Link to={pageHref(basePath, p)}>{p}</Link>
            </li>
          )
        )}
      </ol>

      {next ? (
        <Link to={pageHref(basePath, next)} className="pagination__btn" rel="next">
          <span>{tr(ui.pagination.next, lang)}</span>
          <FaChevronRight aria-hidden="true" />
        </Link>
      ) : (
        <span className="pagination__btn pagination__btn--disabled" aria-disabled="true">
          <span>{tr(ui.pagination.next, lang)}</span>
          <FaChevronRight aria-hidden="true" />
        </span>
      )}
    </nav>
  )
}
