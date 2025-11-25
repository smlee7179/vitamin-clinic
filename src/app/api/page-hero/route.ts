import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET: Fetch page hero by page name
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

    const hero = await prisma.pageHero.findUnique({
      where: { page }
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.error('GET /api/page-hero error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page hero' },
      { status: 500 }
    );
  }
}

// POST: Create new page hero
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, imageUrl, title, subtitle } = body;

    if (!page) {
      return NextResponse.json(
        { error: 'Page parameter is required' },
        { status: 400 }
      );
    }

    const hero = await prisma.pageHero.create({
      data: {
        page,
        imageUrl,
        title,
        subtitle
      }
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.error('POST /api/page-hero error:', error);
    return NextResponse.json(
      { error: 'Failed to create page hero' },
      { status: 500 }
    );
  }
}

// PUT: Update existing page hero
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, page, imageUrl, title, subtitle } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Hero ID is required' },
        { status: 400 }
      );
    }

    const hero = await prisma.pageHero.update({
      where: { id },
      data: {
        page,
        imageUrl,
        title,
        subtitle
      }
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.error('PUT /api/page-hero error:', error);
    return NextResponse.json(
      { error: 'Failed to update page hero' },
      { status: 500 }
    );
  }
}
