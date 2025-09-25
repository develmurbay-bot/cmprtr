import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// GET /api/news/[id] - Get single news article
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDatabase();
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    // Get the article
    const articles = db.query(`
      SELECT * FROM news 
      WHERE id = ? AND status = 'published'
    `, [id]) as Array<{[key: string]: any}>;

    const article = articles[0];

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
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
  { params }: { params: { id: string } }
) {
  try {
    const db = getDatabase();
    const id = parseInt(params.id);
    const { title, content, featured_image, status, published_at } = await request.json();

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Check if article exists
    const existingArticles = db.query('SELECT id FROM news WHERE id = ?', [id]) as Array<{[key: string]: any}>;
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
    `, [title, content, featured_image || null, status || 'draft', published_at || null, id]);

    if (updateResult.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to update article' },
        { status: 500 }
      );
    }

    // Get updated article
    const updatedArticles = db.query('SELECT * FROM news WHERE id = ?', [id]) as any[];
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
  { params }: { params: { id: string } }
) {
  try {
    const db = getDatabase();
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    // Check if article exists
    const existingArticles = db.query('SELECT id FROM news WHERE id = ?', [id]) as Array<{[key: string]: any}>;
    if (existingArticles.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    // Delete the article
    const deleteResult = db.run('DELETE FROM news WHERE id = ?', [id]);

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
