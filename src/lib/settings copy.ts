// Settings utility to manage application configuration
// This centralizes all settings that can be managed via admin panel

export interface AppSettings {
  // Company Information
  company_name: string;
  company_tagline: string;
  company_description: string;
  
  // Contact Information
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  address_line_4: string;
  phone: string;
  email: string;
  
  // WhatsApp Integration
  whatsapp_number: string;
  whatsapp_message_template: string;
  whatsapp_enabled: boolean;
  
  // About Section
  vision: string;
  mission: string;
  values: string;
  
  // Statistics
  satisfied_customers: string;
  products_sold: string;
  years_experience: string;
  satisfaction_rate: string;
  
  // Social Media
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  linkedin_url: string;
  youtube_url: string;
  
  // SEO & Meta Tags
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  
  // Watermark Settings
  watermark_enabled: boolean;
  watermark_text: string;
  
  // Section Display Settings
  services_enabled: boolean;
  services_show_count: number;
  gallery_enabled: boolean;
  gallery_show_count: number;
  news_enabled: boolean;
  news_show_count: number;
  testimonials_enabled: boolean;
  testimonials_show_count: number;
  faq_enabled: boolean;
  faq_show_count: number;
  
  // Business Hours
  business_hours_weekday?: string;
  business_hours_saturday?: string;
  business_hours_sunday?: string;
  
  // Legacy fields for backward compatibility
  company_phone?: string;
  company_email?: string;
  company_address?: string;
  company_city?: string;
  company_logo_url?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_twitter?: string;
  social_linkedin?: string;
  social_youtube?: string;
  whatsapp_message?: string;
  google_maps_embed_url?: string;
  footer_text?: string;
  footer_copyright_text?: string;
  footer_show_social_links?: boolean;
}

// Default settings from environment variables
export const getDefaultSettings = (): AppSettings => ({
  // Company Information
  company_name: process.env.NEXT_PUBLIC_COMPANY_NAME || "Murbay Konveksi bukanenv", 
  company_tagline: process.env.NEXT_PUBLIC_COMPANY_TAGLINE || "Spesialis Garmen bukanenv & Konveksi Berkualitas Tinggi",
  company_description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "bukanenv Perusahaan konveksi terpercaya yang melayani berbagai kebutuhan fashion dan garmen dengan komitmen tinggi terhadap kualitas dan kepuasan pelanggan.",
  
  // Contact Information
  address_line_1: "Jl. Nawawi Gelar Dalam Gg. KENANGA No.73",
  address_line_2: "Rajabasa Jaya",
  address_line_3: "Bandar Lampung",
  address_line_4: "Lampung, Indonesia",
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+62 813-5682-2255",
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@murbaykonveksi.com",
  
  // WhatsApp Integration
  whatsapp_number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281356822255",
  whatsapp_message_template: process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Halo! Saya tertarik dengan layanan konveksi Murbay Konveksi. Bisakah saya mendapat informasi lebih lanjut?",
  whatsapp_enabled: true,
  
  // About Section
  vision: "Menjadi perusahaan konveksi terdepan di Indonesia yang dikenal karena kualitas produk dan layanan yang unggul.",
  mission: "Memberikan layanan konveksi terbaik dengan mengutamakan kualitas, inovasi, dan kepuasan pelanggan melalui produk-produk berkualitas tinggi dan pelayanan yang profesional.",
  values: "Kualitas, Integritas, Inovasi, Kepuasan Pelanggan, Komitmen Terhadap Keunggulan",
  
  // Statistics
  satisfied_customers: "1000+",
  products_sold: "50K+",
  years_experience: "10+",
  satisfaction_rate: "99%",
  
  // Social Media
  facebook_url: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "",
  instagram_url: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",
  twitter_url: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || "",
  linkedin_url: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "",
  youtube_url: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "",

  // SEO & Meta Tags
  meta_title: process.env.NEXT_PUBLIC_META_TITLE || "Murbay Konveksi - Spesialis Garmen & Konveksi Berkualitas Tinggi",
  meta_description: process.env.NEXT_PUBLIC_META_DESCRIPTION || "Perusahaan konveksi terpercaya yang melayani berbagai kebutuhan fashion dan garmen dengan komitmen tinggi terhadap kualitas dan kepuasan pelanggan.",
  meta_keywords: process.env.NEXT_PUBLIC_META_KEYWORDS || "konveksi, garmen, fashion, pakaian, seragam, bordir, sablon, murbay konveksi",
  
  // Watermark Settings
  watermark_enabled: true,
  watermark_text: "Murbay Konveksi",
  
  // Section Display Settings
  services_enabled: true,
  services_show_count: 3,
  gallery_enabled: true,
  gallery_show_count: 6,
  news_enabled: true,
  news_show_count: 3,
  testimonials_enabled: true,
  testimonials_show_count: 3,
  faq_enabled: true,
  faq_show_count: 5,
  
  // Business Hours
  business_hours_weekday: "08:00 - 17:00 WIB",
  business_hours_saturday: "08:00 - 15:00 WIB",
  business_hours_sunday: "Tutup",
  
  // Legacy fields for backward compatibility
  company_phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+62 813-5682-2255",
  company_email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@murbaykonveksi.com",
  company_address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "Jl. Nawawi Gelar Dalam Gg. KENANGA No.73",
  company_city:  process.env.NEXT_PUBLIC_COMPANY_CITY ||  "Rajabasa Jaya, Bandar Lampung",
  social_facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "",
  social_instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",
  social_twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || "",
  social_linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "",
  social_youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "",
  whatsapp_message: process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Halo! Saya tertarik dengan layanan usaha Anda.",
  google_maps_embed_url: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED || "",
  footer_text: "Perusahaan konveksi terpercaya yang telah melayani berbagai kebutuhan fashion dan garmen dengan komitmen tinggi terhadap kualitas dan kepuasan pelanggan.",
  footer_copyright_text: "Semua hak cipta dilindungi.footerrf",
  footer_show_social_links: true,
});

