import { NextRequest, NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { requireAdmin } from '@/lib/simple-auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest): Promise<NextResponse> {
  // ✅ Require authentication
  try {
    const session = await requireAdmin();
    console.log('✅ Upload Token: Authenticated user:', session.email);
  } catch (error) {
    console.error('❌ Upload Token: Authentication failed');
    return NextResponse.json(
      { error: 'Unauthorized - Please login' },
      { status: 401 }
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Generate a client token for the blob
        console.log('Generating upload token for:', pathname);

        return {
          allowedContentTypes: [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
            'image/gif'
          ],
          maximumSizeInBytes: 20 * 1024 * 1024, // 20MB
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('✅ Client upload completed:', blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Error generating upload token:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload token' },
      { status: 500 }
    );
  }
}
