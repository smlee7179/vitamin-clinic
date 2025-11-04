import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const treatments = await prisma.treatment.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });

    // Parse features JSON string back to array
    const parsed = treatments.map(t => ({
      ...t,
      features: JSON.parse(t.features),
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return NextResponse.json({ error: 'Failed to fetch treatments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Check admin authentication
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { treatments } = body;

    // Delete all existing treatments
    await prisma.treatment.deleteMany();

    // Create new treatments
    const created = await prisma.treatment.createMany({
      data: treatments.map((treatment: any, index: number) => ({
        title: treatment.title,
        icon: treatment.icon,
        description: treatment.description,
        features: JSON.stringify(treatment.features),
        order: index,
        active: true,
      })),
    });

    return NextResponse.json({ success: true, count: created.count });
  } catch (error) {
    console.error('Error saving treatments:', error);
    return NextResponse.json({ error: 'Failed to save treatments' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, features, ...data } = body;

    const treatment = await prisma.treatment.update({
      where: { id },
      data: {
        ...data,
        features: JSON.stringify(features),
      },
    });

    return NextResponse.json(treatment);
  } catch (error) {
    console.error('Error updating treatment:', error);
    return NextResponse.json({ error: 'Failed to update treatment' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID parameter required' }, { status: 400 });
    }

    await prisma.treatment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting treatment:', error);
    return NextResponse.json({ error: 'Failed to delete treatment' }, { status: 500 });
  }
}
