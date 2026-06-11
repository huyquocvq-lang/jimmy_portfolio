import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import HomePage from './pages/HomePage'
import LendingPlatformProject from './projects/LendingPlatformProject'
import YoohomeProject from './projects/YoohomeProject'
import DotmarCmsProject from './projects/DotmarCmsProject'
import ZigbeeGatewayProject from './projects/ZigbeeGatewayProject'
import HublyProject from './projects/HublyProject'
import ProjectListPage from './pages/ProjectListPage'
import BlogListPage from './pages/BlogListPage'
import BlogDetailPage from './pages/BlogDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import { useLanguage } from './context/LanguageContext'
import { stripLocale } from './utils/i18n'

// Language-neutral route table. Each entry is mounted twice: at `/<path>`
// (English) and `/vi/<path>` (Vietnamese). Keep paths aligned with
// `projects.js` slugs/links - see AGENTS.md invariants.
const PAGES = [
  { path: '', element: <HomePage /> },
  { path: 'projects', element: <ProjectListPage /> },
  { path: 'projects/lending-orchestration-platform', element: <LendingPlatformProject /> },
  { path: 'projects/yoohome', element: <YoohomeProject /> },
  { path: 'projects/dotmar-cms', element: <DotmarCmsProject /> },
  { path: 'projects/zigbee-gateway-firmware', element: <ZigbeeGatewayProject /> },
  { path: 'projects/hubly', element: <HublyProject /> },
  { path: 'blog', element: <BlogListPage /> },
  { path: 'blog/:slug', element: <BlogDetailPage /> }
]

// Keeps the language context in lockstep with the URL (the source of truth).
function LanguageSync() {
  const { pathname } = useLocation()
  const { setLang } = useLanguage()
  useEffect(() => {
    setLang(stripLocale(pathname).lang)
  }, [pathname, setLang])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageSync />
      <Routes>
        {PAGES.map(({ path, element }) => (
          <Route key={`/${path}`} path={`/${path}`} element={element} />
        ))}
        {PAGES.map(({ path, element }) => (
          <Route key={`/vi/${path}`} path={path ? `/vi/${path}` : '/vi'} element={element} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  )
}
