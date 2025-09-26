import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    try {
      // Decode the simple token
      const decoded = Buffer.from(token, 'base64').toString();
      const [userId, username] = decoded.split(':');

      if (!userId || !username) {
        return NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        );
      }

      const db = getDatabase();
      
      // Verify user exists with role information
      const users = db.query(`
        SELECT 
          u.*,
          r.name as role_name,
          r.permissions
        FROM admin_users u
        LEFT JOIN roles r ON u.role_id = r.id
        WHERE u.id = ? AND u.username = ?
      `, [parseInt(userId), username]);

      if (users.length === 0) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 401 }
        );
      }

      const user = users[0];

      return NextResponse.json({
        success: true,
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

    } catch (_decodeError) { // eslint-disable-line @typescript-eslint/no-unused-vars
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
