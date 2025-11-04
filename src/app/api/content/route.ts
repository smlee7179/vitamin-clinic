import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (section) {
      const content = await prisma.hospitalContent.findUnique({
        where: { section },
      });
      return NextResponse.json(content);
    }

    const allContent = await prisma.hospitalContent.findMany();
    return NextResponse.json(allContent);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, data } = body;

    const content = await prisma.hospitalContent.upsert({
      where: { section },
      update: { data: JSON.stringify(data) },
      create: {
        section,
        data: JSON.stringify(data),
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, data } = body;

    const content = await prisma.hospitalContent.update({
      where: { section },
      data: { data: JSON.stringify(data) },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (!section) {
      return NextResponse.json({ error: 'Section parameter required' }, { status: 400 });
    }

    await prisma.hospitalContent.delete({
      where: { section },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 });
  }
}
