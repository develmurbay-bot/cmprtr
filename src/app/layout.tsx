import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

// Function to fetch settings for metadata
async function getSettings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}/api/settings`, {
      next: { revalidate: 300 } // Cache for 1 hour, safe for static generation
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.settings) {
        // Convert array format to object
        const settingsObj: Record<string, string> = {};
        data.settings.forEach((setting: { key: string; value: string }) => {
          settingsObj[setting.key] = setting.value;
        });
        return settingsObj;
      }
    }
  } catch (error) {
    console.warn('Failed to fetch settings for metadata:', error);
  }
  
  // Return default values if fetch fails
  return {
    company_name: 'CompName failed',
    company_tagline: 'compTag failed',
    meta_title: 'metaTitle Konveksi failed - failed Spesialis Garmen dan Konveksi Berkualitas',
    meta_description: 'MetaDescFailed - Layanan konveksi profesional untuk seragam, pakaian kustom, dan produksi massal. Kualitas tinggi, harga kompetitif, pengalaman 10+ tahun.',
    meta_keywords: 'konveksi, garmen, seragam, pakaian kustom, jahit, bordir, fashion'
  };
}

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  
  const title = settings.meta_title || `${settings.company_name} - ${settings.company_tagline}`;
  const description = settings.meta_description || 'Layout-asyn-Desc';
  const keywords = settings.meta_keywords || 'keywd,abiyo';
  const siteName = settings.company_name || 'asyn-siteName-CompName';

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'id_ID',
      siteName,
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
