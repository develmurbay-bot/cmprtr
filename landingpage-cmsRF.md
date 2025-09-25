# CMS RF - Murbay Konveksi Landing Page Application

## Application Overview

CMS RF (Content Management System - Retail Fashion) is a modern, responsive company profile and content management system built for Murbay Konveksi garment manufacturing company. The application combines a beautiful landing page with a comprehensive admin panel, all built using Next.js 15+, TypeScript, and shadcn/ui components.

## Core Features

### Frontend (Landing Page)
- **Modern Responsive Design** - Beautiful, mobile-first design with Tailwind CSS
- **Company Profile Sections** - Hero, About, Vision/Mission, Values, Statistics
- **Rotating Services Carousel** - Auto-rotating showcase of services with smooth animations
- **Dynamic Content** - All content managed through admin panel
- **WhatsApp Integration** - Floating WhatsApp button with customizable message templates
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards for social media sharing
- **Google Fonts Integration** - Professional typography

### Admin Panel (Content Management)
- **Secure Authentication** - Session-based login system with role-based access
- **Modern Dashboard** - Clean, intuitive admin interface with statistics
- **Complete CRUD Operations** - Full content management for all sections
- **DataTables with Pagination** - Interactive tables with search, sort, and pagination
- **Image Management** - Support for service, gallery, news, and testimonial images
- **Real-time Updates** - Changes reflect immediately on the landing page

### Backend & Database
- **Flexible Database Support** - SQLite (development) / MySQL/MariaDB (production)
- **RESTful API** - Comprehensive API endpoints with proper error handling
- **Database Seeding** - Pre-populated dummy data for quick setup
- **Type Safety** - Full TypeScript implementation

## Technical Architecture

### Tech Stack
- **Frontend:** Next.js 15+, TypeScript, React
- **UI Components:** shadcn/ui, Radix UI
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes
- **Authentication:** Context-based session management
- **Database:** SQLite (development) / MySQL/MariaDB (production)
- **ORM/Database:** Custom database abstraction layer
- **Image Handling:** File upload with validation
- **Deployment:** Vercel-ready configuration

### Project Structure
```
src/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin panel pages
│   │   ├── login/page.tsx       # Admin login
│   │   ├── page.tsx             # Admin dashboard
│   │   ├── services/page.tsx    # Services management
│   │   ├── gallery/page.tsx     # Gallery management
│   │   ├── news/page.tsx        # News management
│   │   ├── testimonials/page.tsx # Testimonials management
│   │   ├── faq/page.tsx         # FAQ management
│   │   ├── contact/page.tsx     # Contact management
│   │   └── settings/page.tsx    # Store settings
│   ├── api/                     # API endpoints
│   │   ├── auth/                # Authentication
│   │   ├── services/            # Services CRUD
│   │   ├── gallery/             # Gallery CRUD
│   │   ├── news/                # News CRUD
│   │   ├── testimonials/        # Testimonials CRUD
│   │   ├── faq/                 # FAQ CRUD
│   │   ├── contact/             # Contact CRUD
│   │   ├── settings/            # Settings CRUD
│   │   └── seed/                # Database seeding
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/
│   ├── ui/                      # shadcn/ui components
│   └── landing/                 # Landing page components
│       ├── HeroSection.tsx      # Hero section
│       ├── AboutSection.tsx     # About section
│       └── ServicesSection.tsx  # Services carousel
├── context/
│   └── AuthContext.tsx          # Authentication context
├── data/
│   └── seedData.ts              # Dummy data
├── lib/
│   ├── database.ts              # Database abstraction
│   ├── seed.ts                  # Database seeding
│   └── utils.ts                 # Utility functions
└── hooks/                       # Custom React hooks
```

## Content Management Features

### Services Management
- Add, edit, delete services
- Upload service images
- Manage service descriptions
- Auto-rotating carousel display