// Settings cache
let settingsCache: AppSettings | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 120 * 60 * 1000; // 120 minutes

// Get settings from database or cache
export async function getAppSettings(): Promise<AppSettings> {
  const now = Date.now();
  
  // Return cached settings if still valid
  if (settingsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return settingsCache;
  }
  
  try {
    // Try to fetch from API
    const response = await fetch('/api/settings');
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.settings) {
        const mergedSettings = { ...getDefaultSettings(), ...data.settings };
        settingsCache = mergedSettings;
        cacheTimestamp = now;
        return mergedSettings;
      }
    }
  } catch (error) {
    console.warn('Failed to fetch settings from API, using defaults:', error);
  }
  
  // Fallback to default settings
  const defaultSettings = getDefaultSettings();
  settingsCache = defaultSettings;
  cacheTimestamp = now;
  return defaultSettings;
}

// Get settings synchronously (for client-side usage)
export function getAppSettingsSync(): AppSettings {
  return settingsCache || getDefaultSettings();
}

// Clear settings cache (call after updating settings)
export function clearSettingsCache() {
  settingsCache = null;
  cacheTimestamp = 0;
}

// Get current year for footer
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

// Format business hours
export function formatBusinessHours(settings: AppSettings): string {
  return `Senin-Jumat: ${settings.business_hours_weekday || 'Tutup'}, Sabtu: ${settings.business_hours_saturday || 'Tutup'}, Minggu: ${settings.business_hours_sunday || 'Tutup'}`;
}

// Generate WhatsApp URL
export function generateWhatsAppUrl(settings: AppSettings, customMessage?: string): string {
  const message = customMessage || settings.whatsapp_message_template || settings.whatsapp_message || "Halo! Saya tertarik dengan layanan usaha Anda.";
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${settings.whatsapp_number}?text=${encodedMessage}`;
}

// Generate social media sharing URLs
export function generateSocialShareUrls(url: string, title: string, description: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    youtube: `https://www.youtube.com/sharing/share-offsite/?url=${encodedUrl}`,  };
}

// Format full address from address lines
export function formatFullAddress(settings: AppSettings): string {
  const addressParts = [
    settings.address_line_1,
    settings.address_line_2,
    settings.address_line_3,
    settings.address_line_4
  ].filter(Boolean);
  
  return addressParts.join(', ');
}

// Get company statistics as array for display
export function getCompanyStats(settings: AppSettings) {
  return [
    {
      label: 'Pelanggan Puas',
      value: settings.satisfied_customers || '1000+',
      icon: '👥'
    },
    {
      label: 'Produk Terjual',
      value: settings.products_sold || '50K+',
      icon: '📦'
    },
    {
      label: 'Tahun Pengalaman',
      value: settings.years_experience || '10+',
      icon: '⭐'
    },
    {
      label: 'Tingkat Kepuasan',
      value: settings.satisfaction_rate || '99%',
      icon: '💯'
    }
  ];
}
