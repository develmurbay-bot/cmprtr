import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { SettingsTabProps } from './types';

export default function DisplayTab({ settings, onSettingsChange }: SettingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Tampilan Section</CardTitle>
        <CardDescription>
          Kelola section mana yang ditampilkan di halaman utama dan jumlah item yang ditampilkan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Informasi Pengaturan Tampilan</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Section yang dinonaktifkan tidak akan muncul di halaman utama</li>
            <li>• Jumlah item yang ditampilkan dapat disesuaikan untuk setiap section</li>
            <li>• Perubahan akan langsung terlihat setelah pengaturan disimpan</li>
            <li>• Menu navigasi akan otomatis menyesuaikan dengan section yang aktif</li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Section Layanan</h3>
              <p className="text-sm text-gray-500">Tampilkan section layanan di halaman utama</p>
            </div>
            <Switch
              checked={settings.services_enabled === 'true'}
              onCheckedChange={(checked) => onSettingsChange('services_enabled', checked ? 'true' : 'false')}
            />
          </div>
          {settings.services_enabled === 'true' && (
            <div className="space-y-2">
              <Label htmlFor="services_show_count">Jumlah Layanan yang Ditampilkan</Label>
              <Input
                id="services_show_count"
                type="number"
                min="1"
                max="10"
                value={settings.services_show_count}
                onChange={(e) => onSettingsChange('services_show_count', e.target.value)}
                placeholder="5"
              />
            </div>
          )}
        </div>

        {/* Gallery Section */}
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Section Galeri</h3>
              <p className="text-sm text-gray-500">Tampilkan section galeri di halaman utama</p>
            </div>
            <Switch
              checked={settings.gallery_enabled === 'true'}
              onCheckedChange={(checked) => onSettingsChange('gallery_enabled', checked ? 'true' : 'false')}
            />
          </div>
          {settings.gallery_enabled === 'true' && (
            <div className="space-y-2">
              <Label htmlFor="gallery_show_count">Jumlah Galeri yang Ditampilkan</Label>
              <Input
                id="gallery_show_count"
                type="number"
                min="1"
                max="12"
                value={settings.gallery_show_count}
                onChange={(e) => onSettingsChange('gallery_show_count', e.target.value)}
                placeholder="6"
              />
            </div>
          )}
        </div>

        {/* News Section */}
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Section Berita/Artikel</h3>
              <p className="text-sm text-gray-500">Tampilkan section berita di halaman utama</p>
            </div>
            <Switch
              checked={settings.news_enabled === 'true'}
              onCheckedChange={(checked) => onSettingsChange('news_enabled', checked ? 'true' : 'false')}
            />
          </div>
          {settings.news_enabled === 'true' && (
            <div className="space-y-2">
              <Label htmlFor="news_show_count">Jumlah Berita yang Ditampilkan</Label>
              <Input
                id="news_show_count"
                type="number"
                min="1"
                max="10"
                value={settings.news_show_count}
                onChange={(e) => onSettingsChange('news_show_count', e.target.value)}
                placeholder="3"
              />
            </div>
          )}
        </div>

        {/* Testimonials Section */}
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Section Testimoni</h3>
              <p className="text-sm text-gray-500">Tampilkan section testimoni di halaman utama</p>
            </div>
            <Switch
              checked={settings.testimonials_enabled === 'true'}
              onCheckedChange={(checked) => onSettingsChange('testimonials_enabled', checked ? 'true' : 'false')}
            />
          </div>
          {settings.testimonials_enabled === 'true' && (
            <div className="space-y-2">
              <Label htmlFor="testimonials_show_count">Jumlah Testimoni yang Ditampilkan</Label>
              <Input
                id="testimonials_show_count"
                type="number"
                min="1"
                max="10"
                value={settings.testimonials_show_count}
                onChange={(e) => onSettingsChange('testimonials_show_count', e.target.value)}
                placeholder="3"
              />
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Section FAQ</h3>
              <p className="text-sm text-gray-500">Tampilkan section FAQ di halaman utama</p>
            </div>
            <Switch
              checked={settings.faq_enabled === 'true'}
              onCheckedChange={(checked) => onSettingsChange('faq_enabled', checked ? 'true' : 'false')}
            />
          </div>
          {settings.faq_enabled === 'true' && (
            <div className="space-y-2">
              <Label htmlFor="faq_show_count">Jumlah FAQ yang Ditampilkan</Label>
              <Input
                id="faq_show_count"
                type="number"
                min="1"
                max="15"
                value={settings.faq_show_count}
                onChange={(e) => onSettingsChange('faq_show_count', e.target.value)}
                placeholder="5"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
