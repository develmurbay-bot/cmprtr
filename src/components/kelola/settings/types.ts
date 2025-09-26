export interface Settings {
  company_name: string;
  company_tagline: string;
  company_description: string;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  address_line_4: string;
  // company_phone: string;
  phone: string;
  email: string;
  whatsapp_number: string;
  whatsapp_message_template: string;
  whatsapp_enabled: string;
  google_maps_embed_url: string;
  google_maps_latitude: string;
  google_maps_longitude: string;
  vision: string;
  mission: string;
  values: string;
  satisfied_customers: string;
  products_sold: string;
  years_experience: string;
  satisfaction_rate: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  watermark_enabled: string;
  watermark_text: string;
  operating_hours_weekday: string;
  operating_hours_saturday: string;
  operating_hours_sunday: string;
  business_hours_weekday: string;
  business_hours_saturday: string;
  business_hours_sunday: string;
  linkedin_url: string;
  youtube_url: string;
  company_email?: string;
  services_enabled: string;
  services_show_count: string;
  gallery_enabled: string;
  gallery_show_count: string;
  news_enabled: string;
  news_show_count: string;
  testimonials_enabled: string;
  testimonials_show_count: string;
  faq_enabled: string;
  faq_show_count: string;
}

export interface SettingsTabProps {
  settings: Settings;
  onSettingsChange: (key: keyof Settings, value: string) => void;
}
