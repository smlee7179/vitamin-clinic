import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';

export const runtime = 'edge';

// Note: Authentication is handled by middleware for this route
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Check if Vercel Blob is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN is not configured');
      return NextResponse.json(
        {
          error: 'Vercel Blob Storage is not configured. Please connect Blob Storage in Vercel Dashboard.',
          details: 'Go to your Vercel project -> Storage -> Connect Store -> Blob'
        },
        { status: 500 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    console.log('Uploading file:', filename, 'Size:', file.size, 'Type:', file.type);

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    console.log('Upload successful:', blob.url);

    return NextResponse.json({
      url: blob.url,
      filename: filename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Error uploading file:', error);

    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error instanceof Error ? error.stack : '';

    return NextResponse.json(
      {
        error: 'Failed to upload file',
        message: errorMessage,
        details: errorDetails,
        hint: 'Please ensure Vercel Blob Storage is connected in your project settings'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
    }

    // Delete from Vercel Blob Storage
    await del(url);

    return NextResponse.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
