import { Module } from '@nestjs/common';
import { TestimonialsController } from './testimonials.controller';
import { TestimonialsService } from './testimonials.service';
import { TestimonialRepository } from '../repositories';
import { SupabaseConfig } from '../config/supabase.config';

@Module({
  controllers: [TestimonialsController],
  providers: [TestimonialsService, TestimonialRepository, SupabaseConfig],
})
export class TestimonialsModule {}

