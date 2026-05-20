import { about } from '../data/about'
import { skills } from '../data/skills'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import Skill from './Skill'

export default function AboutSkills() {
  const { lang } = useLanguage()

  return (
    <section className="about-skills" id="about">
      <div className="about-skills-inner">

        {/* LEFT: About */}
        <div className="about-col">
          <div className="about-eyebrow">{tr(about.eyebrow, lang)}</div>
          <h2>{tr(about.heading, lang)}</h2>
          {about.paragraphs.map((p, i) => (
            <p key={i}>{tr(p, lang)}</p>
          ))}
        </div>

        {/* RIGHT: Skills grid */}
        <div className="skills-grid">
          {skills.map((s, i) => (
            <Skill key={i} icon={s.icon} title={tr(s.title, lang)} desc={tr(s.desc, lang)} />
          ))}
        </div>

      </div>
    </section>
  )
}
