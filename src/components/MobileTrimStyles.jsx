import { mobileTrim, mobileTrimCSS } from '../utils/mobileTrim'

/**
 * Injects the env-driven mobile content-trim @media block as an inline
 * `<style>` tag. Mounted once at the top level (see `src/main.jsx`).
 *
 * The static CSS in `global.css` covers layout for every breakpoint; this
 * component only controls how many tiles are hidden on phones, so it lives
 * in its own file and can be removed without breaking anything else.
 */
export default function MobileTrimStyles() {
  const css = mobileTrimCSS(mobileTrim)
  // eslint-disable-next-line react/no-danger
  return <style data-mobile-trim="" dangerouslySetInnerHTML={{ __html: css }} />
}
