"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Upload, Eye } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled = false,
  placeholder = "Upload gambar"
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      if (data.success) {
        setPreviewUrl(data.url);
        onChange(data.url);
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal mengupload gambar. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {previewUrl ? (
        <div className="relative group">
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
              onError={() => {
                setPreviewUrl(null);
                onRemove();
              }}
            />
            
            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => window.open(previewUrl, '_blank')}
                className="flex items-center space-x-1"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </Button>
              
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={disabled}
                className="flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>Hapus</span>
              </Button>
            </div>
          </div>
          
          {/* Image info */}
          <div className="mt-2 text-sm text-gray-600">
            <p>Gambar berhasil diupload</p>
          </div>
        </div>
      ) : (
        <div 
          className="w-full h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={handleUploadClick}
        >
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-gray-600 text-center">
            {isUploading ? 'Mengupload...' : placeholder}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Klik untuk memilih gambar (Max 5MB)
          </p>
        </div>
      )}

      {!previewUrl && (
        <Button
          type="button"
          variant="outline"
          onClick={handleUploadClick}
          disabled={disabled || isUploading}
          className="w-full flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>{isUploading ? 'Mengupload...' : 'Pilih Gambar'}</span>
        </Button>
      )}
    </div>
  );
}
