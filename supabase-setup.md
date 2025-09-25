# Konfigurasi Database untuk Supabase

## Perubahan yang Diperlukan

### 1. Environment Variables di Vercel
- DATABASE_TYPE = "postgresql"
- DATABASE_URL = "[connection_string_supabase_kamu]"
- ADMIN_USERNAME = "admin"
- ADMIN_PASSWORD = "passwordkuat"
- ADMIN_SESSION_SECRET = "string_acak_kuat"
- NODE_ENV = "production"

### 2. Dependencies yang Dibutuhkan
Tambahkan ke package.json:
```json
{
  "dependencies": {
    "pg": "^8.11.3"
  }
}
```

### 3. Struktur Database
SQL script untuk membuat tabel-tabel sudah disediakan di `supabasesql.sql`

### 4. File-file Pendukung
- `src/lib/postgresql.ts` - Konfigurasi connection pool untuk PostgreSQL
- `src/lib/config.ts` - Konfigurasi environment variables

## Cara Implementasi

1. Jalankan SQL dari `supabasesql.sql` di SQL Editor Supabase
2. Update `src/lib/database.ts` untuk menggunakan PostgreSQL saat DATABASE_TYPE adalah 'postgresql'
3. Tambahkan dependencies ke package.json
4. Tambahkan environment variables di Vercel
5. Deploy aplikasi

## Catatan Penting
- Karena sebelumnya kamu menggunakan SQLite, kamu mungkin perlu membuat wrapper yang bisa bekerja dengan kedua jenis database
- Sesuaikan file `src/lib/database.ts` agar bisa mendeteksi jenis database dan menggunakan konfigurasi yang sesuai