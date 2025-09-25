'use client';

import { useState, useEffect } from 'react';

interface AboutSettings {
  company_name: string;
  about_vision: string;
  about_mission: string;
  about_values: string;
  stats_customers: string;
  stats_products: string;
  stats_experience: string;
  stats_satisfaction: string;
}

export default function AboutSection() {
  const [settings, setSettings] = useState<AboutSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      if (data.success && data.settings) {
        // Convert array of key-value pairs to flat object
        const settingsObj: any = {};
        data.settings.forEach((setting: any) => {
          settingsObj[setting.key] = setting.value;
        });
        
        // Map to expected format
        const mappedSettings: AboutSettings = {
          company_name: settingsObj.company_name || 'Murbay Konveksi',
          about_vision: settingsObj.vision || settingsObj.company_vision || '',
          about_mission: settingsObj.mission || settingsObj.company_mission || '',
          about_values: settingsObj.values || settingsObj.company_values || '',
          stats_customers: settingsObj.satisfied_customers || '500+',
          stats_products: settingsObj.products_sold || '10K+',
          stats_experience: settingsObj.years_experience || '5+',
          stats_satisfaction: settingsObj.satisfaction_rate || '98%'
        };
        
        setSettings(mappedSettings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-center">
                    <div className="h-12 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tentang Kami</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mengenal lebih dekat {settings?.company_name || 'Murbay Konveksi'} dan komitmen kami dalam memberikan layanan terbaik
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-8">
            {/* Vision */}
            {settings?.about_vision && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  Visi Kami
                </h3>
                <p className="text-gray-600 leading-relaxed">{settings.about_vision}</p>
              </div>
            )}

            {/* Mission */}
            {settings?.about_mission && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Misi Kami
                </h3>
                <p className="text-gray-600 leading-relaxed">{settings.about_mission}</p>
              </div>
            )}

            {/* Values */}
            {settings?.about_values && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  Nilai-Nilai Kami
                </h3>
                <p className="text-gray-600 leading-relaxed">{settings.about_values}</p>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-6">
            {/* Customers Satisfied */}
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {settings?.stats_customers || '500+'}
              </div>
              <div className="text-sm text-gray-600 font-medium">Pelanggan Puas</div>
            </div>

            {/* Products Sold */}
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {settings?.stats_products || '10K+'}
              </div>
              <div className="text-sm text-gray-600 font-medium">Produk Terjual</div>
            </div>

            {/* Years Experience */}
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {settings?.stats_experience || '5+'}
              </div>
              <div className="text-sm text-gray-600 font-medium">Tahun Pengalaman</div>
            </div>

            {/* Satisfaction Rate */}
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {settings?.stats_satisfaction || '98%'}
              </div>
              <div className="text-sm text-gray-600 font-medium">Tingkat Kepuasan</div>
            </div>
          </div>
        </div>

        {/* Company Image Placeholder */}
        <div className="mt-12 text-center">
          <div className="relative inline-block">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/070dda0a-cd1b-4825-8900-453226097b51.png"
              alt="Murbay Konveksi - Fasilitas Produksi Profesional"
              className="rounded-lg shadow-lg max-w-full h-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
