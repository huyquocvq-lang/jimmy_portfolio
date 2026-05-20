import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import '../styles/projects/fruit-market.css'

const meta = getProjectCard('fruit-market')

const PIPELINE_STEPS = [
  {
    title: { en: 'Browse & filter', vi: 'Duyệt & lọc' },
    text: {
      en: 'Customers explore the catalog by fruit type, freshness, or promotions.',
      vi: 'Khách hàng duyệt catalog theo loại trái cây, độ tươi hoặc khuyến mãi.'
    }
  },
  {
    title: { en: 'Add to cart', vi: 'Thêm vào giỏ' },
    text: {
      en: 'React Native screens manage cart state with Redux and Saga side effects.',
      vi: 'Các màn hình React Native quản lý state giỏ hàng bằng Redux và side effect Saga.'
    }
  },
  {
    title: { en: 'Checkout', vi: 'Thanh toán' },
    text: {
      en: 'Place order with delivery details against the REST API.',
      vi: 'Đặt đơn kèm chi tiết giao hàng qua REST API.'
    }
  },
  {
    title: { en: 'Backend persists', vi: 'Backend lưu trữ' },
    text: {
      en: 'Spring / Express endpoints write orders to MySQL or MongoDB.',
      vi: 'Endpoint Spring / Express ghi đơn hàng vào MySQL hoặc MongoDB.'
    }
  },
  {
    title: { en: 'Order tracking', vi: 'Theo dõi đơn hàng' },
    text: {
      en: 'Customers see status updates as the order moves through fulfillment.',
      vi: 'Khách hàng thấy cập nhật trạng thái khi đơn đi qua quy trình giao hàng.'
    }
  }
]

const RULES = [
  {
    en: 'Cart state is driven from Redux so the UI stays in sync across screens.',
    vi: 'State giỏ hàng được điều khiển bởi Redux nên UI đồng bộ qua mọi màn.'
  },
  {
    en: 'Long-running side effects (order placement, payment) live in Saga, not in components.',
    vi: 'Các side effect chạy lâu (đặt đơn, thanh toán) nằm trong Saga, không nằm trong component.'
  },
  {
    en: 'Backend follows REST conventions so the same API can power a future web client.',
    vi: 'Backend tuân theo chuẩn REST để cùng API này có thể phục vụ một web client trong tương lai.'
  },
  {
    en: 'MongoDB for catalog / browsing, MySQL for transactional order data.',
    vi: 'MongoDB cho catalog / duyệt sản phẩm, MySQL cho dữ liệu đơn hàng giao dịch.'
  }
]

const TABS = [
  {
    name: { en: 'Catalog', vi: 'Catalog' },
    body: {
      en: 'Customers see live availability and prices, with imagery and basic filtering by category and freshness.',
      vi: 'Khách hàng thấy tình trạng còn hàng và giá theo thời gian thực, kèm ảnh và bộ lọc cơ bản theo danh mục và độ tươi.'
    }
  },
  {
    name: { en: 'Cart & Checkout', vi: 'Giỏ hàng & Thanh toán' },
    body: {
      en: 'Reducer-driven cart with optimistic updates, address management, and validation handled by Saga before the order hits the API.',
      vi: 'Giỏ hàng điều khiển bởi reducer với cập nhật optimistic, quản lý địa chỉ và validation do Saga xử lý trước khi đơn được gửi tới API.'
    }
  },
  {
    name: { en: 'Orders', vi: 'Đơn hàng' },
    body: {
      en: 'Order history with statuses pulled from the backend, ready for future delivery-tracking integration.',
      vi: 'Lịch sử đơn hàng kèm trạng thái lấy từ backend, sẵn sàng cho tích hợp theo dõi giao hàng trong tương lai.'
    }
  }
]

