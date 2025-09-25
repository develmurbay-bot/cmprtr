'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import ServicesSection from '@/components/landing/ServicesSection';
import GallerySection from '@/components/landing/GallerySection';
import NewsSection from '@/components/landing/NewsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FAQSection from '@/components/landing/FAQSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import WhatsAppButton from '@/components/landing/WhatsAppButton-fixed';

interface Settings {
  company_name?: string;
  company_tagline?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  services_enabled?: string | boolean;
  services_show_count?: string;
  gallery_enabled?: string | boolean;
  gallery_show_count?: string;
  news_enabled?: string | boolean;
  news_show_count?: string;
  testimonials_enabled?: string | boolean;
  testimonials_show_count?: string;
  faq_enabled?: string | boolean;
  faq_show_count?: string;
}

export default function HomePage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        
        if (data.success && data.settings) {
          const settingsObj: any = {};
          data.settings.forEach((setting: any) => {
            settingsObj[setting.key] = setting.value || '';
          });
          setSettings(settingsObj);
          
          // Update document title dynamically
          if (settingsObj.meta_title) {
            document.title = settingsObj.meta_title;
          } else if (settingsObj.company_name && settingsObj.company_tagline) {
            document.title = `${settingsObj.company_name} - ${settingsObj.company_tagline}`;
          }
          
          // Update meta description
          if (settingsObj.meta_description) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
              metaDesc.setAttribute('content', settingsObj.meta_description);
            } else {
              // Create meta description if it doesn't exist
              const meta = document.createElement('meta');
              meta.name = 'description';
              meta.content = settingsObj.meta_description;
              document.head.appendChild(meta);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const companyName = settings.company_name || 'src-app-page compName';

  // Helper function to check if section is enabled
  const isEnabled = (value: string | boolean | undefined): boolean => {
    return value === true || value === 'true';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat halaman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-black-900">
                {companyName}
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-black-900 hover:text-black-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Beranda
                </a>
                <a href="#about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Tentang
                </a>
                {isEnabled(settings.services_enabled) && (
                  <a href="#services" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Layanan
                  </a>
                )}
                {isEnabled(settings.gallery_enabled) && (
                  <a href="#gallery" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Galeri
                  </a>
                )}
                {isEnabled(settings.news_enabled) && (
                  <a href="#news" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Berita
                  </a>
                )}
                <a href="#contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Kontak
                </a>
              </div>
            </div>
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <section id="home">
          <HeroSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        {isEnabled(settings.services_enabled) && (
          <section id="services">
            <ServicesSection />
          </section>
        )}

        {isEnabled(settings.gallery_enabled) && (
          <section id="gallery">
            <GallerySection />
          </section>
        )}

        {isEnabled(settings.news_enabled) && (
          <section id="news">
            <NewsSection />
          </section>
        )}

        {isEnabled(settings.testimonials_enabled) && (
          <section id="testimonials">
            <TestimonialsSection />
          </section>
        )}

        {isEnabled(settings.faq_enabled) && (
          <section id="faq">
            <FAQSection />
          </section>
        )}

        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}
