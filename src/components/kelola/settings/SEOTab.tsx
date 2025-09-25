import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SettingsTabProps } from './types';

export default function SEOTab({ settings, onSettingsChange }: SettingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
        <CardDescription>
          Kelola meta tags untuk optimasi mesin pencari
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="meta_title">Meta Title</Label>
          <Input
            id="meta_title"
            value={settings.meta_title}
            onChange={(e) => onSettingsChange('meta_title', e.target.value)}
            placeholder="Murbay Konveksi - Spesialis Garmen & Konveksi Berkualitas Tinggi"
          />
          <p className="text-sm text-gray-500">Maksimal 60 karakter</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="meta_description">Meta Description</Label>
          <Textarea
            id="meta_description"
            value={settings.meta_description}
            onChange={(e) => onSettingsChange('meta_description', e.target.value)}
            placeholder="Layanan konveksi profesional dengan kualitas terbaik. Melayani pembuatan seragam, pakaian kustom, dan produksi massal dengan harga kompetitif."
            rows={3}
          />
          <p className="text-sm text-gray-500">Maksimal 160 karakter</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="meta_keywords">Meta Keywords</Label>
          <Input
            id="meta_keywords"
            value={settings.meta_keywords}
            onChange={(e) => onSettingsChange('meta_keywords', e.target.value)}
            placeholder="konveksi, garmen, seragam, pakaian kustom, produksi massal"
          />
          <p className="text-sm text-gray-500">Pisahkan dengan koma</p>
        </div>
      </CardContent>
    </Card>
  );
}
