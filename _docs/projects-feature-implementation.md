# Projects Feature - Implementation Documentation

**Date**: 2025-01-03  
**Version**: 1.0.0  
**Status**: Completed

## 📋 Tổng quan

Tính năng Projects cho phép hiển thị danh sách các dự án đã làm và chi tiết từng dự án. Tính năng bao gồm:
- Trang danh sách projects (`/projects`)
- Trang chi tiết project (`/projects/:slug`)
- Backend API để quản lý projects
- Hỗ trợ đa ngôn ngữ (Tiếng Việt và Tiếng Anh)
- Integration với Supabase database

## 🏗️ Kiến trúc

### Database Schema (Supabase)

**Bảng**: `projects`

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `slug` | VARCHAR(255) | Unique slug cho routing |
| `title_vi` | VARCHAR(255) | Tiêu đề tiếng Việt |
| `title_en` | VARCHAR(255) | Tiêu đề tiếng Anh |
| `description_vi` | TEXT | Mô tả ngắn tiếng Việt |
| `description_en` | TEXT | Mô tả ngắn tiếng Anh |
| `full_description_vi` | TEXT (nullable) | Mô tả chi tiết tiếng Việt (markdown) |
| `full_description_en` | TEXT (nullable) | Mô tả chi tiết tiếng Anh (markdown) |
| `image_url` | VARCHAR(500) (nullable) | URL hình ảnh featured |
| `technologies` | JSONB | Array of strings (technologies used) |
| `year` | INTEGER (nullable) | Năm hoàn thành |
| `category` | VARCHAR(100) (nullable) | Loại project (Web Application, Dashboard, etc.) |
| `featured` | BOOLEAN | Highlight project (default: false) |
| `display_order` | INTEGER | Thứ tự hiển thị (default: 0) |
| `status` | VARCHAR(20) | 'draft' hoặc 'published' (default: 'draft') |
| `created_at` | TIMESTAMP | Ngày tạo |
| `updated_at` | TIMESTAMP | Ngày cập nhật (auto-update) |

**Indexes**:
- `idx_projects_slug` - Index trên slug
- `idx_projects_status` - Index trên status
- `idx_projects_display_order` - Index trên display_order
- `idx_projects_featured` - Index trên featured

**RLS Policies**:
- `Public can read published projects` - Cho phép public đọc published projects

**Triggers**:
- `update_projects_updated_at` - Tự động update `updated_at` khi có thay đổi

### Backend (NestJS)

#### Entity

**Location**: `backend/src/entities/project.entity.ts`

```typescript
export class Project {
  id: string;
  slug: string;
  title_vi: string;
  title_en: string;
  description_vi: string;
  description_en: string;
  full_description_vi: string | null;
  full_description_en: string | null;
  image_url: string | null;
  technologies: string[];
  year: number | null;
  category: string | null;
  featured: boolean;
  display_order: number;
  status: 'draft' | 'published';
  created_at: Date;
  updated_at: Date;
}
```

#### Repository

**Location**: `backend/src/repositories/project.repository.ts`

**Methods**:
- `findAll()` - Lấy tất cả published projects, ordered by display_order
- `findOneById(id: string)` - Lấy project theo ID
- `findBySlug(slug: string)` - Lấy project theo slug
- `create(project: Partial<Project>)` - Tạo project mới
- `update(id: string, project: Partial<Project>)` - Cập nhật project
- `delete(id: string)` - Xóa project

#### DTOs

**Location**: `backend/src/projects/dto/`

1. **CreateProjectDto** (`create-project.dto.ts`)
   - Validation cho tất cả fields
   - Required: `slug`, `title_vi`, `title_en`, `description_vi`, `description_en`
   - Optional: `full_description_vi`, `full_description_en`, `image_url`, `technologies`, `year`, `category`, `featured`, `display_order`, `status`

2. **UpdateProjectDto** (`update-project.dto.ts`)
   - Extends `PartialType(CreateProjectDto)`
   - Tất cả fields đều optional

3. **ProjectResponseDto** (`project-response.dto.ts`)
   - `ProjectDto` - Response cho list và detail
   - `ProjectListResponseDto` - Response cho list endpoint
   - `ProjectDetailDto` - Response cho detail endpoint (bao gồm full_description)

#### Service

**Location**: `backend/src/projects/projects.service.ts`

**Methods**:
- `findAll(lang: Language)` - Lấy danh sách projects với language support
- `findOne(id: string, lang: Language)` - Lấy project theo ID
- `findBySlug(slug: string, lang: Language)` - Lấy project theo slug
- `create(createProjectDto: CreateProjectDto)` - Tạo project mới
- `update(id: string, updateProjectDto: UpdateProjectDto)` - Cập nhật project
- `remove(id: string)` - Xóa project

#### Controller

**Location**: `backend/src/projects/projects.controller.ts`

**Base Path**: `/api/projects`

#### API Endpoints

1. **GET `/api/projects`** - Lấy danh sách tất cả published projects
   - Query params:
     - `lang` ('vi' | 'en', optional, default: 'vi')
   - Response: `{ data: ProjectDto[] }`
   - Status: 200

