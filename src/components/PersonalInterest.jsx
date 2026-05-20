import { personal } from '../data/personal'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'

export default function PersonalInterest() {
  const { lang } = useLanguage()

  return (
    <section className="personal" id="personal">
      <div className="personal-inner">
        <div className="personal-head">
          <div className="personal-eyebrow">{tr(personal.eyebrow, lang)}</div>
          <h2>{tr(personal.heading, lang)}</h2>
          <div className="personal-copy">
            {personal.paragraphs.map((p, i) => (
              <p key={i}>{tr(p, lang)}</p>
            ))}
          </div>
        </div>

        <div className="personal-masonry">
          {personal.images.map((img, i) => (
            <figure className="personal-tile" key={i}>
              <img src={img.src} alt={tr(img.alt, lang)} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
