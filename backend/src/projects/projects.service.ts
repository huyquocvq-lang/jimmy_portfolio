import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../repositories';
import { Project } from '../entities';
import { CreateProjectDto, UpdateProjectDto, ProjectDto, ProjectListResponseDto, ProjectDetailDto, PaginationDto } from './dto';
import { Language } from '../blog/dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async findAll(lang: Language = Language.VI, page: number = 1, limit: number = 10): Promise<ProjectListResponseDto> {
    const { data: projects, total } = await this.projectRepository.findAll(page, limit);

    const data: ProjectDto[] = projects.map((project) => ({
      id: project.id,
      slug: project.slug,
      title: lang === Language.VI ? project.title_vi : project.title_en,
      description: lang === Language.VI ? project.description_vi : project.description_en,
      image_url: project.image_url,
      technologies: project.technologies,
      year: project.year,
      category: project.category,
      featured: project.featured,
      display_order: project.display_order,
      created_at: project.created_at,
      updated_at: project.updated_at,
    }));

    const pagination: PaginationDto = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };

    return { data, pagination };
  }

  async findOne(id: string, lang: Language = Language.VI): Promise<ProjectDto> {
    const project = await this.projectRepository.findOneById(id);

    if (!project) {
      throw new NotFoundException(`Project with id "${id}" not found`);
    }

    return {
      id: project.id,
      slug: project.slug,
      title: lang === Language.VI ? project.title_vi : project.title_en,
      description: lang === Language.VI ? project.description_vi : project.description_en,
      image_url: project.image_url,
      technologies: project.technologies,
      year: project.year,
      category: project.category,
      featured: project.featured,
      display_order: project.display_order,
      created_at: project.created_at,
      updated_at: project.updated_at,
    };
  }

  async findBySlug(slug: string, lang: Language = Language.VI): Promise<ProjectDetailDto> {
    const project = await this.projectRepository.findBySlug(slug);

    if (!project) {
      throw new NotFoundException(`Project with slug "${slug}" not found`);
    }

    return {
      id: project.id,
      slug: project.slug,
      title: lang === Language.VI ? project.title_vi : project.title_en,
      description: lang === Language.VI ? project.description_vi : project.description_en,
      full_description_vi: project.full_description_vi,
      full_description_en: project.full_description_en,
      image_url: project.image_url,
      technologies: project.technologies,
      year: project.year,
      category: project.category,
      featured: project.featured,
      display_order: project.display_order,
      created_at: project.created_at,
      updated_at: project.updated_at,
    };
  }

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    const project: Partial<Project> = {
      slug: createProjectDto.slug,
      title_vi: createProjectDto.title_vi,
      title_en: createProjectDto.title_en,
      description_vi: createProjectDto.description_vi,
      description_en: createProjectDto.description_en,
      full_description_vi: createProjectDto.full_description_vi || null,
      full_description_en: createProjectDto.full_description_en || null,
      image_url: createProjectDto.image_url || null,
      technologies: createProjectDto.technologies || [],
      year: createProjectDto.year || null,
      category: createProjectDto.category || null,
      featured: createProjectDto.featured || false,
      display_order: createProjectDto.display_order || 0,
      status: createProjectDto.status || 'draft',
    };

    const created = await this.projectRepository.create(project);

    return {
      id: created.id,
      slug: created.slug,
      title: created.title_vi,
      description: created.description_vi,
      image_url: created.image_url,
      technologies: created.technologies,
      year: created.year,
      category: created.category,
      featured: created.featured,
      display_order: created.display_order,
      created_at: created.created_at,
      updated_at: created.updated_at,
    };
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectDto> {
    const existing = await this.projectRepository.findOneById(id);
    if (!existing) {
      throw new NotFoundException(`Project with id "${id}" not found`);
    }

    const updateData: Partial<Project> = {};
    if (updateProjectDto.slug !== undefined) updateData.slug = updateProjectDto.slug;
    if (updateProjectDto.title_vi !== undefined) updateData.title_vi = updateProjectDto.title_vi;
    if (updateProjectDto.title_en !== undefined) updateData.title_en = updateProjectDto.title_en;
    if (updateProjectDto.description_vi !== undefined) updateData.description_vi = updateProjectDto.description_vi;
    if (updateProjectDto.description_en !== undefined) updateData.description_en = updateProjectDto.description_en;
    if (updateProjectDto.full_description_vi !== undefined) updateData.full_description_vi = updateProjectDto.full_description_vi;
    if (updateProjectDto.full_description_en !== undefined) updateData.full_description_en = updateProjectDto.full_description_en;
    if (updateProjectDto.image_url !== undefined) updateData.image_url = updateProjectDto.image_url;
    if (updateProjectDto.technologies !== undefined) updateData.technologies = updateProjectDto.technologies;
    if (updateProjectDto.year !== undefined) updateData.year = updateProjectDto.year;
    if (updateProjectDto.category !== undefined) updateData.category = updateProjectDto.category;
    if (updateProjectDto.featured !== undefined) updateData.featured = updateProjectDto.featured;
    if (updateProjectDto.display_order !== undefined) updateData.display_order = updateProjectDto.display_order;
    if (updateProjectDto.status !== undefined) updateData.status = updateProjectDto.status;

    const updated = await this.projectRepository.update(id, updateData);

    return {
      id: updated.id,
      slug: updated.slug,
      title: updated.title_vi,
      description: updated.description_vi,
      image_url: updated.image_url,
      technologies: updated.technologies,
      year: updated.year,
      category: updated.category,
      featured: updated.featured,
      display_order: updated.display_order,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
    };
  }

  async remove(id: string): Promise<void> {
    const existing = await this.projectRepository.findOneById(id);
    if (!existing) {
      throw new NotFoundException(`Project with id "${id}" not found`);
    }

    await this.projectRepository.delete(id);
  }
}

