import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { initializeDatabase } from '@/lib/seed';

export async function GET() {
  try {
    // Initialize database if empty
    await initializeDatabase();
    
    const db = getDatabase();
    
    const services = db.query(
      'SELECT * FROM services ORDER BY created_at DESC'
    );

    return NextResponse.json({
      success: true,
      services: services
    });

  } catch (error) {
    console.error('Get services error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, image_url } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'INSERT INTO services (title, description, image_url) VALUES (?, ?, ?)',
      [title, description, image_url || null]
    );

    const newService = db.query(
      'SELECT * FROM services WHERE id = ?',
      [result.lastInsertRowid]
    )[0];

    return NextResponse.json({
      success: true,
      service: newService
    }, { status: 201 });

  } catch (error) {
    console.error('Create service error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, title, description, image_url } = await request.json();

    if (!id || !title || !description) {
      return NextResponse.json(
        { error: 'ID, title and description are required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'UPDATE services SET title = ?, description = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description, image_url || null, id]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    const updatedService = db.query(
      'SELECT * FROM services WHERE id = ?',
      [id]
    )[0];

    return NextResponse.json({
      success: true,
      service: updatedService
    });

  } catch (error) {
    console.error('Update service error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Service ID is required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'DELETE FROM services WHERE id = ?',
      [parseInt(id)]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully'
    });

  } catch (error) {
    console.error('Delete service error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
