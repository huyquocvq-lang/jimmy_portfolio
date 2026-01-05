/**
 * Testimonial entity - matches Supabase testimonials table
 */
export class Testimonial {
  id: string;
  quote_vi: string;
  quote_en: string;
  name: string;
  company: string;
  avatar_url: string | null;
  rating: number;
  display_order: number;
  status: 'draft' | 'published';
  created_at: Date;
  updated_at: Date;
}

