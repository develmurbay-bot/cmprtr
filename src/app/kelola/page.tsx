'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminNavigation from '@/components/kelola/AdminNavigation';

interface Stats {
  services: number;
  gallery: number;
  news: number;
  testimonials: number;
  faq: number;
  contacts: number;
}

interface Settings {
  company_name: string;
  company_tagline: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    services: 0,
    gallery: 0,
    news: 0,
    testimonials: 0,
    faq: 0,
    contacts: 0
  });
  const [settings, setSettings] = useState<Settings>({
    company_name: 'Murbay Konveksisadasd',
    company_tagline: 'Spesialis Garmen dan Konveksi Berkualitas'
  });

  useEffect(() => {
    if (!user) {
      router.push('/kelola/login');
      return;
    }

    // Load stats and settings
    loadStats();
    loadSettings();
  }, [user, router]);

  const loadStats = async () => {
    try {
      const endpoints = ['services', 'gallery', 'news', 'testimonials', 'faq', 'contact'];
      const promises = endpoints.map(endpoint => 
        fetch(`/api/${endpoint}`).then(res => res.json())
      );
      
      const results = await Promise.all(promises);
      setStats({
        services: results[0]?.length || 0,
        gallery: results[1]?.length || 0,
        news: results[2]?.length || 0,
        testimonials: results[3]?.length || 0,
        faq: results[4]?.length || 0,
        contacts: results[5]?.length || 0,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.settings) {
          // Convert array format to object
          const settingsObj: any = {};
          data.settings.forEach((setting: any) => {
            settingsObj[setting.key] = setting.value;
          });
          
          setSettings({
            company_name: settingsObj.company_name || 'Murbay Konveksi',
            company_tagline: settingsObj.company_tagline || 'Spesialis Garmen dan Konveksi Berkualitas'
          });
        }
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const menuItems = [
    {
      title: 'Layanan',
      description: 'Kelola layanan konveksi',
      count: stats.services,
      href: '/kelola/services',
      color: 'bg-blue-500'
    },
    {
      title: 'Galeri',
      description: 'Kelola galeri portofolio',
      count: stats.gallery,
      href: '/kelola/gallery',
      color: 'bg-green-500'
    },
    {
      title: 'Berita & Artikel',
      description: 'Kelola konten berita',
      count: stats.news,
      href: '/kelola/news',
      color: 'bg-purple-500'
    },
    {
      title: 'Testimoni',
      description: 'Kelola testimoni pelanggan',
      count: stats.testimonials,
      href: '/kelola/testimonials',
      color: 'bg-yellow-500'
    },
    {
      title: 'FAQ',
      description: 'Kelola pertanyaan umum',
      count: stats.faq,
      href: '/kelola/faq',
      color: 'bg-red-500'
    },
    {
      title: 'Kontak',
      description: 'Kelola pesan kontak',
      count: stats.contacts,
      href: '/kelola/contact',
      color: 'bg-indigo-500'
    }
  ];

  // Only show "Pengaturan Toko" and "Kelola User Petugas" for admin role
  console.log('User role check:', user?.role, user);
  if (user?.role === 'admin') {
    console.log('Adding admin-only menu items');
    menuItems.push(
      {
        title: 'Pengaturan Toko',
        description: 'Kelola informasi toko',
        count: 1,
        href: '/kelola/settings',
        color: 'bg-gray-500'
      },
      {
        title: 'Kelola User Petugas',
        description: 'Manajemen user dan petugas',
        count: 1,
        href: '/kelola/users',
        color: 'bg-orange-500'
      }
    );
  } else {
    console.log('User is not admin, role:', user?.role);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation title="Dashboard Admin" showBackButton={false} />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Selamat datang, {user.full_name || user.username}!
          </h2>
          <p className="text-gray-600">
            Kelola konten dan pengaturan {settings.company_name} dari dashboard ini.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Layanan</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.services}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Galeri</p>
                  <p className="text-3xl font-bold text-green-600">{stats.gallery}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Berita</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.news}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-500 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pesan Kontak</p>
                  <p className="text-3xl font-bold text-red-600">{stats.contacts}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-500 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`}>
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => router.push(item.href)}
                >
                  Kelola {item.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
              <CardDescription>Akses cepat ke fungsi-fungsi penting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={() => router.push('/kelola/services')} className="h-12">
                  + Tambah Layanan Baru
                </Button>
                <Button onClick={() => router.push('/kelola/news')} variant="outline" className="h-12">
                  + Tulis Artikel Baru
                </Button>
                <Button onClick={() => router.push('/kelola/gallery')} variant="outline" className="h-12">
                  + Upload Gambar Galeri
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
