import { Pool } from 'pg';
import { DATABASE_URL } from './config';

// Membuat connection pool untuk PostgreSQL
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } // Untuk production dengan Supabase
    : undefined, // Tidak menggunakan SSL untuk development jika tidak diperlukan
});

// Fungsi untuk mendapatkan koneksi
export const getConnection = async () => {
  return await pool.connect();
};

// Ekspor pool untuk digunakan di seluruh aplikasi
export { pool };