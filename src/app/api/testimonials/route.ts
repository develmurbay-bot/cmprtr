import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { initializeDatabase } from '@/lib/seed';

// GET /api/testimonials - Get all testimonials
export async function GET(request: NextRequest) {
  try {
    // Initialize database if empty
    await initializeDatabase();
    
    const db = getDatabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = 'SELECT * FROM testimonials';
    const params: (string | number)[] = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    console.log('Database query:', query);
    console.log('Parameters:', params);

    const testimonials = db.query(query, params);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM testimonials';
    const countParams: string[] = [];
    
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
      testimonials: testimonials,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      },
      message: 'Testimonials retrieved successfully'
    });

  } catch (error) {
    console.error('Get testimonials error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/testimonials - Create new testimonial
export async function POST(request: NextRequest) {
  try {
    const { name, content, customer_photo, rating, status } = await request.json();

    if (!name || !content) {
      return NextResponse.json(
        { error: 'Name and content are required' },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'INSERT INTO testimonials (name, content, customer_photo, rating, status) VALUES (?, ?, ?, ?, ?)',
      [
        name, 
        content, 
        customer_photo || null, 
        rating || 5,
        status || 'pending'
      ]
    );

    const newTestimonial = db.query(
      'SELECT * FROM testimonials WHERE id = ?',
      [result.lastInsertRowid]
    )[0];

    return NextResponse.json({
      success: true,
      testimonial: newTestimonial,
      message: 'Testimonial created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Create testimonial error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/testimonials - Update testimonial
export async function PUT(request: NextRequest) {
  try {
    const { id, name, content, customer_photo, rating, status } = await request.json();

    if (!id || !name || !content) {
      return NextResponse.json(
        { error: 'ID, name and content are required' },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'UPDATE testimonials SET name = ?, content = ?, customer_photo = ?, rating = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, content, customer_photo || null, rating || 5, status || 'pending', id]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    const updatedTestimonial = db.query(
      'SELECT * FROM testimonials WHERE id = ?',
      [id]
    )[0];

    return NextResponse.json({
      success: true,
      testimonial: updatedTestimonial,
      message: 'Testimonial updated successfully'
    });

  } catch (error) {
    console.error('Update testimonial error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/testimonials - Delete testimonial
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'DELETE FROM testimonials WHERE id = ?',
      [parseInt(id)]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });

  } catch (error) {
    console.error('Delete testimonial error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
