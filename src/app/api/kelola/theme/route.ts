import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// Helper function to verify token
function verifyToken(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [userId, username] = decoded.split(':');
    
    if (!userId || !username) {
      return null;
    }

    return { userId: parseInt(userId), username };
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const authData = verifyToken(request.headers.get('authorization'));
    
    if (!authData) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = getDatabase();
    
    const users = db.query(
      'SELECT theme_preference FROM admin_users WHERE id = ?',
      [authData.userId]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      theme: users[0].theme_preference
    });

  } catch (error) {
    console.error('Get theme error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authData = verifyToken(request.headers.get('authorization'));
    
    if (!authData) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { theme } = await request.json();

    if (!theme || !['adminlte-inspired', 'adminlte-pure'].includes(theme)) {
      return NextResponse.json(
        { error: 'Invalid theme. Must be "adminlte-inspired" or "adminlte-pure"' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    const result = db.run(
      'UPDATE admin_users SET theme_preference = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [theme, authData.userId]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      theme: theme
    });

  } catch (error) {
    console.error('Update theme error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
