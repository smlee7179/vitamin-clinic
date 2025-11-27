import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET: Fetch page notice by page name
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    if (!page) {
      return NextResponse.json(
        { error: 'Page parameter is required' },
        { status: 400 }
      );
    }

    const notice = await prisma.pageNotice.findUnique({
      where: { page }
    });

    return NextResponse.json(notice);
  } catch (error) {
    console.error('GET /api/page-notice error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page notice' },
      { status: 500 }
    );
  }
}

// POST: Create new page notice
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, content, type, active } = body;

    if (!page) {
      return NextResponse.json(
        { error: 'Page parameter is required' },
        { status: 400 }
      );
    }

    const notice = await prisma.pageNotice.create({
      data: {
        page,
        content,
        type: type || 'info',
        active: active ?? true
      }
    });

    return NextResponse.json(notice);
  } catch (error) {
    console.error('POST /api/page-notice error:', error);
    return NextResponse.json(
      { error: 'Failed to create page notice' },
      { status: 500 }
    );
  }
}

// PUT: Update existing page notice
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, content, type, active } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Notice ID is required' },
        { status: 400 }
      );
    }

    const notice = await prisma.pageNotice.update({
      where: { id },
      data: {
        content,
        type: type || 'info',
        active: active ?? true
      }
    });

    return NextResponse.json(notice);
  } catch (error) {
    console.error('PUT /api/page-notice error:', error);
    return NextResponse.json(
      { error: 'Failed to update page notice' },
      { status: 500 }
    );
  }
}
