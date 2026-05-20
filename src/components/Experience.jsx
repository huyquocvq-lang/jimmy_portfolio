import { experience } from '../data/experience'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'

export default function Experience() {
  const { lang } = useLanguage()

  return (
    <section className="experience" id="experience">
      <div className="experience-inner">
        <div className="experience-eyebrow">{tr(ui.experience.eyebrow, lang)}</div>
        <h2>{tr(ui.experience.heading, lang)}</h2>

        <ol className="exp-timeline">
          {experience.map((entry, i) => (
            <li className="exp-item" key={i}>
              <div className="exp-period">
                <span className="exp-period-start">{tr(entry.start, lang)}</span>
                <span className="exp-period-sep" aria-hidden="true">–</span>
                <span className="exp-period-end">{tr(entry.end, lang)}</span>
              </div>

              <div className="exp-body">
                <h3 className="exp-role">{tr(entry.role, lang)}</h3>
                <div className="exp-company">
                  <span>{tr(entry.company, lang)}</span>
                  {entry.location && (
                    <>
                      <span className="exp-company-sep" aria-hidden="true">·</span>
                      <span>{tr(entry.location, lang)}</span>
                    </>
                  )}
                </div>

                {entry.paragraphs.map((p, j) => (
                  <p key={j} className="exp-para">{tr(p, lang)}</p>
                ))}

                {entry.meta && entry.meta.length > 0 && (
                  <dl className="exp-meta">
                    {entry.meta.map((m, j) => (
                      <div className="exp-meta-row" key={j}>
                        <dt>{tr(m.label, lang)}</dt>
                        <dd>{tr(m.value, lang)}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
