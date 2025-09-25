"use client";

import { useEffect, useState } from 'react';
import { getDefaultSettings, getCurrentYear, type AppSettings } from '@/lib/settings';

export default function Footer() {
  const [settings, setSettings] = useState<AppSettings>(getDefaultSettings());

  useEffect(() => {
    // Try to fetch settings from API
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.settings) {
            // Convert array of key-value pairs to flat object
            const settingsObj: any = {};
            data.settings.forEach((setting: any) => {
              settingsObj[setting.key] = setting.value;
            });
            setSettings({ ...getDefaultSettings(), ...settingsObj });
          }
        }
      } catch (error) {
        console.warn('Failed to fetch settings for footer:', error);
      }
    };

    fetchSettings();
  }, []);

  const currentYear = getCurrentYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">{settings.company_name}</h3>
            <p className="text-gray-300 mb-4">
              {settings.footer_text || settings.company_description}
            </p>
            <div className="space-y-2 text-gray-300"> 
              <p>{settings.company_address}</p>
              <p>{settings.company_city}</p>
              {/* <p>{settings.company_phone}</p> */}
              <p>{settings.phone}</p>
              <p>{settings.email}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#beranda" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#tentang" className="hover:text-white transition-colors">Tentang</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">Layanan</a></li>
              <li><a href="#galeri" className="hover:text-white transition-colors">Galeri</a></li>
              <li><a href="#berita" className="hover:text-white transition-colors">Berita</a></li>
              <li><a href="#kontak" className="hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Jam Operasional</h4>
            <div className="space-y-2 text-gray-300">
              <p>Senin - Jumat</p>
              <p className="text-sm">{settings.business_hours_weekday}</p>
              <p>Sabtu</p>
              <p className="text-sm">{settings.business_hours_saturday}</p>
              <p>Minggu</p>
              <p className="text-sm">{settings.business_hours_sunday}</p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        {settings.footer_show_social_links && (
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex space-x-6 mb-4 sm:mb-0">
                {settings.social_facebook && (
                  <a 
                    href={settings.social_facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                )}
                {settings.social_instagram && (
                  <a 
                    href={settings.social_instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {settings.social_twitter && (
                  <a 
                    href={settings.social_twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                )}
                {settings.social_linkedin && (
                  <a 
                    href={settings.social_linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {settings.social_youtube && (
                  <a 
                    href={settings.social_youtube} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    YouTube
                  </a>
                )}
              </div>

              {/* Sharing Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    const url = window.location.href;
                    const text = `Lihat ${settings.company_name} - ${settings.company_tagline}`;
                    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Bagikan ke WhatsApp
                </button>
                <button
                  onClick={() => {
                    const url = window.location.href;
                    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    window.open(facebookUrl, '_blank');
                  }}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Bagikan ke Facebook
                </button>
                <button
                  onClick={() => {
                    const url = window.location.href;
                    const text = `${settings.company_name} - ${settings.company_tagline}`;
                    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                    window.open(twitterUrl, '_blank');
                  }}
                  className="text-gray-300 hover:text-blue-300 transition-colors text-sm"
                >
                  Bagikan ke Twitter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {currentYear} {settings.company_name}. {settings.footer_copyright_text || 'Semua hak cipta dilindungi.rf'}
          </p>
          <p className="text-sm mt-2">
            Dibuat dengan ❤️❤️❤️ untuk melayani kebutuhan Anda
          </p>
        </div>
      </div>
    </footer>
  );
}
