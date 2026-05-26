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
      en: 'Z2M runs great on a Raspberry Pi in your living room. The first time we shipped it to real homes at scale, the problems were all in the radio layer underneath - not the software.',
      vi: 'Z2M chạy ngon trên một con Raspberry Pi ở phòng khách. Lần đầu chúng tôi đưa nó vào nhà khách hàng ở quy mô thật, vấn đề nằm hết ở tầng radio bên dưới - không phải ở phần mềm.'
    },
    date: '2026-04-30',
    cover: '/images/blog/zigbee2mqtt.jpg',
    tags: ['Zigbee', 'Zigbee2MQTT', 'MQTT', 'IoT', 'Node.js'],
    readMinutes: 9,
    body: [
      {
        type: 'paragraph',
        text: {
          en: 'The first time a customer\'s house went dark on us, I spent two hours reading application logs that had absolutely nothing wrong in them. Zigbee2MQTT was happy. The MQTT broker was happy. The lights still took four seconds to respond, when they responded at all. The culprit was the [CC2531] coordinator stick we\'d standardised on, and it had been quietly lying to us since somewhere around the twentieth paired device.',
          vi: 'Lần đầu tiên nhà một khách hàng tối thui, tôi ngồi đọc log ứng dụng suốt hai tiếng mà chẳng thấy gì sai. Zigbee2MQTT vẫn ổn. MQTT broker vẫn ổn. Đèn vẫn mất bốn giây mới phản hồi, nếu nó chịu phản hồi. Thủ phạm là cây coordinator [CC2531] chúng tôi chọn làm chuẩn, và nó đã âm thầm lừa chúng tôi từ đâu đó quanh thiết bị pair thứ hai mươi.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'The coordinator decides how far you scale', vi: 'Coordinator quyết định bạn scale được tới đâu' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'The coordinator - the USB stick or SoC radio - is where the whole Zigbee network state lives. The cheap sticks run out of room long before you hit any number on the spec sheet. We moved to [a coordinator with more RAM and a firmware line someone still maintains], which sounds obvious written down. Getting there cost us a fleet-wide re-pair, and re-pairing a customer\'s entire house remotely is about the worst support ticket you can hand someone.',
          vi: 'Coordinator - cây USB hoặc radio SoC - là nơi chứa toàn bộ trạng thái mạng Zigbee. Mấy cây giá rẻ hết chỗ từ rất lâu trước khi bạn chạm tới con số nào trên datasheet. Chúng tôi chuyển sang [một coordinator nhiều RAM hơn với dòng firmware còn người maintain], nghe thì hiển nhiên khi viết ra. Để tới đó chúng tôi phải pair lại toàn bộ fleet, và bắt khách pair lại cả nhà từ xa là một trong những ticket support tệ nhất bạn có thể đưa cho ai đó.'
        }
      },
      {
        type: 'paragraph',
        text: {
          en: 'Two things mattered more than I expected. Mains-powered devices act as routers and quietly hold the mesh together; battery devices never route, so a house full of door sensors and no smart plugs builds a network with no backbone. And the Zigbee channel shares the 2.4GHz band with Wi-Fi - park it on top of the customer\'s router and you\'ll chase "random" dropouts for a week.',
          vi: 'Hai thứ quan trọng hơn tôi tưởng nhiều. Thiết bị cắm điện đóng vai router và âm thầm giữ mesh đứng vững; thiết bị pin không bao giờ route, nên một căn nhà toàn cảm biến cửa mà không có ổ cắm thông minh sẽ tạo ra mạng không có xương sống. Còn kênh Zigbee thì dùng chung băng 2.4GHz với Wi-Fi - đặt nó chồng lên router của khách là bạn sẽ đi săn mấy lỗi rớt mạng "ngẫu nhiên" suốt cả tuần.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'The config defaults are for your living room', vi: 'Config mặc định dành cho phòng khách nhà bạn' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'Z2M reads one YAML file, and the defaults assume a hobbyist on a trusted LAN. Here is the trimmed version of what we changed on every gateway image:',
          vi: 'Z2M đọc một file YAML duy nhất, và mặc định giả định bạn là người nghịch ở nhà trên một LAN tin cậy. Đây là bản rút gọn những gì chúng tôi đổi trên mọi image gateway:'
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
          en: 'The one that matters: set network_key to GENERATE and persist whatever it produces. We caught a build once where the key was hard-coded into the image - meaning every gateway we\'d flashed shared one encryption key across every customer\'s network. We re-flashed everything that week. Don\'t be us.',
          vi: 'Cái quan trọng nhất: đặt network_key thành GENERATE và lưu lại bất cứ key nào nó sinh ra. Có lần chúng tôi bắt được một bản build hard-code key thẳng vào image - tức là mọi gateway đã flash dùng chung một key mã hoá trên mạng của mọi khách. Tuần đó chúng tôi flash lại tất cả. Đừng giống chúng tôi.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Watch the bridge, not the devices', vi: 'Theo dõi bridge, đừng theo dõi thiết bị' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'What finally let us stop firefighting was ignoring the devices and listening to Z2M itself. It publishes its own health on zigbee2mqtt/bridge/state and /bridge/event. Our fleet agent subscribes and forwards upstream, so a coordinator dropping offline pages us before the customer has even noticed the lights.',
          vi: 'Thứ cuối cùng giúp chúng tôi ngừng chữa cháy là thôi nhìn thiết bị và lắng nghe chính Z2M. Nó publish sức khoẻ của mình lên zigbee2mqtt/bridge/state và /bridge/event. Agent fleet subscribe rồi đẩy lên trên, nên một coordinator rớt mạng sẽ báo cho chúng tôi trước cả khi khách kịp nhận ra đèn.'
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
          en: 'Here is the pairing and bridge-health flow on a real unit - swap in your own recording:',
          vi: 'Đây là luồng pairing và bridge-health trên một thiết bị thật - thay bằng bản ghi của bạn:'
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
        type: 'paragraph',
        text: {
          en: 'We still get a coordinator that wedges after a bad power cut now and then. The fix is an unglamorous watchdog that hard-resets the USB device if /bridge/state stays offline past [a couple of minutes]. Not clever. Hasn\'t failed yet.',
          vi: 'Thỉnh thoảng vẫn có coordinator bị treo sau một lần mất điện xấu. Cách xử lý là một con watchdog chẳng có gì hoa mỹ: hard-reset thiết bị USB nếu /bridge/state offline quá [vài phút]. Không thông minh. Nhưng tới giờ chưa hỏng.'
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
      en: 'Every few months someone proposes ripping out one and using the other. Here is the argument written down, so my team can stop having it in standup.',
      vi: 'Cứ vài tháng lại có người đề xuất gỡ cái này dùng cái kia. Đây là cuộc tranh luận đó viết ra giấy, để team tôi thôi cãi nhau trong standup.'
    },
    date: '2026-03-15',
    cover: '/images/blog/kafka-vs-redis.jpg',
    tags: ['Kafka', 'Redis', 'Architecture', 'Messaging', 'Backend'],
    readMinutes: 8,
    body: [
      {
        type: 'paragraph',
        text: {
          en: 'Kafka and Redis both move messages between services, so they land on the same shortlist and someone always asks why we run both. The honest answer is that they were built for different jobs, and the times we pretended otherwise are the times we got burned. Kafka is a durable, replayable log. Redis is an in-memory data structure server that happens to be very good at queues. That difference is the whole post.',
          vi: 'Kafka và Redis đều chuyển message giữa các service, nên chúng hay nằm chung một shortlist và kiểu gì cũng có người hỏi tại sao chạy cả hai. Câu trả lời thật lòng là chúng sinh ra cho hai việc khác nhau, và những lần chúng tôi giả vờ ngược lại là những lần lãnh đủ. Kafka là một log bền vững, replay được. Redis là server cấu trúc dữ liệu in-memory mà tình cờ làm queue rất tốt. Khác biệt đó chính là toàn bộ bài viết này.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'The one-line version', vi: 'Bản một dòng' }
      },
      {
        type: 'html',
        html: '<table class="blog-table"><thead><tr><th>Dimension</th><th>Apache Kafka</th><th>Redis (Streams / Pub-Sub)</th></tr></thead><tbody><tr><td>Primary model</td><td>Durable, partitioned commit log</td><td>In-memory data structures + streams</td></tr><tr><td>Persistence</td><td>Disk, replicated, configurable retention</td><td>In-memory; optional RDB/AOF</td></tr><tr><td>Replay history</td><td>Yes - seek to any offset</td><td>Limited - capped by stream length / memory</td></tr><tr><td>Ordering</td><td>Per-partition guarantee</td><td>Per-stream insertion order</td></tr><tr><td>Latency</td><td>Low (ms), throughput-optimized</td><td>Very low (sub-ms)</td></tr><tr><td>Operational weight</td><td>Heavier (brokers, ZK/KRaft)</td><td>Light, often already deployed</td></tr></tbody></table>'
      },
      {
        type: 'paragraph',
        text: {
          en: 'If you only remember one thing: Kafka keeps history, Redis keeps speed. Everything below falls out of that.',
          vi: 'Nếu chỉ nhớ một điều: Kafka giữ lịch sử, Redis giữ tốc độ. Mọi thứ bên dưới đều suy ra từ đó.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Where Kafka earns its operational cost', vi: 'Khi nào Kafka đáng công vận hành' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'Kafka is heavier to run - brokers, partitions, a coordination layer, someone who understands consumer-group rebalancing at 3am. You pay that cost for one thing: the log is the source of truth and you can replay it. We use it for payment and disbursement events, the kind where "we lost a message" is a sentence you say to a regulator. A new consumer can read from offset zero and rebuild its entire state, and that has saved us at least [twice] when a downstream service corrupted its own database.',
          vi: 'Kafka nặng để vận hành - broker, partition, một tầng điều phối, và một người hiểu consumer-group rebalancing lúc 3 giờ sáng. Bạn trả cái giá đó cho đúng một thứ: log là nguồn sự thật và bạn replay được. Chúng tôi dùng nó cho sự kiện thanh toán và giải ngân, loại mà "làm mất một message" là câu bạn phải giải trình với cơ quan quản lý. Một consumer mới có thể đọc từ offset 0 và dựng lại toàn bộ state, và điều đó đã cứu chúng tôi ít nhất [hai lần] khi một service phía sau làm hỏng database của chính nó.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Where Redis is just the right answer', vi: 'Khi nào Redis đơn giản là đáp án đúng' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'For most async work you need none of that. A job queue, a rate limiter, a "send this email" task, a counter, cache invalidation - Redis is already in your stack, it is sub-millisecond, and Redis Streams with consumer groups gives you at-least-once delivery without standing up a single broker. The catch is retention: streams live in memory, so size them and trim them, or you will eventually meet the OOM killer.',
          vi: 'Với phần lớn việc bất đồng bộ bạn chẳng cần tới những thứ đó. Một job queue, một rate limiter, một task "gửi email này", một bộ đếm, invalidate cache - Redis đã có sẵn trong stack, độ trễ dưới một mili-giây, và Redis Streams với consumer group cho bạn at-least-once mà không cần dựng lấy một broker. Cái bẫy là retention: stream nằm trong RAM, nên hãy giới hạn và trim nó, không thì sớm muộn cũng gặp OOM killer.'
        }
      },
      {
        type: 'code',
        lang: 'javascript',
        code: "import { createClient } from 'redis'\nconst redis = createClient()\nawait redis.connect()\n\n// producer\nawait redis.xAdd('jobs', '*', { type: 'resize', assetId: '42' })\n\n// consumer group (create once, ignore BUSYGROUP error)\ntry { await redis.xGroupCreate('jobs', 'workers', '0', { MKSTREAM: true }) } catch {}\n\nconst res = await redis.xReadGroup('workers', 'worker-1',\n  [{ key: 'jobs', id: '>' }], { COUNT: 10, BLOCK: 5000 })\nfor (const { id } of res?.[0]?.messages ?? []) {\n  await redis.xAck('jobs', 'workers', id) // ack only after the work succeeds\n}"
      },
      {
        type: 'callout',
        text: {
          en: 'In practice we do not choose. Redis Streams handles the hot, user-facing work up front; the events we cannot lose get written to Kafka behind it. They are complements far more often than competitors - the mistake is forcing one to do the other\'s job.',
          vi: 'Thực tế thì chúng tôi không chọn. Redis Streams lo phần việc nóng, hướng người dùng ở phía trước; những sự kiện không được phép mất thì ghi vào Kafka phía sau. Chúng bổ trợ cho nhau nhiều hơn là cạnh tranh - sai lầm là ép một cái làm việc của cái kia.'
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
      en: 'I deleted lodash from a frontend last year and almost nothing broke. Most of it ships in the language now. These are the few I actually reach for - and one that bit me.',
      vi: 'Năm ngoái tôi xoá lodash khỏi một frontend và gần như chẳng có gì hỏng. Phần lớn giờ đã có sẵn trong ngôn ngữ. Đây là vài cái tôi thật sự hay dùng - và một cái từng khiến tôi lãnh đủ.'
    },
    date: '2026-02-02',
    cover: '/images/blog/js-tricks.jpg',
    tags: ['JavaScript', 'TypeScript', 'Frontend', 'Tips'],
    readMinutes: 6,
    body: [
      {
        type: 'paragraph',
        text: {
          en: 'Most "JavaScript tricks" posts are clever for the sake of being clever. I do not want clever in a codebase five people maintain. I want the boring built-in that lets me delete a dependency. These four did exactly that.',
          vi: 'Phần lớn các bài "trick JavaScript" tỏ ra thông minh chỉ để thông minh. Tôi không muốn sự thông minh trong một codebase năm người maintain. Tôi muốn cái built-in nhàm chán giúp tôi xoá một dependency. Bốn cái dưới đây làm đúng điều đó.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: '?. and ?? together', vi: '?. và ?? đi cùng nhau' }
      },
      {
        type: 'paragraph',
        text: {
          en: 'This pair replaced lodash.get everywhere for me. Optional chaining short-circuits on null or undefined; nullish coalescing only falls back on null or undefined - not on 0 or an empty string. That last part matters, because || has silently turned a valid 0 into a default in roughly every codebase I have worked in.',
          vi: 'Cặp này thay thế lodash.get ở mọi nơi với tôi. Optional chaining dừng sớm khi gặp null hoặc undefined; nullish coalescing chỉ fallback khi null hoặc undefined - không phải khi 0 hay chuỗi rỗng. Phần cuối đó quan trọng, vì || đã âm thầm biến một số 0 hợp lệ thành giá trị mặc định trong gần như mọi codebase tôi từng làm.'
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
        text: { en: 'Object.groupBy - and how it bit me', vi: 'Object.groupBy - và cú nó khiến tôi lãnh đủ' }
      },
      {
        type: 'code',
        lang: 'javascript',
        code: "const orders = [\n  { id: 1, status: 'paid' },\n  { id: 2, status: 'pending' },\n  { id: 3, status: 'paid' },\n]\nconst byStatus = Object.groupBy(orders, (o) => o.status)\n// { paid: [...], pending: [...] }"
      },
      {
        type: 'callout',
        text: {
          en: 'I shipped this to production and broke the app for every Safari user older than [16.4] for a day, until someone with an old iPhone noticed. It is genuinely new. Check your real browser targets - not caniuse\'s green-looking summary - before you reach for it, or keep a three-line reduce that works everywhere.',
          vi: 'Tôi ship cái này lên production và làm hỏng app cho mọi người dùng Safari cũ hơn [16.4] suốt một ngày, tới khi có người dùng iPhone cũ phát hiện. Nó thật sự mới. Hãy kiểm tra target trình duyệt thực tế của bạn - chứ không phải cái tóm tắt xanh lè của caniuse - trước khi dùng, hoặc giữ một reduce ba dòng chạy được ở mọi nơi.'
        }
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'Set for dedupe and intersection', vi: 'Set để khử trùng lặp và lấy giao' }
      },
      {
        type: 'code',
        lang: 'javascript',
        code: "const unique = [...new Set(list)]\n\nconst a = new Set([1, 2, 3])\nconst b = new Set([2, 3, 4])\nconst common = [...a].filter((x) => b.has(x)) // [2, 3]"
      },
      {
        type: 'heading',
        level: 2,
        text: { en: 'The small ones', vi: 'Mấy cái nhỏ' }
      },
      {
        type: 'list',
        items: [
          { en: 'structuredClone(obj) for a real deep copy - it keeps Dates, Maps and Sets, which the old JSON.parse(JSON.stringify(...)) trick silently destroys.', vi: 'structuredClone(obj) để deep copy thật - nó giữ Date, Map và Set, những thứ mà chiêu JSON.parse(JSON.stringify(...)) cũ âm thầm phá huỷ.' },
          { en: 'arr.at(-1) for the last element. Reads better than arr[arr.length - 1], and I make one fewer off-by-one mistake.', vi: 'arr.at(-1) để lấy phần tử cuối. Đọc dễ hơn arr[arr.length - 1], và tôi bớt sai off-by-one một lần.' },
          { en: 'Promise.allSettled when you want every result back, not a fail-fast on the first rejection - I use it for fan-out calls where one flaky service should not sink the others.', vi: 'Promise.allSettled khi bạn muốn nhận lại mọi kết quả, không fail-fast ở rejection đầu tiên - tôi dùng nó cho các lời gọi fan-out, nơi một service chập chờn không nên kéo chìm những cái còn lại.' },
          { en: 'The trailing = {} in function f({ page = 1, size = 20 } = {}) is the bit people forget - it is why calling f() with no args does not throw.', vi: 'Cái = {} ở cuối trong function f({ page = 1, size = 20 } = {}) là phần người ta hay quên - nó là lý do gọi f() không tham số không bị ném lỗi.' }
        ]
      },
      {
        type: 'paragraph',
        text: {
          en: 'None of this is impressive, and that is deliberate. The junior on my team can read all of it without a single comment, which is worth more than any clever one-liner I could have written instead.',
          vi: 'Chẳng có gì trong này gây ấn tượng cả, và đó là cố ý. Bạn junior trong team tôi đọc hết được mà không cần một dòng comment nào, và điều đó đáng giá hơn mọi câu one-liner thông minh tôi có thể viết thay vào đó.'
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
