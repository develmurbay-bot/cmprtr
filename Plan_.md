# Plan Implementasi "Murbay Konveksi" Web Application

## Overview
Membangun web aplikasi company profile/landing page yang dinamis untuk "Murbay Konveksi" menggunakan Next.js 15+ dengan TypeScript, shadcn/ui components, dan Tailwind CSS. Aplikasi ini akan mencakup frontend dan backend dalam satu aplikasi dengan dokumentasi API terpisah.

---

## 1. Setup dan Konfigurasi Awal

### 1.1 Struktur Project
- Menggunakan existing Next.js 15+ boilerplate
- Konfigurasi meta tags untuk preview social media
- Setup SEO optimization dengan Next.js metadata API

### 1.2 Database Configuration
**Files:** 
- `.env.local` - Environment configuration
- `src/lib/database.ts` - Database connection handler

**Database Options:**
- SQLite (default untuk development)
- MySQL/MariaDB (untuk production)
- Konfigurasi melalui environment variables:
  ```
  DATABASE_TYPE=sqlite # atau mysql
  DATABASE_URL=sqlite:./database.db # atau mysql://user:pass@host:port/db
  ```

### 1.3 Dummy Data dan Seed
**File:** `src/data/seedData.ts`
- FAQ (5 items sesuai spesifikasi)
- Testimoni Pelanggan (5 testimoni **dengan gambar**)
- Layanan (5 layanan dengan deskripsi lengkap **dan gambar**)
- Galeri (5 kategori portofolio **dengan gambar**)
- Berita/Artikel (5 artikel dengan metadata lengkap **dan gambar featured**)
- Store Settings (informasi dasar toko + WhatsApp settings)

---

## 2. Landing Page (Company Profile)

### 2.1 Halaman Utama
**File:** `src/app/page.tsx`

**Sections yang akan diimplementasi:**
- **Header/Navigation:** Logo text-based "Murbay Konveksi" dengan navigasi responsif
- **Hero Section:** Banner utama dengan CTA dan informasi perusahaan
- **About Section:** Profil perusahaan (visi, misi, nilai-nilai)
- **Services Section:** **Carousel bergerak/rotasi** untuk menampilkan layanan dengan gambar menarik
- **Gallery Section:** Grid responsif dengan placeholder images menggunakan format:
  ```
  https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c607d6fe-61d3-43e8-a1df-eea819e5cefc.png
  ```
- **News/Articles Section:** Grid artikel terbaru dengan featured images dan preview
- **Testimonials Section:** Carousel testimoni pelanggan dengan foto customer
- **FAQ Section:** Accordion interaktif menggunakan shadcn/ui
- **Contact Section:** Form kontak dengan validasi
- **Footer:** Informasi kontak dan social media sharing
- **WhatsApp Floating Button:** Fixed position di kanan bawah dengan template pesan dari settings

### 2.2 Meta Tags dan SEO
- Open Graph tags untuk Facebook
- Twitter Card tags
- WhatsApp preview optimization
- Structured data untuk SEO

---

## 3. Admin Panel (Content Management System)

### 3.1 Authentication System
**File:** `src/app/admin/login/page.tsx`
- Login form dengan validasi
- Session management menggunakan context
- Route protection untuk admin pages

### 3.2 Admin Dashboard & Theme System
**File:** `src/app/admin/page.tsx`
- Dashboard overview dengan statistik
- Navigation cards untuk setiap section
- Quick actions dan recent activities
- **Theme Switcher** di admin menu/header

### 3.2.1 Dual Admin Theme System
**Files:**
- `src/app/admin/themes/adminlte-inspired/` - shadcn/ui based (default)
- `src/app/admin/themes/adminlte-pure/` - AdminLTE original
- `src/components/admin/ThemeSwitcher.tsx` - Theme selection component

**Theme 1: AdminLTE-Inspired (Default)**
- Menggunakan shadcn/ui components dengan AdminLTE layout
- Sidebar navigation dengan AdminLTE styling
- Color scheme dan typography mirip AdminLTE
- Tetap menggunakan Tailwind CSS untuk performa optimal
- Modern React components dengan AdminLTE look & feel

**Theme 2: AdminLTE Pure**
- AdminLTE original dengan Bootstrap framework
- Komponen AdminLTE asli (DataTables, Charts, Forms)
- Classic AdminLTE interface dan behavior
- Untuk staff yang prefer traditional admin dashboard
- Full AdminLTE functionality dan plugins

**Theme Switcher Features:**
- Toggle switch di admin header/sidebar menu
- Real-time theme switching tanpa reload
- User preference tersimpan di database
- Smooth transition animation
- Consistent data structure untuk kedua theme

