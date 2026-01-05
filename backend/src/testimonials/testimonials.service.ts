import { Injectable, NotFoundException } from '@nestjs/common';
import { TestimonialRepository } from '../repositories';
import { Testimonial } from '../entities';
import { CreateTestimonialDto, UpdateTestimonialDto, TestimonialDto, TestimonialListResponseDto } from './dto';
import { Language } from '../blog/dto';

@Injectable()
export class TestimonialsService {
  constructor(private readonly testimonialRepository: TestimonialRepository) {}

  async findAll(lang: Language = Language.VI): Promise<TestimonialListResponseDto> {
    const testimonials = await this.testimonialRepository.findAll();

    const data: TestimonialDto[] = testimonials.map((testimonial) => ({
      id: testimonial.id,
      quote: lang === Language.VI ? testimonial.quote_vi : testimonial.quote_en,
      name: testimonial.name,
      company: testimonial.company,
      avatar_url: testimonial.avatar_url,
      rating: testimonial.rating,
      display_order: testimonial.display_order,
      created_at: testimonial.created_at,
      updated_at: testimonial.updated_at,
    }));

    return { data };
  }

  async findOne(id: string, lang: Language = Language.VI): Promise<TestimonialDto> {
    const testimonial = await this.testimonialRepository.findOneById(id);

    if (!testimonial) {
      throw new NotFoundException(`Testimonial with id "${id}" not found`);
    }

    return {
      id: testimonial.id,
      quote: lang === Language.VI ? testimonial.quote_vi : testimonial.quote_en,
      name: testimonial.name,
      company: testimonial.company,
      avatar_url: testimonial.avatar_url,
      rating: testimonial.rating,
      display_order: testimonial.display_order,
      created_at: testimonial.created_at,
      updated_at: testimonial.updated_at,
    };
  }

  async create(createTestimonialDto: CreateTestimonialDto): Promise<TestimonialDto> {
    const testimonial: Partial<Testimonial> = {
      quote_vi: createTestimonialDto.quote_vi,
      quote_en: createTestimonialDto.quote_en,
      name: createTestimonialDto.name,
      company: createTestimonialDto.company,
      avatar_url: createTestimonialDto.avatar_url,
      rating: createTestimonialDto.rating || 5,
      display_order: createTestimonialDto.display_order || 0,
      status: createTestimonialDto.status || 'published',
    };

    const created = await this.testimonialRepository.create(testimonial);

    return {
      id: created.id,
      quote: created.quote_vi,
      name: created.name,
      company: created.company,
      avatar_url: created.avatar_url,
      rating: created.rating,
      display_order: created.display_order,
      created_at: created.created_at,
      updated_at: created.updated_at,
    };
  }

  async update(id: string, updateTestimonialDto: UpdateTestimonialDto): Promise<TestimonialDto> {
    const existing = await this.testimonialRepository.findOneById(id);
    if (!existing) {
      throw new NotFoundException(`Testimonial with id "${id}" not found`);
    }

    const updateData: Partial<Testimonial> = {};
    if (updateTestimonialDto.quote_vi !== undefined) updateData.quote_vi = updateTestimonialDto.quote_vi;
    if (updateTestimonialDto.quote_en !== undefined) updateData.quote_en = updateTestimonialDto.quote_en;
    if (updateTestimonialDto.name !== undefined) updateData.name = updateTestimonialDto.name;
    if (updateTestimonialDto.company !== undefined) updateData.company = updateTestimonialDto.company;
    if (updateTestimonialDto.avatar_url !== undefined) updateData.avatar_url = updateTestimonialDto.avatar_url;
    if (updateTestimonialDto.rating !== undefined) updateData.rating = updateTestimonialDto.rating;
    if (updateTestimonialDto.display_order !== undefined) updateData.display_order = updateTestimonialDto.display_order;
    if (updateTestimonialDto.status !== undefined) updateData.status = updateTestimonialDto.status;

    const updated = await this.testimonialRepository.update(id, updateData);

    return {
      id: updated.id,
      quote: updated.quote_vi,
      name: updated.name,
      company: updated.company,
      avatar_url: updated.avatar_url,
      rating: updated.rating,
      display_order: updated.display_order,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
    };
  }

  async remove(id: string): Promise<void> {
    const existing = await this.testimonialRepository.findOneById(id);
    if (!existing) {
      throw new NotFoundException(`Testimonial with id "${id}" not found`);
    }

    await this.testimonialRepository.delete(id);
  }
}