### Gallery Management
- Portfolio image management
- Category organization
- Bulk upload support
- Responsive grid display

### News & Articles
- Create and manage blog posts
- Featured image support
- Publication scheduling
- SEO-friendly URLs

### Testimonials
- Customer testimonial management
- Customer photo uploads
- Rating system
- Carousel display

### FAQ Management
- Question and answer management
- Order/priority settings
- Accordion display
- Category grouping

### Contact Management
- Form submission inbox
- Response status tracking
- Export functionality
- Email notifications

### Store Settings
- Company information
- Contact details
- WhatsApp configuration
- Social media links
- Google Maps integration

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin authentication
- `GET /api/auth/verify` - Verify current session
- `POST /api/auth/logout` - Logout current user

### Content Management
- `GET/POST/PUT/DELETE /api/services` - Services management
- `GET/POST/PUT/DELETE /api/gallery` - Gallery management
- `GET/POST/PUT/DELETE /api/news` - News management
- `GET/POST/PUT/DELETE /api/testimonials` - Testimonials management
- `GET/POST/PUT/DELETE /api/faq` - FAQ management
- `GET/POST /api/contact` - Contact form handling
- `GET/PUT /api/settings` - Store settings

## WhatsApp Integration

### Floating Button
- Fixed position (bottom-right)
- Customizable message templates
- Store settings integration
- Smooth animations

### Configuration
- Configurable WhatsApp number
- Custom message templates
- Enable/disable toggle

## Database Schema

### Tables Structure
- **admin_users** - Admin authentication
- **services** - Service listings
- **gallery** - Portfolio images
- **news** - Articles and blog posts
- **testimonials** - Customer reviews
- **faq** - Frequently asked questions
- **contact** - Form submissions
- **settings** - Store configuration

## Security Features

- Session-based authentication
- Password hashing with bcrypt
- Input sanitization
- SQL injection prevention
- XSS protection
- File upload validation
- CSRF protection (recommended for production)

## Responsive Design

The application features a mobile-first responsive design with:
- Mobile-optimized navigation
- Touch-friendly interface elements
- Responsive image handling
- Flexible grid layouts
- Adaptive typography

## Development Workflow

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Installation
1. Clone repository and install dependencies
2. Copy `.env.example` to `.env.local`
3. Configure database settings
4. Start development server
5. Access landing page at http://localhost:8000
6. Access admin panel at http://localhost:8000/admin/login

## Deployment

### Vercel (Recommended)
- One-click deployment
- Automatic environment variable configuration
- Zero-config setup

### Production Environment
- MySQL/MariaDB database setup
- HTTPS configuration
- Environment variables for production
- Performance optimization

## Development Status

### Completed Features (50%)
✅ Database Configuration (SQLite/MySQL support)
✅ Dummy Data and Seeding
✅ Authentication System
✅ Hero, About, Services Sections
✅ Rotating Services Carousel
✅ WhatsApp Floating Button
✅ Main Landing Page Integration
✅ Admin Dashboard
✅ Services Management (Full CRUD)
✅ Gallery Management (Full CRUD)
✅ News Management (Full CRUD)
✅ Settings Management System
✅ API Endpoints (All working)
✅ Contact Form (Fixed and Working)

### In Progress
🔄 Gallery Section (Landing page)
🔄 News/Articles Section (Landing page)
🔄 Testimonials Section (Landing page)
🔄 FAQ Section (Landing page)

### Remaining Features
🔴 Testimonials Management (Admin Interface)
🔴 FAQ Management (Admin Interface)
🔴 Contact Management (Admin Interface)
🔴 Dual Admin Theme System
🔴 SEO & Social Media Integration
🔴 Testing and Validation

## License

This project is licensed under the MIT License.

---

**Application Type:** Content Management System for Company Profile  
**Target Industry:** Garment Manufacturing / Fashion Retail  
**Development Status:** Phase 2 - Content Management (Partial)  
**Last Updated:** August 30, 2024