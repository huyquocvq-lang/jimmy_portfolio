/**
 * UI strings - everything not tied to a specific section's data file.
 *
 * Every value is a `{ en, vi }` pair; consume via `tr(value, lang)` from
 * `src/utils/i18n.js`. Proper nouns, tech terms, and links stay as plain
 * strings everywhere else.
 */
export const ui = {
  nav: {
    impact: { en: 'Impact', vi: 'Thành tựu' },
    experience: { en: 'Experience', vi: 'Kinh nghiệm' },
    about: { en: 'About', vi: 'Giới thiệu' },
    interests: { en: 'Interests', vi: 'Sở thích' },
    projects: { en: 'Projects', vi: 'Dự án' },
    blog: { en: 'Blog', vi: 'Blog' },
    linkedin: { en: 'LinkedIn', vi: 'LinkedIn' },
    resume: { en: 'Resume', vi: 'CV' },
    github: { en: 'GitHub', vi: 'GitHub' },
    openMenu: { en: 'Open menu', vi: 'Mở menu' },
    closeMenu: { en: 'Close menu', vi: 'Đóng menu' }
  },
  hero: {
    scrollDown: { en: 'Scroll to content', vi: 'Cuộn xuống' }
  },
  impact: {
    eyebrow: { en: 'Impact Highlights', vi: 'Thành tựu nổi bật' },
    heading: { en: 'Numbers that show the work.', vi: 'Những con số biết nói.' }
  },
  education: {
    eyebrow: { en: 'Education', vi: 'Học vấn' },
    heading: { en: 'Where I studied engineering.', vi: 'Nơi tôi học kỹ thuật.' },
    gpa: { en: 'GPA', vi: 'CPA' }
  },
  experience: {
    eyebrow: { en: 'Work Experience', vi: 'Kinh nghiệm làm việc' },
    heading: { en: "Where I've worked.", vi: 'Những nơi tôi từng làm.' }
  },
  projects: {
    eyebrow: { en: 'Selected Work', vi: 'Công việc tiêu biểu' },
    heading: { en: 'Projects', vi: 'Dự án' },
    count: { en: 'Projects', vi: 'Dự án' },
    featuredTag: { en: '01 / Featured', vi: '01 / Tiêu biểu' },
    moreWork: { en: 'More Work', vi: 'Dự án khác' },
    viewProject: { en: 'View Project', vi: 'Xem dự án' },
    viewProjectArrow: { en: 'View Project →', vi: 'Xem dự án →' },
    viewAll: { en: 'View all →', vi: 'Xem tất cả →' },
    toolsLabel: { en: 'Tools', vi: 'Công cụ' },
    impactLabel: { en: 'Impact', vi: 'Thành tựu' },
    listEyebrow: { en: 'All Projects', vi: 'Tất cả dự án' },
    listHeading: { en: 'Every project in one place.', vi: 'Toàn bộ dự án trong một trang.' },
    backHome: { en: '← Back to home', vi: '← Về trang chủ' }
  },
  blog: {
    eyebrow: { en: 'Writing', vi: 'Viết lách' },
    heading: { en: 'Notes from the keyboard.', vi: 'Ghi chép từ bàn phím.' },
    viewAll: { en: 'View all →', vi: 'Xem tất cả →' },
    readMin: { en: 'min read', vi: 'phút đọc' },
    readArticle: { en: 'Read article →', vi: 'Đọc bài →' },
    prevSlide: { en: 'Previous posts', vi: 'Bài trước' },
    nextSlide: { en: 'Next posts', vi: 'Bài sau' },
    prevPost: { en: 'Previous', vi: 'Trước' },
    nextPost: { en: 'Next', vi: 'Sau' },
    empty: { en: 'No posts yet.', vi: 'Chưa có bài viết.' },
    listEyebrow: { en: 'All Posts', vi: 'Tất cả bài viết' },
    listHeading: { en: 'Everything I have written.', vi: 'Tất cả những gì tôi đã viết.' },
    breadcrumbBlog: { en: 'Blog', vi: 'Blog' },
    backToList: { en: '← Back to blog', vi: '← Về danh sách blog' }
  },
  pagination: {
    prev: { en: 'Prev', vi: 'Trước' },
    next: { en: 'Next', vi: 'Sau' },
    page: { en: 'Page', vi: 'Trang' },
    of: { en: 'of', vi: '/' },
    aria: { en: 'Pagination', vi: 'Phân trang' }
  },
  shell: {
    breadcrumbHome: { en: 'Home', vi: 'Trang chủ' },
    breadcrumbProjects: { en: 'Projects', vi: 'Dự án' },
    breadcrumbAria: { en: 'Breadcrumb', vi: 'Đường dẫn' },
    pagerAria: { en: 'Project navigation', vi: 'Điều hướng dự án' },
    previous: { en: 'Previous', vi: 'Trước' },
    next: { en: 'Next', vi: 'Sau' },
    fallbackTitle: { en: 'Project', vi: 'Dự án' }
  },
  embed: {
    fullscreen: { en: 'Fullscreen ↗', vi: 'Toàn màn hình ↗' },
    exitFullscreen: { en: 'Exit fullscreen', vi: 'Thoát toàn màn hình' },
    loading: { en: 'Loading dashboard…', vi: 'Đang tải dashboard…' }
  },
  footer: {
    eyebrow: { en: "Let's Talk", vi: 'Liên hệ' },
    heading: {
      en: 'Have a fullstack problem worth solving?',
      vi: 'Có bài toán fullstack đáng để giải?'
    },
    connectCta: { en: 'Connect on LinkedIn', vi: 'Kết nối qua LinkedIn' },
    currently: { en: 'Currently', vi: 'Hiện tại' },
    contact: { en: 'Contact', vi: 'Liên hệ' },
    industries: { en: 'Industries', vi: 'Lĩnh vực' },
    portfolioLabel: { en: 'Portfolio', vi: 'Portfolio' }
  }
}
