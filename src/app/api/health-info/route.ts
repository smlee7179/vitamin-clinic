import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - 건강정보 목록 조회
export async function GET() {
  try {
    const healthInfos = await prisma.healthInfo.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(healthInfos);
  } catch (error) {
    console.error('GET /api/health-info error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch health info' },
      { status: 500 }
    );
  }
}

// POST - 새 건강정보 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, category, imageUrl } = body;

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newHealthInfo = await prisma.healthInfo.create({
      data: {
        title,
        content,
        category,
        imageUrl: imageUrl || null
      }
    });

    return NextResponse.json(newHealthInfo);
  } catch (error) {
    console.error('POST /api/health-info error:', error);
    return NextResponse.json(
      { error: 'Failed to create health info' },
      { status: 500 }
    );
  }
}

// PUT - 건강정보 수정
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, content, category, imageUrl } = body;

    if (!id || !title || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updatedHealthInfo = await prisma.healthInfo.update({
      where: { id },
      data: {
        title,
        content,
        category,
        imageUrl: imageUrl || null
      }
    });

    return NextResponse.json(updatedHealthInfo);
  } catch (error) {
    console.error('PUT /api/health-info error:', error);
    return NextResponse.json(
      { error: 'Failed to update health info' },
      { status: 500 }
    );
  }
}

// DELETE - 건강정보 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing id parameter' },
        { status: 400 }
      );
    }

    await prisma.healthInfo.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/health-info error:', error);
    return NextResponse.json(
      { error: 'Failed to delete health info' },
      { status: 500 }
    );
  }
}
