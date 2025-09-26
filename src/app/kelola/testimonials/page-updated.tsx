'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import AdminNavigation from '@/components/kelola/AdminNavigation';
import ImageUpload from '@/components/kelola/ImageUpload';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  content: string;
  customer_photo: string | null;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

interface TestimonialFormData {
  name: string;
  content: string;
  customer_photo: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
}

export default function TestimonialsManagementPage() {
  const { user } = useAuth();
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    content: '',
    customer_photo: '',
    rating: 5,
    status: 'pending'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Image upload state
  const [uploadedImage, setUploadedImage] = useState<string>('');

  // Fetch testimonials
  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      
      const response = await fetch(`/api/testimonials?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setTestimonials(data.testimonials);
      } else {
        toast.error('Failed to fetch testimonials');
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingTestimonial ? '/api/testimonials' : '/api/testimonials';
      const method = editingTestimonial ? 'PUT' : 'POST';
      
      // Use uploaded image if available, otherwise use form data
      const photoUrl = uploadedImage || formData.customer_photo;
      
      const payload = editingTestimonial 
        ? { ...formData, customer_photo: photoUrl, id: editingTestimonial.id }
        : { ...formData, customer_photo: photoUrl };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(editingTestimonial ? 'Testimonial updated successfully' : 'Testimonial created successfully');
        await fetchTestimonials();
        setIsDialogOpen(false);
        resetForm();
      } else {
        toast.error(data.error || 'Failed to save testimonial');
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast.error('Failed to save testimonial');
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      const response = await fetch(`/api/testimonials?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Testimonial deleted successfully');
        await fetchTestimonials();
      } else {
        toast.error(data.error || 'Failed to delete testimonial');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      content: '',
      customer_photo: '',
      rating: 5,
      status: 'pending'
    });
    setEditingTestimonial(null);
    setUploadedImage('');
  };

  // Handle edit
  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      content: testimonial.content,
      customer_photo: testimonial.customer_photo || '',
      rating: testimonial.rating,
      status: testimonial.status
    });
    setUploadedImage('');
    setIsDialogOpen(true);
  };

  // Filter testimonials based on search term
  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTestimonials = filteredTestimonials.slice(startIndex, startIndex + itemsPerPage);

  // Generate customer photo URL
  const generatePhotoUrl = (_name: string) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    return `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/74aaeb04-d48e-4b34-843a-d86c4e6307d9.png}+Customer+Photo+Murbay+Konveksi`;
  };

  // Auto-generate photo URL when name changes
  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      customer_photo: !uploadedImage && !editingTestimonial ? generatePhotoUrl(name) : prev.customer_photo
    }));
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation title="Testimonials Management" />
        <div className="p-6">
          <div className="text-center">Please log in to access this page.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation title="Manajemen Testimoni" />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">Kelola testimoni dan ulasan pelanggan</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>Tambah Testimoni Baru</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingTestimonial ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}</DialogTitle>
                <DialogDescription>
                  {editingTestimonial ? 'Update informasi testimoni di bawah ini.' : 'Isi informasi testimoni di bawah ini.'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Pelanggan *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Masukkan nama pelanggan"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Isi Testimoni *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Masukkan isi testimoni"
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Foto Pelanggan</Label>
                  <ImageUpload
                    value={uploadedImage}
                    onChange={setUploadedImage}
                    onRemove={() => setUploadedImage('')}
                    placeholder="Upload foto pelanggan"
                  />
                  
                  {!uploadedImage && (
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="customer_photo">Atau URL Foto</Label>
                      <Input
                        id="customer_photo"
                        value={formData.customer_photo}
                        onChange={(e) => setFormData(prev => ({ ...prev, customer_photo: e.target.value }))}
                        placeholder="URL foto akan dibuat otomatis atau masukkan URL kustom"
                      />
                      <p className="text-sm text-gray-500">
                        URL foto dibuat otomatis berdasarkan nama, atau Anda dapat memasukkan URL kustom.
                      </p>
                    </div>
                  )}

                  {!uploadedImage && formData.customer_photo && (
                    <div className="mt-2">
                      <Label>Preview Foto</Label>
                      <div className="border rounded-lg p-4 bg-gray-50 mt-2">
                        <Image 
                          src={formData.customer_photo} 
                          alt="Preview" 
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-full border mx-auto"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = generatePhotoUrl(formData.name || 'Customer');
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <Select value={formData.rating.toString()} onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, rating: parseInt(value) }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bintang</SelectItem>
                        <SelectItem value="2">2 Bintang</SelectItem>
                        <SelectItem value="3">3 Bintang</SelectItem>
                        <SelectItem value="4">4 Bintang</SelectItem>
                        <SelectItem value="5">5 Bintang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: 'pending' | 'approved' | 'rejected') => 
                      setFormData(prev => ({ ...prev, status: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit">
                    {editingTestimonial ? 'Update Testimoni' : 'Buat Testimoni'}
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
                  placeholder="Cari testimoni..."
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
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Table */}
        <Card>
          <CardHeader>
            <CardTitle>Testimoni ({filteredTestimonials.length})</CardTitle>
            <CardDescription>
              Kelola testimoni dan ulasan pelanggan
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
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
                        <TableHead>Foto</TableHead>
                        <TableHead>Pelanggan</TableHead>
                        <TableHead>Isi Testimoni</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Dibuat</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedTestimonials.map((testimonial) => (
                        <TableRow key={testimonial.id}>
                          <TableCell>
                            {testimonial.customer_photo && (
                              <Image 
                                src={testimonial.customer_photo} 
                                alt={testimonial.name}
                                width={48}
                                height={48}
                                className="w-12 h-12 object-cover rounded-full"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = generatePhotoUrl(testimonial.name);
                                }}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{testimonial.name}</div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate">
                              {testimonial.content.substring(0, 100)}...
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {renderStars(testimonial.rating)}
                              <span className="ml-2 text-sm text-gray-600">
                                ({testimonial.rating})
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeColor(testimonial.status)}>
                              {testimonial.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(testimonial.created_at).toLocaleDateString('id-ID')}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(testimonial)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(testimonial.id)}
                              >
                                Hapus
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {filteredTestimonials.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Tidak ada testimoni ditemukan. {searchTerm && 'Coba sesuaikan kata kunci pencarian.'}
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
