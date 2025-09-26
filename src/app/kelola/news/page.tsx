'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import AdminNavigation from '@/components/kelola/AdminNavigation';
import ImageUpload from '@/components/kelola/ImageUpload';
import Image from 'next/image';

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  featured_image: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string;
  created_at: string;
  updated_at: string;
}

interface NewsFormData {
  title: string;
  content: string;
  featured_image: string;
  status: 'draft' | 'published' | 'archived';
  published_at: string;
}

export default function NewsManagementPage() {
  const { user } = useAuth();
  
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    content: '',
    featured_image: '',
    status: 'draft',
    published_at: new Date().toISOString().slice(0, 16)
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Image upload state
  const [uploadedImage, setUploadedImage] = useState<string>('');

  // Fetch news articles
  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      
      const response = await fetch(`/api/news?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setNews(data.news);
      } else {
        toast.error('Failed to fetch news articles');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error('Failed to fetch news articles');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingNews ? '/api/news' : '/api/news';
      const method = editingNews ? 'PUT' : 'POST';
      
      // Use uploaded image if available, otherwise use form data
      const imageUrl = uploadedImage || formData.featured_image;
      
      const payload = editingNews 
        ? { ...formData, featured_image: imageUrl, id: editingNews.id }
        : { ...formData, featured_image: imageUrl };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(editingNews ? 'Article updated successfully' : 'Article created successfully');
        await fetchNews();
        setIsDialogOpen(false);
        resetForm();
      } else {
        toast.error(data.error || 'Failed to save article');
      }
    } catch (error) {
      console.error('Error saving news:', error);
      toast.error('Failed to save article');
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this news article?')) {
      return;
    }

    try {
      const response = await fetch(`/api/news?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Article deleted successfully');
        await fetchNews();
      } else {
        toast.error(data.error || 'Failed to delete article');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      toast.error('Failed to delete article');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      featured_image: '',
      status: 'draft',
      published_at: new Date().toISOString().slice(0, 16)
    });
    setEditingNews(null);
    setUploadedImage('');
  };

  // Handle edit
  const handleEdit = (article: NewsArticle) => {
    setEditingNews(article);
    setFormData({
      title: article.title,
      content: article.content,
      featured_image: article.featured_image || '',
      status: article.status,
      published_at: article.published_at ? new Date(article.published_at).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
    });
    setUploadedImage('');
    setIsDialogOpen(true);
  };

  // Filter news based on search term
  const filteredNews = news.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  // Generate featured image URL
  const generateImageUrl = (_title: string) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    return `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59398c85-5765-48de-b0b0-19aeff01b71c.png}+Murbay+Konveksi+News+Article`;
  };

  // Auto-generate image URL when title changes
  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      featured_image: !uploadedImage && !editingNews ? generateImageUrl(title) : prev.featured_image
    }));
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation title="News Management" />
        <div className="p-6">
          <div className="text-center">Please log in to access this page.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation title="Manajemen Berita & Artikel" />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">Kelola artikel berita dan blog posts</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>Tambah Artikel Baru</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingNews ? 'Edit Artikel' : 'Tambah Artikel Baru'}</DialogTitle>
                <DialogDescription>
                  {editingNews ? 'Update informasi artikel di bawah ini.' : 'Isi informasi artikel di bawah ini.'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Masukkan judul artikel"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Konten *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Masukkan konten artikel"
                    rows={8}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gambar Utama</Label>
                  <ImageUpload
                    value={uploadedImage}
                    onChange={setUploadedImage}
                    onRemove={() => setUploadedImage('')}
                    placeholder="Upload gambar artikel"
                  />
                  
                  {!uploadedImage && (
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="featured_image">Atau URL Gambar</Label>
                      <Input
                        id="featured_image"
                        value={formData.featured_image}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                        placeholder="URL gambar akan dibuat otomatis atau masukkan URL kustom"
                      />
                      <p className="text-sm text-gray-500">
                        URL gambar dibuat otomatis berdasarkan judul, atau Anda dapat memasukkan URL kustom.
                      </p>
                    </div>
                  )}

                  {!uploadedImage && formData.featured_image && (
                    <div className="mt-2">
                      <Label>Preview Gambar</Label>
                      <div className="border rounded-lg p-4 bg-gray-50 mt-2">
                        <Image 
                          src={formData.featured_image} 
                          alt="Preview" 
                          width={400}
                          height={128}
                          className="w-full h-32 object-cover rounded"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = generateImageUrl(formData.title || 'Article');
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: 'draft' | 'published' | 'archived') => 
                      setFormData(prev => ({ ...prev, status: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="published_at">Tanggal Publikasi</Label>
                    <Input
                      id="published_at"
                      type="datetime-local"
                      value={formData.published_at}
                      onChange={(e) => setFormData(prev => ({ ...prev, published_at: e.target.value }))}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit">
                    {editingNews ? 'Update Artikel' : 'Buat Artikel'}
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
                  placeholder="Cari artikel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="min-w-[200px]">
                <Label htmlFor="status-filter">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* News Table */}
        <Card>
          <CardHeader>
            <CardTitle>Artikel ({filteredNews.length})</CardTitle>
            <CardDescription>
              Kelola artikel berita dan blog posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-16 w-24" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Gambar</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Dipublikasi</TableHead>
                        <TableHead>Dibuat</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedNews.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell>
                            {article.featured_image && (
                              <Image 
                                src={article.featured_image} 
                                alt={article.title}
                                width={64}
                                height={48}
                                className="w-16 h-12 object-cover rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = generateImageUrl(article.title);
                                }}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{article.title}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {article.content.substring(0, 100)}...
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeColor(article.status)}>
                              {article.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {article.published_at ? new Date(article.published_at).toLocaleDateString('id-ID') : '-'}
                          </TableCell>
                          <TableCell>
                            {new Date(article.created_at).toLocaleDateString('id-ID')}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(article)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(article.id)}
                              >
                                Hapus
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {filteredNews.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Tidak ada artikel ditemukan. {searchTerm && 'Coba sesuaikan kata kunci pencarian.'}
                    </div>
                  )}
                </div>

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
