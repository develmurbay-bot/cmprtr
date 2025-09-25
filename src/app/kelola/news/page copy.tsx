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
  const router = useRouter();
  
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

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/kelola/login');
    }
  }, [user, router]);

  // Fetch news articles
  const fetchNews = async () => {
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
        console.error('Failed to fetch news:', data.error);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNews();
    }
  }, [user, statusFilter]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingNews ? '/api/news' : '/api/news';
      const method = editingNews ? 'PUT' : 'POST';
      const payload = editingNews 
        ? { ...formData, id: editingNews.id }
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
        await fetchNews();
        setIsDialogOpen(false);
        resetForm();
      } else {
        console.error('Failed to save news:', data.error);
      }
    } catch (error) {
      console.error('Error saving news:', error);
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
        await fetchNews();
      } else {
        console.error('Failed to delete news:', data.error);
      }
    } catch (error) {
      console.error('Error deleting news:', error);
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
    setIsDialogOpen(true);
  };

  // Filter news based on search term
  const filteredNews = news.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate featured image URL
  const generateImageUrl = (title: string) => {
    const cleanTitle = title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '+');
    return `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6a0da121-8593-423c-b3d7-e625a87c4436.png}+News+Article`;
  };

  // Auto-generate image URL when title changes
  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      featured_image: prev.featured_image || generateImageUrl(title)
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">News & Articles Management</h1>
          <p className="text-gray-600 mt-2">Manage news articles and blog posts</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>Add New Article</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingNews ? 'Edit Article' : 'Add New Article'}</DialogTitle>
              <DialogDescription>
                {editingNews ? 'Update the article information below.' : 'Fill in the article information below.'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter article title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter article content"
                  rows={8}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <Input
                  id="featured_image"
                  value={formData.featured_image}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                  placeholder="Enter image URL or leave blank for auto-generation"
                />
                {formData.featured_image && (
                  <div className="mt-2">
                    <img 
                      src={formData.featured_image} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = generateImageUrl(formData.title || 'Article');
                      }}
                    />
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
                  <Label htmlFor="published_at">Publish Date</Label>
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
                  Cancel
                </Button>
                <Button type="submit">
                  {editingNews ? 'Update Article' : 'Create Article'}
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
                placeholder="Search articles..."
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
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* News Table */}
      <Card>
        <CardHeader>
          <CardTitle>Articles ({filteredNews.length})</CardTitle>
          <CardDescription>
            Manage your news articles and blog posts
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNews.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        {article.featured_image && (
                          <img 
                            src={article.featured_image} 
                            alt={article.title}
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
                        {article.published_at ? new Date(article.published_at).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        {new Date(article.created_at).toLocaleDateString()}
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
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredNews.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No articles found. {searchTerm && 'Try adjusting your search terms.'}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
