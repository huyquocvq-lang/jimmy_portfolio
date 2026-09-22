import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { tr } from '../utils/i18n'
import '../styles/projects/dotmar-cms.css'

const meta = getProjectCard('dotmar-cms')

const STACK = [
  'Magnolia CMS', 'Java Core', 'React', 'GraphQL', 'REST APIs', 'MySQL', 'Apache Tomcat', 'Windows Server'
]

const USE_CASES = [
  {
    en: 'One author instance, one content tree, several public sites. The Australian and New Zealand sites share the product catalogue, technical datasheets and insights content, but each carries its own domain, phone number, branch network, stock availability and legal footer. An editor changes a product page once and chooses which markets it goes live on - site-level overrides handle the rest.',
    vi: 'Một author instance, một cây nội dung, nhiều site public. Site Úc và site New Zealand dùng chung danh mục sản phẩm, datasheet kỹ thuật và bài insights, nhưng mỗi site có domain, số điện thoại, mạng lưới chi nhánh, tồn kho và footer pháp lý riêng. Biên tập viên sửa trang sản phẩm một lần rồi chọn thị trường cần lên - phần còn lại do override theo site xử lý.'
  },
  {
    en: 'Editorial approval workflow with explicit hand-offs: a content author drafts, a product / marketing reviewer checks technical accuracy, a publisher approves and activates. Each step has its own role and permission set, a rejection carries comments back to the author, and publishing can be scheduled - so a campaign page goes live at 9am Monday without anyone logging in.',
    vi: 'Approval workflow biên tập với các bước chuyển việc rõ ràng: tác giả soạn nháp, người review (sản phẩm / marketing) kiểm tra độ chính xác kỹ thuật, publisher duyệt và kích hoạt. Mỗi bước có role và quyền riêng, khi từ chối thì comment được trả về cho tác giả, và có thể hẹn giờ xuất bản - trang campaign lên đúng 9h sáng thứ Hai mà không cần ai đăng nhập.'
  },
  {
    en: 'Rule-driven personalization by location, time of day, age group and audience segment. A visitor resolved to Queensland sees the Brisbane branch and a local phone number; a visit outside business hours swaps "call us" for "request a quote"; a visitor who keeps reading mining pages is placed in the mining segment and gets mining-grade materials and case studies first.',
    vi: 'Personalization theo rule dựa trên vị trí, thời điểm trong ngày, nhóm tuổi và phân khúc khách hàng. Khách được xác định ở Queensland sẽ thấy chi nhánh Brisbane và số điện thoại địa phương; truy cập ngoài giờ làm việc thì "gọi cho chúng tôi" đổi thành "yêu cầu báo giá"; khách đọc liên tục các trang khai khoáng được xếp vào segment mining và thấy vật liệu, case study cho ngành mining lên trước.'
  },
  {
    en: 'AI authoring agent for sales content: an editor points it at a product or industry, it drafts the page copy, meta description and FAQ from the structured product data and brand tone, and the draft lands in the workflow as a normal unpublished page - reviewed, edited and approved by a person before anything is public.',
    vi: 'AI agent soạn nội dung phục vụ sales: biên tập viên chỉ định một sản phẩm hoặc ngành, agent soạn nháp nội dung trang, meta description và FAQ từ dữ liệu sản phẩm có cấu trúc và tone thương hiệu, rồi bản nháp đi vào workflow như một trang chưa xuất bản bình thường - được người review, chỉnh sửa và duyệt trước khi lên public.'
  },
  {
    en: 'Product catalogue and lead capture: hierarchical navigation by product division, material and industry, technical datasheets served from the DAM, and request-a-quote / contact forms that route to the right branch based on the visitor\'s region.',
    vi: 'Danh mục sản phẩm và thu lead: điều hướng phân cấp theo nhóm sản phẩm, vật liệu và ngành, datasheet kỹ thuật phục vụ từ DAM, cùng form yêu cầu báo giá / liên hệ được định tuyến tới đúng chi nhánh theo khu vực của khách.'
  },
  {
    en: 'Headless content delivery: the same content model is exposed over REST and GraphQL for the React frontend and other channels, so a product description edited once shows up on every surface.',
    vi: 'Headless content delivery: cùng một content model được mở qua REST và GraphQL cho frontend React và các kênh khác, nên mô tả sản phẩm sửa một lần là hiện trên mọi bề mặt.'
  }
]

