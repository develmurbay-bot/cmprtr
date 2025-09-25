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
  const router = useRouter();
  
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

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/kelola/login');
    }
  }, [user, router]);

  // Fetch contacts
  const fetchContacts = async () => {
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
        console.error('Failed to fetch contacts:', data.error);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchContacts();
    }
  }, [user, statusFilter]);

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
        await fetchContacts();
        setIsDialogOpen(false);
        setSelectedContact(null);
        resetUpdateForm();
      } else {
        console.error('Failed to update contact:', data.error);
      }
    } catch (error) {
      console.error('Error updating contact:', error);
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
        await fetchContacts();
      } else {
        console.error('Failed to delete contact:', data.error);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contact Management</h1>
          <p className="text-gray-600 mt-2">Manage contact form submissions and inquiries</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount('new')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount('in_progress')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount('resolved')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Closed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount('closed')}</div>
          </CardContent>
        </Card>
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
                placeholder="Search contacts..."
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
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Submissions ({filteredContacts.length})</CardTitle>
          <CardDescription>
            Manage contact form submissions and customer inquiries
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
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
                          {contact.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(contact.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewContact(contact)}
                          >
                            View
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(contact.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredContacts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No contact submissions found. {searchTerm && 'Try adjusting your search terms.'}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              View and update contact submission status
            </DialogDescription>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-4">
              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <div className="text-sm text-gray-600">{selectedContact.name}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <div className="text-sm text-gray-600">{selectedContact.email}</div>
                </div>
                {selectedContact.phone && (
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <div className="text-sm text-gray-600">{selectedContact.phone}</div>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium">Subject</Label>
                  <div className="text-sm text-gray-600">{selectedContact.subject}</div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Message</Label>
                <div className="text-sm text-gray-600 mt-1 p-3 bg-gray-50 rounded border">
                  {selectedContact.message}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Submitted</Label>
                <div className="text-sm text-gray-600">
                  {new Date(selectedContact.created_at).toLocaleString()}
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
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="response_message">Response/Notes</Label>
                  <Textarea
                    id="response_message"
                    value={updateData.response_message}
                    onChange={(e) => setUpdateData(prev => ({ ...prev, response_message: e.target.value }))}
                    placeholder="Add response or internal notes..."
                    rows={4}
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
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
  );
}
