import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET(_request: NextRequest) { // eslint-disable-line @typescript-eslint/no-unused-vars
  try {
    const db = getDatabase();
    
    // Get all roles
    const roles = db.query(`
      SELECT 
        id,
        name,
        description,
        permissions,
        created_at
      FROM roles
      ORDER BY id ASC
    `);

    return NextResponse.json({
      success: true,
      roles
    });

  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
