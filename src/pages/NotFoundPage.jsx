import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr, localePath } from '../utils/i18n'

export default function NotFoundPage() {
  const { lang } = useLanguage()

  return (
    <>
      <Seo
        title={{ en: 'Page Not Found', vi: 'Không tìm thấy trang' }}
        description={{
          en: 'The page you are looking for does not exist.',
          vi: 'Trang bạn tìm không tồn tại.'
        }}
        path="/404"
        noindex
      />
      <Nav />
      <main className="list-page" id="not-found">
        <div className="list-page-inner">
          <header className="list-page-header">
            <div className="eyebrow">404</div>
            <h1>{tr(ui.notFound.title, lang)}</h1>
            <p>{tr(ui.notFound.body, lang)}</p>
          </header>
          <ul className="not-found-links">
            <li><Link to={localePath('/', lang)}>{tr(ui.notFound.backHome, lang)}</Link></li>
            <li><Link to={localePath('/projects', lang)}>{tr(ui.notFound.viewProjects, lang)}</Link></li>
            <li><Link to={localePath('/blog', lang)}>{tr(ui.notFound.viewBlog, lang)}</Link></li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