const CONTRIBUTIONS = [
  {
    en: 'Main developer on the project - I owned most of the implementation end to end: Magnolia configuration and custom modules, the Java backend, the delivery APIs, and the production deployment. Almost every feature on this page went through my hands.',
    vi: 'Developer chính của dự án - tôi trực tiếp làm phần lớn hệ thống từ đầu đến cuối: cấu hình và module tuỳ chỉnh trên Magnolia, backend Java, API delivery và deploy production. Hầu hết feature trên trang này đều qua tay tôi.'
  },
  {
    en: 'Implemented the product features on the Magnolia framework: content types and templates for products, materials, industries and applications; content apps and dialogs for editors; multi-site configuration (site definitions, domain mapping, locale fallback); the DAM setup for datasheets and imagery; and custom Magnolia modules in Java Core wherever the out-of-the-box CMS stopped.',
    vi: 'Triển khai các feature trên framework Magnolia: content type và template cho sản phẩm, vật liệu, ngành và ứng dụng; content app và dialog cho biên tập viên; cấu hình multi-site (site definition, ánh xạ domain, locale fallback); thiết lập DAM cho datasheet và hình ảnh; và viết module Magnolia tuỳ chỉnh bằng Java Core ở những chỗ CMS mặc định không đáp ứng được.'
  },
  {
    en: 'Built the editorial approval workflow on Magnolia\'s workflow module - author → review → approve → publish - with role-based permissions, rejection comments, scheduled publishing, and activation from the author instance to each public instance.',
    vi: 'Xây approval workflow biên tập trên workflow module của Magnolia - soạn → review → duyệt → xuất bản - với phân quyền theo role, comment khi từ chối, hẹn giờ xuất bản và activation từ author instance sang từng public instance.'
  },
  {
    en: 'Implemented rule-driven personalization: visitor traits (location, time of day, age group, audience segment), segments composed from those traits, and page / component variants that editors can preview per persona before publishing.',
    vi: 'Triển khai personalization theo rule: trait của khách (vị trí, thời điểm trong ngày, nhóm tuổi, phân khúc), segment ghép từ các trait đó, và các variant của trang / component mà biên tập viên có thể xem trước theo từng persona trước khi xuất bản.'
  },
  {
    en: 'Integrated the AI authoring agent into the author instance: it drafts product, industry and insight copy from structured product data and brand guidelines, and every draft enters the same approval workflow - author-in-the-loop, never auto-publish.',
    vi: 'Tích hợp AI agent soạn nội dung vào author instance: agent soạn nháp nội dung sản phẩm, ngành và insights từ dữ liệu sản phẩm có cấu trúc và brand guideline, và mọi bản nháp đều đi qua cùng một approval workflow - luôn có người duyệt, không bao giờ tự publish.'
  },
  {
    en: 'Exposed the content model through REST and GraphQL delivery endpoints for the React headless frontend, and tuned the MySQL-backed content repository and Magnolia caching so the public instances stay fast under load.',
    vi: 'Mở content model qua các endpoint REST và GraphQL cho frontend React headless, đồng thời tối ưu content repository trên MySQL và cache của Magnolia để các public instance vẫn nhanh khi tải tăng.'
  },
  {
    en: 'Deployed and operated the whole system on Windows Server with Apache Tomcat: installed and configured the author and public instances as Windows services, tuned the JVM and Tomcat connectors, set up Apache in front for SSL and domain routing, configured publishing between instances, backups, and wrote the release procedure used for every deployment.',
    vi: 'Triển khai và vận hành toàn bộ hệ thống trên Windows Server với Apache Tomcat: cài đặt và cấu hình author / public instance dưới dạng Windows service, tuning JVM và Tomcat connector, dựng Apache phía trước cho SSL và định tuyến domain, cấu hình publishing giữa các instance, backup, và viết quy trình release dùng cho mọi lần deploy.'
  }
]

