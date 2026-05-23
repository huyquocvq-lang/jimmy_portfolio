// Stats shown directly under the tagline in Hero
export const heroStats = [
  { num: { en: '4+ yrs', vi: '4+ năm' }, label: { en: 'Fullstack experience', vi: 'Kinh nghiệm fullstack' } },
  { num: '10-15', label: { en: 'Team members led', vi: 'Đã từng dẫn dắt' } },
  { num: '20+', label: { en: 'Production systems shipped', vi: 'Hệ thống đã release' } }
]

// Impact Highlights - grouped into tabs: Overall / LMS / IoT / CMS.
// Each tab renders a 3-column grid. Source data:
//   - Overall: career-wide totals (team scale, systems shipped, user reach, clients)
//   - LMS:     Lending Management System - fintech orchestration platform (CAKE / VEGA / TINVAY partners)
//   - IoT:     Yoohome AIoT platform + Zigbee gateway firmware
//   - CMS:     MMP CMS + Dotmar multi-site + Magnolia/headless work
export const impactTabs = [
  {
    id: 'overall',
    label: { en: 'Overall', vi: 'Tổng quan' },
    highlights: [
      {
        big: '10-15 / team',
        desc: {
          en: 'Team size led across projects - assigning tasks, tracking progress, running code reviews, and evaluating performance.',
          vi: 'Quy mô đội ngũ đã dẫn dắt qua các dự án - phân công, theo dõi tiến độ, code review và đánh giá hiệu suất.'
        }
      },
      {
        big: '20+',
        desc: {
          en: 'Production systems shipped across telco-fintech, community, smart-home, and enterprise CMS domains.',
          vi: 'Hệ thống production đã release qua các domain telco-fintech, community, smart-home và CMS doanh nghiệp.'
        }
      },
      {
        big: { en: '1-2M users', vi: '1-2 triệu users' },
        desc: {
          en: 'Real-user scale on flagship products - systems serving 1-2 million end users in production.',
          vi: 'Quy mô user thực tế trên các sản phẩm chủ lực - phục vụ 1-2 triệu người dùng cuối trong production.'
        }
      },
      {
        big: { en: '10+ clients', vi: '10+ khách hàng' },
        desc: {
          en: 'Worked with a wide mix of clients - enterprises, fintech partners, agencies, and individuals.',
          vi: 'Hợp tác với nhiều loại khách hàng - doanh nghiệp, đối tác fintech, agency và cá nhân.'
        }
      }
    ]
  },
  {
    id: 'lms',
    label: { en: 'LMS', vi: 'LMS' },
    highlights: [
      {
        big: { en: '5+ partners', vi: '5+ đối tác' },
        desc: {
          en: 'Trusted consumer-lending partners integrated into the orchestration platform - CAKE, VEGA, TINVAY, and more.',
          vi: 'Đối tác cho vay uy tín tích hợp vào nền tảng orchestration - CAKE, VEGA, TINVAY và các đối tác khác.'
        }
      },
      {
        big: { en: '+$10M / mo', vi: '+$10M / tháng' },
        desc: {
          en: 'Monthly disbursement processed by the lending orchestration platform, serving customers in the millions.',
          vi: 'Giải ngân hàng tháng do nền tảng lending orchestration xử lý, phục vụ hàng triệu khách hàng.'
        }
      },
      {
        big: '24/7',
        desc: {
          en: 'Production system runs 24/7 with high SLA - minimal downtime across the disbursement pipeline.',
          vi: 'Hệ thống production chạy ổn định 24/7 với SLA cao - downtime tối thiểu trên toàn pipeline giải ngân.'
        }
      },
      {
        big: { en: '+20% perf', vi: '+20% hiệu năng' },
        desc: {
          en: 'Pipeline performance lifted ~20% after optimization passes - throughput up, latency down.',
          vi: 'Hiệu năng pipeline tăng ~20% sau các vòng tối ưu - throughput cao hơn, độ trễ thấp hơn.'
        }
      },
      {
        big: { en: '99.9% success', vi: '99.9% thành công' },
        desc: {
          en: 'Transaction success rate sustained at 99.9% across the end-to-end disbursement and reconciliation flow.',
          vi: 'Tỷ lệ giao dịch thành công duy trì 99.9% xuyên suốt luồng giải ngân và đối soát end-to-end.'
        }
      }
    ]
  },
  {
    id: 'iot',
    label: { en: 'IoT', vi: 'IoT' },
    highlights: [
      {
        big: '500K+',
        desc: {
          en: 'Smart-home devices live on the Yoohome AIoT platform across multiple smart-building projects.',
          vi: 'Thiết bị smart-home đang chạy trên nền tảng AIoT Yoohome, qua nhiều dự án smart-building.'
        }
      },
      {
        big: '10K+',
        desc: {
          en: 'Custom Zigbee gateways shipped nationwide - Node.js + Zigbee2MQTT on Rockchip embedded hardware.',
          vi: 'Gateway Zigbee tuỳ chỉnh triển khai toàn quốc - Node.js + Zigbee2MQTT trên phần cứng nhúng Rockchip.'
        }
      },
      {
        big: '112K msg/s',
        desc: {
          en: 'Peak MQTT throughput sustained on the Yoohome message backbone during household activity bursts.',
          vi: 'MQTT throughput peak duy trì trên backbone message Yoohome trong các đợt sinh hoạt cao điểm.'
        }
      },
      {
        big: '5 vendors',
        desc: {
          en: 'IoT ecosystems integrated end-to-end - Tuya, Legrand, Schneider Electric, Panasonic, Rang Dong.',
          vi: 'Hệ sinh thái IoT tích hợp end-to-end - Tuya, Legrand, Schneider Electric, Panasonic, Rạng Đông.'
        }
      },
      {
        big: { en: 'Edge AI', vi: 'AI tại edge' },
        desc: {
          en: 'YOLO + OpenCV vision modules run directly on the gateway - fire and fall/stroke detection without a cloud roundtrip.',
          vi: 'Module thị giác YOLO + OpenCV chạy ngay trên gateway - phát hiện cháy và té ngã/đột quỵ không cần roundtrip cloud.'
        }
      },
      {
        big: 'Offline-first',
        desc: {
          en: 'Gateway firmware keeps automation, sessions, and data integrity intact through cloud outages - Zigbee mesh continues offline.',
          vi: 'Firmware gateway giữ nguyên automation, session và toàn vẹn dữ liệu khi mất kết nối cloud - Zigbee mesh vẫn chạy offline.'
        }
      }
    ]
  },
  {
    id: 'cms',
    label: { en: 'CMS', vi: 'CMS' },
    highlights: [
      {
        big: '10K+',
        desc: {
          en: 'Users supported on the multi-site CMS in production - editorial approval workflows and personalization rules.',
          vi: 'Người dùng được hỗ trợ trên CMS đa site chạy production - approval workflow biên tập và rule personalization.'
        }
      },
      {
        big: { en: '1M+ views/mo', vi: '1M+ lượt/tháng' },
        desc: {
          en: 'MMP CMS - custom Java Spring Boot stack serving 1M+ page views per month from large editorial datasets.',
          vi: 'MMP CMS - stack Java Spring Boot tuỳ chỉnh phục vụ 1M+ lượt xem/tháng trên dataset biên tập lớn.'
        }
      },
      {
        big: 'Headless',
        desc: {
          en: 'Magnolia + React headless stack - REST and GraphQL APIs powering cross-channel delivery.',
          vi: 'Stack headless Magnolia + React - REST và GraphQL API phục vụ delivery đa kênh.'
        }
      },
      {
        big: { en: '~50% faster', vi: '~50% nhanh hơn' },
        desc: {
          en: 'AI agent integrated into the CMS cuts sales-content drafting time roughly in half across production sites.',
          vi: 'AI agent tích hợp vào CMS giảm khoảng một nửa thời gian soạn nội dung sales trên các site production.'
        }
      },
      {
        big: { en: '20+ rules', vi: '20+ rule' },
        desc: {
          en: '20+ personalization rules running in production - location, time of day, age, and audience segment.',
          vi: '20+ rule personalization chạy production - vị trí, khung giờ, độ tuổi và segment khách hàng.'
        }
      }
    ]
  }
]

// Backwards-compatible flat list (first tab) for any consumer that still reads
// `impactHighlights` directly - keeps the mobile-trim CSS selector working.
export const impactHighlights = impactTabs[0].highlights
