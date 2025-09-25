# Implementation Plan - Admin Dashboard Improvements

## 1. Dashboard Admin - Button Logout ke Dropdown Profile ✅
- AdminNavigation.tsx sudah memiliki dropdown profile yang lengkap
- Sudah ada: Ubah Profile, Ganti Password, Logout
- Perlu ditambahkan: Kelola User-Petugas

## 2. Button "Lihat Website" - Open New Window
- Saat ini: `onClick={() => router.push('/')}`
- Perlu diubah: `onClick={() => window.open('/', '_blank')}`
- Fix visibility issue: button text tidak terlihat tanpa hover

## 3. Script JS untuk Ubah Password Admin
- Buat script untuk test change password
- Test login dengan password baru
- Kembalikan ke default admin/admin123

## 4. Seed User Petugas + Role System
- Tambah table roles
- Seed user petugas/petugas123
- Role-based access: petugas tidak bisa akses "Pengaturan Toko"
- Update database schema dan seed data

## Files to Update:
1. src/app/admin/page.tsx - Fix "Lihat Website" button
2. src/lib/database.ts - Add roles table
3. src/data/seedData.ts - Add petugas user
4. src/components/admin/AdminNavigation.tsx - Add "Kelola User" menu
5. Create: src/app/admin/users/page.tsx - User management
6. Create: test-password-change.js - Password testing script
7. Update: Auth system for role-based access
