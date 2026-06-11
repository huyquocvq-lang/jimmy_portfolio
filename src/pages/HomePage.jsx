import { useEffect } from 'react'
import Seo from '../components/Seo'
import Hero from '../components/Hero'
import Nav from '../components/Nav'
import Impact from '../components/Impact'
import Education from '../components/Education'
import Experience from '../components/Experience'
import AboutSkills from '../components/AboutSkills'
import PersonalInterest from '../components/PersonalInterest'
import Projects from '../components/Projects'
import Blogs from '../components/Blogs'
import Footer from '../components/Footer'

export default function HomePage() {
  useEffect(() => {
    if (!window.location.hash) return
    const id = window.location.hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
    }
  }, [])

  return (
    <>
      <Seo
        title={{
          en: 'Jimmy Vu (Quoc Huy) — Senior Full Stack Developer | Java, Spring Boot, React Native',
          vi: 'Jimmy Vu (Quốc Huy) — Lập trình viên Full Stack Senior | Java, Spring Boot, React Native'
        }}
        description={{
          en: 'Senior full stack developer with 4+ years building fintech lending platforms ($10M/mo), AIoT systems (500K+ devices), and enterprise CMS. Java · Spring Boot · React · React Native. Based in Hanoi, available for remote roles and freelance projects.',
          vi: 'Lập trình viên full stack senior với 4+ năm kinh nghiệm xây nền tảng cho vay fintech (giải ngân ~$10M/tháng), hệ thống AIoT (500K+ thiết bị) và CMS doanh nghiệp. Java · Spring Boot · React · React Native. Tại Hà Nội, nhận việc remote và dự án freelance.'
        }}
        path="/"
      />
      <Hero />
      <Nav />
      <Impact />
      <Education />
      <Experience />
      <AboutSkills />
      <Projects />
      <PersonalInterest />
      <Blogs />
      <Footer />
    </>
  )
}
