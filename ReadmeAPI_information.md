# API Documentation - Murbay Konveksi Web Application

## Overview
This document provides comprehensive API documentation for the Murbay Konveksi web application. The API is built using Next.js API Routes and provides RESTful endpoints for managing content, authentication, and settings.

## Base URL
```
http://localhost:8000/api
```

## Authentication
Most admin endpoints require authentication. Use the login endpoint to obtain a session token.

### Login Credentials (Demo)
- **Username:** `admin`
- **Password:** `admin123`

---

## API Endpoints

### 1. Authentication

#### POST /api/auth/login
Authenticate admin user and create session.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login berhasil",
  "user": {
    "id": 3,
    "username": "admin",
    "role": "admin"
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Username atau password salah"
}
```

#### GET /api/auth/verify
Verify current session status.

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {
    "id": 3,
    "username": "admin",
    "role": "admin"
  }
}
```

#### POST /api/auth/logout
Logout current user session.

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

---

### 2. Settings Management

#### GET /api/settings
Retrieve all application settings.

**Response (Success - 200):**
```json
{
  "success": true,
  "settings": [
    {
      "key": "company_name",
      "value": "Konveksi Murbay"
    },
    {
      "key": "company_tagline",
      "value": "Jagonya Konveksi"
    },
    {
      "key": "whatsapp_number",
      "value": "6281356822255"
    },
    {
      "key": "whatsapp_message_template",
      "value": "Halo! Saya tertarik dengan layanan konveksi Anda."
    },
    {
      "key": "company_description",
      "value": "#RF Layanan konveksi profesional untuk seragam, pakaian kustom, dan produksi massal. Kualitas tinggi, harga kompetitif, pengalaman 10+ tahun."
    },
    {
      "key": "contact_phone",
      "value": "+62 812-3456-7890"
    },
    {
      "key": "contact_email",
      "value": "info@murbaykonveksi.com"
    },
    {
      "key": "contact_address",
      "value": "Jl. Industri No. 123, Jakarta Selatan"
    },
    {
      "key": "google_maps_url",
      "value": "https://maps.google.com/..."
    },
    {
      "key": "social_facebook",
      "value": "https://facebook.com/murbaykonveksi"
    },
    {
      "key": "social_instagram",
      "value": "https://instagram.com/murbaykonveksi"
    },
    {
      "key": "social_twitter",
      "value": "https://twitter.com/murbaykonveksi"
    }
  ],
  "message": "Settings retrieved successfully"
}
```

**Note:** The settings API returns an array of key-value pairs. Frontend applications should convert this array format to an object format for easier access to individual settings.

#### PUT /api/settings
Update application settings (Admin only).

**Request Body:**
```json
{
  "company_name": "Konveksi Murbay",
  "company_tagline": "Jagonya Konveksi",
  "whatsapp_number": "6281356822255",
  "whatsapp_message_template": "Halo! Saya tertarik dengan layanan konveksi Anda.",
  "company_description": "Layanan konveksi profesional..."
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Pengaturan berhasil diperbarui"
}
```

---

### 3. Services Management

#### GET /api/services
Retrieve all services.

**Response (Success - 200):**
```json
{
  "success": true,
  "services": [
    {
      "id": 1,
      "name": "Jasa Desain Baju Kustom",
      "description": "Layanan desain pakaian sesuai keinginan pelanggan dengan berbagai pilihan bahan dan model.",
      "image_url": "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f0e7bfd2-296b-44d9-8508-b8a56a6ea8cd.png",
      "price_range": "Rp 150.000 - Rp 500.000",
      "is_featured": true,
      "created_at": "2024-12-19T10:30:00.000Z"
    }
  ]
}
```

#### POST /api/services
Create new service (Admin only).

**Request Body:**
```json
{
  "name": "Layanan Baru",
  "description": "Deskripsi layanan baru",
  "image_url": "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5ed2f0ec-4501-4e47-a9ac-8054c8490cf2.png",
  "price_range": "Rp 100.000 - Rp 300.000",
  "is_featured": false
}
```

#### PUT /api/services
Update existing service (Admin only).

**Request Body:**
```json
{
  "id": 1,
  "name": "Updated Service Name",
  "description": "Updated description",
  "image_url": "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/23892c3e-99e2-4f10-add1-12da6316a7a9.png",
  "price_range": "Rp 200.000 - Rp 400.000",
  "is_featured": true
}
```

#### DELETE /api/services
Delete service (Admin only).

**Request Body:**
```json
{
  "id": 1
}
```

---

