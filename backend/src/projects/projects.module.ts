import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectRepository } from '../repositories';
import { SupabaseConfig } from '../config/supabase.config';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectRepository, SupabaseConfig],
})
export class ProjectsModule {}

