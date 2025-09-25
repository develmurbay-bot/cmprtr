'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import AdminNavigation from '@/components/kelola/AdminNavigation';

interface Settings {
  company_name: string;
  company_tagline: string;
  company_description: string;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  address_line_4: string;
  phone: string;
  email: string;
  whatsapp_number: string;
  whatsapp_message_template: string;
  whatsapp_enabled: string;
  google_maps_embed_url: string;
  google_maps_latitude: string;
  google_maps_longitude: string;
  vision: string;
  mission: string;
  values: string;
  satisfied_customers: string;
  products_sold: string;
  years_experience: string;
  satisfaction_rate: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  watermark_enabled: string;
  watermark_text: string;
  operating_hours_weekday: string;
  operating_hours_saturday: string;
  operating_hours_sunday: string;
  services_enabled: string;
  services_show_count: string;
  gallery_enabled: string;
  gallery_show_count: string;
  news_enabled: string;
  news_show_count: string;
  testimonials_enabled: string;
  testimonials_show_count: string;
  faq_enabled: string;
  faq_show_count: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    company_name: '',
    company_tagline: '',
    company_description: '',
    address_line_1: '',
    address_line_2: '',
    address_line_3: '',
    address_line_4: '',
    phone: '',
    email: '',
    whatsapp_number: '',
    whatsapp_message_template: '',
    whatsapp_enabled: 'true',
    google_maps_embed_url: '',
    google_maps_latitude: '',
    google_maps_longitude: '',
    vision: '',
    mission: '',
    values: '',
    satisfied_customers: '',
    products_sold: '',
    years_experience: '',
    satisfaction_rate: '',
    facebook_url: '',
    instagram_url: '',
    twitter_url: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    watermark_enabled: 'true',
    watermark_text: '',
    operating_hours_weekday: '',
    operating_hours_saturday: '',
    operating_hours_sunday: '',
    services_enabled: 'true',
    services_show_count: '5',
    gallery_enabled: 'true',
    gallery_show_count: '6',
    news_enabled: 'true',
    news_show_count: '3',
    testimonials_enabled: 'true',
    testimonials_show_count: '3',
    faq_enabled: 'true',
    faq_show_count: '5'
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      
      if (data.success && data.settings) {
        const settingsObj: any = {};
        data.settings.forEach((setting: any) => {
          settingsObj[setting.key] = setting.value || '';
        });
        setSettings(prev => ({ ...prev, ...settingsObj }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key: keyof Settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('Pengaturan berhasil disimpan!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Gagal menyimpan pengaturan: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Gagal menyimpan pengaturan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation title="Pengaturan Toko" showBackButton={false} />
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation title="Pengaturan Toko" showBackButton={false} />
      
      <div className="p-6 max-w-6xl mx-auto">
        {message && (
          <div className={`mb-6 p-4 rounded-md ${
            message.includes('berhasil') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-1">
            <TabsTrigger value="company">Informasi Toko</TabsTrigger>
            <TabsTrigger value="contact">Kontak</TabsTrigger>
            <TabsTrigger value="about">Tentang Kami</TabsTrigger>
            <TabsTrigger value="social">Media Sosial</TabsTrigger>
            <TabsTrigger value="maps">Peta-Jam-Footer</TabsTrigger>
            <TabsTrigger value="watermark">Watermark</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="display">Tampilan</TabsTrigger>
          </TabsList>

          {/* Company Information Tab */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Perusahaan</CardTitle>
                <CardDescription>
                  Kelola nama toko, jargon, dan deskripsi perusahaan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Nama Aplikasi/Toko *</Label>
                    <Input
                      id="company_name"
                      value={settings.company_name}
                      onChange={(e) => handleInputChange('company_name', e.target.value)}
                      placeholder="Murbay Konveksi"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_tagline">Jargon/Tagline *</Label>
                    <Input
                      id="company_tagline"
                      value={settings.company_tagline}
                      onChange={(e) => handleInputChange('company_tagline', e.target.value)}
                      placeholder="Spesialis Garmen & Konveksi Berkualitas Tinggi"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company_description">Deskripsi Perusahaan</Label>
                  <Textarea
                    id="company_description"
                    value={settings.company_description}
                    onChange={(e) => handleInputChange('company_description', e.target.value)}
                    placeholder="Deskripsi singkat tentang perusahaan..."
                    rows={4}
                  />
                </div>

                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Statistik Perusahaan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="satisfied_customers">Pelanggan Puas</Label>
                      <Input
                        id="satisfied_customers"
                        value={settings.satisfied_customers}
                        onChange={(e) => handleInputChange('satisfied_customers', e.target.value)}
                        placeholder="2500+"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="products_sold">Produk Terjual</Label>
                      <Input
                        id="products_sold"
                        value={settings.products_sold}
                        onChange={(e) => handleInputChange('products_sold', e.target.value)}
                        placeholder="50K+"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="years_experience">Tahun Pengalaman</Label>
                      <Input
                        id="years_experience"
                        value={settings.years_experience}
                        onChange={(e) => handleInputChange('years_experience', e.target.value)}
                        placeholder="25+"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="satisfaction_rate">Tingkat Kepuasan</Label>
                      <Input
                        id="satisfaction_rate"
                        value={settings.satisfaction_rate}
                        onChange={(e) => handleInputChange('satisfaction_rate', e.target.value)}
                        placeholder="99%"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Information Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
                <CardDescription>
                  Kelola alamat, nomor telepon, email, dan WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Alamat Lengkap</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address_line_1">Alamat Baris 1 *</Label>
                      <Input
                        id="address_line_1"
                        value={settings.address_line_1}
                        onChange={(e) => handleInputChange('address_line_1', e.target.value)}
                        placeholder="Jl. Nawawi Gelar Dalam Gg. KENANGA No.73"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address_line_2">Alamat Baris 2</Label>
                      <Input
                        id="address_line_2"
                        value={settings.address_line_2}
                        onChange={(e) => handleInputChange('address_line_2', e.target.value)}
                        placeholder="Rajabasa Jaya"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address_line_3">Alamat Baris 3</Label>
                      <Input
                        id="address_line_3"
                        value={settings.address_line_3}
                        onChange={(e) => handleInputChange('address_line_3', e.target.value)}
                        placeholder="Bandar Lampung"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address_line_4">Alamat Baris 4</Label>
                      <Input
                        id="address_line_4"
                        value={settings.address_line_4}
                        onChange={(e) => handleInputChange('address_line_4', e.target.value)}
                        placeholder="Lampung, Indonesia"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Kontak</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon *</Label>
                      <Input
                        id="phone"
                        value={settings.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+6281356822255"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="adminmurbay@tes.com"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">WhatsApp</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="whatsapp_enabled"
                        checked={settings.whatsapp_enabled === 'true'}
                        onCheckedChange={(checked) => handleInputChange('whatsapp_enabled', checked ? 'true' : 'false')}
                      />
                      <Label htmlFor="whatsapp_enabled">Aktifkan WhatsApp Floating Button</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp_number">Nomor WhatsApp *</Label>
                      <Input
                        id="whatsapp_number"
                        value={settings.whatsapp_number}
                        onChange={(e) => handleInputChange('whatsapp_number', e.target.value)}
                        placeholder="6281356822255"
                      />
                      <p className="text-sm text-gray-500">Format: 6281234567890 (tanpa tanda +)</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp_message_template">Template Pesan WhatsApp</Label>
                      <Textarea
                        id="whatsapp_message_template"
                        value={settings.whatsapp_message_template}
                        onChange={(e) => handleInputChange('whatsapp_message_template', e.target.value)}
                        placeholder="Halo, saya tertarik dengan layanan konveksi Murbay Konveksi. Bisakah saya mendapat informasi lebih lanjut?"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Us Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Tentang Kami</CardTitle>
                <CardDescription>
                  Kelola visi, misi, dan nilai-nilai perusahaan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="vision">Visi Perusahaan</Label>
                  <Textarea
                    id="vision"
                    value={settings.vision}
                    onChange={(e) => handleInputChange('vision', e.target.value)}
                    placeholder="Menjadi perusahaan konveksi terdepan di Indonesia yang mengutamakan kualitas dan kepuasan pelanggan."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mission">Misi Perusahaan</Label>
                  <Textarea
                    id="mission"
                    value={settings.mission}
                    onChange={(e) => handleInputChange('mission', e.target.value)}
                    placeholder="Memberikan layanan konveksi terbaik dengan menggunakan teknologi modern dan tenaga kerja yang profesional untuk menghasilkan produk berkualitas tinggi."
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="values">Nilai-Nilai Perusahaan</Label>
                  <Textarea
                    id="values"
                    value={settings.values}
                    onChange={(e) => handleInputChange('values', e.target.value)}
                    placeholder="Kualitas, Integritas, Inovasi, Kepuasan Pelanggan, Profesionalisme"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Media Sosial</CardTitle>
                <CardDescription>
                  Kelola link media sosial perusahaan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="facebook_url">Facebook URL</Label>
                  <Input
                    id="facebook_url"
                    value={settings.facebook_url}
                    onChange={(e) => handleInputChange('facebook_url', e.target.value)}
                    placeholder="https://facebook.com/murbaykonveksi"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instagram_url">Instagram URL</Label>
                  <Input
                    id="instagram_url"
                    value={settings.instagram_url}
                    onChange={(e) => handleInputChange('instagram_url', e.target.value)}
                    placeholder="https://instagram.com/murbaykonveksi"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twitter_url">Twitter URL</Label>
                  <Input
                    id="twitter_url"
                    value={settings.twitter_url}
                    onChange={(e) => handleInputChange('twitter_url', e.target.value)}
                    placeholder="https://twitter.com/murbaykonveksi"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Maps & Operating Hours Tab */}
          <TabsContent value="maps">
            <Card>
              <CardHeader>
                <CardTitle>Google Maps & Jam Operasional</CardTitle>
                <CardDescription>
                  Kelola lokasi Google Maps dan jam operasional
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Google Maps</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="google_maps_embed_url">Google Maps Embed URL</Label>
                      <Textarea
                        id="google_maps_embed_url"
                        value={settings.google_maps_embed_url}
                        onChange={(e) => handleInputChange('google_maps_embed_url', e.target.value)}
                        placeholder="https://www.google.com/maps/embed?pb=..."
                        rows={3}
                      />
                      <p className="text-sm text-gray-500">
                        Dapatkan embed URL dari Google Maps → Share → Embed a map
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="google_maps_latitude">Latitude</Label>
                        <Input
                          id="google_maps_latitude"
                          value={settings.google_maps_latitude}
                          onChange={(e) => handleInputChange('google_maps_latitude', e.target.value)}
                          placeholder="-5.3971"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="google_maps_longitude">Longitude</Label>
                        <Input
                          id="google_maps_longitude"
                          value={settings.google_maps_longitude}
                          onChange={(e) => handleInputChange('google_maps_longitude', e.target.value)}
                          placeholder="105.2668"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Jam Operasional</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="operating_hours_weekday">Senin - Jumat</Label>
                      <Input
                        id="operating_hours_weekday"
                        value={settings.operating_hours_weekday}
                        onChange={(e) => handleInputChange('operating_hours_weekday', e.target.value)}
                        placeholder="08:00 - 17:00 WIB"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="operating_hours_saturday">Sabtu</Label>
                      <Input
                        id="operating_hours_saturday"
                        value={settings.operating_hours_saturday}
                        onChange={(e) => handleInputChange('operating_hours_saturday', e.target.value)}
                        placeholder="08:00 - 15:00 WIB"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="operating_hours_sunday">Minggu</Label>
                      <Input
                        id="operating_hours_sunday"
                        value={settings.operating_hours_sunday}
                        onChange={(e) => handleInputChange('operating_hours_sunday', e.target.value)}
                        placeholder="Tutup"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Watermark Tab */}
          <TabsContent value="watermark">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Watermark</CardTitle>
                <CardDescription>
                  Kelola watermark untuk gambar yang diupload
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="watermark_enabled"
                    checked={settings.watermark_enabled === 'true'}
                    onCheckedChange={(checked) => handleInputChange('watermark_enabled', checked ? 'true' : 'false')}
                  />
                  <Label htmlFor="watermark_enabled">Aktifkan Watermark pada Gambar</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="watermark_text">Teks Watermark</Label>
                  <Input
                    id="watermark_text"
                    value={settings.watermark_text}
                    onChange={(e) => handleInputChange('watermark_text', e.target.value)}
                    placeholder="Murbay Konveksi"
                    disabled={settings.watermark_enabled !== 'true'}
                  />
                  <p className="text-sm text-gray-500">
                    Teks ini akan ditambahkan sebagai watermark pada setiap gambar yang diupload
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Informasi Watermark</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Watermark akan diterapkan secara otomatis saat upload gambar</li>
                    <li>• Posisi watermark akan ditempatkan di sudut kanan bawah</li>
                    <li>• Watermark menggunakan transparansi untuk tidak mengganggu gambar</li>
                    <li>• Pengaturan ini berlaku untuk semua upload gambar baru</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Kelola meta tags untuk optimasi mesin pencari
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={settings.meta_title}
                    onChange={(e) => handleInputChange('meta_title', e.target.value)}
                    placeholder="Murbay Konveksi - Spesialis Garmen & Konveksi Berkualitas Tinggi"
                  />
                  <p className="text-sm text-gray-500">Maksimal 60 karakter</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    value={settings.meta_description}
                    onChange={(e) => handleInputChange('meta_description', e.target.value)}
                    placeholder="Layanan konveksi profesional dengan kualitas terbaik. Melayani pembuatan seragam, pakaian kustom, dan produksi massal dengan harga kompetitif."
                    rows={3}
                  />
                  <p className="text-sm text-gray-500">Maksimal 160 karakter</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meta_keywords">Meta Keywords</Label>
                  <Input
                    id="meta_keywords"
                    value={settings.meta_keywords}
                    onChange={(e) => handleInputChange('meta_keywords', e.target.value)}
                    placeholder="konveksi, garmen, seragam, pakaian kustom, produksi massal"
                  />
                  <p className="text-sm text-gray-500">Pisahkan dengan koma</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Display Settings Tab */}
          <TabsContent value="display">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Tampilan Section</CardTitle>
                <CardDescription>
                  Kelola section mana yang ditampilkan di halaman utama dan jumlah item yang ditampilkan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Informasi Pengaturan Tampilan</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Section yang dinonaktifkan tidak akan muncul di halaman utama</li>
                    <li>• Jumlah item yang ditampilkan dapat disesuaikan untuk setiap section</li>
                    <li>• Perubahan akan langsung terlihat setelah pengaturan disimpan</li>
                    <li>• Menu navigasi akan otomatis menyesuaikan dengan section yang aktif</li>
                  </ul>
                </div>

                {/* Services Section */}
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Section Layanan</h3>
                      <p className="text-sm text-gray-500">Tampilkan section layanan di halaman utama</p>
                    </div>
                    <Switch
                      checked={settings.services_enabled === 'true'}
                      onCheckedChange={(checked) => handleInputChange('services_enabled', checked ? 'true' : 'false')}
                    />
                  </div>
                  {settings.services_enabled === 'true' && (
                    <div className="space-y-2">
                      <Label htmlFor="services_show_count">Jumlah Layanan yang Ditampilkan</Label>
                      <Input
                        id="services_show_count"
                        type="number"
                        value={settings.services_show_count}
                        onChange={(e) => handleInputChange('services_show_count', e.target.value)}
                        min="1"
                        max="20"
                      />
                    </div>
                  )}
                </div>

                {/* Gallery Section */}
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Section Galeri</h3>
                      <p className="text-sm text-gray-500">Tampilkan section galeri di halaman utama</p>
                    </div>
                    <Switch
                      checked={settings.gallery_enabled === 'true'}
                      onCheckedChange={(checked) => handleInputChange('gallery_enabled', checked ? 'true' : 'false')}
                    />
                  </div>
                  {settings.gallery_enabled === 'true' && (
                    <div className="space-y-2">
                      <Label htmlFor="gallery_show_count">Jumlah Gambar Galeri yang Ditampilkan</Label>
                      <Input
                        id="gallery_show_count"
                        type="number"
                        value={settings.gallery_show_count}
                        onChange={(e) => handleInputChange('gallery_show_count', e.target.value)}
                        min="1"
                        max="20"
                      />
                    </div>
                  )}
                </div>

                {/* News Section */}
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Section Berita</h3>
                      <p className="text-sm text-gray-500">Tampilkan section berita di halaman utama</p>
                    </div>
                    <Switch
                      checked={settings.news_enabled === 'true'}
                      onCheckedChange={(checked) => handleInputChange('news_enabled', checked ? 'true' : 'false')}
                    />
                  </div>
                  {settings.news_enabled === 'true' && (
                    <div className="space-y-2">
                      <Label htmlFor="news_show_count">Jumlah Berita yang Ditampilkan</Label>
                      <Input
                        id="news_show_count"
                        type="number"
                        value={settings.news_show_count}
                        onChange={(e) => handleInputChange('news_show_count', e.target.value)}
                        min="1"
                        max="20"
                      />
                    </div>
                  )}
                </div>

                {/* Testimonials Section */}
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Section Testimoni</h3>
                      <p className="text-sm text-gray-500">Tampilkan section testimoni di halaman utama</p>
                    </div>
                    <Switch
                      checked={settings.testimonials_enabled === 'true'}
                      onCheckedChange={(checked) => handleInputChange('testimonials_enabled', checked ? 'true' : 'false')}
                    />
                  </div>
                  {settings.testimonials_enabled === 'true' && (
                    <div className="space-y-2">
                      <Label htmlFor="testimonials_show_count">Jumlah Testimoni yang Ditampilkan</Label>
                      <Input
                        id="testimonials_show_count"
                        type="number"
                        value={settings.testimonials_show_count}
                        onChange={(e) => handleInputChange('testimonials_show_count', e.target.value)}
                        min="1"
                        max="20"
                      />
                    </div>
                  )}
                </div>

                {/* FAQ Section */}
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Section FAQ</h3>
                      <p className="text-sm text-gray-500">Tampilkan section FAQ di halaman utama</p>
                    </div>
                    <Switch
                      checked={settings.faq_enabled === 'true'}
                      onCheckedChange={(checked) => handleInputChange('faq_enabled', checked ? 'true' : 'false')}
                    />
                  </div>
                  {settings.faq_enabled === 'true' && (
                    <div className="space-y-2">
                      <Label htmlFor="faq_show_count">Jumlah FAQ yang Ditampilkan</Label>
                      <Input
                        id="faq_show_count"
                        type="number"
                        value={settings.faq_show_count}
                        onChange={(e) => handleInputChange('faq_show_count', e.target.value)}
                        min="1"
                        max="20"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} disabled={saving} className="px-6">
            {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
          </Button>
        </div>
      </div>
    </div>
  );
}
