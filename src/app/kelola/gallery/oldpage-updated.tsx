'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import AdminNavigation from '@/components/kelola/AdminNavigation';
import ImageUpload from '@/components/kelola/ImageUpload';

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  category: string;
  created_at: string;
  updated_at: string;
}

const categories = [
  { value: 'pakaian-pria', label: 'Pakaian Pria' },
  { value: 'pakaian-wanita', label: 'Pakaian Wanita' },
  { value: 'uniform', label: 'Uniform Perusahaan' },
  { value: 'aksesoris', label: 'Aksesoris Fashion' },
  { value: 'event', label: 'Event Fashion' },
  { value: 'general', label: 'Umum' }
];

export default function GalleryManagement() {
  const { user } = useAuth();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    category: 'general'
  });

  // Image upload state
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Fetch gallery items
  const fetchGallery = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      
      const response = await fetch(`/api/gallery?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setGallery(data.gallery);
      } else {
        toast.error('Failed to fetch gallery items');
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
      toast.error('Failed to fetch gallery items');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingItem ? '/api/gallery' : '/api/gallery';
      const method = editingItem ? 'PUT' : 'POST';
      
      // Use uploaded image if available, otherwise use form data
      const imageUrl = uploadedImages.length > 0 ? uploadedImages[0] : formData.image_url;
      
      const payload = editingItem 
        ? { ...formData, image_url: imageUrl, id: editingItem.id }
        : { ...formData, image_url: imageUrl };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        toast.success(editingItem ? 'Gallery item updated successfully' : 'Gallery item created successfully');
        setIsDialogOpen(false);
        setEditingItem(null);
        setFormData({ title: '', image_url: '', category: 'general' });
        setUploadedImages([]);
        fetchGallery();
      } else {
        toast.error(data.error || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
      toast.error('Failed to save gallery item');
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Gallery item deleted successfully');
        fetchGallery();
      } else {
        toast.error(data.error || 'Failed to delete gallery item');
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast.error('Failed to delete gallery item');
    }
  };

  // Handle edit
  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      image_url: item.image_url,
      category: item.category
    });
    setUploadedImages([]);
    setIsDialogOpen(true);
  };

  // Generate placeholder image URL
  const generatePlaceholderUrl = (title: string, category: string) => {
    const encodedCategory = encodeURIComponent(category.replace(/\s+/g, '+'));
    return `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c13d7724-b01e-4331-b562-fa23064a5c51.png}+${encodedCategory}+Murbay+Konveksi+Gallery`;
  };

  // Auto-generate image URL when title or category changes (only if no uploaded image)
  useEffect(() => {
    if (formData.title && formData.category && !editingItem && uploadedImages.length === 0) {
      const newImageUrl = generatePlaceholderUrl(formData.title, formData.category);
      setFormData(prev => ({ ...prev, image_url: newImageUrl }));
    }
  }, [formData.title, formData.category, editingItem, uploadedImages.length]);

  // Filter gallery items
  const filteredGallery = gallery.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredGallery.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGallery = filteredGallery.slice(startIndex, startIndex + itemsPerPage);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation title="Gallery Management" />
        <div className="p-6">
          <div className="text-center">Please log in to access this page.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation title="Manajemen Galeri" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">Kelola koleksi gambar dan portofolio hasil produksi</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingItem(null);
                setFormData({ title: '', image_url: '', category: 'general' });
                setUploadedImages([]);
              }}>
                Tambah Item Galeri
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Item Galeri' : 'Tambah Item Galeri Baru'}</DialogTitle>
                <DialogDescription>
                  {editingItem ? 'Update detail item galeri di bawah ini.' : 'Isi detail untuk item galeri baru.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Judul</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Masukkan judul item galeri"
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Upload Gambar</Label>
                    <ImageUpload
                      value={uploadedImages.length > 0 ? uploadedImages[0] : ''}
                      onChange={(newImage) => setUploadedImages([newImage])}
                      onRemove={() => setUploadedImages([])}
                      placeholder="Upload gambar galeri"
                    />
                    
                    {uploadedImages.length === 0 && (
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="image_url">Atau URL Gambar</Label>
                        <Textarea
                          id="image_url"
                          value={formData.image_url}
                          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                          placeholder="URL gambar akan dibuat otomatis atau masukkan URL kustom"
                          rows={3}
                        />
                        <p className="text-sm text-gray-500">
                          URL gambar dibuat otomatis berdasarkan judul dan kategori, atau Anda dapat memasukkan URL kustom.
                        </p>
                      </div>
                    )}
                    {uploadedImages.length === 0 && formData.image_url && (
                      <div className="grid gap-2">
                        <Label>Preview Gambar</Label>
                        <div className="border rounded-lg p-4 bg-gray-50">
                          <img
                            src={formData.image_url}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = generatePlaceholderUrl(formData.title || 'Gallery Item', formData.category);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit">
                    {editingItem ? 'Update Item Galeri' : 'Buat Item Galeri'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="search">Cari</Label>
                <Input
                  id="search"
                  placeholder="Cari item galeri..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="min-w-[200px]">
                <Label htmlFor="category-filter">Kategori</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gallery Table */}
        <Card>
          <CardHeader>
            <CardTitle>Item Galeri ({filteredGallery.length})</CardTitle>
            <CardDescription>
              Kelola galeri portofolio dengan gambar dan kategori
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Memuat item galeri...</div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gambar</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Dibuat</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedGallery.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = generatePlaceholderUrl(item.title, item.category);
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {categories.find(cat => cat.value === item.category)?.label || item.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(item.created_at).toLocaleDateString('id-ID')}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                            >
                              Hapus
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Sebelumnya
                    </Button>
                    <span className="flex items-center px-4">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Selanjutnya
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
