# Murbay Konveksi - Company Profile Web Application

A modern, responsive company profile and content management system built with Next.js 15+, TypeScript, and shadcn/ui components for Murbay Konveksi garment manufacturing company.

## 🌟 Features

### Frontend (Landing Page)
- **Modern Responsive Design** - Beautiful, mobile-first design with Tailwind CSS
- **Company Profile Sections** - Hero, About, Vision/Mission, Values, Statistics
- **Rotating Services Carousel** - Auto-rotating showcase of services with smooth animations
- **Dynamic Content** - All content managed through admin panel
- **WhatsApp Integration** - Floating WhatsApp button with customizable message templates
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards for social media sharing
- **Google Fonts Integration** - Professional typography

### Admin Panel (Content Management)
- **Secure Authentication** - Session-based login system
- **Modern Dashboard** - Clean, intuitive admin interface
- **Complete CRUD Operations** - Full content management for all sections
- **DataTables with Pagination** - Interactive tables with search, sort, and pagination
- **Image Management** - Support for service, gallery, news, and testimonial images
- **Real-time Updates** - Changes reflect immediately on the landing page

### Backend & Database
- **Flexible Database Support** - SQLite (development) / MySQL/MariaDB (production)
- **RESTful API** - Comprehensive API endpoints with proper error handling
- **Database Seeding** - Pre-populated dummy data for quick setup
- **Type Safety** - Full TypeScript implementation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone and Install Dependencies**
```bash
git clone <repository-url>
cd murbay-konveksi
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Database Configuration
DATABASE_TYPE=sqlite
DATABASE_URL=sqlite:./database.db

# For MySQL/MariaDB (Production)
# DATABASE_TYPE=mysql
# DATABASE_URL=mysql://username:password@localhost:3306/murbay_konveksi

# Admin Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Access the Application**
- **Landing Page:** http://localhost:8000
- **Admin Panel:** http://localhost:8000/admin/login

### Admin Credentials (Demo)
- **Username:** `admin`
- **Password:** `admin123`

## 📁 Project Structure

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

## 🎯 Content Management

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

## 🔧 API Documentation

Comprehensive API documentation is available in [`ReadmeAPI_information.md`](./ReadmeAPI_information.md).

### Key Endpoints
- `POST /api/auth/login` - Admin authentication
- `GET/POST/PUT/DELETE /api/services` - Services management
- `GET/POST/PUT/DELETE /api/gallery` - Gallery management
- `GET/POST/PUT/DELETE /api/news` - News management
- `GET/POST/PUT/DELETE /api/testimonials` - Testimonials management
- `GET/POST/PUT/DELETE /api/faq` - FAQ management
- `GET/POST /api/contact` - Contact form handling
- `GET/PUT /api/settings` - Store settings

## 🎨 Design System

### Color Scheme
- **Primary:** Black and white with accent colors
- **Modern Typography:** Google Fonts integration
- **Responsive Design:** Mobile-first approach
- **Clean Interface:** Minimalist, professional aesthetic

### Components
- **shadcn/ui Components** - Accessible, customizable UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Grid** - Flexible layout system
- **Interactive Elements** - Smooth animations and transitions

## 📱 WhatsApp Integration

### Floating Button
- Fixed position (bottom-right)
- Customizable message templates
- Store settings integration
- Smooth animations

### Configuration
```javascript
// Store Settings
{
  "whatsapp_number": "6281234567890",
  "whatsapp_message": "Halo! Saya tertarik dengan layanan konveksi Anda.",
  "whatsapp_enabled": true
}
```

## 🗄️ Database

### SQLite (Development)
```bash
# Automatic setup - no configuration needed
npm run dev
```

### MySQL/MariaDB (Production)
```bash
# Update .env.local
DATABASE_TYPE=mysql
DATABASE_URL=mysql://username:password@localhost:3306/murbay_konveksi

# Run migrations (automatic on first start)
npm run dev
```

### Database Schema
- **services** - Service listings
- **gallery** - Portfolio images
- **news** - Articles and blog posts
- **testimonials** - Customer reviews
- **faq** - Frequently asked questions
- **contact** - Form submissions
- **settings** - Store configuration
- **admin_users** - Admin authentication

## 🧪 Testing

### API Testing
```bash
# Test services endpoint
curl -X GET http://localhost:8000/api/services

# Test authentication
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### Manual Testing
1. **Landing Page** - Verify all sections load correctly
2. **Admin Login** - Test authentication flow
3. **CRUD Operations** - Test create, read, update, delete for all content types
4. **Responsive Design** - Test on different screen sizes
5. **WhatsApp Integration** - Verify floating button functionality

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configure environment variables in Vercel dashboard
```

### Environment Variables for Production
```env
DATABASE_TYPE=mysql
DATABASE_URL=mysql://username:password@host:port/database
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://yourdomain.com
```

### Database Setup (Production)
1. Create MySQL/MariaDB database
2. Update DATABASE_URL in environment variables
3. Deploy application (database tables will be created automatically)
4. Access admin panel to verify setup

## 🔒 Security

### Authentication
- Session-based authentication
- Secure password handling
- Route protection for admin pages
- CSRF protection (recommended for production)

### Data Validation
- Input sanitization
- SQL injection prevention
- XSS protection
- File upload validation

### Production Security Checklist
- [ ] Use HTTPS
- [ ] Set secure environment variables
- [ ] Enable CSRF protection
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Configure CORS properly
- [ ] Use strong admin passwords

## 🎯 Performance

### Optimization Features
- **Next.js 15+** - Latest performance optimizations
- **Turbopack** - Fast development builds
- **Image Optimization** - Automatic image optimization
- **Code Splitting** - Automatic code splitting
- **Static Generation** - Pre-rendered pages where possible

### Performance Tips
- Use placeholder images for development
- Implement image compression for production
- Add database indexing for large datasets
- Enable caching for API responses
- Use CDN for static assets

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Development Workflow
1. **Feature Development** - Create feature branches
2. **Testing** - Test both frontend and API functionality
3. **Code Review** - Review code changes
4. **Deployment** - Deploy to staging/production

### Adding New Content Types
1. Create database table in `src/lib/database.ts`
2. Add API routes in `src/app/api/[content-type]/`
3. Create admin management page
4. Add to landing page if needed
5. Update documentation

## 📚 Dependencies

### Core Dependencies
- **Next.js 15+** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **better-sqlite3** - SQLite database

### Development Dependencies
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Documentation:** Check this README and API documentation
- **Issues:** Create GitHub issues for bugs and feature requests
- **Email:** Contact the development team

## 🎉 Acknowledgments

- **Next.js Team** - For the amazing framework
- **shadcn** - For the beautiful UI components
- **Tailwind CSS** - For the utility-first CSS framework
- **Vercel** - For the deployment platform

---

**Built with ❤️ for Murbay Konveksi**

*Last Updated: August 30, 2024*
