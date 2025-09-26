import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    
    // Decode the simple token to get user info
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      const [userId, username] = decoded.split(':');
      
      if (!userId || !username) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
      
      const db = getDatabase();
      
      // Verify user exists with role information
      const users = db.query(`
        SELECT 
          u.id, 
          u.username, 
          u.email, 
          u.full_name,
          r.name as role
        FROM admin_users u
        LEFT JOIN roles r ON u.role_id = r.id
        WHERE u.id = ? AND u.username = ?
      `, [parseInt(userId), username]);

      if (users.length === 0) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }

      const user = users[0];

      return NextResponse.json({
        success: true,
        profile: {
          id: user.id,
          username: user.username,
          role: user.role || 'admin',
          email: user.email || '',
          full_name: user.full_name || ''
        }
      });
    } catch (_decodeError) {
      return NextResponse.json({ error: 'Invalid token format' }, { status: 401 });
    }

  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { username, email, full_name } = await request.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const db = getDatabase();

    // Decode the simple token to get user info
    let currentUserId, currentUsername;
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      const tokenParts = decoded.split(':');
      
      if (tokenParts.length !== 3) {
        return NextResponse.json({ error: 'Invalid token format' }, { status: 401 });
      }
      
      [currentUserId, currentUsername] = tokenParts;
      
      if (!currentUserId || !currentUsername) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    } catch (_decodeError) {
      return NextResponse.json({ error: 'Invalid token format' }, { status: 401 });
    }

    // Verify token and get current user
    const currentUsers = db.query(
      'SELECT id, username FROM admin_users WHERE id = ? AND username = ?',
      [parseInt(currentUserId), currentUsername]
    );

    if (!currentUsers || currentUsers.length === 0) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const currentUser = currentUsers[0];

    // Check if username is already taken by another user
    if (username !== currentUser.username) {
      const existingUsers = db.query(
        'SELECT id FROM admin_users WHERE username = ? AND id != ?',
        [username, currentUser.id]
      );

      if (existingUsers && existingUsers.length > 0) {
        return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
      }
    }

    // Update user profile
    db.run(
      'UPDATE admin_users SET username = ?, email = ?, full_name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [username, email || null, full_name || null, currentUser.id]
    );

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
