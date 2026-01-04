import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { LandingPage } from './pages';
import { BlogListPage } from './pages/BlogListPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { SkillDetailPage } from './pages/SkillDetailPage';
import { ProjectListPage } from './pages/ProjectListPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

const images = {
  logo: 'https://tixmpgpsfflupbyyuvfg.supabase.co/storage/v1/object/public/portfolio/logo/web.png',
};

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isBlogPage = location.pathname.startsWith('/blog');

  const handleContactClick = () => {
    if (isHomePage) {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  };

  const menuItems = [
    { label: 'Home', href: '/', active: location.pathname === '/' },
    { label: 'Portfolio', href: isHomePage ? '#portfolio' : '/#portfolio' },
    { label: 'About me', href: isHomePage ? '#about' : '/#about' },
    { label: 'Blogs', href: '/blog', active: isBlogPage },
    { label: 'Testimonials', href: isHomePage ? '#testimonials' : '/#testimonials' },
  ];

  const socialIcons = [
    { name: 'Facebook', IconComponent: FaFacebook, url: '#' },
    { name: 'Instagram', IconComponent: FaInstagram, url: '#' },
    { name: 'Twitter', IconComponent: FaTwitter, url: '#' },
    { name: 'LinkedIn', IconComponent: FaLinkedin, url: '#' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        logo={images.logo}
        onContactClick={handleContactClick}
        menuItems={menuItems}
      />
      <main className="flex-grow">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/skill/:slug" element={<SkillDetailPage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      </Routes>
      </main>
      <Footer
        logo={images.logo}
        menuItems={[
          { label: 'Home', href: '/#home' },
          { label: 'Portfolio', href: '/#portfolio' },
          { label: 'About me', href: '/#about' },
          { label: 'Blogs', href: '/blog' },
          { label: 'Contact', href: '/#contact' },
          { label: 'Testimonials', href: '/#testimonials' },
        ]}
        socialIcons={socialIcons}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
