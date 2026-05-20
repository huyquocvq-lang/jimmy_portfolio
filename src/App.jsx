import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MmpCmsProject from './projects/MmpCmsProject'
import DentsuCmsProject from './projects/DentsuCmsProject'
import YoolifeProject from './projects/YoolifeProject'
import YooIocProject from './projects/YooIocProject'
import VnptPortalProject from './projects/VnptPortalProject'
import EledevoLandingProject from './projects/EledevoLandingProject'
import FruitMarketProject from './projects/FruitMarketProject'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/mmp-cms" element={<MmpCmsProject />} />
        <Route path="/projects/dentsu-cms" element={<DentsuCmsProject />} />
        <Route path="/projects/yoolife" element={<YoolifeProject />} />
        <Route path="/projects/yooioc" element={<YooIocProject />} />
        <Route path="/projects/vnpt-portal" element={<VnptPortalProject />} />
        <Route path="/projects/eledevo-landing" element={<EledevoLandingProject />} />
        <Route path="/projects/fruit-market" element={<FruitMarketProject />} />
      </Routes>
    </BrowserRouter>
  )
}
