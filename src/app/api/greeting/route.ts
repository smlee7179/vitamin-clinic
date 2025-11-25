import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET: Fetch greeting section
export async function GET() {
  try {
    const greeting = await prisma.greetingSection.findFirst();
    return NextResponse.json(greeting);
  } catch (error) {
    console.error('GET /api/greeting error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch greeting' },
      { status: 500 }
    );
  }
}

// POST: Create new greeting section
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, content, signature } = body;

    const greeting = await prisma.greetingSection.create({
      data: {
        imageUrl,
        content,
        signature
      }
    });

    return NextResponse.json(greeting);
  } catch (error) {
    console.error('POST /api/greeting error:', error);
    return NextResponse.json(
      { error: 'Failed to create greeting' },
      { status: 500 }
    );
  }
}

// PUT: Update existing greeting section
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, imageUrl, content, signature } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Greeting ID is required' },
        { status: 400 }
      );
    }

    const greeting = await prisma.greetingSection.update({
      where: { id },
      data: {
        imageUrl,
        content,
        signature
      }
    });

    return NextResponse.json(greeting);
  } catch (error) {
    console.error('PUT /api/greeting error:', error);
    return NextResponse.json(
      { error: 'Failed to update greeting' },
      { status: 500 }
    );
  }
}
