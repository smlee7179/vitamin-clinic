import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

// GET - 병원 정보 조회
export async function GET() {
  try {
    let info = await prisma.hospitalInfo.findFirst();

    // 데이터가 없으면 기본값으로 생성
    if (!info) {
      info = await prisma.hospitalInfo.create({
        data: {
          logoUrl: null,
          logoAlt: '병원 로고',
          hospitalName: '비타민마취통증의학과',
          address: '부산광역시 동구 중앙대로 375',
          phone: '051-469-7581',
          fax: null,
          email: null,
          representative: null,
          businessNumber: null,
          mapImageUrl: null,
          kakaoMapUrl: null,
          naverMapUrl: null,
          googleMapUrl: null,
          subwayInfo: null,
          busInfo: null,
          parkingInfo: null,
          facebookUrl: null,
          instagramUrl: null,
          youtubeUrl: null,
          copyrightText: '© 2024 비타민마취통증의학과. All rights reserved.'
        }
      });
    }

    return NextResponse.json(info);
  } catch (error) {
    console.error('GET hospital-info error:', error);
    // 에러 발생 시에도 기본값 반환
    return NextResponse.json({
      logoUrl: null,
      logoAlt: '병원 로고',
      hospitalName: '비타민마취통증의학과',
      address: '부산광역시 동구 중앙대로 375',
      phone: '051-469-7581',
      fax: null,
      email: null,
      representative: null,
      businessNumber: null,
      mapImageUrl: null,
      kakaoMapUrl: null,
      naverMapUrl: null,
      googleMapUrl: null,
      subwayInfo: null,
      busInfo: null,
      parkingInfo: null,
      facebookUrl: null,
      instagramUrl: null,
      youtubeUrl: null,
      copyrightText: '© 2024 비타민마취통증의학과. All rights reserved.'
    });
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
        representative: body.representative || null,
        businessNumber: body.businessNumber || null,
        mapImageUrl: body.mapImageUrl || null,
        kakaoMapUrl: body.kakaoMapUrl || null,
        naverMapUrl: body.naverMapUrl || null,
        googleMapUrl: body.googleMapUrl || null,
        subwayInfo: body.subwayInfo || null,
        busInfo: body.busInfo || null,
        parkingInfo: body.parkingInfo || null,
        facebookUrl: body.facebookUrl || null,
        instagramUrl: body.instagramUrl || null,
        youtubeUrl: body.youtubeUrl || null,
        copyrightText: body.copyrightText || '© 2024 비타민마취통증의학과. All rights reserved.'
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
        logoUrl: body.logoUrl !== undefined ? body.logoUrl : existing.logoUrl,
        logoAlt: body.logoAlt || existing.logoAlt,
        hospitalName: body.hospitalName || existing.hospitalName,
        address: body.address || existing.address,
        phone: body.phone || existing.phone,
        fax: body.fax !== undefined ? body.fax : existing.fax,
        email: body.email !== undefined ? body.email : existing.email,
        representative: body.representative !== undefined ? body.representative : existing.representative,
        businessNumber: body.businessNumber !== undefined ? body.businessNumber : existing.businessNumber,
        mapImageUrl: body.mapImageUrl !== undefined ? body.mapImageUrl : existing.mapImageUrl,
        kakaoMapUrl: body.kakaoMapUrl !== undefined ? body.kakaoMapUrl : existing.kakaoMapUrl,
        naverMapUrl: body.naverMapUrl !== undefined ? body.naverMapUrl : existing.naverMapUrl,
        googleMapUrl: body.googleMapUrl !== undefined ? body.googleMapUrl : existing.googleMapUrl,
        subwayInfo: body.subwayInfo !== undefined ? body.subwayInfo : existing.subwayInfo,
        busInfo: body.busInfo !== undefined ? body.busInfo : existing.busInfo,
        parkingInfo: body.parkingInfo !== undefined ? body.parkingInfo : existing.parkingInfo,
        facebookUrl: body.facebookUrl !== undefined ? body.facebookUrl : existing.facebookUrl,
        instagramUrl: body.instagramUrl !== undefined ? body.instagramUrl : existing.instagramUrl,
        youtubeUrl: body.youtubeUrl !== undefined ? body.youtubeUrl : existing.youtubeUrl,
        copyrightText: body.copyrightText || existing.copyrightText
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
