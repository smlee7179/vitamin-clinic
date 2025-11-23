import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - Fetch active slides (public) or all slides (admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminMode = searchParams.get('admin') === 'true';

    if (adminMode) {
      const { error } = await requireAdmin();
      if (error) return error;

      const slides = await prisma.heroSlide.findMany({
        orderBy: { order: 'asc' },
      });
      return NextResponse.json(slides);
    } else {
      // Public: return active slides only
      const slides = await prisma.heroSlide.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
      });
      return NextResponse.json(slides);
    }
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return NextResponse.json({ error: 'Failed to fetch hero slides' }, { status: 500 });
  }
}

// POST - Create new slide (admin only)
export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { imageUrl, title, description, buttonText, buttonLink, order, active } = body;

    if (!imageUrl || !title) {
      return NextResponse.json({ error: 'Image URL and title are required' }, { status: 400 });
    }

    const slide = await prisma.heroSlide.create({
      data: {
        imageUrl,
        title,
        description,
        buttonText,
        buttonLink,
        order: order ?? 0,
        active: active ?? true,
      },
    });

    return NextResponse.json(slide);
  } catch (error) {
    console.error('Error creating hero slide:', error);
    return NextResponse.json({ error: 'Failed to create hero slide' }, { status: 500 });
  }
}

// PUT - Update slide (admin only)
export async function PUT(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { id, imageUrl, title, description, buttonText, buttonLink, order, active } = body;

    if (!id) {
      return NextResponse.json({ error: 'Slide ID is required' }, { status: 400 });
    }

    const slide = await prisma.heroSlide.update({
      where: { id },
      data: {
        imageUrl,
        title,
        description,
        buttonText,
        buttonLink,
        order,
        active,
      },
    });

    return NextResponse.json(slide);
  } catch (error) {
    console.error('Error updating hero slide:', error);
    return NextResponse.json({ error: 'Failed to update hero slide' }, { status: 500 });
  }
}

// DELETE - Delete slide (admin only)
export async function DELETE(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Slide ID is required' }, { status: 400 });
    }

    await prisma.heroSlide.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting hero slide:', error);
    return NextResponse.json({ error: 'Failed to delete hero slide' }, { status: 500 });
  }
}
