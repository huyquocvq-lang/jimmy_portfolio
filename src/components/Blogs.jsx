import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { getAllPosts } from '../data/blog'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import BlogCard from './BlogCard'

export default function Blogs() {
  const { lang } = useLanguage()
  const posts = getAllPosts()
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const refreshScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return undefined
    refreshScrollState()
    el.addEventListener('scroll', refreshScrollState, { passive: true })
    window.addEventListener('resize', refreshScrollState)
    return () => {
      el.removeEventListener('scroll', refreshScrollState)
      window.removeEventListener('resize', refreshScrollState)
    }
  }, [refreshScrollState, posts.length])

  const scroll = (dir) => {
    const el = trackRef.current
    if (!el) return
    const amount = Math.max(280, Math.floor(el.clientWidth * 0.85))
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  if (posts.length === 0) {
    return (
      <section className="blogs" id="blog">
        <div className="blogs-inner">
          <div className="blogs-header">
            <div className="titles">
              <div className="eyebrow">{tr(ui.blog.eyebrow, lang)}</div>
              <h2>{tr(ui.blog.heading, lang)}</h2>
            </div>
          </div>
          <p className="blogs-empty">{tr(ui.blog.empty, lang)}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="blogs" id="blog">
      <div className="blogs-inner">

        <div className="blogs-header">
          <div className="titles">
            <div className="eyebrow">{tr(ui.blog.eyebrow, lang)}</div>
            <h2>{tr(ui.blog.heading, lang)}</h2>
          </div>
          <Link to="/blog" className="blogs-viewall">{tr(ui.blog.viewAll, lang)}</Link>
        </div>

        <div className="blogs-slider">
          <button
            type="button"
            className="blogs-arrow blogs-arrow--prev"
            onClick={() => scroll(-1)}
            aria-label={tr(ui.blog.prevSlide, lang)}
            disabled={!canScrollLeft}
          >
            <FaChevronLeft />
          </button>

          <div className="blogs-track" ref={trackRef}>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} className="blog-card--slide" />
            ))}
          </div>

          <button
            type="button"
            className="blogs-arrow blogs-arrow--next"
            onClick={() => scroll(1)}
            aria-label={tr(ui.blog.nextSlide, lang)}
            disabled={!canScrollRight}
          >
            <FaChevronRight />
          </button>
        </div>

      </div>
    </section>
  )
}