const CHALLENGES = [
  {
    en: 'Shared content vs. per-market differences: the AU and NZ sites need the same catalogue but different phone numbers, branches, stock and compliance wording. The content model had to allow shared nodes with site-level overrides without editors duplicating pages.',
    vi: 'Nội dung dùng chung vs. khác biệt theo thị trường: site AU và NZ cần cùng một danh mục nhưng khác số điện thoại, chi nhánh, tồn kho và câu chữ tuân thủ. Content model phải cho phép node dùng chung kèm override theo site mà biên tập viên không phải nhân đôi trang.'
  },
  {
    en: 'Personalization vs. performance: every personalized variant bypasses the page cache. Rules had to be evaluated cheaply and variants kept to a small, deliberate set so the public instances stayed fast.',
    vi: 'Personalization vs. hiệu năng: mỗi variant cá nhân hoá đều đi vòng qua page cache. Rule phải được đánh giá rẻ và số variant giữ ở mức nhỏ, có chủ đích để public instance vẫn nhanh.'
  },
  {
    en: 'Publishing consistency across instances: activation from one author to several public instances must not leave a market half-updated. Ordering, dependencies (DAM assets before pages) and cache invalidation had to be handled explicitly.',
    vi: 'Tính nhất quán khi publish qua nhiều instance: activation từ một author sang nhiều public instance không được để một thị trường cập nhật dở dang. Thứ tự, phụ thuộc (asset DAM trước trang) và invalidate cache phải xử lý tường minh.'
  },
  {
    en: 'Running an enterprise CMS on Windows Server + Tomcat: no managed platform, so JVM memory, Tomcat connectors, Windows services, log rotation and low-downtime deployment were all on us - and mostly on me.',
    vi: 'Chạy một CMS doanh nghiệp trên Windows Server + Tomcat: không có managed platform, nên bộ nhớ JVM, Tomcat connector, Windows service, xoay log và deploy ít downtime đều do team tự lo - và phần lớn là tôi.'
  },
  {
    en: 'Learning Magnolia deeply, fast: the team had not shipped on Magnolia before, and most custom modules, workflow and personalization configuration sat with me - so I had to get from framework docs to production-grade code quickly.',
    vi: 'Học Magnolia sâu và nhanh: team chưa từng ship trên Magnolia, và phần lớn module tuỳ chỉnh, workflow và cấu hình personalization nằm ở tôi - nên phải đi từ tài liệu framework tới code chuẩn production trong thời gian ngắn.'
  },
  {
    en: 'AI content with guardrails: the agent had to help editors move faster without ever bypassing review - drafts stay unpublished, carry a provenance flag, and go through the same approval chain as human-written content.',
    vi: 'Nội dung AI có rào chắn: agent phải giúp biên tập viên làm nhanh hơn mà không bao giờ bỏ qua review - bản nháp luôn ở trạng thái chưa xuất bản, có cờ đánh dấu nguồn gốc, và đi qua đúng chuỗi duyệt như nội dung do người viết.'
  }
]