### 4. Gallery Management

#### GET /api/gallery
Retrieve all gallery items.

**Response (Success - 200):**
```json
{
  "success": true,
  "gallery": [
    {
      "id": 1,
      "title": "Koleksi Pakaian Pria",
      "description": "Berbagai model pakaian pria berkualitas tinggi",
      "image_url": "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/eeb41532-e8db-4175-828b-e9f2178968f5.png",
      "category": "Fashion Pria",
      "created_at": "2024-12-19T10:30:00.000Z"
    }
  ]
}
```

#### POST /api/gallery
Add new gallery item (Admin only).

#### PUT /api/gallery
Update gallery item (Admin only).

#### DELETE /api/gallery
Delete gallery item (Admin only).

---

### 5. News/Articles Management

#### GET /api/news
Retrieve all news articles with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response (Success - 200):**
```json
{
  "success": true,
  "news": [
    {
      "id": 1,
      "title": "Tren Fashion Tahun 2025: Apa yang Harus Anda Ketahui",
      "content": "Artikel lengkap tentang tren fashion terbaru...",
      "excerpt": "Pelajari tren fashion terbaru yang akan mendominasi tahun 2025",
      "image_url": "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4304b561-b406-49a9-b518-dc6073d88c7b.png",
      "published_at": "2024-12-19T10:30:00.000Z",
      "status": "published",
      "created_at": "2024-12-19T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 5,
    "hasNext": false,
    "hasPrev": false
  }
}
```

#### POST /api/news
Create new article (Admin only).

#### PUT /api/news
Update article (Admin only).

#### DELETE /api/news
Delete article (Admin only).

---

### 6. Testimonials Management

#### GET /api/testimonials
Retrieve all testimonials with pagination.

**Response (Success - 200):**
```json
{
  "success": true,
  "testimonials": [
    {
      "id": 1,
      "name": "Aulia",
      "message": "Kualitasnya luar biasa, sangat puas!",
      "rating": 5,
      "company": "PT. Fashion Indonesia",
      "image_url": "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5ee80743-c79e-4286-96f7-6b823a4b12c3.png",
      "is_featured": true,
      "created_at": "2024-12-19T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 5,
    "hasNext": false,
    "hasPrev": false
  }
}
```

#### POST /api/testimonials
Add new testimonial (Admin only).

#### PUT /api/testimonials
Update testimonial (Admin only).

#### DELETE /api/testimonials
Delete testimonial (Admin only).

---

### 7. FAQ Management

#### GET /api/faq
Retrieve all FAQ items.

**Response (Success - 200):**
```json
{
  "success": true,
  "faq": [
    {
      "id": 1,
      "question": "Apa saja layanan yang ditawarkan?",
      "answer": "Kami menyediakan layanan desain baju kustom, produksi garmen, pemesanan massal, jasa jahit dan bordir, serta konsultasi desain mode.",
      "category": "Layanan",
      "order_index": 1,
      "is_featured": true,
      "created_at": "2024-12-19T10:30:00.000Z"
    }
  ],
  "categories": ["Layanan", "Pemesanan", "Kualitas", "Pengiriman"],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 5,
    "hasNext": false,
    "hasPrev": false
  }
}
```

#### POST /api/faq
Add new FAQ (Admin only).

#### PUT /api/faq
Update FAQ (Admin only).

#### DELETE /api/faq
Delete FAQ (Admin only).

---

### 8. Contact Management

#### GET /api/contact
Retrieve all contact form submissions (Admin only).

**Response (Success - 200):**
```json
{
  "success": true,
  "contacts": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "081234567890",
      "subject": "Pertanyaan Layanan",
      "message": "Saya ingin menanyakan tentang layanan konveksi...",
      "status": "new",
      "response_message": null,
      "created_at": "2024-12-19T10:30:00.000Z",
      "updated_at": "2024-12-19T10:30:00.000Z"
    }
  ],
  "statusCounts": [
    {"status": "new", "count": 3},
    {"status": "in_progress", "count": 2},
    {"status": "resolved", "count": 1}
  ],
  "pagination": {
    "total": 6,
    "limit": 20,
    "offset": 0,
    "hasMore": false
  }
}
```