const CONTENT = {
  problemH: { en: 'The problem', vi: 'Bài toán' },
  problem: {
    en: 'A fruit retailer wanted a mobile app for browsing, ordering, and tracking deliveries - without having to maintain a custom POS or learn a heavy storefront platform.',
    vi: 'Một nhà bán lẻ trái cây muốn có ứng dụng mobile để duyệt, đặt và theo dõi đơn — mà không phải tự duy trì một POS riêng hay học một nền tảng storefront nặng.'
  },
  howH: { en: 'What the app does', vi: 'Ứng dụng làm gì' },
  how: {
    en: 'The app is built in React Native with Redux + Saga for state and side effects. It talks to a REST API powered by Spring and Express, with MongoDB and MySQL providing the persistence layer. The whole flow - browse, cart, checkout, order tracking - lives inside one codebase that ships to both iOS and Android.',
    vi: 'App được viết bằng React Native với Redux + Saga cho state và side effect. App giao tiếp với một REST API chạy bằng Spring và Express, MongoDB và MySQL đảm nhiệm tầng lưu trữ. Toàn bộ flow — duyệt, giỏ hàng, thanh toán, theo dõi đơn — nằm trong cùng một codebase chạy được trên cả iOS và Android.'
  },
  rulesH: { en: 'Implementation choices', vi: 'Quyết định triển khai' },
  flowH: { en: 'End-to-end flow', vi: 'Flow end-to-end' },
  flowLead: { en: 'A typical order moves through these five steps:', vi: 'Một đơn hàng điển hình đi qua 5 bước sau:' },
  tabsH: { en: 'Three areas of the app', vi: 'Ba khu vực của ứng dụng' },
  noteLabel: { en: 'Note:', vi: 'Ghi chú:' },
  note: {
    en: 'Built during my time at Eledevo Academy as a production-grade project on top of teaching duties - an end-to-end app that I owned across the frontend, backend, and data layer.',
    vi: 'Được xây dựng trong thời gian tại Eledevo Academy như một dự án cấp production song song với việc giảng dạy — một ứng dụng end-to-end mà tôi sở hữu xuyên suốt frontend, backend và tầng dữ liệu.'
  }
}

export default function FruitMarketProject() {
  const { lang } = useLanguage()

  return (
    <ProjectShell slug="fruit-market">
      <article className="retro">
        <header className="project-intro project-intro--center">
          <span className="project-intro__eyebrow">{tr(meta.type, lang)}</span>
          <h1>{tr(meta.title, lang)}</h1>
          <p className="project-intro__lead">{tr(meta.subtitle, lang)}</p>
        </header>

        <section className="retro-why">
          <h2>{tr(CONTENT.problemH, lang)}</h2>
          <p>{tr(CONTENT.problem, lang)}</p>
        </section>

        <section className="retro-how">
          <h2>{tr(CONTENT.howH, lang)}</h2>
          <p>{tr(CONTENT.how, lang)}</p>
        </section>

        <section className="retro-rules">
          <h2>{tr(CONTENT.rulesH, lang)}</h2>
          <ul>
            {RULES.map((r, i) => (
              <li key={i}>{tr(r, lang)}</li>
            ))}
          </ul>
        </section>

        <section className="retro-flow">
          <h2>{tr(CONTENT.flowH, lang)}</h2>
          <p className="retro-flow-lead">{tr(CONTENT.flowLead, lang)}</p>
          <div className="retro-steps">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={i} className="retro-step">
                <span className="retro-step-n">{i + 1}</span>
                <div>
                  <h3>{tr(step.title, lang)}</h3>
                  <p>{tr(step.text, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="retro-tabs">
          <h2>{tr(CONTENT.tabsH, lang)}</h2>
          <div className="retro-tab-grid">
            {TABS.map((t, i) => (
              <div key={i} className="retro-tab-card">
                <div className="retro-tab-name">{tr(t.name, lang)}</div>
                <p>{tr(t.body, lang)}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="retro-note">
          <p>
            <strong>{tr(CONTENT.noteLabel, lang)}</strong> {tr(CONTENT.note, lang)}
          </p>
        </aside>
      </article>
    </ProjectShell>
  )
}
