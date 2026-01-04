/**
 * Project entity - matches Supabase projects table
 */
export class Project {
  id: string;
  slug: string;
  title_vi: string;
  title_en: string;
  description_vi: string;
  description_en: string;
  full_description_vi: string | null;
  full_description_en: string | null;
  image_url: string | null;
  technologies: string[];
  year: number | null;
  category: string | null;
  featured: boolean;
  display_order: number;
  status: 'draft' | 'published';
  created_at: Date;
  updated_at: Date;
}

