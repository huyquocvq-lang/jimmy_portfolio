import { techMarquee } from '../data/skills'

/**
 * Horizontal infinite-scroll badge row, mounted at the bottom of the
 * AboutSkills section. The track contains the badge list twice; the
 * `translateX(-50%)` keyframe creates a seamless loop. Hover pauses the
 * scroll. Tech terms stay in English in both locales (plain strings).
 */
export default function TechMarquee() {
  if (!techMarquee || techMarquee.length === 0) return null

  return (
    <div className="tech-marquee" aria-label="Tech stack">
      <div className="tech-marquee__track">
        {techMarquee.map((t) => (
          <span key={t} className="tech-marquee__item">{t}</span>
        ))}
        {techMarquee.map((t) => (
          <span key={`${t}--clone`} className="tech-marquee__item" aria-hidden="true">{t}</span>
        ))}
      </div>
    </div>
  )
}
