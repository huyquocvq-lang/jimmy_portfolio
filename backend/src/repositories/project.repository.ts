import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseConfig } from '../config/supabase.config';
import { Project } from '../entities';

interface ProjectRow {
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
  created_at: string;
  updated_at: string;
}

@Injectable()
export class ProjectRepository {
  private supabase: SupabaseClient;

  constructor(private supabaseConfig: SupabaseConfig) {
    this.supabase = supabaseConfig.getClient();
  }

  /**
   * Find all published projects, ordered by display_order
   */
  async findAll(page?: number, limit?: number): Promise<{ data: Project[]; total: number }> {
    const pageNum = page || 1;
    const limitNum = limit || 10;
    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;

    // Get total count
    const { count, error: countError } = await this.supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    if (countError) {
      throw new Error(`Failed to count projects: ${countError.message}`);
    }

    // Get paginated data
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      throw new Error(`Failed to fetch projects: ${error.message}`);
    }

    return {
      data: (data || []).map((row: ProjectRow) => this.mapProjectRow(row)),
      total: count || 0,
    };
  }

  /**
   * Find a project by ID
   */
  async findOneById(id: string): Promise<Project | null> {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .eq('status', 'published')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch project: ${error.message}`);
    }

    return this.mapProjectRow(data);
  }

  /**
   * Find a project by slug
   */
  async findBySlug(slug: string): Promise<Project | null> {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch project: ${error.message}`);
    }

    return this.mapProjectRow(data);
  }

  /**
   * Create a new project
   */
  async create(project: Partial<Project>): Promise<Project> {
    const { data, error } = await this.supabase
      .from('projects')
      .insert({
        slug: project.slug,
        title_vi: project.title_vi,
        title_en: project.title_en,
        description_vi: project.description_vi,
        description_en: project.description_en,
        full_description_vi: project.full_description_vi || null,
        full_description_en: project.full_description_en || null,
        image_url: project.image_url || null,
        technologies: project.technologies || [],
        year: project.year || null,
        category: project.category || null,
        featured: project.featured || false,
        display_order: project.display_order || 0,
        status: project.status || 'draft',
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create project: ${error.message}`);
    }

    return this.mapProjectRow(data);
  }

  /**
   * Update a project
   */
  async update(id: string, project: Partial<Project>): Promise<Project> {
    const updateData: any = {};
    if (project.slug !== undefined) updateData.slug = project.slug;
    if (project.title_vi !== undefined) updateData.title_vi = project.title_vi;
    if (project.title_en !== undefined) updateData.title_en = project.title_en;
    if (project.description_vi !== undefined) updateData.description_vi = project.description_vi;
    if (project.description_en !== undefined) updateData.description_en = project.description_en;
    if (project.full_description_vi !== undefined) updateData.full_description_vi = project.full_description_vi;
    if (project.full_description_en !== undefined) updateData.full_description_en = project.full_description_en;
    if (project.image_url !== undefined) updateData.image_url = project.image_url;
    if (project.technologies !== undefined) updateData.technologies = project.technologies;
    if (project.year !== undefined) updateData.year = project.year;
    if (project.category !== undefined) updateData.category = project.category;
    if (project.featured !== undefined) updateData.featured = project.featured;
    if (project.display_order !== undefined) updateData.display_order = project.display_order;
    if (project.status !== undefined) updateData.status = project.status;

    const { data, error } = await this.supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundException(`Project with id "${id}" not found`);
      }
      throw new Error(`Failed to update project: ${error.message}`);
    }

    return this.mapProjectRow(data);
  }

  /**
   * Delete a project
   */
  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from('projects').delete().eq('id', id);

    if (error) {
      throw new Error(`Failed to delete project: ${error.message}`);
    }
  }

  /**
   * Map database row to Project entity
   */
  private mapProjectRow(row: ProjectRow): Project {
    return {
      id: row.id,
      slug: row.slug,
      title_vi: row.title_vi,
      title_en: row.title_en,
      description_vi: row.description_vi,
      description_en: row.description_en,
      full_description_vi: row.full_description_vi,
      full_description_en: row.full_description_en,
      image_url: row.image_url,
      technologies: Array.isArray(row.technologies) ? row.technologies : [],
      year: row.year,
      category: row.category,
      featured: row.featured,
      display_order: row.display_order,
      status: row.status,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }
}

