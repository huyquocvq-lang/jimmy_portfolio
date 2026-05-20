import { impactHighlights } from '../data/stats'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'

export default function Impact() {
  const { lang } = useLanguage()

  return (
    <section className="impact" id="impact">
      <div className="impact-inner">
        <div className="eyebrow">{tr(ui.impact.eyebrow, lang)}</div>
        <h2>{tr(ui.impact.heading, lang)}</h2>

        <div className="impact-grid">
          {impactHighlights.map((item, i) => (
            <div className="impact-item" key={i}>
              <div className="big">{tr(item.big, lang)}</div>
              <div className="desc">{tr(item.desc, lang)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
