import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { ui } from '../../data/ui'
import { useLanguage } from '../../context/LanguageContext'
import { tr } from '../../utils/i18n'
import '../../styles/embed-slot.css'

/**
 * Project dashboard slot. No dashboards are currently registered - the active
 * project set (CMS, mobile, IoT) does not ship interactive dashboards. Add a
 * new entry here mirroring the projectEmbeds.js registry to wire one up.
 */
const dashboards = {}

export default function EmbedSlot({ embedKey, title }) {
  const [fullscreen, setFullscreen] = useState(false)
  const { lang } = useLanguage()
  const Dashboard = dashboards[embedKey]

  const exitFullscreen = useCallback(() => setFullscreen(false), [])

  useEffect(() => {
    if (!fullscreen) return undefined

    const onKeyDown = (e) => {
      if (e.key === 'Escape') exitFullscreen()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [fullscreen, exitFullscreen])

  if (!Dashboard) {
    return null
  }

  return (
    <section
      className={`embed-slot${fullscreen ? ' embed-slot--fullscreen' : ''}`}
      aria-label={tr(title, lang)}
    >
      <div className="embed-slot__inner">
        <div className="embed-slot__head">
          <h2 className="embed-slot__title">{tr(title, lang)}</h2>
          <button
            type="button"
            className="embed-slot__fs-btn"
            onClick={() => setFullscreen((v) => !v)}
            aria-pressed={fullscreen}
          >
            {fullscreen ? tr(ui.embed.exitFullscreen, lang) : tr(ui.embed.fullscreen, lang)}
          </button>
        </div>

        <Suspense fallback={<p className="embed-slot__loading">{tr(ui.embed.loading, lang)}</p>}>
          <div className="embed-slot__canvas">
            <Dashboard />
          </div>
        </Suspense>
      </div>
    </section>
  )
}
