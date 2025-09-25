// src/lib/config.ts
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const DATABASE_TYPE = process.env.DATABASE_TYPE || 'sqlite';
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
export const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'default_session_secret_change_this_in_production';
export const NODE_ENV = process.env.NODE_ENV || 'development';