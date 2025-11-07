import { NextRequest, NextResponse } from 'next/server';
import { list, del } from '@vercel/blob';

export const runtime = 'edge';

// GET: 모든 이미지 목록 조회
export async function GET(request: NextRequest) {
  try {
    console.log('📂 GET /api/images - Listing images...');

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('❌ BLOB_READ_WRITE_TOKEN is not configured');
      return NextResponse.json(
        { error: 'Blob Storage is not configured' },
        { status: 500 }
      );
    }

    console.log('✅ BLOB_READ_WRITE_TOKEN is configured');

    // Vercel Blob에서 모든 파일 목록 가져오기
    console.log('🔄 Calling list()...');
    const { blobs } = await list();
    console.log(`✅ list() returned ${blobs.length} blobs`);

    // 이미지 파일만 필터링 (선택적)
    const images = blobs.filter(blob => {
      const ext = blob.pathname.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '');
    });

    console.log(`🖼️ Filtered to ${images.length} images`);

    // 최신순으로 정렬
    images.sort((a, b) => {
      return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
    });

    const response = {
      images: images.map(blob => ({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      })),
      total: images.length,
    };

    console.log('✅ Returning response:', JSON.stringify(response, null, 2));

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Error listing images:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      {
        error: 'Failed to list images',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// DELETE: 이미지 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Blob Storage is not configured' },
        { status: 500 }
      );
    }

    // Vercel Blob Storage에서 삭제
    await del(url);

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
      deletedUrl: url
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
