import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { initializeDatabase } from '@/lib/seed';

export async function POST(request: NextRequest) {
  try {
    // Initialize database if empty
    await initializeDatabase();
    
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    // Find user in database with role information
    const users = db.query(`
      SELECT 
        u.*,
        r.name as role_name,
        r.permissions
      FROM admin_users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.username = ? AND u.password = ?
    `, [username, password]);

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = users[0];
    
    // Create a simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${user.username}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role_name,
        role_id: user.role_id,
        permissions: user.permissions 
          ? typeof user.permissions === 'string' 
            ? JSON.parse(user.permissions) 
            : user.permissions 
          : {},
        theme_preference: user.theme_preference
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
