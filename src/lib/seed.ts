import { getDatabase } from './database';
import { 
  faqData, 
  testimonialsData, 
  servicesData, 
  galleryData, 
  newsData, 
  storeSettings,
  rolesData,
  defaultUsers 
} from '../data/seedData';

export async function seedDatabase() {
  const db = getDatabase();
  
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    db.run('DELETE FROM services');
    db.run('DELETE FROM gallery');
    db.run('DELETE FROM news');
    db.run('DELETE FROM testimonials');
    db.run('DELETE FROM faq');
    db.run('DELETE FROM settings');
    db.run('DELETE FROM admin_users');
    db.run('DELETE FROM roles');

    // Seed Services
    console.log('Seeding services...');
    for (const service of servicesData) {
      db.run(
        'INSERT INTO services (title, description, image_url) VALUES (?, ?, ?)',
        [service.title, service.description, service.image_url]
      );
    }

    // Seed Gallery
    console.log('Seeding gallery...');
    for (const item of galleryData) {
      db.run(
        'INSERT INTO gallery (title, image_url, category) VALUES (?, ?, ?)',
        [item.title, item.image_url, item.category]
      );
    }

    // Seed News
    console.log('Seeding news...');
    for (const article of newsData) {
      db.run(
        'INSERT INTO news (title, content, featured_image, published_at, status) VALUES (?, ?, ?, ?, ?)',
        [article.title, article.content, article.featured_image, article.published_at, article.status]
      );
    }

    // Seed Testimonials
    console.log('Seeding testimonials...');
    for (const testimonial of testimonialsData) {
      db.run(
        'INSERT INTO testimonials (name, content, customer_photo, rating, status) VALUES (?, ?, ?, ?, ?)',
        [testimonial.name, testimonial.content, testimonial.customer_photo, testimonial.rating, testimonial.status]
      );
    }

    // Seed FAQ
    console.log('Seeding FAQ...');
    for (const faq of faqData) {
      db.run(
        'INSERT INTO faq (question, answer, category, order_index) VALUES (?, ?, ?, ?)',
        [faq.question, faq.answer, faq.category, faq.order_index]
      );
    }

    // Seed Settings
    console.log('Seeding settings...');
    for (const [key, value] of Object.entries(storeSettings)) {
      db.run(
        'INSERT INTO settings (key, value) VALUES (?, ?)',
        [key, typeof value === 'string' ? value : JSON.stringify(value)]
      );
    }

    // Seed Roles
    console.log('Seeding roles...');
    for (const role of rolesData) {
      db.run(
        'INSERT INTO roles (id, name, description, permissions) VALUES (?, ?, ?, ?)',
        [role.id, role.name, role.description, role.permissions]
      );
    }

    // Seed Admin Users
    console.log('Seeding admin users...');
    for (const user of defaultUsers) {
      db.run(
        'INSERT INTO admin_users (username, password, email, full_name, role_id, theme_preference) VALUES (?, ?, ?, ?, ?, ?)',
        [user.username, user.password, user.email, user.full_name, user.role_id, user.theme_preference]
      );
    }

    console.log('Database seeding completed successfully!');
    
    // Verify seeded data
    const counts = {
      services: db.query('SELECT COUNT(*) as count FROM services')[0].count,
      gallery: db.query('SELECT COUNT(*) as count FROM gallery')[0].count,
      news: db.query('SELECT COUNT(*) as count FROM news')[0].count,
      testimonials: db.query('SELECT COUNT(*) as count FROM testimonials')[0].count,
      faq: db.query('SELECT COUNT(*) as count FROM faq')[0].count,
      settings: db.query('SELECT COUNT(*) as count FROM settings')[0].count,
      roles: db.query('SELECT COUNT(*) as count FROM roles')[0].count,
      admin_users: db.query('SELECT COUNT(*) as count FROM admin_users')[0].count
    };

    console.log('Seeded data counts:', counts);
    return counts;

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Function to check if database needs seeding
export function isDatabaseEmpty(): boolean {
  const db = getDatabase();
  
  try {
    const serviceCount = db.query('SELECT COUNT(*) as count FROM services')[0].count;
    return serviceCount === 0;
  } catch (error) {
    console.error('Error checking database:', error);
    return true;
  }
}

// Auto-seed on first run
export async function initializeDatabase() {
  if (isDatabaseEmpty()) {
    console.log('Database is empty, running initial seed...');
    await seedDatabase();
  } else {
    console.log('Database already contains data, skipping seed.');
  }
}
