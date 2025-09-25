import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { currentPassword, newPassword, confirmPassword } = await request.json();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: 'All password fields are required' }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'New password and confirm password do not match' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    const db = getDatabase();

    // Decode token to get user info
    const tokenParts = Buffer.from(token, 'base64').toString().split(':');
    if (tokenParts.length !== 3) {
      return NextResponse.json({ error: 'Invalid token format' }, { status: 401 });
    }

    const [userId, username] = tokenParts;

    // Get current user
    const users = db.query(
      'SELECT id, username, password FROM admin_users WHERE id = ? AND username = ?',
      [parseInt(userId), username]
    );

    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const user = users[0];

    // For plain text passwords, compare directly
    if (user.password !== currentPassword) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    // Update password (keeping as plain text for now)
    db.run(
      'UPDATE admin_users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [newPassword, user.id]
    );

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
