import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

// Function to fetch settings for metadata
async function getSettings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/settings`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }
    
    const data = await response.json();
    
    if (data.success && data.settings) {
      const settingsObj: any = {};
      data.settings.forEach((setting: any) => {
        settingsObj[setting.key] = setting.value || '';
      });
      return settingsObj;
    }
    
    return {};
  } catch (error) {
    console.error('Error fetching settings for metadata:', error);
    return {};
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  
  const title = settings.meta_title || settings.company_name || 'Murbay Konveksi - Spesialis Garmen dan Konveksi Berkualitas';
  const description = settings.meta_description || 'Layanan konveksi profesional untuk seragam, pakaian kustom, dan produksi massal. Kualitas tinggi, harga kompetitif, pengalaman 10+ tahun.';
  const keywords = settings.meta_keywords || 'konveksi, garmen, seragam, pakaian kustom, jahit, bordir, fashion';
  
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'id_ID',
      siteName: settings.company_name || 'Murbay Konveksi',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'whatsapp:title': title,
      'whatsapp:description': description,
    }
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
