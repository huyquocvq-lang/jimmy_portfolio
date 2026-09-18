export const personal = {
  eyebrow: { en: 'Personal Interest', vi: 'Sở thích cá nhân' },
  heading: {
    en: 'A bit more about me, outside the editor.',
    vi: 'Một chút về tôi, ngoài giờ làm code.'
  },
  paragraphs: [
    {
      en: 'Outside engineering, I run a small clothing shop and have worked as MC / company spokesperson for smart-home product launches. Those experiences sharpened the parts of the job that code alone does not teach: negotiation, presenting technical ideas clearly, handling live questions, and understanding how people actually respond to a product.',
      vi: 'Ngoài công việc kỹ thuật, tôi vận hành một cửa hàng quần áo nhỏ và từng làm MC / đại diện công ty tại các sự kiện ra mắt sản phẩm smart-home. Những trải nghiệm đó giúp tôi rèn các kỹ năng mà code không tự dạy được: thương lượng, trình bày ý kỹ thuật rõ ràng, xử lý câu hỏi trực tiếp và hiểu người dùng thực sự phản ứng với sản phẩm như thế nào.'
    }
  ],
  // Order tuned so the CSS column-balance puts personal_8 in the middle column
  // (one tall portrait + one landscape per column). Files are still named in
  // chronological order; only the rendering order in this array is curated.
  images: [
    { src: '/images/personal/personal_2.jpeg', alt: { en: 'Personal moment 2', vi: 'Khoảnh khắc 2' } },
    { src: '/images/personal/personal_5.jpeg', alt: { en: 'Personal moment 5', vi: 'Khoảnh khắc 5' } },
    { src: '/images/personal/personal_8.jpeg', alt: { en: 'Personal moment 8', vi: 'Khoảnh khắc 8' } }
  ]
}
