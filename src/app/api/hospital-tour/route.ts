import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET: Fetch all hospital tour images
export async function GET() {
  try {
    const tours = await prisma.hospitalTour.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(tours);
  } catch (error) {
    console.error('GET /api/hospital-tour error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hospital tours' },
      { status: 500 }
    );
  }
}

// POST: Create new hospital tour image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, imageUrl, order, active } = body;

    const tour = await prisma.hospitalTour.create({
      data: {
        title,
        imageUrl,
        order: order ?? 0,
        active: active ?? true
      }
    });

    return NextResponse.json(tour);
  } catch (error) {
    console.error('POST /api/hospital-tour error:', error);
    return NextResponse.json(
      { error: 'Failed to create hospital tour' },
      { status: 500 }
    );
  }
}

// PUT: Update existing hospital tour image
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, imageUrl, order, active } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Tour ID is required' },
        { status: 400 }
      );
    }

    const tour = await prisma.hospitalTour.update({
      where: { id },
      data: {
        title,
        imageUrl,
        order,
        active
      }
    });

    return NextResponse.json(tour);
  } catch (error) {
    console.error('PUT /api/hospital-tour error:', error);
    return NextResponse.json(
      { error: 'Failed to update hospital tour' },
      { status: 500 }
    );
  }
}

// DELETE: Delete hospital tour image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Tour ID is required' },
        { status: 400 }
      );
    }

    await prisma.hospitalTour.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/hospital-tour error:', error);
    return NextResponse.json(
      { error: 'Failed to delete hospital tour' },
      { status: 500 }
    );
  }
}