#### POST /api/contact
Submit contact form (Public endpoint).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "081234567890",
  "subject": "Pertanyaan Layanan",
  "message": "Saya ingin menanyakan tentang layanan konveksi..."
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "contact": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "081234567890",
    "subject": "Pertanyaan Layanan",
    "message": "Saya ingin menanyakan tentang layanan konveksi...",
    "status": "new",
    "created_at": "2024-12-19T10:30:00.000Z"
  },
  "message": "Contact form submitted successfully"
}
```

**Note:** The response status code is 201 (Created) for successful submissions.

#### PUT /api/contact
Update contact status (Admin only).

**Request Body:**
```json
{
  "id": 1,
  "status": "replied",
  "response_message": "Thank you for your inquiry. We have sent you an email with more details."
}
```

**Valid Status Values:**
- `new` - New submission
- `in_progress` - Being processed
- `resolved` - Resolved
- `closed` - Closed

---

## Error Handling

All API endpoints return consistent error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Data yang dikirim tidak valid",
  "errors": {
    "name": "Nama wajib diisi",
    "email": "Format email tidak valid"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Akses ditolak. Silakan login terlebih dahulu."
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Anda tidak memiliki izin untuk mengakses resource ini."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Data tidak ditemukan"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Terjadi kesalahan pada server. Silakan coba lagi nanti."
}
```

---

## Rate Limiting

API endpoints have rate limiting implemented:
- **Public endpoints:** 100 requests per 15 minutes per IP
- **Admin endpoints:** 1000 requests per 15 minutes per authenticated user

---

## Database Schema

### Tables Structure

#### admin_users
```sql
CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### settings
```sql
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### services
```sql
CREATE TABLE services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price_range TEXT,
  is_featured BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### gallery
```sql
CREATE TABLE gallery (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### news
```sql
CREATE TABLE news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  published_at DATETIME,
  status TEXT DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### testimonials
```sql
CREATE TABLE testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  company TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### faq
```sql
CREATE TABLE faq (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'Umum',
  order_index INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### contact
```sql
CREATE TABLE contact (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  response_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## Testing Examples

### Using cURL

#### Test Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}' \
  -w "\nHTTP: %{http_code}\nTime: %{time_total}s\n" | jq '.'
```

#### Test Settings API
```bash
curl -X GET http://localhost:8000/api/settings \
  -H "Content-Type: application/json" \
  -w "\nHTTP: %{http_code}\nTime: %{time_total}s\n" | jq '.'
```

#### Test Services API
```bash
curl -X GET http://localhost:8000/api/services \
  -H "Content-Type: application/json" \
  -w "\nHTTP: %{http_code}\nTime: %{time_total}s\n" | jq '.'
```

#### Test Contact Form Submission
```bash
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "081234567890",
    "subject": "Test Subject",
    "message": "This is a test message"
  }' \
  -w "\nHTTP: %{http_code}\nTime: %{time_total}s\n" | jq '.'
```

---

## Security Features

1. **Password Hashing:** Admin passwords are hashed using bcrypt
2. **Session Management:** Secure session handling with HTTP-only cookies
3. **Input Validation:** All inputs are validated and sanitized
4. **SQL Injection Protection:** Parameterized queries prevent SQL injection
5. **CORS Configuration:** Proper CORS headers for security
6. **Rate Limiting:** Prevents abuse and DDoS attacks

---

## Performance Considerations

1. **Database Indexing:** Proper indexes on frequently queried columns
2. **Pagination:** Large datasets are paginated to improve performance
3. **Caching:** Settings are cached to reduce database queries
4. **Compression:** Response compression for faster data transfer
5. **Connection Pooling:** Efficient database connection management

---

## Deployment Notes

1. **Environment Variables:** Configure production database and secrets
2. **SSL/HTTPS:** Enable HTTPS in production
3. **Database Backup:** Regular automated backups
4. **Monitoring:** API performance and error monitoring
5. **Logging:** Comprehensive request and error logging

---

## Support

For technical support or questions about the API:
- **Documentation:** This file
- **Testing:** Use the provided cURL examples
- **Admin Panel:** Access via `/admin` with demo credentials
- **Database:** SQLite database with seeded dummy data

---

## Recent Updates (December 20, 2024)

### Contact Form Fixes
- **Database Schema Updated:** Added `phone`, `subject`, `response_message`, and `updated_at` columns to contact table
- **API Response Format:** Contact POST endpoint now returns 201 status code with created contact object
- **Settings API:** Fixed JSON serialization issues for proper response formatting
- **Frontend Integration:** Updated ContactSection component to handle settings data correctly

### Known Issues Resolved
- ✅ Fixed "Terjadi kesalahan saat mengirim pesan" error on contact form submission
- ✅ Resolved settings API JSON parsing errors
- ✅ Aligned database schema with API requirements

---

*Last Updated: December 20, 2024*
*Version: 1.1.0*
