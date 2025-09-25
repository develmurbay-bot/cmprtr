'use client';

import { useState, useEffect } from 'react';
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
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  
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

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/kelola/login');
    }
  }, [user, router]);

  // Fetch testimonials
  const fetchTestimonials = async () => {
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
        console.error('Failed to fetch testimonials:', data.error);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTestimonials();
    }
  }, [user, statusFilter]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingTestimonial ? '/api/testimonials' : '/api/testimonials';
      const method = editingTestimonial ? 'PUT' : 'POST';
      const payload = editingTestimonial 
        ? { ...formData, id: editingTestimonial.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchTestimonials();
        setIsDialogOpen(false);
        resetForm();
      } else {
        console.error('Failed to save testimonial:', data.error);
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
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
        await fetchTestimonials();
      } else {
        console.error('Failed to delete testimonial:', data.error);
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
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
    setIsDialogOpen(true);
  };

  // Filter testimonials based on search term
  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate customer photo URL
  const generatePhotoUrl = (name: string) => {
    const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '+');
    return `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/21686bf2-071e-4cc0-b52d-221c96ce1fba.png}+Customer+Photo`;
  };

  // Auto-generate photo URL when name changes
  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      customer_photo: prev.customer_photo || generatePhotoUrl(name)
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Testimonials Management</h1>
          <p className="text-gray-600 mt-2">Manage customer testimonials and reviews</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>Add New Testimonial</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
              <DialogDescription>
                {editingTestimonial ? 'Update the testimonial information below.' : 'Fill in the testimonial information below.'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Customer Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Testimonial Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter testimonial content"
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer_photo">Customer Photo URL</Label>
                <Input
                  id="customer_photo"
                  value={formData.customer_photo}
                  onChange={(e) => setFormData(prev => ({ ...prev, customer_photo: e.target.value }))}
                  placeholder="Enter photo URL or leave blank for auto-generation"
                />
                {formData.customer_photo && (
                  <div className="mt-2">
                    <img 
                      src={formData.customer_photo} 
                      alt="Preview" 
                      className="w-20 h-20 object-cover rounded-full border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = generatePhotoUrl(formData.name || 'Customer');
                      }}
                    />
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
                      <SelectItem value="1">1 Star</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
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
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search testimonials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Table */}
      <Card>
        <CardHeader>
          <CardTitle>Testimonials ({filteredTestimonials.length})</CardTitle>
          <CardDescription>
            Manage customer testimonials and reviews
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTestimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell>
                        {testimonial.customer_photo && (
                          <img 
                            src={testimonial.customer_photo} 
                            alt={testimonial.name}
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
                        {new Date(testimonial.created_at).toLocaleDateString()}
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
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredTestimonials.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No testimonials found. {searchTerm && 'Try adjusting your search terms.'}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
