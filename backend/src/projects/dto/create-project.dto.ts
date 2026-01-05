import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, Min, IsArray, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Slug của project (unique)', example: 'ahuse' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ description: 'Tiêu đề tiếng Việt', example: 'Ahuse' })
  @IsString()
  @IsNotEmpty()
  title_vi: string;

  @ApiProperty({ description: 'Tiêu đề tiếng Anh', example: 'Ahuse' })
  @IsString()
  @IsNotEmpty()
  title_en: string;

  @ApiProperty({ description: 'Mô tả ngắn tiếng Việt', example: 'Lorem ipsum dolor sit amet...' })
  @IsString()
  @IsNotEmpty()
  description_vi: string;

  @ApiProperty({ description: 'Mô tả ngắn tiếng Anh', example: 'Lorem ipsum dolor sit amet...' })
  @IsString()
  @IsNotEmpty()
  description_en: string;

  @ApiPropertyOptional({ description: 'Mô tả chi tiết HTML tiếng Việt', example: '<h1>Project Title</h1><p>Full description...</p>' })
  @IsString()
  @IsOptional()
  full_description_vi?: string;

  @ApiPropertyOptional({ description: 'Mô tả chi tiết HTML tiếng Anh', example: '<h1>Project Title</h1><p>Full description...</p>' })
  @IsString()
  @IsOptional()
  full_description_en?: string;

  @ApiPropertyOptional({ description: 'URL hình ảnh featured', example: 'https://example.com/image.png' })
  @IsString()
  @IsOptional()
  image_url?: string;

  @ApiPropertyOptional({ description: 'Danh sách technologies', example: ['React', 'TypeScript', 'Supabase'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  technologies?: string[];

  @ApiPropertyOptional({ description: 'Năm hoàn thành', example: 2024 })
  @IsInt()
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({ description: 'Category', example: 'Web Application' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: 'Có featured không', example: false, default: false })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiPropertyOptional({ description: 'Thứ tự hiển thị', example: 0, default: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  display_order?: number;

  @ApiPropertyOptional({ description: 'Status', enum: ['draft', 'published'], default: 'draft' })
  @IsString()
  @IsIn(['draft', 'published'])
  @IsOptional()
  status?: 'draft' | 'published';
}

