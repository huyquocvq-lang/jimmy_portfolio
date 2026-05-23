import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const OUT_DIR = 'public/images/projects'
const TMP_DIR = '/private/tmp/portfolio-project-previews'
const WIDTH = 1600
const HEIGHT = 1000
const FORCE = process.argv.includes('--force')

const projects = [
  {
    slug: 'mmp-cms',
    kicker: 'CMS Platform / Java Spring Boot',
    title: "MMP's CMS Website",
    subtitle: 'High traffic editorial CMS with query tuning and delivery APIs',
    palette: ['#c5a47e', '#6fd28d', '#4f8cff'],
    mode: 'cms',
    chips: ['Spring Boot', 'MySQL', 'REST APIs', 'CI/CD']
  },
  {
    slug: 'dentsu-cms',
    kicker: 'Headless CMS / Magnolia + React',
    title: "Dentsu's Headless CMS",
    subtitle: 'Content modeling, API delivery, and decoupled React rendering',
    palette: ['#c5a47e', '#a18cff', '#55d6be'],
    mode: 'headless',
    chips: ['Magnolia', 'GraphQL', 'React', 'Caching']
  },
  {
    slug: 'yoolife',
    kicker: 'Mobile App / React Native',
    title: 'Yoolife Application',
    subtitle: 'Smart living app for residents, IoT control, and payments',
    palette: ['#c5a47e', '#5ec2ff', '#6fd28d'],
    mode: 'mobile',
    chips: ['React Native', 'MQTT', 'MoMo', 'VN Pay']
  },
  {
    slug: 'yooioc',
    kicker: 'Operations Platform / Microservices',
    title: 'YooIOC Application',
    subtitle: 'Urban operations hub for residents, tickets, devices, and reports',
    palette: ['#c5a47e', '#ff8a65', '#5ec2ff'],
    mode: 'ops',
    chips: ['Spring Boot', 'NestJS', 'RabbitMQ', 'K8s']
  },
  {
    slug: 'vnpt-portal',
    kicker: 'Portal / Liferay + Spring',
    title: 'VNPT Portal Information',
    subtitle: 'Customer information portal with REST APIs and tuned data access',
    palette: ['#c5a47e', '#4f8cff', '#7bd88f'],
    mode: 'portal',
    chips: ['Liferay', 'Spring Boot', 'JPA', 'MySQL']
  },
  {
    slug: 'eledevo-landing',
    kicker: 'Marketing Site / React',
    title: 'Eledevo Academy Landing Page',
    subtitle: 'Responsive academy landing page with enrollment flow',
    palette: ['#c5a47e', '#ffcd6b', '#66d9e8'],
    mode: 'landing',
    chips: ['React', 'Spring', 'Forms', 'SEO']
  },
  {
    slug: 'fruit-market',
    kicker: 'Mobile App / React Native',
    title: 'The Fruit Market Application',
    subtitle: 'Retail app for catalog browsing, checkout, and order tracking',
    palette: ['#c5a47e', '#8ed081', '#ff7a7a'],
    mode: 'commerce',
    chips: ['Redux Saga', 'REST API', 'MongoDB', 'MySQL']
  }
]

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function text(x, y, content, size, fill = '#ffffff', weight = 600, attrs = '') {
  return `<text x="${x}" y="${y}" font-family="Source Sans Pro, Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" ${attrs}>${esc(content)}</text>`
}

function rect(x, y, w, h, fill, rx = 18, attrs = '') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${attrs}/>`
}

function line(x1, y1, x2, y2, color, width = 2, opacity = 1) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" opacity="${opacity}"/>`
}

function chips(items, x, y, accent) {
  let cursor = x
  return items.map((item, index) => {
    const width = 82 + item.length * 9
    const fill = index === 0 ? accent : 'rgba(255,255,255,0.07)'
    const color = index === 0 ? '#111111' : '#d8d2c8'
    const out = [
      rect(cursor, y, width, 42, fill, 21, `stroke="rgba(255,255,255,0.14)"`),
      text(cursor + 22, y + 27, item, 17, color, 700)
    ].join('')
    cursor += width + 14
    return out
  }).join('')
}

