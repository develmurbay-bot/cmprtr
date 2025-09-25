'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminNavigation from '@/components/kelola/AdminNavigation';
import {
  CompanyTab,
  ContactTab,
  AboutTab,
  SocialTab,
  MapsTab,
  WatermarkTab,
  SEOTab,
  DisplayTab,
  Settings
} from '@/components/kelola/settings';

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

          <TabsContent value="company">
            <CompanyTab settings={settings} onSettingsChange={handleInputChange} />
          </TabsContent>

          <TabsContent value="contact">
            <ContactTab settings={settings} onSettingsChange={handleInputChange} />
          </TabsContent>

          <TabsContent value="about">
            <AboutTab settings={settings} onSettingsChange={handleInputChange} />
          </TabsContent>

          <TabsContent value="social">
            <SocialTab settings={settings} onSettingsChange={handleInputChange} />
          </TabsContent>

          <TabsContent value="maps">
            <MapsTab settings={settings} onSettingsChange={handleInputChange} />
          </TabsContent>

          <TabsContent value="watermark">
            <WatermarkTab settings={settings} onSettingsChange={handleInputChange} />
          </TabsContent>

          <TabsContent value="seo">
            <SEOTab settings={settings} onSettingsChange={handleInputChange} />
          </TabsContent>

          <TabsContent value="display">
            <DisplayTab settings={settings} onSettingsChange={handleInputChange} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-6">
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="px-8"
          >
            {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
          </Button>
        </div>
      </div>
    </div>
  );
}
