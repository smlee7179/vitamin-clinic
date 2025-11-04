import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';

export async function GET() {
  try {
    const notices = await prisma.marqueeNotice.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(notices);
  } catch (error) {
    console.error('Error fetching marquee notices:', error);
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Check admin authentication
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { notices } = body;

    // Delete all existing notices
    await prisma.marqueeNotice.deleteMany();

    // Create new notices
    const created = await prisma.marqueeNotice.createMany({
      data: notices.map((notice: any, index: number) => ({
        icon: notice.icon,
        text: notice.text,
        order: index,
        active: true,
      })),
    });

    return NextResponse.json({ success: true, count: created.count });
  } catch (error) {
    console.error('Error saving marquee notices:', error);
    return NextResponse.json({ error: 'Failed to save notices' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  // Check admin authentication
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { id, ...data } = body;

    const notice = await prisma.marqueeNotice.update({
      where: { id },
      data,
    });

    return NextResponse.json(notice);
  } catch (error) {
    console.error('Error updating marquee notice:', error);
    return NextResponse.json({ error: 'Failed to update notice' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  // Check admin authentication
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID parameter required' }, { status: 400 });
    }

    await prisma.marqueeNotice.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting marquee notice:', error);
    return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
  }
}
