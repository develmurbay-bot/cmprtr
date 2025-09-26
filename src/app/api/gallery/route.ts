import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { initializeDatabase } from '@/lib/seed';

// GET /api/gallery - Get all gallery items
export async function GET(request: NextRequest) {
  try {
    // Initialize database if empty
    await initializeDatabase();
    
    const db = getDatabase();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = 'SELECT * FROM gallery';
    const params: string[] = [];
    
    if (category && category !== 'all') {
      query += ' WHERE category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const gallery = db.query(query, params);

    return NextResponse.json({
      success: true,
      gallery,
      message: 'Gallery items retrieved successfully'
    });

  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}

// POST /api/gallery - Create new gallery item
export async function POST(request: NextRequest) {
  try {
    const { title, image_url, category } = await request.json();

    // Validation
    if (!title || !image_url) {
      return NextResponse.json(
        { success: false, error: 'Title and image URL are required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'INSERT INTO gallery (title, image_url, category, created_at, updated_at) VALUES (?, ?, ?, datetime(\'now\'), datetime(\'now\'))',
      [title, image_url, category || 'general']
    );

    return NextResponse.json({
      success: true,
      gallery: {
        id: result.lastInsertRowid,
        title,
        image_url,
        category: category || 'general'
      },
      message: 'Gallery item created successfully'
    });

  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create gallery item' },
      { status: 500 }
    );
  }
}

// PUT /api/gallery - Update gallery item
export async function PUT(request: NextRequest) {
  try {
    const { id, title, image_url, category } = await request.json();

    // Validation
    if (!id || !title || !image_url) {
      return NextResponse.json(
        { success: false, error: 'ID, title, and image URL are required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'UPDATE gallery SET title = ?, image_url = ?, category = ?, updated_at = datetime(\'now\') WHERE id = ?',
      [title, image_url, category || 'general', id]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      gallery: { id, title, image_url, category: category || 'general' },
      message: 'Gallery item updated successfully'
    });

  } catch (error) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update gallery item' },
      { status: 500 }
    );
  }
}

// DELETE /api/gallery - Delete gallery item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Gallery item ID is required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run('DELETE FROM gallery WHERE id = ?', [id]);

    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete gallery item' },
      { status: 500 }
    );
  }
}
