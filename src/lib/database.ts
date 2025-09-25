import { Database } from 'better-sqlite3';
import sqlite3 from 'better-sqlite3';
import { Pool } from 'pg';
import { DATABASE_TYPE, DATABASE_URL } from './config';

// Database interface for abstraction
export interface DatabaseConnection {
  query: (sql: string, params?: any[]) => Promise<any[]>;
  run: (sql: string, params?: any[]) => Promise<{ lastInsertRowid: number; changes: number }>;
  close: () => void;
}

// SQLite implementation
class SQLiteConnection implements DatabaseConnection {
  private db: Database;

  constructor(path: string) {
    this.db = sqlite3(path);
    this.initializeTables();
  }

  private initializeTables() {
    // Services table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT,
        order_index INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Gallery table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        image_url TEXT NOT NULL,
        category TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // News table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        featured_image TEXT,
        published_at DATETIME,
        status TEXT DEFAULT 'draft',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Testimonials table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        position TEXT,
        content TEXT NOT NULL,
        avatar_url TEXT,
        rating INTEGER DEFAULT 5,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // FAQ table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS faq (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category TEXT,
        order_index INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Contact table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS contact (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        replied_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Settings table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        setting_key TEXT PRIMARY KEY,
        setting_value TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Roles table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        permissions TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Admin users table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        email TEXT,
        full_name TEXT,
        role_id INTEGER DEFAULT 1,
        theme_preference TEXT DEFAULT 'adminlte-inspired',
        is_active BOOLEAN DEFAULT true,
        last_login DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (role_id) REFERENCES roles (id)
      )
    `);

    // Insert default admin user if not exists
    const adminExists = this.db.prepare('SELECT 1 FROM admin_users WHERE username = ?').get('admin');
    if (!adminExists) {
      const bcrypt = require('bcryptjs');
      const saltRounds = 10;
      const passwordHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', saltRounds);
      
      this.db.prepare(`
        INSERT INTO admin_users (username, password_hash, full_name, email, role_id) 
        VALUES (?, ?, ?, ?, ?)
      `).run('admin', passwordHash, 'Admin User', 'admin@example.com', 1);
    }

    // Insert default settings if not exist
    const defaultSettings = [
      ['company_name', 'Murbay Konveksi'],
      ['company_tagline', 'Jagonya Konveksi'],
      ['company_phone', '+62 813-5682-2255'],
      ['company_email', 'info@murbaykonveksi.com'],
      ['company_address', 'Jl. Contoh Alamat Perusahaan'],
      ['company_city', 'Bandar Lampung'],
      ['whatsapp_number', '6281356822255'],
      ['whatsapp_message', 'Halo! Saya tertarik dengan layanan konveksi Anda.'],
      ['whatsapp_enabled', 'true'],
      ['meta_title', 'Murbay Konveksi - Spesialis Garmen & Konveksi Berkualitas Tinggi'],
      ['meta_description', 'Perusahaan konveksi terpercaya yang melayani berbagai kebutuhan fashion dan garmen dengan komitmen tinggi terhadap kualitas dan kepuasan pelanggan.']
    ];

    for (const [key, value] of defaultSettings) {
      const exists = this.db.prepare('SELECT 1 FROM settings WHERE setting_key = ?').get(key);
      if (!exists) {
        this.db.prepare('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)').run(key, value);
      }
    }
  }

  async query(sql: string, params: any[] = []): Promise<any[]> {
    try {
      const stmt = this.db.prepare(sql);
      if (params.length > 0) {
        return stmt.all(...params);
      } else {
        return stmt.all();
      }
    } catch (error) {
      console.error('Database query error:', error);
      console.error('SQL:', sql);
      console.error('Params:', params);
      throw error;
    }
  }

  async run(sql: string, params: any[] = []): Promise<{ lastInsertRowid: number; changes: number }> {
    try {
      const stmt = this.db.prepare(sql);
      const result = params.length > 0 ? stmt.run(...params) : stmt.run();
      return {
        lastInsertRowid: Number(result.lastInsertRowid),
        changes: result.changes
      };
    } catch (error) {
      console.error('Database run error:', error);
      throw error;
    }
  }

  close(): void {
    this.db.close();
  }
}

// PostgreSQL implementation for Supabase
class PostgreSQLConnection implements DatabaseConnection {
  private pool: Pool;

  constructor(connectionString: string) {
    this.pool = new Pool({
      connectionString: connectionString,
      ssl: process.env.NODE_ENV === 'production' 
        ? { rejectUnauthorized: false } // Untuk production dengan Supabase
        : undefined, // Tidak menggunakan SSL untuk development jika tidak diperlukan
    });

    // Initialize tables after connection is established
    this.initializeTables();
  }

  private async initializeTables() {
    // Services table
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(255),
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Gallery table
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS gallery (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // News table
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        featured_image VARCHAR(255),
        published_at TIMESTAMP WITH TIME ZONE,
        status VARCHAR(50) DEFAULT 'draft',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Testimonials table
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255),
        content TEXT NOT NULL,
        avatar_url VARCHAR(255),
        rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // FAQ table
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS faq (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category VARCHAR(100),
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Contact table
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS contact (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        replied_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Settings table
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        setting_key VARCHAR(255) UNIQUE NOT NULL,
        setting_value TEXT,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Roles table
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        permissions TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Admin users table
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        full_name VARCHAR(255),
        role_id INTEGER DEFAULT 1,
        theme_preference VARCHAR(255) DEFAULT 'adminlte-inspired',
        is_active BOOLEAN DEFAULT true,
        last_login TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        CONSTRAINT fk_admin_users_role FOREIGN KEY (role_id) REFERENCES roles (id)
      )
    `);