### 3.3 Content Management Pages (Full CRUD untuk Semua Content)

**Services Management**
**File:** `src/app/admin/services/page.tsx`
- **Full CRUD operations (Create, Read, Update, Delete)**
- DataTable dengan pagination, sorting, filtering
- **Image upload untuk setiap layanan**
- Modal forms untuk add/edit dengan validasi
- Preview carousel functionality
- Bulk operations (delete multiple, export)

**Gallery Management**
**File:** `src/app/admin/gallery/page.tsx`
- **Full CRUD operations (Create, Read, Update, Delete)**
- **Image upload wajib untuk setiap item galeri**
- Category management dengan CRUD
- Grid view dengan drag & drop sorting
- Bulk image upload functionality
- Image optimization dan resize

**News/Articles Management**
**File:** `src/app/admin/news/page.tsx`
- **Full CRUD operations (Create, Read, Update, Delete)**
- Rich text editor simulation
- **Featured image upload wajib**
- Publication status management (draft, published, archived)
- SEO fields (title, description, keywords)
- Content scheduling dan auto-publish

**Testimonials Management**
**File:** `src/app/admin/testimonials/page.tsx`
- **Full CRUD operations (Create, Read, Update, Delete)**
- **Customer photo upload**
- Rating system (1-5 stars)
- Approval workflow (pending, approved, rejected)
- Bulk approval/rejection

**FAQ Management**
**File:** `src/app/admin/faq/page.tsx`
- **Full CRUD operations (Create, Read, Update, Delete)**
- Question & Answer management
- Category grouping dengan CRUD
- Order/priority settings dengan drag & drop
- Search dan filter functionality

**Contact Management**
**File:** `src/app/admin/contact/page.tsx`
- **Full CRUD operations untuk form submissions**
- Form submissions inbox dengan status tracking
- Response management (reply, mark as resolved)
- Export functionality (CSV, Excel)
- Auto-response templates

**Store Settings**
**File:** `src/app/admin/settings/page.tsx`
- Company information management
- Social media links
- Google Maps integration settings
- Logo and branding assets
- **WhatsApp Configuration:**
  - Nomor WhatsApp tujuan
  - Template pesan default
  - Floating button enable/disable
- **Admin Theme Preferences:**
  - Theme selection (AdminLTE-Inspired / AdminLTE Pure)
  - Theme customization options
  - User interface preferences

---

## 4. API Endpoints (Backend Integration)

### 4.1 Database Schema & Models
**File:** `src/lib/models.ts`
- Services model (id, title, description, image_url, created_at, updated_at)
- Gallery model (id, title, image_url, category, created_at, updated_at)
- News model (id, title, content, featured_image, published_at, created_at, updated_at)
- Testimonials model (id, name, content, customer_photo, rating, created_at, updated_at)
- FAQ model (id, question, answer, order, created_at, updated_at)
- Contact model (id, name, email, message, status, created_at, updated_at)
- Settings model (key, value, updated_at)

### 4.2 RESTful API Routes
**Base Path:** `src/app/api/`

**Endpoints yang akan dibuat:**
- `GET/POST/PUT/DELETE /api/services` - Services management dengan image handling
- `GET/POST/PUT/DELETE /api/gallery` - Gallery management dengan image handling
- `GET/POST/PUT/DELETE /api/news` - News/Articles management dengan featured image
- `GET/POST/PUT/DELETE /api/testimonials` - Testimonials management dengan customer photo
- `GET/POST/PUT/DELETE /api/faq` - FAQ management
- `GET/POST /api/contact` - Contact form submissions
- `GET/PUT /api/settings` - Store settings management
- `GET/PUT /api/admin/theme` - Admin theme preferences
- `POST /api/upload` - Image upload handler

### 4.3 API Features
- JSON response format
- Error handling dengan proper HTTP status codes
- Input validation dan sanitization
- **Image upload handling dengan validation**
- **Database abstraction layer (SQLite/MySQL)**
- CORS configuration
- Rate limiting simulation

---

## 5. UI/UX Design dan Styling

### 5.1 Design System
- Modern, clean, dan professional design
- Black & white color scheme dengan accent colors
- Responsive design untuk semua device sizes
- Consistent typography menggunakan Google Fonts

### 5.2 Interactive Components
- **Services Carousel:** Rotating/moving carousel dengan smooth transitions
- **DataTables:** Interactive tables dengan sorting, filtering, pagination
- **Modal Forms:** Smooth animations dan proper validation feedback
- **Loading States:** Skeleton loaders dan progress indicators

### 5.3 Accessibility
- ARIA labels dan semantic HTML
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

---

## 6. Social Media Integration

