import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import BlogCard from '../components/BlogCard'
import Pagination from '../components/Pagination'
import { getAllPosts } from '../data/blog'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr, localePath } from '../utils/i18n'

const PAGE_SIZE = 9

export default function BlogListPage() {
  const { lang } = useLanguage()
  const [searchParams] = useSearchParams()
  const all = getAllPosts()
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE))

  const rawPage = Number.parseInt(searchParams.get('page') ?? '1', 10)
  const current = Number.isFinite(rawPage)
    ? Math.min(Math.max(rawPage, 1), totalPages)
    : 1

  const start = (current - 1) * PAGE_SIZE
  const pagePosts = all.slice(start, start + PAGE_SIZE)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [current])

  return (
    <>
      <Seo
        title={{
          en: 'Engineering Blog — Java, Spring Boot, IoT & Leadership',
          vi: 'Blog kỹ thuật — Java, Spring Boot, IoT & Quản lý đội nhóm'
        }}
        description={{
          en: 'Field notes from production: Spring Boot caching for high-traffic CMS, headless Magnolia + React, bridging Zigbee/Z-Wave/BLE in one gateway, and leading small engineering teams. By Jimmy Vu.',
          vi: 'Ghi chép từ production: cache Spring Boot cho CMS tải cao, headless Magnolia + React, kết nối Zigbee/Z-Wave/BLE trong một gateway, và dẫn dắt team kỹ sư nhỏ. Bởi Jimmy Vu.'
        }}
        path="/blog"
      />
      <Nav />
      <main className="list-page" id="blog-list">
        <div className="list-page-inner">
          <header className="list-page-header">
            <div className="eyebrow">{tr(ui.blog.listEyebrow, lang)}</div>
            <h1>{tr(ui.blog.listHeading, lang)}</h1>
            <Link to={localePath('/', lang)} className="list-page-back">{tr(ui.projects.backHome, lang)}</Link>
          </header>

          {pagePosts.length === 0 ? (
            <p className="list-page-empty">{tr(ui.blog.empty, lang)}</p>
          ) : (
            <div className="list-page-grid blog-grid">
              {pagePosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          <Pagination basePath={localePath('/blog', lang)} current={current} total={totalPages} />
        </div>
      </main>
      <Footer />
    </>
  )
}
