import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET: Fetch all doctor schedules
export async function GET() {
  try {
    const schedules = await prisma.doctorSchedule.findMany({
      orderBy: { doctorId: 'asc' }
    });
    return NextResponse.json(schedules);
  } catch (error) {
    console.error('GET /api/doctor-schedule error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctor schedules' },
      { status: 500 }
    );
  }
}

// POST: Create new doctor schedule
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { doctorId, dayOfWeek, morningStatus, afternoonStatus, note } = body;

    const schedule = await prisma.doctorSchedule.create({
      data: {
        doctorId,
        dayOfWeek,
        morningStatus,
        afternoonStatus,
        note: note || null
      }
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.error('POST /api/doctor-schedule error:', error);
    return NextResponse.json(
      { error: 'Failed to create doctor schedule' },
      { status: 500 }
    );
  }
}

// PUT: Update existing doctor schedule
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, doctorId, dayOfWeek, morningStatus, afternoonStatus, note } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Schedule ID is required' },
        { status: 400 }
      );
    }

    const schedule = await prisma.doctorSchedule.update({
      where: { id },
      data: {
        doctorId,
        dayOfWeek,
        morningStatus,
        afternoonStatus,
        note: note || null
      }
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.error('PUT /api/doctor-schedule error:', error);
    return NextResponse.json(
      { error: 'Failed to update doctor schedule' },
      { status: 500 }
    );
  }
}

// DELETE: Delete doctor schedule
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Schedule ID is required' },
        { status: 400 }
      );
    }

    await prisma.doctorSchedule.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/doctor-schedule error:', error);
    return NextResponse.json(
      { error: 'Failed to delete doctor schedule' },
      { status: 500 }
    );
  }
}
