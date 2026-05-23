import { useState } from 'react'
import { impactTabs } from '../data/stats'
import { ui } from '../data/ui'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'

export default function Impact() {
  const { lang } = useLanguage()
  const [activeId, setActiveId] = useState(impactTabs[0].id)
  const active = impactTabs.find((t) => t.id === activeId) ?? impactTabs[0]

  return (
    <section className="impact" id="impact">
      <div className="impact-inner">
        <div className="eyebrow">{tr(ui.impact.eyebrow, lang)}</div>
        <h2>{tr(ui.impact.heading, lang)}</h2>

        <div
          className="impact-tabs"
          role="tablist"
          aria-label={tr(ui.impact.tabsAria, lang)}
        >
          {impactTabs.map((tab) => {
            const isActive = tab.id === activeId
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`impact-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`impact-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                className={`impact-tab${isActive ? ' is-active' : ''}`}
                onClick={() => setActiveId(tab.id)}
              >
                {tr(tab.label, lang)}
              </button>
            )
          })}
        </div>

        <div
          className="impact-grid"
          role="tabpanel"
          id={`impact-panel-${active.id}`}
          aria-labelledby={`impact-tab-${active.id}`}
        >
          {active.highlights.map((item, i) => (
            <div className="impact-item" key={`${active.id}-${i}`}>
              <div className="big">{tr(item.big, lang)}</div>
              <div className="desc">{tr(item.desc, lang)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
