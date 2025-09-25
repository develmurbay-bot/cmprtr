# Panduan Migrasi ke Supabase

## Langkah-langkah Utama

### 1. Buat Project Supabase
- Login ke https://supabase.com
- Klik "New Project"
- Beri nama project (misal: `murbay-konveksi`)
- Pilih region terdekat
- Buat password database yang kuat

### 2. Setup Database di Supabase
- Buka SQL Editor di dashboard Supabase
- Jalankan script dari file `supabasesql.sql`
- Ini akan membuat semua tabel yang dibutuhkan

### 3. Dapatkan Connection String
- Di Project Settings > Database
- Salin "Direct URL" untuk production

### 4. Update Environment Variables di Vercel
```
DATABASE_TYPE = "postgresql"
DATABASE_URL = "[connection_string_supabase_kamu]"
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "passwordkuat"
ADMIN_SESSION_SECRET = "string_acak_kuat"
NODE_ENV = "production"
```

### 5. Deploy ke Vercel
- Perubahan terbaru sudah disimpan ke repository
- Vercel akan otomatis build dengan konfigurasi baru

## Perubahan yang Telah Dibuat

### File-file yang Diperbarui:
1. `src/lib/database.ts` - Sekarang mendukung PostgreSQL/Supabase sambil tetap mendukung SQLite
2. `package.json` - Menambahkan dependency `pg` untuk PostgreSQL
3. `src/lib/config.ts` - File konfigurasi environment variables
4. `src/lib/postgresql.ts` - File konfigurasi connection pool untuk PostgreSQL

### Fitur Baru:
- Database abstraction layer yang bisa bekerja dengan SQLite maupun PostgreSQL
- Otomatisasi membuat tabel saat aplikasi start
- Setup default admin user dan settings saat pertama kali dijalankan
- Error handling dan logging yang lebih baik

## Catatan Penting

1. Saat menggunakan PostgreSQL/Supabase, semua fitur aplikasi harus kompatibel dengan syntax PostgreSQL
2. Ada beberapa perbedaan kecil antara SQLite dan PostgreSQL:
   - AUTOINCREMENT pada SQLite menjadi SERIAL pada PostgreSQL
   - CURRENT_TIMESTAMP pada SQLite menjadi NOW() pada PostgreSQL
   - Tipe data BOOLEAN tersedia di PostgreSQL

3. Jika kamu ingin tetap menggunakan SQLite untuk development lokal dan PostgreSQL untuk production:
   - Set DATABASE_TYPE ke "sqlite" untuk development
   - Set DATABASE_TYPE ke "postgresql" untuk production

## Testing

Setelah deployment:
1. Pastikan aplikasi bisa connect ke database
2. Uji semua fitur CRUD di admin panel
3. Pastikan semua data ditampilkan dengan benar di frontend
4. Verifikasi bahwa data tersimpan dengan benar di Supabase

## Rollback Option

Jika terjadi masalah, kamu bisa dengan mudah kembali ke SQLite dengan mengubah environment variable:
- DATABASE_TYPE = "sqlite"
- DATABASE_URL = "sqlite:./database.db"

Namun perlu dicatat bahwa data antara SQLite dan PostgreSQL tidak akan sinkron jika kamu switch antara keduanya.