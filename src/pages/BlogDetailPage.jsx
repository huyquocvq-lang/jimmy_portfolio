import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import BlogBody from '../components/BlogBody'
import { getAdjacentPosts, getPostBySlug } from '../data/blog'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'

function formatDate(iso, lang) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const locale = lang === 'vi' ? 'vi-VN' : 'en-US'
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: '2-digit' })
}

export default function BlogDetailPage() {
  const { lang } = useLanguage()
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  const { prev, next } = getAdjacentPosts(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const title = tr(post.title, lang)
  const excerpt = tr(post.excerpt, lang)
  const coverStyle = post.cover ? { backgroundImage: `url(${post.cover})` } : undefined

  return (
    <>
      <Nav />
      <article className="blog-detail">
        <div
          className={`blog-detail-cover${post.cover ? '' : ' blog-detail-cover--fallback'}`}
          style={coverStyle}
          aria-hidden="true"
        />

        <div className="blog-detail-breadcrumbs-bar">
          <div className="blog-detail-breadcrumbs-wrap">
            <nav className="blog-detail-breadcrumbs" aria-label={tr(ui.shell.breadcrumbAria, lang)}>
              <Link to="/">{tr(ui.shell.breadcrumbHome, lang)}</Link>
              <span className="blog-detail-breadcrumbs__sep" aria-hidden="true">/</span>
              <Link to="/blog">{tr(ui.blog.breadcrumbBlog, lang)}</Link>
              <span className="blog-detail-breadcrumbs__sep" aria-hidden="true">/</span>
              <span className="blog-detail-breadcrumbs__current" aria-current="page">{title}</span>
            </nav>
          </div>
        </div>

        <div className="blog-detail-inner">
          <header className="blog-detail-header">
            <div className="blog-detail-meta">
              <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
              {post.readMinutes && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{post.readMinutes} {tr(ui.blog.readMin, lang)}</span>
                </>
              )}
            </div>
            <h1 className="blog-detail-title">{title}</h1>
            <p className="blog-detail-excerpt">{excerpt}</p>
            {post.tags && post.tags.length > 0 && (
              <ul className="blog-detail-tags" aria-label="Tags">
                {post.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </header>

          <BlogBody blocks={post.body || []} />

          {(prev || next) && (
            <nav className="blog-detail-pager" aria-label={tr(ui.shell.pagerAria, lang)}>
              {prev ? (
                <Link to={`/blog/${prev.slug}`} className="blog-detail-pager-link">
                  <span className="dir">{tr(ui.blog.prevPost, lang)}</span>
                  <span className="name">{tr(prev.title, lang)}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  to={`/blog/${next.slug}`}
                  className="blog-detail-pager-link blog-detail-pager-link--next"
                >
                  <span className="dir">{tr(ui.blog.nextPost, lang)}</span>
                  <span className="name">{tr(next.title, lang)}</span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}

          <p className="blog-detail-back">
            <Link to="/blog">{tr(ui.blog.backToList, lang)}</Link>
          </p>
        </div>
      </article>
      <Footer />
    </>
  )
}
