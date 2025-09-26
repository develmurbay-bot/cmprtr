import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

async function handleChangePassword(request: NextRequest) {
  try {
    console.log('Change password request received');
    const authHeader = request.headers.get('authorization');
    console.log('Authorization header:', authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid authorization header');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    console.log('Extracted token:', token);
    
    const { currentPassword, newPassword, confirmPassword } = await request.json();
    console.log('Request body:', { currentPassword, newPassword, confirmPassword });

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
    console.log('Raw token:', token);
    const decodedToken = Buffer.from(token, 'base64').toString();
    console.log('Decoded token:', decodedToken);
    const tokenParts = decodedToken.split(':');
    console.log('Token parts:', tokenParts, 'Length:', tokenParts.length);
    
    if (tokenParts.length !== 3) {
      return NextResponse.json({ error: 'Invalid token format' }, { status: 401 });
    }

    const [userId, username, timestamp] = tokenParts;
    console.log('Parsed userId:', userId, 'username:', username);
    
    // Validate that userId is a number
    const userIdNum = parseInt(userId);
    if (isNaN(userIdNum)) {
      return NextResponse.json({ error: 'Invalid user ID in token' }, { status: 401 });
    }

    // Get current user
    console.log('Querying user with id:', userIdNum, 'and username:', username);
    const users = db.query(
      'SELECT id, username, password FROM admin_users WHERE id = ? AND username = ?',
      [userIdNum, username]
    );
    console.log('Query result:', users);

    if (!users || users.length === 0) {
      console.log('User not found in database');
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const user = users[0];
    console.log('Found user:', user);

    // For plain text passwords, compare directly
    console.log('Comparing passwords:', {
      storedPassword: user.password,
      inputPassword: currentPassword,
      match: user.password === currentPassword
    });
    
    if (user.password !== currentPassword) {
      console.log('Current password is incorrect');
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

export async function PUT(request: NextRequest) {
  return handleChangePassword(request);
}

export async function POST(request: NextRequest) {
  return handleChangePassword(request);
}