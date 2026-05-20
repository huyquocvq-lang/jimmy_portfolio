# Dashboard embeds (TSX)

Claude artifact exports live here. Vite compiles them; project pages load via `EmbedSlot` (lazy chunks).

The current portfolio set (CMS platforms, mobile apps, IoT, portals) does not ship interactive dashboards, so this directory is empty by design. The wiring is preserved for future projects.

## How it wires together

1. Drop the TSX file into `src/embeds/` (must `export default function …`).
2. Register the lazy import in `src/components/project/EmbedSlot.jsx`:
   ```js
   const dashboards = {
     yourKey: lazy(() => import('../../embeds/YourDashboard'))
   }
   ```
3. Add an entry to `src/data/projectEmbeds.js`:
   ```js
   export const projectEmbeds = {
     yourKey: { embedKey: 'yourKey', title: 'Your dashboard title' }
   }
   ```
4. Mount it on the project page:
   ```jsx
   <EmbedSlot {...projectEmbeds.yourKey} />
   ```

## Dependencies

`recharts` is used by chart-based embeds when needed. It is already in `package.json`.

## Notes

- Replacement: overwrite the `.tsx` in place; keep `export default function …`.
- `public/embeds/` is legacy placeholder HTML - not loaded when TSX embeds are wired.
- Embeds render inside `.embed-slot__canvas` (max-height ~520px desktop; fullscreen toggle available).
- Dashboards keep their own internal color palette; the site shell applies the dark charcoal + bronze theme around them.
