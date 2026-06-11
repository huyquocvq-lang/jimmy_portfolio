import { Link } from 'react-router-dom'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr, localePath } from '../utils/i18n'

function formatDate(iso, lang) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const locale = lang === 'vi' ? 'vi-VN' : 'en-US'
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: '2-digit' })
}

export default function BlogCard({ post, className = '' }) {
  const { lang } = useLanguage()
  const title = tr(post.title, lang)
  const excerpt = tr(post.excerpt, lang)
  const link = localePath(`/blog/${post.slug}`, lang)
  const imgStyle = post.cover ? { backgroundImage: `url(${post.cover})` } : undefined

  return (
    <article className={`blog-card${className ? ` ${className}` : ''}`}>
      <Link to={link} className="blog-card__cover" aria-label={title}>
        <span className="blog-card__cover-inner" style={imgStyle} aria-hidden="true" />
      </Link>

      <div className="blog-card__body">
        <div className="blog-card__meta">
          <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
          {post.readMinutes && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.readMinutes} {tr(ui.blog.readMin, lang)}</span>
            </>
          )}
        </div>

        <h3 className="blog-card__title">
          <Link to={link}>{title}</Link>
        </h3>

        <p className="blog-card__excerpt">{excerpt}</p>

        {post.tags && post.tags.length > 0 && (
          <ul className="blog-card__tags" aria-label="Tags">
            {post.tags.map((t) => (
              <li key={t} className="blog-card__tag">{t}</li>
            ))}
          </ul>
        )}

        <Link to={link} className="blog-card__cta">
          {tr(ui.blog.readArticle, lang)}
        </Link>
      </div>
    </article>
  )
}