/* Each item may carry `details` - rendered as a nested list (used for the personalization rules) */
const SYSTEM_SCALE = [
  {
    text: {
      en: '3 sites on 1 author instance + 3 public instances - including the two live markets, dotmar.com.au (Australia) and dotmar.co.nz (New Zealand), each on its own domain with local branches and phone numbers',
      vi: '3 site trên 1 author instance + 3 public instance - trong đó có hai thị trường đang chạy, dotmar.com.au (Úc) và dotmar.co.nz (New Zealand), mỗi site một domain riêng với chi nhánh và số điện thoại địa phương'
    }
  },
  {
    text: {
      en: '~10,000 users on the CMS - engineers and buyers on the public sites, plus Dotmar\'s own content, marketing and sales teams on the author instance',
      vi: '~10.000 người dùng trên CMS - kỹ sư và người mua trên site public, cộng với content, marketing và sales team của Dotmar trên author instance'
    }
  },
  {
    text: {
      en: '7 product divisions, 10 target industries, hundreds of product and material pages, plus technical datasheets and imagery served from the Magnolia DAM',
      vi: '7 nhóm sản phẩm, 10 ngành mục tiêu, hàng trăm trang sản phẩm và vật liệu, cùng datasheet kỹ thuật và hình ảnh phục vụ từ Magnolia DAM'
    }
  },
  {
    text: {
      en: 'Personalization rules running in production - evaluated per request on the public instances:',
      vi: 'Rule personalization đang chạy trên production - đánh giá theo từng request trên public instance:'
    },
    details: [
      {
        en: 'Location (geo-IP → country → state / region): nearest branch, local phone number and stock availability.',
        vi: 'Vị trí (geo-IP → quốc gia → bang / vùng): chi nhánh gần nhất, số điện thoại địa phương và tồn kho.'
      },
      {
        en: 'Time of day (visitor local time vs. branch hours): "call now" during business hours, "request a quote" after hours.',
        vi: 'Thời điểm trong ngày (giờ địa phương của khách so với giờ làm việc của chi nhánh): "gọi ngay" trong giờ làm việc, "yêu cầu báo giá" ngoài giờ.'
      },
      {
        en: 'Age group (declared or inferred profile trait): tone and depth of the product-education variant.',
        vi: 'Nhóm tuổi (trait khai báo hoặc suy luận từ profile): tone và độ sâu của variant nội dung hướng dẫn sản phẩm.'
      },
      {
        en: 'Audience segment (pages visited + referral + declared industry): mining, food processing, defence, engineering... each segment reorders materials, case studies and calls to action.',
        vi: 'Phân khúc khách hàng (trang đã xem + nguồn giới thiệu + ngành khai báo): mining, chế biến thực phẩm, quốc phòng, engineering... mỗi segment sắp lại thứ tự vật liệu, case study và call to action.'
      },
      {
        en: 'Rules combine as AND conditions on a segment; a page can carry several variants with a default fallback, and editors preview each persona before publishing.',
        vi: 'Các rule ghép với nhau theo điều kiện AND trên một segment; một trang có thể mang nhiều variant kèm bản mặc định, và biên tập viên xem trước từng persona trước khi xuất bản.'
      }
    ]
  }
]

/* Product details: what the visitor / editor actually gets */
const PRODUCT_FEATURES = [
  { en: 'Product catalogue (7 divisions)', vi: 'Danh mục sản phẩm (7 nhóm)' },
  { en: 'Material & grade pages', vi: 'Trang vật liệu & grade' },
  { en: 'Industry solutions (10 industries)', vi: 'Giải pháp theo ngành (10 ngành)' },
  { en: 'Applications', vi: 'Ứng dụng' },
  { en: 'Capabilities & CNC machining', vi: 'Năng lực & gia công CNC' },
  { en: 'Technical datasheets (DAM)', vi: 'Datasheet kỹ thuật (DAM)' },
  { en: 'Insights / articles', vi: 'Insights / bài viết' },
  { en: 'AU / NZ region switcher', vi: 'Chuyển vùng AU / NZ' },
  { en: 'Branch locator & contact', vi: 'Tìm chi nhánh & liên hệ' },
  { en: 'Request a quote', vi: 'Yêu cầu báo giá' },
  { en: 'Site search', vi: 'Tìm kiếm' },
  { en: 'Personalized variants', vi: 'Nội dung cá nhân hoá' },
  { en: 'Editorial workflow', vi: 'Quy trình duyệt nội dung' },
  { en: 'AI-drafted content', vi: 'Nội dung AI soạn nháp' }
]

