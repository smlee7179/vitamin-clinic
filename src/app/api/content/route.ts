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
  console.log('🔐 POST /api/content - Checking authentication...');
  const { error, session } = await requireAdmin();
  if (error) {
    console.error('❌ Authentication failed');
    return error;
  }
  console.log('✅ Authentication successful for user:', session?.email);

  try {
    const body = await request.json();
    console.log('📦 Full request body:', JSON.stringify(body, null, 2));
    console.log('📦 Body keys:', Object.keys(body));

    const { section } = body;

    // Support both formats:
    // 1. { section: "hero", data: {...} } - NEW format
    // 2. { section: "hero", title: "...", subtitle: "..." } - OLD format (browser cache)
    let data;
    if (body.data !== undefined) {
      // New format with 'data' field
      data = body.data;
      console.log('📦 Using NEW format with data field');
    } else {
      // Old format - extract everything except 'section'
      const { section: _, ...rest } = body;
      data = rest;
      console.log('📦 Using OLD format - extracted data from body');
    }

    console.log('📦 Section:', section);
    console.log('📦 Data type:', typeof data);
    console.log('📦 Data value:', data);

    if (section === 'all') {
      // 전체 콘텐츠 저장 (모든 섹션)
      console.log('💾 Saving all content sections to database...');

      const sections = ['hero', 'services', 'doctors', 'facilities', 'contact', 'footer'];
      const savedSections: string[] = [];

      for (const sec of sections) {
        if (data[sec]) {
          // data[sec]가 이미 문자열인 경우 그대로 사용, 객체인 경우 stringify
          const dataToSave = typeof data[sec] === 'string' ? data[sec] : JSON.stringify(data[sec]);

          const content = await prisma.hospitalContent.upsert({
            where: { section: sec },
            update: {
              data: dataToSave,
              updatedAt: new Date()
            },
            create: {
              section: sec,
              data: dataToSave
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
      console.log(`📦 Data type:`, typeof data);
      console.log(`📦 Data content:`, data);

      // data 유효성 검사
      if (!data) {
        return NextResponse.json({
          error: 'Invalid data',
          details: 'Data is required'
        }, { status: 400 });
      }

      // data가 이미 문자열인 경우 그대로 사용, 객체인 경우 stringify
      const dataToSave = typeof data === 'string' ? data : JSON.stringify(data);

      console.log(`📦 Data to save:`, dataToSave);

      const content = await prisma.hospitalContent.upsert({
        where: { section },
        update: {
          data: dataToSave,
          updatedAt: new Date()
        },
        create: {
          section,
          data: dataToSave,
        },
      });

      console.log(`✅ Section '${section}' saved to database`);
      return NextResponse.json(content);
    }
  } catch (error) {
    console.error('❌ Error saving content:', error);
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('❌ Error name:', error instanceof Error ? error.name : 'Unknown');
    console.error('❌ Error message:', error instanceof Error ? error.message : String(error));

    return NextResponse.json({
      error: 'Failed to save content',
      details: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : 'UnknownError',
      stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
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

    // data가 이미 문자열인 경우 그대로 사용, 객체인 경우 stringify
    const dataToSave = typeof data === 'string' ? data : JSON.stringify(data);

    const content = await prisma.hospitalContent.update({
      where: { section },
      data: { data: dataToSave },
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
