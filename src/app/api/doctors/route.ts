import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - Fetch active doctors (public) or all doctors (admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminMode = searchParams.get('admin') === 'true';

    if (adminMode) {
      const { error } = await requireAdmin();
      if (error) return error;

      const doctors = await prisma.doctor.findMany({
        orderBy: { order: 'asc' },
      });
      return NextResponse.json(doctors);
    } else {
      // Public: return active doctors only
      const doctors = await prisma.doctor.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
      });
      return NextResponse.json(doctors);
    }
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

// POST - Create new doctor (admin only)
export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { name, title, specialty, photoUrl, career, order, active } = body;

    if (!name || !title || !specialty) {
      return NextResponse.json({ error: 'Name, title, and specialty are required' }, { status: 400 });
    }

    const doctor = await prisma.doctor.create({
      data: {
        name,
        title,
        specialty,
        photoUrl,
        career: career || '',
        order: order ?? 0,
        active: active ?? true,
      },
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}

// PUT - Update doctor (admin only)
export async function PUT(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { id, name, title, specialty, photoUrl, career, order, active } = body;

    if (!id) {
      return NextResponse.json({ error: 'Doctor ID is required' }, { status: 400 });
    }

    const doctor = await prisma.doctor.update({
      where: { id },
      data: {
        name,
        title,
        specialty,
        photoUrl,
        career,
        order,
        active,
      },
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    return NextResponse.json({ error: 'Failed to update doctor' }, { status: 500 });
  }
}

// DELETE - Delete doctor (admin only)
export async function DELETE(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Doctor ID is required' }, { status: 400 });
    }

    await prisma.doctor.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
  }
}
