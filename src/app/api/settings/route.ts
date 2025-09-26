import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { getDefaultSettings } from '@/lib/settings';
import { safeJsonStringify } from '@/lib/json-utils';

// GET /api/settings - Get all settings
export async function GET() {
  try {
    const db = getDatabase();
    
    // Get all settings from database
    const rows = db.query('SELECT key, value FROM settings') as Array<{key: string, value: string}>;
    
    // Convert rows to settings object
    const dbSettings: Record<string, unknown> = {};
    rows.forEach(row => {
      try {
        // Try to parse as JSON, fallback to string
        dbSettings[row.key] = JSON.parse(row.value);
      } catch {
        dbSettings[row.key] = row.value;
      }
    });

    // Merge with defaults
    const defaultSettings = getDefaultSettings();
    const settings = { ...defaultSettings, ...dbSettings };

    // Convert to array format expected by admin page
    const settingsArray = Object.entries(settings).map(([key, value]) => ({ key, value }));

    // Create response object and manually stringify to ensure proper JSON format
    const responseData = {
      success: true,
      settings: settingsArray,
      message: 'Settings retrieved successfully'
    };

    return new Response(safeJsonStringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error fetching settings:', error);
    const defaultSettings = getDefaultSettings();
    const settingsArray = Object.entries(defaultSettings).map(([key, value]) => ({ key, value }));
    
    const errorData = { 
      success: false, 
      error: 'Failed to fetch settings',
      settings: settingsArray // Return defaults on error
    };
    
    return new Response(safeJsonStringify(errorData), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// PUT /api/settings - Update settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const db = getDatabase();

    // Handle both { settings: {...} } and direct {...} formats
    const settingsData = body.settings || body;

    // Update each setting individually
    for (const [key, value] of Object.entries(settingsData)) {
      // Convert value to JSON string for storage
      const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
      
      console.log(`Updating setting: ${key} = ${jsonValue}`);
      
      // Try to update first
      const updateResult = db.run(
        'UPDATE settings SET value = ?, updated_at = datetime(\'now\') WHERE key = ?',
        [jsonValue, key]
      );

      // If no rows were updated, insert new record
      if (updateResult.changes === 0) {
        console.log(`Inserting new setting: ${key}`);
        db.run(
          'INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime(\'now\'))',
          [key, jsonValue]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully'
    });

  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update settings' 
      },
      { status: 500 }
    );
  }
}

// POST /api/settings - Create or update individual setting
export async function POST(request: NextRequest) {
  try {
    const { key, value } = await request.json();
    
    if (!key) {
      return NextResponse.json(
        { success: false, error: 'Setting key is required' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    // Convert value to JSON string for storage
    const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
    
    // Try to update first
    const updateResult = db.run(
      'UPDATE settings SET value = ?, updated_at = datetime(\'now\') WHERE key = ?',
      [jsonValue, key]
    );

    // If no rows were updated, insert new record
    if (updateResult.changes === 0) {
      db.run(
        'INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime(\'now\'))',
        [key, jsonValue]
      );
    }

    return NextResponse.json({
      success: true,
      message: `Setting '${key}' updated successfully`
    });

  } catch (error) {
    console.error('Error creating/updating setting:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create/update setting' 
      },
      { status: 500 }
    );
  }
}
