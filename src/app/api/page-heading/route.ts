import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET: Fetch page heading by page name
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

    const heading = await prisma.pageHeading.findUnique({
      where: { page }
    });

    return NextResponse.json(heading);
  } catch (error) {
    console.error('GET /api/page-heading error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page heading' },
      { status: 500 }
    );
  }
}

// POST: Create new page heading
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, title, subtitle } = body;

    if (!page) {
      return NextResponse.json(
        { error: 'Page parameter is required' },
        { status: 400 }
      );
    }

    const heading = await prisma.pageHeading.create({
      data: {
        page,
        title,
        subtitle
      }
    });

    return NextResponse.json(heading);
  } catch (error) {
    console.error('POST /api/page-heading error:', error);
    return NextResponse.json(
      { error: 'Failed to create page heading' },
      { status: 500 }
    );
  }
}

// PUT: Update existing page heading
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, page, title, subtitle } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Heading ID is required' },
        { status: 400 }
      );
    }

    const heading = await prisma.pageHeading.update({
      where: { id },
      data: {
        page,
        title,
        subtitle
      }
    });

    return NextResponse.json(heading);
  } catch (error) {
    console.error('PUT /api/page-heading error:', error);
    return NextResponse.json(
      { error: 'Failed to update page heading' },
      { status: 500 }
    );
  }
}
