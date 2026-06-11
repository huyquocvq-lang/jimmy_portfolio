/**
 * Blog posts.
 *
 * Each post owns its long-form copy here as a structured `body` array of
 * blocks. Block types: `paragraph`, `heading`, `list`, `code`, `quote`,
 * `image`, `callout`, `html`, `video`. Text fields are `{ en, vi }` pairs
 * (or plain strings for tech terms); resolve at render time via
 * `tr(value, lang)`. Tech terms, framework names, code, and tags stay as
 * plain strings.
 *
 * `html` blocks are rendered with dangerouslySetInnerHTML and must only ever
 * hold author-written markup (never user input). `video` blocks render a
 * native <video> by default, or an <iframe> embed when `embed: true`.
 */

/** A string, or an English/Vietnamese pair resolved via `tr()`. */
export type Localized = string | { en: string; vi: string }

export type Block =
  | { type: 'paragraph'; text: Localized }
  | { type: 'heading'; level?: 2 | 3; text: Localized }
  | { type: 'list'; items: Localized[] }
  | { type: 'code'; lang?: string; code: string }
  | { type: 'quote'; text: Localized }
  | { type: 'callout'; text: Localized }
  | { type: 'image'; src: string; alt?: Localized; caption?: Localized }
  | { type: 'html'; html: string }
  | {
      type: 'video'
      src: string
      /** When true, render as an <iframe> embed (YouTube/Vimeo). */
      embed?: boolean
      poster?: string
      title?: string
      caption?: Localized
    }

export interface BlogPost {
  slug: string
  title: Localized
  excerpt: Localized
  /** ISO date string (YYYY-MM-DD). */
  date: string
  cover: string | null
  tags: string[]
  readMinutes?: number
  body: Block[]
}

