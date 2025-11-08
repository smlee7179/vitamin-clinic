import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import prisma from '@/lib/prisma';

// Prisma는 Edge runtime을 지원하지 않으므로 Node.js runtime 사용
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (section === 'all') {
      // 전체 콘텐츠를 하나의 객체로 반환
      const allContent = await prisma.hospitalContent.findMany();

      const result: any = {};
      allContent.forEach(item => {
        try {
          result[item.section] = JSON.parse(item.data);
        } catch (e) {
          console.error(`Failed to parse data for section ${item.section}:`, e);
          result[item.section] = {};
        }
      });

      return NextResponse.json(result);
    } else if (section) {
      // 개별 섹션 조회
      const content = await prisma.hospitalContent.findUnique({
        where: { section },
      });

      if (!content) {
        return NextResponse.json({ error: 'Content not found' }, { status: 404 });
      }

      try {
        const parsed = JSON.parse(content.data);
        return NextResponse.json(parsed);
      } catch (e) {
        console.error('Failed to parse content data:', e);
        return NextResponse.json({ error: 'Invalid content data' }, { status: 500 });
      }
    }

    // 섹션 지정 없으면 메타데이터만 반환
    const allContent = await prisma.hospitalContent.findMany({
      select: {
        section: true,
        updatedAt: true,
        createdAt: true
      }
    });
    return NextResponse.json(allContent);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Check admin authentication
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { section, data } = body;

    if (section === 'all') {
      // 전체 콘텐츠 저장 (모든 섹션)
      console.log('💾 Saving all content sections to database...');

      const sections = ['hero', 'services', 'doctors', 'facilities', 'contact', 'footer'];
      const savedSections: string[] = [];

      for (const sec of sections) {
        if (data[sec]) {
          const content = await prisma.hospitalContent.upsert({
            where: { section: sec },
            update: {
              data: JSON.stringify(data[sec]),
              updatedAt: new Date()
            },
            create: {
              section: sec,
              data: JSON.stringify(data[sec])
            }
          });
          savedSections.push(sec);
          console.log(`✅ Saved section: ${sec}`);
        }
      }

      console.log(`✅ Total ${savedSections.length} sections saved to database`);
      return NextResponse.json({
        success: true,
        savedSections,
        message: `${savedSections.length} sections saved successfully`
      });
    } else {
      // 개별 섹션 저장
      console.log(`💾 Saving section '${section}' to database...`);

      const content = await prisma.hospitalContent.upsert({
        where: { section },
        update: {
          data: JSON.stringify(data),
          updatedAt: new Date()
        },
        create: {
          section,
          data: JSON.stringify(data),
        },
      });

      console.log(`✅ Section '${section}' saved to database`);
      return NextResponse.json(content);
    }
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({
      error: 'Failed to save content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  // Check admin authentication
  const { error } = await requireAdmin();
  if (error) return error;

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
  // Check admin authentication
  const { error } = await requireAdmin();
  if (error) return error;

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
