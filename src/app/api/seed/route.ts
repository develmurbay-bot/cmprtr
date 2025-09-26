import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

export async function POST(_request: NextRequest) { // eslint-disable-line @typescript-eslint/no-unused-vars
  try {
    console.log('Manual database seeding requested...');
    const result = await seedDatabase();
    
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      counts: result
    });
  } catch (error) {
    console.error('Manual seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(_request: NextRequest) { // eslint-disable-line @typescript-eslint/no-unused-vars
  return NextResponse.json({
    message: 'Use POST method to seed database',
    endpoint: '/api/seed'
  });
}
