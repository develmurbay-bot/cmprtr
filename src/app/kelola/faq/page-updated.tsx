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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import AdminNavigation from '@/components/kelola/AdminNavigation';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface FAQFormData {
  question: string;
  answer: string;
  category: string;
  order_index: number;
}

export default function FAQManagementPage() {
  const { user } = useAuth();
  
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState<FAQFormData>({
    question: '',
    answer: '',
    category: 'General',
    order_index: 1
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'accordion'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch FAQs
  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (categoryFilter !== 'all') {
        params.append('category', categoryFilter);
      }
      
      const response = await fetch(`/api/faq?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setFaqs(data.faqs);
        setCategories(data.categories || []);
      } else {
        toast.error('Failed to fetch FAQ items');
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast.error('Failed to fetch FAQ items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [categoryFilter]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingFaq ? '/api/faq' : '/api/faq';
      const method = editingFaq ? 'PUT' : 'POST';
      const payload = editingFaq 
        ? { ...formData, id: editingFaq.id }
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
        toast.success(editingFaq ? 'FAQ updated successfully' : 'FAQ created successfully');
        await fetchFaqs();
        setIsDialogOpen(false);
        resetForm();
      } else {
        toast.error(data.error || 'Failed to save FAQ');
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast.error('Failed to save FAQ');
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ item?')) {
      return;
    }

    try {
      const response = await fetch(`/api/faq?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('FAQ deleted successfully');
        await fetchFaqs();
      } else {
        toast.error(data.error || 'Failed to delete FAQ');
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast.error('Failed to delete FAQ');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      order_index: 1
    });
    setEditingFaq(null);
  };

  // Handle edit
  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order_index: faq.order_index
    });
    setIsDialogOpen(true);
  };

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaqs = filteredFaqs.slice(startIndex, startIndex + itemsPerPage);

  // Group FAQs by category for accordion view
  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation title="FAQ Management" />
        <div className="p-6">
          <div className="text-center">Please log in to access this page.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation title="Manajemen FAQ" />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">Kelola pertanyaan yang sering diajukan</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              onClick={() => setViewMode('table')}
            >
              Tampilan Tabel
            </Button>
            <Button
              variant={viewMode === 'accordion' ? 'default' : 'outline'}
              onClick={() => setViewMode('accordion')}
            >
              Preview
            </Button>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>Tambah FAQ Baru</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingFaq ? 'Edit FAQ' : 'Tambah FAQ Baru'}</DialogTitle>
                  <DialogDescription>
                    {editingFaq ? 'Update informasi FAQ di bawah ini.' : 'Isi informasi FAQ di bawah ini.'}
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="question">Pertanyaan *</Label>
                    <Input
                      id="question"
                      value={formData.question}
                      onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                      placeholder="Masukkan pertanyaan"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="answer">Jawaban *</Label>
                    <Textarea
                      id="answer"
                      value={formData.answer}
                      onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                      placeholder="Masukkan jawaban"
                      rows={6}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select value={formData.category} onValueChange={(value) => 
                        setFormData(prev => ({ ...prev, category: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Layanan">Layanan</SelectItem>
                          <SelectItem value="Produksi">Produksi</SelectItem>
                          <SelectItem value="Pemesanan">Pemesanan</SelectItem>
                          <SelectItem value="Garansi">Garansi</SelectItem>
                          <SelectItem value="Pembayaran">Pembayaran</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="order_index">Urutan</Label>
                      <Input
                        id="order_index"
                        type="number"
                        min="1"
                        value={formData.order_index}
                        onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 1 }))}
                        placeholder="Urutan tampilan"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit">
                      {editingFaq ? 'Update FAQ' : 'Buat FAQ'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
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
                  placeholder="Cari FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="min-w-[200px]">
                <Label htmlFor="category-filter">Kategori</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {viewMode === 'table' ? (
          <Card>
            <CardHeader>
              <CardTitle>Item FAQ ({filteredFaqs.length})</CardTitle>
              <CardDescription>
                Kelola pertanyaan yang sering diajukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
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
                          <TableHead>Pertanyaan</TableHead>
                          <TableHead>Jawaban</TableHead>
                          <TableHead>Kategori</TableHead>
                          <TableHead>Urutan</TableHead>
                          <TableHead>Dibuat</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedFaqs.map((faq) => (
                          <TableRow key={faq.id}>
                            <TableCell>
                              <div className="font-medium max-w-xs">
                                {faq.question}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-xs truncate text-sm text-gray-600">
                                {faq.answer.substring(0, 100)}...
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {faq.category}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {faq.order_index}
                            </TableCell>
                            <TableCell>
                              {new Date(faq.created_at).toLocaleDateString('id-ID')}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(faq)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDelete(faq.id)}
                                >
                                  Hapus
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    {filteredFaqs.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        Tidak ada FAQ ditemukan. {searchTerm && 'Coba sesuaikan kata kunci pencarian.'}
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
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Preview FAQ</CardTitle>
              <CardDescription>
                Preview bagaimana FAQ akan tampil di website
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
                    <div key={category}>
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        {category}
                      </h3>
                      <Accordion type="single" collapsible className="w-full">
                        {categoryFaqs
                          .sort((a, b) => a.order_index - b.order_index)
                          .map((faq) => (
                          <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="text-gray-600 mb-4">
                                {faq.answer}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(faq)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDelete(faq.id)}
                                >
                                  Hapus
                                </Button>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                  
                  {Object.keys(groupedFaqs).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Tidak ada FAQ ditemukan. {searchTerm && 'Coba sesuaikan kata kunci pencarian.'}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