2. **GET `/api/projects/slug/:slug`** - Lấy chi tiết project theo slug
   - Params:
     - `slug` (string) - Slug của project
   - Query params:
     - `lang` ('vi' | 'en', optional, default: 'vi')
   - Response: `ProjectDetailDto` (bao gồm full_description)
   - Status: 200, 404

3. **GET `/api/projects/:id`** - Lấy chi tiết project theo ID
   - Params:
     - `id` (UUID) - ID của project
   - Query params:
     - `lang` ('vi' | 'en', optional, default: 'vi')
   - Response: `ProjectDto`
   - Status: 200, 404

4. **POST `/api/projects`** - Tạo project mới
   - Body: `CreateProjectDto`
   - Response: `ProjectDto`
   - Status: 201, 400

5. **PUT `/api/projects/:id`** - Cập nhật project
   - Params:
     - `id` (UUID) - ID của project
   - Body: `UpdateProjectDto`
   - Response: `ProjectDto`
   - Status: 200, 404, 400

6. **DELETE `/api/projects/:id`** - Xóa project
   - Params:
     - `id` (UUID) - ID của project
   - Response: `{ message: string }`
   - Status: 200, 404

### Frontend (React + TypeScript)

#### Pages

1. **ProjectListPage** (`frontend/src/pages/ProjectListPage.tsx`)
   - Route: `/projects`
   - Hiển thị grid layout với tất cả projects
   - Mỗi project card link đến detail page
   - Button "Back to Home"

2. **ProjectDetailPage** (`frontend/src/pages/ProjectDetailPage.tsx`)
   - Route: `/projects/:slug`
   - Hiển thị chi tiết project:
     - Featured image
     - Title, description
     - Technologies tags
     - Full description (markdown-style)
     - Year, category
   - Button "Back to Projects"

#### Components

**ProjectCard** (`frontend/src/components/ProjectCard/ProjectCard.tsx`)
- Props:
  - `image?: string` - URL hình ảnh
  - `title: string` - Tiêu đề
  - `description: string` - Mô tả
  - `linkUrl?: string` - URL link (hỗ trợ cả external và internal routes)
  - `linkText?: string` - Text cho link (default: 'View In Dribbble')
  - `shadowVariant?: 'small' | 'medium' | 'large'` - Shadow variant
- Hỗ trợ cả `<a>` (external) và `<Link>` (internal routes)

#### Integration

**LandingPage Updates**:
- Button "Visit My Dribbble" → "Visit My Portfolio" link đến `/projects`
- Projects trên landing page link đến detail pages (`/projects/:slug`)

**App.tsx Routes**:
```typescript
<Route path="/projects" element={<ProjectListPage />} />
<Route path="/projects/:slug" element={<ProjectDetailPage />} />
```

## 🔧 Cách sử dụng

### Backend

#### Tạo project mới

```typescript
POST /api/projects
Content-Type: application/json

{
  "slug": "ahuse",
  "title_vi": "Ahuse",
  "title_en": "Ahuse",
  "description_vi": "Mô tả ngắn tiếng Việt...",
  "description_en": "Short description in English...",
  "full_description_vi": "# Ahuse\n\nFull description...",
  "full_description_en": "# Ahuse\n\nFull description...",
  "image_url": "https://example.com/image.png",
  "technologies": ["React", "TypeScript", "Supabase"],
  "year": 2024,
  "category": "Web Application",
  "featured": true,
  "display_order": 0,
  "status": "published"
}
```

#### Lấy danh sách projects

```typescript
GET /api/projects?lang=vi
```

#### Lấy chi tiết project

```typescript
GET /api/projects/slug/ahuse?lang=vi
```

### Frontend

#### Sử dụng ProjectCard

```typescript
import { ProjectCard } from '../components/ProjectCard';

<ProjectCard
  image="https://example.com/image.png"
  title="Ahuse"
  description="Project description..."
  linkUrl="/projects/ahuse"
  linkText="View Project"
  shadowVariant="medium"
/>
```

#### Navigation

```typescript
import { Link } from 'react-router-dom';

// Link to projects list
<Link to="/projects">View All Projects</Link>

// Link to project detail
<Link to="/projects/ahuse">View Project</Link>
```

## 📝 Notes

- Projects chỉ hiển thị khi `status = 'published'`
- Repository tự động filter published projects
- Technologies lưu dạng JSONB array trong database
- Full description hỗ trợ markdown format
- RLS policy chỉ cho phép public đọc published projects
- Backend cần SERVICE_ROLE_KEY để create/update/delete projects

## 🚀 Future Enhancements

- [ ] Pagination cho project list
- [ ] Filter by category
- [ ] Search projects
- [ ] Related projects section
- [ ] Project images gallery
- [ ] Project tags/categories system
- [ ] Integration với skills (related projects)

## 📚 Related Documentation

- [Repository Pattern Implementation](./repository-pattern-implementation.md)
- [Supabase Database Setup](./supabase-database-setup.md)
- [Supabase RLS Setup](./supabase-rls-setup.md)

