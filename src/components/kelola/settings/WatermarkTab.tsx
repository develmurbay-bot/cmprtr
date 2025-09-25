import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { SettingsTabProps } from './types';

export default function WatermarkTab({ settings, onSettingsChange }: SettingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Watermark</CardTitle>
        <CardDescription>
          Kelola watermark untuk gambar yang diupload
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="watermark_enabled"
            checked={settings.watermark_enabled === 'true'}
            onCheckedChange={(checked) => onSettingsChange('watermark_enabled', checked ? 'true' : 'false')}
          />
          <Label htmlFor="watermark_enabled">Aktifkan Watermark pada Gambar</Label>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="watermark_text">Teks Watermark</Label>
          <Input
            id="watermark_text"
            value={settings.watermark_text}
            onChange={(e) => onSettingsChange('watermark_text', e.target.value)}
            placeholder="Murbay Konveksi"
            disabled={settings.watermark_enabled !== 'true'}
          />
          <p className="text-sm text-gray-500">
            Teks ini akan ditambahkan sebagai watermark pada setiap gambar yang diupload
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Informasi Watermark</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Watermark akan diterapkan secara otomatis saat upload gambar</li>
            <li>• Posisi watermark akan ditempatkan di sudut kanan bawah</li>
            <li>• Watermark menggunakan transparansi untuk tidak mengganggu gambar</li>
            <li>• Pengaturan ini berlaku untuk semua upload gambar baru</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
