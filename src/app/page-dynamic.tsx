'use client';

import { useEffect, useState } from 'react';
import { Metadata } from 'next';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import ServicesSection from '@/components/landing/ServicesSection';
import GallerySection from '@/components/landing/GallerySection';
import NewsSection from '@/components/landing/NewsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FAQSection from '@/components/landing/FAQSection';
import ContactSection from '@/components/landing/ContactSectionDynamic';
import Footer from '@/components/landing/Footer';
import WhatsAppButton from '@/components/landing/WhatsAppButton--ooold';

interface Settings {
  company_name?: string;
  company_tagline?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
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

  const companyName = settings.company_name || 'failed-pagedyn-compName';

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">
                {loading ? (
                  <div className="animate-pulse bg-gray-300 h-6 w-32 rounded"></div>
                ) : (
                  companyName
                )}
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Beranda
                </a>
                <a href="#about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Tentang
                </a>
                <a href="#services" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Layanan
                </a>
                <a href="#gallery" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Galeri
                </a>
                <a href="#news" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Berita
                </a>
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

        <section id="services">
          <ServicesSection />
        </section>

        <section id="gallery">
          <GallerySection />
        </section>

        <section id="news">
          <NewsSection />
        </section>

        <section id="testimonials">
          <TestimonialsSection />
        </section>

        <section id="faq">
          <FAQSection />
        </section>

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
