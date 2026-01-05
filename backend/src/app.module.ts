import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { SkillsModule } from './skills/skills.module';
import { ProjectsModule } from './projects/projects.module';
import { TestimonialsModule } from './testimonials/testimonials.module';

@Module({
  imports: [BlogModule, SkillsModule, ProjectsModule, TestimonialsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