function chart(x, y, w, h, accent, secondary) {
  const points = [
    [x, y + h - 40],
    [x + w * 0.16, y + h - 130],
    [x + w * 0.34, y + h - 85],
    [x + w * 0.52, y + h - 170],
    [x + w * 0.72, y + h - 105],
    [x + w, y + h - 215]
  ]
  const path = points.map((p, i) => `${i ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' ')
  return `
    ${rect(x - 24, y - 30, w + 48, h + 62, 'rgba(255,255,255,0.055)', 26, 'stroke="rgba(255,255,255,0.12)"')}
    ${[0, 1, 2, 3].map((i) => line(x, y + i * (h / 3), x + w, y + i * (h / 3), '#ffffff', 1, 0.08)).join('')}
    <path d="${path}" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${path} L ${x + w} ${y + h} L ${x} ${y + h} Z" fill="url(#chartGlow)" opacity="0.36"/>
    ${points.map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="8" fill="${secondary}" stroke="#111111" stroke-width="4"/>`).join('')}
  `
}

function phone(x, y, accent, secondary, kind = 'home') {
  const content = kind === 'commerce'
    ? `
      ${text(x + 48, y + 108, 'Fresh picks', 28, '#ffffff', 700)}
      ${rect(x + 48, y + 142, 270, 150, 'rgba(142,208,129,0.18)', 28, `stroke="${secondary}" stroke-opacity="0.45"`)}
      ${rect(x + 70, y + 174, 80, 80, secondary, 40, 'opacity="0.78"')}
      ${text(x + 170, y + 197, 'Catalog', 20, '#ffffff', 700)}
      ${text(x + 170, y + 226, 'Stock - price - promo', 15, '#cfc7bd', 500)}
      ${rect(x + 48, y + 322, 126, 116, 'rgba(255,255,255,0.08)', 22)}
      ${rect(x + 192, y + 322, 126, 116, 'rgba(255,255,255,0.08)', 22)}
      ${rect(x + 48, y + 474, 270, 54, accent, 27)}
      ${text(x + 120, y + 509, 'Checkout', 20, '#111111', 800)}
    `
    : `
      ${text(x + 48, y + 108, 'Smart home', 28, '#ffffff', 700)}
      ${rect(x + 48, y + 142, 270, 86, 'rgba(94,194,255,0.16)', 24, `stroke="${secondary}" stroke-opacity="0.45"`)}
      ${text(x + 76, y + 177, 'Living room', 20, '#ffffff', 700)}
      ${text(x + 76, y + 204, 'MQTT online', 15, '#cfc7bd', 500)}
      ${[0, 1, 2, 3].map((i) => rect(x + 48 + (i % 2) * 144, y + 260 + Math.floor(i / 2) * 136, 126, 108, 'rgba(255,255,255,0.08)', 22)).join('')}
      ${rect(x + 48, y + 546, 270, 58, accent, 29)}
      ${text(x + 105, y + 583, 'Pay services', 20, '#111111', 800)}
    `
  return `
    ${rect(x, y, 366, 660, '#111318', 52, 'stroke="rgba(255,255,255,0.22)" stroke-width="2" filter="url(#softShadow)"')}
    ${rect(x + 20, y + 22, 326, 616, '#151923', 38)}
    ${rect(x + 132, y + 46, 102, 10, 'rgba(255,255,255,0.18)', 5)}
    ${content}
  `
}

function phoneScaled(x, y, scale, accent, secondary, kind = 'home') {
  return `<g transform="translate(${x} ${y}) scale(${scale})">${phone(0, 0, accent, secondary, kind)}</g>`
}

function modeArtwork(project) {
  const [accent, secondary, tertiary] = project.palette
  switch (project.mode) {
    case 'cms':
      return `
        ${rect(165, 350, 1270, 460, 'rgba(18,21,27,0.9)', 34, 'stroke="rgba(255,255,255,0.14)" filter="url(#softShadow)"')}
        ${rect(205, 390, 270, 380, 'rgba(255,255,255,0.055)', 24)}
        ${text(235, 436, 'CONTENT TREE', 18, accent, 800)}
        ${[0, 1, 2, 3, 4].map((i) => `${rect(235, 470 + i * 52, 190 - i * 12, 18, 'rgba(255,255,255,0.22)', 9)}${rect(235, 498 + i * 52, 145 + i * 14, 10, 'rgba(255,255,255,0.11)', 5)}`).join('')}
        ${chart(565, 455, 500, 250, accent, secondary)}
        ${text(565, 426, 'TRAFFIC SHAPE', 18, accent, 800)}
        ${rect(1130, 390, 260, 172, 'rgba(111,210,141,0.13)', 24, `stroke="${secondary}" stroke-opacity="0.38"`)}
        ${text(1160, 442, 'Cache', 34, '#ffffff', 800)}
        ${text(1160, 484, 'hot paths stable', 18, '#cfc7bd', 500)}
        ${rect(1130, 598, 260, 172, 'rgba(79,140,255,0.13)', 24, `stroke="${tertiary}" stroke-opacity="0.38"`)}
        ${text(1160, 650, 'Deploy', 34, '#ffffff', 800)}
        ${text(1160, 692, 'pipeline green', 18, '#cfc7bd', 500)}
      `
    case 'headless':
      return `
        ${['Magnolia', 'API Layer', 'React UI'].map((label, i) => {
          const x = 190 + i * 420
          const color = [accent, secondary, tertiary][i]
          return `${rect(x, 420, 330, 300, 'rgba(255,255,255,0.07)', 30, `stroke="${color}" stroke-opacity="0.5" filter="url(#softShadow)"`)}
            ${text(x + 42, 485, `0${i + 1}`, 46, color, 800)}
            ${text(x + 42, 542, label, 31, '#ffffff', 800)}
            ${rect(x + 42, 586, 210, 16, 'rgba(255,255,255,0.22)', 8)}
            ${rect(x + 42, 624, 250, 12, 'rgba(255,255,255,0.12)', 6)}
            ${rect(x + 42, 654, 176, 12, 'rgba(255,255,255,0.12)', 6)}`
        }).join('')}
        ${line(520, 570, 610, 570, accent, 5, 0.8)}
        ${line(940, 570, 1030, 570, secondary, 5, 0.8)}
      `
    case 'mobile':
      return `
        ${phoneScaled(320, 350, 0.82, accent, secondary, 'home')}
        ${phoneScaled(740, 300, 0.82, secondary, tertiary, 'home')}
        ${rect(1070, 625, 300, 98, 'rgba(255,255,255,0.07)', 24, 'stroke="rgba(255,255,255,0.14)"')}
        ${text(1105, 667, 'Device bridge', 24, '#ffffff', 800)}
        ${text(1105, 701, 'Zigbee / BLE / Z-Wave', 16, '#cfc7bd', 600)}
      `
    case 'ops':
      return `
        ${rect(180, 330, 1240, 470, 'rgba(18,21,27,0.9)', 34, 'stroke="rgba(255,255,255,0.14)" filter="url(#softShadow)"')}
        ${rect(230, 390, 560, 350, 'rgba(255,255,255,0.055)', 26)}
        ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${310 + i * 96}" cy="${485 + (i % 2) * 92}" r="${22 + i * 4}" fill="${[accent, secondary, tertiary][i % 3]}" opacity="0.65"/>`).join('')}
        ${text(252, 704, 'SMART URBAN MAP', 18, accent, 800)}
        ${[0, 1, 2].map((i) => `${rect(850, 390 + i * 116, 500, 86, 'rgba(255,255,255,0.075)', 22)}${text(884, 425 + i * 116, ['Tickets', 'Devices', 'Reports'][i], 24, '#ffffff', 800)}${rect(884, 448 + i * 116, 300 - i * 35, 12, 'rgba(255,255,255,0.18)', 6)}`).join('')}
      `
    case 'portal':
      return `
        ${rect(185, 340, 1230, 430, 'rgba(255,255,255,0.07)', 30, 'stroke="rgba(255,255,255,0.14)" filter="url(#softShadow)"')}
        ${rect(235, 395, 760, 320, '#151923', 26)}
        ${text(275, 455, 'Portal workspace', 36, '#ffffff', 800)}
        ${[0, 1, 2].map((i) => `${rect(275, 500 + i * 66, 620 - i * 75, 18, 'rgba(255,255,255,0.22)', 9)}${rect(275, 530 + i * 66, 500 - i * 60, 12, 'rgba(255,255,255,0.11)', 6)}`).join('')}
        ${rect(1055, 395, 300, 88, 'rgba(79,140,255,0.16)', 22, `stroke="${secondary}" stroke-opacity="0.45"`)}
        ${rect(1055, 515, 300, 88, 'rgba(123,216,143,0.14)', 22, `stroke="${tertiary}" stroke-opacity="0.45"`)}
        ${rect(1055, 635, 300, 88, 'rgba(197,164,126,0.14)', 22, `stroke="${accent}" stroke-opacity="0.45"`)}
        ${text(1090, 450, 'Liferay', 25, '#ffffff', 800)}
        ${text(1090, 570, 'Spring API', 25, '#ffffff', 800)}
        ${text(1090, 690, 'Query tuning', 25, '#ffffff', 800)}
      `
    case 'landing':
      return `
        ${rect(200, 350, 1200, 470, '#f4efe7', 34, 'filter="url(#softShadow)"')}
        ${rect(200, 350, 1200, 92, '#191b22', 34)}
        ${text(250, 410, 'Academy landing', 30, '#ffffff', 800)}
        ${rect(250, 500, 450, 150, 'rgba(25,27,34,0.08)', 28)}
        ${text(292, 555, 'Course catalog', 34, '#191b22', 800)}
        ${text(292, 599, 'Programs, instructors, outcomes', 20, '#4b4035', 600)}
        ${rect(780, 500, 260, 150, 'rgba(255,205,107,0.36)', 28)}
        ${rect(1080, 500, 260, 150, 'rgba(102,217,232,0.28)', 28)}
        ${rect(250, 700, 1090, 70, accent, 35)}
        ${text(640, 745, 'Enrollment flow', 25, '#171717', 800)}
      `
    case 'commerce':
      return `
        ${phoneScaled(300, 340, 0.82, accent, secondary, 'commerce')}
        ${rect(760, 420, 560, 320, 'rgba(255,255,255,0.07)', 30, 'stroke="rgba(255,255,255,0.14)" filter="url(#softShadow)"')}
        ${text(815, 485, 'Order pipeline', 36, '#ffffff', 800)}
        ${['Browse', 'Cart', 'Checkout', 'Persist', 'Track'].map((label, i) => `${rect(815, 530 + i * 38, 300 + i * 20, 16, [accent, secondary, tertiary][i % 3], 8, 'opacity="0.68"')}${text(1160, 545 + i * 38, label, 17, '#ded6ca', 700)}`).join('')}
      `
    default:
      return ''
  }
}

function svg(project) {
  const [accent, secondary, tertiary] = project.palette
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <radialGradient id="bgGlow" cx="72%" cy="18%" r="75%">
      <stop offset="0%" stop-color="${secondary}" stop-opacity="0.28"/>
      <stop offset="42%" stop-color="${accent}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#0b0c10" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="chartGlow" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient>
    <filter id="softShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="28" stdDeviation="28" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#ffffff" stroke-opacity="0.055" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0b0c10"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGlow)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" opacity="0.8"/>
  <circle cx="1320" cy="150" r="260" fill="${tertiary}" opacity="0.12"/>
  <circle cx="165" cy="840" r="260" fill="${accent}" opacity="0.1"/>
  ${text(110, 130, project.kicker.toUpperCase(), 22, accent, 800, 'letter-spacing="4"')}
  ${text(110, 205, project.title, 64, '#ffffff', 300)}
  ${text(114, 258, project.subtitle, 28, '#d6cfc5', 500)}
  ${chips(project.chips, 110, 292, accent)}
  ${modeArtwork(project)}
  ${rect(110, 870, 1380, 1, 'rgba(255,255,255,0.18)', 0)}
  ${text(110, 922, 'ANONYMIZED PROJECT PREVIEW', 18, '#9b9287', 800, 'letter-spacing="3"')}
  ${text(1180, 922, project.slug, 20, '#9b9287', 700)}
</svg>`
}

function ensureTool(command, message) {
  try {
    execFileSync(command, ['--version'], { stdio: 'ignore' })
  } catch {
    throw new Error(message)
  }
}

mkdirSync(OUT_DIR, { recursive: true })
mkdirSync(TMP_DIR, { recursive: true })
ensureTool('rsvg-convert', 'rsvg-convert is required to rasterize SVG previews.')

for (const project of projects) {
  const svgPath = join(TMP_DIR, `${project.slug}.svg`)
  const pngPath = join(TMP_DIR, `${project.slug}.png`)
  const jpgPath = join(OUT_DIR, `${project.slug}.jpg`)

  if (existsSync(jpgPath) && !FORCE) {
    console.log(`Skipping existing ${jpgPath}`)
    continue
  }

  writeFileSync(svgPath, svg(project), 'utf8')
  execFileSync('rsvg-convert', ['-w', String(WIDTH), '-h', String(HEIGHT), svgPath, '-o', pngPath], { stdio: 'inherit' })
  execFileSync('sips', ['-s', 'format', 'jpeg', pngPath, '--out', jpgPath], { stdio: 'ignore' })
  console.log(`Generated ${jpgPath}`)
}
