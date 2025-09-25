'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import ServicesSection from '@/components/landing/ServicesSection';
import GallerySection from '@/components/landing/GallerySection';
import NewsSection from '@/components/landing/NewsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FAQSection from '@/components/landing/FAQSection';
import ContactSection from '@/components/landing/ContactSection-fixed';
import Footer from '@/components/landing/Footer';
import WhatsAppButton from '@/components/landing/WhatsAppButton-fixed';

interface Settings {
  company_name: string;
  meta_title: string;
  meta_description: string;
}

export default function HomePage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        if (data.success && data.settings) {
          // Convert array format to object
          const settingsObj: any = {};
          data.settings.forEach((setting: any) => {
            settingsObj[setting.key] = setting.value;
          });
          
          setSettings({
            company_name: settingsObj.company_name || 'Murbay Konveksi',
            meta_title: settingsObj.meta_title || 'Murbay Konveksi - Spesialis Garmen dan Konveksi Berkualitas',
            meta_description: settingsObj.meta_description || 'Layanan konveksi profesional untuk seragam, pakaian kustom, dan produksi massal.'
          });

          // Update document title dynamically
          if (settingsObj.meta_title) {
            document.title = settingsObj.meta_title;
          }

          // Update meta description
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription && settingsObj.meta_description) {
            metaDescription.setAttribute('content', settingsObj.meta_description);
          }
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <NewsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
