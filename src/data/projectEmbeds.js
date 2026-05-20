/**
 * TSX embed registry for project dashboard sections.
 *
 * The current portfolio set (CMS platforms, mobile apps, IoT, portals) does not
 * ship interactive dashboards. Keep this object in place so future projects can
 * add their own dashboards without re-introducing the import surface.
 *
 * To register a new dashboard:
 *   1. Drop `<slug>Dashboard.tsx` into `src/embeds/`.
 *   2. Add a `lazy(() => import(...))` entry in `src/components/project/EmbedSlot.jsx`.
 *   3. Add the matching `{ embedKey, title }` entry below.
 *   4. Mount it on the project page: `<EmbedSlot {...projectEmbeds.yourKey} />`.
 */
export const projectEmbeds = {}
