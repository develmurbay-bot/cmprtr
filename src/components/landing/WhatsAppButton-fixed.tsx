"use client";

import { useEffect, useState } from 'react';

interface Settings {
  whatsapp_number: string;
  whatsapp_message_template: string;
  whatsapp_enabled: boolean;
}

export default function WhatsAppButton() {
  const [settings, setSettings] = useState<Settings>({
    whatsapp_number: '6281356822255',
    whatsapp_message_template: 'Halo! Saya tertarik dengan layanan konveksi Anda.fixed',
    whatsapp_enabled: true
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.settings) {
            // Convert array format to object
            const settingsObj: Record<string, string> = {};
            data.settings.forEach((setting: { key: string; value: string }) => {
              settingsObj[setting.key] = setting.value;
            });
            
            setSettings({
              whatsapp_number: settingsObj.whatsapp_number || '6281356822255',
              whatsapp_message_template: settingsObj.whatsapp_message_template || 'Halo! Saya tertarik dengan layanan konveksi Anda.',
              whatsapp_enabled: settingsObj.whatsapp_enabled === 'true' || settingsObj.whatsapp_enabled === '1' || settingsObj.whatsapp_enabled === 'yes' || settingsObj.whatsapp_enabled === 'on'
            });
          }
        }
      } catch (error) {
        console.warn('Failed to fetch settings for WhatsApp button:', error);
      }
    };

    fetchSettings();
  }, []);

  // Don't render if WhatsApp is disabled
  if (!settings.whatsapp_enabled) {
    return null;
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(settings.whatsapp_message_template);
    const whatsappUrl = `https://wa.me/${settings.whatsapp_number}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
        title="Chat dengan kami di WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
        </svg>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Chat dengan kami di WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>
    </div>
  );
}
