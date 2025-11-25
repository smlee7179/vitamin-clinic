import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET: Fetch all services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error('GET /api/services error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST: Create new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, icon, details, order, active } = body;

    const service = await prisma.service.create({
      data: {
        name,
        description,
        icon: icon || 'personal_injury',
        details: details || '[]',
        order: order ?? 0,
        active: active ?? true
      }
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error('POST /api/services error:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

// PUT: Update existing service
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, icon, details, order, active } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Service ID is required' },
        { status: 400 }
      );
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        name,
        description,
        icon: icon || 'personal_injury',
        details: details || '[]',
        order,
        active
      }
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error('PUT /api/services error:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE: Delete service
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Service ID is required' },
        { status: 400 }
      );
    }

    await prisma.service.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/services error:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
