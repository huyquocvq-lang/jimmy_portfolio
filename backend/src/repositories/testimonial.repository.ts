import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseConfig } from '../config/supabase.config';
import { Testimonial } from '../entities';

interface TestimonialRow {
  id: string;
  quote_vi: string;
  quote_en: string;
  name: string;
  company: string;
  avatar_url: string | null;
  rating: number;
  display_order: number;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

@Injectable()
export class TestimonialRepository {
  private supabase: SupabaseClient;

  constructor(private supabaseConfig: SupabaseConfig) {
    this.supabase = supabaseConfig.getClient();
  }

  /**
   * Find all published testimonials, ordered by display_order
   */
  async findAll(): Promise<Testimonial[]> {
    const { data, error } = await this.supabase
      .from('testimonials')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch testimonials: ${error.message}`);
    }

    return (data || []).map((row: TestimonialRow) => this.mapTestimonialRow(row));
  }

  /**
   * Find a testimonial by ID
   */
  async findOneById(id: string): Promise<Testimonial | null> {
    const { data, error } = await this.supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch testimonial: ${error.message}`);
    }

    return this.mapTestimonialRow(data);
  }

  /**
   * Create a new testimonial
   */
  async create(testimonial: Partial<Testimonial>): Promise<Testimonial> {
    const { data, error } = await this.supabase
      .from('testimonials')
      .insert({
        quote_vi: testimonial.quote_vi,
        quote_en: testimonial.quote_en,
        name: testimonial.name,
        company: testimonial.company,
        avatar_url: testimonial.avatar_url || null,
        rating: testimonial.rating || 5,
        display_order: testimonial.display_order || 0,
        status: testimonial.status || 'published',
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create testimonial: ${error.message}`);
    }

    return this.mapTestimonialRow(data);
  }

  /**
   * Update a testimonial
   */
  async update(id: string, testimonial: Partial<Testimonial>): Promise<Testimonial> {
    const updateData: any = {};
    if (testimonial.quote_vi !== undefined) updateData.quote_vi = testimonial.quote_vi;
    if (testimonial.quote_en !== undefined) updateData.quote_en = testimonial.quote_en;
    if (testimonial.name !== undefined) updateData.name = testimonial.name;
    if (testimonial.company !== undefined) updateData.company = testimonial.company;
    if (testimonial.avatar_url !== undefined) updateData.avatar_url = testimonial.avatar_url;
    if (testimonial.rating !== undefined) updateData.rating = testimonial.rating;
    if (testimonial.display_order !== undefined) updateData.display_order = testimonial.display_order;
    if (testimonial.status !== undefined) updateData.status = testimonial.status;

    const { data, error } = await this.supabase
      .from('testimonials')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update testimonial: ${error.message}`);
    }

    return this.mapTestimonialRow(data);
  }

  /**
   * Delete a testimonial
   */
  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from('testimonials').delete().eq('id', id);

    if (error) {
      throw new Error(`Failed to delete testimonial: ${error.message}`);
    }
  }

  /**
   * Map database row to Testimonial entity
   */
  private mapTestimonialRow(row: TestimonialRow): Testimonial {
    return {
      id: row.id,
      quote_vi: row.quote_vi,
      quote_en: row.quote_en,
      name: row.name,
      company: row.company,
      avatar_url: row.avatar_url,
      rating: row.rating,
      display_order: row.display_order,
      status: row.status,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }
}