/* Product details: architecture layers, top (client) to bottom (runtime) */
const ARCH_LAYERS = [
  {
    layer: { en: 'Clients', vi: 'Client' },
    tech: ['React (headless)', 'Magnolia-rendered pages', 'Region switcher'],
    note: { en: 'One public site per market. React consumes the delivery APIs; server-rendered pages come straight from the public instances.', vi: 'Mỗi thị trường một site public. React đọc từ delivery API; trang server-rendered đi thẳng từ public instance.' }
  },
  {
    layer: { en: 'CMS', vi: 'CMS' },
    tech: ['Magnolia CMS (author + public)', 'Content apps', 'Custom modules (Java Core)'],
    note: { en: 'Content types, templates, dialogs, DAM, multi-site definitions. Custom Java modules where the platform stops.', vi: 'Content type, template, dialog, DAM, site definition multi-site. Module Java tuỳ chỉnh ở nơi platform không đáp ứng.' }
  },
  {
    layer: { en: 'Delivery APIs', vi: 'Delivery API' },
    tech: ['REST', 'GraphQL'],
    note: { en: 'Endpoints over the shared content model for the React frontend and other channels.', vi: 'Endpoint trên content model dùng chung cho frontend React và các kênh khác.' }
  },
  {
    layer: { en: 'Workflow', vi: 'Workflow' },
    tech: ['Magnolia workflow', 'Roles & ACLs', 'Scheduled publishing'],
    note: { en: 'Author → review → approve → activate. Each step is a role; rejections carry comments; publishing can be scheduled.', vi: 'Soạn → review → duyệt → activate. Mỗi bước là một role; từ chối kèm comment; có thể hẹn giờ xuất bản.' }
  },
  {
    layer: { en: 'Personalization', vi: 'Personalization' },
    tech: ['Traits', 'Segments', 'Variants'],
    note: { en: 'Location, time of day, age group and audience traits → segments → page / component variants with a default fallback.', vi: 'Trait vị trí, thời điểm, nhóm tuổi và phân khúc → segment → variant của trang / component kèm bản mặc định.' }
  },
  {
    layer: { en: 'AI', vi: 'AI' },
    tech: ['LLM authoring agent'],
    note: { en: 'Drafts from structured product data and brand guidelines; output enters the workflow as an unpublished page.', vi: 'Soạn nháp từ dữ liệu sản phẩm có cấu trúc và brand guideline; kết quả đi vào workflow như một trang chưa xuất bản.' }
  },
  {
    layer: { en: 'Data', vi: 'Dữ liệu' },
    tech: ['JCR content repository', 'MySQL', 'DAM'],
    note: { en: 'Content and assets in the JCR repository persisted on MySQL; datasheets and imagery in the DAM.', vi: 'Nội dung và asset trong JCR repository lưu trên MySQL; datasheet và hình ảnh trong DAM.' }
  },
  {
    layer: { en: 'Runtime', vi: 'Runtime' },
    tech: ['Windows Server', 'Apache Tomcat', 'Apache HTTP Server'],
    note: { en: 'Author and public instances as Windows services on Tomcat; Apache in front for SSL, domains and caching. Deployed and tuned by me.', vi: 'Author và public instance chạy dưới dạng Windows service trên Tomcat; Apache phía trước cho SSL, domain và cache. Do tôi deploy và tuning.' }
  }
]

const PUBLISH_FLOW = ['Author', 'Review', 'Approve', 'Activate', 'Public AU / NZ', 'Cache flush']
const REQUEST_FLOW = ['Browser', 'Apache', 'Tomcat (public)', 'Personalization rules', 'Page / REST / GraphQL', 'React']

