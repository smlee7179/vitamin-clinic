import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - Fetch active popup (public) or all popups (admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminMode = searchParams.get('admin') === 'true';

    if (adminMode) {
      // Admin: return all popups
      const { error } = await requireAdmin();
      if (error) return error;

      const popups = await prisma.popup.findMany({
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      });

      return NextResponse.json(popups);
    } else {
      // Public: return active popup only
      const now = new Date();

      const popup = await prisma.popup.findFirst({
        where: {
          active: true,
          OR: [
            {
              AND: [
                { startDate: { lte: now } },
                { endDate: { gte: now } },
              ],
            },
            {
              startDate: null,
              endDate: null,
            },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json(popup);
    }
  } catch (error) {
    console.error('Error fetching popups:', error);
    return NextResponse.json({ error: 'Failed to fetch popups' }, { status: 500 });
  }
}

// POST - Create new popup (admin only)
export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { title, content, imageUrl, active, showDoNotShow, startDate, endDate, order } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const popup = await prisma.popup.create({
      data: {
        title,
        content,
        imageUrl,
        active: active ?? true,
        showDoNotShow: showDoNotShow ?? true,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        order: order ?? 0,
      },
    });

    return NextResponse.json(popup);
  } catch (error) {
    console.error('Error creating popup:', error);
    return NextResponse.json({ error: 'Failed to create popup' }, { status: 500 });
  }
}

// PUT - Update popup (admin only)
export async function PUT(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { id, title, content, imageUrl, active, showDoNotShow, startDate, endDate, order } = body;

    if (!id) {
      return NextResponse.json({ error: 'Popup ID is required' }, { status: 400 });
    }

    const popup = await prisma.popup.update({
      where: { id },
      data: {
        title,
        content,
        imageUrl,
        active,
        showDoNotShow,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        order,
      },
    });

    return NextResponse.json(popup);
  } catch (error) {
    console.error('Error updating popup:', error);
    return NextResponse.json({ error: 'Failed to update popup' }, { status: 500 });
  }
}

// DELETE - Delete popup (admin only)
export async function DELETE(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Popup ID is required' }, { status: 400 });
    }

    await prisma.popup.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting popup:', error);
    return NextResponse.json({ error: 'Failed to delete popup' }, { status: 500 });
  }
}
