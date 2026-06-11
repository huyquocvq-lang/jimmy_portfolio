import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import Seo, { PERSON_ID, breadcrumbJsonLd } from '../components/Seo'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import BlogBody from '../components/BlogBody'
import { getAdjacentPosts, getPostBySlug } from '../data/blog'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr, localePath } from '../utils/i18n'

function postJsonLd(post, lang) {
  const neutralPath = `/blog/${post.slug}`
  const url = `https://www.jimmyvu.info${localePath(neutralPath, lang)}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: tr(post.title, lang),
      description: tr(post.excerpt, lang),
      datePublished: post.date,
      image: post.cover ? `https://www.jimmyvu.info${post.cover}` : undefined,
      keywords: (post.tags || []).join(', '),
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID },
      mainEntityOfPage: url,
      inLanguage: lang
    },
    breadcrumbJsonLd(
      [
        { name: tr(ui.shell.breadcrumbHome, lang), path: '/' },
        { name: tr(ui.blog.breadcrumbBlog, lang), path: '/blog' },
        { name: tr(post.title, lang), path: neutralPath }
      ],
      lang
    )
  ]
}

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
    return <Navigate to={localePath('/blog', lang)} replace />
  }

  const title = tr(post.title, lang)
  const excerpt = tr(post.excerpt, lang)
  const coverStyle = post.cover ? { backgroundImage: `url(${post.cover})` } : undefined

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.cover}
        type="article"
        jsonLd={postJsonLd(post, lang)}
      />
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
              <Link to={localePath('/', lang)}>{tr(ui.shell.breadcrumbHome, lang)}</Link>
              <span className="blog-detail-breadcrumbs__sep" aria-hidden="true">/</span>
              <Link to={localePath('/blog', lang)}>{tr(ui.blog.breadcrumbBlog, lang)}</Link>
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
                <Link to={localePath(`/blog/${prev.slug}`, lang)} className="blog-detail-pager-link">
                  <span className="dir">{tr(ui.blog.prevPost, lang)}</span>
                  <span className="name">{tr(prev.title, lang)}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  to={localePath(`/blog/${next.slug}`, lang)}
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
            <Link to={localePath('/blog', lang)}>{tr(ui.blog.backToList, lang)}</Link>
          </p>
        </div>
      </article>
      <Footer />
    </>
  )
}