export const blog: BlogPost[] = [
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
  },
  {
    slug: 'running-zigbee2mqtt-in-production',
    title: {
      en: 'Running Zigbee2MQTT in production: what actually breaks',
      vi: 'Chạy Zigbee2MQTT trên production: thứ thực sự hay hỏng'
    },
    excerpt: {
      en: 'Zigbee2MQTT is fantastic on a hobby Raspberry Pi. Pushing it to thousands of gateways surfaces a different set of problems - coordinator firmware, network depth, and OTA.',
      vi: 'Zigbee2MQTT rất tuyệt trên một con Raspberry Pi nghịch ở nhà. Đẩy nó lên hàng nghìn gateway lại lộ ra một loạt vấn đề khác - firmware coordinator, độ sâu mạng và OTA.'
    },
    date: '2026-04-30',
    cover: '/images/blog/zigbee2mqtt.jpg',
    tags: ['Zigbee', 'Zigbee2MQTT', 'MQTT', 'IoT', 'Node.js'],
    readMinutes: 9,
    body: [
      {
        type: 'paragraph',
        text: {
          en: 'Zigbee2MQTT (Z2M) bridges a Zigbee coordinator to an MQTT broker, so any home-automation stack that speaks MQTT can drive Zigbee devices without a vendor cloud. At home it is a one-line config. Across a fleet of gateways, the failure modes are entirely different - and most of them are not in the application code.',
          vi: 'Zigbee2MQTT (Z2M) làm cầu nối giữa một coordinator Zigbee và broker MQTT, để mọi stack home-automation nói MQTT đều điều khiển được thiết bị Zigbee mà không cần cloud của hãng. Ở nhà nó chỉ là một dòng config. Trên cả một fleet gateway, các kiểu hỏng lại hoàn toàn khác - và phần lớn không nằm ở code ứng dụng.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'The coordinator is the real bottleneck', vi: 'Coordinator mới là nút thắt thật sự' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'A Zigbee coordinator (the USB or SoC radio) holds the network state. Cheap CC2531 sticks top out around 20 directly-connected devices and choke long before the spec\'s theoretical limit. We standardized on coordinators with more RAM and a maintained firmware line, because re-pairing a customer\'s whole house after a coordinator swap is the worst possible support ticket.',
          vi: 'Coordinator Zigbee (radio dạng USB hoặc SoC) giữ trạng thái mạng. Các stick CC2531 giá rẻ chỉ kham được khoảng 20 thiết bị kết nối trực tiếp và nghẽn từ lâu trước giới hạn lý thuyết của chuẩn. Chúng tôi chuẩn hoá trên coordinator nhiều RAM hơn với dòng firmware được maintain, vì bắt khách pair lại cả nhà sau khi đổi coordinator là ticket support tệ nhất có thể.'
        }
      },
      {
        type: 'list',
        items: [
          { en: 'Pick routers (mains-powered devices) deliberately - they extend the mesh; battery devices never route.', vi: 'Chọn router (thiết bị cắm điện) một cách có chủ đích - chúng mở rộng mesh; thiết bị pin không bao giờ route.' },
          { en: 'Keep network depth shallow; every hop adds latency and a new point of failure.', vi: 'Giữ độ sâu mạng nông; mỗi hop thêm độ trễ và một điểm hỏng mới.' },
          { en: 'Pin the Zigbee channel away from the customer\'s Wi-Fi channel to avoid 2.4GHz contention.', vi: 'Ghim kênh Zigbee tránh xa kênh Wi-Fi của khách để tránh tranh chấp băng 2.4GHz.' }
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'A config that survives reboots', vi: 'Config sống sót qua reboot' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'Z2M reads a single YAML file. The defaults are tuned for a hobbyist on a trusted LAN - not a fleet. These are the keys we set on every gateway image:',
          vi: 'Z2M đọc một file YAML duy nhất. Mặc định được tinh chỉnh cho người nghịch ở nhà trên LAN tin cậy - không phải cho fleet. Đây là các key chúng tôi set trên mọi image gateway:'
        }
      },
      {
        type: 'code',
        lang: 'yaml',
        code: 'mqtt:\n  base_topic: zigbee2mqtt\n  server: mqtt://127.0.0.1:1883\n  keepalive: 30\n  reject_unauthorized: true\nserial:\n  port: /dev/ttyUSB0\n  adapter: zstack\nadvanced:\n  log_level: warn\n  channel: 25            # keep clear of Wi-Fi 1/6/11\n  network_key: GENERATE  # unique per gateway, persisted on first boot\n  transmit_power: 20\navailability:\n  active:\n    timeout: 10\nota:\n  disable_automatic_update_check: true  # we schedule OTA centrally'
      },
      {
        type: 'callout',
        text: {
          en: 'Set network_key to GENERATE once, then persist the generated key. If a gateway image ships with a hard-coded key, every device on every customer\'s network shares the same encryption key. That is a fleet-wide security incident waiting to happen.',
          vi: 'Đặt network_key thành GENERATE một lần, rồi lưu lại key sinh ra. Nếu image gateway ship kèm key hard-code, mọi thiết bị trên mạng của mọi khách sẽ dùng chung một key mã hoá. Đó là một sự cố bảo mật cấp fleet chỉ chờ ngày xảy ra.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Listen to the bridge, not just the devices', vi: 'Lắng nghe bridge, không chỉ lắng nghe thiết bị' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'Z2M publishes its own health on zigbee2mqtt/bridge/state and zigbee2mqtt/bridge/event. Our fleet agent subscribes to those topics and ships them upstream, so we see a coordinator going offline before the customer notices their lights stopped responding.',
          vi: 'Z2M publish chính sức khoẻ của nó lên zigbee2mqtt/bridge/state và zigbee2mqtt/bridge/event. Agent fleet của chúng tôi subscribe các topic đó và đẩy lên trên, nên chúng tôi thấy coordinator offline trước khi khách nhận ra đèn của họ ngừng phản hồi.'
        }
      },
      {
        type: 'code',
        lang: 'javascript',
        code: "const mqtt = require('mqtt')\nconst client = mqtt.connect('mqtt://127.0.0.1:1883')\n\nclient.on('connect', () => {\n  client.subscribe('zigbee2mqtt/bridge/state')\n  client.subscribe('zigbee2mqtt/bridge/event')\n})\n\nclient.on('message', (topic, payload) => {\n  const data = JSON.parse(payload.toString())\n  if (topic.endsWith('/state') && data.state === 'offline') {\n    reportCoordinatorDown(data)\n  }\n})"
      },
      {
        type: 'paragraph',
        text: {
          en: 'A short walkthrough of the pairing + bridge-health flow (swap in your own recording):',
          vi: 'Một video ngắn đi qua luồng pairing + bridge-health (thay bằng bản ghi của bạn):'
        }
      },
      {
        type: 'video',
        embed: true,
        src: 'https://www.youtube.com/embed/VIDEO_ID',
        title: 'Zigbee2MQTT pairing walkthrough',
        caption: { en: 'Replace VIDEO_ID with your own YouTube/Vimeo embed.', vi: 'Thay VIDEO_ID bằng embed YouTube/Vimeo của bạn.' }
      },
      {
        type: 'video',
        src: '/videos/blog/zigbee2mqtt-pairing-demo.mp4',
        poster: '/images/blog/zigbee2mqtt.jpg',
        caption: { en: 'Or host the clip yourself for full control over playback.', vi: 'Hoặc tự host clip để toàn quyền kiểm soát phát lại.' }
      },
      {
        type: 'quote',
        text: {
          en: 'On a fleet, Z2M is not the hard part. The Zigbee mesh underneath it is.',
          vi: 'Trên fleet, Z2M không phải phần khó. Cái mesh Zigbee bên dưới nó mới khó.'
        }
      }
    ]
  },
  {
    slug: 'kafka-vs-redis-choosing-the-backbone',
    title: {
      en: 'Kafka vs Redis: choosing the backbone for async work',
      vi: 'Kafka vs Redis: chọn backbone cho xử lý bất đồng bộ'
    },
    excerpt: {
      en: 'They both move messages, so teams treat them as interchangeable. They are not. A practical comparison of durability, ordering, throughput, and when to reach for each.',
      vi: 'Cả hai đều chuyển message nên nhiều team coi chúng thay thế được cho nhau. Không phải vậy. Một so sánh thực dụng về độ bền, thứ tự, throughput và khi nào nên dùng cái nào.'
    },
    date: '2026-03-15',
    cover: '/images/blog/kafka-vs-redis.jpg',
    tags: ['Kafka', 'Redis', 'Architecture', 'Messaging', 'Backend'],
    readMinutes: 8,
    body: [
      {
        type: 'paragraph',
        text: {
          en: 'Both Kafka and Redis can carry messages between services, so they end up on the same shortlist. But they were built for different jobs: Kafka is a durable, replayable commit log; Redis is an in-memory data structure server that also happens to do pub/sub and streams. Choosing wrong shows up later as either lost messages or a cluster you cannot afford.',
          vi: 'Cả Kafka và Redis đều có thể chuyển message giữa các service, nên chúng hay nằm chung một shortlist. Nhưng chúng được sinh ra cho hai việc khác nhau: Kafka là một commit log bền vững, replay được; Redis là server cấu trúc dữ liệu in-memory mà tiện thể làm được pub/sub và streams. Chọn sai sẽ lộ ra về sau dưới dạng mất message hoặc một cluster bạn không kham nổi.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'The short version', vi: 'Bản tóm tắt' }
      },
      {
        type: 'html',
        html: '<table class="blog-table"><thead><tr><th>Dimension</th><th>Apache Kafka</th><th>Redis (Streams / Pub-Sub)</th></tr></thead><tbody><tr><td>Primary model</td><td>Durable, partitioned commit log</td><td>In-memory data structures + streams</td></tr><tr><td>Persistence</td><td>Disk, replicated, configurable retention</td><td>In-memory; optional RDB/AOF</td></tr><tr><td>Replay history</td><td>Yes - seek to any offset</td><td>Limited - capped by stream length / memory</td></tr><tr><td>Ordering</td><td>Per-partition guarantee</td><td>Per-stream insertion order</td></tr><tr><td>Latency</td><td>Low (ms), throughput-optimized</td><td>Very low (sub-ms)</td></tr><tr><td>Operational weight</td><td>Heavier (brokers, ZK/KRaft)</td><td>Light, often already deployed</td></tr></tbody></table>'
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Reach for Kafka when…', vi: 'Dùng Kafka khi…' }
      },
      {
        type: 'list',
        items: [
          { en: 'You need to replay events - new consumers reading history from offset 0.', vi: 'Bạn cần replay event - consumer mới đọc lại lịch sử từ offset 0.' },
          { en: 'Multiple independent consumer groups read the same stream at their own pace.', vi: 'Nhiều consumer group độc lập đọc cùng một stream theo nhịp riêng.' },
          { en: 'Durability is non-negotiable - financial events, audit logs, the source of truth.', vi: 'Độ bền là bắt buộc - sự kiện tài chính, audit log, nguồn sự thật.' }
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Reach for Redis when…', vi: 'Dùng Redis khi…' }
      },
      {
        type: 'list',
        items: [
          { en: 'You want a job queue or rate limiter and Redis is already in your stack.', vi: 'Bạn cần job queue hoặc rate limiter và Redis đã có sẵn trong stack.' },
          { en: 'Latency matters more than long-term retention - cache invalidation, presence, live counters.', vi: 'Độ trễ quan trọng hơn lưu trữ dài hạn - invalidate cache, presence, bộ đếm trực tiếp.' },
          { en: 'The message can be lost without business impact, or it lives for seconds.', vi: 'Message có thể mất mà không ảnh hưởng nghiệp vụ, hoặc chỉ sống vài giây.' }
        ]
      },
      {
        type: 'callout',
        text: {
          en: 'A common production pattern: Redis for the hot, low-latency work queue in front, Kafka as the durable event log behind it. They are complements far more often than competitors.',
          vi: 'Một pattern production phổ biến: Redis làm work queue nóng, độ trễ thấp ở phía trước, Kafka làm event log bền vững phía sau. Chúng bổ trợ cho nhau nhiều hơn là cạnh tranh.'
        }
      },
      {
        type: 'paragraph',
        text: {
          en: 'A minimal Redis Streams producer/consumer - note that XREADGROUP plus XACK gives you at-least-once delivery without standing up a broker fleet:',
          vi: 'Một producer/consumer Redis Streams tối giản - lưu ý XREADGROUP cùng XACK cho bạn giao nhận at-least-once mà không cần dựng cả fleet broker:'
        }
      },
      {
        type: 'code',
        lang: 'javascript',
        code: "import { createClient } from 'redis'\nconst redis = createClient()\nawait redis.connect()\n\n// producer\nawait redis.xAdd('jobs', '*', { type: 'resize', assetId: '42' })\n\n// consumer group (create once, ignore BUSYGROUP error)\ntry { await redis.xGroupCreate('jobs', 'workers', '0', { MKSTREAM: true }) } catch {}\n\nconst res = await redis.xReadGroup('workers', 'worker-1',\n  [{ key: 'jobs', id: '>' }], { COUNT: 10, BLOCK: 5000 })\nfor (const { id } of res?.[0]?.messages ?? []) {\n  await redis.xAck('jobs', 'workers', id) // ack only after the work succeeds\n}"
      },
      {
        type: 'quote',
        text: {
          en: 'Pick Kafka for the log of what happened. Pick Redis for the work that needs doing now.',
          vi: 'Chọn Kafka cho cuốn sổ ghi điều đã xảy ra. Chọn Redis cho công việc cần làm ngay bây giờ.'
        }
      }
    ]
  },
  {
    slug: 'javascript-tricks-i-reach-for',
    title: {
      en: 'JavaScript tricks I reach for every week',
      vi: 'Những trick JavaScript tôi dùng mỗi tuần'
    },
    excerpt: {
      en: 'Modern JS quietly absorbed a lot of utility-library territory. A handful of language features that delete code from real codebases.',
      vi: 'JavaScript hiện đại đã âm thầm nuốt gọn nhiều phần đất của các thư viện tiện ích. Vài tính năng ngôn ngữ giúp xoá bớt code khỏi codebase thật.'
    },
    date: '2026-02-02',
    cover: '/images/blog/js-tricks.jpg',
    tags: ['JavaScript', 'TypeScript', 'Frontend', 'Tips'],
    readMinutes: 6,
    body: [
      {
        type: 'paragraph',
        text: {
          en: 'Most "JS tricks" lists are clickbait. These are not tricks for their own sake - each one removed a dependency or a block of defensive boilerplate from code I actually shipped.',
          vi: 'Phần lớn các list "trick JS" là câu view. Đây không phải mẹo cho vui - mỗi cái đã xoá đi một dependency hoặc một khối boilerplate phòng thủ khỏi code tôi thật sự ship.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Optional chaining + nullish coalescing', vi: 'Optional chaining + nullish coalescing' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'The pair that killed lodash.get for most cases. ?. short-circuits on null/undefined; ?? only falls back on null/undefined (not on 0 or empty string, which is the bug || always hid).',
          vi: 'Cặp đôi đã khai tử lodash.get trong hầu hết trường hợp. ?. dừng sớm khi gặp null/undefined; ?? chỉ fallback khi null/undefined (không phải khi 0 hay chuỗi rỗng - đúng cái bug mà || luôn giấu đi).'
        }
      },
      {
        type: 'code',
        lang: 'javascript',
        code: "// before\nconst port = (config && config.server && config.server.port) || 8080\n// 0 would wrongly become 8080\n\n// after\nconst port = config?.server?.port ?? 8080  // 0 stays 0"
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Group with Object.groupBy', vi: 'Gom nhóm với Object.groupBy' }
      },
      {
        type: 'code',
        lang: 'javascript',
        code: "const orders = [\n  { id: 1, status: 'paid' },\n  { id: 2, status: 'pending' },\n  { id: 3, status: 'paid' },\n]\nconst byStatus = Object.groupBy(orders, (o) => o.status)\n// { paid: [...], pending: [...] }"
      },
      {
        type: 'callout',
        text: {
          en: 'Object.groupBy is recent - check your runtime/target before shipping it to browsers. On older targets, a 3-line reduce does the same job.',
          vi: 'Object.groupBy còn mới - kiểm tra runtime/target trước khi ship ra browser. Trên target cũ, một reduce 3 dòng làm đúng việc đó.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Dedupe and intersect with Set', vi: 'Khử trùng lặp và giao nhau bằng Set' }
      },
      {
        type: 'code',
        lang: 'javascript',
        code: "const unique = [...new Set(list)]\n\nconst a = new Set([1, 2, 3])\nconst b = new Set([2, 3, 4])\nconst common = [...a].filter((x) => b.has(x)) // [2, 3]"
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Safe defaults via destructuring', vi: 'Giá trị mặc định an toàn khi bóc tách' }
      },
      {
        type: 'code',
        lang: 'javascript',
        code: "function paginate({ page = 1, size = 20, sort = 'createdAt' } = {}) {\n  return { offset: (page - 1) * size, limit: size, sort }\n}\npaginate()              // safe with no args\npaginate({ page: 3 })   // size/sort fall back"
      },
      {
        type: 'list',
        items: [
          { en: 'structuredClone(obj) deep-copies without JSON.parse(JSON.stringify(...)) and keeps Dates/Maps/Sets.', vi: 'structuredClone(obj) deep-copy mà không cần JSON.parse(JSON.stringify(...)) và giữ được Date/Map/Set.' },
          { en: 'Array.prototype.at(-1) reads the last element without arr[arr.length - 1].', vi: 'Array.prototype.at(-1) lấy phần tử cuối mà không cần arr[arr.length - 1].' },
          { en: 'Promise.allSettled when you want every result, not a fail-fast on the first rejection.', vi: 'Promise.allSettled khi bạn muốn mọi kết quả, không fail-fast ở rejection đầu tiên.' }
        ]
      },
      {
        type: 'quote',
        text: {
          en: 'The best trick is deleting the utility function the language now ships for you.',
          vi: 'Trick tốt nhất là xoá đi hàm tiện ích mà ngôn ngữ giờ đã cung cấp sẵn cho bạn.'
        }
      }
    ]
  }
]

export function getAllPosts(): BlogPost[] {
  return [...blog].sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostBySlug(slug: string): BlogPost | null {
  return blog.find((p) => p.slug === slug) ?? null
}

export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const all = getAllPosts()
  const i = all.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i < all.length - 1 ? all[i + 1] : null
  }
}