const SITE_LINKS = [
  {
    key: 'au',
    region: { en: 'Australia', vi: 'Úc' },
    domain: 'dotmar.com.au',
    href: 'https://www.dotmar.com.au/',
    label: { en: 'Open the Australian site', vi: 'Mở site Úc' }
  },
  {
    key: 'nz',
    region: { en: 'New Zealand', vi: 'New Zealand' },
    domain: 'dotmar.co.nz',
    href: 'https://www.dotmar.co.nz/',
    label: { en: 'Open the New Zealand site', vi: 'Mở site New Zealand' }
  }
]

const CONTENT = {
  stackLabel: { en: 'Stack', vi: 'Stack' },
  contextH: { en: 'Context', vi: 'Bối cảnh' },
  context: [
    {
      en: 'Dotmar Engineering Plastics has been in business since 1967 and is the largest distributor of semi-finished engineering thermoplastics and conveyor components in Australia and New Zealand - seven product divisions (from PTFE, Nylon and Acetal up to PEEK and PBI), ten target industries (mining, food and beverage processing, defence, water treatment, transport...), and eight machining centres that turn stock shapes into custom CNC parts. Its website is not a brochure: it is the front door of the sales motion. Engineers and buyers land on a material or industry page, read technical data, compare grades, and contact the nearest branch or request a quote.',
      vi: 'Dotmar Engineering Plastics hoạt động từ năm 1967 và là nhà phân phối nhựa kỹ thuật bán thành phẩm cùng linh kiện băng tải lớn nhất tại Úc và New Zealand - 7 nhóm sản phẩm (từ PTFE, Nylon, Acetal tới PEEK, PBI), 10 ngành mục tiêu (khai khoáng, chế biến thực phẩm và đồ uống, quốc phòng, xử lý nước, vận tải...) và 8 trung tâm gia công biến phôi nhựa thành chi tiết CNC theo yêu cầu. Website của họ không phải brochure: đó là cửa ngõ của quy trình bán hàng. Kỹ sư và người mua vào trang vật liệu hoặc trang ngành, đọc thông số kỹ thuật, so sánh grade, rồi liên hệ chi nhánh gần nhất hoặc gửi yêu cầu báo giá.'
    },
    {
      en: 'The brief, delivered through SmartOSC, was to rebuild that front door as a Magnolia multi-site CMS: one author instance where the content team works, feeding separate public instances for each market (dotmar.com.au, dotmar.co.nz) with local phone numbers, branches and product availability - while sharing the product catalogue, technical datasheets and insights content so nothing is written twice. On top of that, the sales and marketing teams asked for three things: an editorial approval workflow that mirrors how content is actually signed off, rule-driven personalization so a mining engineer in Queensland and a food-processing buyer in Auckland see different things on the same page, and an AI authoring agent that drafts product and industry copy for editors to review.',
      vi: 'Yêu cầu, triển khai qua SmartOSC, là xây lại cửa ngõ đó thành một CMS multi-site trên Magnolia: một author instance nơi content team làm việc, đẩy nội dung sang các public instance riêng cho từng thị trường (dotmar.com.au, dotmar.co.nz) với số điện thoại, chi nhánh và tồn kho địa phương - nhưng dùng chung danh mục sản phẩm, datasheet kỹ thuật và bài insights để không phải viết gì hai lần. Trên nền đó, sales và marketing team cần thêm ba thứ: một approval workflow biên tập phản ánh đúng cách nội dung được duyệt thực tế, personalization theo rule để một kỹ sư khai khoáng ở Queensland và một người mua ngành thực phẩm ở Auckland thấy nội dung khác nhau trên cùng một trang, và một AI agent soạn nháp nội dung sản phẩm / ngành cho biên tập viên duyệt.'
    },
    {
      en: 'Delivery had to run on Dotmar\'s own infrastructure - Windows Server with Apache Tomcat - rather than a managed cloud, so deployment, tuning and stability of the CMS runtime were part of the scope from day one.',
      vi: 'Hệ thống phải chạy trên hạ tầng của chính Dotmar - Windows Server với Apache Tomcat - thay vì cloud managed, nên deploy, tuning và độ ổn định của runtime CMS nằm trong phạm vi công việc ngay từ ngày đầu.'
    }
  ],
  roleH: { en: 'Role', vi: 'Vai trò' },
  role: { en: 'Fullstack Developer · Tech Lead', vi: 'Fullstack Developer · Tech Lead' },
  roleNote: {
    en: 'Main developer on the project - built and deployed most of the system end to end, from Magnolia features to the Windows / Tomcat production setup.',
    vi: 'Developer chính của dự án - trực tiếp xây và deploy phần lớn hệ thống, từ feature trên Magnolia tới production trên Windows / Tomcat.'
  },
  ownershipH: { en: 'My Contribution / Ownership', vi: 'Phần tôi trực tiếp phụ trách' },
  useCasesH: { en: 'Highlighted Use Cases', vi: 'Use case nổi bật' },
  challengesH: { en: 'Challenges', vi: 'Thử thách' },
  systemScaleH: { en: 'System Scale', vi: 'Quy mô hệ thống' },
  productH: { en: 'Product Details', vi: 'Chi tiết sản phẩm' },
  productSubH: { en: 'The product', vi: 'Sản phẩm' },
  productIntro: {
    en: 'Two public websites - one per market - plus the author instance the content team lives in. Everything below is served from one content tree and one Magnolia platform.',
    vi: 'Hai website public - mỗi thị trường một site - cùng author instance nơi content team làm việc. Mọi thứ bên dưới được phục vụ từ một cây nội dung và một nền tảng Magnolia.'
  },
  techSubH: { en: 'Under the hood', vi: 'Kỹ thuật' },
  techIntro: {
    en: 'Layered top to bottom - from the page a buyer opens to the Tomcat service it runs on. The shared content model is the contract between layers; site definitions and personalization variants are what make one tree serve several markets.',
    vi: 'Xếp lớp từ trên xuống - từ trang mà người mua mở tới Tomcat service chạy bên dưới. Content model dùng chung là hợp đồng giữa các lớp; site definition và variant personalization là thứ giúp một cây nội dung phục vụ được nhiều thị trường.'
  },
  publishFlowH: { en: 'Publishing path', vi: 'Luồng xuất bản' },
  requestFlowH: { en: 'Request path', vi: 'Luồng request' },
  linksH: { en: 'Product Links', vi: 'Link sản phẩm' },
  linksHint: {
    en: 'Both public sites are live on the platform described above. Open either one to see the multi-site setup, the region switcher, and the product catalogue in production.',
    vi: 'Cả hai site public đang chạy trên nền tảng mô tả ở trên. Mở một trong hai để xem mô hình multi-site, nút chuyển vùng và danh mục sản phẩm trên production.'
  }
}

