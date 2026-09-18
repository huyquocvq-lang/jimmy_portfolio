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
          en: 'Jimmy Vu (Quoc Huy) — Senior Backend Engineer | Fintech, AIoT, Java, Spring Boot',
          vi: 'Jimmy Vu (Quốc Huy) — Senior Backend Engineer | Fintech, AIoT, Java, Spring Boot'
        }}
        description={{
          en: 'Senior backend and platform engineer with 5+ years building fintech lending platforms (~$10M/mo), AIoT systems (500K+ devices), and distributed production services. Java · Spring Boot · Camunda · NestJS · MQTT. Based in Hanoi, open to remote opportunities.',
          vi: 'Senior backend và platform engineer với 5+ năm kinh nghiệm xây nền tảng lending fintech (~$10M/tháng), hệ thống AIoT (500K+ thiết bị) và các service production phân tán. Java · Spring Boot · Camunda · NestJS · MQTT. Tại Hà Nội, sẵn sàng cho cơ hội remote.'
        }}
        path="/"
      />
      <Hero />
      <Nav />
      <Impact />
      <Experience />
      <Education />
      <AboutSkills />
      <Projects />
      <PersonalInterest />
      <Blogs />
      <Footer />
    </>
  )
}
