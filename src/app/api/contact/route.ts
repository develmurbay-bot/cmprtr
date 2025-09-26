import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { initializeDatabase } from '@/lib/seed';

// GET /api/contact - Get all contact form submissions
export async function GET(request: NextRequest) {
  try {
    // Initialize database if empty
    await initializeDatabase();
    
    const db = getDatabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = 'SELECT * FROM contact';
    const params: (string | number)[] = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    console.log('Database query:', query);
    console.log('Parameters:', params);

    const contacts = db.query(query, params);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM contact';
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

    // Get status counts for dashboard
    const statusCounts = db.query(`
      SELECT 
        status,
        COUNT(*) as count
      FROM contact 
      GROUP BY status
    `);

    return NextResponse.json({
      success: true,
      contacts: contacts,
      statusCounts: statusCounts,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      },
      message: 'Contact submissions retrieved successfully'
    });

  } catch (error) {
    console.error('Get contact error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/contact - Create new contact form submission
export async function POST(request: NextRequest) {
  try {
    const { name, email, message, phone, subject } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'INSERT INTO contact (name, email, message, phone, subject, status) VALUES (?, ?, ?, ?, ?, ?)',
      [
        name, 
        email, 
        message, 
        phone || null,
        subject || 'General Inquiry',
        'new'
      ]
    );

    const newContact = db.query(
      'SELECT * FROM contact WHERE id = ?',
      [result.lastInsertRowid]
    )[0];

    return NextResponse.json({
      success: true,
      contact: newContact,
      message: 'Contact form submitted successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Create contact error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/contact - Update contact submission status
export async function PUT(request: NextRequest) {
  try {
    const { id, status, response_message } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['new', 'in_progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: ' + validStatuses.join(', ') },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'UPDATE contact SET status = ?, response_message = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, response_message || null, id]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Contact submission not found' },
        { status: 404 }
      );
    }

    const updatedContact = db.query(
      'SELECT * FROM contact WHERE id = ?',
      [id]
    )[0];

    return NextResponse.json({
      success: true,
      contact: updatedContact,
      message: 'Contact submission updated successfully'
    });

  } catch (error) {
    console.error('Update contact error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/contact - Delete contact submission
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'DELETE FROM contact WHERE id = ?',
      [parseInt(id)]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Contact submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contact submission deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
