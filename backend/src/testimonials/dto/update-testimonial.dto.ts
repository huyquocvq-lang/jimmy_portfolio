import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTestimonialDto {
  @ApiPropertyOptional({ description: 'Quote tiếng Việt', example: 'Lorem ipsum dolor sit amet...' })
  @IsString()
  @IsOptional()
  quote_vi?: string;

  @ApiPropertyOptional({ description: 'Quote tiếng Anh', example: 'Lorem ipsum dolor sit amet...' })
  @IsString()
  @IsOptional()
  quote_en?: string;

  @ApiPropertyOptional({ description: 'Tên người đánh giá', example: 'John Doe' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Công ty', example: 'Starbucks' })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiPropertyOptional({ description: 'URL avatar', example: 'https://example.com/avatar.png' })
  @IsString()
  @IsOptional()
  avatar_url?: string;

  @ApiPropertyOptional({ description: 'Đánh giá (1-5)', example: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({ description: 'Thứ tự hiển thị', example: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  display_order?: number;

  @ApiPropertyOptional({ description: 'Trạng thái', example: 'published' })
  @IsString()
  @IsOptional()
  status?: 'draft' | 'published';
}

