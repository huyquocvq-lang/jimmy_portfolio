# Projects API - Implementation Documentation

**Date**: 2025-01-03  
**Version**: 1.0.0

## 📋 Tổng quan

API endpoints cho quản lý projects với đầy đủ CRUD operations và hỗ trợ đa ngôn ngữ.

## 🔗 Base URL

```
/api/projects
```

## 📡 API Endpoints

### 1. Lấy danh sách projects

**GET** `/api/projects`

Lấy danh sách tất cả published projects, được sắp xếp theo `display_order` và `created_at`.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `lang` | 'vi' \| 'en' | No | 'vi' | Ngôn ngữ hiển thị |

#### Response

**Status**: `200 OK`

```json
{
  "data": [
    {
      "id": "uuid",
      "slug": "ahuse",
      "title": "Ahuse",
      "description": "Project description...",
      "image_url": "https://example.com/image.png",
      "technologies": ["React", "TypeScript"],
      "year": 2024,
      "category": "Web Application",
      "featured": true,
      "display_order": 0,
      "created_at": "2025-01-03T00:00:00Z",
      "updated_at": "2025-01-03T00:00:00Z"
    }
  ]
}
```

#### Example

```bash
curl -X GET "http://localhost:3000/api/projects?lang=vi"
```

---

### 2. Lấy chi tiết project theo slug

**GET** `/api/projects/slug/:slug`

Lấy chi tiết project bao gồm full description.

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `slug` | string | Yes | Slug của project |

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `lang` | 'vi' \| 'en' | No | 'vi' | Ngôn ngữ hiển thị |

#### Response

**Status**: `200 OK`

```json
{
  "id": "uuid",
  "slug": "ahuse",
  "title": "Ahuse",
  "description": "Short description...",
  "full_description_vi": "# Ahuse\n\nFull description in Vietnamese...",
  "full_description_en": "# Ahuse\n\nFull description in English...",
  "image_url": "https://example.com/image.png",
  "technologies": ["React", "TypeScript", "Supabase"],
  "year": 2024,
  "category": "Web Application",
  "featured": true,
  "display_order": 0,
  "created_at": "2025-01-03T00:00:00Z",
  "updated_at": "2025-01-03T00:00:00Z"
}
```

**Status**: `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Project with slug \"ahuse\" not found",
  "error": "Not Found"
}
```

#### Example

```bash
curl -X GET "http://localhost:3000/api/projects/slug/ahuse?lang=vi"
```

---

### 3. Lấy chi tiết project theo ID

**GET** `/api/projects/:id`

Lấy chi tiết project theo ID (không bao gồm full description).

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | Yes | ID của project |

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `lang` | 'vi' \| 'en' | No | 'vi' | Ngôn ngữ hiển thị |

#### Response

**Status**: `200 OK`

```json
{
  "id": "uuid",
  "slug": "ahuse",
  "title": "Ahuse",
  "description": "Short description...",
  "image_url": "https://example.com/image.png",
  "technologies": ["React", "TypeScript"],
  "year": 2024,
  "category": "Web Application",
  "featured": true,
  "display_order": 0,
  "created_at": "2025-01-03T00:00:00Z",
  "updated_at": "2025-01-03T00:00:00Z"
}
```

#### Example

```bash
curl -X GET "http://localhost:3000/api/projects/uuid-here?lang=vi"
```

---

### 4. Tạo project mới

**POST** `/api/projects`

Tạo project mới. Yêu cầu SERVICE_ROLE_KEY để thực hiện.

#### Request Body

```json
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

#### Required Fields

- `slug` (string, unique)
- `title_vi` (string)
- `title_en` (string)
- `description_vi` (string)
- `description_en` (string)

#### Optional Fields

- `full_description_vi` (string)
- `full_description_en` (string)
- `image_url` (string)
- `technologies` (string[])
- `year` (number)
- `category` (string)
- `featured` (boolean, default: false)
- `display_order` (number, default: 0)
- `status` ('draft' | 'published', default: 'draft')

#### Response

**Status**: `201 Created`

```json
{
  "id": "uuid",
  "slug": "ahuse",
  "title": "Ahuse",
  "description": "Short description...",
  "image_url": "https://example.com/image.png",
  "technologies": ["React", "TypeScript"],
  "year": 2024,
  "category": "Web Application",
  "featured": true,
  "display_order": 0,
  "created_at": "2025-01-03T00:00:00Z",
  "updated_at": "2025-01-03T00:00:00Z"
}
```

**Status**: `400 Bad Request`

```json
{
  "statusCode": 400,
  "message": ["slug must be a string", "title_vi should not be empty"],
  "error": "Bad Request"
}
```

#### Example

```bash
curl -X POST "http://localhost:3000/api/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "ahuse",
    "title_vi": "Ahuse",
    "title_en": "Ahuse",
    "description_vi": "Mô tả...",
    "description_en": "Description...",
    "status": "published"
  }'
```

---

### 5. Cập nhật project

**PUT** `/api/projects/:id`

Cập nhật project. Yêu cầu SERVICE_ROLE_KEY để thực hiện.

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | Yes | ID của project |

#### Request Body

Tất cả fields đều optional (PartialType của CreateProjectDto).

```json
{
  "title_vi": "Updated Title",
  "status": "published"
}
```

#### Response

**Status**: `200 OK`

```json
{
  "id": "uuid",
  "slug": "ahuse",
  "title": "Updated Title",
  "description": "Short description...",
  "image_url": "https://example.com/image.png",
  "technologies": ["React", "TypeScript"],
  "year": 2024,
  "category": "Web Application",
  "featured": true,
  "display_order": 0,
  "created_at": "2025-01-03T00:00:00Z",
  "updated_at": "2025-01-03T00:00:00Z"
}
```

**Status**: `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Project with id \"uuid\" not found",
  "error": "Not Found"
}
```

#### Example

```bash
curl -X PUT "http://localhost:3000/api/projects/uuid-here" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "published"
  }'
```

---

### 6. Xóa project

**DELETE** `/api/projects/:id`

Xóa project. Yêu cầu SERVICE_ROLE_KEY để thực hiện.

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | Yes | ID của project |

#### Response

**Status**: `200 OK`

```json
{
  "message": "Project đã được xóa thành công"
}
```

**Status**: `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Project with id \"uuid\" not found",
  "error": "Not Found"
}
```

#### Example

```bash
curl -X DELETE "http://localhost:3000/api/projects/uuid-here"
```

## 🔐 Authentication

- **Read operations** (GET): Không cần authentication, sử dụng ANON_KEY
- **Write operations** (POST, PUT, DELETE): Yêu cầu SERVICE_ROLE_KEY

## 📝 Notes

- Tất cả GET endpoints chỉ trả về projects có `status = 'published'`
- `slug` phải unique trong database
- `technologies` là array of strings, lưu dạng JSONB
- `full_description` hỗ trợ markdown format
- `updated_at` tự động được update khi có thay đổi (trigger)

## 🧪 Testing với Swagger

Truy cập Swagger UI tại: `http://localhost:3000/api` để test các endpoints với interactive documentation.

