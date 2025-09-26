import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { initializeDatabase } from '@/lib/seed';

// GET /api/news - Get all news articles
export async function GET(request: NextRequest) {
  try {
    // Initialize database if empty
    await initializeDatabase();
    
    const db = getDatabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = 'SELECT * FROM news';
    const params: (string | number)[] = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY published_at DESC, created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    console.log('Database query:', query);
    console.log('Parameters:', params);

    const news = db.query(query, params);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM news';
    const countParams: (string | number)[] = [];
    
    if (status) {
      countQuery += ' WHERE status = ?';
      countParams.push(status);
    }

    const totalResult = db.query(countQuery, countParams);
    // Extract total value - depending on database driver, it might be in different formats
    let total = 0;
    if (totalResult && totalResult.length > 0) {
      const row = totalResult[0];
      // Handle different possible structures of the count result
      if (typeof row === 'object' && row !== null) {
        if ('total' in row) {
          const rowTotal = row.total;
          total = typeof rowTotal === 'number' ? rowTotal : typeof rowTotal === 'string' ? parseInt(rowTotal) || 0 : 0;
        } else if (Object.values(row)[0] !== undefined) {
          // If the count is returned as the first value in the row object
          const firstValue = Object.values(row)[0];
          total = typeof firstValue === 'number' ? firstValue : typeof firstValue === 'string' ? parseInt(firstValue) || 0 : 0;
        }
      }
    }

    return NextResponse.json({
      success: true,
      news: news,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      },
      message: 'News articles retrieved successfully'
    });

  } catch (error) {
    console.error('Get news error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/news - Create new news article
export async function POST(request: NextRequest) {
  try {
    const { title, content, featured_image, status, published_at } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'INSERT INTO news (title, content, featured_image, status, published_at) VALUES (?, ?, ?, ?, ?)',
      [
        title, 
        content, 
        featured_image || null, 
        status || 'draft',
        published_at || new Date().toISOString()
      ]
    );

    const newArticle = db.query(
      'SELECT * FROM news WHERE id = ?',
      [result.lastInsertRowid]
    )[0];

    return NextResponse.json({
      success: true,
      news: newArticle,
      message: 'News article created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Create news error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/news - Update news article
export async function PUT(request: NextRequest) {
  try {
    const { id, title, content, featured_image, status, published_at } = await request.json();

    if (!id || !title || !content) {
      return NextResponse.json(
        { error: 'ID, title and content are required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'UPDATE news SET title = ?, content = ?, featured_image = ?, status = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, content, featured_image || null, status || 'draft', published_at, id]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'News article not found' },
        { status: 404 }
      );
    }

    const updatedArticle = db.query(
      'SELECT * FROM news WHERE id = ?',
      [id]
    )[0];

    return NextResponse.json({
      success: true,
      news: updatedArticle,
      message: 'News article updated successfully'
    });

  } catch (error) {
    console.error('Update news error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/news - Delete news article
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'News article ID is required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'DELETE FROM news WHERE id = ?',
      [parseInt(id)]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'News article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'News article deleted successfully'
    });

  } catch (error) {
    console.error('Delete news error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
