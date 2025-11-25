import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET: Fetch all equipment
export async function GET() {
  try {
    const equipment = await prisma.equipment.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(equipment);
  } catch (error) {
    console.error('GET /api/equipment error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch equipment' },
      { status: 500 }
    );
  }
}

// POST: Create new equipment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, imageUrl, order, active } = body;

    const equipment = await prisma.equipment.create({
      data: {
        name,
        description,
        imageUrl,
        order: order ?? 0,
        active: active ?? true
      }
    });

    return NextResponse.json(equipment);
  } catch (error) {
    console.error('POST /api/equipment error:', error);
    return NextResponse.json(
      { error: 'Failed to create equipment' },
      { status: 500 }
    );
  }
}

// PUT: Update existing equipment
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, imageUrl, order, active } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Equipment ID is required' },
        { status: 400 }
      );
    }

    const equipment = await prisma.equipment.update({
      where: { id },
      data: {
        name,
        description,
        imageUrl,
        order,
        active
      }
    });

    return NextResponse.json(equipment);
  } catch (error) {
    console.error('PUT /api/equipment error:', error);
    return NextResponse.json(
      { error: 'Failed to update equipment' },
      { status: 500 }
    );
  }
}

// DELETE: Delete equipment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Equipment ID is required' },
        { status: 400 }
      );
    }

    await prisma.equipment.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/equipment error:', error);
    return NextResponse.json(
      { error: 'Failed to delete equipment' },
      { status: 500 }
    );
  }
}
