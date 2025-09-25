import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { SettingsTabProps } from './types';

export default function ContactTab({ settings, onSettingsChange }: SettingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Kontak</CardTitle>
        <CardDescription>
          Kelola alamat, nomor telepon, email, dan WhatsApp
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Alamat Lengkap</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address_line_1">Alamat Baris 1 *</Label>
              <Input
                id="address_line_1"
                value={settings.address_line_1}
                onChange={(e) => onSettingsChange('address_line_1', e.target.value)}
                placeholder="Korpri Raya Blok A2 No. 14"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address_line_2">Alamat Baris 2</Label>
              <Input
                id="address_line_2"
                value={settings.address_line_2}
                onChange={(e) => onSettingsChange('address_line_2', e.target.value)}
                placeholder="Korpri Raya - Sukarame"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address_line_3">Alamat Baris 3</Label>
              <Input
                id="address_line_3"
                value={settings.address_line_3}
                onChange={(e) => onSettingsChange('address_line_3', e.target.value)}
                placeholder="Bandar Lampung"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address_line_4">Alamat Baris 4</Label>
              <Input
                id="address_line_4"
                value={settings.address_line_4}
                onChange={(e) => onSettingsChange('address_line_4', e.target.value)}
                placeholder="Lampung, Indonesia"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4">Kontak</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon *</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => onSettingsChange('phone', e.target.value)}
                placeholder="+6281356822255"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => onSettingsChange('email', e.target.value)}
                placeholder="contohemailplace@tes.com"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4">WhatsApp</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="whatsapp_enabled"
                checked={settings.whatsapp_enabled === 'true'}
                onCheckedChange={(checked) => onSettingsChange('whatsapp_enabled', checked ? 'true' : 'false')}
              />
              <Label htmlFor="whatsapp_enabled">Aktifkan WhatsApp Floating Button</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="whatsapp_number">Nomor WhatsApp *</Label>
              <Input
                id="whatsapp_number"
                value={settings.whatsapp_number}
                onChange={(e) => onSettingsChange('whatsapp_number', e.target.value)}
                placeholder="6281356822255"
              />
              <p className="text-sm text-gray-500">Format: 6281356822255 (tanpa tanda +)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp_message_template">Template Pesan WhatsApp</Label>
              <Textarea
                id="whatsapp_message_template"
                value={settings.whatsapp_message_template}
                onChange={(e) => onSettingsChange('whatsapp_message_template', e.target.value)}
                placeholder="Halo, saya tertarik dengan layanan konveksi Murbay Konveksi. Bisakah saya mendapat informasi lebih lanjut?"
                rows={3}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
