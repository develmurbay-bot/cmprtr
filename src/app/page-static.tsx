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

export const metadata: Metadata = {
  title: 'Murbay Konveksi - Spesialis Garmen dan Konveksi Berkualitas',
  description: 'Layanan konveksi profesional untuk seragam, pakaian kustom, dan produksi massal. Kualitas tinggi, harga kompetitif, pengalaman 10+ tahun.',
  keywords: 'konveksi, garmen, seragam, pakaian kustom, jahit, bordir, fashion, bandung',
  openGraph: {
    title: 'Murbay Konveksi - Spesialis Garmen dan Konveksi Berkualitas',
    description: 'Layanan konveksi profesional untuk seragam, pakaian kustom, dan produksi massal. Kualitas tinggi, harga kompetitif, pengalaman 10+ tahun.',
    url: 'https://murbaykonveksi.com',
    siteName: 'Murbay Konveksi',
    images: [
      {
        url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e67a0f7c-a02b-48ac-9620-4a8b37f5ee2d.png',
        width: 1200,
        height: 630,
        alt: 'Murbay Konveksi - Professional Garment Manufacturing Services',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Murbay Konveksi - Spesialis Garmen dan Konveksi Berkualitas',
    description: 'Layanan konveksi profesional untuk seragam, pakaian kustom, dan produksi massal. Kualitas tinggi, harga kompetitif, pengalaman 10+ tahun.',
    images: ['https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e67a0f7c-a02b-48ac-9620-4a8b37f5ee2d.png'],
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">Murbay Konveksi</h1>
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
