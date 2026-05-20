import { education } from '../data/education'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'

export default function Education() {
  const { lang } = useLanguage()

  return (
    <section className="education" id="education">
      <div className="education-inner">
        <div className="education-eyebrow">{tr(ui.education.eyebrow, lang)}</div>
        <h2>{tr(ui.education.heading, lang)}</h2>

        <div className="education-list">
          {education.map((entry, i) => (
            <article className="edu-item" key={i}>
              <div className="edu-date">{tr(entry.date, lang)}</div>
              <div className="edu-body">
                <h3>{tr(entry.school, lang)}</h3>
                <div className="edu-degree">
                  {tr(entry.degree, lang)}
                  {entry.focus && <span className="edu-focus"> · {tr(entry.focus, lang)}</span>}
                </div>
                <div className="edu-meta">
                  <span>{tr(entry.location, lang)}</span>
                  {entry.gpa && (
                    <>
                      <span className="edu-meta-sep" aria-hidden="true">·</span>
                      <span>{tr(ui.education.gpa, lang)} {entry.gpa}</span>
                    </>
                  )}
                </div>
                {entry.honors && entry.honors.length > 0 && (
                  <ul className="edu-honors">
                    {entry.honors.map((h, j) => (
                      <li key={j}>{tr(h, lang)}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
