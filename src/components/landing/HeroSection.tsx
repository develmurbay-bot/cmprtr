'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface HeroSettings {
  company_name: string;
  company_tagline: string;
  company_description: string;
  years_experience: string;
  satisfied_customers: string;
  satisfaction_rate: string;
}

export default function HeroSection() {
  const [settings, setSettings] = useState<HeroSettings | null>(null);
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
        const mappedSettings: HeroSettings = {
          company_name: settingsObj.company_name || 'failed-heroSection-compName',
          company_tagline: settingsObj.company_tagline || 'failed-heroSection-CompTag',
          company_description: settingsObj.company_description || 'failed-heroSection-COMPDESC',
          years_experience: settingsObj.years_experience || '10+',
          satisfied_customers: settingsObj.satisfied_customers || '2500+',
          satisfaction_rate: settingsObj.satisfaction_rate || '99%'
        };
        
        setSettings(mappedSettings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-black">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center animate-pulse">
            <div className="h-16 bg-gray-700 rounded w-3/4 mx-auto mb-6"></div>
            <div className="h-8 bg-gray-700 rounded w-2/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-700 rounded w-5/6 mx-auto mb-8"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="h-12 bg-gray-700 rounded w-40"></div>
              <div className="h-12 bg-gray-700 rounded w-40"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-bluesky">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {settings?.company_name}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-200">
            {settings?.company_tagline}
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
            {settings?.company_description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              onClick={scrollToContact}
            >
              Konsultasi Gratis
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg font-semibold"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Lihat Layanan
            </Button>
          </div>
        </div>

        {/* Key Features - Dynamic */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">{settings?.years_experience}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Tahun Pengalaman</h3>
            <p className="text-gray-300">Melayani ribuan pelanggan dengan kepuasan tinggi</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">{settings?.satisfied_customers}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Pelanggan Puas</h3>
            <p className="text-gray-300">Kepercayaan dari berbagai kalangan</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">{settings?.satisfaction_rate}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Tingkat Kepuasan</h3>
            <p className="text-gray-300">Garansi kualitas dan kepuasan pelanggan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
