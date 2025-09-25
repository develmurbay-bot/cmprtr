-- Schema untuk aplikasi Murbay Konveksi
-- Tabel untuk services
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk gallery
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  image_url VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk news
CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  featured_image VARCHAR(255),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk testimonials
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  content TEXT NOT NULL,
  avatar_url VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk faq
CREATE TABLE faq (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk contact
CREATE TABLE contact (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  replied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk settings
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(255) UNIQUE NOT NULL,
  setting_value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk admin_users
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user
INSERT INTO admin_users (username, password_hash, full_name, email, role) 
VALUES ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin@example.com', 'admin');

-- Insert beberapa data contoh untuk settings
INSERT INTO settings (setting_key, setting_value) VALUES
('company_name', 'Murbay Konveksi'),
('company_tagline', 'Jagonya Konveksi'),
('company_phone', '+62 813-5682-2255'),
('company_email', 'info@murbaykonveksi.com'),
('company_address', 'Jl. Contoh Alamat Perusahaan'),
('company_city', 'Bandar Lampung'),
('whatsapp_number', '6281356822255'),
('whatsapp_message', 'Halo! Saya tertarik dengan layanan konveksi Anda.'),
('whatsapp_enabled', 'true'),
('meta_title', 'Murbay Konveksi - Spesialis Garmen & Konveksi Berkualitas Tinggi'),
('meta_description', 'Perusahaan konveksi terpercaya yang melayani berbagai kebutuhan fashion dan garmen dengan komitmen tinggi terhadap kualitas dan kepuasan pelanggan.'),
('social_facebook', 'https://facebook.com/murbaykonveksi'),
('social_instagram', 'https://instagram.com/murbaykonveksi'),
('social_twitter', 'https://twitter.com/murbaykonveksi'),
('social_linkedin', 'https://linkedin.com/@murbaykonveksi'),
('social_youtube', 'https://youtube.com/@murbaykonveksi'),
('google_maps_embed', 'https://www.google.com/maps/embed?pb=...'),
('upload_max_size', '5242880'),
('upload_allowed_types', 'image/jpeg,image/png,image/webp,image/gif');