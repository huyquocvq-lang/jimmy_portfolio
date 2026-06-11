import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr, localePath } from '../utils/i18n'

export default function Footer() {
  const { contact, currentRole, industries, name } = profile
  const { lang } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer id="contact">
      <div className="footer-cta">
        <div className="eyebrow">{tr(ui.footer.eyebrow, lang)}</div>
        <h2>{tr(ui.footer.heading, lang)}</h2>
        {contact.linkedin && (
          <a href={contact.linkedin} className="btn-outline">
            {tr(ui.footer.connectCta, lang)}
          </a>
        )}
      </div>

      <div className="footer-inner">
        <div className="footer-col">
          <h3>{tr(ui.footer.currently, lang)}</h3>
          <p>
            {tr(currentRole.title, lang)}<br />
            {tr(currentRole.company, lang)}
          </p>
        </div>
        <div className="footer-col">
          <h3>{tr(ui.footer.contact, lang)}</h3>
          <ul>
            {contact.linkedin && <li><a href={contact.linkedin}>{tr(ui.nav.linkedin, lang)}</a></li>}
            {contact.email && <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>}
            {contact.phone && (
              <li><a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phoneDisplay || contact.phone}</a></li>
            )}
            {contact.resume && <li><a href={contact.resume}>{tr(ui.nav.resume, lang)}</a></li>}
            {contact.github && <li><a href={contact.github}>{tr(ui.nav.github, lang)}</a></li>}
          </ul>
        </div>
        <div className="footer-col">
          <h3>{tr(ui.footer.industries, lang)}</h3>
          <p>{tr(industries, lang)}</p>
        </div>
        <div className="footer-col">
          <h3>{tr(ui.footer.explore, lang)}</h3>
          <ul>
            <li><Link to={localePath('/', lang)}>{tr(ui.footer.exploreHome, lang)}</Link></li>
            <li><Link to={localePath('/projects', lang)}>{tr(ui.footer.exploreProjects, lang)}</Link></li>
            <li><Link to={localePath('/blog', lang)}>{tr(ui.footer.exploreBlog, lang)}</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {name} · {tr(ui.footer.portfolioLabel, lang)} {year}
      </div>
    </footer>
  )
}
