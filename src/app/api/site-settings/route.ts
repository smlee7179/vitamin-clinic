import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - 사이트 설정 조회
export async function GET() {
  try {
    // 첫 번째 레코드 가져오기 (하나만 존재)
    let settings = await prisma.siteSettings.findFirst();

    // 설정이 없으면 기본값으로 생성
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          siteTitle: '비타민 의원',
          siteDescription: '부산 해운대구 비타민 의원은 노인 친화적 정형외과 전문병원입니다.',
          keywords: '부산 정형외과, 해운대 정형외과, 노인 친화적 병원',
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site settings' },
      { status: 500 }
    );
  }
}

// PUT - 사이트 설정 업데이트
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    // 첫 번째 설정 가져오기
    let settings = await prisma.siteSettings.findFirst();

    if (settings) {
      // 기존 설정 업데이트
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: {
          siteTitle: data.siteTitle,
          siteDescription: data.siteDescription,
          keywords: data.keywords,
          ogImageUrl: data.ogImageUrl,
          ogTitle: data.ogTitle,
          ogDescription: data.ogDescription,
          twitterImageUrl: data.twitterImageUrl,
          twitterTitle: data.twitterTitle,
          twitterDescription: data.twitterDescription,
          faviconUrl: data.faviconUrl,
        },
      });
    } else {
      // 새로 생성
      settings = await prisma.siteSettings.create({
        data: {
          siteTitle: data.siteTitle,
          siteDescription: data.siteDescription,
          keywords: data.keywords,
          ogImageUrl: data.ogImageUrl,
          ogTitle: data.ogTitle,
          ogDescription: data.ogDescription,
          twitterImageUrl: data.twitterImageUrl,
          twitterTitle: data.twitterTitle,
          twitterDescription: data.twitterDescription,
          faviconUrl: data.faviconUrl,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to update site settings:', error);
    return NextResponse.json(
      { error: 'Failed to update site settings' },
      { status: 500 }
    );
  }
}
