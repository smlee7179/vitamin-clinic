import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

// GET - 푸터 정보 조회
export async function GET() {
  try {
    const info = await prisma.footerInfo.findFirst();

    if (!info) {
      return NextResponse.json({
        hospitalName: '',
        address: '',
        representative: null,
        businessNumber: null,
        phone: '',
        fax: null,
        email: null,
        facebookUrl: null,
        instagramUrl: null,
        youtubeUrl: null,
        copyrightText: ''
      });
    }

    return NextResponse.json(info);
  } catch (error) {
    console.error('GET footer-info error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch footer info' },
      { status: 500 }
    );
  }
}

// POST - 푸터 정보 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const info = await prisma.footerInfo.create({
      data: {
        hospitalName: body.hospitalName,
        address: body.address,
        representative: body.representative || null,
        businessNumber: body.businessNumber || null,
        phone: body.phone,
        fax: body.fax || null,
        email: body.email || null,
        facebookUrl: body.facebookUrl || null,
        instagramUrl: body.instagramUrl || null,
        youtubeUrl: body.youtubeUrl || null,
        copyrightText: body.copyrightText
      }
    });

    return NextResponse.json(info);
  } catch (error) {
    console.error('POST footer-info error:', error);
    return NextResponse.json(
      { error: 'Failed to create footer info' },
      { status: 500 }
    );
  }
}

// PUT - 푸터 정보 수정
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // 기존 정보 찾기
    const existing = await prisma.footerInfo.findFirst();

    if (!existing) {
      // 없으면 생성
      return POST(request);
    }

    const info = await prisma.footerInfo.update({
      where: { id: existing.id },
      data: {
        hospitalName: body.hospitalName,
        address: body.address,
        representative: body.representative || null,
        businessNumber: body.businessNumber || null,
        phone: body.phone,
        fax: body.fax || null,
        email: body.email || null,
        facebookUrl: body.facebookUrl || null,
        instagramUrl: body.instagramUrl || null,
        youtubeUrl: body.youtubeUrl || null,
        copyrightText: body.copyrightText
      }
    });

    return NextResponse.json(info);
  } catch (error) {
    console.error('PUT footer-info error:', error);
    return NextResponse.json(
      { error: 'Failed to update footer info' },
      { status: 500 }
    );
  }
}
