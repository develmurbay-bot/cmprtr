'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import AdminNavigation from '@/components/kelola/AdminNavigation';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  response_message?: string;
  created_at: string;
  updated_at: string;
}

interface ContactUpdateData {
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  response_message: string;
}

interface StatusCount {
  status: string;
  count: number;
}

export default function ContactManagementPage() {
  const { user } = useAuth();
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [statusCounts, setStatusCounts] = useState<StatusCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [updateData, setUpdateData] = useState<ContactUpdateData>({
    status: 'new',
    response_message: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      
      const response = await fetch(`/api/contact?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setContacts(data.contacts);
        setStatusCounts(data.statusCounts || []);
      } else {
        toast.error('Failed to fetch contact submissions');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch contact submissions');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Handle status update
  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedContact) return;

    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedContact.id,
          ...updateData
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Contact status updated successfully');
        await fetchContacts();
        setIsDialogOpen(false);
        setSelectedContact(null);
        resetUpdateForm();
      } else {
        toast.error(data.error || 'Failed to update contact');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Failed to update contact');
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) {
      return;
    }

    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Contact submission deleted successfully');
        await fetchContacts();
      } else {
        toast.error(data.error || 'Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    }
  };

  // Reset update form
  const resetUpdateForm = () => {
    setUpdateData({
      status: 'new',
      response_message: ''
    });
  };

  // Handle view/edit contact
  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setUpdateData({
      status: contact.status,
      response_message: contact.response_message || ''
    });
    setIsDialogOpen(true);
  };

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContacts = filteredContacts.slice(startIndex, startIndex + itemsPerPage);

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get total count for a status
  const getStatusCount = (status: string) => {
    const statusCount = statusCounts.find(sc => sc.status === status);
    return statusCount ? statusCount.count : 0;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation title="Contact Management" />
        <div className="p-6">
          <div className="text-center">Please log in to access this page.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation title="Manajemen Kontak" />
      
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <p className="text-gray-600">Kelola formulir kontak dan pertanyaan pelanggan</p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getStatusCount('new')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-600">Dalam Proses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getStatusCount('in_progress')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Selesai</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getStatusCount('resolved')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ditutup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getStatusCount('closed')}</div>
            </CardContent>
          </Card>
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
                  placeholder="Cari kontak..."
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
                    <SelectItem value="new">Baru</SelectItem>
                    <SelectItem value="in_progress">Dalam Proses</SelectItem>
                    <SelectItem value="resolved">Selesai</SelectItem>
                    <SelectItem value="closed">Ditutup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Formulir Kontak ({filteredContacts.length})</CardTitle>
            <CardDescription>
              Kelola formulir kontak dan pertanyaan pelanggan
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
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subjek</TableHead>
                        <TableHead>Pesan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedContacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{contact.name}</div>
                              {contact.phone && (
                                <div className="text-sm text-gray-500">{contact.phone}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <a 
                              href={`mailto:${contact.email}`}
                              className="text-blue-600 hover:underline"
                            >
                              {contact.email}
                            </a>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate">
                              {contact.subject}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate text-sm text-gray-600">
                              {contact.message.substring(0, 100)}...
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeColor(contact.status)}>
                              {contact.status === 'new' ? 'Baru' :
                               contact.status === 'in_progress' ? 'Dalam Proses' :
                               contact.status === 'resolved' ? 'Selesai' : 'Ditutup'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(contact.created_at).toLocaleDateString('id-ID')}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewContact(contact)}
                              >
                                Lihat
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(contact.id)}
                              >
                                Hapus
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {filteredContacts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Tidak ada formulir kontak ditemukan. {searchTerm && 'Coba sesuaikan kata kunci pencarian.'}
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

        {/* Contact Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detail Kontak</DialogTitle>
              <DialogDescription>
                Lihat dan update status formulir kontak
              </DialogDescription>
            </DialogHeader>
            
            {selectedContact && (
              <div className="space-y-4">
                {/* Contact Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Nama</Label>
                    <div className="text-sm text-gray-600">{selectedContact.name}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <div className="text-sm text-gray-600">{selectedContact.email}</div>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <Label className="text-sm font-medium">Telepon</Label>
                      <div className="text-sm text-gray-600">{selectedContact.phone}</div>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm font-medium">Subjek</Label>
                    <div className="text-sm text-gray-600">{selectedContact.subject}</div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Pesan</Label>
                  <div className="text-sm text-gray-600 mt-1 p-3 bg-gray-50 rounded border">
                    {selectedContact.message}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Dikirim</Label>
                  <div className="text-sm text-gray-600">
                    {new Date(selectedContact.created_at).toLocaleString('id-ID')}
                  </div>
                </div>

                {/* Update Form */}
                <form onSubmit={handleStatusUpdate} className="space-y-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={updateData.status} onValueChange={(value: 'new' | 'in_progress' | 'resolved' | 'closed') => 
                      setUpdateData(prev => ({ ...prev, status: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Baru</SelectItem>
                        <SelectItem value="in_progress">Dalam Proses</SelectItem>
                        <SelectItem value="resolved">Selesai</SelectItem>
                        <SelectItem value="closed">Ditutup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="response_message">Respon/Catatan</Label>
                    <Textarea
                      id="response_message"
                      value={updateData.response_message}
                      onChange={(e) => setUpdateData(prev => ({ ...prev, response_message: e.target.value }))}
                      placeholder="Tambahkan respon atau catatan internal..."
                      rows={4}
                    />
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit">
                      Update Status
                    </Button>
                  </DialogFooter>
                </form>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
