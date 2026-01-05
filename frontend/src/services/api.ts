import { cacheService } from './cache';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Cache TTLs (Time To Live) in milliseconds
const CACHE_TTL = {
  SKILLS: 10 * 60 * 1000, // 10 minutes
  PROJECTS: 10 * 60 * 1000, // 10 minutes
  BLOGS: 5 * 60 * 1000, // 5 minutes
  TAGS: 30 * 60 * 1000, // 30 minutes
  TESTIMONIALS: 30 * 60 * 1000, // 30 minutes
  DETAIL: 15 * 60 * 1000, // 15 minutes
};

export interface BlogPostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  tags: { id: string; name: string; slug: string }[];
  published_at: string | null;
  view_count: number;
  author: string;
}

export interface BlogPostDetail extends BlogPostListItem {
  content: string;
  reading_time: number;
  related_posts: {
    id: string;
    title: string;
    slug: string;
    featured_image: string | null;
  }[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BlogListResponse {
  data: BlogPostListItem[];
  pagination: Pagination;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  tag?: string;
  lang?: 'vi' | 'en';
  search?: string;
  sort?: 'newest' | 'oldest' | 'most_viewed';
}

export const blogApi = {
  async getBlogs(params: BlogQueryParams = {}): Promise<BlogListResponse> {
    const cacheKey = cacheService.generateKey('blog', params);
    const cached = cacheService.get<BlogListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.tag) queryParams.append('tag', params.tag);
    if (params.lang) queryParams.append('lang', params.lang);
    if (params.search) queryParams.append('search', params.search);
    if (params.sort) queryParams.append('sort', params.sort);

    const response = await fetch(`${API_BASE_URL}/blog?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const data = await response.json();
    cacheService.set(cacheKey, data, CACHE_TTL.BLOGS);
    return data;
  },

  async getBlogBySlug(slug: string, lang: 'vi' | 'en' = 'vi'): Promise<BlogPostDetail> {
    const cacheKey = cacheService.generateKey(`blog/${slug}`, { lang });
    const cached = cacheService.get<BlogPostDetail>(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await fetch(`${API_BASE_URL}/blog/${slug}?lang=${lang}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    const data = await response.json();
    cacheService.set(cacheKey, data, CACHE_TTL.DETAIL);
    return data;
  },

  async getTags(): Promise<Tag[]> {
    const cacheKey = cacheService.generateKey('blog/tags');
    const cached = cacheService.get<Tag[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await fetch(`${API_BASE_URL}/blog/tags`);
    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }
    const data = await response.json();
    cacheService.set(cacheKey, data, CACHE_TTL.TAGS);
    return data;
  },
};

export interface Skill {
  id: string;
  title: string;
  description: string;
  icon_url: string | null;
  highlighted: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface RelatedProject {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  link_url: string | null;
}

export interface SkillDetail extends Skill {
  related_projects: RelatedProject[];
}

export interface SkillListResponse {
  data: Skill[];
}

export const skillApi = {
  async getSkills(lang: 'vi' | 'en' = 'vi'): Promise<SkillListResponse> {
    const cacheKey = cacheService.generateKey('skills', { lang });
    const cached = cacheService.get<SkillListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await fetch(`${API_BASE_URL}/skills?lang=${lang}`);
    if (!response.ok) {
      throw new Error('Failed to fetch skills');
    }
    const data = await response.json();
    cacheService.set(cacheKey, data, CACHE_TTL.SKILLS);
    return data;
  },

  async getSkillBySlug(slug: string, lang: 'vi' | 'en' = 'vi'): Promise<SkillDetail> {
    const cacheKey = cacheService.generateKey(`skills/${slug}`, { lang });
    const cached = cacheService.get<SkillDetail>(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await fetch(`${API_BASE_URL}/skills/slug/${slug}?lang=${lang}`);
    if (!response.ok) {
      throw new Error('Failed to fetch skill');
    }
    const data = await response.json();
    cacheService.set(cacheKey, data, CACHE_TTL.DETAIL);
    return data;
  },
};

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  image_url: string | null;
  technologies: string[];
  year: number | null;
  category: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectDetail extends Project {
  full_description_vi: string | null;
  full_description_en: string | null;
}

export interface ProjectListResponse {
  data: Project[];
  pagination: Pagination;
}

export interface ProjectQueryParams {
  page?: number;
  limit?: number;
  lang?: 'vi' | 'en';
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  company: string;
  avatar_url: string | null;
  rating: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface TestimonialListResponse {
  data: Testimonial[];
}

export interface TestimonialQueryParams {
  lang?: 'vi' | 'en';
}

export const projectApi = {
  async getProjects(params: ProjectQueryParams = {}): Promise<ProjectListResponse> {
    const cacheKey = cacheService.generateKey('projects', params);
    const cached = cacheService.get<ProjectListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.lang) queryParams.append('lang', params.lang);
    else queryParams.append('lang', 'vi');

    const response = await fetch(`${API_BASE_URL}/projects?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    // Ensure pagination exists
    if (!data.pagination) {
      data.pagination = {
        page: params.page || 1,
        limit: params.limit || 10,
        total: data.data?.length || 0,
        totalPages: Math.ceil((data.data?.length || 0) / (params.limit || 10)),
      };
    }
    cacheService.set(cacheKey, data, CACHE_TTL.PROJECTS);
    return data;
  },

  async getProjectBySlug(slug: string, lang: 'vi' | 'en' = 'vi'): Promise<ProjectDetail> {
    const cacheKey = cacheService.generateKey(`projects/${slug}`, { lang });
    const cached = cacheService.get<ProjectDetail>(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await fetch(`${API_BASE_URL}/projects/slug/${slug}?lang=${lang}`);
    if (!response.ok) {
      throw new Error('Failed to fetch project');
    }
    const data = await response.json();
    cacheService.set(cacheKey, data, CACHE_TTL.DETAIL);
    return data;
  },
};

export const testimonialApi = {
  async getTestimonials(params: TestimonialQueryParams = {}): Promise<TestimonialListResponse> {
    const cacheKey = cacheService.generateKey('testimonials', params);
    const cached = cacheService.get<TestimonialListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    const queryParams = new URLSearchParams();
    if (params.lang) queryParams.append('lang', params.lang);
    else queryParams.append('lang', 'vi');

    const response = await fetch(`${API_BASE_URL}/testimonials?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }
    const data = await response.json();
    cacheService.set(cacheKey, data, CACHE_TTL.TESTIMONIALS);
    return data;
  },
};

