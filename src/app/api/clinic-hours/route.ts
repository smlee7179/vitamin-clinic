import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET: Fetch clinic hours (singleton)
export async function GET() {
  try {
    const hours = await prisma.clinicHours.findFirst();
    return NextResponse.json(hours);
  } catch (error) {
    console.error('GET /api/clinic-hours error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clinic hours' },
      { status: 500 }
    );
  }
}

// POST: Create or update clinic hours (singleton)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { weekdayOpen, weekdayClose, saturdayOpen, saturdayClose, lunchStart, lunchEnd, closedDays } = body;

    // Check if record exists
    const existing = await prisma.clinicHours.findFirst();

    let result;
    if (existing) {
      // Update existing
      result = await prisma.clinicHours.update({
        where: { id: existing.id },
        data: {
          weekdayOpen,
          weekdayClose,
          saturdayOpen: saturdayOpen || null,
          saturdayClose: saturdayClose || null,
          lunchStart: lunchStart || null,
          lunchEnd: lunchEnd || null,
          closedDays
        }
      });
    } else {
      // Create new
      result = await prisma.clinicHours.create({
        data: {
          weekdayOpen,
          weekdayClose,
          saturdayOpen: saturdayOpen || null,
          saturdayClose: saturdayClose || null,
          lunchStart: lunchStart || null,
          lunchEnd: lunchEnd || null,
          closedDays
        }
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('POST /api/clinic-hours error:', error);
    return NextResponse.json(
      { error: 'Failed to save clinic hours' },
      { status: 500 }
    );
  }
}
