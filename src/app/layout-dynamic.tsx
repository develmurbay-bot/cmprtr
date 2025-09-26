import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

// This will be generated dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    // In a real app, you'd fetch from your API
    // For now, we'll use default values that can be overridden by the page
    const defaultTitle = 'Murbay Konveksi - Spesialis Garmen dan Konveksi Berkualitas';
    const defaultDescription = 'Layanan konveksi profesional untuk seragam, pakaian kustom, dan produksi massal. Kualitas tinggi, harga kompetitif, pengalaman 10+ tahun.';
    
    return {
      title: defaultTitle,
      description: defaultDescription,
      openGraph: {
        title: defaultTitle,
        description: defaultDescription,
        type: 'website',
        locale: 'id_ID',
      },
      twitter: {
        card: 'summary_large_image',
        title: defaultTitle,
        description: defaultDescription,
      },
    };
  } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
    // Fallback metadata
    return {
      title: 'Murbay Konveksi - Spesialis Garmen dan Konveksi Berkualitas',
      description: 'Layanan konveksi profesional untuk seragam, pakaian kustom, dan produksi massal. Kualitas tinggi, harga kompetitif, pengalaman 10+ tahun.',
    };
  }
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
