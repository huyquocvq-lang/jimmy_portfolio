import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LendingPlatformProject from './projects/LendingPlatformProject'
import YoohomeProject from './projects/YoohomeProject'
import DotmarCmsProject from './projects/DotmarCmsProject'
import ZigbeeGatewayProject from './projects/ZigbeeGatewayProject'
import HublyProject from './projects/HublyProject'
import ProjectListPage from './pages/ProjectListPage'
import BlogListPage from './pages/BlogListPage'
import BlogDetailPage from './pages/BlogDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/lending-orchestration-platform" element={<LendingPlatformProject />} />
        <Route path="/projects/yoohome" element={<YoohomeProject />} />
        <Route path="/projects/dotmar-cms" element={<DotmarCmsProject />} />
        <Route path="/projects/zigbee-gateway-firmware" element={<ZigbeeGatewayProject />} />
        <Route path="/projects/hubly" element={<HublyProject />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
