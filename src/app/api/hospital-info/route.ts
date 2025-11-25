import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

// GET - 병원 정보 조회
export async function GET() {
  try {
    const info = await prisma.hospitalInfo.findFirst();

    if (!info) {
      return NextResponse.json({
        logoUrl: null,
        logoAlt: '병원 로고',
        hospitalName: '',
        address: '',
        phone: '',
        fax: null,
        email: null,
        mapImageUrl: null,
        subwayInfo: null,
        busInfo: null
      });
    }

    return NextResponse.json(info);
  } catch (error) {
    console.error('GET hospital-info error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hospital info' },
      { status: 500 }
    );
  }
}

// POST - 병원 정보 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const info = await prisma.hospitalInfo.create({
      data: {
        logoUrl: body.logoUrl || null,
        logoAlt: body.logoAlt || '병원 로고',
        hospitalName: body.hospitalName || '비타민마취통증의학과',
        address: body.address || '',
        phone: body.phone || '',
        fax: body.fax || null,
        email: body.email || null,
        mapImageUrl: body.mapImageUrl || null,
        subwayInfo: body.subwayInfo || null,
        busInfo: body.busInfo || null
      }
    });

    return NextResponse.json(info);
  } catch (error) {
    console.error('POST hospital-info error:', error);
    return NextResponse.json(
      { error: 'Failed to create hospital info' },
      { status: 500 }
    );
  }
}

// PUT - 병원 정보 수정
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // 기존 정보 찾기
    const existing = await prisma.hospitalInfo.findFirst();

    if (!existing) {
      // 없으면 생성
      return POST(request);
    }

    const info = await prisma.hospitalInfo.update({
      where: { id: existing.id },
      data: {
        logoUrl: body.logoUrl || null,
        logoAlt: body.logoAlt || '병원 로고',
        hospitalName: body.hospitalName,
        address: body.address,
        phone: body.phone,
        fax: body.fax || null,
        email: body.email || null,
        mapImageUrl: body.mapImageUrl || null,
        subwayInfo: body.subwayInfo || null,
        busInfo: body.busInfo || null
      }
    });

    return NextResponse.json(info);
  } catch (error) {
    console.error('PUT hospital-info error:', error);
    return NextResponse.json(
      { error: 'Failed to update hospital info' },
      { status: 500 }
    );
  }
}
