import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET: Fetch all info cards
export async function GET() {
  try {
    const cards = await prisma.infoCard.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(cards);
  } catch (error) {
    console.error('GET /api/info-cards error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch info cards' },
      { status: 500 }
    );
  }
}

// POST: Create new info card
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, emoji, title, description, order, active } = body;

    const card = await prisma.infoCard.create({
      data: {
        page: page || 'notices',
        emoji,
        title,
        description,
        order: order ?? 0,
        active: active ?? true
      }
    });

    return NextResponse.json(card);
  } catch (error) {
    console.error('POST /api/info-cards error:', error);
    return NextResponse.json(
      { error: 'Failed to create info card' },
      { status: 500 }
    );
  }
}

// PUT: Update existing info card
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, page, emoji, title, description, order, active } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Card ID is required' },
        { status: 400 }
      );
    }

    const card = await prisma.infoCard.update({
      where: { id },
      data: {
        page: page || 'notices',
        emoji,
        title,
        description,
        order,
        active
      }
    });

    return NextResponse.json(card);
  } catch (error) {
    console.error('PUT /api/info-cards error:', error);
    return NextResponse.json(
      { error: 'Failed to update info card' },
      { status: 500 }
    );
  }
}

// DELETE: Delete info card
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Card ID is required' },
        { status: 400 }
      );
    }

    await prisma.infoCard.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/info-cards error:', error);
    return NextResponse.json(
      { error: 'Failed to delete info card' },
      { status: 500 }
    );
  }
}
