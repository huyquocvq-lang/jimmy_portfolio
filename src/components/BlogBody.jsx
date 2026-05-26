import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'

/**
 * Renders a blog post body. Each block is one of:
 *   { type: 'paragraph', text }
 *   { type: 'heading', level: 2|3, text }
 *   { type: 'list', items: [text] }
 *   { type: 'code', lang, code }
 *   { type: 'quote', text }
 *   { type: 'image', src, alt, caption? }
 *   { type: 'callout', text }
 *   { type: 'html', html }                       // author-only markup
 *   { type: 'video', src, embed?, poster?, title?, caption? }
 */
export default function BlogBody({ blocks }) {
  const { lang } = useLanguage()

  return (
    <div className="blog-body">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading': {
            const Tag = block.level === 3 ? 'h3' : 'h2'
            return <Tag key={i} className="blog-body__heading">{tr(block.text, lang)}</Tag>
          }
          case 'paragraph':
            return <p key={i} className="blog-body__paragraph">{tr(block.text, lang)}</p>
          case 'list':
            return (
              <ul key={i} className="blog-body__list">
                {block.items.map((item, j) => (
                  <li key={j}>{tr(item, lang)}</li>
                ))}
              </ul>
            )
          case 'code':
            return (
              <pre key={i} className="blog-body__code" data-lang={block.lang || ''}>
                <code>{block.code}</code>
              </pre>
            )
          case 'quote':
            return (
              <blockquote key={i} className="blog-body__quote">
                {tr(block.text, lang)}
              </blockquote>
            )
          case 'callout':
            return (
              <aside key={i} className="blog-body__callout">
                {tr(block.text, lang)}
              </aside>
            )
          case 'image':
            return (
              <figure key={i} className="blog-body__figure">
                <img src={block.src} alt={tr(block.alt, lang)} loading="lazy" />
                {block.caption && <figcaption>{tr(block.caption, lang)}</figcaption>}
              </figure>
            )
          case 'html':
            // Author-only markup (never user input) - see blog.ts schema notes.
            return (
              <div
                key={i}
                className="blog-body__html"
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            )
          case 'video':
            return (
              <figure key={i} className="blog-body__video">
                {block.embed ? (
                  <div className="blog-body__video-frame">
                    <iframe
                      src={block.src}
                      title={block.title || tr(block.caption, lang) || 'Embedded video'}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <video
                    className="blog-body__video-el"
                    src={block.src}
                    poster={block.poster}
                    controls
                    preload="metadata"
                  />
                )}
                {block.caption && <figcaption>{tr(block.caption, lang)}</figcaption>}
              </figure>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
