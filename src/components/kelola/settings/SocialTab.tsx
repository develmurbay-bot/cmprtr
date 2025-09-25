import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SettingsTabProps } from './types';

export default function SocialTab({ settings, onSettingsChange }: SettingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Sosial</CardTitle>
        <CardDescription>
          Kelola link media sosial perusahaan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="facebook_url">Facebook URL</Label>
          <Input
            id="facebook_url"
            value={settings.facebook_url}
            onChange={(e) => onSettingsChange('facebook_url', e.target.value)}
            placeholder="https://facebook.com/murbaykonveksi"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="instagram_url">Instagram URL</Label>
          <Input
            id="instagram_url"
            value={settings.instagram_url}
            onChange={(e) => onSettingsChange('instagram_url', e.target.value)}
            placeholder="https://instagram.com/murbaykonveksi"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="twitter_url">Twitter URL</Label>
          <Input
            id="twitter_url"
            value={settings.twitter_url}
            onChange={(e) => onSettingsChange('twitter_url', e.target.value)}
            placeholder="https://twitter.com/murbaykonveksi"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin_url">LinkedIn URL</Label>
          <Input
            id="linkedin_url"
            value={settings.linkedin_url}
            onChange={(e) => onSettingsChange('linkedin_url', e.target.value)}
            placeholder="https://linkedin.com/murbaykonveksi"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="youtube_url">Youtube URL</Label>
          <Input
            id="youtube_url"
            value={settings.youtube_url}
            onChange={(e) => onSettingsChange('youtube_url', e.target.value)}
            placeholder="https://youtube.com/murbaykonveksi"
          />
        </div>
      </CardContent>
    </Card>
  );
}
