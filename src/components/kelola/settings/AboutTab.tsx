import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SettingsTabProps } from './types';

export default function AboutTab({ settings, onSettingsChange }: SettingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tentang Kami</CardTitle>
        <CardDescription>
          Kelola visi, misi, dan nilai-nilai perusahaan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="vision">Visi Perusahaan</Label>
          <Textarea
            id="vision"
            value={settings.vision}
            onChange={(e) => onSettingsChange('vision', e.target.value)}
            placeholder="Menjadi perusahaan konveksi terdepan di Indonesia yang mengutamakan kualitas dan kepuasan pelanggan."
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mission">Misi Perusahaan</Label>
          <Textarea
            id="mission"
            value={settings.mission}
            onChange={(e) => onSettingsChange('mission', e.target.value)}
            placeholder="Memberikan layanan konveksi terbaik dengan menggunakan teknologi modern dan tenaga kerja yang profesional untuk menghasilkan produk berkualitas tinggi."
            rows={4}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="values">Nilai-Nilai Perusahaan</Label>
          <Textarea
            id="values"
            value={settings.values}
            onChange={(e) => onSettingsChange('values', e.target.value)}
            placeholder="Kualitas, Integritas, Inovasi, Kepuasan Pelanggan, Profesionalisme"
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}
