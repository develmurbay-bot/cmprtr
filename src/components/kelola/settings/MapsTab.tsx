import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SettingsTabProps } from './types';

export default function MapsTab({ settings, onSettingsChange }: SettingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Google Maps, Jam Operasional & Footer</CardTitle>
        <CardDescription>
          Kelola lokasi Google Maps, jam operasional, dan pengaturan footer
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Google Maps</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="google_maps_embed_url">Google Maps Embed URL</Label>
              <Textarea
                id="google_maps_embed_url"
                value={settings.google_maps_embed_url}
                onChange={(e) => onSettingsChange('google_maps_embed_url', e.target.value)}
                placeholder="https://www.google.com/maps/embed?pb=..."
                rows={3}
              />
              <p className="text-sm text-gray-500">
                Dapatkan embed URL dari Google Maps → Share → Embed a map
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="google_maps_latitude">Latitude</Label>
                <Input
                  id="google_maps_latitude"
                  value={settings.google_maps_latitude}
                  onChange={(e) => onSettingsChange('google_maps_latitude', e.target.value)}
                  placeholder="-5.3971"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google_maps_longitude">Longitude</Label>
                <Input
                  id="google_maps_longitude"
                  value={settings.google_maps_longitude}
                  onChange={(e) => onSettingsChange('google_maps_longitude', e.target.value)}
                  placeholder="105.2668"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4">Jam Operasional</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business_hours_weekday">Senin - Jumat</Label>
              <Input
                id="business_hours_weekday"
                value={settings.business_hours_weekday}
                onChange={(e) => onSettingsChange('business_hours_weekday', e.target.value)}
                placeholder="08:00 - 17:00 WIB"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="business_hours_saturday">Sabtu</Label>
              <Input
                id="business_hours_saturday"
                value={settings.business_hours_saturday}
                onChange={(e) => onSettingsChange('business_hours_saturday', e.target.value)}
                placeholder="08:00 - 15:00 WIB"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="business_hours_sunday">Minggu</Label>
              <Input
                id="business_hours_sunday"
                value={settings.business_hours_sunday}
                onChange={(e) => onSettingsChange('business_hours_sunday', e.target.value)}
                placeholder="Tutup"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4">Pengaturan Footer</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-blue-900 mb-2">Informasi Footer</h4>
            <p className="text-sm text-blue-800">
              Footer akan menampilkan informasi kontak, alamat, jam operasional, dan link media sosial 
              berdasarkan pengaturan yang telah Anda isi di tab-tab sebelumnya.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Preview Footer Content:</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Alamat:</strong> {settings.address_line_1 || 'Belum diisi'}</p>
                <p><strong>Telepon:</strong> {settings.whatsapp_number || 'Belum diisi'}</p>
                <p><strong>Email:</strong> {settings.email || 'Belum diisi'}</p>
                <p><strong>Jam Operasional:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>Senin-Jumat: {settings.business_hours_weekday || 'Belum diisi'}</li>
                  <li>Sabtu: {settings.business_hours_saturday || 'Belum diisi'}</li>
                  <li>Minggu: {settings.business_hours_sunday || 'Belum diisi'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}