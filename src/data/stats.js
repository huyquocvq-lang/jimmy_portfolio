// Stats shown directly under the tagline in Hero
export const heroStats = [
  { num: { en: '5+ yrs', vi: '5+ năm' }, label: { en: 'Professional engineering', vi: 'Kinh nghiệm làm phần mềm' } },
  { num: '5-10', label: { en: 'Team members led', vi: 'Kỹ sư trong team đã dẫn dắt' } },
  { num: 'Production', label: { en: 'Systems across fintech, IoT & CMS', vi: 'Hệ thống fintech, IoT & CMS' } }
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
        big: '5-10 / team',
        desc: {
          en: 'Team size led across projects - planning, implementation coordination, code reviews, mentoring, and delivery tracking.',
          vi: 'Quy mô team tôi từng dẫn dắt, bao gồm lên kế hoạch, điều phối công việc, review code, hỗ trợ thành viên và theo dõi tiến độ.'
        }
      },
      {
        big: { en: '5+ years', vi: '5+ năm' },
        desc: {
          en: 'Professional software engineering across fintech, AIoT, enterprise CMS, web, and mobile delivery.',
          vi: 'Hơn 5 năm làm phần mềm qua các mảng fintech, AIoT, CMS doanh nghiệp, web và mobile.'
        }
      },
      {
        big: { en: '1-2M users', vi: '1-2 triệu users' },
        desc: {
          en: 'Real-user scale on flagship products - systems serving 1-2 million end users in production.',
          vi: 'Các hệ thống lớn tôi tham gia phát triển đang phục vụ khoảng 1-2 triệu người dùng thực tế.'
        }
      },
      {
        big: 'End-to-end',
        desc: {
          en: 'Hands-on ownership spanning backend services, workflow orchestration, realtime systems, mobile clients, and production infrastructure.',
          vi: 'Trực tiếp làm từ backend service, workflow và realtime system đến mobile client và hạ tầng production.'
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
          vi: 'Hệ thống vận hành 24/7 với yêu cầu cao về tính sẵn sàng, đặc biệt ở các bước liên quan đến giải ngân.'
        }
      },
      {
        big: 'Multi-product',
        desc: {
          en: 'Multiple lending products share one orchestration platform while keeping product-specific policies and partner flows isolated.',
          vi: 'Nhiều sản phẩm vay dùng chung một nền tảng điều phối, nhưng mỗi sản phẩm vẫn có chính sách và luồng tích hợp riêng.'
        }
      },
      {
        big: 'Camunda BPM',
        desc: {
          en: 'Workflow orchestration spans application, decisioning, partner hand-offs, and disbursement.',
          vi: 'Camunda điều phối toàn bộ luồng từ đăng ký, ra quyết định, chuyển sang đối tác đến giải ngân.'
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
          vi: 'YOLO + OpenCV chạy trực tiếp trên gateway để phát hiện cháy và té ngã/đột quỵ mà không phải gửi dữ liệu lên cloud rồi chờ phản hồi.'
        }
      },
      {
        big: 'Offline-first',
        desc: {
          en: 'Gateway firmware keeps automation, sessions, and data integrity intact through cloud outages - Zigbee mesh continues offline.',
          vi: 'Khi mất kết nối cloud, gateway vẫn duy trì automation cục bộ, phiên làm việc và dữ liệu; mạng Zigbee vẫn tiếp tục hoạt động.'
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
        big: '3 sites',
        desc: {
          en: 'Multi-site Magnolia setup with one authoring environment feeding three public delivery instances.',
          vi: 'Mô hình Magnolia multi-site với một môi trường authoring phục vụ ba public delivery instance.'
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
        big: 'Workflow',
        desc: {
          en: 'Editorial approval and role hand-offs built into the CMS authoring flow.',
          vi: 'Quy trình duyệt nội dung và chuyển việc giữa các vai trò được tích hợp ngay trong luồng biên tập.'
        }
      },
      {
        big: 'Personalized',
        desc: {
          en: 'Rule-driven experiences by location, time, age group, and audience segment.',
          vi: 'Nội dung được cá nhân hoá theo vị trí, thời gian, nhóm tuổi và từng nhóm người dùng.'
        }
      }
    ]
  }
]

// Backwards-compatible flat list (first tab) for any consumer that still reads
// `impactHighlights` directly - keeps the mobile-trim CSS selector working.
export const impactHighlights = impactTabs[0].highlights
