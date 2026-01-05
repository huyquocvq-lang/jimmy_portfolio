import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseEnumPipe,
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
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto, UpdateTestimonialDto, TestimonialDto, TestimonialListResponseDto } from './dto';
import { Language } from '../blog/dto';

@ApiTags('testimonials')
@Controller('api/testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả testimonials' })
  @ApiQuery({
    name: 'lang',
    enum: Language,
    required: false,
    description: 'Ngôn ngữ',
    example: Language.VI,
  })
  @ApiResponse({
    status: 200,
    description: 'Danh sách testimonials',
    type: TestimonialListResponseDto,
  })
  async findAll(
    @Query('lang', new ParseEnumPipe(Language, { optional: true })) lang?: Language,
  ): Promise<TestimonialListResponseDto> {
    return this.testimonialsService.findAll(lang || Language.VI);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết testimonial theo ID' })
  @ApiParam({ name: 'id', description: 'ID của testimonial', example: 'uuid' })
  @ApiQuery({
    name: 'lang',
    enum: Language,
    required: false,
    description: 'Ngôn ngữ',
    example: Language.VI,
  })
  @ApiResponse({
    status: 200,
    description: 'Chi tiết testimonial',
    type: TestimonialDto,
  })
  @ApiResponse({ status: 404, description: 'Testimonial không tìm thấy' })
  async findOne(
    @Param('id') id: string,
    @Query('lang', new ParseEnumPipe(Language, { optional: true })) lang?: Language,
  ): Promise<TestimonialDto> {
    return this.testimonialsService.findOne(id, lang || Language.VI);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo testimonial mới' })
  @ApiBody({ type: CreateTestimonialDto })
  @ApiResponse({
    status: 201,
    description: 'Testimonial đã được tạo',
    type: TestimonialDto,
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTestimonialDto: CreateTestimonialDto): Promise<TestimonialDto> {
    return this.testimonialsService.create(createTestimonialDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật testimonial' })
  @ApiParam({ name: 'id', description: 'ID của testimonial', example: 'uuid' })
  @ApiBody({ type: UpdateTestimonialDto })
  @ApiResponse({
    status: 200,
    description: 'Testimonial đã được cập nhật',
    type: TestimonialDto,
  })
  @ApiResponse({ status: 404, description: 'Testimonial không tìm thấy' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  async update(
    @Param('id') id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ): Promise<TestimonialDto> {
    return this.testimonialsService.update(id, updateTestimonialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa testimonial' })
  @ApiParam({ name: 'id', description: 'ID của testimonial', example: 'uuid' })
  @ApiResponse({ status: 200, description: 'Testimonial đã được xóa' })
  @ApiResponse({ status: 404, description: 'Testimonial không tìm thấy' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.testimonialsService.remove(id);
    return { message: 'Testimonial đã được xóa thành công' };
  }
}

