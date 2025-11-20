import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { requireAdmin } from '@/lib/simple-auth';
import sharp from 'sharp';

// ⚠️ CRITICAL: Node.js runtime으로 변경 (세션 유지를 위해 필수)
export const runtime = 'nodejs';

// 섹션별 권장 해상도 설정
const IMAGE_PRESETS = {
  hero: { width: 800, height: 1000, quality: 85 }, // 4:5 비율
  service: { width: 1280, height: 720, quality: 85 }, // 16:9 비율
  gallery: { width: 800, height: 800, quality: 85 }, // 1:1 비율
  default: { width: 1200, height: 1200, quality: 85 }, // 기본값
};

export async function POST(request: NextRequest) {
  // ✅ 인증 체크 추가
  try {
    const session = await requireAdmin();
    console.log('✅ Upload: Authenticated user:', session.email);
  } catch (error) {
    console.error('❌ Upload: Authentication failed');
    return NextResponse.json(
      { error: 'Unauthorized - Please login' },
      { status: 401 }
    );
  }
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const preset = (formData.get('preset') as string) || 'default'; // hero, service, gallery, default

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

    // Validate file size (10MB max before processing)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
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

    // Get preset configuration
    const config = IMAGE_PRESETS[preset as keyof typeof IMAGE_PRESETS] || IMAGE_PRESETS.default;

    console.log('Processing image with preset:', preset, config);
    console.log('Original file:', file.name, 'Size:', file.size, 'Type:', file.type);

    // Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Resize and optimize image with sharp
    const processedImage = await sharp(buffer)
      .resize(config.width, config.height, {
        fit: 'cover', // 크롭하여 정확한 비율 유지
        position: 'center',
      })
      .jpeg({ quality: config.quality }) // JPEG로 변환하여 최적화
      .toBuffer();

    // Generate unique filename
    const timestamp = Date.now();
    const baseFilename = file.name.replace(/\.[^/.]+$/, ''); // 확장자 제거
    const filename = `${timestamp}-${baseFilename.replace(/[^a-zA-Z0-9.-]/g, '_')}.jpg`;

    console.log('Processed image size:', processedImage.length, 'bytes');

    // Upload processed image to Vercel Blob
    const blob = await put(filename, processedImage, {
      access: 'public',
      addRandomSuffix: true,
      contentType: 'image/jpeg',
    });

    console.log('Upload successful:', blob.url);

    return NextResponse.json({
      url: blob.url,
      filename: filename,
      originalSize: file.size,
      processedSize: processedImage.length,
      preset: preset,
      dimensions: { width: config.width, height: config.height },
      type: 'image/jpeg',
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
  // ✅ 인증 체크 추가
  try {
    const session = await requireAdmin();

    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
    }

    // Delete from Vercel Blob Storage
    await del(url);

    console.log('✅ Delete: File deleted by:', session.email);
    return NextResponse.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    if (error instanceof Error && (error.message === 'Unauthorized' || error.message === 'Forbidden')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
