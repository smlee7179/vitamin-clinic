import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET: Fetch doctor schedules (optionally filter by doctorId)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get('doctorId');

    const schedules = await prisma.doctorSchedule.findMany({
      where: doctorId ? { doctorId } : undefined,
      orderBy: { dayOfWeek: 'asc' }
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

// PUT: Bulk upsert doctor schedules (delete all existing + create new)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { doctorId, schedules } = body;

    if (!doctorId || !schedules || !Array.isArray(schedules)) {
      return NextResponse.json(
        { error: 'doctorId and schedules array are required' },
        { status: 400 }
      );
    }

    // Delete all existing schedules for this doctor
    await prisma.doctorSchedule.deleteMany({
      where: { doctorId }
    });

    // Create new schedules using upsert with unique constraint
    const upsertedSchedules = await Promise.all(
      schedules.map((schedule) =>
        prisma.doctorSchedule.upsert({
          where: {
            doctorId_dayOfWeek: {
              doctorId,
              dayOfWeek: schedule.dayOfWeek
            }
          },
          update: {
            morningStatus: schedule.morningStatus,
            afternoonStatus: schedule.afternoonStatus,
            note: schedule.note || null
          },
          create: {
            doctorId,
            dayOfWeek: schedule.dayOfWeek,
            morningStatus: schedule.morningStatus,
            afternoonStatus: schedule.afternoonStatus,
            note: schedule.note || null
          }
        })
      )
    );

    return NextResponse.json(upsertedSchedules);
  } catch (error) {
    console.error('PUT /api/doctor-schedule error:', error);
    return NextResponse.json(
      { error: 'Failed to update doctor schedules' },
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
