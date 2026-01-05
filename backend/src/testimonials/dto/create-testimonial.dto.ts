import { IsString, IsNotEmpty, IsOptional, IsInt, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTestimonialDto {
  @ApiProperty({ description: 'Quote tiếng Việt', example: 'Lorem ipsum dolor sit amet...' })
  @IsString()
  @IsNotEmpty()
  quote_vi: string;

  @ApiProperty({ description: 'Quote tiếng Anh', example: 'Lorem ipsum dolor sit amet...' })
  @IsString()
  @IsNotEmpty()
  quote_en: string;

  @ApiProperty({ description: 'Tên người đánh giá', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Công ty', example: 'Starbucks' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiPropertyOptional({ description: 'URL avatar', example: 'https://example.com/avatar.png' })
  @IsString()
  @IsOptional()
  avatar_url?: string;

  @ApiPropertyOptional({ description: 'Đánh giá (1-5)', example: 5, default: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({ description: 'Thứ tự hiển thị', example: 0, default: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  display_order?: number;

  @ApiPropertyOptional({ description: 'Trạng thái', example: 'published', default: 'published' })
  @IsString()
  @IsOptional()
  status?: 'draft' | 'published';
}

