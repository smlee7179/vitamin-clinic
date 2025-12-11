import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DAYS_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// GET - 통합 시간표 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dayOfWeek = searchParams.get('dayOfWeek');

    if (dayOfWeek) {
      // 특정 요일 조회
      const schedule = await prisma.unifiedSchedule.findUnique({
        where: { dayOfWeek }
      });

      if (!schedule) {
        return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
      }

      // Parse doctors JSON
      const parsedSchedule = {
        ...schedule,
        doctors: schedule.doctors ? JSON.parse(schedule.doctors) : []
      };

      return NextResponse.json(parsedSchedule);
    } else {
      // 모든 요일 조회 (월-토)
      const schedules = await prisma.unifiedSchedule.findMany({
        orderBy: {
          createdAt: 'asc'
        }
      });

      // Sort by day of week order
      const sortedSchedules = schedules
        .map(schedule => ({
          ...schedule,
          doctors: schedule.doctors ? JSON.parse(schedule.doctors) : []
        }))
        .sort((a, b) => {
          return DAYS_ORDER.indexOf(a.dayOfWeek) - DAYS_ORDER.indexOf(b.dayOfWeek);
        });

      return NextResponse.json(sortedSchedules);
    }
  } catch (error) {
    console.error('Error fetching unified schedule:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schedule' },
      { status: 500 }
    );
  }
}

// POST - 통합 시간표 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      dayOfWeek,
      morningOpen,
      morningClose,
      afternoonOpen,
      afternoonClose,
      lunchStart,
      lunchEnd,
      isClosed,
      doctors,
      note
    } = body;

    // Validate required fields
    if (!dayOfWeek) {
      return NextResponse.json(
        { error: 'dayOfWeek is required' },
        { status: 400 }
      );
    }

    // Stringify doctors array
    const doctorsJson = JSON.stringify(doctors || []);

    const schedule = await prisma.unifiedSchedule.create({
      data: {
        dayOfWeek,
        morningOpen,
        morningClose,
        afternoonOpen,
        afternoonClose,
        lunchStart,
        lunchEnd,
        isClosed: isClosed || false,
        doctors: doctorsJson,
        note
      }
    });

    return NextResponse.json({
      ...schedule,
      doctors: JSON.parse(schedule.doctors)
    });
  } catch (error) {
    console.error('Error creating unified schedule:', error);
    return NextResponse.json(
      { error: 'Failed to create schedule' },
      { status: 500 }
    );
  }
}

// PUT - 통합 시간표 수정
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      dayOfWeek,
      morningOpen,
      morningClose,
      afternoonOpen,
      afternoonClose,
      lunchStart,
      lunchEnd,
      isClosed,
      doctors,
      note
    } = body;

    if (!dayOfWeek) {
      return NextResponse.json(
        { error: 'dayOfWeek is required' },
        { status: 400 }
      );
    }

    // Stringify doctors array
    const doctorsJson = JSON.stringify(doctors || []);

    // Upsert: update if exists, create if not
    const schedule = await prisma.unifiedSchedule.upsert({
      where: { dayOfWeek },
      update: {
        morningOpen,
        morningClose,
        afternoonOpen,
        afternoonClose,
        lunchStart,
        lunchEnd,
        isClosed: isClosed || false,
        doctors: doctorsJson,
        note
      },
      create: {
        dayOfWeek,
        morningOpen,
        morningClose,
        afternoonOpen,
        afternoonClose,
        lunchStart,
        lunchEnd,
        isClosed: isClosed || false,
        doctors: doctorsJson,
        note
      }
    });

    return NextResponse.json({
      ...schedule,
      doctors: JSON.parse(schedule.doctors)
    });
  } catch (error) {
    console.error('Error updating unified schedule:', error);
    return NextResponse.json(
      { error: 'Failed to update schedule' },
      { status: 500 }
    );
  }
}

// DELETE - 통합 시간표 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dayOfWeek = searchParams.get('dayOfWeek');

    if (!dayOfWeek) {
      return NextResponse.json(
        { error: 'dayOfWeek is required' },
        { status: 400 }
      );
    }

    await prisma.unifiedSchedule.delete({
      where: { dayOfWeek }
    });

    return NextResponse.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting unified schedule:', error);
    return NextResponse.json(
      { error: 'Failed to delete schedule' },
      { status: 500 }
    );
  }
}
