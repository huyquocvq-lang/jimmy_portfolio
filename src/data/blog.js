/**
 * Blog posts.
 *
 * Each post owns its long-form copy here as a structured `body` array of
 * blocks. Block types: `paragraph`, `heading`, `list`, `code`, `quote`,
 * `image`, `callout`. Text fields are `{ en, vi }` pairs; resolve at render
 * time via `tr(value, lang)`. Tech terms, framework names, code, and tags
 * stay as plain strings.
 */
export const blog = [
  {
    slug: 'building-high-traffic-cms-with-spring-boot',
    title: {
      en: 'Building a high-traffic CMS with Java Spring Boot',
      vi: 'Xây CMS chịu tải cao bằng Java Spring Boot'
    },
    excerpt: {
      en: 'What I learned shipping MMP\'s editorial platform - request paths, MySQL access patterns, and the cache layers that mattered.',
      vi: 'Bài học sau khi release nền tảng biên tập của MMP - đường đi của request, pattern truy cập MySQL, và những lớp cache thực sự quan trọng.'
    },
    date: '2025-09-12',
    cover: '/images/blog/mmp-cms.jpg',
    tags: ['Java', 'Spring Boot', 'MySQL', 'Architecture'],
    readMinutes: 7,
    body: [
      {
        type: 'paragraph',
        text: {
          en: 'When MMP asked us to replace their fragmented editorial workflow with a single CMS, the brief was simple but unforgiving: handle large editorial datasets and serve high-traffic public pages without sacrificing the editor experience. Here is how we got there.',
          vi: 'Khi MMP đề nghị thay thế workflow biên tập rời rạc bằng một CMS duy nhất, yêu cầu rất rõ và khắt khe: xử lý dataset biên tập lớn và phục vụ trang public lưu lượng cao mà vẫn giữ trải nghiệm cho biên tập viên. Đây là cách chúng tôi làm.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Start with the traffic shape', vi: 'Bắt đầu từ hình thái traffic' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'A CMS tuned for editorial scale must be tuned for the traffic shape, not just the data shape. We profiled the existing pages, found the long-tail routes, and built the architecture around the request paths first - everything else followed from that.',
          vi: 'Một CMS hướng tới quy mô biên tập phải được tinh chỉnh theo hình thái traffic, không chỉ theo hình thái dữ liệu. Chúng tôi profile các trang hiện có, tìm ra các route long-tail, và xây kiến trúc xoay quanh đường đi của request trước - mọi thứ khác theo sau.'
        }
      },
      {
        type: 'list',
        items: [
          { en: 'Apache fronts every request and serves static assets directly.', vi: 'Apache đứng trước mọi request và phục vụ trực tiếp các tài nguyên tĩnh.' },
          { en: 'Spring Boot handles editorial workflows behind a small REST surface.', vi: 'Spring Boot xử lý workflow biên tập sau một bề mặt REST nhỏ.' },
          { en: 'MySQL queries are hand-tuned, with indexes proven by EXPLAIN ANALYZE.', vi: 'Query MySQL được tinh chỉnh thủ công, index được chứng minh bằng EXPLAIN ANALYZE.' }
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Caching where it matters', vi: 'Cache đúng chỗ' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'We picked exactly two caching layers: HTTP-level caching at Apache for fully rendered article pages, and an in-process cache for the editorial home page. Anything more would have introduced invalidation bugs we did not need.',
          vi: 'Chúng tôi chỉ chọn đúng hai lớp cache: HTTP-level cache trên Apache cho các trang bài viết đã render đầy đủ, và in-process cache cho trang chủ biên tập. Thêm nữa là rước thêm bug invalidation không cần thiết.'
        }
      },
      {
        type: 'code',
        lang: 'java',
        code: '@Cacheable(value = "homePage", key = "#section", unless = "#result == null")\npublic HomePageView load(String section) {\n  return repo.findHomePageBySection(section);\n}'
      },
      {
        type: 'callout',
        text: {
          en: 'Cache the page, not the query. The query is cheap once the right index exists - the rendered template is what dominates the time budget.',
          vi: 'Cache trang, không cache query. Query rẻ khi đã có index đúng - chính template đã render là phần tốn thời gian nhất.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'What I would do differently', vi: 'Nếu làm lại tôi sẽ' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'Next time I would ship the cache invalidation hooks earlier - we spent a sprint chasing stale pages after a CMS publish. Wiring the publish event to the cache eviction up front would have saved real time.',
          vi: 'Lần sau tôi sẽ ship hook invalidate cache sớm hơn - chúng tôi mất một sprint để chạy theo các trang cũ sau khi publish CMS. Nối thẳng publish event vào cache eviction ngay từ đầu sẽ tiết kiệm rất nhiều thời gian.'
        }
      }
    ]
  },
  {
    slug: 'going-headless-with-magnolia-and-react',
    title: {
      en: 'Going headless with Magnolia + React',
      vi: 'Headless với Magnolia + React'
    },
    excerpt: {
      en: 'Editors keep their familiar workflow, the frontend ships on its own schedule, and the API stays simple. The three-layer split that made it work.',
      vi: 'Biên tập viên giữ workflow quen thuộc, frontend ship theo lịch riêng, API vẫn gọn. Cách chia ba lớp đã làm cho mọi thứ vận hành.'
    },
    date: '2025-07-04',
    cover: '/images/blog/magnolia-headless.jpg',
    tags: ['Magnolia', 'React', 'GraphQL', 'Headless CMS'],
    readMinutes: 6,
    body: [
      {
        type: 'paragraph',
        text: {
          en: 'For Dentsu, a monolithic CMS would have coupled presentation too tightly to the content model. A headless setup, done well, lets multiple frontends consume the same content without rework. We picked Magnolia as the content layer and React as the delivery layer.',
          vi: 'Với Dentsu, một CMS monolithic sẽ ràng buộc presentation quá chặt với content model. Một setup headless làm chuẩn cho phép nhiều frontend dùng chung nội dung mà không phải làm lại. Chúng tôi chọn Magnolia làm tầng nội dung và React làm tầng delivery.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Three layers, three release cycles', vi: 'Ba lớp, ba chu kỳ release' }
      },
      {
        type: 'list',
        items: [
          { en: 'Content modeling - reusable Magnolia content types and templates.', vi: 'Content modeling - content type và template tái sử dụng trong Magnolia.' },
          { en: 'API delivery - REST and GraphQL endpoints with caching.', vi: 'Delivery API - endpoint REST và GraphQL có cache.' },
          { en: 'React frontend - server-rendered where SEO mattered.', vi: 'Frontend React - server-render ở những trang cần SEO.' }
        ]
      },
      {
        type: 'paragraph',
        text: {
          en: 'Each layer has its own deploy pipeline. The frontend team can ship a UI change without coordinating with the CMS team; the editorial team can launch a new content type without blocking React releases.',
          vi: 'Mỗi tầng có pipeline deploy riêng. Team frontend ship được thay đổi UI mà không cần phối hợp với team CMS; team biên tập có thể ra mắt content type mới mà không chặn release của React.'
        }
      },
      {
        type: 'code',
        lang: 'graphql',
        code: 'query ArticlePage($slug: String!) {\n  article(slug: $slug) {\n    title\n    body { blocks }\n    seo { metaTitle metaDescription }\n  }\n}'
      },
      {
        type: 'quote',
        text: {
          en: 'The API contract is the only thing that needs to be stable. Everything else can change.',
          vi: 'Hợp đồng API là thứ duy nhất cần ổn định. Mọi thứ khác có thể thay đổi.'
        }
      }
    ]
  },
  {
    slug: 'bridging-zigbee-zwave-ble-in-one-gateway',
    title: {
      en: 'Bridging Zigbee, Z-Wave and BLE in one home gateway',
      vi: 'Kết nối Zigbee, Z-Wave và BLE trong cùng một home gateway'
    },
    excerpt: {
      en: 'A smart home is only as smart as its weakest protocol bridge. Notes from building YooTek\'s gateway that talks to three IoT stacks at once.',
      vi: 'Một ngôi nhà thông minh chỉ thông minh bằng cầu nối protocol yếu nhất. Ghi chép từ việc xây gateway của YooTek nói chuyện với ba stack IoT cùng lúc.'
    },
    date: '2024-11-18',
    cover: '/images/blog/iot-gateway.jpg',
    tags: ['IoT', 'Zigbee', 'Z-Wave', 'BLE', 'MQTT'],
    readMinutes: 8,
    body: [
      {
        type: 'paragraph',
        text: {
          en: 'IoT vendors love their own protocols. Customers do not care. The home gateway sits in the middle and translates between Zigbee, Z-Wave, and BLE devices on one side, and the YooTek cloud on the other - over MQTT and WebSocket.',
          vi: 'Vendor IoT mê protocol riêng của họ. Khách hàng không quan tâm. Home gateway nằm ở giữa và dịch giữa thiết bị Zigbee, Z-Wave, BLE ở một phía và cloud YooTek ở phía kia - qua MQTT và WebSocket.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'One device model, many radios', vi: 'Một model thiết bị, nhiều loại radio' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'We modeled every device as a flat capability list - "switch", "dimmer", "thermostat", "sensor" - regardless of the radio it spoke. The radio layer was a plugin: load the right native module at runtime, expose the same capability API upward.',
          vi: 'Chúng tôi mô hình hoá mọi thiết bị thành danh sách capability phẳng - "switch", "dimmer", "thermostat", "sensor" - bất kể loại radio. Tầng radio là plugin: load native module phù hợp tại runtime, expose cùng một capability API ra ngoài.'
        }
      },
      {
        type: 'list',
        items: [
          { en: 'Zigbee bridge through Tuya / Legrand SDK modules.', vi: 'Cầu nối Zigbee qua module SDK của Tuya / Legrand.' },
          { en: 'Z-Wave handled by a small native daemon over serial.', vi: 'Z-Wave xử lý bởi một daemon native nhỏ qua serial.' },
          { en: 'BLE devices paired through Android-side scanning, gateway proxies the commands.', vi: 'Thiết bị BLE pair qua quét bên Android, gateway proxy các lệnh.' }
        ]
      },
      {
        type: 'callout',
        text: {
          en: 'AI modules (YOLO + OpenCV) ran inside the same gateway for fire and stroke detection - the latency budget for "smoke detected" is way under a second.',
          vi: 'Module AI (YOLO + OpenCV) chạy ngay trong gateway để phát hiện cháy và đột quỵ - budget độ trễ cho cảnh báo "phát hiện khói" dưới một giây.'
        }
      }
    ]
  },
  {
    slug: 'leading-a-small-engineering-team',
    title: {
      en: 'Notes on leading a 5-10 person engineering team',
      vi: 'Ghi chép về việc dẫn dắt một team kỹ sư 5-10 người'
    },
    excerpt: {
      en: 'Code review, task allocation, performance reviews - the small habits that kept the YooTek team shipping without burning out.',
      vi: 'Code review, phân công, đánh giá hiệu suất - những thói quen nhỏ giữ cho team YooTek vẫn ship được mà không kiệt sức.'
    },
    date: '2024-03-22',
    cover: '/images/blog/team-lead.jpg',
    tags: ['Leadership', 'Engineering Management'],
    readMinutes: 5,
    body: [
      {
        type: 'paragraph',
        text: {
          en: 'Leading a 5-10 person team is the awkward middle. The team is too big to wing it and too small for layered processes. The patterns below are what worked for me at YooTek.',
          vi: 'Dẫn dắt team 5-10 người là khoảng giữa khó xử. Team đủ lớn để không thể ad-hoc, nhưng cũng đủ nhỏ để không cần process nhiều tầng. Các pattern dưới đây là những gì đã hiệu quả với tôi ở YooTek.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Code review is the main feedback loop', vi: 'Code review là feedback loop chính' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'A small team without dedicated EM time relies on code review for almost all engineering feedback. I started doing two reviews a day on every PR I touched, with concrete suggestions and short rationale. It compounds.',
          vi: 'Một team nhỏ không có thời gian EM riêng phải dựa vào code review cho gần như mọi phản hồi kỹ thuật. Tôi bắt đầu review hai lần mỗi ngày trên mọi PR tôi chạm vào, với gợi ý cụ thể và lý do ngắn. Lâu dần nó tích lũy.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Pair task allocation with growth', vi: 'Phân công ghép với tăng trưởng cá nhân' }
      },
      {
        type: 'list',
        items: [
          { en: 'Give the boring tickets to the experienced engineers - they finish quickly and unblock the team.', vi: 'Đưa ticket nhàm chán cho kỹ sư có kinh nghiệm - họ làm xong nhanh và mở khoá team.' },
          { en: 'Give the stretch tickets to the juniors, with a co-author from the senior side.', vi: 'Đưa ticket stretch cho junior, kèm một co-author từ phía senior.' },
          { en: 'Rotate the "tedious but important" work so nobody owns it forever.', vi: 'Luân phiên các việc "tẻ nhạt nhưng quan trọng" để không ai sở hữu mãi.' }
        ]
      },
      {
        type: 'quote',
        text: {
          en: 'The job of a tech lead is to make the team faster than the sum of its engineers.',
          vi: 'Việc của tech lead là làm cho team nhanh hơn tổng năng suất của từng kỹ sư.'
        }
      }
    ]
  }
]

export function getAllPosts() {
  return [...blog].sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostBySlug(slug) {
  return blog.find((p) => p.slug === slug) ?? null
}

export function getAdjacentPosts(slug) {
  const all = getAllPosts()
  const i = all.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i < all.length - 1 ? all[i + 1] : null
  }
}
