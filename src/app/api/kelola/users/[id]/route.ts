import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    const { username, password, email, full_name, role_id } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: 'Username wajib diisi' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    // Check if username already exists (excluding current user)
    const existingUsers = db.query(
      'SELECT id FROM admin_users WHERE username = ? AND id != ?',
      [username, userId]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Username sudah digunakan' },
        { status: 400 }
      );
    }

    // Build update query dynamically
    const updateFields = ['username = ?', 'email = ?', 'full_name = ?', 'role_id = ?', 'updated_at = CURRENT_TIMESTAMP'];
    const updateValues = [username, email || null, full_name || null, role_id || 2];

    // Only update password if provided
    if (password && password.trim() !== '') {
      updateFields.splice(1, 0, 'password = ?');
      updateValues.splice(1, 0, password);
    }

    updateValues.push(userId);

    const result = db.run(
      `UPDATE admin_users SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User berhasil diupdate'
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    const db = getDatabase();
    
    // Check if user exists
    const users = db.query('SELECT id, username FROM admin_users WHERE id = ?', [userId]);
    
    if (users.length === 0) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    // Prevent deleting the last admin user
    const adminUsers = db.query(
      'SELECT COUNT(*) as count FROM admin_users u JOIN roles r ON u.role_id = r.id WHERE r.name = ?',
      ['admin']
    );

    if (adminUsers[0].count <= 1) {
      const userRole = db.query(
        'SELECT r.name FROM admin_users u JOIN roles r ON u.role_id = r.id WHERE u.id = ?',
        [userId]
      );
      
      if (userRole.length > 0 && userRole[0].name === 'admin') {
        return NextResponse.json(
          { error: 'Tidak dapat menghapus admin terakhir' },
          { status: 400 }
        );
      }
    }

    // Delete user
    const result = db.run('DELETE FROM admin_users WHERE id = ?', [userId]);

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Gagal menghapus user' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User berhasil dihapus'
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
