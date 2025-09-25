import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SettingsTabProps } from './types';

export default function CompanyTab({ settings, onSettingsChange }: SettingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Perusahaan</CardTitle>
        <CardDescription>
          Kelola nama toko, jargon, dan deskripsi perusahaan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="company_name">Nama Aplikasi/Toko *</Label>
            <Input
              id="company_name"
              value={settings.company_name}
              onChange={(e) => onSettingsChange('company_name', e.target.value)}
              placeholder="compTab-Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company_tagline">Jargon/Tagline *</Label>
            <Input
              id="company_tagline"
              value={settings.company_tagline}
              onChange={(e) => onSettingsChange('company_tagline', e.target.value)}
              placeholder="CompTab-Tagline"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company_description">Deskripsi Perusahaan</Label>
          <Textarea
            id="company_description"
            value={settings.company_description}
            onChange={(e) => onSettingsChange('company_description', e.target.value)}
            placeholder="Deskripsi singkat tentang perusahaan..."
            rows={4}
          />
        </div>

        <Separator />
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Statistik Perusahaan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="satisfied_customers">Pelanggan Puas</Label>
              <Input
                id="satisfied_customers"
                value={settings.satisfied_customers}
                onChange={(e) => onSettingsChange('satisfied_customers', e.target.value)}
                placeholder="500+"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="products_sold">Produk Terjual</Label>
              <Input
                id="products_sold"
                value={settings.products_sold}
                onChange={(e) => onSettingsChange('products_sold', e.target.value)}
                placeholder="5K+"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years_experience">Tahun Pengalaman</Label>
              <Input
                id="years_experience"
                value={settings.years_experience}
                onChange={(e) => onSettingsChange('years_experience', e.target.value)}
                placeholder="7+"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="satisfaction_rate">Tingkat Kepuasan</Label>
              <Input
                id="satisfaction_rate"
                value={settings.satisfaction_rate}
                onChange={(e) => onSettingsChange('satisfaction_rate', e.target.value)}
                placeholder="99%"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
