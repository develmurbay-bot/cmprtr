import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { initializeDatabase } from '@/lib/seed';

// GET /api/faq - Get all FAQ items
export async function GET(request: NextRequest) {
  try {
    // Initialize database if empty
    await initializeDatabase();
    
    const db = getDatabase();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = 'SELECT * FROM faq';
    const params: (string | number)[] = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }

    query += ' ORDER BY order_index ASC, created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    console.log('Database query:', query);
    console.log('Parameters:', params);

    const faqs = db.query(query, params);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM faq';
    const countParams: (string | number)[] = [];
    
    if (category) {
      countQuery += ' WHERE category = ?';
      countParams.push(category);
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

    // Get categories for filtering
    const categoriesResult = db.query('SELECT DISTINCT category FROM faq ORDER BY category');
    const categories = categoriesResult.map((row: Record<string, unknown>) => 
      typeof row.category === 'string' ? row.category : String(row.category || '')
    );

    return NextResponse.json({
      success: true,
      faqs: faqs,
      categories: categories,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      },
      message: 'FAQ items retrieved successfully'
    });

  } catch (error) {
    console.error('Get FAQ error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/faq - Create new FAQ item
export async function POST(request: NextRequest) {
  try {
    const { question, answer, category, order_index } = await request.json();

    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    // If no order_index provided, get the next available order
    let finalOrderIndex = order_index;
    if (!finalOrderIndex) {
      const maxOrderResult = db.query(
        'SELECT MAX(order_index) as max_order FROM faq WHERE category = ?',
        [category || 'General']
      );
      
      // Extract max_order value - similar to the total handling
      let maxOrder = 0;
      if (maxOrderResult && maxOrderResult.length > 0) {
        const row = maxOrderResult[0];
        if (typeof row === 'object' && row !== null) {
          if ('max_order' in row) {
            const rowMaxOrder = row.max_order;
            maxOrder = typeof rowMaxOrder === 'number' ? rowMaxOrder : typeof rowMaxOrder === 'string' ? parseInt(rowMaxOrder) || 0 : 0;
          } else if (Object.values(row)[0] !== undefined) {
            const firstValue = Object.values(row)[0];
            maxOrder = typeof firstValue === 'number' ? firstValue : typeof firstValue === 'string' ? parseInt(firstValue) || 0 : 0;
          }
        }
      }
      finalOrderIndex = maxOrder + 1;
    }
    
    const result = db.run(
      'INSERT INTO faq (question, answer, category, order_index) VALUES (?, ?, ?, ?)',
      [
        question, 
        answer, 
        category || 'General', 
        finalOrderIndex
      ]
    );

    const newFaq = db.query(
      'SELECT * FROM faq WHERE id = ?',
      [result.lastInsertRowid]
    )[0];

    return NextResponse.json({
      success: true,
      faq: newFaq,
      message: 'FAQ item created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Create FAQ error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/faq - Update FAQ item
export async function PUT(request: NextRequest) {
  try {
    const { id, question, answer, category, order_index } = await request.json();

    if (!id || !question || !answer) {
      return NextResponse.json(
        { error: 'ID, question and answer are required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'UPDATE faq SET question = ?, answer = ?, category = ?, order_index = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [question, answer, category || 'General', order_index || 1, id]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'FAQ item not found' },
        { status: 404 }
      );
    }

    const updatedFaq = db.query(
      'SELECT * FROM faq WHERE id = ?',
      [id]
    )[0];

    return NextResponse.json({
      success: true,
      faq: updatedFaq,
      message: 'FAQ item updated successfully'
    });

  } catch (error) {
    console.error('Update FAQ error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/faq - Delete FAQ item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'FAQ ID is required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'DELETE FROM faq WHERE id = ?',
      [parseInt(id)]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'FAQ item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'FAQ item deleted successfully'
    });

  } catch (error) {
    console.error('Delete FAQ error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