    // Insert default admin user if not exists
    const adminExists = await this.pool.query('SELECT 1 FROM admin_users WHERE username = $1', ['admin']);
    if (adminExists.rowCount === 0) {
      const bcrypt = require('bcryptjs');
      const saltRounds = 10;
      const passwordHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', saltRounds);
      
      await this.pool.query(`
        INSERT INTO admin_users (username, password_hash, full_name, email, role_id) 
        VALUES ($1, $2, $3, $4, $5)
      `, ['admin', passwordHash, 'Admin User', 'admin@example.com', 1]);
    }

    // Insert default settings if not exist
    const defaultSettings = [
      ['company_name', 'Murbay Konveksi'],
      ['company_tagline', 'Jagonya Konveksi'],
      ['company_phone', '+62 813-5682-2255'],
      ['company_email', 'info@murbaykonveksi.com'],
      ['company_address', 'Jl. Contoh Alamat Perusahaan'],
      ['company_city', 'Bandar Lampung'],
      ['whatsapp_number', '6281356822255'],
      ['whatsapp_message', 'Halo! Saya tertarik dengan layanan konveksi Anda.'],
      ['whatsapp_enabled', 'true'],
      ['meta_title', 'Murbay Konveksi - Spesialis Garmen & Konveksi Berkualitas Tinggi'],
      ['meta_description', 'Perusahaan konveksi terpercaya yang melayani berbagai kebutuhan fashion dan garmen dengan komitmen tinggi terhadap kualitas dan kepuasan pelanggan.']
    ];

    for (const [key, value] of defaultSettings) {
      const exists = await this.pool.query('SELECT 1 FROM settings WHERE setting_key = $1', [key]);
      if (exists.rowCount === 0) {
        await this.pool.query('INSERT INTO settings (setting_key, setting_value) VALUES ($1, $2)', [key, value]);
      }
    }
  }

  async query(sql: string, params: any[] = []): Promise<any[]> {
    try {
      const result = await this.pool.query(sql, params);
      return result.rows;
    } catch (error) {
      console.error('Database query error:', error);
      console.error('SQL:', sql);
      console.error('Params:', params);
      throw error;
    }
  }

  async run(sql: string, params: any[] = []): Promise<{ lastInsertRowid: number; changes: number }> {
    try {
      // Execute the query
      const result = await this.pool.query(sql, params);
      
      // For PostgreSQL, we'll return the rowCount as changes and use a placeholder for lastInsertRowid
      // since PostgreSQL doesn't have the same concept as SQLite
      return {
        lastInsertRowid: result.rowCount > 0 ? result.rowCount : 0, // This is not accurate for last inserted ID
        changes: result.rowCount
      };
    } catch (error) {
      console.error('Database run error:', error);
      throw error;
    }
  }

  close(): void {
    this.pool.end();
  }
}

// Database factory
export function createDatabaseConnection(): DatabaseConnection {
  const dbType = DATABASE_TYPE;
  const dbUrl = DATABASE_URL;

  if (dbType === 'postgresql' || dbType === 'postgres') {
    return new PostgreSQLConnection(dbUrl);
  } else if (dbType === 'sqlite') {
    const path = dbUrl.replace('sqlite:', '');
    return new SQLiteConnection(path);
  } else {
    throw new Error(`Unsupported database type: ${dbType}`);
  }
}

// Singleton database instance
let dbInstance: DatabaseConnection | null = null;

export function getDatabase(): DatabaseConnection {
  if (!dbInstance) {
    dbInstance = createDatabaseConnection();
  }
  return dbInstance;
}

// Helper function to close database connection
export function closeDatabaseConnection(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}