### 6.1 WhatsApp Integration
- **Floating WhatsApp Button:**
  - Fixed position di kanan bawah layar
  - Template pesan dari store settings
  - Nomor tujuan dari store settings
  - Smooth animation dan hover effects

### 6.2 Sharing Functionality
- WhatsApp sharing dengan pre-filled message
- Facebook sharing dengan Open Graph data
- Twitter/X sharing dengan proper hashtags
- Dynamic URL generation untuk sharing

### 6.2 Meta Tags Preview
- Facebook preview optimization
- Twitter Card preview
- WhatsApp link preview
- LinkedIn sharing compatibility

---

## 7. Authentication & Security

### 7.1 Auth Context
**File:** `src/context/AuthContext.tsx`
- Login state management
- Session persistence
- Auto-logout functionality
- Role-based access control

### 7.2 Route Protection
- Admin route guards
- Redirect logic untuk unauthorized access
- Loading states untuk auth checks

---

## 8. Documentation

### 8.1 API Documentation
**File:** `ReadmeAPI_information.md`
- Comprehensive API endpoint documentation
- Request/Response examples
- Error codes dan handling
- Authentication requirements
- Rate limiting information

### 8.2 Project Documentation
**File:** `README.md` (update existing)
- Project setup instructions
- Development workflow
- Deployment guidelines
- Admin credentials untuk testing

---

## 9. Testing dan Validation

### 9.1 API Testing
- cURL commands untuk setiap endpoint
- Response validation
- Error handling verification
- Performance testing

### 9.2 UI Testing
- Cross-browser compatibility
- Mobile responsiveness
- Form validation testing
- Carousel functionality testing

---

## 10. Implementation Steps

### Phase 1: Foundation (Steps 1-3)
1. Setup dummy data dan seed files
2. Create basic landing page structure
3. Implement authentication system

### Phase 2: Content Management (Steps 4-6)
4. Build admin dashboard dengan navigation ke semua content management
5. **Implement Full CRUD operations untuk SEMUA content types:**
   - Services (Create, Read, Update, Delete + Image Upload)
   - Gallery (Create, Read, Update, Delete + Image Upload)
   - News/Articles (Create, Read, Update, Delete + Featured Image)
   - Testimonials (Create, Read, Update, Delete + Customer Photo)
   - FAQ (Create, Read, Update, Delete + Ordering)
   - Contact Management (Read, Update, Delete + Response)
6. Create comprehensive API endpoints untuk semua CRUD operations

### Phase 3: UI Enhancement (Steps 7-8)
7. Implement services carousel dengan rotating animation
8. Add DataTables dengan pagination dan sorting

### Phase 4: Integration & Polish (Steps 9-10)
9. Social media sharing dan meta tags optimization
10. Testing, documentation, dan final polish

---

## Expected Deliverables

1. **Fully functional web application** dengan frontend dan backend terintegrasi
2. **Beautiful, responsive design** dengan modern UI components
3. **Rotating services carousel** yang menarik dan interactive
4. **Comprehensive admin panel** dengan DataTables dan pagination
5. **Complete API documentation** dalam file terpisah
6. **Social media integration** dengan proper meta tags preview
7. **SEO optimized** pages dengan structured data
8. **Mobile-first responsive design** yang works di semua devices
9. **Image management system** untuk Services, Gallery, News, dan Testimonials
10. **Database flexibility** dengan support SQLite dan MySQL/MariaDB
11. **WhatsApp floating button** dengan template pesan yang customizable
12. **Dual admin theme system** (AdminLTE-Inspired + AdminLTE Pure) dengan theme switcher

---

## Technical Stack

- **Frontend:** Next.js 15+, TypeScript, React
- **UI Components:** shadcn/ui, Radix UI
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes
- **Authentication:** Context-based session management
- **Database:** SQLite (development) / MySQL/MariaDB (production)
- **ORM/Database:** Custom database abstraction layer
- **Image Handling:** File upload dengan validation
- **Deployment:** Vercel-ready configuration

---

## Success Criteria

✅ Landing page yang beautiful dan fully responsive  
✅ **Admin panel dengan complete CRUD functionality untuk SEMUA content types**  
✅ Services carousel yang smooth dan engaging  
✅ DataTables dengan pagination yang user-friendly  
✅ Social media sharing yang works dengan proper previews  
✅ API documentation yang comprehensive dan clear  
✅ SEO optimization dengan proper meta tags  
✅ Cross-device compatibility dan performance optimization  
✅ **Image management untuk semua content types**  
✅ **Database flexibility (SQLite/MySQL)**  
✅ **WhatsApp floating button dengan template customizable**  
✅ **Dual admin theme system dengan theme switcher di menu admin**
