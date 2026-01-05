import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TestimonialDto {
  @ApiProperty({ description: 'Testimonial ID', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Quote', example: 'Lorem ipsum dolor sit amet...' })
  quote: string;

  @ApiProperty({ description: 'Tên người đánh giá', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'Công ty', example: 'Starbucks' })
  company: string;

  @ApiPropertyOptional({ description: 'URL avatar', example: 'https://example.com/avatar.png' })
  avatar_url: string | null;

  @ApiProperty({ description: 'Đánh giá (1-5)', example: 5 })
  rating: number;

  @ApiProperty({ description: 'Thứ tự hiển thị', example: 0 })
  display_order: number;

  @ApiProperty({ description: 'Ngày tạo', example: '2025-01-27T00:00:00Z' })
  created_at: Date;

  @ApiProperty({ description: 'Ngày cập nhật', example: '2025-01-27T00:00:00Z' })
  updated_at: Date;
}

export class TestimonialListResponseDto {
  @ApiProperty({ description: 'Danh sách testimonials', type: [TestimonialDto] })
  data: TestimonialDto[];
}

