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
          vi: 'Senior Backend Engineer với hơn 5 năm kinh nghiệm trong fintech và AIoT. Đã tham gia xây nền tảng cho vay xử lý khoảng $10M giải ngân mỗi tháng, hệ thống AIoT hơn 500K thiết bị và nhiều dịch vụ backend chạy production. Java · Spring Boot · Camunda · NestJS · MQTT. Làm việc tại Hà Nội và sẵn sàng cho các cơ hội remote.'
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
