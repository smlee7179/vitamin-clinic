import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import prisma from '@/lib/prisma';

// Prisma는 Edge runtime을 지원하지 않으므로 Node.js runtime 사용
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
    const { title, icon, description, features, category, imageUrl } = body;

    // If single treatment data is provided, create one treatment
    if (title) {
      // Get the highest order number
      const maxOrder = await prisma.treatment.findFirst({
        orderBy: { order: 'desc' },
        select: { order: true },
      });

      const treatment = await prisma.treatment.create({
        data: {
          title,
          icon: icon || '💊',
          description,
          features: JSON.stringify(features || []),
          category: category || null,
          imageUrl: imageUrl || null,
          order: (maxOrder?.order ?? -1) + 1,
          active: true,
        },
      });

      return NextResponse.json(treatment);
    }

    // If bulk treatments array is provided (legacy support)
    const { treatments } = body;
    if (treatments && Array.isArray(treatments)) {
      // Delete all existing treatments
      await prisma.treatment.deleteMany();

      // Create new treatments
      const created = await prisma.treatment.createMany({
        data: treatments.map((treatment: any, index: number) => ({
          title: treatment.title,
          icon: treatment.icon,
          description: treatment.description,
          features: JSON.stringify(treatment.features),
          category: treatment.category || null,
          imageUrl: treatment.imageUrl || null,
          order: index,
          active: true,
        })),
      });

      return NextResponse.json({ success: true, count: created.count });
    }

    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  } catch (error) {
    console.error('Error saving treatments:', error);
    return NextResponse.json({ error: 'Failed to save treatments' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  // Check admin authentication
  const { error } = await requireAdmin();
  if (error) return error;

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
  // Check admin authentication
  const { error } = await requireAdmin();
  if (error) return error;

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
