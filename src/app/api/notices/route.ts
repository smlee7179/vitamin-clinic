import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - Fetch all notices (public access for listing, admin for all fields)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const category = searchParams.get('category');

    const where: any = {};

    // Filter by category if provided
    if (category && category !== 'all') {
      where.category = category;
    }

    const notices = await prisma.notice.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(notices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}

// POST - Create new notice (admin only)
export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { title, content, important, category } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const notice = await prisma.notice.create({
      data: {
        title,
        content,
        important: important || false,
        category: category || 'general',
      },
    });

    return NextResponse.json(notice);
  } catch (error) {
    console.error('Error creating notice:', error);
    return NextResponse.json({ error: 'Failed to create notice' }, { status: 500 });
  }
}

// PUT - Update notice (admin only)
export async function PUT(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { id, title, content, important, category } = body;

    if (!id) {
      return NextResponse.json({ error: 'Notice ID is required' }, { status: 400 });
    }

    const notice = await prisma.notice.update({
      where: { id },
      data: {
        title,
        content,
        important,
        category,
      },
    });

    return NextResponse.json(notice);
  } catch (error) {
    console.error('Error updating notice:', error);
    return NextResponse.json({ error: 'Failed to update notice' }, { status: 500 });
  }
}

// DELETE - Delete notice (admin only)
export async function DELETE(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Notice ID is required' }, { status: 400 });
    }

    await prisma.notice.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting notice:', error);
    return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
  }
}
