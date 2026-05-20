import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import '../styles/projects/fruit-market.css'

const meta = getProjectCard('fruit-market')

const PIPELINE_STEPS = [
  { title: 'Browse & filter', text: 'Customers explore the catalog by fruit type, freshness, or promotions.' },
  { title: 'Add to cart', text: 'React Native screens manage cart state with Redux and Saga side effects.' },
  { title: 'Checkout', text: 'Place order with delivery details against the REST API.' },
  { title: 'Backend persists', text: 'Spring / Express endpoints write orders to MySQL or MongoDB.' },
  { title: 'Order tracking', text: 'Customers see status updates as the order moves through fulfillment.' }
]

const RULES = [
  'Cart state is driven from Redux so the UI stays in sync across screens.',
  'Long-running side effects (order placement, payment) live in Saga, not in components.',
  'Backend follows REST conventions so the same API can power a future web client.',
  'MongoDB for catalog / browsing, MySQL for transactional order data.'
]

const TABS = [
  {
    name: 'Catalog',
    body:
      'Customers see live availability and prices, with imagery and basic filtering by category and freshness.'
  },
  {
    name: 'Cart & Checkout',
    body:
      'Reducer-driven cart with optimistic updates, address management, and validation handled by Saga before the order hits the API.'
  },
  {
    name: 'Orders',
    body:
      'Order history with statuses pulled from the backend, ready for future delivery-tracking integration.'
  }
]

export default function FruitMarketProject() {
  return (
    <ProjectShell slug="fruit-market">
      <article className="retro">
        <header className="project-intro project-intro--center">
          <span className="project-intro__eyebrow">{meta.type}</span>
          <h1>{meta.title}</h1>
          <p className="project-intro__lead">{meta.subtitle}</p>
        </header>

        <section className="retro-why">
          <h2>The problem</h2>
          <p>
            A fruit retailer wanted a mobile app for browsing, ordering, and tracking deliveries -
            without having to maintain a custom POS or learn a heavy storefront platform.
          </p>
        </section>

        <section className="retro-how">
          <h2>What the app does</h2>
          <p>
            The app is built in React Native with Redux + Saga for state and side effects. It talks
            to a REST API powered by Spring and Express, with MongoDB and MySQL providing the
            persistence layer. The whole flow - browse, cart, checkout, order tracking - lives
            inside one codebase that ships to both iOS and Android.
          </p>
        </section>

        <section className="retro-rules">
          <h2>Implementation choices</h2>
          <ul>
            {RULES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section className="retro-flow">
          <h2>End-to-end flow</h2>
          <p className="retro-flow-lead">
            A typical order moves through these five steps:
          </p>
          <div className="retro-steps">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.title} className="retro-step">
                <span className="retro-step-n">{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="retro-tabs">
          <h2>Three areas of the app</h2>
          <div className="retro-tab-grid">
            {TABS.map((t) => (
              <div key={t.name} className="retro-tab-card">
                <div className="retro-tab-name">{t.name}</div>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="retro-note">
          <p>
            <strong>Note:</strong> Built during my time at Eledevo Academy as a production-grade
            project on top of teaching duties - an end-to-end app that I owned across the frontend,
            backend, and data layer.
          </p>
        </aside>
      </article>
    </ProjectShell>
  )
}
