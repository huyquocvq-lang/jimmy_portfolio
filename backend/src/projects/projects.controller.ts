import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectDto,
  ProjectListResponseDto,
  ProjectDetailDto,
} from './dto';
import { Language } from '../blog/dto';

@ApiTags('projects')
@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả projects' })
  @ApiQuery({
    name: 'lang',
    enum: Language,
    required: false,
    description: 'Ngôn ngữ',
    example: Language.VI,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Số trang',
    example: 1,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Số lượng items mỗi trang',
    example: 10,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Danh sách projects',
    type: ProjectListResponseDto,
  })
  async findAll(
    @Query('lang') lang?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<ProjectListResponseDto> {
    const language = (lang === 'en' ? Language.EN : Language.VI) as Language;
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.projectsService.findAll(language, pageNum, limitNum);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Lấy chi tiết project theo slug' })
  @ApiParam({ name: 'slug', description: 'Slug của project', example: 'ahuse' })
  @ApiQuery({
    name: 'lang',
    enum: Language,
    required: false,
    description: 'Ngôn ngữ',
    example: Language.VI,
  })
  @ApiResponse({
    status: 200,
    description: 'Chi tiết project',
    type: ProjectDetailDto,
  })
  @ApiResponse({ status: 404, description: 'Project không tìm thấy' })
  async findBySlug(
    @Param('slug') slug: string,
    @Query('lang') lang?: string,
  ): Promise<ProjectDetailDto> {
    const language = (lang === 'en' ? Language.EN : Language.VI) as Language;
    return this.projectsService.findBySlug(slug, language);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết project theo ID' })
  @ApiParam({ name: 'id', description: 'ID của project', example: 'uuid' })
  @ApiQuery({
    name: 'lang',
    enum: Language,
    required: false,
    description: 'Ngôn ngữ',
    example: Language.VI,
  })
  @ApiResponse({
    status: 200,
    description: 'Chi tiết project',
    type: ProjectDto,
  })
  @ApiResponse({ status: 404, description: 'Project không tìm thấy' })
  async findOne(
    @Param('id') id: string,
    @Query('lang') lang?: string,
  ): Promise<ProjectDto> {
    const language = (lang === 'en' ? Language.EN : Language.VI) as Language;
    return this.projectsService.findOne(id, language);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo project mới' })
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({
    status: 201,
    description: 'Project đã được tạo',
    type: ProjectDto,
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ProjectDto> {
    return this.projectsService.create(createProjectDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật project' })
  @ApiParam({ name: 'id', description: 'ID của project', example: 'uuid' })
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({
    status: 200,
    description: 'Project đã được cập nhật',
    type: ProjectDto,
  })
  @ApiResponse({ status: 404, description: 'Project không tìm thấy' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDto> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa project' })
  @ApiParam({ name: 'id', description: 'ID của project', example: 'uuid' })
  @ApiResponse({ status: 200, description: 'Project đã được xóa' })
  @ApiResponse({ status: 404, description: 'Project không tìm thấy' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.projectsService.remove(id);
    return { message: 'Project đã được xóa thành công' };
  }
}
