'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  featured_image: string;
  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchArticle();
      fetchRelatedArticles();
    }
  }, [params.id]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/news/${params.id}`);
      const data = await response.json();
      
      if (data.success && data.news) {
        setArticle(data.news);
        
        // Update meta tags for social sharing
        updateMetaTags(data.news);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async () => {
    try {
      const response = await fetch('/api/news?status=published&limit=3');
      const data = await response.json();
      
      if (data.success && data.news) {
        // Filter out current article
        const filtered = data.news.filter((a: NewsArticle) => a.id !== parseInt(params.id as string));
        setRelatedArticles(filtered.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching related articles:', error);
    }
  };

  const updateMetaTags = (article: NewsArticle) => {
    // Update page title
    document.title = `${article.title} - Murbay Konveksi`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', article.content.substring(0, 160) + '...');
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', article.title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', article.content.substring(0, 160) + '...');
    }
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && article.featured_image) {
      ogImage.setAttribute('content', article.featured_image);
    }
    
    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', article.title);
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', article.content.substring(0, 160) + '...');
    }
    
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage && article.featured_image) {
      twitterImage.setAttribute('content', article.featured_image);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareArticle = (platform: string) => {
    if (!article) return;
    
    const url = window.location.href;
    const title = article.title;
    const description = article.content.substring(0, 160) + '...';
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-300 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📰</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Artikel Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">Artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Link href="/news">
            <Button>Kembali ke Berita</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Beranda</Link>
            <span>/</span>
            <Link href="/news" className="hover:text-blue-600">Berita</Link>
            <span>/</span>
            <span className="text-gray-900">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="aspect-video relative overflow-hidden">
            <img
              src={article.featured_image || "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8ae4715a-b21c-4d2b-bc88-232a307f1a0a.png"}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8ae4715a-b21c-4d2b-bc88-232a307f1a0a.png";
              }}
            />
          </div>

          {/* Article Header */}
          <div className="p-8">
            <div className="mb-4">
              <Badge variant="secondary">
                {formatDate(article.published_at || article.created_at)}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Share Buttons */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-sm font-medium text-gray-700">Bagikan:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareArticle('facebook')}
                className="text-blue-600 hover:bg-blue-50"
              >
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareArticle('twitter')}
                className="text-blue-400 hover:bg-blue-50"
              >
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareArticle('whatsapp')}
                className="text-green-600 hover:bg-green-50"
              >
                WhatsApp
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareArticle('linkedin')}
                className="text-blue-700 hover:bg-blue-50"
              >
                LinkedIn
              </Button>
            </div>

            <Separator className="mb-8" />

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {article.content}
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Artikel Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Card key={relatedArticle.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={relatedArticle.featured_image || "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/94ee9c08-fa7c-4749-b1ce-1da99e9401c2.png"}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/94ee9c08-fa7c-4749-b1ce-1da99e9401c2.png";
                      }}
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {formatDate(relatedArticle.published_at || relatedArticle.created_at)}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      <Link href={`/news/${relatedArticle.id}`}>
                        {relatedArticle.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {relatedArticle.content.substring(0, 100)}...
                    </p>
                    <Link href={`/news/${relatedArticle.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Baca Selengkapnya
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Back to News */}
        <div className="mt-12 text-center">
          <Link href="/news">
            <Button variant="outline" size="lg">
              ← Kembali ke Semua Berita
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
