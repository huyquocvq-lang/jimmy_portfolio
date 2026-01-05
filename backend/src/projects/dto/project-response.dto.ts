import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ description: 'Trang hiện tại', example: 1 })
  page: number;

  @ApiProperty({ description: 'Số lượng items mỗi trang', example: 10 })
  limit: number;

  @ApiProperty({ description: 'Tổng số items', example: 100 })
  total: number;

  @ApiProperty({ description: 'Tổng số trang', example: 10 })
  totalPages: number;
}

export class ProjectDto {
  @ApiProperty({ description: 'Project ID', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Slug', example: 'ahuse' })
  slug: string;

  @ApiProperty({ description: 'Tiêu đề', example: 'Ahuse' })
  title: string;

  @ApiProperty({ description: 'Mô tả ngắn', example: 'Lorem ipsum dolor sit amet...' })
  description: string;

  @ApiPropertyOptional({ description: 'URL hình ảnh featured', example: 'https://example.com/image.png' })
  image_url: string | null;

  @ApiPropertyOptional({ description: 'Danh sách technologies', example: ['React', 'TypeScript'], type: [String] })
  technologies: string[];

  @ApiPropertyOptional({ description: 'Năm hoàn thành', example: 2024 })
  year: number | null;

  @ApiPropertyOptional({ description: 'Category', example: 'Web Application' })
  category: string | null;

  @ApiProperty({ description: 'Có featured không', example: false })
  featured: boolean;

  @ApiProperty({ description: 'Thứ tự hiển thị', example: 0 })
  display_order: number;

  @ApiProperty({ description: 'Ngày tạo', example: '2025-01-27T00:00:00Z' })
  created_at: Date;

  @ApiProperty({ description: 'Ngày cập nhật', example: '2025-01-27T00:00:00Z' })
  updated_at: Date;
}

export class ProjectListResponseDto {
  @ApiProperty({ description: 'Danh sách projects', type: [ProjectDto] })
  data: ProjectDto[];

  @ApiProperty({ description: 'Thông tin phân trang', type: PaginationDto })
  pagination: PaginationDto;
}

export class ProjectDetailDto extends ProjectDto {
  @ApiPropertyOptional({ description: 'Mô tả chi tiết HTML tiếng Việt', example: '<h1>Project Title</h1><p>Full description...</p>' })
  full_description_vi: string | null;

  @ApiPropertyOptional({ description: 'Mô tả chi tiết HTML tiếng Anh', example: '<h1>Project Title</h1><p>Full description...</p>' })
  full_description_en: string | null;
}

