import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  featured_image?: string;
  status: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

interface ContextParams {
  id: string;
}

// GET /api/news/[id] - Get single news article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<ContextParams> }
) {
  try {
    const { id } = await params;
    const db = getDatabase();
    const articleId = parseInt(id);

    if (isNaN(articleId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    // Get the article regardless of status
    const articles = db.query(`
      SELECT * FROM news 
      WHERE id = ?
    `, [articleId]) as NewsArticle[];

    const article = articles[0];

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    // For non-published articles, potentially return a different response
    // For public users, you might want to restrict access here
    // For now, we'll return the article regardless of status
    if (article.status !== 'published') {
      // If you want to restrict access to non-published articles, implement auth check here
      // For now, we'll return it but could add additional logic
    }

    return NextResponse.json({
      success: true,
      news: article
    });

  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

// PUT /api/news/[id] - Update news article
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<ContextParams> }
) {
  try {
    const { id } = await params;
    const db = getDatabase();
    const articleId = parseInt(id);
    
    if (isNaN(articleId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    const { title, content, featured_image, status, published_at } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Check if article exists
    const existingArticles = db.query('SELECT id FROM news WHERE id = ?', [articleId]) as {id: number}[];
    if (existingArticles.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    // Update the article
    const updateResult = db.run(`
      UPDATE news 
      SET title = ?, content = ?, featured_image = ?, status = ?, 
          published_at = ?, updated_at = datetime('now')
      WHERE id = ?
    `, [title, content, featured_image || null, status || 'draft', published_at || null, articleId]);

    if (updateResult.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to update article' },
        { status: 500 }
      );
    }

    // Get updated article
    const updatedArticles = db.query('SELECT * FROM news WHERE id = ?', [articleId]) as NewsArticle[];
    const updatedArticle = updatedArticles[0];

    return NextResponse.json({
      success: true,
      message: 'Article updated successfully',
      news: updatedArticle
    });

  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

// DELETE /api/news/[id] - Delete news article
export async function DELETE(
  request: NextRequest,
  ctx: RouteContext<'/api/news/[id]'> // ✅ Gunakan RouteContext
) {
  try {
    const { id } = await ctx.params; // ✅ params adalah Promise
    const db = getDatabase();
    const articleId = parseInt(id);
    
    if (isNaN(articleId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    // Check if article exists
    const existingArticles = db.query('SELECT id FROM news WHERE id = ?', [articleId]) as {id: number}[];
    if (existingArticles.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    // Delete the article
    const deleteResult = db.run('DELETE FROM news WHERE id = ?', [articleId]);

    if (deleteResult.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete article' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
