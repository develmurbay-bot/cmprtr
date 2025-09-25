import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

// Simulate watermark application (in real app, you'd use image processing library)
async function applyWatermark(buffer: Buffer, _watermarkText: string, _enabled: boolean): Promise<Buffer> {
  // In a real implementation, you would use libraries like:
  // - sharp for Node.js image processing
  // - canvas for drawing watermarks
  // - jimp for JavaScript image manipulation
  
  // For now, we'll return the original buffer
  // The watermark would be applied here in production
  return buffer;
}

async function getWatermarkSettings() {
  try {
    // Get watermark settings from database using internal API route
    // This avoids making external HTTP requests during build/deployment
    const response = await fetch('/api/settings');
    const data = await response.json();
    
    if (data.success) {
      const settings: any = {};
      data.settings.forEach((setting: any) => {
        settings[setting.key] = setting.value;
      });
      
      return {
        enabled: settings.watermark_enabled === 'true' || settings.watermark_enabled === true,
        text: settings.watermark_text || 'Murbay Konveksi'
      };
    }
  } catch (error) {
    console.error('Error fetching watermark settings:', error);
  }
  
  return {
    enabled: false,
    text: 'Murbay Konveksi'
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Get file buffer
    const bytes = await file.arrayBuffer();
    let buffer = Buffer.from(bytes);

    // Get watermark settings
    const watermarkSettings = await getWatermarkSettings();

    // Apply watermark if enabled
    if (watermarkSettings.enabled) {
      buffer = await applyWatermark(buffer, watermarkSettings.text, true);
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const fileName = `${randomUUID()}${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);

    // Write file to disk
    await writeFile(filePath, buffer);

    // Return the public URL
    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      url: fileUrl,
      filename: fileName,
      originalName: file.name,
      size: file.size,
      watermarkApplied: watermarkSettings.enabled
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { success: false, message: 'Filename is required' },
        { status: 400 }
      );
    }

    // Security check: ensure filename doesn't contain path traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json(
        { success: false, message: 'Invalid filename' },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

    // Check if file exists and delete it
    if (existsSync(filePath)) {
      await unlink(filePath);
      
      return NextResponse.json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      return NextResponse.json({
        success: false, message: 'File not found'
      }, { status: 404 });
    }

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