export default function DotmarCmsProject() {
  const { lang } = useLanguage()

  const renderFlow = (steps) => (
    <div className="dm-flow">
      {steps.map((s, i) => (
        <span key={`${s}-${i}`} className="dm-flow__item">
          <span className="dm-flow__step">{s}</span>
          {i < steps.length - 1 && <span className="dm-flow__arrow" aria-hidden="true">→</span>}
        </span>
      ))}
    </div>
  )

  return (
    <ProjectShell slug="dotmar-cms">
      <article className="trend">
        <header className="project-intro project-intro--trend">
          <span className="project-intro__eyebrow">{tr(meta.type, lang)}</span>
          <h1>{tr(meta.title, lang)}</h1>
          <div className="dm-role">
            <span className="dm-role__label">{tr(CONTENT.roleH, lang)}</span>
            <strong className="dm-role__value">{tr(CONTENT.role, lang)}</strong>
            <span className="dm-role__note">{tr(CONTENT.roleNote, lang)}</span>
          </div>
          <p className="project-intro__lead">{tr(meta.subtitle, lang)}</p>
        </header>

        <section className="trend-metrics">
          <p className="trend-label">{tr(CONTENT.stackLabel, lang)}</p>
          <div className="trend-chips">
            {STACK.map((m) => (
              <span key={m} className="trend-chip">{m}</span>
            ))}
          </div>
        </section>

        <section className="trend-narrative dm-narrative">
          <div className="trend-col">
            <h2>{tr(CONTENT.contextH, lang)}</h2>
            {CONTENT.context.map((p, i) => (
              <p key={i}>{tr(p, lang)}</p>
            ))}
          </div>
        </section>

        <section className="trend-recs">
          <h2>{tr(CONTENT.ownershipH, lang)}</h2>
          <ol>
            {CONTRIBUTIONS.map((r, i) => (
              <li key={i}>{tr(r, lang)}</li>
            ))}
          </ol>
        </section>

        <section className="trend-recs">
          <h2>{tr(CONTENT.useCasesH, lang)}</h2>
          <ol>
            {USE_CASES.map((r, i) => (
              <li key={i}>{tr(r, lang)}</li>
            ))}
          </ol>
        </section>

        <section className="trend-recs">
          <h2>{tr(CONTENT.challengesH, lang)}</h2>
          <ol>
            {CHALLENGES.map((r, i) => (
              <li key={i}>{tr(r, lang)}</li>
            ))}
          </ol>
        </section>

        <section className="trend-recs">
          <h2>{tr(CONTENT.systemScaleH, lang)}</h2>
          <ol>
            {SYSTEM_SCALE.map((r, i) => (
              <li key={i}>
                {tr(r.text, lang)}
                {r.details && (
                  <ul className="dm-rules">
                    {r.details.map((d, j) => (
                      <li key={j}>{tr(d, lang)}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="trend-recs dm-product">
          <h2>{tr(CONTENT.productH, lang)}</h2>

          <h3>{tr(CONTENT.productSubH, lang)}</h3>
          <p className="dm-product__intro">{tr(CONTENT.productIntro, lang)}</p>
          <ul className="dm-feature-grid">
            {PRODUCT_FEATURES.map((f, i) => (
              <li key={i} className="dm-feature">{tr(f, lang)}</li>
            ))}
          </ul>

          <h3>{tr(CONTENT.techSubH, lang)}</h3>
          <p className="dm-product__intro">{tr(CONTENT.techIntro, lang)}</p>
          <div className="dm-arch">
            {ARCH_LAYERS.map((row, i) => (
              <div key={i} className="dm-arch__row">
                <div className="dm-arch__layer">{tr(row.layer, lang)}</div>
                <div className="dm-arch__tech">
                  {row.tech.map((t) => (
                    <span key={t} className="trend-chip trend-chip--sm">{t}</span>
                  ))}
                </div>
                <p className="dm-arch__note">{tr(row.note, lang)}</p>
              </div>
            ))}
          </div>

          <p className="trend-label dm-flow__label">{tr(CONTENT.publishFlowH, lang)}</p>
          {renderFlow(PUBLISH_FLOW)}
          <p className="trend-label dm-flow__label">{tr(CONTENT.requestFlowH, lang)}</p>
          {renderFlow(REQUEST_FLOW)}
        </section>

        <section className="trend-recs">
          <h2>{tr(CONTENT.linksH, lang)}</h2>
          <p className="dm-site__hint">{tr(CONTENT.linksHint, lang)}</p>
          <div className="dm-site-grid">
            {SITE_LINKS.map((s) => (
              <a
                key={s.key}
                className="dm-site"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="dm-site__region">{tr(s.region, lang)}</span>
                <span className="dm-site__domain">{s.domain}</span>
                <span className="dm-site__label">{tr(s.label, lang)} ↗</span>
              </a>
            ))}
          </div>
        </section>

        <p className="trend-impact">{tr(meta.impact, lang)}</p>
      </article>
    </ProjectShell>
  )
}
