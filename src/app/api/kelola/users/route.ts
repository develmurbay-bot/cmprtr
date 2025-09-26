import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET(_request: NextRequest) { // eslint-disable-line @typescript-eslint/no-unused-vars
  try {
    const db = getDatabase();
    
    // Get all users with role information
    const users = db.query(`
      SELECT 
        u.id,
        u.username,
        u.email,
        u.full_name,
        u.role_id,
        u.created_at,
        u.updated_at,
        r.name as role_name,
        r.description as role_description
      FROM admin_users u
      LEFT JOIN roles r ON u.role_id = r.id
      ORDER BY u.created_at DESC
    `);

    return NextResponse.json({
      success: true,
      users
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, password, email, full_name, role_id } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    // Check if username already exists
    const existingUsers = db.query(
      'SELECT id FROM admin_users WHERE username = ?',
      [username]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Username sudah digunakan' },
        { status: 400 }
      );
    }

    // Insert new user
    const result = db.run(
      'INSERT INTO admin_users (username, password, email, full_name, role_id) VALUES (?, ?, ?, ?, ?)',
      [username, password, email || null, full_name || null, role_id || 2]
    );

    return NextResponse.json({
      success: true,
      message: 'User berhasil ditambahkan',
      userId: result.lastInsertRowid
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
